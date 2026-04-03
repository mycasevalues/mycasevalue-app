import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful | MyCaseValue',
  robots: { index: false, follow: false },
};

export default function PaymentSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
