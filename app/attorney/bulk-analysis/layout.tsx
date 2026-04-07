import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Bulk Case Analysis | MyCaseValue',
  description: 'Upload and analyze CSV files of multiple cases for portfolio risk assessment and outcome trends.',
  robots: { index: false, follow: false },
};

export default function BulkAnalysisLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
