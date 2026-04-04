/**
 * ConfidenceBadge.tsx — Shows data confidence level based on sample size.
 * Paper Design System styling.
 */

import React from 'react';

function getConfidenceLabel(sampleSize: number): { label: string; color: string; bg: string } {
  if (sampleSize >= 5000) return { label: 'High confidence', color: '#16A34A', bg: '#DCFCE7' };
  if (sampleSize >= 1000) return { label: 'Good confidence', color: '#2563EB', bg: '#DBEAFE' };
  if (sampleSize >= 300) return { label: 'Moderate confidence', color: '#D97706', bg: '#FEF3C7' };
  return { label: 'Limited data', color: '#DC2626', bg: '#FEE2E2' };
}

export interface ConfidenceBadgeProps {
  sampleSize: number;
}

export default function ConfidenceBadge({ sampleSize }: ConfidenceBadgeProps) {
  const { label, color, bg } = getConfidenceLabel(sampleSize);
  const formattedCount = sampleSize.toLocaleString();

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 12px',
      background: bg,
      color: color,
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 600,
      fontFamily: 'var(--font-body)',
    }}>
      {label} — {formattedCount} cases
    </span>
  );
}

export { getConfidenceLabel };
