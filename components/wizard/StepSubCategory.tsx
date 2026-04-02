'use client';

import React from 'react';
import { CategoryIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { WizardProgress } from '../ui/WizardProgress';
import { StepSubCategoryProps } from './WizardTypes';

const INITIAL_SHOW = 8;

export function StepSubCategory({
  lang,
  t,
  toast,
  go,
  sit,
  setSpec,
  naturalInput,
  setNaturalInput,
  aiSuggestions,
  showAllSubcats,
  setShowAllSubcats,
}: StepSubCategoryProps) {
  if (!sit) return null;

  const hasMore = sit.opts.length > INITIAL_SHOW;

  return (
    <div className="max-w-xl mx-auto py-6 wizard-step-enter">
      <WizardProgress step={1} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_report]} />
      <BackButton go={go} lang={lang} sit={sit} setShowAllSubcats={setShowAllSubcats} />
      <Reveal>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${sit.color}12` }}>
            <CategoryIcon name={sit.icon} color={sit.color} size={20} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">{sit.q}</h2>
        </div>
        <p className="text-[var(--fg-muted)] mb-4 ml-[52px]">{t.choose_specific}</p>

        {/* AI Helper */}
        <div className="mb-5 p-4 rounded-2xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/></svg>
            <span className="text-[13px] font-semibold" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{lang === 'es' ? '¿No estás seguro? Descríbelo' : 'Not sure? Describe it'}</span>
          </div>
          <input type="text" value={naturalInput} onChange={e => setNaturalInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && naturalInput.trim()) {
                const matched = aiSuggestions.find((s: any) => s.sit.id === sit.id);
                if (matched) { setSpec(matched.opt); go(3); toast(lang === 'es' ? `Detectado: ${matched.opt.d}` : `Matched: ${matched.opt.d}`); }
              }
            }}
            placeholder={lang === 'es' ? `Ej: "me despidieron sin razón"` : `e.g. "I was fired without reason"`}
            className="w-full text-[14px] rounded-xl transition-all input-frosted focus-ring-premium"
            aria-label={lang === 'es' ? 'Describe tu situación' : 'Describe your situation'}
            style={{ color: '#F0F2F5', padding: '12px 16px' }} />
          {naturalInput.trim() && aiSuggestions.filter((s: any) => s.sit.id === sit.id).length > 0 && (
            <div className="mt-2 space-y-1">
              {aiSuggestions.filter((s: any) => s.sit.id === sit.id).slice(0, 3).map((s: any, i: number) => (
                <button key={i} onClick={() => { setSpec(s.opt); go(3); toast(lang === 'es' ? `Seleccionado: ${s.opt.d}` : `Selected: ${s.opt.d}`); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[13px] transition-all bg-transparent border-none"
                  style={{ color: '#E2E8F0' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={sit.color} strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  {s.opt.label}
                  <span className="ml-auto text-[11px]" style={{ color: 'var(--fg-muted)' }}>{Math.min(Math.round(s.score * 8), 99)}%</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#9BA8BE' }}>
          {lang === 'es' ? 'O selecciona abajo' : 'Or select below'}
        </div>
        <div className="space-y-2.5 stagger">
          {(hasMore && !showAllSubcats ? sit.opts.slice(0, INITIAL_SHOW) : sit.opts).map((o: any, i: number) => (
            <button key={i} onClick={() => { setSpec(o); go(3); }}
              className="category-card flex items-center w-full p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, rgba(20,28,45,0.9), rgba(15,23,42,0.8))', border: '1.5px solid rgba(51,65,85,0.5)', boxShadow: '0 1px 3px rgba(11,18,33,.02), inset 0 1px 0 rgba(255,255,255,0.03)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = sit.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1E293B'}>
              <div className="w-2 h-2 rounded-full flex-shrink-0 mr-3 transition-transform" style={{ background: sit.color, opacity: 0.5 }} />
              <span className="flex-1 text-[15px]">{o.label}</span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${sit.color}08` }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={sit.color} strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
            </button>
          ))}
        </div>
        {hasMore && !showAllSubcats && (
          <button onClick={() => setShowAllSubcats(true)}
            className="w-full mt-3 py-3 text-[14px] font-medium rounded-xl cursor-pointer transition-all bg-transparent border-none"
            style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>
            {lang === 'es' ? `Mostrar ${sit.opts.length - INITIAL_SHOW} más →` : `Show ${sit.opts.length - INITIAL_SHOW} more →`}
          </button>
        )}
      </Reveal>
    </div>
  );
}

function BackButton({ go, lang, sit, setShowAllSubcats }: { go: (step: number) => void; lang: string; sit: any; setShowAllSubcats: (show: boolean) => void }) {
  return (
    <button onClick={() => { setShowAllSubcats(false); go(1); }} className="text-sm bg-transparent border-none cursor-pointer mb-4 flex items-center gap-1.5 transition-all hover:gap-2.5 group" style={{ color: 'var(--fg-muted)' }} aria-label={lang === 'es' ? 'Volver' : 'Go back'}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-0.5"><polyline points="15 18 9 12 15 6" /></svg>
      {lang === 'es' ? 'Volver' : 'Back'}
    </button>
  );
}
