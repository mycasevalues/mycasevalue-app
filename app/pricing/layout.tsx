import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for federal court case data reports. Start free, upgrade when your research demands it.',
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: 'Pricing',
    description: 'Simple, transparent pricing for federal court case data reports',
    url: `${SITE_URL}/pricing`,
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
