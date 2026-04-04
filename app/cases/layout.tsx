import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Case Categories | MyCaseValue',
  description: 'Browse 10 major federal court case categories with win rates, settlement data, and outcome statistics',
  openGraph: {
    title: 'Federal Case Categories | MyCaseValue',
    description: 'Browse 10 major federal court case categories with win rates, settlement data, and outcome statistics',
    url: 'https://www.mycasevalues.com/cases',
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
