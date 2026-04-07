'use client';

import { useTranslation } from '../../lib/useTranslation';

interface SearchTranslatedProps {
  children?: React.ReactNode;
}

export default function SearchTranslated({ children }: SearchTranslatedProps) {
  const { t, mounted } = useTranslation();

  if (!mounted) return null;

  return (
    <div data-i18n="search">
      {/* Translate key UI strings */}
      <div style={{ display: 'none' }}>
        <span data-key="searchTitle">{t('search.title')}</span>
        <span data-key="naturalLanguage">{t('search.naturalLanguage')}</span>
        <span data-key="describeSituation">{t('search.describeSituation')}</span>
        <span data-key="semanticSearch">{t('search.semanticSearch')}</span>
        <span data-key="describeWhatHappened">
          {t('search.describeWhatHappened')}
        </span>
        <span data-key="similarCases">{t('search.similarCases')}</span>
        <span data-key="noParams">{t('search.noParams')}</span>
        <span data-key="searchBtn">{t('common.search')}</span>
        <span data-key="loading">{t('common.loading')}</span>
        <span data-key="noResults">{t('common.noResults')}</span>
        <span data-key="back">{t('common.back')}</span>
        <span data-key="next">{t('common.next')}</span>
      </div>
      {children}
    </div>
  );
}
