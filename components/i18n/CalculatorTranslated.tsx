'use client';

import { useTranslation } from '../../lib/useTranslation';

interface CalculatorTranslatedProps {
  children?: React.ReactNode;
}

export default function CalculatorTranslated({ children }: CalculatorTranslatedProps) {
  const { t, mounted } = useTranslation();

  if (!mounted) return null;

  return (
    <div data-i18n="calculator">
      {/* Translate key UI strings */}
      <div style={{ display: 'none' }}>
        <span data-key="calculatorTitle">{t('calculator.title')}</span>
        <span data-key="calculatorSubtitle">
          {t('calculator.subtitle')}
        </span>
        <span data-key="caseType">{t('calculator.caseType')}</span>
        <span data-key="district">{t('calculator.district')}</span>
        <span data-key="damages">{t('calculator.damages')}</span>
        <span data-key="represented">{t('calculator.represented')}</span>
        <span data-key="yesRepresented">
          {t('calculator.yesRepresented')}
        </span>
        <span data-key="noRepresented">{t('calculator.noRepresented')}</span>
        <span data-key="calculateBtn">{t('calculator.calculate')}</span>
        <span data-key="results">{t('calculator.results')}</span>
        <span data-key="disclaimer">{t('calculator.disclaimer')}</span>
        <span data-key="months">{t('nos.months')}</span>
        <span data-key="plaintiffWinRate">
          {t('nos.plaintiffWinRate')}
        </span>
        <span data-key="withAttorney">{t('nos.withAttorney')}</span>
        <span data-key="withoutAttorney">
          {t('nos.withoutAttorney')}
        </span>
      </div>
      {children}
    </div>
  );
}
