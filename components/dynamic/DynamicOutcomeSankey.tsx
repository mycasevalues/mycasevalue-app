import dynamic from 'next/dynamic';
import LoadingSkeleton from '../LoadingSkeleton';

const OutcomeSankey = dynamic(() => import('../charts/OutcomeSankey'), {
  loading: () => <LoadingSkeleton variant="chart" />,
  ssr: true,
});

export default OutcomeSankey;
