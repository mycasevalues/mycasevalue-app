'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export default function AnimatedCard({ children, delay = 0, className, hover = true, style }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' } : undefined}
      style={{
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: '#fff',
        padding: 24,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
