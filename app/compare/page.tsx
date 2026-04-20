'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { ATTORNEY_IMPACT } from '../../lib/attorney-impact';
import { getWinRateColor } from '../../lib/color-scale';

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
  rngLo: number | null;
  rngHi: number | null;
  attorneyWR: number | null;
  proSeWR: number | null;
  topDistricts: string[];
}

function getStats(nos: string): CaseStats | null {
  const type = allTypes.find(t => t.nos === nos);
  if (!type) return null;
  const real = REAL_DATA[nos] as any;
  if (!real) return null;
  const winRate = real.wr ?? 0;
  const settlementRate = real.sp ?? 0;
  const dismissRate = Math.max(0, 100 - winRate - settlementRate);
  const attyData = ATTORNEY_IMPACT[nos];

  // Derive top 3 districts from circuit_rates
  const topDistricts: string[] = [];
  if (real.circuit_rates) {
    const sorted = Object.entries(real.circuit_rates)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 3);
    const CIRCUIT_DISTRICTS: Record<string, string> = {
      '1': 'D. Mass.', '2': 'S.D.N.Y.', '3': 'D.N.J.', '4': 'E.D. Va.',
      '5': 'S.D. Tex.', '6': 'E.D. Mich.', '7': 'N.D. Ill.', '8': 'D. Minn.',
      '9': 'C.D. Cal.', '10': 'D. Colo.', '11': 'N.D. Ga.', 'dc': 'D.D.C.',
    };
    sorted.forEach(([c]) => {
      const d = CIRCUIT_DISTRICTS[c];
      if (d) topDistricts.push(d);
    });
  }

  return {
    label: type.label,
    nos,
    winRate,
    settlementRate,
    dismissRate,
    medianDuration: real.mo ?? 0,
    medianRecovery: real.rng?.md ?? null,
    totalCases: real.total ?? null,
    rngLo: real.rng?.lo ?? null,
    rngHi: real.rng?.hi ?? null,
    attorneyWR: attyData?.rwr ?? null,
    proSeWR: attyData?.pwr ?? null,
    topDistricts,
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
        .mcv-link {
          color: var(--gold);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .mcv-link:hover {
          color: var(--link);
          text-decoration: underline;
        }
        .mcv-select {
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }
        .mcv-select:hover {
          border-color: var(--gold);
        }
        .mcv-select:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.1);
        }
        .mcv-btn {
          transition: background-color 200ms ease, opacity 200ms ease;
        }
        .mcv-btn:hover:not(:disabled) {
          background-color: var(--data-negative);
          opacity: 0.95;
        }
        .mcv-btn:active:not(:disabled) {
          background-color: var(--data-negative);
        }
        @media (max-width: 768px) {
          .compare-header h1 {
            font-size: 20px;
          }
          .compare-selectors {
            grid-template-columns: 1fr !important;
          }
          .compare-table {
            font-size: 12px;
          }
          .compare-table th,
          .compare-table td {
            padding: 12px 8px !important;
          }
          .compare-table-wrapper {
            -webkit-overflow-scrolling: touch;
          }
          .compare-table-wrapper table {
            min-width: 500px;
          }
          .compare-impact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .compare-selectors {
            grid-template-columns: 1fr !important;
          }
          .compare-table {
            font-size: 12px;
          }
          .compare-table th,
          .compare-table td {
            padding: 10px 6px !important;
          }
        }
      `}</style>

      {/* Institutional Header */}
      <header style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
        marginBottom: 0,
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 24px)', paddingRight: 'clamp(16px, 3vw, 24px)', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            Comparison Tool
          </div>
          <h1 className="compare-header" style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            margin: '0 0 16px',
            color: 'var(--card)',
          }}>
            Compare Case Types Side by Side
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
            fontFamily: 'var(--font-ui)',
            lineHeight: 1.6,
            maxWidth: 640,
          }}>
            Benchmark win rates, settlement patterns, and recovery ranges across federal case types with real outcome data.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{
        background: 'var(--card)',
        padding: '12px 0',
        borderBottom: '1px solid var(--bdr)',
        fontSize: 14,
        fontFamily: 'var(--font-ui)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 24px)', paddingRight: 'clamp(16px, 3vw, 24px)' }}>
          <Link href="/" className="mcv-link" style={{ marginRight: 8, color: 'var(--gold)' }}>Home</Link>
          <span style={{ color: 'var(--text2)', marginRight: 8 }}>/</span>
          <span style={{ color: 'var(--text1)', fontWeight: 600 }}>Compare Case Types</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        background: 'var(--surf)',
        minHeight: 'calc(100vh - 200px)',
        padding: 'clamp(16px, 3vw, 24px)',
        fontFamily: 'var(--font-ui)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(16px, 3vw, 24px)', paddingRight: 'clamp(16px, 3vw, 24px)' }}>
          {/* Selectors */}
          <div className="compare-selectors" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 16,
          }}>
            {[0, 1, 2].map(idx => (
              <div key={idx}>
                <label style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text2)',
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
                  className="mcv-select"
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '0 12px',
                    fontSize: 14,
                    border: '1px solid var(--bdr)',
                    borderRadius: 4,
                    background: 'var(--card)',
                    color: 'var(--text1)',
                    fontFamily: 'var(--font-ui)',
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
            className="mcv-btn"
            style={{
              padding: '12px 32px',
              background: canCompare ? 'var(--link)' : 'var(--bdr)',
              color: canCompare ? 'var(--card)' : 'var(--text2)',
              border: 'none',
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
              cursor: canCompare ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-ui)',
              marginBottom: 20,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'background-color 200ms ease, opacity 200ms ease',
            }}
          >
            Compare
          </button>

          {/* Results table */}
          {comparing && stats.length >= 2 && (
            <div className="compare-table-wrapper" style={{
              overflowX: 'auto',
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              WebkitOverflowScrolling: 'touch',
            }}>
              <table className="compare-table" style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
                fontFamily: 'var(--font-ui)',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--bdr)', background: 'var(--surf)' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 16px',
                      color: 'var(--text2)',
                      fontWeight: 600,
                      fontSize: 14,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Metric
                    </th>
                    {stats.map(s => (
                      <th key={s.nos} style={{
                        textAlign: 'center',
                        padding: '16px 16px',
                        color: 'var(--text1)',
                        fontWeight: 600,
                        fontSize: 14,
                      }}>
                        <Link href={`/report/${s.nos}`} className="mcv-link" style={{ textDecoration: 'none' }}>
                          {s.label}
                        </Link>
                        <span style={{
                          display: 'block',
                          fontSize: 12,
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text2)',
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
                        borderBottom: '1px solid var(--bdr)',
                        background: ri % 2 === 0 ? 'var(--surf)' : 'var(--card)',
                      }}>
                        <td style={{
                          padding: '16px 16px',
                          fontWeight: 600,
                          color: 'var(--text1)',
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
                              padding: '16px 16px',
                              color: isBest ? 'var(--gold)' : 'var(--text1)',
                              fontWeight: isBest ? 700 : 400,
                              fontFamily: 'var(--font-mono)',
                              fontSize: 14,
                            }}>
                              <div>{formatted}</div>
                              {/* Visual comparison bar for percentage metrics */}
                              {v !== null && (row.key === 'winRate' || row.key === 'settlementRate' || row.key === 'dismissRate') && (
                                <div style={{ marginTop: 6, height: 4, background: 'var(--bdr)', borderRadius: 2, overflow: 'hidden' }}>
                                  <div style={{
                                    height: '100%',
                                    width: `${Math.min(v, 100)}%`,
                                    background: isBest ? 'var(--gold)' : row.key === 'dismissRate' ? 'var(--link)' : 'var(--bdr)',
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

          {/* Attorney Impact & Settlement Range */}
          {comparing && stats.length >= 2 && (
            <section style={{
              marginTop: 32,
              padding: 'clamp(24px, 5vw, 32px)',
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text1)', margin: '0 0 20px 0', fontFamily: 'var(--font-ui)' }}>
                Attorney Impact & Settlement Range
              </h3>
              <div className="compare-impact-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: '16px' }}>
                {stats.map((s) => {
                  const wrColor = getWinRateColor(s.winRate);
                  return (
                    <div key={s.nos} style={{ padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', marginBottom: 12, fontFamily: 'var(--font-ui)' }}>
                        {s.label}
                      </div>

                      {/* Win Rate Badge */}
                      <div style={{ display: 'inline-block', padding: '2px 10px', background: wrColor.bg, border: `1px solid ${wrColor.border}`, borderRadius: '4px', fontSize: 12, fontWeight: 600, color: wrColor.text, marginBottom: 12 }}>
                        {s.winRate.toFixed(1)}% win rate · {wrColor.label}
                      </div>

                      {/* Settlement Range Bar */}
                      {s.rngLo !== null && s.rngHi !== null && s.medianRecovery !== null && (
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Settlement Range (P25–P75)</div>
                          <div style={{ position: 'relative', height: 24 }}>
                            <div style={{ position: 'absolute', top: 8, left: 0, right: 0, height: 8, background: 'rgba(59,130,246,0.08)', borderRadius: 4 }} />
                            <div style={{
                              position: 'absolute', top: 8, height: 8,
                              left: `${Math.min(90, (s.rngLo / s.rngHi) * 100)}%`,
                              right: '0%',
                              background: 'linear-gradient(90deg, var(--link), var(--link))',
                              borderRadius: 4,
                            }} />
                            <div style={{ position: 'absolute', top: 4, width: 2, height: 16, background: 'var(--gold)', left: `${(s.medianRecovery / s.rngHi) * 100}%`, transform: 'translateX(-50%)' }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text2)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                            <span>${s.rngLo}K</span>
                            <span>${s.medianRecovery}K</span>
                            <span>${s.rngHi}K</span>
                          </div>
                        </div>
                      )}

                      {/* Attorney Impact */}
                      {s.attorneyWR !== null && s.proSeWR !== null && (
                        <div style={{ display: 'flex', gap: 8 }}>
                          <div style={{ flex: 1, padding: '8px', background: 'rgba(34,197,94,0.1)', borderRadius: 4, textAlign: 'center' }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--data-positive)', fontFamily: 'var(--font-mono)' }}>{s.attorneyWR}%</div>
                            <div style={{ fontSize: 12, color: 'var(--text2)' }}>w/ attorney</div>
                          </div>
                          <div style={{ flex: 1, padding: '8px', background: 'rgba(239,68,68,0.06)', borderRadius: 4, textAlign: 'center' }}>
                            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--data-negative)', fontFamily: 'var(--font-mono)' }}>{s.proSeWR}%</div>
                            <div style={{ fontSize: 12, color: 'var(--text2)' }}>pro se</div>
                          </div>
                        </div>
                      )}

                      {/* Confidence + Sample Size */}
                      {s.totalCases !== null && (
                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text2)' }}>
                          <span style={{
                            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                            backgroundColor: s.totalCases >= 10000 ? 'var(--data-positive)' : s.totalCases >= 1000 ? 'var(--wrn-txt)' : s.totalCases >= 100 ? 'var(--data-negative)' : 'var(--text4, #8A8780)',
                          }} />
                          n={s.totalCases.toLocaleString()} cases
                        </div>
                      )}

                      {/* Top Districts */}
                      {s.topDistricts.length > 0 && (
                        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text2)' }}>
                          <span style={{ fontWeight: 600 }}>Top districts: </span>
                          {s.topDistricts.join(', ')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* AI Comparison Narrative */}
              <div style={{
                marginTop: 20,
                padding: '16px',
                background: 'var(--card)',
                borderRadius: '4px',
                border: '1px solid var(--bdr)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ display: 'inline-block', padding: '1px 6px', background: 'var(--bdr)', borderRadius: 4, fontSize: 12, fontWeight: 600, color: 'var(--text2)', letterSpacing: '0.3px' }}>AI</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)' }}>Comparison Summary</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text1)', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-ui)' }}>
                  {stats[0].label} cases show a {stats[0].winRate > stats[1].winRate ? 'higher' : 'lower'} win rate ({stats[0].winRate.toFixed(1)}%) compared to {stats[1].label} ({stats[1].winRate.toFixed(1)}%), with {Math.abs(stats[0].medianDuration - stats[1].medianDuration).toFixed(0)} months difference in median case duration.{' '}
                  {stats[0].medianRecovery !== null && stats[1].medianRecovery !== null
                    ? `Median recovery for ${stats[0].label} ($${stats[0].medianRecovery}K) is ${stats[0].medianRecovery > stats[1].medianRecovery ? 'higher' : 'lower'} than ${stats[1].label} ($${stats[1].medianRecovery}K).`
                    : ''}{' '}
                  Attorney representation provides a {stats[0].attorneyWR !== null && stats[0].proSeWR !== null ? `+${stats[0].attorneyWR - stats[0].proSeWR}%` : 'significant'} advantage in {stats[0].label} and {stats[1].attorneyWR !== null && stats[1].proSeWR !== null ? `+${stats[1].attorneyWR - stats[1].proSeWR}%` : 'significant'} in {stats[1].label} cases.
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8, marginBottom: 0 }}>
                  AI-generated comparison — for research purposes only.
                </p>
              </div>
            </section>
          )}

          {/* Visual Comparison Chart */}
          {comparing && stats.length >= 2 && (
            <section style={{
              marginTop: 48,
              padding: 'clamp(24px, 5vw, 32px)',
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--text1)',
                margin: '0 0 24px 0',
                fontFamily: 'var(--font-ui)',
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
                const colors = ['var(--link)', 'var(--gold)', 'var(--link)'];

                return (
                  <div key={metric.key} style={{ marginBottom: 24 }}>
                    <h4 style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text2)',
                      margin: '0 0 12px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      {metric.label}
                    </h4>
                    {metricStats.map((m, idx) => (
                      <div key={m.label} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 120, fontSize: 14, fontWeight: 600, color: 'var(--text1)' }}>
                          {m.label}
                        </div>
                        <div style={{
                          flex: 1,
                          height: 28,
                          background: 'var(--bdr)',
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
                              color: 'var(--card)',
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
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--text1)',
                margin: '0 0 24px 0',
                fontFamily: 'var(--font-ui)',
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
                    background: 'var(--surf)',
                    border: '1px solid var(--bdr)',
                    borderRadius: 4,
                  }}>
                    <h4 style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text1)',
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
                        background: 'var(--data-positive)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: s.winRate > 5 ? 'auto' : 0,
                      }}>
                        {s.winRate > 5 && (
                          <span style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'var(--card)',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {s.winRate.toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div style={{
                        width: `${s.settlementRate}%`,
                        background: 'var(--wrn-txt)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: s.settlementRate > 5 ? 'auto' : 0,
                      }}>
                        {s.settlementRate > 5 && (
                          <span style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'var(--card)',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {s.settlementRate.toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div style={{
                        width: `${s.dismissRate}%`,
                        background: 'var(--link)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: s.dismissRate > 5 ? 'auto' : 0,
                      }}>
                        {s.dismissRate > 5 && (
                          <span style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'var(--card)',
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
                          background: 'var(--data-positive)',
                          borderRadius: 2,
                          margin: '0 auto 4px',
                        }} />
                        <div style={{ color: 'var(--text2)', fontWeight: 500 }}>Win</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          background: 'var(--wrn-txt)',
                          borderRadius: 2,
                          margin: '0 auto 4px',
                        }} />
                        <div style={{ color: 'var(--text2)', fontWeight: 500 }}>Settlement</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          width: 12,
                          height: 12,
                          background: 'var(--link)',
                          borderRadius: 2,
                          margin: '0 auto 4px',
                        }} />
                        <div style={{ color: 'var(--text2)', fontWeight: 500 }}>Dismiss</div>
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
              background: 'rgba(59,130,246,0.06)',
              border: '1px solid var(--link-light, #BAE6FD)',
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
                    color: 'var(--text1)',
                    margin: '0 0 12px 0',
                    fontFamily: 'var(--font-ui)',
                  }}>
                    Quick Insights
                  </h3>
                  <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    fontSize: 14,
                    color: 'var(--text1)',
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
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: 4,
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}>
            <p style={{
              fontSize: 14,
              color: 'var(--text2)',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 800,
            }}>
              Data sourced from the Federal Judicial Center Integrated Database. Outcomes are historical averages and do not predict future results.
              This is not legal advice.{' '}
              <Link href="/methodology" className="mcv-link" style={{ textDecoration: 'none' }}>
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
              color: 'var(--text1)',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-ui)',
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
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: 2,
                    padding: 16,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 200ms ease',
                    fontFamily: 'var(--font-ui)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 4px rgba(10, 102, 194, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--bdr)';
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
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text1)',
                    }}>
                      {comp.name1}
                    </span>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--link)',
                      background: 'rgba(239,68,68,0.08)',
                      padding: '2px 8px',
                      borderRadius: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.2px',
                    }}>
                      vs
                    </span>
                    <span style={{
                      flex: 1,
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text1)',
                      textAlign: 'right',
                    }}>
                      {comp.name2}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--text2)',
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
              color: 'var(--text1)',
              margin: '0 0 24px 0',
              fontFamily: 'var(--font-ui)',
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
                { name: 'Advanced Search', href: '/attorney/advanced-search', desc: 'Deep legal research tool' },
                { name: 'Citation Check', href: '/attorney/citation-check', desc: 'Citation research & validation' },
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  href={tool.href}
                  style={{
                    display: 'block',
                    padding: 16,
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: 4,
                    textDecoration: 'none',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 4px rgba(10, 102, 194, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--bdr)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                  }}
                >
                  <h4 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--gold)',
                    margin: '0 0 4px 0',
                    fontFamily: 'var(--font-ui)',
                  }}>
                    {tool.name}
                  </h4>
                  <p style={{
                    fontSize: 14,
                    color: 'var(--text2)',
                    margin: 0,
                  }}>
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
