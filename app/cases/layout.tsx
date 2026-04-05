import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Case Categories — 84 Case Types | MyCaseValue',
  description: 'Browse 84 federal case types across 10 categories. Win rates, settlement ranges, timelines, and judge analytics for employment, personal injury, civil rights, and more.',
  openGraph: {
    title: 'Federal Case Categories — 84 Case Types | MyCaseValue',
    description: 'Browse 84 federal case types across 10 categories. Win rates, settlement ranges, timelines, and judge analytics.',
    url: 'https://www.mycasevalues.com/cases',
  },
  alternates: {
    canonical: 'https://www.mycasevalues.com/cases',
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
