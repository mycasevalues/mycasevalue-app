import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Federal Case Timeline Generator',
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
    title: 'Federal Case Timeline Generator — MyCaseValue',
    description: 'Generate accurate federal case timelines and milestones for your specific case type and district.',
    url: `${SITE_URL}/attorney/case-timeline`,
    type: 'website',
    siteName: 'MyCaseValue',
  },
};

export default function CaseTimelineLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
