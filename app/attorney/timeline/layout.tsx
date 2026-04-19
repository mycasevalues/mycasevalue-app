import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Visual Case Timeline',
  description: 'Interactive litigation timeline with data-backed milestones, deadline tracking, and statistical resolution context from federal court records.',
  alternates: { canonical: `${SITE_URL}/attorney/timeline` },
  openGraph: {
    title: 'Visual Case Timeline — MyCaseValue',
    description: 'Interactive litigation timeline with data-backed milestones and statistical resolution context.',
    url: `${SITE_URL}/attorney/timeline`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Case Timeline — MyCaseValue',
    description: 'Interactive litigation timeline with data-backed milestones.',
  },
  keywords: [
    'case timeline',
    'litigation timeline',
    'legal milestones',
    'case duration',
    'federal case timeline',
    'litigation management',
  ],
};

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
