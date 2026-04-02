# Extracted UI Components from MyCaseValue.tsx

This directory now contains 11 reusable UI components extracted from the monolithic MyCaseValue.tsx file.

## Component Files

### 1. **Reveal.tsx**
- **Purpose**: IntersectionObserver animation wrapper for lazy reveal on scroll
- **Props**: `children`, `delay?`
- **Features**: Aggressive viewport detection (1000px below fold), smooth opacity & transform animation

### 2. **CardBg.tsx**
- **Purpose**: Styled card container with optional premium/glow modes
- **Props**: `children`, `glow?`, `premium?`, `className?`, `style?`
- **Features**: Gradient backgrounds, multiple shadow variants, premium glass styling

### 3. **GoldRule.tsx**
- **Purpose**: Decorative gradient divider with centered diamond accent
- **Props**: None
- **Features**: Gradient lines with diamond separator, gradient styling

### 4. **SectionLabel.tsx**
- **Purpose**: Styled section header label with gradient text
- **Props**: `children`
- **Features**: Gradient text fill, uppercase tracking, muted color

### 5. **Stat.tsx**
- **Purpose**: Animated stat display box with color-coded value
- **Props**: `value`, `label`, `color`, `large?`, `dark?`
- **Features**: Hover scale animation, neon text shadow, gradient background

### 6. **BarLine.tsx**
- **Purpose**: Progress bar with animated width fill and percentage display
- **Props**: `label`, `pct`, `max`, `color`, `delay?`
- **Features**: Cubic-bezier animation, hover height increase, gradient bar

### 7. **SelectDropdown.tsx**
- **Purpose**: Searchable dropdown with bilingual support and ARIA attributes
- **Props**: `value`, `options`, `onChange`, `placeholder?`, `dark?`, `lang?`, `labelledBy?`
- **Features**: 
  - Search filtering for >6 items
  - Bilingual text (English/Spanish)
  - Full ARIA attributes (expanded, haspopup, labelledby, etc.)
  - Focus management for search input
  - Keyboard support

### 8. **Collapsible.tsx**
- **Purpose**: Accordion component with optional badge display
- **Props**: `title`, `badge?`, `defaultOpen?`, `children`
- **Features**: Smooth open/close animation, hover color change, icon rotation

### 9. **WizardProgress.tsx**
- **Purpose**: Multi-step progress indicator for wizards/flows
- **Props**: `step`, `labels?`, `lang?`
- **Features**: 
  - Bilingual labels (English/Spanish)
  - Smooth progress bar fill
  - Step counter display
  - Pulse animation on active steps

### 10. **Toast.tsx**
- **Purpose**: Toast notification overlay
- **Props**: `message`, `visible`
- **Features**: 
  - Fixed bottom-center positioning
  - ARIA live region for screen readers
  - Slide-up animation
  - Role="status" for accessibility

### 11. **TrendSparkline.tsx**
- **Purpose**: Inline SVG sparkline for trend visualization
- **Props**: `data`, `width?`, `height?`
- **Features**: Win rate trend visualization, smooth polyline rendering

## Barrel Export

**File**: `monolith-extracted.ts`

Single import location for all extracted components:

```typescript
import {
  Reveal,
  CardBg,
  GoldRule,
  SectionLabel,
  Stat,
  BarLine,
  Select,
  Collapsible,
  WizardProgress,
  Toast,
  TrendSparkline
} from './ui/monolith-extracted';
```

## TypeScript Interfaces

All components export TypeScript interfaces for their props:

- `RevealProps`
- `CardBgProps`
- `SectionLabelProps`
- `StatProps`
- `BarLineProps`
- `SelectProps` with `SelectOption` interface
- `CollapsibleProps`
- `WizardProgressProps`
- `ToastProps`
- `TrendSparklineProps`

## Features Preserved

- All original gradient styling maintained
- All shadow effects and animations preserved
- ARIA attributes for accessibility
- Bilingual support (English/Spanish)
- React hooks implementation
- No external dependencies beyond React
- Custom Tailwind class names

## Notes

- All components include `'use client'` directive for Next.js
- SelectDropdown.tsx contains the "Select" component (named SelectDropdown to avoid naming conflicts)
- IntersectionObserver used in Reveal component provides aggressive viewport detection
- All animations use CSS transitions for performance
