'use client';

import React from 'react';

interface TimelineRangeProps {
  stages: { label: string; duration: string; color: string; pct: number }[];
  totalLabel?: string;
  totalDuration?: string;
  lang?: 'en' | 'es';
}

export function TimelineRange({ stages, totalLabel, totalDuration, lang = 'en' }: TimelineRangeProps) {
  return (
    <div className="w-full" role="img" aria-label={lang === 'es' ? 'Línea de tiempo del caso' : 'Case timeline'}>
      {/* Visual timeline bar */}
      <div className="flex gap-[2px] h-8 overflow-hidden mb-4" style={{ borderRadius: '6px' }}>
        {stages.map((stage, i) => (
          <div
            key={i}
            className="h-full relative group transition-all duration-300 hover:opacity-90"
            style={{
              width: `${stage.pct}%`,
              background: stage.color,
              minWidth: '24px',
            }}
          >
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
              style={{ background: '#FFFFFF', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '6px' }}>
              {stage.label}: {stage.duration}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 flex-shrink-0" style={{ background: stage.color, borderRadius: '6px' }} />
            <div>
              <span className="text-[12px] font-semibold text-[#4B5563]">{stage.label}</span>
              <span className="text-[12px] font-data font-bold ml-1.5" style={{ color: stage.color }}>{stage.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      {totalDuration && (
        <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
          <span className="text-[12px] font-semibold text-[#4B5563]">{totalLabel || (lang === 'es' ? 'Duración total media' : 'Median total duration')}</span>
          <span className="text-lg font-display font-bold" style={{ color: '#212529' }}>{totalDuration}</span>
        </div>
      )}

      {/* Screen reader accessible data */}
      <table className="sr-only">
        <caption>{lang === 'es' ? 'Fases del caso' : 'Case stages'}</caption>
        <thead>
          <tr><th scope="col">{lang === 'es' ? 'Fase' : 'Stage'}</th><th scope="col">{lang === 'es' ? 'Duración' : 'Duration'}</th></tr>
        </thead>
        <tbody>
          {stages.map((s, i) => (
            <tr key={i}><td>{s.label}</td><td>{s.duration}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
