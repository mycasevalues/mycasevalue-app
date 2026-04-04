import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Value Calculator | MyCaseValue',
  description: 'Estimate your case value with our damage multiplier calculator based on federal court data',
  openGraph: {
    title: 'Case Value Calculator | MyCaseValue',
    description: 'Estimate your case value with our damage multiplier calculator based on federal court data',
    url: 'https://www.mycasevalues.com/calculator',
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
