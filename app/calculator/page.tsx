'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../lib/data';

/* ── Multiplier tables ──────────────────────────────────────────────── */
const DAMAGE_MULTIPLIERS: Record<string, { low: number; median: number; high: number }> = {
  work:      { low: 0.20, median: 0.45, high: 0.90 },
  injury:    { low: 0.25, median: 0.50, high: 1.10 },
  consumer:  { low: 0.10, median: 0.30, high: 0.65 },
  rights:    { low: 0.15, median: 0.40, high: 0.85 },
  money:     { low: 0.15, median: 0.35, high: 0.75 },
  housing:   { low: 0.10, median: 0.30, high: 0.60 },
  medical:   { low: 0.15, median: 0.35, high: 0.80 },
  family:    { low: 0.10, median: 0.25, high: 0.55 },
  gov:       { low: 0.10, median: 0.25, high: 0.50 },
  education: { low: 0.10, median: 0.25, high: 0.55 },
};

const WIN_RATES: Record<string, number> = {
  work: 0.31, injury: 0.28, consumer: 0.35, rights: 0.22,
  money: 0.33, housing: 0.26, medical: 0.24, family: 0.30,
  gov: 0.18, education: 0.27,
};

const TIMELINES: Record<string, string> = {
  work: '10–18 months', injury: '14–26 months', consumer: '8–14 months', rights: '12–22 months',
  money: '10–20 months', housing: '8–16 months', medical: '16–30 months', family: '6–14 months',
  gov: '12–24 months', education: '10–18 months',
};

const ATTORNEY_BOOST = 1.23;

/* ── Helpers ─────────────────────────────────────────────────────────── */
function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

interface Results {
  low: number;
  median: number;
  high: number;
  winRate: number;
  timeline: string;
  caseLabel: string;
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function CalculatorPage() {
  const [caseType, setCaseType] = useState('');
  const [district, setDistrict] = useState('');
  const [damages, setDamages] = useState('');
  const [represented, setRepresented] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const stateOptions = STATES.filter(s => s.id !== '');
  const canCalculate = caseType !== '' && damages !== '' && Number(damages.replace(/[^0-9.]/g, '')) > 0;

  function calculate() {
    const raw = Number(damages.replace(/[^0-9.]/g, ''));
    if (!caseType || !raw || raw <= 0) return;

    const mult = DAMAGE_MULTIPLIERS[caseType] ?? { low: 0.15, median: 0.35, high: 0.75 };
    const boost = represented === 'yes' ? ATTORNEY_BOOST : 1;

    setResults({
      low: raw * mult.low * boost,
      median: raw * mult.median * boost,
      high: raw * mult.high * boost,
      winRate: WIN_RATES[caseType] ?? 0.25,
      timeline: TIMELINES[caseType] ?? '10–20 months',
      caseLabel: SITS.find(s => s.id === caseType)?.label ?? caseType,
    });
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'var(--accent-primary-subtle)', color: 'var(--fg-primary)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            CALCULATOR
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)' }}>
            Settlement Calculator
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
            Estimate your settlement range based on federal court outcomes, your district, and case type. Our calculator uses data from 5.1M+ real federal cases to provide realistic estimates.
          </p>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form
          className="p-8 rounded-xl border"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}
          onSubmit={(e) => { e.preventDefault(); calculate(); }}
        >
          <div className="space-y-6">
            {/* Case Type */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Case Type
              </label>
              <select
                value={caseType}
                onChange={(e) => { setCaseType(e.target.value); setResults(null); }}
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none"
                style={{
                  borderColor: 'var(--border-default)',
                  background: 'var(--bg-surface)',
                  color: caseType ? 'var(--fg-primary)' : 'var(--fg-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">Select a case type...</option>
                {SITS.map(sit => (
                  <option key={sit.id} value={sit.id}>
                    {sit.label} — {sit.sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Federal District */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Federal District
              </label>
              <select
                value={district}
                onChange={(e) => { setDistrict(e.target.value); setResults(null); }}
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none"
                style={{
                  borderColor: 'var(--border-default)',
                  background: 'var(--bg-surface)',
                  color: district ? 'var(--fg-primary)' : 'var(--fg-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">Select your district (optional)...</option>
                {stateOptions.map(state => (
                  <option key={state.id} value={state.id}>
                    {state.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] mt-2" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
                District selection helps contextualize results but does not change the estimate.
              </p>
            </div>

            {/* Estimated Damages */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Estimated Damages ($)
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 50000"
                value={damages}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  setDamages(val);
                  setResults(null);
                }}
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none"
                style={{
                  borderColor: 'var(--border-default)',
                  background: 'var(--bg-surface)',
                  color: 'var(--fg-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <p className="text-[11px] mt-2" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
                Total economic and non-economic losses you believe you incurred.
              </p>
            </div>

            {/* Represented by Attorney */}
            <div>
              <label className="block text-xs font-semibold mb-3 uppercase tracking-[0.8px]" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Represented by Attorney?
              </label>
              <select
                value={represented}
                onChange={(e) => { setRepresented(e.target.value); setResults(null); }}
                className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none"
                style={{
                  borderColor: 'var(--border-default)',
                  background: 'var(--bg-surface)',
                  color: represented ? 'var(--fg-primary)' : 'var(--fg-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">Select...</option>
                <option value="yes">Yes — I have an attorney</option>
                <option value="no">No — self-represented (pro se)</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
                Represented plaintiffs statistically achieve higher settlements.
              </p>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-default)' }}>
            <button
              type="submit"
              disabled={!canCalculate}
              className="w-full px-6 py-3 rounded-lg text-sm font-semibold transition-all text-white"
              style={{
                background: canCalculate ? 'var(--accent-primary)' : 'var(--border-default)',
                color: canCalculate ? '#FFFFFF' : 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
                cursor: canCalculate ? 'pointer' : 'not-allowed',
                opacity: canCalculate ? 1 : 0.7,
              }}
            >
              Calculate Settlement Range
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-2" style={{ marginBottom: '2px' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </form>

        {/* ── Results ─────────────────────────────────────────────────── */}
        {results && (
          <div className="mt-8 p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-1" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-display)' }}>
              Estimated Settlement Range
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-body)' }}>
              {results.caseLabel} case · {damages ? `$${Number(damages).toLocaleString()}` : ''} in claimed damages
              {represented === 'yes' ? ' · Attorney represented' : ''}
            </p>

            {/* 3-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Conservative */}
              <div className="rounded-lg p-5 text-center" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-default)' }}>
                <p className="text-[10px] font-bold uppercase tracking-[1px] mb-2" style={{ color: '#DC2626' }}>
                  Conservative
                </p>
                <p className="text-2xl font-black" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>
                  {fmt(results.low)}
                </p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--fg-muted)' }}>P25 estimate</p>
              </div>
              {/* Median */}
              <div className="rounded-lg p-5 text-center" style={{ background: 'rgba(129,140,248,0.06)', border: '2px solid #818CF8' }}>
                <p className="text-[10px] font-bold uppercase tracking-[1px] mb-2" style={{ color: '#818CF8' }}>
                  Median
                </p>
                <p className="text-2xl font-black" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>
                  {fmt(results.median)}
                </p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--fg-muted)' }}>P50 estimate</p>
              </div>
              {/* Favorable */}
              <div className="rounded-lg p-5 text-center" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-default)' }}>
                <p className="text-[10px] font-bold uppercase tracking-[1px] mb-2" style={{ color: '#10B981' }}>
                  Favorable
                </p>
                <p className="text-2xl font-black" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>
                  {fmt(results.high)}
                </p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--fg-muted)' }}>P75 estimate</p>
              </div>
            </div>

            {/* Win Rate & Timeline */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg p-4" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-default)' }}>
                <p className="text-[10px] font-bold uppercase tracking-[1px] mb-1" style={{ color: 'var(--fg-muted)' }}>
                  Plaintiff Win Rate
                </p>
                <p className="text-lg font-black" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                  {(results.winRate * 100).toFixed(0)}%
                </p>
              </div>
              <div className="rounded-lg p-4" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-default)' }}>
                <p className="text-[10px] font-bold uppercase tracking-[1px] mb-1" style={{ color: 'var(--fg-muted)' }}>
                  Typical Timeline
                </p>
                <p className="text-lg font-black" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                  {results.timeline}
                </p>
              </div>
            </div>

            {/* Results disclaimer */}
            <p className="text-[11px] leading-relaxed p-3 rounded-lg" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', background: 'var(--bg-base)' }}>
              These estimates are based on aggregate federal court settlement data and statistical modeling. Your actual outcome may differ significantly based on evidence, jurisdiction-specific factors, and representation quality. This is not legal advice.
            </p>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="mt-8 p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-3" style={{ color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
            Important Disclaimer
          </h2>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
            The Settlement Calculator provides estimates based on historical aggregate data from federal court records. These are statistical approximations and not predictions. Actual settlement amounts vary significantly based on case facts, legal representation, evidence quality, and many other factors. This calculator is not legal advice. Do not rely on these estimates as a substitute for consulting with a qualified attorney. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>


    </div>
  );
}
