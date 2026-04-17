'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

/**
 * Skeleton placeholder for card grid layouts (search results, case listings).
 * Renders a responsive grid of card placeholders with title, meta, and body lines.
 */
export function CardGridSkeleton({
  cards = 6,
  columns = 3,
  className = '',
}: {
  /** Number of card placeholders. Default 6. */
  cards?: number;
  /** Max columns in the grid. Default 3. */
  columns?: 2 | 3 | 4;
  /** Additional CSS class names. */
  className?: string;
}) {
  // Vary body line widths per card for a natural look
  const bodyWidths = [
    ['100%', '85%', '60%'],
    ['95%', '70%', '50%'],
    ['90%', '80%', '65%'],
    ['100%', '75%', '55%'],
    ['85%', '90%', '45%'],
    ['95%', '65%', '70%'],
  ];

  return (
    <div
      className={`mcv-skeleton-card-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 20,
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .mcv-skeleton-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .mcv-skeleton-card-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {Array.from({ length: cards }).map((_, i) => {
        const widths = bodyWidths[i % bodyWidths.length];
        return (
          <div
            key={i}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            {/* Card header: icon + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Skeleton
                width="32px"
                height="32px"
                borderRadius="var(--radius-sm)"
              />
              <div style={{ flex: 1 }}>
                <Skeleton width="70%" height="14px" borderRadius="var(--radius-xs)" />
              </div>
            </div>

            {/* Meta line (date, badge) */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <Skeleton width="60px" height="10px" borderRadius="var(--radius-xs)" />
              <Skeleton width="48px" height="10px" borderRadius="var(--radius-xs)" />
            </div>

            {/* Body text lines */}
            {widths.map((w, j) => (
              <React.Fragment key={j}>
                <Skeleton width={w} height="12px" borderRadius="var(--radius-xs)" />
                {j < widths.length - 1 && <div style={{ height: 6 }} />}
              </React.Fragment>
            ))}

            {/* Footer: action link placeholder */}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--bdr)' }}>
              <Skeleton width="80px" height="12px" borderRadius="var(--radius-xs)" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardGridSkeleton;
