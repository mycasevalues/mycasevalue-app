import type { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Class Action Analytics | MyCaseValue',
  description: 'Analyze class action settlements, recovery data, and litigation outcomes.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/class-action` },
  openGraph: {
    title: 'Class Action Analytics | MyCaseValue',
    description: 'Analyze class action settlements, recovery data, and litigation outcomes.',
    url: `${SITE_URL}/attorney/class-action`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class Action Analytics | MyCaseValue',
    description: 'Analyze class action settlements, recovery data, and litigation outcomes.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
