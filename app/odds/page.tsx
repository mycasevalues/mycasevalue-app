'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';

const allTypes = SITS.flatMap(cat =>
  cat.opts.map(opt => ({ label: opt.label, nos: opt.nos, category: cat.label }))
);

// Deduplicate by NOS code (some categories share the same NOS)
const uniqueNOS = new Map<string, { label: string; nos: string; category: string }>();
allTypes.forEach(t => {
  if (!uniqueNOS.has(t.nos)) uniqueNOS.set(t.nos, t);
});

interface OddsResult {
  nos: string;
  label: string;
  totalCases: number;
  winRate: number;
  settlementRate: number;
  dismissalRate: number;
  medianDuration: number;
  recoveryLow: number | null;
  recoveryMedian: number | null;
  recoveryHigh: number | null;
  ends: { label: string; count: number; color: string }[];
  circuitRates: Record<string, number>;
  stateRates: Record<string, number>;
}

function computeOdds(nos: string): OddsResult | null {
  const rd = REAL_DATA[nos] as any;
  if (!rd) return null;
  const type = uniqueNOS.get(nos);
  const label = type?.label || rd.label || 'Case Type';
  const winRate = rd.wr ?? 0;
  const settlementRate = rd.sp ?? 0;
  const dismissalRate = Math.max(0, 100 - winRate - settlementRate);
  return {
    nos,
    label,
    totalCases: rd.total ?? 0,
    winRate,
    settlementRate,
    dismissalRate,
    medianDuration: rd.mo ?? 0,
    recoveryLow: rd.rng?.lo ?? null,
    recoveryMedian: rd.rng?.md ?? null,
    recoveryHigh: rd.rng?.hi ?? null,
    ends: rd.ends ?? [],
    circuitRates: rd.circuit_rates ?? {},
    stateRates: rd.state_rates ?? {},
  };
}

export default function OddsPage() {
  const [selectedNOS, setSelectedNOS] = useState('');
  const [results, setResults] = useState<OddsResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCheck = () => {
    if (!selectedNOS) return;
    const r = computeOdds(selectedNOS);
    setResults(r);
    setShowResults(true);
  };

  const winColor = results
    ? results.winRate >= 50 ? '#07874A' : results.winRate >= 35 ? '#D97706' : '#E8171F'
    : '#212529';

  // Top circuits sorted by win rate
  const topCircuits = results
    ? Object.entries(results.circuitRates)
        .map(([circuit, rate]) => ({ circuit, rate: rate as number }))
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 6)
    : [];

  return (
    <>
      <style>{`
        .odds-select {
          height: 48px;
          width: 100%;
          border: 1px solid #D5D8DC;
          border-radius: 2px;
          padding: 0 36px 0 16px;
          font-family: var(--font-body);
          font-size: 14px;
          color: #212529;
          background: #FFFFFF;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .odds-select:hover { border-color: #006997; }
        .odds-select:focus { outline: none; border-color: #006997; box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        .odds-btn {
          background: #E8171F;
          color: #FFFFFF;
          border: none;
          border-radius: 2px;
          padding: 14px 40px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: var(--font-display);
          transition: background 0.2s ease;
        }
        .odds-btn:hover:not(:disabled) { background: #C41419; }
        .odds-btn:disabled { background: #D5D8DC; color: #455A64; cursor: not-allowed; }
        .odds-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 2px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .odds-link { color: #006997; text-decoration: none; transition: color 0.2s ease; }
        .odds-link:hover { color: #004a6d; text-decoration: underline; }
        @media (max-width: 768px) {
          .odds-grid-3 { grid-template-columns: 1fr !important; }
          .odds-grid-2 { grid-template-columns: 1fr !important; }
          .odds-hero h1 { font-size: 28px !important; }
        }
      `}</style>

      {/* Hero Header */}
      <header style={{
        background: '#00172E',
        padding: 'clamp(32px, 6vw, 56px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: '#E8171F',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: 2,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            marginBottom: 16,
            fontFamily: 'var(--font-display)',
          }}>
            FREE TOOL
          </div>
          <h1 className="odds-hero" style={{
            color: '#FFFFFF',
            fontSize: 'clamp(28px, 7vw, 40px)',
            fontWeight: 700,
            margin: '0 0 12px',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}>
            Check Your Case Odds
          </h1>
          <p style={{
            color: '#b8bcc0',
            fontSize: 'clamp(14px, 2vw, 16px)',
            margin: 0,
            maxWidth: 600,
            lineHeight: 1.5,
            fontFamily: 'var(--font-body)',
          }}>
            See real win rates, settlement data, and recovery ranges for your case type — instantly, using data from 4.1M+ federal cases.
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" className="odds-link">Home</Link>
          <span style={{ color: '#455A64', margin: '0 8px' }}>/</span>
          <span style={{ color: '#212529', fontWeight: 600 }}>Check My Odds</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        background: '#F5F6F7',
        minHeight: 'calc(100vh - 280px)',
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>

          {/* Input Section */}
          <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 40px)', marginBottom: 32 }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#212529',
              margin: '0 0 24px',
              fontFamily: 'var(--font-display)',
            }}>
              Select Your Case Type
            </h2>
            <div className="odds-grid-2" style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 16,
              alignItems: 'end',
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#455A64',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}>
                  Case Type *
                </label>
                <select
                  value={selectedNOS}
                  onChange={e => { setSelectedNOS(e.target.value); setShowResults(false); }}
                  className="odds-select"
                >
                  <option value="">Select a case type...</option>
                  {SITS.map(cat => (
                    <optgroup key={cat.id} label={cat.label}>
                      {cat.opts
                        .filter((opt, idx, arr) => arr.findIndex(o => o.nos === opt.nos) === idx)
                        .map(opt => (
                          <option key={opt.nos} value={opt.nos}>
                            {opt.label} (NOS {opt.nos})
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <button
                onClick={handleCheck}
                disabled={!selectedNOS}
                className="odds-btn"
              >
                Check Odds
              </button>
            </div>
          </div>

          {/* Results */}
          {showResults && results && (
            <div style={{ display: 'grid', gap: 24 }}>

              {/* Win Rate Hero Card */}
              <div className="odds-card" style={{
                padding: 'clamp(32px, 5vw, 48px)',
                textAlign: 'center',
                borderTop: `4px solid ${winColor}`,
              }}>
                <p style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#455A64',
                  margin: '0 0 8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Plaintiff Win Rate
                </p>
                <div style={{
                  fontSize: 'clamp(56px, 12vw, 80px)',
                  fontWeight: 700,
                  color: winColor,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1,
                  margin: '0 0 8px',
                }}>
                  {results.winRate.toFixed(1)}%
                </div>
                <p style={{ fontSize: 14, color: '#455A64', margin: '0 0 16px' }}>
                  Based on <strong style={{ color: '#212529', fontFamily: 'var(--font-mono)' }}>
                    {results.totalCases.toLocaleString()}
                  </strong> {results.label} cases in federal court
                </p>
                <div style={{
                  display: 'inline-flex',
                  gap: 24,
                  background: '#F5F6F7',
                  padding: '12px 24px',
                  borderRadius: 2,
                  fontSize: 13,
                }}>
                  <span>
                    <span style={{ color: '#455A64' }}>Settlement: </span>
                    <strong style={{ color: '#D97706', fontFamily: 'var(--font-mono)' }}>{results.settlementRate.toFixed(1)}%</strong>
                  </span>
                  <span style={{ color: '#D5D8DC' }}>|</span>
                  <span>
                    <span style={{ color: '#455A64' }}>Dismissal: </span>
                    <strong style={{ color: '#E8171F', fontFamily: 'var(--font-mono)' }}>{results.dismissalRate.toFixed(1)}%</strong>
                  </span>
                  <span style={{ color: '#D5D8DC' }}>|</span>
                  <span>
                    <span style={{ color: '#455A64' }}>Duration: </span>
                    <strong style={{ color: '#006997', fontFamily: 'var(--font-mono)' }}>{results.medianDuration} mo</strong>
                  </span>
                </div>
              </div>

              {/* Outcome Distribution + Recovery Range side by side */}
              <div className="odds-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

                {/* Outcomes */}
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#212529',
                    margin: '0 0 20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Case Outcomes
                  </h3>
                  <div style={{ display: 'grid', gap: 16 }}>
                    {[
                      { label: 'Won at Trial', value: results.winRate, color: '#07874A' },
                      { label: 'Settled', value: results.settlementRate, color: '#D97706' },
                      { label: 'Dismissed', value: results.dismissalRate, color: '#E8171F' },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: '#212529', fontWeight: 500 }}>{item.label}</span>
                          <span style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: item.color,
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {item.value.toFixed(1)}%
                          </span>
                        </div>
                        <div style={{ height: 8, background: '#F0F3F5', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(item.value, 100)}%`,
                            background: item.color,
                            borderRadius: 2,
                            transition: 'width 0.6s ease',
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detailed ends breakdown */}
                  {results.ends.length > 0 && (
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F0F3F5' }}>
                      <p style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#455A64',
                        margin: '0 0 12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}>
                        Detailed Outcomes
                      </p>
                      {results.ends.slice(0, 6).map((end, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '6px 0',
                          borderBottom: i < Math.min(results.ends.length, 6) - 1 ? '1px solid #F8F9FA' : 'none',
                          fontSize: 12,
                        }}>
                          <span style={{ color: '#455A64' }}>{end.label}</span>
                          <span style={{
                            color: end.color || '#212529',
                            fontWeight: 600,
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {end.count.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recovery Range */}
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#212529',
                    margin: '0 0 20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Recovery Range
                  </h3>
                  {results.recoveryMedian !== null ? (
                    <>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: 16,
                        marginBottom: 24,
                        textAlign: 'center',
                      }}>
                        <div>
                          <p style={{ fontSize: 11, color: '#455A64', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>25th %ile</p>
                          <p style={{ fontSize: 24, fontWeight: 700, color: '#455A64', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            ${results.recoveryLow !== null ? results.recoveryLow.toLocaleString() : '–'}K
                          </p>
                        </div>
                        <div style={{ background: '#F0F9FF', borderRadius: 2, padding: '8px 0' }}>
                          <p style={{ fontSize: 11, color: '#006997', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>Median</p>
                          <p style={{ fontSize: 28, fontWeight: 700, color: '#006997', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            ${results.recoveryMedian.toLocaleString()}K
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: 11, color: '#455A64', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>75th %ile</p>
                          <p style={{ fontSize: 24, fontWeight: 700, color: '#455A64', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            ${results.recoveryHigh !== null ? results.recoveryHigh.toLocaleString() : '–'}K
                          </p>
                        </div>
                      </div>

                      {/* Gradient bar */}
                      <div style={{ position: 'relative', height: 12, borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(to right, #D5D8DC 0%, #006997 50%, #00172E 100%)',
                          borderRadius: 2,
                        }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#455A64' }}>
                        <span>Lower</span>
                        <span>Higher</span>
                      </div>
                    </>
                  ) : (
                    <div style={{
                      padding: 32,
                      textAlign: 'center',
                      color: '#455A64',
                      fontSize: 14,
                    }}>
                      Recovery range data not available for this case type.
                    </div>
                  )}

                  {/* Duration context */}
                  <div style={{
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: '1px solid #F0F3F5',
                  }}>
                    <p style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#455A64',
                      margin: '0 0 8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Time to Resolution
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: '#006997',
                        fontFamily: 'var(--font-mono)',
                        lineHeight: 1,
                      }}>
                        {results.medianDuration}
                      </span>
                      <span style={{ fontSize: 14, color: '#455A64' }}>months (median)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circuit Win Rates */}
              {topCircuits.length > 0 && (
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#212529',
                    margin: '0 0 20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Win Rate by Circuit Court
                  </h3>
                  <div className="odds-grid-3" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 12,
                  }}>
                    {topCircuits.map(({ circuit, rate }) => {
                      const color = rate >= 50 ? '#07874A' : rate >= 35 ? '#D97706' : '#E8171F';
                      return (
                        <div key={circuit} style={{
                          background: '#F8F9FA',
                          borderRadius: 2,
                          padding: '12px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <span style={{ fontSize: 13, color: '#212529', fontWeight: 500 }}>{circuit}</span>
                          <span style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color,
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {rate.toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {Object.keys(results.circuitRates).length > 6 && (
                    <p style={{ fontSize: 12, color: '#455A64', margin: '12px 0 0', textAlign: 'right' }}>
                      <Link href={`/nos/${results.nos}`} className="odds-link">
                        View all circuits →
                      </Link>
                    </p>
                  )}
                </div>
              )}

              {/* Narrative */}
              <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                <p style={{
                  fontSize: 15,
                  color: '#212529',
                  lineHeight: 1.7,
                  margin: '0 0 12px',
                }}>
                  In federal court, <strong>{results.label}</strong> cases see a plaintiff win rate of{' '}
                  <strong style={{ color: winColor }}>{results.winRate.toFixed(1)}%</strong> at trial.
                  However, <strong style={{ color: '#D97706' }}>{results.settlementRate.toFixed(1)}%</strong> of
                  cases settle before trial
                  {results.recoveryMedian !== null && (
                    <>, with a median recovery of <strong style={{ color: '#006997' }}>${results.recoveryMedian.toLocaleString()}K</strong></>
                  )}.
                  Cases typically resolve in <strong>{results.medianDuration} months</strong>.
                  These figures represent historical aggregate data and do not predict the outcome of your specific case.
                </p>
                <p style={{
                  fontSize: 12,
                  color: '#455A64',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  fontWeight: 600,
                }}>
                  Source: Federal Judicial Center Integrated Database · {results.totalCases.toLocaleString()} cases
                </p>
              </div>

              {/* CTA */}
              <div style={{
                background: '#00172E',
                borderRadius: 2,
                padding: 'clamp(24px, 5vw, 40px)',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: 14, color: '#b8bcc0', margin: '0 0 16px' }}>
                  Want the full picture? See circuit breakdowns, judge data, and more.
                </p>
                <Link
                  href={`/report/${results.nos}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#E8171F',
                    color: '#FFFFFF',
                    padding: '14px 32px',
                    borderRadius: 2,
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'var(--font-display)',
                    transition: 'background 0.2s ease',
                  }}
                >
                  View Full Report
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Disclaimer */}
              <section style={{
                padding: 'clamp(16px, 4vw, 32px)',
                background: '#FFFFFF',
                border: '1px solid #D5D8DC',
                borderRadius: 2,
              }}>
                <p style={{ fontSize: 13, color: '#455A64', margin: '0 0 12px', lineHeight: 1.6 }}>
                  <strong>Research Data Disclaimer:</strong> This page provides research information based on publicly available federal court outcome data. The statistics displayed represent historical aggregate data from the Federal Judicial Center Integrated Database and are not predictions of your case outcome.
                </p>
                <p style={{ fontSize: 13, color: '#455A64', margin: 0, lineHeight: 1.6 }}>
                  <strong>Not Legal Advice:</strong> This is not legal advice and does not create an attorney-client relationship. Always consult with a qualified attorney licensed in your jurisdiction.{' '}
                  <Link href="/methodology" className="odds-link">Learn about our methodology</Link>
                </p>
              </section>
            </div>
          )}

          {/* Trust Bar */}
          {!showResults && (
            <div style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: '1px solid #D5D8DC',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 24,
                textAlign: 'center',
              }}>
                {[
                  { v: '4.1M+', l: 'Cases analyzed' },
                  { v: '94', l: 'Federal districts' },
                  { v: '84', l: 'Case types' },
                  { v: 'Instant', l: 'No account needed' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#212529',
                      fontFamily: 'var(--font-display)',
                    }}>
                      {stat.v}
                    </div>
                    <div style={{
                      fontSize: 12,
                      marginTop: 8,
                      color: '#455A64',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links to popular case types */}
              <div style={{
                marginTop: 40,
                padding: 'clamp(24px, 4vw, 32px)',
                background: '#FFFFFF',
                border: '1px solid #D5D8DC',
                borderRadius: 2,
              }}>
                <h3 style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#212529',
                  margin: '0 0 16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  fontFamily: 'var(--font-display)',
                }}>
                  Popular Case Types
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 8,
                }}>
                  {['442', '350', '360', '362', '440', '870', '830', '710', '190', '365'].map(nos => {
                    const rd = REAL_DATA[nos] as any;
                    if (!rd) return null;
                    const t = uniqueNOS.get(nos);
                    return (
                      <button
                        key={nos}
                        onClick={() => { setSelectedNOS(nos); setShowResults(false); }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 14px',
                          background: selectedNOS === nos ? '#F0F9FF' : '#F8F9FA',
                          border: selectedNOS === nos ? '1px solid #006997' : '1px solid transparent',
                          borderRadius: 2,
                          cursor: 'pointer',
                          fontSize: 13,
                          fontFamily: 'var(--font-body)',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ color: '#212529', fontWeight: 500 }}>{t?.label || rd.label}</span>
                        <span style={{
                          color: (rd.wr ?? 0) >= 50 ? '#07874A' : '#E8171F',
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          fontSize: 12,
                        }}>
                          {(rd.wr ?? 0).toFixed(0)}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
