'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'chart' | 'table' | 'stat';
  lines?: number;
  className?: string;
}

const shimmer = {
  initial: { x: '-100%' },
  animate: { x: '100%' },
  transition: { repeat: Infinity, duration: 1.5, ease: 'linear' as const },
};

function SkeletonLine({ width = '100%' }: { width?: string }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', height: 16, width, marginBottom: 8 }}>
      <motion.div
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
        initial={shimmer.initial}
        animate={shimmer.animate}
        transition={shimmer.transition}
      />
    </div>
  );
}

function StatSkeleton() {
  return (
    <div style={{ padding: 24, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'var(--color-surface-1)' }}>
      <SkeletonLine width="40%" />
      <div style={{ height: 32, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 4, marginBottom: 8, position: 'relative', overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
          initial={shimmer.initial}
          animate={shimmer.animate}
          transition={shimmer.transition}
        />
      </div>
      <SkeletonLine width="60%" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div style={{ padding: 24, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'var(--color-surface-1)' }}>
      <SkeletonLine width="70%" />
      <SkeletonLine width="100%" />
      <SkeletonLine width="85%" />
      <div style={{ height: 120, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, marginTop: 12, position: 'relative', overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
          initial={shimmer.initial}
          animate={shimmer.animate}
          transition={shimmer.transition}
        />
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div style={{ padding: 24, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'var(--color-surface-1)' }}>
      <SkeletonLine width="50%" />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 200, marginTop: 16 }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const heights = [60, 80, 45, 90, 70, 55, 85, 40, 75, 65, 50, 88];
          const h = heights[i];
          return (
            <div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '4px 4px 0 0', position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                initial={shimmer.initial}
                animate={shimmer.animate}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' as const, delay: i * 0.1 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TableSkeleton({ lines = 5 }: { lines: number }) {
  return (
    <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 16, padding: '12px 16px', backgroundColor: 'var(--color-surface-0)' }}>
        <SkeletonLine width="80%" />
        <SkeletonLine width="60%" />
        <SkeletonLine width="70%" />
        <SkeletonLine width="50%" />
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 16, padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
          <SkeletonLine width={`${70 + Math.random() * 20}%`} />
          <SkeletonLine width={`${50 + Math.random() * 30}%`} />
          <SkeletonLine width={`${40 + Math.random() * 40}%`} />
          <SkeletonLine width={`${45 + Math.random() * 35}%`} />
        </div>
      ))}
    </div>
  );
}

export default function LoadingSkeleton({ variant = 'text', lines = 3, className }: SkeletonProps) {
  return (
    <div className={className}>
      {variant === 'stat' && <StatSkeleton />}
      {variant === 'card' && <CardSkeleton />}
      {variant === 'chart' && <ChartSkeleton />}
      {variant === 'table' && <TableSkeleton lines={lines} />}
      {variant === 'text' && Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width={i === lines - 1 ? '60%' : '100%'} />
      ))}
    </div>
  );
}
