/**
 * StatCard — Brand data card component
 *
 * Implements the exact .sc pattern from Brand Identity System v2:
 *   .sc-l  Inter 600 / 10px / 0.12em / uppercase / --muted
 *   .sc-v  IBM Plex Mono 600 / 26px / -0.5px / --blue
 *   .sc-s  Inter 400 / 12px / --gray
 *
 * Used in:
 *   - Homepage stats bar
 *   - Case report pages (settlement amount, win rate, duration)
 *   - Judge profile pages
 *   - Dashboard overview
 *
 * Drop into: components/ui/StatCard.tsx
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  /** Short uppercase label (Inter 600, 10px, +0.12em) */
  label: string
  /** Primary data value (IBM Plex Mono 600, 26px, brand-blue) */
  value: string
  /** Supporting context text (Inter 400, 12px, gray) */
  sub?: string
  /** Optional trend indicator */
  trend?: 'up' | 'down' | 'neutral'
  /** Variant for embedded use (no border) */
  variant?: 'card' | 'inline' | 'large'
  className?: string
}

const trendColors = {
  up:      'text-[#057642]',
  down:    'text-red-500',
  neutral: 'text-brand-muted',
}

const trendIcons = {
  up:      '↑',
  down:    '↓',
  neutral: '→',
}

export function StatCard({
  label,
  value,
  sub,
  trend,
  variant = 'card',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        variant === 'card' && 'border border-brand-rule rounded-[10px] p-6 bg-white',
        variant === 'inline' && 'py-5 px-6',
        variant === 'large' && 'border border-brand-rule rounded-[10px] p-8 bg-white',
        className
      )}
    >
      {/* Label — brand .sc-l */}
      <p className="font-inter font-semibold text-brand-muted uppercase tracking-[0.12em] text-[10px] mb-2.5">
        {label}
      </p>

      {/* Value — brand .sc-v: IBM Plex Mono 600, 26px, -0.5px, brand-blue */}
      <p
        className={cn(
          'font-mono font-semibold text-brand-blue leading-none mb-1',
          variant === 'large' ? 'text-[32px] tracking-[-0.5px]' : 'text-[26px] tracking-[-0.5px]'
        )}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
        {trend && (
          <span className={cn('ml-2 text-lg font-medium', trendColors[trend])}>
            {trendIcons[trend]}
          </span>
        )}
      </p>

      {/* Sub — brand .sc-s */}
      {sub && (
        <p className="font-inter text-brand-gray text-[12px]">
          {sub}
        </p>
      )}
    </div>
  )
}

/**
 * StatBar — 4-column stats band used on homepage
 * Sits between hero and platform sections.
 */
interface StatBarItem {
  label: string
  value: string
  sub: string
}

interface StatBarProps {
  stats: StatBarItem[]
  className?: string
}

export function StatBar({ stats, className }: StatBarProps) {
  return (
    <div
      className={cn(
        'grid border-t border-brand-rule bg-white',
        `grid-cols-${Math.min(stats.length, 4)}`,
        className
      )}
      style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn('py-5 px-6', i < stats.length - 1 && 'border-r border-brand-rule')}
        >
          <StatCard label={stat.label} value={stat.value} sub={stat.sub} variant="inline" />
        </div>
      ))}
    </div>
  )
}

// ── DEFAULT HOMEPAGE STATS ─────────────────────────────────────────────────
// Update these values as your database grows

export const HOMEPAGE_STATS: StatBarItem[] = [
  {
    label:  'Cases indexed',
    value:  '5,100,000+',
    sub:    '94 federal districts · All case types',
  },
  {
    label:  'Median verdict · S.D.N.Y.',
    value:  '$1,875,000',
    sub:    'Based on 312 cases · 2019–2024',
  },
  {
    label:  'Settlements tracked',
    value:  '$2.1B',
    sub:    'Across all 95 federal districts',
  },
  {
    label:  'Federal judge profiles',
    value:  '8,400+',
    sub:    'MTD rates, win rates, timelines',
  },
]
