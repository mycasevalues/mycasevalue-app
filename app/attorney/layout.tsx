import { ReactNode } from 'react';
import AttorneyToolsNav from '../../components/AttorneyToolsNav';

export default function AttorneyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AttorneyToolsNav />
      {children}
    </>
  );
}
