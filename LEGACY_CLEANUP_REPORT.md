# Legacy Bloomberg Cleanup Report

**Date:** 2026-04-16  
**Session:** 17 — Full Legacy Bloomberg Elimination  
**Build:** Compiled successfully, 0 errors  

---

## Scope

This session completed the full elimination of Bloomberg-era hex colors and comment references across the entire codebase. Prior sessions (1–16) cleaned core pages; this session targeted the ~100 remaining legacy files documented in REPO_AUDIT_REPORT.md (Sessions 15–19 scope).

---

## Before

| Metric | Count |
|---|---|
| Files with Bloomberg hex colors | ~100 |
| Total Bloomberg hex violations | ~314 |
| Bloomberg comment references | 20 across 9 files |
| Centralized format utilities | formatPercentage only |

## After

| Metric | Count |
|---|---|
| Files with Bloomberg hex colors | 0 |
| Total Bloomberg hex violations | 0 |
| Bloomberg comment references | 0 |
| Centralized format utilities | formatPercentage, formatCurrency, formatDuration |

---

## Color Replacement Mapping

| Bloomberg Color | Hex | Westlaw Variable | Westlaw Hex |
|---|---|---|---|
| Orange (CTA) | #E65C00 | var(--gold) | #C4882A |
| Orange hover | #CC5200 / #CC4F00 | var(--gold-hover) | #A87222 |
| Blue (links) | #0052CC | var(--link) | #0A50A2 |
| Blue hover | #003D99 | var(--link-hover) | #083D7A |
| Black (text) | #1A1A1A | var(--text1) | #18181A |
| Surface | #F7F7F5 | var(--surf) | #F6F5F2 |

**Server-side files** (email templates, PDF generation, OG images) use direct Westlaw hex values since CSS custom properties are unavailable.

---

## Files Modified (131 total)

### High-Priority Files (4)
- **lib/email.ts** — 12 violations fixed (header bg, CTA buttons, link colors)
- **app/attorney/page.tsx** — 21 violations fixed (complete Bloomberg conversion)
- **lib/data.ts** — 2 violations fixed (category color constants)
- **lib/generatePDF.ts** — 6 violations fixed (RGB values for PDF rendering)

### JudgeDirectoryClient.tsx Full Audit
- 12 hardcoded hex violations → CSS variables
- 4 border-radius violations (8px→4px, 6px→2px)
- 2 error state blocks converted to var(--danger) tokens

### Marketing Pages (16 files)
- about, contact, how-it-works, data-sources, methodology, platform, integrations
- 8 solutions pages (academic, api, funders, government, individuals, insurance, legal-aid, small-firms)
- es/how-it-works (Spanish)
- **37 violations fixed**

### Case Flow Pages (11 files)
- cases/[category]/[slug], cases/[category]/[slug]/[district], cases/[category]
- results, outcomes/[district]/[case-type], calculator/sol
- nos, nos/[code], odds, report/[nos], search
- **30 violations fixed**

### Spanish Translations & Auth Pages (11 files)
- sign-in, forgot-password, reset-password
- dashboard, dashboard/error, billing/error
- es/ (homepage, disclaimer, faq, how-it-works, pricing, trends)
- **35+ violations fixed**

### Components (33 files)
- MasterDetailLayout, JudgesExplorer, CommandPalette, SearchHero, AudienceCards
- DistrictsExplorer, ServerHero, StatCardBrand, LiveTicker, UpgradeBanner
- CookieConsent, DemoMode, ProductPreview, and 20+ others
- **63 violations fixed**

### API Routes & Error Pages (51 files)
- api/og, api/favicon, api/referral, api/contact, api/admin-costs
- 13 error pages (judges, cases, districts, pricing, attorney, blog, etc.)
- 4 loading pages, 17 page components (privacy, blog, terms, glossary, etc.)
- 5 library files, 2 script files
- **100+ violations fixed**

### Print & Style Files (3 files)
- styles/components.css — 22 changes (Bloomberg→Westlaw in comments)
- styles/print.css — Attribute selectors updated from #E65C00 to #C4882A
- styles/tokens.css — Comment updated

### PDF Capture Components (2 files)
- MethodologyCapture.tsx — RGB darkBlue updated
- ParalegalHandbookCapture.tsx — RGB subheader color updated

---

## Comment References Updated (9 files, 20 changes)

| File | Changes |
|---|---|
| styles/components.css | 10 comment updates (Design System, CTA, Card, Tag, etc.) |
| styles/tokens.css | 1 comment update |
| components/LiveTicker.tsx | "Bloomberg-style" → "Westlaw-style" |
| components/ServerHero.tsx | 2 comment updates |
| components/SearchHero.tsx | 1 comment + "orange" → "gold" |
| components/ui/ResearchBreadcrumb.tsx | 1 comment update |
| components/layout/MasterDetailLayout.tsx | 2 comment updates |
| app/how-it-works/page.tsx | 1 comment update |
| app/globals.css | 1 comment update |

---

## New Utilities Added

**lib/stats.ts** — Added two centralized formatters:

- `formatCurrency(value: number): string` — Formats dollar amounts ($187,200 or $1.2M)
- `formatDuration(months: number): string` — Formats month durations (12 months, 8.3 months)

These join the existing `formatPercentage()` to provide a complete data formatting toolkit.

---

## Verification

| Check | Result |
|---|---|
| `grep -r "#E65C00"` (excluding .md) | 0 matches |
| `grep -r "#0052CC"` (excluding .md) | 0 matches |
| `grep -r "#1A1A1A"` (excluding .md) | 0 matches |
| `grep -r "#F7F7F5"` (excluding .md) | 0 matches |
| `grep -r "#CC5200"` (excluding .md) | 0 matches |
| `grep -r "#CC4F00"` (excluding .md) | 0 matches |
| `grep -r "#003D99"` (excluding .md) | 0 matches |
| `grep -ri "bloomberg"` (excluding .md) | 0 matches |
| `next build` | Success, 0 errors |
| Files changed | 131 |

---

## WESTLAW MIGRATION STATUS: COMPLETE

| Category | Status |
|---|---|
| Core pages (8) | EXACT MATCH (Session 16) |
| Legacy pages (~100) | CONVERTED (this session) |
| Components (~33) | CONVERTED (this session) |
| API routes | CONVERTED (this session) |
| Email templates | CONVERTED (this session) |
| PDF generation | CONVERTED (this session) |
| Comment references | ALL UPDATED (this session) |
| Format utilities | COMPLETE (this session) |
| **Bloomberg hex in codebase** | **ZERO** |
| **Bloomberg references in code** | **ZERO** |
