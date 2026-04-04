import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'My Reports | MyCaseValue',
  description: 'View and manage your saved case research reports.',
  robots: { index: false, follow: false },
};

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
