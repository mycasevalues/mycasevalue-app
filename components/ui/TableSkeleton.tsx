'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

/**
 * Skeleton placeholder for data tables (cases, districts, judges pages).
 * Renders a header row + configurable data rows with varying column widths
 * to mimic real table content.
 */
export function TableSkeleton({
  rows = 6,
  columns = 5,
  className = '',
}: {
  /** Number of data rows. Default 6. */
  rows?: number;
  /** Number of columns. Default 5. */
  columns?: number;
  /** Additional CSS class names. */
  className?: string;
}) {
  // Column width patterns for visual variation (percentages of cell width)
  const colWidths = ['65%', '80%', '50%', '70%', '45%', '60%', '75%', '55%'];

  return (
    <div
      className={className}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--bdr)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 12,
          padding: '12px 16px',
          background: 'var(--tbl-hdr)',
          borderBottom: '1px solid var(--bdr-strong)',
        }}
      >
        {Array.from({ length: columns }).map((_, c) => (
          <Skeleton
            key={`hdr-${c}`}
            width={`${50 + (c * 12) % 40}%`}
            height="12px"
            borderRadius="var(--radius-xs)"
          />
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={`row-${r}`}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 12,
            padding: '12px 16px',
            background: r % 2 === 1 ? 'var(--tbl-alt)' : 'var(--card)',
            borderBottom: r < rows - 1 ? '1px solid var(--bdr)' : 'none',
          }}
        >
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton
              key={`cell-${r}-${c}`}
              width={colWidths[(r + c) % colWidths.length]}
              height="14px"
              borderRadius="var(--radius-xs)"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;
