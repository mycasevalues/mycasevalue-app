import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Opposing Counsel Analysis',
  description: 'Research opposing counsel track record, strategies, and settlement patterns.',
};

export default function OpposingCounselLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
