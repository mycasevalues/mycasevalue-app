'use client';

import { useTranslation } from '@/lib/useTranslation';

export function ChartTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    winRate: t('charts.winRate'),
    settlement: t('charts.settlement'),
    duration: t('charts.duration'),
    cases: t('charts.cases'),
    median: t('charts.median'),
    average: t('charts.average'),
    total: t('charts.total'),
    districtAverage: t('charts.districtAverage'),
    judgeProfile: t('charts.judgeProfile'),
    percentile: t('charts.percentile'),
    dataVisualization: t('charts.dataVisualization'),
    downloadChart: t('charts.downloadChart'),
    shareChart: t('charts.shareChart'),
  };
}

export function useChartTranslations() {
  const { t } = useTranslation();

  return {
    winRate: t('charts.winRate'),
    settlement: t('charts.settlement'),
    duration: t('charts.duration'),
    cases: t('charts.cases'),
    median: t('charts.median'),
    average: t('charts.average'),
    total: t('charts.total'),
    districtAverage: t('charts.districtAverage'),
    judgeProfile: t('charts.judgeProfile'),
    percentile: t('charts.percentile'),
    dataVisualization: t('charts.dataVisualization'),
    downloadChart: t('charts.downloadChart'),
    shareChart: t('charts.shareChart'),
  };
}
