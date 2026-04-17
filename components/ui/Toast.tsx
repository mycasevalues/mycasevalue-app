'use client';

/**
 * Toast — Unified toast notification system.
 *
 * Provides a ToastProvider context, useToast() hook, and ToastContainer.
 * Toasts stack in the bottom-right corner with slide/fade animations.
 * Max 3 visible at once; oldest dismissed first when exceeded.
 *
 * Color coding follows MyCaseValue design tokens:
 *   success  → --data-positive
 *   error    → --data-negative
 *   warning  → --gold
 *   info     → --link
 */

import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useToastStore, type Toast, type ToastType } from '@/store/toast';

/* ------------------------------------------------------------------ */
/*  Styles (injected once via <style>)                                */
/* ------------------------------------------------------------------ */

const TOAST_STYLES = `
  .mcv-toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;
    max-width: 420px;
    width: 100%;
  }

  @media (max-width: 480px) {
    .mcv-toast-container {
      right: 12px;
      left: 12px;
      bottom: 16px;
      max-width: none;
      width: auto;
    }
  }

  .mcv-toast {
    pointer-events: auto;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 4px;
    border: 1px solid;
    font-family: var(--font-ui, 'Source Sans 3', sans-serif);
    font-size: 14px;
    line-height: 1.45;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(27, 45, 69, 0.12), 0 1px 3px rgba(27, 45, 69, 0.08);
    transform: translateY(0);
    opacity: 1;
    transition: transform 300ms ease-out, opacity 300ms ease-out;
  }

  .mcv-toast--entering {
    transform: translateY(16px);
    opacity: 0;
  }

  .mcv-toast--exiting {
    transform: translateX(100%);
    opacity: 0;
    transition: transform 250ms ease-in, opacity 250ms ease-in;
  }

  /* Type-specific colours */
  .mcv-toast--success {
    background: var(--data-positive-bg);
    border-color: var(--cw-border);
    color: var(--data-positive);
  }

  .mcv-toast--error {
    background: var(--data-negative-bg);
    border-color: var(--data-negative);
    color: var(--data-negative);
  }

  .mcv-toast--warning {
    background: var(--wrn-bg);
    border-color: var(--gold-border);
    color: var(--wrn-txt);
  }

  .mcv-toast--info {
    background: var(--link-light);
    border-color: var(--ab-border);
    color: var(--link);
  }

  .mcv-toast__icon {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mcv-toast__message {
    flex: 1;
    min-width: 0;
    word-break: break-word;
  }

  .mcv-toast__close {
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: -2px -4px 0 4px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 16px;
    line-height: 1;
    opacity: 0.5;
    color: inherit;
    transition: opacity 150ms, background 150ms;
  }

  .mcv-toast__close:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.06);
  }

  @media (prefers-reduced-motion: reduce) {
    .mcv-toast,
    .mcv-toast--entering,
    .mcv-toast--exiting {
      transition: none !important;
      transform: none !important;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG, no external deps)                              */
/* ------------------------------------------------------------------ */

function ToastIcon({ type }: { type: ToastType }) {
  const size = 18;
  const common = { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };

  switch (type) {
    case 'success':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" opacity="0.15" />
          <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'error':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" opacity="0.15" />
          <path d="M13 7l-6 6M7 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'warning':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M10 3l8 14H2L10 3z" fill="currentColor" opacity="0.15" />
          <path d="M10 8v3M10 13.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'info':
      return (
        <svg {...common} aria-hidden="true">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" opacity="0.15" />
          <path d="M10 9v4M10 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  ToastItem                                                         */
/* ------------------------------------------------------------------ */

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast, markExiting } = useToastStore();
  const itemRef = useRef<HTMLDivElement>(null);
  const enteredRef = useRef(false);

  // Trigger enter animation on mount
  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    // Force a reflow so the entering class takes effect before removal
    void el.offsetHeight;
    requestAnimationFrame(() => {
      enteredRef.current = true;
      el.classList.remove('mcv-toast--entering');
    });
  }, []);

  // Auto-dismiss timer
  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, toast.duration);
    return () => clearTimeout(dismissTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.id, toast.duration]);

  const handleDismiss = useCallback(() => {
    markExiting(toast.id);
    // Wait for exit animation, then remove
    setTimeout(() => {
      removeToast(toast.id);
    }, 260);
  }, [toast.id, markExiting, removeToast]);

  return (
    <div
      ref={itemRef}
      role="alert"
      aria-live="polite"
      className={`mcv-toast mcv-toast--${toast.type} ${toast.exiting ? 'mcv-toast--exiting' : 'mcv-toast--entering'}`}
    >
      <span className="mcv-toast__icon">
        <ToastIcon type={toast.type} />
      </span>
      <span className="mcv-toast__message">{toast.message}</span>
      <button
        className="mcv-toast__close"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        type="button"
      >
        ×
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ToastContainer                                                    */
/* ------------------------------------------------------------------ */

function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TOAST_STYLES }} />
      <div className="mcv-toast-container" aria-label="Notifications">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Context + Provider + Hook                                         */
/* ------------------------------------------------------------------ */

interface ToastFn {
  (opts: { message: string; type?: ToastType; duration?: number }): string;
}

interface ToastContextValue {
  toast: ToastFn;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * ToastProvider — wraps the app to provide toast() via context.
 * Also renders the ToastContainer.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { addToast } = useToastStore();

  const toast: ToastFn = useCallback(
    ({ message, type = 'info', duration }) => {
      return addToast(message, type, duration);
    },
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

/**
 * useToast — returns { toast } function to trigger notifications.
 *
 * Usage:
 *   const { toast } = useToast();
 *   toast({ message: 'Saved', type: 'success' });
 *   toast({ message: 'Something failed', type: 'error', duration: 8000 });
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fallback: allow usage outside provider via direct store access
    // This maintains backward compatibility with existing code
    const { addToast } = useToastStore.getState();
    return {
      toast: ({ message, type = 'info', duration }) => addToast(message, type, duration),
    };
  }
  return ctx;
}

export default ToastContainer;
