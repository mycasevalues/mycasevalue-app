import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Case Types — MyCaseValue | Side-by-Side Federal Court Data',
  description: 'Compare win rates, settlement rates, dismissal rates, and timelines across federal case types. Side-by-side analysis of up to 3 case types.',
  alternates: { canonical: 'https://www.mycasevalues.com/compare' },
  openGraph: {
    title: 'Compare Case Types — MyCaseValue',
    description: 'Compare federal court outcomes across case types side by side.',
    type: 'website',
    url: 'https://www.mycasevalues.com/compare',
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
