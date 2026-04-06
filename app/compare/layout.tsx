import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Compare Case Types',
  description: 'Compare win rates, settlement rates, and dismissal rates across federal case types',
  alternates: {
    canonical: `${SITE_URL}/compare`,
  },
  openGraph: {
    title: 'Compare Case Types',
    description: 'Compare win rates, settlement rates, and dismissal rates across federal case types',
    url: 'https://www.mycasevalues.com/compare',
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
