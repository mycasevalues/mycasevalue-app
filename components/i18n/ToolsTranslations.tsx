'use client';

import { useTranslation } from '@/lib/useTranslation';

export function ToolsTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    shouldIFile: t('tools.shouldIFile'),
    caseStrengthAssessment: t('tools.caseStrengthAssessment'),
    statuteOfLimitations: t('tools.statuteOfLimitations'),
    lienCalculator: t('tools.lienCalculator'),
    damagesCalculator: t('tools.damagesCalculator'),
    settlementEstimator: t('tools.settlementEstimator'),
    timelineEstimator: t('tools.timelineEstimator'),
    attorneyNeeded: t('tools.attorneyNeeded'),
    costAnalysis: t('tools.costAnalysis'),
  };
}

export function useToolsTranslations() {
  const { t } = useTranslation();

  return {
    shouldIFile: t('tools.shouldIFile'),
    caseStrengthAssessment: t('tools.caseStrengthAssessment'),
    statuteOfLimitations: t('tools.statuteOfLimitations'),
    lienCalculator: t('tools.lienCalculator'),
    damagesCalculator: t('tools.damagesCalculator'),
    settlementEstimator: t('tools.settlementEstimator'),
    timelineEstimator: t('tools.timelineEstimator'),
    attorneyNeeded: t('tools.attorneyNeeded'),
    costAnalysis: t('tools.costAnalysis'),
  };
}
