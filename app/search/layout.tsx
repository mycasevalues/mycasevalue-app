import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Search Federal Court Cases — Win Rates & Settlement Data | MyCaseValue',
  description: 'Search 84 federal case types across all 94 districts. Find win rates, settlement ranges, timelines, and judge analytics from 5.1M+ real court outcomes. Free and instant.',
  openGraph: {
    title: 'Search Federal Court Cases — Win Rates & Settlement Data',
    description: 'Search 84 federal case types across all 94 districts. Win rates, settlement ranges, timelines, and judge analytics from 5.1M+ real court outcomes.',
    url: `${SITE_URL}/search`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Federal Court Case Search',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Federal Court Cases',
    description: 'Find win rates, settlement data, and case outcomes across 84 federal case types.',
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
