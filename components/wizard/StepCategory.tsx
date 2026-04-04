'use client';

import React from 'react';
import { CategoryIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { WizardProgress } from '../ui/WizardProgress';
import { StepCategoryProps } from './WizardTypes';

export function StepCategory({
  lang,
  t,
  toast,
  go,
  setSit,
  setAmount,
  SITS,
}: StepCategoryProps) {
  return (
    <div className="max-w-xl mx-auto py-8 wizard-step-enter">
      <WizardProgress step={1} lang={lang} labels={[t.wiz_situation, t.wiz_specifics || (lang === 'es' ? 'Específicos' : 'Specifics'), t.wiz_details, t.wiz_report]} />
      <BackButton go={go} lang={lang} />
      <Reveal>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.1), rgba(201,165,78,0.05))' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">{t.what_happened}</h2>
        </div>
        <p className="text-[#6B7280] mb-6 ml-[52px]">{t.select_closest}</p>
        <div className="space-y-2.5 stagger">
          {SITS.map(si => (
            <button type="button" key={si.id} onClick={() => { setSit(si); setAmount(si.dm); go(2); }}
              className="category-card flex items-center gap-4 w-full p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 hover:shadow-lg group"
              style={{ background: '#FFFFFF', border: '1.5px solid #E5E0D8', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = si.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E0D8'}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform" style={{ background: `${si.color}10` }}>
                <CategoryIcon name={si.icon} color={si.color} size={22} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[15px]">{si.label}</div>
                <div className="text-[13px] text-[#6B7280] mt-0.5">{si.sub}</div>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all" style={{ background: `${si.color}08` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={si.color} strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function BackButton({ go, lang }: { go: (step: number) => void; lang: string }) {
  return (
    <button type="button" onClick={() => go(0)} className="text-sm bg-transparent border-none cursor-pointer mb-4 flex items-center gap-1.5 transition-all hover:gap-2.5 group" style={{ color: '#6B7280' }} aria-label={lang === 'es' ? 'Volver' : 'Go back'}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-0.5"><polyline points="15 18 9 12 15 6" /></svg>
      {lang === 'es' ? 'Volver' : 'Back'}
    </button>
  );
}
