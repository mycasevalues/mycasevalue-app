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

export default function FeatureCard({ title, description, icon, href, delay = 0, accentColor = '#8B5CF6' }: FeatureCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
        style={{
          padding: 28, borderRadius: 12, border: '1px solid #e5e7eb',
          backgroundColor: '#fff', cursor: 'pointer', height: '100%',
          transition: 'border-color 0.2s',
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 10,
          background: `${accentColor}12`, display: 'flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: 16,
          color: accentColor,
        }}>
          {icon}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0f0f0f', marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{description}</p>
      </motion.div>
    </Link>
  );
}
