import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Court Rules Reference | Attorney Mode',
  description: 'Quick reference for federal court rules, discovery deadlines, filing requirements, and procedural guidelines for all 94 federal districts.',
  robots: { index: false, follow: false },
};

export default function CourtRulesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
