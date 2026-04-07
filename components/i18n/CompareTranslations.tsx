'use client';

import { useTranslation } from '@/lib/useTranslation';

export function CompareTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    title: t('compare.title'),
    selectCases: t('compare.selectCases'),
    sideBySide: t('compare.sideBySide'),
    winRateComparison: t('compare.winRateComparison'),
    settlementComparison: t('compare.settlementComparison'),
    durationComparison: t('compare.durationComparison'),
    addToComparison: t('compare.addToComparison'),
    removeFromComparison: t('compare.removeFromComparison'),
    clearAll: t('compare.clearAll'),
    exportComparison: t('compare.exportComparison'),
  };
}

export function useCompareTranslations() {
  const { t } = useTranslation();

  return {
    title: t('compare.title'),
    selectCases: t('compare.selectCases'),
    sideBySide: t('compare.sideBySide'),
    winRateComparison: t('compare.winRateComparison'),
    settlementComparison: t('compare.settlementComparison'),
    durationComparison: t('compare.durationComparison'),
    addToComparison: t('compare.addToComparison'),
    removeFromComparison: t('compare.removeFromComparison'),
    clearAll: t('compare.clearAll'),
    exportComparison: t('compare.exportComparison'),
  };
}
