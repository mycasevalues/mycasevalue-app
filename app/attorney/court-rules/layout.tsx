import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Federal Court Rules & Local Rules Reference | MyCaseValues Attorney Tools',
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
    title: 'Federal Court Rules & Local Rules Reference | MyCaseValues',
    description: 'Complete reference for FRCP and local rules for all 95 federal districts.',
    url: `${SITE_URL}/attorney/court-rules`,
    type: 'website',
    siteName: 'MyCaseValues',
  },
  robots: { index: false, follow: false },
};

export default function CourtRulesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
