import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Federal Court Win Rates by State - MyCaseValue',
  description: 'Interactive map showing federal court win rates by state. Compare settlement and outcome data across all 50 states and territories.',
  alternates: { canonical: 'https://mycasevalues.com/map' },
  openGraph: {
    title: 'Federal Court Win Rates by State',
    description: 'Explore federal court outcome data by state with our interactive map. Compare win rates across all 50 states and territories.',
    url: 'https://mycasevalues.com/map',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function MapLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
