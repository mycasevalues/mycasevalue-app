'use client';

/* EXTRACTED from MyCaseValue.tsx — Card component */

import React from 'react';

interface CardBgProps {
  children: React.ReactNode;
  glow?: boolean;
  premium?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function CardBg({ children, glow = false, premium = false, className = '', style = {} }: CardBgProps) {
  return (
    <div className={`card-bg rounded-[12px] border mb-3 p-8 transition-all duration-300 ${glow ? 'animate-glow-pulse' : ''} ${className}`}
      style={{
        background: '#FFFFFF',
        borderColor: '#E5E0D8',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        ...style,
      }}>
      {children}
    </div>
  );
}

export default CardBg;
