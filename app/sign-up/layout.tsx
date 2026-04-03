import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | MyCaseValue',
  robots: { index: false, follow: false },
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
