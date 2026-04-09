import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your MyCaseValue account settings, subscription, and billing information.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/account` },
  openGraph: {
    title: 'Account Settings',
    description: 'Manage your MyCaseValue account settings, subscription, and billing information.',
    url: `${SITE_URL}/account`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Account Settings',
    description: 'Manage your MyCaseValue account settings, subscription, and billing information.',
  },
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
