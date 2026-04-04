'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string; // e.g., "+" or "K+"
  prefix?: string; // e.g., "$"
  duration?: number; // animation duration in ms, default 2000
  className?: string;
  style?: React.CSSProperties;
}

// Easing function: easeOutQuart
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
  style = {},
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is set
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    // Create IntersectionObserver to detect when element scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startAnimation();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    const startAnimation = () => {
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (startTime === null) {
          startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentCount = Math.floor(end * easedProgress);

        setCount(currentCount);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    return () => {
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration]);

  return (
    <div ref={elementRef} className={className} style={style}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}
