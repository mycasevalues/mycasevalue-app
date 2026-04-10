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
  { value: 95, suffix: '', label: 'Federal Districts', sublabel: 'All US courts', icon: '', color: '#F0F2F5' },
  { value: 84, suffix: '', label: 'Case Categories', sublabel: 'Tracked', icon: '', color: '#004182' },
  { value: 55, suffix: '+', label: 'Years of Data', sublabel: '1970–2025', icon: '', color: '#F0F2F5' },
];

const STATS_ES: StatItem[] = [
  { value: 5.1, suffix: 'M+', label: 'Casos Federales', sublabel: 'Analizados', icon: '', color: '#F0F2F5' },
  { value: 95, suffix: '', label: 'Distritos Federales', sublabel: 'Todos los tribunales', icon: '', color: '#F0F2F5' },
  { value: 84, suffix: '', label: 'Categorías', sublabel: 'Rastreadas', icon: '', color: '#004182' },
  { value: 55, suffix: '+', label: 'Años de Datos', sublabel: '1970–2025', icon: '', color: '#F0F2F5' },
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
        borderRadius: '12px',
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
        <div className="stat-glow font-mono" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 600,
          color: stat.color,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
        }}>
          {stat.prefix}{isVisible ? (stat.value % 1 !== 0 ? count.toFixed(1) : count) : (stat.value % 1 !== 0 ? stat.value.toFixed(1) : stat.value)}{stat.suffix}
        </div>
        <div style={{
          fontSize: 'clamp(12px, 1.5vw, 14px)',
          fontWeight: 600,
          color: '#0f0f0f',
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
    <>
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

      {/* Noscript fallback showing final counter values */}
      <noscript>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(12px, 2vw, 16px)',
          marginTop: 'clamp(20px, 3vw, 32px)',
        }}>
          <div style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '2px solid rgba(240, 242, 245, 0.09)', borderRadius: '12px' }}>
            <div style={{ fontSize: '36px', fontWeight: 600, color: '#F0F2F5', fontFamily: 'var(--font-mono)' }}>5.1M+</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Federal Cases</div>
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>Analyzed</div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '2px solid rgba(240, 242, 245, 0.09)', borderRadius: '12px' }}>
            <div style={{ fontSize: '36px', fontWeight: 600, color: '#F0F2F5', fontFamily: 'var(--font-mono)' }}>94</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Federal Districts</div>
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>All US courts</div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '2px solid rgba(109, 40, 217, 0.09)', borderRadius: '12px' }}>
            <div style={{ fontSize: '36px', fontWeight: 600, color: '#004182', fontFamily: 'var(--font-mono)' }}>84</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Case Categories</div>
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>Tracked</div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', background: '#FFFFFF', border: '2px solid rgba(240, 242, 245, 0.09)', borderRadius: '12px' }}>
            <div style={{ fontSize: '36px', fontWeight: 600, color: '#F0F2F5', fontFamily: 'var(--font-mono)' }}>55+</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Years of Data</div>
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>1970–2025</div>
          </div>
        </div>
      </noscript>
    </>
  );
}
