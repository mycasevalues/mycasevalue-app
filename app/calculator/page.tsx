'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITS, STATES } from '../../lib/data';
import { SITE_URL } from '../../lib/site-config';

// Note: Metadata cannot be exported from client components.
// For this page to have SEO metadata, wrap it with server-side metadata in layout.tsx or create a separate server component.
// Metadata content for this page:
// title: "Settlement Calculator — Estimate Case Value"
// description: "Use our free federal court settlement calculator to estimate your case value based on federal judicial data, case type, and district. Get instant estimates."

const slideUpFadeIn = `
  @keyframes slideUpFadeIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const selectStyles = `
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23212529' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 20px;
    padding-right: 40px !important;
  }
`;

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
const SEVERITY_MULT: Record<string, number> = {
  minor: 0.6,
  moderate: 1.0,
  severe: 1.5,
  catastrophic: 2.2,
};
const DURATION_MULT: Record<string, number> = {
  under6: 0.8,
  '6to12': 1.0,
  '1to3yr': 1.3,
  over3yr: 1.6,
  permanent: 2.0,
};

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
  breakdown: {
    baseDamages: number;
    severityMult: number;
    durationMult: number;
    attorneyMult: number;
    categoryMult: { low: number; median: number; high: number };
  };
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function CalculatorPage() {
  const [caseType, setCaseType] = useState('');
  const [district, setDistrict] = useState('');
  const [damages, setDamages] = useState('');
  const [represented, setRepresented] = useState('');
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  function resetForm() {
    setCaseType('');
    setDistrict('');
    setDamages('');
    setRepresented('');
    setSeverity('');
    setDuration('');
    setResults(null);
  }

  const stateOptions = STATES.filter(s => s.id !== '');
  const canCalculate = caseType !== '' && damages !== '' && Number(damages.replace(/[^0-9.]/g, '')) > 0;

  function calculate() {
    const raw = Number(damages.replace(/[^0-9.]/g, ''));
    if (!caseType || !raw || raw <= 0) return;

    const catMult = DAMAGE_MULTIPLIERS[caseType] ?? { low: 0.15, median: 0.35, high: 0.75 };
    const attMult = represented === 'yes' ? ATTORNEY_BOOST : 1;
    const sevMult = severity ? (SEVERITY_MULT[severity] ?? 1) : 1;
    const durMult = duration ? (DURATION_MULT[duration] ?? 1) : 1;

    const combined = attMult * sevMult * durMult;

    setResults({
      low: raw * catMult.low * combined,
      median: raw * catMult.median * combined,
      high: raw * catMult.high * combined,
      winRate: WIN_RATES[caseType] ?? 0.25,
      timeline: TIMELINES[caseType] ?? '10–20 months',
      caseLabel: SITS.find(s => s.id === caseType)?.label ?? caseType,
      breakdown: {
        baseDamages: raw,
        severityMult: sevMult,
        durationMult: durMult,
        attorneyMult: attMult,
        categoryMult: catMult,
      },
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Case Value Calculator',
    url: `${SITE_URL}/calculator`,
    applicationCategory: 'Legal',
    description: 'Estimate your case value with damage multipliers based on federal court data.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '0',
      description: 'Free settlement calculator tool',
    },
  };

  return (
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      <style>{slideUpFadeIn}</style>
      <style>{selectStyles}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="border-b px-6 py-3" style={{ borderColor: '#D5D8DC', background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: '#006997', textDecoration: 'none' }} className="hover:underline">
              Home
            </Link>
            <span style={{ color: '#D5D8DC' }}>›</span>
            <span style={{ color: '#212529', fontWeight: 600 }}>Case Calculator</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b" style={{ borderColor: '#D5D8DC', background: '#00172E', padding: '64px 24px' }}>
        <div className="max-w-3xl mx-auto">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '2px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', background: 'rgba(255,255,255,0.1)', color: '#E8171F' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            CALCULATOR
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: '#FFFFFF', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)' }}>
            Settlement Calculator
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
            Estimate your settlement range based on federal court outcomes, your district, and case type. Our calculator uses data from 5.1M+ real federal cases to provide realistic estimates.
          </p>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form
          className="border"
          style={{
            borderColor: '#D5D8DC',
            background: '#FFFFFF',
            padding: '32px',
            borderRadius: '2px',
          }}
          onSubmit={(e) => { e.preventDefault(); calculate(); }}
        >
          <div className="space-y-6">
            {/* Case Type */}
            <div>
              <label htmlFor="calc-case-type" className="block mb-3" style={{ color: '#212529', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Case Type
              </label>
              <select
                id="calc-case-type"
                value={caseType}
                onChange={(e) => { setCaseType(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px',
                  borderRadius: '2px',
                  borderColor: caseType === '' ? '#D5D8DC' : '#E8171F',
                  background: '#FAFBFC',
                  color: caseType ? '#212529' : '#455A64',
                  fontFamily: 'var(--font-body)',
                  borderWidth: '1px',
                  fontSize: '14px',
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
              <label htmlFor="calc-district" className="block mb-3" style={{ color: '#212529', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Federal District
              </label>
              <select
                id="calc-district"
                value={district}
                onChange={(e) => { setDistrict(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px',
                  borderRadius: '2px',
                  borderColor: district === '' ? '#D5D8DC' : '#E8171F',
                  background: '#FAFBFC',
                  color: district ? '#212529' : '#455A64',
                  fontFamily: 'var(--font-body)',
                  borderWidth: '1px',
                  fontSize: '14px',
                }}
              >
                <option value="">Select your district (optional)...</option>
                {stateOptions.map(state => (
                  <option key={state.id} value={state.id}>
                    {state.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] mt-2" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                District selection helps contextualize results but does not change the estimate.
              </p>
            </div>

            {/* Estimated Damages */}
            <div>
              <label htmlFor="calc-damages" className="block mb-3" style={{ color: '#212529', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Estimated Damages ($)
              </label>
              <input
                id="calc-damages"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 50000"
                value={damages}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  setDamages(val);
                  setResults(null);
                }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px',
                  borderRadius: '2px',
                  borderColor: damages === '' ? '#D5D8DC' : '#E8171F',
                  background: '#FAFBFC',
                  color: '#212529',
                  fontFamily: 'var(--font-body)',
                  borderWidth: '1px',
                  fontSize: '14px',
                }}
              />
              <p className="text-[11px] mt-2" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                Total economic and non-economic losses you believe you incurred.
              </p>
            </div>

            {/* Represented by Attorney */}
            <div>
              <label htmlFor="calc-represented" className="block mb-3" style={{ color: '#212529', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Represented by Attorney?
              </label>
              <select
                id="calc-represented"
                value={represented}
                onChange={(e) => { setRepresented(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px',
                  borderRadius: '2px',
                  borderColor: represented === '' ? '#D5D8DC' : '#E8171F',
                  background: '#FAFBFC',
                  color: represented ? '#212529' : '#455A64',
                  fontFamily: 'var(--font-body)',
                  borderWidth: '1px',
                  fontSize: '14px',
                }}
              >
                <option value="">Select...</option>
                <option value="yes">Yes — I have an attorney</option>
                <option value="no">No — self-represented (pro se)</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                Represented plaintiffs statistically achieve higher settlements.
              </p>
            </div>

            {/* Severity */}
            <div>
              <label htmlFor="calc-severity" className="block mb-3" style={{ color: '#212529', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Injury / Harm Severity (optional)
              </label>
              <select
                id="calc-severity"
                value={severity}
                onChange={(e) => { setSeverity(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px', borderRadius: '2px',
                  borderColor: severity === '' ? '#D5D8DC' : '#E8171F',
                  background: '#FAFBFC', color: severity ? '#212529' : '#455A64',
                  fontFamily: 'var(--font-body)', borderWidth: '1px', fontSize: '14px',
                }}
              >
                <option value="">Select severity...</option>
                <option value="minor">Minor — temporary, minimal impact</option>
                <option value="moderate">Moderate — significant but recoverable</option>
                <option value="severe">Severe — lasting impact, major disruption</option>
                <option value="catastrophic">Catastrophic — permanent disability or loss</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                Higher severity correlates with larger damages awards.
              </p>
            </div>

            {/* Duration of Impact */}
            <div>
              <label htmlFor="calc-duration" className="block mb-3" style={{ color: '#212529', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Duration of Impact (optional)
              </label>
              <select
                id="calc-duration"
                value={duration}
                onChange={(e) => { setDuration(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px', borderRadius: '2px',
                  borderColor: duration === '' ? '#D5D8DC' : '#E8171F',
                  background: '#FAFBFC', color: duration ? '#212529' : '#455A64',
                  fontFamily: 'var(--font-body)', borderWidth: '1px', fontSize: '14px',
                }}
              >
                <option value="">Select duration...</option>
                <option value="under6">Under 6 months</option>
                <option value="6to12">6–12 months</option>
                <option value="1to3yr">1–3 years</option>
                <option value="over3yr">Over 3 years</option>
                <option value="permanent">Permanent / ongoing</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                Longer-lasting impacts generally result in higher settlement values.
              </p>
            </div>
          </div>

          {/* Calculate & Reset Buttons */}
          <div className="mt-8 pt-6 border-t flex gap-4" style={{ borderColor: '#D5D8DC' }}>
            <button
              type="submit"
              disabled={!canCalculate}
              className="flex-1 px-6 text-white font-bold transition-all"
              style={{
                height: '48px',
                background: canCalculate ? '#E8171F' : '#D5D8DC',
                color: canCalculate ? '#FFFFFF' : '#455A64',
                fontFamily: 'var(--font-display)',
                cursor: canCalculate ? 'pointer' : 'not-allowed',
                opacity: canCalculate ? 1 : 0.7,
                textTransform: 'uppercase',
                borderRadius: '2px',
                fontSize: '14px',
                letterSpacing: '0.5px',
              }}
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 px-6 font-bold transition-all border"
              style={{
                height: '48px',
                background: '#FFFFFF',
                color: '#212529',
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
                borderColor: '#D5D8DC',
                borderRadius: '2px',
                fontSize: '14px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Reset
            </button>
          </div>
        </form>

        {/* ── Results ─────────────────────────────────────────────────── */}
        {results && (
          <div className="mt-8 border" style={{
            borderColor: '#D5D8DC',
            background: '#FFFFFF',
            borderRadius: '2px',
            padding: '32px',
            animation: 'slideUpFadeIn 0.4s ease-out',
          }}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-1" style={{ color: '#455A64', fontFamily: 'var(--font-display)' }}>
              Estimated Settlement Range
            </h2>
            <p className="text-sm mb-6" style={{ color: '#212529', fontFamily: 'var(--font-body)' }}>
              {results.caseLabel} case · {damages ? `$${Number(damages).toLocaleString()}` : ''} in claimed damages
              {represented === 'yes' ? ' · Attorney represented' : ''}
            </p>

            {/* 3-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Conservative */}
              <div className="p-6 text-center" style={{
                background: '#FAFBFC',
                border: '1px solid #D5D8DC',
                borderRadius: '2px',
              }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.8px] mb-2" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                  Conservative
                </p>
                <p className="text-3xl font-black" style={{ color: '#212529', fontFamily: 'var(--font-display)', letterSpacing: '-1px', marginBottom: '4px' }}>
                  {fmt(results.low)}
                </p>
                <p className="text-[11px]" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>P25 estimate</p>
              </div>
              {/* Median */}
              <div className="p-6 text-center transform scale-105" style={{
                background: '#FFF3F4',
                border: '1px solid #E8171F',
                borderRadius: '2px',
              }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.8px] mb-2" style={{ color: '#E8171F', fontFamily: 'var(--font-body)' }}>
                  Median
                </p>
                <p className="text-4xl font-black" style={{ color: '#212529', fontFamily: 'var(--font-display)', letterSpacing: '-1px', marginBottom: '4px' }}>
                  {fmt(results.median)}
                </p>
                <p className="text-[11px]" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>P50 estimate</p>
              </div>
              {/* Favorable */}
              <div className="p-6 text-center" style={{
                background: '#FAFBFC',
                border: '1px solid #D5D8DC',
                borderRadius: '2px',
              }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.8px] mb-2" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                  Favorable
                </p>
                <p className="text-3xl font-black" style={{ color: '#212529', fontFamily: 'var(--font-display)', letterSpacing: '-1px', marginBottom: '4px' }}>
                  {fmt(results.high)}
                </p>
                <p className="text-[11px]" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>P75 estimate</p>
              </div>
            </div>

            {/* Win Rate & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Win Rate Circle */}
              <div className="p-6 flex flex-col items-center justify-center" style={{
                background: '#FAFBFC',
                border: '1px solid #D5D8DC',
                borderRadius: '2px',
                minHeight: '200px',
              }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.8px] mb-4" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                  Plaintiff Win Rate
                </p>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  background: `conic-gradient(#E8171F 0% ${results.winRate * 100}%, #F5F6F7 ${results.winRate * 100}% 100%)`,
                }}>
                  <div style={{
                    width: '108px',
                    height: '108px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    border: '1px solid #D5D8DC',
                  }}>
                    <p className="text-3xl font-black" style={{ color: '#E8171F', fontFamily: 'var(--font-display)', marginBottom: '2px' }}>
                      {(results.winRate * 100).toFixed(0)}%
                    </p>
                    <p className="text-[10px]" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>of cases</p>
                  </div>
                </div>
              </div>
              {/* Timeline */}
              <div className="p-6 flex flex-col items-center justify-center" style={{
                background: '#FAFBFC',
                border: '1px solid #D5D8DC',
                borderRadius: '2px',
                minHeight: '200px',
              }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.8px] mb-4" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                  Typical Timeline
                </p>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <p className="text-2xl font-black" style={{ color: '#212529', fontFamily: 'var(--font-display)' }}>
                    {results.timeline}
                  </p>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: '#E8171F',
                    borderRadius: '2px',
                  }} />
                  <p className="text-[11px]" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>from filing to resolution</p>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="mb-6 p-6" style={{ background: '#F8F9FA', border: '1px solid #E5EBF0', borderRadius: '2px' }}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.8px] mb-4" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
                Calculation Breakdown
              </h3>
              <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: '13px', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E5EBF0' }}>
                    <td style={{ padding: '8px 0', color: '#455A64' }}>Base damages claimed</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-mono)' }}>{fmt(results.breakdown.baseDamages)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E5EBF0' }}>
                    <td style={{ padding: '8px 0', color: '#455A64' }}>Case type multiplier (median)</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.categoryMult.median.toFixed(2)}</td>
                  </tr>
                  {results.breakdown.severityMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid #E5EBF0' }}>
                      <td style={{ padding: '8px 0', color: '#455A64' }}>Severity adjustment</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: results.breakdown.severityMult > 1 ? '#07874A' : '#CC1019', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.severityMult.toFixed(1)}</td>
                    </tr>
                  )}
                  {results.breakdown.durationMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid #E5EBF0' }}>
                      <td style={{ padding: '8px 0', color: '#455A64' }}>Duration adjustment</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: results.breakdown.durationMult > 1 ? '#07874A' : '#CC1019', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.durationMult.toFixed(1)}</td>
                    </tr>
                  )}
                  {results.breakdown.attorneyMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid #E5EBF0' }}>
                      <td style={{ padding: '8px 0', color: '#455A64' }}>Attorney representation boost</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: '#07874A', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.attorneyMult.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ padding: '10px 0', color: '#212529', fontWeight: 700 }}>Estimated median settlement</td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 800, color: '#E8171F', fontFamily: 'var(--font-mono)', fontSize: '16px' }}>{fmt(results.median)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Results disclaimer */}
            <div className="p-4 rounded" style={{
              color: '#92400E',
              fontFamily: 'var(--font-body)',
              background: '#FFFBEB',
              border: '1px solid #FCD34D',
              borderLeft: '3px solid #F59E0B',
              fontSize: '12px',
              lineHeight: '1.6',
            }}>
              These estimates are based on aggregate federal court settlement data and statistical modeling. Your actual outcome may differ significantly based on evidence, jurisdiction-specific factors, and representation quality. This is not legal advice.
            </div>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="mt-8 border" style={{
          borderColor: '#D5D8DC',
          background: '#FFFFFF',
          borderRadius: '2px',
          padding: '32px',
          borderLeft: '3px solid #F59E0B',
        }}>
          <h2 className="text-xs font-bold uppercase tracking-[0.8px] mb-3" style={{ color: '#212529', fontFamily: 'var(--font-display)' }}>
            Important Disclaimer
          </h2>
          <p className="text-[12px] leading-relaxed" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
            The Settlement Calculator provides estimates based on historical aggregate data from federal court records. These are statistical approximations and not predictions. Actual settlement amounts vary significantly based on case facts, legal representation, evidence quality, and many other factors. This calculator is not legal advice. Do not rely on these estimates as a substitute for consulting with a qualified attorney. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>


    </div>
  );
}
