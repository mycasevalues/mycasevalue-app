import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Demand Letter Generator | Attorney Mode',
  description: 'Generate demand letters with calculated settlement values based on federal court settlement data, case type, and jurisdictional averages.',
  robots: { index: false, follow: false },
};

export default function DemandLetterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
