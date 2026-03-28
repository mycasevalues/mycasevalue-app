'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendLineProps {
  data: { year: string | number; value: number }[];
  color?: string;
  gradientId?: string;
  label?: string;
  unit?: string;
  lang?: 'en' | 'es';
}

export function TrendLine({
  data, color = '#4F46E5', gradientId = 'trendGrad',
  label, unit = '', lang = 'en',
}: TrendLineProps) {
  return (
    <div className="w-full">
      {label && (
        <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-3">{label}</div>
      )}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,41,59,0.5)" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={{ stroke: '#1E293B' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}${unit}`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15,23,42,0.95)',
              border: '1px solid #1E293B',
              borderRadius: '10px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              fontSize: '13px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              padding: '8px 14px',
              color: '#F0F2F5',
            }}
            formatter={(value: number) => [`${value.toLocaleString()}${unit}`, label || (lang === 'es' ? 'Valor' : 'Value')]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
