'use client';

import { Suspense, ReactNode } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallbackVariant?: 'text' | 'card' | 'chart' | 'table' | 'stat';
  lines?: number;
  className?: string;
}

export default function SuspenseWrapper({ children, fallbackVariant = 'card', lines, className }: SuspenseWrapperProps) {
  return (
    <Suspense fallback={<LoadingSkeleton variant={fallbackVariant} lines={lines} className={className} />}>
      {children}
    </Suspense>
  );
}

export function SuspenseGrid({ children, columns = 3, fallbackVariant = 'card' }: { children: ReactNode; columns?: number; fallbackVariant?: 'text' | 'card' | 'chart' | 'table' | 'stat' }) {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 16 }}>
          {Array.from({ length: columns }).map((_, i) => (
            <LoadingSkeleton key={i} variant={fallbackVariant} />
          ))}
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
