'use client';

/* EXTRACTED from MyCaseValue.tsx — Toast notification component */

import React from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;
  return (
    <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-medium z-[var(--z-modal)] text-white"
      style={{ background: '#0B1221', boxShadow: '0 8px 32px rgba(11,18,33,.2)', animation: 'slideUp 0.3s ease' }}>
      {message}
    </div>
  );
}

export default Toast;
