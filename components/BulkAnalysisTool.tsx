'use client';

import { useState, useRef } from 'react';
import { SITS } from '@/lib/data';
import { REAL_DATA } from '@/lib/realdata';

interface CSVRow {
  case_type: string;
  district: string;
  damages_estimate: string;
  represented: string;
  [key: string]: string;
}

interface ParsedCase {
  case_type: string;
  district: string;
  damages_estimate: number;
  represented: boolean;
  nos_code?: string;
  label?: string;
  win_rate?: number;
  settlement_p25?: number;
  settlement_p50?: number;
  settlement_p75?: number;
  avg_duration_months?: number;
  confidence_level?: string;
}

interface AnalysisResult {
  cases: ParsedCase[];
  summary: {
    totalCases: number;
    portfolioAvgWinRate: number;
    totalSettlementLo: number;
    totalSettlementMid: number;
    totalSettlementHi: number;
    avgCaseDuration: number;
  };
  caseTypeDistribution: { type: string; count: number; percentage: number }[];
  districtDistribution: { district: string; count: number; percentage: number }[];
}

const focusStyle = `
  input:focus, select:focus, textarea:focus {
    border-color: var(--accent-primary) !important;
    outline: none;
    box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08);
  }
  button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// Build a lookup mapping from case type names (both plain English and NOS codes) to NOS codes
function buildCaseTypeLookup(): Record<string, string> {
  const lookup: Record<string, string> = {};

  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      // Map by NOS code
      lookup[option.nos.toLowerCase()] = option.nos;
      lookup[option.nos] = option.nos;
      // Map by label
      lookup[option.label.toLowerCase()] = option.nos;
      lookup[option.label] = option.nos;
    });
  });

  return lookup;
}

function calculateConfidence(sampleSize: number): string {
  if (sampleSize > 1000) return 'High';
  if (sampleSize > 100) return 'Medium';
  return 'Low';
}

function parseCSV(text: string): CSVRow[] {
  // Simple CSV parser - handles basic cases, no embedded quotes
  const lines = text.split('\n').filter((l) => l.trim());
  if (lines.length < 2) {
    throw new Error('CSV must have a header row and at least one data row');
  }

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

  // Validate required columns
  const required = ['case_type', 'district', 'damages_estimate', 'represented'];
  const missing = required.filter((r) => !headers.includes(r));
  if (missing.length > 0) {
    throw new Error(`Missing required columns: ${missing.join(', ')}`);
  }

  const rows: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    if (row.case_type && row.district) {
      rows.push(row as CSVRow);
    }
  }

  return rows;
}

function generateSampleCSV(): string {
  return `case_type,district,damages_estimate,represented
Contract Breach,2nd Circuit,500000,true
Patent Infringement,N.D. California,2500000,true
Employment Discrimination,N.D. Illinois,750000,false
Trademark Infringement,S.D. New York,1000000,true`;
}

function downloadCSV(data: ParsedCase[], filename: string) {
  const headers = [
    'case_type',
    'district',
    'damages_estimate',
    'represented',
    'nos_code',
    'label',
    'win_rate',
    'settlement_p25',
    'settlement_p50',
    'settlement_p75',
    'avg_duration_months',
    'confidence_level',
  ];

  const rows = data.map((c) => [
    c.case_type,
    c.district,
    c.damages_estimate,
    c.represented ? 'true' : 'false',
    c.nos_code || '',
    c.label || '',
    c.win_rate || '',
    c.settlement_p25 || '',
    c.settlement_p50 || '',
    c.settlement_p75 || '',
    c.avg_duration_months || '',
    c.confidence_level || '',
  ]);

  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function BulkAnalysisTool() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.name.endsWith('.csv')) {
      setError('Please select a .csv file');
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      setError('File must be smaller than 5MB');
      return;
    }

    setFile(f);
    setError('');
  }

  async function analyzeFile() {
    if (!file) return;

    setLoading(true);
    setError('');
    setProgress(0);
    setResult(null);

    try {
      const text = await file.text();
      const csvRows = parseCSV(text);

      if (csvRows.length > 1000) {
        throw new Error('CSV has more than 1000 rows');
      }

      const lookup = buildCaseTypeLookup();
      const parsedCases: ParsedCase[] = [];

      csvRows.forEach((row, idx) => {
        const progressPct = Math.floor(((idx + 1) / csvRows.length) * 100);
        setProgress(progressPct);

        const caseTypeKey = row.case_type.toLowerCase();
        const nosCode = lookup[caseTypeKey];

        if (!nosCode) {
          console.warn(`Unknown case type: ${row.case_type}`);
          return;
        }

        const data = REAL_DATA[nosCode];
        if (!data) {
          console.warn(`No REAL_DATA for NOS code ${nosCode}`);
          return;
        }

        const damages = parseInt(row.damages_estimate, 10) || 0;
        const represented = row.represented.toLowerCase() === 'true' || row.represented === '1';

        // Calculate settlement percentiles (REAL_DATA ranges are in THOUSANDS)
        const rng = data.rng || { lo: 0, md: 0, hi: 0 };
        const p25 = rng.lo * 1000;
        const p50 = rng.md * 1000;
        const p75 = rng.hi * 1000;

        parsedCases.push({
          case_type: row.case_type,
          district: row.district,
          damages_estimate: damages,
          represented,
          nos_code: nosCode,
          label: data.label,
          win_rate: data.wr || 0,
          settlement_p25: p25,
          settlement_p50: p50,
          settlement_p75: p75,
          avg_duration_months: data.mo || 0,
          confidence_level: calculateConfidence(data.total || 0),
        });
      });

      if (parsedCases.length === 0) {
        throw new Error('No valid cases found in CSV');
      }

      // Calculate summary statistics
      const portfolioAvgWinRate =
        parsedCases.reduce((sum, c) => sum + (c.win_rate || 0), 0) / parsedCases.length;
      const totalSettlementLo = parsedCases.reduce((sum, c) => sum + (c.settlement_p25 || 0), 0);
      const totalSettlementMid = parsedCases.reduce((sum, c) => sum + (c.settlement_p50 || 0), 0);
      const totalSettlementHi = parsedCases.reduce((sum, c) => sum + (c.settlement_p75 || 0), 0);
      const avgCaseDuration =
        parsedCases.reduce((sum, c) => sum + (c.avg_duration_months || 0), 0) / parsedCases.length;

      // Case type distribution
      const caseTypeMap = new Map<string, number>();
      parsedCases.forEach((c) => {
        const key = c.label || c.case_type;
        caseTypeMap.set(key, (caseTypeMap.get(key) || 0) + 1);
      });
      const caseTypeDistribution = Array.from(caseTypeMap.entries())
        .map(([type, count]) => ({
          type,
          count,
          percentage: (count / parsedCases.length) * 100,
        }))
        .sort((a, b) => b.count - a.count);

      // District distribution (top 10)
      const districtMap = new Map<string, number>();
      parsedCases.forEach((c) => {
        districtMap.set(c.district, (districtMap.get(c.district) || 0) + 1);
      });
      const districtDistribution = Array.from(districtMap.entries())
        .map(([district, count]) => ({
          district,
          count,
          percentage: (count / parsedCases.length) * 100,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setResult({
        cases: parsedCases,
        summary: {
          totalCases: parsedCases.length,
          portfolioAvgWinRate: Math.round(portfolioAvgWinRate * 100) / 100,
          totalSettlementLo: Math.round(totalSettlementLo),
          totalSettlementMid: Math.round(totalSettlementMid),
          totalSettlementHi: Math.round(totalSettlementHi),
          avgCaseDuration: Math.round(avgCaseDuration * 100) / 100,
        },
        caseTypeDistribution,
        districtDistribution,
      });

      setProgress(100);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function downloadSampleCSV() {
    const csv = generateSampleCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-bulk-analysis.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function formatMoney(cents: number): string {
    const dollars = cents / 100;
    if (dollars >= 1000000) {
      return `$${(dollars / 1000000).toFixed(1)}M`;
    }
    if (dollars >= 1000) {
      return `$${(dollars / 1000).toFixed(0)}K`;
    }
    return `$${dollars.toFixed(0)}`;
  }

  return (
    <div>
      <style>{focusStyle}</style>

      {/* Upload Section */}
      <div
        style={{
          background: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '4px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 8px',
          }}
        >
          Upload CSV File
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 20px', lineHeight: '1.5' }}>
          Select a CSV file with columns: case_type, district, damages_estimate, represented.
          Maximum 1000 rows, 5MB file size.
          <br />
          <button
            onClick={downloadSampleCSV}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: 0,
              font: 'inherit',
              marginTop: '8px',
            }}
          >
            Download sample CSV
          </button>
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            alignItems: 'center',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface-0)',
            }}
          />
          <button
            onClick={analyzeFile}
            disabled={!file || loading}
            style={{
              padding: '12px 28px',
              height: '48px',
              backgroundColor: file && !loading ? 'var(--accent-primary)' : 'var(--border-default)',
              color: 'var(--color-surface-0)',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: file && !loading ? 'pointer' : 'not-allowed',
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Analyzing...' : 'Upload & Analyze'}
          </button>
        </div>

        {loading && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--border-default)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--accent-primary)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '8px 0 0', textAlign: 'center' }}>
              {progress}% complete
            </p>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: '16px 16px',
              borderRadius: '4px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid var(--border-default)',
            }}
          >
            <p style={{ fontSize: '13px', color: 'var(--data-negative, #B01E1E)', margin: 0 }}>{error}</p>
          </div>
        )}
      </div>

      {/* Results Display */}
      {result && (
        <>
          {/* Summary Panel */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            {[
              {
                label: 'Cases Analyzed',
                value: result.summary.totalCases.toString(),
                color: 'var(--color-text-primary)',
              },
              {
                label: 'Portfolio Win Rate',
                value: `${result.summary.portfolioAvgWinRate}%`,
                color: 'var(--data-positive, #176438)',
              },
              {
                label: 'Avg Case Duration',
                value: `${result.summary.avgCaseDuration}mo`,
                color: 'var(--color-text-primary)',
              },
              {
                label: 'Settlement P25-P75',
                value: `${formatMoney(result.summary.totalSettlementLo)}-${formatMoney(result.summary.totalSettlementHi)}`,
                color: 'var(--accent-primary)',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: '0 0 8px',
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: stat.color,
                    margin: 0,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Case Type Distribution */}
          <div
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 20px',
              }}
            >
              Case Type Distribution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {result.caseTypeDistribution.map((item) => (
                <div key={item.type}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                      {item.type}
                    </span>
                    <span
                      style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}
                    >
                      {item.count} ({item.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: 'var(--border-default)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${item.percentage}%`,
                        height: '100%',
                        backgroundColor: 'var(--accent-primary)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Distribution */}
          <div
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 20px',
              }}
            >
              Top 10 Districts
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {result.districtDistribution.map((item) => (
                <div
                  key={item.district}
                  style={{
                    background: 'var(--color-surface-1)',
                    padding: '12px',
                    borderRadius: '4px',
                  }}
                >
                  <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
                    {item.district}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {item.count} cases ({item.percentage.toFixed(1)}%)
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Results Table */}
          <div
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border-default)' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                Analyzed Cases
              </h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  fontSize: '13px',
                  borderCollapse: 'collapse',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-surface-1)', borderBottom: '1px solid var(--border-default)' }}>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Case Type
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      District
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Damages
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Win Rate
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Settlement P50
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Duration (mo)
                    </th>
                    <th
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.cases.map((c, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom:
                          idx < result.cases.length - 1 ? '1px solid var(--border-default)' : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '12px 16px',
                          color: 'var(--color-text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        {c.label || c.case_type}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--color-text-secondary)' }}>
                        {c.district}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          textAlign: 'right',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {formatMoney(c.damages_estimate * 100)}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          textAlign: 'center',
                          color: 'var(--data-positive, #176438)',
                          fontWeight: 500,
                        }}
                      >
                        {c.win_rate}%
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          textAlign: 'right',
                          color: 'var(--accent-primary)',
                          fontWeight: 500,
                        }}
                      >
                        {formatMoney(c.settlement_p50 || 0)}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          textAlign: 'center',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {c.avg_duration_months}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          textAlign: 'center',
                          color: 'var(--color-text-secondary)',
                          fontSize: '12px',
                        }}
                      >
                        {c.confidence_level}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Download Results */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginBottom: '24px',
            }}
          >
            <button
              onClick={() =>
                downloadCSV(result.cases, 'bulk-analysis-results.csv')
              }
              style={{
                padding: '12px 28px',
                height: '48px',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--color-surface-0)',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Download Results CSV
            </button>
          </div>

          {/* Future Enhancement Notes */}
          <div
            style={{
              padding: '16px 16px',
              borderRadius: '4px',
              backgroundColor: 'rgba(10, 102, 194, 0.08)',
              border: '1px solid var(--border-default)',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: 'var(--accent-primary-hover)',
                margin: 0,
                lineHeight: '1.5',
              }}
            >
              Note: This tool currently processes cases client-side. Future versions will include:
              <br />
              - Inngest background processing for large batches
              <br />
              - Supabase Realtime updates for multi-user collaboration
              <br />
              - Advanced filtering and cohort analysis
            </p>
          </div>
        </>
      )}

      {/* Empty State */}
      {!result && !loading && (
        <div
          style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '64px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '4px',
              background: 'rgba(10, 102, 194, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2"
            >
              <path d="M12 3v12m0 6v0M3 12h12m6 0h0" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '22px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 12px',
            }}
          >
            Ready to Analyze Your Cases
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.6',
              maxWidth: '440px',
              margin: '0 auto',
            }}
          >
            Upload a CSV file containing your cases to get immediate portfolio analysis, risk
            assessment, and outcome predictions.
          </p>
        </div>
      )}
    </div>
  );
}
