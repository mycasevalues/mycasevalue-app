import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Advanced Legal Search',
  description: 'Search federal cases with natural language or Boolean connectors. West Key Number browser, faceted filters, and jurisdiction targeting.',
  alternates: { canonical: `${SITE_URL}/attorney/advanced-search` },
  openGraph: {
    title: 'Advanced Legal Search — MyCaseValue',
    description: 'Search federal cases with natural language or Boolean connectors. West Key Number browser, faceted filters, and jurisdiction targeting.',
    url: `${SITE_URL}/attorney/advanced-search`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Legal Search — MyCaseValue',
    description: 'Search federal cases with natural language or Boolean connectors.',
  },
  keywords: [
    'legal search',
    'case law search',
    'Boolean search',
    'natural language legal search',
    'West Key Number',
    'federal case search',
    'legal research tool',
  ],
};

export default function AdvancedSearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
