'use client';

import { useTranslation } from '@/lib/useTranslation';

export function AttorneyModeTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    attorneyMode: t('attorney.attorneyMode'),
    demandPackage: t('attorney.demandPackage'),
    caseTimeline: t('attorney.caseTimeline'),
    expertWitness: t('attorney.expertWitness'),
    intakeForms: t('attorney.intakeForms'),
    opposingCounsel: t('attorney.opposingCounsel'),
    apiAccess: t('attorney.apiAccess'),
    teamManagement: t('attorney.teamManagement'),
    documentLibrary: t('attorney.documentLibrary'),
    caseAnalytics: t('attorney.caseAnalytics'),
    courtMonitoring: t('attorney.courtMonitoring'),
    billingIntegration: t('attorney.billingIntegration'),
  };
}

export function useAttorneyModeTranslations() {
  const { t } = useTranslation();

  return {
    attorneyMode: t('attorney.attorneyMode'),
    demandPackage: t('attorney.demandPackage'),
    caseTimeline: t('attorney.caseTimeline'),
    expertWitness: t('attorney.expertWitness'),
    intakeForms: t('attorney.intakeForms'),
    opposingCounsel: t('attorney.opposingCounsel'),
    apiAccess: t('attorney.apiAccess'),
    teamManagement: t('attorney.teamManagement'),
    documentLibrary: t('attorney.documentLibrary'),
    caseAnalytics: t('attorney.caseAnalytics'),
    courtMonitoring: t('attorney.courtMonitoring'),
    billingIntegration: t('attorney.billingIntegration'),
  };
}
