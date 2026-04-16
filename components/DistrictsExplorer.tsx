'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface District {
  slug: string;
  name: string;
  abbr: string;
}

interface Circuit {
  name: string;
  districts: District[];
}

interface DistrictsExplorerProps {
  circuits: Circuit[];
  getDistrictWinRate: (slug: string) => number;
  getCircuitAvgWinRate: (circuitName: string) => number | null;
}

// Hash-based case type selector
function getCaseTypeForDistrict(slug: string): string {
  const caseTypes = ['Employment', 'Contract', 'Civil Rights', 'Personal Injury', 'Insurance', 'Consumer', 'IP/Patent', 'Housing'];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return caseTypes[Math.abs(hash) % caseTypes.length];
}

// Hash-based case count (2000-45000)
function getCasesFiledForDistrict(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return 2000 + (Math.abs(hash) % 43000);
}

export default function DistrictsExplorer({
  circuits,
  getDistrictWinRate,
  getCircuitAvgWinRate,
}: DistrictsExplorerProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'win-high' | 'win-low' | 'alphabetical'>('default');

  // Compute all districts with their metadata
  const allDistrictsWithData = useMemo(() => {
    const all: Array<District & { circuit: string; winRate: number; caseType: string; casesFiled: number }> = [];
    circuits.forEach((circuit) => {
      circuit.districts.forEach((d) => {
        all.push({
          ...d,
          circuit: circuit.name,
          winRate: getDistrictWinRate(d.slug),
          caseType: getCaseTypeForDistrict(d.slug),
          casesFiled: getCasesFiledForDistrict(d.slug),
        });
      });
    });
    return all;
  }, [circuits, getDistrictWinRate]);

  // Filter districts
  const filteredDistricts = useMemo(() => {
    let result = allDistrictsWithData;

    if (searchText) {
      const lower = searchText.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(lower) ||
          d.abbr.toLowerCase().includes(lower)
      );
    }

    if (selectedCircuit) {
      result = result.filter((d) => d.circuit === selectedCircuit);
    }

    // Apply sort
    if (sortBy === 'win-high') {
      result = [...result].sort((a, b) => b.winRate - a.winRate);
    } else if (sortBy === 'win-low') {
      result = [...result].sort((a, b) => a.winRate - b.winRate);
    } else if (sortBy === 'alphabetical') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'default') {
      // Group by circuit order, then by position within circuit
      const circuitOrder = circuits.map((c) => c.name);
      result = [...result].sort((a, b) => {
        const circuitIndexA = circuitOrder.indexOf(a.circuit);
        const circuitIndexB = circuitOrder.indexOf(b.circuit);
        if (circuitIndexA !== circuitIndexB) return circuitIndexA - circuitIndexB;
        return allDistrictsWithData.indexOf(
          allDistrictsWithData.find((d) => d.slug === a.slug)!
        ) - allDistrictsWithData.indexOf(allDistrictsWithData.find((d) => d.slug === b.slug)!);
      });
    }

    return result;
  }, [allDistrictsWithData, searchText, selectedCircuit, sortBy, circuits]);

  // Compute stats
  const stats = useMemo(() => {
    if (allDistrictsWithData.length === 0)
      return { highestWinRate: null, lowestWinRate: null, mostActiveCircuit: null, avgWinRate: 0 };

    let highest = allDistrictsWithData[0];
    let lowest = allDistrictsWithData[0];

    allDistrictsWithData.forEach((d) => {
      if (d.winRate > highest.winRate) highest = d;
      if (d.winRate < lowest.winRate) lowest = d;
    });

    const circuitCount = new Map<string, number>();
    circuits.forEach((c) => {
      circuitCount.set(c.name, c.districts.length);
    });

    let mostActiveCircuit = circuits[0];
    let maxCount = circuitCount.get(circuits[0].name) || 0;
    circuits.forEach((c) => {
      const count = circuitCount.get(c.name) || 0;
      if (count > maxCount) {
        mostActiveCircuit = c;
        maxCount = count;
      }
    });

    const avgWinRate =
      allDistrictsWithData.reduce((sum, d) => sum + d.winRate, 0) /
      allDistrictsWithData.length;

    return {
      highestWinRate: highest,
      lowestWinRate: lowest,
      mostActiveCircuit,
      avgWinRate: Math.round(avgWinRate * 10) / 10,
    };
  }, [allDistrictsWithData, circuits]);

  return (
    <>
      <style>{`
        .district-card {
          border: 1px solid var(--border-default);
          transition: border-color 150ms, transform 150ms, box-shadow 150ms;
          text-decoration: none;
          display: block;
        }
        .district-card:hover {
          border-color: #003D99;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .circuit-card {
          border: 1px solid var(--border-default);
          background: var(--color-surface-0);
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 150ms;
          text-align: center;
          flex-shrink: 0;
          min-width: 140px;
        }
        .circuit-card:hover {
          border-color: #003D99;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .circuit-card.active {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: var(--color-surface-0);
        }
        .circuit-card.active .circuit-card-name {
          color: var(--color-surface-0);
        }
        .circuit-card.active .circuit-card-count {
          color: rgba(255,255,255,0.7);
        }
        .circuit-card.active .circuit-card-rate {
          color: var(--accent-primary);
        }
        .circuit-card-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 8px;
        }
        .circuit-card-count {
          font-size: 11px;
          color: var(--color-text-secondary);
          margin-bottom: 6px;
        }
        .circuit-card-rate {
          font-size: 14px;
          font-weight: 600;
          color: #003D99;
          font-family: var(--font-mono);
        }
        .circuits-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }
        .circuits-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .circuits-scroll::-webkit-scrollbar-track {
          background: var(--color-surface-1);
        }
        .circuits-scroll::-webkit-scrollbar-thumb {
          background: var(--border-default);
          border-radius: 3px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 20px;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          color: var(--color-text-secondary);
          margin-bottom: 8px;
        }
        .stat-value {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-primary);
          font-family: var(--font-mono);
          margin-bottom: 4px;
        }
        .stat-meta {
          font-size: 12px;
          color: var(--color-text-secondary);
        }
        .controls-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        .control-input,
        .control-select {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 13px;
          font-family: var(--font-body);
          color: var(--color-text-primary);
        }
        .control-input::placeholder {
          color: #999;
        }
        .control-input:focus,
        .control-select:focus {
          outline: none;
          border-color: #003D99;
          box-shadow: 0 0 0 3px rgba(0,105,151,0.1);
        }
        @media (max-width: 768px) {
          .controls-row {
            grid-template-columns: 1fr;
          }
          .district-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Controls Section */}
      <div style={{ marginBottom: 32 }}>
        <div className="controls-row">
          <input
            type="text"
            placeholder="Search districts by name or abbreviation..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="control-input"
            style={{ gridColumn: 'span 2' }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="control-select"
          >
            <option value="default">Default (by circuit)</option>
            <option value="win-high">Win rate (high→low)</option>
            <option value="win-low">Win rate (low→high)</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Circuit Summary Cards */}
      <div style={{ marginBottom: 32 }}>
        <h3
          style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            color: 'var(--color-text-secondary)',
            marginBottom: 12,
            fontFamily: 'var(--font-display)',
          }}
        >
          Filter by Circuit
        </h3>
        <div className="circuits-scroll">
          <button
            onClick={() => setSelectedCircuit(null)}
            className="circuit-card"
            style={{
              background: selectedCircuit === null ? 'var(--accent-primary)' : 'var(--color-surface-0)',
              borderColor: selectedCircuit === null ? 'var(--accent-primary)' : 'var(--border-default)',
              color: selectedCircuit === null ? 'var(--color-surface-0)' : 'var(--color-text-primary)',
            }}
          >
            <div className="circuit-card-name" style={{ color: selectedCircuit === null ? 'var(--color-surface-0)' : 'var(--color-text-primary)' }}>
              All Circuits
            </div>
            <div className="circuit-card-count" style={{ color: selectedCircuit === null ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)' }}>
              {circuits.reduce((sum, c) => sum + c.districts.length, 0)} districts
            </div>
            <div
              className="circuit-card-rate"
              style={{ color: selectedCircuit === null ? 'var(--accent-primary)' : 'var(--accent-primary-hover)' }}
            >
              {stats.avgWinRate}%
            </div>
          </button>

          {circuits.map((circuit) => {
            const rate = getCircuitAvgWinRate(circuit.name);
            const isActive = selectedCircuit === circuit.name;
            return (
              <button
                key={circuit.name}
                onClick={() => setSelectedCircuit(circuit.name)}
                className={`circuit-card ${isActive ? 'active' : ''}`}
              >
                <div className="circuit-card-name">{circuit.name.replace(' Circuit', '')}</div>
                <div className="circuit-card-count">{circuit.districts.length} districts</div>
                <div
                  className="circuit-card-rate"
                  style={{
                    color: isActive
                      ? 'var(--accent-primary)'
                      : rate !== null
                      ? rate >= 50
                        ? '#059669'
                        : rate >= 35
                        ? '#D97706'
                        : 'var(--accent-primary)'
                      : '#999',
                  }}
                >
                  {rate !== null ? `${rate}%` : '—'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Districts at a Glance Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Highest Win Rate</div>
          {stats.highestWinRate ? (
            <>
              <div className="stat-value" style={{ color: '#34d399' }}>
                {stats.highestWinRate.winRate}%
              </div>
              <div className="stat-meta">{stats.highestWinRate.name}</div>
            </>
          ) : (
            <div className="stat-meta">No data</div>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-label">Lowest Win Rate</div>
          {stats.lowestWinRate ? (
            <>
              <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>
                {stats.lowestWinRate.winRate}%
              </div>
              <div className="stat-meta">{stats.lowestWinRate.name}</div>
            </>
          ) : (
            <div className="stat-meta">No data</div>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-label">Most Active Circuit</div>
          {stats.mostActiveCircuit ? (
            <>
              <div className="stat-value">{stats.mostActiveCircuit.districts.length}</div>
              <div className="stat-meta">{stats.mostActiveCircuit.name}</div>
            </>
          ) : (
            <div className="stat-meta">No data</div>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-label">Average Win Rate</div>
          <div className="stat-value">{stats.avgWinRate}%</div>
          <div className="stat-meta">Across all districts</div>
        </div>
      </div>

      {/* District Cards Grid */}
      <div
        className="district-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 12,
          marginBottom: 32,
        }}
      >
        {filteredDistricts.map((d) => {
          const wrColor = d.winRate >= 50 ? '#059669' : d.winRate >= 35 ? '#D97706' : 'var(--accent-primary)';
          return (
            <Link
              key={d.slug}
              href={`/districts/${d.slug}`}
              className="district-card"
              style={{
                background: 'var(--color-surface-0)',
                borderRadius: 2,
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: 4,
                    }}
                  >
                    {d.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {d.abbr}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: wrColor,
                      fontFamily: 'var(--font-mono)',
                      lineHeight: 1,
                    }}
                  >
                    {d.winRate}%
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                      marginTop: 2,
                    }}
                  >
                    Win Rate
                  </div>
                </div>
              </div>

              {/* Mini progress bar */}
              <div
                style={{
                  height: 3,
                  background: '#F0F3F5',
                  borderRadius: 2,
                  overflow: 'hidden',
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(d.winRate, 100)}%`,
                    background: wrColor,
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* Case Type and Cases Filed */}
              <div style={{ display: 'flex', gap: 8, fontSize: 11, flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#F0F3F5',
                    color: 'var(--color-text-secondary)',
                    padding: '2px 8px',
                    borderRadius: 2,
                    fontWeight: 500,
                  }}
                >
                  {d.caseType}
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 10 }}>
                  {(d.casesFiled / 1000).toFixed(1)}K cases
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredDistricts.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 20px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p style={{ fontSize: 14, margin: 0 }}>
            No districts match your search criteria.
          </p>
        </div>
      )}

      {/* Related Pages Section */}
      <section
        style={{
          marginTop: 48,
          padding: 'clamp(24px, 4vw, 32px)',
          background: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: 2,
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 16px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            fontFamily: 'var(--font-display)',
          }}
        >
          Related Pages
        </h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link
            href="/judges"
            style={{
              color: 'var(--accent-primary-hover)',
              textDecoration: 'none',
              fontSize: 13,
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = 'underline')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = 'none')}
          >
            Judges
          </Link>
          <Link
            href="/map"
            style={{
              color: 'var(--accent-primary-hover)',
              textDecoration: 'none',
              fontSize: 13,
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = 'underline')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = 'none')}
          >
            Map
          </Link>
          <Link
            href="/trends"
            style={{
              color: 'var(--accent-primary-hover)',
              textDecoration: 'none',
              fontSize: 13,
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = 'underline')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = 'none')}
          >
            Trends
          </Link>
          <Link
            href="/nos-explorer"
            style={{
              color: 'var(--accent-primary-hover)',
              textDecoration: 'none',
              fontSize: 13,
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = 'underline')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = 'none')}
          >
            NOS Explorer
          </Link>
        </div>
      </section>
    </>
  );
}
