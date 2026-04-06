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
  data, color = '#6D28D9', gradientId = 'trendGrad',
  label, unit = '', lang = 'en',
}: TrendLineProps) {
  return (
    <div className="w-full p-6" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
      {label && (
        <div className="text-[13px] font-bold tracking-[0.5px] text-[#4B5563] mb-4" style={{ fontFamily: 'var(--font-display)' }}>{label}</div>
      )}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDEEEE" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: '#4B5563', fontFamily: 'var(--font-body)' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#4B5563' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}${unit}`}
          />
          <Tooltip
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              padding: '8px 14px',
              color: '#0f0f0f',
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
