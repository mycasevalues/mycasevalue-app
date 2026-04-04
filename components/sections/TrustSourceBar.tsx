'use client';

import React from 'react';

interface TrustSourceBarProps {
  lang?: 'en' | 'es';
}

const SOURCES = [
  {
    name: 'PACER',
    desc_en: 'Public Access to Court Electronic Records',
    desc_es: 'Acceso público a registros electrónicos judiciales',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    name: 'Federal Judicial Center',
    desc_en: 'Integrated Database — civil cases since 1979',
    desc_es: 'Base de datos integrada — casos civiles desde 1979',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Administrative Office',
    desc_en: 'U.S. Courts — annual statistical tables',
    desc_es: 'Tribunales de EE.UU. — tablas estadísticas anuales',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
      </svg>
    ),
  },
  {
    name: 'CourtListener',
    desc_en: '10M+ legal opinions archived',
    desc_es: '10M+ opiniones legales archivadas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 11 12 14 15 10" />
      </svg>
    ),
  },
  {
    name: 'Bureau of Justice Statistics',
    desc_en: 'Civil trial benchmarks & methodology',
    desc_es: 'Puntos de referencia de juicios civiles',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
];

export default function TrustSourceBar({ lang = 'en' }: TrustSourceBarProps) {
  return (
    <section
      className="py-12 sm:py-16 cinematic-enter"
      style={{
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase mb-3"
            style={{ color: 'var(--fg-subtle)' }}
          >
            {lang === 'es' ? 'INFRAESTRUCTURA DE DATOS' : 'DATA INFRASTRUCTURE'}
          </p>
          <h2
            className="font-display text-xl sm:text-2xl font-bold"
            style={{ color: '#111111', letterSpacing: '-0.5px' }}
          >
            {lang === 'es'
              ? 'Datos directos de fuentes judiciales federales oficiales'
              : 'Data sourced directly from official federal court systems'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {SOURCES.map((src, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-default)',
              }}
            >
              <div className="mb-3">{src.icon}</div>
              <div
                className="text-[13px] font-semibold mb-1"
                style={{ color: '#111111' }}
              >
                {src.name}
              </div>
              <div
                className="text-[11px] leading-tight"
                style={{ color: '#6B7280' }}
              >
                {lang === 'es' ? src.desc_es : src.desc_en}
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center text-[12px] leading-relaxed max-w-2xl mx-auto"
          style={{ color: '#6B7280' }}
        >
          {lang === 'es'
            ? 'No fabricamos ni estimamos datos. Cada número en este sitio se rastrea hasta un registro público específico.'
            : 'We do not fabricate or estimate data. Every number on this site traces to a specific public record source.'}{' '}
          <a
            href="/methodology"
            className="underline transition-colors"
            style={{ color: 'var(--fg-link)' }}
          >
            {lang === 'es' ? 'Ver nuestra metodología completa' : 'See our full methodology'}
          </a>
        </p>
      </div>
    </section>
  );
}
