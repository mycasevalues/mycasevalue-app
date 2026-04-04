import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Win Rate Map | MyCaseValue',
  description: 'Interactive map showing aggregate win rates by US state and federal district',
  openGraph: {
    title: 'Win Rate Map | MyCaseValue',
    description: 'Interactive map showing aggregate win rates by US state and federal district',
    url: 'https://www.mycasevalues.com/map',
  },
};

export default function MapLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
