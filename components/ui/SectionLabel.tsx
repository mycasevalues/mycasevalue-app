'use client';

/* EXTRACTED from MyCaseValue.tsx — SectionLabel gradient text component */

import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="font-body text-[10px] font-bold tracking-[3px] uppercase mb-5" style={{ color: '#6B7280', letterSpacing: '3px' }}>
      <span style={{ background: 'linear-gradient(90deg, #9CA3AF, #111111)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{children}</span>
    </div>
  );
}

export default SectionLabel;
