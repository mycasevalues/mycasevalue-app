'use client';

import React, { useState, useEffect } from 'react';

export interface DistrictHealthScoreProps {
  districtName: string;
  overallScore: number; // 0-100
  breakdown: {
    caseloadEfficiency: number; // 0-100
    processingSpeed: number; // 0-100
    plaintiffSuccessRate: number; // 0-100
    settlementGenerosity: number; // 0-100
  };
  ranking: { rank: number; total: number }; // e.g., rank 12 of 94
  totalCases: number;
  lang?: 'en' | 'es';
}

interface Labels {
  title: string;
  subtitle: string;
  overallScore: string;
  breakdown: string;
  caseloadEfficiency: string;
  processingSpeed: string;
  plaintiffSuccessRate: string;
  settlementGenerosity: string;
  rankingBadge: string;
  totalCasesBadge: string;
  of: string;
  districts: string;
  cases: string;
}

const LABELS: Record<'en' | 'es', Labels> = {
  en: {
    title: 'District Health Score',
    subtitle: 'Federal district performance composite',
    overallScore: 'Overall Score',
    breakdown: 'Performance Breakdown',
    caseloadEfficiency: 'Caseload Efficiency',
    processingSpeed: 'Processing Speed',
    plaintiffSuccessRate: 'Plaintiff Success Rate',
    settlementGenerosity: 'Settlement Generosity',
    rankingBadge: 'Ranking',
    totalCasesBadge: 'Total Cases',
    of: 'of',
    districts: 'districts',
    cases: 'cases',
  },
  es: {
    title: 'Puntuación de Salud del Distrito',
    subtitle: 'Composite de desempeño del distrito federal',
    overallScore: 'Puntuación General',
    breakdown: 'Desglose de Desempeño',
    caseloadEfficiency: 'Eficiencia de Carga de Casos',
    processingSpeed: 'Velocidad de Procesamiento',
    plaintiffSuccessRate: 'Tasa de Éxito del Demandante',
    settlementGenerosity: 'Generosidad de Acuerdos',
    rankingBadge: 'Clasificación',
    totalCasesBadge: 'Casos Totales',
    of: 'de',
    districts: 'distritos',
    cases: 'casos',
  },
};

function getLetterGrade(score: number): string {
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 73) return 'C';
  if (score >= 70) return 'C-';
  if (score >= 67) return 'D+';
  if (score >= 63) return 'D';
  if (score >= 60) return 'D-';
  return 'F';
}

function getScoreColor(score: number): string {
  if (score > 70) return '#10B981'; // green
  if (score >= 40) return '#F59E0B'; // yellow/amber
  return '#EF4444'; // red
}

interface BreakdownItem {
  label: string;
  value: number;
}

export function DistrictHealthScore({
  districtName,
  overallScore,
  breakdown,
  ranking,
  totalCases,
  lang = 'en',
}: DistrictHealthScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const labels = LABELS[lang];

  useEffect(() => {
    const t = setTimeout(() => setAnimatedScore(overallScore), 200);
    return () => clearTimeout(t);
  }, [overallScore]);

  const scoreColor = getScoreColor(overallScore);
  const letterGrade = getLetterGrade(overallScore);

  const breakdownItems: BreakdownItem[] = [
    { label: labels.caseloadEfficiency, value: breakdown.caseloadEfficiency },
    { label: labels.processingSpeed, value: breakdown.processingSpeed },
    { label: labels.plaintiffSuccessRate, value: breakdown.plaintiffSuccessRate },
    { label: labels.settlementGenerosity, value: breakdown.settlementGenerosity },
  ];

  return (
    <div
      className="rounded-3xl p-8 border"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E0D8',
        borderWidth: '1px',
        borderRadius: '12px',
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-[14px] font-bold tracking-[1px] uppercase mb-1" style={{ color: '#111111' }}>
          {labels.title}
        </h3>
        <p className="text-[12px]" style={{ color: '#6B7280' }}>
          {labels.subtitle}
        </p>
      </div>

      {/* Main grid: Score + Metrics + Badges */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {/* Left: Large score with grade */}
        <div className="flex flex-col items-center justify-center border-r pr-8" style={{ borderColor: '#E5E0D8' }}>
          <div className="mb-4 text-center">
            <div
              className="text-[72px] font-bold mb-2"
              style={{
                fontFamily: "'PT Mono', 'Courier New', monospace",
                color: scoreColor,
              }}
            >
              {animatedScore}
            </div>
            <div
              className="text-[28px] font-bold"
              style={{
                fontFamily: "'PT Mono', 'Courier New', monospace",
                color: scoreColor,
              }}
            >
              {letterGrade}
            </div>
          </div>
          <p className="text-[11px] font-bold tracking-[1px] uppercase" style={{ color: '#6B7280' }}>
            {labels.overallScore}
          </p>
        </div>

        {/* Middle: Breakdown bars */}
        <div className="flex flex-col justify-center border-r pr-8" style={{ borderColor: '#E5E0D8' }}>
          <p className="text-[11px] font-bold tracking-[1px] uppercase mb-4" style={{ color: '#111111' }}>
            {labels.breakdown}
          </p>

          <div className="space-y-3.5">
            {breakdownItems.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[12px]" style={{ color: '#374151' }}>
                    {item.label}
                  </label>
                  <span
                    className="text-[11px] font-bold"
                    style={{
                      fontFamily: "'PT Mono', 'Courier New', monospace",
                      color: '#111111',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#E5E0D8' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: '#8B5CF6',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Badges */}
        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            {/* Ranking badge */}
            <div
              className="p-4 rounded-lg border text-center"
              style={{
                backgroundColor: '#F8FAFC',
                borderColor: '#E2E8F0',
              }}
            >
              <p className="text-[10px] font-bold tracking-[1px] uppercase mb-2" style={{ color: '#6B7280' }}>
                {labels.rankingBadge}
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="text-[28px] font-bold"
                  style={{
                    fontFamily: "'PT Mono', 'Courier New', monospace",
                    color: '#111111',
                  }}
                >
                  #{ranking.rank}
                </span>
                <span className="text-[12px]" style={{ color: '#6B7280' }}>
                  {labels.of} {ranking.total} {labels.districts}
                </span>
              </div>
            </div>

            {/* Total cases badge */}
            <div
              className="p-4 rounded-lg border text-center"
              style={{
                backgroundColor: '#F8FAFC',
                borderColor: '#E2E8F0',
              }}
            >
              <p className="text-[10px] font-bold tracking-[1px] uppercase mb-2" style={{ color: '#6B7280' }}>
                {labels.totalCasesBadge}
              </p>
              <div className="flex flex-col items-center">
                <span
                  className="text-[28px] font-bold"
                  style={{
                    fontFamily: "'PT Mono', 'Courier New', monospace",
                    color: '#111111',
                  }}
                >
                  {totalCases.toLocaleString()}
                </span>
                <span className="text-[11px]" style={{ color: '#6B7280' }}>
                  {labels.cases}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* District name footer */}
      <div
        className="pt-6 border-t text-center"
        style={{
          borderColor: '#E5E0D8',
        }}
      >
        <h4 className="text-[14px] font-bold" style={{ color: '#111111' }}>
          {districtName}
        </h4>
      </div>
    </div>
  );
}
