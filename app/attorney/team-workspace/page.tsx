import type { Metadata } from 'next';
import TeamWorkspace from '@/components/TeamWorkspace';

export const metadata: Metadata = {
  title: 'Team Workspace',
  description: 'Collaborate with colleagues — share reports, annotations, and case insights.',
};

export default function TeamWorkspacePage() {
  return <TeamWorkspace />;
}
