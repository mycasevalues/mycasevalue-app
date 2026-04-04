'use client';

import React, { useState, useEffect } from 'react';
import { isPushSupported, subscribeToPush } from '../../lib/push-notifications';

interface PushNotificationPromptProps {
  lang?: 'en' | 'es';
  reportCount?: number;
}

const translations = {
  en: {
    title: 'Get Report Updates',
    message: 'Be notified when new cases match your research',
    enableButton: 'Enable Notifications',
    laterButton: 'Not now',
  },
  es: {
    title: 'Recibir Actualizaciones',
    message: 'Recibe notificaciones cuando nuevos casos coincidan con tu investigación',
    enableButton: 'Habilitar Notificaciones',
    laterButton: 'Ahora no',
  },
};

/**
 * Get or read dismissal cookie
 */
function getPushDismissCookie(): string | null {
  if (typeof document === 'undefined') return null;

  const cookieName = '__push_prompt_dismissed';
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName && value) {
      return decodeURIComponent(value);
    }
  }

  return null;
}

/**
 * Set dismissal cookie
 */
function setPushDismissCookie(daysToExpire: number = 7): void {
  if (typeof document === 'undefined') return;

  const cookieName = '__push_prompt_dismissed';
  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + daysToExpire);

  document.cookie = `${cookieName}=true; path=/; expires=${expiresDate.toUTCString()}; SameSite=Lax`;
}

/**
 * PushNotificationPrompt Component
 * Shows a dismissible banner/toast to enable push notifications
 * Only shows after user has generated at least 1 report and hasn't dismissed it
 * Uses cookies to track dismissal state (not localStorage)
 */
export function PushNotificationPrompt({
  lang = 'en',
  reportCount = 0,
}: PushNotificationPromptProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const t = translations[lang] || translations.en;

  // Initialize on mount (client-side only)
  useEffect(() => {
    // Check if push is supported
    if (!isPushSupported()) {
      setMounted(true);
      return;
    }

    // Check if already dismissed
    const isDismissed = getPushDismissCookie();
    if (isDismissed) {
      setMounted(true);
      return;
    }

    // Show only if user has created at least 1 report
    if (reportCount >= 1) {
      setIsVisible(true);
    }

    setMounted(true);
  }, [reportCount]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !isVisible || !isPushSupported()) {
    return null;
  }

  const handleEnable = async () => {
    setIsLoading(true);
    try {
      const success = await subscribeToPush();
      if (success) {
        setIsVisible(false);
        setPushDismissCookie(365); // Don't show again for 1 year if successful
      } else {
        // If subscribe failed, dismiss for shorter period to retry later
        setPushDismissCookie(3);
        setIsVisible(false);
      }
    } catch (err) {
      setPushDismissCookie(3);
      setIsVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setPushDismissCookie(7); // Don't show again for 7 days
  };

  return (
    <div
      className="fixed bottom-4 right-4 w-full max-w-sm mx-4 md:mx-0 rounded-lg shadow-lg border p-4 z-50 animate-slide-up"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: 'var(--border-subtle)',
      }}
      role="status"
      aria-live="polite"
      aria-label="Push notification prompt"
    >
      {/* Title */}
      <h3
        className="font-semibold text-sm mb-1"
        style={{ color: '#111111' }}
      >
        {t.title}
      </h3>

      {/* Message */}
      <p
        className="text-xs mb-4 leading-relaxed"
        style={{ color: 'var(--fg-secondary)' }}
      >
        {t.message}
      </p>

      {/* Button Group */}
      <div className="flex gap-2">
        <button type="button"
          onClick={handleEnable}
          disabled={isLoading}
          className="flex-1 h-9 px-3 rounded-lg font-medium text-sm text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
          style={{
            background: isLoading
              ? 'var(--accent-primary-hover)'
              : 'linear-gradient(135deg, #8B5CF6, #333333)',
          }}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-1">
              <svg
                className="w-3 h-3 animate-spin"
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
            t.enableButton
          )}
        </button>

        <button type="button"
          onClick={handleDismiss}
          disabled={isLoading}
          className="flex-1 h-9 px-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--bg-base)',
            color: '#111111',
            border: '1px solid var(--border-default)',
          }}
        >
          {t.laterButton}
        </button>
      </div>

      {/* CSS for animations */}
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
          animation: slideUp 300ms var(--ease-out, ease-out) forwards;
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
  );
}

export default PushNotificationPrompt;
