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
  primaryColor = '#0A66C2', compareColor = '#F0F2F5',
  unit = '%', lang = 'en',
}: ComparisonBarProps) {
  const hasCompare = data.some(d => d.compare !== undefined);

  return (
    <div className="w-full p-6" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="#EDEEEE" vertical={false} />
          <XAxis
            dataKey="name"
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
            cursor={{ fill: 'rgba(17,17,17,0.04)' }}
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
            formatter={(value: number) => [`${value}${unit}`]}
          />
          {hasCompare && (
            <Legend
              wrapperStyle={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: '#4B5563' }}
            />
          )}
          <Bar
            dataKey="primary"
            name={primaryLabel}
            fill={primaryColor}
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
          {hasCompare && (
            <Bar
              dataKey="compare"
              name={compareLabel || ''}
              fill={compareColor}
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
