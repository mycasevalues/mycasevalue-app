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
    <div className={`card-bg rounded-2xl border mb-3 p-7 transition-all duration-300 ${glow ? 'animate-glow-pulse' : ''} ${premium ? 'glass-premium aurora-card tilt-hover' : ''} ${className}`}
      style={{
        background: premium
          ? 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(255,255,255,0.95) 100%)'
          : 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(255,255,255,0.9) 100%)',
        borderColor: premium ? 'rgba(17,17,17,0.15)' : 'rgba(51,65,85,0.4)',
        boxShadow: glow
          ? '0 2px 8px rgba(17,17,17,.08), 0 12px 40px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,0.03)'
          : premium
            ? '0 4px 24px rgba(0,0,0,0.3), 0 0 60px rgba(17,17,17,0.04), inset 0 1px 0 rgba(255,255,255,0.04)'
            : '0 1px 3px rgba(255,255,255,.02), 0 8px 28px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,0.03)',
        ...style,
      }}>
      {children}
    </div>
  );
}

export default CardBg;
