import { unstable_noStore as noStore } from 'next/cache';
import ServerHero from '../components/ServerHero';
import ServerContent from '../components/ServerContent';
import { SITE_URL } from '../lib/site-config';

export const revalidate = 0;

export const metadata = {
  title: 'MyCaseValue - Federal Case Settlement Data & Win Rates',
  description: 'Research real outcomes from 5.1M+ federal court cases across 94 districts. Get win rates, settlement ranges, timelines, and judge analytics sourced from public court records. No account required.',
  keywords: 'federal court case data, settlement database, win rates, legal research, court records, case outcomes',
  alternates: {
    canonical: 'https://www.mycasevalues.com',
  },
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue LLC',
      url: SITE_URL,
      description: 'Federal court analytics platform providing win rates, settlement data, and judge analytics from 5.1 million public federal court records.',
      foundingLocation: 'West Virginia, USA',
    },
    {
      '@type': 'WebSite',
      name: 'MyCaseValue',
      url: SITE_URL,
      description: 'Research real outcomes from 5.1M+ federal court cases across 94 districts.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function Page() {
  noStore();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServerHero />
      <ServerContent />
    </>
  );
}
