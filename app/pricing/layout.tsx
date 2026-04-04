import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pricing | MyCaseValue',
  description: 'Simple, transparent pricing for federal court case data reports',
  openGraph: {
    title: 'Pricing | MyCaseValue',
    description: 'Simple, transparent pricing for federal court case data reports',
    url: 'https://www.mycasevalues.com/pricing',
  },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
