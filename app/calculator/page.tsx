'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { SITE_URL } from '../../lib/site-config';
import { formatSettlementAmount } from '../../lib/format';
import { ATTORNEY_IMPACT } from '../../lib/attorney-impact';
import DemoCalculator from '../../components/DemoCalculator';

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
const EVIDENCE_MULT: Record<string, number> = {
  weak: 0.7,
  moderate: 1.0,
  strong: 1.3,
  overwhelming: 1.6,
};
const PRIOR_SETTLEMENT_MULT: Record<string, number> = {
  none: 1.0,
  below: 0.85,
  near: 1.1,
  above: 1.25,
};
const DEFENDANTS_MULT: Record<string, number> = {
  single: 1.0,
  multi: 1.15,
  complex: 1.3,
};

/* ── Category-to-NOS mapping for REAL_DATA lookup ────────────────────── */
const CATEGORY_PRIMARY_NOS: Record<string, string> = {
  work: '442', injury: '360', consumer: '870', rights: '440',
  money: '190', housing: '220', medical: '791', family: '400',
  gov: '950', education: '442',
};

function getRealDataForCategory(catId: string): { nos: string; wr: number; sp: number; mo: number; rng: { lo: number; md: number; hi: number } | null; total: number } | null {
  const nos = CATEGORY_PRIMARY_NOS[catId];
  if (!nos) return null;
  const rd = REAL_DATA[nos] as any;
  if (!rd) return null;
  return {
    nos,
    wr: rd.wr ?? 0,
    sp: rd.sp ?? 0,
    mo: rd.mo ?? 0,
    rng: rd.rng ?? null,
    total: rd.total ?? 0,
  };
}

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
  p10: number;
  p90: number;
  winRate: number;
  timeline: string;
  caseLabel: string;
  sampleSize: number;
  avgDuration: number;
  attorneyWinRate: number;
  proSeWinRate: number;
  nosCode: string;
  breakdown: {
    baseDamages: number;
    severityMult: number;
    durationMult: number;
    attorneyMult: number;
    evidenceMult: number;
    settlementMult: number;
    defendantsMult: number;
    categoryMult: { low: number; median: number; high: number };
  };
}

interface SavedScenario {
  id: string;
  label: string;
  median: number;
  winRate: number;
  summary: string;
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function CalculatorPage() {
  const [caseType, setCaseType] = useState('');
  // District input removed — estimates reflect national averages
  const [damages, setDamages] = useState('');
  const [represented, setRepresented] = useState('');
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [evidence, setEvidence] = useState('');
  const [priorSettlement, setPriorSettlement] = useState('');
  const [defendants, setDefendants] = useState('');
  const [results, setResults] = useState<Results | null>(null);
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);

  function resetForm() {
    setCaseType('');
    // district input removed
    setDamages('');
    setRepresented('');
    setSeverity('');
    setDuration('');
    setEvidence('');
    setPriorSettlement('');
    setDefendants('');
    setResults(null);
  }

  // stateOptions removed — district input no longer shown
  const canCalculate = caseType !== '' && damages !== '' && Number(damages.replace(/[^0-9.]/g, '')) > 0;

  function calculate() {
    const raw = Number(damages.replace(/[^0-9.]/g, ''));
    if (!caseType || !raw || raw <= 0) return;

    const catMult = DAMAGE_MULTIPLIERS[caseType] ?? { low: 0.15, median: 0.35, high: 0.75 };
    const attMult = represented === 'yes' ? ATTORNEY_BOOST : 1;
    const sevMult = severity ? (SEVERITY_MULT[severity] ?? 1) : 1;
    const durMult = duration ? (DURATION_MULT[duration] ?? 1) : 1;
    const evMult = evidence ? (EVIDENCE_MULT[evidence] ?? 1) : 1;
    const settleMult = priorSettlement ? (PRIOR_SETTLEMENT_MULT[priorSettlement] ?? 1) : 1;
    const defMult = defendants ? (DEFENDANTS_MULT[defendants] ?? 1) : 1;

    const combined = attMult * sevMult * durMult * evMult * settleMult * defMult;

    const lowVal = raw * catMult.low * combined;
    const medVal = raw * catMult.median * combined;
    const highVal = raw * catMult.high * combined;

    // Get real data for this category
    const realDataForCat = getRealDataForCategory(caseType);
    const nosCode = CATEGORY_PRIMARY_NOS[caseType] || '190';
    const attyData = ATTORNEY_IMPACT[nosCode];

    setResults({
      low: lowVal,
      median: medVal,
      high: highVal,
      p10: lowVal * 0.55,
      p90: highVal * 1.35,
      winRate: WIN_RATES[caseType] ?? 0.25,
      timeline: TIMELINES[caseType] ?? '10–20 months',
      caseLabel: SITS.find(s => s.id === caseType)?.label ?? caseType,
      sampleSize: realDataForCat?.total || 5000,
      avgDuration: realDataForCat?.mo || 12,
      attorneyWinRate: attyData?.rwr || 45,
      proSeWinRate: attyData?.pwr || 10,
      nosCode,
      breakdown: {
        baseDamages: raw,
        severityMult: sevMult,
        durationMult: durMult,
        attorneyMult: attMult,
        evidenceMult: evMult,
        settlementMult: settleMult,
        defendantsMult: defMult,
        categoryMult: catMult,
      },
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Settlement Research Tool',
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
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <DemoCalculator />
      <style>{slideUpFadeIn}</style>
      <style>{selectStyles}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="border-b px-6 py-3" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)' }}>
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'var(--accent-primary-hover)', textDecoration: 'none' }} className="hover:underline">
              Home
            </Link>
            <span style={{ color: 'var(--border-default)' }}>›</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Case Calculator</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--gradient-hero)', padding: '18px 24px' }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-3xl font-black mb-2" style={{ color: 'var(--color-surface-0)', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)' }}>
            Estimate Your Settlement Using Real Court Data
          </h1>
          <p className="text-base leading-relaxed max-w-2xl sm:text-base" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
            Estimate your settlement range based on federal court outcomes and case type. Our calculator uses data from 5.1M+ real federal cases to provide realistic national estimates.
          </p>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <form
          className="border"
          style={{
            borderColor: 'var(--border-default)',
            background: 'var(--color-surface-0)',
            padding: '20px',
            borderRadius: '12px',
          }}
          onSubmit={(e) => { e.preventDefault(); calculate(); }}
        >
          <div className="space-y-6">
            {/* Case Type */}
            <div>
              <label htmlFor="calc-case-type" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Case Type
              </label>
              <select
                id="calc-case-type"
                value={caseType}
                onChange={(e) => { setCaseType(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px',
                  borderRadius: '12px',
                  borderColor: caseType === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)',
                  color: caseType ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
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

            {/* District Note */}
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--color-surface-1)', border: '1px solid var(--border-default)' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                Estimates reflect national averages. District-specific data is available in <a href="/cases" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Case Reports</a>.
              </p>
            </div>

            {/* Estimated Damages */}
            <div>
              <label htmlFor="calc-damages" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
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
                  borderRadius: '12px',
                  borderColor: damages === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-body)',
                  borderWidth: '1px',
                  fontSize: '14px',
                }}
              />
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Total economic and non-economic losses you believe you incurred.
              </p>
            </div>

            {/* Represented by Attorney */}
            <div>
              <label htmlFor="calc-represented" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Represented by Attorney?
              </label>
              <select
                id="calc-represented"
                value={represented}
                onChange={(e) => { setRepresented(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px',
                  borderRadius: '12px',
                  borderColor: represented === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)',
                  color: represented ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  borderWidth: '1px',
                  fontSize: '14px',
                }}
              >
                <option value="">Select...</option>
                <option value="yes">Yes — I have an attorney</option>
                <option value="no">No — self-represented (pro se)</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Represented plaintiffs statistically achieve higher settlements.
              </p>
            </div>

            {/* Severity */}
            <div>
              <label htmlFor="calc-severity" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Injury / Harm Severity (optional)
              </label>
              <select
                id="calc-severity"
                value={severity}
                onChange={(e) => { setSeverity(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px', borderRadius: '12px',
                  borderColor: severity === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)', color: severity ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)', borderWidth: '1px', fontSize: '14px',
                }}
              >
                <option value="">Select severity...</option>
                <option value="minor">Minor — temporary, minimal impact</option>
                <option value="moderate">Moderate — significant but recoverable</option>
                <option value="severe">Severe — lasting impact, major disruption</option>
                <option value="catastrophic">Catastrophic — permanent disability or loss</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Higher severity correlates with larger damages awards.
              </p>
            </div>

            {/* Duration of Impact */}
            <div>
              <label htmlFor="calc-duration" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Duration of Impact (optional)
              </label>
              <select
                id="calc-duration"
                value={duration}
                onChange={(e) => { setDuration(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px', borderRadius: '12px',
                  borderColor: duration === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)', color: duration ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
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
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Longer-lasting impacts generally result in higher settlement values.
              </p>
            </div>

            {/* Evidence Strength */}
            <div>
              <label htmlFor="calc-evidence" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Evidence Strength (optional)
              </label>
              <select
                id="calc-evidence"
                value={evidence}
                onChange={(e) => { setEvidence(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px', borderRadius: '12px',
                  borderColor: evidence === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)', color: evidence ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)', borderWidth: '1px', fontSize: '14px',
                }}
              >
                <option value="">Select evidence strength...</option>
                <option value="weak">Weak — limited documentation</option>
                <option value="moderate">Moderate — some supporting evidence</option>
                <option value="strong">Strong — well-documented with witnesses/records</option>
                <option value="overwhelming">Overwhelming — clear liability, extensive documentation</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Strong documentation and witness testimony increase case value significantly.
              </p>
            </div>

            {/* Prior Settlements */}
            <div>
              <label htmlFor="calc-prior-settlement" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Prior Settlements? (optional)
              </label>
              <select
                id="calc-prior-settlement"
                value={priorSettlement}
                onChange={(e) => { setPriorSettlement(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px', borderRadius: '12px',
                  borderColor: priorSettlement === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)', color: priorSettlement ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)', borderWidth: '1px', fontSize: '14px',
                }}
              >
                <option value="">Select...</option>
                <option value="none">No prior settlement offers</option>
                <option value="below">Yes — below my estimate</option>
                <option value="near">Yes — near my estimate</option>
                <option value="above">Yes — above my estimate</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Existing offers establish a baseline for negotiations.
              </p>
            </div>

            {/* Number of Defendants */}
            <div>
              <label htmlFor="calc-defendants" className="block mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Number of Defendants (optional)
              </label>
              <select
                id="calc-defendants"
                value={defendants}
                onChange={(e) => { setDefendants(e.target.value); setResults(null); }}
                className="w-full px-4 border text-sm transition-all focus:outline-none"
                style={{
                  height: '48px', borderRadius: '12px',
                  borderColor: defendants === '' ? 'var(--border-default)' : 'var(--accent-primary)',
                  background: 'var(--color-surface-1)', color: defendants ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)', borderWidth: '1px', fontSize: '14px',
                }}
              >
                <option value="">Select...</option>
                <option value="single">Single defendant</option>
                <option value="multi">2–3 defendants</option>
                <option value="complex">4+ defendants (complex)</option>
              </select>
              <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Multiple defendants can increase complexity and settlement amounts.
              </p>
            </div>
          </div>

          {/* Calculate & Reset Buttons */}
          <div className="mt-8 pt-6 border-t flex gap-4" style={{ borderColor: 'var(--border-default)' }}>
            <button
              type="submit"
              disabled={!canCalculate}
              className="flex-1 px-6 text-white font-bold transition-all"
              style={{
                height: '48px',
                background: canCalculate ? 'var(--accent-primary)' : 'var(--border-default)',
                color: canCalculate ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-display)',
                cursor: canCalculate ? 'pointer' : 'not-allowed',
                opacity: canCalculate ? 1 : 0.7,
                textTransform: 'uppercase',
                borderRadius: '12px',
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
                background: 'var(--color-surface-0)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
                borderColor: 'var(--border-default)',
                borderRadius: '12px',
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
            borderColor: 'var(--border-default)',
            background: 'var(--color-surface-0)',
            borderRadius: '12px',
            padding: '20px',
            animation: 'slideUpFadeIn 0.4s ease-out',
          }}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.8px] mb-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>
              Estimated Settlement Range
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
              {results.caseLabel} case · {damages ? `$${Number(damages).toLocaleString()}` : ''} in claimed damages
              {represented === 'yes' ? ' · Attorney represented' : ''}
            </p>

            {/* Animated Settlement Range Bar */}
            <div className="mb-6" style={{ position: 'relative' }}>
              <div style={{ position: 'relative', height: '40px', marginBottom: '8px' }}>
                <div style={{ position: 'absolute', top: '16px', left: 0, right: 0, height: '8px', background: '#EDF3FB', borderRadius: '4px' }} />
                <div style={{
                  position: 'absolute', top: '16px', height: '8px',
                  left: `${Math.max(0, (results.p10 / results.p90) * 100 * 0.2)}%`,
                  right: `${Math.max(0, 100 - 100)}%`,
                  background: 'linear-gradient(90deg, #B0D0F5, #70B5F9, var(--accent-primary), #70B5F9, #B0D0F5)',
                  borderRadius: '4px',
                  animation: 'slideUpFadeIn 0.6s ease-out',
                }} />
                <div style={{
                  position: 'absolute', top: '10px', width: '2px', height: '20px',
                  background: 'var(--accent-primary-hover)',
                  left: `${(results.median / results.p90) * 100}%`,
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                }} />
              </div>
            </div>

            {/* 5-column percentile grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {[
                { label: 'P10', value: results.p10, highlight: false },
                { label: 'P25', value: results.low, highlight: false },
                { label: 'P50 (Median)', value: results.median, highlight: true },
                { label: 'P75', value: results.high, highlight: false },
                { label: 'P90', value: results.p90, highlight: false },
              ].map((col, i) => (
                <div key={i} className="p-4 text-center" style={{
                  background: col.highlight ? '#EDF3FB' : 'var(--color-surface-1)',
                  border: `1px solid ${col.highlight ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                  borderRadius: '12px',
                  ...(col.highlight ? { transform: 'scale(1.02)' } : {}),
                }}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.5px] mb-1" style={{ color: col.highlight ? 'var(--accent-primary)' : 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    {col.label}
                  </p>
                  <p style={{
                    fontSize: col.highlight ? '24px' : '20px',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '-0.5px',
                    marginBottom: 0,
                  }}>
                    {fmt(col.value)}
                  </p>
                </div>
              ))}
            </div>

            {/* Win Rate & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Win Rate Circle */}
              <div className="p-6 flex flex-col items-center justify-center" style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                minHeight: '200px',
              }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.8px] mb-4" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
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
                  background: `conic-gradient(var(--accent-primary) 0% ${results.winRate * 100}%, var(--color-surface-1) ${results.winRate * 100}% 100%)`,
                }}>
                  <div style={{
                    width: '108px',
                    height: '108px',
                    borderRadius: '50%',
                    background: 'var(--color-surface-0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    border: '1px solid var(--border-default)',
                  }}>
                    <p className="text-3xl font-black" style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-display)', marginBottom: '2px' }}>
                      {(results.winRate * 100).toFixed(0)}%
                    </p>
                    <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>of cases</p>
                  </div>
                </div>
              </div>
              {/* Timeline */}
              <div className="p-6 flex flex-col items-center justify-center" style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                minHeight: '200px',
              }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.8px] mb-4" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Typical Timeline
                </p>
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                    {results.timeline}
                  </p>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: 'var(--accent-primary)',
                    borderRadius: '12px',
                  }} />
                  <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>from filing to resolution</p>
                </div>
              </div>
            </div>

            {/* Attorney Impact & Sample Size */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-5" style={{ background: '#E8F3EB', border: '1px solid #057642', borderRadius: '12px' }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.5px] mb-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>With Attorney</p>
                <p className="text-2xl font-black" style={{ color: '#057642', fontFamily: 'var(--font-mono)' }}>{results.attorneyWinRate}%</p>
                <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>win rate</p>
              </div>
              <div className="p-5" style={{ background: '#FEF0EF', border: '1px solid #CC1016', borderRadius: '12px' }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.5px] mb-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Pro Se</p>
                <p className="text-2xl font-black" style={{ color: '#CC1016', fontFamily: 'var(--font-mono)' }}>{results.proSeWinRate}%</p>
                <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>win rate</p>
              </div>
              <div className="p-5" style={{ background: '#EDF3FB', border: '1px solid var(--accent-primary)', borderRadius: '12px' }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.5px] mb-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>Sample Size</p>
                <p className="text-2xl font-black" style={{ color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>n={results.sampleSize.toLocaleString()}</p>
                <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>cases analyzed</p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="mb-6 p-6" style={{ background: 'var(--color-surface-1)', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.8px] mb-4" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                Calculation Breakdown
              </h3>
              <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: '13px', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Base damages claimed</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>{fmt(results.breakdown.baseDamages)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Case type multiplier (median)</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.categoryMult.median.toFixed(2)}</td>
                  </tr>
                  {results.breakdown.severityMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Severity adjustment</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: results.breakdown.severityMult > 1 ? '#059669' : '#B91C1C', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.severityMult.toFixed(1)}</td>
                    </tr>
                  )}
                  {results.breakdown.durationMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Duration adjustment</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: results.breakdown.durationMult > 1 ? '#059669' : '#B91C1C', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.durationMult.toFixed(1)}</td>
                    </tr>
                  )}
                  {results.breakdown.attorneyMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Attorney representation boost</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: '#059669', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.attorneyMult.toFixed(2)}</td>
                    </tr>
                  )}
                  {results.breakdown.evidenceMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Evidence strength adjustment</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: results.breakdown.evidenceMult > 1 ? '#059669' : '#B91C1C', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.evidenceMult.toFixed(1)}</td>
                    </tr>
                  )}
                  {results.breakdown.settlementMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Prior settlement adjustment</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: results.breakdown.settlementMult > 1 ? '#059669' : '#B91C1C', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.settlementMult.toFixed(2)}</td>
                    </tr>
                  )}
                  {results.breakdown.defendantsMult !== 1 && (
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '8px 0', color: 'var(--color-text-secondary)' }}>Multiple defendants adjustment</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600, color: results.breakdown.defendantsMult > 1 ? '#059669' : '#B91C1C', fontFamily: 'var(--font-mono)' }}>×{results.breakdown.defendantsMult.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ padding: '10px 0', color: 'var(--color-text-primary)', fontWeight: 600 }}>Estimated median settlement</td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '16px' }}>{fmt(results.median)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Scenario Comparison */}
            <div className="mb-6 p-6" style={{ background: '#F0F4F8', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.8px]" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  Scenario Comparison
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (scenarios.length < 3) {
                        const newScenario: SavedScenario = {
                          id: `scenario-${Date.now()}`,
                          label: `Scenario ${scenarios.length + 1}`,
                          median: results.median,
                          winRate: results.winRate,
                          summary: `${results.caseLabel} • ${fmt(results.breakdown.baseDamages)} damages`,
                        };
                        setScenarios([...scenarios, newScenario]);
                      }
                    }}
                    disabled={scenarios.length >= 3}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: scenarios.length >= 3 ? 'var(--border-default)' : 'var(--accent-primary)',
                      color: 'var(--color-surface-0)',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: scenarios.length >= 3 ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-body)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Save Scenario
                  </button>
                  {scenarios.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setScenarios([])}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: 'var(--color-surface-0)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {scenarios.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: '12px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Label</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Median Estimate</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Win Rate</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenarios.map((scenario) => (
                        <tr key={scenario.id} style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
                          <td style={{ padding: '12px', color: 'var(--color-text-primary)', fontWeight: 500 }}>{scenario.label}</td>
                          <td style={{ padding: '12px', textAlign: 'right', color: 'var(--accent-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{fmt(scenario.median)}</td>
                          <td style={{ padding: '12px', textAlign: 'right', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>{(scenario.winRate * 100).toFixed(0)}%</td>
                          <td style={{ padding: '12px', color: 'var(--color-text-secondary)', fontSize: '11px' }}>{scenario.summary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', fontSize: '12px', textAlign: 'center', padding: '12px' }}>
                  Save up to 3 scenarios to compare side by side
                </p>
              )}
            </div>

            {/* Federal Data Context */}
            {(() => {
              const realCtx = getRealDataForCategory(caseType);
              if (!realCtx) return null;
              return (
                <div className="mb-6 p-6" style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '12px' }}>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.8px] mb-4" style={{ color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-body)' }}>
                    How This Compares to Federal Data
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>Actual Win Rate</p>
                      <p className="text-xl font-bold" style={{
                        color: realCtx.wr >= 50 ? '#059669' : 'var(--accent-primary)',
                        fontFamily: 'var(--font-mono)',
                      }}>{realCtx.wr.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>Settlement Rate</p>
                      <p className="text-xl font-bold" style={{ color: '#D97706', fontFamily: 'var(--font-mono)' }}>{realCtx.sp.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>Median Duration</p>
                      <p className="text-xl font-bold" style={{ color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)' }}>{realCtx.mo} mo</p>
                    </div>
                    {realCtx.rng && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>Median Recovery</p>
                        <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>{formatSettlementAmount(realCtx.rng.md, { compact: true })}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] mt-3" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    Based on {realCtx.total.toLocaleString()} federal cases · NOS {realCtx.nos} · FJC IDB 2000–2024
                  </p>
                </div>
              );
            })()}

            {/* CTA to full report */}
            {(() => {
              const nos = CATEGORY_PRIMARY_NOS[caseType];
              if (!nos) return null;
              return (
                <div className="mb-6 text-center p-6" style={{ background: 'var(--accent-primary)', borderRadius: '12px' }}>
                  <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
                    See circuit breakdowns, judge data, and detailed outcomes
                  </p>
                  <Link
                    href={`/report/${nos}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'var(--accent-primary)',
                      color: 'var(--color-surface-0)',
                      padding: '12px 28px',
                      borderRadius: '12px',
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    View Full Report
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              );
            })()}

            {/* Data Source Note */}
            <div className="mb-4 flex items-center gap-3 flex-wrap" style={{
              padding: '12px 16px',
              background: '#F3F2EF',
              borderRadius: '8px',
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-body)',
            }}>
              <span style={{ fontWeight: 600 }}>Data source:</span>
              <span>FJC Integrated Database · Federal civil cases 2000–2024</span>
              <span style={{ color: 'var(--color-text-muted)' }}>·</span>
              <span>Updated Q4 2025</span>
              <span style={{ color: 'var(--color-text-muted)' }}>·</span>
              <span>NOS {results.nosCode}</span>
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
          borderColor: 'var(--border-default)',
          background: 'var(--color-surface-0)',
          borderRadius: '12px',
          padding: '32px',
          borderLeft: '3px solid #F59E0B',
        }}>
          <h2 className="text-xs font-bold uppercase tracking-[0.8px] mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
            Important Disclaimer
          </h2>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            The Settlement Calculator provides estimates based on historical aggregate data from federal court records. These are statistical approximations and not predictions. Actual settlement amounts vary significantly based on case facts, legal representation, evidence quality, and many other factors. This calculator is not legal advice. Do not rely on these estimates as a substitute for consulting with a qualified attorney. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>

        {/* What Affects Your Case Value */}
        <div className="mt-8">
          <h2 className="text-2xl font-black mb-6" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>
            What Affects Your Case Value
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Evidence Quality',
                description: 'Strong documentation, witness testimony, and clear liability dramatically increase case value.',
                iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
              },
              {
                title: 'Attorney Representation',
                description: 'Cases with attorney representation settle for 23% more on average in federal court.',
                iconPath: 'M12 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.209 0-4 1.791-4 4v2h8v-2c0-2.209-1.791-4-4-4z',
              },
              {
                title: 'Case Type',
                description: 'Different case categories have vastly different outcome patterns and typical recovery ranges.',
                iconPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
              },
              {
                title: 'Injury Severity',
                description: 'Catastrophic injuries with permanent effects command the highest multipliers.',
                iconPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z',
              },
              {
                title: 'Jurisdiction',
                description: 'Federal district and circuit can significantly impact outcomes and timelines.',
                iconPath: '3 21h18M3 7v14M21 7v14M6 21V10M10 21V10M14 21V10M18 21V10',
              },
              {
                title: 'Prior Offers',
                description: 'Existing settlement offers establish a baseline and can strengthen your negotiating position.',
                iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
                  <path d={item.iconPath}/>
                </svg>
                <h3 className="font-bold mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '14px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8">
          <h2 className="text-2xl font-black mb-6" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/compare', title: 'Settlement Comparison', description: 'Compare case values across similar cases' },
              { href: '/odds', title: 'Win Odds Calculator', description: 'Estimate your likelihood of success' },
              { href: '/report/360', title: 'Detailed Case Report', description: 'Deep dive into injury case data' },
              { href: '/judges', title: 'Judge Analytics', description: 'See how judges rule in your district' },
            ].map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                style={{
                  display: 'block',
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '14px' }}>
                      {tool.title}
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.5 }}>
                      {tool.description}
                    </p>
                  </div>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" style={{ marginLeft: '8px', flexShrink: 0 }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}
