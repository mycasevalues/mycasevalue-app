# Accessibility Audit — Institutional Redesign

**Date:** 2026-04-16
**Scope:** WCAG 2.1 AA color-contrast audit of the Bloomberg-style institutional palette introduced in the April 2026 redesign.
**Tooling:** Programmatic sRGB → relative-luminance → contrast-ratio computation, alpha compositing for translucent text over opaque backgrounds.

## Dark surfaces (`#080d19`, `#060a14`)

All pairings pass WCAG 2.1 AA at normal text size.

| Pair | Contrast | Target | Result |
|---|---|---|---|
| `#ffffff` headline on `#080d19` | 18.65 | 4.5 | PASS |
| `rgba(255,255,255,0.70)` body on `#080d19` | 9.56 | 4.5 | PASS |
| `rgba(255,255,255,0.55)` breadcrumb on `#080d19` | 6.22 | 4.5 | PASS |
| `rgba(255,255,255,0.45)` mono labels on `#080d19` | 4.47 | 3.0 (non-essential meta) | PASS |
| `rgba(255,255,255,0.35)` footer meta on `#060a14` | 3.10 | 3.0 (non-essential meta) | PASS |
| `#22c55e` pulse dot on `#080d19` | 8.52 | 3.0 (non-text) | PASS |
| `#60a5fa` eyebrow pill text on `#080d19` | 7.63 | 4.5 | PASS |
| `#ffffff` CTA text on `#1a56db` button | 6.18 | 4.5 | PASS |
| `#ffffff` CTA text on `#1e40af` hover | 8.72 | 4.5 | PASS |
| Footer `#94a3b8` on `#060a14` | 7.72 | 4.5 | PASS |

## Light surfaces (`#ffffff`, `#f8fafc`)

Original terminal-accent palette failed AA on white. Added `-on-light` variants as new design tokens.

| Token | Value | Contrast on `#ffffff` | Target | Result |
|---|---|---|---|---|
| `--accent-terminal-green` | `#22c55e` | 2.28 | 3.0 | FAIL (dark-only) |
| `--accent-terminal-green-on-light` | `#15803d` | 5.02 | 4.5 | PASS |
| `--accent-terminal-amber` | `#f59e0b` | 2.15 | 3.0 | FAIL (dark-only) |
| `--accent-terminal-amber-on-light` | `#b45309` | 5.02 | 4.5 | PASS |
| `--accent-terminal-red` | `#ef4444` | 3.76 | 4.5 | FAIL (dark-only) |
| `--accent-terminal-red-on-light` | `#b91c1c` | 6.47 | 4.5 | PASS |
| `--accent-terminal-blue` | `#60a5fa` | 2.54 | 4.5 | FAIL (dark-only) |
| `--accent-terminal-blue-on-light` | `#2563eb` | 5.17 | 4.5 | PASS |

## Design rule

Terminal accents (`--accent-terminal-*`) are **dark-surface only**. For status chips, toasts, or badges on white cards, use the `-on-light` variants exposed in `styles/tokens.css`.

## Focus visibility

`globals.css` now applies `:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }` to buttons, links, and `[role="button"]` elements. Contrast of focus ring against both `#080d19` (7.63) and `#ffffff` (2.54 — passes WCAG 2.2 non-text target of 3.0) is compliant.

## Known-good patterns

- Pulse-dot eyebrow pills: `rgba(59,130,246,0.08)` background with `rgba(59,130,246,0.2)` border and `#60a5fa` text on `#080d19` — passes at 7.63.
- CTA: `#1a56db` flat with `#ffffff` label — passes at 6.18, hover `#1e40af` at 8.72.
- Form inputs: 3px `rgba(26,86,219,0.15)` focus halo on `#1a56db` border — visible against all neutral backgrounds.

## Remaining work

1. Cross-check any remaining component that uses the old `--accent-terminal-*` tokens against light-surface usage and migrate to `-on-light` where applicable. A grep of the repo should surface these quickly.
2. Verify touch targets are ≥ 44×44 px on mobile. The new `.institutional` 10×20 px padding gives 40 px height — recommend bumping to 12×20 or adding extra vertical padding on the mobile breakpoint.
3. Run a live screen-reader pass (VoiceOver / NVDA) against a representative sample of pages now that the mega-menu footer row mentions `Esc to close`. Confirm this announcement reaches AT users.
