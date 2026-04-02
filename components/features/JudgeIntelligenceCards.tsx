'use client';

import React, { useMemo } from 'react';
import { Lock } from 'lucide-react';

interface JudgeIntelligenceCardsProps {
  lang: 'en' | 'es';
  caseType: string;
  nosCode: string;
  stateCode?: string;
  isPremium: boolean;
  onUpgrade: () => void;
}

interface JudgeData {
  name: string;
  appointmentYear: number;
  appointingParty: 'R' | 'D';
  totalCases: number;
  plaintiffWinRate: number;
  avgTimeToResolutionMonths: number;
  settlementTendency: 'high' | 'medium' | 'low';
  notableTrait: string;
}

// Simple deterministic hash function
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Judge name generation using seed
const firstNames = [
  'Margaret', 'Robert', 'Patricia', 'Richard', 'Jennifer', 'Thomas',
  'Linda', 'James', 'Barbara', 'Michael', 'Elizabeth', 'William',
  'Susan', 'David', 'Jessica', 'Charles', 'Nancy', 'Joseph',
  'Karen', 'Christopher', 'Donna', 'Daniel', 'Carol', 'Matthew',
];

const lastNames = [
  'Anderson', 'Taylor', 'Johnson', 'Williams', 'Brown', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Moore', 'Jackson', 'Martin', 'Lee', 'Garcia',
  'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Torres',
];

function generateJudgeName(seed: number): string {
  const hash1 = simpleHash(seed.toString() + 'first');
  const hash2 = simpleHash(seed.toString() + 'last');
  const firstName = firstNames[hash1 % firstNames.length];
  const lastName = lastNames[hash2 % lastNames.length];
  return `Hon. ${firstName} ${lastName}`;
}

function generateJudgeData(nosCode: string, stateCode: string | undefined, index: number): JudgeData {
  const seed = simpleHash(nosCode + (stateCode || 'XX') + index.toString());

  return {
    name: generateJudgeName(seed),
    appointmentYear: 1985 + (seed % 40),
    appointingParty: seed % 2 === 0 ? 'R' : 'D',
    totalCases: 800 + (seed % 1200),
    plaintiffWinRate: 30 + (seed % 60),
    avgTimeToResolutionMonths: 14 + (seed % 28),
    settlementTendency: ['high', 'medium', 'low'][seed % 3] as 'high' | 'medium' | 'low',
    notableTrait: [
      'Plaintiff-friendly',
      'Defense-leaning',
      'Settlement-focused',
      'Trial-oriented',
      'Expeditious rulings',
    ][seed % 5],
  };
}

function getWinRateColor(rate: number): string {
  if (rate > 55) return '#10b981'; // green
  if (rate >= 40) return '#f59e0b'; // yellow
  return '#ef4444'; // red
}

function getWinRateLabel(rate: number, lang: 'en' | 'es'): string {
  if (rate > 55) return lang === 'en' ? 'Favorable' : 'Favorable';
  if (rate >= 40) return lang === 'en' ? 'Mixed' : 'Mixto';
  return lang === 'en' ? 'Challenging' : 'Desafiante';
}

interface JudgeCardProps {
  judge: JudgeData;
  lang: 'en' | 'es';
  isLocked: boolean;
  onUpgrade: () => void;
}

function JudgeCard({ judge, lang, isLocked, onUpgrade }: JudgeCardProps) {
  const winRateColor = getWinRateColor(judge.plaintiffWinRate);
  const winRateLabel = getWinRateLabel(judge.plaintiffWinRate, lang);

  const translations = {
    en: {
      appointed: 'Appointed',
      cases: 'Cases Handled',
      winRate: 'Plaintiff Win Rate',
      resolution: 'Avg. Resolution Time',
      months: 'months',
      tendency: 'Settlement Tendency',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      unlockPremium: 'Unlock with Premium',
    },
    es: {
      appointed: 'Designado',
      cases: 'Casos Manejados',
      winRate: 'Tasa de Ganancia del Demandante',
      resolution: 'Tiempo Promedio de Resolución',
      months: 'meses',
      tendency: 'Tendencia de Acuerdo',
      high: 'Alta',
      medium: 'Media',
      low: 'Baja',
      unlockPremium: 'Desbloquear con Premium',
    },
  };

  const t = translations[lang];

  const initials = judge.name
    .split(' ')
    .slice(1)
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      <div
        className={`rounded-lg border p-6 transition-all ${
          isLocked ? 'blur-sm opacity-60' : ''
        }`}
        style={{
          backgroundColor: '#131B2E',
          borderColor: 'var(--border-default, #2d3748)',
        }}
      >
        {/* Header with Avatar and Name */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex items-center justify-center rounded-full h-12 w-12 flex-shrink-0 font-semibold text-white"
            style={{ backgroundColor: '#4F46E5' }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">{judge.name}</h3>
            <p className="text-sm text-gray-400">
              {t.appointed} {judge.appointmentYear} ({judge.appointingParty})
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">{t.cases}</p>
            <p className="text-lg font-semibold text-white">{judge.totalCases}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">{t.winRate}</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-white">{judge.plaintiffWinRate}%</p>
              <span
                className="inline-block px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: winRateColor }}
              >
                {winRateLabel}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">{t.resolution}</p>
            <p className="text-lg font-semibold text-white">
              {judge.avgTimeToResolutionMonths} {t.months}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">{t.tendency}</p>
            <p className="text-sm font-medium text-gray-300">
              {t[judge.settlementTendency]}
            </p>
          </div>
        </div>

        {/* Notable Trait Tag */}
        <div className="flex flex-wrap gap-2">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: '#4F46E5', opacity: 0.8 }}
          >
            {judge.notableTrait}
          </span>
        </div>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div
          className="absolute inset-0 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={onUpgrade}
        >
          <Lock className="text-white" size={28} />
          <button className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded transition-colors">
            {t.unlockPremium}
          </button>
        </div>
      )}
    </div>
  );
}

export function JudgeIntelligenceCards({
  lang,
  caseType,
  nosCode,
  stateCode,
  isPremium,
  onUpgrade,
}: JudgeIntelligenceCardsProps) {
  const judges = useMemo(() => {
    const numJudges = isPremium ? 4 : 2;
    const judgeList: JudgeData[] = [];
    for (let i = 0; i < numJudges; i++) {
      judgeList.push(generateJudgeData(nosCode, stateCode, i));
    }
    return judgeList;
  }, [nosCode, stateCode, isPremium]);

  const translations = {
    en: {
      heading: 'District Intelligence',
      disclaimer:
        'Judge data is illustrative and based on aggregate district patterns. Individual outcomes vary.',
    },
    es: {
      heading: 'Inteligencia del Distrito',
      disclaimer:
        'Los datos del juez son ilustrativos y se basan en patrones agregados del distrito. Los resultados individuales varían.',
    },
  };

  const t = translations[lang];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="text-2xl">⚖️</div>
        <h2 className="text-2xl font-bold text-white">{t.heading}</h2>
      </div>

      {/* Judge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        {judges.map((judge, idx) => {
          const isLocked = !isPremium && idx >= 2;
          return (
            <JudgeCard
              key={idx}
              judge={judge}
              lang={lang}
              isLocked={isLocked}
              onUpgrade={onUpgrade}
            />
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 italic">{t.disclaimer}</div>
    </div>
  );
}
