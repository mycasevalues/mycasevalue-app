'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface Feature {
  title: string;
  desc: string;
  free: boolean;
  icon: React.ReactNode;
}

export interface ReportFeaturesGridProps {
  lang?: string;
}

export function ReportFeaturesGrid({ lang = 'en' }: ReportFeaturesGridProps) {
  const es = lang === 'es';
  const features: Feature[] = [
    // Free items
    {
      title: es ? 'Análisis de tasa de éxito' : 'Win Rate Analysis',
      desc: es ? 'Tasa de éxito histórica para tu tipo de caso' : 'Historical success rate for your case type',
      free: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="12" width="4" height="9" rx="1" />
          <rect x="10" y="8" width="4" height="13" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      ),
    },
    {
      title: es ? 'Tasa de acuerdos' : 'Settlement Rate',
      desc: es ? 'Qué % de casos llegan a un acuerdo' : 'What % of cases settle',
      free: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
    {
      title: es ? 'Cronología mediana' : 'Median Timeline',
      desc: es ? 'Cuánto tiempo suelen durar los casos' : 'How long cases typically take',
      free: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: es ? 'Volumen de casos' : 'Case Volume',
      desc: es ? 'Tamaño de la muestra analizada' : 'Sample size of analyzed cases',
      free: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    // Premium items
    {
      title: es ? 'Rangos de recuperación' : 'Recovery Ranges',
      desc: es ? 'Estimaciones bajas, típicas y altas' : 'Low, typical, high estimates',
      free: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
    {
      title: es ? 'Análisis de jueces' : 'Judge Analytics',
      desc: es ? 'Cómo fallan jueces específicos' : 'How specific judges rule',
      free: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <path d="M3 12l9-9 9 9" />
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      ),
    },
    {
      title: es ? 'Puntuación de fortaleza' : 'Strength Score',
      desc: es ? 'Tu caso puntuado del 1 al 100' : 'Your case scored 1-100',
      free: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      title: es ? 'Comparación estatal' : 'State Comparison',
      desc: es ? 'Cómo se desempeña tu estado' : 'How your state performs',
      free: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
    {
      title: es ? 'Impacto del abogado' : 'Attorney Impact',
      desc: es ? 'Probabilidades con vs sin abogado' : 'With vs without lawyer odds',
      free: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: es ? 'Cronograma estimado' : 'Timeline Estimates',
      desc: es ? 'Personalizado para tu situación' : 'Customized for your situation',
      free: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {features.map((f, i) => (
        <div
          key={i}
          className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
            f.free
              ? 'bg-[#FFFFFF] border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
              : 'border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
          }`}
          style={
            !f.free
              ? {
                background: 'linear-gradient(135deg, rgba(17,17,17,0.12), rgba(249,248,246,0.9))',
                borderColor: 'rgba(17,17,17,0.2)',
              }
              : undefined
          }
        >
          <div className="flex items-start justify-between mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: f.free ? 'rgba(17,17,17,0.1)' : 'rgba(17,17,17,0.12)' }}
            >
              {f.icon}
            </div>
            {!f.free && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            )}
          </div>
          <div className="text-[14px] font-semibold text-[var(--fg-secondary)]">{f.title}</div>
          <div className="text-[12px] text-[var(--fg-muted)] mt-1">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

export default ReportFeaturesGrid;
