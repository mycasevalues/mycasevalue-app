import type { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Statute of Limitations Calculator — MyCaseValue',
  description: 'Free federal statute of limitations calculator. Calculate filing deadlines for all 84 federal case types with USC citations and tolling rules.',
  alternates: {
    canonical: `${SITE_URL}/calculator/sol`,
  },
  openGraph: {
    title: 'Statute of Limitations Calculator',
    description: 'Calculate statute of limitations deadlines for 84 federal case types with citations and tolling exceptions.',
    url: `${SITE_URL}/calculator/sol`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Statute of Limitations Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Statute of Limitations Calculator',
    description: 'Calculate filing deadlines for federal case types.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function SOLLayout({ children }: { children: React.ReactNode }) {
  return children;
}
