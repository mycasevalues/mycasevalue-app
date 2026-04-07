'use client';

import { useTranslation } from '@/lib/useTranslation';

export function DistrictTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    overview: t('districts.overview'),
    topCaseTypes: t('districts.topCaseTypes'),
    filingTrends: t('districts.filingTrends'),
    judicialPatterns: t('districts.judicialPatterns'),
    caseDistribution: t('districts.caseDistribution'),
    averageResolutionTime: t('districts.averageResolutionTime'),
    settledVsTrial: t('districts.settledVsTrial'),
    districtRanking: t('districts.districtRanking'),
    comparisonTools: t('districts.comparisonTools'),
  };
}

export function useDistrictTranslations() {
  const { t } = useTranslation();

  return {
    overview: t('districts.overview'),
    topCaseTypes: t('districts.topCaseTypes'),
    filingTrends: t('districts.filingTrends'),
    judicialPatterns: t('districts.judicialPatterns'),
    caseDistribution: t('districts.caseDistribution'),
    averageResolutionTime: t('districts.averageResolutionTime'),
    settledVsTrial: t('districts.settledVsTrial'),
    districtRanking: t('districts.districtRanking'),
    comparisonTools: t('districts.comparisonTools'),
  };
}
