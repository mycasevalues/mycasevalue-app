'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Auto-performs demo sequence on calculator page:
 * 1. Auto-fill: Employment Discrimination case type
 * 2. Auto-fill: S.D.N.Y. (or similar district)
 * 3. Auto-fill: $150,000 damages
 * 4. Auto-fill: Yes, represented by attorney
 * 5. Auto-submit the form after 1s delay
 */
function DemoCalculatorContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';

  useEffect(() => {
    if (!isDemo) return;

    const timeouts: NodeJS.Timeout[] = [];

    // After 0.5s: auto-fill Employment Discrimination
    timeouts.push(
      setTimeout(() => {
        // Find the case type select
        const caseTypeSelect = document.querySelector(
          'select[aria-label*="case type" i]'
        ) as HTMLSelectElement | null;

        if (caseTypeSelect) {
          const options = Array.from(caseTypeSelect.querySelectorAll('option'));
          const empDiscOption = options.find(
            (opt) =>
              opt.textContent?.toLowerCase().includes('employment discrimination')
          );
          if (empDiscOption) {
            caseTypeSelect.value = empDiscOption.value;
            caseTypeSelect.dispatchEvent(
              new Event('change', { bubbles: true })
            );
          }
        }
      }, 500)
    );

    // After 1.0s: auto-fill district (S.D.N.Y.)
    timeouts.push(
      setTimeout(() => {
        // Look for any select that might be district-related
        const selects = document.querySelectorAll(
          'select'
        ) as NodeListOf<HTMLSelectElement>;

        let districtSelect: HTMLSelectElement | null = null;
        selects.forEach((sel) => {
          const label = sel.previousElementSibling?.textContent || '';
          const ariaLabel = sel.getAttribute('aria-label') || '';
          if (
            label.toLowerCase().includes('district') ||
            label.toLowerCase().includes('state') ||
            ariaLabel.toLowerCase().includes('district') ||
            ariaLabel.toLowerCase().includes('state')
          ) {
            districtSelect = sel;
          }
        });

        if (districtSelect) {
          const options = Array.from(districtSelect.querySelectorAll('option'));
          const sdnyOption = options.find(
            (opt) =>
              opt.textContent?.toLowerCase().includes('s.d.n.y') ||
              (opt.textContent?.toLowerCase().includes('southern') &&
                opt.textContent?.toLowerCase().includes('new york'))
          );
          if (sdnyOption) {
            districtSelect.value = sdnyOption.value;
            districtSelect.dispatchEvent(
              new Event('change', { bubbles: true })
            );
          }
        }
      }, 1000)
    );

    // After 1.5s: auto-fill damages input ($150,000)
    timeouts.push(
      setTimeout(() => {
        const damagesInput = document.querySelector(
          'input[inputmode="numeric"]'
        ) as HTMLInputElement | null;

        if (damagesInput) {
          damagesInput.value = '150000';
          damagesInput.dispatchEvent(
            new Event('change', { bubbles: true })
          );
          damagesInput.dispatchEvent(
            new Event('input', { bubbles: true })
          );
        }
      }, 1500)
    );

    // After 2.0s: auto-select "Yes" for represented by attorney
    timeouts.push(
      setTimeout(() => {
        // Look for radio buttons or selects for attorney representation
        const radios = document.querySelectorAll(
          'input[type="radio"]'
        ) as NodeListOf<HTMLInputElement>;

        // Find a "yes" radio option related to attorney
        radios.forEach((radio) => {
          const label = radio.nextElementSibling?.textContent || '';
          const parentLabel = radio.closest('label')?.textContent || '';
          if (
            (label.toLowerCase().includes('yes') ||
              parentLabel.toLowerCase().includes('yes')) &&
            (label.toLowerCase().includes('attorney') ||
              label.toLowerCase().includes('represented') ||
              parentLabel.toLowerCase().includes('attorney') ||
              parentLabel.toLowerCase().includes('represented'))
          ) {
            radio.checked = true;
            radio.dispatchEvent(
              new Event('change', { bubbles: true })
            );
          }
        });
      }, 2000)
    );

    // After 3.0s: submit the form
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
export default function DemoCalculator() {
  return (
    <Suspense fallback={null}>
      <DemoCalculatorContent />
    </Suspense>
  );
}
