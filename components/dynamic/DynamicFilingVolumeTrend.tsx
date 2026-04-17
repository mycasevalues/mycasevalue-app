import dynamic from 'next/dynamic';
import LoadingSkeleton from '../LoadingSkeleton';

const FilingVolumeTrend = dynamic(() => import('../charts/FilingVolumeTrend'), {
  loading: () => <LoadingSkeleton variant="chart" />,
  ssr: true,
});

export default FilingVolumeTrend;
