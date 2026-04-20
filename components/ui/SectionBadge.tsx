import React from 'react'

interface SectionBadgeProps {
  label: string
}

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6" style={{
      background: 'var(--link)20',
      border: '1px solid var(--link)40',
      borderRadius: '3px',
    }}>
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 animate-pulse" style={{
          background: 'var(--link)',
          borderRadius: '50%',
        }}></span>
        <span className="tracking-[0.5px] uppercase" style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500 }}>
          {label}
        </span>
      </div>
    </div>
  )
}
