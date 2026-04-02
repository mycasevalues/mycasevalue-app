'use client';

import React, { useState } from 'react';

interface CaseLifecycleProps {
  lang?: 'en' | 'es';
}

interface LifecycleStage {
  id: string;
  label: string;
  labelEs: string;
  duration: string;
  durationEs: string;
  description: string;
  descriptionEs: string;
  probability?: string;
  probabilityEs?: string;
  color: string;
  icon: string;
  exitPaths?: { label: string; labelEs: string; pct: number; color: string }[];
}

const STAGES: LifecycleStage[] = [
  {
    id: 'filing',
    label: 'Case Filing',
    labelEs: 'Presentacion de Demanda',
    duration: 'Day 1',
    durationEs: 'Dia 1',
    description: 'Complaint filed in federal district court. Court assigns case number, judge, and magistrate.',
    descriptionEs: 'La demanda se presenta en el tribunal federal de distrito. El tribunal asigna numero de caso, juez y magistrado.',
    color: '#333333',
    icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
    exitPaths: [
      { label: 'Proceeds to service', labelEs: 'Procede a notificacion', pct: 100, color: '#333333' },
    ],
  },
  {
    id: 'service',
    label: 'Service & Response',
    labelEs: 'Notificacion y Respuesta',
    duration: '1–3 months',
    durationEs: '1–3 meses',
    description: 'Defendant served with complaint. Has 21 days to respond (60 days for federal government). May file a motion to dismiss.',
    descriptionEs: 'El demandado recibe la demanda. Tiene 21 dias para responder (60 dias para el gobierno federal). Puede presentar mocion de desestimacion.',
    color: '#0EA5E9',
    icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
    exitPaths: [
      { label: 'Dismissed (MTD granted)', labelEs: 'Desestimado', pct: 15, color: '#EF4444' },
      { label: 'Default judgment', labelEs: 'Sentencia por rebeldia', pct: 5, color: '#F59E0B' },
      { label: 'Proceeds to discovery', labelEs: 'Procede a descubrimiento', pct: 80, color: '#0EA5E9' },
    ],
  },
  {
    id: 'discovery',
    label: 'Discovery',
    labelEs: 'Descubrimiento',
    duration: '3–12 months',
    durationEs: '3–12 meses',
    description: 'Both sides exchange evidence: interrogatories, document requests, depositions. Often the longest and most expensive phase.',
    descriptionEs: 'Ambas partes intercambian evidencia: interrogatorios, solicitudes de documentos, declaraciones. A menudo la fase mas larga y costosa.',
    color: '#0D9488',
    icon: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
    exitPaths: [
      { label: 'Settlement', labelEs: 'Acuerdo', pct: 40, color: '#F59E0B' },
      { label: 'Proceeds to motions', labelEs: 'Procede a mociones', pct: 60, color: '#0D9488' },
    ],
  },
  {
    id: 'motions',
    label: 'Summary Judgment',
    labelEs: 'Juicio Sumario',
    duration: '6–14 months',
    durationEs: '6–14 meses',
    description: 'Defendant typically files motion for summary judgment. Court decides if case has triable issues of fact. Critical stage — many cases end here.',
    descriptionEs: 'El demandado suele presentar mocion de juicio sumario. El tribunal decide si el caso tiene cuestiones de hecho juzgables. Etapa critica — muchos casos terminan aqui.',
    color: '#8B5CF6',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    exitPaths: [
      { label: 'Granted (case ends)', labelEs: 'Otorgado (caso termina)', pct: 25, color: '#EF4444' },
      { label: 'Settlement', labelEs: 'Acuerdo', pct: 20, color: '#F59E0B' },
      { label: 'Denied — proceeds to trial', labelEs: 'Denegado — procede a juicio', pct: 55, color: '#8B5CF6' },
    ],
  },
  {
    id: 'pretrial',
    label: 'Pre-Trial / Mediation',
    labelEs: 'Pre-Juicio / Mediacion',
    duration: '12–18 months',
    durationEs: '12–18 meses',
    description: 'Final settlement conference, mediation, and trial preparation. Many courts require mediation before trial. Last opportunity to settle.',
    descriptionEs: 'Conferencia final de conciliacion, mediacion y preparacion para el juicio. Muchos tribunales requieren mediacion antes del juicio. Ultima oportunidad de llegar a un acuerdo.',
    color: '#F59E0B',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    exitPaths: [
      { label: 'Settlement', labelEs: 'Acuerdo', pct: 50, color: '#F59E0B' },
      { label: 'Proceeds to trial', labelEs: 'Procede a juicio', pct: 50, color: '#10B981' },
    ],
  },
  {
    id: 'trial',
    label: 'Trial',
    labelEs: 'Juicio',
    duration: '18–30+ months',
    durationEs: '18–30+ meses',
    description: 'Bench trial (judge only) or jury trial. Approximately 2% of filed federal civil cases reach trial. Median trial length: 3–5 days.',
    descriptionEs: 'Juicio ante juez o jurado. Aproximadamente el 2% de las demandas civiles federales llegan a juicio. Duracion media del juicio: 3–5 dias.',
    probability: '~2% of filed cases reach trial',
    probabilityEs: '~2% de los casos presentados llegan a juicio',
    color: '#10B981',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 0 0 6.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 0 0 6.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    exitPaths: [
      { label: 'Plaintiff verdict', labelEs: 'Veredicto para demandante', pct: 35, color: '#10B981' },
      { label: 'Defendant verdict', labelEs: 'Veredicto para demandado', pct: 65, color: '#EF4444' },
    ],
  },
];

export default function CaseLifecycle({ lang = 'en' }: CaseLifecycleProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const t = lang === 'es' ? {
    badge: 'CICLO DE VIDA DEL CASO',
    title: 'Linea de Tiempo de Litigacion Federal',
    sub: 'Como progresa un caso civil federal tipico — con probabilidades reales en cada etapa',
    casesFiled: 'De cada 100 casos civiles federales presentados',
    settle: 'se resuelven con acuerdo',
    dismiss: 'son desestimados',
    trial: 'llegan a juicio',
    source: 'Fuente: FJC IDB, Oficina Administrativa de Tribunales de EE.UU.',
    disclaimer: 'Solo con fines informativos. Cada caso es unico. No es asesoria legal.',
    tapToExpand: 'Toque una etapa para ver detalles',
    exitPaths: 'Resultados posibles:',
  } : {
    badge: 'CASE LIFECYCLE',
    title: 'Federal Litigation Timeline',
    sub: 'How a typical federal civil case progresses — with real probabilities at each stage',
    casesFiled: 'Of every 100 federal civil cases filed',
    settle: 'settle before trial',
    dismiss: 'are dismissed',
    trial: 'reach trial',
    source: 'Source: FJC IDB, Administrative Office of U.S. Courts',
    disclaimer: 'For informational purposes only. Every case is unique. Not legal advice.',
    tapToExpand: 'Tap a stage to see details',
    exitPaths: 'Possible outcomes:',
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
        style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {t.badge}
      </div>
      <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-1" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
        {t.title}
      </h2>
      <p className="text-sm mb-2" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>

      {/* Quick stat bar */}
      <div className="flex flex-wrap gap-3 mb-6 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px]" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <span className="font-bold" style={{ color: '#F59E0B' }}>~67%</span>
          <span style={{ color: 'var(--fg-muted)' }}>{t.settle}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px]" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <span className="font-bold" style={{ color: '#EF4444' }}>~31%</span>
          <span style={{ color: 'var(--fg-muted)' }}>{t.dismiss}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px]" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span className="font-bold" style={{ color: '#10B981' }}>~2%</span>
          <span style={{ color: 'var(--fg-muted)' }}>{t.trial}</span>
        </div>
      </div>

      {/* Vertical timeline */}
      <div className="relative">
        {STAGES.map((stage, i) => {
          const isExpanded = expandedStage === stage.id;
          const isLast = i === STAGES.length - 1;

          return (
            <div key={stage.id} className="relative flex gap-4">
              {/* Vertical line + node */}
              <div className="flex flex-col items-center flex-shrink-0">
                <button type="button"
                  onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center relative z-10 transition-all"
                  style={{
                    background: isExpanded ? stage.color : stage.color + '20',
                    border: `2px solid ${stage.color}`,
                    cursor: 'pointer',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isExpanded ? '#fff' : stage.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={stage.icon} />
                  </svg>
                </button>
                {!isLast && (
                  <div className="w-0.5 flex-1 min-h-[24px]" style={{ background: `linear-gradient(180deg, ${stage.color}40, ${STAGES[i + 1].color}40)` }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <button type="button"
                  onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                  className="text-left w-full"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--fg-primary)' }}>
                      {lang === 'es' ? stage.labelEs : stage.label}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: stage.color + '15', color: stage.color }}>
                      {lang === 'es' ? stage.durationEs : stage.duration}
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="mt-2 rounded-xl p-4 transition-all" style={{ background: 'rgba(15,23,42,0.5)', border: `1px solid ${stage.color}30` }}>
                    <p className="text-[12px] leading-relaxed mb-3" style={{ color: 'var(--fg-muted)' }}>
                      {lang === 'es' ? stage.descriptionEs : stage.description}
                    </p>
                    {stage.probability && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3"
                        style={{ background: stage.color + '15', color: stage.color }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                        {lang === 'es' ? stage.probabilityEs : stage.probability}
                      </div>
                    )}
                    {stage.exitPaths && stage.exitPaths.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--fg-subtle)' }}>{t.exitPaths}</div>
                        <div className="space-y-1.5">
                          {stage.exitPaths.map((ep, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <div className="h-1.5 rounded-full" style={{ width: `${ep.pct}%`, maxWidth: '60%', background: ep.color, minWidth: 8 }} />
                              <span className="text-[10px] font-mono font-bold" style={{ color: ep.color }}>{ep.pct}%</span>
                              <span className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? ep.labelEs : ep.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{t.source}</p>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
