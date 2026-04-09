import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'PACER Monitoring | Attorney Mode',
  description: 'Set up alerts for case developments, filings, and motions across federal courts.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/pacer-monitor` },
  openGraph: {
    title: 'PACER Monitoring | Attorney Mode',
    description: 'Set up alerts for case developments, filings, and motions across federal courts.',
    url: `${SITE_URL}/attorney/pacer-monitor`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PACER Monitoring | Attorney Mode',
    description: 'Set up alerts for case developments, filings, and motions across federal courts.',
  },
};

export default function PacerMonitorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
