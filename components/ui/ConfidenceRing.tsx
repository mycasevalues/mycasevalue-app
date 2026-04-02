'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ConfidenceRingProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  lang?: 'en' | 'es';
  animated?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 70) return '#0D9488';
  if (score >= 50) return '#333333';
  if (score >= 30) return '#F59E0B';
  return '#EF4444';
}

function getScoreLabel(score: number, lang: string): string {
  if (lang === 'es') {
    if (score >= 70) return 'Alta confianza';
    if (score >= 50) return 'Confianza moderada';
    if (score >= 30) return 'Confianza baja';
    return 'Datos limitados';
  }
  if (score >= 70) return 'High Confidence';
  if (score >= 50) return 'Moderate Confidence';
  if (score >= 30) return 'Low Confidence';
  return 'Limited Data';
}

export default function ConfidenceRing({
  score,
  size: propSize = 160,
  strokeWidth: propStrokeWidth = 10,
  label,
  sublabel,
  lang = 'en',
  animated = true,
}: ConfidenceRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animatedScore, setAnimatedScore] = useState(animated ? 0 : score);
  const [isVisible, setIsVisible] = useState(!animated);
  const [responsiveSize, setResponsiveSize] = useState(propSize);

  // Responsive size based on container
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateSize = () => {
      const containerWidth = el.parentElement?.clientWidth || 300;
      // On very small screens, cap the ring at 75% of container width
      const maxSize = Math.min(propSize, containerWidth * 0.75);
      setResponsiveSize(Math.max(100, maxSize)); // minimum 100px
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [propSize]);

  useEffect(() => {
    if (!animated) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!isVisible || !animated) return;
    const start = performance.now();
    const duration = 1500;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, score, animated]);

  const size = responsiveSize;
  const strokeWidth = propStrokeWidth * (size / propSize); // scale stroke proportionally
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreColor(score);
  const scoreLabel = label || getScoreLabel(score, lang);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="#E5E0D8" strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: animated ? 'none' : 'stroke-dashoffset 1s ease-out' }}
          />
          {/* Glow effect */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            opacity="0.15"
            style={{ filter: 'blur(6px)', transition: animated ? 'none' : 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>

        {/* Center content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: "'PT Mono', monospace",
            fontSize: size * 0.22, fontWeight: 800,
            color: color, lineHeight: 1,
            textShadow: `0 0 20px ${color}40`,
            opacity: (!animated || isVisible) ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}>
            {animated && !isVisible ? '' : animatedScore}
          </div>
          <div style={{
            fontSize: Math.max(size * 0.065, 8),
            fontWeight: 600, color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginTop: '4px',
          }}>
            {lang === 'es' ? 'puntuación' : 'score'}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '13px', fontWeight: 700, color: color,
          display: 'flex', alignItems: 'center', gap: '6px',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}60`,
          }} />
          {scoreLabel}
        </div>
        {sublabel && (
          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}
