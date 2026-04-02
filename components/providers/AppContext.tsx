'use client';

import React, { createContext, useContext } from 'react';
import { Lang } from '../../lib/i18n';

export interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  step: number;
  go: (step: number) => void;
  darkMode: boolean;
  isPremium: boolean;
  tier: string;
  toast: (msg: string) => void;
  reset: () => void;
  buy: (plan: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({
  value,
  children,
}: {
  value: AppState;
  children: React.ReactNode;
}) {
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
