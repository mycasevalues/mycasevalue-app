import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Text Comparison & Redline',
  description: 'Compare legal documents side-by-side with word-level redlining. Similarity scoring, diff highlighting, and export for contracts and briefs.',
  alternates: { canonical: `${SITE_URL}/attorney/compare-text` },
  openGraph: {
    title: 'Text Comparison & Redline | MyCaseValues',
    description: 'Compare legal documents side-by-side with word-level redlining. Similarity scoring, diff highlighting, and export.',
    url: `${SITE_URL}/attorney/compare-text`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Comparison & Redline | MyCaseValues',
    description: 'Compare legal documents side-by-side with word-level redlining.',
  },
  keywords: [
    'legal document comparison',
    'redline tool',
    'contract comparison',
    'text diff',
    'legal redlining',
    'document review',
  ],
};

export default function CompareTextLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
