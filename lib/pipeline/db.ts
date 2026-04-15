/**
 * Pipeline Database Layer
 *
 * Wraps Supabase operations for the canonical case schema.
 * All writes go through here to centralize upsert/dedup logic.
 */

import { getSupabaseAdmin } from '../supabase';
import type {
  CaseRow,
  CaseSourceRow,
  CourtRow,
  PartyRow,
  FilingRow,
  OpinionRow,
  CaseSummaryRow,
  CaseTagRow,
  IngestionJobRow,
  NormalizedCaseRecord,
  PipelineCounters,
} from './types';

function db() {
  return getSupabaseAdmin();
}

// ── Courts ──

const courtCache = new Map<string, number>();

/**
 * Get or create a court by abbreviation. Cached in memory per process.
 */
export async function getOrCreateCourt(court: CourtRow): Promise<number> {
  const cached = courtCache.get(court.abbreviation);
  if (cached) return cached;

  const { data: existing } = await db()
    .from('courts')
    .select('id')
    .eq('abbreviation', court.abbreviation)
    .single();

  if (existing) {
    courtCache.set(court.abbreviation, existing.id);
    return existing.id;
  }

  const { data: created, error } = await db()
    .from('courts')
    .insert(court)
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create court ${court.abbreviation}: ${error.message}`);
  courtCache.set(court.abbreviation, created.id);
  return created.id;
}

// ── Cases (upsert by external_case_key) ──

/**
 * Upsert a case by external_case_key.
 * Returns the case ID and whether it was inserted (true) or updated (false).
 */
export async function upsertCase(
  caseData: CaseRow
): Promise<{ id: number; inserted: boolean }> {
  // Check if exists
  const { data: existing } = await db()
    .from('cases')
    .select('id')
    .eq('external_case_key', caseData.external_case_key)
    .single();

  if (existing) {
    // Update with newer data (don't overwrite with nulls)
    const updates: Record<string, unknown> = {};
    if (caseData.case_name) updates.case_name = caseData.case_name;
    if (caseData.normalized_case_name) updates.normalized_case_name = caseData.normalized_case_name;
    if (caseData.court_id) updates.court_id = caseData.court_id;
    if (caseData.docket_number) updates.docket_number = caseData.docket_number;
    if (caseData.case_type) updates.case_type = caseData.case_type;
    if (caseData.nature_of_suit) updates.nature_of_suit = caseData.nature_of_suit;
    if (caseData.filing_date) updates.filing_date = caseData.filing_date;
    if (caseData.termination_date) updates.termination_date = caseData.termination_date;
    if (caseData.status) updates.status = caseData.status;
    if (caseData.procedural_posture) updates.procedural_posture = caseData.procedural_posture;
    updates.last_source_sync_at = new Date().toISOString();

    if (Object.keys(updates).length > 0) {
      await db().from('cases').update(updates).eq('id', existing.id);
    }
    return { id: existing.id, inserted: false };
  }

  // Insert new
  const { data: created, error } = await db()
    .from('cases')
    .insert({
      ...caseData,
      last_source_sync_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to insert case: ${error.message}`);
  return { id: created.id, inserted: true };
}

// ── Case Sources (upsert by source_name + source_record_id) ──

export async function upsertCaseSource(source: CaseSourceRow): Promise<void> {
  const { error } = await db()
    .from('case_sources')
    .upsert(source, { onConflict: 'source_name,source_record_id' });

  if (error) throw new Error(`Failed to upsert case source: ${error.message}`);
}

// ── Parties (insert, skip duplicates) ──

export async function insertParties(caseId: number, parties: PartyRow[]): Promise<number> {
  if (parties.length === 0) return 0;

  const rows = parties.map((p) => ({ ...p, case_id: caseId }));
  const { error, data } = await db().from('parties').insert(rows).select('id');

  // Ignore duplicate errors gracefully
  if (error && !error.message.includes('duplicate')) {
    throw new Error(`Failed to insert parties: ${error.message}`);
  }
  return data?.length ?? 0;
}

// ── Filings ──

export async function insertFilings(caseId: number, filings: FilingRow[]): Promise<number> {
  if (filings.length === 0) return 0;

  const rows = filings.map((f) => ({ ...f, case_id: caseId }));
  const { error, data } = await db().from('filings').insert(rows).select('id');

  if (error && !error.message.includes('duplicate')) {
    throw new Error(`Failed to insert filings: ${error.message}`);
  }
  return data?.length ?? 0;
}

// ── Opinions (upsert by source_name + source_record_id) ──

export async function upsertOpinion(opinion: OpinionRow): Promise<void> {
  if (!opinion.source_record_id) {
    // No stable key, just insert
    await db().from('opinions').insert(opinion);
    return;
  }

  const { error } = await db()
    .from('opinions')
    .upsert(opinion, { onConflict: 'source_name,source_record_id' });

  if (error) throw new Error(`Failed to upsert opinion: ${error.message}`);
}

// ── Summaries (upsert by case_id + summary_type + prompt_version) ──

export async function upsertSummary(summary: CaseSummaryRow): Promise<void> {
  const { error } = await db()
    .from('case_summaries')
    .upsert(summary, { onConflict: 'case_id,summary_type,prompt_version' });

  if (error) throw new Error(`Failed to upsert summary: ${error.message}`);
}

// ── Tags (upsert by case_id + tag + tag_category) ──

export async function upsertTags(tags: CaseTagRow[]): Promise<number> {
  if (tags.length === 0) return 0;

  const { error, data } = await db()
    .from('case_tags')
    .upsert(tags, { onConflict: 'case_id,tag,tag_category' })
    .select('id');

  if (error) throw new Error(`Failed to upsert tags: ${error.message}`);
  return data?.length ?? 0;
}

// ── Ingestion Jobs ──

export async function createJob(
  job: Pick<IngestionJobRow, 'source_name' | 'job_type'>
): Promise<number> {
  const { data, error } = await db()
    .from('ingestion_jobs')
    .insert({
      source_name: job.source_name,
      job_type: job.job_type,
      status: 'running',
      started_at: new Date().toISOString(),
      records_fetched: 0,
      records_inserted: 0,
      records_updated: 0,
      records_skipped: 0,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create ingestion job: ${error.message}`);
  return data.id;
}

export async function updateJob(
  jobId: number,
  updates: Partial<IngestionJobRow>
): Promise<void> {
  const { error } = await db().from('ingestion_jobs').update(updates).eq('id', jobId);
  if (error) throw new Error(`Failed to update ingestion job: ${error.message}`);
}

export async function completeJob(
  jobId: number,
  counters: PipelineCounters,
  error?: string
): Promise<void> {
  await updateJob(jobId, {
    status: error ? 'failed' : 'completed',
    completed_at: new Date().toISOString(),
    records_fetched: counters.fetched,
    records_inserted: counters.inserted,
    records_updated: counters.updated,
    records_skipped: counters.skipped,
    error_message: error || undefined,
  });
}

// ── Full normalized record ingestion ──

/**
 * Ingest a fully normalized case record into all canonical tables.
 * Handles court resolution, case upsert, source provenance, parties, filings, opinions.
 *
 * Returns whether the case was newly inserted.
 */
export async function ingestNormalizedRecord(
  record: NormalizedCaseRecord
): Promise<{ caseId: number; inserted: boolean }> {
  // 1. Resolve court
  const courtId = await getOrCreateCourt({
    name: record.case.court_abbreviation,
    abbreviation: record.case.court_abbreviation,
    jurisdiction: 'federal',
  });

  // 2. Upsert case
  const { id: caseId, inserted } = await upsertCase({
    ...record.case,
    court_id: courtId,
    normalized_case_name: normalizeCaseName(record.case.case_name),
  });

  // 3. Upsert source provenance
  await upsertCaseSource({
    ...record.source,
    case_id: caseId,
  });

  // 4. Insert parties
  if (record.parties.length > 0) {
    await insertParties(
      caseId,
      record.parties.map((p) => ({
        ...p,
        case_id: caseId,
        normalized_party_name: p.party_name.toLowerCase().trim(),
      }))
    );
  }

  // 5. Insert filings
  if (record.filings.length > 0) {
    await insertFilings(caseId, record.filings.map((f) => ({ ...f, case_id: caseId })));
  }

  // 6. Upsert opinions
  for (const op of record.opinions) {
    await upsertOpinion({ ...op, case_id: caseId });
  }

  return { caseId, inserted };
}

// ── Query Helpers ──

/** Get cases needing AI summary (no summary yet or outdated prompt version) */
export async function getCasesNeedingSummary(
  promptVersion: string,
  limit = 50
): Promise<Array<{ id: number; case_name: string; docket_number: string; case_type: string; filing_date: string; termination_date: string; status: string; nature_of_suit: string }>> {
  const { data, error } = await db()
    .from('cases')
    .select('id, case_name, docket_number, case_type, filing_date, termination_date, status, nature_of_suit')
    .not('id', 'in', db().from('case_summaries').select('case_id').eq('prompt_version', promptVersion))
    .limit(limit);

  // Fallback: simpler query if subquery doesn't work with Supabase client
  if (error) {
    const { data: allCases } = await db()
      .from('cases')
      .select('id, case_name, docket_number, case_type, filing_date, termination_date, status, nature_of_suit')
      .limit(limit);
    return allCases ?? [];
  }
  return data ?? [];
}

/** Get case detail with parties for enrichment input */
export async function getCaseForEnrichment(caseId: number) {
  const { data: caseData } = await db()
    .from('cases')
    .select('*, courts(name, abbreviation)')
    .eq('id', caseId)
    .single();

  const { data: parties } = await db()
    .from('parties')
    .select('party_name, role')
    .eq('case_id', caseId);

  const { data: opinions } = await db()
    .from('opinions')
    .select('text_content')
    .eq('case_id', caseId)
    .limit(1);

  return {
    ...caseData,
    parties: parties ?? [],
    opinionExcerpt: opinions?.[0]?.text_content?.slice(0, 2000),
  };
}

// ── Utility ──

/** Normalize a case name for matching: lowercase, remove extra whitespace, strip common prefixes */
export function normalizeCaseName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/^(in re|in the matter of|united states v\.?|us v\.?)\s+/i, '')
    .trim();
}

/**
 * Build an external_case_key for deduplication.
 * Format: court_abbreviation:docket_number (lowercased, whitespace-stripped)
 */
export function buildExternalCaseKey(courtAbbreviation: string, docketNumber: string): string {
  return `${courtAbbreviation.toLowerCase().trim()}:${docketNumber.toLowerCase().replace(/\s+/g, '').trim()}`;
}
