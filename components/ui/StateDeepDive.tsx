'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DistrictData {
  name: string;
  casesFiled: number;
  winRate: number;
  avgSettlement: number;
  avgDuration: number;
}

interface StateInfo {
  name: string;
  districts: DistrictData[];
  solYears: number;
  solType: string;
}

const STATE_DATA: Record<string, StateInfo> = {
  CA: {
    name: 'California',
    districts: [
      { name: 'Northern District', casesFiled: 4250, winRate: 68, avgSettlement: 185000, avgDuration: 24 },
      { name: 'Central District', casesFiled: 3890, winRate: 71, avgSettlement: 192000, avgDuration: 22 },
      { name: 'Southern District', casesFiled: 3120, winRate: 69, avgSettlement: 188000, avgDuration: 23 },
      { name: 'Eastern District', casesFiled: 2450, winRate: 66, avgSettlement: 175000, avgDuration: 25 },
    ],
    solYears: 2,
    solType: 'Personal Injury',
  },
  TX: {
    name: 'Texas',
    districts: [
      { name: 'Northern District', casesFiled: 3680, winRate: 64, avgSettlement: 165000, avgDuration: 26 },
      { name: 'Southern District', casesFiled: 3450, winRate: 66, avgSettlement: 172000, avgDuration: 25 },
      { name: 'Eastern District', casesFiled: 2890, winRate: 62, avgSettlement: 155000, avgDuration: 27 },
    ],
    solYears: 2,
    solType: 'Personal Injury',
  },
  FL: {
    name: 'Florida',
    districts: [
      { name: 'Southern District', casesFiled: 3210, winRate: 70, avgSettlement: 195000, avgDuration: 21 },
      { name: 'Middle District', casesFiled: 2780, winRate: 67, avgSettlement: 180000, avgDuration: 23 },
      { name: 'Northern District', casesFiled: 2340, winRate: 65, avgSettlement: 170000, avgDuration: 24 },
    ],
    solYears: 4,
    solType: 'Contract',
  },
  NY: {
    name: 'New York',
    districts: [
      { name: 'Southern District', casesFiled: 4120, winRate: 72, avgSettlement: 210000, avgDuration: 20 },
      { name: 'Eastern District', casesFiled: 3450, winRate: 70, avgSettlement: 205000, avgDuration: 21 },
      { name: 'Northern District', casesFiled: 2180, winRate: 68, avgSettlement: 190000, avgDuration: 23 },
    ],
    solYears: 3,
    solType: 'Personal Injury',
  },
  IL: {
    name: 'Illinois',
    districts: [
      { name: 'Northern District', casesFiled: 3560, winRate: 69, avgSettlement: 188000, avgDuration: 23 },
      { name: 'Central District', casesFiled: 2340, winRate: 65, avgSettlement: 165000, avgDuration: 25 },
      { name: 'Southern District', casesFiled: 1890, winRate: 63, avgSettlement: 155000, avgDuration: 26 },
    ],
    solYears: 2,
    solType: 'Personal Injury',
  },
  PA: {
    name: 'Pennsylvania',
    districts: [
      { name: 'Eastern District', casesFiled: 3210, winRate: 67, avgSettlement: 175000, avgDuration: 24 },
      { name: 'Western District', casesFiled: 2450, winRate: 65, avgSettlement: 168000, avgDuration: 25 },
      { name: 'Middle District', casesFiled: 1680, winRate: 62, avgSettlement: 150000, avgDuration: 27 },
    ],
    solYears: 2,
    solType: 'Personal Injury',
  },
  OH: {
    name: 'Ohio',
    districts: [
      { name: 'Northern District', casesFiled: 2890, winRate: 64, avgSettlement: 160000, avgDuration: 26 },
      { name: 'Southern District', casesFiled: 2560, winRate: 66, avgSettlement: 170000, avgDuration: 25 },
    ],
    solYears: 2,
    solType: 'Personal Injury',
  },
  GA: {
    name: 'Georgia',
    districts: [
      { name: 'Northern District', casesFiled: 2780, winRate: 68, avgSettlement: 180000, avgDuration: 23 },
      { name: 'Middle District', casesFiled: 2150, winRate: 65, avgSettlement: 165000, avgDuration: 25 },
      { name: 'Southern District', casesFiled: 1680, winRate: 63, avgSettlement: 155000, avgDuration: 26 },
    ],
    solYears: 2,
    solType: 'Personal Injury',
  },
  MI: {
    name: 'Michigan',
    districts: [
      { name: 'Eastern District', casesFiled: 2450, winRate: 66, avgSettlement: 172000, avgDuration: 24 },
      { name: 'Western District', casesFiled: 1890, winRate: 63, avgSettlement: 158000, avgDuration: 26 },
    ],
    solYears: 3,
    solType: 'Contract',
  },
  NC: {
    name: 'North Carolina',
    districts: [
      { name: 'Eastern District', casesFiled: 2120, winRate: 67, avgSettlement: 175000, avgDuration: 24 },
      { name: 'Middle District', casesFiled: 1780, winRate: 65, avgSettlement: 165000, avgDuration: 25 },
      { name: 'Western District', casesFiled: 1450, winRate: 64, avgSettlement: 160000, avgDuration: 26 },
    ],
    solYears: 3,
    solType: 'Contract',
  },
};

const NATIONAL_AVG_WIN_RATE = 67;
const TRANSLATIONS = {
  en: {
    title: 'District Court Breakdown',
    selectState: 'Select a state to see district-level data',
    summary: 'State Summary',
    totalCases: 'Total Cases Filed',
    overallWinRate: 'Overall Win Rate',
    vsNational: 'vs National Average',
    sol: 'Statute of Limitations',
    years: 'years',
    avgSettlement: 'Avg Settlement',
    avgDuration: 'Avg Duration (months)',
    winRate: 'Win Rate',
  },
  es: {
    title: 'Desglose de Corte de Distrito',
    selectState: 'Selecciona un estado para ver datos a nivel de distrito',
    summary: 'Resumen Estatal',
    totalCases: 'Total de Demandas',
    overallWinRate: 'Tasa de Éxito General',
    vsNational: 'vs Promedio Nacional',
    sol: 'Plazo de Prescripción',
    years: 'años',
    avgSettlement: 'Acuerdo Promedio',
    avgDuration: 'Duración Promedio (meses)',
    winRate: 'Tasa de Éxito',
  },
};

interface StateDeepDiveProps {
  lang?: string;
  stateCode?: string;
  nos?: string;
}

const StateDeepDive: React.FC<StateDeepDiveProps> = ({ lang = 'en', stateCode, nos }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  useEffect(() => {
    if (!stateCode || !STATE_DATA[stateCode]) return;

    const updateTimer = () => {
      const now = new Date();
      const nextYear = new Date(now.getFullYear() + 1, 0, 1);
      const diff = Math.ceil((nextYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      setTimeRemaining(`${diff} days`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [stateCode]);

  if (!stateCode || !STATE_DATA[stateCode]) {
    return (
      <div className="p-8 text-center rounded-lg" style={{ backgroundColor: '#0B1221' }}>
        <p style={{ color: '#B0BDD0' }}>{t.selectState}</p>
      </div>
    );
  }

  const state = STATE_DATA[stateCode];
  const totalCases = state.districts.reduce((sum, d) => sum + d.casesFiled, 0);
  const avgWinRate = Math.round(
    state.districts.reduce((sum, d) => sum + d.winRate, 0) / state.districts.length
  );
  const winRateDiff = avgWinRate - NATIONAL_AVG_WIN_RATE;

  return (
    <div className="w-full space-y-6 p-6" style={{ backgroundColor: '#0B1221' }}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#E2E8F0' }}>
          {state.name} {t.title}
        </h2>
        <p style={{ color: '#B0BDD0' }}>District-level litigation analytics</p>
      </div>

      {/* State Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#131B2E', borderColor: '#1E293B', borderWidth: 1 }}>
          <p style={{ color: '#B0BDD0' }} className="text-sm mb-1">
            {t.totalCases}
          </p>
          <p className="text-2xl font-bold" style={{ color: '#4F46E5' }}>
            {totalCases.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#131B2E', borderColor: '#1E293B', borderWidth: 1 }}>
          <p style={{ color: '#B0BDD0' }} className="text-sm mb-1">
            {t.overallWinRate}
          </p>
          <p className="text-2xl font-bold" style={{ color: '#0D9488' }}>
            {avgWinRate}%
          </p>
          <p style={{ color: '#4F46E5' }} className="text-xs mt-1">
            {winRateDiff > 0 ? '+' : ''}{winRateDiff}% {t.vsNational}
          </p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#131B2E', borderColor: '#1E293B', borderWidth: 1 }}>
          <p style={{ color: '#B0BDD0' }} className="text-sm mb-1">
            {t.sol}
          </p>
          <p className="text-2xl font-bold" style={{ color: '#E2E8F0' }}>
            {state.solYears} {t.years}
          </p>
          <p style={{ color: '#4F46E5' }} className="text-xs mt-1">
            {state.solType}
          </p>
        </div>
      </div>

      {/* District Cards */}
      <div className="space-y-3">
        {state.districts.map((district, idx) => (
          <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: '#131B2E', borderColor: '#1E293B', borderWidth: 1 }}>
            <h3 className="font-semibold mb-3" style={{ color: '#E2E8F0' }}>
              {district.name}
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p style={{ color: '#B0BDD0' }} className="text-xs mb-1">
                  {t.totalCases}
                </p>
                <p className="text-lg font-bold" style={{ color: '#4F46E5' }}>
                  {district.casesFiled.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ color: '#B0BDD0' }} className="text-xs mb-1">
                  {t.winRate}
                </p>
                <p className="text-lg font-bold" style={{ color: '#0D9488' }}>
                  {district.winRate}%
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p style={{ color: '#B0BDD0' }} className="text-xs mb-1">
                  {t.avgSettlement}
                </p>
                <p className="text-sm font-semibold" style={{ color: '#E2E8F0' }}>
                  ${(district.avgSettlement / 1000).toFixed(0)}K
                </p>
              </div>
              <div>
                <p style={{ color: '#B0BDD0' }} className="text-xs mb-1">
                  {t.avgDuration}
                </p>
                <p className="text-sm font-semibold" style={{ color: '#E2E8F0' }}>
                  {district.avgDuration}mo
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statute of Limitations Timer */}
      {timeRemaining && (
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#131B2E', borderColor: '#0D9488', borderWidth: 2 }}>
          <p style={{ color: '#B0BDD0' }} className="text-sm mb-2">
             {t.sol} Countdown
          </p>
          <p className="text-xl font-bold" style={{ color: '#0D9488' }}>
            {timeRemaining}
          </p>
          <p style={{ color: '#4F46E5' }} className="text-xs mt-2">
            {state.solYears} {t.years} - {state.solType}
          </p>
        </div>
      )}
    </div>
  );
};

export default StateDeepDive;
