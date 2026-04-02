'use client';

import React, { useMemo } from 'react';

interface CaseRiskScoreProps {
  lang?: 'en' | 'es';
  isPremium?: boolean;
  onUpgrade?: () => void;
  caseType?: string;
  winRate?: number;
  settlementRate?: number;
  medianMonths?: number;
}

function computeRiskScore(winRate: number, settlementRate: number, medianMonths: number): {
  score: number;
  level: string;
  level_es: string;
  color: string;
  factors: { label: string; label_es: string; value: string; impact: 'positive' | 'neutral' | 'negative' }[];
} {
  // Score from 0-100 (higher = more favorable for plaintiff)
  let score = 50;

  // Win rate factor (0-30 points)
  if (winRate >= 50) score += 30;
  else if (winRate >= 35) score += 20;
  else if (winRate >= 25) score += 10;
  else score -= 10;

  // Settlement rate factor (0-25 points)
  if (settlementRate >= 60) score += 25;
  else if (settlementRate >= 40) score += 15;
  else if (settlementRate >= 20) score += 5;
  else score -= 5;

  // Timeline factor (0-15 points, shorter = better for plaintiff)
  if (medianMonths <= 6) score += 15;
  else if (medianMonths <= 12) score += 10;
  else if (medianMonths <= 18) score += 5;
  else score -= 5;

  score = Math.max(10, Math.min(95, score));

  const factors = [
    {
      label: 'Win Rate Assessment',
      label_es: 'Evaluación de Tasa de Éxito',
      value: `${winRate}%`,
      impact: (winRate >= 40 ? 'positive' : winRate >= 25 ? 'neutral' : 'negative') as 'positive' | 'neutral' | 'negative',
    },
    {
      label: 'Settlement Likelihood',
      label_es: 'Probabilidad de Acuerdo',
      value: `${settlementRate}%`,
      impact: (settlementRate >= 50 ? 'positive' : settlementRate >= 30 ? 'neutral' : 'negative') as 'positive' | 'neutral' | 'negative',
    },
    {
      label: 'Timeline Assessment',
      label_es: 'Evaluación de Cronograma',
      value: `${medianMonths} mo`,
      impact: (medianMonths <= 10 ? 'positive' : medianMonths <= 18 ? 'neutral' : 'negative') as 'positive' | 'neutral' | 'negative',
    },
  ];

  let level: string, level_es: string, color: string;
  if (score >= 75) {
    level = 'Strong Position'; level_es = 'Posición Fuerte'; color = '#10B981';
  } else if (score >= 55) {
    level = 'Moderate Position'; level_es = 'Posición Moderada'; color = '#F59E0B';
  } else if (score >= 35) {
    level = 'Challenging Position'; level_es = 'Posición Difícil'; color = '#F97316';
  } else {
    level = 'Difficult Position'; level_es = 'Posición Muy Difícil'; color = '#EF4444';
  }

  return { score, level, level_es, color, factors };
}

export default function CaseRiskScore({
  lang = 'en',
  isPremium = false,
  onUpgrade,
  caseType = 'Employment Discrimination',
  winRate = 47,
  settlementRate = 52,
  medianMonths = 9,
}: CaseRiskScoreProps) {
  const result = useMemo(
    () => computeRiskScore(winRate, settlementRate, medianMonths),
    [winRate, settlementRate, medianMonths]
  );

  const t = lang === 'es' ? {
    label: 'ANÁLISIS PREMIUM',
    title: 'Puntuación de Posición del Caso',
    sub: 'Evaluación basada en datos de la fortaleza de su tipo de caso',
    factors: 'Factores de Evaluación',
    disclaimer: 'Solo con fines informativos. No constituye asesoría legal ni predicción de resultados.',
    locked: 'Función Premium',
    unlockMsg: 'Desbloquee la puntuación de posición de caso impulsada por IA',
    upgrade: 'Actualizar para Acceder',
    positive: 'Favorable',
    neutral: 'Neutral',
    negative: 'Desfavorable',
  } : {
    label: 'PREMIUM ANALYTICS',
    title: 'Case Position Score',
    sub: 'Data-driven assessment of your case type strength',
    factors: 'Assessment Factors',
    disclaimer: 'For informational purposes only. Not legal advice or outcome prediction.',
    locked: 'Premium Feature',
    unlockMsg: 'Unlock the AI-powered case position score',
    upgrade: 'Upgrade to Access',
    positive: 'Favorable',
    neutral: 'Neutral',
    negative: 'Unfavorable',
  };

  if (!isPremium) {
    return (
      <div
        className="rounded-xl p-8 text-center relative overflow-hidden"
        style={{ background: 'rgba(17,17,17,0.05)', border: '1px solid rgba(17,17,17,0.2)' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.03) 0%, rgba(13,148,136,0.03) 100%)' }} />
        <div className="relative">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.5" className="mx-auto mb-3" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#333333' }}>{t.locked}</p>
          <h3 className="text-base font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>{t.title}</h3>
          <p className="text-[12px] mb-4" style={{ color: 'var(--fg-muted)' }}>{t.unlockMsg}</p>
          <button type="button"
            onClick={onUpgrade}
            className="px-5 py-2 rounded-lg font-semibold text-[12px] text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #111111, #333333)' }}
          >
            {t.upgrade}
          </button>
        </div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (result.score / 100) * circumference;

  return (
    <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
      <p className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#333333' }}>{t.label}</p>
      <h3 className="text-base font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>{t.title}</h3>

      <div className="flex items-center gap-6 mb-5">
        {/* Score ring */}
        <div className="relative flex-shrink-0" style={{ width: '120px', height: '120px' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label={`Score: ${result.score}`}>
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={result.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono" style={{ color: result.color }}>{result.score}</span>
            <span className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--fg-subtle)' }}>/ 100</span>
          </div>
        </div>

        <div>
          <div className="text-[14px] font-bold mb-1" style={{ color: result.color }}>
            {lang === 'es' ? result.level_es : result.level}
          </div>
          <div className="text-[12px]" style={{ color: 'var(--fg-muted)' }}>
            {caseType}
          </div>
        </div>
      </div>

      {/* Factors */}
      <p className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--fg-subtle)' }}>{t.factors}</p>
      <div className="space-y-2">
        {result.factors.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: 'rgba(15,23,42,0.4)' }}>
            <span className="text-[12px]" style={{ color: 'var(--fg-secondary)' }}>
              {lang === 'es' ? f.label_es : f.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-mono font-semibold" style={{ color: 'var(--fg-primary)' }}>{f.value}</span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: f.impact === 'positive' ? 'rgba(16,185,129,0.15)' : f.impact === 'neutral' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                  color: f.impact === 'positive' ? '#10B981' : f.impact === 'neutral' ? '#F59E0B' : '#EF4444',
                }}
              >
                {f.impact === 'positive' ? t.positive : f.impact === 'neutral' ? t.neutral : t.negative}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] mt-4 leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
    </div>
  );
}
