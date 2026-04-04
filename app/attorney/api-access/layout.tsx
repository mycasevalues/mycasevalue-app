import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'API Access | Attorney Mode | MyCaseValue',
  description: 'Programmatic access to MyCaseValue data via REST API for custom integrations.',
  robots: { index: false, follow: false },
};

export default function ApiAccessLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
