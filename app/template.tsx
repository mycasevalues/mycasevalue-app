'use client';

/**
 * Route transition wrapper — fades page content in on navigation.
 * Uses Framer Motion with prefers-reduced-motion support.
 * Next.js re-mounts template.tsx on every route change.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
