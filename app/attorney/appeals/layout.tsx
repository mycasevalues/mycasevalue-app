import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Appeals Analyzer | Attorney Mode',
  description: 'Analyze appellate reversal rates and appeal outcomes by circuit and case type.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/appeals` },
  openGraph: {
    title: 'Appeals Analyzer | Attorney Mode',
    description: 'Analyze appellate reversal rates and appeal outcomes by circuit and case type.',
    url: `${SITE_URL}/attorney/appeals`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appeals Analyzer | Attorney Mode',
    description: 'Analyze appellate reversal rates and appeal outcomes by circuit and case type.',
  },
};

export default function AppealsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
