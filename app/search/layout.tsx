import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Cases | MyCaseValue',
  description: 'Search federal court case types and find outcome data for your case',
  openGraph: {
    title: 'Search Cases | MyCaseValue',
    description: 'Search federal court case types and find outcome data for your case',
    url: 'https://www.mycasevalues.com/search',
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
