'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Auto-performs demo sequence on NOS pages:
 * Scrolls through key sections with pauses:
 * 1. 2s at primary metrics row
 * 2. 2s at settlement range section
 * 3. 2s at win rate by district chart
 * 4. 2s at relevant opinions
 */
function DemoNOSPageContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  useEffect(() => {
    if (!isDemo) return;

    const timeouts: NodeJS.Timeout[] = [];

    // Helper function to scroll to element smoothly
    function scrollToElement(selector: string, delay: number) {
      timeouts.push(
        setTimeout(() => {
          const element = document.querySelector(selector);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, delay)
      );
    }

    // 0s-2s: Scroll to primary metrics row (usually near top with win rate, settlement, etc.)
    scrollToElement('[data-section*="metric"], .metrics-grid, [class*="metric"]', 500);

    // 2s-4s: Scroll to settlement range section
    scrollToElement('[data-section*="settlement"], [class*="settlement"], .settlement-range', 2500);

    // 4s-6s: Scroll to win rate by district / chart section
    scrollToElement('[data-section*="win"], [class*="chart"], [class*="district"]', 4500);

    // 6s-8s: Scroll to relevant opinions section
    scrollToElement('[data-section*="opinion"], .relevant-opinions, [class*="opinion"]', 6500);

    // Cleanup
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [isDemo]);

  return null;
}

/**
 * Wrapped in Suspense to support useSearchParams in Next.js App Router
 */
export default function DemoNOSPage() {
  return (
    <Suspense fallback={null}>
      <DemoNOSPageContent />
    </Suspense>
  );
}
