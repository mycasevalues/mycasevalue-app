'use client';

import React, { useMemo } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

export interface SettlementPressureIndexProps {
  pressureScore: number; // 0-100
  factors: {
    label: string;
    labelEs: string;
    impact: 'increases' | 'decreases' | 'neutral';
    weight: number; // percentage contribution
  }[];
  optimalWindow: {
    startMonth: number;
    endMonth: number;
  };
  lang?: 'en' | 'es';
  tier?: string;
  onUpgrade?: () => void;
}

const MONTH_NAMES_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const MONTH_NAMES_ES = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

function SemiCircularGauge({
  score,
  lang,
}: {
  score: number;
  lang: 'en' | 'es';
}): React.ReactElement {
  // Score should be 0-100
  // Gauge goes from 0° (left) to 180° (right) in a semi-circle
  const clampedScore = Math.max(0, Math.min(100, score));

  // Determine color based on score
  const getColor = (s: number): string => {
    if (s <= 33) return '#22c55e'; // green
    if (s <= 66) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const gaugeColor = getColor(clampedScore);

  // SVG dimensions
  const svgWidth = 280;
  const svgHeight = 180;
  const centerX = svgWidth / 2;
  const centerY = svgHeight;
  const radius = 120;

  // Angle calculation: 0° = 180° in standard SVG (pointing left), 180° = 0° (pointing right)
  // We want: 0 score = 180° (left), 100 score = 0° (right)
  // So: angle = 180 - (clampedScore / 100) * 180
  const angleInDegrees = 180 - (clampedScore / 100) * 180;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  // Needle endpoint
  const needleLength = 100;
  const needleX = centerX + needleLength * Math.cos(angleInRadians);
  const needleY = centerY - needleLength * Math.sin(angleInRadians);

  // Arc path for the background gauge
  // We'll draw three arcs: green (0-33), yellow (33-66), red (66-100)
  const createArcPath = (
    startScore: number,
    endScore: number,
    color: string
  ): string => {
    const startAngleDeg = 180 - (startScore / 100) * 180;
    const endAngleDeg = 180 - (endScore / 100) * 180;

    const startAngleRad = (startAngleDeg * Math.PI) / 180;
    const endAngleRad = (endAngleDeg * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY - radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY - radius * Math.sin(endAngleRad);

    const largeArcFlag = endScore - startScore > 50 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2}`;
  };

  const arcGreen = createArcPath(0, 33, '#22c55e');
  const arcYellow = createArcPath(33, 66, '#eab308');
  const arcRed = createArcPath(66, 100, '#ef4444');

  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      {/* Background arcs */}
      <path
        d={arcGreen}
        stroke="#22c55e"
        strokeWidth="12"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d={arcYellow}
        stroke="#eab308"
        strokeWidth="12"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d={arcRed}
        stroke="#ef4444"
        strokeWidth="12"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Active arc (from 0 to current score) */}
      <path
        d={
          clampedScore <= 33
            ? createArcPath(0, clampedScore, gaugeColor)
            : clampedScore <= 66
              ? `${createArcPath(0, 33, '#22c55e')} ${createArcPath(33, clampedScore, gaugeColor)}`
              : `${createArcPath(0, 33, '#22c55e')} ${createArcPath(33, 66, '#eab308')} ${createArcPath(66, clampedScore, gaugeColor)}`
        }
        stroke={gaugeColor}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />

      {/* Needle */}
      <line
        x1={centerX}
        y1={centerY}
        x2={needleX}
        y2={needleY}
        stroke={gaugeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Center circle */}
      <circle cx={centerX} cy={centerY} r="6" fill={gaugeColor} />

      {/* Labels */}
      <text
        x={centerX - 100}
        y={svgHeight - 5}
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        fill="#6B7280"
        textAnchor="middle"
      >
        {lang === 'en' ? 'Low' : 'Bajo'}
      </text>
      <text
        x={centerX}
        y={svgHeight - 5}
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        fill="#6B7280"
        textAnchor="middle"
      >
        {lang === 'en' ? 'Moderate' : 'Moderado'}
      </text>
      <text
        x={centerX + 100}
        y={svgHeight - 5}
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        fill="#6B7280"
        textAnchor="middle"
      >
        {lang === 'en' ? 'High' : 'Alto'}
      </text>
    </svg>
  );
}

function FactorBreakdown({
  factors,
  lang,
}: {
  factors: SettlementPressureIndexProps['factors'];
  lang: 'en' | 'es';
}): React.ReactElement {
  const getImpactArrow = (
    impact: 'increases' | 'decreases' | 'neutral'
  ): string => {
    if (impact === 'increases') return '↑';
    if (impact === 'decreases') return '↓';
    return '→';
  };

  const getImpactColor = (
    impact: 'increases' | 'decreases' | 'neutral'
  ): string => {
    if (impact === 'increases') return '#ef4444'; // red for increases pressure
    if (impact === 'decreases') return '#22c55e'; // green for decreases pressure
    return '#6B7280'; // gray for neutral
  };

  return (
    <div className="space-y-3">
      {factors.map((factor, idx) => {
        const arrow = getImpactArrow(factor.impact);
        const color = getImpactColor(factor.impact);
        const label = lang === 'en' ? factor.label : factor.labelEs;

        return (
          <div
            key={idx}
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
          >
            <div className="flex items-center gap-3 flex-1">
              <span
                className="text-lg font-bold flex-shrink-0"
                style={{ color }}
              >
                {arrow}
              </span>
              <span className="text-sm text-gray-700 flex-1">{label}</span>
            </div>
            <span
              className="text-xs font-mono font-bold"
              style={{ color: '#6B7280' }}
            >
              {factor.weight}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

function OptimalWindowIndicator({
  startMonth,
  endMonth,
  lang,
}: {
  startMonth: number;
  endMonth: number;
  lang: 'en' | 'es';
}): React.ReactElement {
  const monthNames = lang === 'en' ? MONTH_NAMES_EN : MONTH_NAMES_ES;
  const start = monthNames[Math.max(0, Math.min(11, startMonth))];
  const end = monthNames[Math.max(0, Math.min(11, endMonth))];

  const title = lang === 'en' ? 'Optimal Settlement Window' : 'Ventana Óptima de Acuerdo';
  const label =
    lang === 'en' ? 'Best window for settlement:' : 'Mejor ventana para acuerdo:';

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <p className="text-xs font-semibold text-blue-900 mb-1">{title}</p>
      <p className="text-sm text-blue-700">
        {label}{' '}
        <span className="font-mono font-bold text-blue-900">
          {start} - {end}
        </span>
      </p>
    </div>
  );
}

export function SettlementPressureIndex({
  pressureScore,
  factors,
  optimalWindow,
  lang = 'en',
  tier = 'free',
  onUpgrade,
}: SettlementPressureIndexProps): React.ReactElement {
  // Temporarily unlock all tiers — lock after site completion
  // TODO: Re-enable tier gating after site is complete
  const isAttorneyTier = true; // was: tier === 'attorney'

  const translations = {
    en: {
      title: 'Settlement Pressure Index',
      subtitle: 'Likelihood of settlement vs. trial based on case factors',
      score: 'Pressure Score',
      factors: 'Contributing Factors',
      locked: 'Unlock Settlement Pressure Index',
      upgrade: 'Upgrade to Attorney Mode',
      features: [
        'Pressure score calculation based on 50+ case variables',
        'Factor breakdown showing settlement drivers',
        'Optimal settlement window timing analysis',
        'Historical settlement rate predictions',
        'Risk assessment for trial vs. settlement',
        'Strategy recommendations based on pressure level',
      ],
      disclaimer:
        'This analysis is informational and does not constitute legal advice. Always consult with a licensed attorney.',
    },
    es: {
      title: 'Índice de Presión de Acuerdo',
      subtitle: 'Probabilidad de acuerdo vs. juicio según factores del caso',
      score: 'Puntuación de Presión',
      factors: 'Factores Contribuyentes',
      locked: 'Desbloquear Índice de Presión de Acuerdo',
      upgrade: 'Actualizar a Modo de Abogado',
      features: [
        'Cálculo de puntuación de presión basado en más de 50 variables de caso',
        'Desglose de factores que muestran impulsores de acuerdo',
        'Análisis de tiempo de ventana óptima de acuerdo',
        'Predicciones de tasa de acuerdo histórico',
        'Evaluación de riesgo para juicio vs. acuerdo',
        'Recomendaciones de estrategia basadas en nivel de presión',
      ],
      disclaimer:
        'Este análisis es informativo y no constituye asesoramiento legal. Siempre consulte con un abogado autorizado.',
    },
  };

  const t = translations[lang];

  // Locked state
  if (!isAttorneyTier) {
    return (
      <div className="w-full">
        <div className="relative">
          <div
            className="rounded-xl border blur-sm opacity-40"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E0D8',
            }}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t.title}
              </h2>
              <p className="text-gray-600 mb-6">{t.subtitle}</p>

              <div className="grid grid-cols-2 gap-4 mb-8 opacity-60">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4 h-20"
                    style={{ backgroundColor: '#F9F8F6' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-6 bg-opacity-80"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <Lock className="text-gray-400" size={48} />
            <h3 className="text-2xl font-bold text-gray-900 text-center">
              {t.locked}
            </h3>

            <div
              className="rounded-lg p-6 max-w-md border"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0D8' }}
            >
              <h4 className="font-semibold text-gray-900 mb-4">
                {t.title}: {lang === 'en' ? 'What You Get' : 'Lo que obtienes'}
              </h4>
              <ul className="space-y-2 mb-6">
                {t.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-700">
                    <span className="text-blue-600 flex-shrink-0 font-bold">
                      •
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={onUpgrade}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                {t.upgrade}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked state
  return (
    <div
      className="rounded-xl border p-8"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E0D8',
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{t.title}</h2>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left: Gauge and Score */}
        <div className="lg:col-span-1">
          <div className="flex flex-col items-center gap-4">
            <SemiCircularGauge score={pressureScore} lang={lang} />
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">{t.score}</p>
              <p
                className="text-4xl font-bold font-mono"
                style={{
                  color:
                    pressureScore <= 33
                      ? '#22c55e'
                      : pressureScore <= 66
                        ? '#eab308'
                        : '#ef4444',
                }}
              >
                {Math.round(pressureScore)}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Factors and Window */}
        <div className="lg:col-span-2 space-y-6">
          {/* Factors Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {t.factors}
            </h3>
            <FactorBreakdown factors={factors} lang={lang} />
          </div>

          {/* Optimal Window Section */}
          <OptimalWindowIndicator
            startMonth={optimalWindow.startMonth}
            endMonth={optimalWindow.endMonth}
            lang={lang}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 italic">{t.disclaimer}</p>
      </div>
    </div>
  );
}

export default SettlementPressureIndex;
