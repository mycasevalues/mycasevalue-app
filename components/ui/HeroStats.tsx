'use client';

import React, { useRef, useEffect, useState } from 'react';

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  icon: string;
  color: string;
}

interface HeroStatsProps {
  lang?: 'en' | 'es';
}

const STATS_EN: StatItem[] = [
  { value: 5.1, suffix: 'M+', label: 'Federal Cases', sublabel: 'Analyzed', icon: '⚖️', color: '#111111' },
  { value: 94, suffix: '', label: 'Federal Districts', sublabel: 'All US courts', icon: '🏛️', color: '#111111' },
  { value: 84, suffix: '', label: 'Case Categories', sublabel: 'Tracked', icon: '📁', color: '#8B5CF6' },
  { value: 50, suffix: '+', label: 'Years of Data', sublabel: '1970–2026', icon: '📅', color: '#111111' },
];

const STATS_ES: StatItem[] = [
  { value: 5.1, suffix: 'M+', label: 'Casos Federales', sublabel: 'Analizados', icon: '⚖️', color: '#111111' },
  { value: 94, suffix: '', label: 'Distritos Federales', sublabel: 'Todos los tribunales', icon: '🏛️', color: '#111111' },
  { value: 84, suffix: '', label: 'Categorías', sublabel: 'Rastreadas', icon: '📁', color: '#8B5CF6' },
  { value: 50, suffix: '+', label: 'Años de Datos', sublabel: '1970–2026', icon: '📅', color: '#111111' },
];

function useCountUp(target: number, duration: number = 2000, shouldStart: boolean = false): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!shouldStart) return;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, shouldStart]);

  return count;
}

function StatCard({ stat, index, isVisible }: { stat: StatItem; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2200 + index * 200, isVisible);

  return (
    <div
      style={{
        padding: '20px 16px',
        borderRadius: '16px',
        background: '#FFFFFF',
        border: `1px solid ${stat.color}20`,
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
      }}
    >
      {/* Subtle glow behind */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '80px', height: '80px', borderRadius: '50%',
        background: `${stat.color}12`, filter: 'blur(25px)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '20px', marginBottom: '8px' }}>{stat.icon}</div>
        <div className="stat-glow" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '28px', fontWeight: 700, color: stat.color,
          lineHeight: 1.1,
        }}>
          {stat.prefix}{stat.value % 1 !== 0 ? count.toFixed(1) : count}{stat.suffix}
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginTop: '6px' }}>
          {stat.label}
        </div>
        {stat.sublabel && (
          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
            {stat.sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroStats({ lang = 'en' }: HeroStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const stats = lang === 'es' ? STATS_ES : STATS_EN;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginTop: '24px',
    }}
      className="hero-stats-grid"
    >
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} isVisible={isVisible} />
      ))}

      <style>{`
        @media (max-width: 768px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 420px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
        }
      `}</style>
    </div>
  );
}
