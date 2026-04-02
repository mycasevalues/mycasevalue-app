'use client';

import { useState, useEffect } from 'react';

interface Props {
  lang?: string;
  baseData?: {
    wr: number; // win rate
    sr: number; // settlement rate
    mc: number; // median case
    sc: number; // standard cost
    rr: number; // recovery rate
    ps: number; // payout success
  };
}

const TRANSLATIONS = {
  en: {
    title: 'What If Simulator',
    caseAmount: 'Case Amount',
    timeline: 'Timeline Filed',
    representation: 'Representation',
    attorney: 'Attorney',
    selfRep: 'Self-Represented',
    projectedWinRate: 'Projected Win Rate',
    estimatedRecovery: 'Estimated Recovery Range',
    confidenceScore: 'Confidence Score',
    settlementLikelihood: 'Settlement Likelihood',
    low: 'Low',
    typical: 'Typical',
    high: 'High',
    disclaimer: 'Projections based on aggregate data. Not a prediction.',
    within3: 'Within 3 months',
    over3: 'Over 3 years',
  },
  es: {
    title: 'Simulador "Qué Pasaría Si"',
    caseAmount: 'Monto del Caso',
    timeline: 'Cronograma de Presentación',
    representation: 'Representación',
    attorney: 'Abogado',
    selfRep: 'Autorrrepresentado',
    projectedWinRate: 'Tasa de Ganancia Proyectada',
    estimatedRecovery: 'Rango de Recuperación Estimado',
    confidenceScore: 'Puntuación de Confianza',
    settlementLikelihood: 'Probabilidad de Acuerdo',
    low: 'Bajo',
    typical: 'Típico',
    high: 'Alto',
    disclaimer: 'Proyecciones basadas en datos agregados. No es una predicción.',
    within3: 'Dentro de 3 meses',
    over3: 'Más de 3 años',
  },
};

const DEFAULT_BASE_DATA = {
  wr: 0.65,
  sr: 0.72,
  mc: 150000,
  sc: 25000,
  rr: 0.85,
  ps: 0.88,
};

export default function WhatIfSimulator({ lang = 'en', baseData = DEFAULT_BASE_DATA }: Props) {
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
  const data = { ...DEFAULT_BASE_DATA, ...baseData };

  const [caseAmount, setCaseAmount] = useState(500000);
  const [timeline, setTimeline] = useState(50); // 0-100 scale
  const [isAttorney, setIsAttorney] = useState(true);
  const [displayWinRate, setDisplayWinRate] = useState(data.wr);
  const [displayConfidence, setDisplayConfidence] = useState(72);

  // Calculate metrics based on sliders
  useEffect(() => {
    // Win rate affected by timeline and representation
    const timelineFactor = 1 + (100 - timeline) * 0.002; // Earlier = better
    const repFactor = isAttorney ? 1.15 : 0.8;
    const calcWinRate = Math.min(0.95, data.wr * timelineFactor * repFactor);

    setDisplayWinRate(calcWinRate);

    // Confidence: affected by all factors
    const baseConfidence = 72;
    const caseAmountFactor = Math.log(caseAmount / 100000) / Math.log(10) * 5;
    const timelineConfidence = (100 - timeline) * 0.15;
    const repConfidence = isAttorney ? 12 : 0;
    const confidence = Math.min(100, baseConfidence + caseAmountFactor + timelineConfidence + repConfidence);

    setDisplayConfidence(Math.round(confidence));
  }, [caseAmount, timeline, isAttorney, data]);

  // Calculate recovery estimates
  const lowRecovery = caseAmount * 0.4 * data.rr;
  const typicalRecovery = caseAmount * 0.7 * data.rr;
  const highRecovery = caseAmount * 0.95 * data.rr;

  // Settlement likelihood based on timeline
  const settlementLikelihood = Math.min(95, 45 + (100 - timeline) * 0.3);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val.toFixed(0)}`;
  };

  const formatPercent = (val: number) => `${Math.round(val * 100)}%`;

  return (
    <div style={{ backgroundColor: '#0B1221', color: '#E2E8F0' }} className="w-full max-w-2xl mx-auto p-6 rounded-lg">
      {/* Header */}
      <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-2xl font-bold mb-2">
        {t.title}
      </h2>
      <p style={{ color: '#B0BDD0' }} className="text-sm mb-8">
        {t.disclaimer}
      </p>

      {/* Controls */}
      <div className="space-y-8 mb-10">
        {/* Case Amount Slider */}
        <div>
          <label style={{ fontFamily: 'var(--font-display)' }} className="block text-sm font-semibold mb-3">
            {t.caseAmount}
          </label>
          <div className="flex items-center gap-4 mb-2">
            <span style={{ color: '#B0BDD0', fontFamily: 'var(--font-mono)' }} className="text-xs">
              $10K
            </span>
            <input
              type="range"
              min="10000"
              max="5000000"
              step="50000"
              value={caseAmount}
              onChange={(e) => setCaseAmount(Number(e.target.value))}
              aria-label={t.caseAmount}
              aria-valuetext={formatCurrency(caseAmount)}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4F46E5, #0D9488)`,
                WebkitAppearance: 'none',
                outline: 'none',
              }}
            />
            <span style={{ color: '#B0BDD0', fontFamily: 'var(--font-mono)' }} className="text-xs">
              $5M
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', color: '#4F46E5' }} className="text-lg font-semibold">
            {formatCurrency(caseAmount)}
          </div>
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #4F46E5;
              cursor: pointer;
              box-shadow: 0 0 12px rgba(79, 70, 229, 0.6);
              border: 2px solid #0D9488;
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #4F46E5;
              cursor: pointer;
              box-shadow: 0 0 12px rgba(79, 70, 229, 0.6);
              border: 2px solid #0D9488;
            }
          `}</style>
        </div>

        {/* Timeline Slider */}
        <div>
          <label style={{ fontFamily: 'var(--font-display)' }} className="block text-sm font-semibold mb-3">
            {t.timeline}
          </label>
          <div className="flex items-center gap-4 mb-2">
            <span style={{ color: '#B0BDD0', fontFamily: 'var(--font-mono)' }} className="text-xs">
              {t.within3}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={timeline}
              onChange={(e) => setTimeline(Number(e.target.value))}
              aria-label={t.timeline}
              aria-valuetext={`${timeline}%`}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0D9488, #EF4444)`,
                WebkitAppearance: 'none',
                outline: 'none',
              }}
            />
            <span style={{ color: '#B0BDD0', fontFamily: 'var(--font-mono)' }} className="text-xs">
              {t.over3}
            </span>
          </div>
        </div>

        {/* Representation Toggle */}
        <div>
          <label style={{ fontFamily: 'var(--font-display)' }} className="block text-sm font-semibold mb-3">
            {t.representation}
          </label>
          <div className="flex gap-3">
            {[
              { label: t.attorney, value: true },
              { label: t.selfRep, value: false },
            ].map(({ label, value }) => (
              <button
                key={String(value)}
                onClick={() => setIsAttorney(value)}
                style={{
                  backgroundColor: isAttorney === value ? '#4F46E5' : '#1E293B',
                  borderColor: '#1E293B',
                  color: '#E2E8F0',
                }}
                className="px-4 py-2 rounded border transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div style={{ backgroundColor: '#131B2E', borderColor: '#1E293B' }} className="border rounded-lg p-6 space-y-6">
        {/* Projected Win Rate */}
        <div>
          <div style={{ color: '#B0BDD0' }} className="text-xs font-semibold mb-2">
            {t.projectedWinRate}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', color: '#0D9488' }} className="text-3xl font-bold">
            {formatPercent(displayWinRate)}
          </div>
        </div>

        {/* Estimated Recovery Range */}
        <div>
          <div style={{ color: '#B0BDD0' }} className="text-xs font-semibold mb-3">
            {t.estimatedRecovery}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t.low, val: lowRecovery, color: '#EF4444' },
              { label: t.typical, val: typicalRecovery, color: '#4F46E5' },
              { label: t.high, val: highRecovery, color: '#0D9488' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ backgroundColor: '#0B1221', borderColor: '#1E293B' }} className="border rounded p-3">
                <div style={{ color: '#B0BDD0' }} className="text-xs mb-1">
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', color }} className="text-lg font-bold">
                  {formatCurrency(val)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Score */}
        <div>
          <div style={{ color: '#B0BDD0' }} className="text-xs font-semibold mb-3">
            {t.confidenceScore}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" role="img" aria-label={`${t.confidenceScore}: ${displayConfidence}%`}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="4" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="4"
                  strokeDasharray={`${(displayConfidence / 100) * 283} 283`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
              </svg>
              <div
                style={{ fontFamily: 'var(--font-mono)', color: '#4F46E5' }}
                className="absolute inset-0 flex items-center justify-center text-sm font-bold"
              >
                {displayConfidence}
              </div>
            </div>
            <div style={{ color: '#B0BDD0' }} className="text-sm">
              {displayConfidence > 80 ? 'High' : displayConfidence > 50 ? 'Moderate' : 'Moderate-Low'}
            </div>
          </div>
        </div>

        {/* Settlement Likelihood */}
        <div>
          <div style={{ color: '#B0BDD0' }} className="text-xs font-semibold mb-2">
            {t.settlementLikelihood}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                style={{
                  backgroundColor: '#0D9488',
                  width: `${settlementLikelihood}%`,
                  transition: 'width 0.3s ease',
                }}
                className="h-full"
              />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', color: '#0D9488' }} className="text-sm font-bold min-w-12">
              {Math.round(settlementLikelihood)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
