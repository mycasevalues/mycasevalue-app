'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedNumber({ value, suffix = '', decimals = 0, duration = 1200 }) {
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(value) || 0;
    let start = null;

    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      const current = eased * target;

      if (ref.current) {
        ref.current.textContent = decimals > 0
          ? current.toFixed(decimals) + suffix
          : Math.round(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      }
    }

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [value, suffix, decimals, duration]);

  return <span ref={ref}>{'0' + suffix}</span>;
}
