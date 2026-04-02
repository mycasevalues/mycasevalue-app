'use client';

import React from 'react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
  onClick?: () => void;
}

const paddingMap: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  as: Component = 'div',
  onClick,
}: CardProps) {
  return (
    <Component
      className={`mcv-card mcv-card--${variant} ${paddingMap[padding]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      } : undefined}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mcv-card__header ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mcv-card__body ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mcv-card__footer ${className}`}>{children}</div>;
}

export default Card;
