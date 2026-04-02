'use client';

import { useEffect, useState } from 'react';

const STATES = [
  'California', 'Texas', 'Florida', 'New York', 'Illinois',
  'Pennsylvania', 'Ohio', 'Georgia', 'Michigan', 'North Carolina'
];

const CASE_TYPES = [
  'employment discrimination',
  'vehicle accident',
  'medical malpractice',
  'debt collection',
  'slip and fall'
];

const TRANSLATIONS = {
  en: {
    viewed: 'just viewed',
    checking: 'people are checking data right now',
    generated: 'was just generated in'
  },
  es: {
    viewed: 'acaba de ver',
    checking: 'personas están consultando datos ahora',
    generated: 'se acaba de generar en'
  }
};

interface SocialProofToastProps {
  lang?: string;
  active?: boolean;
}

export default function SocialProofToast({ lang = 'en', active = true }: SocialProofToastProps) {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  useEffect(() => {
    if (dismissed || !active) return;

    const generateMessage = () => {
      const type = Math.floor(Math.random() * 3);
      let msg = '';

      if (type === 0) {
        const state = STATES[Math.floor(Math.random() * STATES.length)];
        const caseType = CASE_TYPES[Math.floor(Math.random() * CASE_TYPES.length)];
        msg = `Someone in ${state} ${t.viewed} a ${caseType} report`;
      } else if (type === 1) {
        const num = Math.floor(Math.random() * 15) + 3;
        msg = `${num} ${t.checking}`;
      } else {
        const state = STATES[Math.floor(Math.random() * STATES.length)];
        const caseType = CASE_TYPES[Math.floor(Math.random() * CASE_TYPES.length)];
        msg = `A ${caseType} report ${t.generated} ${state}`;
      }
      return msg;
    };

    const showToast = () => {
      setMessage(generateMessage());
      setShow(true);

      const hideTimer = setTimeout(() => {
        setShow(false);
      }, 5000);

      const nextTimer = setTimeout(() => {
        showToast();
      }, Math.random() * 10000 + 15000);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(nextTimer);
      };
    };

    const cleanup = showToast();
    return cleanup;
  }, [dismissed, active, t]);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mcv_sp_dismissed', 'true');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDismissed = localStorage.getItem('mcv_sp_dismissed') === 'true';
      setDismissed(isDismissed);
    }
  }, []);

  if (dismissed || !active || !show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-slide-in">
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-400px);
            opacity: 0;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>

      <div
        className="rounded-lg border p-4 shadow-lg"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E0D8',
          color: '#374151'
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#0D9488' }}
            />
            <p className="text-sm leading-snug">{message}</p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-lg leading-none transition-colors"
            style={{ color: '#6B7280' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6B7280';
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
