/**
 * Alert.tsx — Paper Design System alert/callout component.
 * Variants: info | success | warning | danger
 * Left-border accent style with icon, title, and body content.
 */

import React from 'react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  info: {
    borderColor: 'var(--accent-primary-hover)',
    background: 'rgba(0,105,151,0.05)',
    iconColor: 'var(--accent-primary-hover)',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  },
  success: {
    borderColor: '#059669',
    background: 'rgba(7,135,74,0.05)',
    iconColor: '#059669',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    borderColor: 'rgba(234,179,8,0.3)',
    background: 'rgba(232,170,11,0.05)',
    iconColor: '#E8AA0B',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  danger: {
    borderColor: 'var(--accent-primary)',
    background: 'rgba(232,23,31,0.05)',
    iconColor: 'var(--accent-primary)',
    iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
};

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role="alert"
      className={className}
      style={{
        borderLeft: `4px solid ${styles.borderColor}`,
        background: styles.background,
        padding: '16px 20px',
        borderRadius: '6px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={styles.iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0, marginTop: '2px' }}
        aria-hidden="true"
      >
        <path d={styles.iconPath} />
      </svg>
      <div>
        {title && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 4px 0',
            }}
          >
            {title}
          </p>
        )}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Alert;
