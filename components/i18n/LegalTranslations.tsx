'use client';

import { useTranslation } from '@/lib/useTranslation';

export function LegalTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    privacyPolicy: t('legal.privacyPolicy'),
    termsOfService: t('legal.termsOfService'),
    cookiePolicy: t('legal.cookiePolicy'),
    acceptableUsePolicy: t('legal.acceptableUsePolicy'),
    disclaimers: t('legal.disclaimers'),
    dataProtection: t('legal.dataProtection'),
    intellectualProperty: t('legal.intellectualProperty'),
    limitations: t('legal.limitations'),
    userResponsibilities: t('legal.userResponsibilities'),
  };
}

export function useLegalTranslations() {
  const { t } = useTranslation();

  return {
    privacyPolicy: t('legal.privacyPolicy'),
    termsOfService: t('legal.termsOfService'),
    cookiePolicy: t('legal.cookiePolicy'),
    acceptableUsePolicy: t('legal.acceptableUsePolicy'),
    disclaimers: t('legal.disclaimers'),
    dataProtection: t('legal.dataProtection'),
    intellectualProperty: t('legal.intellectualProperty'),
    limitations: t('legal.limitations'),
    userResponsibilities: t('legal.userResponsibilities'),
  };
}
