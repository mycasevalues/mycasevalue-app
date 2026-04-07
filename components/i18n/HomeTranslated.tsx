'use client';

import { useTranslation } from '../../lib/useTranslation';

interface HomeTranslatedProps {
  children?: React.ReactNode;
}

export default function HomeTranslated({ children }: HomeTranslatedProps) {
  const { t, mounted } = useTranslation();

  if (!mounted) return null;

  return (
    <div data-i18n="home">
      {/* Translate key UI strings and inject them into the page context */}
      <div style={{ display: 'none' }}>
        <span data-key="heroTitle">{t('home.heroTitle')}</span>
        <span data-key="heroSubtitle">{t('home.heroSubtitle')}</span>
        <span data-key="quickLookup">{t('home.quickLookup')}</span>
        <span data-key="viewReport">{t('common.viewReport')}</span>
        <span data-key="searchPlaceholder">
          {t('home.selectCaseType')}
        </span>
        <span data-key="exploreData">Explore Data</span>
        <span data-key="viewCaseTypes">View Case Types</span>
        <span data-key="viewDemo">View Demo</span>
        <span data-key="trustLine">
          No account required · Free during public beta · Instant results
        </span>
        <span data-key="federalCases">Federal Cases</span>
        <span data-key="caseTypes">Case Types</span>
        <span data-key="federalDistricts">Federal Districts</span>
        <span data-key="dataCoverage">Data Coverage</span>
        <span data-key="casesAnalyzed">Cases Analyzed</span>
        <span data-key="reportsGenerated">Reports Generated</span>
        <span data-key="winRate">Win Rate</span>
        <span data-key="settlementRange">Settlement Range</span>
        <span data-key="timeline">Timeline</span>
        <span data-key="attorneyImpact">Attorney Impact</span>
        <span data-key="whatDataTells">
          What this data actually tells you
        </span>
        <span data-key="example">Example data</span>
        <span data-key="powerfulFeatures">
          Powerful Features for Legal Intelligence
        </span>
        <span data-key="everythingYouNeed">
          Everything you need to make data-driven legal decisions
        </span>
        <span data-key="learnMore">Learn More</span>
        <span data-key="trustedBy">
          Trusted by Leading Legal Professionals
        </span>
        <span data-key="topLawFirms">
          Top law firms and general counsels rely on our data for critical decisions
        </span>
        <span data-key="readyToAccess">
          Ready to Access Federal Court Intelligence?
        </span>
        <span data-key="startExploring">
          Start exploring 5.1M+ cases with advanced analytics and AI-powered insights.
        </span>
        <span data-key="startExploringBtn">Start Exploring</span>
        <span data-key="viewAttorneyTools">View Attorney Tools</span>
      </div>
      {children}
    </div>
  );
}
