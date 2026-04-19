import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Client Intake Forms — MyCaseValue',
  description: 'Customizable client intake forms for federal cases. Automatically populate case evaluation data based on client information and legal issues.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/attorney/intake-forms` },
  openGraph: {
    title: 'Client Intake Forms — MyCaseValue',
    description: 'Customizable client intake forms for federal cases.',
    url: `${SITE_URL}/attorney/intake-forms`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Intake Forms — MyCaseValue',
    description: 'Customizable client intake forms for federal cases.',
  },
};

export default function IntakeFormsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
