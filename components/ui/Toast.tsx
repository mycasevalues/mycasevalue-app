'use client';

/**
 * Toast — Lightweight toast notification component.
 * Auto-dismisses after 3 seconds with smooth fade animation.
 * Supports success (green), info (blue), error (red) variants.
 */

import { useEffect } from 'react';
import { useToastStore, Toast as ToastType } from '@/store/toast';

function ToastItem({ toast }: { toast: ToastType }) {
  const { removeToast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const typeStyles = {
    success: 'bg-[var(--color-surface-1)] text-green-900 border-green-200',
    info: 'bg-[var(--color-surface-1)] text-blue-900 border-blue-200',
    error: 'bg-[var(--color-surface-1)] text-[var(--data-negative)] border-red-200',
  };

  const iconColors = {
    success: 'text-green-500',
    info: 'text-[var(--link)]',
    error: 'text-red-500',
  };

  return (
    <div
      className={`
        animate-in fade-in slide-in-from-bottom-4 duration-300
        ${typeStyles[toast.type]}
        px-4 py-3 rounded border flex items-gap-2 text-sm font-medium
        shadow-lg pointer-events-auto
      `}
    >
      <span className={`${iconColors[toast.type]} mr-2`}>
        {toast.type === 'success' && '✓'}
        {toast.type === 'info' && 'ⓘ'}
        {toast.type === 'error' && '✕'}
      </span>
      <span>{toast.message}</span>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
}
