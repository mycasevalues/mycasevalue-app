'use client';

import { useTranslation } from '../../lib/useTranslation';

interface AttorneyTranslatedProps {
  children?: React.ReactNode;
}

export default function AttorneyTranslated({ children }: AttorneyTranslatedProps) {
  const { t, mounted } = useTranslation();

  if (!mounted) return null;

  return (
    <div data-i18n="attorney">
      {/* Translate key UI strings */}
      <div style={{ display: 'none' }}>
        <span data-key="attorneyMode">{t('nav.attorney')}</span>
        <span data-key="attorneyTools">Attorney Tools & Analytics</span>
        <span data-key="judgeAnalytics">Judge Analytics</span>
        <span data-key="attorneyPerformance">Attorney Performance Metrics</span>
        <span data-key="caseTimeline">Case Timeline</span>
        <span data-key="venueOptimizer">Venue Optimizer</span>
        <span data-key="pacerMonitor">PACER Monitor</span>
        <span data-key="teamWorkspace">Team Workspace</span>
        <span data-key="learnMore">{t('common.learnMore')}</span>
        <span data-key="viewReport">{t('common.viewReport')}</span>
        <span data-key="back">{t('common.back')}</span>
      </div>
      {children}
    </div>
  );
}
