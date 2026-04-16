import'type { Metadata } from 'next';
import'{ ReactNode } from 'react';
import'{ SITE_URL } from '@/lib/site-config';

export'const metadata: Metadata = {
' title: 'Saved Reports',
' description: 'View and manage your saved case research reports and search history.',
' alternates: {
'   canonical: `${SITE_URL}/reports`,
' },
' openGraph: {
'   title: 'Saved Reports',
'   description: 'View and manage your saved case research reports and search history.',
'   url: `${SITE_URL}/reports`,
'   siteName: 'MyCaseValue',
'   images: [
'     {
'       url: `${SITE_URL}/og-image.png`,
'       width: 1200,
'       height: 630,
'     },
'   ],
'   type: 'website',
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Saved Reports',
'   description: 'View and manage your saved case research reports and search history.',
'   images: [`${SITE_URL}/og-image.png`],
' },
' robots: { index: false, follow: false },
};

export'default function ReportsLayout({ children }: { children: ReactNode }) {
' return <>{children}</>;
}
