'use client'
import React, { useRef, useEffect, useState } from 'react'

interface CollapsedPaywallProps {
  lang?: string
  onUnlock: () => void
  previewRows?: number
  tier?: 'single' | 'unlimited'
  children: React.ReactNode
}

const translations = {
  en: {
    unlockTitle: 'Unlock full data',
    featureBullet1: 'Recovery ranges',
    featureBullet2: 'Attorney impact',
    featureBullet3: 'Timeline',
    featureBullet4: 'Judge analytics',
    priceSingle: '$5.99',
    priceUnlimited: '$29.99/mo',
    ctaButton: 'Unlock Now',
    trustBadge: '30-day money-back guarantee',
  },
  es: {
    unlockTitle: 'Desbloquear datos completos',
    featureBullet1: 'Rangos de recuperación',
    featureBullet2: 'Impacto del abogado',
    featureBullet3: 'Cronograma',
    featureBullet4: 'Análisis de jueces',
    priceSingle: '$5.99',
    priceUnlimited: '$29.99/mo',
    ctaButton: 'Desbloquear ahora',
    trustBadge: 'Garantía de devolución de 30 días',
  },
}

export function CollapsedPaywall({
  lang = 'en',
  onUnlock,
  previewRows = 2,
  tier = 'single',
  children,
}: CollapsedPaywallProps) {
  const [contentHeight, setContentHeight] = useState<number>(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const t = translations[lang as keyof typeof translations] || translations.en
  const price = tier === 'unlimited' ? t.priceUnlimited : t.priceSingle

  // Measure initial content height and calculate preview height
  useEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight
      setContentHeight(fullHeight)
    }
  }, [children])

  // Calculate preview height based on previewRows
  // Rough estimate: each row is ~50px (adjust based on actual content)
  const previewHeight = previewRows * 50

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Clipped Content Area */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300"
        style={{
          maxHeight: `${previewHeight}px`,
        }}
      >
        {children}
      </div>

      {/* Gradient Fade Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '100px',
          background: `linear-gradient(to bottom, transparent 0%, var(--bg-surface) 100%)`,
        }}
      />

      {/* CTA Card */}
      <div
        className="relative px-6 py-8 border-t"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        {/* Title */}
        <h3
          className="text-center text-lg font-bold font-['Outfit'] mb-4"
          style={{ color: 'var(--fg-primary)' }}
        >
          {t.unlockTitle}
        </h3>

        {/* Feature Bullets */}
        <ul className="space-y-2 mb-6 text-sm">
          {[
            t.featureBullet1,
            t.featureBullet2,
            t.featureBullet3,
            t.featureBullet4,
          ].map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2"
              style={{ color: 'var(--fg-secondary)' }}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                style={{ color: 'var(--accent-primary)' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price Badge */}
        <div className="text-center mb-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-bold"
            style={{
              backgroundColor: 'var(--accent-primary-subtle)',
              color: 'var(--accent-primary)',
            }}
          >
            {price}
          </span>
        </div>

        {/* Unlock Button */}
        <button
          onClick={onUnlock}
          className="w-full h-11 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary), #6366F1)',
          }}
          aria-label={t.ctaButton}
        >
          {t.ctaButton}
        </button>

        {/* Trust Badge */}
        <p
          className="mt-4 text-center text-xs font-medium"
          style={{ color: 'var(--fg-muted)' }}
        >
           {t.trustBadge}
        </p>
      </div>

      {/* CSS for reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-\\[max-height\\] {
            transition: none !important;
          }
          button {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default CollapsedPaywall
