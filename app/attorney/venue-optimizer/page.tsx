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
      border-color: #0A66C2;
      box-shadow: 0 0 0 2px rgba(232, 23, 31, 0.08);
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
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      <style>{focusStyle}
        {`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
        `}
      </style>
      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link href="/" style={{ fontSize: '13px', color: '#0A66C2', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Home &gt; Attorney Tools &gt; Venue Optimizer
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                Venue Optimizer
              </h1>
              <p style={{ fontSize: '14px', color: '#B0B5BA', margin: '4px 0 0 0' }}>
                Find the optimal filing district based on case type, win rates, and settlement data
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Controls */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 300px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Case Type
              </label>
              <select
                value={selectedNos}
                onChange={(e) => setSelectedNos(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', height: '48px', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', color: '#0f0f0f', background: '#FFFFFF', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Prioritize
              </label>
              <div style={{ display: 'flex', gap: '4px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '3px' }}>
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
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      backgroundColor: prioritize === opt.key ? '#0A66C2' : 'transparent',
                      color: prioritize === opt.key ? '#FFFFFF' : '#4B5563',
                      transition: 'all 0.2s',
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
            <div style={{ width: 36, height: 36, border: '3px solid #E5E7EB', borderTopColor: '#0A66C2', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 16px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '14px', color: '#4B5563' }}>Analyzing venues...</p>
          </div>
        )}

        {/* National stats */}
        {data && !loading && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>National Win Rate</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>{data.nationalStats.winRate}%</p>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>Settlement Rate</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: '#1B7C7D', margin: 0 }}>{data.nationalStats.settlementRate}%</p>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>Median Duration</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: '#0A66C2', margin: 0 }}>{data.nationalStats.medianDurationMonths}mo</p>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>Total Cases</p>
                <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>{data.nationalStats.totalCases.toLocaleString()}</p>
              </div>
            </div>

            {/* Venue Rankings Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB' }}>
                <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                  Venue Rankings — {data.caseType}
                </h2>
                <p style={{ fontSize: '13px', color: '#4B5563', margin: '4px 0 0' }}>
                  {data.venues.length} districts ranked by {prioritize === 'winRate' ? 'plaintiff win rate' : prioritize === 'settlement' ? 'settlement likelihood' : 'case speed'}
                </p>
              </div>

              {/* Table Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 90px 90px 80px 80px 70px', gap: '8px', padding: '12px 24px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F8F9FA' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const }}>Rank</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const }}>District</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, textAlign: 'right' }}>Win Rate</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, textAlign: 'right' }}>Settlement</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, textAlign: 'right' }}>Duration</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, textAlign: 'right' }}>Advantage</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, textAlign: 'right' }}>Score</span>
              </div>

              {/* Rows */}
              {displayedVenues.map((v) => (
                <div
                  key={v.state}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 1fr 90px 90px 80px 80px 70px',
                    gap: '8px',
                    padding: '14px 24px',
                    borderBottom: '1px solid #E5E7EB',
                    alignItems: 'center',
                    backgroundColor: v.rank <= 3 ? '#FAFBFC' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, color: v.rank <= 3 ? '#0f0f0f' : '#4B5563' }}>
                    {v.rank <= 3 ? medals[v.rank - 1] : `#${v.rank}`}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: v.rank <= 3 ? 700 : 500, color: '#0f0f0f' }}>
                    {v.stateLabel}
                  </span>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: v.winRate >= data.nationalStats.winRate ? '#059669' : '#0A66C2', textAlign: 'right' }}>
                    {v.winRate}%
                  </span>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 500, color: '#0f0f0f', textAlign: 'right' }}>
                    {v.settlementRate}%
                  </span>
                  <span className="font-mono" style={{ fontSize: '14px', fontWeight: 500, color: '#0f0f0f', textAlign: 'right' }}>
                    {v.medianDurationMonths}mo
                  </span>
                  <span className="font-mono" style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'right',
                    color: v.advantage > 0 ? '#059669' : v.advantage < 0 ? '#0A66C2' : '#4B5563',
                  }}>
                    {v.advantage > 0 ? '+' : ''}{v.advantage}%
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '32px', height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${v.score}%`, background: v.score >= 70 ? '#059669' : v.score >= 50 ? '#E89558' : '#0A66C2', borderRadius: '3px' }} />
                      </div>
                      <span className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f' }}>{v.score}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show more */}
              {data.venues.length > 15 && !showAll && (
                <div style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <button
                    onClick={() => setShowAll(true)}
                    style={{ padding: '8px 20px', border: '1px solid rgba(232,23,31,0.30)', borderRadius: '12px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer', background: 'rgba(10, 102, 194, 0.08)', color: '#0A66C2', transition: 'all 0.2s' }}
                  >
                    Show all {data.venues.length} districts
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: 'rgba(232,149,88,0.12)', border: '1px solid rgba(232,149,88,0.30)', borderRadius: '12px' }}>
              <p style={{ fontSize: '11px', color: '#E89558', margin: 0, lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> {data.disclaimer}
              </p>
            </div>
          </>
        )}

        {/* Empty state */}
        {!selectedNos && !loading && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '64px 32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>
              Find Your Optimal Venue
            </h2>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
              Select a case type above to see all federal districts ranked by win rate, settlement likelihood, and case speed. Uses real data from 4.1M+ federal cases.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
