import dynamic from 'next/dynamic';
import ServerHero from '../components/ServerHero';
import ServerContent from '../components/ServerContent';

export const revalidate = 0;

const MyCaseValue = dynamic(() => import('../components/MyCaseValue'), {
  ssr: false,
  loading: () => null, // ServerHero + ServerContent provide the initial content
});

export const metadata = {
  title: 'MyCaseValue - Federal Case Settlement Data & Win Rates',
  description: 'Research real outcomes from 5.1M+ federal court cases across 94 districts. Get win rates, settlement ranges, timelines, and judge analytics sourced from public court records. No account required.',
  keywords: 'federal court case data, settlement database, win rates, legal research, court records, case outcomes',
  alternates: {
    canonical: 'https://www.mycasevalues.com',
  },
};

export default function Page() {
  return (
    <>
      <div id="ssr-hero" className="ssr-hero-container">
        <ServerHero />
        <ServerContent />
      </div>
      <MyCaseValue />
    </>
  );
}
