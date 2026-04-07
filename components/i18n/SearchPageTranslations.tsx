'use client';

import { useTranslation } from '../../lib/useTranslation';
import { useEffect, useState } from 'react';

interface SearchPageTranslationsProps {
  children: React.ReactNode;
}

export default function SearchPageTranslations({ children }: SearchPageTranslationsProps) {
  const { t, locale, mounted } = useTranslation();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    setDomReady(true);
  }, [mounted]);

  const translations = {
    searchTitle: t('search.title'),
    naturalLanguage: t('search.naturalLanguage'),
    describeSituation: t('search.describeSituation'),
    semanticSearch: t('search.semanticSearch'),
    describeWhatHappened: t('search.describeWhatHappened'),
    similarCases: t('search.similarCases'),
    noParams: t('search.noParams'),
    searchBtn: t('common.search'),
    loading: t('common.loading'),
    noResults: t('common.noResults'),
    back: t('common.back'),
    next: t('common.next'),
  };

  return (
    <div data-i18n-locale={locale} data-i18n-ready={domReady}>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__searchTranslations = ${JSON.stringify(translations)};`,
        }}
      />
      {children}
    </div>
  );
}
