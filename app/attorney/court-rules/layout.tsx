import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Federal Court Rules & Local Rules Reference | MyCaseValue Attorney Tools',
  description: 'Complete reference for FRCP, FRCP of Appellate Procedure, and local rules for all 95 federal districts. ECF requirements, brief page limits, discovery rules, ADR requirements, and judge standing orders.',
  keywords: [
    'federal court rules',
    'FRCP',
    'local rules',
    'federal district rules',
    'discovery rules',
    'ECF requirements',
    'federal procedure',
    'court filing rules',
  ],
  alternates: {
    canonical: `${SITE_URL}/attorney/court-rules`,
  },
  openGraph: {
    title: 'Federal Court Rules & Local Rules Reference | MyCaseValue',
    description: 'Complete reference for FRCP and local rules for all 95 federal districts.',
    url: `${SITE_URL}/attorney/court-rules`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Rules & Local Rules Reference | MyCaseValue',
    description: 'Complete reference for FRCP and local rules for all 95 federal districts.',
  },
  robots: { index: false, follow: false },
};

export default function CourtRulesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
