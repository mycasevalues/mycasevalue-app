'use client';

/* EXTRACTED from MyCaseValue.tsx — TrendSparkline mini sparkline for yearly trend */

import React from 'react';

interface TrendSparklineProps {
  data: Record<string, { total: number; wr: number }>;
  width?: number;
  height?: number;
}

export function TrendSparkline({ data, width = 120, height = 32 }: TrendSparklineProps) {
  const years = Object.keys(data).sort();
  if (years.length < 3) return null;
  const vals = years.map(y => data[y].wr);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const points = vals.map((v, i) =>
    `${(i / (vals.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ');
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline points={points} fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default TrendSparkline;
