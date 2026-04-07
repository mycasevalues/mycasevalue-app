import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Team Workspace | MyCaseValue',
  description: 'Collaborate with colleagues — share reports, annotations, and case insights.',
  robots: { index: false, follow: false },
};

export default function TeamWorkspaceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
