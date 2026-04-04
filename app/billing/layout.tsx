import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Billing | MyCaseValue',
  description: 'Manage your billing information and subscription plan.',
  robots: { index: false, follow: false },
};

export default function BillingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
