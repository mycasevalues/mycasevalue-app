import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Judge Intelligence | Attorney Mode',
  description: 'Research federal judges — see case statistics, ruling patterns, and settlement tendencies by district.',
  robots: { index: false, follow: false },
};

export default function JudgeIntelligenceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
