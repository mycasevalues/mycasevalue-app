import'type { Metadata } from 'next';
import'{ ReactNode } from 'react';
import'{ SITE_URL } from '../../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Discovery Generator | Attorney Mode',
' description: 'AI-assisted discovery document generation for federal litigation.',
' robots: { index: false, follow: false },
' alternates: { canonical: `${SITE_URL}/attorney/discovery-generator` },
' openGraph: {
'   title: 'Discovery Generator | Attorney Mode',
'   description: 'AI-assisted discovery document generation for federal litigation.',
'   url: `${SITE_URL}/attorney/discovery-generator`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Discovery Generator | Attorney Mode',
'   description: 'AI-assisted discovery document generation for federal litigation.',
' },
};

export'default function DiscoveryGeneratorLayout({ children }: { children: ReactNode }) {
' return <>{children}</>;
}
