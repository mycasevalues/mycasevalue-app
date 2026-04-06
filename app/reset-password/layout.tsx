import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Reset Password | MyCaseValue',
  description: 'Set a new password for your MyCaseValue account',
  robots: { index: false },
  openGraph: {
    title: 'Reset Password | MyCaseValue',
    description: 'Set a new password for your MyCaseValue account',
    url: `${SITE_URL}/reset-password`,
  },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
