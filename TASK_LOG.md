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

## Phase 10 — Bloomberg Law Design System Migration

### Phase 1: Global CSS Token Migration [DONE]
- Rewrote `styles/tokens.css` — full Bloomberg color token set
- Rewrote `tailwind.config.js` — new colors, btn radius 3px, card radius 4px
- Rewrote `app/globals.css` — light mode, Bloomberg table/form/scrollbar styles
- Rewrote `styles/components.css` — Bloomberg flat cards, orange CTAs
- Updated `app/layout.tsx` — themeColor #1A1A1A, body bg #FFFFFF
- Replaced #1a56db across 96+ instances in 37+ files (buttons→#E65C00, links→#0052CC)
- Replaced #1e40af across 127 instances in 63 files (hover states updated)
- Cleaned print.css, generate-icons.ts
- VERIFIED: Zero instances of #1a56db, #1e40af, #0966C3, #1C3A5E remain

### Phase 2: Top Navigation — Black Bar [DONE]
- Rebuilt `components/layout/Header.tsx` as Bloomberg Law unified nav
  - Height: 52px, background #1A1A1A, border-bottom 1px solid #333
  - Left: Navy isometric cube SVG + "MyCaseValue" white wordmark (200px zone)
  - Center: Full-width GO search bar with orange SEARCH button
  - Right: "Sign In" white text + "Get Access" orange pill (200px zone)
  - Autocomplete dropdown with 8 max suggestions
  - Mobile search toggle + responsive design
  - No mega-menus — Bloomberg clean/minimal top nav
- Updated `components/BetaBanner.tsx` — Bloomberg charcoal bg
- Updated `components/LiveTicker.tsx` — Bloomberg dark theme, orange labels

### Phase 3: Left Sidebar [DONE]
- Rebuilt `components/layout/WorkspaceSidebar.tsx` — Bloomberg Law sidebar
  - Width: 220px fixed, background #F7F7F5, right border 1px solid #E0E0E0
  - Section headers: 11px Inter 600 uppercase, letter-spacing 0.08em, color #444444
  - Links: 13px Inter 400, color #0052CC, right-chevron arrows
  - Active state: 3px left orange border (#E65C00), font-weight 600, #EEEEEB bg
  - Collapsible "Federal Districts" and "Tools" sections
  - Sections: Search & Browse, Federal Districts, Analytics, Tools, Account
  - Bottom: Help & Methodology, Glossary links
  - Mobile: overlay + close button, responsive toggle
  - Removed old store dependencies (useResearchStore, useWorkspaceStore)
  - Removed SVG icon paths — Bloomberg uses plain text + chevron
- Updated `components/layout/WorkspaceShell.tsx` — light-mode Bloomberg colors
  - Mobile toggle: white bg (#FFFFFF), #E0E0E0 border, #444444 icon
  - Breadcrumb bar: white bg, #E8E8E8 border
  - Removed all dark-mode references (#0c1220, #0a1020, border-white/5)
- Updated `components/layout/WorkspaceFooter.tsx` — light-mode
  - Background: #F7F7F5, border-top 1px solid #E0E0E0
  - Text: #888888, hover links → #0052CC
- Updated `components/ui/ResearchBreadcrumb.tsx` — light-mode
  - Links: #0052CC, current page: #1A1A1A, separators: #CCCCCC

### Phase 4: Homepage Redesign [DONE]
- Rewrote `app/page.tsx` — Bloomberg data-forward homepage
  - Removed dark hero banner entirely
  - Added search context bar (#F7F7F5 bg) with SearchHero + "Federal Court Intelligence" heading
  - Coverage stats row: 5 metrics in IBM Plex Mono, white background
  - 3×2 category card grid: 6 top case types with counts, win rates, descriptions
  - "Recently Updated" flat table: 5 rows, district/case type/metric/value/date columns
  - Intelligence Suite: 4 capability cards (Case Outcomes, Judge Intel, Venue, Docs)
  - Data Sources bar: 7 sources in grid, #F7F7F5 background
  - CTA strip: #1A1A1A charcoal bg, orange "Start Searching" + ghost "Browse Cases"
  - Disclaimer: white bg, #888888 text
  - Card hover: blue border (#0052CC), subtle blue shadow
  - Table row hover: Bloomberg blue tint (#EFF5FF)
  - All light-mode, no dark-mode remnants
- Rewrote `components/SearchHero.tsx` — Bloomberg light-mode search bar
  - White input, #CCCCCC border, orange SEARCH button
  - Example pills: #0052CC text, #E0E0E0 border, blue hover
  - Removed rounded corners (2px radius), removed search icon
  - Matches Header.tsx search bar style

### Phase 5: Data Pages — Light Mode Migration [DONE]
- Rewrote `components/layout/MasterDetailLayout.tsx` — Bloomberg light mode
  - Master panel: white bg, #E0E0E0 right border
  - Detail panel: #F7F7F5 bg
  - Active list item: 3px left orange border (#E65C00), #EFF5FF bg
  - Mobile back button: white bg, #0052CC blue text
  - Empty state: #444444 heading, #888888 subtext, #CCCCCC icon
- Converted ALL data pages to Bloomberg light mode:
  - `app/districts/page.tsx`, `app/districts/[code]/page.tsx`, `app/districts/[code]/[nos]/page.tsx`
  - `app/judges/page.tsx`, `app/judges/[judgeId]/page.tsx`, `app/judges/compare/page.tsx`
  - `app/cases/page.tsx`, `app/cases/[category]/page.tsx`
  - `app/attorney/page.tsx` + 22 attorney tool sub-pages
  - All loading.tsx and error.tsx skeletons updated
- Bulk-replaced hard-coded dark hex across ~92 files:
  - `#080d19` → `#FFFFFF` (90 occurrences across 84 files)
  - `#0c1220` → `#FFFFFF` (6 occurrences across 5 files)
  - `#060a14` → `#F7F7F5` (4 occurrences across 3 files)
  - VERIFIED: Zero instances of #080d19, #0c1220, #060a14 remain in .tsx/.ts/.css files
- CSS variable references (var(--color-surface-0), etc.) already resolve to light-mode values via tokens.css Phase 1 rewrite
- Updated components: ServerHero.tsx, AIChatAssistant.tsx, Footer.tsx, CookieConsent.tsx, KeyboardShortcutsHelp.tsx, and more

### Phase 6: Footer & Pricing Page [DONE]
- Rewrote `components/layout/Footer.tsx` — Bloomberg #1A1A1A dark footer
  - Background: #1A1A1A (charcoal, matching nav bar)
  - Status strip: #222222 bg, green #15803D dot, mono status row
  - 4-column grid: Brand + Platform + Resources + Data
  - Link color: rgba(255,255,255,0.55), hover → #FFFFFF
  - Data lineage row with 7 sources
  - Bottom bar: copyright, Privacy/Terms/Security/Contact links
  - Removed SOC 2 badge (per mandatory rules)
  - Borders: #333333 (matching nav bar border)
  - Responsive: 2-column on mobile
- Updated `app/pricing/page.tsx` — Bloomberg light-mode pricing
  - Header: #F7F7F5 bg, #1A1A1A heading, #666666 subtitle
  - Eyebrow pill: white bg, #E0E0E0 border, #E65C00 text, 2px radius
  - Cards: white bg, #E0E0E0 border, 4px radius
  - Highlighted card: 2px solid #E65C00 border
  - Card hover: #0052CC border + blue shadow
  - CTA buttons: #E65C00, 3px radius, no inset shadow
  - "Best for" label: #E65C00 (from #60a5fa blue)
  - FAQ items: white bg, #E0E0E0 border, 4px radius
  - Callout section: #F7F7F5 bg
  - Contact CTA: #E65C00 bg, #FFFFFF text
  - No Coming Soon CTAs (all tiers have live links)

### Phase 7: Final Audit [DONE]

**21-Point Audit Results:**

1. [PASS] Zero #080d19 instances in .tsx/.ts/.css
2. [PASS] Zero #0c1220 instances in .tsx/.ts/.css
3. [PASS] Zero #060a14 instances in .tsx/.ts/.css
4. [PASS] Zero #1a56db (old brand blue) instances
5. [PASS] Zero #1e40af (old hover blue) instances
6. [PASS] Zero #0966C3 instances
7. [PASS] #1C3A5E only in Header.tsx logo SVG (correct per spec)
8. [PASS] #111827 cleaned from 18 UI files (only 2 remain in scripts/verify-data.ts — build script, not UI)
9. [PASS] border-white/ Tailwind classes replaced with border-[#E0E0E0] across 17 component files
10. [PASS] IBM Plex Mono (var(--font-mono)) used on all monetary values, percentages, counts — verified on homepage, pricing, ticker, sidebar
11. [PASS] No SOC 2 badge in any rendered component (only in Footer.tsx comment noting removal)
12. [PASS] No "Coming Soon" CTAs on paid tiers — all pricing CTAs are live links
13. [PASS] "Coming Soon" removed from ExportDropdown, CaseLawSummaries, legal/page.tsx
14. [PASS] Brand name "MyCaseValue" (product) / "MyCaseValue LLC" (legal entity) — no plural "MyCaseValues" in codebase
15. [PASS] Bloomberg token system (--bl-cta, --bl-link, --bl-nav) properly defined in tokens.css
16. [PASS] CSS variable compat layer maps all legacy vars to Bloomberg values
17. [PASS] Header: 52px, #1A1A1A, sticky, search bar, orange CTA
18. [PASS] Sidebar: 220px, #F7F7F5, #E0E0E0 border, orange active state
19. [PASS] Footer: #1A1A1A, 3-column + brand, status strip, data lineage
20. [PASS] Homepage: data-forward, no hero banner, category cards, data table
21. [PASS] Pricing: light mode, orange highlighted tier, no Coming Soon blockers

**Remaining (non-blocking):**
- app/terminal/page.tsx has 3 border-white/ classes — terminal has its own full-screen dark layout (excluded from design system per spec)
- scripts/verify-data.ts has 2 #111827 references — build script, not UI

---

Last updated: 2026-04-16
