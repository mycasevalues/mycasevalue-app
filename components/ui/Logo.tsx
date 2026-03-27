'use client'
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ size = 'lg', showText = true }: LogoProps) {
  const dim = size === 'sm' ? 32 : size === 'md' ? 38 : 48
  const fontSize = size === 'sm' ? '16px' : size === 'md' ? '19px' : '24px'
  const gap = size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px'

  return (
    <div className="flex items-center" style={{ gap }}>
      {/* MyCaseValue brand mark */}
      <div className="flex-shrink-0 relative" style={{ width: dim, height: dim }}>
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4040F2" />
              <stop offset="100%" stopColor="#5C5CF5" />
            </linearGradient>
          </defs>
          {/* Rounded square background */}
          <rect width="48" height="48" rx="12" fill="url(#logo-gradient)" />
          {/* M + V letterform in white */}
          <path d="M12 34V18l6 9 6-9v16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M30 18l5 10 5-10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
          {/* Small dot accent */}
          <circle cx="40" cy="14" r="2.5" fill="white" opacity="0.6" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-display font-extrabold tracking-tight"
            style={{
              fontSize,
              letterSpacing: '-0.8px',
              color: '#0B1221',
              lineHeight: 1.1,
            }}
          >
            MyCaseValue
          </span>
          {size !== 'sm' && (
            <span className="text-[9px] font-semibold tracking-[1.5px] uppercase" style={{ color: '#94A3B8', marginTop: '2px' }}>
              Federal Court Data
            </span>
          )}
        </div>
      )}
    </div>
  )
}
