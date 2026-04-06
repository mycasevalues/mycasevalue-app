import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Win Rate Map',
  description: 'Interactive map showing aggregate win rates by US state and federal district',
  alternates: {
    canonical: `${SITE_URL}/map`,
  },
  openGraph: {
    title: 'Win Rate Map',
    description: 'Interactive map showing aggregate win rates by US state and federal district',
    url: 'https://www.mycasevalues.com/map',
  },
};

export default function MapLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
