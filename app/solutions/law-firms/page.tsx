import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Law Firm Solutions | MyCaseValue',
  description: 'Federal court analytics tools designed for law firms. Access settlement data, win rates, and judge analytics to strengthen your case strategy.',
};

export default function LawFirmsPage() {
  redirect('/solutions/small-firms');
}
