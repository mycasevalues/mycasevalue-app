import'type { Metadata } from 'next';
import'{ SITE_URL } from '../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Sign Up',
' description: 'Create a MyCaseValue account to research federal court case outcomes.',
' alternates: {
'   canonical: `${SITE_URL}/sign-up`,
' },
' openGraph: {
'   title: 'Sign Up',
'   description: 'Create a MyCaseValue account to research federal court case outcomes.',
'   url: `${SITE_URL}/sign-up`,
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
'   title: 'Sign Up',
'   description: 'Create a MyCaseValue account to research federal court case outcomes.',
'   images: [`${SITE_URL}/og-image.png`],
' },
};

export'default function SignUpLayout({ children }: { children: React.ReactNode }) {
' return children;
}
