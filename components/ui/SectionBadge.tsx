import React from 'react'

interface SectionBadgeProps {
  label: string
}

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6" style={{
      background: 'var(--accent-primary)20',
      border: '1px solid var(--accent-primary)40',
      borderRadius: '3px',
    }}>
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 animate-pulse" style={{
          background: 'var(--accent-primary)',
          borderRadius: '50%',
        }}></span>
        <span className="text-xs font-medium tracking-[0.5px] uppercase" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
          {label}
        </span>
      </div>
    </div>
  )
}
