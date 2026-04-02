'use client';

import { useEffect, useRef } from 'react';

interface Segment {
  pct: number;
  color: string;
  winRatio?: number;
}

export default function PieChart({ segments, size = 200, strokeWidth = 14, lang = 'en' }: { segments: Segment[]; size?: number; strokeWidth?: number; lang?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - strokeWidth - 4;
  const circumference = 2 * Math.PI * r;

  useEffect(() => {
    if (!ref.current) return;
    const circles = ref.current.querySelectorAll('.pie-seg');
    circles.forEach((el: Element, i: number) => {
      const seg = segments[i];
      if (!seg) return;
      const len = circumference * (seg.pct / 100) * 0.96;
      (el as SVGElement).style.strokeDasharray = `${len} ${circumference - len}`;
      (el as SVGElement).style.strokeDashoffset = '0';
    });
  }, [segments, circumference]);

  let offset = 0;

  // Calculate center value
  const centerValue = Math.round(
    (segments[0]?.pct || 0) + (segments[1]?.pct || 0) * (segments[1]?.winRatio || 0)
  );

  return (
    <div style={{ position: 'relative', width: size, height: size }} role="img" aria-label={`Pie chart showing ${centerValue}% win and settle rate`}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background track */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#E5E0D8"
          strokeWidth={strokeWidth - 4}
        />
        {/* Segments */}
        {segments.map((seg, i) => {
          const len = circumference * (seg.pct / 100) * 0.96;
          const gap = circumference * 0.04 / Math.max(segments.length, 1);
          const el = (
            <circle
              key={i}
              className="pie-seg"
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={i === 0 ? strokeWidth : strokeWidth - 3}
              strokeDasharray={`0 ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{
                transition: `stroke-dasharray 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`,
              }}
            />
          );
          offset += len + gap;
          return el;
        })}
      </svg>
      {/* Center label */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontSize: size * 0.18,
          fontFamily: "'Roboto', system-ui, sans-serif",
          fontWeight: 700,
          color: segments[0]?.color || '#0D9488',
          lineHeight: 1,
        }}>
          {centerValue}%
        </div>
        <div style={{
          fontSize: size * 0.055,
          color: '#6B7280',
          fontWeight: 600,
          letterSpacing: '0.05em',
          marginTop: 2,
        }}>
          {lang === 'es' ? 'GANAR + ACUERDO' : 'WIN + SETTLE'}
        </div>
      </div>
    </div>
  );
}
