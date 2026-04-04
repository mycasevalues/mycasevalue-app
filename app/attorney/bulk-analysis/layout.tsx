import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Bulk Case Analysis | Attorney Mode | MyCaseValue',
  description: 'Analyze portfolios of case types for pattern recognition, risk clustering, and outcome trends.',
  robots: { index: false, follow: false },
};

export default function BulkAnalysisLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
