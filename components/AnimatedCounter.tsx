'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value?: number;
  end?: number;  // alias for value (backwards compat)
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}

export default function AnimatedCounter({ value, end, duration = 1.5, prefix = '', suffix = '', decimals = 0, style }: AnimatedCounterProps) {
  const targetValue = value ?? end ?? 0;
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, targetValue, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => {
        if (nodeRef.current) {
          const formatted = decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toLocaleString();
          nodeRef.current.textContent = `${prefix}${formatted}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [targetValue, duration, prefix, suffix, decimals, motionValue]);

  return <span ref={nodeRef} style={style}>{prefix}0{suffix}</span>;
}
