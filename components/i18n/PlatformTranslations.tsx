'use client';

import { useTranslation } from '@/lib/useTranslation';

export function PlatformTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    about: t('platform.about'),
    methodology: t('platform.methodology'),
    dataSource: t('platform.dataSource'),
    updateFrequency: t('platform.updateFrequency'),
    coverage: t('platform.coverage'),
    contactUs: t('platform.contactUs'),
    support: t('platform.support'),
    faqs: t('platform.faqs'),
  };
}

export function usePlatformTranslations() {
  const { t } = useTranslation();

  return {
    about: t('platform.about'),
    methodology: t('platform.methodology'),
    dataSource: t('platform.dataSource'),
    updateFrequency: t('platform.updateFrequency'),
    coverage: t('platform.coverage'),
    contactUs: t('platform.contactUs'),
    support: t('platform.support'),
    faqs: t('platform.faqs'),
  };
}
