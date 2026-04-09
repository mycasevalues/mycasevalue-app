import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Expert Witness Database | Attorney Mode',
  description: 'Find qualified expert witnesses for your federal cases. Database of expert witness profiles, specialties, and previous case experience by jurisdiction.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/expert-witness` },
  openGraph: {
    title: 'Expert Witness Database | Attorney Mode',
    description: 'Find qualified expert witnesses for your federal cases.',
    url: `${SITE_URL}/attorney/expert-witness`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Witness Database | Attorney Mode',
    description: 'Find qualified expert witnesses for your federal cases.',
  },
};

export default function ExpertWitnessLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
