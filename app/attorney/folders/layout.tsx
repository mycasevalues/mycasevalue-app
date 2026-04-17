import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Research Folders',
  description: 'Organize cases, statutes, and research notes in hierarchical folders. Add annotations, share with colleagues, and run folder-level analysis.',
  alternates: { canonical: `${SITE_URL}/attorney/folders` },
  openGraph: {
    title: 'Research Folders | MyCaseValues',
    description: 'Organize cases, statutes, and research notes in hierarchical folders with annotations, sharing, and analysis.',
    url: `${SITE_URL}/attorney/folders`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Folders | MyCaseValues',
    description: 'Organize legal research in hierarchical folders with annotations and sharing.',
  },
  keywords: [
    'legal research folders',
    'case organization',
    'legal document management',
    'research annotations',
    'litigation workspace',
  ],
};

export default function FoldersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
