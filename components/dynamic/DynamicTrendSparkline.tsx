import dynamic from 'next/dynamic';
import LoadingSkeleton from '../LoadingSkeleton';

const TrendSparkline = dynamic(() => import('../charts/TrendSparkline'), {
  loading: () => <div style={{ width: '80px', height: '48px', display: 'inline-block' }}><LoadingSkeleton variant="chart" /></div>,
  ssr: true,
});

export default TrendSparkline;
