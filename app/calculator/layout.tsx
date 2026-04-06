import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Settlement Calculator — Estimate Case Value',
  description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real outcomes, case type, district, and damage amount. Instant results.',
  openGraph: {
    title: 'Settlement Calculator — Estimate Case Value',
    description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real outcomes, case type, district, and damage amount.',
    url: `${SITE_URL}/calculator`,
  },
  alternates: {
    canonical: `${SITE_URL}/calculator`,
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
