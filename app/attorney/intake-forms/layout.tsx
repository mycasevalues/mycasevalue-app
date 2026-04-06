import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Client Intake Forms | Attorney Mode',
  description: 'Customizable client intake forms for federal cases. Automatically populate case evaluation data based on client information and legal issues.',
  robots: { index: false, follow: false },
};

export default function IntakeFormsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
