'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';

/**
 * LazySection — defers rendering of children until the section is near the viewport.
 * Uses IntersectionObserver with a generous rootMargin so content loads before the
 * user scrolls to it (no visible pop-in).
 *
 * Usage:
 *   <LazySection minHeight={400}>
 *     <HeavyComponent />
 *   </LazySection>
 */
export default function LazySection({
  children,
  minHeight = 200,
  rootMargin = '600px',
  className = '',
}: {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver not available, render immediately
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
