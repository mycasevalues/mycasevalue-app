'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';

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
            item: 'https://mycasevalues.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Map',
            item: 'https://www.mycasevalues.com/map',
          },
        ],
      },
      {
        '@type': 'Dataset',
        name: 'Federal Court Win Rates by State and District',
        description:
          'Historical federal court win rates aggregated by state and judicial district.',
        url: 'https://www.mycasevalues.com/map',
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
          border-color: #E8171F;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div style={{ backgroundColor: '#F5F6F7', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ backgroundColor: '#00172E', borderBottom: '1px solid #D5D8DC' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
            {/* Breadcrumb */}
            <nav style={{ fontSize: '14px', color: '#FFFFFF', marginBottom: '16px', opacity: 0.85, fontFamily: 'var(--font-body)' }}>
              <a href="/" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Home</a>
              <span> / </span>
              <span>Map</span>
            </nav>

            {/* Badge & Title */}
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#E8171F',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: '2px',
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
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: 0,
                  marginBottom: '8px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Federal Court Win Rates by State
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: '#FFFFFF',
                  opacity: 0.85,
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Explore federal court win rates by state and judicial district. Compare outcomes
                across different jurisdictions to understand case value drivers.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
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
                borderRadius: '2px',
                border: '1px solid #D5D8DC',
                backgroundColor: '#FFFFFF',
              }}
            >
              <p style={{ fontSize: '13px', color: '#455A64', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                Total States & Territories
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#212529',
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
                borderRadius: '2px',
                border: '1px solid #D5D8DC',
                backgroundColor: '#FFFFFF',
              }}
            >
              <p style={{ fontSize: '13px', color: '#455A64', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                National Average
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#212529',
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
                borderRadius: '2px',
                border: '1px solid #D5D8DC',
                backgroundColor: '#FFFFFF',
              }}
            >
              <p style={{ fontSize: '13px', color: '#455A64', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                Highest Rate
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#212529',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {highestRate.toFixed(1)}%
              </p>
              <p style={{ fontSize: '11px', color: '#455A64', margin: '4px 0 0 0', fontFamily: 'var(--font-body)' }}>
                {highestState?.name}
              </p>
            </div>
            <div
              style={{
                padding: '16px',
                borderRadius: '2px',
                border: '1px solid #D5D8DC',
                backgroundColor: '#FFFFFF',
              }}
            >
              <p style={{ fontSize: '13px', color: '#455A64', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                Lowest Rate
              </p>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#212529',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {lowestRate.toFixed(1)}%
              </p>
              <p style={{ fontSize: '11px', color: '#455A64', margin: '4px 0 0 0', fontFamily: 'var(--font-body)' }}>
                {lowestState?.name}
              </p>
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
                  color: '#212529',
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
                  borderRadius: '2px',
                  border: '1px solid #D5D8DC',
                  backgroundColor: '#FFFFFF',
                  color: '#212529',
                  height: '48px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#E8171F')}
                onBlur={(e) => (e.target.style.borderColor = '#D5D8DC')}
              />
            </div>

            <div>
              <label
                htmlFor="sort"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#212529',
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
                  borderRadius: '2px',
                  border: '1px solid #D5D8DC',
                  backgroundColor: '#FFFFFF',
                  color: '#212529',
                  height: '48px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                  cursor: 'pointer',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#E8171F')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#D5D8DC')}
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
                const barColor = state.winRate >= 55 ? '#07874A' : state.winRate < 45 ? '#E8171F' : '#006997';
                const districtSlug = state.code.toLowerCase();
                return (
                  <a
                    key={state.code}
                    href={`/districts/${districtSlug}`}
                    className="state-card"
                    style={{
                      padding: '16px',
                      borderRadius: '2px',
                      border: '1px solid #D5D8DC',
                      backgroundColor: '#FFFFFF',
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
                            color: '#212529',
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
                            color: '#455A64',
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
                          fontWeight: '700',
                          color: barColor,
                          margin: 0,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {state.winRate.toFixed(1)}%
                      </p>
                    </div>

                    <div style={{ width: '100%', backgroundColor: '#F0F3F5', borderRadius: '2px', height: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${state.winRate}%`,
                          backgroundColor: barColor,
                          borderRadius: '2px',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#455A64', margin: 0, fontFamily: 'var(--font-body)' }}>
                        {state.winRate < 45
                          ? 'Below average'
                          : state.winRate <= 52
                            ? 'Near average'
                            : 'Above average'}
                      </p>
                      <span style={{ fontSize: '11px', color: '#006997', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                        View details →
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <p style={{ fontSize: '16px', color: '#455A64', fontFamily: 'var(--font-body)' }}>
                No states found matching "{searchQuery}". Try a different search.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div
            style={{
              borderRadius: '2px',
              border: '1px solid #D5D8DC',
              padding: '32px',
              textAlign: 'center',
              marginBottom: '48px',
              backgroundColor: '#00172E',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#FFFFFF',
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-display)',
              }}
            >
              Ready to Calculate Your Case Value?
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#FFFFFF',
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
                borderRadius: '2px',
                fontWeight: '600',
                color: '#FFFFFF',
                backgroundColor: '#E8171F',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D01419')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E8171F')}
            >
              Go to Case Calculator
            </a>
          </div>
        </main>

        {/* Footer Disclaimer */}
        <footer
          style={{
            borderTop: '1px solid #D5D8DC',
            padding: '24px 16px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', color: '#455A64', textAlign: 'center', margin: 0, fontFamily: 'var(--font-body)' }}>
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
