# MyCaseValue

Federal court data analytics platform surfacing win rates, settlement data, and judicial patterns from 5.1M+ cases.

## Features

### Case Analytics
- **Win Rate Analysis** — Historical outcomes by case type, judge, and district
- **Settlement Patterns** — Distribution of settlement amounts and timing
- **Judicial Comparisons** — Judge-specific outcome patterns and tendencies
- **Decision Support** — Case strength assessment and predictive analytics

### Attorney Tools
- **Bulk Case Analysis** — Import and analyze multiple cases at once
- **Demand Letter Generator** — AI-powered document creation
- **Judge Intelligence** — Judicial voting patterns and preferences
- **Venue Optimizer** — Strategic jurisdiction analysis
- **Motion Analytics** — Success rates for different motion types
- **Deposition Prep** — Expert witness and opposing counsel research
- **Discovery Generator** — Automated discovery document suggestions

### Accessibility & Compliance
- **Multi-language Support** — English and Spanish
- **Dark Mode** — Automatic light/dark theme switching
- **UPL Compliance** — 8-layer disclaimers and legal safeguards
- **Responsive Design** — Mobile, tablet, and desktop optimized
- **Internationalization** — Per-page translation with next-intl

### Data & Integrations
- **5.1M+ Federal Cases** — From FJC IDB and CourtListener
- **Real-time Updates** — Quarterly FJC data refresh, daily case filings
- **API Access** — RESTful endpoints for programmatic use
- **PDF Export** — Client-side generation of case reports
- **Email Notifications** — Resend-powered transactional emails

## Getting Started

### Prerequisites
- **Node.js** 18 or higher
- **npm** 9 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/casecheck-next.git
   cd casecheck-next
   ```

2. **Copy environment variables**
   ```bash
   cp .env.example .env.local
   ```

3. **Fill in required environment variables**
   ```bash
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ANTHROPIC_API_KEY=your_anthropic_key
   RESEND_API_KEY=your_resend_key
   COURTLISTENER_API_TOKEN=your_courtlistener_token
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   SENTRY_AUTH_TOKEN=your_sentry_auth_token
   REVALIDATION_SECRET=your_32_char_random_string
   BLS_API_KEY=your_bls_key
   ADMIN_DATA_QUALITY_TOKEN=your_admin_token
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router, ISR, Edge Middleware) |
| **Language** | TypeScript |
| **UI Framework** | React 18 |
| **Styling** | Tailwind CSS |
| **State Management** | Zustand |
| **Database** | Supabase (PostgreSQL) |
| **Caching** | Upstash Redis |
| **Visualization** | D3.js, Recharts |
| **Animations** | Framer Motion |
| **AI** | Anthropic Claude API + Vercel AI SDK |
| **Email** | Resend |
| **Background Jobs** | Inngest |
| **Hosting** | Vercel |
| **Monitoring** | Sentry, PostHog, Vercel Analytics |
| **Testing** | Playwright |
| **Internationalization** | next-intl |

See **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for comprehensive architecture details.

## Running Scripts

### Data Verification
Verify database integrity and data quality:
```bash
npm run verify-data
```

### Backup Validation
Test database backup restoration:
```bash
npm run verify-backup
```

### Load Testing
Run performance tests to check capacity:
```bash
npm run load-test
```

## Key Files & Directories

- **`app/`** — Next.js pages and API routes
- **`components/`** — React components (charts, UI, admin tools)
- **`lib/`** — Utility functions, API clients, data loaders
- **`store/`** — Zustand state management
- **`inngest/`** — Background job definitions
- **`messages/`** — i18n translation files
- **`scripts/`** — Development utilities and verification scripts
- **`docs/`** — Documentation

## Documentation

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — System architecture, tech stack, design decisions
- **[docs/runbook.md](docs/runbook.md)** — Operational procedures and troubleshooting
- **[docs/load-test-results.md](docs/load-test-results.md)** — Performance benchmarks

## Environment Variables

### Required
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role (server-side only)
- `ANTHROPIC_API_KEY` — Claude API key for AI features
- `RESEND_API_KEY` — Resend email API key
- `UPSTASH_REDIS_REST_URL` — Upstash Redis endpoint
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis auth token

### Optional but Recommended
- `COURTLISTENER_API_TOKEN` — CourtListener data (free tier available)
- `NEXT_PUBLIC_SENTRY_DSN` — Sentry error tracking
- `SENTRY_AUTH_TOKEN` — Sentry authentication
- `BLS_API_KEY` — Bureau of Labor Statistics inflation data
- `ADMIN_DATA_QUALITY_TOKEN` — Admin dashboard access

### ISR & Revalidation
- `REVALIDATION_SECRET` — 32-character random string for on-demand revalidation

See [.env.example](.env.example) for the complete template.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run end-to-end tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui
```

## API Routes

All API routes require proper authentication and rate limiting. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#api-route-architecture) for details.

### Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /api/ai/search` | Semantic case search with Claude |
| `GET /api/attorney/case-predictor` | Predict case outcomes |
| `POST /api/attorney/demand-letter` | Generate demand letters |
| `GET /api/courtlistener/opinions` | Fetch case opinions |
| `POST /api/admin/data-quality` | Data integrity checks |

## Deployment

### Vercel
The app is optimized for deployment on Vercel with automatic deployments from GitHub.

```bash
npx vercel
```

### Self-hosted
For self-hosted deployment:
1. Build: `npm run build`
2. Deploy the `.next` folder to your server
3. Set all environment variables
4. Run: `npm start`

**Note**: ISR and Edge Middleware require Vercel or compatible edge computing platform.

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test: `npm run test:e2e`
3. Commit: `git commit -am 'Add new feature'`
4. Push: `git push origin feature/my-feature`
5. Create a Pull Request

## License

[Specify your license here - MIT, Apache 2.0, etc.]

## Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check [docs/runbook.md](docs/runbook.md) for troubleshooting
- Review [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system details

## Attribution

Built with:
- **FJC IDB** — Federal Judicial Center case statistics
- **CourtListener** — Free legal data platform (RECAP Archive)
- **Anthropic Claude** — Natural language AI
- **Supabase** — Open-source Firebase alternative
- **Vercel** — Next.js-optimized hosting
- **D3.js** — Data visualization library
