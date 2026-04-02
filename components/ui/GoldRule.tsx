'use client';

/* EXTRACTED from MyCaseValue.tsx — GoldRule decorative divider */

import React from 'react';

export function GoldRule() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(64,64,242,0.3), rgba(64,64,242,0.1))' }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#4F46E5', opacity: 0.4 }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(64,64,242,0.1), rgba(64,64,242,0.3), transparent)' }} />
    </div>
  );
}

export default GoldRule;
