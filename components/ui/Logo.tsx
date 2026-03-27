'use client'
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'lg'
}

export function Logo({ size = 'lg' }: LogoProps) {
  const dim = size === 'sm' ? 32 : 44
  const id = `logo-grad-${size}`

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A520" />
            <stop offset="50%" stopColor="#C9A54E" />
            <stop offset="100%" stopColor="#B8923A" />
          </linearGradient>
          <linearGradient id={`${id}-dark`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A2744" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Shield background */}
        <path
          d="M24 3L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 3z"
          fill={`url(#${id}-dark)`}
        />

        {/* Shield gold border */}
        <path
          d="M24 3L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 3z"
          fill="none"
          stroke={`url(#${id}-gold)`}
          strokeWidth="1.5"
        />

        {/* Inner gold accent line */}
        <path
          d="M24 7L10 14.5v9.5c0 8.8 6.1 17 14 19 7.9-2 14-10.2 14-19v-9.5L24 7z"
          fill="none"
          stroke={`url(#${id}-gold)`}
          strokeWidth="0.5"
          opacity="0.35"
        />

        {/* Scales of justice */}
        {/* Center pillar */}
        <line x1="24" y1="14" x2="24" y2="33" stroke="#C9A54E" strokeWidth="1.8" strokeLinecap="round" />

        {/* Top crossbar */}
        <line x1="15" y1="17" x2="33" y2="17" stroke="#C9A54E" strokeWidth="1.5" strokeLinecap="round" />

        {/* Left chain */}
        <line x1="15" y1="17" x2="15" y2="23" stroke="#C9A54E" strokeWidth="1" opacity="0.7" />
        {/* Right chain */}
        <line x1="33" y1="17" x2="33" y2="23" stroke="#C9A54E" strokeWidth="1" opacity="0.7" />

        {/* Left pan */}
        <path d="M11 23.5Q15 26 19 23.5" stroke="#C9A54E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        {/* Right pan */}
        <path d="M29 23.5Q33 26 37 23.5" stroke="#C9A54E" strokeWidth="1.3" fill="none" strokeLinecap="round" />

        {/* Base */}
        <path d="M19 33h10" stroke="#C9A54E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21 33v2h6v-2" stroke="#C9A54E" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M18 35.5h12" stroke="#C9A54E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <div className="hidden sm:flex flex-col leading-none">
        <span
          className="font-display font-bold tracking-tight"
          style={{
            fontSize: size === 'sm' ? '14px' : '17px',
            letterSpacing: '-0.3px',
            background: 'linear-gradient(135deg, #C9A54E, #B8923A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MyCaseValue
        </span>
        {size === 'lg' && (
          <span
            style={{
              fontSize: '9px',
              letterSpacing: '2.5px',
              color: '#94A3B8',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 600,
              marginTop: '2px',
            }}
          >
            FEDERAL COURT DATA
          </span>
        )}
      </div>
    </div>
  )
}
