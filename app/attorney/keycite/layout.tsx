import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'KeyCite Citation Validator | MyCaseValue',
  description: 'Validate case citations and track legal treatment using KeyCite-style citation validation. Find citing references, negative treatment, and case history.',
  openGraph: {
    title: 'KeyCite Citation Validator',
    description: 'Validate case citations and track legal treatment using KeyCite-style citation validation.',
    type: 'website',
    url: `${SITE_URL}/attorney/keycite`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
