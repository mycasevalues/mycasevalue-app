# Section Components — Phase 4 Overhaul

New modular components for MyCaseValue landing page and report flows. Each component is self-contained, TypeScript-enabled, and supports EN/ES via the `lang` prop.

## Components

### 1. FaqSection.tsx
**Purpose:** Complete FAQ accordion with 8 MyCaseValue-specific questions and genuine answers.

**Props:**
- `lang: Lang` — 'en' or 'es'

**Features:**
- Accordion pattern (one open at a time, defaults to first question)
- Smooth expand/collapse with max-height transition (200ms fade)
- Gold accent (#B8923A) on active state
- Full English + Spanish translations
- Responsive grid with footer support CTA
- Self-contained with no external dependencies

**Q&A Topics:**
1. What federal courts does your data cover?
2. How is this different from a lawyer's opinion?
3. Is my information kept confidential?
4. How accurate is the data?
5. What if my case type isn't listed?
6. How quickly do I get my report?
7. Can I use this report with my attorney?
8. What if I'm not satisfied with my report?

---

### 2. DataPreviewSection.tsx
**Purpose:** Tabbed data preview showcasing sample case data with three visualization modes.

**Props:**
- `lang: Lang` — 'en' or 'es'

**Features:**
- Three tabs: Win Rates, Settlements, Timelines
- Tab-switching with smooth fade transition (200ms CSS)
- Inline SVG visualizations (no external charting libs)
- Gold gradient bars for win rates
- Settlement distribution histogram with median callout ($127,500)
- Timeline phase bars showing typical case progression
- bg-muted background with white content cards
- Responsive on mobile with stacked tabs

**Tab 1 - Win Rates:**
- Horizontal bar chart with employment discrimination example
- 4 sample case types with realistic percentages
- Color-coded gradient bars

**Tab 2 - Settlements:**
- SVG bar chart showing amount distribution
- Median callout ($127,500) with explanatory text
- 6 settlement buckets from <$50K to >$5M

**Tab 3 - Timelines:**
- Horizontal phase bars for case lifecycle
- 5 phases: Consultation, Filing, Discovery, Negotiation, Trial
- Color-coded by phase with width representing duration
- 67% settlement note

---

### 3. FinalCtaSection.tsx
**Purpose:** Dark inverted final call-to-action section before lead capture or conversion.

**Props:**
- `lang: Lang` — 'en' or 'es'
- `onGetStarted?: () => void` — Optional callback when CTA button is clicked

**Features:**
- Navy-900 background (#0B1221)
- Cream text (#F0F2F5)
- Decorative dot pattern background (SVG, opacity-5)
- Radial gold glow in upper-right corner (blur, opacity-10)
- GET STARTED badge with gradient
- Newsreader-style headline: "Find out where you stand."
- Gold gradient CTA button with hover scale & shadow
- Trust signals row (no account required, instant delivery, secure & private)
- Responsive typography (4xl/5xl/6xl on sm/md/lg)

---

### 4. TrustBar.tsx
**Purpose:** Minimal trust/credibility bar with 4 key statistics.

**Props:**
- `lang: Lang` — 'en' or 'es'

**Features:**
- Full-width navy background (#0B1221)
- 4-column grid (2 columns on mobile)
- Numbers in JetBrains Mono font (gold #B8923A)
- Labels in Outfit font (cream #F0F2F5)
- Stats:
  1. 180,000+ Federal Cases Analyzed
  2. 47 Practice Areas Covered
  3. 94% Report Accuracy Rating
  4. 60s Average Report Time
- Minimal styling, maximum impact
- Responsive with responsive gap and grid cols

---

## Usage Examples

```tsx
import FaqSection from '@/components/sections/FaqSection';
import DataPreviewSection from '@/components/sections/DataPreviewSection';
import FinalCtaSection from '@/components/sections/FinalCtaSection';
import TrustBar from '@/components/sections/TrustBar';

// In page or component:
<TrustBar lang="en" />
<DataPreviewSection lang="en" />
<FaqSection lang="en" />
<FinalCtaSection
  lang="en"
  onGetStarted={() => console.log('CTA clicked')}
/>
```

## Design Tokens Used

- **Primary Gold:** #B8923A
- **Gold Accent:** #C9A54E
- **Navy Dark:** #0B1221
- **Navy Mid:** #1A2744
- **Cream:** #F0F2F5
- **Slate 500:** #64748B (medium text)
- **Slate 400:** #94A3B8 (secondary labels)
- **Slate 100:** #F1F5F9 (light backgrounds)
- **Gradient Background:** linear-gradient(180deg, #FDFBF7, #fff)

## Fonts

- **Display/Headlines:** `--font-display` (Newsreader)
- **Body:** `--font-body` (Outfit)
- **Monospace (TrustBar numbers):** JetBrains Mono
- **Labels (TrustBar):** Outfit

## Transitions & Animations

- Tab switching: 200ms fade-in/out
- Accordion expand: max-height 200ms + opacity
- Button hover: scale(1.05) + shadow
- SVG animations: embedded in components
- Bar fills: cubic-bezier easing for data visualization

## Notes for Phase 4 Integration

1. These components are ready to import into MyCaseValue.tsx or other landing pages
2. No external component libraries required (pure React + inline SVG)
3. All styling uses inline styles + Tailwind classes for max compatibility
4. i18n integration uses the existing `Lang` type from `/lib/i18n.ts`
5. Components are "additive" — they don't replace existing sections yet
6. Each component manages its own state (selected tab, open accordion item)
7. Optional callbacks (onGetStarted) allow parent components to handle actions

---

**Created:** Phase 4 MyCaseValue Overhaul
**Status:** Ready for integration into main page flows
