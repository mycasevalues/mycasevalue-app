'use client'
import React, { useState, useRef, useEffect } from 'react'

interface EmailCaptureGateProps {
  lang?: string
  onSubmit: (email: string) => void
  onSkip?: () => void
  caseType?: string
}

const translations = {
  en: {
    headline: 'Get Your Free Report',
    subheading: 'See win rates, timelines, and outcome data for',
    caseTypeDefault: 'your',
    inputLabel: 'Email address',
    inputPlaceholder: 'you@example.com',
    submitButton: 'Get My Report',
    skipLink: 'Skip for now',
    privacyNotice: "We never share your email. Unsubscribe anytime.",
  },
  es: {
    headline: 'Obtén tu Informe Gratis',
    subheading: 'Ve tasas de victoria, plazos y datos de resultados para',
    caseTypeDefault: 'tus',
    inputLabel: 'Dirección de correo',
    inputPlaceholder: 'tu@ejemplo.com',
    submitButton: 'Obtener Mi Informe',
    skipLink: 'Omitir por ahora',
    privacyNotice: "Nunca compartimos tu correo. Desuscribirse en cualquier momento.",
  },
}

export function EmailCaptureGate({
  lang = 'en',
  onSubmit,
  onSkip,
  caseType,
}: EmailCaptureGateProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = translations[lang as keyof typeof translations] || translations.en
  const displayCaseType = caseType ? `${caseType} cases` : `${t.caseTypeDefault} cases`

  // Fade-in animation on mount
  useEffect(() => {
    setIsVisible(true)
    inputRef.current?.focus()
  }, [])

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onSkip) {
        onSkip()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onSkip])

  // Validate email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSubmit(email)
    setIsLoading(false)
  }

  return (
    <div
      className={`fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: 'var(--bg-overlay)',
        backdropFilter: 'blur(8px)',
      }}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && onSkip) {
          onSkip()
        }
      }}
    >
      <div
        ref={dialogRef}
        className={`relative w-full max-w-md rounded-2xl p-8 transform transition-all duration-500 ${
          isVisible
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0'
        }`}
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-gate-headline"
      >
        {/* Headline */}
        <h2
          id="email-gate-headline"
          className="text-center text-2xl font-bold font-['Roboto'] mb-3"
          style={{ color: '#111111' }}
        >
          {t.headline}
        </h2>

        {/* Subheading with case type */}
        <p
          className="text-center text-sm mb-8"
          style={{ color: 'var(--fg-secondary)' }}
        >
          {t.subheading} <span className="font-semibold">{displayCaseType}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email-input"
              className="block text-xs font-medium mb-2 uppercase tracking-wider"
              style={{ color: '#6B7280' }}
            >
              {t.inputLabel}
            </label>
            <input
              ref={inputRef}
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              disabled={isLoading}
              placeholder={t.inputPlaceholder}
              autoComplete="email"
              required
              className="w-full h-12 px-4 rounded-lg text-base font-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              style={{
                backgroundColor: 'var(--bg-base)',
                color: '#111111',
                border: `1px solid ${error ? '#EF4444' : 'var(--border-default)'}`,
              }}
              aria-invalid={!!error}
              aria-describedby={error ? 'email-error' : undefined}
            />
            {error && (
              <p
                id="email-error"
                className="mt-2 text-xs font-medium"
                style={{ color: '#EF4444' }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit"
            disabled={isLoading}
            className="w-full h-12 px-6 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none active:scale-[0.98]"
            style={{
              background: isLoading
                ? 'var(--accent-primary-hover)'
                : 'linear-gradient(135deg, #8B5CF6, #333333)',
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
                Processing...
              </span>
            ) : (
              t.submitButton
            )}
          </button>
        </form>

        {/* Skip Link */}
        {onSkip && (
          <div className="mt-6 text-center">
            <button type="button"
              onClick={onSkip}
              className="text-sm font-medium transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-2 py-1"
              style={{
                color: '#6B7280',
              }}
            >
              {t.skipLink}
            </button>
          </div>
        )}

        {/* Privacy Notice */}
        <p
          className="mt-6 text-center text-xs"
          style={{ color: '#6B7280' }}
        >
          {t.privacyNotice}
        </p>
      </div>

      {/* CSS for animations */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-spin {
            animation: none;
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}

export default EmailCaptureGate
