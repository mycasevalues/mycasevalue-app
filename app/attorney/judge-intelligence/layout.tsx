import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Judge Intelligence — MyCaseValue',
  description: 'Research federal judges — see case statistics, ruling patterns, and settlement tendencies by district.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/judge-intelligence` },
  openGraph: {
    title: 'Judge Intelligence — MyCaseValue',
    description: 'Research federal judges — see case statistics, ruling patterns, and settlement tendencies.',
    url: `${SITE_URL}/attorney/judge-intelligence`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Judge Intelligence — MyCaseValue',
    description: 'Research federal judges — see case statistics, ruling patterns, and settlement tendencies.',
  },
};

export default function JudgeIntelligenceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
