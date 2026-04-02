'use client';

import React, { useState, useEffect, useRef } from 'react';
import { matchCaseType } from '../../lib/ai-matcher';

interface AiCaseEvalPreviewProps {
  lang?: 'en' | 'es';
  onSelectCase?: (nos: string, label: string, category: string) => void;
}

const TYPING_LINES_EN = [
  'Analyzing your case details...',
  'Cross-referencing 5.1M+ federal case outcomes...',
  'Identifying matching district patterns...',
  'Calculating settlement percentile range...',
  'Generating Case Intelligence Report...',
];

const TYPING_LINES_ES = [
  'Analizando los detalles de su caso...',
  'Cruzando 5.1M+ resultados de casos federales...',
  'Identificando patrones de distrito coincidentes...',
  'Calculando rango de percentil de acuerdos...',
  'Generando Informe de Inteligencia de Caso...',
];

const EXAMPLE_PROMPTS_EN = [
  'I was fired after filing a harassment complaint at work...',
  'My landlord refuses to return my security deposit...',
  'I was injured in a car accident caused by a distracted driver...',
  'My employer has not paid overtime wages for 6 months...',
];

const EXAMPLE_PROMPTS_ES = [
  'Me despidieron después de presentar una queja de acoso...',
  'Mi arrendador se niega a devolver mi depósito de seguridad...',
  'Fui herido en un accidente de auto por un conductor distraído...',
  'Mi empleador no ha pagado horas extras por 6 meses...',
];

const RESULT_METRICS = [
  { label: 'Win Rate', labelEs: 'Tasa de Éxito', value: '47.6%', color: '#10B981' },
  { label: 'Settlement Range', labelEs: 'Rango de Acuerdo', value: '$75K – $500K', color: '#F59E0B' },
  { label: 'Median Timeline', labelEs: 'Tiempo Medio', value: '8.7 months', color: '#333333' },
  { label: 'Cases Analyzed', labelEs: 'Casos Analizados', value: '12,847', color: '#0D9488' },
];

export default function AiCaseEvalPreview({ lang = 'en', onSelectCase }: AiCaseEvalPreviewProps) {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done' | 'matched'>('idle');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [matchedCase, setMatchedCase] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEs = lang === 'es';
  const lines = isEs ? TYPING_LINES_ES : TYPING_LINES_EN;
  const examples = isEs ? EXAMPLE_PROMPTS_ES : EXAMPLE_PROMPTS_EN;

  // Rotate placeholder text
  useEffect(() => {
    if (phase !== 'idle') return;
    const timer = setInterval(() => {
      setPlaceholderIdx(p => (p + 1) % examples.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [phase, examples.length]);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (lineIdx >= lines.length) {
      // After all lines are done, try to match the case type
      const matched = matchCaseType(userInput);
      if (matched && matched.confidence > 0.3) {
        setMatchedCase(matched);
        setPhase('matched');
      } else {
        setPhase('done');
      }
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
  }, [phase, lineIdx, charIdx, lines, userInput]);

  function start() {
    if (!userInput.trim()) return;
    setPhase('typing');
    setLineIdx(0);
    setCharIdx(0);
  }

  function reset() {
    setPhase('idle');
    setLineIdx(0);
    setCharIdx(0);
    setUserInput('');
    setMatchedCase(null);
  }

  function useExample(text: string) {
    setUserInput(text);
    textareaRef.current?.focus();
  }

  const t = isEs ? {
    badge: 'EVALUACIÓN CON IA',
    title: 'Describa su situación, nosotros analizamos los datos',
    sub: 'Cuéntenos qué pasó en sus propias palabras. Nuestro motor de análisis cruzará sus detalles contra millones de resultados federales.',
    placeholder: examples[placeholderIdx],
    cta: 'Analizar mi caso',
    reset: 'Reiniciar',
    complete: 'Análisis completo',
    generating: 'Generando...',
    disclaimer: 'Vista previa del motor de análisis. Los informes reales incluyen datos completos específicos de su caso. Esto no es asesoría legal.',
    tryNow: 'Genere su informe gratis',
    examplesLabel: 'Pruebe un ejemplo:',
    inputLabel: 'Describa su situación legal',
  } : {
    badge: 'AI CASE EVALUATION',
    title: 'Describe your situation, we analyze the data',
    sub: 'Tell us what happened in your own words. Our analysis engine will cross-reference your details against millions of federal outcomes.',
    placeholder: examples[placeholderIdx],
    cta: 'Analyze my case',
    reset: 'Reset',
    complete: 'Analysis complete',
    generating: 'Generating...',
    disclaimer: 'Analysis engine preview. Actual reports include full data specific to your case. This is not legal advice.',
    tryNow: 'Generate your free report',
    examplesLabel: 'Try an example:',
    inputLabel: 'Describe your legal situation',
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/><path d="M10 20h4"/>
          </svg>
          {t.badge}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {t.title}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>
      </div>

      {/* Input + Analysis area */}
      <div className="max-w-[560px] mx-auto">
        {phase === 'idle' && (
          <div className="space-y-4">
            {/* Text input area */}
            <div className="relative">
              <label htmlFor="ai-case-input" className="sr-only">{t.inputLabel}</label>
              <textarea
                ref={textareaRef}
                id="ai-case-input"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder={t.placeholder}
                rows={4}
                className="w-full rounded-xl p-4 text-[14px] leading-relaxed resize-none transition-all focus:outline-none"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  color: '#374151',
                  caretColor: '#A78BFA',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); start(); } }}
              />
              <div className="absolute bottom-3 right-3 text-[10px]" style={{ color: '#4B5563' }}>
                {userInput.length}/500
              </div>
            </div>

            {/* Example prompts */}
            <div>
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-2" style={{ color: '#9CA3AF' }}>
                {t.examplesLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                  <button type="button"
                    key={i}
                    onClick={() => useExample(ex)}
                    className="px-4 py-2.5 rounded-lg text-[11px] transition-all hover:scale-[1.02]"
                    style={{
                      background: 'rgba(139,92,246,0.08)',
                      border: '1px solid rgba(139,92,246,0.15)',
                      color: '#A78BFA',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {ex.length > 45 ? ex.slice(0, 45) + '...' : ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Analyze button */}
            <button type="button"
              onClick={start}
              disabled={!userInput.trim()}
              className="w-full py-3 rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.01]"
              style={{
                background: userInput.trim() ? 'linear-gradient(135deg, #7C3AED, #A78BFA)' : 'rgba(139,92,246,0.15)',
                color: userInput.trim() ? '#fff' : '#9CA3AF',
                border: 'none',
                cursor: userInput.trim() ? 'pointer' : 'not-allowed',
                boxShadow: userInput.trim() ? '0 4px 20px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/><path d="M10 20h4"/>
                </svg>
                {t.cta}
              </span>
            </button>
          </div>
        )}

        {/* Analysis terminal */}
        {(phase === 'typing' || phase === 'done' || phase === 'matched') && (
          <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(139,92,246,0.2)' }}>
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
              {(phase === 'done' || phase === 'matched') && (
                <span className="ml-auto text-[9px] font-mono" style={{ color: '#10B981' }}>{t.complete}</span>
              )}
            </div>

            {/* User input echo */}
            <div className="px-4 py-2 text-[11px] font-mono" style={{ background: 'rgba(139,92,246,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#A78BFA' }}>
              <span style={{ color: '#9CA3AF' }}>{'>'} </span>
              {userInput.length > 100 ? userInput.slice(0, 100) + '...' : userInput}
            </div>

            {/* Terminal body */}
            <div className="px-4 py-4 font-mono text-[11px] min-h-[160px]" style={{ color: '#6B7280' }}>
              {phase === 'typing' && (
                <div className="space-y-1.5">
                  {lines.slice(0, lineIdx + 1).map((line, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: i < lineIdx ? '#10B981' : '#A78BFA' }}>
                        {i < lineIdx ? '\u2713' : '\u25B8'}
                      </span>
                      <span style={{ color: i < lineIdx ? '#9CA3AF' : '#374151' }}>
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
                        <span style={{ color: '#10B981' }}>{'\u2713'}</span>
                        <span style={{ color: '#9CA3AF' }}>{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* Result metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    {RESULT_METRICS.map((m, i) => (
                      <div key={i} className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="text-[14px] font-bold" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-[9px]" style={{ color: '#9CA3AF' }}>{isEs ? m.labelEs : m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-2">
                    <button type="button" onClick={reset} className="px-4 py-2.5 rounded-lg text-[10px] font-semibold transition-all" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', cursor: 'pointer', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {t.reset}
                    </button>
                    <button type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="px-4 py-2.5 rounded-lg text-[10px] font-semibold transition-all"
                      style={{ background: 'linear-gradient(135deg, #111111, #333333)', color: '#fff', border: 'none', cursor: 'pointer', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {t.tryNow}
                    </button>
                  </div>
                </div>
              )}

              {phase === 'matched' && matchedCase && (
                <div className="space-y-3">
                  {/* Completed lines */}
                  <div className="space-y-1 mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {lines.map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span style={{ color: '#10B981' }}>{'\u2713'}</span>
                        <span style={{ color: '#9CA3AF' }}>{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* Matched case display */}
                  <div className="rounded-lg p-3" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div className="text-[11px] font-bold mb-1" style={{ color: '#10B981' }}>CASE TYPE DETECTED</div>
                    <div className="text-[14px] font-semibold mb-1" style={{ color: '#374151' }}>{matchedCase.label}</div>
                    <div className="text-[10px]" style={{ color: '#6B7280' }}>Confidence: {Math.round(matchedCase.confidence * 100)}%</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-2">
                    <button type="button" onClick={reset} className="flex-1 px-4 py-2.5 rounded-lg text-[10px] font-semibold transition-all" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', cursor: 'pointer', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {t.reset}
                    </button>
                    <button type="button"
                      onClick={() => onSelectCase && onSelectCase(matchedCase.nos, matchedCase.label, matchedCase.category)}
                      className="flex-1 px-4 py-2.5 rounded-lg text-[10px] font-semibold transition-all"
                      style={{ background: 'linear-gradient(135deg, #10B981, #14B8A6)', color: '#fff', border: 'none', cursor: 'pointer', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      Get Your Report →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}
