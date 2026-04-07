'use client';

import { useMotionValue, animate } from 'framer-motion';
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

function formatValue(val: number, decimals: number, prefix: string, suffix: string): string {
  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();
  return `${prefix}${formatted}${suffix}`;
}

export default function AnimatedCounter({ value, end, duration = 1.2, prefix = '', suffix = '', decimals = 0, style }: AnimatedCounterProps) {
  const targetValue = value ?? end ?? 0;
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(targetValue * 0.9);

  // Initial HTML shows the final value so it's correct without JS
  const initialDisplay = formatValue(targetValue, decimals, prefix, suffix);

  useEffect(() => {
    const startFrom = targetValue * 0.9;
    motionValue.set(startFrom);

    const controls = animate(motionValue, targetValue, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = formatValue(latest, decimals, prefix, suffix);
        }
      },
    });
    return () => controls.stop();
  }, [targetValue, duration, prefix, suffix, decimals, motionValue]);

  return <span ref={nodeRef} style={style}>{initialDisplay}</span>;
}
