'use client';

import { useTranslation } from '../../lib/useTranslation';
import { useEffect, useState } from 'react';

interface DistrictsPageTranslationsProps {
  children: React.ReactNode;
}

export default function DistrictsPageTranslations({ children }: DistrictsPageTranslationsProps) {
  const { t, locale, mounted } = useTranslation();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    setDomReady(true);
  }, [mounted]);

  const translations = {
    allDistricts: t('pages.districts.allDistricts'),
    allJudicial: t('pages.districts.allJudicial'),
    district: t('common.district'),
    winRate: t('common.winRate'),
    caseCount: t('common.caseCount'),
    viewReport: t('common.viewReport'),
  };

  return (
    <div data-i18n-locale={locale} data-i18n-ready={domReady}>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__districtsTranslations = ${JSON.stringify(translations)};`,
        }}
      />
      {children}
    </div>
  );
}
