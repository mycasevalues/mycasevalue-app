import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PACER Monitoring | Attorney Mode | MyCaseValue',
  description: 'Set up alerts for case developments, filings, and motions across federal courts.',
  robots: { index: false, follow: false },
};

export default function PacerMonitorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
