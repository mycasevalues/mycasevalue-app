'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip-up' | 'blur-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  stagger?: number; // ms between children animations
  as?: keyof React.JSX.IntrinsicElements;
}

const ANIMATIONS: Record<AnimationType, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  'fade-up': {
    hidden: { opacity: 0, transform: 'translateY(30px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-down': {
    hidden: { opacity: 0, transform: 'translateY(-30px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-left': {
    hidden: { opacity: 0, transform: 'translateX(-30px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'fade-right': {
    hidden: { opacity: 0, transform: 'translateX(30px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  'zoom-in': {
    hidden: { opacity: 0, transform: 'scale(0.85)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  'zoom-out': {
    hidden: { opacity: 0, transform: 'scale(1.15)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  'flip-up': {
    hidden: { opacity: 0, transform: 'perspective(600px) rotateX(15deg) translateY(20px)' },
    visible: { opacity: 1, transform: 'perspective(600px) rotateX(0) translateY(0)' },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(8px)', transform: 'translateY(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
  },
};

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const anim = ANIMATIONS[animation];
  const style: React.CSSProperties = {
    ...(isVisible ? anim.visible : anim.hidden),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform, filter',
  };

  return React.createElement(
    Tag,
    { ref, className, style },
    children
  );
}

/** Stagger children — wraps each child in a ScrollReveal with increasing delay */
export function ScrollRevealGroup({
  children,
  animation = 'fade-up',
  stagger = 80,
  baseDelay = 0,
  threshold = 0.1,
  className = '',
}: {
  children: React.ReactNode;
  animation?: AnimationType;
  stagger?: number;
  baseDelay?: number;
  threshold?: number;
  className?: string;
}) {
  const childArray = React.Children.toArray(children);
  return (
    <div className={className}>
      {childArray.map((child, i) => (
        <ScrollReveal key={i} animation={animation} delay={baseDelay + i * stagger} threshold={threshold}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
