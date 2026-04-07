'use client';

import { useTranslation } from '@/lib/useTranslation';

export function NOSPageTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    plaintiffWinRate: t('nos.plaintiffWinRate'),
    defendantWinRate: t('nos.defendantWinRate'),
    totalCases: t('nos.totalCases'),
    avgDuration: t('nos.avgDuration'),
    months: t('nos.months'),
    settlementRange: t('nos.settlementRange'),
    p25: t('nos.p25'),
    median: t('nos.median'),
    p75: t('nos.p75'),
    winRateByDistrict: t('nos.winRateByDistrict'),
    relevantOpinions: t('nos.relevantOpinions'),
    attorneyImpact: t('nos.attorneyImpact'),
    withAttorney: t('nos.withAttorney'),
    withoutAttorney: t('nos.withoutAttorney'),
  };
}

export function useNOSTranslations() {
  const { t } = useTranslation();

  return {
    plaintiffWinRate: t('nos.plaintiffWinRate'),
    defendantWinRate: t('nos.defendantWinRate'),
    totalCases: t('nos.totalCases'),
    avgDuration: t('nos.avgDuration'),
    months: t('nos.months'),
    settlementRange: t('nos.settlementRange'),
    p25: t('nos.p25'),
    median: t('nos.median'),
    p75: t('nos.p75'),
    winRateByDistrict: t('nos.winRateByDistrict'),
    relevantOpinions: t('nos.relevantOpinions'),
    attorneyImpact: t('nos.attorneyImpact'),
    withAttorney: t('nos.withAttorney'),
    withoutAttorney: t('nos.withoutAttorney'),
  };
}
