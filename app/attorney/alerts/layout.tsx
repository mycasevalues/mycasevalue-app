import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Alerts & Notifications',
  description: 'Create custom legal research alerts. Receive notifications when new cases, statutes, regulations, news, and briefs match your search criteria.',
  openGraph: {
    title: 'Alerts & Notifications — MyCaseValue',
    description: 'Create custom legal research alerts. Receive notifications when new cases, statutes, regulations, news, and briefs match your search criteria.',
    url: `${SITE_URL}/attorney/alerts`,
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alerts & Notifications — MyCaseValue',
    description: 'Create custom legal research alerts. Receive notifications when new cases, statutes, regulations, news, and briefs match your search criteria.'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
