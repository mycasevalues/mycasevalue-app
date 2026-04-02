'use client';

import React, { useState } from 'react';

export interface CaseTypeOption {
  nos: string;
  label: string;
  category: string;
}

export interface CaseComparisonMetrics {
  winRate: number;
  settlementPct: number;
  months: number;
  medianRecovery: string;
  totalCases: number;
}

export interface CaseCompareToolProps {
  lang?: 'en' | 'es';
  availableCaseTypes: CaseTypeOption[];
  dataMap: Record<string, CaseComparisonMetrics>;
}

export function CaseCompareTool({
  lang = 'en',
  availableCaseTypes,
  dataMap,
}: CaseCompareToolProps) {
  const [selectedCases, setSelectedCases] = useState<string[]>([availableCaseTypes[0]?.nos || '']);
  const es = lang === 'es';

  const text = {
    en: {
      selectCaseType: 'Select Case Type',
      compare: 'Compare',
      winRate: 'Win Rate',
      settlementRate: 'Settlement %',
      duration: 'Avg Duration (mo)',
      medianRecovery: 'Median Recovery',
      cases: 'Cases',
      best: 'Best',
      compareCases: 'Compare Cases',
      addComparison: 'Add another',
      removeComparison: 'Remove',
    },
    es: {
      selectCaseType: 'Seleccionar tipo de caso',
      compare: 'Comparar',
      winRate: 'Tasa de éxito',
      settlementRate: '% Acuerdos',
      duration: 'Duración promedio (meses)',
      medianRecovery: 'Recuperación mediana',
      cases: 'Casos',
      best: 'Mejor',
      compareCases: 'Comparar casos',
      addComparison: 'Agregar otro',
      removeComparison: 'Eliminar',
    },
  };

  const t = text[es ? 'es' : 'en'];

  const handleSelectChange = (index: number, value: string) => {
    const newSelected = [...selectedCases];
    newSelected[index] = value;
    setSelectedCases(newSelected);
  };

  const handleAddComparison = () => {
    if (selectedCases.length < 3) {
      setSelectedCases([...selectedCases, availableCaseTypes[0]?.nos || '']);
    }
  };

  const handleRemoveComparison = (index: number) => {
    const newSelected = selectedCases.filter((_, i) => i !== index);
    setSelectedCases(newSelected);
  };

  // Get data for selected cases
  const comparisons = selectedCases
    .filter((nos) => nos && dataMap[nos])
    .map((nos) => ({
      nos,
      label: availableCaseTypes.find((ct) => ct.nos === nos)?.label || nos,
      data: dataMap[nos],
    }));

  // Helper to find best value in a metric
  const findBest = (metric: 'winRate' | 'settlementPct' | 'months' | 'totalCases', isHigherBetter: boolean): string => {
    if (comparisons.length === 0) return '';
    const values = comparisons.map((c) => c.data[metric] as number);
    if (isHigherBetter) {
      return comparisons[values.indexOf(Math.max(...values))].nos;
    } else {
      return comparisons[values.indexOf(Math.min(...values))].nos;
    }
  };

  const bestWinRate = findBest('winRate', true);
  const bestSettlement = findBest('settlementPct', true);
  const bestDuration = findBest('months', false);
  const bestCaseVolume = findBest('totalCases', true);

  return (
    <div className="w-full rounded-2xl border border-[rgba(17,17,17,0.2)] p-6 md:p-8 shadow-lg" style={{ backgroundColor: '#F9F8F6' }}>
      {/* Title */}
      <h2 className="text-2xl font-display font-bold text-[#111827] mb-6">{t.compareCases}</h2>

      {/* Selectors */}
      <div className="mb-8 space-y-3">
        {selectedCases.map((selected, index) => (
          <div key={index} className="flex gap-3 items-center">
            <select
              value={selected}
              onChange={(e) => handleSelectChange(index, e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-[#E5E0D8] border border-[rgba(17,17,17,0.3)] text-[#111827] hover:border-[rgba(17,17,17,0.5)] focus:outline-none focus:border-[rgba(17,17,17,0.6)]"
            >
              <option value="">{t.selectCaseType}</option>
              {availableCaseTypes.map((ct) => (
                <option key={ct.nos} value={ct.nos}>
                  {ct.label}
                </option>
              ))}
            </select>
            {index > 0 && (
              <button type="button"
                onClick={() => handleRemoveComparison(index)}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-[#334155] hover:bg-[#4B5563] text-[#111827] transition-colors"
              >
                {t.removeComparison}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Comparison Button */}
      {selectedCases.length < 3 && (
        <button type="button"
          onClick={handleAddComparison}
          className="mb-8 px-4 py-2 rounded-lg text-sm font-medium bg-[rgba(17,17,17,0.15)] border border-[rgba(17,17,17,0.3)] text-[#8B5CF6] hover:bg-[rgba(17,17,17,0.25)] hover:border-[rgba(17,17,17,0.5)] transition-all"
        >
          + {t.addComparison}
        </button>
      )}

      {/* Comparison Table/Cards */}
      {comparisons.length > 0 ? (
        <div className="overflow-x-auto">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[rgba(17,17,17,0.2)]">
                  <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
                    {t.compare}
                  </th>
                  {comparisons.map((comp) => (
                    <th scope="col" key={comp.nos} className="text-center px-4 py-3 text-sm font-semibold text-[#8B5CF6]">
                      {comp.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Win Rate Row */}
                <tr className="border-b border-[rgba(17,17,17,0.1)] hover:bg-[rgba(17,17,17,0.05)] transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-[#6B7280]">{t.winRate}</td>
                  {comparisons.map((comp) => (
                    <td key={comp.nos} className="text-center px-4 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="text-lg font-bold font-display"
                          style={{ color: comp.nos === bestWinRate ? '#0D9488' : '#333333' }}
                        >
                          {comp.data.winRate}%
                        </div>
                        {comp.nos === bestWinRate && (
                          <span className="text-[10px] font-semibold text-[#0D9488] bg-[rgba(13,148,136,0.2)] px-2 py-0.5 rounded">
                            {t.best}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Settlement % Row */}
                <tr className="border-b border-[rgba(17,17,17,0.1)] hover:bg-[rgba(17,17,17,0.05)] transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-[#6B7280]">{t.settlementRate}</td>
                  {comparisons.map((comp) => (
                    <td key={comp.nos} className="text-center px-4 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="text-lg font-bold font-display"
                          style={{ color: comp.nos === bestSettlement ? '#D97706' : '#333333' }}
                        >
                          {comp.data.settlementPct}%
                        </div>
                        {comp.nos === bestSettlement && (
                          <span className="text-[10px] font-semibold text-[#D97706] bg-[rgba(217,119,6,0.2)] px-2 py-0.5 rounded">
                            {t.best}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Duration Row */}
                <tr className="border-b border-[rgba(17,17,17,0.1)] hover:bg-[rgba(17,17,17,0.05)] transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-[#6B7280]">{t.duration}</td>
                  {comparisons.map((comp) => (
                    <td key={comp.nos} className="text-center px-4 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="text-lg font-bold font-display"
                          style={{ color: comp.nos === bestDuration ? '#0D9488' : '#333333' }}
                        >
                          {comp.data.months}
                        </div>
                        {comp.nos === bestDuration && (
                          <span className="text-[10px] font-semibold text-[#0D9488] bg-[rgba(13,148,136,0.2)] px-2 py-0.5 rounded">
                            {t.best}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Median Recovery Row */}
                <tr className="border-b border-[rgba(17,17,17,0.1)] hover:bg-[rgba(17,17,17,0.05)] transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-[#6B7280]">{t.medianRecovery}</td>
                  {comparisons.map((comp) => (
                    <td key={comp.nos} className="text-center px-4 py-4">
                      <div className="text-lg font-bold font-display" style={{ color: '#D97706' }}>
                        {comp.data.medianRecovery}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Cases Row */}
                <tr className="border-b border-[rgba(17,17,17,0.1)] hover:bg-[rgba(17,17,17,0.05)] transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-[#6B7280]">{t.cases}</td>
                  {comparisons.map((comp) => (
                    <td key={comp.nos} className="text-center px-4 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="text-lg font-bold font-display"
                          style={{ color: comp.nos === bestCaseVolume ? '#8B5CF6' : '#333333' }}
                        >
                          {(comp.data.totalCases / 1000).toFixed(0)}K
                        </div>
                        {comp.nos === bestCaseVolume && (
                          <span className="text-[10px] font-semibold text-[#8B5CF6] bg-[rgba(165,180,252,0.2)] px-2 py-0.5 rounded">
                            {t.best}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {comparisons.map((comp) => (
              <div key={comp.nos} className="border border-[rgba(17,17,17,0.2)] rounded-lg p-4 bg-[#E5E0D8]">
                <h3 className="text-lg font-bold text-[#8B5CF6] mb-4 font-display">{comp.label}</h3>

                <div className="space-y-3">
                  {/* Win Rate */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">{t.winRate}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-bold font-display"
                        style={{ color: comp.nos === bestWinRate ? '#0D9488' : '#333333' }}
                      >
                        {comp.data.winRate}%
                      </span>
                      {comp.nos === bestWinRate && (
                        <span className="text-[10px] font-semibold text-[#0D9488] bg-[rgba(13,148,136,0.2)] px-2 py-0.5 rounded">
                          {t.best}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Settlement Rate */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">{t.settlementRate}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-bold font-display"
                        style={{ color: comp.nos === bestSettlement ? '#D97706' : '#333333' }}
                      >
                        {comp.data.settlementPct}%
                      </span>
                      {comp.nos === bestSettlement && (
                        <span className="text-[10px] font-semibold text-[#D97706] bg-[rgba(217,119,6,0.2)] px-2 py-0.5 rounded">
                          {t.best}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">{t.duration}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-bold font-display"
                        style={{ color: comp.nos === bestDuration ? '#0D9488' : '#333333' }}
                      >
                        {comp.data.months}
                      </span>
                      {comp.nos === bestDuration && (
                        <span className="text-[10px] font-semibold text-[#0D9488] bg-[rgba(13,148,136,0.2)] px-2 py-0.5 rounded">
                          {t.best}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Median Recovery */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">{t.medianRecovery}</span>
                    <span className="text-lg font-bold font-display" style={{ color: '#D97706' }}>
                      {comp.data.medianRecovery}
                    </span>
                  </div>

                  {/* Cases */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B7280]">{t.cases}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-bold font-display"
                        style={{ color: comp.nos === bestCaseVolume ? '#8B5CF6' : '#333333' }}
                      >
                        {(comp.data.totalCases / 1000).toFixed(0)}K
                      </span>
                      {comp.nos === bestCaseVolume && (
                        <span className="text-[10px] font-semibold text-[#8B5CF6] bg-[rgba(165,180,252,0.2)] px-2 py-0.5 rounded">
                          {t.best}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-[#9CA3AF] text-sm">{t.selectCaseType}</p>
        </div>
      )}
    </div>
  );
}

export default CaseCompareTool;
