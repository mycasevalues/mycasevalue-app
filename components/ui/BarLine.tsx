'use client';

/* EXTRACTED from MyCaseValue.tsx — BarLine progress bar component */

import React, { useRef, useEffect } from 'react';

interface BarLineProps {
  label: string;
  pct: number;
  max: number;
  color: string;
  delay?: number;
}

export function BarLine({ label, pct, max, color, delay = 0 }: BarLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current) ref.current.style.width = `${(pct / Math.max(max, 1)) * 100}%`;
    }, delay);
    return () => clearTimeout(t);
  }, [pct, max, delay]);
  return (
    <div className="flex items-center gap-3 py-2 group">
      <span className="text-sm flex-1 truncate font-medium">{label}</span>
      <div className="w-32 h-2.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden flex-shrink-0 transition-all group-hover:h-3">
        <div ref={ref} className="h-full rounded-full" style={{
          width: 0,
          background: `linear-gradient(90deg, ${color}90, ${color})`,
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
      <span className="text-sm font-bold w-12 text-right font-data" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default BarLine;
