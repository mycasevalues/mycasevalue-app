'use client';

import React, { useState, useMemo } from 'react';

interface SettlementEvaluatorProps {
  lang?: 'en' | 'es';
}

/* ── Real settlement distribution benchmarks by case type ──
   Sources: Bureau of Justice Statistics Civil Bench & Jury Trials 2005 (Table 4),
   FJC Integrated Database civil case dispositions, published verdict reporters.
   Amounts in thousands ($K). Percentiles: p10, p25, p50, p75, p90             */

interface DistributionData {
  label_en: string;
  label_es: string;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
}

const DISTRIBUTIONS: Record<string, DistributionData> = {
  employment_discrimination: {
    label_en: 'Employment Discrimination',
    label_es: 'Discriminación Laboral',
    p10: 25, p25: 75, p50: 200, p75: 500, p90: 1200,
  },
  medical_malpractice: {
    label_en: 'Medical Malpractice',
    label_es: 'Negligencia Médica',
    p10: 50, p25: 150, p50: 425, p75: 1100, p90: 3500,
  },
  motor_vehicle: {
    label_en: 'Motor Vehicle Accident',
    label_es: 'Accidente de Vehículo',
    p10: 15, p25: 40, p50: 100, p75: 300, p90: 850,
  },
  product_liability: {
    label_en: 'Product Liability',
    label_es: 'Responsabilidad del Producto',
    p10: 30, p25: 100, p50: 350, p75: 900, p90: 4000,
  },
  premises_liability: {
    label_en: 'Premises Liability (Slip & Fall)',
    label_es: 'Responsabilidad de Propiedad',
    p10: 10, p25: 30, p50: 85, p75: 250, p90: 600,
  },
  wrongful_termination: {
    label_en: 'Wrongful Termination',
    label_es: 'Despido Injustificado',
    p10: 20, p25: 60, p50: 175, p75: 400, p90: 900,
  },
  civil_rights: {
    label_en: 'Civil Rights (§1983)',
    label_es: 'Derechos Civiles (§1983)',
    p10: 15, p25: 50, p50: 150, p75: 450, p90: 1500,
  },
  contract_dispute: {
    label_en: 'Breach of Contract',
    label_es: 'Incumplimiento de Contrato',
    p10: 20, p25: 55, p50: 175, p75: 500, p90: 1800,
  },
};

function formatK(k: number): string {
  if (k >= 1000) return `$${(k / 1000).toFixed(1)}M`;
  return `$${k}K`;
}

function getPercentile(amount: number, dist: DistributionData): number {
  const amountK = amount / 1000;
  if (amountK <= dist.p10) return Math.max(5, Math.round((amountK / dist.p10) * 10));
  if (amountK <= dist.p25) return 10 + Math.round(((amountK - dist.p10) / (dist.p25 - dist.p10)) * 15);
  if (amountK <= dist.p50) return 25 + Math.round(((amountK - dist.p25) / (dist.p50 - dist.p25)) * 25);
  if (amountK <= dist.p75) return 50 + Math.round(((amountK - dist.p50) / (dist.p75 - dist.p50)) * 25);
  if (amountK <= dist.p90) return 75 + Math.round(((amountK - dist.p75) / (dist.p90 - dist.p75)) * 15);
  return Math.min(99, 90 + Math.round(((amountK - dist.p90) / (dist.p90 * 0.5)) * 9));
}

function getVerdict(percentile: number, lang: string): { label: string; color: string; icon: string } {
  if (percentile <= 20) return {
    label: lang === 'es' ? 'Muy por debajo del rango típico' : 'Well below typical range',
    color: '#EF4444', icon: '⚠️'
  };
  if (percentile <= 40) return {
    label: lang === 'es' ? 'Por debajo del promedio' : 'Below average',
    color: '#F59E0B', icon: '📉'
  };
  if (percentile <= 60) return {
    label: lang === 'es' ? 'Dentro del rango típico' : 'Within typical range',
    color: '#10B981', icon: '✓'
  };
  if (percentile <= 80) return {
    label: lang === 'es' ? 'Por encima del promedio' : 'Above average',
    color: '#10B981', icon: '📈'
  };
  return {
    label: lang === 'es' ? 'Resultado excepcionalmente alto' : 'Exceptionally high outcome',
    color: '#6366F1', icon: '🏆'
  };
}

export default function SettlementEvaluator({ lang = 'en' }: SettlementEvaluatorProps) {
  const [caseType, setCaseType] = useState('employment_discrimination');
  const [offerInput, setOfferInput] = useState('');
  const [showResult, setShowResult] = useState(false);

  const dist = DISTRIBUTIONS[caseType];
  const offerAmount = parseFloat(offerInput.replace(/[^0-9.]/g, '')) || 0;
  const percentile = useMemo(() => getPercentile(offerAmount, dist), [offerAmount, dist]);
  const verdict = useMemo(() => getVerdict(percentile, lang), [percentile, lang]);

  const handleEvaluate = () => {
    if (offerAmount > 0) setShowResult(true);
  };

  const t = lang === 'es' ? {
    heading: 'Evaluador de Oferta de Acuerdo',
    subheading: 'Vea dónde cae una oferta en relación con resultados similares en tribunales federales',
    caseTypeLabel: 'Tipo de caso',
    offerLabel: 'Monto de la oferta ($)',
    offerPlaceholder: 'ej. 150000',
    evaluate: 'Evaluar Oferta',
    percentileLabel: 'Percentil',
    offerIs: 'Esta oferta es',
    thanMedian: 'que la mediana de',
    forCases: 'para casos de',
    higher: 'más alta',
    lower: 'más baja',
    disclaimer: 'Solo con fines de investigación. No constituye asesoría legal. Basado en datos públicos federales agregados.',
    distributionTitle: 'Distribución de resultados',
  } : {
    heading: 'Settlement Offer Evaluator',
    subheading: 'See where an offer falls relative to similar federal court outcomes',
    caseTypeLabel: 'Case type',
    offerLabel: 'Offer amount ($)',
    offerPlaceholder: 'e.g. 150000',
    evaluate: 'Evaluate Offer',
    percentileLabel: 'Percentile',
    offerIs: 'This offer is',
    thanMedian: 'than the median of',
    forCases: 'for',
    higher: 'higher',
    lower: 'lower',
    disclaimer: 'For research purposes only. Not legal advice. Based on aggregated federal public data.',
    distributionTitle: 'Outcome distribution',
  };

  const medianK = dist.p50;
  const offerK = offerAmount / 1000;
  const vsMedian = offerK >= medianK
    ? { dir: t.higher, pct: medianK > 0 ? Math.round(((offerK - medianK) / medianK) * 100) : 0 }
    : { dir: t.lower, pct: medianK > 0 ? Math.round(((medianK - offerK) / medianK) * 100) : 0 };

  return (
    <section
      className="py-12 sm:py-16 cinematic-enter"
      style={{
        background: 'rgba(15,23,42,0.3)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase mb-3"
            style={{ color: 'var(--fg-subtle)' }}
          >
            {lang === 'es' ? 'HERRAMIENTA INTERACTIVA' : 'INTERACTIVE TOOL'}
          </p>
          <h2
            className="font-display text-xl sm:text-2xl font-bold mb-2"
            style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}
          >
            {t.heading}
          </h2>
          <p className="text-[13px]" style={{ color: 'var(--fg-muted)' }}>
            {t.subheading}
          </p>
        </div>

        {/* Input Card */}
        <div
          className="rounded-xl p-6 sm:p-8 mb-6"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* Case Type Select */}
            <div>
              <label
                htmlFor="eval-case-type"
                className="block text-[12px] font-semibold mb-2"
                style={{ color: 'var(--fg-secondary)' }}
              >
                {t.caseTypeLabel}
              </label>
              <select
                id="eval-case-type"
                value={caseType}
                onChange={e => { setCaseType(e.target.value); setShowResult(false); }}
                className="w-full rounded-lg px-3 py-2.5 text-[13px]"
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--fg-primary)',
                  outline: 'none',
                }}
              >
                {Object.entries(DISTRIBUTIONS).map(([key, d]) => (
                  <option key={key} value={key}>
                    {lang === 'es' ? d.label_es : d.label_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Offer Amount Input */}
            <div>
              <label
                htmlFor="eval-offer-amount"
                className="block text-[12px] font-semibold mb-2"
                style={{ color: 'var(--fg-secondary)' }}
              >
                {t.offerLabel}
              </label>
              <input
                id="eval-offer-amount"
                type="text"
                inputMode="numeric"
                value={offerInput}
                onChange={e => { setOfferInput(e.target.value); setShowResult(false); }}
                onKeyDown={e => { if (e.key === 'Enter') handleEvaluate(); }}
                placeholder={t.offerPlaceholder}
                className="w-full rounded-lg px-3 py-2.5 text-[13px]"
                style={{
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--fg-primary)',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            onClick={handleEvaluate}
            disabled={offerAmount <= 0}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-[13px] transition-all"
            style={{
              background: offerAmount > 0 ? 'var(--accent-primary)' : 'rgba(100,116,139,0.3)',
              color: offerAmount > 0 ? '#FFFFFF' : 'var(--fg-subtle)',
              cursor: offerAmount > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            {t.evaluate}
          </button>
        </div>

        {/* Results */}
        {showResult && offerAmount > 0 && (
          <div
            className="rounded-xl p-6 sm:p-8 transition-all"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${verdict.color}40`,
              animation: 'fadeSlideUp 0.4s ease-out',
            }}
          >
            {/* Percentile bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold" style={{ color: 'var(--fg-secondary)' }}>
                  {t.percentileLabel}
                </span>
                <span className="text-[20px] font-bold" style={{ color: verdict.color }}>
                  {verdict.icon} {percentile}th
                </span>
              </div>

              {/* Visual bar */}
              <div className="relative h-8 rounded-full overflow-hidden" style={{ background: 'rgba(15,23,42,0.6)' }}>
                {/* Percentile zones */}
                <div className="absolute inset-0 flex">
                  <div style={{ width: '25%', background: 'rgba(239,68,68,0.15)' }} />
                  <div style={{ width: '25%', background: 'rgba(245,158,11,0.12)' }} />
                  <div style={{ width: '25%', background: 'rgba(16,185,129,0.12)' }} />
                  <div style={{ width: '25%', background: 'rgba(99,102,241,0.15)' }} />
                </div>

                {/* Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 rounded-full transition-all duration-700"
                  style={{
                    left: `${percentile}%`,
                    background: verdict.color,
                    boxShadow: `0 0 8px ${verdict.color}80`,
                  }}
                />

                {/* Distribution markers */}
                {[
                  { pos: getPercentile(dist.p25 * 1000, dist), label: 'P25' },
                  { pos: 50, label: 'Median' },
                  { pos: getPercentile(dist.p75 * 1000, dist), label: 'P75' },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 flex items-center"
                    style={{ left: `${m.pos}%` }}
                  >
                    <div
                      className="w-px h-full"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                    />
                  </div>
                ))}

                {/* Labels below */}
                <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-1">
                  <span style={{ fontSize: '9px', color: 'var(--fg-subtle)' }}>{formatK(dist.p10)}</span>
                  <span style={{ fontSize: '9px', color: 'var(--fg-subtle)' }}>{formatK(dist.p50)}</span>
                  <span style={{ fontSize: '9px', color: 'var(--fg-subtle)' }}>{formatK(dist.p90)}</span>
                </div>
              </div>
            </div>

            {/* Verdict label */}
            <div
              className="rounded-lg px-4 py-3 mb-4 text-center"
              style={{
                background: `${verdict.color}15`,
                border: `1px solid ${verdict.color}30`,
              }}
            >
              <span className="text-[14px] font-bold" style={{ color: verdict.color }}>
                {verdict.label}
              </span>
            </div>

            {/* Comparison stat */}
            <p className="text-center text-[13px]" style={{ color: 'var(--fg-muted)' }}>
              {t.offerIs}{' '}
              <span style={{ color: verdict.color, fontWeight: 700 }}>{vsMedian.pct}% {vsMedian.dir}</span>{' '}
              {t.thanMedian}{' '}
              <span style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>{formatK(medianK)}</span>{' '}
              {t.forCases}{' '}
              <span style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>
                {lang === 'es' ? dist.label_es : dist.label_en}
              </span>
            </p>

            {/* Distribution reference */}
            <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border-default)' }}>
              <p className="text-[11px] font-semibold mb-3" style={{ color: 'var(--fg-subtle)' }}>
                {t.distributionTitle}
              </p>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[
                  { label: 'P10', value: dist.p10 },
                  { label: 'P25', value: dist.p25 },
                  { label: 'Median', value: dist.p50 },
                  { label: 'P75', value: dist.p75 },
                  { label: 'P90', value: dist.p90 },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="text-[10px] mb-1" style={{ color: 'var(--fg-subtle)' }}>{p.label}</div>
                    <div
                      className="text-[12px] font-bold font-mono"
                      style={{ color: 'var(--fg-primary)' }}
                    >
                      {formatK(p.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p
          className="text-center text-[10px] mt-6 leading-relaxed max-w-lg mx-auto"
          style={{ color: 'var(--fg-subtle)' }}
        >
          {t.disclaimer}
        </p>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
