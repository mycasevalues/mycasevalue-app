/**
 * Data Access Layer
 *
 * Clean query interface for frontend consumption.
 * Abstracts the canonical schema into simple functions
 * that return typed data for pages, search, and analytics.
 */

import { getSupabaseAdmin } from '../supabase';

function db() {
  return getSupabaseAdmin();
}

// ── Types for Frontend ──

export interface CaseSearchResult {
  id: number;
  case_name: string;
  docket_number: string;
  court_name: string;
  court_abbreviation: string;
  case_type: string;
  filing_date: string;
  status: string;
  summary?: string;
  tags: string[];
}

export interface CaseDetail {
  id: number;
  case_name: string;
  docket_number: string;
  court: { name: string; abbreviation: string; circuit: string };
  case_type: string;
  nature_of_suit: string;
  filing_date: string;
  termination_date: string | null;
  status: string;
  procedural_posture: string | null;
  parties: Array<{ name: string; role: string }>;
  summary: { text: string; confidence_notes: string; generated_at: string } | null;
  tags: Array<{ tag: string; category: string; confidence: number }>;
  sources: Array<{ source_name: string; source_url: string; fetched_at: string }>;
  opinions: Array<{ title: string; author: string; date: string; source_url: string }>;
}

export interface RecentCase {
  id: number;
  case_name: string;
  court_abbreviation: string;
  case_type: string;
  filing_date: string;
  status: string;
}

// ── Search ──

/**
 * Full-text search across cases.
 * Uses PostgreSQL full-text search with ts_rank scoring.
 */
export async function searchCases(
  query: string,
  options: { limit?: number; offset?: number; caseType?: string; court?: string; status?: string } = {}
): Promise<{ results: CaseSearchResult[]; total: number }> {
  const { limit = 20, offset = 0, caseType, court, status } = options;

  let q = db()
    .from('cases')
    .select(`
      id, case_name, docket_number, case_type, filing_date, status,
      courts!inner(name, abbreviation),
      case_summaries(summary_text),
      case_tags(tag)
    `, { count: 'exact' });

  // Full-text search
  if (query) {
    q = q.textSearch('case_name', query, { type: 'websearch' });
  }

  // Filters
  if (caseType) q = q.eq('case_type', caseType);
  if (court) q = q.eq('courts.abbreviation', court);
  if (status) q = q.eq('status', status);

  q = q.order('filing_date', { ascending: false }).range(offset, offset + limit - 1);

  const { data, error, count } = await q;

  if (error) {
    console.error('[data-access] Search error:', error.message);
    return { results: [], total: 0 };
  }

  const results: CaseSearchResult[] = (data ?? []).map((row: any) => ({
    id: row.id,
    case_name: row.case_name,
    docket_number: row.docket_number,
    court_name: row.courts?.name ?? '',
    court_abbreviation: row.courts?.abbreviation ?? '',
    case_type: row.case_type ?? '',
    filing_date: row.filing_date ?? '',
    status: row.status ?? '',
    summary: row.case_summaries?.[0]?.summary_text,
    tags: (row.case_tags ?? []).map((t: any) => t.tag),
  }));

  return { results, total: count ?? 0 };
}

// ── Case Detail ──

/**
 * Get full case detail for a case detail page.
 */
export async function getCaseDetail(caseId: number): Promise<CaseDetail | null> {
  const { data: c, error } = await db()
    .from('cases')
    .select(`
      *,
      courts(name, abbreviation, circuit),
      parties(party_name, role),
      case_summaries(summary_text, confidence_notes, generated_at),
      case_tags(tag, tag_category, confidence),
      case_sources(source_name, source_url, fetched_at),
      opinions(title, author, opinion_date, source_url)
    `)
    .eq('id', caseId)
    .single();

  if (error || !c) return null;

  return {
    id: c.id,
    case_name: c.case_name,
    docket_number: c.docket_number,
    court: {
      name: c.courts?.name ?? '',
      abbreviation: c.courts?.abbreviation ?? '',
      circuit: c.courts?.circuit ?? '',
    },
    case_type: c.case_type ?? '',
    nature_of_suit: c.nature_of_suit ?? '',
    filing_date: c.filing_date ?? '',
    termination_date: c.termination_date,
    status: c.status ?? '',
    procedural_posture: c.procedural_posture,
    parties: (c.parties ?? []).map((p: any) => ({ name: p.party_name, role: p.role })),
    summary: c.case_summaries?.[0]
      ? {
          text: c.case_summaries[0].summary_text,
          confidence_notes: c.case_summaries[0].confidence_notes,
          generated_at: c.case_summaries[0].generated_at,
        }
      : null,
    tags: (c.case_tags ?? []).map((t: any) => ({
      tag: t.tag,
      category: t.tag_category,
      confidence: t.confidence,
    })),
    sources: (c.case_sources ?? []).map((s: any) => ({
      source_name: s.source_name,
      source_url: s.source_url,
      fetched_at: s.fetched_at,
    })),
    opinions: (c.opinions ?? []).map((o: any) => ({
      title: o.title,
      author: o.author,
      date: o.opinion_date,
      source_url: o.source_url,
    })),
  };
}

// ── Recent Cases ──

/**
 * Get recently ingested cases for a dashboard or feed.
 */
export async function getRecentCases(limit = 20): Promise<RecentCase[]> {
  const { data, error } = await db()
    .from('cases')
    .select('id, case_name, case_type, filing_date, status, courts(abbreviation)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return [];

  return (data ?? []).map((row: any) => ({
    id: row.id,
    case_name: row.case_name,
    court_abbreviation: row.courts?.abbreviation ?? '',
    case_type: row.case_type ?? '',
    filing_date: row.filing_date ?? '',
    status: row.status ?? '',
  }));
}

// ── Analytics ──

/**
 * Get tag distribution for analytics.
 */
export async function getTagDistribution(
  category?: string
): Promise<Array<{ tag: string; category: string; count: number }>> {
  let q = db()
    .from('case_tags')
    .select('tag, tag_category');

  if (category) q = q.eq('tag_category', category);

  const { data, error } = await q;
  if (error || !data) return [];

  // Aggregate in JS (Supabase doesn't support GROUP BY in client)
  const counts = new Map<string, { tag: string; category: string; count: number }>();
  for (const row of data) {
    const key = `${row.tag_category}:${row.tag}`;
    const existing = counts.get(key);
    if (existing) {
      existing.count++;
    } else {
      counts.set(key, { tag: row.tag, category: row.tag_category, count: 1 });
    }
  }

  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}

// ── Ingestion Status ──

/**
 * Get recent ingestion job history.
 */
export async function getIngestionHistory(limit = 10) {
  const { data, error } = await db()
    .from('ingestion_jobs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(limit);

  return data ?? [];
}
