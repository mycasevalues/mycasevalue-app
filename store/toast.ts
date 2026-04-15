import { create } from 'zustand';

export type ToastType = 'success' | 'info' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  timestamp: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],

  addToast: (message, type = 'info') =>
    set((state) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newToast: Toast = { id, message, type, timestamp: Date.now() };
      return { toasts: [...state.toasts, newToast] };
    }),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
