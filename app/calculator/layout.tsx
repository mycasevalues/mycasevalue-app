import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settlement Calculator — Estimate Case Value | MyCaseValue',
  description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real outcomes, case type, district, and damage amount. Instant results.',
  openGraph: {
    title: 'Settlement Calculator — Estimate Case Value | MyCaseValue',
    description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real outcomes, case type, district, and damage amount.',
    url: 'https://www.mycasevalues.com/calculator',
  },
  alternates: {
    canonical: 'https://www.mycasevalues.com/calculator',
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
