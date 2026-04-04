/**
 * CaseStrengthScore.tsx — Paper Design System circular gauge component.
 * Displays a 0-100 "Data Strength Score" based on case metrics.
 * Server component (no 'use client').
 */

import React from 'react';

export interface CaseStrengthScoreProps {
  winRate: number;
  settlementRate: number;
  totalCases: number;
  represented?: boolean;
}

function calculateScore(
  winRate: number,
  settlementRate: number,
  totalCases: number,
  represented?: boolean
): number {
  const winScore = Math.min(40, winRate * 2);
  const settleScore = Math.min(30, settlementRate * 0.5);
  const sampleScore = Math.min(15, Math.log10(totalCases || 1) * 5);
  const attorneyBonus = represented ? 15 : 0;
  return Math.round(winScore + settleScore + sampleScore + attorneyBonus);
}

function getScoreColor(score: number): string {
  if (score <= 33) return '#DC2626'; // red
  if (score <= 66) return '#D97706'; // amber
  return '#16A34A'; // green
}

export function CaseStrengthScore({
  winRate,
  settlementRate,
  totalCases,
  represented = false,
}: CaseStrengthScoreProps) {
  const score = calculateScore(winRate, settlementRate, totalCases, represented);
  const color = getScoreColor(score);

  // Calculate contributions for breakdown
  const winScore = Math.min(40, winRate * 2);
  const settleScore = Math.min(30, settlementRate * 0.5);
  const sampleScore = Math.min(15, Math.log10(totalCases || 1) * 5);
  const attorneyBonus = represented ? 15 : 0;

  // SVG gauge parameters
  const size = 200;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - score / 100);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
      }}
    >
      {/* Circular Gauge */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-default)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>

        {/* Center content */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: color,
              fontFamily: 'var(--font-body)',
              lineHeight: 1,
            }}
          >
            {score}
          </div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-body)',
            }}
          >
            /100
          </div>
        </div>
      </div>

      {/* Label and Sublabel */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#111111',
            fontFamily: 'var(--font-body)',
            margin: '0 0 4px 0',
          }}
        >
          Data Strength Score
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#6B7280',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.5,
          }}
        >
          Based on aggregate federal court outcomes
        </div>
      </div>

      {/* Breakdown */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-default)',
        }}
      >
        <BreakdownItem
          label="Win Rate Contribution"
          value={winScore}
          max={40}
          color={color}
        />
        <BreakdownItem
          label="Settlement Contribution"
          value={settleScore}
          max={30}
          color={color}
        />
        <BreakdownItem
          label="Sample Size"
          value={sampleScore}
          max={15}
          color={color}
        />
        {represented && (
          <BreakdownItem
            label="Attorney Impact"
            value={attorneyBonus}
            max={15}
            color={color}
          />
        )}
      </div>
    </div>
  );
}

interface BreakdownItemProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

function BreakdownItem({ label, value, max, color }: BreakdownItemProps) {
  const percentage = (value / max) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#111111',
            fontFamily: 'var(--font-body)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6B7280',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {value.toFixed(1)} / {max}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'var(--bg-hover)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: '3px',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
}

export default CaseStrengthScore;
