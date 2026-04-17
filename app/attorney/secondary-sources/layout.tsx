import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Secondary Sources Library',
  description: 'Browse legal treatises, encyclopedias, law reviews, practice guides, and restatements. Filter by jurisdiction, topic, and source type.',
  alternates: { canonical: `${SITE_URL}/attorney/secondary-sources` },
  openGraph: {
    title: 'Secondary Sources Library | MyCaseValues',
    description: 'Browse legal treatises, encyclopedias, law reviews, practice guides, and restatements with jurisdiction and topic filters.',
    url: `${SITE_URL}/attorney/secondary-sources`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secondary Sources Library | MyCaseValues',
    description: 'Browse legal treatises, encyclopedias, law reviews, and practice guides.',
  },
  keywords: [
    'legal secondary sources',
    'legal treatises',
    'law reviews',
    'practice guides',
    'legal encyclopedia',
    'restatements',
    'legal research library',
  ],
};

export default function SecondarySourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
