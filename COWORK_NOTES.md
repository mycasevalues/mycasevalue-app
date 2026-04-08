# MyCaseValue Site Overhaul — Cowork Notes

## Overview
This document tracks the MyCaseValue site architecture audit and overhaul plan. The goal is to replace the current navigation system with a modern, consolidated Header component that improves UX and consolidates disparate navigation patterns.

---

## Task 1.1 — Navigation Architecture Audit (COMPLETED)

### Current State

The application currently has 6 navigation-related components scattered across the codebase:

#### 1. **SiteNav.tsx** (components/layout/)
**Status:** Currently in use (rendered in app/layout.tsx)

- Single universal NavBar per the current architecture
- Sticky white navbar with logo left, nav items center-left, Sign In + CTA right
- Mobile hamburger slides drawer in from the left
- **Dropdown definitions:**
  - CASE_TYPES: 10 case type links + "View all 84 case types"
  - DISTRICTS: 14 circuit/district links + "View all 94 districts"
  - TOOLS: 7 tool links (settlement calculator, case comparison, filing trends, NOS explorer, odds analyzer, jargon translator, glossary)
- **Features:** Supabase auth integration, usePathname() for active states, 100ms debounce on dropdowns, focus trapping in mobile drawer
- **Mobile drawer:** Full-screen, slides from left, close on X/Escape/link click, collapsible sections
- **Auth state:** Shows Dashboard + Sign Out when logged in; Sign In + CTA ("Start Researching") when logged out
- **Secondary nav:** Optional secondary navigation bar for product routes (/search, /judges, /districts, /calculator, /attorney, /trends, /dashboard, /compare, /odds, /nos, /nos-explorer, /translate, /glossary, /map)
- **Styling:** Inline styles + custom CSS in dangerouslySetInnerHTML; uses #0966C3 (Brand Blue), #FFFFFF (white), #E0DDD8 (borders)

#### 2. **BrandNav.tsx** (components/layout/)
**Status:** NOT currently used

- Alternative navigation with more polished design
- Features: Full-width mega-menu with multiple columns, announcement bar, secondary nav
- **Mega-menu structure:** Case Analytics (3 columns), Judge Intelligence, Settlement Data, Docket Search, AI Research (with BETA badge), Pricing
- **Dropdowns:** Column-based layout with headings, descriptions, borders between columns
- **Styling:** Uses Tailwind classes; dark mode consideration; brand color system
- **Auth handling:** Placeholder for user prop; shows Dashboard when logged in; Sign In + Get Started when logged out
- Integration notes in comments indicate it needs Supabase auth connection and route mapping

#### 3. **AttorneyToolsNav.tsx** (components/)
**Status:** Sub-nav only; not site-wide

- Navigation bar specifically for attorney tool pages
- Not relevant to main header consolidation

#### 4. **SidebarNav.tsx** (components/)
**Status:** Sidebar navigation; not header nav

- Left sidebar for navigation on interior pages
- Not relevant to main header consolidation

#### 5. **AnchorNav.tsx** (components/)
**Status:** In-page anchor navigation

- Links to page sections (on-page anchors)
- Not relevant to main header consolidation

#### 6. **NavigationProgress.tsx** (components/)
**Status:** Progress bar component; not actual navigation

- Visual progress bar (e.g., form progress)
- Not relevant to main header consolidation

#### 7. **Breadcrumbs.tsx** (components/)
**Status:** Breadcrumb component for manual breadcrumb trails

- Manual breadcrumb navigation (not auto-generated from pathname)
- Used as supplementary navigation, not primary header

### Key Findings

1. **Duplication:** SiteNav and BrandNav represent two competing navigation approaches. SiteNav is active; BrandNav exists but is unused.

2. **Styling inconsistency:** SiteNav uses inline styles + CSS-in-JS. BrandNav uses Tailwind. The site uses Tailwind throughout (tailwind.config.js defines brand color system), so consolidated header should use Tailwind.

3. **Dropdown patterns:**
   - SiteNav: Simple single-column dropdowns (Case Types, Districts, Tools)
   - BrandNav: Multi-column mega-menus (Case Analytics, etc.)
   - New spec: Mix — Explore uses mega-menu (3-column), For Attorneys and Resources use simple dropdowns

4. **Responsive design:**
   - SiteNav: Mobile drawer slides from left (300px wide, hidden above 768px)
   - BrandNav: No mobile implementation (noted in comments)
   - New Header must include both desktop dropdowns and mobile drawer per spec

5. **Auth integration:**
   - SiteNav: Direct Supabase integration with createBrowserClient, getUser(), onAuthStateChange()
   - BrandNav: Placeholder user prop
   - New Header should use the SiteNav pattern for consistency with existing auth flow

6. **Active route tracking:**
   - Both use usePathname() and implement isActive() logic
   - New Header should continue this pattern; spec calls for exact match on /pricing and /about, starts-with for collections

7. **Accessibility:**
   - SiteNav: Keyboard support (Tab to open, Escape to close), focus trapping in mobile, ARIA labels
   - BrandNav: No keyboard support noted
   - New Header should maintain SiteNav's a11y features

8. **Sticky behavior:**
   - SiteNav: Sticky top-0, always visible with border
   - BrandNav: Sticky with announcement bar above
   - New spec: Sticky with 10px scroll trigger for blur effect

### Routes Used in Dropdowns (Current SiteNav)

**Case Types:**
- /cases/employment-workplace, /cases/personal-injury, /cases/consumer-protection, /cases/civil-rights, /cases/money-business, /cases/housing-property, /cases/healthcare-benefits, /cases/family-law, /cases/government, /cases/education

**Districts:**
- /map, /districts?circuit=1 through /districts?circuit=11, /districts?circuit=dc

**Tools:**
- /calculator, /compare, /trends, /nos-explorer, /odds, /translate, /glossary

**Secondary nav:**
- /search, /judges, /districts, /calculator, /attorney, /trends, /dashboard, /compare, /odds, /nos, /nos-explorer, /translate, /glossary, /map

### Spec vs. Current State

| Element | Current (SiteNav) | New Spec |
|---------|-------------------|----------|
| Logo placement | Left (30x30 SVG + "MyCase**Value**" text) | Same |
| Main nav items | Search, Case Types, Districts, Judges, Tools, Attorney Mode | Explore, For Attorneys, Resources, Pricing |
| Explore dropdown | Single column (Case Types only) | 3-column mega-menu (Cases, Judges, Districts) with search bar |
| For Attorneys dropdown | N/A (separate link) | New small dropdown (Overview, API Access, Case Reports, Get Started) |
| Resources dropdown | N/A | New small dropdown (How It Works, Methodology, FAQ, About, Contact) |
| Pricing | Grouped with Tools | Standalone direct link |
| Auth buttons | Sign In (text), Start Researching (pill) | Sign In (text), Get Started → (pill) |
| Logged-in state | Dashboard button + Sign Out button | Avatar/initials dropdown with Dashboard, My Reports, Settings, Sign Out |

---

## Task 1.2 — TASK_LOG.md

See TASK_LOG.md for detailed progress tracking of all tasks.

---

## Task 1.3 — New Consolidated Header Component

### Implementation Details

**File:** components/layout/Header.tsx

**Spec compliance:**
- Desktop layout: Logo, Explore ▾, For Attorneys ▾, Resources ▾, Pricing, [Sign In] [Get Started →]
- Mobile layout: Hamburger → full-screen drawer with collapsed sections
- Sticky behavior: top-0, transition to blur effect at 10px scroll
- Active state indicators: Brand Blue text or 2px underline
- Explore: Full-width 3-column mega-menu with search bar
- For Attorneys & Resources: Simple 4-item dropdowns
- Keyboard support: Tab, Arrow keys, Escape
- Focus management & ARIA labels

**Key features:**
- 'use client' component
- useState for dropdown open state
- useRef with 100ms delay for hover debounce
- All dropdowns use Link elements (no buttons for navigation)
- Tailwind classes (no inline styles except where necessary)
- Supabase auth integration via createBrowserClient
- usePathname() for active route matching
- Responsive: Desktop dropdowns hidden below lg breakpoint; hamburger shown instead

**Dependencies:**
- next/link (Link component)
- next/navigation (usePathname, useRouter)
- @supabase/ssr (createBrowserClient)
- React hooks (useState, useRef, useEffect, useCallback)

---

## Task 1.4 — Sticky Header with Scroll Effect

When implemented, Header should:
- At top (0px scroll): bg-white border-b border-transparent
- After 10px scroll: bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm
- Smooth transition: transition-all duration-200
- Position: sticky top-0 z-50

---

## Task 1.5 — Mobile Navigation

Mobile drawer (below lg breakpoint):
- Full-screen (inset-0), slides from right, z-50
- Close button in top-right
- Search bar at top (for Explore section search)
- Collapsible sections: EXPLORE, FOR ATTORNEYS, RESOURCES, Pricing
- Auth buttons (Sign In + Get Started) at bottom
- Body scroll locked when open
- Close on: X click, link click, Escape key

---

## Task 1.6 — Active Page Indicator

Using usePathname():
- /pricing → Brand Blue text + 2px underline on "Pricing"
- /about → Brand Blue text + 2px underline on "About" (in Resources dropdown)
- /cases, /cases?* → Brand Blue text + 2px underline on "Explore"
- /judges → Brand Blue text + 2px underline on "Explore"
- /districts → Brand Blue text + 2px underline on "Explore"
- /attorney, /attorney/* → Brand Blue text + 2px underline on "For Attorneys"
- /nos-explorer → Brand Blue text + 2px underline on "Explore"
- / → No active indicator (home page)

---

## Design System Integration

**Colors (from tailwind.config.js):**
- brand.blue: #0966C3 (primary CTA, active states)
- brand.navy: #1C3A5E (dark text)
- brand.ink: #1C3A5E (heading text)
- brand.ink-2: #122840 (body text)
- brand.gray: #4B5563 (secondary text)
- brand.text-muted: #9CA3AF (disabled/muted)
- brand.surface: #F7F8FA (light background)
- brand.surface-2: #EEF0F4 (slightly darker background)

**Typography:**
- Font family: var(--font-inter) (Inter)
- Nav items: 14px, font-medium (500)
- Dropdown items: 14px, font-normal (400)
- Section labels: 12px, font-semibold (600), uppercase, tracking-wider

**Spacing (base-8 scale):**
- Gaps: 4px (1), 8px (2), 12px (3), 16px (4), 24px (6)
- Padding: 16px (4), 24px (6)
- Height: 52px base, increased for mega-menu content

**Shadows:**
- Dropdown: shadow-sm (0 1px 2px rgba(0,0,0,0.06))
- Mega-menu: shadow-lg or shadow-xl

---

## Implementation Roadmap

- **1.1:** Navigation Audit (COMPLETED)
- **1.2:** Create COWORK_NOTES.md + TASK_LOG.md (IN PROGRESS)
- **1.3:** Implement Header.tsx component (IN PROGRESS)
- **1.4:** Add sticky scroll effect (PENDING)
- **1.5:** Add mobile navigation drawer (PENDING)
- **1.6:** Add active page indicators (PENDING)
- **1.7:** Test keyboard navigation & a11y (PENDING)
- **1.8:** Test mobile responsiveness (PENDING)
- **1.9:** Integration testing & route verification (PENDING)
- **2.0:** Replace SiteNav with Header in app/layout.tsx (PENDING)
- **2.1:** Remove unused BrandNav, SiteNav, and other nav components (PENDING)

---

## Notes

- **Existing auth pattern:** The site uses Supabase SSR with createBrowserClient. Replicate this in Header.tsx using the SiteNav.tsx pattern.
- **Route consistency:** Verify all routes in dropdown menus match the actual app routes in the /app directory.
- **Color testing:** Brand Blue (#0966C3) is the primary; test contrast ratios for WCAG AA compliance.
- **Performance:** Use useCallback for route matching; avoid unnecessary re-renders on scroll.
- **Testing:** Component should be tested in all major browsers (Chrome, Firefox, Safari, Edge) and mobile viewports.

---

Last updated: 2026-04-08
Audit completed by: Claude (Haiku 4.5)
