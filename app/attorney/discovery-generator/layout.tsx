import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Discovery Generator | Attorney Mode',
  description: 'AI-assisted discovery document generation for federal litigation.',
  robots: { index: false, follow: false },
};

export default function DiscoveryGeneratorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
