/* EXTRACTED from MyCaseValue.tsx — SectionLabel gradient text component */

import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="font-body text-[10px] font-bold tracking-[3px] uppercase mb-5" style={{ color: 'var(--color-text-secondary)', letterSpacing: '3px' }}>
      <span style={{ color: 'var(--color-text-secondary)' }}>{children}</span>
    </div>
  );
}

export default SectionLabel;
