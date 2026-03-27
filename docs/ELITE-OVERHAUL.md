# MyCaseValue — Elite Full-Stack Overhaul
### A World-Class Redesign & Feature Expansion
**Paste this entire document into Cowork. Read every word before writing a single line of code.**

---

## The Vision

You are the lead engineer and design director on **MyCaseValue** — a legal data intelligence platform at `mycasevalues.com`. When this work is done, someone should open the site and immediately feel the same quality they feel when they visit Stripe, Linear, Vercel, or Notion. That is the bar. Not "looks nice for a startup." Not "clean and simple." **World-class. Elite. Unmistakably professional.**

MyCaseValue gives everyday people and attorneys access to real federal court outcome data — win rates, settlement amounts, and timelines for cases like theirs. The data is extraordinary. The site must match it.

**The repo:** `mycasevalues/mycasevalue-app.git` → auto-deploys to Vercel `main` branch → `mycasevalues.com`

---

## Stack (Preserve Everything)

- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Tailwind CSS + `globals.css`
- **Fonts (existing):** Outfit, Newsreader, JetBrains Mono
- **Payments:** Stripe (checkout, verify, webhook routes exist)
- **Features:** EN/ES bilingual, dark mode, 5-step wizard, tiered pricing, ARIA

---

## The Problem Statement

The current codebase is a 4,600+ line monolith (`MyCaseValue.tsx`) with 2,100+ lines of CSS layered on top of Tailwind. The site has an identity — cream/navy/gold — but it is not yet executing on that identity at an elite level. The design is inconsistent. The animations are missing or broken. The mobile experience is rough. Payments are broken in production (missing Stripe env vars in Vercel). The architecture makes everything harder to improve.

This document tells you exactly how to fix all of that — and then go much further.

---

## PHASE 0 — Critical Audit Before Any Changes

Do this before touching a single file.

1. Read the complete `MyCaseValue.tsx` file and build a mental map of every feature, state variable, prop, and section.
2. Read the complete `globals.css` and catalog every CSS custom property defined in `:root`.
3. Open `mycasevalues.com` in a browser at full desktop width. Screenshot the current state.
4. Open DevTools → Console. Log every error and warning.
5. Resize to 375px. Log every layout break.
6. Open DevTools → Network. Log fonts, images, and JS bundle sizes.
7. Open DevTools → Lighthouse. Record the current Performance, Accessibility, SEO, and Best Practices scores.
8. Identify and list every inline EN/ES ternary — these must be preserved 100%.
9. Check `app/api/` for Stripe routes. Confirm which env vars they reference.
10. Write your complete internal plan before writing any code. Know what you are building before you build it.

**Target scores after this project:**
- Performance: 90+
- Accessibility: 100
- SEO: 100
- Best Practices: 100

---

## PHASE 1 — Fix Payments First (Revenue Is Broken)

This is the highest-priority fix. Payments do not work in production.

1. Open the Vercel project dashboard for `mycasevalues/mycasevalue-app`.
2. Go to **Settings → Environment Variables**.
3. Add all missing Stripe variables — check `.env.local` for the correct values:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - Any other `NEXT_PUBLIC_` vars referenced in the codebase
4. Set these for Production, Preview, and Development environments.
5. Trigger a manual redeploy.
6. Test the full payment flow on the live site: select a report tier → Stripe checkout → payment → verify → report delivered.
7. Check the Stripe dashboard webhook logs for any delivery failures.
8. Commit: `fix: add Stripe environment variables to Vercel, restore payment flow`

---

## PHASE 2 — Architecture Refactor (The Foundation)

Split the 4,600-line monolith into a clean, scalable component architecture. This is not optional — it enables everything else.

### Component Structure

```
app/
  layout.tsx                    ← root layout, fonts, metadata, analytics
  page.tsx                      ← thin orchestrator, imports all sections
  globals.css                   ← cleaned design token system

components/
  layout/
    Header.tsx                  ← smart nav with scroll-aware behavior
    Footer.tsx                  ← multi-column footer
    MobileNav.tsx               ← slide-in drawer for mobile

  sections/
    HeroSection.tsx
    TrustBar.tsx                ← logos / "as seen in" / stats bar
    HowItWorksSection.tsx
    DataPreviewSection.tsx      ← NEW: live data visualization teaser
    PricingSection.tsx
    TestimonialsSection.tsx
    FaqSection.tsx              ← NEW: accordion FAQ
    FinalCtaSection.tsx

  wizard/
    WizardShell.tsx             ← container, step router, progress
    WizardContext.tsx           ← React context for wizard state
    steps/
      Step1Situation.tsx
      Step2Details.tsx
      Step3Confirm.tsx
      Step4Email.tsx
      Step5Report.tsx
    WizardProgress.tsx
    WizardSummary.tsx           ← NEW: summary sidebar on confirm step

  report/
    ReportShell.tsx             ← NEW: dedicated report display
    ReportSummaryCard.tsx
    OutcomeChart.tsx
    TimelineChart.tsx
    ComparisonTable.tsx

  ui/
    Button.tsx                  ← cva-based, all variants
    Card.tsx                    ← base card with variants
    Badge.tsx                   ← section label pills
    Input.tsx                   ← styled form inputs
    Select.tsx                  ← styled dropdowns
    Toggle.tsx                  ← dark mode switch
    LanguageSwitch.tsx          ← EN/ES toggle
    StatCard.tsx                ← data metric display
    Tooltip.tsx                 ← hover tooltips for data points
    Accordion.tsx               ← FAQ accordion
    Modal.tsx                   ← base modal shell
    ProgressBar.tsx             ← animated step progress
    AnimatedNumber.tsx          ← count-up animation for stats

  providers/
    AppProviders.tsx            ← wraps app: language, theme, analytics
    LanguageContext.tsx         ← replaces prop-drilling for EN/ES
    ThemeContext.tsx            ← replaces prop-drilling for dark mode
```

### Rules for This Refactor

- **Zero functionality regressions.** Every feature that exists must still work.
- **Replace all EN/ES prop drilling with `LanguageContext`.** The bilingual ternaries stay, but `language` is consumed from context instead of passed as props everywhere. This cleans up component signatures enormously.
- **Replace all dark mode prop drilling with `ThemeContext`.** Same approach.
- Commit this as a standalone commit before any visual changes: `refactor: decompose monolith into component architecture with context providers`

---

## PHASE 3 — Brand Identity & Design System

### The Brand Character

MyCaseValue occupies a unique position: it is a **legal intelligence platform** — serious enough to be trusted with high-stakes decisions, but approachable enough that someone scared about their legal situation won't bounce in 5 seconds.

The visual character is: **Stripe's precision × a premium law journal's authority × a modern fintech app's confidence.**

Think of it as the Bloomberg Terminal if it were designed by a team that also designs consumer apps. Data-forward, authoritative, elegant.

---

### Design Token System

Rebuild `globals.css` from the ground up with this token architecture. Every color, shadow, spacing, radius, and transition must come from tokens — no magic numbers in components.

```css
:root {
  /* ── BRAND COLORS ─────────────────────────────── */

  /* Cream / Background family */
  --color-cream-50:  #FEFDFB;   /* lightest — hero background */
  --color-cream-100: #FAF8F3;   /* primary background */
  --color-cream-200: #F4F0E8;   /* muted surfaces, card fills */
  --color-cream-300: #EAE4D6;   /* borders on light bg */
  --color-cream-400: #D9D0BC;   /* dividers */

  /* Navy / Foreground family */
  --color-navy-900:  #0A0F1E;   /* deepest — inverted section bg */
  --color-navy-800:  #0F172A;   /* primary text */
  --color-navy-700:  #1E293B;   /* secondary text */
  --color-navy-600:  #334155;   /* muted text */
  --color-navy-500:  #64748B;   /* placeholder, caption text */
  --color-navy-400:  #94A3B8;   /* disabled text */
  --color-navy-300:  #CBD5E1;   /* subtle borders */
  --color-navy-200:  #E2E8F0;   /* light borders */

  /* Gold / Accent family */
  --color-gold-900:  #78350F;
  --color-gold-800:  #92400E;
  --color-gold-700:  #B45309;
  --color-gold-600:  #D97706;   /* primary accent — CTAs, highlights */
  --color-gold-500:  #F59E0B;   /* gradient midpoint */
  --color-gold-400:  #FBBF24;   /* gradient endpoint, text highlights */
  --color-gold-300:  #FCD34D;   /* very light accent */
  --color-gold-200:  #FDE68A;   /* tinted backgrounds */
  --color-gold-100:  #FEF3C7;   /* subtlest gold tint */
  --color-gold-50:   #FFFBEB;

  /* Semantic aliases */
  --bg:              var(--color-cream-100);
  --bg-muted:        var(--color-cream-200);
  --bg-inverted:     var(--color-navy-900);
  --fg:              var(--color-navy-800);
  --fg-muted:        var(--color-navy-600);
  --fg-subtle:       var(--color-navy-500);
  --fg-inverted:     var(--color-cream-50);
  --accent:          var(--color-gold-600);
  --accent-mid:      var(--color-gold-500);
  --accent-light:    var(--color-gold-400);
  --accent-bg:       var(--color-gold-100);
  --accent-border:   var(--color-gold-300);
  --border:          var(--color-navy-200);
  --border-muted:    var(--color-cream-300);

  /* ── THE SIGNATURE GRADIENT ───────────────────── */
  /* Every CTA button, text highlight, icon bg, featured border */
  --gradient-accent: linear-gradient(135deg, var(--color-gold-600), var(--color-gold-400));
  --gradient-accent-h: linear-gradient(135deg, var(--color-gold-700), var(--color-gold-500));

  /* ── TYPOGRAPHY ───────────────────────────────── */
  --font-display:    'Newsreader', Georgia, serif;
  --font-body:       'Outfit', system-ui, sans-serif;
  --font-mono:       'JetBrains Mono', 'Fira Code', monospace;

  /* ── SHADOWS ──────────────────────────────────── */
  --shadow-xs:       0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-sm:       0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-md:       0 4px 6px rgba(15, 23, 42, 0.05), 0 2px 4px rgba(15, 23, 42, 0.04);
  --shadow-lg:       0 10px 15px rgba(15, 23, 42, 0.06), 0 4px 6px rgba(15, 23, 42, 0.04);
  --shadow-xl:       0 20px 25px rgba(15, 23, 42, 0.08), 0 10px 10px rgba(15, 23, 42, 0.04);
  --shadow-2xl:      0 25px 50px rgba(15, 23, 42, 0.12);
  --shadow-accent:   0 4px 14px rgba(217, 119, 6, 0.22);
  --shadow-accent-lg:0 8px 28px rgba(217, 119, 6, 0.32);

  /* ── RADIUS ───────────────────────────────────── */
  --radius-sm:       0.375rem;   /* 6px  — badges, tags */
  --radius-md:       0.75rem;    /* 12px — inputs, small cards */
  --radius-lg:       1rem;       /* 16px — cards */
  --radius-xl:       1.5rem;     /* 24px — large cards, wizard */
  --radius-full:     9999px;     /* pills */

  /* ── TRANSITIONS ──────────────────────────────── */
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast:   150ms;
  --duration-base:   200ms;
  --duration-slow:   300ms;
  --duration-enter:  700ms;
}

/* ── DARK MODE OVERRIDES ──────────────────────── */
[data-theme="dark"] {
  --bg:              #0D1117;
  --bg-muted:        #161B22;
  --bg-inverted:     var(--color-cream-100);
  --fg:              #E6EDF3;
  --fg-muted:        #8B949E;
  --fg-subtle:       #6E7681;
  --fg-inverted:     var(--color-navy-900);
  --border:          #30363D;
  --border-muted:    #21262D;
  --shadow-md:       0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg:       0 10px 15px rgba(0, 0, 0, 0.4);
  --shadow-xl:       0 20px 25px rgba(0, 0, 0, 0.5);
}
```

---

### Logo — Redesign This

The current logo needs to be elevated significantly. Build the logo as an SVG component (`components/ui/Logo.tsx`) so it scales perfectly at all sizes.

**Logo concept:**
- A compact wordmark: **"MCV"** as an abstract lettermark icon (monogram style) + the full text "MyCaseValue" beside it.
- The lettermark: three geometric forms — an "M" shape built from two upward triangles — rendered in the gold gradient. Clean, minimal, distinctive. Feels like it belongs alongside Stripe, Brex, or Plaid logos.
- The wordmark text: "MyCase" in Newsreader (display, authoritative) + "Value" in Outfit Medium (body, grounded). "Value" in the gold accent color.
- Two sizes: `size="sm"` for the nav (32px tall), `size="lg"` for the hero or footer (48px tall).
- Dark mode: logo adapts. The lettermark gradient stays warm gold. The text flips to cream.
- The logo must be crisp at 1x, 2x, and 3x pixel density.

---

### Typography — Apply Rigorously

All fonts must be loaded via `next/font/google` — not raw `<link>` tags. This self-hosts them and eliminates layout shift.

```typescript
// app/fonts.ts
import { Newsreader, Outfit, JetBrains_Mono } from 'next/font/google'

export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})
```

**Type scale and usage — enforce this everywhere:**

| Element | Size | Font | Weight | Notes |
|---|---|---|---|---|
| Hero h1 | clamp(2.75rem, 6vw, 5.5rem) | Newsreader | 400 | Tight leading 1.05. Key words get gold gradient text. |
| Section h2 | clamp(2rem, 4vw, 3.5rem) | Newsreader | 400 | Leading 1.1. Italic variation on pulled quotes. |
| Card title | 1.25rem–1.5rem | Outfit | 600 | Tracking -0.01em |
| Nav links | 0.9375rem | Outfit | 500 | |
| Body | 1rem–1.125rem | Outfit | 400 | Leading 1.7 |
| Caption / meta | 0.875rem | Outfit | 400 | fg-muted color |
| Data values / stats | 2rem–4rem | JetBrains Mono | 600 | Gold accent color. Tabular nums. |
| Small data / labels | 0.875rem | JetBrains Mono | 400 | fg-muted or gold |
| Section badge labels | 0.6875rem | JetBrains Mono | 500 | UPPERCASE, tracking 0.15em |

**Gradient text treatment for key headline words:**
```css
.text-gradient {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Pair with a subtle underline bar beneath the word */
}
```

---

## PHASE 4 — Section-by-Section Elite Redesign

Work through every section of the site. Each one must be rebuilt to elite standard.

---

### Navigation (Header)

The nav sets the tone for the entire site. It must feel premium from the first pixel.

**Behavior:**
- On scroll past 60px: the nav gains a backdrop blur (`backdrop-blur-xl`), a subtle border at the bottom, and a very slight shadow. This is the "sticky glass" effect used by Stripe, Vercel, and Linear.
- On mobile: hamburger transforms to X. Drawer slides in from the right (not a dropdown). Overlay dims the background.
- Language toggle (EN/ES) sits in the nav, styled as a segmented control — not a dropdown, not a link.
- Dark mode toggle: an icon toggle (sun/moon), 32px touch area minimum.

**Structure:**
```
[Logo]                    [How It Works] [Pricing] [About]    [EN|ES] [☀/☾] [Get My Report →]
```

**Visual specs:**
- Height: 64px desktop, 56px mobile
- Logo on left, CTA button on far right
- Nav links: Outfit 500, 0.9375rem, `fg-muted` default → `fg` on hover with a subtle underline that slides in from left
- Primary CTA in nav: smaller than hero CTA — `h-9 px-4`, gold gradient, `rounded-lg`
- The nav background on scroll: `rgba(250, 248, 243, 0.85)` with `backdrop-filter: blur(24px) saturate(180%)` — the classic premium glass blur

---

### Hero Section

The hero is the single most important part of the site. It must stop someone mid-scroll.

**Layout:** Asymmetric two-column on desktop (`grid-cols-[1.15fr_0.85fr]`). Single column on mobile.

**Left column (text):**

1. Section badge: pill with pulsing gold dot + monospace label: `FEDERAL COURT DATA`
2. Headline (h1, Newsreader): Something like:
   ```
   Find out what really
   happened in cases
   like [yours.]
   ```
   The final word in the headline gets the gold gradient text treatment + a subtle gradient underline bar beneath it.
3. Subheadline (Outfit, 1.125rem, fg-muted): One crisp sentence explaining the value proposition. "Analyze real federal court outcomes — win rates, settlement ranges, and timelines — for cases that match your situation."
4. A social proof line below the subheadline: "Trusted by 4,200+ users" with small avatar circles stacked + a 5-star rating — all using real or placeholder data, styled compactly.
5. Two CTAs side by side:
   - Primary: "Get My Case Report →" — gold gradient, `h-14`, arrow icon animates right on hover, shadow-accent
   - Secondary: "See a Sample Report" — transparent, navy border, `h-14`
6. A trust strip below the CTAs: three small inline trust signals — "🔒 Secure & Confidential", "⚡ Reports in 60 seconds", "📊 Based on real federal data" — in small Outfit text with subtle icons.

**Right column (the hero graphic):**

This is the abstract data visualization element. It makes the site feel alive and data-forward.

Build this as a composed SVG/div element:

- A large rounded card (the "report preview") floating slightly, with:
  - A mock win rate percentage in large JetBrains Mono gold text (e.g., "68%")
  - Label: "Plaintiff Win Rate" in small Outfit text
  - A horizontal bar chart showing outcome distribution (Won / Settled / Dismissed) using cream and gold fills
  - A subtle grid texture behind it
- Two smaller floating "stat chips" overlapping the main card:
  - Chip 1: "$142K" average settlement, with a tiny upward trend arrow in gold
  - Chip 2: "14.2 mo" average duration, with a tiny clock icon
- These chips have a gentle floating animation:
  - Main card: `translateY(0px) → translateY(-8px)` over 5 seconds, ease-in-out, infinite, alternate
  - Chip 1: 4.2s, offset phase
  - Chip 2: 5.8s, opposite phase
- A rotating dashed ring (large, 400px diameter) behind the card — very slow rotation (60 seconds per revolution), gold color at 20% opacity — adds dynamism without distraction.
- A subtle radial gradient glow (gold at 6% opacity) behind the entire graphic element.
- On mobile: hide this entire graphic (`hidden lg:block`). The mobile hero is text-only and full-width.

**Entrance animation:**
- Left column: fades up (opacity 0→1, y 28→0, duration 700ms, ease-out-expo)
- Right column: fades in (opacity 0→1, delay 200ms, duration 700ms)
- Badge fades up first, then headline, then sub, then CTAs — staggered 100ms between each

---

### Trust Bar (New Section)

Directly below the hero, add a full-width trust/credibility bar. Thin section, `py-8`. Navy background. Cream text.

Contents (one row):
- "Based on real federal court records" — small mono text
- Vertical dividers between stats:
  - `180,000+` — Federal cases analyzed
  - `47` — Practice areas covered
  - `94%` — Report accuracy rating
  - `60s` — Average report time

Each stat uses JetBrains Mono 600 for the number (gold color), Outfit 400 for the label (cream/muted).

This section scrolls in from below with a staggered count-up animation on the numbers (the `AnimatedNumber` component) triggered when it enters the viewport.

---

### How It Works Section

**Badge:** `HOW IT WORKS`
**Headline:** "Your case report in three steps" (Newsreader)

Three steps, horizontal on desktop, vertical on mobile. Each step is a card.

**Step cards (NOT a simple icon + text list — make these feel substantial):**
- Large step number in JetBrains Mono (e.g., "01", "02", "03") in top-left, navy-200 color — large, decorative, 3rem
- Icon container: 48x48, gold gradient background, rounded-xl, white icon inside
- Card title: Outfit 600, 1.125rem
- Card body: Outfit 400, 0.9375rem, fg-muted, 2–3 lines max
- On hover: card lifts (`-translate-y-1`), shadow deepens, a subtle gold gradient overlay appears at opacity 3%

Steps:
1. **Describe your situation** — Select your case type, jurisdiction, and key details in our guided wizard. Takes under 2 minutes.
2. **We match your case** — Our system searches 180,000+ federal court records for cases that match your profile — same case type, jurisdiction, and facts.
3. **Get your data report** — Receive a detailed report: win rates, settlement ranges, average timelines, judge-specific data, and what it means for your case.

Connect steps with a dashed arrow connector on desktop (`border-t-2 border-dashed border-gold-200`), positioned between the cards.

---

### Data Preview Section (New — This Is the Money Section)

This section does not exist yet. Add it. It is the single most powerful trust-building element on the site.

**Concept:** Show people a real-looking preview of what they get in a report, before they pay for anything. This converts visitors.

**Badge:** `WHAT YOU GET`
**Headline:** "Real data. Real cases. Real insight."

A tabbed interface with three tabs: **Win Rates** / **Settlements** / **Timelines**

Each tab shows a beautiful data visualization card using a mock federal case type (e.g., "Employment Discrimination — Federal District Courts"):

**Tab 1: Win Rates**
- A horizontal bar chart showing:
  - Plaintiff wins: 34%
  - Settlement: 41%
  - Defendant wins: 19%
  - Dismissed: 6%
- Gold fill for plaintiff wins, cream/muted fills for others
- Small labels in JetBrains Mono
- "Based on 2,847 matching federal cases (2019–2024)" in tiny mono caption below

**Tab 2: Settlements**
- A distribution visualization showing settlement ranges
- Median callout in large JetBrains Mono gold: "$127,500"
- Range: $18K — $2.1M
- Percentile markers (25th, 50th, 75th, 90th)

**Tab 3: Timelines**
- A timeline bar (horizontal Gantt-style) showing average case phases:
  - Filing to first response: 2.1 months
  - Discovery: 6.4 months
  - Motions: 3.2 months
  - Trial/Resolution: 4.8 months
- Total: 14.2 months average

Each tab transitions with a smooth fade (opacity, 200ms). The entire section has a slightly different background (bg-muted) to create visual separation.

A CTA below the data preview: "See your case's actual data →" — gold gradient button.

**Important:** This data is illustrative. Add a small disclaimer beneath in tiny Outfit text: "Sample data shown. Your report will reflect cases matching your specific situation."

---

### Pricing Section

**Badge:** `PRICING`
**Headline:** "One report. Everything you need."

Three tiers in a card grid. The center (featured) tier is elevated above the others — it uses the 2px gradient border technique, sits 8px higher, and has a "Most Popular" badge.

**Tier cards:**

Each card contains:
- Tier name (Outfit 600)
- Price in JetBrains Mono 600, large — e.g., `$29`
- Billing period (Outfit 400, fg-muted)
- A short 1-sentence value statement
- Divider
- Feature list: each item has a checkmark icon (gold) + Outfit 400 text
- CTA button at the bottom

**Featured tier extras:**
- Gold gradient background on the card header area
- The "Most Popular" badge: gold pill, white text, Outfit 600
- Primary CTA button (gold gradient) instead of secondary
- Enhanced shadow: `var(--shadow-accent-lg)`

**Gradient border technique for featured card:**
```tsx
<div className="rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-mid)] to-[var(--accent-light)] p-[2px] shadow-accent-lg">
  <div className="h-full w-full rounded-[calc(1.5rem-2px)] bg-card">
    {/* card content */}
  </div>
</div>
```

**On mobile:** Stack all three tiers vertically. Featured tier keeps its gradient border and elevation.

---

### Testimonials Section

**Badge:** `WHAT PEOPLE SAY`
**Headline:** "From people who needed answers"

Three testimonial cards in a grid. The center card is offset upward by 16px on desktop (`-mt-4`) — this asymmetry is intentional and adds sophistication.

**Each card contains:**
- Large decorative quote mark (Newsreader, 96px, gold at 20% opacity) at top-left
- Quote text (Newsreader italic, 1rem, fg)
- Author section:
  - Small avatar circle (initials, gold gradient background)
  - Name (Outfit 600)
  - Case type (JetBrains Mono, 0.75rem, fg-muted) — e.g., "Employment Discrimination"
- Gold left border accent bar (4px, full height, gold gradient)

---

### FAQ Section (New)

Add this section before the final CTA. People have questions before they pay.

**Badge:** `FAQ`
**Headline:** "Common questions"

Build an `Accordion` component. Eight questions, collapsed by default, one open at a time.

Questions to include (write real, helpful answers):
1. What federal courts does your data cover?
2. How is this different from a lawyer's opinion?
3. Is my information kept confidential?
4. How accurate is the data?
5. What if my case type isn't listed?
6. How quickly do I get my report?
7. Can I use this report with my attorney?
8. What if I'm not satisfied with my report?

**Accordion component behavior:**
- Closed: shows question in Outfit 600, a `+` icon on the right
- Open: `+` rotates to `×` (smooth 200ms rotation), answer fades in below, question text turns gold
- Smooth height animation: `max-height` transition from 0 to auto equivalent using `grid-template-rows: 0fr → 1fr`
- Only one panel open at a time

---

### Final CTA Section

Use the dark inverted section here. Background: `var(--bg-inverted)` (deep navy). Text: cream.

Add the dot pattern texture:
```css
background-image: radial-gradient(circle, rgba(250, 248, 243, 0.04) 1px, transparent 1px);
background-size: 32px 32px;
```

Add a subtle radial gold glow in the upper-right corner:
```css
background: radial-gradient(ellipse at 80% 20%, rgba(217, 119, 6, 0.08) 0%, transparent 60%);
```

**Content:**
- Badge: `GET STARTED` (cream text, cream/10 background)
- Headline: "Find out where you stand." (Newsreader, cream, 3.5rem+)
- Subtext: "Get your federal court outcome report in under 60 seconds." (Outfit, cream/70)
- Single primary CTA: "Get My Report →" (gold gradient — the gradient pops dramatically on the dark background)
- Below the button: "No account required. Instant delivery. Secure & private."

---

## PHASE 5 — The Wizard Flow (Complete Overhaul)

The 5-step wizard is the core product. It must feel as polished as Stripe's checkout or Intercom's onboarding.

### Wizard Shell

- Centered, max-width 680px, on top of a dimmed overlay when accessed from a modal — OR as a dedicated `/wizard` route if the current implementation uses one.
- White card background, `rounded-2xl`, `shadow-2xl` — floating feeling.
- Generous padding: `p-8` on desktop, `p-5` on mobile.

### Step Progress (Top of Wizard)

```
● ─────── ● ─────── ○ ─────── ○ ─────── ○
1  Situation  2  Details  3  Confirm  4  Email  5  Report
```

- Filled circle (gold gradient): completed steps
- Current step: outlined circle (gold border, white fill) with a subtle gold glow ring
- Future steps: outlined circle (navy-200 border, white fill)
- Connecting line: cream-300, segments turn gold as steps complete
- Step labels in JetBrains Mono 0.6875rem UPPERCASE on desktop, hidden on mobile (numbers only)
- A thin animated progress bar beneath the step row — the bar fills to the correct percentage with a smooth `300ms ease-out` transition

### Step Transitions

Between every step change:
1. The current step card fades out + slides up 16px (`opacity 1→0, translateY 0→-16px, 200ms`)
2. The new step card fades in from below (`opacity 0→1, translateY 16px→0, 300ms, ease-out-expo`)

### Each Step — Design Specs

**Step 1: Your Situation**
- Select your case type: styled card grid of options — each is a tappable card with an icon + label. Selected state: gold border, gold background tint, checkmark overlay.
- On mobile: 2-column grid of cards.

**Step 2: Case Details**
- Form inputs styled to the token system: `h-12`, `rounded-lg`, 1px border, gold focus ring (`ring-2 ring-gold/40`), Outfit 400 for input text.
- Floating labels (animate from inside the field to above it on focus/fill).
- Inline validation: red border + error message appears below on blur if invalid. Green checkmark appears when valid.
- Jurisdiction selector: a styled `<Select>` component — not the browser default.

**Step 3: Confirm Your Details**
- A `WizardSummary` sidebar shows what the user has entered, formatted as a clean two-column key/value list.
- Pricing tier selection if not already chosen. Featured tier pre-selected.
- Clear "Edit" link next to each summary item that jumps back to that step.

**Step 4: Email Delivery**
- Single email input, large and centered.
- Below: Outlook, Gmail, Apple Mail icons to signal compatibility.
- Privacy note: "We only use your email to deliver your report. We never sell or share your data."

**Step 5: Report Delivery**
- After successful payment: animated success state — a gold checkmark circle that draws itself in (SVG stroke animation, 600ms).
- "Your report is being prepared" with a subtle progress animation.
- Report appears inline below — this is the `ReportShell` component.

---

## PHASE 6 — The Report (New Dedicated Component)

The report is the product. It must look incredible — something the user will screenshot and share.

Create `components/report/ReportShell.tsx` with these sections:

### Report Header
- "Your Case Report" — Newsreader 2rem
- Case type + jurisdiction in JetBrains Mono, fg-muted
- Generated date + a unique report ID in mono
- A gold badge: "Based on X matching federal cases"

### Outcome Summary Card
The most important section. Full-width card with:
- Large metric: "68% Plaintiff Win Rate" — the percentage in JetBrains Mono 4rem, gold. "Plaintiff Win Rate" in Outfit below.
- A clear interpretation line: "In cases matching yours, plaintiffs won or settled favorably in 68 out of 100 cases." (Outfit, fg)
- A visual outcome distribution bar (full width, segmented): Won / Settled / Dismissed / Other — with gold for favorable outcomes.

### Settlement Range Card
- Median: "$127,500" large mono gold
- A range visualization showing 10th, 25th, 50th, 75th, 90th percentile markers
- Interpretation: "The middle 50% of settlements ranged from $48K to $312K."

### Timeline Card
- Phase-by-phase Gantt visualization
- Total duration: "14.2 months average"
- Breakdown by phase with bar widths proportional to duration

### What This Means Card
- Plain language interpretation of the data (3–5 bullet points)
- "Questions to ask your attorney" section — a bulleted list the user can screenshot

### Download & Share
- "Download PDF Report" button (gold gradient)
- "Share with Attorney" button (secondary)

---

## PHASE 7 — Mobile Experience (Every Breakpoint, Every Component)

At 375px, the site must be indistinguishable in quality from the desktop experience — just adapted, not degraded.

### Navigation (Mobile)
- Hamburger (3 lines → X transition, 200ms) in top-right
- Logo on left, hamburger on right, dark mode toggle between them
- Drawer slides in from right: full-height, `w-80`, white background, `shadow-2xl`
- Nav links in the drawer: full-width, `py-4`, 48px touch targets, 1px border-bottom between each
- Language toggle at bottom of drawer as a large segmented control
- Overlay behind drawer: navy at 40% opacity, tapping it closes the drawer

### Hero (Mobile)
- Single column, text only (no graphic)
- h1: clamp(2.25rem, 8vw, 3rem)
- CTA buttons: full width, stacked vertically with 12px gap
- Badge: centered
- Trust strip: wraps to 2 rows, centered

### Wizard (Mobile)
- Full viewport width on mobile (no side padding at the modal level)
- Step numbers only (no labels) in the progress row
- Each form field: full width, `h-14` for easy tapping
- Card selection grid: 2 columns, larger tap targets
- Back/Next buttons: full width, stacked if needed

### General Mobile Rules
- No horizontal scroll anywhere — test every section
- All tap targets: 44px minimum height
- Font sizes: never below 14px on mobile
- Section padding: `py-16` on mobile (vs `py-28`+ on desktop)
- Card grids: 1 column on mobile, 2 on tablet, 3 on desktop
- Stats section: 2x2 grid on mobile

---

## PHASE 8 — Motion Design System

Every animation must feel intentional, smooth, and physical. Reference: Linear, Stripe, Vercel.

### Entrance Animations

Use the Intersection Observer API (or Framer Motion if already installed) for scroll-triggered entrances. If Framer Motion is not installed, install it (`npm install framer-motion`).

```typescript
// lib/animation.ts
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo }
  }
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo }
  }
}
```

Apply `viewport={{ once: true, amount: 0.15, margin: '-60px' }}` to all scroll-triggered animations.

### Continuous Animations

```css
@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
}

@keyframes count-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  from { background-position: -200% center; }
  to { background-position: 200% center; }
}

/* Wrap ALL continuous animations in this */
@media (prefers-reduced-motion: no-preference) {
  .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
  .animate-float-medium { animation: float-medium 4.2s ease-in-out infinite; }
  .animate-spin-slow { animation: spin-slow 60s linear infinite; }
  .animate-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
}
```

### Micro-Interactions

Every interactive element must respond to user input:

- **Buttons:** `-translate-y-0.5` on hover, `scale-[0.98]` on active, `shadow-accent` appears on hover
- **Cards:** `-translate-y-1` on hover, shadow deepens
- **Nav links:** Gold underline slides in from left on hover (use `::after` pseudo, `scaleX 0→1`)
- **Accordion:** Height transition + icon rotation
- **Wizard step change:** Page-like slide transition (current out, next in)
- **Form inputs:** Floating label, gold focus ring, border color change on focus
- **Language/theme toggles:** Spring-like indicator pill animation
- **Number stats:** Count-up animation on viewport entry (the `AnimatedNumber` component)
- **Tab switching:** Active indicator slides to active tab (position:absolute indicator that `left` transitions)

### AnimatedNumber Component

```typescript
// components/ui/AnimatedNumber.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

export function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1500, decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setDisplayed(eased * value)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{displayed.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}
    </span>
  )
}
```

---

## PHASE 9 — Performance & SEO to Elite Standards

### Metadata (layout.tsx)

```typescript
export const metadata: Metadata = {
  title: {
    default: 'MyCaseValue — Real Federal Court Outcome Data',
    template: '%s | MyCaseValue',
  },
  description: 'Discover what really happened in federal cases like yours. Get real win rates, settlement ranges, and timelines from 180,000+ federal court records.',
  keywords: ['federal court outcomes', 'case value', 'legal data', 'win rates', 'settlement data', 'lawsuit outcomes'],
  openGraph: {
    type: 'website',
    url: 'https://www.mycasevalues.com',
    title: 'MyCaseValue — Real Federal Court Outcome Data',
    description: 'Find out what happened in cases like yours. Real data. Real federal courts.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCaseValue — Real Federal Court Outcome Data',
    description: 'Find out what happened in cases like yours.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.mycasevalues.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

Create a proper OG image at `public/og-image.png` — 1200×630px. Design it to match the brand: cream background, "MyCaseValue" in Newsreader, key stat in JetBrains Mono gold, clean and professional.

### Performance Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **FID/INP:** < 100ms
- **Bundle size:** Monitor with `npm run build` output. No single chunk over 200KB before gzip.
- **Fonts:** All via `next/font` — zero FOUT (flash of unstyled text)
- **Images:** All via `next/image`. No raw `<img>` tags.
- **Code splitting:** Wizard and report components use `dynamic(() => import(...))` with `ssr: false`
- **Third-party scripts:** Any analytics or Stripe scripts load with `strategy="lazyOnload"` or `strategy="afterInteractive"`

### Accessibility Targets (100 Score)

- All interactive elements have visible focus styles: `focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2`
- All images have descriptive `alt` attributes
- Color contrast: all text passes WCAG AA (4.5:1 minimum)
- Form inputs all have associated `<label>` elements
- ARIA: wizard steps use `aria-current="step"`. Accordion uses `aria-expanded`. Modal uses `aria-modal="true"` with focus trap.
- Keyboard navigation: entire wizard completable with keyboard only
- Screen reader: every icon-only button has `aria-label`

---

## PHASE 10 — New Features to Build

These features do not exist yet. Add them. Each one makes the product significantly more valuable.

### Feature 1: Case Type Search / Autocomplete

In Step 1 of the wizard, add a search input at the top of the card grid. As the user types, the case type cards filter in real-time with a smooth fade. This is a pure client-side filter — no API call.

### Feature 2: Sample Report Page (`/sample-report`)

Create a public page at `/sample-report` that shows a complete, beautiful, illustrative report for a fictional case. This is your conversion tool. Link it from:
- The hero secondary CTA ("See a Sample Report")
- The nav
- The pricing section

The sample report uses all the same `ReportShell` components — just with hardcoded illustrative data and a banner at top: "This is a sample report for illustrative purposes."

### Feature 3: Share a Report

After a user receives their report, give them a "Share with Attorney" button that:
1. Generates a URL with a unique report token (`/report/[token]`)
2. Copies the URL to clipboard with a toast notification ("Link copied!")
3. The shared page shows the report in read-only mode

Implement the token generation server-side. The token can be a simple UUID stored in a cookie or in a Vercel KV store if available.

### Feature 4: FAQ Rich Snippets

Add structured data (JSON-LD) to the FAQ section for Google rich snippets:

```typescript
// In the FAQ section component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    }),
  }}
/>
```

### Feature 5: Toast Notification System

Build a lightweight toast system (`components/ui/Toast.tsx` + `providers/ToastProvider.tsx`).

Toasts appear in the bottom-right corner, slide in from the right, auto-dismiss after 4 seconds.

Use for:
- "Link copied to clipboard"
- "Report sent to [email]"
- Payment success confirmation
- Any form validation errors that don't fit inline

---

## PHASE 11 — globals.css Final Architecture

After all components are built, audit and rebuild globals.css into this clean structure:

```css
/* 1. DESIGN TOKENS (:root + dark mode) */
/* 2. FONT DECLARATIONS (@font-face if needed — prefer next/font) */
/* 3. BASE RESET & DEFAULTS */
/* 4. TYPOGRAPHY BASE STYLES (h1-h6, p, a, code, etc.) */
/* 5. LAYOUT UTILITIES (if not covered by Tailwind) */
/* 6. ANIMATION KEYFRAMES */
/* 7. COMPONENT-SPECIFIC OVERRIDES (last resort only) */
```

Rules:
- Zero `!important` declarations (these indicate specificity problems)
- Zero duplicate property declarations
- Zero magic numbers — all values reference tokens
- Zero vendor prefixes except `-webkit-background-clip: text` (needed for gradient text)
- Every keyframe animation wrapped in `@media (prefers-reduced-motion: no-preference)`

---

## PHASE 12 — Final QA Checklist

Do not push to `main` until every item is checked.

### Functionality
- [ ] Full EN wizard flow completes, payment processes, report delivered to email
- [ ] Full ES wizard flow — all text in Spanish throughout
- [ ] Language toggle switches instantly on every section
- [ ] Dark mode works on every section including inverted sections
- [ ] Stripe checkout opens from all three pricing tiers
- [ ] Stripe webhook processes and triggers report delivery
- [ ] All nav links work (no 404s)
- [ ] Mobile nav drawer opens, closes, all links work
- [ ] Sample report page (`/sample-report`) loads and displays correctly
- [ ] FAQ accordion opens and closes smoothly, one panel at a time
- [ ] Data preview tabs switch correctly

### Visual — Desktop (1440px)
- [ ] Hero graphic floats correctly with animation
- [ ] Rotating ring visible and not distracting
- [ ] All section badges display with pulsing dot
- [ ] Gradient text renders on hero headline
- [ ] Gold gradient on all primary CTA buttons
- [ ] Featured pricing card elevated with gradient border
- [ ] Testimonial center card offset upward
- [ ] Trust bar stats display in JetBrains Mono gold
- [ ] Count-up animation triggers on scroll for stats
- [ ] Dark inverted final CTA section with dot texture visible
- [ ] Nav glass blur effect on scroll

### Visual — Mobile (375px)
- [ ] Zero horizontal overflow on any section
- [ ] Hero text readable, not overflowing
- [ ] Hero graphic hidden, layout clean
- [ ] Wizard fully usable, all inputs accessible
- [ ] Pricing cards stacked, featured tier still elevated
- [ ] All buttons 44px+ touch targets
- [ ] Footer columns stacked vertically

### Performance
- [ ] `npm run build` passes with zero errors and zero TypeScript errors
- [ ] `npm run lint` passes with zero warnings
- [ ] No console errors on localhost:3000
- [ ] No console errors on live site after deploy
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility = 100
- [ ] Lighthouse SEO = 100
- [ ] Lighthouse Best Practices = 100
- [ ] OG image displays when URL shared on Slack/Twitter/iMessage
- [ ] Fonts load without layout shift (CLS < 0.1)

---

## PHASE 13 — Commit Strategy & Deploy

Commit at each major phase, not at the end. This gives you clean rollback points.

```bash
git commit -m "fix: restore Stripe payments — add all env vars to Vercel"
git commit -m "refactor: decompose monolith into component architecture"
git commit -m "feat: rebuild design token system in globals.css"
git commit -m "feat: hero section — elite redesign with floating graphic"
git commit -m "feat: trust bar, data preview, FAQ sections — new additions"
git commit -m "feat: wizard overhaul — elite step design with transitions"
git commit -m "feat: report shell — full report display component"
git commit -m "feat: motion system — entrance animations and micro-interactions"
git commit -m "feat: sample report page at /sample-report"
git commit -m "perf: fonts via next/font, code splitting, metadata, OG image"
git commit -m "fix: mobile experience — every breakpoint audited"
git commit -m "chore: globals.css cleanup — zero !important, zero duplicates"
git commit -m "feat: toast system, share-report, FAQ rich snippets"
git commit -m "qa: all Lighthouse scores 90+, zero console errors"
git push origin main
```

After pushing, monitor the Vercel deployment in real time. If the build fails for any reason, fix it immediately and push. Do not leave a broken build on `main` for more than 5 minutes.

After the build succeeds, visit `mycasevalues.com` and verify:
1. The site looks as good as it did on localhost
2. Fonts loaded correctly (no fallback flash)
3. Navigation works
4. The wizard opens and progresses
5. No console errors

---

## The Standard to Hit

When this is done, a visitor should arrive at `mycasevalues.com` and feel:

> "This is a serious product. These people know what they're doing. I can trust this data."

If the site looks like a startup's first attempt, we have not done our job. If it looks like something Stripe's design team would be proud of — confident typography, a living hero, data that looks incredible, a wizard that flows like butter, a report that makes the user feel informed and empowered — then we have done our job.

Every decision you make that isn't specified above should be filtered through one question: **does this make the data easier to trust and the experience easier to love?**

If yes: do it. If no: don't.

Now start with Phase 0. Read everything before you write anything.
