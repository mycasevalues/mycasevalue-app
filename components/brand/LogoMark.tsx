/**
 * LogoMark — MyCaseValue isometric cube brand mark
 *
 * Faithfully implements the brand spec:
 *   - viewBox: -100 -100 200 200 (centered coordinate system)
 *   - 12° rotation on the cube geometry
 *   - Face opacities: 0.93 (top) / 0.52 (right) / 0.24 (left) — DO NOT ALTER
 *   - Line opacity: 0.4 (updated in v2 brand system)
 *   - rx scales with rendered size (~36% of tile)
 *   - stroke-width scales inversely with rendered size
 *
 * Usage:
 *   <LogoMark size={30} />           — nav (default)
 *   <LogoMark size={18} />           — app header, tight spaces
 *   <LogoMark size={56} />           — hero lockup
 *   <LogoMark size={96} />           — large display
 *
 * Never: rotate, skew, stretch, apply gradients/shadows, alter face opacities.
 */

import React from 'react'
import { cn } from '@/lib/utils' // your existing cn() helper

interface LogoMarkProps {
  /** Rendered pixel size (both width and height — mark is square) */
  size?: number
  className?: string
  'aria-hidden'?: boolean
}

/**
 * Maps rendered size → SVG viewBox-unit values for rx and stroke-width.
 * These match the brand doc examples at each canonical size.
 */
function getMarkProps(size: number): { rx: number; sw: number } {
  // rx (corner radius in viewBox units, ~36% of 200-unit space)
  let rx: number
  if      (size <= 18)  rx = 24
  else if (size <= 24)  rx = 22
  else if (size <= 32)  rx = 24
  else if (size <= 40)  rx = 24
  else if (size <= 56)  rx = 28
  else if (size <= 64)  rx = 30
  else if (size <= 80)  rx = 34
  else                  rx = 36

  // stroke-width (viewBox units) — thicker at smaller rendered sizes
  let sw: number
  if      (size <= 18)  sw = 7
  else if (size <= 24)  sw = 6.5
  else if (size <= 30)  sw = 5.5
  else if (size <= 40)  sw = 5
  else if (size <= 56)  sw = 4.5
  else if (size <= 64)  sw = 4
  else                  sw = 3

  return { rx, sw }
}

export function LogoMark({
  size = 30,
  className,
  'aria-hidden': ariaHidden = true,
}: LogoMarkProps) {
  const { rx, sw } = getMarkProps(size)

  return (
    <svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : 'img'}
    >
      {/* Blue rounded square tile */}
      <rect
        x="-100" y="-100"
        width="200" height="200"
        rx={rx}
        fill="#0966C3"
      />

      {/* Isometric cube — 12° rotation, face opacities fixed */}
      <g transform="rotate(12)">
        {/* Top face — opacity 0.93 */}
        <polygon
          points="0,0 -40,-69.3 40,-69.3 80,0"
          fill="white"
          opacity={0.93}
        />
        {/* Right face — opacity 0.52 */}
        <polygon
          points="0,0 80,0 40,69.3 -40,69.3"
          fill="white"
          opacity={0.52}
        />
        {/* Left face — opacity 0.24 */}
        <polygon
          points="0,0 -40,69.3 -80,0 -40,-69.3"
          fill="white"
          opacity={0.24}
        />

        {/* Center radiating lines — opacity 0.4 (v2 updated from 0.55) */}
        <line x1="0" y1="0" x2="80"  y2="0"     stroke="white" strokeWidth={sw} opacity={0.4} />
        <line x1="0" y1="0" x2="-40" y2="69.3"  stroke="white" strokeWidth={sw} opacity={0.4} />
        <line x1="0" y1="0" x2="-40" y2="-69.3" stroke="white" strokeWidth={sw} opacity={0.4} />
      </g>
    </svg>
  )
}

/**
 * LogoLockup — horizontal mark + wordmark
 * Matches brand horizontal lockup spec exactly.
 *
 * Usage:
 *   <LogoLockup size={30} />    — nav
 *   <LogoLockup size={56} />    — hero / large display
 */
interface LogoLockupProps {
  size?: number
  className?: string
  /** Override wordmark color (light/dark context) */
  variant?: 'light' | 'dark'
}

export function LogoLockup({
  size = 30,
  className,
  variant = 'light',
}: LogoLockupProps) {
  // Wordmark font size scales with mark size
  const fontSize = Math.round(size * 0.55)
  const letterSpacing = `-${(size * 0.02).toFixed(1)}px`

  const inkColor    = variant === 'dark' ? '#ffffff' : '#060d1a'
  const blueColor   = variant === 'dark' ? '#378ADD' : '#0966C3'

  return (
    <div className={cn('flex items-center', className)} style={{ gap: size * 0.38 }}>
      <LogoMark size={size} />
      <span
        style={{
          fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif',
          fontSize,
          fontWeight: 800,
          letterSpacing,
          lineHeight: 1,
          color: inkColor,
        }}
      >
        MyCase
        <span style={{ color: blueColor }}>Value</span>
      </span>
    </div>
  )
}
