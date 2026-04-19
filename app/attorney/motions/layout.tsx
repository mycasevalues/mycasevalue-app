import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Motion Drafting',
  description: 'AI-assisted motion drafting with jurisdiction-specific templates and federal motion success rate analytics by case type and circuit.',
  alternates: { canonical: `${SITE_URL}/attorney/motions` },
  openGraph: {
    title: 'Motion Drafting — MyCaseValue',
    description: 'AI-assisted motion drafting with jurisdiction-specific templates and success rate analytics.',
    url: `${SITE_URL}/attorney/motions`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Drafting — MyCaseValue',
    description: 'AI-assisted motion drafting with jurisdiction-specific templates.',
  },
  keywords: [
    'motion drafting',
    'motion success rates',
    'federal motion templates',
    'summary judgment',
    'motion to dismiss',
    'litigation motions',
  ],
};

export default function MotionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
