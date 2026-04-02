'use client';

/* EXTRACTED from MyCaseValue.tsx — Reveal component */

import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Extremely aggressive: show anything within 1000px of viewport instantly
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 1000) {
      const stagger = Math.min(delay, 80);
      if (stagger > 0) {
        const tid = setTimeout(() => setShow(true), stagger);
        return () => clearTimeout(tid);
      } else {
        setShow(true);
      }
      return;
    }

    // For elements well below the fold, trigger 800px before they enter viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 800px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
    }}>
      {children}
    </div>
  );
}

export default Reveal;
