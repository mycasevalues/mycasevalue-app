'use client';

import React from 'react';

interface SkeletonProps {
  /** Width of the skeleton element (CSS value). Defaults to '100%'. */
  width?: string;
  /** Height of the skeleton element (CSS value). Defaults to '16px'. */
  height?: string;
  /** Border radius (CSS value). Defaults to 'var(--radius-md)' (4px). */
  borderRadius?: string;
  /** Additional CSS class names. */
  className?: string;
}

/**
 * Reusable skeleton placeholder with a left-to-right shimmer animation.
 * Uses the Westlaw Precision design tokens:
 *   - Base color: var(--surf) #F6F5F2
 *   - Shimmer sweep: slightly darker via var(--bdr) #E2DFD8
 *
 * The shimmer keyframe is defined in styles/components.css as
 * `@keyframes mcv-shimmer`. This component references it by class name.
 *
 * Respects prefers-reduced-motion via the global media query in tokens.css.
 */
export function Skeleton({
  width = '100%',
  height = '16px',
  borderRadius = 'var(--radius-md)',
  className = '',
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`mcv-skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}

export default Skeleton;
