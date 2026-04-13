# MyCaseValue Legal Integration - Quick Reference Checklist

## Pre-Implementation Checklist

- [ ] Have Next.js 14 project with TypeScript configured
- [ ] Supabase account created (or PostgreSQL instance ready)
- [ ] Upstash Redis account created
- [ ] Inngest account created and key generated
- [ ] Docker & Docker Compose installed locally
- [ ] API keys obtained:
  - [ ] CourtListener: https://www.courtlistener.com/api/rest/v4/
  - [ ] case.law: https://case.law/api/
  - [ ] CanLII: https://www.canlii.org/en/api/ (optional)
- [ ] npm packages ready to install (@supabase, @upstash/redis, inngest, node-fetch)

---

## Phase 1: Foundation (Weeks 1-2)

### Database Setup
- [ ] Create new Supabase project
- [ ] Copy `supabase-schema.sql` contents
- [ ] Paste into Supabase SQL editor and execute
- [ ] Verify tables created:
  - [ ] legal_documents
  - [ ] legal_citations
  - [ ] document_embeddings
  - [ ] data_source_sync
  - [ ] embedding_queue
- [ ] Verify indexes and views created
- [ ] Enable pgvector extension (should be automatic)

### Environment Variables
- [ ] Create `.env.local` file
- [ ] Add Supabase keys:
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] Add Upstash Redis:
  - [ ] UPSTASH_REDIS_REST_URL
  - [ ] UPSTASH_REDIS_REST_TOKEN
- [ ] Add Inngest:
  - [ ] INNGEST_KEY
  - [ ] INNGEST_SIGNING_KEY
- [ ] Add API keys:
  - [ ] COURTLISTENER_API_KEY
  - [ ] CASELAW_API_KEY
  - [ ] CANLII_API_KEY (optional)
- [ ] Add Microservice URLs:
  - [ ] DOCTOR_SERVICE_URL=http://localhost:5050
  - [ ] INCEPTION_SERVICE_URL=http://localhost:8005
  - [ ] EYECITE_SERVICE_URL=http://localhost:5002

### Dependency Installation
```bash
npm install @supabase/supabase-js @upstash/redis inngest node-fetch
npm install --save-dev @types/node-fetch
```
- [ ] Verify installations complete without errors

### Code Integration
- [ ] Copy `legal-data-clients.ts` â `lib/legal-data-clients.ts`
- [ ] Copy `legal-ingestion.ts` â `lib/legal-ingestion.ts`
- [ ] Copy `eyecite-service.ts` â `lib/eyecite-service.ts`
- [ ] Create Inngest setup if not already done:
  - [ ] Create `lib/inngest.ts` with Inngest client
  - [ ] Create `app/api/inngest/route.ts` to expose Inngest

### API Client Testing
```typescript
import { initializeLegalClients } from "@/lib/legal-data-clients";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const clients = initializeLegalClients(redis);

// Test each client
const opinions = await clients.courtListener.searchOpinions("patent", { limit: 1 });
const frDocs = await clients.federalRegister.searchDocuments({ pageSize: 1 });
const ecfrTitles = await clients.ecfr.getTitles();
```
- [ ] All API clients return data without errors
- [ ] Rate limiting doesn't block requests
- [ ] Response caching works (check Redis keys)

---

## Phase 2: Document Processing (Weeks 3-4)

### Microservice Deployment
- [ ] Copy `docker-compose.legal.yml` to project root
- [ ] Create `init-db.sql` for PostgreSQL setup (optional)
- [ ] Start services:
  ```bash
  docker-compose -f docker-compose.legal.yml up -d
  ```
- [ ] Verify services are running:
  - [ ] `docker ps` shows all 3 services
  - [ ] `curl http://localhost:5050/health` returns 200
  - [ ] `curl http://localhost:8005/health` returns 200
  - [ ] `curl http://localhost:5432` with psql works

### Service Health Checks
- [ ] doctor service (port 5050)
  - [ ] Accepts document uploads
  - [ ] Returns processing status
  - [ ] Extracts text correctly (test with PDF)
- [ ] inception service (port 8005)
  - [ ] Generates embeddings
  - [ ] Returns 768-dimensional vectors
  - [ ] Batch processing works (multiple texts)
- [ ] PostgreSQL (port 5432, local only)
  - [ ] Can connect with psql
  - [ ] Tables exist and are empty

### eyecite-service Testing
```typescript
import { eyeciteService } from "@/lib/eyecite-service";

const text = "See 42 U.S.C. Â§ 1983 and Smith v. Jones, 123 F.3d 456.";
const citations = await eyeciteService.extractCitations(text);
const embedding = await eyeciteService.generateEmbedding(text);
const health = await eyeciteService.healthCheck();
```
- [ ] Citation extraction returns results
- [ ] Embeddings generated with 768 dimensions
- [ ] Health check reports services available
- [ ] Services timeout gracefully if unavailable

---

## Phase 3: Ingestion Setup (Weeks 5-6)

### Inngest Function Deployment
- [ ] Export all functions in `lib/legal-ingestion.ts`
- [ ] Create `app/api/inngest/route.ts`:
  ```typescript
  import {
    ingestCourtListenerOpinions,
    ingestFederalRegister,
    processDocumentPipeline,
    generateEmbeddings,
    dailyFederalRegisterSync,
    weeklyCourtListenerSync,
    dailyEmbeddingSync,
  } from "@/lib/legal-ingestion";

  export const runtime = "nodejs";
  export const dynamic = "force-dynamic";

  // Serve Inngest functions
  export default handler;
  ```
- [ ] Deploy to Vercel
- [ ] Verify Inngest can see functions in dashboard

### Initial Data Ingestion
- [ ] Trigger Federal Register sync (1 day):
  ```typescript
  await inngest.send({
    name: "legal/ingest-federal-register",
    data: { daysBack: 1, pageSize: 100 },
  });
  ```
- [ ] Monitor job in Inngest dashboard
- [ ] Verify documents inserted into Supabase:
  ```sql
  SELECT COUNT(*) FROM legal_documents WHERE source = 'federal_register';
  ```
- [ ] Check document content populated (not just title)

### Document Processing Pipeline
- [ ] Verify process-document-pipeline job works
- [ ] Create test document in Supabase
- [ ] Trigger pipeline for test doc
- [ ] Check for:
  - [ ] Document marked as 'complete'
  - [ ] Citations inserted into legal_citations table
  - [ ] Embeddings inserted into document_embeddings table
  - [ ] indexed_at timestamp updated

### Sync Status Tracking
- [ ] Verify data_source_sync table has entries for all sources
- [ ] Check last_synced_at timestamps update
- [ ] Confirm cursor positions tracked (if using paginated APIs)
- [ ] Test manual cursor reset and re-ingestion

### Monitoring Setup
- [ ] Set up Inngest dashboard alerts
- [ ] Monitor error rates in Inngest
- [ ] Check Supabase logs for slow queries
- [ ] Verify no rate limiting errors in Redis

---

## Phase 4: Search & UI (Weeks 7-8)

### Full-Text Search
```sql
-- Test full-text search
SELECT id, title, ts_rank_cd(tsvector, query) as rank
FROM legal_documents,
     plainto_tsquery('english', 'patent infringement') query
WHERE to_tsvector('english', title || ' ' || content) @@ query
LIMIT 10;
```
- [ ] Full-text search returns relevant results
- [ ] Performance acceptable (< 100ms)
- [ ] Ranking by relevance works

### Vector Semantic Search
```sql
-- Test embedding similarity search
SELECT d.id, d.title, 1 - (e.embedding <=> query_embedding) as similarity
FROM legal_documents d
JOIN document_embeddings e ON d.id = e.document_id
WHERE 1 - (e.embedding <=> query_embedding) > 0.75
LIMIT 10;
```
- [ ] Vector search returns semantically similar documents
- [ ] Similarity scores reasonable (0.7+)
- [ ] Performance acceptable

### Citation Network
```sql
-- Test citation relationships
SELECT c.source_document_id, c.cited_document_id, COUNT(*) as times_cited
FROM legal_citations c
GROUP BY c.source_document_id, c.cited_document_id
HAVING COUNT(*) > 1
LIMIT 10;
```
- [ ] Citations properly resolved
- [ ] Citation networks identify key cases

### API Routes
- [ ] Create `/api/search/legal` endpoint
- [ ] Implement full-text + vector hybrid search
- [ ] Add filtering (source, date range, citation type)
- [ ] Test endpoint performance
- [ ] Add result highlighting/snippeting

### React Components
- [ ] Create `components/LegalSearch.tsx`
- [ ] Build search input with autocomplete
- [ ] Display search results with:
  - [ ] Document title and source
  - [ ] Brief content snippet
  - [ ] Relevance score
  - [ ] Citation count
- [ ] Create `components/LegalDocument.tsx` for detail view
- [ ] Add citation network visualization (optional)

### Performance Testing
- [ ] Load test with 10,000+ documents
- [ ] Measure search response times:
  - [ ] Full-text search: should be < 100ms
  - [ ] Vector similarity: should be < 1s
  - [ ] Combined: should be < 1.5s
- [ ] Test pagination with large result sets
- [ ] Monitor database query performance

### Production Optimization
- [ ] Enable read replicas in Supabase (if available)
- [ ] Optimize frequently run queries
- [ ] Implement response caching in Redis
- [ ] Consider materialized views for complex queries
- [ ] Set up auto-scaling if needed

---

## Scheduled Jobs Setup

- [ ] dailyFederalRegisterSync
  - [ ] Scheduled for 8 AM UTC
  - [ ] Runs automatically each day
  - [ ] Monitor in Inngest dashboard

- [ ] weeklyCourtListenerSync
  - [ ] Scheduled for Monday 9 AM UTC
  - [ ] Fetches past 7 days of opinions
  - [ ] Handles pagination across weeks

- [ ] dailyEmbeddingSync
  - [ ] Scheduled for 10 PM UTC (off-peak)
  - [ ] Processes 500 documents per run
  - [ ] Generates embeddings for complete documents

- [ ] Test Schedule Triggers
  - [ ] Manually trigger each job
  - [ ] Verify all run successfully
  - [ ] Check Inngest dashboard for execution times

---

## Monitoring Dashboard

Create SQL queries for monitoring:

```sql
-- Overall ingestion progress
SELECT source, processing_status, COUNT(*) as count
FROM legal_documents
GROUP BY source, processing_status;

-- Documents pending embedding
SELECT COUNT(*) as pending_embeddings
FROM legal_documents
WHERE processing_status = 'complete'
AND id NOT IN (SELECT DISTINCT document_id FROM document_embeddings);

-- Sync status by source
SELECT source_name, status, last_synced_at, error_message
FROM data_source_sync
ORDER BY last_synced_at DESC;

-- Citation statistics
SELECT citation_type, COUNT(*) as count
FROM legal_citations
GROUP BY citation_type;

-- Most cited documents
SELECT d.title, d.source, COUNT(*) as citation_count
FROM legal_citations c
JOIN legal_documents d ON c.cited_document_id = d.id
GROUP BY c.cited_document_id, d.title, d.source
ORDER BY citation_count DESC
LIMIT 20;
```

- [ ] Create monitoring dashboard in Supabase
- [ ] Set up daily email with stats
- [ ] Alert on sync failures
- [ ] Track document processing rate

---

## Performance Benchmarks

Target metrics to achieve:

| Metric | Target | Status |
|--------|--------|--------|
| API response time | < 100ms | [ ] |
| Full-text search | < 100ms | [ ] |
| Vector search (10k docs) | < 1s | [ ] |
| Document processing | 100+ docs/min | [ ] |
| Embedding generation | 30+ docs/min (CPU) | [ ] |
| Inngest job success rate | > 99% | [ ] |
| Data source sync rate | 100% | [ ] |
| Database query optimization | < 50ms | [ ] |

---

## Deployment Checklist

### Pre-Production
- [ ] All environment variables configured
- [ ] Database backups working
- [ ] Redis key eviction policy set (LRU)
- [ ] Inngest functions deployed
- [ ] Docker images tagged and tested
- [ ] SSL/TLS certificates valid

### Vercel Deployment
- [ ] Add environment variables to Vercel project
- [ ] Deploy Next.js application
- [ ] Verify Inngest endpoint accessible
- [ ] Test API routes from production URL
- [ ] Verify no sensitive data in logs

### Production Services
- [ ] doctor deployed with load balancer (if needed)
- [ ] inception deployed with GPU support (if available)
- [ ] PostgreSQL on managed service (RDS, Supabase Cloud)
- [ ] Upstash Redis configured with backup
- [ ] Monitoring and alerting enabled

### Security
- [ ] Rotate all API keys
- [ ] Enable RLS policies in Supabase
- [ ] Set up audit logging
- [ ] Configure firewall rules
- [ ] Enable 2FA on all admin accounts
- [ ] Document data retention policy

---

## Troubleshooting Checklist

If services aren't working:

**Docker Services Won't Start**
- [ ] Check `docker logs myCaseValue-doctor`
- [ ] Verify ports 5050, 8005, 5432 available
- [ ] Check disk space for images
- [ ] Rebuild images: `docker-compose build --no-cache`

**API Client Returns 401/403**
- [ ] Verify API keys in environment variables
- [ ] Check API key hasn't expired
- [ ] Confirm token format (add "Token " prefix for CourtListener)
- [ ] Check rate limit not exceeded

**Embeddings Not Generated**
- [ ] Verify inception service running: `curl http://localhost:8005/health`
- [ ] Check document has content (not empty)
- [ ] Monitor inception logs for memory issues
- [ ] Reduce BATCH_SIZE if out of memory

**Search Returns No Results**
- [ ] Verify documents inserted: `SELECT COUNT(*) FROM legal_documents;`
- [ ] Check full-text search index: `SELECT * FROM legal_documents LIMIT 1;`
- [ ] Test search manually in SQL editor
- [ ] Verify query syntax correct

**Slow Database Queries**
- [ ] Check index usage: `EXPLAIN ANALYZE [query]`
- [ ] Monitor Supabase dashboard for slow queries
- [ ] Consider materialized views for aggregations
- [ ] Add read replicas for search workload

**Inngest Jobs Failing**
- [ ] Check Inngest dashboard for error messages
- [ ] Verify all dependencies available (Redis, DB, services)
- [ ] Check rate limiting not blocking requests
- [ ] Review job logs for specific errors
- [ ] Test function locally before deployment

---

## Compliance Verification

- [ ] Attribution displayed for CC-BY sources (CourtListener, Oyez, CanLII)
- [ ] CanLII data only shown to non-commercial users
- [ ] Data retention policy documented (recommend 7 years)
- [ ] GDPR right-to-be-forgotten implemented
- [ ] Terms of Service updated explaining data sources
- [ ] No PII stored in documents
- [ ] Audit logs maintained for 1 year minimum

---

## Estimated Timeline

| Phase | Weeks | Key Milestones |
|-------|-------|---|
| 1. Foundation | 1-2 | Database ready, API clients working |
| 2. Processing | 3-4 | Microservices deployed, document pipeline tested |
| 3. Ingestion | 5-6 | Inngest jobs running, automated syncs active |
| 4. Search UI | 7-8 | Search API and UI components live |

**Total**: 8 weeks from start to production

---

## Success Criteria (Definition of Done)

### Phase 1
- [ ] 50,000+ documents in Supabase
- [ ] All API clients tested and working
- [ ] Rate limiting verified

### Phase 2
- [ ] Sample documents processed end-to-end
- [ ] Citations extracted and normalized
- [ ] Embeddings generated successfully

### Phase 3
- [ ] Inngest jobs executing on schedule
- [ ] No missed document syncs
- [ ] Less than 1% job failure rate

### Phase 4
- [ ] Search API response time < 100ms average
- [ ] Search results relevant to queries
- [ ] Citation network analysis working
- [ ] UI components integrated in frontend

---

## Support Resources

| Resource | Link |
|----------|------|
| eyecite GitHub | https://github.com/freelawproject/eyecite |
| doctor GitHub | https://github.com/freelawproject/doctor |
| FreeLaw Project | https://www.freelawproject.org |
| CourtListener API | https://www.courtlistener.com/api/rest/v4 |
| Supabase Docs | https://supabase.com/docs |
| Inngest Docs | https://www.inngest.com/docs |
| Upstash Redis | https://upstash.com/docs |
| pgvector | https://github.com/pgvector/pgvector |

---

## Final Validation

Before going live:

```bash
# 1. Test all components
curl http://localhost:5050/health
curl http://localhost:8005/health
psql postgresql://... -c "SELECT COUNT(*) FROM legal_documents;"

# 2. Verify Inngest
curl https://api.inngest.com/v1/apps

# 3. Check Supabase
curl -H "Authorization: Bearer TOKEN" https://xxx.supabase.co/rest/v1/legal_documents?limit=1

# 4. Run sample search
curl -X POST http://localhost:3000/api/search/legal \
  -d '{"query":"patent infringement"}'

# 5. Monitor system
# Check Inngest dashboard
# Check Supabase metrics
# Check Redis memory usage
```

All checkboxes complete? **You're ready for production!** â
