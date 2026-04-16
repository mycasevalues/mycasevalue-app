import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Admin Panel | MyCaseValue',
  description: 'Administrative dashboard for MyCaseValue platform management.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Admin Panel | MyCaseValue',
    description: 'Administrative dashboard for MyCaseValue platform management.',
    url: `${SITE_URL}/admin`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Panel | MyCaseValue',
    description: 'Administrative dashboard for MyCaseValue platform management.',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
