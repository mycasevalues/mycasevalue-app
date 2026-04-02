'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface Cost {
  path: string;
  min: number;
  max: number;
  color: string;
}

export interface LegalCostComparisonProps {
  lang?: string;
}

export function LegalCostComparison({ lang = 'en' }: LegalCostComparisonProps) {
  const es = lang === 'es';
  const costs: Cost[] = [
    { path: es ? 'Mediación' : 'Mediation', min: 3, max: 10, color: 'var(--accent-secondary)' },
    { path: es ? 'Acuerdo' : 'Settlement', min: 15, max: 50, color: 'var(--accent-primary)' },
    { path: es ? 'Juicio completo' : 'Full Trial', min: 50, max: 200, color: '#E87461' },
  ];

  return (
    <div className="bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF] rounded-2xl border border-[var(--border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
      <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-4 uppercase">
        {es ? 'Costos promedio por vía legal' : 'Average costs of legal paths'}
      </div>
      <div className="space-y-4">
        {costs.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-[var(--fg-secondary)]">{c.path}</span>
              <span className="text-sm font-semibold" style={{ color: c.color }}>
                ${c.min}K – ${c.max}K+
              </span>
            </div>
            <div className="h-3 bg-[#FFFFFF] rounded-full border border-[var(--border-default)] overflow-hidden relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(c.max / 200) * 100}%`,
                    background: `linear-gradient(90deg, ${c.color}40, ${c.color})`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
        <div className="text-[12px] text-amber-900">
          <strong> {es ? 'Dato:' : 'Insight:'}</strong>{' '}
          {es
            ? 'El 67% de los casos se resuelven antes de llegar a juicio, ahorrando tiempo y dinero.'
            : '67% of cases settle before trial, often saving time and money.'}
        </div>
      </div>
    </div>
  );
}

export default LegalCostComparison;
