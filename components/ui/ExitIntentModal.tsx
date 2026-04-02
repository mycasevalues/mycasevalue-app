'use client'
import React, { useState, useRef, useEffect } from 'react'

interface ExitIntentModalProps {
  lang?: string
  onCapture: (email: string) => void
  caseType?: string
}

const translations = {
  en: {
    headline: 'Before you go...',
    subheadline: 'Get your case data report — free',
    subheadlineWithType: 'Get your {caseType} case data report — free',
    inputLabel: 'Email address',
    inputPlaceholder: 'you@example.com',
    submitButton: 'Get Report',
    closeAriaLabel: 'Close modal',
  },
  es: {
    headline: 'Antes de irte...',
    subheadline: 'Obtén tu informe de datos de caso gratis',
    subheadlineWithType: 'Obtén tu informe de datos de caso {caseType} gratis',
    inputLabel: 'Dirección de correo',
    inputPlaceholder: 'tu@ejemplo.com',
    submitButton: 'Obtener Informe',
    closeAriaLabel: 'Cerrar modal',
  },
}

export function ExitIntentModal({
  lang = 'en',
  onCapture,
  caseType,
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = translations[lang as keyof typeof translations] || translations.en
  const subheadline = caseType
    ? t.subheadlineWithType.replace('{caseType}', caseType)
    : t.subheadline

  // Setup exit-intent listener (desktop only)
  useEffect(() => {
    // Only attach on desktop (width > 768px)
    if (typeof window === 'undefined' || window.innerWidth <= 768) {
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if user is exiting from top of viewport
      if (e.clientY < 10 && !hasShown && !isVisible) {
        setIsVisible(true)
        setHasShown(true)
        inputRef.current?.focus()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown, isVisible])

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Validate email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !isValidEmail(email)) {
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onCapture(email)
    setIsLoading(false)
    setIsVisible(false)
  }

  // Don't render on server or mobile
  if (typeof window === 'undefined' || window.innerWidth <= 768 || !isVisible) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(8px)',
      }}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsVisible(false)
        }
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md animate-slide-up rounded-2xl p-8 shadow-lg"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-headline"
      >
        {/* Close Button */}
        <button type="button"
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[#E5E0D8] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
          }}
          aria-label={t.closeAriaLabel}
        >
          <svg
            className="w-5 h-5"
            style={{ color: 'var(--fg-secondary)' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Headline */}
        <h2
          id="exit-intent-headline"
          className="text-xl font-bold font-['Roboto'] mb-2"
          style={{ color: 'var(--fg-primary)' }}
        >
          {t.headline}
        </h2>

        {/* Subheadline */}
        <p
          className="text-sm mb-6"
          style={{ color: 'var(--fg-secondary)' }}
        >
          {subheadline}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="exit-intent-email"
              className="block text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: 'var(--fg-muted)' }}
            >
              {t.inputLabel}
            </label>
            <input
              ref={inputRef}
              id="exit-intent-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder={t.inputPlaceholder}
              autoComplete="email"
              required
              className="w-full h-11 px-4 rounded-lg text-base font-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              style={{
                backgroundColor: 'var(--bg-base)',
                color: 'var(--fg-primary)',
                borderColor: 'var(--border-default)',
                border: '1px solid var(--border-default)',
              }}
            />
          </div>

          {/* Submit Button */}
          <button type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full h-11 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none active:scale-[0.98] hover:-translate-y-0.5"
            style={{
              background: isLoading
                ? 'var(--accent-primary-hover)'
                : 'linear-gradient(135deg, var(--accent-primary), #333333)',
            }}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            ) : (
              t.submitButton
            )}
          </button>
        </form>
      </div>

      {/* CSS for animations and reduced motion */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 300ms var(--ease-out) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-slide-up {
            animation: none;
            opacity: 1;
            transform: translateY(0);
          }
          .animate-spin {
            animation: none;
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}

export default ExitIntentModal
