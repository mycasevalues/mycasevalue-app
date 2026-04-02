'use client';

import React, { useState } from 'react';

interface Judge {
  id: number;
  name: string;
  district: string;
  casesHandled: number;
  winRate: number;
  avgDuration: number;
  settlementRate: number;
}

interface Props {
  lang?: string;
  nos?: string;
  caseName?: string;
  onUnlock?: () => void;
}

const generateJudges = (seed: number): Judge[] => {
  const districts = [
    'S.D.N.Y.',
    'N.D. Cal.',
    'E.D. Tex.',
    'C.D. Cal.',
    'N.D. Ill.',
    'D. Mass.',
    'S.D. Fla.',
    'N.D. Ga.',
    'D. Colo.',
    'W.D. Wash.',
  ];

  const firstNames = [
    'R. Martinez',
    'S. Thompson',
    'J. Anderson',
    'M. Peterson',
    'L. Williams',
    'K. Johnson',
    'D. Chen',
    'P. O\'Brien',
    'A. Singh',
    'E. Garcia',
  ];

  return Array.from({ length: 10 }, (_, i) => {
    const judgeId = seed + i;
    const random = Math.sin(judgeId) * 10000;

    return {
      id: judgeId,
      name: `Hon. ${firstNames[i % firstNames.length]}`,
      district: districts[i % districts.length],
      casesHandled: 120 + Math.floor((random % 200)),
      winRate: 45 + Math.floor((random * 2) % 35),
      avgDuration: 180 + Math.floor((random % 240)),
      settlementRate: 35 + Math.floor((random % 40)),
    };
  });
};

const GavelIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM14.243 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 10-1.414 1.414l.707.707zM10 15a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 14.243a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM4 10a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zM5.757 5.757a1 1 0 010-1.414l.707-.707a1 1 0 11-1.414 1.414l-.707.707z" />
  </svg>
);

export default function JudgeAnalytics({
  lang = 'en',
  nos = '350',
  caseName = 'Contract Dispute',
  onUnlock,
}: Props) {
  const [sortBy, setSortBy] = useState<'winRate' | 'cases' | 'duration'>('winRate');
  const [isLocked, setIsLocked] = useState(true);

  const judges = generateJudges(parseInt(nos));
  const avgWinRate = judges.reduce((sum, j) => sum + j.winRate, 0) / judges.length;

  const sortedJudges = [...judges].sort((a, b) => {
    if (sortBy === 'winRate') return b.winRate - a.winRate;
    if (sortBy === 'cases') return b.casesHandled - a.casesHandled;
    return a.avgDuration - b.avgDuration;
  });

  const topDistricts = Array.from({ length: 5 }, (_, i) => {
    const winRate = 65 + Math.floor(Math.sin(i) * 20);
    return {
      district: judges[i].district,
      winRate,
      caseCount: 150 + i * 20,
    };
  });

  const labels = {
    en: {
      title: 'JUDGE ANALYTICS',
      subtitle: 'Judge Performance by District',
      sortWinRate: 'Sort by Win Rate',
      sortCases: 'Sort by Case Volume',
      sortDuration: 'Sort by Duration',
      judge: 'Judge',
      district: 'District',
      cases: 'Cases Handled',
      winRate: 'Win Rate',
      avgDuration: 'Avg Duration (days)',
      settlement: 'Settlement Rate',
      topDistricts: 'Top 5 Districts',
      premium: 'PREMIUM SECTION',
      unlock: 'Unlock Analytics',
    },
    es: {
      title: 'ANALÍTICA DE JUECES',
      subtitle: 'Desempeño de Jueces por Distrito',
      sortWinRate: 'Ordenar por Tasa de Ganancia',
      sortCases: 'Ordenar por Volumen de Casos',
      sortDuration: 'Ordenar por Duración',
      judge: 'Juez',
      district: 'Distrito',
      cases: 'Casos Manejados',
      winRate: 'Tasa de Ganancia',
      avgDuration: 'Duración Promedio (días)',
      settlement: 'Tasa de Acuerdo',
      topDistricts: 'Top 5 Distritos',
      premium: 'SECCIÓN PREMIUM',
      unlock: 'Desbloquear Analítica',
    },
  };

  const t = labels[lang as keyof typeof labels] || labels.en;

  return (
    <div className="w-full bg-[#FAFAF8] text-[#D1D5DB] py-8">
      {/* Header */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <GavelIcon />
          <h2 className="text-2xl font-display font-bold text-white">
            {t.title}
          </h2>
        </div>
        <p className="text-[#6B7280] text-sm">{t.subtitle}</p>
      </div>

      {/* Sort Controls */}
      <div className="px-6 mb-6 flex gap-2 flex-wrap">
        {(
          ['winRate', 'cases', 'duration'] as const
        ).map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-3 py-2 rounded text-xs font-mono transition-colors ${
              sortBy === option
                ? 'bg-[#111111] text-white'
                : 'bg-[#FFFFFF] text-[#6B7280] border border-[#E5E7EB] hover:border-[#111111]'
            }`}
          >
            {option === 'winRate'
              ? t.sortWinRate
              : option === 'cases'
                ? t.sortCases
                : t.sortDuration}
          </button>
        ))}
      </div>

      {/* Main Content with Lock Overlay */}
      <div className="relative">
        {/* Judge Cards Grid */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {sortedJudges.map((judge) => {
            const isAboveAvg = judge.winRate >= avgWinRate;
            const barColor = isAboveAvg ? '#0D9488' : '#DC2626';

            return (
              <div
                key={judge.id}
                className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-4 hover:border-[#111111] transition-colors"
              >
                <div className="mb-3">
                  <p className="font-display font-semibold text-white text-sm">
                    {judge.name}
                  </p>
                  <p className="text-xs text-[#6B7280]">{judge.district}</p>
                </div>

                {/* Win Rate Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-mono text-[#6B7280]">
                      {t.winRate}
                    </span>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: barColor }}
                    >
                      {judge.winRate}%
                    </span>
                  </div>
                  <div className="w-full bg-[#FAFAF8] rounded h-2 overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${judge.winRate}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">{t.cases}</span>
                    <span className="font-mono text-white">
                      {judge.casesHandled}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">{t.avgDuration}</span>
                    <span className="font-mono text-white">
                      {judge.avgDuration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">{t.settlement}</span>
                    <span className="font-mono text-white">
                      {judge.settlementRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Districts Section */}
        <div className="px-6 mb-8">
          <h3 className="text-lg font-display font-bold text-white mb-4">
            {t.topDistricts}
          </h3>
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-6">
            <div className="space-y-4">
              {topDistricts.map((district) => (
                <div key={district.district}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm text-[#D1D5DB]">
                      {district.district}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#0D9488]">
                      {district.winRate}%
                    </span>
                  </div>
                  <div className="w-full bg-[#FAFAF8] rounded h-2">
                    <div
                      className="h-full bg-[#0D9488] rounded transition-all"
                      style={{ width: `${district.winRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block bg-[#111111] text-white px-4 py-2 rounded mb-4 font-display font-bold text-sm">
                {t.premium}
              </div>
              <button
                onClick={() => {
                  setIsLocked(false);
                  onUnlock?.();
                }}
                className="mt-4 px-6 py-2 bg-[#111111] hover:bg-[#111111]/90 text-white rounded-lg font-display font-semibold transition-colors"
              >
                {t.unlock}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
