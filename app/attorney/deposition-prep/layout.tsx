import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Deposition Prep — MyCaseValue',
  description: 'Prepare for depositions with AI-powered question generation and case analysis.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/deposition-prep` },
  openGraph: {
    title: 'Deposition Prep — MyCaseValue',
    description: 'Prepare for depositions with AI-powered question generation and case analysis.',
    url: `${SITE_URL}/attorney/deposition-prep`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deposition Prep — MyCaseValue',
    description: 'Prepare for depositions with AI-powered question generation.',
  },
};

export default function DepositionPrepLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
