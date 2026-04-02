'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface StateWinRateProps {
  stateCode: string;
  stateRates?: Record<string, number>;
}

export function StateWinRate({ stateCode, stateRates }: StateWinRateProps) {
  if (!stateRates || !stateCode || !stateRates[stateCode]) return null;
  const rate = stateRates[stateCode];
  const color = rate > 55 ? '#0D9488' : rate > 40 ? '#D97706' : '#E87461';
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold" style={{ background: `${color}10`, color }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
      {stateCode}: {rate}% win rate
    </div>
  );
}

export default StateWinRate;
