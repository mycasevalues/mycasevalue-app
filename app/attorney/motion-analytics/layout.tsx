import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Motion Analytics | Attorney Mode',
  description: 'Analyze motion success rates and judge tendencies. Track motion outcomes, timeline predictions, and success probabilities for your federal cases.',
  robots: { index: false, follow: false },
};

export default function MotionAnalyticsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
