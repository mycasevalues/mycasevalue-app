import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Check My Odds | MyCaseValue',
  description: 'Get your personalized federal case analysis. Enter your case type and district to see win rates, settlement ranges, and real federal outcome statistics.',
  alternates: { canonical: 'https://mycasevalues.com/odds' },
  openGraph: {
    title: 'Check My Odds - Federal Case Analysis',
    description: 'Analyze your federal case against 4.1M+ real outcomes. See win rates and settlement data for your specific case type and district.',
    url: 'https://mycasevalues.com/odds',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function OddsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
