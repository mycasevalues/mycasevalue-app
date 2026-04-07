'use client';

import { useTranslation } from '../../lib/useTranslation';
import { useEffect, useState } from 'react';

interface CalculatorPageTranslationsProps {
  children: React.ReactNode;
}

export default function CalculatorPageTranslations({ children }: CalculatorPageTranslationsProps) {
  const { t, locale, mounted } = useTranslation();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    setDomReady(true);
  }, [mounted]);

  const translations = {
    calculatorTitle: t('calculator.title'),
    calculatorSubtitle: t('calculator.subtitle'),
    caseType: t('calculator.caseType'),
    district: t('calculator.district'),
    damages: t('calculator.damages'),
    represented: t('calculator.represented'),
    yesRepresented: t('calculator.yesRepresented'),
    noRepresented: t('calculator.noRepresented'),
    calculateBtn: t('calculator.calculate'),
    results: t('calculator.results'),
    disclaimer: t('calculator.disclaimer'),
    months: t('nos.months'),
    plaintiffWinRate: t('nos.plaintiffWinRate'),
    withAttorney: t('nos.withAttorney'),
    withoutAttorney: t('nos.withoutAttorney'),
  };

  return (
    <div data-i18n-locale={locale} data-i18n-ready={domReady}>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__calculatorTranslations = ${JSON.stringify(translations)};`,
        }}
      />
      {children}
    </div>
  );
}
