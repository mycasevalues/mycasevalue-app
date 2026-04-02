'use client'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#333333] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-[#111111] to-[#333333] text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]',
    secondary: 'bg-transparent border-2 border-[#334155] text-[#D1D5DB] rounded-xl hover:bg-[#E5E7EB] hover:text-white hover:-translate-y-0.5 active:scale-[0.98]',
    ghost: 'bg-transparent text-[#6B7280] hover:bg-[#E5E7EB] rounded-lg active:scale-[0.98]',
  }

  const sizes: Record<string, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
