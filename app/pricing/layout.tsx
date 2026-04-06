import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Pricing — MyCaseValue',
  description: 'Simple, transparent pricing for federal court case data reports. Start free, upgrade when your research demands it.',
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: 'MyCaseValue Pricing — Free to Premium Plans',
    description: 'Simple, transparent pricing for federal court case data reports. Free basic reports, single reports at $5.99, unlimited monthly access, and Attorney Mode.',
    url: `${SITE_URL}/pricing`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MyCaseValue Pricing Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCaseValue Pricing',
    description: 'Simple, transparent pricing for federal court case data. Start free, upgrade when needed.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
