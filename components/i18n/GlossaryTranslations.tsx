'use client';

import { useTranslation } from '@/lib/useTranslation';

export function GlossaryTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    legalGlossary: t('glossary.legalGlossary'),
    searchTerms: t('glossary.searchTerms'),
    relatedTerms: t('glossary.relatedTerms'),
    federalContext: t('glossary.federalContext'),
    definitions: t('glossary.definitions'),
    abbreviations: t('glossary.abbreviations'),
    legalAcronyms: t('glossary.legalAcronyms'),
    courtTerminology: t('glossary.courtTerminology'),
  };
}

export function useGlossaryTranslations() {
  const { t } = useTranslation();

  return {
    legalGlossary: t('glossary.legalGlossary'),
    searchTerms: t('glossary.searchTerms'),
    relatedTerms: t('glossary.relatedTerms'),
    federalContext: t('glossary.federalContext'),
    definitions: t('glossary.definitions'),
    abbreviations: t('glossary.abbreviations'),
    legalAcronyms: t('glossary.legalAcronyms'),
    courtTerminology: t('glossary.courtTerminology'),
  };
}
