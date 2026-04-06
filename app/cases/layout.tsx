import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Case Categories — 84 Case Types | MyCaseValue',
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

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
