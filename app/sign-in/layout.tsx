import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your MyCaseValue account',
  robots: { index: false },
  openGraph: {
    title: 'Sign In',
    description: 'Sign in to your MyCaseValue account',
    url: `${SITE_URL}/sign-in`,
  },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
