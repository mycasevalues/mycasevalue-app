'use client';

/* EXTRACTED from MyCaseValue.tsx — WizardProgress step indicator */

import React from 'react';

interface WizardProgressProps {
  step: number;
  labels?: string[];
  lang?: string;
}

export function WizardProgress({ step, labels, lang = 'en' }: WizardProgressProps) {
  const defaultLabels = labels || (lang === 'es' ? ['Situación', 'Detalles', 'Informe'] : ['Situation', 'Details', 'Report']);
  const total = defaultLabels.length;
  // Map internal step numbers (1,2,3) to progress positions
  const progressStep = step <= 2 ? step : Math.min(step, total);
  return (
    <div className="mb-8 no-print">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? `Paso ${progressStep}/${total}` : `Step ${progressStep}/${total}`}</span>
        <div className="flex gap-1.5 flex-1">
          {defaultLabels.map((_, i) => (
            <div key={i} className="flex-1 h-2 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ background: i + 1 <= progressStep ? 'linear-gradient(135deg, #111111, #333333)' : '#E5E7EB' }}>
              {i + 1 <= progressStep && (
                <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="wizard-labels">
        {defaultLabels.map((l, i) => (
          <span key={i} className={`step-label transition-all ${i + 1 <= progressStep ? 'active' : ''}`}
            style={{
              fontWeight: i + 1 <= progressStep ? 600 : 400,
              color: i + 1 <= progressStep ? '#111111' : '#6B7280',
              textShadow: i + 1 <= progressStep ? '0 0 12px rgba(17,17,17,0.2)' : 'none',
            }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export default WizardProgress;
