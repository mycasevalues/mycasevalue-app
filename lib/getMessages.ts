import { locales, defaultLocale, type Locale } from './i18n-config';

/**
 * Load messages for a given locale — designed for server components.
 *
 * Usage in a Server Component or layout:
 *   const messages = await getMessages('es');
 *
 * Or with cookie/header detection:
 *   import { cookies } from 'next/headers';
 *   const locale = (await cookies()).get('locale')?.value ?? 'en';
 *   const messages = await getMessages(locale);
 */
export async function getMessages(locale?: string): Promise<Record<string, any>> {
  // Validate locale, fall back to English
  const resolvedLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  try {
    const messages = (await import(`../messages/${resolvedLocale}.json`)).default;
    return messages;
  } catch {
    // If the requested locale file is missing, fall back to English
    const fallback = (await import(`../messages/${defaultLocale}.json`)).default;
    return fallback;
  }
}

/**
 * Synchronous message access — imports are resolved at build time.
 * Useful when you need messages without async (e.g., in metadata generation).
 */
export function getMessagesSync(locale?: string): Record<string, any> {
  const resolvedLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(`../messages/${resolvedLocale}.json`);
}
