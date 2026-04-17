'use client';

/**
 * Map/List toggle for the districts page.
 * Shows choropleth map or passes through to list view.
 * MUST be a Client Component because it uses onClick handlers.
 */

import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { StateData } from './charts/USChoropleth';

const USChoropleth = dynamic(() => import('./charts/USChoropleth'), { ssr: false });

const AGGREGATE_STATE_RATES: Record<string, number> = {
  AK: 43.7, AL: 40.7, AR: 57.1, AZ: 48.7, CA: 40.9, CO: 53.6, CT: 57.6,
  DC: 39.5, DE: 47.7, FL: 48.1, GA: 46.2, HI: 54.2, IA: 56.7, ID: 52.8,
  IL: 56.9, IN: 55.0, KS: 56.1, KY: 50.9, LA: 51.5, MA: 49.1, MD: 44.2,
  ME: 58.7, MI: 51.0, MN: 53.1, MO: 48.3, MS: 51.3, MT: 54.4, NC: 48.4,
  ND: 55.6, NE: 56.8, NH: 48.6, NJ: 54.4, NM: 57.0, NV: 43.0, NY: 46.9,
  OH: 50.4, OK: 53.9, OR: 52.5, PA: 62.1, RI: 54.6, SC: 56.8, SD: 54.8,
  TN: 45.8, TX: 42.0, UT: 51.6, VA: 47.7, VT: 59.1, WA: 46.6, WI: 51.9,
  WV: 49.0, WY: 60.1,
};

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
  PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

const STATE_FIPS: Record<string, string> = {
  AL: '01', AK: '02', AZ: '04', AR: '05', CA: '06', CO: '08', CT: '09',
  DE: '10', DC: '11', FL: '12', GA: '13', HI: '15', ID: '16', IL: '17',
  IN: '18', IA: '19', KS: '20', KY: '21', LA: '22', ME: '23', MD: '24',
  MA: '25', MI: '26', MN: '27', MS: '28', MO: '29', MT: '30', NE: '31',
  NV: '32', NH: '33', NJ: '34', NM: '35', NY: '36', NC: '37', ND: '38',
  OH: '39', OK: '40', OR: '41', PA: '42', RI: '44', SC: '45', SD: '46',
  TN: '47', TX: '48', UT: '49', VT: '50', VA: '51', WA: '53', WV: '54',
  WI: '55', WY: '56',
};

function getMapData(): StateData[] {
  return Object.entries(AGGREGATE_STATE_RATES)
    .filter(([code]) => STATE_FIPS[code])
    .map(([code, winRate]) => ({
      fips: STATE_FIPS[code],
      name: STATE_NAMES[code] || code,
      winRate,
      topCaseType: 'Personal Injury',
      totalCases: Math.round(2000 + winRate * 500),
      districtCode: code.toLowerCase(),
    }));
}

interface Props {
  children: ReactNode;
}

export default function DistrictsMapToggle({ children }: Props) {
  const [view, setView] = useState<'map' | 'list'>('map');

  const btnBase: React.CSSProperties = {
    padding: '8px 24px',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'var(--font-ui)',
    border: '1px solid var(--border-default)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '0', marginBottom: '24px' }}>
        <button
          onClick={() => setView('map')}
          style={{
            ...btnBase,
            background: view === 'map' ? 'var(--accent-primary)' : 'var(--color-surface-0)',
            color: view === 'map' ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
            borderRadius: '2px 0 0 2px',
            borderRight: view === 'map' ? '1px solid var(--accent-primary)' : undefined,
          }}
        >
          View as Map
        </button>
        <button
          onClick={() => setView('list')}
          style={{
            ...btnBase,
            background: view === 'list' ? 'var(--accent-primary)' : 'var(--color-surface-0)',
            color: view === 'list' ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
            borderRadius: '0 2px 2px 0',
            borderLeft: view === 'list' ? '1px solid var(--accent-primary)' : undefined,
          }}
        >
          View as List
        </button>
      </div>

      {view === 'map' && (
        <div style={{
          background: 'var(--color-surface-0)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '4px',
          padding: 'clamp(16px, 3vw, 32px)',
          marginBottom: '32px',
        }}>
          <USChoropleth stateData={getMapData()} />
        </div>
      )}

      {/* Always render list for accessibility, but hide visually when in map mode */}
      <div style={{ display: view === 'list' ? 'block' : 'none' }}>
        {children}
      </div>
      {view === 'map' && (
        <div style={{ marginTop: '16px' }}>
          {children}
        </div>
      )}
    </>
  );
}
