import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Venue Optimizer | Attorney Mode | MyCaseValue',
  description: 'Find the optimal filing district based on case type, win rates, settlement data, and case duration.',
  robots: { index: false, follow: false },
};

export default function VenueOptimizerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
