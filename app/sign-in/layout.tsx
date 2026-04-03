import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | MyCaseValue',
  robots: { index: false, follow: false },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
