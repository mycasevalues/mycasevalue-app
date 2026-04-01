'use client';

import React from 'react';

interface HowItWorksProps {
  lang?: 'en' | 'es';
}

interface Step {
  number: number;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  icon: string;
  color: string;
  detail: string;
  detailEs: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Select your case type',
    titleEs: 'Seleccione su tipo de caso',
    description: 'Choose from 50+ federal civil case categories — employment discrimination, personal injury, civil rights, contract disputes, and more.',
    descriptionEs: 'Elija entre 50+ categorias de casos civiles federales — discriminacion laboral, lesiones personales, derechos civiles, disputas contractuales y mas.',
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2',
    color: '#6366F1',
    detail: 'Each category maps to a federal Nature of Suit (NOS) code',
    detailEs: 'Cada categoria corresponde a un codigo federal de Naturaleza de la Demanda (NOS)',
  },
  {
    number: 2,
    title: 'Specify your details',
    titleEs: 'Especifique sus detalles',
    description: 'Enter your state, claim amount range, timeline, and whether you have an attorney. We match these against 4.2M+ federal case records.',
    descriptionEs: 'Ingrese su estado, rango de reclamo, tiempo y si tiene abogado. Comparamos esto contra 4.2M+ registros de casos federales.',
    icon: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
    color: '#0D9488',
    detail: 'All matching uses verified FJC IDB and BJS benchmark data',
    detailEs: 'Toda la comparacion usa datos verificados del FJC IDB y BJS',
  },
  {
    number: 3,
    title: 'Get your intelligence report',
    titleEs: 'Obtenga su informe de inteligencia',
    description: 'Receive a comprehensive Case Intelligence Report with win rates, settlement ranges, judge analytics, comparable verdicts, and timeline estimates.',
    descriptionEs: 'Reciba un Informe de Inteligencia de Caso completo con tasas de exito, rangos de acuerdos, analisis de jueces, veredictos comparables y estimaciones de tiempo.',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z',
    color: '#F59E0B',
    detail: 'Free basic report + premium deep-dive with cost calculator',
    detailEs: 'Informe basico gratuito + analisis premium con calculadora de costos',
  },
  {
    number: 4,
    title: 'Make informed decisions',
    titleEs: 'Tome decisiones informadas',
    description: 'Use real data to understand what similar cases have achieved. Share your report with your attorney or use it to evaluate a settlement offer.',
    descriptionEs: 'Use datos reales para entender lo que casos similares han logrado. Comparta su informe con su abogado o uselo para evaluar una oferta de acuerdo.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    color: '#10B981',
    detail: 'For informational purposes only — not a substitute for legal advice',
    detailEs: 'Solo con fines informativos — no sustituye asesoria legal',
  },
];

export default function HowItWorks({ lang = 'en' }: HowItWorksProps) {
  const t = lang === 'es' ? {
    badge: 'COMO FUNCIONA',
    title: 'De la incertidumbre a la claridad en 4 pasos',
    sub: 'Sin cuenta requerida. Sin informacion personal. Resultados instantaneos.',
    timeLabel: 'Tiempo total: ~90 segundos',
    free: 'Gratuito',
  } : {
    badge: 'HOW IT WORKS',
    title: 'From uncertainty to clarity in 4 steps',
    sub: 'No account required. No personal information. Instant results.',
    timeLabel: 'Total time: ~90 seconds',
    free: 'Free',
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
          {t.badge}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {t.title}
        </h2>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>
      </div>

      {/* Steps */}
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4">
        {STEPS.map((step, i) => (
          <div key={step.number} className="relative">
            {/* Connector line (desktop) */}
            {i < STEPS.length - 1 && (
              <div className="hidden sm:block absolute top-7 left-[calc(50%+24px)] right-[-16px] h-[2px]"
                style={{ background: `linear-gradient(90deg, ${step.color}40, ${STEPS[i + 1].color}40)` }} />
            )}

            <div className="flex flex-col items-center text-center">
              {/* Step circle */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 relative"
                style={{ background: step.color + '15', border: `2px solid ${step.color}40` }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={step.icon} />
                </svg>
                {/* Step number badge */}
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: step.color, color: '#fff' }}>
                  {step.number}
                </div>
              </div>

              <h3 className="text-[13px] font-bold mb-1.5" style={{ color: 'var(--fg-primary)' }}>
                {lang === 'es' ? step.titleEs : step.title}
              </h3>
              <p className="text-[11px] leading-relaxed mb-2" style={{ color: 'var(--fg-muted)' }}>
                {lang === 'es' ? step.descriptionEs : step.description}
              </p>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: step.color + '10', color: step.color }}>
                {lang === 'es' ? step.detailEs : step.detail}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stats */}
      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--fg-subtle)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {t.timeLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
          {t.free}
        </span>
      </div>
    </div>
  );
}
