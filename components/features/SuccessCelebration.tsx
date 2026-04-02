'use client';

import React, { useMemo } from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface SparkleData {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export interface SuccessCelebrationProps {}

export function SuccessCelebration({}: SuccessCelebrationProps) {
  const sparkles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      delay: Math.random() * 800,
      duration: 1200 + Math.random() * 1000,
      size: 2 + Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.6,
    })) as SparkleData[],
    []
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[var(--z-modal)] overflow-hidden"
      aria-hidden="true"
    >
      {/* Center pulse rings */}
      <div className="success-pulse-ring" style={{ animationDelay: '0ms' }} />
      <div className="success-pulse-ring" style={{ animationDelay: '300ms' }} />
      <div className="success-pulse-ring" style={{ animationDelay: '600ms' }} />
      {/* Rising sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            bottom: '-8px',
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, #6366F1, #4F46E5)`,
            boxShadow: `0 0 ${s.size * 2}px #4F46E588`,
            opacity: s.opacity,
            animation: `sparkleRise ${s.duration}ms ${s.delay}ms ease-out forwards`,
          }}
          aria-hidden="true"
        />
      ))}
      {/* Center checkmark burst */}
      <div className="success-check-burst">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#4F46E5" strokeWidth="2" opacity="0.3" />
          <path
            d="M20 33 L28 41 L44 23"
            stroke="#4F46E5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-check-path"
          />
        </svg>
      </div>
    </div>
  );
}

export default SuccessCelebration;
