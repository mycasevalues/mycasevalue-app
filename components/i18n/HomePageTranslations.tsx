'use client';

import { useTranslation } from '../../lib/useTranslation';
import { useEffect, useState } from 'react';

interface HomePageTranslationsProps {
  children: React.ReactNode;
}

/**
 * This component provides translations for the home page.
 * It reads the locale from the cookie and applies translations through a custom hook.
 * For actual text replacement, use the getTranslations() function in your page.
 */
export default function HomePageTranslations({ children }: HomePageTranslationsProps) {
  const { t, locale, mounted } = useTranslation();
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    setDomReady(true);
  }, [mounted]);

  // Provide translations via custom data attribute
  const translations = {
    heroTitle: t('pages.home.whatReallyHappened'),
    heroSubtitle: t('pages.home.winRatesSettlement'),
    searchPlaceholder: t('pages.home.searchPlaceholder'),
    searchBtn: t('common.search'),
    exploreData: t('pages.home.exploreData'),
    viewCaseTypes: t('pages.home.viewCaseTypes'),
    viewDemo: t('pages.home.viewDemo'),
    trustLine: t('pages.home.trustLine'),
    federalCases: t('pages.home.federalCases'),
    caseTypes: t('pages.home.caseTypes'),
    federalDistricts: t('pages.home.federalDistricts'),
    dataCoverage: t('pages.home.dataCoverage'),
    casesAnalyzed: t('pages.home.casesAnalyzed'),
    reportsGenerated: t('pages.home.reportsGenerated'),
    whatDataTells: t('pages.home.whatDataTells'),
    exampleData: t('pages.home.exampleData'),
    inPlainEnglish: t('pages.home.inPlainEnglish'),
    takeMillions: t('pages.home.takeMillions'),
    winRateLabel: t('pages.home.winRateLabel'),
    settlementRangeLabel: t('pages.home.settlementRangeLabel'),
    timelineLabel: t('pages.home.timelineLabel'),
    attorneyImpactLabel: t('pages.home.attorneyImpactLabel'),
    plaintiffVerdict: t('pages.home.plaintiffVerdict'),
    middleSettlements: t('pages.home.middleSettlements'),
    filingToResolution: t('pages.home.filingToResolution'),
    attorneyBoost: t('pages.home.attorneyBoost'),
    sampleFigures: t('pages.home.sampleFigures'),
    powerfulFeatures: t('pages.home.powerfulFeatures'),
    everythingYouNeed: t('pages.home.everythingYouNeed'),
    learnMoreArrow: t('pages.home.learnMoreArrow'),
    trustedByLegal: t('pages.home.trustedByLegal'),
    topLawFirms: t('pages.home.topLawFirms'),
    readyToAccess: t('pages.home.readyToAccess'),
    startExploringDesc: t('pages.home.startExploringDesc'),
    startExploringBtn: t('pages.home.startExploringBtn'),
    viewAttorneyTools: t('pages.home.viewAttorneyTools'),
  };

  return (
    <div data-i18n-locale={locale} data-i18n-ready={domReady}>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__translations = ${JSON.stringify(translations)};`,
        }}
      />
      {children}
    </div>
  );
}
