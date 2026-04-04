'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface CaseComparisonScaleProps {
  winRate: number;
  lang?: string;
}

export function CaseComparisonScale({ winRate, lang = 'en' }: CaseComparisonScaleProps) {
  const es = lang === 'es';
  const labels = es ? ['Difícil', 'Promedio', 'Sobre prom.', 'Fuerte'] : ['Challenging', 'Average', 'Above Avg', 'Strong'];
  const getLabel = (wr: number) => {
    if (es) {
      if (wr < 30) return 'Difícil';
      if (wr < 40) return 'Promedio';
      if (wr < 50) return 'Sobre promedio';
      return 'Fuerte';
    }
    if (wr < 30) return 'Challenging';
    if (wr < 40) return 'Average';
    if (wr < 50) return 'Above Avg';
    return 'Strong';
  };

  return (
    <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[var(--border-default)] my-4">
      <div className="text-[11px] font-bold text-[#6B7280] tracking-[2px] mb-4 uppercase">
        {es ? 'Cómo se compara tu caso' : 'How your case compares'}
      </div>
      <div className="relative h-12 bg-gradient-to-r from-red-200 via-amber-200 to-green-200 rounded-full overflow-hidden flex items-center px-2">
        <div
          className="absolute h-full flex items-center transition-all duration-500"
          style={{
            left: `${(winRate / 100) * 100}%`,
            transform: 'translateX(-50%)',
          }}
          role="progressbar"
          aria-valuenow={Math.round(winRate)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="w-6 h-6 bg-[#FFFFFF] rounded-full shadow-md border-2 border-[var(--border-muted)]" />
        </div>
      </div>
      <div className="flex justify-between mt-2 px-1">
        {labels.map((l, i) => (
          <div key={i} className="text-[10px] font-medium text-[#6B7280]">
            {l}
          </div>
        ))}
      </div>
      <div className="text-center mt-3 text-sm font-semibold" style={{ color: '#8B5CF6' }}>
        {es ? 'Tu caso' : 'Your case'}: {winRate.toFixed(1)}% {es ? 'tasa de éxito' : 'win rate'} — {getLabel(winRate)}
      </div>
    </div>
  );
}

export default CaseComparisonScale;
