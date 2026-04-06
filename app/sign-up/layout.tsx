import type { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your free MyCaseValue account to access federal court case data',
  robots: { index: false },
  openGraph: {
    title: 'Sign Up',
    description: 'Create your free MyCaseValue account to access federal court case data',
    url: `${SITE_URL}/sign-up`,
  },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
