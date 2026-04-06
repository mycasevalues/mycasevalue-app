'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface OutcomeDonutProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}

const RADIAN = Math.PI / 180;

export function OutcomeDonut({ data, centerLabel, centerValue, size = 240 }: OutcomeDonutProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="relative p-6" style={{ width: size + 48, height: size + 48, background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '6px' }}>
      <div style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.32}
            outerRadius={size * 0.44}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${((value / total) * 100).toFixed(1)}%`, name]}
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              padding: '8px 14px',
              color: '#212529',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      </div>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && (
            <div className="text-2xl font-display font-extrabold" style={{ color: '#212529', letterSpacing: '-1px' }}>
              {centerValue}
            </div>
          )}
          {centerLabel && (
            <div className="text-[11px] font-semibold text-[#4B5563] mt-0.5">{centerLabel}</div>
          )}
        </div>
      )}
    </div>
  );
}
