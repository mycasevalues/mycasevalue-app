# Shell Component & AppContext Extraction Guide

## Overview
Three new components have been extracted from MyCaseValue.tsx to improve code organization and reusability.

## Files Created

### 1. AppContext.tsx
**Location:** `/components/providers/AppContext.tsx`

Provides centralized application state management.

**Usage:**
```tsx
import { useApp } from '@/components/providers/AppContext';

function MyComponent() {
  const { lang, step, isPremium, toast } = useApp();

  return (
    <div>
      <p>Current language: {lang}</p>
      <button onClick={() => toast('Hello!')}>Show Toast</button>
    </div>
  );
}
```

**Provider Setup:**
```tsx
import { AppProvider } from '@/components/providers/AppContext';

export default function App() {
  const appState = {
    lang: 'en' as Lang,
    setLang: (lang: Lang) => { /* ... */ },
    step: 0,
    go: (step: number) => { /* ... */ },
    darkMode: true,
    isPremium: false,
    tier: 'free',
    toast: (msg: string) => { /* ... */ },
    reset: () => { /* ... */ },
    buy: (plan: string) => { /* ... */ },
  };

  return (
    <AppProvider value={appState}>
      <App />
    </AppProvider>
  );
}
```

---

### 2. Shell.tsx
**Location:** `/components/layout/Shell.tsx`

Main layout wrapper that includes navigation, modals, and content areas.

**Usage:**
```tsx
import { Shell } from '@/components/layout/Shell';

export default function Page() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<Lang>('en');
  const [step, setStep] = useState(0);
  // ... other state

  return (
    <Shell
      darkMode={darkMode}
      viewMode="desktop"
      step={step}
      readingPct={45}
      showConfetti={false}
      lang={lang}
      navScrolled={false}
      scrollProgress={0}
      setLang={setLang}
      isPremium={false}
      savedReportsLength={3}
      setShowSaved={() => {}}
      reset={() => setStep(0)}
      t={TRANSLATIONS['en']}
      UPL={{ banner: 'INFORMATIONAL TOOL ONLY' }}
      showBackToTop={true}
      toastMsg=""
      toastVis={false}
      showExitIntent={false}
      setShowExitIntent={() => {}}
      buy={() => {}}
      showSaved={false}
      referralCode="ABC123"
      toast={() => {}}
      showCookieConsent={false}
      setShowCookieConsent={() => {}}
      setLegalPage={() => {}}
      legalPage={null}
      showMethodology={false}
    >
      {/* Page content goes here */}
      <div className="p-6">Your content</div>
    </Shell>
  );
}
```

**Features:**
- Skip-to-content accessibility link
- Reading progress bar (visible when step === 6)
- Success celebration animation (confetti)
- Announcement bar with live data
- Sticky navbar with language switcher
- UPL (Unauthorized Practice of Law) banner
- Multiple modals:
  - Exit intent modal (upgrades non-premium users)
  - Saved reports drawer with referral code
  - Cookie consent banner
- Back-to-top button
- Toast notifications
- Mobile and desktop bottom navigation
- Full bilingual support (English/Spanish)

**Props:**
- `darkMode: boolean` - Dark theme toggle
- `viewMode: 'auto' | 'mobile' | 'desktop' | 'tablet'` - Responsive layout mode
- `step: number` - Current step in the workflow
- `readingPct: number` - Reading progress percentage (0-100)
- `showConfetti: boolean` - Show success celebration
- `lang: Lang` - Current language ('en' | 'es')
- `navScrolled: boolean` - Whether navbar has scrolled
- `scrollProgress: number` - Overall page scroll progress
- `setLang: (lang: Lang) => void` - Language setter
- `isPremium: boolean` - Premium subscription status
- `savedReportsLength: number` - Number of saved reports
- `setShowSaved: (show: boolean) => void` - Show/hide saved reports
- `reset: () => void` - Reset to home
- `t: typeof TRANSLATIONS['en']` - Translation object
- `UPL: { banner: string }` - UPL banner text
- `showBackToTop: boolean` - Show back-to-top button
- `toastMsg: string` - Toast message text
- `toastVis: boolean` - Toast visibility
- `showExitIntent: boolean` - Show exit intent modal
- `setShowExitIntent: (show: boolean) => void` - Exit intent setter
- `buy: (plan: string) => void` - Purchase handler
- `showSaved: boolean` - Saved reports modal visibility
- `referralCode: string` - User's referral code
- `toast: (msg: string) => void` - Show toast notification
- `showCookieConsent: boolean` - Show cookie consent
- `setShowCookieConsent: (show: boolean) => void` - Cookie consent setter
- `setLegalPage: (page: 'terms' | 'privacy' | 'cookies' | 'disclaimer') => void` - Show legal page
- `legalPage: 'terms' | 'privacy' | 'cookies' | 'disclaimer' | null` - Current legal page
- `showMethodology: boolean` - Show methodology tooltip
- `children: React.ReactNode` - Main content

---

### 3. Footer.tsx
**Location:** `/components/layout/Footer.tsx`

Reusable footer component extracted from Shell.

**Usage:**
```tsx
import { Footer } from '@/components/layout/Footer';

export default function Page() {
  return (
    <div>
      <main>{/* content */}</main>
      <Footer
        lang="en"
        darkMode={true}
        reset={() => {}}
        t={TRANSLATIONS['en']}
        setLegalPage={(page) => {}}
        showMethodology={false}
        toast={(msg) => {}}
      />
    </div>
  );
}
```

**Features:**
- Verified data sources display
- Company information and legal disclaimer
- Social media sharing buttons (X, Facebook, LinkedIn, Copy Link)
- Payment method badges (Visa, Mastercard, Amex, PayPal)
- Stripe secure payment badge
- Footer navigation links
- Contact information (support & billing emails)
- Legal notice section
- Flexible responsive layout
- Full bilingual support

---

## Component Extraction Details

### From MyCaseValue.tsx (Lines 1078-1490)

The Shell component was extracted directly from the `Shell()` function in MyCaseValue.tsx with all features intact:

1. **Accessibility:**
   - Skip-to-content link
   - ARIA labels and roles
   - Semantic HTML structure
   - Screen reader support

2. **Modals:**
   - Exit intent modal (non-premium users only)
   - Saved reports drawer with referral code
   - Cookie consent banner

3. **Navigation:**
   - Top navbar integration
   - Mobile bottom navigation
   - Desktop bottom navigation
   - Sticky positioning

4. **Animations:**
   - Success celebration with sparkles
   - Reading progress bar
   - Smooth back-to-top scrolling
   - Toast notifications

5. **Bilingual Support:**
   - All text in English and Spanish
   - Language switching via `setLang()`
   - TRANSLATIONS object integration

6. **Styling:**
   - CSS variables for theming
   - Responsive design
   - Dark mode support
   - Mobile/desktop/tablet layouts

---

## Integration Steps

1. **Import in your page:**
```tsx
import { Shell } from '@/components/layout/Shell';
```

2. **Setup state management:**
```tsx
const [darkMode, setDarkMode] = useState(true);
const [lang, setLang] = useState<Lang>('en');
// ... other state variables
```

3. **Render Shell with children:**
```tsx
<Shell
  darkMode={darkMode}
  // ... all required props
>
  {/* Your page content */}
</Shell>
```

4. **Optional: Use AppContext for shared state:**
```tsx
import { AppProvider, useApp } from '@/components/providers/AppContext';

function App() {
  return (
    <AppProvider value={appState}>
      <YourPages />
    </AppProvider>
  );
}
```

---

## Type Safety

All components are fully typed with TypeScript:

```tsx
import type { ShellProps } from '@/components/layout/Shell';
import type { FooterProps } from '@/components/layout/Footer';
import type { AppState } from '@/components/providers/AppContext';
```

---

## File Structure

```
components/
├── layout/
│   ├── Shell.tsx          (Main layout wrapper)
│   └── Footer.tsx         (Reusable footer)
├── providers/
│   ├── AppContext.tsx     (App state context)
│   └── ... (existing)
├── ui/
│   ├── Logo.tsx
│   ├── MobileBottomNav.tsx
│   ├── SavedReports.tsx
│   └── ... (existing)
├── navigation/
│   ├── Navbar.tsx
│   ├── BottomNav.tsx
│   └── ... (existing)
└── ... (existing)
```

---

## Notes

- All imports use relative paths for proper bundling
- Dynamic imports used for heavy components (AnnouncementBar, BottomNav)
- `use client` directive at the top of each file for client-side rendering
- Fully preserves original MyCaseValue.tsx functionality
- Ready for immediate integration
