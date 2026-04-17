import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Research Memo Generator',
  description: 'Generate AI-powered legal research memos with case analysis, statutory references, and strategic insights tailored to your jurisdiction.',
  alternates: { canonical: `${SITE_URL}/attorney/research-memo` },
  openGraph: {
    title: 'Research Memo Generator | MyCaseValues',
    description: 'Generate AI-powered legal research memos with case analysis, statutory references, and strategic insights.',
    url: `${SITE_URL}/attorney/research-memo`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Memo Generator | MyCaseValues',
    description: 'AI-generated legal research memos with case analysis and strategic insights.',
  },
  keywords: [
    'legal research memo',
    'AI legal memo',
    'legal memorandum',
    'case analysis',
    'legal research',
    'attorney research tool',
  ],
};

export default function ResearchMemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
