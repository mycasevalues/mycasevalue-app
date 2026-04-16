import'type { Metadata } from 'next';
import'{ ReactNode } from 'react';
import'{ SITE_URL } from '../../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Bulk Case Analysis',
' description: 'Upload and analyze CSV files of multiple cases for portfolio risk assessment and outcome trends.',
' robots: { index: false, follow: false },
' alternates: { canonical: `${SITE_URL}/attorney/bulk-analysis` },
' openGraph: {
'   title: 'Bulk Case Analysis',
'   description: 'Upload and analyze CSV files of multiple cases for portfolio risk assessment and outcome trends.',
'   url: `${SITE_URL}/attorney/bulk-analysis`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Bulk Case Analysis',
'   description: 'Upload and analyze CSV files of multiple cases for portfolio risk assessment.',
' },
};

export'default function BulkAnalysisLayout({ children }: { children: ReactNode }) {
' return <>{children}</>;
}
