import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Federal Court Cases — Win Rates & Settlement Data | MyCaseValue',
  description: 'Search 84 federal case types across all 94 districts. Find win rates, settlement ranges, timelines, and judge analytics from 5.1M+ real court outcomes. Free and instant.',
  openGraph: {
    title: 'Search Federal Court Cases | MyCaseValue',
    description: 'Search 84 federal case types across all 94 districts. Win rates, settlement ranges, and judge analytics from 5.1M+ cases.',
    url: 'https://www.mycasevalues.com/search',
  },
  alternates: {
    canonical: 'https://www.mycasevalues.com/search',
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
