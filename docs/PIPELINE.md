# MyCaseValue Data Pipeline

Production ingestion, normalization, and AI enrichment pipeline for federal court records.

## Architecture

```
Sources (CourtListener, RECAP, FJC, EDGAR, Federal Register)
    |
    v
Source Connectors (lib/pipeline/sources/)
    |  - Fetch raw records with rate limiting and retry
    |  - Preserve raw payloads for auditability
    v
Normalization (lib/pipeline/db.ts)
    |  - Map source records to canonical schema
    |  - Deduplicate by external_case_key (court:docket_number)
    |  - Upsert without overwriting with nulls
    v
Canonical Schema (Supabase PostgreSQL)
    |  - courts, cases, case_sources, parties, filings, opinions
    |  - case_summaries, case_tags (AI-generated)
    |  - ingestion_jobs (tracking)
    v
AI Enrichment (lib/pipeline/ai/enrichment.ts)
    |  - Summaries via Claude (Anthropic API)
    |  - Tags with controlled vocabulary
    |  - Provenance: model name, prompt version, confidence notes
    v
Data Access Layer (lib/pipeline/data-access.ts)
    |  - searchCases(), getCaseDetail(), getRecentCases()
    |  - Clean typed interfaces for frontend consumption
    v
Frontend (Next.js pages and API routes)
```

## Quick Start

### 1. Apply the schema migration

Run in Supabase SQL editor or via CLI:

```sql
-- File: supabase/migrations/20260415_canonical_case_schema.sql
```

### 2. Seed sample data (no API keys needed)

```bash
npx tsx scripts/pipeline.ts seed
```

This inserts 5 sample courts and 5 realistic federal cases with parties, summaries, and tags.

### 3. Run ingestion from CourtListener

Requires `COURTLISTENER_API_TOKEN` in `.env.local`.

```bash
# Ingest 20 recent dockets
npx tsx scripts/pipeline.ts ingest:courtlistener --limit 20

# Incremental sync (only records modified since date)
npx tsx scripts/pipeline.ts ingest:courtlistener --since 2025-01-01 --limit 100
```

### 4. Run AI enrichment

Requires `ANTHROPIC_API_KEY` in `.env.local`.

```bash
# Generate summaries for cases without one
npx tsx scripts/pipeline.ts enrich:summaries --limit 10

# Generate tags
npx tsx scripts/pipeline.ts enrich:tags --limit 10

# Both
npx tsx scripts/pipeline.ts enrich:all --limit 10
```

### 5. Full pipeline

```bash
npx tsx scripts/pipeline.ts run:full --limit 50
```

## Commands

| Command | Description |
|---|---|
| `ingest:courtlistener` | Fetch dockets from CourtListener API |
| `ingest:all` | Fetch from all registered sources |
| `enrich:summaries` | Generate AI case summaries (Claude) |
| `enrich:tags` | Generate AI classification tags |
| `enrich:all` | Run both summary and tag enrichment |
| `run:full` | Full pipeline: ingest all + enrich all |
| `seed` | Insert sample development data |

### Options

- `--limit N` - Maximum records to process (default varies by command)
- `--since YYYY-MM-DD` - Only fetch records modified after this date

## Environment Variables

| Variable | Required For | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | All operations | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | All operations | Supabase service role key (bypasses RLS) |
| `COURTLISTENER_API_TOKEN` | Ingestion | CourtListener API token (free at courtlistener.com) |
| `ANTHROPIC_API_KEY` | Enrichment | Anthropic API key for Claude |
| `ADMIN_DATA_QUALITY_TOKEN` | API route | Auth token for POST /api/pipeline |

## Schema

### Canonical Tables

- **courts** - Federal court registry (94 districts + appellate)
- **cases** - Canonical case records, deduplicated by `external_case_key`
- **case_sources** - Provenance: links each case to its source records with raw payloads
- **parties** - Named parties with roles (plaintiff, defendant, etc.)
- **filings** - Docket entries
- **opinions** - Judicial opinions with full text
- **case_summaries** - AI-generated summaries with model/prompt version tracking
- **case_tags** - AI-generated or manual classification tags
- **ingestion_jobs** - Job run history with counters and error tracking

### Deduplication Strategy

Cases are deduplicated by `external_case_key`, which is constructed as:

```
{court_abbreviation}:{docket_number}
```

Both values are lowercased and whitespace-stripped. Example: `sdny:1:23-cv-01346`

When a case already exists:
- Non-null fields from the new source update the existing record
- Source provenance is always preserved (case_sources table)
- Conflicting values from multiple sources are preserved in raw_payload

### AI Enrichment Provenance

Every AI-generated summary and tag stores:
- `model_name` - Which model generated it (e.g., `claude-sonnet-4-20250514`)
- `prompt_version` - Version string for the prompt template (e.g., `v1`)
- `confidence_notes` - Caveats about data completeness
- `generated_at` - Timestamp

Regeneration: Change `PROMPT_VERSION` in `lib/pipeline/ai/enrichment.ts` and re-run enrichment. The upsert key includes prompt_version, so new versions don't overwrite old ones.

## API Route

```
POST /api/pipeline
Authorization: Bearer <ADMIN_DATA_QUALITY_TOKEN>
Content-Type: application/json

{
  "command": "ingest:courtlistener",
  "options": { "limit": 20 }
}
```

## File Structure

```
lib/pipeline/
  index.ts              - Barrel exports
  types.ts              - All type definitions
  db.ts                 - Database operations (upsert, dedup, queries)
  runner.ts             - Top-level job orchestrator
  seed.ts               - Sample data for development
  data-access.ts        - Frontend query interface
  sources/
    courtlistener.ts    - CourtListener API connector
  ai/
    enrichment.ts       - AI summary and tag generation (Anthropic)

scripts/
  pipeline.ts           - CLI entry point

app/api/pipeline/
  route.ts              - HTTP API for triggering jobs

supabase/migrations/
  20260415_canonical_case_schema.sql  - Schema migration

docs/
  PIPELINE.md           - This file
```

## Source Connector Status

| Source | Status | Notes |
|---|---|---|
| CourtListener (Dockets) | Implemented | Docket fetch + normalize, rate limited |
| CourtListener (Opinions) | Implemented | Fetch + normalize, not yet wired to runner |
| RECAP | Scaffolded (existing) | Existing code in lib/ingestion/recap.ts |
| FJC IDB | Scaffolded (existing) | Existing code in lib/ingestion/fjc.ts, aggregate stats |
| Federal Register | Scaffolded (existing) | Basic client in lib/legal/legal-data-clients.ts |
| EDGAR | Scaffolded (existing) | Basic client in lib/legal/legal-data-clients.ts |
| PACER | Not implemented | Requires paid account; use RECAP/CourtListener instead |
