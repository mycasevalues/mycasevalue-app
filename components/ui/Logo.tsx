'use client'
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ size = 'lg', showText = true }: LogoProps) {
  const dim = size === 'sm' ? 28 : size === 'md' ? 34 : 40
  const fontSize = size === 'sm' ? '14px' : size === 'md' ? '16px' : '19px'

  return (
    <div className="flex items-center gap-2.5">
      {/* MyCaseValue brand mark — dot + diagonal check */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Small dot — upper left */}
        <circle cx="11" cy="14" r="5" fill="#4040F2" />

        {/* Diagonal rounded bar — the check/slash */}
        <rect
          x="19" y="4"
          width="10" height="36"
          rx="5"
          fill="#4040F2"
          transform="rotate(15 24 22)"
        />
      </svg>

      {showText && (
        <span
          className="font-body font-semibold tracking-tight"
          style={{
            fontSize,
            letterSpacing: '-0.4px',
            color: '#0B1221',
          }}
        >
          MyCaseValue
        </span>
      )}
    </div>
  )
}
