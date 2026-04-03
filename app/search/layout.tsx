import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Case Types — MyCaseValue | 84 Federal Case Types',
  description: 'Search and explore 84 federal case types. Find win rates, settlement data, and timelines for employment, injury, consumer, civil rights, and more.',
  alternates: { canonical: 'https://www.mycasevalues.com/search' },
  openGraph: {
    title: 'Search Case Types — MyCaseValue',
    description: 'Search 84 federal case types for real court outcome data.',
    type: 'website',
    url: 'https://www.mycasevalues.com/search',
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
