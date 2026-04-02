'use client'
import React from 'react'

interface CardProps {
  variant?: 'default' | 'elevated' | 'glass'
  children: React.ReactNode
  className?: string
}

export function Card({ variant = 'default', children, className = '' }: CardProps) {
  const variants: Record<string, string> = {
    default: 'bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
    elevated: 'bg-[#FFFFFF] rounded-xl p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
    glass: 'bg-[#FFFFFF]/60 backdrop-blur-xl border border-[#E5E7EB]/20 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
  }

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

export default Card
