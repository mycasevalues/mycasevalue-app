# MyCaseValue Legal Data Integration - Implementation Guide

## Overview

This package contains production-ready code and documentation for integrating comprehensive legal data sources into your MyCaseValue Next.js 14 application. The architecture supports scalable ingestion, processing, and semantic search of legal documents.

## Deliverables

### 1. **integration-architecture.md**
Comprehensive 6000+ word architecture document covering:
- System overview with ASCII diagram
- Data flow through processing pipeline
- API client layer with rate limiting
- Microservice orchestration (Docker)
- Background job system (Inngest)
- Database schema design
- Caching strategy (Upstash Redis)
- Hybrid search architecture (full-text + vector semantic)
- 4-phase implementation roadmap
- Operational considerations and compliance

**Use this to**: Understand the overall system design, explain architecture to stakeholders, and plan implementation phases.

### 2. **legal-data-clients.ts**
TypeScript API client module (~800 lines) with classes for:
- **CourtListenerClient**: Opinions, dockets, citations, judges (Token auth, 5000 req/hr)
- **FederalRegisterClient**: Rules, notices, agencies (No auth, 1000 req/hr)
- **ECFRClient**: Code of Federal Regulations (No auth, 5000 req/hr)
- **EdgarClient**: SEC filings (No auth, 5 req/sec)
- **CaseLawClient**: Harvard Caselaw Access Project (API Key, 10000 req/day)
- **CanLIIClient**: Canadian legal information (API Key, 5000 req/hr)
- **GovInfoClient**: Government Publishing Office (No auth, 1000 req/hr)

**Features**:
- Distributed rate limiting via Upstash Redis
- Exponential backoff retry logic
- Pagination support (cursor and offset-based)
- Response caching with configurable TTLs
- Full TypeScript typing with JSDoc comments
- Error handling for retryable/non-retryable errors
- Circuit breaker pattern

**Use this to**: Fetch documents from all legal data sources with consistent error handling and rate limiting.

### 3. **docker-compose.legal.yml**
Docker Compose configuration for microservices:
- **doctor**: Document processor (PDF, Word, OCR) on port 5050
- **inception**: Vector embedding generator on port 8005
- **postgres**: Optional local PostgreSQL for development
- Shared network for inter-service communication
- Health checks and resource limits
- Comprehensive comments and configuration options

**Use this to**: Deploy document processing pipeline locally or in staging.

### 4. **legal-ingestion.ts**
Inngest background job definitions (~500 lines) including:
- `ingestCourtListenerOpinions`: Bulk fetch with pagination and rate limiting
- `ingestFederalRegister`: Daily document synchronization
- `processDocumentPipeline`: Orchestrated end-to-end processing:
  1. Download document from URL
  2. Extract text via doctor service
  3. Extract citations via eyecite
  4. Normalize and store citations
  5. Generate embeddings via inception
  6. Insert all data to Supabase
- `generateEmbeddings`: Batch processing for documents without embeddings
- `dailyFederalRegisterSync`: Scheduled daily sync at 8 AM UTC
- `weeklyCourtListenerSync`: Scheduled weekly sync on Mondays
- `dailyEmbeddingSync`: Scheduled embedding generation at 10 PM UTC

**Features**:
- Automatic retry with exponential backoff
- Partial failure handling (failed items don't block success)
- Pagination with cursor tracking
- Rate limiting via Redis
- Full error logging and monitoring
- Step functions for observability

**Use this to**: Automate data ingestion and document processing with reliable background jobs.

### 5. **supabase-schema.sql**
PostgreSQL schema (~600 lines) defining:
- **legal_documents**: Main table for documents from all sources
  - Flexible JSONB metadata
  - Processing status tracking
  - Full-text search index
  - Unique constraint on (source, source_id)

- **legal_citations**: Citation relationships between documents
  - Normalized citation forms for matching
  - Citation type classification
  - Context storage for understanding

- **document_embeddings**: Vector embeddings for semantic search
  - 768-dimensional vectors from SentenceTransformer
  - IVFFlat indexes for similarity search
  - Optional HNSW indexes for large-scale deployments

- **data_source_sync**: Sync state tracking
  - Cursor for resumable ingestion
  - Retry counts and error messages
  - Source-specific configuration

- **embedding_queue**: Optional queue for batch processing

**Additional Features**:
- pgvector extension for vector operations
- Views for common queries (pending embeddings, citations, status)
- Materialized views for expensive aggregations
- RLS templates for multi-tenant scenarios
- Comprehensive indexing and performance optimization
- Role-based access control templates

**Use this to**: Create database tables in Supabase with proper indexing and full-text search.

### 6. **eyecite-service.ts**
TypeScript wrapper for legal citation extraction (~550 lines):
- **extractCitations(text)**: Extract full citations (cases, statutes, regulations)
- **extractShortForms(text)**: Extract short form references (Id., Supra note X)
- **resolveShortForms(text, citations)**: Link short forms to full citations
- **clusterCitations(citations)**: Group same citations for analysis
- **findMostCited(citations, limit)**: Find most frequently cited references
- **generateEmbeddings(texts[])**: Generate 768-dim vectors for text
- **calculateSimilarity(text1, text2)**: Cosine similarity between documents
- **findSimilarTexts(query, candidates)**: Find top-K similar documents
- **analyzeCitationPatterns(documents)**: Citation analysis across corpus
- **healthCheck()**: Service availability monitoring

**Communication**:
- HTTP microservice calls to eyecite (port 5002) and inception (port 8005)
- Batch processing support for efficiency
- Timeout handling and error recovery
- Caches citations extracted for performance

**Use this to**: Extract and analyze legal citations, generate embeddings for semantic search.

---

## Quick Start

### Prerequisites
- Next.js 14 project with TypeScript
- Supabase account (or self-hosted PostgreSQL)
- Upstash Redis account
- Inngest account (free tier available)
- Docker & Docker Compose
- Node.js 18+

### Phase 1: Setup (Week 1-2)

1. **Database**
   ```bash
   # Create new Supabase project
   # Run SQL migrations from supabase-schema.sql
   psql -f supabase-schema.sql postgresql://user@host/db
   ```

2. **Environment Variables**
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=xxx

   UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=xxx

   INNGEST_KEY=xxx
   INNGEST_SIGNING_KEY=xxx

   COURTLISTENER_API_KEY=xxx
   CASELAW_API_KEY=xxx
   CANLII_API_KEY=xxx

   DOCTOR_SERVICE_URL=http://localhost:5050
   INCEPTION_SERVICE_URL=http://localhost:8005
   EYECITE_SERVICE_URL=http://localhost:5002
   ```

3. **Install Dependencies**
   ```bash
   npm install @supabase/supabase-js @upstash/redis inngest node-fetch
   ```

4. **Copy Code Files**
   ```bash
   # Place in your project structure:
   # lib/legal-data-clients.ts
   # lib/legal-ingestion.ts
   # lib/eyecite-service.ts
   ```

5. **Test API Clients**
   ```typescript
   import { initializeLegalClients } from "@/lib/legal-data-clients";
   import { Redis } from "@upstash/redis";

   const redis = new Redis({...});
   const clients = initializeLegalClients(redis);

   // Test CourtListener
   const opinions = await clients.courtListener.searchOpinions("patent");
   console.log(opinions.results.length);
   ```

### Phase 2: Document Processing (Week 3-4)

1. **Start Microservices**
   ```bash
   docker-compose -f docker-compose.legal.yml up -d
   ```

2. **Test Services**
   ```bash
   curl http://localhost:5050/health  # doctor
   curl http://localhost:8005/health  # inception
   ```

3. **Test eyecite Service**
   ```typescript
   import { eyeciteService } from "@/lib/eyecite-service";

   const text = "See 42 U.S.C. Â§ 1983 and Smith v. Jones, 123 F.3d 456.";
   const citations = await eyeciteService.extractCitations(text);
   console.log(citations);
   ```

### Phase 3: Ingestion (Week 5-6)

1. **Deploy Inngest Functions**
   ```typescript
   // In app/inngest/route.ts
   import {
     ingestCourtListenerOpinions,
     ingestFederalRegister,
     processDocumentPipeline,
     dailyFederalRegisterSync,
   } from "@/lib/legal-ingestion";

   // Export for Inngest
   export const inngestFunctions = [
     ingestCourtListenerOpinions,
     ingestFederalRegister,
     processDocumentPipeline,
     dailyFederalRegisterSync,
   ];
   ```

2. **Trigger Initial Ingestion**
   ```typescript
   import { inngest } from "@/lib/inngest";

   // Manual trigger for testing
   await inngest.send({
     name: "legal/ingest-federal-register",
     data: { daysBack: 1 },
   });
   ```

3. **Monitor Jobs**
   - View in Inngest dashboard
   - Check Supabase for inserted documents
   - Monitor Redis cache hit rates

### Phase 4: Search UI (Week 7-8)

1. **Create Search API Route**
   ```typescript
   // app/api/search/legal/route.ts
   import { supabase } from "@/lib/supabase";
   import { eyeciteService } from "@/lib/eyecite-service";

   export async function POST(req: Request) {
     const { query } = await req.json();

     // Full-text search
     const ftResults = await supabase
       .from("legal_documents")
       .select("*")
       .textSearch("content", query)
       .limit(10);

     // Vector semantic search
     const queryEmbedding = await eyeciteService.generateEmbedding(query);
     const vectorResults = await supabase.rpc("match_documents", {
       query_embedding: queryEmbedding,
       match_threshold: 0.75,
       match_count: 10,
     });

     // Merge and rank results
     return Response.json({ results: mergeResults(ftResults, vectorResults) });
   }
   ```

2. **Build Search Components**
   ```typescript
   // components/LegalSearch.tsx
   import { useState } from "react";

   export function LegalSearch() {
     const [query, setQuery] = useState("");
     const [results, setResults] = useState([]);

     const search = async () => {
       const res = await fetch("/api/search/legal", {
         method: "POST",
         body: JSON.stringify({ query }),
       });
       setResults(await res.json());
     };

     return (
       <div>
         <input
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           placeholder="Search legal documents..."
         />
         <button onClick={search}>Search</button>
         {/* Display results */}
       </div>
     );
   }
   ```

---

## Data Source Integration Summary

| Source | API | Auth | Rate Limit | Data Included |
|--------|-----|------|-----------|---------------|
| **CourtListener** | courtlistener.com/api/rest/v4 | Token | 5000/hr | Opinions, dockets, citations, judges |
| **Federal Register** | federalregister.gov/api/v1 | None | 1000/hr | Rules, notices, proposed rules |
| **eCFR** | ecfr.gov/api/versioner/v1 | None | 5000/hr | Code of Federal Regulations |
| **EDGAR** | sec.gov/cgi-bin | None | 5/sec | SEC company filings, forms |
| **case.law** | api.case.law/v1 | Key | 10000/day | 6.7M U.S. case opinions |
| **CanLII** | api.canlii.org | Key | 5000/hr | Canadian cases & legislation |
| **GovInfo** | govinfo.gov/api | None | 1000/hr | Federal government documents |

---

## Performance Optimization Tips

### Redis Caching
```typescript
// Cache highly requested documents
const cacheKey = `doc:${sourceId}`;
const cached = await redis.get(cacheKey);
if (cached) return cached;

const data = await fetchFromAPI();
await redis.setex(cacheKey, 86400, JSON.stringify(data)); // 24h TTL
return data;
```

### Database Query Optimization
```sql
-- Add indexes for your query patterns
CREATE INDEX idx_documents_by_court
  ON legal_documents ((metadata->>'court'))
  WHERE source = 'courtlistener';

-- Use partial indexes for common filters
CREATE INDEX idx_documents_recent
  ON legal_documents(created_at DESC)
  WHERE processing_status = 'complete';
```

### Embedding Batch Processing
```typescript
// Process 100+ documents at once instead of individually
const embeddings = await eyeciteService.generateEmbeddings(
  documents.map(d => d.content)
);

// Reduces API calls and improves throughput
```

### Document Chunking
```typescript
// Split long documents into 2KB chunks for embedding
const chunks = document.content
  .split(/\.\s+/)
  .reduce((acc, sent) => {
    if ((acc[acc.length - 1] || "").length + sent.length < 2048) {
      acc[acc.length - 1] += ". " + sent;
    } else {
      acc.push(sent);
    }
    return acc;
  }, []);
```

---

## Monitoring & Observability

### Inngest Dashboard
- View job status, duration, error rates
- Replay failed jobs
- Analyze queue depth

### Supabase Logs
- Monitor data source sync status
- Track document processing progress
- Alert on failed ingestion

### Redis Monitoring
```typescript
// Monitor rate limiter effectiveness
const stats = await redis.info("stats");
console.log(stats); // Hit rate, evictions, etc.
```

### Application Metrics
```typescript
// Track search performance
const searchMetrics = {
  totalQueries: 0,
  avgResponseTime: 0,
  avgResults: 0,
  citationQueriesMatched: 0,
};
```

---

## Compliance & Legal Notes

### Data Source Licenses
- **CourtListener**: CC BY 4.0 (attribution required)
- **case.law**: Public Domain (CC0)
- **Federal Register**: Public Domain
- **eCFR**: Public Domain
- **EDGAR**: Public Domain
- **CanLII**: CC BY-NC 2.5 (non-commercial only)

**Action Items**:
1. Add attribution footer: "Source: [API name] - [license]"
2. Only display CanLII data to non-commercial users
3. Review CourtListener commercial terms
4. Document data retention policy (recommend: 7 years)

### GDPR/Privacy
- No PII in documents by design
- Implement right-to-be-forgotten (delete document + embeddings)
- Add Terms of Service explaining data sources

---

## Troubleshooting

### Services Won't Start
```bash
# Check service logs
docker logs myCaseValue-doctor
docker logs myCaseValue-inception

# Verify ports available
lsof -i :5050  # doctor
lsof -i :8005  # inception
```

### Rate Limiting Issues
```typescript
// Increase request per second
const rateLimiter = new RateLimiter(redis, {
  requestsPerSecond: 2,  // Increase from 1
  burstCapacity: 20,      // Allow burst
});
```

### Slow Embeddings
```bash
# Use GPU acceleration
docker-compose -f docker-compose.legal.yml up -d
# Set DEVICE=cuda in environment (requires nvidia-docker)
```

### Database Connection Errors
```typescript
// Check connection string
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase.from("legal_documents").select("count");
console.log(error); // Detailed error message
```

---

## Next Steps

1. **Week 1**: Set up database, Redis, environment variables
2. **Week 2**: Test API clients with sample data
3. **Week 3**: Deploy Docker services and test document processing
4. **Week 4**: Run initial data ingestion (smaller dataset first)
5. **Week 5**: Deploy Inngest functions for automated syncing
6. **Week 6**: Build search UI and integrate with frontend
7. **Week 7**: Performance testing and optimization
8. **Week 8**: Production deployment and monitoring

---

## Support & Resources

- **eyecite**: https://github.com/freelawproject/eyecite
- **doctor**: https://github.com/freelawproject/doctor
- **FreeLaw Project**: https://www.freelawproject.org
- **CourtListener API**: https://www.courtlistener.com/api/rest/v4
- **pgvector**: https://github.com/pgvector/pgvector
- **Inngest Docs**: https://www.inngest.com/docs

---

## License

This integration code is provided as-is for use with MyCaseValue. External data sources are governed by their respective licenses (see Compliance section).
