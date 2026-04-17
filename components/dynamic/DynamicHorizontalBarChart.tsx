import dynamic from 'next/dynamic';
import LoadingSkeleton from '../LoadingSkeleton';

const HorizontalBarChart = dynamic(() => import('../charts/HorizontalBarChart'), {
  loading: () => <LoadingSkeleton variant="chart" />,
  ssr: true,
});

export default HorizontalBarChart;
