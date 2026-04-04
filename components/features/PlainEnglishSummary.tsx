'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface PlainEnglishSummaryProps {
  text: string;
  lang?: string;
}

export function PlainEnglishSummary({ text, lang = 'en' }: PlainEnglishSummaryProps) {
  if (!text) return null;
  const es = lang === 'es';
  return (
    <div className="bg-gradient-to-br from-[#FFFFFF] to-[#FFFFFF] rounded-2xl border border-[var(--border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-4">
      <div className="flex items-start gap-3">
        <div className="text-3xl" aria-hidden="true">
          💬
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: '#8B5CF6' }}>
            {es ? 'RESUMEN EN LENGUAJE SIMPLE' : 'PLAIN ENGLISH SUMMARY'}
          </div>
          <p className="text-[14px] leading-relaxed text-[#6B7280] italic">
            &ldquo;{text}&rdquo;
          </p>
          <div className="text-[10px] text-[#6B7280] mt-2">
            {es ? 'Generado a partir de datos judiciales, no es asesoría legal.' : 'Generated from court data, not legal advice.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlainEnglishSummary;
