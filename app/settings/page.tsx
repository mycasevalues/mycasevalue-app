import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your MyCaseValue account settings and preferences.',
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  redirect('/account');
}
