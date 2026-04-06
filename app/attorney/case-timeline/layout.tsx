import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Case Timeline Generator | Attorney Mode',
  description: 'Generate detailed federal case timelines with key milestones, discovery deadlines, and motion schedules based on historical case data.',
  robots: { index: false, follow: false },
};

export default function CaseTimelineLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
