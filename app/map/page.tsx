'use client';

import { useEffect, useState } from 'react';

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
    document.title = 'Federal Court Win Rates by State - MyCaseValue';
  }, []);

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

  const getColorClass = (rate: number): string => {
    if (rate < 45) return 'bg-red-900';
    if (rate <= 52) return 'bg-yellow-700';
    return 'bg-green-700';
  };

  const getBorderColor = (rate: number): string => {
    if (rate < 45) return 'border-red-800';
    if (rate <= 52) return 'border-yellow-600';
    return 'border-green-600';
  };

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
            name: 'District Heatmap',
            item: 'https://mycasevalues.com/map',
          },
        ],
      },
      {
        '@type': 'Dataset',
        name: 'Federal Court Win Rates by State and District',
        description:
          'Historical federal court win rates aggregated by state and judicial district.',
        url: 'https://mycasevalues.com/map',
        creator: {
          '@type': 'Organization',
          name: 'MyCaseValue',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        {/* Header */}
        <header className="border-b" style={{ borderColor: 'var(--border-default)' }}>
          <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
              <a
                href="/"
                className="text-sm font-medium hover:opacity-75 transition-opacity"
                style={{ color: '#4F46E5' }}
              >
                &larr; Back to MyCaseValue
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Federal Court Win Rates</h1>
              <p className="text-lg opacity-70">
                Explore federal court win rates by state and judicial district. Compare outcomes
                across different jurisdictions to understand case value drivers.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Summary Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <div
              className="p-4 rounded-lg border"
              style={{ backgroundColor: '#131B2E', borderColor: 'var(--border-default)' }}
            >
              <p className="text-sm opacity-60 mb-1">Total States & Territories</p>
              <p className="text-2xl font-bold">{allStates.length}</p>
            </div>
            <div
              className="p-4 rounded-lg border"
              style={{ backgroundColor: '#131B2E', borderColor: 'var(--border-default)' }}
            >
              <p className="text-sm opacity-60 mb-1">National Average</p>
              <p className="text-2xl font-bold">{avgWinRate.toFixed(1)}%</p>
            </div>
            <div
              className="p-4 rounded-lg border"
              style={{ backgroundColor: '#131B2E', borderColor: 'var(--border-default)' }}
            >
              <p className="text-sm opacity-60 mb-1">Highest Rate</p>
              <div>
                <p className="text-2xl font-bold">{highestRate.toFixed(1)}%</p>
                <p className="text-xs opacity-50 mt-1">{highestState?.name}</p>
              </div>
            </div>
            <div
              className="p-4 rounded-lg border"
              style={{ backgroundColor: '#131B2E', borderColor: 'var(--border-default)' }}
            >
              <p className="text-sm opacity-60 mb-1">Lowest Rate</p>
              <div>
                <p className="text-2xl font-bold">{lowestRate.toFixed(1)}%</p>
                <p className="text-xs opacity-50 mt-1">{lowestState?.name}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-8 space-y-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium mb-2">
                Search States & Territories
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by state name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border outline-none transition-colors focus:ring-2"
                style={{
                  backgroundColor: '#131B2E',
                  borderColor: 'var(--border-default)',
                  color: 'inherit',
                  '--tw-ring-color': '#4F46E5',
                } as React.CSSProperties}
              />
            </div>

            <div>
              <label htmlFor="sort" className="block text-sm font-medium mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-2 rounded-lg border outline-none transition-colors focus:ring-2"
                style={{
                  backgroundColor: '#131B2E',
                  borderColor: 'var(--border-default)',
                  color: 'inherit',
                  '--tw-ring-color': '#4F46E5',
                } as React.CSSProperties}
              >
                <option value="name">Name (A-Z)</option>
                <option value="win-rate-high">Win Rate (Highest First)</option>
                <option value="win-rate-low">Win Rate (Lowest First)</option>
              </select>
            </div>
          </div>

          {/* States Grid */}
          {filteredStates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {filteredStates.map((state) => (
                <div
                  key={state.code}
                  className={`p-4 rounded-lg border transition-all hover:shadow-lg ${getBorderColor(state.winRate)}`}
                  style={{ backgroundColor: '#131B2E', borderColor: 'var(--border-default)' }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-lg">{state.name}</p>
                      <p
                        className="text-xs opacity-60"
                        style={{ color: '#4F46E5' }}
                      >
                        {state.code}
                      </p>
                    </div>
                    <p className="text-2xl font-bold">{state.winRate.toFixed(1)}%</p>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${getColorClass(state.winRate)}`}
                      style={{ width: `${state.winRate}%` }}
                    />
                  </div>

                  <p className="text-xs opacity-50 mt-2">
                    {state.winRate < 45
                      ? 'Below average'
                      : state.winRate <= 52
                        ? 'Near average'
                        : 'Above average'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg opacity-60">
                No states found matching "{searchQuery}". Try a different search.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div
            className="rounded-lg border p-8 text-center mb-12"
            style={{ backgroundColor: '#131B2E', borderColor: 'var(--border-default)' }}
          >
            <h2 className="text-2xl font-bold mb-3">Ready to Calculate Your Case Value?</h2>
            <p className="text-lg opacity-70 mb-6">
              Use our comprehensive odds calculator to estimate case outcomes based on federal court
              data.
            </p>
            <a
              href="/odds"
              className="inline-block px-8 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#4F46E5' }}
            >
              Go to Case Calculator
            </a>
          </div>
        </main>

        {/* Footer Disclaimer */}
        <footer
          className="border-t py-6"
          style={{ borderColor: 'var(--border-default)' }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs opacity-50 text-center">
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
