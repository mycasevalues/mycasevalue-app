'use client'
import React from 'react'

interface SectionBadgeProps {
  label: string
}

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 dark:bg-navy-800/50 rounded-full border border-navy-100 dark:border-navy-700 mb-6">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full animate-pulse"></span>
        <span className="font-mono text-xs font-bold tracking-[0.15em] text-navy-900 dark:text-cream-50 uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}
