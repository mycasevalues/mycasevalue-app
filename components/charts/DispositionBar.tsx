'use client';

import React from 'react';
import { DispositionBreakdown } from '../../data/disposition-data';

interface DispositionBarProps {
  data: DispositionBreakdown;
}

export default function DispositionBar({ data }: DispositionBarProps) {
  // Color scheme for disposition categories
  const colors = {
    settled: '#0A66C2',
    plaintiffVerdict: '#057642',
    defenseVerdict: '#CC1016',
    dismissed: '#999999',
    summaryJudgment: '#C37D16',
    other: '#E0DDD8',
  };

  // Disposition labels
  const labels = {
    settled: 'Settlement',
    plaintiffVerdict: 'Plaintiff Verdict',
    defenseVerdict: 'Defense Verdict',
    dismissed: 'Dismissed',
    summaryJudgment: 'Summary Judgment',
    other: 'Other',
  };

  // Build segments with proper ordering
  const segments = [
    { key: 'settled', percentage: data.settled, label: labels.settled, color: colors.settled },
    { key: 'plaintiffVerdict', percentage: data.plaintiffVerdict, label: labels.plaintiffVerdict, color: colors.plaintiffVerdict },
    { key: 'defenseVerdict', percentage: data.defenseVerdict, label: labels.defenseVerdict, color: colors.defenseVerdict },
    { key: 'dismissed', percentage: data.dismissed, label: labels.dismissed, color: colors.dismissed },
    { key: 'summaryJudgment', percentage: data.summaryJudgment, label: labels.summaryJudgment, color: colors.summaryJudgment },
    { key: 'other', percentage: data.other, label: labels.other, color: colors.other },
  ];

  // Filter out zero-value segments
  const visibleSegments = segments.filter(s => s.percentage > 0);

  return (
    <div style={{ width: '100%' }}>
      {/* Visually hidden table for screen readers */}
      <table className="sr-only" aria-label="Disposition breakdown data">
        <thead>
          <tr>
            <th>Disposition Type</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {visibleSegments.map((segment) => (
            <tr key={segment.key}>
              <td>{segment.label}</td>
              <td>{segment.percentage.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Horizontal Stacked Bar */}
      <div
        style={{
          display: 'flex',
          height: '60px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#F7F8FA',
          marginBottom: '24px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
        role="img"
        aria-label={`Disposition breakdown: ${visibleSegments.map((s) => `${s.label} ${s.percentage.toFixed(1)}%`).join(', ')}`}
      >
        {visibleSegments.map((segment) => (
          <div
            key={segment.key}
            style={{
              width: `${segment.percentage}%`,
              backgroundColor: segment.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'opacity 0.2s ease',
            }}
            title={`${segment.label}: ${segment.percentage.toFixed(1)}%`}
          >
            {segment.percentage >= 8 && (
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                  zIndex: 1,
                }}
              >
                {Math.round(segment.percentage)}%
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #E5E7EB',
        }}
      >
        {visibleSegments.map((segment) => (
          <div
            key={segment.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              color: '#4B5563',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: segment.color,
                flexShrink: 0,
              }}
            />
            <span>
              {segment.label}: <strong style={{ color: '#0A66C2' }}>{segment.percentage.toFixed(1)}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
