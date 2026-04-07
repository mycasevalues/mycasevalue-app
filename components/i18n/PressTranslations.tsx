'use client';

import { useTranslation } from '@/lib/useTranslation';

export function PressTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    pressKit: t('press.pressKit'),
    newsroom: t('press.newsroom'),
    mediaAssets: t('press.mediaAssets'),
    companyInfo: t('press.companyInfo'),
    pressReleases: t('press.pressReleases'),
    logos: t('press.logos'),
    screenshots: t('press.screenshots'),
    executiveBios: t('press.executiveBios'),
  };
}

export function usePressTranslations() {
  const { t } = useTranslation();

  return {
    pressKit: t('press.pressKit'),
    newsroom: t('press.newsroom'),
    mediaAssets: t('press.mediaAssets'),
    companyInfo: t('press.companyInfo'),
    pressReleases: t('press.pressReleases'),
    logos: t('press.logos'),
    screenshots: t('press.screenshots'),
    executiveBios: t('press.executiveBios'),
  };
}
