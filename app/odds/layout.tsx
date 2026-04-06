import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Case Odds — Federal Court Win Rates | MyCaseValue',
  description: 'View win rates by case type and federal district court. Data-driven outcome probabilities from 5.1M+ federal cases.',
  alternates: { canonical: `${SITE_URL}/odds` },
  openGraph: {
    title: 'Case Odds — Federal Court Win Rates',
    description: 'View win rates by case type and federal district court. Data-driven outcome probabilities from 5.1M+ real federal cases.',
    url: `${SITE_URL}/odds`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Federal Court Case Odds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Odds',
    description: 'Win rates by case type and federal district.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function OddsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
