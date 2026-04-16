import'type { Metadata } from 'next';
import'{ SITE_URL } from '../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Forgot Password',
' description: 'Reset your MyCaseValue account password',
' robots: { index: false },
' openGraph: {
'   title: 'Forgot Password',
'   description: 'Reset your MyCaseValue account password',
'   url: `${SITE_URL}/forgot-password`,
' },
};

export'default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
' return children;
}
