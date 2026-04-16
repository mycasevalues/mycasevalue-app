'use client';

/**
 * MasterDetailLayout — Split-pane layout for research pages.
 *
 * Desktop: Master list (35%) | Detail panel (65%)
 * Tablet: Master list (40%) | Detail panel (60%)
 * Mobile: Full-screen list, tap to see detail (overlay)
 *
 * Used by: Judges, Cases (future), Districts (future)
 */

import { useState, useCallback, ReactNode } from 'react';

interface MasterDetailLayoutProps {
  /** The scrollable list panel (left side) */
  masterPanel: ReactNode;
  /** The detail panel (right side) — shown when an item is selected */
  detailPanel: ReactNode | null;
  /** Placeholder shown when nothing is selected */
  emptyDetail?: ReactNode;
  /** Whether an item is currently selected (controls mobile overlay) */
  hasSelection: boolean;
  /** Called when user wants to close the detail panel (mobile back button) */
  onCloseDetail?: () => void;
  /** Master panel width as percentage (default: 35) */
  masterWidth?: number;
}

export default function MasterDetailLayout({
  masterPanel,
  detailPanel,
  emptyDetail,
  hasSelection,
  onCloseDetail,
  masterWidth = 35,
}: MasterDetailLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden">
      {/* Master Panel (list) */}
      <div
        className={`
          flex-shrink-0 overflow-y-auto border-r border-white/5 bg-[#0c1220]
          ${hasSelection ? 'hidden lg:block' : 'w-full lg:w-auto'}
        `}
        style={{ width: `${masterWidth}%`, minWidth: hasSelection ? undefined : '100%' }}
      >
        {/* On mobile, master takes full width when no selection */}
        <div className="lg:hidden w-full">{!hasSelection && masterPanel}</div>
        {/* On desktop, master always shows at fixed width */}
        <div className="hidden lg:block">{masterPanel}</div>
      </div>

      {/* Detail Panel */}
      <div
        className={`
          flex-1 overflow-y-auto bg-[var(--color-surface-2)]
          ${hasSelection ? 'block' : 'hidden lg:block'}
        `}
      >
        {/* Mobile back button */}
        {hasSelection && (
          <div className="lg:hidden sticky top-0 z-10 bg-[#111827] border-b border-white/5 px-4 py-3">
            <button
              onClick={onCloseDetail}
              className="flex items-center gap-2 text-sm text-brand-blue font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to list
            </button>
          </div>
        )}

        {detailPanel || emptyDetail || (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4 text-gray-300">
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
              <p className="text-sm font-medium">Select an item to see details</p>
              <p className="text-xs mt-1 text-gray-300">Click any item in the list</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Compact list item for master panel — high density, minimal padding
 */
export function MasterListItem({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 border-b border-gray-50 transition-colors
        ${isActive
          ? 'bg-blue-50 border-l-2 border-l-brand-blue'
          : 'hover:bg-[var(--color-surface-2)] border-l-2 border-l-transparent'
        }
      `}
    >
      {children}
    </button>
  );
}

/**
 * Stat pill for compact display in list items
 */
export function StatPill({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs">
      <span className="text-gray-400">{label}</span>
      <span className="font-mono font-semibold" style={{ color: color || 'var(--color-text-primary)' }}>
        {value}
      </span>
    </span>
  );
}
