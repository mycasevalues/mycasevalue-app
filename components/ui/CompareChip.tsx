'use client';

import React from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface CompareChipProps {
  label: string;
  value: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
}

export function CompareChip({ label, value, color, active, onClick }: CompareChipProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center px-4 py-3 rounded-xl cursor-pointer transition-all text-center"
      style={{
        background: active ? `${color}12` : '#E5E0D8',
        border: active ? `2px solid ${color}30` : '1.5px solid var(--border-muted)',
        transform: active ? 'scale(1.03)' : 'scale(1)',
        minWidth: 90,
      }}
      aria-pressed={active}
    >
      <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: active ? color : '#6B7280' }}>
        {label}
      </div>
      <div className="text-lg font-display font-bold mt-0.5" style={{ color: active ? color : '#9CA3AF' }}>
        {value}
      </div>
    </button>
  );
}

export default CompareChip;
