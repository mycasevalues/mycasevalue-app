'use client';

import React, { useState, useMemo } from 'react';

interface TrendDataPoint {
  year: number;
  winRate: number;
  totalCases: number;
}

interface TrendChartProps {
  data?: TrendDataPoint[];
  color?: string;
  label?: string;
  lang?: 'en' | 'es';
  height?: number;
}

const darkModeColors = {
  bg: '#131B2E',
  border: '#1E293B',
  text: '#F0F2F5',
  muted: '#94A3B8',
  accent: '#4F46E5',
};

export const generateDemoData = (nos?: string): TrendDataPoint[] => {
  const baseYear = 2018;
  const years = 7; // 2018-2024
  const data: TrendDataPoint[] = [];

  for (let i = 0; i < years; i++) {
    const year = baseYear + i;
    // Generate varied win rates between 35-65% with some randomness
    const trend = 40 + (i * 3); // Slight upward trend
    const variance = Math.sin(i * 0.5) * 8;
    const winRate = Math.min(65, Math.max(35, trend + variance));

    data.push({
      year,
      winRate: Math.round(winRate * 10) / 10,
      totalCases: Math.floor(80 + ((i * 37 + 13) % 150)),
    });
  }

  return data;
};

const TrendChart: React.FC<TrendChartProps> = ({
  data,
  color = darkModeColors.accent,
  label,
  lang = 'en',
  height = 300,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const chartData = useMemo(
    () => data && data.length > 0 ? data : generateDemoData(),
    [data]
  );

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = 100;
  const chartHeight = height - padding.top - padding.bottom;

  const minYear = Math.min(...chartData.map((d) => d.year));
  const maxYear = Math.max(...chartData.map((d) => d.year));
  const yearRange = maxYear - minYear || 1;

  // Calculate SVG coordinates
  const points = chartData.map((d, index) => {
    const x = ((d.year - minYear) / yearRange) * chartWidth;
    const y = chartHeight - (d.winRate / 100) * chartHeight;
    return { ...d, x, y, index };
  });

  // Generate smooth cubic bezier path
  const generateSmoothPath = (points: typeof chartData & { x: number; y: number }[]): string => {
    if (points.length === 0) return '';
    if (points.length === 1) {
      return `M ${points[0].x} ${points[0].y}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];

      // Control point calculation for smooth bezier
      const cp1x = curr.x + (next.x - curr.x) / 3;
      const cp1y = curr.y + (next.y - curr.y) / 3;
      const cp2x = curr.x + (2 * (next.x - curr.x)) / 3;
      const cp2y = curr.y + (2 * (next.y - curr.y)) / 3;

      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${next.x} ${next.y}`;
    }

    return path;
  };

  const linePath = generateSmoothPath(points);
  const pathLength = 300; // Approximate for animation

  // Fill path (area under the line)
  const fillPath = linePath + ` L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  // Y-axis gridlines at 25%, 50%, 75%
  const gridlines = [25, 50, 75];
  const gridlineElements = gridlines.map((percent) => {
    const y = chartHeight - (percent / 100) * chartHeight;
    return (
      <line
        key={`grid-${percent}`}
        x1="0"
        y1={y}
        x2={chartWidth}
        y2={y}
        stroke={darkModeColors.border}
        strokeWidth="0.5"
        strokeDasharray="2,2"
        opacity="0.5"
      />
    );
  });

  // Y-axis labels
  const yAxisLabels = [0, 25, 50, 75, 100];
  const yLabels = yAxisLabels.map((percent) => {
    const y = chartHeight - (percent / 100) * chartHeight;
    return (
      <text
        key={`y-label-${percent}`}
        x="-5"
        y={y}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize="12"
        fill={darkModeColors.muted}
      >
        {percent}%
      </text>
    );
  });

  // X-axis labels (years)
  const xLabels = points.map((point) => (
    <text
      key={`x-label-${point.year}`}
      x={point.x}
      y={chartHeight + 5}
      textAnchor="middle"
      fontSize="12"
      fill={darkModeColors.muted}
    >
      {point.year}
    </text>
  ));

  // Interactive overlay for tooltips
  const interactivePoints = points.map((point) => (
    <circle
      key={`interactive-${point.index}`}
      cx={point.x}
      cy={point.y}
      r="5"
      fill="transparent"
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => {
        setHoveredIndex(point.index);
        setTooltipPos({ x: point.x, y: point.y });
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        setTooltipPos(null);
      }}
    />
  ));

  const labels = {
    en: {
      winRate: 'Win Rate',
      totalCases: 'Total Cases',
    },
    es: {
      winRate: 'Tasa de Victoria',
      totalCases: 'Casos Totales',
    },
  };

  const currentLabels = labels[lang];

  // Tooltip
  const tooltipContent =
    hoveredIndex !== null
      ? chartData[hoveredIndex]
      : null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        backgroundColor: darkModeColors.bg,
        border: `1px solid ${darkModeColors.border}`,
        borderRadius: '8px',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {label && (
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: darkModeColors.text,
            marginBottom: '16px',
          }}
        >
          {label}
        </div>
      )}

      <svg
        viewBox={`0 0 ${chartWidth + padding.left + padding.right} ${
          height - padding.top
        }`}
        style={{
          width: '100%',
          height: `${height - (label ? 40 : 0)}px`,
        }}
      >
        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke={darkModeColors.border}
          strokeWidth="1"
        />

        {/* X-axis */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke={darkModeColors.border}
          strokeWidth="1"
        />

        {/* Grid lines */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {gridlineElements}
        </g>

        {/* Y-axis labels */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {yLabels}
        </g>

        {/* X-axis labels */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {xLabels}
        </g>

        {/* Gradient definition */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor={color}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Fill area under line */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <path
            d={fillPath}
            fill="url(#chartGradient)"
            stroke="none"
          />
        </g>

        {/* Animated line */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
              animation: `dashDraw 2s ease-in-out forwards`,
            }}
          />
        </g>

        {/* Interactive points */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {interactivePoints}
          {hoveredIndex !== null && (
            <>
              <circle
                cx={points[hoveredIndex].x}
                cy={points[hoveredIndex].y}
                r="4"
                fill={color}
                style={{
                  animation: `pulse 1.5s ease-in-out infinite`,
                }}
              />
            </>
          )}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltipContent && tooltipPos && (
        <div
          style={{
            position: 'absolute',
            left: `${((tooltipPos.x + padding.left) / (chartWidth + padding.left + padding.right)) * 100}%`,
            top: `${((tooltipPos.y + padding.top) / height) * 100}%`,
            backgroundColor: darkModeColors.border,
            border: `1px solid ${darkModeColors.accent}`,
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '12px',
            color: darkModeColors.text,
            pointerEvents: 'none',
            transform: 'translate(-50%, -110%)',
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
            {tooltipContent.year}
          </div>
          <div>{currentLabels.winRate}: {tooltipContent.winRate.toFixed(1)}%</div>
          <div>{currentLabels.totalCases}: {tooltipContent.totalCases}</div>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes dashDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            r: 4;
            opacity: 1;
          }
          50% {
            r: 6;
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default TrendChart;
