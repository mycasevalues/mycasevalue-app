'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Locale = 'en' | 'es';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  mounted: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read locale from cookie on mount
    const cookies = document.cookie.split(';');
    let currentLocale: Locale = 'en';

    cookies.forEach((cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key === 'locale') {
        currentLocale = (value as Locale) || 'en';
      }
    });

    setLocaleState(currentLocale);
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Save to cookie (expires in 1 year)
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `locale=${newLocale};path=/;expires=${date.toUTCString()}`;
    // Trigger refresh for translations
    window.dispatchEvent(new CustomEvent('localeChange', { detail: { locale: newLocale } }));
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, mounted }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
