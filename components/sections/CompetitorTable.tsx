'use client';

import React, { useState } from 'react';

interface CompetitorTableProps {
  lang?: 'en' | 'es';
}

interface Competitor {
  name: string;
  price_en: string;
  price_es: string;
  audience: string;
  audienceEs: string;
  features: Record<string, boolean | 'partial'>;
  highlight?: boolean;
}

const FEATURES = [
  { key: 'free_access', en: 'Free public access', es: 'Acceso publico gratuito', category: 'access' },
  { key: 'no_login', en: 'No login required', es: 'Sin registro requerido', category: 'access' },
  { key: 'real_data', en: 'Real federal court data', es: 'Datos reales de tribunales', category: 'data' },
  { key: 'win_rates', en: 'Win rate by case type', es: 'Tasa de exito por tipo', category: 'data' },
  { key: 'settlement_ranges', en: 'Settlement range data', es: 'Rangos de acuerdos', category: 'data' },
  { key: 'judge_analytics', en: 'Judge analytics', es: 'Analisis de jueces', category: 'data' },
  { key: 'district_data', en: 'District-level intelligence', es: 'Inteligencia por distrito', category: 'data' },
  { key: 'timeline_data', en: 'Case timeline estimates', es: 'Estimaciones de tiempo', category: 'data' },
  { key: 'eeoc_data', en: 'EEOC charge data', es: 'Datos de cargos EEOC', category: 'data' },
  { key: 'state_comparison', en: 'State-by-state comparison', es: 'Comparacion por estado', category: 'analysis' },
  { key: 'cost_calculator', en: 'Litigation cost calculator', es: 'Calculadora de costos', category: 'analysis' },
  { key: 'risk_score', en: 'Case risk scoring', es: 'Puntuacion de riesgo', category: 'analysis' },
  { key: 'comparable_cases', en: 'Comparable case finder', es: 'Buscador de casos comparables', category: 'analysis' },
  { key: 'statutory_guide', en: 'Statutory rights guide', es: 'Guia de derechos por ley', category: 'analysis' },
  { key: 'bilingual', en: 'Bilingual (EN/ES)', es: 'Bilingue (EN/ES)', category: 'ux' },
  { key: 'mobile_first', en: 'Mobile-first design', es: 'Diseno mobile-first', category: 'ux' },
  { key: 'plaintiff_first', en: 'Designed for plaintiffs', es: 'Diseñado para demandantes', category: 'ux' },
  { key: 'instant_results', en: 'Instant results (no wait)', es: 'Resultados instantaneos', category: 'ux' },
];

const COMPETITORS: Competitor[] = [
  {
    name: 'MyCaseValue',
    price_en: 'Free',
    price_es: 'Gratis',
    audience: 'Plaintiffs & public',
    audienceEs: 'Demandantes y publico',
    highlight: true,
    features: {
      free_access: true, no_login: true, real_data: true, win_rates: true,
      settlement_ranges: true, judge_analytics: true, district_data: true,
      timeline_data: true, eeoc_data: true, state_comparison: true,
      cost_calculator: true, risk_score: true, comparable_cases: true,
      statutory_guide: true, bilingual: true, mobile_first: true,
      plaintiff_first: true, instant_results: true,
    },
  },
  {
    name: 'Westlaw',
    price_en: '$400+/mo',
    price_es: '$400+/mes',
    audience: 'Law firms',
    audienceEs: 'Bufetes de abogados',
    features: {
      free_access: false, no_login: false, real_data: true, win_rates: 'partial',
      settlement_ranges: 'partial', judge_analytics: true, district_data: true,
      timeline_data: 'partial', eeoc_data: false, state_comparison: 'partial',
      cost_calculator: false, risk_score: false, comparable_cases: true,
      statutory_guide: false, bilingual: false, mobile_first: false,
      plaintiff_first: false, instant_results: false,
    },
  },
  {
    name: 'LexisNexis',
    price_en: '$350+/mo',
    price_es: '$350+/mes',
    audience: 'Law firms',
    audienceEs: 'Bufetes de abogados',
    features: {
      free_access: false, no_login: false, real_data: true, win_rates: 'partial',
      settlement_ranges: 'partial', judge_analytics: true, district_data: true,
      timeline_data: 'partial', eeoc_data: false, state_comparison: 'partial',
      cost_calculator: false, risk_score: false, comparable_cases: true,
      statutory_guide: false, bilingual: false, mobile_first: false,
      plaintiff_first: false, instant_results: false,
    },
  },
  {
    name: 'CourtListener',
    price_en: 'Free',
    price_es: 'Gratis',
    audience: 'Researchers',
    audienceEs: 'Investigadores',
    features: {
      free_access: true, no_login: true, real_data: true, win_rates: false,
      settlement_ranges: false, judge_analytics: 'partial', district_data: 'partial',
      timeline_data: false, eeoc_data: false, state_comparison: false,
      cost_calculator: false, risk_score: false, comparable_cases: 'partial',
      statutory_guide: false, bilingual: false, mobile_first: false,
      plaintiff_first: false, instant_results: true,
    },
  },
  {
    name: 'Justia',
    price_en: 'Free',
    price_es: 'Gratis',
    audience: 'General public',
    audienceEs: 'Publico general',
    features: {
      free_access: true, no_login: true, real_data: 'partial', win_rates: false,
      settlement_ranges: false, judge_analytics: false, district_data: false,
      timeline_data: false, eeoc_data: false, state_comparison: false,
      cost_calculator: false, risk_score: false, comparable_cases: false,
      statutory_guide: 'partial', bilingual: false, mobile_first: true,
      plaintiff_first: false, instant_results: true,
    },
  },
  {
    name: 'PACER',
    price_en: '$0.10/page',
    price_es: '$0.10/pag.',
    audience: 'Attorneys',
    audienceEs: 'Abogados',
    features: {
      free_access: false, no_login: false, real_data: true, win_rates: false,
      settlement_ranges: false, judge_analytics: false, district_data: true,
      timeline_data: false, eeoc_data: false, state_comparison: false,
      cost_calculator: false, risk_score: false, comparable_cases: false,
      statutory_guide: false, bilingual: false, mobile_first: false,
      plaintiff_first: false, instant_results: false,
    },
  },
  {
    name: 'Google',
    price_en: 'Free',
    price_es: 'Gratis',
    audience: 'Everyone',
    audienceEs: 'Todos',
    features: {
      free_access: true, no_login: true, real_data: false, win_rates: false,
      settlement_ranges: false, judge_analytics: false, district_data: false,
      timeline_data: false, eeoc_data: false, state_comparison: false,
      cost_calculator: false, risk_score: false, comparable_cases: false,
      statutory_guide: false, bilingual: 'partial', mobile_first: true,
      plaintiff_first: false, instant_results: true,
    },
  },
];

function CellIcon({ value }: { value: boolean | 'partial' }) {
  if (value === true) return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
  if (value === 'partial') return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function countFeatures(c: Competitor): number {
  let count = 0;
  Object.values(c.features).forEach(v => { if (v === true) count++; else if (v === 'partial') count += 0.5; });
  return count;
}

export default function CompetitorTable({ lang = 'en' }: CompetitorTableProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCompetitors = showAll ? COMPETITORS : COMPETITORS.slice(0, 4);

  return (
    <section
      className="py-12 sm:py-16 cinematic-enter"
      style={{
        background: 'rgba(255,255,255,0.2)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-[11px] font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--fg-subtle)' }}>
            {lang === 'es' ? 'POR QUE NOSOTROS' : 'WHY US'}
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold mb-2" style={{ color: '#111111', letterSpacing: '-0.5px' }}>
            {lang === 'es' ? 'Lo que las herramientas de $400/mes no le dicen' : 'What $400/month tools won\'t tell you'}
          </h2>
          <p className="text-[13px] max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            {lang === 'es' ? 'Construido para personas reales, no para grandes bufetes' : 'Built for real people, not BigLaw firms'}
          </p>
        </div>

        {/* Score bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {COMPETITORS.map((c, i) => (
            <div key={i} className="text-center px-3 py-2 rounded-lg" style={{ background: c.highlight ? 'rgba(17,17,17,0.1)' : 'rgba(255,255,255,0.4)', border: `1px solid ${c.highlight ? '#333333' : 'var(--border-default)'}` }}>
              <div className="text-[11px] font-bold" style={{ color: c.highlight ? '#333333' : '#111111' }}>{c.name}</div>
              <div className="text-[16px] font-display font-extrabold" style={{ color: c.highlight ? '#10B981' : '#6B7280' }}>
                {countFeatures(c).toFixed(0)}/{FEATURES.length}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-xl" style={{ border: '1px solid var(--border-default)' }}>
          <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0, minWidth: 700 }}>
            <thead>
              <tr>
                <th scope="col" className="text-left text-[10px] font-semibold py-3 px-3 sticky left-0 z-10" style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-base, #0B1120)' }}>
                  {lang === 'es' ? 'Caracteristica' : 'Feature'}
                </th>
                {visibleCompetitors.map((c, i) => (
                  <th key={i} scope="col" className="text-center py-3 px-2" style={{
                    borderBottom: c.highlight ? '2px solid #8B5CF6' : '1px solid var(--border-default)',
                    background: c.highlight ? 'rgba(17,17,17,0.08)' : 'transparent',
                    minWidth: 80,
                  }}>
                    <div className="text-[11px] font-bold" style={{ color: c.highlight ? '#8B5CF6' : '#111111' }}>{c.name}</div>
                    <div className="text-[9px] mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{lang === 'es' ? c.price_es : c.price_en}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feat, fi) => {
                // Category separator
                const prevCat = fi > 0 ? FEATURES[fi - 1].category : '';
                const showCatHeader = feat.category !== prevCat;
                const catLabels: Record<string, { en: string; es: string }> = {
                  access: { en: 'ACCESS', es: 'ACCESO' },
                  data: { en: 'DATA COVERAGE', es: 'COBERTURA DE DATOS' },
                  analysis: { en: 'ANALYSIS TOOLS', es: 'HERRAMIENTAS DE ANALISIS' },
                  ux: { en: 'USER EXPERIENCE', es: 'EXPERIENCIA DE USUARIO' },
                };
                return (
                  <React.Fragment key={feat.key}>
                    {showCatHeader && (
                      <tr>
                        <td colSpan={visibleCompetitors.length + 1} className="py-1.5 px-3" style={{ background: 'rgba(255,255,255,0.6)', borderBottom: '1px solid var(--border-default)' }}>
                          <span className="text-[9px] font-bold tracking-[2px]" style={{ color: 'var(--fg-subtle)' }}>
                            {lang === 'es' ? catLabels[feat.category]?.es : catLabels[feat.category]?.en}
                          </span>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="text-[11px] py-2 px-3 sticky left-0 z-10" style={{ color: 'var(--fg-secondary)', borderBottom: '1px solid rgba(255,255,255,0.03)', background: 'var(--bg-base, #0B1120)' }}>
                        {lang === 'es' ? feat.es : feat.en}
                      </td>
                      {visibleCompetitors.map((c, ci) => (
                        <td key={ci} className="text-center py-2 px-2" style={{
                          borderBottom: '1px solid rgba(255,255,255,0.03)',
                          background: c.highlight ? 'rgba(17,17,17,0.04)' : 'transparent',
                        }}>
                          <div className="flex justify-center"><CellIcon value={c.features[feat.key]} /></div>
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Show more / less */}
        {!showAll && (
          <div className="text-center mt-4">
            <button type="button" onClick={() => setShowAll(true)} className="text-[11px] font-semibold px-4 py-2 rounded-lg transition-all" style={{ color: '#333333', border: '1px solid rgba(17,17,17,0.3)', background: 'rgba(17,17,17,0.05)' }}>
              {lang === 'es' ? `Mostrar los 7 competidores` : `Show all 7 competitors`}
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-4 text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
          <div className="flex items-center gap-1.5"><CellIcon value={true} /><span>{lang === 'es' ? 'Completo' : 'Full'}</span></div>
          <div className="flex items-center gap-1.5"><CellIcon value="partial" /><span>{lang === 'es' ? 'Parcial' : 'Partial'}</span></div>
          <div className="flex items-center gap-1.5"><CellIcon value={false} /><span>{lang === 'es' ? 'No' : 'No'}</span></div>
        </div>
      </div>
    </section>
  );
}
