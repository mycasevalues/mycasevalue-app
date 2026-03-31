# Phase 0 — Audit Baseline

## 0.1 Build Warnings/Errors
- [x] BUILD: Compiles successfully, zero TypeScript errors
- [ ] WARNING: "Failed to download stylesheet for fonts.googleapis.com" — Google Fonts CDN dependency must be removed (Phase 1.2)

## 0.2 Color Audit — Off-Token Values
93+ unique hex colors, 60+ rgba values found. Key violations:
- [ ] #4040F2, #3535D0, #5C5CF5, #3030C0 — blue variants not in token set
- [ ] #B8923A, #C9A54E, #D4B85A — gold colors not in token set
- [ ] #E87461 — coral used for losses instead of semantic --outcome-loss (#EF4444)
- [ ] #666, #999, #ddd, #fafafa — generic grays not in token set
- [ ] #243352, #1E2941, #0F1729 — ad-hoc dark backgrounds not in tokens
- [ ] 15+ shades of gray used inconsistently for muted text
- [ ] Category colors (10 unique) need consolidation into tokens
- [ ] 60+ rgba shadow/glass values need consolidation

## 0.3 Animation Audit
95+ @keyframes declarations in globals.css. Critical findings:
- [ ] 33 animations >500ms running infinitely WITHOUT prefers-reduced-motion override
- [ ] particleDrift (20s infinite), ambientFloat (12s), blobMorph (12s), morphBlob (8s) — extremely heavy
- [ ] scanLine, holoShift, liquidBorder — decorative, no reduced-motion guard
- [ ] skeleton-shimmer, breathe, gentleFloat — utility animations missing override
- [ ] Multiple page-load animations fire simultaneously causing mobile jank

## 0.4 Google Fonts References
- [ ] app/layout.tsx lines 150-155: <link> tags to fonts.googleapis.com + fonts.gstatic.com
- [ ] components/ui/CaseComparison.tsx line 111: redundant @import url() to Google Fonts
- [ ] next.config.js lines 23-24: CSP allows fonts.googleapis.com and fonts.gstatic.com

## 0.5 Route Audit
| Route | Skip Link | Breadcrumb | OG Meta | Mobile OK |
|-------|-----------|------------|---------|-----------|
| / | ✓ (root) | N/A | ✓ (root) | TBD |
| /about | ✓ | ✓ | ✓ | TBD |
| /cases | ✓ | ✓ | ✓ | TBD |
| /cases/[cat] | ✓ | ✓ | ✓ | TBD |
| /faq | ✓ | ✓ | ✓ | TBD |
| /methodology | ✓ | ✓ | ⚠ no og:image | TBD |
| /nos | ✓ | ✓ | ✓ | TBD |
| /nos/[code] | ✓ | ✓ | ✓ | TBD |
| /privacy | ✓ | ✓ | ⚠ no og:image | TBD |
| /terms | ✓ | ✓ | ⚠ no og:image | TBD |

## 0.6 Tap Target Audit (requires visual testing)
- [ ] All interactive elements need min 44x44px on mobile — to be verified per component

---
All items above are the contract. Every flagged item must be resolved.
