import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Case Types | MyCaseValue',
  description: 'Compare win rates, settlement rates, and dismissal rates across federal case types',
  openGraph: {
    title: 'Compare Case Types | MyCaseValue',
    description: 'Compare win rates, settlement rates, and dismissal rates across federal case types',
    url: 'https://www.mycasevalues.com/compare',
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
