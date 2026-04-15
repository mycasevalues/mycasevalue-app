/**
 * Pipeline Type Definitions
 *
 * Canonical types for the ingestion, normalization, and enrichment pipeline.
 * These types map to the Supabase schema defined in
 * supabase/migrations/20260415_canonical_case_schema.sql
 */

// ── Database Row Types ──

export interface CourtRow {
  id?: number;
  name: string;
  abbreviation: string;
  jurisdiction: string;
  circuit?: string;
  state?: string;
  source_slug?: string;
}

export interface CaseRow {
  id?: number;
  external_case_key: string;
  case_name: string;
  normalized_case_name?: string;
  court_id?: number;
  docket_number?: string;
  case_type?: string;
  nature_of_suit?: string;
  filing_date?: string;
  termination_date?: string;
  status?: string;
  procedural_posture?: string;
  source_priority?: string;
  last_source_sync_at?: string;
}

export interface CaseSourceRow {
  id?: number;
  case_id: number;
  source_name: string;
  source_record_id: string;
  source_url?: string;
  raw_payload?: Record<string, unknown>;
  fetched_at?: string;
}

export interface PartyRow {
  id?: number;
  case_id: number;
  party_name: string;
  normalized_party_name?: string;
  role?: string;
}

export interface FilingRow {
  id?: number;
  case_id: number;
  source_record_id?: string;
  filing_number?: number;
  filing_date?: string;
  title?: string;
  description?: string;
  document_url?: string;
  raw_payload?: Record<string, unknown>;
}

export interface OpinionRow {
  id?: number;
  case_id?: number;
  opinion_date?: string;
  title?: string;
  author?: string;
  citation?: string;
  source_url?: string;
  text_content?: string;
  raw_payload?: Record<string, unknown>;
  source_name?: string;
  source_record_id?: string;
}

export interface CaseSummaryRow {
  id?: number;
  case_id: number;
  summary_type: 'overview' | 'claims' | 'procedural' | 'outcome';
  summary_text: string;
  model_name: string;
  model_version?: string;
  prompt_version: string;
  confidence_notes?: string;
  generated_at?: string;
}

export interface CaseTagRow {
  id?: number;
  case_id: number;
  tag: string;
  tag_category: 'practice_area' | 'claim_type' | 'procedural_stage' | 'subject_matter' | 'forum_type';
  source: 'ai' | 'source' | 'manual';
  confidence?: number;
}

export interface IngestionJobRow {
  id?: number;
  source_name: string;
  job_type: 'backfill' | 'incremental' | 'enrich_summaries' | 'enrich_tags';
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  started_at?: string;
  completed_at?: string;
  records_fetched: number;
  records_inserted: number;
  records_updated: number;
  records_skipped: number;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

// ── Source Connector Interface ──

/** Raw record from any source, before normalization */
export interface RawSourceRecord {
  source: string;
  sourceId: string;
  sourceUrl?: string;
  fetchedAt: string;
  payload: Record<string, unknown>;
}

/** Result of normalizing a raw record into canonical entities */
export interface NormalizedCaseRecord {
  case: Omit<CaseRow, 'id' | 'court_id'> & { court_abbreviation: string };
  parties: Array<Omit<PartyRow, 'id' | 'case_id'>>;
  filings: Array<Omit<FilingRow, 'id' | 'case_id'>>;
  opinions: Array<Omit<OpinionRow, 'id' | 'case_id'>>;
  source: Omit<CaseSourceRow, 'id' | 'case_id'>;
}

/** Connector interface that all source modules must implement */
export interface SourceConnector {
  readonly sourceName: string;

  /** Fetch raw records from the source. Handles pagination internally. */
  fetchRecords(options: FetchOptions): AsyncGenerator<RawSourceRecord>;

  /** Transform a raw record into a normalized case record */
  normalize(raw: RawSourceRecord): NormalizedCaseRecord | null;
}

export interface FetchOptions {
  /** For incremental sync: only fetch records modified after this date */
  since?: string;
  /** Maximum number of records to fetch (for backfill batching) */
  limit?: number;
  /** Source-specific filters */
  filters?: Record<string, string>;
}

// ── AI Enrichment Types ──

export interface EnrichmentInput {
  caseId: number;
  caseName: string;
  docketNumber?: string;
  courtName?: string;
  caseType?: string;
  filingDate?: string;
  terminationDate?: string;
  status?: string;
  natureOfSuit?: string;
  parties: Array<{ name: string; role?: string }>;
  opinionExcerpt?: string;
}

export interface SummaryOutput {
  overview: string;
  confidenceNotes: string;
}

export interface TagOutput {
  tags: Array<{
    tag: string;
    category: CaseTagRow['tag_category'];
    confidence: number;
  }>;
}

// ── Pipeline Counters ──

export interface PipelineCounters {
  fetched: number;
  inserted: number;
  updated: number;
  skipped: number;
  errors: number;
}
