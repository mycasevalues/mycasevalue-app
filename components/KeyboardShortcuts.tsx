'use client';

/**
 * KeyboardShortcuts -- Global client component that registers keyboard
 * shortcuts for attorney power users.
 *
 * Registered shortcuts:
 *  - Cmd/Ctrl + K       -- Focus search input (delegates to command palette)
 *  - Cmd/Ctrl + Enter   -- Submit the current form
 *  - Escape             -- Close any open modal / drawer / dropdown
 *  - ?                  -- Toggle shortcut help overlay
 *
 * Non-intrusive: shortcuts that overlap with the browser (Cmd+L, Cmd+T, etc.)
 * are intentionally *not* registered so they keep working normally.
 */

import { useState, useCallback } from 'react';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import ShortcutHelpModal from '@/components/ui/ShortcutHelpModal';

export default function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false);

  /* ----- Cmd/Ctrl + K: focus search ----- */
  useKeyboardShortcut(
    'k',
    useCallback(() => {
      // The GlobalCommandPalette already handles Cmd+K.
      // This is a safety fallback: if the command palette isn't mounted,
      // try to focus a visible search input on the page.
      const searchInput = document.querySelector<HTMLInputElement>(
        'input[type="search"], input[name="search"], input[name="q"], input[placeholder*="Search"], input[aria-label*="Search"], input[aria-label*="search"]',
      );
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }, []),
    { meta: true, preventDefault: true },
  );

  /* ----- Cmd/Ctrl + Enter: submit current form ----- */
  useKeyboardShortcut(
    'Enter',
    useCallback(() => {
      // Find the nearest form to the active element, then click its submit button
      const active = document.activeElement as HTMLElement | null;

      // Walk up to find a form
      const form = active?.closest('form');
      if (form) {
        const submitBtn = form.querySelector<HTMLButtonElement>(
          'button[type="submit"], input[type="submit"]',
        );
        if (submitBtn) {
          submitBtn.click();
          return;
        }
        // Fallback: call requestSubmit which triggers validation
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.submit();
        }
      }
    }, []),
    { meta: true, preventDefault: true, allowInInput: true },
  );

  /* ----- Escape: close modals / drawers / dropdowns ----- */
  useKeyboardShortcut(
    'Escape',
    useCallback(() => {
      // If our own help modal is open, close it first
      if (helpOpen) {
        setHelpOpen(false);
        return;
      }

      // Try to close any visible close button in a modal/dialog/drawer
      const closeTargets = [
        // Native <dialog> elements
        ...Array.from(document.querySelectorAll<HTMLDialogElement>('dialog[open]')),
        // Portalled modals with common patterns
        ...Array.from(
          document.querySelectorAll<HTMLElement>(
            '[role="dialog"], [data-state="open"], [data-radix-popper-content-wrapper], .modal--open',
          ),
        ),
      ];

      for (const el of closeTargets) {
        if (el instanceof HTMLDialogElement) {
          el.close();
          return;
        }
        // Look for a close button inside the element
        const closeBtn = el.querySelector<HTMLButtonElement>(
          'button[aria-label*="close" i], button[aria-label*="Close" i], button[data-dismiss], [data-close]',
        );
        if (closeBtn) {
          closeBtn.click();
          return;
        }
      }

      // Blur any focused element as a last resort (closes dropdowns)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, [helpOpen]),
    { preventDefault: false, allowInInput: true },
  );

  /* ----- ? : toggle shortcut help ----- */
  useKeyboardShortcut(
    '?',
    useCallback(() => {
      setHelpOpen((prev) => !prev);
    }, []),
    { preventDefault: true },
  );

  return <ShortcutHelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />;
}
