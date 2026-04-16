import'type { Metadata } from 'next';
import'{ ReactNode } from 'react';
import'{ SITE_URL } from '../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Win Rate Map — Federal Courts by District',
' description: 'Interactive map showing aggregate win rates by US state and federal district. Analyze case outcomes by jurisdiction.',
' alternates: {
'   canonical: `${SITE_URL}/map`,
' },
' openGraph: {
'   title: 'Win Rate Map — Federal Courts by District',
'   description: 'Interactive map showing aggregate win rates by US state and federal district. Analyze outcomes by jurisdiction.',
'   url: `${SITE_URL}/map`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [
'     {
'       url: `${SITE_URL}/og-image.png`,
'       width: 1200,
'       height: 630,
'       alt: 'Federal Court Win Rate Map',
'     },
'   ],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Win Rate Map',
'   description: 'View federal court win rates by state and district.',
'   images: [`${SITE_URL}/og-image.png`],
' },
};

export'default function MapLayout({ children }: { children: ReactNode }) {
' return <>{children}</>;
}
