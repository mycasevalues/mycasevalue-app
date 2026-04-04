'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: string; // e.g., "5.1M+", "94", "94%", "50+"
  duration?: number;
}

function parseNumber(s: string): { num: number; prefix: string; suffix: string } {
  const match = s.match(/^([^0-9]*)([0-9]*\.?[0-9]+)(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: s };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
}

export default function AnimatedCounter({ end, duration = 2000 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, started]);

  useEffect(() => {
    if (!started) return;

    const { num, prefix, suffix } = parseNumber(end);
    const startTime = performance.now();
    const hasDecimal = end.includes('.');

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;

      if (hasDecimal) {
        setDisplay(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.floor(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(end);
      }
    };

    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return <span ref={ref}>{display}</span>;
}
