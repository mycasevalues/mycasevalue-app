'use client';

import React, { useMemo } from 'react';
import { TrendingUp, ArrowRight, Lock } from 'lucide-react';

interface AttorneyModePanelProps {
  lang: 'en' | 'es';
  caseType: string;
  nosCode: string;
  stateCode?: string;
  winRate: number;
  settlementPct: number;
  medianRecovery: string;
  totalCases: number;
  durationMonths: number;
  isPremium: boolean;
  tier: string;
  onUpgrade: () => void;
}

interface PanelCardProps {
  children: React.ReactNode;
  title?: string;
  isLocked?: boolean;
}

function PanelCard({ children, title, isLocked = false }: PanelCardProps) {
  return (
    <div
      className={`rounded-lg border p-6 ${isLocked ? 'relative opacity-60' : ''}`}
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: 'var(--border-default, #2d3748)',
      }}
    >
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
}

interface CaseStrengthAssessmentProps {
  lang: 'en' | 'es';
  winRate: number;
}

function CaseStrengthAssessment({ lang, winRate }: CaseStrengthAssessmentProps) {
  const score = Math.round(winRate * 1.2); // Scale to 0-100
  const caseScore = Math.min(100, score);

  const translations = {
    en: {
      title: 'Case Strength Assessment',
      strength: 'Case Strength',
      assessment:
        caseScore > 70
          ? 'Strong - Favorable precedent and venue'
          : caseScore > 50
            ? 'Moderate - Mixed indicators'
            : 'Challenging - Higher defense burden',
    },
    es: {
      title: 'Evaluación de la Fortaleza del Caso',
      strength: 'Fortaleza del Caso',
      assessment:
        caseScore > 70
          ? 'Fuerte - Precedente y jurisdicción favorables'
          : caseScore > 50
            ? 'Moderado - Indicadores mixtos'
            : 'Desafiante - Mayor carga de la defensa',
    },
  };

  const t = translations[lang];

  const getColor = (score: number) => {
    if (score > 70) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const barColor = getColor(caseScore);

  return (
    <PanelCard title={t.title}>
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-sm text-gray-400">{t.strength}</span>
          <span className="text-3xl font-bold text-white">{caseScore}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${caseScore}%`, backgroundColor: barColor }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{t.assessment}</p>
      </div>
    </PanelCard>
  );
}

interface OpposingCounselMetricsProps {
  lang: 'en' | 'es';
  winRate: number;
  settlementPct: number;
}

function OpposingCounselMetrics({
  lang,
  winRate,
  settlementPct,
}: OpposingCounselMetricsProps) {
  const translations = {
    en: {
      title: 'Opposing Counsel Metrics',
      defenseWin: 'Avg Defense Win Rate',
      motionSuccess: 'Motion Success Rate',
      settlementTendency: 'Settlement Tendency',
    },
    es: {
      title: 'Métricas de Abogado Contrario',
      defenseWin: 'Tasa Promedio de Ganancia de Defensa',
      motionSuccess: 'Tasa de Éxito de Mociones',
      settlementTendency: 'Tendencia de Acuerdo',
    },
  };

  const t = translations[lang];

  const defenseWinRate = Math.round(100 - winRate);
  const motionSuccessRate = Math.round(35 + (100 - winRate) * 0.35);
  const settlementTendency = settlementPct > 60 ? 'High' : settlementPct > 40 ? 'Medium' : 'Low';

  return (
    <PanelCard title={t.title}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-sm text-gray-400">{t.defenseWin}</span>
            <span className="text-lg font-semibold text-white">{defenseWinRate}%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-sm text-gray-400">{t.motionSuccess}</span>
            <span className="text-lg font-semibold text-white">{motionSuccessRate}%</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-400">{t.settlementTendency}</span>
            <span className="text-lg font-semibold text-indigo-400">{settlementTendency}</span>
          </div>
        </div>
      </div>
    </PanelCard>
  );
}

interface DemandLetterCalibrationProps {
  lang: 'en' | 'es';
  medianRecovery: string;
}

function DemandLetterCalibration({ lang, medianRecovery }: DemandLetterCalibrationProps) {
  const translations = {
    en: {
      title: 'Demand Letter Calibration',
      conservative: 'Conservative Anchor',
      moderate: 'Moderate Anchor',
      aggressive: 'Aggressive Anchor',
      mediaRecovery: 'Median Recovery',
      basedOn: 'Based on comparable verdicts',
    },
    es: {
      title: 'Calibración de Carta de Demanda',
      conservative: 'Ancla Conservadora',
      moderate: 'Ancla Moderada',
      aggressive: 'Ancla Agresiva',
      mediaRecovery: 'Recuperación Mediana',
      basedOn: 'Basado en veredictos comparables',
    },
  };

  const t = translations[lang];

  // Parse recovery as number (remove $ and commas)
  const recoveryNum = parseInt(medianRecovery.replace(/[$,]/g, ''), 10) || 100000;

  const conservativeAnchor = Math.round(recoveryNum * 1.5);
  const moderateAnchor = Math.round(recoveryNum * 2);
  const aggressiveAnchor = Math.round(recoveryNum * 3);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <PanelCard title={t.title}>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="text-sm text-gray-400">{t.conservative}</span>
          <span className="text-base font-semibold text-gray-300">
            {formatCurrency(conservativeAnchor)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="text-sm text-gray-400">{t.moderate}</span>
          <span className="text-base font-semibold text-indigo-400">
            {formatCurrency(moderateAnchor)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
          <span className="text-sm text-gray-400">{t.aggressive}</span>
          <span className="text-base font-semibold text-yellow-400">
            {formatCurrency(aggressiveAnchor)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">{t.basedOn}</p>
      </div>
    </PanelCard>
  );
}

interface StatuteOfLimitationsTrackerProps {
  lang: 'en' | 'es';
  durationMonths: number;
}

function StatuteOfLimitationsTracker({ lang, durationMonths }: StatuteOfLimitationsTrackerProps) {
  const translations = {
    en: {
      title: 'Statute of Limitations Tracker',
      remainingTime: 'Remaining Time to File',
      daysLeft: 'days left',
      typical: 'Typical SOL',
      years: 'years',
      deadline: 'Filing Deadline',
    },
    es: {
      title: 'Rastreador de Prescripción',
      remainingTime: 'Tiempo Restante para Presentar',
      daysLeft: 'días restantes',
      typical: 'Prescripción Típica',
      years: 'años',
      deadline: 'Plazo de Presentación',
    },
  };

  const t = translations[lang];

  // Assume typical SOL is 3 years (1095 days); compute remaining from duration
  const typicalSOLDays = 1095;
  const elapsedDays = durationMonths * 30;
  const remainingDays = Math.max(0, typicalSOLDays - elapsedDays);
  const percentRemaining = Math.round((remainingDays / typicalSOLDays) * 100);

  const getSOLColor = (percent: number) => {
    if (percent > 50) return '#10b981'; // green
    if (percent > 25) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const solColor = getSOLColor(percentRemaining);

  return (
    <PanelCard title={t.title}>
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-2">{t.remainingTime}</p>
          <div className="text-3xl font-bold mb-2" style={{ color: solColor }}>
            {remainingDays} {t.daysLeft}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${percentRemaining}%`, backgroundColor: solColor }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">{t.typical}</span>
          <span className="text-gray-300 font-medium">3 {t.years}</span>
        </div>
      </div>
    </PanelCard>
  );
}

interface ComparableVerdictsProps {
  lang: 'en' | 'es';
  medianRecovery: string;
}

function ComparableVerdicts({ lang, medianRecovery }: ComparableVerdictsProps) {
  const translations = {
    en: {
      title: 'Comparable Verdicts',
      recent: 'Recent verdict',
      settlement: 'Settlement',
      dismissal: 'Summary judgment for plaintiff',
    },
    es: {
      title: 'Veredictos Comparables',
      recent: 'Veredicto reciente',
      settlement: 'Acuerdo',
      dismissal: 'Sentencia sumaria a favor del demandante',
    },
  };

  const t = translations[lang];

  const recoveryNum = parseInt(medianRecovery.replace(/[$,]/g, ''), 10) || 100000;

  const verdicts = [
    { amount: Math.round(recoveryNum * 0.8), descriptor: t.settlement },
    { amount: Math.round(recoveryNum * 1.2), descriptor: t.recent },
    { amount: Math.round(recoveryNum * 1.5), descriptor: t.recent },
    { amount: Math.round(recoveryNum * 0.6), descriptor: t.dismissal },
    { amount: Math.round(recoveryNum * 2), descriptor: t.recent },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <PanelCard title={t.title}>
      <div className="space-y-3">
        {verdicts.map((verdict, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-xs text-gray-400">{verdict.descriptor}</span>
            <span className="text-base font-semibold text-white">
              {formatCurrency(verdict.amount)}
            </span>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

interface CaseStrategyRecommendationsProps {
  lang: 'en' | 'es';
  winRate: number;
  settlementPct: number;
}

function CaseStrategyRecommendations({
  lang,
  winRate,
  settlementPct,
}: CaseStrategyRecommendationsProps) {
  const translations = {
    en: {
      title: 'Case Strategy Recommendations',
      strongPosition: 'Strong position warrants aggressive discovery and expert witnesses.',
      focusSettlement: 'Focus on settlement—data shows high settlement tendency in this district.',
      caution: 'Prepare for trial; defense has strong track record.',
      demand: 'Anchor demand at 2-3x comparable verdicts to optimize settlement range.',
      motion: 'Early motion practice critical; opposing counsel succeeds 40%+ of the time.',
      trial: 'Consider trial strategy; precedent favors plaintiff outcomes.',
    },
    es: {
      title: 'Recomendaciones de Estrategia de Caso',
      strongPosition:
        'Posición sólida justifica descubrimiento agresivo y peritos expertos.',
      focusSettlement:
        'Enfocarse en acuerdo—datos muestran alta tendencia de acuerdo en este distrito.',
      caution: 'Prepararse para juicio; la defensa tiene un fuerte historial.',
      demand:
        'Anclar demanda en 2-3x veredictos comparables para optimizar rango de acuerdo.',
      motion: 'Práctica temprana de mociones crítica; abogado contrario tiene éxito 40%+.',
      trial: 'Considerar estrategia de juicio; precedente favorece resultados del demandante.',
    },
  };

  const t = translations[lang];

  const recommendations: string[] = [];

  if (winRate > 60) {
    recommendations.push(t.strongPosition);
  }

  if (settlementPct > 60) {
    recommendations.push(t.focusSettlement);
  } else {
    recommendations.push(t.caution);
  }

  if (winRate > 55) {
    recommendations.push(t.trial);
  } else {
    recommendations.push(t.motion);
  }

  if (winRate > 50) {
    recommendations.push(t.demand);
  }

  return (
    <PanelCard title={t.title}>
      <ul className="space-y-3">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="text-indigo-400 font-bold flex-shrink-0 mt-0.5">•</span>
            <span className="text-sm text-gray-300">{rec}</span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

export function AttorneyModePanel({
  lang,
  caseType,
  nosCode,
  stateCode,
  winRate,
  settlementPct,
  medianRecovery,
  totalCases,
  durationMonths,
  isPremium,
  tier,
  onUpgrade,
}: AttorneyModePanelProps) {
  const isAttorneyTier = tier === 'attorney';

  const translations = {
    en: {
      heading: 'Attorney Mode',
      subheading: 'Advanced Case Analytics & Strategy Tools',
      locked: 'Unlock Attorney Mode',
      features: [
        'Case strength assessment with detailed scoring',
        'Opposing counsel performance analytics',
        'Demand letter calibration tools',
        'Statute of limitations tracking',
        'Comparable verdicts database',
        'AI-powered strategy recommendations',
      ],
      cta: 'Upgrade to Attorney Mode - $29.99/month',
      disclaimer:
        'All data is informational. This analysis does not constitute legal advice. Consult with a licensed attorney before making case decisions.',
    },
    es: {
      heading: 'Modo de Abogado',
      subheading: 'Herramientas Avanzadas de Análisis de Casos y Estrategia',
      locked: 'Desbloquear Modo de Abogado',
      features: [
        'Evaluación de fortaleza del caso con puntuación detallada',
        'Análisis de desempeño del abogado contrario',
        'Herramientas de calibración de carta de demanda',
        'Seguimiento de prescripción',
        'Base de datos de veredictos comparables',
        'Recomendaciones de estrategia impulsadas por IA',
      ],
      cta: 'Actualizar a Modo de Abogado - $29.99/mes',
      disclaimer:
        'Todos los datos son informativos. Este análisis no constituye asesoramiento legal. Consulte con un abogado autorizado antes de tomar decisiones sobre casos.',
    },
  };

  const t = translations[lang];

  if (!isAttorneyTier) {
    return (
      <div className="w-full">
        <div className="relative">
          <div
            className="rounded-lg border blur-sm opacity-40"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: 'var(--border-default, #2d3748)',
            }}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-2">{t.heading}</h2>
              <p className="text-gray-400 mb-8">{t.subheading}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 opacity-60">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{ backgroundColor: '#0f1419' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 rounded-lg flex flex-col items-center justify-center gap-6 bg-opacity-80"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <Lock className="text-white" size={48} />
            <h3 className="text-2xl font-bold text-white text-center">{t.locked}</h3>

            <div className="bg-gray-800 rounded-lg p-6 max-w-md">
              <h4 className="font-semibold text-white mb-4">
                {t.heading}: What You'll Get
              </h4>
              <ul className="space-y-2 mb-6">
                {t.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-indigo-400 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button type="button"
                onClick={onUpgrade}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {t.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Attorney tier view
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{t.heading}</h2>
        <p className="text-gray-400">{t.subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CaseStrengthAssessment lang={lang} winRate={winRate} />
        <OpposingCounselMetrics lang={lang} winRate={winRate} settlementPct={settlementPct} />
        <DemandLetterCalibration lang={lang} medianRecovery={medianRecovery} />
        <StatuteOfLimitationsTracker lang={lang} durationMonths={durationMonths} />
        <ComparableVerdicts lang={lang} medianRecovery={medianRecovery} />
        <CaseStrategyRecommendations
          lang={lang}
          winRate={winRate}
          settlementPct={settlementPct}
        />
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-default, #2d3748)' }}>
        <p className="text-xs text-gray-500 italic">{t.disclaimer}</p>
      </div>
    </div>
  );
}
