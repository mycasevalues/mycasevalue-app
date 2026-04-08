'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { fmtK } from '../../lib/format';
import { ATTORNEY_IMPACT } from '../../lib/attorney-impact';
import { getWinRateColor } from '../../lib/color-scale';
import { SITE_URL } from '@/lib/site-config';

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
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [represented, setRepresented] = useState('yes');
  const [results, setResults] = useState<OddsResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCheck = () => {
    if (!selectedNOS) return;
    const r = computeOdds(selectedNOS);
    setResults(r);
    setShowResults(true);
  };

  const wrColors = results ? getWinRateColor(results.winRate) : null;
  const winColor = wrColors?.text || '#0f0f0f';

  // Attorney impact data
  const attyData = results ? ATTORNEY_IMPACT[results.nos] : null;

  // Top circuits sorted by win rate
  const topCircuits = results
    ? Object.entries(results.circuitRates)
        .map(([circuit, rate]) => ({ circuit, rate: rate as number }))
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 6)
    : [];

  // Calculate national average win rate
  const nationalAverageWinRate = results
    ? Object.values(REAL_DATA).reduce((sum, rd) => sum + ((rd.wr ?? 0) * (rd.total ?? 0)), 0) /
      Object.values(REAL_DATA).reduce((sum, rd) => sum + (rd.total ?? 0), 0)
    : 0;

  // Get rank by volume
  const caseTypeRank = results
    ? Object.entries(REAL_DATA)
        .map(([_, rd]) => rd.total ?? 0)
        .sort((a, b) => b - a)
        .findIndex(total => total === results.totalCases) + 1
    : 0;

  // Calculate favorable percentage (win + settlement)
  const favorablePercentage = results ? results.winRate + results.settlementRate : 0;


  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Case Odds', item: `${SITE_URL}/odds` },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Case Odds Calculator',
        description: 'Calculate your odds of winning a federal court case based on historical data, case type, and jurisdiction.',
        url: `${SITE_URL}/odds`,
        applicationCategory: 'LegalService',
        isPartOf: { '@type': 'WebSite', name: 'MyCaseValue', url: SITE_URL },
      },
    ],
  };

  return (
    <>
      <style>{`
        .odds-select {
          height: 48px;
          width: 100%;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 0 36px 0 16px;
          font-family: var(--font-body);
          font-size: 14px;
          color: #0f0f0f;
          background: #FFFFFF;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .odds-select:hover { border-color: #004182; }
        .odds-select:focus { outline: none; border-color: #004182; box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        .odds-btn {
          background: #0966C3;
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 14px 40px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: var(--font-display);
          transition: background 0.2s ease;
        }
        .odds-btn:hover:not(:disabled) { background: #C41419; }
        .odds-btn:disabled { background: #E5E7EB; color: #4B5563; cursor: not-allowed; }
        .odds-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .odds-link { color: #004182; text-decoration: none; transition: color 0.2s ease; }
        .odds-link:hover { color: #004a6d; text-decoration: underline; }
        .outcome-donut {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          position: relative;
        }
        .outcome-donut-inner {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
        }
        .explore-card {
          display: flex;
          flex-direction: column;
          padding: '16px';
          background: '#F8F9FA';
          border: '1px solid #E5E7EB';
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
          height: 100%;
        }
        .explore-card:hover {
          background: '#F0F3F5';
          border-color: '#004182';
        }
        @media (max-width: 768px) {
          .odds-grid-3 { grid-template-columns: 1fr !important; }
          .odds-grid-2 { grid-template-columns: 1fr !important; }
          .odds-hero h1 { font-size: 28px !important; }
          .explore-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero Header */}
      <header style={{
        background: '#1C3A5E',
        padding: 'clamp(32px, 6vw, 56px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
          <div style={{
            display: 'inline-block',
            background: '#0966C3',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: 2,
            fontSize: 11,
            fontWeight: 600,
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
            fontWeight: 600,
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
            See real win rates, settlement data, and recovery ranges for your case type — instantly, using data from 5.1M+ federal cases.
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" className="odds-link">Home</Link>
          <span style={{ color: '#4B5563', margin: '0 8px' }}>/</span>
          <span style={{ color: '#0f0f0f', fontWeight: 600 }}>Check My Odds</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        background: '#F7F8FA',
        minHeight: 'calc(100vh - 280px)',
        padding: 'clamp(24px, 5vw, 48px)',
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>

          {/* Input Section */}
          <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 40px)', marginBottom: 32 }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#0f0f0f',
              margin: '0 0 24px',
              fontFamily: 'var(--font-display)',
            }}>
              Select Your Case Type
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="odds-grid-2">
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
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
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Federal District (optional)
                </label>
                <select
                  value={selectedDistrict}
                  onChange={e => { setSelectedDistrict(e.target.value); setShowResults(false); }}
                  className="odds-select"
                >
                  <option value="">All districts (national)</option>
                  {STATES.filter(st => st.id).map(st => (
                    <option key={st.id} value={st.id}>{st.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Attorney Representation
                </label>
                <div style={{ display: 'flex', gap: 0, borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                  <button
                    type="button"
                    onClick={() => { setRepresented('yes'); setShowResults(false); }}
                    style={{
                      padding: '12px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      background: represented === 'yes' ? '#0966C3' : '#FFFFFF',
                      color: represented === 'yes' ? '#FFFFFF' : '#4B5563',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    With Attorney
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRepresented('no'); setShowResults(false); }}
                    style={{
                      padding: '12px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      background: represented === 'no' ? '#0966C3' : '#FFFFFF',
                      color: represented === 'no' ? '#FFFFFF' : '#4B5563',
                      border: 'none',
                      borderLeft: '1px solid #E5E7EB',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Pro Se
                  </button>
                </div>
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
                background: wrColors?.bg || '#FFFFFF',
                borderTop: `4px solid ${winColor}`,
              }}>
                <p style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#4B5563',
                  margin: '0 0 4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Plaintiff Favorable Outcome
                </p>
                <div style={{ fontSize: 11, color: wrColors?.text || '#4B5563', fontWeight: 600, marginBottom: 8 }}>
                  {wrColors?.label || ''}
                </div>
                <div style={{
                  fontSize: 'clamp(56px, 12vw, 80px)',
                  fontWeight: 600,
                  color: winColor,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1,
                  margin: '0 0 8px',
                }}>
                  {favorablePercentage.toFixed(1)}%
                </div>
                <p style={{ fontSize: 14, color: '#4B5563', margin: '0 0 16px' }}>
                  Based on <strong style={{ color: '#0f0f0f', fontFamily: 'var(--font-mono)' }}>
                    {(results.totalCases ?? 0).toLocaleString()}
                  </strong> {results.label} cases in federal court
                </p>
                <div style={{
                  display: 'inline-flex',
                  gap: 24,
                  background: '#F7F8FA',
                  padding: '12px 24px',
                  borderRadius: 2,
                  fontSize: 13,
                }}>
                  <span>
                    <span style={{ color: '#4B5563' }}>Settlement: </span>
                    <strong style={{ color: '#D97706', fontFamily: 'var(--font-mono)' }}>{results.settlementRate.toFixed(1)}%</strong>
                  </span>
                  <span style={{ color: '#E5E7EB' }}>|</span>
                  <span>
                    <span style={{ color: '#4B5563' }}>Dismissal: </span>
                    <strong style={{ color: '#0966C3', fontFamily: 'var(--font-mono)' }}>{results.dismissalRate.toFixed(1)}%</strong>
                  </span>
                  <span style={{ color: '#E5E7EB' }}>|</span>
                  <span>
                    <span style={{ color: '#4B5563' }}>Duration: </span>
                    <strong style={{ color: '#004182', fontFamily: 'var(--font-mono)' }}>{results.medianDuration} mo</strong>
                  </span>
                </div>
              </div>

              {/* Outcome Distribution + Recovery Range side by side */}
              <div className="odds-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

                {/* Outcomes */}
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Case Outcomes
                  </h3>
                  <div style={{ display: 'grid', gap: 16 }}>
                    {[
                      { label: 'Won at Trial', value: results.winRate, color: '#059669' },
                      { label: 'Settled', value: results.settlementRate, color: '#D97706' },
                      { label: 'Dismissed', value: results.dismissalRate, color: '#0966C3' },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: '#0f0f0f', fontWeight: 500 }}>{item.label}</span>
                          <span style={{
                            fontSize: 13,
                            fontWeight: 600,
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
                        color: '#4B5563',
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
                          <span style={{ color: '#4B5563' }}>{end.label}</span>
                          <span style={{
                            color: end.color || '#0f0f0f',
                            fontWeight: 600,
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {(end.count ?? 0).toLocaleString()}
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
                    fontWeight: 600,
                    color: '#0f0f0f',
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
                          <p style={{ fontSize: 11, color: '#4B5563', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>25th %ile</p>
                          <p style={{ fontSize: 24, fontWeight: 600, color: '#4B5563', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            {results.recoveryLow !== null ? fmtK(results.recoveryLow) : '–'}
                          </p>
                        </div>
                        <div style={{ background: '#F0F9FF', borderRadius: 2, padding: '8px 0' }}>
                          <p style={{ fontSize: 11, color: '#004182', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>Median</p>
                          <p style={{ fontSize: 28, fontWeight: 600, color: '#004182', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            {fmtK(results.recoveryMedian)}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: 11, color: '#4B5563', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>75th %ile</p>
                          <p style={{ fontSize: 24, fontWeight: 600, color: '#4B5563', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            {results.recoveryHigh !== null ? fmtK(results.recoveryHigh) : '–'}
                          </p>
                        </div>
                      </div>

                      {/* Gradient bar */}
                      <div style={{ position: 'relative', height: 12, borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(to right, #E5E7EB 0%, #004182 50%, #1C3A5E 100%)',
                          borderRadius: 2,
                        }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#4B5563' }}>
                        <span>Lower</span>
                        <span>Higher</span>
                      </div>
                    </>
                  ) : (
                    <div style={{
                      padding: 32,
                      textAlign: 'center',
                      color: '#4B5563',
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
                      color: '#4B5563',
                      margin: '0 0 8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Time to Resolution
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: '#004182',
                        fontFamily: 'var(--font-mono)',
                        lineHeight: 1,
                      }}>
                        {results.medianDuration}
                      </span>
                      <span style={{ fontSize: 14, color: '#4B5563' }}>months (median)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circuit Win Rates */}
              {topCircuits.length > 0 && (
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0f0f0f',
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
                      const color = rate >= 50 ? '#059669' : rate >= 35 ? '#D97706' : '#0966C3';
                      return (
                        <div key={circuit} style={{
                          background: '#F8F9FA',
                          borderRadius: 2,
                          padding: '12px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <span style={{ fontSize: 13, color: '#0f0f0f', fontWeight: 500 }}>{circuit}</span>
                          <span style={{
                            fontSize: 14,
                            fontWeight: 600,
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
                    <p style={{ fontSize: 12, color: '#4B5563', margin: '12px 0 0', textAlign: 'right' }}>
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
                  color: '#0f0f0f',
                  lineHeight: 1.7,
                  margin: '0 0 12px',
                }}>
                  In federal court, <strong>{results.label}</strong> cases see a win rate of{' '}
                  <strong style={{ color: winColor }}>{results.winRate.toFixed(1)}%</strong> at trial.
                  However, <strong style={{ color: '#D97706' }}>{results.settlementRate.toFixed(1)}%</strong> of
                  cases settle before trial
                  {results.recoveryMedian !== null && (
                    <>, with a median recovery of <strong style={{ color: '#004182' }}>{fmtK(results.recoveryMedian)}</strong></>
                  )}.
                  Cases typically resolve in <strong>{results.medianDuration} months</strong>.
                  These figures represent historical aggregate data and do not predict the outcome of your specific case.
                </p>
                <p style={{
                  fontSize: 12,
                  color: '#4B5563',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  fontWeight: 600,
                }}>
                  Source: Federal Judicial Center Integrated Database · {(results.totalCases ?? 0).toLocaleString()} cases
                </p>
              </div>

              {/* ENHANCEMENT 1: Outcome Breakdown (Donut Visualization) */}
              {results && (
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)', textAlign: 'center' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Outcome Breakdown
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <div
                      className="outcome-donut"
                      style={{
                        background: `conic-gradient(
                          #059669 0deg ${(results.winRate / 100) * 360}deg,
                          #D97706 ${(results.winRate / 100) * 360}deg ${((results.winRate + results.settlementRate) / 100) * 360}deg,
                          #9CA3AF ${((results.winRate + results.settlementRate) / 100) * 360}deg 360deg
                        )`,
                      }}
                    >
                      <div className="outcome-donut-inner">
                        <div style={{ fontSize: 24, fontWeight: 600, color: '#059669', fontFamily: 'var(--font-mono)' }}>
                          {favorablePercentage.toFixed(1)}%
                        </div>
                        <div style={{ fontSize: 11, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>
                          Favorable
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 24,
                  }}>
                    {[
                      { label: 'Win', color: '#059669', pct: results.winRate },
                      { label: 'Settlement', color: '#D97706', pct: results.settlementRate },
                      { label: 'Dismissed/Other', color: '#9CA3AF', pct: results.dismissalRate },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                        <div style={{ fontSize: 13, color: '#0f0f0f' }}>
                          <strong>{item.label}</strong> {item.pct.toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ENHANCEMENT 2: How Your Odds Compare */}
              {results && (
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    How Your Odds Compare
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 24,
                  }}>
                    <div>
                      <p style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#4B5563',
                        margin: '0 0 12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}>
                        {results.label}
                      </p>
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: '#0f0f0f', fontWeight: 500 }}>Win Rate</span>
                          <span style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: winColor,
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {results.winRate.toFixed(1)}%
                          </span>
                        </div>
                        <div style={{ height: 8, background: '#F0F3F5', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(results.winRate, 100)}%`,
                            background: winColor,
                            borderRadius: 2,
                          }} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#4B5563',
                        margin: '0 0 12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}>
                        National Average
                      </p>
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: '#0f0f0f', fontWeight: 500 }}>Win Rate</span>
                          <span style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: nationalAverageWinRate >= 50 ? '#059669' : nationalAverageWinRate >= 35 ? '#D97706' : '#0966C3',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {nationalAverageWinRate.toFixed(1)}%
                          </span>
                        </div>
                        <div style={{ height: 8, background: '#F0F3F5', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(nationalAverageWinRate, 100)}%`,
                            background: nationalAverageWinRate >= 50 ? '#059669' : nationalAverageWinRate >= 35 ? '#D97706' : '#0966C3',
                            borderRadius: 2,
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p style={{
                    fontSize: 12,
                    color: '#4B5563',
                    margin: '16px 0 0',
                    paddingTop: 16,
                    borderTop: '1px solid #F0F3F5',
                  }}>
                    {results.winRate > nationalAverageWinRate
                      ? `This case type has a ${(results.winRate - nationalAverageWinRate).toFixed(1)}% higher win rate than the federal court average.`
                      : `This case type has a ${(nationalAverageWinRate - results.winRate).toFixed(1)}% lower win rate than the federal court average.`}
                  </p>
                </div>
              )}

              {/* ENHANCEMENT 3: Key Factors That Affect Odds */}
              {results && (
                <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 24px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Key Factors That Affect Odds
                  </h3>
                  {(() => {
                    const rd = REAL_DATA[results.nos] as any;
                    const factors = rd?.factors ?? [];
                    if (factors.length === 0) {
                      return (
                        <p style={{
                          fontSize: 14,
                          color: '#4B5563',
                          margin: 0,
                          textAlign: 'center',
                          padding: '24px 0',
                        }}>
                          No specific factors listed for this case type.
                        </p>
                      );
                    }
                    return (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: 16,
                      }}>
                        {factors.map((factor, i) => (
                          <div key={i} style={{ display: 'flex', gap: 12 }}>
                            <div style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: factor.severity === 'high' ? '#0966C3' : '#D97706',
                              flexShrink: 0,
                              marginTop: 6,
                            }} />
                            <div>
                              <p style={{ fontSize: 13, color: '#0f0f0f', fontWeight: 500, margin: '0 0 4px' }}>
                                {factor.label || factor.name}
                              </p>
                              {factor.description && (
                                <p style={{ fontSize: 12, color: '#4B5563', margin: 0 }}>
                                  {factor.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ENHANCEMENT 4: Historical Context */}
              {results && (
                <div className="odds-grid-3" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                }}>
                  <div className="odds-card" style={{ padding: 'clamp(20px, 3vw, 28px)', textAlign: 'center' }}>
                    <p style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#4B5563',
                      margin: '0 0 8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Total Cases
                    </p>
                    <p style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: '#004182',
                      margin: 0,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {(results.totalCases / 1000).toFixed(1)}K
                    </p>
                    <p style={{
                      fontSize: 12,
                      color: '#4B5563',
                      margin: '8px 0 0',
                    }}>
                      in database
                    </p>
                  </div>
                  <div className="odds-card" style={{ padding: 'clamp(20px, 3vw, 28px)', textAlign: 'center' }}>
                    <p style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#4B5563',
                      margin: '0 0 8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Rank by Volume
                    </p>
                    <p style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: '#004182',
                      margin: 0,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      #{caseTypeRank}
                    </p>
                    <p style={{
                      fontSize: 12,
                      color: '#4B5563',
                      margin: '8px 0 0',
                    }}>
                      of 84 NOS codes
                    </p>
                  </div>
                  <div className="odds-card" style={{ padding: 'clamp(20px, 3vw, 28px)', textAlign: 'center' }}>
                    <p style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#4B5563',
                      margin: '0 0 8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      Settlement Context
                    </p>
                    <p style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: '#D97706',
                      margin: 0,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {Math.round(results.settlementRate)}
                    </p>
                    <p style={{
                      fontSize: 12,
                      color: '#4B5563',
                      margin: '8px 0 0',
                    }}>
                      per 100 cases
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div style={{
                background: '#1C3A5E',
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
                    background: '#0966C3',
                    color: '#FFFFFF',
                    padding: '14px 32px',
                    borderRadius: 2,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'var(--font-display)',
                    transition: 'background 0.2s ease',
                  }}
                >
                  View Full Report
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* ENHANCEMENT 5: Explore More Links */}
              {results && (
                <div>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0f0f0f',
                    margin: '0 0 16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Explore More
                  </h3>
                  <div className="explore-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 16,
                    marginBottom: 24,
                  }}>
                    <Link
                      href="/calculator"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        background: '#F8F9FA',
                        border: '1px solid #E5E7EB',
                        borderRadius: 2,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F0F3F5';
                        (e.currentTarget as HTMLElement).style.borderColor = '#004182';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F8F9FA';
                        (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', marginBottom: 8 }}>Settlement Calculator</div>
                      <div style={{ fontSize: 12, color: '#4B5563' }}>Estimate your potential recovery</div>
                    </Link>
                    <Link
                      href="/compare"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        background: '#F8F9FA',
                        border: '1px solid #E5E7EB',
                        borderRadius: 2,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F0F3F5';
                        (e.currentTarget as HTMLElement).style.borderColor = '#004182';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F8F9FA';
                        (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', marginBottom: 8 }}>Compare Case Types</div>
                      <div style={{ fontSize: 12, color: '#4B5563' }}>Side-by-side analysis tool</div>
                    </Link>
                    <Link
                      href="/trends"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        background: '#F8F9FA',
                        border: '1px solid #E5E7EB',
                        borderRadius: 2,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F0F3F5';
                        (e.currentTarget as HTMLElement).style.borderColor = '#004182';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F8F9FA';
                        (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', marginBottom: 8 }}>Case Type Trends</div>
                      <div style={{ fontSize: 12, color: '#4B5563' }}>Historical trends and patterns</div>
                    </Link>
                    <Link
                      href="/glossary"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        background: '#F8F9FA',
                        border: '1px solid #E5E7EB',
                        borderRadius: 2,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F0F3F5';
                        (e.currentTarget as HTMLElement).style.borderColor = '#004182';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = '#F8F9FA';
                        (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', marginBottom: 8 }}>Glossary</div>
                      <div style={{ fontSize: 12, color: '#4B5563' }}>Legal terms explained</div>
                    </Link>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {/* Attorney Representation Comparison */}
              {attyData && (
                <section className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>
                    Attorney Representation Impact
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                    <div style={{ padding: 16, background: '#E8F3EB', border: '1px solid #057642', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', marginBottom: 4 }}>With Attorney</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#057642', fontFamily: 'var(--font-mono)' }}>{attyData.rwr}%</div>
                      <div style={{ fontSize: 11, color: '#4B5563' }}>{(attyData.rn ?? 0).toLocaleString()} cases</div>
                    </div>
                    <div style={{ padding: 16, background: '#FEF0EF', border: '1px solid #CC1016', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', marginBottom: 4 }}>Pro Se</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#CC1016', fontFamily: 'var(--font-mono)' }}>{attyData.pwr}%</div>
                      <div style={{ fontSize: 11, color: '#4B5563' }}>{(attyData.pn ?? 0).toLocaleString()} cases</div>
                    </div>
                    <div style={{ padding: 16, background: '#EDF3FB', border: '1px solid #0966C3', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', marginBottom: 4 }}>Advantage</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#004182', fontFamily: 'var(--font-mono)' }}>+{attyData.rwr - attyData.pwr}%</div>
                      <div style={{ fontSize: 11, color: '#4B5563' }}>with representation</div>
                    </div>
                  </div>
                </section>
              )}

              {/* AI-Generated Next Steps */}
              <section className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ padding: '2px 8px', background: '#F3F2EF', borderRadius: 4, fontSize: 10, fontWeight: 600, color: '#666', letterSpacing: '0.3px' }}>AI</span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Recommended Next Steps
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: '#EDF3FB', color: '#0966C3', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>1</span>
                    <p style={{ fontSize: 13, color: '#0f0f0f', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                      {results.winRate >= 40
                        ? `With a ${results.winRate.toFixed(0)}% win rate, ${results.label} cases have favorable odds. Document all evidence thoroughly and consider consulting with an attorney experienced in this area of law.`
                        : `${results.label} cases have a ${results.winRate.toFixed(0)}% win rate, making strong evidence and legal representation particularly important. Gather all relevant documentation before filing.`
                      }
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: '#EDF3FB', color: '#0966C3', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>2</span>
                    <p style={{ fontSize: 13, color: '#0f0f0f', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                      {results.settlementRate >= 30
                        ? `Settlement occurs in ${results.settlementRate.toFixed(0)}% of cases — explore early settlement discussions as a strategic option to reduce costs and timeline.`
                        : `With a ${results.settlementRate.toFixed(0)}% settlement rate, many ${results.label} cases proceed through litigation. Prepare for a timeline of ${results.medianDuration} months to resolution.`
                      }
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: '#EDF3FB', color: '#0966C3', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>3</span>
                    <p style={{ fontSize: 13, color: '#0f0f0f', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                      {attyData
                        ? `Attorneys achieve a ${attyData.rwr}% win rate vs ${attyData.pwr}% for pro se litigants in this case type — a +${attyData.rwr - attyData.pwr}% advantage. Research attorneys with specific ${results.label} experience in your district.`
                        : `Legal representation significantly improves outcomes in federal court. Research attorneys with specific ${results.label} experience in your jurisdiction.`
                      }
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 12, marginBottom: 0 }}>
                  AI-generated guidance — for research purposes only.
                </p>
              </section>

              {/* Disclaimer */}
              <section style={{
                padding: 'clamp(16px, 4vw, 32px)',
                background: '#FEF3C7',
                border: '1px solid #FCD34D',
                borderRadius: 8,
              }}>
                <p style={{ fontSize: 13, color: '#78350F', margin: '0 0 8px', lineHeight: 1.6, fontWeight: 600 }}>
                  Statistical estimate based on historical data — not a prediction of your case outcome.
                </p>
                <p style={{ fontSize: 12, color: '#78350F', margin: 0, lineHeight: 1.6 }}>
                  Data sourced from the Federal Judicial Center Integrated Database (2000–2024). Individual outcomes vary based on case facts, jurisdiction, and representation. This is not legal advice.{' '}
                  <Link href="/methodology" className="odds-link" style={{ color: '#92400E' }}>Learn about our methodology</Link>
                </p>
              </section>
            </div>
          )}

          {/* Trust Bar */}
          {!showResults && (
            <div style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: '1px solid #E5E7EB',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 24,
                textAlign: 'center',
              }}>
                {[
                  { v: '5.1M+', l: 'Cases analyzed' },
                  { v: '95', l: 'Federal districts' },
                  { v: '84', l: 'Case types' },
                  { v: 'Instant', l: 'No account needed' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-display)',
                    }}>
                      {stat.v}
                    </div>
                    <div style={{
                      fontSize: 12,
                      marginTop: 8,
                      color: '#4B5563',
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
                border: '1px solid #E5E7EB',
                borderRadius: 2,
              }}>
                <h3 style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#0f0f0f',
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
                          border: selectedNOS === nos ? '1px solid #004182' : '1px solid transparent',
                          borderRadius: 2,
                          cursor: 'pointer',
                          fontSize: 13,
                          fontFamily: 'var(--font-body)',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ color: '#0f0f0f', fontWeight: 500 }}>{t?.label || rd.label}</span>
                        <span style={{
                          color: (rd.wr ?? 0) >= 50 ? '#059669' : '#0966C3',
                          fontWeight: 600,
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

              {/* Related Actions */}
              {results && (
              <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
                <h3 style={{
                  fontSize: 14, fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px',
                  textTransform: 'uppercase', letterSpacing: '0.3px', fontFamily: 'var(--font-display)',
                }}>
                  Next Steps
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                  <Link
                    href={`/report/${results.nos}`}
                    style={{
                      display: 'block', padding: '16px', background: '#1C3A5E', borderRadius: 2,
                      textDecoration: 'none', transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>Full Report</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Detailed analysis with PDF download</div>
                  </Link>
                  <Link
                    href="/calculator"
                    style={{
                      display: 'block', padding: '16px', background: '#F8F9FA', border: '1px solid #E5E7EB',
                      borderRadius: 2, textDecoration: 'none', transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', marginBottom: 4 }}>Settlement Calculator</div>
                    <div style={{ fontSize: 11, color: '#4B5563' }}>Estimate your potential recovery</div>
                  </Link>
                  <Link
                    href="/judges"
                    style={{
                      display: 'block', padding: '16px', background: '#F8F9FA', border: '1px solid #E5E7EB',
                      borderRadius: 2, textDecoration: 'none', transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', marginBottom: 4 }}>Judge Analytics</div>
                    <div style={{ fontSize: 11, color: '#4B5563' }}>Research judges in your district</div>
                  </Link>
                  <Link
                    href="/trends"
                    style={{
                      display: 'block', padding: '16px', background: '#F8F9FA', border: '1px solid #E5E7EB',
                      borderRadius: 2, textDecoration: 'none', transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f0f0f', marginBottom: 4 }}>Compare Case Types</div>
                    <div style={{ fontSize: 11, color: '#4B5563' }}>Side-by-side comparison tool</div>
                  </Link>
                </div>
              </div>
              )}
            </div>
          )}

          {/* No-query state: show quick info */}
          {!showResults && (
            <div className="odds-card" style={{ padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center' }}>
              <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1.5" style={{ margin: '0 auto 16px', display: 'block' }}>
                <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                Select a case type to see your odds
              </p>
              <p style={{ fontSize: 14, color: '#4B5563', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                Choose from 84 federal case types above and click &ldquo;Check Odds&rdquo; to see real win rates, settlement data, recovery ranges, and circuit-level comparisons from 5.1M+ cases.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
