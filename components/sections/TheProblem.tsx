'use client';

import React from 'react';

interface TheProblemProps {
  lang?: 'en' | 'es';
}

export default function TheProblem({ lang = 'en' }: TheProblemProps) {
  const t = lang === 'es' ? {
    label: 'EL PROBLEMA',
    heading: 'Usted está negociando a ciegas',
    sub: 'Las compañías de seguros tienen acceso a cada veredicto, cada acuerdo, cada resultado judicial. Usted no. Hasta ahora.',
    without: 'Sin datos',
    withData: 'Con MyCaseValue',
    items_without: [
      { icon: '', text: '¿Mi caso vale algo?' },
      { icon: '', text: '¿Esta oferta es justa?' },
      { icon: '', text: '¿Cuáles son mis probabilidades?' },
      { icon: '', text: '¿Cuánto tiempo tomará?' },
    ],
    items_with: [
      { icon: '', text: 'Rango mediano: $75K – $425K' },
      { icon: '', text: 'Su oferta está en el percentil 23' },
      { icon: '', text: 'Tasa de éxito: 47.6% ante jurado' },
      { icon: '', text: 'Tiempo mediano: 8.7 meses' },
    ],
  } : {
    label: 'THE PROBLEM',
    heading: 'You\'re negotiating blind',
    sub: 'Insurance companies have access to every verdict, every settlement, every court outcome. You don\'t. Until now.',
    without: 'Without data',
    withData: 'With MyCaseValue',
    items_without: [
      { icon: '', text: 'Is my case worth anything?' },
      { icon: '', text: 'Is this offer fair?' },
      { icon: '', text: 'What are my chances?' },
      { icon: '', text: 'How long will this take?' },
    ],
    items_with: [
      { icon: '', text: 'Median range: $75K – $425K' },
      { icon: '', text: 'Your offer is at the 23rd percentile' },
      { icon: '', text: 'Win rate: 47.6% at jury trial' },
      { icon: '', text: 'Median time: 8.7 months' },
    ],
  };

  return (
    <section
      className="py-12 sm:py-16 cinematic-enter"
      style={{
        background: 'rgba(245,243,239,0.3)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase mb-3"
            style={{ color: '#EF4444' }}
          >
            {t.label}
          </p>
          <h2
            className="font-display text-xl sm:text-2xl font-bold mb-3"
            style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}
          >
            {t.heading}
          </h2>
          <p className="text-[13px] max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
            {t.sub}
          </p>
        </div>

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* WITHOUT data */}
          <div
            className="rounded-xl p-6"
            style={{
              background: 'rgba(239,68,68,0.05)',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
              <span className="text-[13px] font-bold" style={{ color: '#EF4444' }}>
                {t.without}
              </span>
            </div>
            <div className="space-y-3">
              {t.items_without.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                  style={{
                    background: 'rgba(239,68,68,0.06)',
                    border: '1px solid rgba(239,68,68,0.1)',
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{item.icon}</span>
                  <span className="text-[13px]" style={{ color: 'var(--fg-muted)' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WITH data */}
          <div
            className="rounded-xl p-6"
            style={{
              background: 'rgba(16,185,129,0.05)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 11 12 14 15 10" />
              </svg>
              <span className="text-[13px] font-bold" style={{ color: '#10B981' }}>
                {t.withData}
              </span>
            </div>
            <div className="space-y-3">
              {t.items_with.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                  style={{
                    background: 'rgba(16,185,129,0.06)',
                    border: '1px solid rgba(16,185,129,0.1)',
                    animation: `fadeSlideIn 0.3s ease-out ${i * 0.1}s both`,
                  }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981' }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13px] font-medium" style={{ color: 'var(--fg-primary)' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
