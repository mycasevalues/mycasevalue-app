'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';

// Note: Metadata cannot be exported from client components.
// For this page to have SEO metadata, wrap it with server-side metadata in layout.tsx or create a separate server component.
// Metadata content for this page:
// title: "Compare Case Types — Federal Court Outcomes"
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
          color: #6D28D9;
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
          border-color: #6D28D9;
        }
        .lexis-select:focus {
          outline: none;
          border-color: #6D28D9;
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
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
        background: '#1B3A5C',
        color: '#ffffff',
        padding: 'clamp(24px, 5vw, 48px)',
        marginBottom: 0,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 48px)', paddingRight: 'clamp(16px, 3vw, 48px)' }}>
          <div style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.5px',
            marginBottom: 16,
            textTransform: 'uppercase',
            color: '#ffffff',
            background: '#8B5CF6',
            padding: '4px 12px',
            borderRadius: 4,
          }}>
            COMPARE
          </div>
          <h1 className="compare-header" style={{
            fontSize: 'clamp(28px, 7vw, 40px)',
            fontWeight: 600,
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
        borderBottom: '1px solid #E5E7EB',
        fontSize: 13,
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 48px)', paddingRight: 'clamp(16px, 3vw, 48px)' }}>
          <Link href="/" className="lexis-link" style={{ marginRight: 8, color: '#6D28D9' }}>Home</Link>
          <span style={{ color: '#4B5563', marginRight: 8 }}>/</span>
          <span style={{ color: '#0f0f0f', fontWeight: 600 }}>Compare Case Types</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        background: '#F7F8FA',
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
                  color: '#4B5563',
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
                    border: '1px solid #E5E7EB',
                    borderRadius: 4,
                    background: '#FFFFFF',
                    color: '#0f0f0f',
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
              background: canCompare ? '#8B5CF6' : '#E5E7EB',
              color: canCompare ? '#ffffff' : '#4B5563',
              border: 'none',
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
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
              border: '1px solid #E5E7EB',
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
                  <tr style={{ borderBottom: '2px solid #E5E7EB', background: '#F8F9FA' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 16px',
                      color: '#4B5563',
                      fontWeight: 600,
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
                        color: '#0f0f0f',
                        fontWeight: 600,
                        fontSize: 14,
                      }}>
                        <Link href={`/report/${s.nos}`} className="lexis-link" style={{ textDecoration: 'none' }}>
                          {s.label}
                        </Link>
                        <span style={{
                          display: 'block',
                          fontSize: 11,
                          fontFamily: 'var(--font-mono)',
                          color: '#4B5563',
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
                        borderBottom: '1px solid #E5E7EB',
                        background: ri % 2 === 0 ? '#F8F9FA' : '#FFFFFF',
                      }}>
                        <td style={{
                          padding: '14px 16px',
                          fontWeight: 600,
                          color: '#0f0f0f',
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
                              color: isBest ? '#6D28D9' : '#0f0f0f',
                              fontWeight: isBest ? 700 : 400,
                              fontFamily: 'var(--font-mono)',
                              fontSize: 14,
                            }}>
                              <div>{formatted}</div>
                              {/* Visual comparison bar for percentage metrics */}
                              {v !== null && (row.key === 'winRate' || row.key === 'settlementRate' || row.key === 'dismissRate') && (
                                <div style={{ marginTop: 6, height: 4, background: '#F0F3F5', borderRadius: 2, overflow: 'hidden' }}>
                                  <div style={{
                                    height: '100%',
                                    width: `${Math.min(v, 100)}%`,
                                    background: isBest ? '#6D28D9' : row.key === 'dismissRate' ? '#8B5CF6' : '#E5E7EB',
                                    borderRadius: 2,
                                    transition: 'width 0.5s ease',
                                  }} />
                                </div>
                              )}
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

          {/* Visual Comparison Chart */}
          {comparing && stats.length >= 2 && (
            <section style={{
              marginTop: 48,
              padding: 'clamp(24px, 5vw, 32px)',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: 4,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#1B3A5C',
                margin: '0 0 24px 0',
                fontFamily: 'var(--font-display)',
              }}>
                Visual Comparison
              </h3>
              {[
                { label: 'Win Rate (%)', key: 'winRate' },
                { label: 'Settlement Rate (%)', key: 'settlementRate' },
                { label: 'Median Duration (months)', key: 'medianDuration' },
              ].map(metric => {
                const metricStats = stats.map(s => ({
                  label: s.label,
                  value: s[metric.key as keyof CaseStats] as number,
                }));
                const maxValue = Math.max(...metricStats.map(m => m.value));
                const colors = ['#8B5CF6', '#6D28D9', '#1B3A5C'];

                return (
                  <div key={metric.key} style={{ marginBottom: 24 }}>
                    <h4 style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#4B5563',
                      margin: '0 0 12px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      {metric.label}
                    </h4>
                    {metricStats.map((m, idx) => (
                      <div key={m.label} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 120, fontSize: 13, fontWeight: 600, color: '#0f0f0f' }}>
                          {m.label}
                        </div>
                        <div style={{
                          flex: 1,
                          height: 28,
                          background: '#F0F3F5',
                          borderRadius: 2,
                          overflow: 'hidden',
                          position: 'relative',
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.max((m.value / maxValue) * 100, 2)}%`,
                            background: colors[idx % colors.length],
                            borderRadius: 2,
                            transition: 'width 0.5s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingRight: 8,
                            minWidth: 40,
                          }}>
                            <span style={{
                              color: '#ffffff',
                              fontSize: 12,
                              fontWeight: 600,
                              fontFamily: 'var(--font-mono)',
                            }}>
                              {m.value.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </section>
          )}

          {/* Outcome Distribution */}
          {comparing && stats.length >= 2 && (
            <section style={{
              marginTop: 48,
              padding: 'clamp(24px, 5vw, 32px)',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: 4,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#1B3A5C',
                margin: '0 0 24px 0',
                fontFamily: 'var(--font-display)',
              }}>
                Outcome Distribution
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 24,
              }}>
                {stats.map(s => (
                  <div key={s.nos} style={{
                    padding: 16,
                    background: '#F8F9FA',
                    border: '1px solid #E5E7EB',
                    borderRadius: 4,
                  }}>
                    <h4 style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      margin: '0 0 12px 0',
                    }}>
                      {s.label}
                    </h4>
                    <div style={{
                      display: 'flex',
                      height: 24,
                      borderRadius: 2,
                      overflow: 'hidden',
                      marginBottom: 12,
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    }}>
                      <div style={{
                        width: `${s.winRate}%`,
                        background: '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: s.winRate > 5 ? 'auto' : 0,
                      }}>
                        {s.winRate > 5 && (
                          <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {s.winRate.toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div style={{
                        width: `${s.settlementRate}%`,
                        background: '#D97706',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: s.settlementRate > 5 ? 'auto' : 0,
                      }}>
                        {s.settlementRate > 5 && (
                          <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {s.settlementRate.toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div style={{
                        width: `${s.dismissRate}%`,
                        background: '#8B5CF6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: s.dismissRate > 5 ? 'auto' : 0,
                      }}>
                        {s.dismissRate > 5 && (
                          <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {s.dismissRate.toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: 8,
                      fontSize: 12,
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          background: '#059669',
                          borderRadius: 2,
                          margin: '0 auto 4px',
                        }} />
                        <div style={{ color: '#4B5563', fontWeight: 500 }}>Win</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          background: '#D97706',
                          borderRadius: 2,
                          margin: '0 auto 4px',
                        }} />
                        <div style={{ color: '#4B5563', fontWeight: 500 }}>Settlement</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          background: '#8B5CF6',
                          borderRadius: 2,
                          margin: '0 auto 4px',
                        }} />
                        <div style={{ color: '#4B5563', fontWeight: 500 }}>Dismiss</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick Insights */}
          {comparing && stats.length >= 2 && (
            <section style={{
              marginTop: 48,
              padding: 'clamp(24px, 5vw, 32px)',
              background: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: 4,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  fontSize: 20,
                  marginTop: 2,
                  flexShrink: 0,
                }}>
                  -
                </div>
                <div>
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#1B3A5C',
                    margin: '0 0 12px 0',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Quick Insights
                  </h3>
                  <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    fontSize: 14,
                    color: '#0f0f0f',
                    lineHeight: 1.6,
                  }}>
                    {(() => {
                      const insights: string[] = [];

                      // Highest win rate
                      let maxWinIdx = 0;
                      for (let i = 1; i < stats.length; i++) {
                        if (stats[i].winRate > stats[maxWinIdx].winRate) {
                          maxWinIdx = i;
                        }
                      }
                      insights.push(`${stats[maxWinIdx].label} has the highest win rate at ${stats[maxWinIdx].winRate.toFixed(1)}%`);

                      // Shortest duration
                      let minDurIdx = 0;
                      for (let i = 1; i < stats.length; i++) {
                        if (stats[i].medianDuration < stats[minDurIdx].medianDuration) {
                          minDurIdx = i;
                        }
                      }
                      insights.push(`${stats[minDurIdx].label} has the shortest median duration at ${stats[minDurIdx].medianDuration} months`);

                      // Highest recovery (if available)
                      const statsWithRecovery = stats.filter(s => s.medianRecovery !== null);
                      if (statsWithRecovery.length >= 2) {
                        let maxRecIdx = 0;
                        for (let i = 1; i < statsWithRecovery.length; i++) {
                          if ((statsWithRecovery[i].medianRecovery ?? 0) > (statsWithRecovery[maxRecIdx].medianRecovery ?? 0)) {
                            maxRecIdx = i;
                          }
                        }
                        insights.push(`${statsWithRecovery[maxRecIdx].label} has the highest median recovery at $${(statsWithRecovery[maxRecIdx].medianRecovery ?? 0).toLocaleString()}k`);
                      }

                      // Settlement comparison
                      if (stats.length >= 2) {
                        let maxSettIdx = 0;
                        for (let i = 1; i < stats.length; i++) {
                          if (stats[i].settlementRate > stats[maxSettIdx].settlementRate) {
                            maxSettIdx = i;
                          }
                        }
                        const minSettIdx = stats.findIndex((s, i) => i !== maxSettIdx);
                        if (minSettIdx !== -1) {
                          const diff = ((stats[maxSettIdx].settlementRate - stats[minSettIdx].settlementRate) / stats[minSettIdx].settlementRate * 100).toFixed(0);
                          insights.push(`${stats[maxSettIdx].label} has ${diff}% more settlements than ${stats[minSettIdx].label}`);
                        }
                      }

                      return insights.map((insight, idx) => (
                        <li key={idx} style={{ marginBottom: idx < insights.length - 1 ? 8 : 0 }}>
                          • {insight}
                        </li>
                      ));
                    })()}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <section style={{
            marginTop: 48,
            padding: 'clamp(16px, 4vw, 32px)',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: 4,
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}>
            <p style={{
              fontSize: 13,
              color: '#4B5563',
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

          {/* Popular Comparisons */}
          <section style={{
            marginTop: 48,
          }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#1B3A5C',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-display)',
            }}>
              Popular Comparisons
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}>
              {[
                { name1: 'Employment Discrimination', nos1: '442', name2: 'Wrongful Termination', nos2: '445' },
                { name1: 'Personal Injury', nos1: '360', name2: 'Medical Malpractice', nos2: '362' },
                { name1: 'Breach of Contract', nos1: '190', name2: 'Fraud', nos2: '195' },
                { name1: 'Civil Rights', nos1: '440', name2: 'Voting Rights', nos2: '441' },
                { name1: 'Insurance', nos1: '870', name2: 'Product Liability', nos2: '365' },
                { name1: 'FLSA', nos1: '710', name2: 'ADA', nos2: '445' },
              ].map((comp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelected([comp.nos1, comp.nos2, '']);
                    setComparing(true);
                  }}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: 2,
                    padding: 16,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#6D28D9';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 4px rgba(139, 92, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 4,
                  }}>
                    <span style={{
                      flex: 1,
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#0f0f0f',
                    }}>
                      {comp.name1}
                    </span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#8B5CF6',
                      background: '#FFE5E5',
                      padding: '2px 8px',
                      borderRadius: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.2px',
                    }}>
                      vs
                    </span>
                    <span style={{
                      flex: 1,
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      textAlign: 'right',
                    }}>
                      {comp.name2}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: '#4B5563',
                    textAlign: 'center',
                  }}>
                    NOS {comp.nos1} vs {comp.nos2}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          <section style={{
            marginTop: 48,
            marginBottom: 48,
          }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#1B3A5C',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-display)',
            }}>
              Related Tools
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}>
              {[
                { name: 'Recovery Calculator', href: '/calculator', desc: 'Estimate potential damages' },
                { name: 'Odds Analyzer', href: '/odds', desc: 'Analyze case outcome probabilities' },
                { name: 'Trends Dashboard', href: '/trends', desc: 'Track federal court trends' },
                { name: 'NOS Explorer', href: '/nos-explorer', desc: 'Browse all case types' },
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  href={tool.href}
                  style={{
                    display: 'block',
                    padding: 16,
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: 4,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#6D28D9';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 4px rgba(139, 92, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E5E7EB';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                  }}
                >
                  <h4 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#6D28D9',
                    margin: '0 0 4px 0',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {tool.name}
                  </h4>
                  <p style={{
                    fontSize: 13,
                    color: '#4B5563',
                    margin: 0,
                  }}>
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
