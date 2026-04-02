/**
 * i18n configuration for MyCaseValue
 * Defines supported locales and defaults for URL-based routing
 */

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
