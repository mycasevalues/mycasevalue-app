import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Pricing | MyCaseValue',
  description: 'Simple, transparent pricing for federal court case data reports',
  openGraph: {
    title: 'Pricing | MyCaseValue',
    description: 'Simple, transparent pricing for federal court case data reports',
    url: `${SITE_URL}/pricing`,
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
