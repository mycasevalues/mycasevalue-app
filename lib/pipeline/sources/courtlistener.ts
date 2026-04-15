/**
 * CourtListener Source Connector
 *
 * Fetches dockets (cases), opinions, and parties from the CourtListener REST API v4.
 * Normalizes into canonical case records for the pipeline.
 *
 * API Docs: https://www.courtlistener.com/api/rest/v4/
 * Rate Limit: 5,000 requests/hour (authenticated)
 * Auth: Token-based via COURTLISTENER_API_TOKEN env var
 *
 * Pagination: cursor-based (?cursor=...) from the `next` field in responses.
 */

import type {
  SourceConnector,
  FetchOptions,
  RawSourceRecord,
  NormalizedCaseRecord,
} from '../types';
import { buildExternalCaseKey } from '../db';

// ── Config ──

const BASE_URL = 'https://www.courtlistener.com/api/rest/v4';
const API_TOKEN = process.env.COURTLISTENER_API_TOKEN;
const RATE_LIMIT_DELAY_MS = 750; // ~4800 req/hour, safely under 5000

let lastRequestTime = 0;

// ── Rate Limiting ──

async function throttle(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < RATE_LIMIT_DELAY_MS) {
    await new Promise((r) => setTimeout(r, RATE_LIMIT_DELAY_MS - elapsed));
  }
  lastRequestTime = Date.now();
}

// ── Fetch with retry ──

async function apiFetch<T>(url: string, retries = 3): Promise<T> {
  await throttle();

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, {
      headers: {
        ...(API_TOKEN ? { Authorization: `Token ${API_TOKEN}` } : {}),
        Accept: 'application/json',
      },
    });

    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get('Retry-After') || '10', 10);
      const delay = (isNaN(retryAfter) ? 10 : retryAfter) * 1000;
      console.warn(`[courtlistener] Rate limited. Waiting ${delay / 1000}s...`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`CourtListener API error ${res.status}: ${body.slice(0, 200)}`);
    }

    return res.json() as Promise<T>;
  }

  throw new Error('CourtListener API: max retries exceeded');
}

// ── API Response Types ──

interface CLPageResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface CLDocket {
  id: number;
  absolute_url: string;
  case_name: string;
  case_name_short: string;
  docket_number: string;
  court: string; // URL to court resource
  court_id: string; // Court abbreviation like 'cacd', 'nysd'
  date_filed: string | null;
  date_terminated: string | null;
  nature_of_suit: string;
  cause: string;
  assigned_to_str: string;
  referred_to_str: string;
  parties?: CLParty[];
}

interface CLParty {
  name: string;
  party_type?: string; // Plaintiff, Defendant, etc.
}

interface CLOpinion {
  id: number;
  absolute_url: string;
  cluster: string; // URL to opinion cluster
  case_name: string;
  case_name_short: string;
  docket_number: string;
  court: string;
  court_id: string;
  date_filed: string;
  judges: string;
  sha1: string;
  page_count: number | null;
  plain_text?: string;
  html?: string;
}

// ── Connector Implementation ──

export const courtlistenerConnector: SourceConnector = {
  sourceName: 'courtlistener',

  async *fetchRecords(options: FetchOptions): AsyncGenerator<RawSourceRecord> {
    if (!API_TOKEN) {
      console.warn('[courtlistener] No COURTLISTENER_API_TOKEN set. Skipping fetch.');
      return;
    }

    // Build query URL for dockets
    let url = `${BASE_URL}/dockets/?order_by=-date_modified&page_size=20`;

    if (options.since) {
      url += `&date_modified__gte=${options.since}`;
    }

    if (options.filters?.court) {
      url += `&court__id=${options.filters.court}`;
    }

    let fetched = 0;
    const limit = options.limit ?? 1000;

    while (url && fetched < limit) {
      console.log(`[courtlistener] Fetching page: ${url.slice(0, 100)}...`);

      const page = await apiFetch<CLPageResponse<CLDocket>>(url);

      for (const docket of page.results) {
        if (fetched >= limit) break;

        yield {
          source: 'courtlistener',
          sourceId: String(docket.id),
          sourceUrl: `https://www.courtlistener.com${docket.absolute_url}`,
          fetchedAt: new Date().toISOString(),
          payload: docket as unknown as Record<string, unknown>,
        };

        fetched++;
      }

      url = page.next ?? '';
    }

    console.log(`[courtlistener] Fetched ${fetched} docket records.`);
  },

  normalize(raw: RawSourceRecord): NormalizedCaseRecord | null {
    const d = raw.payload as unknown as CLDocket;

    // Validate minimum required fields
    if (!d.case_name || !d.docket_number || !d.court_id) {
      console.warn(`[courtlistener] Skipping record ${raw.sourceId}: missing case_name, docket_number, or court_id`);
      return null;
    }

    const courtAbbreviation = d.court_id.toUpperCase();
    const externalKey = buildExternalCaseKey(courtAbbreviation, d.docket_number);

    // Determine status from dates
    let status = 'open';
    if (d.date_terminated) {
      status = 'closed';
    }

    // Map NOS string to code if recognizable
    const natureOfSuit = d.nature_of_suit || undefined;

    // Normalize parties
    const parties = (d.parties ?? [])
      .filter((p) => p.name)
      .map((p) => ({
        party_name: p.name,
        normalized_party_name: p.name.toLowerCase().trim(),
        role: mapPartyType(p.party_type),
      }));

    return {
      case: {
        external_case_key: externalKey,
        case_name: d.case_name,
        court_abbreviation: courtAbbreviation,
        docket_number: d.docket_number,
        case_type: categorizeNOS(d.nature_of_suit),
        nature_of_suit: natureOfSuit,
        filing_date: d.date_filed || undefined,
        termination_date: d.date_terminated || undefined,
        status,
        source_priority: 'courtlistener',
      },
      parties,
      filings: [], // Docket entries fetched separately if needed
      opinions: [],
      source: {
        source_name: 'courtlistener',
        source_record_id: String(d.id),
        source_url: `https://www.courtlistener.com${d.absolute_url}`,
        raw_payload: raw.payload,
        fetched_at: raw.fetchedAt,
      },
    };
  },
};

// ── Opinions Connector (supplementary) ──

export async function* fetchOpinions(
  options: FetchOptions
): AsyncGenerator<RawSourceRecord> {
  if (!API_TOKEN) return;

  let url = `${BASE_URL}/opinions/?order_by=-date_modified&page_size=20`;

  if (options.since) {
    url += `&date_modified__gte=${options.since}`;
  }

  let fetched = 0;
  const limit = options.limit ?? 500;

  while (url && fetched < limit) {
    const page = await apiFetch<CLPageResponse<CLOpinion>>(url);

    for (const op of page.results) {
      if (fetched >= limit) break;

      yield {
        source: 'courtlistener_opinion',
        sourceId: String(op.id),
        sourceUrl: `https://www.courtlistener.com${op.absolute_url}`,
        fetchedAt: new Date().toISOString(),
        payload: op as unknown as Record<string, unknown>,
      };

      fetched++;
    }

    url = page.next ?? '';
  }
}

export function normalizeOpinion(raw: RawSourceRecord): OpinionRowPartial | null {
  const op = raw.payload as unknown as CLOpinion;

  if (!op.case_name) return null;

  return {
    opinion_date: op.date_filed || undefined,
    title: op.case_name,
    author: op.judges || undefined,
    source_url: `https://www.courtlistener.com${op.absolute_url}`,
    text_content: op.plain_text?.slice(0, 50000) || undefined, // Cap at 50k chars
    source_name: 'courtlistener',
    source_record_id: String(op.id),
    raw_payload: raw.payload,
  };
}

type OpinionRowPartial = Omit<import('../types').OpinionRow, 'id' | 'case_id'>;

// ── Helpers ──

function mapPartyType(type?: string): string {
  if (!type) return 'unknown';
  const lower = type.toLowerCase();
  if (lower.includes('plaintiff')) return 'plaintiff';
  if (lower.includes('defendant')) return 'defendant';
  if (lower.includes('intervenor')) return 'intervenor';
  if (lower.includes('respondent')) return 'respondent';
  if (lower.includes('petitioner')) return 'petitioner';
  if (lower.includes('appellee')) return 'appellee';
  if (lower.includes('appellant')) return 'appellant';
  return type.toLowerCase();
}

/**
 * Rough NOS-to-category mapping for the most common federal case types.
 * Matches the existing SITS categories in lib/data.ts.
 */
function categorizeNOS(nos: string): string | undefined {
  if (!nos) return undefined;
  const lower = nos.toLowerCase();

  if (lower.includes('employment') || lower.includes('labor') || lower.includes('erisa'))
    return 'Employment & Workplace';
  if (lower.includes('personal injury') || lower.includes('product liability') || lower.includes('medical malpractice'))
    return 'Personal Injury';
  if (lower.includes('civil rights') || lower.includes('voting') || lower.includes('housing'))
    return 'Civil Rights';
  if (lower.includes('securities') || lower.includes('antitrust') || lower.includes('trademark') || lower.includes('patent') || lower.includes('copyright'))
    return 'Intellectual Property';
  if (lower.includes('contract') || lower.includes('insurance') || lower.includes('negotiable'))
    return 'Business Disputes';
  if (lower.includes('consumer') || lower.includes('truth in lending') || lower.includes('debt'))
    return 'Consumer Protection';
  if (lower.includes('immigration') || lower.includes('naturalization'))
    return 'Immigration';

  return undefined;
}
