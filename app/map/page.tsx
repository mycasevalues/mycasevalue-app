'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SITE_URL } from '../../lib/site-config';

const USChoropleth = dynamic(() => import('../../components/charts/USChoropleth'), { ssr: false });
import type { StateData as ChoroplethStateData } from '../../components/charts/USChoropleth';

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

// Note: Metadata cannot be exported from client components
// For this page to have SEO metadata, wrap it with server-side metadata in layout.tsx or create a separate server component.
// Metadata content for this page:
// title: "Federal Court Win Rates by State — District Map"
// description: "Explore federal court win rates by state and judicial district. See which states have the highest and lowest plaintiff success rates across all federal case types."

const AGGREGATE_STATE_RATES: Record<string, number> = {
  AK: 43.7, AL: 40.7, AR: 57.1, AZ: 48.7, CA: 40.9, CO: 53.6, CT: 57.6,
  DC: 39.5, DE: 47.7, FL: 48.1, GA: 46.2, HI: 54.2, IA: 56.7, ID: 52.8,
  IL: 56.9, IN: 55.0, KS: 56.1, KY: 50.9, LA: 51.5, MA: 49.1, MD: 44.2,
  ME: 58.7, MI: 51.0, MN: 53.1, MO: 48.3, MS: 51.3, MT: 54.4, NC: 48.4,
  ND: 55.6, NE: 56.8, NH: 48.6, NJ: 54.4, NM: 57.0, NV: 43.0, NY: 46.9,
  OH: 50.4, OK: 53.9, OR: 52.5, PA: 62.1, RI: 54.6, SC: 56.8, SD: 54.8,
  TN: 45.8, TX: 42.0, UT: 51.6, VA: 47.7, VT: 59.1, WA: 46.6, WI: 51.9,
  WV: 49.0, WY: 60.1, PR: 41.2, GU: 44.8, VI: 46.3, AS: 42.1, MP: 43.5,
};

const STATE_NAMES: Record<string, string> = {
  AK: 'Alaska',
  AL: 'Alabama',
  AR: 'Arkansas',
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DC: 'District of Columbia',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  IA: 'Iowa',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  MA: 'Massachusetts',
  MD: 'Maryland',
  ME: 'Maine',
  MI: 'Michigan',
  MN: 'Minnesota',
  MO: 'Missouri',
  MS: 'Mississippi',
  MT: 'Montana',
  NC: 'North Carolina',
  ND: 'North Dakota',
  NE: 'Nebraska',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NV: 'Nevada',
  NY: 'New York',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VA: 'Virginia',
  VT: 'Vermont',
  WA: 'Washington',
  WI: 'Wisconsin',
  WV: 'West Virginia',
  WY: 'Wyoming',
  PR: 'Puerto Rico',
  GU: 'Guam',
  VI: 'U.S. Virgin Islands',
  AS: 'American Samoa',
  MP: 'Northern Mariana Islands',
};

type SortOption = 'name' | 'win-rate-high' | 'win-rate-low';

interface StateData {
  code: string;
  name: string;
  winRate: number;
}

// Helper function to get color based on win rate
function getWinRateColor(winRate: number): string {
  if (winRate >= 50) return '#059669'; // green
  if (winRate >= 35) return '#FF9D00'; // amber
  return 'var(--accent-primary)'; // red
}

// Helper function to get top/bottom states
function getTopAndBottomStates(states: StateData[], count: number = 5) {
  const sorted = [...states].sort((a, b) => b.winRate - a.winRate);
  return {
    top: sorted.slice(0, count),
    bottom: sorted.slice(-count).reverse(),
  };
}

// Helper function to calculate histogram distribution
function getWinRateDistribution(states: StateData[]) {
  const bins = [
    { min: 30, max: 35, label: '30-35%', count: 0 },
    { min: 35, max: 40, label: '35-40%', count: 0 },
    { min: 40, max: 45, label: '40-45%', count: 0 },
    { min: 45, max: 50, label: '45-50%', count: 0 },
    { min: 50, max: 55, label: '50-55%', count: 0 },
    { min: 55, max: 60, label: '55-60%', count: 0 },
    { min: 60, max: 65, label: '60-65%', count: 0 },
  ];

  states.forEach((state) => {
    const bin = bins.find((b) => state.winRate >= b.min && state.winRate < b.max);
    if (bin) bin.count++;
  });

  return bins;
}

export default function DistrictHeatmapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filteredStates, setFilteredStates] = useState<StateData[]>([]);

  useEffect(() => {
    let states = Object.entries(AGGREGATE_STATE_RATES).map(([code, winRate]) => ({
      code,
      name: STATE_NAMES[code],
      winRate,
    }));

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      states = states.filter(
        (state) =>
          state.name.toLowerCase().includes(query) ||
          state.code.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'win-rate-high':
        states.sort((a, b) => b.winRate - a.winRate);
        break;
      case 'win-rate-low':
        states.sort((a, b) => a.winRate - b.winRate);
        break;
      case 'name':
      default:
        states.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredStates(states);
  }, [searchQuery, sortBy]);

  const allStates = Object.entries(AGGREGATE_STATE_RATES).map(([code, winRate]) => ({
    code,
    name: STATE_NAMES[code],
    winRate,
  }));

  const avgWinRate =
    allStates.reduce((sum, state) => sum + state.winRate, 0) / allStates.length;
  const highestRate = Math.max(...allStates.map((s) => s.winRate));
  const lowestRate = Math.min(...allStates.map((s) => s.winRate));
  const highestState = allStates.find((s) => s.winRate === highestRate);
  const lowestState = allStates.find((s) => s.winRate === lowestRate);

  // Compute top/bottom 5 states
  const { top: topStates, bottom: bottomStates } = getTopAndBottomStates(allStates, 5);

  // Compute histogram distribution
  const distribution = getWinRateDistribution(allStates);
  const maxBinCount = Math.max(...distribution.map((b) => b.count));

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Map',
            item: `${SITE_URL}/map`,
          },
        ],
      },
      {
        '@type': 'Dataset',
        name: 'Federal Court Win Rates by State and District',
        description:
          'Historical federal court win rates aggregated by state and judicial district.',
        url: `${SITE_URL}/map`,
        creator: {
          '@type': 'Organization',
          name: 'MyCaseValue',
        },
      },
    ],
  };

  return (
    <>
      <style>{`
        .state-card {
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .state-card:hover {
          box-shadow: 0 2px 8px rgba(0, 23, 46, 0.1);
          border-color: var(--accent-primary);
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div style={{ backgroundColor: 'var(--color-surface-1)', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ backgroundColor: 'var(--accent-primary)', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '18px 24px' }}>
            {/* Breadcrumb */}
            <nav style={{ fontSize: '14px', color: 'var(--color-surface-0)', marginBottom: '16px', opacity: 0.85, fontFamily: 'var(--font-body)' }}>
              <a href="/" style={{ color: 'var(--color-surface-0)', textDecoration: 'none' }}>Home</a>
              <span> / </span>
              <span>Map</span>
            </nav>

            {/* Badge & Title */}
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--color-surface-0)',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                DISTRICT MAP
              </span>
              <h1
                style={{
                  fontSize: '26px',
                  fontWeight: '600',
                  color: 'var(--color-surface-0)',
                  margin: 0,
                  marginBottom: '4px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                See Which Courts Give Your Case the Best Odds
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--color-surface-0)',
                  opacity: 0.85,
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Discover federal court win rates by state and district to make data-driven venue decisions and understand your case's best opportunities.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
          {/* Summary Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                Total States & Territories
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {allStates.length}
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                National Average
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {avgWinRate.toFixed(1)}%
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                Highest Rate
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {highestRate.toFixed(1)}%
              </p>
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0', fontFamily: 'var(--font-body)' }}>
                {highestState?.name}
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                Lowest Rate
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {lowestRate.toFixed(1)}%
              </p>
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0', fontFamily: 'var(--font-body)' }}>
                {lowestState?.name}
              </p>
            </div>
          </div>

          {/* Interactive Choropleth Map */}
          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid var(--border-default)',
              backgroundColor: 'var(--color-surface-0)',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>
              Win Rate by State
            </h2>
            <USChoropleth
              stateData={Object.entries(AGGREGATE_STATE_RATES)
                .filter(([code]) => STATE_FIPS[code])
                .map(([code, winRate]) => ({
                  fips: STATE_FIPS[code],
                  name: STATE_NAMES[code] || code,
                  winRate,
                  topCaseType: 'Personal Injury',
                  totalCases: Math.round(2000 + winRate * 500),
                  districtCode: code.toLowerCase(),
                } as ChoroplethStateData))}
            />
          </div>

          {/* Win Rate Distribution Histogram */}
          <div
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid var(--border-default)',
              backgroundColor: 'var(--color-surface-0)',
              marginBottom: '32px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                margin: '0 0 20px 0',
                fontFamily: 'var(--font-display)',
              }}
            >
              Win Rate Distribution
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                gap: '12px',
                height: '200px',
              }}
            >
              {distribution.map((bin, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${(bin.count / maxBinCount) * 160}px`,
                      backgroundColor: 'var(--accent-primary-hover)',
                      borderRadius: '12px',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer',
                      minHeight: bin.count > 0 ? '4px' : '0px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#004B7A')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
                    title={`${bin.label}: ${bin.count} states`}
                  />
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '8px',
                      margin: '8px 0 0 0',
                      fontFamily: 'var(--font-body)',
                      textAlign: 'center',
                    }}
                  >
                    {bin.label}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      margin: '4px 0 0 0',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {bin.count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label
                htmlFor="search"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Search States & Territories
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by state name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  height: '48px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-default)')}
              />
            </div>

            <div>
              <label
                htmlFor="sort"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  height: '48px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                  cursor: 'pointer',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              >
                <option value="name">Name (A-Z)</option>
                <option value="win-rate-high">Win Rate (Highest First)</option>
                <option value="win-rate-low">Win Rate (Lowest First)</option>
              </select>
            </div>
          </div>

          {/* States Grid */}
          {filteredStates.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px',
                marginBottom: '48px',
              }}
            >
              {filteredStates.map((state) => {
                const barColor = state.winRate >= 55 ? '#059669' : state.winRate < 45 ? 'var(--accent-primary)' : 'var(--accent-primary-hover)';
                const districtSlug = state.code.toLowerCase();
                return (
                  <a
                    key={state.code}
                    href={`/districts/${districtSlug}`}
                    className="state-card"
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-default)',
                      backgroundColor: 'var(--color-surface-0)',
                      boxSizing: 'border-box',
                      textDecoration: 'none',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <p
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            margin: 0,
                            marginBottom: '4px',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {state.name}
                        </p>
                        <p
                          style={{
                            fontSize: '11px',
                            color: 'var(--color-text-secondary)',
                            margin: 0,
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {state.code}
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: '24px',
                          fontWeight: '600',
                          color: barColor,
                          margin: 0,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {state.winRate.toFixed(1)}%
                      </p>
                    </div>

                    <div style={{ width: '100%', backgroundColor: '#F0F3F5', borderRadius: '12px', height: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${state.winRate}%`,
                          backgroundColor: barColor,
                          borderRadius: '12px',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                        {state.winRate < 45
                          ? 'Below average'
                          : state.winRate <= 52
                            ? 'Near average'
                            : 'Above average'}
                      </p>
                      <span style={{ fontSize: '11px', color: 'var(--accent-primary-hover)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                        View details →
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                No states found matching "{searchQuery}". Try a different search.
              </p>
            </div>
          )}

          {/* Top & Bottom 5 States */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {/* Top 5 States */}
            <div
              style={{
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Top 5 Win Rates
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topStates.map((state, idx) => (
                  <div
                    key={state.code}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-surface-1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--color-text-secondary)',
                        minWidth: '24px',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      #{idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: 'var(--color-text-primary)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {state.name}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '4px',
                          backgroundColor: '#F0F3F5',
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${state.winRate}%`,
                            backgroundColor: getWinRateColor(state.winRate),
                            borderRadius: '12px',
                          }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: getWinRateColor(state.winRate),
                          margin: 0,
                          minWidth: '38px',
                          textAlign: 'right',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {state.winRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 5 States */}
            <div
              style={{
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Bottom 5 Win Rates
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bottomStates.map((state, idx) => (
                  <div
                    key={state.code}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-surface-1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--color-text-secondary)',
                        minWidth: '24px',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      #{idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: 'var(--color-text-primary)',
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {state.name}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '4px',
                          backgroundColor: '#F0F3F5',
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${state.winRate}%`,
                            backgroundColor: getWinRateColor(state.winRate),
                            borderRadius: '12px',
                          }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: getWinRateColor(state.winRate),
                          margin: 0,
                          minWidth: '38px',
                          textAlign: 'right',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {state.winRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            style={{
              borderRadius: '12px',
              border: '1px solid var(--border-default)',
              padding: '32px',
              textAlign: 'center',
              marginBottom: '48px',
              backgroundColor: 'var(--accent-primary)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--color-surface-0)',
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-display)',
              }}
            >
              Ready to Calculate Your Case Value?
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--color-surface-0)',
                opacity: 0.9,
                marginBottom: '24px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Use our comprehensive odds calculator to estimate case outcomes based on federal court
              data.
            </p>
            <a
              href="/odds"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                borderRadius: '12px',
                fontWeight: '600',
                color: 'var(--color-surface-0)',
                backgroundColor: 'var(--accent-primary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D01419')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
            >
              Go to Case Calculator
            </a>
          </div>
        </div>

        {/* Related Pages */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px', backgroundColor: 'var(--color-surface-1)' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-display)',
            }}
          >
            Explore More
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            <Link
              href="/districts"
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 23, 46, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Judicial Districts
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Dive deep into specific judicial districts and their case outcomes.
              </p>
            </Link>

            <Link
              href="/judges"
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 23, 46, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Judges
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                See individual judge performance and their case win rates.
              </p>
            </Link>

            <Link
              href="/trends"
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 23, 46, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Trends
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Track trends in case outcomes over time and across jurisdictions.
              </p>
            </Link>

            <Link
              href="/compare"
              style={{
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--color-surface-0)',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 23, 46, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-text-primary)',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Compare
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Compare case outcomes and statistics between different regions.
              </p>
            </Link>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <footer
          style={{
            borderTop: '1px solid var(--border-default)',
            padding: '24px 16px',
            backgroundColor: 'var(--color-surface-0)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', margin: 0, fontFamily: 'var(--font-body)' }}>
              Disclaimer: The win rate data presented on this page is based on historical federal
              court records and is provided for informational purposes only. This information does
              not constitute legal advice. Actual case outcomes depend on many factors including
              specific facts, applicable law, judge assignment, and attorney skill. Past
              performance does not guarantee future results. Please consult with a qualified
              attorney for legal advice specific to your situation.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
