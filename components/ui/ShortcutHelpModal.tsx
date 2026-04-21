'use client';

/**
 * ShortcutHelpModal -- Accessible modal overlay listing all keyboard shortcuts.
 *
 * Design tokens: --chrome-bg, --gold, --surf, --bdr, --card, --font-ui, --font-mono
 * Border radius: 2px buttons, 4px cards
 *
 * Accessibility:
 *  - role="dialog", aria-modal="true", aria-labelledby
 *  - Focus trap: Tab / Shift+Tab cycle inside the modal
 *  - Closes on Escape or clicking the backdrop
 */

import React, { useEffect, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Shortcut data                                                      */
/* ------------------------------------------------------------------ */

export interface ShortcutItem {
  keys: string[];
  description: string;
}

export interface ShortcutCategory {
  category: string;
  items: ShortcutItem[];
}

export const SHORTCUT_CATEGORIES: ShortcutCategory[] = [
  {
    category: 'Navigation',
    items: [
      { keys: ['\u2318/Ctrl', 'K'], description: 'Open command palette / quick search' },
      { keys: ['/'], description: 'Focus sidebar search' },
      { keys: ['G', 'C'], description: 'Go to Cases' },
      { keys: ['G', 'J'], description: 'Go to Judges' },
      { keys: ['G', 'D'], description: 'Go to Districts' },
      { keys: ['G', 'S'], description: 'Go to Search' },
      { keys: ['G', 'P'], description: 'Go to Pricing' },
      { keys: ['G', 'A'], description: 'Go to Attorney Tools' },
    ],
  },
  {
    category: 'Forms',
    items: [
      { keys: ['\u2318/Ctrl', '\u21A9'], description: 'Submit the current form' },
      { keys: ['Tab'], description: 'Move to next field' },
      { keys: ['Shift', 'Tab'], description: 'Move to previous field' },
    ],
  },
  {
    category: 'General',
    items: [
      { keys: ['?'], description: 'Toggle this shortcut help' },
      { keys: ['Esc'], description: 'Close any modal, drawer, or dropdown' },
    ],
  },
  {
    category: 'Judge Table',
    items: [
      { keys: ['\u2191', '\u2193'], description: 'Navigate through rows' },
      { keys: ['Enter'], description: 'Open selected judge profile' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ShortcutHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutHelpModal({ isOpen, onClose }: ShortcutHelpModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /* ---- Focus management ---- */
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Small delay to allow the modal to render before focusing
      requestAnimationFrame(() => {
        dialogRef.current?.focus();
      });
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  /* ---- Focus trap ---- */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === dialogRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose],
  );

  /* ---- Lock body scroll ---- */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcut-help-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative outline-none w-full max-w-lg mx-4 overflow-hidden"
        style={{
          background: 'var(--card, #FFFFFF)',
          borderRadius: '4px',
          border: '1px solid var(--bdr, #E5E7EB)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: 'var(--chrome-bg, #1B2D45)',
            color: '#FFFFFF',
          }}
        >
          <h2
 id="shortcut-help-title"
 
 style={{ fontFamily: 'var(--font-ui, "Source Sans 3", sans-serif)', fontSize: 14, fontWeight: 600 }}
 >
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            aria-label="Close shortcuts help"
            className="p-1 rounded hover:bg-white/10 transition-colors"
            style={{ borderRadius: '2px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto" style={{ background: 'var(--surf, #FFFFFF)' }}>
          {SHORTCUT_CATEGORIES.map((section) => (
            <div key={section.category} className="mb-6 last:mb-0">
              <h3
 className="text-[11px] uppercase tracking-widest mb-3"
 style={{ color: 'var(--gold, #C4882A)',
 fontFamily: 'var(--font-ui, "Source Sans 3", sans-serif)', fontWeight: 600 }}
 >
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <span
 
 style={{ color: 'var(--text-primary, #1B2D45)', fontSize: 14 }}
 >
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                      {shortcut.keys.map((k, ki) => (
                        <React.Fragment key={ki}>
                          {ki > 0 && (
                            <span
 className="mx-0.5"
 style={{ color: 'var(--text-tertiary, #8A8A8A)', fontSize: 12 }}
 >
                              +
                            </span>
                          )}
                          <kbd
 className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-1.5"
 style={{ fontFamily: 'var(--font-mono, "IBM Plex Mono", monospace)',
 color: 'var(--text-primary, #1B2D45)',
 background: 'var(--card, #FFFFFF)',
 border: '1px solid var(--bdr, #E5E7EB)',
 borderRadius: '2px',
 boxShadow: '0 1px 2px rgba(0,0,0,0.06)', fontSize: 12, fontWeight: 500 }}
 >
                            {k}
                          </kbd>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 text-center"
          style={{
            borderTop: '1px solid var(--bdr, #E5E7EB)',
            background: 'var(--card, #FFFFFF)',
          }}
        >
          <p className="text-[11px]" style={{ color: 'var(--text-tertiary, #8A8A8A)' }}>
            Press{' '}
            <kbd
 className="px-1 py-0.5 text-[10px]"
 style={{ fontFamily: 'var(--font-mono, "IBM Plex Mono", monospace)',
 background: 'var(--surf, #FFFFFF)',
 border: '1px solid var(--bdr, #E5E7EB)',
 borderRadius: '2px', fontWeight: 500 }}
 >
              ?
            </kbd>{' '}
            anytime to toggle this panel
          </p>
        </div>
      </div>
    </div>
  );
}
