import'type { Metadata } from 'next';
import'{ ReactNode } from 'react';
import'{ SITE_URL } from '../../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Motion Analytics | Attorney Mode',
' description: 'Analyze motion success rates and judge tendencies. Track motion outcomes, timeline predictions, and success probabilities for your federal cases.',
' robots: { index: false, follow: false },
' alternates: { canonical: `${SITE_URL}/attorney/motion-analytics` },
' openGraph: {
'   title: 'Motion Analytics | Attorney Mode',
'   description: 'Analyze motion success rates and judge tendencies for federal cases.',
'   url: `${SITE_URL}/attorney/motion-analytics`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Motion Analytics | Attorney Mode',
'   description: 'Analyze motion success rates and judge tendencies for federal cases.',
' },
};

export'default function MotionAnalyticsLayout({ children }: { children: ReactNode }) {
' return <>{children}</>;
}
