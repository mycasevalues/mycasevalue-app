'use client';

/* EXTRACTED from MyCaseValue.tsx — Stat animated stat box */

import React from 'react';

interface StatProps {
  value: string;
  label: string;
  color: string;
  large?: boolean;
  dark?: boolean;
}

export function Stat({ value, label, color, large = false }: StatProps) {
  return (
    <div className="text-center p-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 tilt-hover" style={{
      background: `linear-gradient(180deg, rgba(17,24,39,0.04), ${color}10)`,
      border: `1px solid ${color}20`,
      boxShadow: `0 2px 12px ${color}08`,
    }}>
      <div className="font-display font-bold neon-text" style={{
        fontSize: large ? 48 : 30,
        color,
        letterSpacing: large ? '-1px' : '-0.5px',
        lineHeight: 1,
        textShadow: `0 0 20px ${color}30`,
      }}>
        {value}
      </div>
      <div className="text-[11px] mt-1.5 font-semibold tracking-wide uppercase" style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.5px' }}>{label}</div>
    </div>
  );
}

export default Stat;
