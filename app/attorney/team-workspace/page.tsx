import type { Metadata } from 'next';
import TeamWorkspace from '@/components/TeamWorkspace';

export const metadata: Metadata = {
  title: 'Team Workspace',
  description: 'Collaborate with colleagues — share reports, annotations, and case insights.',
  robots: { index: false, follow: false },
};

export default function TeamWorkspacePage() {
  return <TeamWorkspace />;
}
