'use client'
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  darkMode?: boolean
}

export function Logo({ size = 'lg', showText = true, darkMode = false }: LogoProps) {
  const dim = size === 'sm' ? 28 : size === 'md' ? 34 : 42
  const fontSize = size === 'sm' ? '15px' : size === 'md' ? '18px' : '22px'
  const gap = size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px'

  return (
    <div className="flex items-center" style={{ gap }}>
      {/* Official MyCaseValue logo mark — matches LinkedIn profile picture */}
      <div className="flex-shrink-0" style={{ width: dim, height: dim }}>
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Rounded square — generous radius matching official brand */}
          <rect x="0" y="0" width="120" height="120" rx="28" fill="#212529" />

          {/* White dot — upper-left quadrant */}
          <circle cx="39" cy="36" r="13" fill="white" />

          {/* White diagonal slash — thick rounded stroke from lower-left to upper-right area */}
          <line
            x1="56"
            y1="96"
            x2="78"
            y2="48"
            stroke="white"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-baseline" style={{ lineHeight: 1 }}>
          <span
            className="font-display font-extrabold"
            style={{
              fontSize,
              letterSpacing: '-0.5px',
              color: '#212529',
            }}
          >
            MyCase
          </span>
          <span
            className="font-display font-medium"
            style={{
              fontSize,
              letterSpacing: '-0.5px',
              color: '#E8171F',
            }}
          >
            Value
          </span>
        </div>
      )}
    </div>
  )
}
