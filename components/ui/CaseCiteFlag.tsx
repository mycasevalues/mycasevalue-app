'use client';

/**
 * CaseCiteFlag.tsx — SVG flag shapes for case citation status
 *
 * Types: green (checkmark circle), yellow/red/blue (pole+pennant), red-striped
 * Inline usage: <CaseCiteFlag type="green" /> renders at 13px height
 * CaseCiteFlagGroup renders an array of flags in a flex row
 */

import React from 'react';

export type FlagType = 'green' | 'yellow' | 'red' | 'blue' | 'red-striped';

interface CaseCiteFlagProps {
  type: FlagType;
  size?: number;
  className?: string;
}

const FLAG_COLORS: Record<FlagType, string> = {
  green: 'var(--flag-green, #176438)',
  yellow: 'var(--flag-yellow, #C8900A)',
  red: 'var(--flag-red, #CC1414)',
  blue: 'var(--flag-blue, #1A73E8)',
  'red-striped': 'var(--flag-red, #CC1414)',
};

/** Green check: circle with checkmark */
function GreenCheck({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" fill="var(--flag-green, #176438)" />
      <path
        d="M5 8.5L7 10.5L11 6"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Pennant flag: pole (2px rect, full height) + pennant triangle */
function PennantFlag({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size * 0.75}
      height={size}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pole */}
      <rect x="1" y="0" width="2" height="16" rx="0.5" fill={color} />
      {/* Pennant */}
      <path d="M3 1L11 4.5L3 8Z" fill={color} />
    </svg>
  );
}

/** Red-striped flag: red flag with white horizontal lines via clipPath */
function RedStripedFlag({ size }: { size: number }) {
  const id = React.useId();
  return (
    <svg
      width={size * 0.75}
      height={size}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`stripes-${id}`}>
          <rect x="3" y="1" width="8" height="1.4" />
          <rect x="3" y="3.4" width="8" height="1.4" />
          <rect x="3" y="5.8" width="8" height="1.4" />
        </clipPath>
      </defs>
      {/* Pole */}
      <rect x="1" y="0" width="2" height="16" rx="0.5" fill="var(--flag-red, #CC1414)" />
      {/* Pennant base */}
      <path d="M3 1L11 4.5L3 8Z" fill="var(--flag-red, #CC1414)" />
      {/* White stripes overlay */}
      <path
        d="M3 1L11 4.5L3 8Z"
        fill="#FFFFFF"
        clipPath={`url(#stripes-${id})`}
        opacity="0.55"
      />
    </svg>
  );
}

export default function CaseCiteFlag({ type, size = 13, className }: CaseCiteFlagProps) {
  const label = {
    green: 'Positive treatment',
    yellow: 'Caution',
    red: 'Negative treatment',
    blue: 'Cited',
    'red-striped': 'Overruled',
  }[type];

  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
    >
      {type === 'green' && <GreenCheck size={size} />}
      {type === 'red-striped' && <RedStripedFlag size={size} />}
      {(type === 'yellow' || type === 'red' || type === 'blue') && (
        <PennantFlag size={size} color={FLAG_COLORS[type]} />
      )}
    </span>
  );
}

/** Renders an array of flag types in a flex row */
export function CaseCiteFlagGroup({
  flags,
  size = 13,
  gap = 4,
}: {
  flags: FlagType[];
  size?: number;
  gap?: number;
}) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      {flags.map((type, i) => (
        <CaseCiteFlag key={`${type}-${i}`} type={type} size={size} />
      ))}
    </span>
  );
}
