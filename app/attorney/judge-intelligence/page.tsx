'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { REAL_DATA } from '../../../lib/realdata';

type JudgeData = {
  name: string;
  appointed: number;
  appointedBy: string;
  senior: boolean;
  casesHandled: number;
  plaintiffWinRate: number;
  settlementRate: number;
  medianDurationMonths: number;
  dismissalRate: number;
  trialRate: number;
  motionGrantRate: number;
  topCaseTypes: { nos: string; label: string; count: number }[];
};

type JudgeResponse = {
  state: string;
  stateLabel: string;
  judges: JudgeData[];
  disclaimer: string;
};

type AvailableState = { id: string; label: string };

const StatBadge = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, color }}>{value}</div>
    <div style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '2px' }}>{label}</div>
  </div>
);

const MeterBar = ({ value, max, color, label }: { value: number; max: number; color: string; label: string }) => (
  <div style={{ marginBottom: '8px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '12px', color: 'var(--text2)' }}>{label}</span>
      <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text1)' }}>{value}%</span>
    </div>
    <div style={{ height: '6px', background: 'var(--bdr)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${(value / max) * 100}%`, background: color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
    </div>
  </div>
);

export default function JudgeIntelligencePage() {
  // Inline styles for focus states
  const focusStyle = `
    select:focus, input:focus {
      outline: none;
      border-color: var(--link);
      box-shadow: var(--shadow-focus);
    }
  `;

  const [states, setStates] = useState<AvailableState[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [data, setData] = useState<JudgeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedJudge, setExpandedJudge] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'winRate' | 'settlementRate' | 'duration'>('winRate');

  // Load available states
  useEffect(() => {
    fetch('/api/attorney/judge-intelligence')
      .then((r) => r.json())
      .then((d) => setStates(d.states || []))
      .catch(() => {});
  }, []);

  async function loadJudges(stateId: string) {
    setLoading(true);
    setError('');
    setData(null);
    setExpandedJudge(null);

    try {
      const res = await fetch(`/api/attorney/judge-intelligence?state=${stateId}`);
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to load judge data');
      } else {
        const result = await res.json();
        setData(result);
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  function handleStateChange(stateId: string) {
    setSelectedState(stateId);
    if (stateId) loadJudges(stateId);
    else setData(null);
  }

  // Sort judges
  const sortedJudges = data?.judges
    ? [...data.judges].sort((a, b) => {
        switch (sortBy) {
          case 'name': return a.name.localeCompare(b.name);
          case 'winRate': return b.plaintiffWinRate - a.plaintiffWinRate;
          case 'settlementRate': return b.settlementRate - a.settlementRate;
          case 'duration': return a.medianDurationMonths - b.medianDurationMonths;
          default: return 0;
        }
      })
    : [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)', fontFamily: 'var(--font-ui)' }}>
      <style>{focusStyle}
        {`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: 20px; } }
        `}
      </style>
      {/* Header */}
      <div style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <Link href="/attorney" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            Home / Attorney / Judge Intelligence
          </Link>
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
            Judge Intelligence
          </div>
          <h1 className="font-legal" style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--text1)',
            margin: 0,
          }}>
            Know Your Judge Before the Courtroom
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 240px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
              Select District
            </label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                height: '48px',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                fontSize: '14px',
                color: 'var(--text1)',
                background: 'var(--card)',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
                transition: 'border-color 200ms',
              }}
            >
              <option value="">Choose a state...</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          {data && (
            <div style={{ flex: '0 0 auto' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Sort By
              </label>
              <div style={{ display: 'flex', gap: '4px', background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--bdr)', padding: '3px' }}>
                {([
                  { key: 'winRate', label: 'Win Rate' },
                  { key: 'settlementRate', label: 'Settlement' },
                  { key: 'duration', label: 'Duration' },
                  { key: 'name', label: 'Name' },
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSortBy(opt.key)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '2px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      backgroundColor: sortBy === opt.key ? 'var(--link)' : 'transparent',
                      color: sortBy === opt.key ? 'var(--card)' : 'var(--text2)',
                      transition: 'all 200ms',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ width: 36, height: 36, border: '3px solid var(--bdr)', borderTopColor: 'var(--link)', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 16px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Loading judge data...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '24px 24px', marginBottom: '24px' }}>
            <p style={{ fontSize: '14px', color: 'var(--link)', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!selectedState && !loading && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '64px 32px', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '4px', background: 'rgba(0,105,151,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', margin: '0 0 12px' }}>
              Select a District
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto' }}>
              Choose a state above to view federal judge statistics, ruling patterns, and case tendencies.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
              {states.slice(0, 6).map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStateChange(s.id)}
                  style={{ padding: '8px 16px', border: '1px solid var(--bdr)', borderRadius: '2px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: 'var(--surf)', color: 'var(--link)', transition: 'border-color 200ms' }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Judge Cards */}
        {data && sortedJudges.length > 0 && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: 'var(--text2)' }}>
                Showing {sortedJudges.length} federal judges in {data.stateLabel}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sortedJudges.map((judge) => {
                const isExpanded = expandedJudge === judge.name;
                return (
                  <div
                    key={judge.name}
                    style={{
                      background: 'var(--card)',
                      borderRadius: '4px',
                      border: isExpanded ? '2px solid var(--link)' : '1px solid var(--bdr)',
                      overflow: 'hidden',
                      transition: 'border-color 200ms, box-shadow 200ms',
                      boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Judge Header */}
                    <button
                      onClick={() => setExpandedJudge(isExpanded ? null : judge.name)}
                      style={{
                        width: '100%',
                        padding: '24px 24px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span className="font-legal" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text1)' }}>
                            {judge.name}
                          </span>
                          {judge.senior && (
                            <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', padding: '2px 8px', borderRadius: '3px', backgroundColor: 'rgba(184,110,0,0.08)', color: 'var(--wrn-txt)' }}>
                              Senior
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '14px', color: 'var(--text2)', margin: 0 }}>
                          Appointed {judge.appointed} by {judge.appointedBy} · {judge.casesHandled} cases handled
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexShrink: 0 }}>
                        <StatBadge label="Win Rate" value={`${judge.plaintiffWinRate}%`} color={judge.plaintiffWinRate >= 55 ? 'var(--data-positive)' : judge.plaintiffWinRate >= 40 ? 'var(--wrn-txt)' : 'var(--link)'} />
                        <StatBadge label="Settlement" value={`${judge.settlementRate}%`} color="var(--link)" />
                        <StatBadge label="Duration" value={`${judge.medianDurationMonths}mo`} color="var(--text1)" />
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--text2)"
                          strokeWidth="2"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--bdr)' }}>
                        <div style={{ paddingTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                          {/* Ruling Patterns */}
                          <div>
                            <h4 className="font-legal" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                              Ruling Patterns
                            </h4>
                            <MeterBar value={judge.plaintiffWinRate} max={100} color="var(--data-positive)" label="Favorable Outcome Rate" />
                            <MeterBar value={judge.settlementRate} max={100} color="var(--link)" label="Settlement Rate" />
                            <MeterBar value={judge.dismissalRate} max={100} color="var(--link)" label="Dismissal Rate" />
                            <MeterBar value={judge.trialRate} max={100} color='var(--link)' label="Trial Rate" />
                            <MeterBar value={judge.motionGrantRate} max={100} color="var(--chrome-bg)" label="Motion Grant Rate" />
                          </div>

                          {/* Judge Profile */}
                          <div>
                            <h4 className="font-legal" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                              Profile
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {[
                                { label: 'Appointed', value: `${judge.appointed} by Pres. ${judge.appointedBy}` },
                                { label: 'Status', value: judge.senior ? 'Senior Status' : 'Active' },
                                { label: 'Cases Handled', value: judge.casesHandled.toLocaleString() },
                                { label: 'Median Duration', value: `${judge.medianDurationMonths} months` },
                              ].map((item) => (
                                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--bdr)' }}>
                                  <span style={{ fontSize: '14px', color: 'var(--text2)' }}>{item.label}</span>
                                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)' }}>{item.value}</span>
                                </div>
                              ))}
                            </div>

                            <h4 className="font-legal" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: '24px 0 12px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                              Top Case Types
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {judge.topCaseTypes.map((ct) => (
                                <div key={ct.nos} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                                  <span style={{ fontSize: '14px', color: 'var(--text1)' }}>{ct.label}</span>
                                  <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text2)' }}>{ct.count} cases</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '24px', padding: '24px 24px', backgroundColor: 'rgba(122,88,0,0.08)', border: '1px solid var(--bdr)', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: 'var(--wrn-txt)', margin: 0, lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> {data.disclaimer}
              </p>
            </div>

            {/* Related Tools */}
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                {[
                  { name: 'Venue Optimizer', href: '/attorney/venue-optimizer', desc: 'Find the optimal filing district by case metrics' },
                  { name: 'Case Predictor', href: '/attorney/case-predictor', desc: 'Predict case outcomes with AI analytics' },
                  { name: 'Motion Analytics', href: '/attorney/motion-analytics', desc: 'Analyze motion success rates by judge' },
                  { name: 'Court Rules', href: '/attorney/court-rules', desc: 'Federal and state court rules and procedures' },
                ].map(tool => (
                  <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 200ms' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
