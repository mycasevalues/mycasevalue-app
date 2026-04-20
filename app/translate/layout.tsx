import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Legal Translator — Plain English Legal Terms',
  description: 'Translate complex legal terminology into plain English. Understand court documents, legal filings, and case outcomes in everyday language. Free tool.',
  alternates: { canonical: `${SITE_URL}/translate` },
  openGraph: {
    title: 'Legal Translator — Decode Legal Documents',
    description: 'Understand complex legal terminology. Translate court documents and legal filings into plain English.',
    url: `${SITE_URL}/translate`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Legal Translator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Translator',
    description: 'Translate complex legal terminology into plain English.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function TranslateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
