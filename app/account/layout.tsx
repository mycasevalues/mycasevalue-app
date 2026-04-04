import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Account Settings | MyCaseValue',
  description: 'Manage your MyCaseValue account settings, subscription, and billing information.',
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
