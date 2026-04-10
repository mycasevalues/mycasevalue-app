import { Metadata } from 'next';
import DemandPackageGenerator from '@/components/DemandPackageGenerator';

export const metadata: Metadata = {
  title: 'Demand Letter Data Package',
  description: 'Generate professional research data packages for demand letters with federal court statistics.',
};

export default function DemandPackagePage() {
  return <DemandPackageGenerator />;
}
