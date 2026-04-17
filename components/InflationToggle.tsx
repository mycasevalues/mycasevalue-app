'use client';

import { useInflationStore } from '@/store/inflation';

/**
 * InflationToggle: A simple toggle switch for inflation-adjusted settlement amounts.
 * When enabled, displays a note indicating values are adjusted to 2024 dollars using BLS CPI-U.
 */
export default function InflationToggle() {
  const { inflationEnabled, toggleInflation } = useInflationStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      {/* Toggle Switch */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={toggleInflation}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            backgroundColor: inflationEnabled ? 'var(--accent-primary)' : 'var(--border-default)',
            color: inflationEnabled ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
            border: 'none',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            fontFamily: 'var(--font-body)',
          }}
          aria-pressed={inflationEnabled}
          title="Toggle inflation adjustment to 2024 dollars"
        >
          <span style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: inflationEnabled ? 'var(--color-surface-0)' : 'var(--color-text-muted)',
            position: 'relative',
          }}>
            {inflationEnabled && (
              <span style={{
                display: 'inline-block',
                position: 'absolute',
                left: '2px',
                top: '0px',
                color: 'var(--accent-primary)',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                ✓
              </span>
            )}
          </span>
          {inflationEnabled ? 'Hide inflation adjustment' : 'Show in 2024 dollars'}
        </button>
      </div>

      {/* Inflation Note */}
      {inflationEnabled && (
        <div style={{
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          fontStyle: 'italic',
          fontFamily: 'var(--font-body)',
          backgroundColor: 'var(--color-surface-0)',
          padding: '10px 12px',
          borderRadius: '4px',
          borderLeft: '3px solid var(--accent-primary)',
          lineHeight: 1.5,
        }}>
          Inflation-adjusted to 2024 dollars using BLS CPI-U data.
        </div>
      )}
    </div>
  );
}
