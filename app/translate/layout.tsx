import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Translator | MyCaseValue',
  description: 'Translate complex legal terminology into plain English',
  openGraph: {
    title: 'Legal Translator | MyCaseValue',
    description: 'Translate complex legal terminology into plain English',
    url: 'https://www.mycasevalues.com/translate',
  },
};

export default function TranslateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
