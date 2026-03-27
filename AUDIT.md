# MyCaseValue — Pre-Build Audit
**Date:** 2026-03-27
**Auditor:** Claude (Automated)

## File/Route/Component Map

### Pages & Routes
- `app/page.tsx` — Homepage (client, dynamic imports MyCaseValue)
- `app/layout.tsx` — Root layout, metadata, JSON-LD
- `app/error.tsx` — Error boundary page
- `app/global-error.tsx` — Global error handler

### API Routes
- `app/api/data/route.ts` — Main data API (stats, case, circuits, states, trending, outcomes, judges, freshness)
- `app/api/summary/route.ts` — Static summary (hardcoded 4168590 cases)
- `app/api/ingest/route.ts` — Data ingestion cron endpoint
- `app/api/stripe/checkout/route.ts` — Stripe checkout session creation
- `app/api/stripe/verify/route.ts` — Payment verification
- `app/api/stripe/webhook/route.ts` — Stripe webhook handler

### Components
- `components/MyCaseValue.tsx` (~4700+ lines) — MONOLITH: entire app in one component
- `components/ErrorBoundary.tsx` — React error boundary
- `components/providers/LanguageContext.tsx` — Language context
- `components/providers/ThemeContext.tsx` — Theme context
- `components/sections/DataPreviewSection.tsx` — Data preview
- `components/sections/FaqSection.tsx` — FAQ accordion
- `components/sections/FinalCtaSection.tsx` — Final CTA
- `components/sections/TrustBar.tsx` — Trust indicators
- `components/ui/Accordion.tsx` — Accordion component
- `components/ui/AnimatedNumber.tsx` — Counter animation
- `components/ui/Button.tsx` — Button component
- `components/ui/Card.tsx` — Card component
- `components/ui/Icons.tsx` — SVG icon system
- `components/ui/Logo.tsx` — Brand logo
- `components/ui/PieChart.tsx` — Pie/donut chart
- `components/ui/SectionBadge.tsx` — Section badge
- `components/ui/USMap.tsx` — US map visualization

### Libraries
- `lib/data.ts` — Static data, case types (SITS), mock data, UPL copy
- `lib/i18n.ts` — EN/ES translations (context-based, not route-based)
- `lib/realdata.ts` — Real case data from FJC/CourtListener (20 NOS codes, 4.1M+ cases)
- `lib/supabase.ts` — Supabase client + TypeScript types
- `lib/useData.ts` — Data fetching hook
- `lib/schema.sql` — Database schema
- `lib/ingestion/` — CourtListener, FJC, RECAP, orchestrator

## Current Architecture Issues

1. **Monolith component**: MyCaseValue.tsx is ~4700 lines — entire wizard, report, pricing, legal pages all in one file
2. **Single-page app**: No real routing — everything is state-driven within one page component
3. **Font loading**: Uses render-blocking Google Fonts `<link>` tag, not `next/font`
4. **Tailwind config**: Still references old design tokens (Newsreader serif, gold colors, cream backgrounds)
5. **Static fallbacks**: `/api/summary` returns hardcoded values, not from Supabase
6. **No separate pages**: No /methodology, /districts, /search routes
7. **Client-only**: Entire app wrapped in `dynamic(..., { ssr: false })` — no SSR benefits
8. **Loading spinner**: Uses old gold/cream/Newsreader branding (page.tsx lines 20-32)

## Visual Issues (from screenshot)
- Hero counter shows "0.0M+" instead of "4.2M+" — animated number starting from 0 not animating
- "yours" italic text looks good in blue
- Right column floating card looks professional
- UPL banner present at top ("INFORMATIONAL TOOL ONLY — NOT LEGAL ADVICE")
- Logo renders correctly with new blue mark
- Background still has slight cream tint (should be pure #F5F7FA)

## Supabase Schema (confirmed tables)
- `case_stats` — Core stats per NOS code
- `outcome_distributions` — Outcome breakdowns per NOS
- `money_distributions` — Settlement bracket distributions
- `circuit_stats` — Per-circuit aggregates
- `state_stats` — Per-state aggregates
- `trending_case_types` — Trending filings
- `ingestion_log` — ETL run history
- `stats_cache` — Cached homepage stats
- `judge_stats` — Judge-level stats
- `opinions` — CourtListener opinions

## Dependencies
```
next: ^14.2.0
react: ^18.3.0
@supabase/supabase-js: ^2.100.1
stripe: ^21.0.1
node-cron: ^4.2.1
tailwindcss: ^3.4.0
typescript: 5.9.3
```

Missing: recharts (needed for charts), next/font (should replace <link> tags)

## i18n System
- Context-based (not route-based /en/ /es/)
- `TRANSLATIONS` object in `lib/i18n.ts` with EN and ES keys
- Accessed via `const t = TRANSLATIONS[lang]`
- `lang` state managed in MyCaseValue component
- Pattern: `{lang === 'es' ? 'Spanish text' : 'English text'}` for inline strings

## Stripe Config
- Plans: Free basic, $5.99 single, $9.99 unlimited
- Payment methods: card, paypal (with fallback)
- Missing env vars: STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET

## Key Priorities for Overhaul
1. Convert to next/font for Outfit + JetBrains Mono
2. Extend Tailwind design system with proper tokens
3. Fix loading spinner to match new brand
4. Break monolith into proper page routes
5. Add recharts for data visualization
6. Build real /methodology, /districts pages
7. Implement proper search with URL state
8. Add confidence band / data quality system
9. Full EN/ES audit
10. SEO metadata per page
