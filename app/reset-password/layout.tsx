import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | MyCaseValue',
  description: 'Set a new password for your MyCaseValue account',
  robots: { index: false },
  openGraph: {
    title: 'Reset Password | MyCaseValue',
    description: 'Set a new password for your MyCaseValue account',
    url: 'https://www.mycasevalues.com/reset-password',
  },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
