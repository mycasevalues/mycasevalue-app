import './globals.css';
import '../styles/performance.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { AnalyticsProvider } from '../components/analytics/AnalyticsProvider';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';
import Header from '../components/layout/Header';
import BrowseNav from '../components/layout/BrowseNav';
import Footer from '../components/layout/Footer';
import WorkspaceShell, { ConditionalFooter, ConditionalHeader } from '../components/layout/WorkspaceShell';
import ReferralCapture from '../components/ReferralCapture';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '../lib/site-config';
import { inter, jakarta, plexMono, baskerville, sourceSans } from '../lib/fonts';

// Dynamic imports for client-side only components to improve initial page load
// These components are non-critical and loaded after hydration
const RouteLoadingBar = dynamic(() => import('../components/ui/RouteLoadingBar'), {
  ssr: false,
  loading: () => null, // No loading state needed for non-critical UI
});
const CookieConsent = dynamic(() => import('../components/ui/CookieConsent'), { ssr: false });
const GlobalCommandPalette = dynamic(() => import('../components/ui/GlobalCommandPalette'), { ssr: false });
const KeyboardShortcutsHelp = dynamic(() => import('../components/ui/KeyboardShortcutsHelp'), { ssr: false });
const BackToTop = dynamic(() => import('../components/BackToTop'), { ssr: false });
const WebVitalsReporter = dynamic(() => import('../components/analytics/WebVitalsReporter'), { ssr: false });
const DemoMode = dynamic(() => import('../components/DemoMode'), { ssr: false });
// DISABLED: Spanish site experience not ready — most /es/* routes 404
// const LanguageDetectBanner = dynamic(() => import('../components/LanguageDetectBanner'), { ssr: false });
const AIChatAssistant = dynamic(() => import('../components/AIChatAssistant').then(mod => ({ default: mod.AIChatAssistant })), { ssr: false });
const ToastProvider = dynamic(() => import('../components/ui/Toast').then(mod => ({ default: mod.ToastProvider })), { ssr: false });

export const metadata: Metadata = {
  title: {
    default: 'MyCaseValue — Federal Court Intelligence',
    template: '%s — MyCaseValue',
  },
  description: 'Know what your case is worth before you file. 5.1M+ federal court cases, win rates by judge and district, settlement ranges by case type — from public records, open to everyone.',
  openGraph: {
    title: 'MyCaseValue — Federal Court Intelligence',
    description: 'Know what your case is worth before you file. 5.1M+ federal cases across 94 districts — win rates, settlement ranges, judge analytics, case timelines. Open to everyone.',
    type: 'website',
    siteName: 'MyCaseValue',
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MyCaseValue — Federal Court Outcome Data',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCaseValue — Federal Court Intelligence',
    description: 'Know what your case is worth before you file. 5.1M+ federal cases, win rates by judge, settlement ranges by district. Open to everyone.',
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  keywords: [
    'federal court outcomes', 'case outcome data', 'lawsuit win rate', 'settlement data',
    'court case statistics', 'federal case outcomes', 'lawsuit settlement ranges',
    'employment discrimination win rate', 'personal injury outcomes', 'court record data',
    'federal judicial center data', 'CourtListener data', 'case type analysis',
    'attorney vs self-represented outcomes', 'legal case timeline', 'court case recovery ranges',
  ].join(', '),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  category: 'legal',
  other: {
    'google': 'notranslate',
  },
  metadataBase: new URL(SITE_URL),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1B2D45',
};

// Schema.org structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: 'Federal court intelligence platform built from public records.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@mycasevalues.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'MyCaseValue',
      url: SITE_URL,
      applicationCategory: 'ReferenceApplication',
      operatingSystem: 'All',
      applicationSubCategory: 'Legal Research Tool',
      offers: [
        { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free basic case outcome report' },
        { '@type': 'Offer', price: '5.99', priceCurrency: 'USD', description: 'Single Report (one-time)' },
        { '@type': 'Offer', price: '9.99', priceCurrency: 'USD', description: 'Unlimited Reports (monthly subscription)' },
        { '@type': 'Offer', price: '29.99', priceCurrency: 'USD', description: 'Attorney Mode (monthly subscription)' },
      ],
    },
    {
      '@type': 'Dataset',
      name: 'Federal Court Outcome Data',
      description: 'Aggregate historical outcome data from millions of federal civil cases, sourced from the Federal Judicial Center Integrated Database, CourtListener, and PACER.',
      url: SITE_URL,
      license: 'https://www.usa.gov/government-copyright',
      creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
      distribution: {
        '@type': 'DataDownload',
        encodingFormat: 'text/html',
        contentUrl: SITE_URL,
      },
      spatialCoverage: 'United States Federal Courts',
      temporalCoverage: '1970-present',
      inLanguage: 'en',
      isAccessibleForFree: true,
    },
    {
      '@type': 'WebSite',
      url: SITE_URL,
      name: 'MyCaseValue',
      description: 'Federal court intelligence platform built from public records.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/cases?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'LegalService',
      name: 'MyCaseValue',
      url: SITE_URL,
      description: 'Federal court intelligence platform providing case outcome data, settlement ranges, judge analytics, and litigation research tools built from 5.1M+ public federal court records.',
      serviceType: 'Legal Research & Court Data Analytics',
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
      provider: {
        '@type': 'Organization',
        name: 'MyCaseValue LLC',
        url: SITE_URL,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Court Intelligence Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Case Outcome Reports' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Judge Analytics' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Settlement Calculator' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Attorney Tools' } },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Case Types', item: `${SITE_URL}/cases` },
        { '@type': 'ListItem', position: 3, name: 'FAQ', item: `${SITE_URL}/faq` },
        { '@type': 'ListItem', position: 4, name: 'Methodology', item: `${SITE_URL}/methodology` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is MyCaseValue?',
          acceptedAnswer: { '@type': 'Answer', text: 'MyCaseValue is a federal court intelligence platform that aggregates historical outcome data from millions of public federal court records. It is not legal advice.' },
        },
        {
          '@type': 'Question',
          name: 'Is MyCaseValue legal advice?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. MyCaseValue provides aggregate data from public records only. It does not evaluate individual cases, provide legal opinions, or create any attorney-client relationship. Always consult a licensed attorney.' },
        },
        {
          '@type': 'Question',
          name: 'Where does the data come from?',
          acceptedAnswer: { '@type': 'Answer', text: 'Data is sourced from the Federal Judicial Center Integrated Database (IDB), CourtListener, and PACER — the official public federal court records systems.' },
        },
        {
          '@type': 'Question',
          name: 'Does this tell me what my case is worth?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. This tool shows historical outcomes in similar cases from public records. It cannot evaluate your specific situation. For personalized guidance, consult a licensed attorney.' },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost?',
          acceptedAnswer: { '@type': 'Answer', text: 'Basic reports are free. Premium reports with judge analytics, litigation cost calculator, and opposing counsel analysis are $5.99 for a single report, $9.99/month for unlimited reports, or $29.99/month for Attorney Mode.' },
        },
        {
          '@type': 'Question',
          name: 'What case types does MyCaseValue cover?',
          acceptedAnswer: { '@type': 'Answer', text: 'MyCaseValue covers 84 federal case types including employment discrimination, personal injury, medical malpractice, product liability, civil rights, wrongful termination, contract disputes, FDCPA violations, and more. Data spans all 94 federal districts.' },
        },
        {
          '@type': 'Question',
          name: 'How is MyCaseValue different from Westlaw or LexisNexis?',
          acceptedAnswer: { '@type': 'Answer', text: 'MyCaseValue is designed specifically for individuals and small firms, not large law firms. It offers free access to federal court outcome data, transparent pricing, bilingual support (English/Spanish), and comprehensive case analytics — all without requiring a legal subscription.' },
        },
        {
          '@type': 'Question',
          name: 'What federal courts does your data cover?',
          acceptedAnswer: { '@type': 'Answer', text: 'We have comprehensive data from all 13 federal circuit courts, district courts across all 50 states, and historical records dating back to 1970. Our database includes civil cases from federal PACER records and the Federal Judicial Center Integrated Database (IDB).' },
        },
        {
          '@type': 'Question',
          name: 'Is my information kept confidential?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. We do not store, share, or sell your data. All case information you enter is used only to generate your report. We do not track individuals or contact you about your case unless you opt into our mailing list.' },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the data?',
          acceptedAnswer: { '@type': 'Answer', text: 'Our data comes directly from federal court records (PACER, Federal Judicial Center, CourtListener). We apply quality checks to case outcome classifications. Data limitations are always noted in your report.' },
        },
        {
          '@type': 'Question',
          name: 'How quickly do I get my report?',
          acceptedAnswer: { '@type': 'Answer', text: 'Your free report is generated instantly, typically within 60 seconds. Premium reports with detailed settlement data and attorney impact analysis also generate in real time.' },
        },
        {
          '@type': 'Question',
          name: 'Where does the EEOC data come from?',
          acceptedAnswer: { '@type': 'Answer', text: 'Our EEOC data comes directly from the EEOC Office of General Counsel FY2024 Annual Report and EEOC Charge Statistics (FY1997-FY2023), including total monetary recovery, charges by statute, and litigation success rates.' },
        },
        {
          '@type': 'Question',
          name: 'What do the settlement percentiles mean?',
          acceptedAnswer: { '@type': 'Answer', text: 'Settlement percentiles show where outcomes fall in the distribution. P10 means 10% of cases settled for less. P50 is the median. P90 means only 10% exceeded that amount. These come from FJC IDB and BJS Civil Trial Statistics.' },
        },
        {
          '@type': 'Question',
          name: 'How often is the data updated?',
          acceptedAnswer: { '@type': 'Answer', text: 'Core data from the Federal Judicial Center IDB is updated quarterly. EEOC statistics are updated annually. CourtListener opinion data updates daily.' },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning style={{ scrollBehavior: 'smooth' }} className={`${inter.variable} ${jakarta.variable} ${plexMono.variable} ${baskerville.variable} ${sourceSans.variable}`}>
      <head>
        {/* Theme: prevent FOUC by reading localStorage before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){try{var t=localStorage.getItem('mcv-theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();
        ` }} />
        {/* Google Analytics 4 */}
        <GoogleAnalytics />
        {/* Fonts: self-hosted via next/font (see layout imports) — no CDN, GDPR compliant */}
        {/* DNS prefetch & preconnect for third-party services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://js.stripe.com" crossOrigin="anonymous" />

        {/* Supabase API endpoint */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <>
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
          </>
        )}

        {/* Preload critical static assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />

        {/* Manifest and meta */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        {/* Canonical URL is handled per-page by Next.js metadata.alternates.canonical */}
        {/* hreflang alternates disabled until Spanish site is complete
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/es`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        */}
        <meta name="author" content="MyCaseValue LLC" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MyCaseValue" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
          }
        ` }} />
        <style>{`
                    @media (prefers-reduced-motion: reduce) {
                                .animate-page-enter { animation: none !important; }
                                          }
                                                  `}</style>
      </head>
      <body className="font-ui" style={{ background: 'var(--card)', color: 'var(--text-primary)', minHeight: '100vh' }} suppressHydrationWarning>
        <RouteLoadingBar />
        <a href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--chrome-bg)] focus:text-white focus:rounded focus:shadow-lg">
          Skip to main content
        </a>
        <ReferralCapture />
        <ErrorBoundary>
          <AnalyticsProvider>
            <ToastProvider>
              {/* <LanguageDetectBanner /> — disabled until Spanish site is complete */}
              <ConditionalHeader><Header /></ConditionalHeader>
              <ConditionalHeader><BrowseNav /></ConditionalHeader>
              <WorkspaceShell>
                <main id="main-content">
                  {children}
                </main>
              </WorkspaceShell>
              <ConditionalFooter><Footer /></ConditionalFooter>
            </ToastProvider>
          </AnalyticsProvider>
        </ErrorBoundary>
        <BackToTop />
        <CookieConsent />
        <WebVitalsReporter />
        <GlobalCommandPalette />
        <KeyboardShortcutsHelp />
        <DemoMode />
        <AIChatAssistant />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">{`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
          `}</Script>
        )}
        <script dangerouslySetInnerHTML={{ __html: `
          window.mcvAnalytics = {
            track: function(event, props) {
              if (window.gtag) window.gtag('event', event, props);
            }
          };
        ` }} />
      </body>
    </html>
  );
}
