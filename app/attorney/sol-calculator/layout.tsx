import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Statute of Limitations Calculator | Attorney Mode',
  description: 'Calculate statute of limitations deadlines for federal cases by case type, discovery rule, and jurisdiction. Automated deadline tracking and alerts.',
  robots: { index: false, follow: false },
};

export default function SOLCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
