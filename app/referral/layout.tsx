import'type { Metadata } from 'next';
import'{ SITE_URL } from '@/lib/site-config';

export'const metadata: Metadata = {
' title: 'Referral Program',
' description: 'Earn rewards by referring friends and colleagues to MyCaseValue.',
' alternates: {
'   canonical: `${SITE_URL}/referral`,
' },
' openGraph: {
'   title: 'Referral Program',
'   description: 'Earn rewards by referring friends and colleagues to MyCaseValue.',
'   url: `${SITE_URL}/referral`,
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
'   title: 'Referral Program',
'   description: 'Earn rewards by referring friends and colleagues to MyCaseValue.',
'   images: [`${SITE_URL}/og-image.png`],
' },
};

export'default function ReferralLayout({ children }: { children: React.ReactNode }) {
' return <>{children}</>;
}
