import type { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Court Deadlines Calculator',
  description: 'Free federal court deadlines calculator. Calculate critical FRCP deadlines including service, answers, discovery, and dispositive motions based on key case events.',
  alternates: {
    canonical: `${SITE_URL}/calculator/deadlines`,
  },
  openGraph: {
    title: 'Court Deadlines Calculator',
    description: 'Calculate federal court deadlines using Federal Rules of Civil Procedure. Track service, answer, discovery, and motion deadlines.',
    url: `${SITE_URL}/calculator/deadlines`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Court Deadlines Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Court Deadlines Calculator',
    description: 'Calculate federal court deadlines from key case events.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function DeadlinesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
