import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AI Case Outcome Predictor | Attorney Mode | MyCaseValue',
  description: 'Predict case outcomes using AI analysis of historical federal court data, case factors, and legal precedents.',
  robots: { index: false, follow: false },
};

export default function CasePredictorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
