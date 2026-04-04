import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Jargon Translator — Plain English | MyCaseValue',
  description: 'Paste any legal text from a federal court document and get an instant plain-English explanation.',
  alternates: { canonical: 'https://www.mycasevalues.com/translate' },
};

export default function TranslateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
