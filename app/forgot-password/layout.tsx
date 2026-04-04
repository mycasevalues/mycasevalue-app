import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | MyCaseValue',
  description: 'Reset your MyCaseValue account password',
  robots: { index: false },
  openGraph: {
    title: 'Forgot Password | MyCaseValue',
    description: 'Reset your MyCaseValue account password',
    url: 'https://www.mycasevalues.com/forgot-password',
  },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
