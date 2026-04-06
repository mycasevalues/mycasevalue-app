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

interface ApiStatsResponse {
  source: 'live' | 'static';
  cached: boolean;
  computed_at: string;
  data: {
    total_cases: number;
    case_types: number;
    avg_win_rate: number;
    [key: string]: any;
  };
}

const STATS_EN: StatItem[] = [
  { value: 5.1, suffix: 'M+', label: 'Federal Cases', sublabel: 'Analyzed', icon: '', color: '#F0F2F5' },
  { value: 94, suffix: '', label: 'Federal Districts', sublabel: 'All US courts', icon: '', color: '#F0F2F5' },
  { value: 84, suffix: '', label: 'Case Categories', sublabel: 'Tracked', icon: '', color: '#6D28D9' },
  { value: 50, suffix: '+', label: 'Years of Data', sublabel: '1970–2026', icon: '', color: '#F0F2F5' },
];

const STATS_ES: StatItem[] = [
  { value: 5.1, suffix: 'M+', label: 'Casos Federales', sublabel: 'Analizados', icon: '', color: '#F0F2F5' },
  { value: 94, suffix: '', label: 'Distritos Federales', sublabel: 'Todos los tribunales', icon: '', color: '#F0F2F5' },
  { value: 84, suffix: '', label: 'Categorías', sublabel: 'Rastreadas', icon: '', color: '#6D28D9' },
  { value: 50, suffix: '+', label: 'Años de Datos', sublabel: '1970–2026', icon: '', color: '#F0F2F5' },
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
        padding: 'clamp(20px, 3vw, 28px) clamp(16px, 2.5vw, 24px)',
        borderRadius: '6px',
        background: '#FFFFFF',
        border: `2px solid ${stat.color}18`,
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Subtle color accent */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px',
        width: '100px', height: '100px', borderRadius: '50%',
        background: `${stat.color}12`,
        filter: 'blur(30px)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', marginBottom: 'clamp(6px, 1vw, 12px)' }}>{stat.icon}</div>
        <div className="stat-glow" style={{
          fontFamily: "'PT Mono', 'Courier New', monospace",
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          color: stat.color,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
        }}>
          {stat.prefix}{isVisible ? (stat.value % 1 !== 0 ? count.toFixed(1) : count) : 0}{stat.suffix}
        </div>
        <div style={{
          fontSize: 'clamp(12px, 1.5vw, 14px)',
          fontWeight: 700,
          color: '#212529',
          marginTop: 'clamp(6px, 1vw, 10px)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
        }}>
          {stat.label}
        </div>
        {stat.sublabel && (
          <div style={{
            fontSize: 'clamp(10px, 1.2vw, 12px)',
            color: '#4B5563',
            marginTop: '4px',
            fontWeight: 500,
          }}>
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
  const [stats, setStats] = useState(lang === 'es' ? STATS_ES : STATS_EN);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Fetch stats from API on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/data?type=stats');
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data: ApiStatsResponse = await response.json();

        if (data.data) {
          // Map API response to stat values
          const baseStats = lang === 'es' ? STATS_ES : STATS_EN;
          const updatedStats = baseStats.map((stat, index) => {
            let apiValue = stat.value; // fallback to original

            if (index === 0 && data.data.total_cases) {
              // Convert to millions for display (5100000 -> 5.1)
              apiValue = parseFloat((data.data.total_cases / 1000000).toFixed(1));
            } else if (index === 2 && data.data.case_types) {
              apiValue = data.data.case_types;
            }

            return { ...stat, value: apiValue };
          });

          setStats(updatedStats);
          setLastUpdated(data.computed_at);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Gracefully fall back to hardcoded values (already set in initial state)
      }
    };

    fetchStats();
  }, [lang]);

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

  // Format the lastUpdated timestamp for display
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return `Updated today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else if (date.toDateString() === yesterday.toDateString()) {
        return `Updated yesterday`;
      } else {
        return `Updated ${date.toLocaleDateString()}`;
      }
    } catch {
      return null;
    }
  };

  const updatedDateText = lastUpdated ? formatDate(lastUpdated) : null;

  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'clamp(12px, 2vw, 16px)',
      marginTop: 'clamp(20px, 3vw, 32px)',
      position: 'relative',
    }}
      className="hero-stats-grid"
    >
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} isVisible={isVisible} />
      ))}

      {updatedDateText && (
        <div style={{
          position: 'absolute',
          bottom: 'clamp(-32px, -4vw, -24px)',
          right: 0,
          fontSize: 'clamp(10px, 1vw, 12px)',
          color: 'rgba(107, 114, 128, 0.7)',
          fontStyle: 'italic',
          fontFamily: 'var(--font-body)',
        }}>
          {updatedDateText}
        </div>
      )}

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @media (max-width: 1024px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 640px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: clamp(8px, 1.5vw, 12px) !important; }
        }

        @media (max-width: 420px) {
          .hero-stats-grid { grid-template-columns: 1fr !important; gap: clamp(8px, 1.5vw, 12px) !important; }
        }
      `}</style>
    </div>
  );
}
