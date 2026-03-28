'use client'
import React from 'react'

interface SectionBadgeProps {
  label: string
}

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
      background: 'rgba(79,70,229,0.1)',
      border: '1px solid rgba(99,102,241,0.2)',
    }}>
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{
          background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
        }}></span>
        <span className="font-mono text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#E2E8F0' }}>
          {label}
        </span>
      </div>
    </div>
  )
}
