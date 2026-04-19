import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Analytics — MyCaseValue',
  description: 'View platform analytics and usage statistics.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/analytics` },
  openGraph: {
    title: 'Analytics — MyCaseValue',
    description: 'View platform analytics and usage statistics.',
    url: `${SITE_URL}/analytics`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analytics — MyCaseValue',
    description: 'View platform analytics and usage statistics.',
  },
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
