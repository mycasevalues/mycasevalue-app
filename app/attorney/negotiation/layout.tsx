import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Negotiation Intelligence',
  description: 'Data-driven settlement negotiation strategy with BATNA analysis, settlement ranges, timing insights, and counteroffer modeling from federal data.',
  alternates: { canonical: `${SITE_URL}/attorney/negotiation` },
  openGraph: {
    title: 'Negotiation Intelligence | MyCaseValues',
    description: 'Data-driven settlement negotiation strategy with BATNA analysis, settlement ranges, and counteroffer modeling.',
    url: `${SITE_URL}/attorney/negotiation`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Negotiation Intelligence | MyCaseValues',
    description: 'Data-driven settlement negotiation with BATNA analysis and timing insights.',
  },
  keywords: [
    'settlement negotiation',
    'negotiation strategy',
    'BATNA analysis',
    'settlement ranges',
    'counteroffer modeling',
    'litigation settlement',
  ],
};

export default function NegotiationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
