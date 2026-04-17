'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

/**
 * Pre-built skeleton layout matching the ToolPageLayout pattern used
 * across all attorney tool pages. Renders placeholder blocks for:
 *   - Page title + description header
 *   - Form input area (label + input pairs)
 *   - Result / output card area
 *
 * Drop this into any `loading.tsx` inside app/attorney/[tool]/.
 */
export function ToolPageSkeleton({
  inputCount = 3,
  showResultCard = true,
}: {
  /** Number of form input skeletons to show. Default 3. */
  inputCount?: number;
  /** Whether to show the result card area. Default true. */
  showResultCard?: boolean;
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-primary)' }}>
      {/* ── Header: title + description ── */}
      <div
        style={{
          borderBottom: '1px solid var(--bdr)',
          background: 'var(--surface-primary)',
        }}
      >
        <div style={{ maxWidth: 896, margin: '0 auto', padding: '16px 24px' }}>
          {/* Breadcrumb placeholder */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <Skeleton width="60px" height="12px" borderRadius="var(--radius-xs)" />
            <Skeleton width="8px" height="12px" borderRadius="var(--radius-xs)" />
            <Skeleton width="90px" height="12px" borderRadius="var(--radius-xs)" />
          </div>

          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <Skeleton width="280px" height="28px" borderRadius="var(--radius-xs)" />
            <Skeleton width="40px" height="22px" borderRadius="var(--radius-sm)" />
          </div>

          {/* Description lines */}
          <Skeleton width="85%" height="14px" borderRadius="var(--radius-xs)" />
          <div style={{ height: 6 }} />
          <Skeleton width="60%" height="14px" borderRadius="var(--radius-xs)" />
        </div>
      </div>

      {/* ── Content area ── */}
      <div style={{ maxWidth: 896, margin: '0 auto', padding: '24px 24px 48px' }}>
        {/* Form inputs section */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: 'var(--radius-md)',
            padding: 24,
            marginBottom: 24,
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          {/* Section heading */}
          <Skeleton width="140px" height="16px" borderRadius="var(--radius-xs)" className="" />
          <div style={{ height: 20 }} />

          {/* Input fields */}
          {Array.from({ length: inputCount }).map((_, i) => (
            <div key={i} style={{ marginBottom: i < inputCount - 1 ? 20 : 0 }}>
              {/* Label */}
              <Skeleton
                width={`${80 + (i * 20) % 60}px`}
                height="12px"
                borderRadius="var(--radius-xs)"
              />
              <div style={{ height: 8 }} />
              {/* Input field */}
              <Skeleton
                width="100%"
                height="36px"
                borderRadius="var(--radius-xs)"
              />
            </div>
          ))}

          <div style={{ height: 20 }} />

          {/* Submit button placeholder */}
          <Skeleton width="120px" height="36px" borderRadius="var(--radius-xs)" />
        </div>

        {/* Result card area */}
        {showResultCard && (
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 'var(--radius-md)',
              padding: 24,
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            {/* Result heading */}
            <Skeleton width="160px" height="18px" borderRadius="var(--radius-xs)" />
            <div style={{ height: 16 }} />

            {/* Stat row */}
            <div
              className="mcv-skeleton-stat-row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                marginBottom: 20,
              }}
            >
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    padding: 16,
                    background: 'var(--surf)',
                    border: '1px solid var(--bdr)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                  }}
                >
                  <Skeleton width="50%" height="24px" borderRadius="var(--radius-xs)" className="mcv-skeleton--center" />
                  <div style={{ height: 8 }} />
                  <Skeleton width="70%" height="12px" borderRadius="var(--radius-xs)" className="mcv-skeleton--center" />
                </div>
              ))}
            </div>

            {/* Body text lines */}
            <Skeleton width="100%" height="14px" borderRadius="var(--radius-xs)" />
            <div style={{ height: 8 }} />
            <Skeleton width="90%" height="14px" borderRadius="var(--radius-xs)" />
            <div style={{ height: 8 }} />
            <Skeleton width="75%" height="14px" borderRadius="var(--radius-xs)" />
            <div style={{ height: 8 }} />
            <Skeleton width="55%" height="14px" borderRadius="var(--radius-xs)" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ToolPageSkeleton;
