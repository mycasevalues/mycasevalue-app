import './globals.css';
import ErrorBoundary from '../components/ErrorBoundary';

export const metadata = {
  title: 'MyCaseValue — Federal Court Outcome Data',
  description: 'See what happened when other people faced similar situations in federal court. Real data from 4M+ outcomes. Free, private, and easy to understand.',
  openGraph: {
    title: 'MyCaseValue — What really happened in cases like yours',
    description: 'Real outcomes from 4,000,000+ federal court cases. Win rates, timelines, recovery ranges, and how cases ended.',
    type: 'website',
    siteName: 'MyCaseValue',
    url: 'https://mycasevalue.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCaseValue — Federal Court Outcome Data',
    description: 'Real outcomes from 4,000,000+ federal court cases. Free and private.',
  },
  keywords: 'federal court outcomes, case value, win rate, settlement data, court records, legal data, lawsuit outcomes, case settlement calculator, court case statistics',
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FDFBF7',
};

// Schema.org structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: 'https://mycasevalue.com',
      logo: 'https://mycasevalue.com/icon-512.png',
      description: 'Federal court outcome data for informed decision-making.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@mycasevalue.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'WebApplication',
      name: 'MyCaseValue',
      url: 'https://mycasevalue.com',
      applicationCategory: 'LegalService',
      operatingSystem: 'All',
      offers: [
        { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free basic report' },
        { '@type': 'Offer', price: '5.99', priceCurrency: 'USD', description: 'Single premium report' },
        { '@type': 'Offer', price: '9.99', priceCurrency: 'USD', description: 'Unlimited reports' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is MyCaseValue?',
          acceptedAnswer: { '@type': 'Answer', text: 'MyCaseValue is an informational tool that displays aggregate historical outcome data from over 4 million public federal court records. It is not legal advice.' },
        },
        {
          '@type': 'Question',
          name: 'Is MyCaseValue legal advice?',
          acceptedAnswer: { '@type': 'Answer', text: 'No. MyCaseValue provides aggregate data only. It does not evaluate individual cases, provide legal opinions, or create any attorney-client relationship. Always consult a licensed attorney.' },
        },
        {
          '@type': 'Question',
          name: 'Where does the data come from?',
          acceptedAnswer: { '@type': 'Answer', text: 'Data is sourced from the Federal Judicial Center Integrated Database (IDB) and CourtListener, covering every federal civil case since 1970. All data is public domain.' },
        },
        {
          '@type': 'Question',
          name: 'How much does it cost?',
          acceptedAnswer: { '@type': 'Answer', text: 'Basic reports are free. Premium reports with detailed analytics are $5.99 for a single report or $9.99 for unlimited access.' },
        },
        {
          '@type': 'Question',
          name: 'Is my information private?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. We do not sell personal data. Payment processing is handled securely through Stripe. See our Privacy Policy for details.' },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,400;1,6..72,500&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MyCaseValue" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain" suppressHydrationWarning>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        {/* Service worker — disabled in dev to prevent caching issues */}
        {/* Analytics placeholder — replace with your tracking ID */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.mcvAnalytics = {
            track: function(event, props) {
              if (window.gtag) window.gtag('event', event, props);
              if (window.mixpanel) window.mixpanel.track(event, props);
              console.debug('[MCV Analytics]', event, props);
            }
          };
        ` }} />
      </body>
    </html>
  );
}
