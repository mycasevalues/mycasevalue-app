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
  { value: 84, suffix: '', label: 'Case Categories', sublabel: 'Tracked', icon: '', color: '#006997' },
  { value: 50, suffix: '+', label: 'Years of Data', sublabel: '1970–2026', icon: '', color: '#F0F2F5' },
];

const STATS_ES: StatItem[] = [
  { value: 5.1, suffix: 'M+', label: 'Casos Federales', sublabel: 'Analizados', icon: '', color: '#F0F2F5' },
  { value: 94, suffix: '', label: 'Distritos Federales', sublabel: 'Todos los tribunales', icon: '', color: '#F0F2F5' },
  { value: 84, suffix: '', label: 'Categorías', sublabel: 'Rastreadas', icon: '', color: '#006997' },
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
        padding: '20px 16px',
        borderRadius: '4px',
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
          fontFamily: "'PT Mono', monospace",
          fontSize: '28px', fontWeight: 700, color: stat.color,
          lineHeight: 1.1,
        }}>
          {stat.prefix}{isVisible ? (stat.value % 1 !== 0 ? count.toFixed(1) : count) : 0}{stat.suffix}
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginTop: '6px' }}>
          {stat.label}
        </div>
        {stat.sublabel && (
          <div style={{ fontSize: '11px', color: '#999999', marginTop: '2px' }}>
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
      gap: '12px',
      marginTop: '24px',
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
          bottom: '-24px',
          right: 0,
          fontSize: '11px',
          color: 'rgba(156, 163, 175, 0.8)',
          fontStyle: 'italic',
        }}>
          {updatedDateText}
        </div>
      )}

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
