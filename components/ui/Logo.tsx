'use client'
import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  darkMode?: boolean
}

export function Logo({ size = 'lg', showText = true, darkMode = false }: LogoProps) {
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
          {/* Small dot — upper left */}
          <circle cx="12" cy="9" r="5" fill="#4040F2" />
          {/* Diagonal capsule / slash */}
          <line x1="25" y1="43" x2="31" y2="7" stroke="#4040F2" strokeWidth="11" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-display font-extrabold tracking-tight"
            style={{
              fontSize,
              letterSpacing: '-0.8px',
              color: darkMode ? '#F0F2F5' : '#0B1221',
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
