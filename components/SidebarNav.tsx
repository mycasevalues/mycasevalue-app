'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SidebarNav() {
  const pathname = usePathname();
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
    { label: 'Search cases', href: '/cases', icon: '⌕' },
    { label: 'Saved reports', href: '/reports', icon: '⊡' },
    { label: 'Attorney tools', href: '/attorney', icon: '⚖' },
    { label: 'Account', href: '/account', icon: '⚙' },
    { label: 'Billing', href: '/billing', icon: '◇' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#8B5CF6' : '#374151',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              marginBottom: '4px',
              transition: 'all 0.15s ease',
              background: isActive ? '#F3E8FF' : hoveredIndex === idx ? '#F3F4F6' : 'transparent',
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
