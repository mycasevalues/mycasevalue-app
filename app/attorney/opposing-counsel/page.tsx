import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import OpposingCounselSearch from '../../../components/OpposingCounselSearch';

export const metadata: Metadata = {
  title: 'Opposing Counsel Research | MyCaseValue',
  description:
    'Research opposing counsel track record, settlement patterns, and litigation strategy. Analyze their win rates, time to settlement, and case type preferences using public PACER data.',
  alternates: { canonical: `${SITE_URL}/attorney/opposing-counsel` },
  openGraph: {
    title: 'Opposing Counsel Research | MyCaseValue',
    description:
      'Research opposing counsel track record, settlement patterns, and litigation strategy. Analyze their win rates, time to settlement, and case type preferences using public PACER data.',
    url: `${SITE_URL}/attorney/opposing-counsel`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opposing Counsel Research | MyCaseValue',
    description: 'Research opposing counsel track record, settlement patterns, and litigation strategy.',
  },
};

export default function OpposingCounselPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <OpposingCounselSearch />
    </div>
  );
}
