import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './lib/i18n-config';

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v4: requestLocale is a promise that resolves from middleware/routing
  let locale = await requestLocale;

  // Validate and fall back to default
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
