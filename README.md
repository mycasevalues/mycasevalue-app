# CaseCheck — Federal Court Outcome Data

Production-grade Next.js application showing federal court case outcomes to laypeople.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** — React framework with App Router
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animation library (optional, progressive enhancement)
- **Newsreader + Outfit + JetBrains Mono** — Editorial font system

## Architecture

```
casecheck-next/
├── app/
│   ├── globals.css      # Design system: fonts, animations, grain overlay
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page (client component wrapper)
├── components/
│   ├── CaseCheck.tsx    # Main app component (1500+ lines)
│   └── ui/
│       ├── AnimatedNumber.tsx  # Count-up animation
│       └── PieChart.tsx        # 3-segment SVG pie chart
├── lib/
│   └── data.ts          # All data, constants, API helpers
├── tailwind.config.js   # Custom design tokens
├── postcss.config.js
├── next.config.js
└── package.json
```

## Design System

- **Gold** `#C4983A` — Primary brand, CTAs, accents
- **Cream** `#FAF7F0` — Background warmth
- **Emerald** `#14B8A6` — Positive outcomes, settlements
- **Coral** `#E87461` — Warnings, deadlines
- **Midnight** `#0B1221` — Text, dark mode background

## Features

### Free Report
- Win rate with animated counter
- 3-segment pie chart (Favorable Settlements / Trial / Dismissals)
- Combined Win+Settlement rate
- Attorney vs. self-represented comparison
- Filing deadline with countdown
- CaseCheck Score (10-99)

### Premium Report ($5.99 single / $9.99 unlimited / $29.99/mo Attorney Mode)
- Recovery ranges (Lower/Typical/Upper)
- Resolution type breakdown with donut chart
- Recovery distribution
- Attorney representation impact + fee structures
- Interactive timeline + "If Filed Today" calculator
- Outcome distribution bars
- Comparable cases (anonymized)
- Settlement timing chart
- Factors courts cited
- Common next steps

### Engagement
- Dark mode toggle
- Share link (clipboard)
- Anonymous poll
- Live counter + user count + data freshness
- Email capture
- Webhook notification signup
- Pro bono / legal aid by state

### UPL Compliance (8 layers)
1. Persistent banner
2. Results disclaimer
3. "Not a prediction" badge
4. Consent checkbox
5. Per-section disclaimers
6. Pricing modal disclaimer
7. Footer UPL language
8. Final conspicuous dark-background disclaimer

## Connecting Real Data

Set environment variable:

```bash
NEXT_PUBLIC_API_BASE=https://your-api.com
```

The API endpoints (already built in `casecheck-api/`):
- `POST /api/report` — Get case outcome data
- `POST /api/stripe/checkout` — Create Stripe checkout
- `POST /api/email/capture` — Capture email
- `POST /api/notify/subscribe` — Webhook subscription
- `POST /api/poll` — Anonymous poll vote

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
npx vercel
```
