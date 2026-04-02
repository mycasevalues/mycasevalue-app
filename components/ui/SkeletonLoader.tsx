'use client';

import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'chart' | 'card';
  lines?: number;
}

function SkeletonPulse({ width = '100%', height = '16px', borderRadius = '8px', className = '' }: {
  width?: string; height?: string; borderRadius?: string; className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #E5E7EB 25%, #2D3A4F 50%, #E5E7EB 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.8s ease-in-out infinite',
      }}
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonPulse
          key={i}
          width={i === lines - 1 ? '60%' : '100%'}
          height="14px"
          borderRadius="6px"
        />
      ))}
    </div>
  );
}

export function SkeletonChart({ height = '200px', className = '' }: { height?: string; className?: string }) {
  return (
    <div className={className} style={{ height, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #E5E7EB 0%, #FFFFFF 100%)',
        borderRadius: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', padding: '20px', gap: '8px' }}>
          {[40, 65, 50, 80, 55, 70, 45, 75, 60, 85, 50, 65].map((h, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: '4px 4px 0 0',
              background: 'linear-gradient(90deg, #E5E7EB 25%, #2D3A4F 50%, #E5E7EB 75%)',
              backgroundSize: '200% 100%',
              animation: `skeleton-shimmer 1.8s ease-in-out ${i * 0.1}s infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={className} style={{
      padding: '24px',
      borderRadius: '16px',
      background: 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(255,255,255,0.9) 100%)',
      border: '1px solid rgba(51,65,85,0.4)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <SkeletonPulse width="40px" height="40px" borderRadius="10px" />
        <div style={{ flex: 1 }}>
          <SkeletonPulse width="60%" height="16px" borderRadius="6px" />
          <div style={{ height: '8px' }} />
          <SkeletonPulse width="40%" height="12px" borderRadius="6px" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonStatRow({ count = 4, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={className} style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(count, 4)}, 1fr)`, gap: '16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          padding: '16px',
          borderRadius: '12px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          textAlign: 'center',
        }}>
          <SkeletonPulse width="50%" height="28px" borderRadius="8px" className="mx-auto" />
          <div style={{ height: '8px' }} />
          <SkeletonPulse width="70%" height="12px" borderRadius="6px" className="mx-auto" />
        </div>
      ))}
    </div>
  );
}

export default function SkeletonLoader({ variant = 'text', lines, width, height, borderRadius, className }: SkeletonProps) {
  switch (variant) {
    case 'chart':
      return <SkeletonChart height={height} className={className} />;
    case 'card':
      return <SkeletonCard className={className} />;
    case 'circular':
      return <SkeletonPulse width={width || '48px'} height={height || '48px'} borderRadius="50%" className={className} />;
    case 'rectangular':
      return <SkeletonPulse width={width} height={height || '120px'} borderRadius={borderRadius || '12px'} className={className} />;
    case 'text':
    default:
      return <SkeletonText lines={lines} className={className} />;
  }
}
