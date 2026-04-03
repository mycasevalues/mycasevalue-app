import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settlement Calculator — MyCaseValue | Estimate Your Case Value',
  description: 'Estimate potential settlement ranges for your federal court case. Uses real outcome data from 5.1M+ cases to calculate expected recovery by case type and district.',
  alternates: { canonical: 'https://www.mycasevalues.com/calculator' },
  openGraph: {
    title: 'Settlement Calculator — MyCaseValue',
    description: 'Estimate potential settlement ranges using real federal court outcome data.',
    type: 'website',
    url: 'https://www.mycasevalues.com/calculator',
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
