import'type { Metadata } from 'next';
import'{ ReactNode } from 'react';
import'{ SITE_URL } from '../../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Demand Letter Generator | Attorney Mode',
' description: 'Generate demand letters with calculated settlement values based on federal court settlement data, case type, and jurisdictional averages.',
' robots: { index: false, follow: false },
' alternates: { canonical: `${SITE_URL}/attorney/demand-letter` },
' openGraph: {
'   title: 'Demand Letter Generator | Attorney Mode',
'   description: 'Generate demand letters with calculated settlement values based on federal court settlement data.',
'   url: `${SITE_URL}/attorney/demand-letter`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Demand Letter Generator | Attorney Mode',
'   description: 'Generate demand letters with calculated settlement values based on federal court data.',
' },
};

export'default function DemandLetterLayout({ children }: { children: ReactNode }) {
' return <>{children}</>;
}
