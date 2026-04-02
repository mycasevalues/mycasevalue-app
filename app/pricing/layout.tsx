import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pricing | MyCaseValue',
  description: 'Choose your pricing plan: Free basic case report, single report access, unlimited reports, or professional attorney mode with bulk case analysis and API.',
  alternates: { canonical: 'https://mycasevalues.com/pricing' },
  openGraph: {
    title: 'Pricing Plans - Transparent Federal Case Data',
    description: 'Flexible pricing for federal case research. Free, single reports, unlimited reports, or professional attorney tools.',
    url: 'https://mycasevalues.com/pricing',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
