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
            backgroundColor: inflationEnabled ? 'var(--link)' : 'var(--bdr)',
            color: inflationEnabled ? 'var(--card)' : 'var(--text2)',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 200ms ease, color 200ms ease',
            fontFamily: 'var(--font-ui)',
          }}
          aria-pressed={inflationEnabled}
          title="Toggle inflation adjustment to 2024 dollars"
        >
          <span style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: inflationEnabled ? 'var(--card)' : 'var(--color-text-muted)',
            position: 'relative',
          }}>
            {inflationEnabled && (
              <span style={{
                display: 'inline-block',
                position: 'absolute',
                left: '2px',
                top: '0px',
                color: 'var(--link)',
                fontSize: '12px',
                fontWeight: 700,
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
          color: 'var(--text2)',
          fontStyle: 'italic',
          fontFamily: 'var(--font-ui)',
          backgroundColor: 'var(--card)',
          padding: '8px 12px',
          borderRadius: '4px',
          borderLeft: '3px solid var(--link)',
          lineHeight: 1.5,
        }}>
          Inflation-adjusted to 2024 dollars using BLS CPI-U data.
        </div>
      )}
    </div>
  );
}
