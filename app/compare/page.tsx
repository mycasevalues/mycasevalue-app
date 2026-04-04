'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';

// Note: Metadata cannot be exported from client components.
// For this page to have SEO metadata, wrap it with server-side metadata in layout.tsx or create a separate server component.
// Metadata content for this page:
// title: "Compare Case Types — Federal Court Outcomes | MyCaseValue"
// description: "Compare win rates, settlement rates, and outcomes across different federal case types. Analyze up to 3 case types side by side using real federal court data."

const allTypes = SITS.flatMap(cat =>
  cat.opts.map(opt => ({ label: opt.label, nos: opt.nos, category: cat.label }))
);

interface CaseStats {
  label: string;
  nos: string;
  winRate: number;
  settlementRate: number;
  dismissRate: number;
  medianDuration: number;
  medianRecovery: number | null;
  totalCases: number | null;
}

function getStats(nos: string): CaseStats | null {
  const type = allTypes.find(t => t.nos === nos);
  if (!type) return null;
  const real = REAL_DATA[nos] as any;
  if (!real) return null;
  const winRate = real.wr ?? 0;
  const settlementRate = real.sp ?? 0;
  const dismissRate = Math.max(0, 100 - winRate - settlementRate);
  return {
    label: type.label,
    nos,
    winRate,
    settlementRate,
    dismissRate,
    medianDuration: real.mo ?? 0,
    medianRecovery: real.rng?.md ?? null,
    totalCases: real.total ?? null,
  };
}

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(['', '', '']);
  const [comparing, setComparing] = useState(false);

  const stats = comparing ? selected.filter(Boolean).map(getStats).filter(Boolean) as CaseStats[] : [];

  const handleSelect = (idx: number, val: string) => {
    const next = [...selected];
    next[idx] = val;
    setSelected(next);
    setComparing(false);
  };

  const canCompare = selected.filter(Boolean).length >= 2;

  const rows: { label: string; key: keyof CaseStats; suffix: string; format?: (v: number | null) => string }[] = [
    { label: 'Win Rate', key: 'winRate', suffix: '%', format: (v) => (v !== null ? v.toFixed(1) : 'N/A') },
    { label: 'Settlement Rate', key: 'settlementRate', suffix: '%', format: (v) => (v !== null ? v.toFixed(1) : 'N/A') },
    { label: 'Dismissal Rate', key: 'dismissRate', suffix: '%', format: (v) => (v !== null ? v.toFixed(1) : 'N/A') },
    { label: 'Median Duration', key: 'medianDuration', suffix: ' months' },
    { label: 'Median Recovery', key: 'medianRecovery', suffix: 'k', format: (v) => (v !== null ? v.toLocaleString() : 'N/A') },
    { label: 'Sample Size', key: 'totalCases', suffix: '', format: (v) => (v !== null ? v.toLocaleString() : 'N/A') },
  ];

  return (
    <>
      <style>{`
        .lexis-link {
          color: #006997;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .lexis-link:hover {
          color: #004a6d;
          text-decoration: underline;
        }
        .lexis-select {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .lexis-select:hover {
          border-color: #006997;
        }
        .lexis-select:focus {
          outline: none;
          border-color: #006997;
          box-shadow: 0 0 0 2px rgba(0, 105, 151, 0.1);
        }
        .lexis-btn {
          transition: background-color 0.2s ease, opacity 0.2s ease;
        }
        .lexis-btn:hover:not(:disabled) {
          background-color: #c41419;
          opacity: 0.95;
        }
        .lexis-btn:active:not(:disabled) {
          background-color: #a30f16;
        }
        @media (max-width: 768px) {
          .compare-header h1 {
            font-size: clamp(24px, 6vw, 36px);
          }
          .compare-selectors {
            grid-template-columns: 1fr;
          }
          .compare-table {
            font-size: 12px;
          }
          .compare-table th,
          .compare-table td {
            padding: 12px 8px !important;
          }
        }
      `}</style>

      {/* Dark Navy Header */}
      <header style={{
        background: '#00172E',
        color: '#ffffff',
        padding: 'clamp(24px, 5vw, 48px)',
        marginBottom: 0,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 48px)', paddingRight: 'clamp(16px, 3vw, 48px)' }}>
          <div style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.5px',
            marginBottom: 16,
            textTransform: 'uppercase',
            color: '#ffffff',
            background: '#E8171F',
            padding: '4px 12px',
            borderRadius: 4,
          }}>
            COMPARE
          </div>
          <h1 className="compare-header" style={{
            fontSize: 'clamp(28px, 7vw, 40px)',
            fontWeight: 700,
            margin: 0,
            marginBottom: 12,
            fontFamily: 'var(--font-display)',
            color: '#ffffff',
            lineHeight: 1.2,
          }}>
            Compare Case Types
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: '#b8bcc0',
            margin: 0,
            fontFamily: 'var(--font-body)',
            lineHeight: 1.5,
          }}>
            Select up to 3 federal case types to compare outcomes side by side.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{
        background: '#FFFFFF',
        padding: '12px 0',
        borderBottom: '1px solid #D5D8DC',
        fontSize: 13,
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 48px)', paddingRight: 'clamp(16px, 3vw, 48px)' }}>
          <Link href="/" className="lexis-link" style={{ marginRight: 8, color: '#006997' }}>Home</Link>
          <span style={{ color: '#455A64', marginRight: 8 }}>/</span>
          <span style={{ color: '#212529', fontWeight: 600 }}>Compare Case Types</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        background: '#EDEEEE',
        minHeight: 'calc(100vh - 200px)',
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 48px)', paddingRight: 'clamp(16px, 3vw, 48px)' }}>
          {/* Selectors */}
          <div className="compare-selectors" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}>
            {[0, 1, 2].map(idx => (
              <div key={idx}>
                <label style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#455A64',
                  display: 'block',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}>
                  Case Type {idx + 1}{idx < 2 ? ' *' : ' (optional)'}
                </label>
                <select
                  value={selected[idx]}
                  onChange={e => handleSelect(idx, e.target.value)}
                  className="lexis-select"
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '0 12px',
                    fontSize: 14,
                    border: '1px solid #D5D8DC',
                    borderRadius: 4,
                    background: '#FFFFFF',
                    color: '#212529',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: 36,
                  }}
                >
                  <option value="">Select a case type...</option>
                  {SITS.map(cat => (
                    <optgroup key={cat.id} label={cat.label}>
                      {cat.opts.map(opt => (
                        <option key={opt.nos} value={opt.nos} disabled={selected.includes(opt.nos) && selected[idx] !== opt.nos}>
                          {opt.label} (NOS {opt.nos})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Compare Button */}
          <button
            onClick={() => setComparing(true)}
            disabled={!canCompare}
            className="lexis-btn"
            style={{
              padding: '12px 32px',
              background: canCompare ? '#E8171F' : '#D5D8DC',
              color: canCompare ? '#ffffff' : '#455A64',
              border: 'none',
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 700,
              cursor: canCompare ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-display)',
              marginBottom: 40,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'background-color 0.2s ease, opacity 0.2s ease',
            }}
          >
            Compare
          </button>

          {/* Results table */}
          {comparing && stats.length >= 2 && (
            <div className="compare-table-wrapper" style={{
              overflowX: 'auto',
              background: '#FFFFFF',
              border: '1px solid #D5D8DC',
              borderRadius: 4,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              WebkitOverflowScrolling: 'touch',
            }}>
              <table className="compare-table" style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
                fontFamily: 'var(--font-body)',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #D5D8DC', background: '#F8F9FA' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 16px',
                      color: '#455A64',
                      fontWeight: 700,
                      fontSize: 13,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Metric
                    </th>
                    {stats.map(s => (
                      <th key={s.nos} style={{
                        textAlign: 'center',
                        padding: '16px 16px',
                        color: '#212529',
                        fontWeight: 700,
                        fontSize: 14,
                      }}>
                        <Link href={`/report/${s.nos}`} className="lexis-link" style={{ textDecoration: 'none' }}>
                          {s.label}
                        </Link>
                        <span style={{
                          display: 'block',
                          fontSize: 11,
                          fontFamily: 'var(--font-mono)',
                          color: '#455A64',
                          fontWeight: 400,
                          marginTop: 4,
                          textTransform: 'uppercase',
                          letterSpacing: '0.2px',
                        }}>
                          NOS {s.nos}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => {
                    const values = stats.map(s => {
                      const v = s[row.key];
                      return typeof v === 'number' ? v : null;
                    });
                    let best: number | null = null;
                    const nonNullValues = values.filter((v): v is number => v !== null);

                    if (nonNullValues.length > 0) {
                      // Lower is better for duration and dismissal rate
                      if (row.key === 'medianDuration' || row.key === 'dismissRate') {
                        best = Math.min(...nonNullValues);
                      }
                      // Higher is better for rates (win, settlement) and recovery
                      else if (row.key !== 'totalCases' && row.key !== 'medianRecovery') {
                        best = Math.max(...nonNullValues);
                      }
                      // Higher is better for recovery (explicitly)
                      else if (row.key === 'medianRecovery') {
                        best = Math.max(...nonNullValues);
                      }
                    }

                    return (
                      <tr key={row.label} style={{
                        borderBottom: '1px solid #D5D8DC',
                        background: ri % 2 === 0 ? '#F8F9FA' : '#FFFFFF',
                      }}>
                        <td style={{
                          padding: '14px 16px',
                          fontWeight: 600,
                          color: '#212529',
                          fontSize: 14,
                        }}>
                          {row.label}
                        </td>
                        {stats.map((s, si) => {
                          const v = values[si];
                          let formatted = 'N/A';
                          if (v !== null) {
                            formatted = row.format ? row.format(v) : `${v}`;
                            if (!formatted.includes('N/A')) {
                              formatted = formatted + row.suffix;
                            }
                          }
                          const isBest = best !== null && v === best;
                          return (
                            <td key={s.nos} style={{
                              textAlign: 'center',
                              padding: '14px 16px',
                              color: isBest ? '#006997' : '#212529',
                              fontWeight: isBest ? 700 : 400,
                              fontFamily: 'var(--font-mono)',
                              fontSize: 14,
                            }}>
                              {formatted}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Disclaimer */}
          <section style={{
            marginTop: 48,
            padding: 'clamp(16px, 4vw, 32px)',
            background: '#FFFFFF',
            border: '1px solid #D5D8DC',
            borderRadius: 4,
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}>
            <p style={{
              fontSize: 13,
              color: '#455A64',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 800,
            }}>
              Data sourced from the Federal Judicial Center Integrated Database. Outcomes are historical averages and do not predict future results.
              This is not legal advice.{' '}
              <Link href="/methodology" className="lexis-link" style={{ textDecoration: 'none' }}>
                Learn about our methodology
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
