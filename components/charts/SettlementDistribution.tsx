'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SettlementDistributionProps {
  data: { range: string; count: number; pct: number }[];
  highlightIndex?: number;
  lang?: 'en' | 'es';
}

export function SettlementDistribution({ data, highlightIndex, lang = 'en' }: SettlementDistributionProps) {
  const maxPct = Math.max(...data.map(d => d.pct));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(229,231,235,0.5)" vertical={false} />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 10, fill: '#6B7280', fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={{ stroke: '#E5E0D8' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            cursor={{ fill: 'rgba(17,17,17,0.04)' }}
            contentStyle={{
              background: 'rgba(15,23,42,0.95)',
              border: '1px solid #E5E0D8',
              borderRadius: '10px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              fontSize: '13px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              padding: '8px 14px',
              color: '#111827',
            }}
            formatter={(value: number) => [`${value}%`, lang === 'es' ? 'Porcentaje' : 'Percentage']}
          />
          <Bar dataKey="pct" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={index === highlightIndex
                  ? '#8B5CF6'
                  : entry.pct === maxPct
                    ? '#8B5CF6'
                    : 'rgba(139,92,246,0.25)'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Screen reader accessible table */}
      <table className="sr-only" aria-label={lang === 'es' ? 'Distribución de acuerdos' : 'Settlement distribution'}>
        <thead>
          <tr>
            <th scope="col">{lang === 'es' ? 'Rango' : 'Range'}</th>
            <th scope="col">{lang === 'es' ? 'Porcentaje' : 'Percentage'}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}><td>{d.range}</td><td>{d.pct}%</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
