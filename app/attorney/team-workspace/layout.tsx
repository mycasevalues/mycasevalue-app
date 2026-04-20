import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Team Workspace',
  description: 'Collaborate with colleagues — share reports, annotations, and case insights.',
  alternates: { canonical: `${SITE_URL}/attorney/team-workspace` },
  openGraph: {
    title: 'Team Workspace — MyCaseValue',
    description: 'Collaborate with colleagues — share reports, annotations, and case insights.',
    url: `${SITE_URL}/attorney/team-workspace`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Workspace — MyCaseValue',
    description: 'Collaborate with colleagues — share reports, annotations, and case insights.',
  },
};

export default function TeamWorkspaceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
