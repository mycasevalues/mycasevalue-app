'use client'
import React from 'react'

interface SectionBadgeProps {
  label: string
}

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6" style={{
      background: '#8B5CF620',
      border: '1px solid #8B5CF640',
      borderRadius: '9999px',
    }}>
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 animate-pulse" style={{
          background: '#8B5CF6',
          borderRadius: '50%',
        }}></span>
        <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#4B5563' }}>
          {label}
        </span>
      </div>
    </div>
  )
}
