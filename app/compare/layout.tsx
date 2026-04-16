import'type { Metadata } from 'next';
import'{ SITE_URL } from '../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Compare Federal Case Types — Win Rates & Outcomes',
' description: 'Compare up to 3 federal case types side by side. Analyze win rates, settlement rates, dismissal rates, and median duration from 5.1M+ real court outcomes.',
' alternates: {
'   canonical: `${SITE_URL}/compare`,
' },
' openGraph: {
'   title: 'Compare Federal Case Types',
'   description: 'Compare win rates, settlement rates, and dismissal rates across federal case types. Side-by-side analysis of case outcomes.',
'   url: `${SITE_URL}/compare`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [
'     {
'       url: `${SITE_URL}/og-image.png`,
'       width: 1200,
'       height: 630,
'       alt: 'Federal Case Types Comparison',
'     },
'   ],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Compare Case Types',
'   description: 'Compare case outcomes across federal case types.',
'   images: [`${SITE_URL}/og-image.png`],
' },
};

export'default function CompareLayout({ children }: { children: React.ReactNode }) {
' return children;
}
