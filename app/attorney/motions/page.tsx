import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import MotionRateExplorer from '../../../components/MotionRateExplorer';

export const metadata: Metadata = {
  title: 'Motion Success Rate Database | MyCaseValue',
  description: 'Motion success rate database by case type and circuit',
  alternates: { canonical: `${SITE_URL}/attorney/motions` },
  openGraph: {
    title: 'Motion Success Rate Database | MyCaseValue',
    description: 'Motion success rate database by case type and circuit',
    url: `${SITE_URL}/attorney/motions`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Success Rate Database | MyCaseValue',
    description: 'Motion success rate database by case type and circuit',
  },
};

export default function MotiondPage() {
  return <MotionRateExplorer />;
}
