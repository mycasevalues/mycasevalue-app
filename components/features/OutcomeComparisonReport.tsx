'use client';

import React, { useMemo } from 'react';
import FeatureGate from '../ui/FeatureGate';
import { Tier } from '../../lib/access';

/**
 * A single case scenario for comparison
 */
export interface ComparisonCase {
  label: string;
  caseType: string;
  district: string;
  winRate: number; // 0-100
  medianSettlement: number; // in dollars
  medianDuration: number; // in days
  sampleSize: number;
}

/**
 * Props for OutcomeComparisonReport
 */
export interface OutcomeComparisonReportProps {
  cases: ComparisonCase[]; // 2-3 cases
  userTier: Tier;
  lang?: 'en' | 'es';
}

/**
 * E5 Outcome Comparison Report
 *
 * Side-by-side comparison of up to 3 different case scenarios.
 * Shows how outcomes differ across win rate, median settlement,
 * duration, and sample size with visual comparison bars.
 *
 * Features:
 * - Responsive layout (stacks on mobile)
 * - Visual bars showing relative values
 * - Highlights "best" value in each row with purple (#8B5CF6)
 * - Summary statement showing strongest profile
 * - Gated behind 'unlimited' tier via case_comparison feature key
 */
export default function OutcomeComparisonReport({
  cases,
  userTier,
  lang = 'en',
}: OutcomeComparisonReportProps) {
  const es = lang === 'es';

  // Text translations
  const text = {
    en: {
      title: 'Outcome Comparison Report',
      subtitle: 'Analyze how case outcomes differ across scenarios',
      winRate: 'Win Rate',
      medianSettlement: 'Median Settlement',
      duration: 'Median Duration',
      sampleSize: 'Sample Size',
      summary: 'Summary',
      hasStrongestProfile: 'has the strongest overall profile',
      highest: 'Highest',
      best: 'Best',
      cases: 'Cases',
      days: 'days',
      caseType: 'Case Type',
      district: 'District',
    },
    es: {
      title: 'Informe de Comparación de Resultados',
      subtitle: 'Analiza cómo difieren los resultados de casos entre escenarios',
      winRate: 'Tasa de Victoria',
      medianSettlement: 'Acuerdo Mediano',
      duration: 'Duración Mediana',
      sampleSize: 'Tamaño de la Muestra',
      summary: 'Resumen',
      hasStrongestProfile: 'tiene el perfil general más fuerte',
      highest: 'Más alto',
      best: 'Mejor',
      cases: 'Casos',
      days: 'días',
      caseType: 'Tipo de Caso',
      district: 'Distrito',
    },
  };

  const t = text[es ? 'es' : 'en'];

  // Validate and normalize cases
  const validCases = useMemo(() => {
    return cases
      .slice(0, 3) // Max 3 cases
      .filter((c) => c && typeof c === 'object');
  }, [cases]);

  // Calculate max values for scaling bars
  const maxValues = useMemo(() => {
    if (validCases.length === 0) {
      return {
        winRate: 100,
        medianSettlement: 100000,
        medianDuration: 730,
        sampleSize: 1000,
      };
    }

    return {
      winRate: Math.max(...validCases.map((c) => c.winRate), 100),
      medianSettlement: Math.max(...validCases.map((c) => c.medianSettlement), 100000),
      medianDuration: Math.max(...validCases.map((c) => c.medianDuration), 730),
      sampleSize: Math.max(...validCases.map((c) => c.sampleSize), 1000),
    };
  }, [validCases]);

  // Find "best" case for each metric
  const bestCases = useMemo(() => {
    if (validCases.length === 0) {
      return {
        winRate: null,
        medianSettlement: null,
        medianDuration: null,
        sampleSize: null,
      };
    }

    return {
      winRate: validCases.reduce((prev, curr) =>
        curr.winRate > prev.winRate ? curr : prev
      ).label,
      medianSettlement: validCases.reduce((prev, curr) =>
        curr.medianSettlement > prev.medianSettlement ? curr : prev
      ).label,
      medianDuration: validCases.reduce((prev, curr) =>
        curr.medianDuration < prev.medianDuration ? curr : prev
      ).label,
      sampleSize: validCases.reduce((prev, curr) =>
        curr.sampleSize > prev.sampleSize ? curr : prev
      ).label,
    };
  }, [validCases]);

  // Calculate composite score for summary
  const caseScores = useMemo(() => {
    if (validCases.length === 0) return [];

    return validCases.map((c) => {
      let score = 0;

      // Win rate score (0-25 points)
      score += (c.winRate / maxValues.winRate) * 25;

      // Settlement score (0-25 points)
      score += (c.medianSettlement / maxValues.medianSettlement) * 25;

      // Duration score (0-25 points) - lower is better, so invert
      score += ((maxValues.medianDuration - c.medianDuration) / maxValues.medianDuration) * 25;

      // Sample size score (0-25 points)
      score += (c.sampleSize / maxValues.sampleSize) * 25;

      return {
        label: c.label,
        score,
      };
    });
  }, [validCases, maxValues]);

  const strongestCase = useMemo(() => {
    if (caseScores.length === 0) return null;
    return caseScores.reduce((prev, curr) =>
      curr.score > prev.score ? curr : prev
    );
  }, [caseScores]);

  // Metric row component
  const MetricRow = ({
    label,
    metricKey,
    cases: rowCases,
    formatValue,
    maxValue,
    bestLabel,
  }: {
    label: string;
    metricKey: 'winRate' | 'medianSettlement' | 'medianDuration' | 'sampleSize';
    cases: ComparisonCase[];
    formatValue: (v: number) => string;
    maxValue: number;
    bestLabel: string | null;
  }) => {
    return (
      <div className="border-b border-[#E5E0D8] last:border-b-0 py-6 last:pb-0">
        {/* Metric label and best indicator */}
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-[#374151]">{label}</label>
          {bestLabel && (
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                color: '#8B5CF6',
              }}
            >
              {t.best}: {bestLabel}
            </span>
          )}
        </div>

        {/* Column-based layout */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${cases.length}, 1fr)`,
          }}
        >
          {cases.map((c) => {
            const value = c[metricKey];
            const percentage = (value / maxValue) * 100;
            const isBest = c.label === bestLabel;

            return (
              <div key={c.label}>
                {/* Value header */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-medium text-[#6B7280]"
                    style={{ maxWidth: '80%' }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="text-sm font-bold font-mono"
                    style={{
                      color: isBest ? '#8B5CF6' : '#111111',
                    }}
                  >
                    {formatValue(value)}
                  </span>
                </div>

                {/* Visual bar */}
                <div
                  className="h-2.5 rounded-full overflow-hidden"
                  style={{
                    background: '#E5E0D8',
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percentage}%`,
                      background: isBest ? '#8B5CF6' : '#8B5CF6',
                      opacity: isBest ? 1 : 0.6,
                      boxShadow: isBest ? '0 0 8px rgba(139, 92, 246, 0.4)' : 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Empty state
  if (validCases.length === 0) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E0D8',
        }}
      >
        <svg
          className="w-12 h-12 mx-auto mb-4"
          style={{ color: '#D1D5DB' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-[#374151] mb-1">
          {es ? 'Sin casos para comparar' : 'No cases to compare'}
        </h3>
        <p className="text-sm text-[#6B7280]">
          {es
            ? 'Proporciona al menos 2 casos para ver un análisis comparativo'
            : 'Provide at least 2 cases to see comparative analysis'}
        </p>
      </div>
    );
  }

  // Main component
  return (
    <FeatureGate
      userTier={userTier}
      feature="case_comparison"
      lang={lang}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E0D8',
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-6 sm:px-8 sm:py-8 border-b border-[#E5E0D8]"
          style={{
            background: '#F9F8F6',
          }}
        >
          <h2 className="text-2xl font-bold text-[#111827] mb-1">{t.title}</h2>
          <p className="text-sm text-[#6B7280]">{t.subtitle}</p>
        </div>

        {/* Case type and district metadata row */}
        <div
          className="px-6 py-4 sm:px-8 border-b border-[#E5E0D8] grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${validCases.length}, 1fr)`,
          }}
        >
          {validCases.map((c) => (
            <div key={c.label}>
              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1">
                {t.caseType}
              </div>
              <div className="text-sm font-medium text-[#111827]">{c.caseType}</div>

              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mt-3 mb-1">
                {t.district}
              </div>
              <div className="text-sm font-medium text-[#111827]">{c.district}</div>
            </div>
          ))}
        </div>

        {/* Metrics section */}
        <div className="px-6 py-6 sm:px-8">
          <MetricRow
            label={t.winRate}
            metricKey="winRate"
            cases={validCases}
            formatValue={(v) => `${v.toFixed(1)}%`}
            maxValue={maxValues.winRate}
            bestLabel={bestCases.winRate}
          />

          <MetricRow
            label={t.medianSettlement}
            metricKey="medianSettlement"
            cases={validCases}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
            maxValue={maxValues.medianSettlement}
            bestLabel={bestCases.medianSettlement}
          />

          <MetricRow
            label={t.duration}
            metricKey="medianDuration"
            cases={validCases}
            formatValue={(v) => `${Math.round(v)} ${t.days}`}
            maxValue={maxValues.medianDuration}
            bestLabel={bestCases.medianDuration}
          />

          <MetricRow
            label={t.sampleSize}
            metricKey="sampleSize"
            cases={validCases}
            formatValue={(v) => `${v.toLocaleString()}`}
            maxValue={maxValues.sampleSize}
            bestLabel={bestCases.sampleSize}
          />
        </div>

        {/* Summary statement */}
        {strongestCase && (
          <div
            className="mx-6 mb-6 sm:mx-8 px-4 py-4 rounded-lg border-l-4"
            style={{
              background: 'rgba(139, 92, 246, 0.05)',
              borderColor: '#8B5CF6',
            }}
          >
            <p className="text-sm text-[#374151]">
              <span style={{ color: '#8B5CF6', fontWeight: 600 }}>
                {strongestCase.label}
              </span>
              {' '}{t.hasStrongestProfile}{'.'}
            </p>
            <p className="text-xs text-[#6B7280] mt-2">
              {es
                ? 'Basado en una evaluación equilibrada de tasa de victoria, acuerdo mediano, duración y tamaño de la muestra.'
                : 'Based on a balanced evaluation of win rate, median settlement, duration, and sample size.'}
            </p>
          </div>
        )}
      </div>
    </FeatureGate>
  );
}
