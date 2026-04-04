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
        setMessage('You\u2019re in! We\u2019ll keep you updated.');
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
        background: '#FFFFFF',
        border: '1px solid var(--border-default)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'var(--accent-primary-subtle)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1856FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontSize: '17px',
            fontWeight: 700,
            color: '#F0F2F5',
            margin: '0 0 4px',
          }}
        >
          Stay updated
        </p>
        <p
          style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontSize: '14px',
            color: 'rgba(240,242,245,0.70)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Get notified about new case types, features, and federal court data insights.
        </p>
      </div>

      {status === 'success' ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            borderRadius: '10px',
            background: 'rgba(22, 163, 74, 0.08)',
            border: '1px solid rgba(22, 163, 74, 0.2)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#16A34A',
            }}
          >
            {message}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="you@example.com"
            required
            aria-label="Email address"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              border: `1px solid ${status === 'error' ? '#EF4444' : 'var(--border-default)'}`,
              background: 'var(--bg-base)',
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: '14px',
              color: '#F0F2F5',
              outline: 'none',
              transition: 'border-color 200ms',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: 'none',
              background: '#1856FF',
              color: '#FFFFFF',
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'opacity 200ms',
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? 'Joining\u2026' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p
          style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontSize: '13px',
            color: '#EF4444',
            margin: '8px 0 0',
            textAlign: 'center',
          }}
        >
          {message}
        </p>
      )}
      <p
        style={{
          fontFamily: 'Roboto, system-ui, sans-serif',
          fontSize: '12px',
          color: 'var(--fg-subtle)',
          textAlign: 'center',
          margin: '12px 0 0',
        }}
      >
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
