'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface DidYouKnowFactsProps {
  caseType?: string;
  lang?: string;
}

export function DidYouKnowFacts({ caseType, lang = 'en' }: DidYouKnowFactsProps) {
  const es = lang === 'es';
  const facts = es
    ? [
      'El 67% de los casos de discriminación laboral se resuelven antes del juicio',
      'El tiempo promedio desde la presentación hasta la resolución es de 10.2 meses',
      'Tener un abogado aumenta la tasa de éxito ~3.4 veces en promedio',
      'Los acuerdos ocurren con mayor frecuencia entre los meses 4 y 8 del litigio',
    ]
    : [
      '67% of employment discrimination cases settle before trial',
      'The average time from filing to resolution is 10.2 months',
      'Having an attorney increases win rates by ~3.4x on average',
      'Settlement agreements occur most often in months 4-8 of litigation',
    ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {facts.map((fact, i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-gradient-to-br from-[#162035] to-[#131B2E] border border-[var(--border-default)] transition-transform hover:scale-[1.01]"
        >
          <div className="flex gap-2">
            <span className="text-lg" aria-hidden="true">
              🎓
            </span>
            <p className="text-[12px] text-[var(--fg-muted)] leading-relaxed">{fact}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DidYouKnowFacts;
