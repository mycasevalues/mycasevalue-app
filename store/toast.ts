import { create } from 'zustand';

export type ToastType = 'success' | 'info' | 'error' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  timestamp: number;
  /** Whether the toast is currently exiting (for animation) */
  exiting?: boolean;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => string;
  removeToast: (id: string) => void;
  markExiting: (id: string) => void;
}

const MAX_VISIBLE = 3;

function getDefaultDuration(type: ToastType): number {
  switch (type) {
    case 'error':
      return 6000;
    case 'warning':
      return 6000;
    default:
      return 4000;
  }
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],

  addToast: (message, type = 'info', duration?) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const resolvedDuration = duration ?? getDefaultDuration(type);
    const newToast: Toast = { id, message, type, duration: resolvedDuration, timestamp: Date.now() };

    set((state) => {
      const next = [...state.toasts, newToast];
      // If over max, remove oldest (non-exiting) ones
      if (next.length > MAX_VISIBLE) {
        const excess = next.length - MAX_VISIBLE;
        let removed = 0;
        return {
          toasts: next.filter((t) => {
            if (removed < excess && !t.exiting && t.id !== id) {
              removed++;
              return false;
            }
            return true;
          }),
        };
      }
      return { toasts: next };
    });

    return id;
  },

  markExiting: (id) =>
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
