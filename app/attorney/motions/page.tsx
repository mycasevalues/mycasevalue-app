import { Metadata } from 'next';
import MotionRateExplorer from '../../../components/MotionRateExplorer';

export const metadata: Metadata = {
  title: 'Motion Success Rate Database | MyCaseValue',
  description: 'Motion success rate database by case type and circuit',
};

export default function MotiondPage() {
  return <MotionRateExplorer />;
}
