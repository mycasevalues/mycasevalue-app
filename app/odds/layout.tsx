import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Case Odds',
  description: 'View win rates by case type and federal district court',
  openGraph: {
    title: 'Case Odds',
    description: 'View win rates by case type and federal district court',
    url: `${SITE_URL}/odds`,
  },
};

export default function OddsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
