import { ReactNode } from 'react';
import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: {
    template: '%s | MyCaseValues',
    default: 'Attorney Tools | MyCaseValues',
  },
  description: 'AI-powered attorney tools for case prediction, judge analytics, document intelligence, and litigation strategy. Built on 5.1M+ federal court records.',
  openGraph: {
    siteName: 'MyCaseValue',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MyCaseValue Attorney Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/og-image.png`],
  },
  keywords: [
    'attorney tools',
    'legal intelligence',
    'AI legal research',
    'case prediction',
    'judge analytics',
    'litigation software',
    'legal tech',
    'federal court data',
  ],
};

export default function AttorneyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
