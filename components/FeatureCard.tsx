'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  delay?: number;
  accentColor?: string;
}

export default function FeatureCard({ title, description, icon, href, delay = 0, accentColor = 'var(--link)' }: FeatureCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
        style={{
          padding: 24, borderRadius: '4px', border: '1px solid var(--bdr, #E2DFD8)',
          backgroundColor: 'var(--card, #FFFFFF)', cursor: 'pointer', height: '100%',
          transition: 'border-color 200ms',
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: '4px',
          background: `${accentColor}12`, display: 'flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: 16,
          color: accentColor,
        }}>
          {icon}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text1)', marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{description}</p>
      </motion.div>
    </Link>
  );
}
