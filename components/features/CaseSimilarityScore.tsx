'use client';

import React, { useState, useEffect } from 'react';
import FeatureGate from '../ui/FeatureGate';
import { type Tier } from '../../lib/access';

export interface CaseSimilarityScoreProps {
  caseType: string;
  district: string;
  similarCaseCount: number;
  similarityScore: number; // 0-100
  matchingCriteria: {
    caseTypeMatch: boolean;
    districtMatch: boolean;
    timeframeMatch: boolean;
    damagesRangeMatch: boolean;
  };
  lang?: 'en' | 'es';
  userTier?: Tier;
}

interface Labels {
  title: string;
  subtitle: string;
  matchLabel: string;
  criteria: {
    caseType: string;
    district: string;
    timeframe: string;
    damagesRange: string;
  };
  matchQuality: {
    high: string;
    moderate: string;
    low: string;
  };
  basedOn: string;
  cases: string;
}

const LABELS: Record<'en' | 'es', Labels> = {
  en: {
    title: 'Similar Cases in Database',
    subtitle: 'This report is compared against historical cases',
    matchLabel: 'Match Quality',
    criteria: {
      caseType: 'Case type match',
      district: 'District match',
      timeframe: 'Timeframe match',
      damagesRange: 'Damages range match',
    },
    matchQuality: {
      high: 'High Match',
      moderate: 'Moderate Match',
      low: 'Low Match',
    },
    basedOn: 'Based on',
    cases: 'similar cases',
  },
  es: {
    title: 'Casos Similares en la Base de Datos',
    subtitle: 'Este informe se compara con casos históricos',
    matchLabel: 'Calidad de Coincidencia',
    criteria: {
      caseType: 'Coincidencia de tipo de caso',
      district: 'Coincidencia de distrito',
      timeframe: 'Coincidencia de marco temporal',
      damagesRange: 'Coincidencia de rango de daños',
    },
    matchQuality: {
      high: 'Coincidencia Alta',
      moderate: 'Coincidencia Moderada',
      low: 'Coincidencia Baja',
    },
    basedOn: 'Basado en',
    cases: 'casos similares',
  },
};

function getMatchLabel(score: number, matchQuality: string): string {
  if (score > 70) return matchQuality === 'es' ? 'Coincidencia Alta' : 'High Match';
  if (score >= 40) return matchQuality === 'es' ? 'Coincidencia Moderada' : 'Moderate Match';
  return matchQuality === 'es' ? 'Coincidencia Baja' : 'Low Match';
}

function getScoreColor(score: number): string {
  if (score > 70) return '#0D9488'; // teal for high
  if (score >= 40) return '#8B5CF6'; // purple for moderate
  return '#E87461'; // coral for low
}

export function CaseSimilarityScore({
  caseType,
  district,
  similarCaseCount,
  similarityScore,
  matchingCriteria,
  lang = 'en',
  userTier = 'free',
}: CaseSimilarityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const labels = LABELS[lang];

  useEffect(() => {
    const t = setTimeout(() => setAnimatedScore(similarityScore), 200);
    return () => clearTimeout(t);
  }, [similarityScore]);

  const scoreColor = getScoreColor(similarityScore);
  const matchLabel = getMatchLabel(similarityScore, lang);

  // SVG dimensions for circular progress
  const circleSize = 160;
  const radius = (circleSize - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (animatedScore / 100) * circumference;

  // Criteria items
  const criteria = [
    {
      label: labels.criteria.caseType,
      matched: matchingCriteria.caseTypeMatch,
    },
    {
      label: labels.criteria.district,
      matched: matchingCriteria.districtMatch,
    },
    {
      label: labels.criteria.timeframe,
      matched: matchingCriteria.timeframeMatch,
    },
    {
      label: labels.criteria.damagesRange,
      matched: matchingCriteria.damagesRangeMatch,
    },
  ];

  const content = (
    <div
      className="rounded-3xl p-6 border"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E0D8',
        borderWidth: '1px',
        borderRadius: '12px',
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[14px] font-bold tracking-[1px] uppercase mb-1" style={{ color: '#111111' }}>
          {labels.title}
        </h3>
        <p className="text-[12px]" style={{ color: '#6B7280' }}>
          {labels.subtitle}
        </p>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left: Score circle */}
        <div className="flex flex-col items-center justify-center">
          <div style={{ width: circleSize, height: circleSize }}>
            <svg
              width={circleSize}
              height={circleSize}
              viewBox={`0 0 ${circleSize} ${circleSize}`}
              role="progressbar"
              aria-valuenow={Math.round(animatedScore)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Similarity score: ${animatedScore}`}
            >
              <defs>
                <filter id="scoreGlowSimilarity">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background circle */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="6"
              />

              {/* Progress circle with color */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                fill="none"
                stroke={scoreColor}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                filter="url(#scoreGlowSimilarity)"
                style={{
                  transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />

              {/* Score number */}
              <text
                x={circleSize / 2}
                y={circleSize / 2 + 6}
                textAnchor="middle"
                fontSize="48"
                fontWeight="800"
                fontFamily="'PT Mono', 'Courier New', monospace"
                fill={scoreColor}
              >
                {animatedScore}
              </text>
            </svg>
          </div>

          {/* Score label */}
          <div
            className="text-[11px] font-bold tracking-[1.5px] mt-4 uppercase"
            style={{ color: scoreColor }}
          >
            {matchLabel}
          </div>
        </div>

        {/* Right: Matching criteria */}
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <p className="text-[11px] font-bold tracking-[1px] uppercase mb-3" style={{ color: '#111111' }}>
              {labels.matchLabel}
            </p>

            <div className="space-y-2">
              {criteria.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  {item.matched ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D9488"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D1D5DB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                  <span
                    className="text-[13px]"
                    style={{ color: item.matched ? '#111111' : '#9CA3AF' }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Based on X similar cases */}
      <div
        className="pt-4 border-t text-center"
        style={{
          borderColor: '#E5E0D8',
        }}
      >
        <p className="text-[12px]" style={{ color: '#6B7280' }}>
          <span style={{ fontFamily: "'PT Mono', 'Courier New', monospace", fontWeight: 600, color: '#111111' }}>
            {similarCaseCount.toLocaleString()}
          </span>
          {' '}
          <span>{labels.basedOn}</span>
          {' '}
          <span style={{ fontWeight: 500 }}>{labels.cases}</span>
        </p>
      </div>
    </div>
  );

  // Wrap with FeatureGate for free users
  if (userTier === 'free') {
    return <FeatureGate userTier={userTier} feature="single_report_access" lang={lang}>{content}</FeatureGate>;
  }

  return content;
}

export default CaseSimilarityScore;
