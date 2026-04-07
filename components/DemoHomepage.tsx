'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Auto-performs demo sequence on homepage:
 * 1. Scroll to Quick Case Lookup form
 * 2. Auto-select "Employment Discrimination" case type
 * 3. Auto-select a district (e.g., "New York")
 * 4. Auto-submit the form
 */
function DemoHomepageContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  useEffect(() => {
    if (!isDemo) return;

    // Chain of timeouts for demo sequence
    const timeouts: NodeJS.Timeout[] = [];

    // After 1.5s: scroll to Quick Case Lookup form
    timeouts.push(
      setTimeout(() => {
        // Find the Quick Case Lookup form — look for the wrapper with "Quick Case Lookup" text
        const formElement = document.querySelector('[aria-label="Hero section"]');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1500)
    );

    // After 2.0s (1.5s + 0.5s): auto-select Employment Discrimination
    timeouts.push(
      setTimeout(() => {
        // Find the case type select in QuickLookupForm
        const caseTypeSelect = document.querySelector(
          'form select[aria-label="Select your case type"]'
        ) as HTMLSelectElement | null;

        if (caseTypeSelect) {
          // Find "Employment Discrimination" option
          const options = Array.from(caseTypeSelect.querySelectorAll('option'));
          const empDiscOption = options.find(
            (opt) =>
              opt.textContent?.toLowerCase().includes('employment discrimination')
          );
          if (empDiscOption) {
            caseTypeSelect.value = empDiscOption.value;
            // Trigger change event
            caseTypeSelect.dispatchEvent(
              new Event('change', { bubbles: true })
            );
          }
        }
      }, 2000)
    );

    // After 2.5s (1.5s + 1.0s): auto-select New York district
    timeouts.push(
      setTimeout(() => {
        const districtSelect = document.querySelector(
          'form select[aria-label="Select your district or state"]'
        ) as HTMLSelectElement | null;

        if (districtSelect) {
          // Find "New York" or "S.D.N.Y." option
          const options = Array.from(districtSelect.querySelectorAll('option'));
          const nyOption = options.find(
            (opt) =>
              opt.textContent?.toLowerCase().includes('new york') ||
              opt.textContent?.toLowerCase().includes('s.d.n.y')
          );
          if (nyOption) {
            districtSelect.value = nyOption.value;
            districtSelect.dispatchEvent(
              new Event('change', { bubbles: true })
            );
          }
        }
      }, 2500)
    );

    // After 3.0s (1.5s + 1.5s): submit the form
    timeouts.push(
      setTimeout(() => {
        const form = document.querySelector(
          'form'
        ) as HTMLFormElement | null;
        if (form) {
          form.dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true })
          );
        }
      }, 3000)
    );

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
export default function DemoHomepage() {
  return (
    <Suspense fallback={null}>
      <DemoHomepageContent />
    </Suspense>
  );
}
