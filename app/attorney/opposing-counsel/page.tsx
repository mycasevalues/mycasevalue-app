'use client';

import { useState } from 'react';
import Link from 'next/link';

type CounselProfile = {
  name: string;
  firm: string;
  city: string;
  firmSize: string;
  barAdmission: number;
  yearsExperience: number;
  practiceAreas: string[];
  federalCases: number;
  winRate: number;
  settlementRate: number;
  avgDurationMonths: number;
  settlementPatterns: { early: number; mid: number; late: number };
  motionPractice: { avgMotionsPerCase: number; motionSuccessRate: number };
  tendencies: string[];
  recentActivity: { casesLastYear: number; avgSettlementLast12mo: string };
};

type SearchResult = {
  query: string;
  resultCount: number;
  profiles: CounselProfile[];
  disclaimer: string;
};

const MeterBar = ({ value, max, color, label }: { value: number; max: number; color: string; label: string }) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '12px', color: '#6B7280' }}>{label}</span>
      <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#111111' }}>{value}%</span>
    </div>
    <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${(value / max) * 100}%`, background: color, borderRadius: '3px', transition: 'width 0.5s ease' }} />
    </div>
  </div>
);

export default function OpposingCounselPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || query.trim().length < 2) {
      setError('Enter at least 2 characters');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    setExpandedIndex(null);
    try {
      const res = await fetch(`/api/attorney/opposing-counsel?q=${encodeURIComponent(query.trim())}`);
      if (!res.ok) {
        const e = await res.json();
        setError(e.error || 'Search failed');
      } else {
        setResult(await res.json());
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '32px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#8B5CF6', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Attorney Mode
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#111111', margin: 0 }}>Opposing Counsel Analysis</h1>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>Research opposing counsel track record, strategies, and settlement patterns</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Search */}
        <form onSubmit={handleSearch} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by attorney name or firm (e.g. Smith, Johnson, Williams)..."
                style={{ width: '100%', padding: '12px 12px 12px 42px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', color: '#111111', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)' }}
              />
            </div>
            <button type="submit" disabled={loading} style={{ padding: '12px 24px', backgroundColor: '#8B5CF6', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', color: '#991B1B', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
              {result.resultCount} result{result.resultCount !== 1 ? 's' : ''} for &quot;{result.query}&quot;
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {result.profiles.map((p, i) => {
                const isExpanded = expandedIndex === i;
                return (
                  <div key={i} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: isExpanded ? '2px solid #8B5CF6' : '1px solid #E5E7EB', overflow: 'hidden', boxShadow: isExpanded ? '0 4px 16px rgba(139,92,246,0.1)' : '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <button onClick={() => setExpandedIndex(isExpanded ? null : i)} style={{ width: '100%', padding: '20px 24px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 className="font-display" style={{ fontSize: '17px', fontWeight: 700, color: '#111111', margin: '0 0 4px' }}>{p.name}</h3>
                          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{p.firm} · {p.city}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: p.winRate >= 50 ? '#DC2626' : '#16A34A' }}>{p.winRate}%</div>
                            <div style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase' as const }}>Defense Win</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div className="font-mono" style={{ fontSize: '20px', fontWeight: 700, color: '#0D9488' }}>{p.settlementRate}%</div>
                            <div style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase' as const }}>Settlement</div>
                          </div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div style={{ padding: '0 24px 24px', borderTop: '1px solid #F3F4F6' }}>
                        <div style={{ paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                          {/* Left Column */}
                          <div>
                            <h4 className="font-display" style={{ fontSize: '13px', fontWeight: 700, color: '#111111', margin: '0 0 14px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>Litigation Profile</h4>
                            <MeterBar value={p.winRate} max={100} color="#DC2626" label="Defense Win Rate" />
                            <MeterBar value={p.settlementRate} max={100} color="#0D9488" label="Settlement Rate" />
                            <MeterBar value={p.motionPractice.motionSuccessRate} max={100} color="#2563EB" label="Motion Success Rate" />

                            <h4 className="font-display" style={{ fontSize: '13px', fontWeight: 700, color: '#111111', margin: '20px 0 14px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>Settlement Timing</h4>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {[
                                { label: 'Early', value: p.settlementPatterns.early, color: '#16A34A' },
                                { label: 'Mid', value: p.settlementPatterns.mid, color: '#D97706' },
                                { label: 'Late', value: p.settlementPatterns.late, color: '#DC2626' },
                              ].map((s) => (
                                <div key={s.label} style={{ flex: s.value, padding: '8px', borderRadius: '4px', backgroundColor: `${s.color}15`, textAlign: 'center' }}>
                                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: s.color }}>{s.value}%</div>
                                  <div style={{ fontSize: '10px', color: '#6B7280' }}>{s.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column */}
                          <div>
                            <h4 className="font-display" style={{ fontSize: '13px', fontWeight: 700, color: '#111111', margin: '0 0 14px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>Profile</h4>
                            {[
                              { label: 'Firm', value: p.firm },
                              { label: 'Firm Size', value: p.firmSize },
                              { label: 'Bar Admission', value: String(p.barAdmission) },
                              { label: 'Experience', value: `${p.yearsExperience} years` },
                              { label: 'Federal Cases', value: String(p.federalCases) },
                              { label: 'Avg Duration', value: `${p.avgDurationMonths} months` },
                              { label: 'Motions/Case', value: String(p.motionPractice.avgMotionsPerCase) },
                            ].map((item) => (
                              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
                                <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.label}</span>
                                <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#111111' }}>{item.value}</span>
                              </div>
                            ))}

                            <h4 className="font-display" style={{ fontSize: '13px', fontWeight: 700, color: '#111111', margin: '16px 0 10px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>Practice Areas</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {p.practiceAreas.map((pa) => (
                                <span key={pa} style={{ padding: '4px 10px', borderRadius: '4px', backgroundColor: '#F3E8FF', color: '#7C3AED', fontSize: '11px', fontWeight: 600 }}>{pa}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tendencies */}
                        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                          <h4 className="font-display" style={{ fontSize: '13px', fontWeight: 700, color: '#111111', margin: '0 0 12px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>Strategy Tendencies</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {p.tendencies.map((t, ti) => (
                              <div key={ti} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <span style={{ color: '#8B5CF6', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>&#x2022;</span>
                                <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px' }}>
              <p style={{ fontSize: '11px', color: '#92400E', margin: 0, lineHeight: 1.5 }}><strong>Disclaimer:</strong> {result.disclaimer}</p>
            </div>
          </>
        )}

        {/* Empty state */}
        {!result && !loading && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '64px 32px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: '#111111', margin: '0 0 12px' }}>Research Opposing Counsel</h2>
            <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 20px' }}>
              Search by attorney name or firm to view their litigation track record, settlement patterns, and strategy tendencies.
            </p>
            <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Try: Smith, Johnson, Williams, or Jones</p>
          </div>
        )}
      </div>
    </div>
  );
}
