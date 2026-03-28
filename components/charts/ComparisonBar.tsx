'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ComparisonBarProps {
  data: { name: string; primary: number; compare?: number }[];
  primaryLabel: string;
  compareLabel?: string;
  primaryColor?: string;
  compareColor?: string;
  unit?: string;
  lang?: 'en' | 'es';
}

export function ComparisonBar({
  data, primaryLabel, compareLabel,
  primaryColor = '#4F46E5', compareColor = '#0D9488',
  unit = '%', lang = 'en',
}: ComparisonBarProps) {
  const hasCompare = data.some(d => d.compare !== undefined);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,41,59,0.5)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Outfit, system-ui, sans-serif' }}
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
            cursor={{ fill: 'rgba(64,64,242,0.04)' }}
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
            formatter={(value: number) => [`${value}${unit}`]}
          />
          {hasCompare && (
            <Legend
              wrapperStyle={{ fontSize: '12px', fontFamily: 'Outfit, system-ui, sans-serif' }}
            />
          )}
          <Bar
            dataKey="primary"
            name={primaryLabel}
            fill={primaryColor}
            radius={[6, 6, 0, 0]}
            animationDuration={800}
          />
          {hasCompare && (
            <Bar
              dataKey="compare"
              name={compareLabel || ''}
              fill={compareColor}
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
