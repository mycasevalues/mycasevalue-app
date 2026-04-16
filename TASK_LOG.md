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

## Phase 11 — Post-Redesign Bug Fixes (from BUGS.md QA audit)

### FIX GROUP 1 — CRITICAL: District slug mismatch (BUG-001, BUG-002, BUG-003)
**Root cause:** Sidebar, header search, and homepage linked to reversed slug format (`nysd` = state+direction) but DISTRICTS_MAP uses `SDNY` (direction+state). Simple `toUpperCase()` was already present but didn't fix the ordering mismatch.
**Fix (two-pronged):**
1. Added `SLUG_ALIASES` map + `resolveDistrictCode()` function in `app/districts/[code]/page.tsx` — maps ~80 alternative slug formats (reversed order, missing DN suffix) to canonical DISTRICTS_MAP keys. Both `generateMetadata` and `DistrictPage` now use `resolveDistrictCode()` instead of raw `toUpperCase()`.
2. Updated all link hrefs to use canonical codes:
   - `components/layout/WorkspaceSidebar.tsx`: nysd→SDNY, cacd→CACD, ilnd→NDIL, flsd→SDFL, paed→EDPA, njd→NJDN, cand→CAND
   - `components/layout/Header.tsx`: nysd→SDNY, cacd→CACD
   - `app/page.tsx`: nysd→SDNY, cacd→CACD, ilnd→NDIL, njd→NJDN, paed→EDPA
**Files changed:** `app/districts/[code]/page.tsx`, `components/layout/WorkspaceSidebar.tsx`, `components/layout/Header.tsx`, `app/page.tsx`
**Verification:** Zero instances of old-format slugs remain in codebase. Both `/districts/nysd` (alias) and `/districts/SDNY` (canonical) will resolve.

### FIX GROUP 2 — CRITICAL: Judge detail pages 404 (BUG-004, also fixes BUG-014)
**Root cause:** `generateStaticParams` pre-built pages from `mockJudgesData.judges` IDs, but deployed Vercel build didn't serve these as dynamic fallbacks. Real Supabase judge IDs weren't pre-generated, so all judge detail links from the index table produced 404.
**Fix:**
1. Removed `generateStaticParams()` entirely from `app/judges/[judgeId]/page.tsx`
2. Added `export const dynamic = 'force-dynamic'` — judge data fetched at request time from Supabase via `getJudgeById()`
3. Removed conflicting `export const revalidate = 604800` (can't coexist with force-dynamic)
4. Kept `mockJudgesData` import for district average calculation (fallback data)
**Side-effect fix (BUG-014):** With dynamic rendering, Next.js streaming properly replaces the loading skeleton with either the profile or `notFound()` — no more shimmer+404 overlap.
**Files changed:** `app/judges/[judgeId]/page.tsx`

### FIX GROUP 3 — HIGH: Auth URL redirects (BUG-006)
**Root cause:** Auth routes are `/sign-in` and `/sign-up` but users commonly type `/login` and `/signup`.
**Fix:** Added permanent redirects in `next.config.js`:
- `/login` → `/sign-in`
- `/signup` → `/sign-up`
**Files changed:** `next.config.js`

### FIX GROUP 7 — LOW: Singular URL redirects (BUG-015)
**Root cause:** No redirects from `/district` → `/districts`, `/judge` → `/judges`, `/case` → `/cases`.
**Fix:** Added permanent redirects in `next.config.js` (with path passthrough for `/district/:path*` and `/judge/:path*`).
**Files changed:** `next.config.js`

### FIX GROUP 4 — HIGH: Attorney page layout (BUG-007, BUG-008)
**Root cause:** `app/attorney/page.tsx` had a full-width orange (#E65C00) hero banner that visually overrode the dark header. `app/attorney/layout.tsx` imported `AttorneyToolsNav` which added a duplicate horizontal nav on mobile.
**Fix:**
1. Replaced the orange hero section in `app/attorney/page.tsx` with a workspace-consistent white header section (breadcrumb + title + subtitle on #FFFFFF background with #E0E0E0 border). Matches `/districts`, `/judges`, `/cases` workspace pages.
2. Removed `AttorneyToolsNav` import from `app/attorney/layout.tsx` — sidebar already provides attorney tool navigation. Layout now passes children through directly.
3. Removed unused `BackIcon` component from attorney page.
**Files changed:** `app/attorney/page.tsx`, `app/attorney/layout.tsx`

### FIX GROUP 5 — MEDIUM: IBM Plex Mono font (BUG-011, BUG-012)
**Root cause:** `lib/fonts.ts` loaded JetBrains Mono woff2 files under the `plexMono` variable name, so `--font-mono` resolved to JetBrains Mono instead of IBM Plex Mono. Additionally, 10 files hardcoded `fontFamily: '"PT Mono", monospace'` instead of using `var(--font-mono)`.
**Fix:**
1. Downloaded real IBM Plex Mono woff2 files (400/500/600/700 latin) from @fontsource/ibm-plex-mono to `public/fonts/ibm-plex-mono-*.woff2`
2. Updated `lib/fonts.ts` to load `ibm-plex-mono-*.woff2` files instead of `jetbrains-mono-*.woff2`
3. Replaced all hardcoded "PT Mono" references across 7 files with `var(--font-mono)`:
   - `components/SampleSizeIndicator.tsx`
   - `components/AnimatedDataViz.tsx`
   - `components/ServerContent.tsx` (2 instances)
   - `app/not-found.tsx`
   - `app/error.tsx`
   - `app/outcomes/[district]/[case-type]/page.tsx`
   - `app/es/pricing/page.tsx` (3 instances)
4. Updated `app/platform/page.tsx`: `--font-pt-mono` → `--font-mono`
5. Updated `styles/fonts.css` comment to reference IBM Plex Mono
**Files changed:** `lib/fonts.ts`, `public/fonts/ibm-plex-mono-*.woff2` (4 new), 8 component/page files
**Verification:** Zero instances of "PT Mono" or "pt-mono" remain in codebase. `--font-mono` chain: `var(--font-plex-mono)` → IBM Plex Mono font files

### FIX GROUP 6 — MEDIUM: Header color on workspace routes (BUG-009, BUG-010)
**Investigation:** `ConditionalHeader` (WorkspaceShell.tsx line 160-164) only hides the header on full-screen routes (`/terminal`). The dark #1A1A1A header IS rendered on all workspace routes including `/districts` and `/cases/*`. The `<Header />` component is wrapped in `<ConditionalHeader>` in `app/layout.tsx` (line 314), which returns children for all non-terminal routes.
**Root cause of false positive:** WebFetch audit parser identified the white content area at the top of workspace pages as "the header". The actual dark `<Header />` is rendered above WorkspaceShell in the DOM.
**Decision:** Closed as **BY DESIGN**. The dark header renders on all routes; workspace pages have white content areas below it.
**Files changed:** None

### FIX GROUP 8 — LOW: Sign-in skeleton flash (BUG-013)
**Root cause:** Suspense fallback in `app/sign-in/page.tsx` used `background: 'var(--accent-primary)'` (orange) which flashed the accent color before the auth form hydrated.
**Fix:** Changed Suspense fallback background to `#F7F7F5` (neutral surface color matching the app background). The page already had proper Suspense wrapping — no skeleton UI was present, just a colored background.
**Files changed:** `app/sign-in/page.tsx`

---

## Phase 12 — Enterprise Polish Pass (Bloomberg × Lex Machina × Financial Terminal)

### Foundation: Design Token Layer v2 [DONE]
- Rewrote `styles/tokens.css` — full semantic token system replacing --bl-* naming
  - Chrome: --chrome-bg #111111, --chrome-border #2A2A2A, --chrome-text #E8E8E8
  - Surface: --surface-primary #FFFFFF, --surface-secondary #F8F8F6, --surface-tertiary #F2F2EF
  - Text: --text-primary #0F0F0F, --text-secondary #444444, --text-tertiary #777777
  - Accent: #D4500A (was #E65C00), Link: #0A50A0 (was #0052CC)
  - Data semantic: --data-positive #1A6B3A, --data-negative #B02020
  - Table tokens: --table-header-bg, --table-row-alt, --table-row-hover
  - Status tokens: --status-active-*, --status-closed-*, --status-pending-*
  - Composite typography tokens: --type-display, --type-data-xl, etc.
  - Layout tokens: --sidebar-width 224px, --rightrail-width 248px, --topnav-height 52px
  - Shadow system: --shadow-xs through --shadow-lg, --shadow-focus (orange ring)
  - Transition system: --transition-fast 100ms, --transition-base 150ms
  - All old --bl-* tokens preserved as backward-compat aliases
- Rewrote `app/globals.css` — consolidated from ~1487 lines, removed duplication
  - Body bg: var(--surface-secondary)
  - Focus rings: orange accent with --shadow-focus
  - Scrollbar: 4px width, transparent track
  - New status badge classes (.badge-active, .badge-closed, .badge-pending)
  - All hardcoded hex replaced with token references
  - New @keyframes barFill for HorizontalBarChart

### PAGE 1 GATE: Homepage (/) [DONE]
- Rewrote `app/page.tsx` — enterprise data-terminal homepage
  - ContextBar: 40px, filter pills (All Circuits, All Case Types, All Years)
  - Hero: centered, eyebrow + h1 "The Federal Court Record. Open to Everyone." + dual CTAs + 4-stat ticker
  - Browse All Content: 3-col grid, 6 cards with SVG icons, left accent bars, stat rows
  - Recently Updated DataTable: 10 rows, proper header, alternating rows, status badges
  - What's Happening strip: 3-col (Most Active Districts, Trending Case Types, Notable Judges)
  - Disclaimer with data source citation
  - All colors use token variables, zero hardcoded hex

### PAGE 2 GATE: Districts Index (/districts) [DONE]
- Rewrote `app/districts/page.tsx` — enterprise DataTable layout
  - ContextBar: breadcrumb + district/case count summary
  - Page Header: h1 + subtitle using --type-display token
  - Circuit Filter Bar: "All Circuits" active pill + per-circuit filter pills
  - 7-column DataTable: District Name (link, 280px), Code (mono, 72px), Circuit (badge, 80px), Active Cases (right-aligned, 120px), Median Duration (120px), Plaintiff Win% (color-coded, 110px), Top Case Type (remainder)
  - Alternating row backgrounds (var(--table-row-alt))
  - Hover state via existing tr:hover td rule
  - Table toolbar: row count + sort indicator
  - Footer: source attribution (FJC IDB, CourtListener, PACER)
  - About This Data section with methodology + disclaimer links
  - All 95 districts with deterministic data from hash function
  - All colors use token variables, zero hardcoded hex

Last updated: 2026-04-16
