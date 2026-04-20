import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Find & Print Documents',
  description: 'Batch retrieve up to 100 legal documents by citation. Download, email, or print cases, statutes, and regulations in your preferred format.',
  alternates: { canonical: `${SITE_URL}/attorney/find-print` },
  openGraph: {
    title: 'Find & Print Documents — MyCaseValue',
    description: 'Batch retrieve up to 100 legal documents by citation. Download, email, or print cases, statutes, and regulations.',
    type: 'website',
    url: `${SITE_URL}/attorney/find-print`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find & Print Documents — MyCaseValue',
    description: 'Batch retrieve legal documents by citation for download, email, or print.',
  },
  keywords: [
    'legal document retrieval',
    'batch citation download',
    'case law printing',
    'legal document download',
    'citation batch search',
    'legal research tool',
  ],
};

export default function FindPrintLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
