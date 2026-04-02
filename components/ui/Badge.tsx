import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  icon,
  children,
  className = '',
}: BadgeProps) {
  return (
    <span className={`mcv-badge mcv-badge--${variant} mcv-badge--${size} ${className}`}>
      {dot && <span className="mcv-badge__dot" aria-hidden="true" />}
      {icon && <span className="mcv-badge__icon" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
