import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Deposition Prep | Attorney Mode',
  description: 'Prepare for depositions with AI-powered question generation and case analysis.',
  robots: { index: false, follow: false },
};

export default function DepositionPrepLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
