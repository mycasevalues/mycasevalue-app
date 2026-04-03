import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Case Categories — Federal Court Data',
  description: 'Browse outcome data from 5.1M+ federal cases. Win rates, settlements, and timelines across 84 case types including employment, injury, and civil rights.',
  openGraph: {
    title: 'Case Categories — Real Federal Court Data | MyCaseValue',
    description: 'Explore federal court outcomes by case type. Win rates, settlement data, and timelines for workplace, injury, consumer, civil rights, contracts, housing, benefits, family, government, and education cases.',
    type: 'website',
    url: 'https://www.mycasevalues.com/cases',
    images: [{ url: 'https://www.mycasevalues.com/og-image.png', width: 1200, height: 630, alt: 'MyCaseValue Case Categories' }],
  },
  keywords: [
    'federal court cases by category', 'case outcome data', 'lawsuit win rates', 'settlement data',
    'federal court statistics', 'employment case data', 'personal injury statistics',
    'consumer protection cases', 'civil rights outcomes', 'contract dispute data',
    'housing case outcomes', 'healthcare benefits cases', 'family law statistics',
    'government benefits cases', 'education law outcomes',
  ].join(', '),
  alternates: { canonical: 'https://www.mycasevalues.com/cases' },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
