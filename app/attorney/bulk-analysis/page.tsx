'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';

type CaseResult = {
  nos: string;
  label: string;
  category: string;
  totalCases: number;
  winRate: number;
  settlementRate: number;
  medianDurationMonths: number;
  settlementRange: { lo: number; md: number; hi: number };
  representedWinRate: number;
  proSeWinRate: number;
  dismissalRate: number;
  trialRate: number;
  risk: 'low' | 'moderate' | 'high' | 'very-high';
  classActionPct: number;
  statuteOfLimitations: string;
  attorneyFeeRange: string;
};

type PortfolioResult = {
  portfolio: {
    caseCount: number;
    totalCasesInDatabase: number;
    avgWinRate: number;
    avgSettlementRate: number;
    avgDurationMonths: number;
    riskDistribution: Record<string, number>;
  };
  cases: CaseResult[];
  insights: string[];
  disclaimer: string;
};

const riskColors: Record<string, { bg: string; text: string; label: string }> = {
  low: { bg: 'rgba(7,202,107,0.12)', text: '#059669', label: 'Low Risk' },
  moderate: { bg: 'rgba(232,149,88,0.12)', text: '#E89558', label: 'Moderate' },
  high: { bg: 'rgba(10, 102, 194, 0.12)', text: '#0A66C2', label: 'High Risk' },
  'very-high': { bg: 'rgba(10, 102, 194, 0.12)', text: '#0A66C2', label: 'Very High' },
};

// Flatten all case options across categories
const allOptions = SITS.flatMap((cat) =>
  cat.opts.map((opt) => ({ nos: opt.nos, label: opt.label, category: cat.label }))
);
// Deduplicate by NOS code
const uniqueOptions = Array.from(new Map(allOptions.map((o) => [o.nos, o])).values());

export default function BulkAnalysisPage() {
  const [selectedNos, setSelectedNos] = useState<string[]>([]);
  const [addValue, setAddValue] = useState('');
  const [result, setResult] = useState<PortfolioResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function addCase() {
    if (addValue && !selectedNos.includes(addValue) && selectedNos.length < 20) {
      setSelectedNos([...selectedNos, addValue]);
      setAddValue('');
    }
  }

  function removeCase(nos: string) {
    setSelectedNos(selectedNos.filter((n) => n !== nos));
  }

  async function analyze() {
    if (selectedNos.length === 0) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/attorney/bulk-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nosCodes: selectedNos }),
      });
      if (!res.ok) {
        const e = await res.json();
        setError(e.error || 'Analysis failed');
      } else {
        setResult(await res.json());
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  }

  const p = result?.portfolio;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      <style>{`
        input:focus, select:focus { border-color: #0A66C2 !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>
      {/* Header */}
      <div style={{ background: '#1B3A5C', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link href="/" style={{ fontSize: '13px', color: '#0A66C2', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Home &gt; Attorney Tools &gt; Bulk Analysis
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(232,23,31,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2">
                <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>Bulk Case Analysis</h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: '4px 0 0 0' }}>Analyze portfolios of case types for risk clustering and outcome trends</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Case Selector */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px' }}>Build Your Portfolio</h2>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <select value={addValue} onChange={(e) => setAddValue(e.target.value)} style={{ flex: 1, padding: '12px 12px', height: '48px', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', color: '#0f0f0f', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)' }}>
              <option value="">Add a case type...</option>
              {uniqueOptions.filter((o) => !selectedNos.includes(o.nos)).map((o) => (
                <option key={o.nos + o.label} value={o.nos}>{o.label} ({o.category})</option>
              ))}
            </select>
            <button onClick={addCase} disabled={!addValue} style={{ padding: '0 24px', height: '48px', backgroundColor: addValue ? '#0A66C2' : '#E5E7EB', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: addValue ? 'pointer' : 'not-allowed', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Add
            </button>
          </div>

          {/* Selected cases */}
          {selectedNos.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {selectedNos.map((nos) => {
                const opt = uniqueOptions.find((o) => o.nos === nos);
                return (
                  <span key={nos} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#F7F8FA', borderRadius: '12px', fontSize: '13px', color: '#0f0f0f', fontWeight: 500 }}>
                    {opt?.label || `NOS ${nos}`}
                    <button onClick={() => removeCase(nos)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0A66C2', fontSize: '16px', lineHeight: 1, padding: 0 }}>&times;</button>
                  </span>
                );
              })}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#4B5563' }}>{selectedNos.length} of 20 case types selected</span>
            <button onClick={analyze} disabled={loading || selectedNos.length === 0} style={{ padding: '0 28px', height: '48px', backgroundColor: loading || selectedNos.length === 0 ? '#E5E7EB' : '#0A66C2', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-display)', cursor: loading || selectedNos.length === 0 ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {loading ? 'Analyzing...' : 'Analyze Portfolio'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '14px 18px', borderRadius: '12px', backgroundColor: 'rgba(10, 102, 194, 0.12)', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', color: '#0A66C2', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Results */}
        {p && result && (
          <>
            {/* Portfolio Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Case Types', value: String(p.caseCount), color: '#0f0f0f' },
                { label: 'Avg Win Rate', value: `${p.avgWinRate}%`, color: p.avgWinRate >= 55 ? '#059669' : p.avgWinRate >= 40 ? '#E89558' : '#0A66C2' },
                { label: 'Avg Settlement', value: `${p.avgSettlementRate}%`, color: '#059669' },
                { label: 'Avg Duration', value: `${p.avgDurationMonths}mo`, color: '#0f0f0f' },
                { label: 'Total in DB', value: p.totalCasesInDatabase.toLocaleString(), color: '#0f0f0f' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>{s.label}</p>
                  <p className="font-mono" style={{ fontSize: '24px', fontWeight: 600, color: s.color, margin: 0 }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Risk Distribution */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px' }}>Risk Distribution</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {Object.entries(p.riskDistribution).filter(([, count]) => count > 0).map(([level, count]) => {
                  const rc = riskColors[level] || riskColors.moderate;
                  return (
                    <div key={level} style={{ flex: '1 1 120px', padding: '16px', borderRadius: '12px', backgroundColor: rc.bg, textAlign: 'center' }}>
                      <p className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: rc.text, margin: 0 }}>{count}</p>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: rc.text, margin: '4px 0 0' }}>{rc.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px' }}>Portfolio Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.insights.map((ins, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                    <span style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.5 }}>{ins}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case-by-Case Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>Case-by-Case Breakdown</h3>
              </div>
              {result.cases.map((c, i) => {
                const rc = riskColors[c.risk] || riskColors.moderate;
                return (
                  <div key={c.nos} style={{ padding: '16px 24px', borderBottom: i < result.cases.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f' }}>{c.label}</span>
                        <span style={{ fontSize: '12px', color: '#4B5563', marginLeft: '8px' }}>NOS {c.nos} · {c.totalCases.toLocaleString()} cases</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '12px', backgroundColor: rc.bg, color: rc.text }}>{rc.label}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
                      {[
                        { label: 'Win Rate', value: `${c.winRate}%`, color: c.winRate >= 55 ? '#059669' : '#E89558' },
                        { label: 'Settlement', value: `${c.settlementRate}%`, color: '#059669' },
                        { label: 'Duration', value: `${c.medianDurationMonths}mo`, color: '#0f0f0f' },
                        { label: 'Dismissal', value: `${c.dismissalRate}%`, color: '#0A66C2' },
                        { label: 'With Attorney', value: `${c.representedWinRate}%`, color: '#059669' },
                        { label: 'Pro Se', value: `${Math.round(c.proSeWinRate)}%`, color: '#0A66C2' },
                      ].map((s) => (
                        <div key={s.label} style={{ padding: '8px', background: '#F7F8FA', borderRadius: '12px' }}>
                          <p style={{ fontSize: '10px', color: '#4B5563', margin: '0 0 2px', textTransform: 'uppercase' as const }}>{s.label}</p>
                          <p className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: s.color, margin: 0 }}>{s.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div style={{ padding: '14px 18px', backgroundColor: 'rgba(232,149,88,0.12)', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <p style={{ fontSize: '11px', color: '#E89558', margin: 0, lineHeight: 1.5 }}><strong>Disclaimer:</strong> {result.disclaimer}</p>
            </div>
          </>
        )}

        {/* Empty state */}
        {!result && !loading && selectedNos.length === 0 && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '64px 32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>Build a Case Portfolio</h2>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
              Select multiple case types above to analyze them together. Get risk clustering, outcome trends, and portfolio-level insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
