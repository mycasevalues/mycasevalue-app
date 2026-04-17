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
    <div className="w-full p-6" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '6px' }}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#EDEEEE" vertical={false} />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 12, fill: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
            axisLine={{ stroke: 'var(--border-default)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            cursor={{ fill: 'rgba(17,17,17,0.04)' }}
            contentStyle={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              padding: '8px 14px',
              color: 'var(--color-text-primary)',
            }}
            formatter={(value: number) => [`${value}%`, lang === 'es' ? 'Porcentaje' : 'Percentage']}
          />
          <Bar dataKey="pct" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={index === highlightIndex
                  ? 'var(--accent-primary)'
                  : entry.pct === maxPct
                    ? 'var(--accent-primary)'
                    : 'rgba(10, 102, 194, 0.15)'
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
