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
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,41,59,0.5)" vertical={false} />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={{ stroke: '#1E293B' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
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
            formatter={(value: number) => [`${value}%`, lang === 'es' ? 'Porcentaje' : 'Percentage']}
          />
          <Bar dataKey="pct" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={index === highlightIndex
                  ? '#4F46E5'
                  : entry.pct === maxPct
                    ? '#0D9488'
                    : 'rgba(64,64,242,0.25)'
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
            <th>{lang === 'es' ? 'Rango' : 'Range'}</th>
            <th>{lang === 'es' ? 'Porcentaje' : 'Percentage'}</th>
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
