'use client';

import React, { useState, useMemo } from 'react';

export interface CaseTypeTrend {
  caseType: string;
  caseTypeEs: string;
  filingCount: number;
  changePercent: number; // positive = rising, negative = declining
  trend: 'rising' | 'declining' | 'steady';
  sparklineData: number[]; // last 12 months of filing counts
}

export interface CaseTypePopularityPulseProps {
  trends: CaseTypeTrend[];
  lastUpdated: string; // ISO date
  lang?: 'en' | 'es';
}

// Utility to generate SVG sparkline
function generateSparklinePath(data: number[], width: number = 60, height: number = 24): string {
  if (data.length === 0) return '';

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return [x, y];
  });

  if (points.length === 1) {
    return `M ${points[0][0]} ${points[0][1]}`;
  }

  const pathData = points.map(([x, y], idx) => {
    if (idx === 0) return `M ${x} ${y}`;
    return `L ${x} ${y}`;
  }).join(' ');

  return pathData;
}

// Sparkline component
function Sparkline({
  data,
  trend,
}: {
  data: number[];
  trend: 'rising' | 'declining' | 'steady';
}): React.ReactElement {
  const width = 60;
  const height = 24;
  const pathData = generateSparklinePath(data, width, height);

  let strokeColor = '#6B7280'; // steady - gray
  if (trend === 'rising') {
    strokeColor = '#16A34A'; // green
  } else if (trend === 'declining') {
    strokeColor = '#DC2626'; // red
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d={pathData}
        stroke={strokeColor}
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Trend badge with icon
function TrendBadge({ changePercent }: { changePercent: number }): React.ReactElement {
  const isRising = changePercent > 0;
  const isDecline = changePercent < 0;
  const isNeutral = changePercent === 0;

  const bgColor = isRising ? '#F0FDF4' : isDecline ? '#FEF2F2' : '#F9FAFB';
  const textColor = isRising ? '#16A34A' : isDecline ? '#DC2626' : '#6B7280';
  const icon = isRising ? '↑' : isDecline ? '↓' : '→';

  return (
    <div
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-mono"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <span>{icon}</span>
      <span>{Math.abs(changePercent)}%</span>
    </div>
  );
}

// Pulsing dot animation for rising trends
function PulsingDot(): React.ReactElement {
  return (
    <div className="relative inline-block">
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(22, 163, 74, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
          }
        }
      `}</style>
      <div
        className="absolute w-2 h-2 bg-[#16A34A] rounded-full"
        style={{
          animation: 'pulse-ring 2s infinite',
          top: '-6px',
          right: '-6px',
        }}
      />
      <div className="w-2 h-2 bg-[#16A34A] rounded-full" />
    </div>
  );
}

export function CaseTypePopularityPulse({
  trends,
  lastUpdated,
  lang = 'en',
}: CaseTypePopularityPulseProps): React.ReactElement {
  const es = lang === 'es';
  const [sortBy, setSortBy] = useState<'filings' | 'change'>('filings');

  const sortedTrends = useMemo(() => {
    const sorted = [...trends].slice(0, 10);
    if (sortBy === 'filings') {
      return sorted.sort((a, b) => b.filingCount - a.filingCount);
    } else {
      return sorted.sort(
        (a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)
      );
    }
  }, [trends, sortBy]);

  // Format last updated time
  const updatedDate = new Date(lastUpdated);
  const formattedTime = updatedDate.toLocaleTimeString(es ? 'es-ES' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = updatedDate.toLocaleDateString(es ? 'es-ES' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });

  const labels = {
    title: es ? 'Pulso de Popularidad de Tipos de Casos' : 'Case Type Popularity Pulse',
    subtitle: es ? 'Tendencias de presentaciones federales en tiempo real' : 'Real-time federal filing trends',
    sortByFilings: es ? 'Por presentaciones' : 'By filings',
    sortByChange: es ? 'Por cambio' : 'By change',
    lastUpdated: es ? 'Última actualización' : 'Last updated',
    filings: es ? 'Presentaciones' : 'Filings',
    change: es ? 'Cambio' : 'Change',
    trend: es ? 'Tendencia' : 'Trend',
  };

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E5E0D8] rounded-[12px] p-6 transition-all duration-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h2 className="text-xl font-display font-bold text-[#111827]">
              {labels.title}
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              {labels.subtitle}
            </p>
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex items-center gap-2 mt-4">
          <div className="inline-flex gap-1 bg-[#F9FAFB] border border-[#E5E0D8] rounded-lg p-1">
            <button
              onClick={() => setSortBy('filings')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                sortBy === 'filings'
                  ? 'bg-[#FFFFFF] text-[#8B5CF6] border border-[#E5E0D8] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
              aria-pressed={sortBy === 'filings'}
            >
              {labels.sortByFilings}
            </button>
            <button
              onClick={() => setSortBy('change')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                sortBy === 'change'
                  ? 'bg-[#FFFFFF] text-[#8B5CF6] border border-[#E5E0D8] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
              aria-pressed={sortBy === 'change'}
            >
              {labels.sortByChange}
            </button>
          </div>
        </div>
      </div>

      {/* Trends List */}
      <div className="space-y-3 mb-6">
        {sortedTrends.length === 0 ? (
          <div className="text-center py-8 text-[#6B7280] text-sm">
            {es ? 'Sin datos disponibles' : 'No trends available'}
          </div>
        ) : (
          sortedTrends.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#F9FAFB] hover:bg-[#F5F3EF] transition-colors border border-[#E5E0D8]/50"
            >
              {/* Index */}
              <div className="relative">
                <div className="text-xs font-mono font-bold text-[#6B7280] w-6 text-center">
                  {idx + 1}
                </div>
                {item.trend === 'rising' && (
                  <PulsingDot />
                )}
              </div>

              {/* Case Type Name */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#111827]">
                  {es ? item.caseTypeEs : item.caseType}
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5 truncate">
                  {es ? item.caseType : item.caseTypeEs}
                </div>
              </div>

              {/* Sparkline */}
              <div className="shrink-0">
                <Sparkline data={item.sparklineData} trend={item.trend} />
              </div>

              {/* Filing Count */}
              <div className="shrink-0 text-right min-w-fit">
                <div className="text-sm font-mono font-bold text-[#111827]">
                  {(item.filingCount / 1000).toFixed(1)}K
                </div>
                <div className="text-xs text-[#6B7280] font-mono mt-0.5">
                  {labels.filings}
                </div>
              </div>

              {/* Change Badge */}
              <div className="shrink-0">
                <TrendBadge changePercent={item.changePercent} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E5E0D8]">
        <div className="text-xs text-[#6B7280]">
          <span className="font-semibold">{labels.lastUpdated}:</span>{' '}
          {formattedDate} {formattedTime}
        </div>
        <div className="text-xs text-[#6B7280]">
          {es ? 'Datos del tribunal federal' : 'Federal court data'}
        </div>
      </div>
    </div>
  );
}

export default CaseTypePopularityPulse;
