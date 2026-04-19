import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Fee & Contingency Calculator — MyCaseValue',
  description: 'Calculate contingency fees and attorney costs based on expected settlement ranges and federal court outcome data for your case type.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/fee-calculator` },
  openGraph: {
    title: 'Fee & Contingency Calculator — MyCaseValue',
    description: 'Calculate contingency fees and attorney costs based on federal court data.',
    url: `${SITE_URL}/attorney/fee-calculator`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fee & Contingency Calculator — MyCaseValue',
    description: 'Calculate contingency fees and attorney costs based on federal court data.',
  },
};

export default function FeeCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
