'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // delay in ms, default 0
  direction?: 'up' | 'down' | 'left' | 'right'; // slide direction, default 'up'
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  style = {},
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Get initial transform value based on direction
    const getInitialTransform = () => {
      switch (direction) {
        case 'up':
          return 'translateY(20px)';
        case 'down':
          return 'translateY(-20px)';
        case 'left':
          return 'translateX(20px)';
        case 'right':
          return 'translateX(-20px)';
        default:
          return 'translateY(20px)';
      }
    };

    // Set initial state (before intersection)
    element.style.opacity = '0';
    element.style.transform = getInitialTransform();
    element.style.transition = 'none';

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Force a reflow to ensure initial state is applied
            void element.offsetHeight;

            // Apply animation
            if (prefersReducedMotion) {
              // Skip animation if user prefers reduced motion
              element.style.opacity = '1';
              element.style.transform = 'translate(0, 0)';
              element.style.transition = 'none';
            } else {
              element.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
              element.style.opacity = '1';
              element.style.transform = 'translate(0, 0)';
            }

            // Unobserve after animation completes
            const transitionDuration = prefersReducedMotion ? 0 : 600 + delay;
            setTimeout(() => {
              observer.unobserve(element);
            }, transitionDuration);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
