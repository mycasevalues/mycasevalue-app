import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | MyCaseValue',
  description: 'Sign in to your MyCaseValue account',
  robots: { index: false },
  openGraph: {
    title: 'Sign In | MyCaseValue',
    description: 'Sign in to your MyCaseValue account',
    url: 'https://www.mycasevalues.com/sign-in',
  },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
