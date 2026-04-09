import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Federal Court Deadline Calculator | MyCaseValue Attorney Tools',
  description: 'Calculate critical federal court deadlines for your cases. FRCP deadlines, discovery cutoffs, expert disclosures, pretrial conferences, and statute of limitations dates. Automated deadline tracking and reminders.',
  keywords: [
    'federal court deadline calculator',
    'FRCP deadlines',
    'discovery deadline',
    'statute of limitations calculator',
    'expert disclosure deadline',
    'federal court deadlines',
    'case timeline calculator',
  ],
  alternates: {
    canonical: `${SITE_URL}/attorney/deadline-calculator`,
  },
  openGraph: {
    title: 'Federal Court Deadline Calculator | MyCaseValue',
    description: 'Calculate critical federal court deadlines for your cases. FRCP deadlines, discovery cutoffs, and statute of limitations dates.',
    url: `${SITE_URL}/attorney/deadline-calculator`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Deadline Calculator | MyCaseValue',
    description: 'Calculate critical federal court deadlines for your cases. FRCP deadlines, discovery cutoffs, and statute of limitations dates.',
  },
  robots: { index: false, follow: false },
};

export default function DeadlineCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
