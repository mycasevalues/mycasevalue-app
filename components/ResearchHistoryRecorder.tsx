'use client';

/**
 * ResearchHistoryRecorder — client-side route listener that writes
 * qualifying page visits to the research history store. Mounted once
 * at the root layout so every route change is captured.
 *
 * Routes tracked (via classifyPath in lib/researchHistory.ts):
 *   - /judges/[id]
 *   - /districts/[code]
 *   - /case/[id]
 *   - /cases/[category]/[slug]
 *   - /nos/[code]/guide
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { classifyPath, pushResearchHistory } from '../lib/researchHistory';

export default function ResearchHistoryRecorder() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    // Defer slightly so document.title is updated by the route's metadata.
    const id = window.setTimeout(() => {
      const classification = classifyPath(pathname, document.title);
      if (classification) {
        pushResearchHistory({
          href: pathname,
          label: classification.label,
          kind: classification.kind,
        });
      }
    }, 400);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
