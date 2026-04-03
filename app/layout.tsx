import './globals.css';
import '../styles/fonts.css';
import ErrorBoundary from '../components/ErrorBoundary';
import { AnalyticsProvider } from '../components/analytics/AnalyticsProvider';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';
import SiteNav from '../components/layout/SiteNav';
import SiteFooter from '../components/layout/SiteFooter';
import CookieConsent from '../components/CookieConsent';

export const metadata = {
  title: {
    default: 'MyCaseValue — Federal Court Settlement Data & Win Rates',
    template: '%s | MyCaseValue',
  },
  description: 'See real outcomes from 5.1M+ federal court cases. Research win rates, settlement data, timelines, and recovery ranges for 84 case types. Free, private, and instant.',
  openGraph: {
    title: 'MyCaseValue — What really happened in cases like yours',
    description: 'Real outcomes from 5.1M+ federal court cases. Win rates, timelines, settlement percentages, recovery ranges, and attorney impact data for 84 case types.',
    type: 'website',
    siteName: 'MyCaseValue',
    url: 'https://www.mycasevalues.com',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.mycasevalues.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyCaseValue — Federal Court Outcome Data',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'MyCaseValue — Federal Court Outcome Data',
    description: 'Real outcomes from 5.1M+ federal court cases. Win rates, timelines, recovery ranges. Free and private.',
    images: ['https://www.mycasevalues.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.mycasevalues.com',
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
      'max-image-preview': 'large' as const,
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
  metadataBase: new URL('https://www.mycasevalues.com'),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F9FAFB',
};

// Schema.org structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: 'https://www.mycasevalues.com',
      logo: 'https://www.mycasevalues.com/icon-512.png',
      description: 'Federal court outcome data for informed research.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@mycasevalue.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'WebApplication',
      name: 'MyCaseValue',
      url: 'https://www.mycasevalues.com',
      applicationCategory: 'ReferenceApplication',
      operatingSystem: 'All',
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
      description: 'Aggregate historical outcome data from 5,100,000+ federal civil cases, sourced from the Federal Judicial Center Integrated Database, CourtListener, and Google Scholar for legal scholarship context.',
      url: 'https://www.mycasevalues.com',
      license: 'https://www.usa.gov/government-copyright',
      creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
      distribution: {
        '@type': 'DataDownload',
        encodingFormat: 'text/html',
        contentUrl: 'https://www.mycasevalues.com',
      },
      spatialCoverage: 'United States Federal Courts',
      temporalCoverage: '1970-present',
      inLanguage: 'en',
      isAccessibleForFree: true,
    },
    {
      '@type': 'WebSite',
      url: 'https://www.mycasevalues.com',
      name: 'MyCaseValue',
      description: 'Federal court outcome data for informed research.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.mycasevalues.com/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Case Types', item: 'https://www.mycasevalues.com/cases' },
        { '@type': 'ListItem', position: 3, name: 'FAQ', item: 'https://www.mycasevalues.com/faq' },
        { '@type': 'ListItem', position: 4, name: 'Methodology', item: 'https://www.mycasevalues.com/methodology' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is MyCaseValue?',
          acceptedAnswer: { '@type': 'Answer', text: 'MyCaseValue is a research tool that displays aggregate historical outcome data from over 5.1 million public federal court records. It is not legal advice.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Basic reports are free. Premium reports with judge analytics, litigation cost calculator, and opposing counsel analysis are $5.99 for a single report, $9.99 for unlimited one-time access, or $29.99/month for Attorney Mode.' },
        },
        {
          '@type': 'Question',
          name: 'What case types does MyCaseValue cover?',
          acceptedAnswer: { '@type': 'Answer', text: 'MyCaseValue covers 84 federal case types including employment discrimination, personal injury, medical malpractice, product liability, civil rights, wrongful termination, contract disputes, FDCPA violations, and more. Data spans all 94 federal districts.' },
        },
        {
          '@type': 'Question',
          name: 'How is MyCaseValue different from Westlaw or LexisNexis?',
          acceptedAnswer: { '@type': 'Answer', text: 'MyCaseValue is designed specifically for individuals and small firms, not large law firms. It offers free access to federal court outcome data, transparent pricing, bilingual support (English/Spanish), and plaintiff-focused analytics — all without requiring a legal subscription.' },
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
          acceptedAnswer: { '@type': 'Answer', text: 'Our data comes directly from federal court records (PACER, Federal Judicial Center, CourtListener). We have reported 94% accuracy in case outcome classifications. Data limitations are always noted in your report.' },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 */}
        <GoogleAnalytics />
        {/* Self-hosted fonts — no external CDN, GDPR compliant */}
        {/* DNS prefetch & preconnect for third-party services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="canonical" href="https://www.mycasevalues.com" />
        <link rel="alternate" hrefLang="en" href="https://www.mycasevalues.com" />
        <link rel="alternate" hrefLang="es" href="https://www.mycasevalues.com/es" />
        <link rel="alternate" hrefLang="x-default" href="https://www.mycasevalues.com" />
        <meta name="author" content="MyCaseValue LLC" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#F9FAFB" />
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
      </head>
      <body style={{ background: 'var(--bg-base)', color: 'var(--fg-primary)' }} suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <ErrorBoundary>
          <AnalyticsProvider>
            <SiteNav />
            <main id="main-content">
              {children}
            </main>
            <SiteFooter />
          </AnalyticsProvider>
        </ErrorBoundary>
        <CookieConsent />
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
