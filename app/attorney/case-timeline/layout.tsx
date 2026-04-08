import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Federal Case Timeline Generator | MyCaseValues Attorney Tools',
  description: 'Generate accurate federal case timelines and milestones for your specific case type and district. Predict discovery closure, expert disclosures, and trial dates based on 5.1M+ historical federal cases.',
  keywords: [
    'case timeline generator',
    'federal case timeline',
    'case milestones',
    'discovery timeline',
    'case schedule',
    'federal litigation timeline',
    'case prediction',
  ],
  alternates: {
    canonical: `${SITE_URL}/attorney/case-timeline`,
  },
  openGraph: {
    title: 'Federal Case Timeline Generator | MyCaseValues',
    description: 'Generate accurate federal case timelines and milestones for your specific case type and district.',
    url: `${SITE_URL}/attorney/case-timeline`,
    type: 'website',
    siteName: 'MyCaseValues',
  },
  robots: { index: false, follow: false },
};

export default function CaseTimelineLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
