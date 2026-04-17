/**
 * Skeleton loading components for Suspense boundaries
 * Uses inline styles with animate-pulse effect for consistent loading states
 */

const pulseStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #F3F2EF 25%, #E9E5DF 50%, #F3F2EF 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
  borderRadius: '4px',
};

const pulseKeyframes = `
@keyframes skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

function SkeletonBox({ width = '100%', height = '20px', style }: { width?: string; height?: string; style?: React.CSSProperties }) {
  return <div style={{ ...pulseStyle, width, height, ...style }} />;
}

/** Win rate metric card skeleton */
export function WinRateSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={{ background: 'var(--color-surface-0)', border: '1px solid #E0DDD8', borderRadius: '4px', padding: '24px' }}>
        <SkeletonBox width="80px" height="12px" style={{ marginBottom: '12px' }} />
        <SkeletonBox width="120px" height="36px" style={{ marginBottom: '8px' }} />
        <SkeletonBox width="160px" height="14px" />
      </div>
    </>
  );
}

/** Settlement range bar skeleton */
export function SettlementRangeSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={{ background: 'var(--color-surface-0)', border: '1px solid #E0DDD8', borderRadius: '4px', padding: '24px' }}>
        <SkeletonBox width="140px" height="14px" style={{ marginBottom: '16px' }} />
        <SkeletonBox width="100%" height="24px" style={{ marginBottom: '16px', borderRadius: '4px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <SkeletonBox height="48px" />
          <SkeletonBox height="48px" />
          <SkeletonBox height="48px" />
        </div>
      </div>
    </>
  );
}

/** Trend chart skeleton */
export function TrendChartSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={{ background: 'var(--color-surface-0)', border: '1px solid #E0DDD8', borderRadius: '4px', padding: '24px' }}>
        <SkeletonBox width="180px" height="18px" style={{ marginBottom: '24px' }} />
        <SkeletonBox width="100%" height="200px" style={{ borderRadius: '4px' }} />
      </div>
    </>
  );
}

/** Top districts table skeleton */
export function TopDistrictsTableSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={{ background: 'var(--color-surface-0)', border: '1px solid #E0DDD8', borderRadius: '4px', padding: '24px' }}>
        <SkeletonBox width="160px" height="16px" style={{ marginBottom: '20px' }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
            <SkeletonBox width="32px" height="32px" style={{ borderRadius: '50%' }} />
            <SkeletonBox width="180px" height="14px" />
            <SkeletonBox width="60px" height="14px" style={{ marginLeft: 'auto' }} />
          </div>
        ))}
      </div>
    </>
  );
}

/** Circuit performance table skeleton */
export function CircuitTableSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={{ background: 'var(--color-surface-0)', border: '1px solid #E0DDD8', borderRadius: '4px', padding: '24px' }}>
        <SkeletonBox width="200px" height="16px" style={{ marginBottom: '20px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
          <SkeletonBox height="14px" />
          <SkeletonBox height="14px" />
          <SkeletonBox height="14px" />
          <SkeletonBox height="14px" />
        </div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
            <SkeletonBox height="14px" />
            <SkeletonBox height="14px" />
            <SkeletonBox height="14px" />
            <SkeletonBox height="14px" />
          </div>
        ))}
      </div>
    </>
  );
}

/** Generic metrics row skeleton (4 cards) */
export function MetricsRowSkeleton() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: 'var(--color-surface-0)', border: '1px solid #E0DDD8', borderRadius: '4px', padding: '20px' }}>
            <SkeletonBox width="80px" height="11px" style={{ marginBottom: '12px' }} />
            <SkeletonBox width="100px" height="28px" style={{ marginBottom: '6px' }} />
            <SkeletonBox width="140px" height="12px" />
          </div>
        ))}
      </div>
    </>
  );
}
