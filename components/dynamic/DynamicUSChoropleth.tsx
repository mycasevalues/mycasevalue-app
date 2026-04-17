import dynamic from 'next/dynamic';
import LoadingSkeleton from '../LoadingSkeleton';

const USChoropleth = dynamic(() => import('../charts/USChoropleth'), {
  loading: () => <LoadingSkeleton variant="chart" />,
  ssr: true,
});

export default USChoropleth;
