'use client';

import { useTranslation } from '@/lib/useTranslation';

export function OddsTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    title: t('odds.title'),
    oddsAnalyzer: t('odds.oddsAnalyzer'),
    yourOdds: t('odds.yourOdds'),
    favorableFactors: t('odds.favorableFactors'),
    unfavorableFactors: t('odds.unfavorableFactors'),
    successProbability: t('odds.successProbability'),
    riskAssessment: t('odds.riskAssessment'),
    caseStrengthScore: t('odds.caseStrengthScore'),
    comparisonToSimilarCases: t('odds.comparisonToSimilarCases'),
  };
}

export function useOddsTranslations() {
  const { t } = useTranslation();

  return {
    title: t('odds.title'),
    oddsAnalyzer: t('odds.oddsAnalyzer'),
    yourOdds: t('odds.yourOdds'),
    favorableFactors: t('odds.favorableFactors'),
    unfavorableFactors: t('odds.unfavorableFactors'),
    successProbability: t('odds.successProbability'),
    riskAssessment: t('odds.riskAssessment'),
    caseStrengthScore: t('odds.caseStrengthScore'),
    comparisonToSimilarCases: t('odds.comparisonToSimilarCases'),
  };
}
