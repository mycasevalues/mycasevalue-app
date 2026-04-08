import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Appeals Analyzer | Attorney Mode',
  description: 'Analyze appellate reversal rates and appeal outcomes by circuit and case type.',
  robots: { index: false, follow: false },
};

export default function AppealsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
