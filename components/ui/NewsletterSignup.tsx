'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('You\'re subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div
      style={{
        background: 'var(--color-surface-0)',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
        padding: '32px',
      }}
    >
      {/* Label */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--accent-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '8px',
        }}
      >
        Stay Informed
      </div>

      {/* Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          margin: '0 0 8px',
          lineHeight: 1.3,
        }}
      >
        Get federal court insights delivered
      </h2>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          margin: '0 0 24px',
          lineHeight: 1.6,
        }}
      >
        Weekly data-driven analysis of federal court trends, settlement patterns, and litigation insights.
      </p>

      {status === 'success' ? (
        /* Success State */
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            borderRadius: '4px',
            background: 'rgba(22, 163, 74, 0.08)',
            border: '1px solid rgba(22, 163, 74, 0.2)',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16A34A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              color: '#16A34A',
            }}
          >
            {message}
          </span>
        </div>
      ) : (
        /* Form */
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Enter your email"
            required
            aria-label="Email address"
            style={{
              flex: 1,
              minWidth: '200px',
              height: '48px',
              padding: '12px 16px',
              borderRadius: '4px',
              border: `4px solid ${status === 'error' ? 'var(--accent-primary)' : 'var(--border-default)'}`,
              background: 'var(--color-surface-0)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              outline: 'none',
              transition: 'border-color 200ms',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            onMouseEnter={(e) => {
              if (status !== 'loading') {
                e.currentTarget.style.background = '#B91C1C';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
            }}
            style={{
              height: '48px',
              padding: '0 24px',
              borderRadius: '4px',
              border: 'none',
              background: 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'background 200ms',
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--accent-primary)',
            margin: '12px 0 0',
          }}
        >
          {message}
        </p>
      )}

      {/* Privacy Text */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          margin: '16px 0 0',
          lineHeight: 1.5,
        }}
      >
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
