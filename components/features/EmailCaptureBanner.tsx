'use client';

import React, { useState, useRef } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface EmailCaptureBannerProps {
  lang?: 'en' | 'es';
  context?: 'report' | 'homepage' | 'pricing';
}

const COPY = {
  en: {
    report: {
      headline: 'Save your report and get updates when new data is available',
      button: 'Get Free Case Insights',
    },
    homepage: {
      headline: 'Join 10,000+ people who check their case value',
      button: 'Get Free Case Insights',
    },
    pricing: {
      headline: 'Get notified about special offers and new features',
      button: 'Get Free Case Insights',
    },
    placeholder: 'Enter your email',
    success: 'Check your email for confirmation',
    error: 'Something went wrong. Please try again.',
    gdpr: "We'll never share your email. Unsubscribe anytime.",
  },
  es: {
    report: {
      headline: 'Guarda tu informe y recibe actualizaciones cuando haya datos nuevos',
      button: 'Obtener Información Gratis',
    },
    homepage: {
      headline: 'Únete a 10,000+ personas que verifican el valor de su caso',
      button: 'Obtener Información Gratis',
    },
    pricing: {
      headline: 'Recibe notificaciones sobre ofertas especiales y nuevas funciones',
      button: 'Obtener Información Gratis',
    },
    placeholder: 'Ingresa tu correo electrónico',
    success: 'Revisa tu correo para confirmar',
    error: 'Algo salió mal. Por favor, intenta de nuevo.',
    gdpr: 'Nunca compartiremos tu correo. Cancela la suscripción en cualquier momento.',
  },
};

export function EmailCaptureBanner({
  lang = 'en',
  context = 'homepage',
}: EmailCaptureBannerProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = COPY[lang];
  const contextCopy = copy[context];

  // Basic email validation regex
  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setErrorMessage(lang === 'en' ? 'Please enter your email' : 'Por favor, ingresa tu correo');
      setState('error');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage(
        lang === 'en' ? 'Please enter a valid email' : 'Por favor, ingresa un correo válido'
      );
      setState('error');
      return;
    }

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/email/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          context,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setState('success');
      setEmail('');

      // Reset success state after 5 seconds
      setTimeout(() => {
        setState('idle');
      }, 5000);
    } catch (error) {
      console.error('[EmailCaptureBanner] Error:', error);
      setErrorMessage(copy.error);
      setState('error');

      // Reset error state after 5 seconds
      setTimeout(() => {
        setState('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div
      className="w-full rounded-2xl overflow-hidden border transition-all"
      style={{
        background: 'linear-gradient(135deg, rgba(17,17,17,0.1), rgba(249,248,246,0.95))',
        borderColor: 'rgba(17,17,17,0.2)',
      }}
    >
      <div className="px-6 py-8 sm:px-8">
        {/* Headline */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            {contextCopy.headline}
          </h3>
          <p className="text-sm text-gray-300">{copy.gdpr}</p>
        </div>

        {/* Form or Success/Error State */}
        {state === 'success' ? (
          <div className="flex items-center gap-3 text-green-400">
            <CheckCircle2 size={24} />
            <span className="text-sm font-medium">{copy.success}</span>
          </div>
        ) : state === 'error' ? (
          <div className="flex items-center gap-3 text-orange-400">
            <AlertCircle size={24} />
            <span className="text-sm font-medium">{errorMessage || copy.error}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              ref={inputRef}
              type="email"
              placeholder={copy.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === 'loading'}
              className="flex-1 px-4 py-3 rounded-lg bg-[#0f1419] border border-gray-700 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 disabled:opacity-50"
            />
            <button type="submit"
              disabled={state === 'loading' || !email.trim()}
              style={{
                background:
                  state === 'loading' || !email.trim()
                    ? 'rgba(17,17,17,0.5)'
                    : 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              }}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed whitespace-nowrap"
            >
              {state === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {lang === 'en' ? 'Submitting...' : 'Enviando...'}
                </span>
              ) : (
                contextCopy.button
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EmailCaptureBanner;
