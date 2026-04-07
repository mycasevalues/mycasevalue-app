# MyCaseValue Architecture Documentation

**MyCaseValue** is a federal court data analytics platform surfacing win rates, settlement data, and judicial patterns from 5.1M+ cases. This document provides a comprehensive overview of the system architecture, tech stack, and key design decisions.

## Project Overview

MyCaseValue enables users to:
- Retrieve case outcome data and win rates for specific case types and judges
- Analyze settlement patterns and recovery ranges
- Understand judicial tendencies and historical patterns
- Access attorney tools for research, case strength assessment, and decision support
- Conduct bulk case analysis and venue optimization

## Tech Stack

### Core Framework
- **Next.js 14** — React framework with App Router, ISR (Incremental Static Regeneration), Edge Middleware
- **TypeScript** — Strict type checking (currently not in strict mode, but used throughout)
- **React 18** — UI library with hooks and concurrent features

### Backend & Database
- **Supabase** (PostgreSQL + Auth + Realtime + Edge Functions)
  - PostgreSQL for relational data (cases, judges, attorneys, jurisdictions)
  - Auth for user authentication and API key management
  - Realtime subscriptions for live data updates
  - Edge Functions for third-party API calls with secure key management
- **Upstash Redis** — Distributed caching, rate limiting, session management
  - Global edge network for low-latency caching
  - Cost-effective alternative to in-memory databases

### Deployment & Edge Computing
- **Vercel** — Hosting platform with built-in optimizations
  - ISR for pre-rendered pages with automatic revalidation
  - Edge Middleware for request interception and authentication
  - Vercel Blob for file storage (PDFs, exports)
  - Vercel KV (backed by Redis) for caching
  - Vercel Analytics for performance monitoring
  - Speed Insights for Core Web Vitals tracking

### AI & Language Models
- **Anthropic Claude API** — Natural language processing
  - Semantic search across case filings and opinions
  - Jargon translation for accessibility
  - Document analysis and summarization
  - Research memo and demand letter generation
  - Judge intelligence and motion analytics
- **Vercel AI SDK** — Unified API abstraction for streaming and chat

### External Data Sources
- **CourtListener REST API v4** — Federal case data
  - Case filings, opinions, dockets
  - Attorney information and track records
  - Judge information and voting patterns
  - Real-time document feeds
- **FJC IDB (Federal Judicial Center)** — Federal statistics
  - Quarterly case disposition data
  - Judge statistics and caseload information
  - Court statistics and trends
- **BLS CPI-U** — Bureau of Labor Statistics inflation data
  - Inflation adjustment layer for historical cases

### Background Jobs & Scheduling
- **Inngest** — Event-driven background job orchestration
  - Step functions that span multiple serverless invocations
  - Quarterly FJC data refresh pipeline
  - Avoids serverless timeout limits (typical 15-30 minutes)
  - Reliable error handling and retries

### Email & Communications
- **Resend** — Transactional email service
  - HTML email templates with React components
  - Delivery tracking and analytics
  - Bounce and complaint handling

### Monitoring & Analytics
- **Sentry** — Error tracking and monitoring
  - Client-side, server-side, and edge error capture
  - Release tracking and version management
  - Performance monitoring for slow transactions
- **PostHog** — Product analytics
  - User behavior tracking
  - Feature flag management
  - Session recording (optional)
  - A/B testing infrastructure

### Visualization & UI
- **D3.js v7** — Data visualization library
  - Custom radar charts for judicial comparisons
  - Violin plots for settlement distributions
  - Choropleth maps for geographic analysis
  - Sparklines for trend indicators
  - Stacked bar charts for case breakdowns
  - Sankey diagrams for data flows
- **Recharts** — React charting library (complementary to D3)
  - Line charts for time series
  - Pie/donut charts for composition
  - Area charts for stacked data
- **Framer Motion** — Animation library
  - Respects prefers-reduced-motion for accessibility
  - Smooth page transitions
  - Micro-interactions and micro-animations

### State Management & Storage
- **Zustand** — Lightweight client-side state management
  - Minimal boilerplate compared to Redux
  - Built-in localStorage persistence for user preferences
  - Stores: inflation adjustments, research context, UI state, user settings

### Document & Export Generation
- **jsPDF** — Client-side PDF generation
  - Avoids server memory pressure from processing PDFs
  - Generates case reports, demand letters, discovery documents
  - Browser-based generation for instant feedback
- **docx** — Node.js Word document generation
  - Export case data and analysis to .docx format

### File Handling
- **File Saver** — Cross-browser file download support
- **TopoJSON** — Geographic data format for choropleth maps

### Internationalization
- **next-intl** — Multi-language support
  - English and Spanish translations
  - Middleware-based locale detection
  - Per-page translation namespacing
  - 200+ translation keys

### Development & Testing
- **Playwright** — End-to-end testing framework
  - Headless browser testing
  - Visual regression testing
  - Test utilities for forms, navigation, API calls
- **TypeScript** — Compile-time type checking
- **Tailwind CSS** — Utility-first CSS framework
  - Custom design tokens (colors, spacing, typography)
  - Dark mode support with automatic switching
  - Responsive design utilities

### CI/CD
- **GitHub Actions** — Automated testing and deployment
  - E2E tests on pull requests
  - Type checking with TypeScript
  - Build verification before merge

## Architecture Patterns

### Data Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│ External Data Sources                                       │
├─────────────────┬──────────────┬──────────────┬────────────┤
│ FJC IDB Data    │ CourtListener│ BLS CPI-U    │ Judge Data │
└────────┬────────┴──────┬───────┴──────┬───────┴─────┬──────┘
         │               │              │            │
         ▼               ▼              ▼            ▼
┌────────────────────────────────────────────────────────────┐
│ Inngest Quarterly Pipeline / API Routes                    │
│ (Data validation, transformation, enrichment)              │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│ Supabase PostgreSQL (Primary Data Store)                   │
│ - cases, judges, attorneys, settlements                    │
│ - judicial patterns, district data                         │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│ Upstash Redis Cache (Hot Data)                            │
│ - Frequently accessed queries                              │
│ - Rate limit counters                                      │
│ - Session state                                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│ ISR Pages / API Routes (Vercel Edge Network)               │
│ - Pre-rendered HTML with 90-day revalidation               │
│ - Real-time API endpoints for dynamic data                │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│ End User (Browser / Client)                                │
│ - Interactive UI with D3 visualizations                    │
│ - Client-side PDF generation with jsPDF                    │
└────────────────────────────────────────────────────────────┘
```

### Request Flow for Case Data

1. **User Request**: User navigates to `/nos/[code]` (nature of suit page) or searches
2. **ISR Cache Check**: Vercel checks if pre-rendered page is fresh (within 90 days)
3. **If Fresh**: Serve cached HTML from edge
4. **If Stale**:
   - Trigger server-side revalidation
   - Fetch data from Supabase (via Redis cache if available)
   - Fetch supplementary data from CourtListener API (via Supabase Edge Functions)
   - Generate static HTML
   - Update ISR cache
   - Return to user
5. **Client Hydration**: React hydrates page, enables interactivity
6. **Real-time Updates**: Supabase Realtime subscriptions stream live case updates

### API Route Architecture

All API routes follow a consistent pattern:

```
app/api/[domain]/[resource]/route.ts
├── Middleware (authentication, rate limiting)
├── Request validation (Zod schemas)
├── Business logic
├── Error handling (Sentry)
├── Analytics tracking (PostHog)
└── Response formatting
```

**Key API domains:**
- `/api/attorney/*` — Attorney tools (case analysis, research, bulk operations)
- `/api/ai/*` — Anthropic Claude integration (search, streaming)
- `/api/courtlistener/*` — CourtListener data proxying
- `/api/admin/*` — Admin operations (data quality, stats)
- `/api/analytics/*` — Analytics event tracking
- `/api/cron/*` — Scheduled tasks and webhooks

### Component Architecture

**Organizational Structure:**
```
components/
├── charts/                 # D3 & Recharts visualizations
│   ├── RadarChart.tsx
│   ├── ViolinPlot.tsx
│   ├── Choropleth.tsx
│   └── SankeyDiagram.tsx
├── layout/                 # Page layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── Navigation.tsx
├── ui/                     # Reusable UI primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   └── Badge.tsx
├── i18n/                   # Internationalization components
│   ├── LanguageSwitcher.tsx
│   └── TranslatedContent.tsx
├── admin/                  # Admin dashboard components
│   ├── DataQualityStatus.tsx
│   ├── CostAnalyzer.tsx
│   └── StatsPanel.tsx
├── AIChat.tsx              # Claude API integration
├── CaseStrengthAssessment.tsx  # Attorney tool
├── DemandPackageGenerator.tsx   # Document generation
└── ...                     # ~95 other components
```

### State Management

**Zustand Stores:**
- `store/inflation.ts` — BLS CPI-U inflation data and adjustments
- `store/research.ts` — Case research context and search history
- `store/ui.ts` — Dark mode, sidebar state, modal visibility
- `store/user.ts` — Current user, authentication, preferences

Example store pattern:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'ui-store', // localStorage key
    }
  )
)
```

## Key Architectural Decisions

### 1. ISR Over SSR for Pre-rendered Pages

**Decision**: Use Incremental Static Regeneration (ISR) with 90-day revalidation for static pages.

**Rationale**:
- Case outcome data changes slowly (quarterly FJC updates)
- Pre-rendered pages are globally cached at Vercel edge
- Eliminates cold start times for database queries
- 90-day revalidation balances freshness and cache efficiency
- On-demand revalidation via `/api/revalidate` for urgent updates

**Trade-off**: Newer cases appear after revalidation window, but this is acceptable since users expect historical data.

### 2. Supabase Edge Functions for API Calls

**Decision**: Use Supabase Edge Functions for third-party API calls (CourtListener).

**Rationale**:
- API keys stay server-side and never exposed to client
- Edge Functions run globally close to data
- Easier credential rotation and auditing
- Can be invoked from Inngest jobs or API routes

**Example**:
```typescript
// supabase/functions/courtlistener-search/index.ts
const response = await fetch(
  `https://www.courtlistener.com/api/rest/v3/opinions/?${query}`,
  {
    headers: {
      'Authorization': `Token ${Deno.env.get('COURTLISTENER_API_TOKEN')}`,
    },
  }
)
```

### 3. Upstash Redis for Distributed Caching

**Decision**: Use Upstash Redis instead of in-memory caching or database query caching.

**Rationale**:
- Global edge distribution (caches closer to users)
- Serverless-friendly (no connection pooling needed)
- Cost-effective for low-to-medium traffic
- Automatic TTL management for cache expiration
- Rate limiting with sliding window counters

**Use Cases**:
- CourtListener API response caching (24-hour TTL)
- Judge comparison stats (7-day TTL)
- Search result ranking (1-hour TTL)
- Rate limit counters (per-minute sliding window)

### 4. Inngest for Quarterly Data Refresh

**Decision**: Use Inngest step functions for FJC IDB quarterly data pipeline.

**Rationale**:
- Data import takes >30 minutes (exceeds Vercel serverless timeout)
- Step functions retry individual steps on failure
- Built-in error handling and observability
- Can chain multiple operations without maintaining state
- Avoids writing complex queue systems

**Pipeline**:
```
1. Fetch FJC IDB quarterly file from EOUSA
2. Parse CSV and validate schema
3. Validate against previous quarter (integrity checks)
4. Transform and denormalize for queries
5. Upsert into Supabase in batches
6. Calculate aggregate statistics
7. Refresh materialized views
8. Clear Redis cache
9. Send completion email via Resend
```

### 5. Client-Side PDF Generation

**Decision**: Generate PDFs client-side using jsPDF instead of on server.

**Rationale**:
- Avoids server memory pressure
- Instant user feedback (no API latency)
- Works offline (optional feature)
- jsPDF handles most common layouts
- Browser APIs for canvas rendering

**Trade-off**: Limited formatting control compared to server-side libraries, but acceptable for data reports.

### 6. D3.js Over Recharts for Custom Visualizations

**Decision**: Use D3.js for complex, custom visualizations; Recharts for standard charts.

**Rationale**:
- D3 provides full control over rendering and interactions
- Judges comparison radar chart requires D3 (Recharts can't do it)
- Settlement distribution violin plots need D3
- Choropleth maps need D3 with TopoJSON
- Recharts covers 80% of chart types with less code

**Decision Matrix**:
| Chart Type | Library |
|---|---|
| Line, area, bar | Recharts |
| Pie, donut | Recharts |
| Radar (custom) | D3.js |
| Violin plot | D3.js |
| Choropleth | D3.js + TopoJSON |
| Sankey | D3.js |
| Sparklines | D3.js |

### 7. Supabase Auth with API Keys for Attorneys

**Decision**: Use Supabase Auth for end-users, API keys for attorney bulk operations.

**Rationale**:
- Supabase Auth handles OAuth, email verification, session management
- Separate API keys for programmatic access (bulk analysis, integrations)
- Keys scoped to user, logged for auditing
- Easy key rotation and revocation

## Directory Structure

```
casecheck-next/
├── app/                              # Next.js App Router
│   ├── globals.css                  # Design system, animations
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   ├── about/                       # About pages
│   ├── admin/                       # Admin dashboard
│   ├── api/                         # API routes (RESTful endpoints)
│   │   ├── attorney/                # Attorney tools
│   │   ├── ai/                      # Claude integration
│   │   ├── courtlistener/           # CourtListener proxying
│   │   ├── analytics/               # Analytics events
│   │   ├── cron/                    # Scheduled tasks
│   │   └── [catchall]/              # Error handling
│   ├── nos/[code]/                  # Nature of suit detail pages
│   ├── tools/                       # Decision support tools
│   ├── [locale]/                    # i18n locale pages
│   └── ...                          # Other routes
├── components/                       # React components (~95 files)
│   ├── charts/                      # D3 & Recharts visualizations
│   ├── layout/                      # Page layout
│   ├── ui/                          # UI primitives
│   ├── i18n/                        # i18n components
│   ├── admin/                       # Admin components
│   ├── AIChat.tsx                   # Claude chat interface
│   ├── CaseStrengthAssessment.tsx  # Attorney assessment tool
│   ├── DemandPackageGenerator.tsx   # Letter generation
│   └── ...                          # Other components
├── lib/                              # Utility functions & clients
│   ├── api-*.ts                     # API client helpers
│   ├── courtlistener.ts             # CourtListener REST client
│   ├── data.ts                      # Core data types & constants
│   ├── cache.ts                     # Cache layer (Redis)
│   ├── email.ts                     # Email templates
│   ├── generatePDF.ts               # PDF generation helpers
│   ├── bls.ts                       # BLS API client
│   └── ...                          # 60+ utility files
├── store/                            # Zustand stores
│   ├── inflation.ts                 # CPI adjustments
│   ├── research.ts                  # Search context
│   ├── ui.ts                        # UI state
│   └── user.ts                      # User preferences
├── inngest/                          # Background jobs
│   └── refresh-fjc-quarterly.ts     # FJC data pipeline
├── scripts/                          # Development scripts
│   ├── verify-data.ts               # Data integrity checks
│   ├── verify-backup.ts             # Database backup validation
│   ├── verify-ssr.ts                # ISR validation
│   └── load-test.js                 # Performance testing
├── data/                             # Static data files
│   ├── *.json                       # Lookup tables, constants
│   └── ...                          # District codes, judge lists
├── docs/                             # Documentation
│   ├── ARCHITECTURE.md              # This file
│   ├── runbook.md                   # Operational runbook
│   └── load-test-results.md         # Performance benchmarks
├── messages/                         # i18n translations
│   ├── en.json                      # English translations
│   ├── es.json                      # Spanish translations
│   └── ...                          # Other locales
├── styles/                           # CSS modules
│   ├── globals.css                  # Global styles
│   ├── animations.css               # Animation definitions
│   └── ...                          # Component-specific styles
├── emails/                           # React email templates
│   ├── CaseReport.tsx               # Case report email
│   ├── DemandLetter.tsx             # Demand letter email
│   └── ...                          # Other templates
├── public/                           # Static assets
│   ├── images/                      # Images, icons
│   ├── fonts/                       # Custom fonts
│   └── ...                          # Other static files
├── e2e/                              # End-to-end tests
│   ├── home.spec.ts                 # Home page tests
│   ├── search.spec.ts               # Search tests
│   └── ...                          # Other tests
├── .github/workflows/                # GitHub Actions
│   ├── test.yml                     # CI/CD workflow
│   └── ...                          # Other workflows
├── .env.example                      # Environment variable template
├── middleware.ts                     # Next.js middleware (auth, locale)
├── next.config.js                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── sentry.*.config.ts               # Sentry error tracking configs
├── playwright.config.ts             # Playwright E2E test config
├── vercel.json                      # Vercel deployment config
├── package.json                     # Dependencies and scripts
└── README.md                        # Project overview
```

## Deployment & Operations

### Vercel Deployment

The project is configured for deployment on Vercel with:
- Automatic deployments from GitHub (main branch → production)
- Preview deployments for pull requests
- Edge Middleware for authentication and locale detection
- ISR pages cached globally at edge locations

**Environment Setup**:
```bash
# vercel.json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "env": [
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "ANTHROPIC_API_KEY",
    // ... other secrets
  ]
}
```

### Data Refresh Cycle

- **Quarterly**: FJC IDB data (via Inngest)
- **Daily**: CourtListener recent filings
- **Hourly**: Judge statistics (from CourtListener)
- **Per-request**: Inflation data from BLS

### Monitoring & Alerts

- **Sentry**: Error tracking, performance monitoring, release tracking
- **PostHog**: User analytics, feature flags, usage patterns
- **Vercel Analytics**: Page load times, web vitals, deployment status
- **Custom Alerts**: Data quality checks, API latency, cache hit rates

## Performance Optimizations

1. **ISR with 90-day revalidation** — Global CDN caching
2. **Redis caching** — Reduces database queries by ~70%
3. **Code splitting** — Automatic route-based splitting in Next.js
4. **Image optimization** — Vercel Image Optimization API
5. **Font loading** — System fonts + self-hosted @fontsource
6. **Bundle analysis** — @next/bundle-analyzer for monitoring
7. **Compression** — Gzip/Brotli via Vercel
8. **Database indexing** — Supabase indexes on frequently queried columns
9. **API rate limiting** — Upstash Redis sliding window counters
10. **Lazy loading** — React.lazy() for heavy components

## Security Considerations

1. **API Keys** — Stored in Supabase Edge Functions, never exposed
2. **Authentication** — Supabase Auth with session tokens
3. **CORS** — Restricted to frontend domain
4. **Rate Limiting** — Upstash Redis per-user sliding window
5. **SQL Injection** — Supabase parameterized queries, Zod validation
6. **XSS Prevention** — React's built-in escaping, CSP headers
7. **CSRF Protection** — Vercel's automatic middleware
8. **Secrets Management** — Vercel Environment Variables (encrypted at rest)

## Related Documentation

- **`docs/runbook.md`** — Operational procedures and troubleshooting
- **`docs/load-test-results.md`** — Performance benchmarks and capacity planning
- **`I18N_FILES_REFERENCE.md`** — Translation keys and localization
- **`IMPLEMENTATION_CHECKLIST.md`** — Feature implementation status
- **`.env.example`** — Required environment variables

## Future Considerations

1. **Database Sharding** — If data volume exceeds Supabase limits
2. **Event Streaming** — Kafka for real-time data pipeline
3. **Vector Search** — Pinecone/Weaviate for semantic search
4. **Multi-region** — Replication for high availability
5. **GraphQL** — Consider for complex queries instead of REST
6. **Caching Strategy** — Implement cache invalidation patterns as queries evolve
