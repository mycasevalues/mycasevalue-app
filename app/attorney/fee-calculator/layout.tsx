import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fee & Contingency Calculator | Attorney Mode',
  description: 'Calculate contingency fees and attorney costs based on expected settlement ranges and federal court outcome data for your case type.',
  robots: { index: false, follow: false },
};

export default function FeeCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
