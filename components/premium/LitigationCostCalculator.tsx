'use client';

import React, { useState, useMemo } from 'react';

interface LitigationCostCalculatorProps {
  lang?: 'en' | 'es';
  isPremium?: boolean;
  onUpgrade?: () => void;
}

/* Average litigation costs by phase (based on ACTL surveys and litigation cost studies) */
const COST_PHASES = {
  filing_initial: { en: 'Filing & Initial Pleadings', es: 'Presentación y Escritos Iniciales', low: 2000, high: 8000 },
  discovery: { en: 'Discovery Phase', es: 'Fase de Descubrimiento', low: 15000, high: 75000 },
  depositions: { en: 'Depositions', es: 'Deposiciones', low: 5000, high: 30000 },
  expert_witnesses: { en: 'Expert Witnesses', es: 'Testigos Peritos', low: 10000, high: 50000 },
  motions: { en: 'Pre-Trial Motions', es: 'Mociones Previas al Juicio', low: 5000, high: 25000 },
  mediation: { en: 'Mediation / ADR', es: 'Mediación / ADR', low: 3000, high: 15000 },
  trial_prep: { en: 'Trial Preparation', es: 'Preparación del Juicio', low: 15000, high: 60000 },
  trial: { en: 'Trial (3-5 days)', es: 'Juicio (3-5 días)', low: 20000, high: 100000 },
};

const CASE_COMPLEXITY = [
  { key: 'simple', en: 'Simple (single plaintiff, clear liability)', es: 'Simple (un demandante, responsabilidad clara)', multiplier: 0.6 },
  { key: 'moderate', en: 'Moderate (some disputed facts)', es: 'Moderado (algunos hechos en disputa)', multiplier: 1.0 },
  { key: 'complex', en: 'Complex (multiple parties, expert testimony)', es: 'Complejo (múltiples partes, peritos)', multiplier: 1.8 },
  { key: 'very_complex', en: 'Very Complex (class action, mass tort)', es: 'Muy Complejo (acción colectiva)', multiplier: 3.0 },
];

export default function LitigationCostCalculator({ lang = 'en', isPremium = false, onUpgrade }: LitigationCostCalculatorProps) {
  const [complexity, setComplexity] = useState('moderate');
  const [goToTrial, setGoToTrial] = useState(false);
  const [hasExperts, setHasExperts] = useState(true);

  const multiplier = CASE_COMPLEXITY.find(c => c.key === complexity)?.multiplier || 1;

  const costs = useMemo(() => {
    const phases = Object.entries(COST_PHASES).map(([key, phase]) => {
      if (key === 'trial_prep' && !goToTrial) return null;
      if (key === 'trial' && !goToTrial) return null;
      if (key === 'expert_witnesses' && !hasExperts) return null;
      return {
        key,
        label: lang === 'es' ? phase.es : phase.en,
        low: Math.round(phase.low * multiplier),
        high: Math.round(phase.high * multiplier),
      };
    }).filter(Boolean) as { key: string; label: string; low: number; high: number }[];

    const totalLow = phases.reduce((s, p) => s + p.low, 0);
    const totalHigh = phases.reduce((s, p) => s + p.high, 0);

    return { phases, totalLow, totalHigh };
  }, [complexity, goToTrial, hasExperts, multiplier, lang]);

  const formatCost = (n: number) => {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
    return `$${n}`;
  };

  const t = lang === 'es' ? {
    title: 'Calculadora de Costos de Litigio',
    sub: 'Estime los costos de llevar su caso a través del sistema judicial federal',
    complexityLabel: 'Complejidad del caso',
    trialLabel: '¿Planea ir a juicio?',
    expertLabel: '¿Necesita testigos peritos?',
    yes: 'Sí',
    no: 'No',
    estimatedRange: 'Rango estimado de costos',
    to: 'a',
    breakdown: 'Desglose por fase',
    disclaimer: 'Solo con fines informativos. Los costos reales varían significativamente. Consulte a un abogado para estimaciones específicas a su caso.',
    locked: 'Función Premium',
    unlockMsg: 'Desbloquee la calculadora completa de costos de litigio',
    upgrade: 'Actualizar para Acceder',
  } : {
    title: 'Litigation Cost Calculator',
    sub: 'Estimate the costs of taking your case through the federal court system',
    complexityLabel: 'Case complexity',
    trialLabel: 'Planning to go to trial?',
    expertLabel: 'Need expert witnesses?',
    yes: 'Yes',
    no: 'No',
    estimatedRange: 'Estimated cost range',
    to: 'to',
    breakdown: 'Phase breakdown',
    disclaimer: 'For informational purposes only. Actual costs vary significantly. Consult an attorney for case-specific estimates.',
    locked: 'Premium Feature',
    unlockMsg: 'Unlock the full litigation cost calculator',
    upgrade: 'Upgrade to Access',
  };

  // DEV MODE: All features unlocked — Stripe integration pending
  if (false) {
    return (
      <section
        className="py-12 sm:py-16"
        style={{ borderTop: '1px solid var(--border-default)', borderBottom: '1px solid var(--border-default)' }}
      >
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 text-center">
          <div
            className="rounded-xl p-8 relative overflow-hidden"
            style={{
              background: 'rgba(17,17,17,0.05)',
              border: '1px solid rgba(17,17,17,0.2)',
            }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.03) 0%, rgba(13,148,136,0.03) 100%)' }} />
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.5" className="mx-auto mb-4" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-[11px] font-bold tracking-[3px] uppercase mb-2" style={{ color: '#333333' }}>
                {t.locked}
              </p>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#111111' }}>
                {t.title}
              </h3>
              <p className="text-[13px] mb-5" style={{ color: '#6B7280' }}>
                {t.unlockMsg}
              </p>
              <button type="button"
                onClick={onUpgrade}
                className="px-6 py-2.5 rounded-lg font-semibold text-[13px] text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
              >
                {t.upgrade}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-12 sm:py-16"
      style={{
        background: 'rgba(255,255,255,0.3)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-[700px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[3px] uppercase mb-3" style={{ color: '#333333' }}>
            PREMIUM
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold mb-2" style={{ color: '#111111' }}>
            {t.title}
          </h2>
          <p className="text-[13px]" style={{ color: '#6B7280' }}>{t.sub}</p>
        </div>

        {/* Controls */}
        <div className="rounded-xl p-6 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
          {/* Complexity */}
          <div className="mb-4">
            <label className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--fg-secondary)' }}>
              {t.complexityLabel}
            </label>
            <select
              value={complexity}
              onChange={e => setComplexity(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-[13px]"
              style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-default)', color: '#111111', outline: 'none' }}
            >
              {CASE_COMPLEXITY.map(c => (
                <option key={c.key} value={c.key}>{lang === 'es' ? c.es : c.en}</option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--fg-secondary)' }}>
                {t.trialLabel}
              </span>
              <div className="flex gap-2">
                {[true, false].map(val => (
                  <button type="button"
                    key={String(val)}
                    onClick={() => setGoToTrial(val)}
                    className="px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                    style={{
                      background: goToTrial === val ? 'rgba(17,17,17,0.15)' : 'rgba(255,255,255,0.03)',
                      border: goToTrial === val ? '1px solid rgba(17,17,17,0.4)' : '1px solid var(--border-default)',
                      color: goToTrial === val ? '#333333' : '#6B7280',
                    }}
                  >
                    {val ? t.yes : t.no}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-[12px] font-semibold mb-2" style={{ color: 'var(--fg-secondary)' }}>
                {t.expertLabel}
              </span>
              <div className="flex gap-2">
                {[true, false].map(val => (
                  <button type="button"
                    key={String(val)}
                    onClick={() => setHasExperts(val)}
                    className="px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                    style={{
                      background: hasExperts === val ? 'rgba(17,17,17,0.15)' : 'rgba(255,255,255,0.03)',
                      border: hasExperts === val ? '1px solid rgba(17,17,17,0.4)' : '1px solid var(--border-default)',
                      color: hasExperts === val ? '#333333' : '#6B7280',
                    }}
                  >
                    {val ? t.yes : t.no}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
          <p className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--fg-subtle)' }}>
            {t.estimatedRange}
          </p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-bold font-mono" style={{ color: '#10B981' }}>{formatCost(costs.totalLow)}</span>
            <span className="text-[13px]" style={{ color: 'var(--fg-subtle)' }}>{t.to}</span>
            <span className="text-3xl font-bold font-mono" style={{ color: '#F59E0B' }}>{formatCost(costs.totalHigh)}</span>
          </div>

          <p className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--fg-subtle)' }}>
            {t.breakdown}
          </p>
          <div className="space-y-2">
            {costs.phases.map(phase => {
              const pct = costs.totalHigh > 0 ? (phase.high / costs.totalHigh) * 100 : 0;
              return (
                <div key={phase.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px]" style={{ color: 'var(--fg-secondary)' }}>{phase.label}</span>
                    <span className="text-[11px] font-mono font-semibold" style={{ color: '#111111' }}>
                      {formatCost(phase.low)} – {formatCost(phase.high)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.6)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #8B5CF6, #7C3AED)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-[10px] leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--fg-subtle)' }}>
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
