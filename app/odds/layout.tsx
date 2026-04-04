import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Case Odds | MyCaseValue',
  description: 'View win rates by case type and federal district court',
  openGraph: {
    title: 'Case Odds | MyCaseValue',
    description: 'View win rates by case type and federal district court',
    url: 'https://www.mycasevalues.com/odds',
  },
};

export default function OddsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
