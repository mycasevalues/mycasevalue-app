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
      {/* Official MyCaseValue logo mark — rounded indigo square with dot + slash */}
      <div className="flex-shrink-0" style={{ width: dim, height: dim }}>
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Rounded square background */}
          <rect x="0" y="0" width="120" height="120" rx="26" fill="#4F46E5" />
          {/* White dot — upper left */}
          <circle cx="38" cy="34" r="11" fill="white" />
          {/* White diagonal slash — lower left */}
          <line x1="34" y1="95" x2="52" y2="52" stroke="white" strokeWidth="16" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-baseline" style={{ lineHeight: 1 }}>
          <span
            className="font-display font-extrabold"
            style={{
              fontSize,
              letterSpacing: '-0.5px',
              color: darkMode ? '#F0F2F5' : '#0F172A',
            }}
          >
            MyCase
          </span>
          <span
            className="font-display font-medium"
            style={{
              fontSize,
              letterSpacing: '-0.5px',
              color: darkMode ? '#94A3B8' : '#9CA3AF',
            }}
          >
            Value
          </span>
        </div>
      )}
    </div>
  )
}
