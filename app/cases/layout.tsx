import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';
import JsonLd from '../../components/JsonLd';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Case Analytics — 84 Federal Case Types',
  description: 'Browse 84 federal case types across 10 categories. Win rates, settlement ranges, timelines, and judge analytics for employment, personal injury, civil rights, and more.',
  openGraph: {
    title: 'Federal Case Categories — 84 Case Types',
    description: 'Browse 84 federal case types across 10 categories. Research win rates, settlement ranges, timelines, and judge analytics for federal cases.',
    url: `${SITE_URL}/cases`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Federal Case Types',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Case Categories',
    description: 'Browse 84 case types with real win rates and settlement data.',
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/cases`,
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Federal Case Types & Analytics',
      description: 'Browse 84 federal case types across 10 categories with win rates and settlement data.',
      url: `${SITE_URL}/cases`,
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Cases', item: `${SITE_URL}/cases` },
      ],
    },
  ],
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
