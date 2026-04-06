import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Deadline Calculator | Attorney Mode',
  description: 'Calculate federal court deadlines and statute of limitations dates for your cases. Automated reminders for discovery deadlines, motion deadlines, and filing dates.',
  robots: { index: false, follow: false },
};

export default function DeadlineCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
