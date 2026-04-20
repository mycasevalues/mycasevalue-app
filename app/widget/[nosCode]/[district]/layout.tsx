import { ReactNode } from 'react';

export const metadata = {
  title: 'Case Settlement Widget',
  robots: 'noindex, nofollow',
};

interface WidgetLayoutProps {
  children: ReactNode;
}

export default function WidgetLayout({ children }: WidgetLayoutProps) {
  return <>{children}</>;
}
