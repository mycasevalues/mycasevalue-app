import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Citation Check — Citation Validator | MyCaseValue',
  description: 'Validate case citations and track legal treatment with citation checking. Find citing references, negative treatment, and case history.',
  openGraph: {
    title: 'Citation Check — Citation Validator',
    description: 'Validate case citations and track legal treatment with citation checking.',
    type: 'website',
    url: `${SITE_URL}/attorney/keycite`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
