'use client';

import React, { useState, useEffect } from 'react';

interface SampleReportModalProps {
  lang?: 'en' | 'es';
}

export default function SampleReportModal({ lang = 'en' }: SampleReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const t = lang === 'es' ? {
    cta: 'Ver informe de ejemplo',
    title: 'Informe de Inteligencia de Caso',
    subtitle: 'Ejemplo: Discriminacion Laboral — Titulo VII',
    close: 'Cerrar',
    sections: {
      overview: 'Resumen del Caso',
      winRate: 'Tasa de Exito',
      settlement: 'Rango de Acuerdos',
      timeline: 'Tiempo Estimado',
      judge: 'Analisis de Juez',
      comparable: 'Casos Comparables',
      cost: 'Estimacion de Costos',
      risk: 'Puntuacion de Riesgo',
    },
    premium: 'Premium',
    free: 'Incluido gratis',
    getReport: 'Genere su informe gratis',
    disclaimer: 'Ejemplo ilustrativo. Los informes reales usan datos verificados de su caso especifico.',
  } : {
    cta: 'See a sample report',
    title: 'Case Intelligence Report',
    subtitle: 'Sample: Employment Discrimination — Title VII',
    close: 'Close',
    sections: {
      overview: 'Case Overview',
      winRate: 'Win Rate Analysis',
      settlement: 'Settlement Range',
      timeline: 'Timeline Estimate',
      judge: 'Judge Analytics',
      comparable: 'Comparable Cases',
      cost: 'Cost Estimate',
      risk: 'Risk Score',
    },
    premium: 'Premium',
    free: 'Included free',
    getReport: 'Generate your free report',
    disclaimer: 'Illustrative example. Actual reports use verified data specific to your case.',
  };

  return (
    <>
      {/* Trigger button — rendered inline */}
      <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(17,17,17,0.1)', color: '#333333' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          {lang === 'es' ? 'VISTA PREVIA' : 'PREVIEW'}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {lang === 'es' ? 'Vea lo que obtiene antes de comenzar' : 'See what you get before you start'}
        </h2>
        <p className="text-sm mb-5 max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>
          {lang === 'es'
            ? 'Cada informe incluye tasas de exito, rangos de acuerdos, tiempos estimados, analisis de jueces y mas — todo respaldado por datos federales verificados.'
            : 'Every report includes win rates, settlement ranges, timeline estimates, judge analytics, and more — all backed by verified federal data.'}
        </p>

        {/* Preview card thumbnail */}
        <button type="button" onClick={() => setIsOpen(true)} className="group relative mx-auto block max-w-[400px] rounded-xl overflow-hidden transition-transform hover:scale-[1.02]" style={{ border: '1px solid var(--border-default)' }}>
          <div className="p-5" style={{ background: 'linear-gradient(180deg, rgba(17,17,17,0.08) 0%, rgba(15,23,42,0.8) 100%)' }}>
            {/* Mini report preview */}
            <div className="text-left space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-indigo-500/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                </div>
                <span className="text-[11px] font-bold" style={{ color: '#333333' }}>{t.title}</span>
              </div>
              {/* Fake sections */}
              {[
                { label: t.sections.winRate, value: '47.6%', color: '#10B981', free: true },
                { label: t.sections.settlement, value: '$75K — $500K', color: '#F59E0B', free: true },
                { label: t.sections.timeline, value: '8.7 months', color: '#333333', free: true },
                { label: t.sections.judge, value: '12 metrics', color: '#0D9488', free: false },
                { label: t.sections.cost, value: '$45K — $263K', color: '#EF4444', free: false },
                { label: t.sections.risk, value: 'Score: 72/100', color: '#A78BFA', free: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg px-3 py-1.5" style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid var(--border-default)' }}>
                  <span className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{
                      background: s.free ? 'rgba(16,185,129,0.1)' : 'rgba(17,17,17,0.1)',
                      color: s.free ? '#10B981' : '#333333',
                    }}>
                      {s.free ? t.free : t.premium}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <span className="px-4 py-2 rounded-lg text-[12px] font-bold" style={{ background: '#333333', color: '#fff' }}>
              {t.cta}
            </span>
          </div>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
          onKeyDown={(e) => { if (e.key === 'Escape') setIsOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-report-title"
        >
          <div
            className="relative w-full max-w-[600px] max-w-[90vw] max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{ background: 'var(--bg-surface, #FFFFFF)', border: '1px solid var(--border-default)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5" style={{ background: 'var(--bg-surface, #FFFFFF)', borderBottom: '1px solid var(--border-default)' }}>
              <div>
                <h3 id="sample-report-title" className="text-base font-display font-extrabold" style={{ color: 'var(--fg-primary)' }}>{t.title}</h3>
                <p className="text-[11px]" style={{ color: 'var(--fg-subtle)' }}>{t.subtitle}</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5" style={{ border: '1px solid var(--border-default)' }} aria-label={lang === 'es' ? 'Cerrar modal' : 'Close modal'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Report content */}
            <div className="p-5 space-y-4">
              {/* Overview */}
              <ReportSection title={t.sections.overview} color="#333333" free>
                <div className="grid grid-cols-2 gap-3">
                  <Stat label={lang === 'es' ? 'Tipo de caso' : 'Case Type'} value={lang === 'es' ? 'Discriminacion Laboral' : 'Employment Discrimination'} />
                  <Stat label={lang === 'es' ? 'Estatuto' : 'Statute'} value="Title VII" />
                  <Stat label={lang === 'es' ? 'Distrito' : 'District'} value="S.D.N.Y." />
                  <Stat label={lang === 'es' ? 'Circuito' : 'Circuit'} value="2nd Circuit" />
                </div>
              </ReportSection>

              {/* Win Rate */}
              <ReportSection title={t.sections.winRate} color="#10B981" free>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-display font-extrabold" style={{ color: '#10B981' }}>47.6%</div>
                  <div>
                    <div className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                      {lang === 'es' ? 'Tasa de exito en juicio con jurado' : 'Jury trial win rate'}
                    </div>
                    <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
                      {lang === 'es' ? 'Juicio ante juez: 26%' : 'Bench trial: 26%'}
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full" style={{ width: '47.6%', background: 'linear-gradient(90deg, #10B981, #0D9488)' }} />
                </div>
              </ReportSection>

              {/* Settlement */}
              <ReportSection title={t.sections.settlement} color="#F59E0B" free>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {[
                    { label: 'P10', value: '$25K', opacity: 0.5 },
                    { label: 'P25', value: '$75K', opacity: 0.7 },
                    { label: 'P50', value: '$200K', opacity: 1 },
                    { label: 'P75', value: '$500K', opacity: 0.7 },
                    { label: 'P90', value: '$1.2M', opacity: 0.5 },
                  ].map(p => (
                    <div key={p.label} className="rounded-lg p-2" style={{ background: 'rgba(245,158,11,0.05)', opacity: p.opacity }}>
                      <div className="text-[13px] font-bold font-mono" style={{ color: '#F59E0B' }}>{p.value}</div>
                      <div className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{p.label}</div>
                    </div>
                  ))}
                </div>
              </ReportSection>

              {/* Timeline */}
              <ReportSection title={t.sections.timeline} color="#333333" free>
                <div className="text-2xl font-display font-extrabold mb-1" style={{ color: '#333333' }}>
                  8.7 <span className="text-sm font-normal" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'meses (mediana)' : 'months (median)'}</span>
                </div>
                <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
                  {lang === 'es' ? 'Basado en S.D.N.Y., Tabla C-4 de la AO' : 'Based on S.D.N.Y., AO Table C-4'}
                </div>
              </ReportSection>

              {/* Judge Analytics — premium */}
              <ReportSection title={t.sections.judge} color="#0D9488" premium>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Stat label={lang === 'es' ? 'Casos asignados' : 'Cases assigned'} value="1,247" color="#0D9488" />
                  <Stat label={lang === 'es' ? 'Tasa MSJ' : 'MSJ grant rate'} value="34%" color="#F59E0B" />
                  <Stat label={lang === 'es' ? 'Mediana a juicio' : 'Median to trial'} value="14.2mo" color="#333333" />
                </div>
              </ReportSection>

              {/* Cost — premium */}
              <ReportSection title={t.sections.cost} color="#EF4444" premium>
                <div className="text-xl font-display font-extrabold" style={{ color: '#EF4444' }}>
                  $45K — $263K
                </div>
                <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
                  {lang === 'es' ? 'Rango estimado de costos de litigio (complejidad moderada)' : 'Estimated litigation cost range (moderate complexity)'}
                </div>
              </ReportSection>

              {/* Risk — premium */}
              <ReportSection title={t.sections.risk} color="#A78BFA" premium>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: '3px solid #A78BFA', background: 'rgba(167,139,250,0.1)' }}>
                    <span className="text-lg font-display font-extrabold" style={{ color: '#A78BFA' }}>72</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold" style={{ color: '#A78BFA' }}>
                      {lang === 'es' ? 'Posicion Moderada' : 'Moderate Position'}
                    </div>
                    <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
                      {lang === 'es' ? 'Basado en tasa de exito, tasa de acuerdo y tiempo' : 'Based on win rate, settlement rate, and timeline'}
                    </div>
                  </div>
                </div>
              </ReportSection>
            </div>

            {/* Footer CTA */}
            <div className="sticky bottom-0 p-5" style={{ background: 'var(--bg-surface, #FFFFFF)', borderTop: '1px solid var(--border-default)' }}>
              <button type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl text-[13px] font-bold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #111111, #333333)', color: '#fff' }}
              >
                {t.getReport}
              </button>
              <p className="text-[9px] text-center mt-2" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ReportSection({ title, color, free, premium, children }: { title: string; color: string; free?: boolean; premium?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4" style={{ background: 'rgba(15,23,42,0.5)', border: `1px solid ${color}20` }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[12px] font-bold" style={{ color }}>{title}</h4>
        {free && <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>FREE</span>}
        {premium && <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(17,17,17,0.1)', color: '#333333' }}>PREMIUM</span>}
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="text-[12px] font-bold font-mono" style={{ color: color || 'var(--fg-primary)' }}>{value}</div>
      <div className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{label}</div>
    </div>
  );
}
