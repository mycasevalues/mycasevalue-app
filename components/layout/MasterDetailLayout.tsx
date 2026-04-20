'use client';

/**
 * MasterDetailLayout — Westlaw-style split-pane layout for research pages.
 *
 * Desktop: Master list (35%) | Detail panel (65%)
 * Tablet: Master list (40%) | Detail panel (60%)
 * Mobile: Full-screen list, tap to see detail (overlay)
 *
 * Light mode: white backgrounds, var(--bdr, #E2DFD8) borders, Westlaw palette.
 */

import { ReactNode } from 'react';

interface MasterDetailLayoutProps {
  masterPanel: ReactNode;
  detailPanel: ReactNode | null;
  emptyDetail?: ReactNode;
  hasSelection: boolean;
  onCloseDetail?: () => void;
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
          flex-shrink-0 overflow-y-auto
          ${hasSelection ? 'hidden lg:block' : 'w-full lg:w-auto'}
        `}
        style={{
          width: `${masterWidth}%`,
          minWidth: hasSelection ? undefined : '100%',
          background: 'var(--card, #FFFFFF)',
          borderRight: '1px solid var(--bdr, var(--bdr, #E2DFD8))',
        }}
      >
        <div className="lg:hidden w-full">{!hasSelection && masterPanel}</div>
        <div className="hidden lg:block">{masterPanel}</div>
      </div>

      {/* Detail Panel */}
      <div
        className={`
          flex-1 overflow-y-auto
          ${hasSelection ? 'block' : 'hidden lg:block'}
        `}
        style={{ background: 'var(--surf, #F6F5F2)' }}
      >
        {/* Mobile back button */}
        {hasSelection && (
          <div
            className="lg:hidden sticky top-0 z-10"
            style={{
              background: 'var(--card, #FFFFFF)',
              borderBottom: '1px solid var(--bdr, #E2DFD8)',
              padding: '8px 16px',
            }}
          >
            <button
              onClick={onCloseDetail}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link, #0A50A2)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to list
            </button>
          </div>
        )}

        {detailPanel || emptyDetail || (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'var(--text4, #8A8780)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--bdr, #E2DFD8)"
                strokeWidth="1"
                style={{ margin: '0 auto 16px' }}
              >
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text2, #42403C)' }}>
                Select an item to see details
              </p>
              <p style={{ fontSize: 12, marginTop: 4, color: 'var(--text4, #8A8780)' }}>
                Click any item in the list
              </p>
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
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '8px 16px',
        borderBottom: '1px solid var(--bdr)',
        borderLeft: isActive ? '3px solid var(--gold, #C4882A)' : '3px solid transparent',
        background: isActive ? 'var(--link-light)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 80ms',
        border: 'none',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'var(--bdr)',
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
        borderLeftColor: isActive ? 'var(--gold, #C4882A)' : 'transparent',
        fontFamily: 'var(--font-ui)',
      }}
      className="master-list-item"
    >
      {children}
      <style>{`
        .master-list-item:hover { background: var(--link-light) !important; }
      `}</style>
    </button>
  );
}

/**
 * Stat pill for compact display in list items
 */
export function StatPill({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
      <span style={{ color: 'var(--text4, #8A8780)' }}>{label}</span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: color || 'var(--text1, #18181A)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
    </span>
  );
}
