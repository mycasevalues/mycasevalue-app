import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Expert Witness Database | Attorney Mode',
  description: 'Find qualified expert witnesses for your federal cases. Database of expert witness profiles, specialties, and previous case experience by jurisdiction.',
  robots: { index: false, follow: false },
};

export default function ExpertWitnessLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
