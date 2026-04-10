import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Billing & Plans',
  description: 'Manage your subscription plan and billing information.',
  alternates: {
    canonical: `${SITE_URL}/billing`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Billing & Plans',
    description: 'Manage your subscription plan and billing information.',
    url: `${SITE_URL}/billing`,
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Billing & Plans',
    description: 'Manage your subscription plan and billing information.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function BillingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
