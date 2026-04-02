'use client';

import React, { useState } from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface CaseStats {
  wr: number;
  timeline: string;
  settle: number;
  volume: number;
  label: string;
}

export interface CaseTypeStatsPreviewProps {
  lang?: string;
}

export function CaseTypeStatsPreview({ lang = 'en' }: CaseTypeStatsPreviewProps) {
  const [activeType, setActiveType] = useState('work');
  const es = lang === 'es';
  const stats: Record<string, CaseStats> = {
    work: { wr: 38.4, timeline: '11.2 mo', settle: 32, volume: 287420, label: es ? 'Empleo' : 'Employment' },
    injury: { wr: 54.1, timeline: '8.6 mo', settle: 48, volume: 156230, label: es ? 'Lesiones' : 'Injury' },
    consumer: { wr: 42.3, timeline: '10.4 mo', settle: 41, volume: 412890, label: es ? 'Consumidor' : 'Consumer' },
  };
  const s = stats[activeType];

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[var(--border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
      <div className="mb-4 flex gap-2 flex-wrap">
        {Object.keys(stats).map((k) => (
          <button type="button"
            key={k}
            onClick={() => setActiveType(k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeType === k
                ? 'bg-[rgba(17,17,17,0.15)] text-[#8B5CF6] border border-[rgba(17,17,17,0.4)] shadow-[0_0_12px_rgba(17,17,17,0.15)]'
                : 'bg-[var(--bg-elevated)] text-[var(--fg-muted)] border border-[var(--border-muted)] hover:bg-[rgba(17,17,17,0.08)] hover:text-[var(--fg-secondary)]'
            }`}
            aria-selected={activeType === k}
          >
            {stats[k].label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { l: es ? 'Tasa de éxito' : 'Win Rate', v: `${s.wr}%`, c: '#0D9488' },
          { l: es ? 'Tiempo promedio' : 'Avg Timeline', v: s.timeline, c: '#FFFFFF' },
          { l: es ? 'Acuerdos %' : 'Settlement %', v: `${s.settle}%`, c: '#111111' },
          { l: es ? 'Casos analizados' : 'Cases Analyzed', v: `${(s.volume / 1000).toFixed(0)}K`, c: '#111111' },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center p-4 rounded-xl transition-transform hover:scale-[1.03]"
            style={{ background: `${stat.c}08` }}
          >
            <div className="text-2xl font-display font-bold" style={{ color: stat.c, letterSpacing: '-1px' }}>
              {stat.v}
            </div>
            <div className="text-[11px] font-medium mt-1" style={{ color: 'var(--fg-muted)' }}>
              {stat.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseTypeStatsPreview;
