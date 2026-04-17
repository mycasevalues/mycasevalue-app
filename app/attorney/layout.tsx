import { ReactNode } from 'react';
import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import Onboarding from '@/components/Onboarding';

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

const breadcrumbJsonLd = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Attorney Tools',
      item: `${SITE_URL}/attorney`,
    },
  ],
};

export default function AttorneyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Onboarding />
      {children}
    </>
  );
}
