'use client'
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'lg'
}

export function Logo({ size = 'lg' }: LogoProps) {
  const dimensions = size === 'sm' ? { width: 32, height: 32 } : { width: 48, height: 48 }
  const logoScale = size === 'sm' ? 0.65 : 1

  return (
    <div className="flex items-center gap-2">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4C430" />
            <stop offset="100%" stopColor="#D4A520" />
          </linearGradient>
        </defs>

        {/* Left triangle */}
        <polygon
          points="12,36 20,12 28,36"
          fill="url(#goldGradient)"
        />

        {/* Right triangle */}
        <polygon
          points="28,36 36,12 44,36"
          fill="url(#goldGradient)"
          opacity="0.8"
        />
      </svg>

      <span className="font-display font-bold text-lg tracking-tight dark:text-cream-50 text-navy-900 hidden sm:inline">
        MyCaseValue
      </span>
    </div>
  )
}
