import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';
import JsonLd from '../../components/JsonLd';

export const metadata: Metadata = {
  title: 'Settlement Calculator — Federal Case Valuation',
  description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real outcomes, case type, district, and damage amount. Instant results.',
  openGraph: {
    title: 'Settlement Calculator — Estimate Case Value',
    description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real court outcomes, case type, district, and damage multipliers.',
    url: `${SITE_URL}/calculator`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Settlement Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settlement Calculator',
    description: 'Estimate your federal court case value instantly.',
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/calculator`,
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Settlement Calculator',
      description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real outcomes.',
      url: `${SITE_URL}/calculator`,
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    },
    {
      '@type': 'Calculator',
      name: 'Federal Court Settlement Calculator',
      url: `${SITE_URL}/calculator`,
      description: 'Estimate settlement value based on federal court case outcomes and damage multipliers.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Calculator', item: `${SITE_URL}/calculator` },
      ],
    },
  ],
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLdData} />
      {children}
    </>
  );
}
