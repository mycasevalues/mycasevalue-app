import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Legal Translator',
  description: 'Translate complex legal terminology into plain English. Understand court documents, legal filings, and case outcomes in everyday language.',
  alternates: { canonical: `${SITE_URL}/translate` },
  openGraph: {
    title: 'Legal Translator',
    description: 'Translate complex legal terminology into plain English',
    url: `${SITE_URL}/translate`,
  },
};

export default function TranslateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
