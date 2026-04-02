'use client';

import React from 'react';

interface WhyFreeSectionProps {
  lang?: 'en' | 'es';
}

interface Reason {
  icon: string;
  title: string;
  titleEs: string;
  desc: string;
  descEs: string;
}

const REASONS: Reason[] = [
  {
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    title: 'Public data should be public',
    titleEs: 'Los datos públicos deben ser públicos',
    desc: 'Federal court records are public domain under 17 U.S.C. § 105. We believe everyone deserves access to this information — not just those who can afford $400/month legal databases.',
    descEs: 'Los registros judiciales federales son de dominio público bajo 17 U.S.C. § 105. Creemos que todos merecen acceso a esta información — no solo quienes pueden pagar $400/mes en bases de datos legales.',
  },
  {
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    title: 'Level the playing field',
    titleEs: 'Nivelar el campo de juego',
    desc: 'Insurance companies and corporate defendants have teams of analysts with access to these exact statistics. We give individuals the same data-driven starting point.',
    descEs: 'Las compañías de seguros y demandados corporativos tienen equipos de analistas con acceso a estas estadísticas. Damos a los individuos el mismo punto de partida basado en datos.',
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'No data harvesting',
    titleEs: 'Sin recolección de datos',
    desc: 'We don\'t store your case details, sell your information, or contact you. Your search generates a report — that\'s it. No account required for the free tier.',
    descEs: 'No almacenamos detalles de su caso, no vendemos su información ni lo contactamos. Su búsqueda genera un informe — eso es todo. No se requiere cuenta para el nivel gratuito.',
  },
  {
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Premium funds the mission',
    titleEs: 'Premium financia la misión',
    desc: 'Free reports cover the essentials. Premium reports ($5.99 single / $9.99 unlimited / $29.99/mo Attorney Mode) add judge analytics, opposing counsel data, and litigation cost modeling — revenue that keeps the free tier free.',
    descEs: 'Los informes gratuitos cubren lo esencial. Los informes premium ($5.99 individual / $9.99 ilimitado / $29.99/mes Modo Abogado) agregan análisis de jueces, datos de abogados oponentes y modelado de costos — ingresos que mantienen el nivel gratuito libre.',
  },
];

export default function WhyFreeSection({ lang = 'en' }: WhyFreeSectionProps) {
  const isEs = lang === 'es';

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          {isEs ? 'POR QUÉ ES GRATIS' : 'WHY IT\'S FREE'}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {isEs ? 'Acceso libre a datos judiciales públicos' : 'Free access to public court data'}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>
          {isEs
            ? 'Sin trampas. Sin publicidad. Sin recolección de datos. Así es como funciona.'
            : 'No catch. No ads. No data harvesting. Here\'s how it works.'}
        </p>
      </div>

      {/* Reasons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[560px] mx-auto">
        {REASONS.map((reason, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ background: 'rgba(16,185,129,0.1)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={reason.icon}/>
              </svg>
            </div>
            <h3 className="text-sm font-bold mb-1.5" style={{ color: '#E2E8F0' }}>
              {isEs ? reason.titleEs : reason.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#B0BDD0' }}>
              {isEs ? reason.descEs : reason.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison bar */}
      <div className="max-w-[560px] mx-auto mt-6 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-[1.5px] uppercase" style={{ color: '#8B95A5' }}>
            {isEs ? 'Comparación de costos mensuales' : 'Monthly cost comparison'}
          </span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'MyCaseValues', cost: '$0', width: '2%', color: '#10B981', highlight: true },
            { name: 'CourtListener', cost: '$0', width: '2%', color: '#6366F1', highlight: false },
            { name: 'PACER', cost: '$0.10/page', width: '15%', color: '#F59E0B', highlight: false },
            { name: 'Westlaw', cost: '$350+/mo', width: '85%', color: '#EF4444', highlight: false },
            { name: 'LexisNexis', cost: '$400+/mo', width: '100%', color: '#EF4444', highlight: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[11px] font-medium w-[100px] flex-shrink-0" style={{ color: item.highlight ? '#10B981' : '#B0BDD0' }}>
                {item.name}
              </span>
              <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="h-full rounded-full" style={{ width: item.width, background: item.color, minWidth: '4px' }} />
              </div>
              <span className="text-[10px] font-bold w-[80px] text-right" style={{ color: item.color }}>
                {item.cost}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
