import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Case Categories — 84 Case Types | MyCaseValue',
  description: 'Browse 84 federal case types across 10 categories. Win rates, settlement ranges, timelines, and judge analytics for employment, personal injury, civil rights, and more.',
  openGraph: {
    title: 'Federal Case Categories — 84 Case Types | MyCaseValue',
    description: 'Browse 84 federal case types across 10 categories. Win rates, settlement ranges, timelines, and judge analytics.',
    url: `${SITE_URL}/cases`,
  },
  alternates: {
    canonical: `${SITE_URL}/cases`,
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
