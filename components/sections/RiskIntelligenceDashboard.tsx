'use client';

import React, { useState } from 'react';

interface RiskIntelligenceDashboardProps {
  lang?: 'en' | 'es';
}

interface RiskFactor {
  id: string;
  label: string;
  labelEs: string;
  description: string;
  descriptionEs: string;
  weight: number; // 0-100
  impact: 'high' | 'medium' | 'low';
}

const RISK_FACTORS: RiskFactor[] = [
  {
    id: 'case-type',
    label: 'Case Type Complexity',
    labelEs: 'Complejidad del Tipo de Caso',
    description: 'Employment discrimination cases have a 47.6% plaintiff jury win rate nationally. Class actions and multi-statute claims increase complexity.',
    descriptionEs: 'Casos de discriminación laboral tienen 47.6% tasa de éxito ante jurado. Demandas colectivas y multi-estatuto aumentan complejidad.',
    weight: 78,
    impact: 'high',
  },
  {
    id: 'district',
    label: 'District Filing Advantage',
    labelEs: 'Ventaja del Distrito',
    description: 'Median disposition time and plaintiff win rates vary significantly by district. S.D.N.Y. averages 9.2 months; E.D. Texas averages 5.1 months.',
    descriptionEs: 'Tiempo de resolución y tasas de éxito varían significativamente por distrito. S.D.N.Y. promedia 9.2 meses; E.D. Texas promedia 5.1 meses.',
    weight: 65,
    impact: 'medium',
  },
  {
    id: 'evidence',
    label: 'Evidence Strength Indicator',
    labelEs: 'Indicador de Fortaleza de Evidencia',
    description: 'Cases with documented performance reviews, email trails, and witness corroboration settle 40% higher than those without. Direct evidence vs. circumstantial significantly impacts outcomes.',
    descriptionEs: 'Casos con evaluaciones documentadas, correos y corroboración de testigos obtienen 40% más en acuerdos.',
    weight: 85,
    impact: 'high',
  },
  {
    id: 'damages',
    label: 'Damages Exposure',
    labelEs: 'Exposición a Daños',
    description: 'Title VII/ADA statutory caps range $50K–$300K by employer size. Emotional distress and punitive damages expand recovery in §1983 and state claims.',
    descriptionEs: 'Topes de Título VII/ADA van de $50K–$300K por tamaño de empleador. Daños emocionales y punitivos amplían recuperación en §1983.',
    weight: 72,
    impact: 'high',
  },
  {
    id: 'timeline',
    label: 'Litigation Timeline Risk',
    labelEs: 'Riesgo de Cronograma',
    description: 'National median disposition is 8.7 months. Cases exceeding 18 months see 23% lower settlement values due to litigation fatigue and cost escalation.',
    descriptionEs: 'Mediana nacional de resolución es 8.7 meses. Casos que exceden 18 meses ven 23% menos en acuerdos por fatiga de litigio.',
    weight: 58,
    impact: 'medium',
  },
  {
    id: 'counsel',
    label: 'Opposing Counsel Track Record',
    labelEs: 'Historial del Abogado Oponente',
    description: 'Attorney win rates range from 25%–72% depending on specialization and firm size. High-volume defense firms tend to push for early summary judgment.',
    descriptionEs: 'Tasas de victoria de abogados van de 25%–72% según especialización. Firmas de defensa de alto volumen buscan resolución sumaria temprana.',
    weight: 61,
    impact: 'medium',
  },
];

const impactColors = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
};

const impactLabels = {
  high: { en: 'High Impact', es: 'Alto Impacto' },
  medium: { en: 'Medium Impact', es: 'Impacto Medio' },
  low: { en: 'Low Impact', es: 'Bajo Impacto' },
};

export default function RiskIntelligenceDashboard({ lang = 'en' }: RiskIntelligenceDashboardProps) {
  const [expandedId, setExpandedId] = useState<string | null>('evidence');
  const isEs = lang === 'es';

  // Calculate composite risk score (weighted average)
  const compositeScore = Math.round(
    RISK_FACTORS.reduce((sum, f) => sum + f.weight, 0) / RISK_FACTORS.length
  );

  const t = isEs ? {
    badge: 'INTELIGENCIA DE RIESGO',
    title: 'Panel de inteligencia de riesgo del caso',
    sub: 'Evaluación multifactorial basada en resultados históricos federales, métricas de distrito e indicadores de complejidad del caso',
    composite: 'Puntuación Compuesta',
    factors: 'Factores de Riesgo',
    outOf: 'de 100',
    disclaimer: 'Las puntuaciones de riesgo se basan en patrones agregados de resultados federales. No constituyen predicción ni asesoría legal.',
  } : {
    badge: 'RISK INTELLIGENCE',
    title: 'Case risk intelligence dashboard',
    sub: 'Multi-factor assessment based on historical federal outcomes, district metrics, and case complexity indicators',
    composite: 'Composite Score',
    factors: 'Risk Factors',
    outOf: 'of 100',
    disclaimer: 'Risk scores are based on aggregated federal outcome patterns. They do not constitute prediction or legal advice.',
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#F87171' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {t.badge}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {t.title}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>
      </div>

      {/* Composite Score + Factors */}
      <div className="max-w-[600px] mx-auto">
        {/* Composite score ring */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke={compositeScore >= 70 ? '#EF4444' : compositeScore >= 50 ? '#F59E0B' : '#10B981'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(compositeScore / 100) * 314} 314`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: '#374151' }}>{compositeScore}</span>
              <span className="text-[9px]" style={{ color: '#9CA3AF' }}>{t.outOf}</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold mb-1" style={{ color: '#374151' }}>{t.composite}</div>
            <div className="text-xs" style={{ color: '#9CA3AF' }}>
              {compositeScore >= 70
                ? (isEs ? 'Complejidad alta — considere consultar abogado' : 'High complexity — consider attorney consultation')
                : compositeScore >= 50
                  ? (isEs ? 'Complejidad moderada' : 'Moderate complexity')
                  : (isEs ? 'Complejidad baja' : 'Lower complexity')
              }
            </div>
          </div>
        </div>

        {/* Risk factors list */}
        <div className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#9CA3AF' }}>
          {t.factors}
        </div>
        <div className="space-y-2">
          {RISK_FACTORS.map(factor => {
            const isOpen = expandedId === factor.id;
            return (
              <div
                key={factor.id}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                  border: `1px solid ${isOpen ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`,
                }}
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : factor.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  {/* Weight bar mini */}
                  <div className="w-10 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-full" style={{
                      width: `${factor.weight}%`,
                      background: impactColors[factor.impact],
                    }} />
                  </div>
                  <span className="text-sm font-medium flex-1" style={{ color: '#374151' }}>
                    {isEs ? factor.labelEs : factor.label}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                    background: `${impactColors[factor.impact]}15`,
                    color: impactColors[factor.impact],
                  }}>
                    {factor.weight}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Expanded content */}
                <div
                  className="overflow-hidden transition-all duration-200"
                  style={{ maxHeight: isOpen ? '200px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-4 pb-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-2 mt-2 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-[1px]" style={{ color: impactColors[factor.impact] }}>
                        {impactLabels[factor.impact][isEs ? 'es' : 'en']}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                      {isEs ? factor.descriptionEs : factor.description}
                    </p>
                    {/* Full bar */}
                    <div className="mt-3 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{
                        width: `${factor.weight}%`,
                        background: `linear-gradient(90deg, ${impactColors[factor.impact]}CC, ${impactColors[factor.impact]})`,
                      }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px]" style={{ color: '#9CA3AF' }}>{isEs ? 'Bajo' : 'Low'}</span>
                      <span className="text-[9px]" style={{ color: '#9CA3AF' }}>{isEs ? 'Alto' : 'High'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center mt-6 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
