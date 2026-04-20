import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'API Access — Developer Documentation',
  description: 'Access programmatic APIs to get case statistics, win rates, settlement data, and predictive analytics. Complete API documentation with cURL examples.',
};

export default function ApiAccessLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
