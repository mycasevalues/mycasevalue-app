'use client';

import React, { useMemo } from 'react';
import FeatureGate from '../ui/FeatureGate';
import { Tier } from '../../lib/access';

export interface JudgeMatchIndicatorProps {
  judgeName: string;
  caseType: string;
  favorabilityScore: number; // 0-100
  totalCasesHandled: number;
  avgSettlement: string;
  avgDuration: string;
  dismissalRate: number; // percentage
  settlementRate: number; // percentage
  trialRate: number; // percentage
  userTier?: Tier;
  lang?: 'en' | 'es';
}

/**
 * Determines the favorability label and description based on score
 */
function getFavorabilityStatus(
  score: number,
  lang: 'en' | 'es'
): { label: string; description: string; color: string } {
  if (score >= 65) {
    return {
      label: lang === 'en' ? 'Favorable' : 'Favorable',
      description:
        lang === 'en'
          ? 'Judge has ruled favorably in similar cases'
          : 'El juez ha fallado favorablemente en casos similares',
      color: '#10B981',
    };
  }
  if (score >= 45) {
    return {
      label: lang === 'en' ? 'Neutral' : 'Neutral',
      description:
        lang === 'en'
          ? 'Judge shows mixed outcomes in this case type'
          : 'El juez muestra resultados mixtos en este tipo de caso',
      color: '#F59E0B',
    };
  }
  return {
    label: lang === 'en' ? 'Unfavorable' : 'Desfavorable',
    description:
      lang === 'en'
        ? 'Judge has ruled unfavorably in similar cases'
        : 'El juez ha fallado desfavorablemente en casos similares',
    color: '#EF4444',
  };
}

/**
 * Formats numbers with thousands separator for display
 */
function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * JudgeMatchIndicator Component
 *
 * Shows how a specific judge's historical rulings align with the user's case type.
 * Displays favorability rating, key stats, and notable patterns.
 *
 * - Basic view (single_report tier): Name, favorability bar, and stat labels only
 * - Full view (attorney tier): Complete intelligence with all data and descriptions
 */
export default function JudgeMatchIndicator({
  judgeName,
  caseType,
  favorabilityScore,
  totalCasesHandled,
  avgSettlement,
  avgDuration,
  dismissalRate,
  settlementRate,
  trialRate,
  userTier = 'free',
  lang = 'en',
}: JudgeMatchIndicatorProps) {
  const favorabilityStatus = useMemo(
    () => getFavorabilityStatus(favorabilityScore, lang),
    [favorabilityScore, lang]
  );

  const translations = {
    en: {
      caseCount: 'Cases Handled',
      favorability: 'Favorability Match',
      dismissalRate: 'Dismissal Rate',
      settlementRate: 'Settlement Rate',
      trialRate: 'Trial Rate',
      avgSettlement: 'Avg. Settlement',
      avgDuration: 'Avg. Duration',
      intelligenceFeature: 'Advanced Judge Intelligence',
    },
    es: {
      caseCount: 'Casos Manejados',
      favorability: 'Coincidencia de Favorabilidad',
      dismissalRate: 'Tasa de Desestimiento',
      settlementRate: 'Tasa de Acuerdo',
      trialRate: 'Tasa de Juicio',
      avgSettlement: 'Acuerdo Promedio',
      avgDuration: 'Duración Promedio',
      intelligenceFeature: 'Inteligencia Avanzada de Jueces',
    },
  };

  const t = translations[lang];

  // Check if user has access to full intelligence
  const hasFullIntelligence = userTier === 'attorney';

  return (
    <div
      className="w-full rounded-[12px] border p-6 transition-all"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E0D8',
      }}
    >
      {/* Header: Judge Name + Case Count Badge */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg font-semibold truncate"
            style={{ color: '#111111' }}
          >
            {judgeName}
          </h3>
          <p
            className="text-sm mt-1"
            style={{ color: '#6B7280' }}
          >
            {caseType}
          </p>
        </div>
        <div
          className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            color: '#4B5563',
          }}
        >
          <span style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            {formatNumber(totalCasesHandled)}
          </span>
          {' '}
          {t.caseCount}
        </div>
      </div>

      {/* Favorability Bar Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label
            className="text-sm font-semibold"
            style={{ color: '#111111' }}
          >
            {t.favorability}
          </label>
          <span
            className="text-sm font-semibold"
            style={{
              color: favorabilityStatus.color,
              fontFamily: 'monospace',
            }}
          >
            {favorabilityScore}%
          </span>
        </div>

        {/* Horizontal Progress Bar */}
        <div
          className="w-full h-2 rounded-full overflow-hidden mb-2"
          style={{ backgroundColor: '#E5E0D8' }}
        >
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${favorabilityScore}%`,
              backgroundColor: favorabilityStatus.color,
            }}
          />
        </div>

        {/* Favorability Label + Description */}
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: favorabilityStatus.color }}
          >
            {favorabilityStatus.label}
          </p>
          {hasFullIntelligence && (
            <p
              className="text-xs mt-1"
              style={{ color: '#6B7280' }}
            >
              {favorabilityStatus.description}
            </p>
          )}
        </div>
      </div>

      {/* Three-Stat Row: Dismissal, Settlement, Trial */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p
            className="text-xs font-medium mb-1 uppercase tracking-wide"
            style={{ color: '#6B7280' }}
          >
            {t.dismissalRate}
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: '#111111', fontFamily: 'monospace' }}
          >
            {dismissalRate}%
          </p>
        </div>
        <div>
          <p
            className="text-xs font-medium mb-1 uppercase tracking-wide"
            style={{ color: '#6B7280' }}
          >
            {t.settlementRate}
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: '#111111', fontFamily: 'monospace' }}
          >
            {settlementRate}%
          </p>
        </div>
        <div>
          <p
            className="text-xs font-medium mb-1 uppercase tracking-wide"
            style={{ color: '#6B7280' }}
          >
            {t.trialRate}
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: '#111111', fontFamily: 'monospace' }}
          >
            {trialRate}%
          </p>
        </div>
      </div>

      {/* Average Settlement + Duration Display */}
      <FeatureGate
        userTier={userTier}
        feature="judge_intelligence_full"
        lang={lang}
      >
        <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: '#E5E0D8' }}>
          <div>
            <p
              className="text-xs font-medium mb-1 uppercase tracking-wide"
              style={{ color: '#6B7280' }}
            >
              {t.avgSettlement}
            </p>
            <p
              className="text-lg font-semibold"
              style={{ color: '#111111', fontFamily: 'monospace' }}
            >
              {avgSettlement}
            </p>
          </div>
          <div>
            <p
              className="text-xs font-medium mb-1 uppercase tracking-wide"
              style={{ color: '#6B7280' }}
            >
              {t.avgDuration}
            </p>
            <p
              className="text-lg font-semibold"
              style={{ color: '#111111', fontFamily: 'monospace' }}
            >
              {avgDuration}
            </p>
          </div>
        </div>
      </FeatureGate>
    </div>
  );
}
