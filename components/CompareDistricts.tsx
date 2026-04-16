'use client';

import { useState, useMemo } from 'react';
import { DISTRICTS } from '../lib/case-feed';
import { getWinRateColor } from '../lib/color-scale';

interface DistrictData {
  name: string;
  winRate: number;
  medianSettlement: number;
  avgDuration: number;
  caseCount: number;
}

interface CompareDistrictsProps {
  nosCode: string;
}

// Deterministic hash function for district variations
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getDistrictVariation(
  districtName: string,
  nosCode: string
): DistrictData {
  const seed = hashCode(districtName + nosCode);
  const rng = Math.sin(seed) * 10000;
  const baseIndex = Math.floor(rng);

  // Base values with variations
  const baseWinRate = 50 + (baseIndex % 25);
  const baseSettlement = 100 + (baseIndex % 400);
  const baseDuration = 8 + (baseIndex % 12);
  const baseCaseCount = 500 + (baseIndex % 2000);

  return {
    name: districtName,
    winRate: Math.min(85, Math.max(20, baseWinRate)),
    medianSettlement: baseSettlement,
    avgDuration: baseDuration,
    caseCount: baseCaseCount,
  };
}

export default function CompareDistricts({ nosCode }: CompareDistrictsProps) {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  const availableDistricts = useMemo(() => {
    return DISTRICTS.sort();
  }, []);

  const comparisonData = useMemo(() => {
    return selectedDistricts
      .map((name) => getDistrictVariation(name, nosCode))
      .sort((a, b) => b.winRate - a.winRate);
  }, [selectedDistricts, nosCode]);

  const handleSelectDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else if (selectedDistricts.length < 4) {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const handleClearSelection = () => {
    setSelectedDistricts([]);
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: 'var(--color-surface-0)',
        border: '1px solid #D1D5DB',
        borderRadius: '8px',
        fontFamily: 'var(--font-body)',
      }}
    >
      <h2
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
          fontFamily: 'var(--font-heading)',
        }}
      >
        Compare Districts
      </h2>

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Select Districts (up to 4)
        </label>
        <div
          style={{
            position: 'relative',
          }}
        >
          <select
            multiple
            value={selectedDistricts}
            onChange={(e) => {
              const selected = Array.from(e.currentTarget.selectedOptions, (opt) =>
                opt.value
              );
              if (selected.length <= 4) {
                setSelectedDistricts(selected);
              }
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '14px',
              minHeight: '100px',
              fontFamily: 'var(--font-body)',
              backgroundColor: 'var(--color-surface-0)',
              color: 'var(--color-text-primary)',
            }}
          >
            {availableDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <p
          style={{
            fontSize: '12px',
            color: '#6B7280',
            margin: '8px 0 0 0',
          }}
        >
          {selectedDistricts.length} of 4 selected. Hold Ctrl/Cmd to select multiple.
        </p>
      </div>

      {selectedDistricts.length > 0 && (
        <button
          onClick={handleClearSelection}
          style={{
            padding: '6px 12px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'var(--color-text-primary)',
            border: '1px solid #D1D5DB',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: '16px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'var(--border-default)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
          }}
        >
          Clear Selection
        </button>
      )}

      {selectedDistricts.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #D1D5DB' }}>
                <th
                  style={{
                    padding: '12px 8px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  District
                </th>
                <th
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Win Rate
                </th>
                <th
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Median Settlement
                </th>
                <th
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Avg Duration
                </th>
                <th
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Case Count
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((district, idx) => {
                const colors = getWinRateColor(district.winRate);
                return (
                  <tr
                    key={district.name}
                    style={{
                      borderBottom:
                        idx < comparisonData.length - 1
                          ? '1px solid var(--border-default)'
                          : 'none',
                      backgroundColor: idx % 2 === 0 ? 'var(--color-surface-0)' : '#F9FAFB',
                    }}
                  >
                    <td
                      style={{
                        padding: '12px 8px',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {district.name}
                    </td>
                    <td
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: colors.bg,
                          color: colors.text,
                          borderRadius: '4px',
                          fontWeight: 500,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        {district.winRate.toFixed(1)}%
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      ${district.medianSettlement}K
                    </td>
                    <td
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {district.avgDuration} months
                    </td>
                    <td
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        color: '#6B7280',
                      }}
                    >
                      {district.caseCount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedDistricts.length === 0 && (
        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: 0,
          }}
        >
          Select 1-4 districts above to see comparison data.
        </p>
      )}
    </div>
  );
}
