'use client';

import React, { useState, useEffect } from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface ConfidenceMeterInlineProps {
  score: number;
  size?: number;
}

export function ConfidenceMeterInline({ score, size = 140 }: ConfidenceMeterInlineProps) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 200);
    return () => clearTimeout(t);
  }, [score]);

  const r = (size - 16) / 2;
  const circ = Math.PI * r; // half circle
  const offset = circ - (animated / 100) * circ;
  const color = score >= 60 ? '#0D9488' : score >= 40 ? '#6366F1' : '#E87461';
  const label = score >= 60 ? 'Strong' : score >= 40 ? 'Moderate' : 'Challenging';

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg
        width={size}
        height={size / 2 + 12}
        viewBox={`0 0 ${size} ${size / 2 + 12}`}
        role="progressbar"
        aria-valuenow={Math.round(score)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Confidence score: ${score}`}
      >
        <defs>
          <filter id="scoreGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Tick marks for scale reference */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const angle = Math.PI * (1 - pct / 100);
          const cx = size / 2;
          const cy = size / 2 + 4;
          const innerR = r - 14;
          const outerR = r - 8;
          return (
            <line
              key={pct}
              x1={cx + innerR * Math.cos(angle)}
              y1={cy - innerR * Math.sin(angle)}
              x2={cx + outerR * Math.cos(angle)}
              y2={cy - outerR * Math.sin(angle)}
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
        {/* Background arc */}
        <path
          d={`M 8 ${size / 2 + 4} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2 + 4}`}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Colored arc with glow */}
        <path
          d={`M 8 ${size / 2 + 4} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2 + 4}`}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={offset}
          filter="url(#scoreGlow)"
          style={{
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease',
          }}
        />
        {/* Score number */}
        <text
          x={size / 2}
          y={size / 2 - 2}
          textAnchor="middle"
          fontSize="28"
          fontWeight="800"
          fontFamily="'Newsreader', Georgia, serif"
          fill={color}
        >
          {animated}
        </text>
      </svg>
      <div className="text-[11px] font-bold tracking-[2px] -mt-1" style={{ color }}>
        {label.toUpperCase()}
      </div>
      <div className="text-[10px] text-[var(--fg-muted)] mt-0.5">Historical profile</div>
    </div>
  );
}

export default ConfidenceMeterInline;
