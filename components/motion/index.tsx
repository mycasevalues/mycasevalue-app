'use client';

/**
 * Reusable Framer Motion animation wrappers.
 * All respect prefers-reduced-motion via the useReducedMotion hook.
 */

import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRef, type ReactNode, type CSSProperties } from 'react';

/* ─── Fade-up on scroll ─── */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  y = 16,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? undefined : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : reduced ? undefined : { opacity: 0, y }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger children on scroll ─── */
export function StaggerGrid({
  children,
  staggerDelay = 0.06,
  className,
  style,
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  style?: CSSProperties;
}) {
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
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated width bar (settlement range) ─── */
export function AnimatedBar({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, overflow: 'hidden' }}
      initial={reduced ? undefined : { scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : reduced ? undefined : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero staggered entrance ─── */
export function HeroEntrance({
  children,
  delay = 0,
  y = 12,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Page transition wrapper ─── */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence };
