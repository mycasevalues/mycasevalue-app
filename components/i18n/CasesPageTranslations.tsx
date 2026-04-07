'use client';

import { useTranslation } from '../../lib/useTranslation';
import { useEffect, useState } from 'react';

interface CasesPageTranslationsProps {
  children: React.ReactNode;
}

export default function CasesPageTranslations({ children }: CasesPageTranslationsProps) {
  const { t, locale, mounted } = useTranslation();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    setDomReady(true);
  }, [mounted]);

  const translations = {
    allCaseTypes: t('pages.cases.allCaseTypes'),
    browseCases: t('pages.cases.browseCases'),
    caseType: t('common.caseType'),
    winRate: t('common.winRate'),
    avgDuration: t('nos.avgDuration'),
    settlement: t('common.settlement'),
    viewReport: t('common.viewReport'),
    back: t('common.back'),
  };

  return (
    <div data-i18n-locale={locale} data-i18n-ready={domReady}>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__casesTranslations = ${JSON.stringify(translations)};`,
        }}
      />
      {children}
    </div>
  );
}
