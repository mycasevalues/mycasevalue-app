'use client';

import { useTranslation } from '../../lib/useTranslation';
import { useEffect, ReactNode } from 'react';

/**
 * Higher-order component to wrap pages with translation support
 * Provides translations as a data attribute on the wrapper element
 */
export function withPageTranslations<P extends object>(
  Component: React.ComponentType<P & { translations?: Record<string, string> }>,
  translationKeys: Record<string, string>
) {
  return function TranslatedComponent(props: P) {
    const { t, locale, mounted } = useTranslation();

    if (!mounted) {
      return <div style={{ minHeight: '100vh' }} />;
    }

    // Build translations object from keys
    const translations: Record<string, string> = {};
    Object.entries(translationKeys).forEach(([key, i18nKey]) => {
      translations[key] = t(i18nKey);
    });

    return <Component {...props} translations={translations} />;
  };
}

/**
 * Utility to get a single translated string (used in client components)
 */
export function usePageTranslation(key: string, fallback: string = key): string {
  const { t, mounted } = useTranslation();

  if (!mounted) {
    return fallback;
  }

  return t(key) || fallback;
}

/**
 * Component wrapper that injects translations into window object for easy access
 */
export function TranslationInjector({
  translations,
  children,
}: {
  translations: Record<string, string>;
  children: ReactNode;
}) {
  const { locale } = useTranslation();

  useEffect(() => {
    // Make translations globally available
    if (typeof window !== 'undefined') {
      (window as any).__pageTranslations = translations;
      (window as any).__currentLocale = locale;
    }
  }, [translations, locale]);

  return <>{children}</>;
}
