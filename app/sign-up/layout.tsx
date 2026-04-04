import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | MyCaseValue',
  description: 'Create your free MyCaseValue account to access federal court case data',
  robots: { index: false },
  openGraph: {
    title: 'Sign Up | MyCaseValue',
    description: 'Create your free MyCaseValue account to access federal court case data',
    url: 'https://www.mycasevalues.com/sign-up',
  },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
