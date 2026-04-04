import { unstable_noStore as noStore } from 'next/cache';
import ServerHero from '../components/ServerHero';
import ServerContent from '../components/ServerContent';

export const revalidate = 0;

export const metadata = {
  title: 'MyCaseValue - Federal Case Settlement Data & Win Rates',
  description: 'Research real outcomes from 5.1M+ federal court cases across 94 districts. Get win rates, settlement ranges, timelines, and judge analytics sourced from public court records. No account required.',
  keywords: 'federal court case data, settlement database, win rates, legal research, court records, case outcomes',
  alternates: {
    canonical: 'https://www.mycasevalues.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MyCaseValue',
  url: 'https://www.mycasevalues.com',
  description: 'Research real outcomes from 5.1M+ federal court cases across 94 districts.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.mycasevalues.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Page() {
  noStore();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServerHero />
      <ServerContent />
    </>
  );
}
