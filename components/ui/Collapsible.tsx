'use client';

/* EXTRACTED from MyCaseValue.tsx — Collapsible accordion component */

import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
  badge?: string | number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Collapsible({ title, badge, defaultOpen = false, children }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card-bg rounded-2xl border overflow-hidden mb-3 transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
        borderColor: open ? 'rgba(17,17,17,0.15)' : 'rgba(51,65,85,0.6)',
        boxShadow: open ? '0 4px 24px rgba(255,255,255,.07), inset 0 1px 0 rgba(255,255,255,0.03)' : '0 1px 3px rgba(255,255,255,.02), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}>
      <button type="button" onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-6 py-4.5 bg-transparent border-none cursor-pointer text-left group" aria-expanded={open}
        style={{ padding: '18px 24px' }}>
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-[15px] group-hover:text-[#111111] transition-colors">{title}</span>
          {badge && <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ color: '#8B5CF6', background: 'rgba(17,17,17,0.15)' }}>{badge}</span>}
        </div>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
          style={{ background: open ? '#11111110' : 'transparent' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#111111' : '#9CA3AF'} strokeWidth="2.5"
            aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.2s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <div className="overflow-hidden" style={{
        maxHeight: open ? '2000px' : '0',
        opacity: open ? 1 : 0,
        transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
      }}>
        <div className="px-6 pb-5 pt-0">{children}</div>
      </div>
    </div>
  );
}

export default Collapsible;
