'use client';

import React, { useState, useEffect } from 'react';

interface AiCaseEvalPreviewProps {
  lang?: 'en' | 'es';
}

const TYPING_LINES_EN = [
  'Analyzing employment discrimination claim...',
  'Cross-referencing 4.2M+ federal case outcomes...',
  'Matching to S.D.N.Y. district patterns...',
  'Calculating settlement percentile range...',
  'Generating Case Intelligence Report...',
];

const TYPING_LINES_ES = [
  'Analizando reclamo de discriminacion laboral...',
  'Cruzando 4.2M+ resultados de casos federales...',
  'Comparando con patrones del distrito S.D.N.Y....',
  'Calculando rango de percentil de acuerdos...',
  'Generando Informe de Inteligencia de Caso...',
];

const RESULT_METRICS = [
  { label: 'Win Rate', labelEs: 'Tasa de Exito', value: '47.6%', color: '#10B981' },
  { label: 'Settlement Range', labelEs: 'Rango de Acuerdo', value: '$75K – $500K', color: '#F59E0B' },
  { label: 'Median Timeline', labelEs: 'Tiempo Medio', value: '8.7 months', color: '#6366F1' },
  { label: 'Cases Analyzed', labelEs: 'Casos Analizados', value: '12,847', color: '#0D9488' },
];

export default function AiCaseEvalPreview({ lang = 'en' }: AiCaseEvalPreviewProps) {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done'>('idle');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const lines = lang === 'es' ? TYPING_LINES_ES : TYPING_LINES_EN;

  useEffect(() => {
    if (phase !== 'typing') return;
    if (lineIdx >= lines.length) {
      setPhase('done');
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const timer = setTimeout(() => setCharIdx(c => c + 1), 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, lineIdx, charIdx, lines]);

  function start() {
    setPhase('typing');
    setLineIdx(0);
    setCharIdx(0);
  }

  function reset() {
    setPhase('idle');
    setLineIdx(0);
    setCharIdx(0);
  }

  const t = lang === 'es' ? {
    badge: 'EVALUACION CON IA',
    title: 'Analisis de caso impulsado por inteligencia artificial',
    sub: 'Vea como nuestro motor de analisis cruza sus detalles contra millones de resultados federales',
    cta: 'Ejecutar demo en vivo',
    reset: 'Reiniciar',
    complete: 'Analisis completo',
    generating: 'Generando...',
    disclaimer: 'Vista previa del motor de analisis. Los informes reales incluyen datos completos especificos de su caso.',
    tryNow: 'Genere su informe gratis',
  } : {
    badge: 'AI EVALUATION',
    title: 'AI-powered case analysis engine',
    sub: 'See how our analysis engine cross-references your details against millions of federal outcomes',
    cta: 'Run live demo',
    reset: 'Reset',
    complete: 'Analysis complete',
    generating: 'Generating...',
    disclaimer: 'Analysis engine preview. Actual reports include full data specific to your case.',
    tryNow: 'Generate your free report',
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5">
            <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/><path d="M10 20h4"/>
          </svg>
          {t.badge}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {t.title}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>
      </div>

      {/* Terminal / analysis window */}
      <div className="max-w-[520px] mx-auto rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(139,92,246,0.2)' }}>
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#10B981' }} />
          </div>
          <span className="text-[10px] font-mono ml-2" style={{ color: 'var(--fg-subtle)' }}>
            mycasevalues — analysis engine
          </span>
          {phase === 'typing' && (
            <span className="ml-auto text-[9px] font-mono" style={{ color: '#A78BFA' }}>{t.generating}</span>
          )}
          {phase === 'done' && (
            <span className="ml-auto text-[9px] font-mono" style={{ color: '#10B981' }}>{t.complete}</span>
          )}
        </div>

        {/* Terminal body */}
        <div className="px-4 py-4 font-mono text-[11px] min-h-[180px]" style={{ color: '#94A3B8' }}>
          {phase === 'idle' && (
            <div className="flex flex-col items-center justify-center h-[160px] gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" opacity="0.4">
                <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/><path d="M10 20h4"/>
              </svg>
              <button
                onClick={start}
                className="px-5 py-2.5 rounded-lg text-[12px] font-semibold transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                {t.cta}
              </button>
            </div>
          )}

          {phase === 'typing' && (
            <div className="space-y-1.5">
              {lines.slice(0, lineIdx + 1).map((line, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: i < lineIdx ? '#10B981' : '#A78BFA' }}>
                    {i < lineIdx ? '✓' : '▸'}
                  </span>
                  <span style={{ color: i < lineIdx ? '#64748B' : '#E2E8F0' }}>
                    {i === lineIdx ? line.slice(0, charIdx) : line}
                    {i === lineIdx && <span className="inline-block w-1.5 h-3.5 ml-0.5" style={{ background: '#A78BFA', animation: 'blink 1s step-end infinite' }} />}
                  </span>
                </div>
              ))}
            </div>
          )}

          {phase === 'done' && (
            <div className="space-y-3">
              {/* Completed lines */}
              <div className="space-y-1 mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {lines.map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: '#10B981' }}>✓</span>
                    <span style={{ color: '#64748B' }}>{line}</span>
                  </div>
                ))}
              </div>

              {/* Result metrics */}
              <div className="grid grid-cols-2 gap-2">
                {RESULT_METRICS.map((m, i) => (
                  <div key={i} className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="text-[14px] font-bold" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-[9px]" style={{ color: '#64748B' }}>{lang === 'es' ? m.labelEs : m.label}</div>
                  </div>
                ))}
              </div>

              {/* Reset + CTA */}
              <div className="flex gap-2 mt-2">
                <button onClick={reset} className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#64748B', cursor: 'pointer' }}>
                  {t.reset}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}
