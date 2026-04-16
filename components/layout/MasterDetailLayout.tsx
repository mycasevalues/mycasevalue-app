'use client';

/**
 * MasterDetailLayout — Bloomberg-style split-pane layout for research pages.
 *
 * Desktop: Master list (35%) | Detail panel (65%)
 * Tablet: Master list (40%) | Detail panel (60%)
 * Mobile: Full-screen list, tap to see detail (overlay)
 *
 * Light mode: white backgrounds, #E0E0E0 borders, Bloomberg palette.
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
          background: '#FFFFFF',
          borderRight: '1px solid #E0E0E0',
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
        style={{ background: '#F7F7F5' }}
      >
        {/* Mobile back button */}
        {hasSelection && (
          <div
            className="lg:hidden sticky top-0 z-10"
            style={{
              background: '#FFFFFF',
              borderBottom: '1px solid #E0E0E0',
              padding: '10px 16px',
            }}
          >
            <button
              onClick={onCloseDetail}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'var(--font-inter)',
                color: '#0052CC',
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
              color: '#888888',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#CCCCCC"
                strokeWidth="1"
                style={{ margin: '0 auto 16px' }}
              >
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
              </svg>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#444444' }}>
                Select an item to see details
              </p>
              <p style={{ fontSize: 12, marginTop: 4, color: '#888888' }}>
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
        padding: '10px 16px',
        borderBottom: '1px solid #F0F0F0',
        borderLeft: isActive ? '3px solid #E65C00' : '3px solid transparent',
        background: isActive ? '#EFF5FF' : 'transparent',
        cursor: 'pointer',
        transition: 'background 80ms',
        border: 'none',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: '#F0F0F0',
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
        borderLeftColor: isActive ? '#E65C00' : 'transparent',
        fontFamily: 'var(--font-inter)',
      }}
      className="master-list-item"
    >
      {children}
      <style>{`
        .master-list-item:hover { background: #EFF5FF !important; }
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
      <span style={{ color: '#888888' }}>{label}</span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: color || '#1A1A1A',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
    </span>
  );
}
