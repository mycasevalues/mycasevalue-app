import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '50-State Jurisdictional Survey — MyCaseValue',
  description: 'Comprehensive state-by-state analysis of statutes, case law, and legal provisions across all 50 states.',
  openGraph: {
    title: '50-State Jurisdictional Survey',
    description: 'Comprehensive state-by-state analysis of statutes, case law, and legal provisions across all 50 states.',
    type: 'website',
    url: `${SITE_URL}/attorney/state-survey`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
