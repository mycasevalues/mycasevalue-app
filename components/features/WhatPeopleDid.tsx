'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface NextStep {
  action: string;
  pct: number;
  icon: string;
}

export interface WhatPeopleDidProps {
  lang?: string;
}

export function WhatPeopleDid({ lang = 'en' }: WhatPeopleDidProps) {
  const es = lang === 'es';
  const nextSteps: NextStep[] = [
    { action: es ? 'Obtener consulta gratuita' : 'Get a free consultation', pct: 78, icon: '' },
    { action: es ? 'Reunir documentación' : 'Gather documentation', pct: 92, icon: '' },
    { action: es ? 'Presentar una queja' : 'File a complaint', pct: 64, icon: '' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {nextSteps.map((step, i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-[var(--border-default)] bg-[#FFFFFF] text-center transition-transform hover:scale-[1.02]"
        >
          <div className="text-3xl mb-2" aria-hidden="true">
            {step.icon}
          </div>
          <div className="text-[13px] font-medium text-[var(--fg-secondary)] mb-2">{step.action}</div>
          <div className="flex items-end justify-center gap-1">
            <div className="text-[22px] font-display font-bold" style={{ color: '#8B5CF6' }}>
              {step.pct}%
            </div>
            <div className="text-[10px] text-[#6B7280] pb-1">{es ? 'de usuarios' : 'of users'}</div>
          </div>
          <div className="mt-2 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${step.pct}%`,
                background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              }}
              role="progressbar"
              aria-valuenow={step.pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default WhatPeopleDid;
