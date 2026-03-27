'use client'
import React from 'react'

interface CardProps {
  variant?: 'default' | 'elevated' | 'glass'
  children: React.ReactNode
  className?: string
}

export function Card({ variant = 'default', children, className = '' }: CardProps) {
  const variants: Record<string, string> = {
    default: 'bg-white dark:bg-[#161B22] border border-[#E2E8F0] dark:border-[#30363D] rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
    elevated: 'bg-white dark:bg-[#161B22] rounded-xl p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
    glass: 'bg-white/60 dark:bg-[#161B22]/60 backdrop-blur-xl border border-white/20 dark:border-[#30363D]/50 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
  }

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

export default Card
