import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'AI Case Outcome Predictor',
  description: 'Predict case outcomes using AI analysis of historical federal court data, case factors, and legal precedents.',
  alternates: { canonical: `${SITE_URL}/attorney/case-predictor` },
  openGraph: {
    title: 'AI Case Outcome Predictor — MyCaseValue',
    description: 'Predict case outcomes using AI analysis of historical federal court data and legal precedents.',
    url: `${SITE_URL}/attorney/case-predictor`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Case Outcome Predictor — MyCaseValue',
    description: 'Predict case outcomes using AI analysis of federal court data.',
  },
};

export default function CasePredictorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
