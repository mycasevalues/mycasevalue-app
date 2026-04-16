import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Settlement Calculator — Estimate Case Value | MyCaseValue',
  description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real outcomes, case type, district, and damage amount. Instant results.',
  openGraph: {
    title: 'Settlement Calculator — Estimate Case Value',
    description: 'Free federal court settlement calculator. Estimate your case value based on 5.1M+ real court outcomes, case type, district, and damage multipliers.',
    url: `${SITE_URL}/calculator`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Settlement Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settlement Calculator',
    description: 'Estimate your federal court case value instantly.',
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/calculator`,
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
