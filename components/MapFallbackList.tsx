'use client';

import Link from 'next/link';
import { getWinRateColor } from '@/lib/color-scale';

interface StateData {
  code: string;
  name: string;
  wr: number;
}

interface MapFallbackListProps {
  states: StateData[];
  title?: string;
}

/**
 * MapFallbackList Component
 *
 * Displays a mobile-friendly fallback list of states/districts with win rates
 * when the choropleth map is hidden on small screens.
 *
 * Shows on mobile (max-width: 768px) only.
 *
 * Features:
 * - Accessible link navigation to state/district pages
 * - Color-coded win rate indicators
 * - Sortable by name or win rate
 * - Touch-friendly spacing
 *
 * @example
 * ```tsx
 * <MapFallbackList
 *   states={stateData}
 *   title="Explore by State"
 * />
 * ```
 */
export default function MapFallbackList({
  states,
  title = 'Browse all states',
}: MapFallbackListProps) {
  // Sort by win rate (highest first)
  const sortedStates = [...states].sort((a, b) => b.wr - a.wr);

  return (
    <div
      className="show-mobile"
      data-component="map-fallback-list"
      style={{
        display: 'none', // Will be shown by CSS media query
        padding: '20px 16px',
        backgroundColor: 'var(--color-surface-0)',
        borderRadius: '8px',
        marginTop: '24px',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          [data-component="map-fallback-list"] {
            display: block !important;
          }
        }
      `}</style>

      <h2
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
          marginTop: 0,
        }}
      >
        {title}
      </h2>

      <div
        role="list"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}
      >
        {sortedStates.map((state) => {
          const colorObj = getWinRateColor(state.wr);

          return (
            <Link
              key={state.code}
              href={`/districts?state=${state.code}`}
              role="listitem"
              style={{
                display: 'block',
                padding: '12px',
                backgroundColor: 'var(--color-surface-0)',
                border: `1px solid ${colorObj.border}`,
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {state.name}
                </span>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: colorObj.text,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {state.wr.toFixed(1)}%
              </div>
            </Link>
          );
        })}
      </div>

      <p
        style={{
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          marginTop: '16px',
          marginBottom: 0,
          textAlign: 'center',
        }}
      >
        Tap a state to see district-level data
      </p>
    </div>
  );
}
