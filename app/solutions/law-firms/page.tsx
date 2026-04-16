import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Law Firm Solutions',
  description: 'Federal court analytics tools designed for law firms. Access settlement data, win rates, and judge analytics to strengthen your case strategy.',
  openGraph: {
    title: 'Law Firm Solutions',
    description: 'Federal court analytics tools designed for law firms. Access settlement data, win rates, and judge analytics to strengthen your case strategy.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Law Firm Solutions',
    description: 'Federal court analytics tools designed for law firms. Access settlement data, win rates, and judge analytics to strengthen your case strategy.',
  },
};

export default function LawFirmsPage() {
  redirect('/solutions/small-firms');
}
