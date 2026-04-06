import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Opposing Counsel Analysis | Attorney Mode',
  description: 'Research opposing counsel track record, strategies, and settlement patterns.',
  robots: { index: false, follow: false },
};

export default function OpposingCounselLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
