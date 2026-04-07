'use client';

import { useTranslation } from '../../lib/useTranslation';

interface CasesTranslatedProps {
  children?: React.ReactNode;
}

export default function CasesTranslated({ children }: CasesTranslatedProps) {
  const { t, mounted } = useTranslation();

  if (!mounted) return null;

  return (
    <div data-i18n="cases">
      {/* Translate key UI strings */}
      <div style={{ display: 'none' }}>
        <span data-key="allCaseTypes">All Federal Case Types</span>
        <span data-key="browseCaseTypes">
          Browse all federal case types with real court statistics
        </span>
        <span data-key="caseType">{t('common.caseType')}</span>
        <span data-key="winRate">{t('common.winRate')}</span>
        <span data-key="avgDuration">{t('nos.avgDuration')}</span>
        <span data-key="settlement">{t('common.settlement')}</span>
        <span data-key="viewReport">{t('common.viewReport')}</span>
        <span data-key="back">{t('common.back')}</span>
      </div>
      {children}
    </div>
  );
}
