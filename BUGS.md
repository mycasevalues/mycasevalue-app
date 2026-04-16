# BUGS.md — Post-Redesign Visual QA Audit

**Date:** April 16, 2026  
**Auditor:** Automated QA (WebFetch + source code review)  
**Scope:** All primary routes on mycasevalues.com after Bloomberg Law design migration  

---

## CRITICAL

### BUG-001: Sidebar district links all 404 — slug casing mismatch
- **Routes affected:** Every page with WorkspaceSidebar (districts, judges, cases, attorney, etc.)
- **Description:** `WorkspaceSidebar.tsx` links to lowercase district slugs (`/districts/nysd`, `/districts/cacd`, `/districts/ilnd`, etc.) but `app/districts/[code]/page.tsx` DISTRICTS_MAP uses uppercase keys (`SDNY`, `CACD`, `ILND`). Additionally, the slug order is reversed — sidebar uses `nysd` (state+direction) but the map uses `SDNY` (direction+state). All 7 sidebar district quick-links produce a "District not found" 404 page.
- **Files:** `components/layout/WorkspaceSidebar.tsx` (lines 55-61), `app/districts/[code]/page.tsx` (DISTRICTS_MAP keys)
- **Impact:** Users clicking any sidebar district shortcut hit a dead end. This is the primary navigation path for district data.

### BUG-002: Header search autocomplete district links also 404
- **Routes affected:** Global header search on all pages
- **Description:** `Header.tsx` SEARCH_SUGGESTIONS contains `/districts/nysd` and `/districts/cacd` — same casing/ordering mismatch as BUG-001. Users who search for "Southern District of New York" and click the suggestion get a 404.
- **Files:** `components/layout/Header.tsx` (lines 30-31)
- **Impact:** Search-driven navigation to districts is broken sitewide.

### BUG-003: Homepage district links also 404
- **Routes affected:** `/` (homepage)
- **Description:** Homepage quick-links reference `/districts/nysd` (line 99 of `app/page.tsx`) — same mismatch. The districts index page (`/districts`) correctly uses uppercase codes like `/districts/SDNY`, so only the sidebar, header, and homepage links are broken.
- **Files:** `app/page.tsx` (line 99)
- **Impact:** First-click navigation from homepage to a specific district is broken.

### BUG-004: Judge detail pages return 404 for generated judge IDs
- **Routes affected:** `/judges/judge_1`, `/judges/1`, etc.
- **Description:** Both `/judges/judge_1` and `/judges/1` return "Judge Profile Not Found" with skeleton loading states. The `generateStaticParams` in `app/judges/[judgeId]/page.tsx` maps from `mockJudgesData.judges`, but these IDs appear to not be built/deployed as static pages. Live judge detail pages may only work for Supabase-backed real judge IDs, meaning all mock judge links from the judges index are dead.
- **Files:** `app/judges/[judgeId]/page.tsx`, `data/mock-judges.ts`
- **Impact:** No judge detail page is accessible from the judges index table. The entire judge drill-down flow is broken.

---

## HIGH

### BUG-005: /cases/employment returns 404 — invalid category slug
- **Routes affected:** `/cases/employment`
- **Description:** The valid category slug is `employment-workplace`, not `employment`. Any external links or bookmarks using shortened category names will 404. The error page correctly displays "Category not found" but there is no redirect or fuzzy matching.
- **Files:** `app/cases/[category]/page.tsx` (generateStaticParams uses SITS IDs)
- **Impact:** Medium — only affects users with incorrect/old bookmarks, but no graceful fallback exists.

### BUG-006: /login and /signup return raw 404
- **Routes affected:** `/login`, `/signup`
- **Description:** The actual auth routes are `/sign-in` and `/sign-up` (with hyphens). `/login` and `/signup` are common expected URLs that return 404 with no redirect. Many users will type these URLs directly.
- **Files:** No route files exist for `/login` or `/signup`
- **Impact:** Users attempting to log in via common URL patterns get a 404 instead of being redirected.

### BUG-007: Attorney index page — no dark #1A1A1A header visible
- **Routes affected:** `/attorney`
- **Description:** WebFetch audit reports the attorney index page shows an orange (#E65C00) header banner instead of the standard dark #1A1A1A navigation header. The `AttorneyToolsNav` component in `app/attorney/layout.tsx` renders its own top navigation bar that may visually overlap or replace the global dark header. The attorney sub-tool pages (e.g., `/attorney/case-predictor`) DO show the dark header correctly.
- **Files:** `app/attorney/layout.tsx`, `components/AttorneyToolsNav.tsx`
- **Impact:** Visual inconsistency — attorney index looks different from all other pages in the app.

### BUG-008: Attorney index page — no left sidebar visible
- **Routes affected:** `/attorney`
- **Description:** Despite `/attorney` being listed in WORKSPACE_ROUTES (WorkspaceShell.tsx line 30), the attorney index page renders as full-width without the left sidebar. The attorney tool pages (e.g., `/attorney/case-predictor`) correctly show the sidebar. The attorney index page's own layout/design may be overriding the sidebar layout.
- **Files:** `app/attorney/layout.tsx`, `app/attorney/page.tsx`
- **Impact:** Navigation inconsistency — users on the attorney index lose the persistent sidebar navigation.

---

## MEDIUM

### BUG-009: Districts index page — white header instead of dark #1A1A1A
- **Routes affected:** `/districts`
- **Description:** WebFetch reports the districts index page has a white (#FFFFFF) header instead of the expected dark #1A1A1A header. This may be a WorkspaceShell rendering issue where the header is conditionally hidden on workspace routes, or the workspace shell's own content area has a white top section that visually replaces it.
- **Files:** `components/layout/WorkspaceShell.tsx` (ConditionalHeader logic)
- **Impact:** Minor visual inconsistency if the dark header is intentionally suppressed on workspace routes (sidebar replaces header nav). Needs design review to confirm intent.

### BUG-010: Cases category page — white header instead of dark #1A1A1A
- **Routes affected:** `/cases/personal-injury` (and likely all `/cases/*` routes)
- **Description:** Same as BUG-009 — the cases detail page shows a white header. Since `/cases` is a workspace route, the header may be intentionally replaced by the sidebar.
- **Files:** `components/layout/WorkspaceShell.tsx`
- **Impact:** Same as BUG-009 — needs design intent confirmation.

### BUG-011: Font verification — var(--font-mono) not confirmed as IBM Plex Mono
- **Routes affected:** All pages with numeric data
- **Description:** All pages reference `var(--font-mono)` for monospace/data values, but WebFetch cannot confirm the actual resolved font is IBM Plex Mono vs. PT Mono or system monospace. One audit response specifically mentioned "PT Mono" on the cases category error page. If the CSS variable doesn't resolve to IBM Plex Mono, numeric typography won't match the Bloomberg design spec.
- **Files:** `app/globals.css` or `app/layout.tsx` (font declarations)
- **Impact:** Potential typography mismatch across all data-heavy pages.

---

## LOW

### BUG-012: Cases category 404 page says "PT Mono" font
- **Routes affected:** `/cases/[invalid-slug]` error pages
- **Description:** The cases 404 error page styling appears to use PT Mono instead of IBM Plex Mono for the error code display. Minor typographic inconsistency on an error page.
- **Files:** `app/cases/error.tsx` or `app/cases/[category]/page.tsx` (404 section)
- **Impact:** Cosmetic — only visible on error pages.

### BUG-013: Sign-in page shows skeleton loading states in SSR
- **Routes affected:** `/sign-in`
- **Description:** WebFetch reports the sign-in page contains "skeleton loading states and dynamic component boundaries" — the auth form may flash skeleton UI before hydration completes. This is a Next.js SSR/hydration timing issue, not a broken page.
- **Files:** `app/sign-in/page.tsx`
- **Impact:** Brief layout shift on initial load — cosmetic only.

### BUG-014: Judge detail 404 page shows skeleton shimmer instead of clean error
- **Routes affected:** `/judges/[invalid-id]`
- **Description:** When a judge ID is not found, the page shows both skeleton loading animations AND the "Judge Profile Not Found" error state simultaneously. The loading skeleton should be hidden once the 404 state is determined.
- **Files:** `app/judges/[judgeId]/page.tsx`
- **Impact:** Confusing UX — user sees loading animation alongside a "not found" message.

### BUG-015: No redirect from /district (singular) to /districts (plural)
- **Routes affected:** `/district`, `/judge`, `/case`
- **Description:** Users may type singular forms of route names. No redirects exist from `/district` → `/districts`, `/judge` → `/judges`, or `/case` → `/cases`.
- **Files:** No redirect config or middleware
- **Impact:** Minor — users typing singular URLs get a generic 404.

---

## Summary

| Severity | Count | Key Theme |
|----------|-------|-----------|
| CRITICAL | 4 | District slug casing mismatch (3 locations), Judge detail pages 404 |
| HIGH     | 4 | Missing auth redirects, attorney page layout inconsistencies |
| MEDIUM   | 3 | Header color on workspace routes, font verification |
| LOW      | 4 | Error page polish, singular URL redirects, skeleton timing |

**Total issues found: 15**

**Most urgent fix:** BUG-001 through BUG-003 (district slug mismatch) — this breaks the primary district navigation path from sidebar, header search, and homepage. Fix by updating sidebar/header slugs to match DISTRICTS_MAP uppercase codes, OR by making the `[code]` route case-insensitive.
