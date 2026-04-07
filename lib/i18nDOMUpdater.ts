'use client';

import en from '../messages/en.json';
import es from '../messages/es.json';

type Locale = 'en' | 'es';

export function getTranslatedText(key: string, locale: Locale): string {
  const messages = locale === 'es' ? es : en;
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
}

export function updateDOMWithTranslations(locale: Locale): void {
  if (typeof document === 'undefined') return;

  // Find all elements with data-key attributes and update their text content
  const elements = document.querySelectorAll('[data-i18n-key]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n-key');
    if (key) {
      const translatedText = getTranslatedText(key, locale);
      if (el.textContent) {
        el.textContent = translatedText;
      }
    }
  });

  // Also replace hardcoded English strings using data-i18n-text
  const textElements = document.querySelectorAll('[data-i18n-text]');
  textElements.forEach((el) => {
    const enText = el.getAttribute('data-i18n-text');
    const key = el.getAttribute('data-i18n-key');
    if (enText && key) {
      const translatedText = getTranslatedText(key, locale);
      el.textContent = translatedText;
    }
  });
}
