'use client';

import { useTranslation } from '@/lib/useTranslation';

export function TrendsTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    title: t('trends.title'),
    federalTrends: t('trends.federalTrends'),
    yearOverYear: t('trends.yearOverYear'),
    historicalData: t('trends.historicalData'),
    trendAnalysis: t('trends.trendAnalysis'),
    caseTypeGrowth: t('trends.caseTypeGrowth'),
    districtComparison: t('trends.districtComparison'),
    timeRange: t('trends.timeRange'),
    selectPeriod: t('trends.selectPeriod'),
  };
}

export function useTrendsTranslations() {
  const { t } = useTranslation();

  return {
    title: t('trends.title'),
    federalTrends: t('trends.federalTrends'),
    yearOverYear: t('trends.yearOverYear'),
    historicalData: t('trends.historicalData'),
    trendAnalysis: t('trends.trendAnalysis'),
    caseTypeGrowth: t('trends.caseTypeGrowth'),
    districtComparison: t('trends.districtComparison'),
    timeRange: t('trends.timeRange'),
    selectPeriod: t('trends.selectPeriod'),
  };
}
