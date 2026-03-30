'use client';

import React, { useState, useEffect } from 'react';

interface Range {
  label: string;
  count: number;
  percentage: number;
}

interface SettlementHistogramProps {
  ranges?: Range[];
  median: number;
  userAmount?: number;
  color?: string;
  lang?: 'en' | 'es';
}

export function generateDemoRanges(nos?: string): Range[] {
  // Realistic employment case settlement distribution
  return [
    { label: '<$10K', count: 145, percentage: 12 },
    { label: '$10K-$50K', count: 312, percentage: 26 },
    { label: '$50K-$100K', count: 285, percentage: 24 },
    { label: '$100K-$250K', count: 268, percentage: 22 },
    { label: '$250K-$500K', count: 115, percentage: 10 },
    { label: '$500K-$1M', count: 48, percentage: 4 },
    { label: '>$1M', count: 12, percentage: 2 },
  ];
}

const getBarColor = (percentage: number, maxPercentage: number): string => {
  // Color gradient from cool blue (lower amounts) to warm gold/green (higher amounts)
  const ratio = percentage / maxPercentage;

  if (ratio < 0.2) {
    return '#3B82F6'; // Blue
  } else if (ratio < 0.4) {
    return '#06B6D4'; // Cyan
  } else if (ratio < 0.6) {
    return '#10B981'; // Green
  } else if (ratio < 0.8) {
    return '#F59E0B'; // Amber
  } else {
    return '#F97316'; // Orange
  }
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function SettlementHistogram({
  ranges,
  median,
  userAmount,
  color,
  lang = 'en',
}: SettlementHistogramProps) {
  const [animatedRanges, setAnimatedRanges] = useState<boolean[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayRanges = ranges || generateDemoRanges();
  const maxPercentage = Math.max(...displayRanges.map((r) => r.percentage));

  useEffect(() => {
    // Trigger stagger animation on mount
    setAnimatedRanges(new Array(displayRanges.length).fill(false));

    displayRanges.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedRanges((prev) => {
          const newAnimated = [...prev];
          newAnimated[index] = true;
          return newAnimated;
        });
      }, index * 80);
    });
  }, [displayRanges.length]);

  const chartHeight = 300;
  const chartWidth = 600;
  const barWidth = chartWidth / displayRanges.length;
  const padding = 40;

  // Calculate pixel positions for median and user amount
  const medianPercent = (median / 1000000) * 100; // Normalize to percentage
  const medianX = padding + (medianPercent / 100) * (chartWidth - padding * 2);

  const userPercent = userAmount ? (userAmount / 1000000) * 100 : null;
  const userX = userPercent ? padding + (userPercent / 100) * (chartWidth - padding * 2) : null;

  return (
    <div className="w-full rounded-lg p-6" style={{ backgroundColor: '#131B2E' }}>
      {/* Header */}
      <div className="mb-6">
        <h3
          className="text-lg font-semibold"
          style={{ color: '#F0F2F5' }}
        >
          {lang === 'en' ? 'Settlement Distribution' : 'Distribución de Acuerdos'}
        </h3>
        <p
          className="text-sm mt-1"
          style={{ color: '#94A3B8' }}
        >
          {lang === 'en'
            ? `Median settlement: ${formatCurrency(median)}`
            : `Acuerdo mediano: ${formatCurrency(median)}`}
        </p>
      </div>

      {/* Chart Container */}
      <div className="relative overflow-x-auto">
        <svg
          width={chartWidth + padding * 2}
          height={chartHeight + padding * 2}
          className="mx-auto"
        >
          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight + padding}
            stroke="#1E293B"
            strokeWidth={2}
          />

          {/* X-axis */}
          <line
            x1={padding}
            y1={chartHeight + padding}
            x2={chartWidth + padding}
            y2={chartHeight + padding}
            stroke="#1E293B"
            strokeWidth={2}
          />

          {/* Y-axis labels (percentage) */}
          {[0, 25, 50, 75, 100].map((percent) => {
            const y = chartHeight + padding - (percent / 100) * chartHeight;
            return (
              <g key={`y-label-${percent}`}>
                <line
                  x1={padding - 5}
                  y1={y}
                  x2={padding}
                  y2={y}
                  stroke="#1E293B"
                  strokeWidth={1}
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={12}
                  fill="#94A3B8"
                >
                  {percent}%
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {displayRanges.map((range, index) => {
            const barHeight = animatedRanges[index]
              ? (range.percentage / 100) * chartHeight
              : 0;
            const x = padding + index * barWidth + barWidth * 0.1;
            const y = chartHeight + padding - barHeight;
            const width = barWidth * 0.8;

            return (
              <g
                key={`bar-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={barHeight}
                  fill={getBarColor(range.percentage, maxPercentage)}
                  style={{
                    transition: 'all 0.6s ease-out',
                    opacity: hoveredIndex === index ? 1 : 0.85,
                    filter:
                      hoveredIndex === index ? 'brightness(1.2)' : 'brightness(1)',
                  }}
                />

                {/* Hover tooltip */}
                {hoveredIndex === index && (
                  <g>
                    <rect
                      x={x + width / 2 - 50}
                      y={y - 50}
                      width={100}
                      height={40}
                      fill="#0F172A"
                      stroke="#1E293B"
                      strokeWidth={1}
                      rx={4}
                    />
                    <text
                      x={x + width / 2}
                      y={y - 28}
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight="bold"
                      fill="#F0F2F5"
                    >
                      {range.count}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y - 14}
                      textAnchor="middle"
                      fontSize={11}
                      fill="#94A3B8"
                    >
                      {range.percentage}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Median marker line */}
          <line
            x1={medianX}
            y1={padding}
            x2={medianX}
            y2={chartHeight + padding}
            stroke="#10B981"
            strokeWidth={2}
            strokeDasharray="4,4"
          />
          <circle cx={medianX} cy={padding - 10} r={4} fill="#10B981" />
          <text
            x={medianX}
            y={padding - 20}
            textAnchor="middle"
            fontSize={12}
            fontWeight="bold"
            fill="#10B981"
          >
            {lang === 'en' ? 'Median' : 'Mediana'}
          </text>

          {/* User amount marker line */}
          {userX !== null && (
            <>
              <line
                x1={userX}
                y1={padding}
                x2={userX}
                y2={chartHeight + padding}
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="4,4"
              />
              <circle cx={userX} cy={padding - 10} r={4} fill="#F59E0B" />
              <text
                x={userX}
                y={padding - 20}
                textAnchor="middle"
                fontSize={12}
                fontWeight="bold"
                fill="#F59E0B"
              >
                {lang === 'en' ? 'Your Amount' : 'Tu Cantidad'}
              </text>
            </>
          )}

          {/* X-axis labels */}
          {displayRanges.map((range, index) => {
            const x = padding + index * barWidth + barWidth / 2;
            return (
              <text
                key={`x-label-${index}`}
                x={x}
                y={chartHeight + padding + 25}
                textAnchor="middle"
                fontSize={11}
                fill="#94A3B8"
              >
                {range.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#10B981' }}
          />
          <span className="text-sm" style={{ color: '#94A3B8' }}>
            {lang === 'en' ? 'Median' : 'Mediana'}
          </span>
        </div>
        {userAmount && (
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#F59E0B' }}
            />
            <span className="text-sm" style={{ color: '#94A3B8' }}>
              {lang === 'en' ? 'Your Amount' : 'Tu Cantidad'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
