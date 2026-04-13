/**
 * MyCaseValue Legal Data Integration Schema
 *
 * PostgreSQL migration for Supabase
 * Enables pgvector extension for semantic search with embeddings
 * Includes full-text search indexes for legal documents
 *
 * Run with:
 *   psql -f supabase-schema.sql postgresql://user:pass@host:5432/db
 *
 * Or in Supabase SQL editor:
 *   Copy entire contents into SQL editor and execute
 */

-- ============================================================================
-- Extensions
-- ============================================================================

-- Enable pgvector for vector similarity search
-- Required for semantic search with embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Full-text search and JSON operators already available in PostgreSQL


-- ============================================================================
-- Table: legal_documents
-- ============================================================================
-- Primary table for storing documents from all sources
-- Stores document content and metadata with flexible JSONB field

CREATE TABLE IF NOT EXISTS legal_documents (
  id BIGSERIAL PRIMARY KEY,

  -- Source identification
  -- Unique constraint on (source, source_id) prevents duplicates
  source TEXT NOT NULL,
  source_id TEXT NOT NULL,
  UNIQUE(source, source_id),

  -- Document content
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,

  -- Flexible metadata storage
  -- JSON structure varies by source (see architecture doc for examples)
  metadata JSONB DEFAULT '{}',

  -- Processing status tracks ingestion progress
  processing_status TEXT NOT NULL DEFAULT 'pending',
  -- Status values: pending, processing, complete, failed

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  indexed_at TIMESTAMPTZ, -- When embeddings were generated

  -- Audit trail
  indexed_by TEXT -- Which service generated embeddings
);

-- Index for source lookups
CREATE INDEX IF NOT EXISTS idx_legal_documents_source
  ON legal_documents(source, source_id);

-- Index for recent documents (common query)
CREATE INDEX IF NOT EXISTS idx_legal_documents_created
  ON legal_documents(created_at DESC);

-- Index for status tracking
CREATE INDEX IF NOT EXISTS idx_legal_documents_status
  ON legal_documents(processing_status);

-- Full-text search index for keyword queries
-- Includes both title and content with title weighted higher
CREATE INDEX IF NOT EXISTS idx_legal_documents_fts
  ON legal_documents USING GIN(
    to_tsvector('english', title || ' ' || content)
  );

-- JSONB index for metadata queries
-- Allows efficient filtering by source-specific metadata
CREATE INDEX IF NOT EXISTS idx_legal_documents_metadata
  ON legal_documents USING GIN(metadata);

-- Index for indexed_at to find documents awaiting embedding
CREATE INDEX IF NOT EXISTS idx_legal_documents_indexed_at
  ON legal_documents(indexed_at NULLS FIRST);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_legal_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER legal_documents_updated_at
  BEFORE UPDATE ON legal_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_legal_documents_updated_at();


-- ============================================================================
-- Table: legal_citations
-- ============================================================================
-- Tracks legal citations between documents
-- Supports citation extraction and enables citation network analysis

CREATE TABLE IF NOT EXISTS legal_citations (
  id BIGSERIAL PRIMARY KEY,

  -- Source document (document containing the citation)
  source_document_id BIGINT NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,

  -- Cited document (document being cited, if found in our database)
  cited_document_id BIGINT REFERENCES legal_documents(id) ON DELETE SET NULL,

  -- Citation text as written in source
  citation_text TEXT NOT NULL,

  -- Citation type classification
  citation_type TEXT NOT NULL,
  -- Types: 'case', 'statute', 'regulation', 'constitutional', 'rule', 'administrative'

  -- Parsed citation components
  -- Reporter is the publication (e.g., "F.3d", "U.S.", "S.Ct.")
  reporter TEXT,
  volume INT,
  page INT,

  -- Short form citations (e.g., "Id.", "Supra note 5")
  short_form TEXT,

  -- Normalization for citation matching
  is_normalized BOOLEAN DEFAULT FALSE,
  normalized_citation TEXT, -- Canonical form like "42 U.S.C. Â§ 1983"

  -- Context for understanding the citation
  context_text TEXT, -- Surrounding sentence containing citation

  -- Additional metadata
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for finding citations in a document
CREATE INDEX IF NOT EXISTS idx_citations_source_doc
  ON legal_citations(source_document_id);

-- Index for finding documents that cite a reference
CREATE INDEX IF NOT EXISTS idx_citations_cited_doc
  ON legal_citations(cited_document_id);

-- Index for citation type queries
CREATE INDEX IF NOT EXISTS idx_citations_type
  ON legal_citations(citation_type);

-- Index for normalized citation matching
CREATE INDEX IF NOT EXISTS idx_citations_normalized
  ON legal_citations(normalized_citation);

-- Full-text search for citation text
CREATE INDEX IF NOT EXISTS idx_citations_full_text
  ON legal_citations USING GIN(
    to_tsvector('english', citation_text)
  );


-- ============================================================================
-- Table: document_embeddings
-- ============================================================================
-- Vector embeddings for semantic search
-- One record per document chunk to handle long documents
-- Uses 768-dimensional vectors from SentenceTransformer

CREATE TABLE IF NOT EXISTS document_embeddings (
  id BIGSERIAL PRIMARY KEY,

  -- Document reference
  document_id BIGINT NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,

  -- Chunk information for long documents
  -- Enables granular similarity search and retrieval
  chunk_index INT NOT NULL,
  chunk_text TEXT NOT NULL,

  -- Vector embedding (768 dimensions from SentenceTransformer)
  -- Uses vector type from pgvector extension
  embedding vector(768) NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Unique constraint: one embedding per document chunk
CREATE UNIQUE INDEX IF NOT EXISTS idx_embeddings_doc_chunk
  ON document_embeddings(document_id, chunk_index);

-- Vector similarity index using IVFFlat
-- Good balance of speed and memory for 100k+ vectors
-- Use with: ORDER BY embedding <=> query_embedding LIMIT k
-- Note: IVFFlat requires exact search to check some neighbors
CREATE INDEX IF NOT EXISTS idx_embeddings_ivfflat
  ON document_embeddings USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100); -- Tune: more lists = slower build but more accurate

-- Alternative: HNSW index for better performance on huge datasets
-- Uncomment if you have > 1M embeddings
-- CREATE INDEX IF NOT EXISTS idx_embeddings_hnsw
--   ON document_embeddings USING hnsw (embedding vector_cosine_ops)
--   WITH (m = 16, ef_construction = 64);

-- Index for efficient document-specific lookups
CREATE INDEX IF NOT EXISTS idx_embeddings_document_id
  ON document_embeddings(document_id);


-- ============================================================================
-- Table: data_source_sync
-- ============================================================================
-- Tracks synchronization state for each external data source
-- Enables resumable ingestion and prevents duplicate processing

CREATE TABLE IF NOT EXISTS data_source_sync (
  id BIGSERIAL PRIMARY KEY,

  -- Source identification (unique per source)
  source_name TEXT NOT NULL UNIQUE,
  -- Examples: 'courtlistener', 'federal_register', 'ecfr', 'edgar', 'caselaw', 'canlii'

  -- Sync timing
  last_synced_at TIMESTAMPTZ,
  next_sync_at TIMESTAMPTZ,

  -- Pagination cursor for resumable ingestion
  -- Format depends on API:
  --   - Offset-based: numeric offset
  --   - Cursor-based: opaque string
  --   - Date-based: ISO 8601 timestamp
  cursor TEXT,

  -- Sync status
  status TEXT NOT NULL DEFAULT 'idle',
  -- Statuses: idle, syncing, success, partial_success, failed

  -- Error information for debugging
  error_message TEXT,
  retry_count INT DEFAULT 0,
  last_error_at TIMESTAMPTZ,

  -- Source-specific configuration
  config JSONB DEFAULT '{}',
  -- Example structure:
  -- {
  --   "page_size": 100,
  --   "rate_limit_per_second": 2,
  --   "retry_max_attempts": 3,
  --   "batch_size": 50,
  --   "enabled": true,
  --   "priority": 1
  -- }

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for status queries
CREATE INDEX IF NOT EXISTS idx_sync_source
  ON data_source_sync(source_name);

CREATE INDEX IF NOT EXISTS idx_sync_status
  ON data_source_sync(status);

-- Index for scheduled sync queries
CREATE INDEX IF NOT EXISTS idx_sync_next
  ON data_source_sync(next_sync_at NULLS LAST);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_data_source_sync_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER data_source_sync_updated_at
  BEFORE UPDATE ON data_source_sync
  FOR EACH ROW
  EXECUTE FUNCTION update_data_source_sync_updated_at();


-- ============================================================================
-- Table: embedding_queue
-- ============================================================================
-- Optional: Tracks documents pending embedding generation
-- Alternative to checking NULL in document_embeddings

CREATE TABLE IF NOT EXISTS embedding_queue (
  id BIGSERIAL PRIMARY KEY,

  -- Document awaiting embedding
  document_id BIGINT NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,

  -- Queue status
  status TEXT NOT NULL DEFAULT 'pending',
  -- Statuses: pending, processing, complete, failed

  -- Batch tracking
  batch_id TEXT, -- For batch operations
  attempted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Error tracking
  error_message TEXT,
  retry_count INT DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_embedding_queue_status
  ON embedding_queue(status);

CREATE INDEX IF NOT EXISTS idx_embedding_queue_document
  ON embedding_queue(document_id);

CREATE INDEX IF NOT EXISTS idx_embedding_queue_created
  ON embedding_queue(created_at);

-- Optional trigger for updated_at
CREATE OR REPLACE FUNCTION update_embedding_queue_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER embedding_queue_updated_at
  BEFORE UPDATE ON embedding_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_embedding_queue_updated_at();


-- ============================================================================
-- Views for Common Queries
-- ============================================================================

-- View: Documents pending embedding
CREATE OR REPLACE VIEW v_documents_pending_embedding AS
SELECT
  d.id,
  d.source,
  d.source_id,
  d.title,
  LENGTH(d.content) as content_length,
  d.created_at
FROM legal_documents d
LEFT JOIN document_embeddings e ON d.id = e.document_id
WHERE d.processing_status = 'complete'
AND e.id IS NULL
ORDER BY d.created_at DESC;

-- View: Citation statistics by source
CREATE OR REPLACE VIEW v_citation_statistics AS
SELECT
  d.source,
  c.citation_type,
  COUNT(*) as citation_count,
  COUNT(DISTINCT c.source_document_id) as documents_citing,
  COUNT(DISTINCT c.cited_document_id) as unique_cited
FROM legal_documents d
JOIN legal_citations c ON d.id = c.source_document_id
GROUP BY d.source, c.citation_type
ORDER BY d.source, c.citation_type;

-- View: Source ingestion status
CREATE OR REPLACE VIEW v_source_status AS
SELECT
  source_name,
  status,
  last_synced_at,
  next_sync_at,
  retry_count,
  error_message,
  updated_at
FROM data_source_sync
ORDER BY next_sync_at NULLS LAST, source_name;

-- View: Document processing progress
CREATE OR REPLACE VIEW v_processing_status AS
SELECT
  source,
  processing_status,
  COUNT(*) as count,
  COUNT(CASE WHEN indexed_at IS NULL THEN 1 END) as not_embedded,
  ROUND(100.0 * COUNT(CASE WHEN indexed_at IS NOT NULL THEN 1 END)
    / NULLIF(COUNT(*), 0), 2) as embedding_percentage
FROM legal_documents
GROUP BY source, processing_status
ORDER BY source, processing_status;


-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================
-- Enable RLS for multi-tenant scenarios
-- Disable by default for development; enable in production

-- ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE legal_citations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE document_embeddings ENABLE ROW LEVEL SECURITY;

-- Example policy for authenticated users to read all documents:
-- CREATE POLICY "Users can read all documents"
--   ON legal_documents FOR SELECT
--   TO authenticated
--   USING (true);

-- Example policy for service role to manage all data:
-- CREATE POLICY "Service role has full access"
--   ON legal_documents
--   TO service_role
--   USING (true)
--   WITH CHECK (true);


-- ============================================================================
-- Materialized Views for Performance (Optional)
-- ============================================================================
-- Pre-compute expensive aggregations
-- Refresh periodically: REFRESH MATERIALIZED VIEW CONCURRENTLY mv_citation_graph;

-- Citation network analysis
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_citation_graph AS
SELECT
  c.source_document_id,
  c.cited_document_id,
  COUNT(*) as citation_count,
  MAX(c.created_at) as last_cited_at,
  ARRAY_AGG(DISTINCT c.citation_type) as citation_types
FROM legal_citations c
WHERE c.cited_document_id IS NOT NULL
GROUP BY c.source_document_id, c.cited_document_id;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_citation_graph
  ON mv_citation_graph(source_document_id, cited_document_id);

-- Most cited documents
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_most_cited_documents AS
SELECT
  cited_document_id,
  COUNT(DISTINCT source_document_id) as times_cited,
  COUNT(*) as total_citations,
  d.title,
  d.source,
  d.source_id
FROM legal_citations c
JOIN legal_documents d ON c.cited_document_id = d.id
WHERE c.cited_document_id IS NOT NULL
GROUP BY c.cited_document_id, d.title, d.source, d.source_id
ORDER BY times_cited DESC;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_most_cited
  ON mv_most_cited_documents(cited_document_id);


-- ============================================================================
-- Initial Data Setup
-- ============================================================================
-- Insert default sync entries for known sources

INSERT INTO data_source_sync (source_name, status, config)
VALUES
  ('courtlistener', 'idle', '{"page_size": 100, "rate_limit_per_second": 1, "enabled": true}'::jsonb),
  ('federal_register', 'idle', '{"page_size": 100, "rate_limit_per_second": 1, "enabled": true}'::jsonb),
  ('ecfr', 'idle', '{"page_size": 100, "rate_limit_per_second": 2, "enabled": true}'::jsonb),
  ('edgar', 'idle', '{"page_size": 100, "rate_limit_per_second": 4, "enabled": true}'::jsonb),
  ('caselaw', 'idle', '{"page_size": 100, "rate_limit_per_second": 0.5, "enabled": true}'::jsonb),
  ('canlii', 'idle', '{"page_size": 100, "rate_limit_per_second": 1, "enabled": false}'::jsonb),
  ('govinfo', 'idle', '{"page_size": 100, "rate_limit_per_second": 1, "enabled": false}'::jsonb)
ON CONFLICT (source_name) DO NOTHING;


-- ============================================================================
-- Permissions & Roles (For Production)
-- ============================================================================
-- Create specialized roles for application access

-- Service role for background jobs (Inngest)
-- Already created by Supabase; can be referenced as 'service_role'

-- Read-only role for frontend queries
-- CREATE ROLE legal_reader WITH NOINHERIT;
-- GRANT SELECT ON legal_documents, legal_citations, document_embeddings TO legal_reader;
-- GRANT SELECT ON v_documents_pending_embedding, v_citation_statistics TO legal_reader;

-- Admin role for migrations and maintenance
-- CREATE ROLE legal_admin WITH NOINHERIT;
-- GRANT ALL ON legal_documents, legal_citations, document_embeddings TO legal_admin;
-- GRANT ALL ON data_source_sync, embedding_queue TO legal_admin;
-- GRANT ALL ON SCHEMA public TO legal_admin;


-- ============================================================================
-- Comments & Documentation
-- ============================================================================

COMMENT ON TABLE legal_documents IS 'Primary table storing documents from all legal data sources with flexible JSONB metadata';
COMMENT ON TABLE legal_citations IS 'Citation relationships between documents enabling citation network analysis';
COMMENT ON TABLE document_embeddings IS 'Vector embeddings for semantic search using pgvector (768-dim SentenceTransformer)';
COMMENT ON TABLE data_source_sync IS 'Sync state tracking per source for resumable incremental ingestion';
COMMENT ON COLUMN legal_documents.source IS 'Source system identifier (courtlistener, federal_register, etc.)';
COMMENT ON COLUMN legal_documents.metadata IS 'JSON field for source-specific data; schema varies by source';
COMMENT ON COLUMN document_embeddings.embedding IS 'Vector embedding from SentenceTransformer; use vector operators like <=> for similarity';
COMMENT ON COLUMN data_source_sync.cursor IS 'Pagination cursor for resumable ingestion; format depends on API type';
