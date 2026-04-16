import'type { Metadata } from 'next';
import'{ ReactNode } from 'react';
import'{ SITE_URL } from '../../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Statute of Limitations Calculator | Attorney Mode',
' description: 'Calculate statute of limitations deadlines for federal cases by case type, discovery rule, and jurisdiction. Automated deadline tracking and alerts.',
' robots: { index: false, follow: false },
' alternates: { canonical: `${SITE_URL}/attorney/sol-calculator` },
' openGraph: {
'   title: 'Statute of Limitations Calculator | Attorney Mode',
'   description: 'Calculate statute of limitations deadlines for federal cases.',
'   url: `${SITE_URL}/attorney/sol-calculator`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Statute of Limitations Calculator | Attorney Mode',
'   description: 'Calculate statute of limitations deadlines for federal cases.',
' },
};

export'default function SOLCalculatorLayout({ children }: { children: ReactNode }) {
' return <>{children}</>;
}
