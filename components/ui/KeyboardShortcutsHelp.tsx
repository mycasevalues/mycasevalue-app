'use client';

/**
 * KeyboardShortcutsHelp — Modal showing all keyboard shortcuts.
 * Triggered by pressing "?" key. Enterprise platforms always have this.
 */

import { useState, useEffect } from 'react';

const SHORTCUTS = [
  { category: 'Navigation', items: [
    { keys: ['⌘', 'K'], description: 'Open command palette / quick search' },
    { keys: ['/'], description: 'Focus sidebar search' },
    { keys: ['?'], description: 'Show keyboard shortcuts' },
    { keys: ['Esc'], description: 'Close any modal or panel' },
  ]},
  { category: 'Judge Table', items: [
    { keys: ['↑', '↓'], description: 'Navigate through rows' },
    { keys: ['Enter'], description: 'Open selected judge profile' },
    { keys: ['Esc'], description: 'Deselect current row' },
  ]},
  { category: 'Quick Navigation', items: [
    { keys: ['G', 'C'], description: 'Go to Cases' },
    { keys: ['G', 'J'], description: 'Go to Judges' },
    { keys: ['G', 'D'], description: 'Go to Districts' },
    { keys: ['G', 'S'], description: 'Go to Search' },
    { keys: ['G', 'P'], description: 'Go to Pricing' },
  ]},
];

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingG, setPendingG] = useState(false);

  useEffect(() => {
    let gTimeout: NodeJS.Timeout;

    const handleKey = (e: KeyboardEvent) => {
      const isTyping =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement instanceof HTMLSelectElement;

      if (isTyping) return;

      // ? to open shortcuts help
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // G + key combos for quick navigation
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !pendingG) {
        setPendingG(true);
        gTimeout = setTimeout(() => setPendingG(false), 1000);
        return;
      }

      if (pendingG) {
        setPendingG(false);
        clearTimeout(gTimeout);
        const routes: Record<string, string> = {
          c: '/cases', j: '/judges', d: '/districts',
          s: '/search', p: '/pricing', a: '/attorney',
          t: '/trends', m: '/map',
        };
        if (routes[e.key]) {
          e.preventDefault();
          window.location.href = routes[e.key];
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      clearTimeout(gTimeout);
    };
  }, [isOpen, pendingG]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      {/* Modal */}
      <div className="relative bg-[var(--surf,#F6F5F2)] rounded shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--bdr, #E2DFD8)]">
          <h2 className="text-[var(--color-text-muted)]" style={{ fontSize: 16, fontWeight: 600 }}>Keyboard Shortcuts</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-[var(--color-text-muted)] hover:text-[var(--text2)] rounded"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Shortcuts */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {SHORTCUTS.map((section) => (
            <div key={section.category} className="mb-5 last:mb-0">
              <h3 className="uppercase tracking-wider text-[var(--color-text-muted)] mb-2" style={{ fontSize: 12, fontWeight: 600 }}>
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[var(--color-text-muted)]" style={{ fontSize: 14 }}>{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, ki) => (
                        <span key={ki}>
                          {ki > 0 && <span className="text-[var(--color-text-muted)] mx-0.5" style={{ fontSize: 12 }}>+</span>}
                          <kbd className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 font-mono text-[var(--text2)] bg-[rgba(255,255,255,0.04)] border border-[var(--bdr, #E2DFD8)] rounded" style={{ fontSize: 12, fontWeight: 500 }}>
                            {key}
                          </kbd>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[var(--bdr, #E2DFD8)] bg-[var(--color-surface-2)]">
          <p className="text-[11px] text-[var(--color-text-muted)] text-center">
            Press <kbd className="px-1 py-0.5 text-[10px] bg-[var(--text1,#18181A)] border border-[var(--bdr, #E2DFD8)] rounded font-mono">?</kbd> anytime to toggle this panel
          </p>
        </div>
      </div>
    </div>
  );
}
