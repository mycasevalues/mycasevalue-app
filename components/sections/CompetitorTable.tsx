'use client';

import React from 'react';

interface CompetitorTableProps {
  lang?: 'en' | 'es';
}

interface Competitor {
  name: string;
  price_en: string;
  price_es: string;
  features: Record<string, boolean | 'partial'>;
  highlight?: boolean;
}

const FEATURES = [
  { key: 'free_access', en: 'Free public access', es: 'Acceso público gratuito' },
  { key: 'real_data', en: 'Real federal court data', es: 'Datos reales de tribunales' },
  { key: 'win_rates', en: 'Win rate by case type', es: 'Tasa de éxito por tipo' },
  { key: 'settlement_ranges', en: 'Settlement range data', es: 'Rangos de acuerdos' },
  { key: 'judge_analytics', en: 'Judge analytics', es: 'Análisis de jueces' },
  { key: 'state_comparison', en: 'State-by-state comparison', es: 'Comparación por estado' },
  { key: 'bilingual', en: 'Bilingual (EN/ES)', es: 'Bilingüe (EN/ES)' },
  { key: 'no_login', en: 'No login required', es: 'Sin registro requerido' },
  { key: 'plaintiff_first', en: 'Designed for plaintiffs', es: 'Diseñado para demandantes' },
];

const COMPETITORS: Competitor[] = [
  {
    name: 'MyCaseValues',
    price_en: 'Free',
    price_es: 'Gratis',
    highlight: true,
    features: {
      free_access: true,
      real_data: true,
      win_rates: true,
      settlement_ranges: true,
      judge_analytics: true,
      state_comparison: true,
      bilingual: true,
      no_login: true,
      plaintiff_first: true,
    },
  },
  {
    name: 'Westlaw',
    price_en: '$400+/mo',
    price_es: '$400+/mes',
    features: {
      free_access: false,
      real_data: true,
      win_rates: 'partial',
      settlement_ranges: 'partial',
      judge_analytics: true,
      state_comparison: 'partial',
      bilingual: false,
      no_login: false,
      plaintiff_first: false,
    },
  },
  {
    name: 'LexisNexis',
    price_en: '$350+/mo',
    price_es: '$350+/mes',
    features: {
      free_access: false,
      real_data: true,
      win_rates: 'partial',
      settlement_ranges: 'partial',
      judge_analytics: true,
      state_comparison: 'partial',
      bilingual: false,
      no_login: false,
      plaintiff_first: false,
    },
  },
  {
    name: 'Google Search',
    price_en: 'Free',
    price_es: 'Gratis',
    features: {
      free_access: true,
      real_data: false,
      win_rates: false,
      settlement_ranges: false,
      judge_analytics: false,
      state_comparison: false,
      bilingual: 'partial',
      no_login: true,
      plaintiff_first: false,
    },
  },
];

function CellIcon({ value }: { value: boolean | 'partial' }) {
  if (value === true) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
  if (value === 'partial') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function CompetitorTable({ lang = 'en' }: CompetitorTableProps) {
  return (
    <section
      className="py-12 sm:py-16 cinematic-enter"
      style={{
        background: 'rgba(15,23,42,0.2)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase mb-3"
            style={{ color: 'var(--fg-subtle)' }}
          >
            {lang === 'es' ? 'POR QUÉ NOSOTROS' : 'WHY US'}
          </p>
          <h2
            className="font-display text-xl sm:text-2xl font-bold mb-2"
            style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}
          >
            {lang === 'es'
              ? 'Lo que las herramientas de $400/mes no le dicen'
              : 'What $400/month tools won\'t tell you'}
          </h2>
          <p className="text-[13px] max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
            {lang === 'es'
              ? 'Construido para personas reales, no para grandes bufetes de abogados'
              : 'Built for real people, not BigLaw firms'}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[600px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th
                  className="text-left text-[11px] font-semibold py-3 px-3 sm:px-4"
                  style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)' }}
                >
                  {lang === 'es' ? 'Característica' : 'Feature'}
                </th>
                {COMPETITORS.map((c, i) => (
                  <th
                    key={i}
                    className="text-center py-3 px-2 sm:px-4"
                    style={{
                      borderBottom: c.highlight
                        ? '2px solid var(--accent-primary)'
                        : '1px solid var(--border-default)',
                      background: c.highlight ? 'rgba(99,102,241,0.08)' : 'transparent',
                    }}
                  >
                    <div
                      className="text-[13px] font-bold"
                      style={{ color: c.highlight ? 'var(--accent-primary)' : 'var(--fg-primary)' }}
                    >
                      {c.name}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: 'var(--fg-subtle)' }}>
                      {lang === 'es' ? c.price_es : c.price_en}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feat, fi) => (
                <tr key={feat.key}>
                  <td
                    className="text-[12px] py-2.5 px-3 sm:px-4"
                    style={{
                      color: 'var(--fg-secondary)',
                      borderBottom: fi < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    {lang === 'es' ? feat.es : feat.en}
                  </td>
                  {COMPETITORS.map((c, ci) => (
                    <td
                      key={ci}
                      className="text-center py-2.5 px-2 sm:px-4"
                      style={{
                        borderBottom: fi < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        background: c.highlight ? 'rgba(99,102,241,0.04)' : 'transparent',
                      }}
                    >
                      <div className="flex justify-center">
                        <CellIcon value={c.features[feat.key]} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-4 text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
          <div className="flex items-center gap-1.5">
            <CellIcon value={true} />
            <span>{lang === 'es' ? 'Completo' : 'Full'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CellIcon value="partial" />
            <span>{lang === 'es' ? 'Parcial / Premium' : 'Partial / Premium only'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CellIcon value={false} />
            <span>{lang === 'es' ? 'No disponible' : 'Not available'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
