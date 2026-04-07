'use client';

import { useEffect, useState } from 'react';
import en from '../messages/en.json';
import es from '../messages/es.json';

type Locale = 'en' | 'es';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read locale from cookie
    const cookies = document.cookie.split(';');
    let currentLocale: Locale = 'en';

    cookies.forEach((cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key === 'locale') {
        currentLocale = (value as Locale) || 'en';
      }
    });

    setLocale(currentLocale);
  }, []);

  const messages = locale === 'es' ? es : en;

  // Dot-notation lookup with fallback to English
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;

    keys.forEach((k) => {
      value = value?.[k];
    });

    if (typeof value === 'string') {
      return value;
    }

    // Fallback to English
    let fallbackValue: any = en;
    keys.forEach((k) => {
      fallbackValue = fallbackValue?.[k];
    });

    return typeof fallbackValue === 'string' ? fallbackValue : key;
  };

  return { t, locale, mounted };
}
