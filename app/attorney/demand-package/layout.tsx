import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Demand Package Builder',
  description: 'Build professional demand packages with federal court statistics, medical summaries, settlement calculations, and exhibit organization.',
  alternates: { canonical: `${SITE_URL}/attorney/demand-package` },
  openGraph: {
    title: 'Demand Package Builder — MyCaseValue',
    description: 'Build professional demand packages with federal court statistics, medical summaries, and settlement calculations.',
    url: `${SITE_URL}/attorney/demand-package`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demand Package Builder — MyCaseValue',
    description: 'Build professional demand packages with federal court statistics.',
  },
  keywords: [
    'demand package',
    'demand letter',
    'settlement demand',
    'personal injury demand',
    'litigation demand package',
    'insurance demand',
  ],
};

export default function DemandPackageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
