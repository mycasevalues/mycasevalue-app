'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type CaseTypeOption = { nos: string; label: string; total: number };

type VenueScore = {
  state: string;
  stateLabel: string;
  winRate: number;
  nationalAvgWinRate: number;
  advantage: number;
  settlementRate: number;
  medianDurationMonths: number;
  totalCases: number;
  score: number;
  rank: number;
};

type VenueResponse = {
  nos: string;
  caseType: string;
  nationalStats: {
    winRate: number;
    settlementRate: number;
    medianDurationMonths: number;
    totalCases: number;
  };
  prioritize: string;
  venues: VenueScore[];
  disclaimer: string;
};

const medals = ['#1', '#2', '#3'];

export default function VenueOptimizerPage() {
  // Inline styles for focus states
  const focusStyle = `
    select:focus, input:focus {
      outline: none;
      border-color: var(--link);
      box-shadow: var(--shadow-focus);
    }
  `;

  const [caseTypes, setCaseTypes] = useState<CaseTypeOption[]>([]);
  const [selectedNos, setSelectedNos] = useState('');
  const [prioritize, setPrioritize] = useState('winRate');
  const [data, setData] = useState<VenueResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Load case types
  useEffect(() => {
    fetch('/api/attorney/venue-optimizer')
      .then((r) => r.json())
      .then((d) => setCaseTypes(d.caseTypes || []))
      .catch(() => {});
  }, []);

  async function loadVenues() {
    if (!selectedNos) return;
    setLoading(true);
    setShowAll(false);

    try {
      const res = await fetch(`/api/attorney/venue-optimizer?nos=${selectedNos}&prioritize=${prioritize}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch {
      // silent
    }
    setLoading(false);
  }

  useEffect(() => {
    if (selectedNos) loadVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNos, prioritize]);

  const displayedVenues = data ? (showAll ? data.venues : data.venues.slice(0, 15)) : [];

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
          <Link href="/" style={{ fontSize: '14px', color: 'var(--link)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Home &gt; Attorney Tools &gt; Venue Optimizer
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <div>
              <h1 className="font-legal" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text1)', margin: '0 0 16px 0' }}>
                Pick the Court That Wins Your Case
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Controls */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '24px', marginBottom: '24px', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 300px' }}>
              <label htmlFor="case-type" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Case Type
              </label>
              <select
                id="case-type"
                value={selectedNos}
                onChange={(e) => setSelectedNos(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', height: '48px', border: '1px solid var(--bdr)', borderRadius: '4px', fontSize: '14px', color: 'var(--text1)', background: 'var(--card)', fontFamily: 'var(--font-ui)', transition: 'border-color 200ms' }}
              >
                <option value="">Select case type...</option>
                {caseTypes.map((ct) => (
                  <option key={ct.nos} value={ct.nos}>
                    {ct.label} (NOS {ct.nos}) — {ct.total.toLocaleString()} cases
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: '0 0 auto' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Prioritize
              </label>
              <div style={{ display: 'flex', gap: '4px', background: 'var(--card)', borderRadius: '4px', border: '1px solid var(--bdr)', padding: '3px' }}>
                {([
                  { key: 'winRate', label: 'Win Rate' },
                  { key: 'settlement', label: 'Settlement' },
                  { key: 'speed', label: 'Speed' },
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setPrioritize(opt.key)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      backgroundColor: prioritize === opt.key ? 'var(--link)' : 'transparent',
                      color: prioritize === opt.key ? 'var(--card)' : 'var(--text2)',
                      transition: 'all 200ms',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ width: 36, height: 36, border: '3px solid var(--bdr)', borderTopColor: 'var(--link)', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 16px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Analyzing venues...</p>
          </div>
        )}

        {/* National stats */}
        {data && !loading && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>National Win Rate</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text1)', margin: 0 }}>{data.nationalStats.winRate}%</p>
              </div>
              <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>Settlement Rate</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--data-positive)', margin: 0 }}>{data.nationalStats.settlementRate}%</p>
              </div>
              <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>Median Duration</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--link)', margin: 0 }}>{data.nationalStats.medianDurationMonths}mo</p>
              </div>
              <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text2)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>Total Cases</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text1)', margin: 0 }}>{data.nationalStats.totalCases.toLocaleString()}</p>
              </div>
            </div>

            {/* Venue Rankings Table */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', overflow: 'hidden', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--bdr)' }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', margin: '0 0 12px' }}>
                  Venue Rankings — {data.caseType}
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '4px 0 0' }}>
                  {data.venues.length} districts ranked by {prioritize === 'winRate' ? 'win rate' : prioritize === 'settlement' ? 'settlement likelihood' : 'case speed'}
                </p>
              </div>

              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 90px 90px 80px 80px 70px', gap: '8px', padding: '12px 24px', borderBottom: '1px solid var(--bdr)', backgroundColor: 'var(--surf)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const }}>Rank</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const }}>District</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, textAlign: 'right' }}>Win Rate</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, textAlign: 'right' }}>Settlement</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, textAlign: 'right' }}>Duration</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, textAlign: 'right' }}>Advantage</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, textAlign: 'right' }}>Score</span>
              </div>

              {/* Rows */}
              {displayedVenues.map((v) => (
                <div
                  key={v.state}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 1fr 90px 90px 80px 80px 70px',
                    gap: '8px',
                    padding: '16px 24px',
                    borderBottom: '1px solid var(--bdr)',
                    alignItems: 'center',
                    backgroundColor: v.rank <= 3 ? 'var(--surf)' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, color: v.rank <= 3 ? 'var(--text1)' : 'var(--text2)' }}>
                    {v.rank <= 3 ? medals[v.rank - 1] : `#${v.rank}`}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: v.rank <= 3 ? 700 : 500, color: 'var(--text1)' }}>
                    {v.stateLabel}
                  </span>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: v.winRate >= data.nationalStats.winRate ? 'var(--data-positive)' : 'var(--link)', textAlign: 'right' }}>
                    {v.winRate}%
                  </span>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text1)', textAlign: 'right' }}>
                    {v.settlementRate}%
                  </span>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text1)', textAlign: 'right' }}>
                    {v.medianDurationMonths}mo
                  </span>
                  <span className="font-mono" style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'right',
                    color: v.advantage > 0 ? 'var(--data-positive)' : v.advantage < 0 ? 'var(--link)' : 'var(--text2, #525252)',
                  }}>
                    {v.advantage > 0 ? '+' : ''}{v.advantage}%
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '32px', height: '6px', background: 'var(--bdr)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${v.score}%`, background: v.score >= 70 ? 'var(--data-positive)' : v.score >= 50 ? 'var(--wrn-txt)' : 'var(--link)', borderRadius: '3px' }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)' }}>{v.score}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show more */}
              {data.venues.length > 15 && !showAll && (
                <div style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <button
                    onClick={() => setShowAll(true)}
                    style={{ padding: '8px 24px', border: '1px solid rgba(232,23,31,0.30)', borderRadius: '2px', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', background: 'rgba(10, 102, 194, 0.08)', color: 'var(--link)', transition: 'all 200ms' }}
                  >
                    Show all {data.venues.length} districts
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '24px', padding: '16px 16px', backgroundColor: 'rgba(122,88,0,0.08)', border: '1px solid var(--bdr)', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', color: 'var(--wrn-txt)', margin: 0, lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> {data.disclaimer}
              </p>
            </div>
          </>
        )}

        {/* Empty state */}
        {!selectedNos && !loading && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '64px 32px', textAlign: 'center', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', margin: '0 0 12px' }}>
              Find Your Optimal Venue
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
              Select a case type above to see all federal districts ranked by win rate, settlement likelihood, and case speed. Uses real data from 5.1M+ federal cases.
            </p>
          </div>
        )}

        {/* Related Tools */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { name: 'Judge Intelligence', href: '/attorney/judge-intelligence', desc: 'Research federal judges\' ruling patterns' },
              { name: 'Case Predictor', href: '/attorney/case-predictor', desc: 'Predict case outcomes with AI analytics' },
              { name: 'State Survey', href: '/attorney/state-survey', desc: 'State-by-state legal survey analysis' },
              { name: 'Court Rules', href: '/attorney/court-rules', desc: 'Federal and state court rules and procedures' },
            ].map(tool => (
              <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 200ms' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
