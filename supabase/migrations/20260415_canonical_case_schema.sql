/**
 * MyCaseValue Canonical Case Schema
 *
 * Extends the existing statistical tables (case_stats, judges, legal_documents)
 * with a proper relational schema for individual case records, provenance
 * tracking, AI enrichment, and ingestion job management.
 *
 * This schema sits alongside the existing aggregate tables. The statistical
 * tables (case_stats, circuit_stats) continue to serve the analytics dashboards.
 * These canonical tables enable case-level search, detail pages, and AI enrichment.
 */

-- ============================================================================
-- Table: courts (canonical court registry)
-- ============================================================================
CREATE TABLE IF NOT EXISTS courts (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  abbreviation  TEXT NOT NULL UNIQUE,
  jurisdiction  TEXT NOT NULL DEFAULT 'federal',  -- federal, state, appellate, supreme
  circuit       TEXT,                              -- e.g. '9', 'DC', 'FC'
  state         TEXT,                              -- e.g. 'CA', 'NY'
  source_slug   TEXT,                              -- CourtListener court slug
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courts_abbreviation ON courts(abbreviation);
CREATE INDEX IF NOT EXISTS idx_courts_circuit ON courts(circuit);

-- ============================================================================
-- Table: cases (canonical case records)
-- ============================================================================
CREATE TABLE IF NOT EXISTS cases (
  id                    BIGSERIAL PRIMARY KEY,
  external_case_key     TEXT UNIQUE,               -- deterministic key for dedup: court_abbr:docket_number
  case_name             TEXT NOT NULL,
  normalized_case_name  TEXT,                       -- lowercased, standardized for matching
  court_id              BIGINT REFERENCES courts(id),
  docket_number         TEXT,
  case_type             TEXT,                       -- mapped from NOS code or source
  nature_of_suit        TEXT,                       -- raw NOS code (e.g. '442')
  filing_date           DATE,
  termination_date      DATE,
  status                TEXT DEFAULT 'open',        -- open, closed, settled, dismissed, transferred
  procedural_posture    TEXT,                       -- last known stage
  source_priority       TEXT DEFAULT 'courtlistener', -- which source is authoritative
  last_source_sync_at   TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cases_external_key ON cases(external_case_key);
CREATE INDEX IF NOT EXISTS idx_cases_court ON cases(court_id);
CREATE INDEX IF NOT EXISTS idx_cases_filing_date ON cases(filing_date DESC);
CREATE INDEX IF NOT EXISTS idx_cases_nature_of_suit ON cases(nature_of_suit);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_case_type ON cases(case_type);
CREATE INDEX IF NOT EXISTS idx_cases_normalized_name ON cases(normalized_case_name);

-- Full-text search on case name
CREATE INDEX IF NOT EXISTS idx_cases_fts ON cases
  USING GIN(to_tsvector('english', coalesce(case_name, '') || ' ' || coalesce(docket_number, '')));

-- ============================================================================
-- Table: case_sources (provenance: one case -> many source records)
-- ============================================================================
CREATE TABLE IF NOT EXISTS case_sources (
  id              BIGSERIAL PRIMARY KEY,
  case_id         BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  source_name     TEXT NOT NULL,                   -- 'courtlistener', 'recap', 'fjc', 'edgar'
  source_record_id TEXT NOT NULL,                  -- ID in the source system
  source_url      TEXT,
  raw_payload     JSONB,                           -- full original response for auditability
  fetched_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(source_name, source_record_id)
);

CREATE INDEX IF NOT EXISTS idx_case_sources_case ON case_sources(case_id);
CREATE INDEX IF NOT EXISTS idx_case_sources_source ON case_sources(source_name, source_record_id);

-- ============================================================================
-- Table: parties
-- ============================================================================
CREATE TABLE IF NOT EXISTS parties (
  id                    BIGSERIAL PRIMARY KEY,
  case_id               BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  party_name            TEXT NOT NULL,
  normalized_party_name TEXT,
  role                  TEXT,                       -- plaintiff, defendant, intervenor, etc.
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_parties_case ON parties(case_id);
CREATE INDEX IF NOT EXISTS idx_parties_role ON parties(role);

-- ============================================================================
-- Table: filings (docket entries)
-- ============================================================================
CREATE TABLE IF NOT EXISTS filings (
  id                BIGSERIAL PRIMARY KEY,
  case_id           BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  source_record_id  TEXT,
  filing_number     INTEGER,
  filing_date       DATE,
  title             TEXT,
  description       TEXT,
  document_url      TEXT,
  raw_payload       JSONB,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_filings_case ON filings(case_id);
CREATE INDEX IF NOT EXISTS idx_filings_date ON filings(filing_date DESC);

-- ============================================================================
-- Table: opinions
-- ============================================================================
CREATE TABLE IF NOT EXISTS opinions (
  id              BIGSERIAL PRIMARY KEY,
  case_id         BIGINT REFERENCES cases(id) ON DELETE SET NULL,
  opinion_date    DATE,
  title           TEXT,
  author          TEXT,
  citation        TEXT,
  source_url      TEXT,
  text_content    TEXT,
  raw_payload     JSONB,
  source_name     TEXT DEFAULT 'courtlistener',
  source_record_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(source_name, source_record_id)
);

CREATE INDEX IF NOT EXISTS idx_opinions_case ON opinions(case_id);
CREATE INDEX IF NOT EXISTS idx_opinions_date ON opinions(opinion_date DESC);
CREATE INDEX IF NOT EXISTS idx_opinions_author ON opinions(author);

-- Full-text search on opinion text
CREATE INDEX IF NOT EXISTS idx_opinions_fts ON opinions
  USING GIN(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(text_content, '')));

-- ============================================================================
-- Table: case_summaries (AI-generated)
-- ============================================================================
CREATE TABLE IF NOT EXISTS case_summaries (
  id                BIGSERIAL PRIMARY KEY,
  case_id           BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  summary_type      TEXT NOT NULL DEFAULT 'overview', -- overview, claims, procedural, outcome
  summary_text      TEXT NOT NULL,
  model_name        TEXT NOT NULL,                    -- e.g. 'claude-sonnet-4-20250514'
  model_version     TEXT,
  prompt_version    TEXT NOT NULL DEFAULT 'v1',       -- for tracking prompt iterations
  confidence_notes  TEXT,                             -- caveats about incomplete data
  generated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(case_id, summary_type, prompt_version)
);

CREATE INDEX IF NOT EXISTS idx_case_summaries_case ON case_summaries(case_id);
CREATE INDEX IF NOT EXISTS idx_case_summaries_type ON case_summaries(summary_type);

-- ============================================================================
-- Table: case_tags (AI-generated or source-derived)
-- ============================================================================
CREATE TABLE IF NOT EXISTS case_tags (
  id            BIGSERIAL PRIMARY KEY,
  case_id       BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  tag           TEXT NOT NULL,
  tag_category  TEXT NOT NULL,                     -- practice_area, claim_type, procedural_stage, subject_matter
  source        TEXT NOT NULL DEFAULT 'ai',        -- ai, source, manual
  confidence    REAL,                              -- 0.0 to 1.0 for AI-generated tags
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(case_id, tag, tag_category)
);

CREATE INDEX IF NOT EXISTS idx_case_tags_case ON case_tags(case_id);
CREATE INDEX IF NOT EXISTS idx_case_tags_tag ON case_tags(tag);
CREATE INDEX IF NOT EXISTS idx_case_tags_category ON case_tags(tag_category);

-- ============================================================================
-- Table: ingestion_jobs (pipeline run tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS ingestion_jobs (
  id                BIGSERIAL PRIMARY KEY,
  source_name       TEXT NOT NULL,
  job_type          TEXT NOT NULL,                  -- backfill, incremental, enrich_summaries, enrich_tags
  status            TEXT NOT NULL DEFAULT 'running', -- running, completed, failed, cancelled
  started_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at      TIMESTAMPTZ,
  records_fetched   INTEGER DEFAULT 0,
  records_inserted  INTEGER DEFAULT 0,
  records_updated   INTEGER DEFAULT 0,
  records_skipped   INTEGER DEFAULT 0,
  error_message     TEXT,
  metadata          JSONB DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ingestion_jobs_source ON ingestion_jobs(source_name);
CREATE INDEX IF NOT EXISTS idx_ingestion_jobs_status ON ingestion_jobs(status);
CREATE INDEX IF NOT EXISTS idx_ingestion_jobs_started ON ingestion_jobs(started_at DESC);

-- ============================================================================
-- Auto-update triggers for updated_at columns
-- ============================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['courts','cases','case_sources','parties','filings','opinions','case_summaries','case_tags','ingestion_jobs']
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%s_updated_at ON %I; CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      tbl, tbl, tbl, tbl
    );
  END LOOP;
END;
$$;
