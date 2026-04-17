import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Find & Print Documents | MyCaseValue',
  description: 'Batch retrieval tool for legal citations. Input multiple case citations, statutes, and regulations to retrieve and format documents for download, email, or printing.',
  openGraph: {
    title: 'Find & Print — Batch Document Retrieval',
    description: 'Retrieve multiple legal documents by citation in seconds.',
    type: 'website',
    url: `${SITE_URL}/attorney/find-print`,
  },
};

export default function FindPrintLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
