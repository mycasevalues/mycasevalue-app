'use client';

import React, { useState } from 'react';

interface CaseStats {
  nos: string;
  label: string;
  winRate: number;
  medianDays: number;
  recoveryLow: number;
  recoveryHigh: number;
  total: number;
  plaintiffRate: number;
  settlementRate: number;
}

interface ComparisonPanelProps {
  caseA: CaseStats;
  caseB: CaseStats | null;
  onSelectB?: () => void;
  lang?: 'en' | 'es';
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  caseA,
  caseB,
  onSelectB,
  lang = 'en',
}) => {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Helper function to determine which case "wins" a metric
  const getWinner = (metricKey: string): 'A' | 'B' | null => {
    if (!caseB) return null;

    switch (metricKey) {
      case 'winRate':
        return caseA.winRate > caseB.winRate ? 'A' : caseB.winRate > caseA.winRate ? 'B' : null;
      case 'medianDays':
        return caseA.medianDays < caseB.medianDays ? 'A' : caseB.medianDays < caseA.medianDays ? 'B' : null;
      case 'recovery':
        const recoveryA = (caseA.recoveryLow + caseA.recoveryHigh) / 2;
        const recoveryB = (caseB.recoveryLow + caseB.recoveryHigh) / 2;
        return recoveryA > recoveryB ? 'A' : recoveryB > recoveryA ? 'B' : null;
      case 'total':
        return caseA.total > caseB.total ? 'A' : caseB.total > caseA.total ? 'B' : null;
      case 'settlementRate':
        return caseA.settlementRate > caseB.settlementRate ? 'A' : caseB.settlementRate > caseA.settlementRate ? 'B' : null;
      default:
        return null;
    }
  };

  // Calculate max values for bar scaling
  const maxWinRate = Math.max(caseA.winRate, caseB?.winRate || 0);
  const maxDays = Math.max(caseA.medianDays, caseB?.medianDays || 0);
  const maxRecovery = Math.max(
    (caseA.recoveryLow + caseA.recoveryHigh) / 2,
    caseB ? (caseB.recoveryLow + caseB.recoveryHigh) / 2 : 0
  );
  const maxCases = Math.max(caseA.total, caseB?.total || 0);
  const maxSettlementRate = Math.max(caseA.settlementRate, caseB?.settlementRate || 0);

  const MetricRow = ({
    label,
    metricKey,
    valueA,
    valueB,
    formatA,
    formatB,
    maxValue,
    isLowerBetter = false,
  }: {
    label: string;
    metricKey: string;
    valueA: number;
    valueB?: number;
    formatA: (v: number) => string;
    formatB?: (v: number) => string;
    maxValue: number;
    isLowerBetter?: boolean;
  }) => {
    const winner = getWinner(metricKey);
    const barWidthA = (valueA / maxValue) * 100;
    const barWidthB = valueB ? (valueB / maxValue) * 100 : 0;

    return (
      <div
        key={metricKey}
        className="mb-6 pb-6 border-b border-[#1E293B]"
        onMouseEnter={() => setHoveredMetric(metricKey)}
        onMouseLeave={() => setHoveredMetric(null)}
      >
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-[#94A3B8]">{label}</label>
          {caseB && winner && (
            <span className="text-xs text-[#5EEAD4] font-semibold">
              ✓ {winner === 'A' ? 'Case A' : 'Case B'} wins
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Case A */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#F0F2F5] font-semibold">{caseA.label}</span>
              <span className="text-sm font-bold text-[#4F46E5]">{formatA(valueA)}</span>
            </div>
            <div className="h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#4F46E5] rounded-full transition-all duration-500 ease-out ${
                  hoveredMetric === metricKey ? 'shadow-lg shadow-[#4F46E5]/50' : ''
                }`}
                style={{ width: `${barWidthA}%` }}
              />
            </div>
          </div>

          {/* Case B */}
          {caseB && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#F0F2F5] font-semibold">{caseB.label}</span>
                <span className="text-sm font-bold text-[#5EEAD4]">
                  {formatB ? formatB(valueB!) : formatA(valueB!)}
                </span>
              </div>
              <div className="h-2 bg-[#1E293B] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-[#5EEAD4] rounded-full transition-all duration-500 ease-out ${
                    hoveredMetric === metricKey ? 'shadow-lg shadow-[#5EEAD4]/50' : ''
                  }`}
                  style={{ width: `${barWidthB}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const generateVerdict = (): string => {
    if (!caseB) return '';

    const winRateDiff = caseA.winRate - caseB.winRate;
    const daysDiff = caseB.medianDays - caseA.medianDays; // Inverted: lower is better
    const recoveryDiff =
      (caseA.recoveryLow + caseA.recoveryHigh) / 2 -
      (caseB.recoveryLow + caseB.recoveryHigh) / 2;

    const insights = [];

    if (Math.abs(winRateDiff) > 5) {
      insights.push(
        winRateDiff > 0
          ? `${caseA.label} has higher win rates (${caseA.winRate.toFixed(1)}% vs ${caseB.winRate.toFixed(1)}%)`
          : `${caseB.label} has higher win rates (${caseB.winRate.toFixed(1)}% vs ${caseA.winRate.toFixed(1)}%)`
      );
    }

    if (Math.abs(daysDiff) > 30) {
      insights.push(
        daysDiff > 0
          ? `${caseA.label} resolves faster (${caseA.medianDays} days vs ${caseB.medianDays} days)`
          : `${caseB.label} resolves faster (${caseB.medianDays} days vs ${caseA.medianDays} days)`
      );
    }

    if (Math.abs(recoveryDiff) > 5000) {
      const recA = (caseA.recoveryLow + caseA.recoveryHigh) / 2;
      const recB = (caseB.recoveryLow + caseB.recoveryHigh) / 2;
      insights.push(
        recoveryDiff > 0
          ? `${caseA.label} offers higher average recovery ($${recA.toLocaleString()} vs $${recB.toLocaleString()})`
          : `${caseB.label} offers higher average recovery ($${recB.toLocaleString()} vs $${recA.toLocaleString()})`
      );
    }

    if (insights.length === 0) {
      return 'Both case types show similar characteristics across key metrics.';
    }

    return insights.join('. ') + '.';
  };

  return (
    <div className="w-full">
      {caseB ? (
        <div className="bg-[#131B2E] border border-[#1E293B] rounded-lg p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#F0F2F5] mb-2">
              {lang === 'es' ? 'Comparación de casos' : 'Case Comparison'}
            </h2>
            <p className="text-sm text-[#94A3B8]">
              {lang === 'es'
                ? 'Analiza las métricas clave lado a lado'
                : 'Analyze key metrics side by side'}
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <MetricRow
              label={lang === 'es' ? 'Tasa de victoria' : 'Win Rate'}
              metricKey="winRate"
              valueA={caseA.winRate}
              valueB={caseB.winRate}
              formatA={(v) => `${v.toFixed(1)}%`}
              maxValue={maxWinRate || 100}
            />

            <MetricRow
              label={lang === 'es' ? 'Duración mediana' : 'Median Duration'}
              metricKey="medianDays"
              valueA={caseA.medianDays}
              valueB={caseB.medianDays}
              formatA={(v) => `${Math.round(v)} days`}
              maxValue={maxDays || 730}
              isLowerBetter
            />

            <MetricRow
              label={lang === 'es' ? 'Recuperación promedio' : 'Avg Recovery'}
              metricKey="recovery"
              valueA={(caseA.recoveryLow + caseA.recoveryHigh) / 2}
              valueB={(caseB.recoveryLow + caseB.recoveryHigh) / 2}
              formatA={(v) => `$${(v / 1000).toFixed(0)}K`}
              maxValue={maxRecovery || 100000}
            />

            <MetricRow
              label={lang === 'es' ? 'Total de casos' : 'Total Cases'}
              metricKey="total"
              valueA={caseA.total}
              valueB={caseB.total}
              formatA={(v) => `${v.toLocaleString()}`}
              maxValue={maxCases || 1000}
            />

            <MetricRow
              label={lang === 'es' ? 'Tasa de acuerdo' : 'Settlement Rate'}
              metricKey="settlementRate"
              valueA={caseA.settlementRate}
              valueB={caseB.settlementRate}
              formatA={(v) => `${v.toFixed(1)}%`}
              maxValue={maxSettlementRate || 100}
            />
          </div>

          {/* Verdict Summary */}
          <div className="bg-[#1E293B] border-l-4 border-[#5EEAD4] rounded px-4 py-3">
            <p className="text-sm text-[#F0F2F5]">
              <span className="font-semibold text-[#5EEAD4]">Verdict: </span>
              {generateVerdict()}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#131B2E] border-2 border-dashed border-[#1E293B] rounded-lg p-8 md:p-12 text-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 mx-auto text-[#94A3B8] mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#F0F2F5] mb-2">
            {lang === 'es' ? 'Selecciona un caso para comparar' : 'Select a case to compare'}
          </h3>
          <p className="text-sm text-[#94A3B8] mb-6">
            {lang === 'es'
              ? 'Elige un segundo tipo de caso para ver un análisis comparativo detallado'
              : 'Choose a second case type to see detailed comparative analysis'}
          </p>
          {onSelectB && (
            <button
              onClick={onSelectB}
              className="inline-flex items-center px-4 py-2 bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-[#F0F2F5] rounded-lg font-medium text-sm transition-colors duration-200"
            >
              {lang === 'es' ? 'Seleccionar caso' : 'Select Case'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparisonPanel;
