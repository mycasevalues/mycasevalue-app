import'type { Metadata } from 'next';
import'{ SITE_URL } from '../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Sign In',
' description: 'Sign in to your MyCaseValue account to access case insights.',
' alternates: {
'   canonical: `${SITE_URL}/sign-in`,
' },
' openGraph: {
'   title: 'Sign In',
'   description: 'Sign in to your MyCaseValue account to access case insights.',
'   url: `${SITE_URL}/sign-in`,
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
'   title: 'Sign In',
'   description: 'Sign in to your MyCaseValue account to access case insights.',
'   images: [`${SITE_URL}/og-image.png`],
' },
};

export'default function SignInLayout({ children }: { children: React.ReactNode }) {
' return children;
}
