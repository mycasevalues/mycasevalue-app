# MyCaseValue Site Overhaul — Task Log

---

## Phase 1 — Navigation & Header
[DONE] Ph1 · T1.1 — Navigation architecture audit · sha: fc2c7e9
[DONE] Ph1 · T1.2 — COWORK_NOTES.md + TASK_LOG.md created · sha: fc2c7e9
[DONE] Ph1 · T1.3 — Consolidated Header.tsx with mega-dropdown, small dropdowns, auth · sha: fc2c7e9
[DONE] Ph1 · T1.4 — Sticky header with scroll-aware frosted blur · sha: fc2c7e9
[DONE] Ph1 · T1.5 — Mobile hamburger drawer with body scroll lock · sha: fc2c7e9
[DONE] Ph1 · T1.6 — Active page indicators via usePathname() · sha: fc2c7e9
[DONE] Ph1 · T1.7 — Global search in Explore mega-dropdown · sha: fc2c7e9
[DONE] Ph1 · T1.8 — Footer.tsx with 5 columns, bottom bar, disclaimer · sha: fc2c7e9
[DONE] Ph1 · T1.9 — Breadcrumb.tsx auto-generated from pathname · sha: fc2c7e9
[DONE] Ph1 · T1.10 — Skip-to-content link in layout.tsx · sha: fc2c7e9

## Phase 2 — Homepage
[DONE] Ph2 · T2.1 — Hero: "The Federal Court Record. Open to Everyone." · sha: e3e6e98
[DONE] Ph2 · T2.2 — Global search bar on homepage · sha: e3e6e98
[DONE] Ph2 · T2.3 — CTA buttons: Explore All Cases + See How It Works · sha: e3e6e98
[DONE] Ph2 · T2.4 — Trust bar: 4 stats (5.1M+, 94, 84, Public Records) · sha: e3e6e98
[DONE] Ph2 · T2.5 — "Who Uses MyCaseValue" 6 audience cards · sha: e3e6e98
[DONE] Ph2 · T2.6 — "How It Works" 3-step section with anchor · sha: e3e6e98
[DONE] Ph2 · T2.7 — "What Makes This Different" 3 columns · sha: e3e6e98
[DONE] Ph2 · T2.8 — Brand Blue bottom CTA section · sha: e3e6e98
[DONE] Ph2 · T2.9 — Disclaimer line above footer · sha: e3e6e98
[DONE] Ph2 · T2.10 — Homepage mobile/a11y/performance audit · sha: e3e6e98

## Phase 3 — Audience Landing Pages & UX Flows
[DONE] Ph3 · T3.1 — 5 audience landing pages (/for/pro-se, attorneys, researchers, students, paralegals) · sha: e3e6e98
[DONE] Ph3 · T3.2 — New visitor onboarding banner (sessionStorage) · sha: e3e6e98
[DONE] Ph3 · T3.3 — DisclaimerFooter.tsx on all data pages · sha: e3e6e98

## Phase 4 — Production Bug Fixes
[DONE] Ph4 · T4.1 — Fix /judges event handler error · sha: dfb02e0
[DONE] Ph4 · T4.2 — Fix /districts event handler error · sha: dfb02e0
[DONE] Ph4 · T4.3 — Fix /cases/defense-veterans TypeError with optional chaining · sha: dfb02e0
[DONE] Ph4 · T4.4 — Fix /api/admin/ingest-judges 504 with pagination + maxDuration · sha: dfb02e0

## Phase 5 — Brand, Messaging & Content
[DONE] Ph5 · T5.1 — lib/constants.ts with PLATFORM_STATS and PLATFORM_META · sha: dfb02e0
[DONE] Ph5 · T5.2 — Audit and fix plaintiff-only bias in copy · sha: dfb02e0
[DONE] Ph5 · T5.3 — Rewrite Pricing page with tiers, FAQ, CTAs · pending commit
[DONE] Ph5 · T5.4 — Rewrite About page with mission, data sources, audiences · pending commit
[DONE] Ph5 · T5.5 — Audit all page SEO meta tags · sha: dfb02e0

## Phase 6 — Data Integrity
[DONE] Ph6 · T6.1 — Null-guard all case type pages (?., ??, isNaN) · pending commit
[DONE] Ph6 · T6.2 — Data attribution on case/judge/district pages · pending commit
[DONE] Ph6 · T6.3 — Last updated timestamp (April 2026) · pending commit

## Phase 7 — SEO & Indexing
[DONE] Ph7 · T7.1 — robots.txt updated · pending commit
[DONE] Ph7 · T7.2 — sitemap.ts enhanced with audience routes · pending commit
[DONE] Ph7 · T7.3 — JSON-LD verified in layout.tsx (Organization, Dataset, FAQPage) · pending commit
[DONE] Ph7 · T7.4 — GSC_SETUP.md created · pending commit

## Phase 8 — Environment Variables & Integrations
[DONE] Ph8 · T8.1 — Env var audit documented in COWORK_NOTES.md · pending commit
[DONE] Ph8 · T8.2 — lib/env-check.ts boot-time validation · pending commit
[DONE] Ph8 · T8.3 — Stripe CTA audit — all CTAs live · pending commit
[DONE] Ph8 · T8.4 — Contact API route with Resend + ContactForm integration · pending commit

## Phase 9 — Code Quality & Final Verification
[DONE] Ph9 · T9.1 — TypeScript: npx tsc --noEmit passes clean · pending commit
[DONE] Ph9 · T9.2 — Accessibility: skip-to-content, ARIA labels, alt tags verified · sha: fc2c7e9
[DONE] Ph9 · T9.3 — TASK_LOG.md updated with all phases · pending commit

---

Last updated: 2026-04-08
