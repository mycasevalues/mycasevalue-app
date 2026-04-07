'use client';

/**
 * Client-side animation wrappers for NOS report pages (Server Components).
 * These wrap server-rendered content to add entrance animations.
 */

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode, type CSSProperties } from 'react';

/** Stagger the 4 metric cards left to right with 80ms delay */
export function MetricsStagger({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MetricsStaggerItem({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Animate the settlement range bar width from 0 to full */
export function AnimatedRangeBar({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, transformOrigin: 'left center' }}
      initial={reduced ? undefined : { scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : reduced ? undefined : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
