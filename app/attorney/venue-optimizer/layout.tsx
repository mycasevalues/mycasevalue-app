import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Venue Optimizer — MyCaseValue',
  description: 'Find the optimal filing district based on case type, win rates, settlement data, and case duration.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/venue-optimizer` },
  openGraph: {
    title: 'Venue Optimizer — MyCaseValue',
    description: 'Find the optimal filing district based on case type, win rates, and settlement data.',
    url: `${SITE_URL}/attorney/venue-optimizer`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venue Optimizer — MyCaseValue',
    description: 'Find the optimal filing district based on case type, win rates, and settlement data.',
  },
};

export default function VenueOptimizerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
