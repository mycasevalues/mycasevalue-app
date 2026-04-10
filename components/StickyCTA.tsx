'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Sticky CTA bar that appears after the user scrolls past the hero section.
 * Hides again when the page's in-flow CTA / footer enters the viewport so
 * it never collides with the blue bottom CTA or footer copy.
 * Desktop: centered pill. Mobile: full-width.
 */
export default function StickyCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [footerOrCtaVisible, setFooterOrCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Watch any elements tagged as "hide the sticky CTA when I'm visible"
    // (the in-flow bottom CTA section + the footer).
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-hide-sticky-cta], footer')
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If any tracked element is intersecting the viewport, hide the pill.
        const anyVisible = entries.some((e) => e.isIntersecting);
        setFooterOrCtaVisible((prev) => {
          // Merge with existing state — if another observer entry says
          // something is still visible, keep it hidden.
          if (anyVisible) return true;
          // Re-check all targets to see if any are still intersecting.
          const stillVisible = targets.some((el) => {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
          });
          return stillVisible;
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !footerOrCtaVisible;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: visible ? '24px' : '-80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 45,
        transition: 'bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '9999px',
        padding: '8px 8px 8px 24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        maxWidth: 'calc(100vw - 32px)',
        whiteSpace: 'nowrap',
      }}
      aria-hidden={!visible}
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 500,
        color: '#374151',
      }}>
        Research your case value
      </span>

      <Link
        href="/cases"
        style={{
          background: '#0966C3',
          color: '#FAFBFC',
          padding: '10px 20px',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '0.02em',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        Start searching free &rarr;
      </Link>

      <Link
        href="/pricing"
        style={{
          color: '#4B5563',
          padding: '10px 16px',
          textDecoration: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: '13px',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        View pricing
      </Link>
    </div>
  );
}
