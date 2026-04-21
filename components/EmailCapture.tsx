'use client';

import { useState, FormEvent } from 'react';

interface EmailCaptureProps {
  heading: string;
  subtext: string;
  source: string;
  variant: 'inline' | 'card';
}

export default function EmailCapture({ heading, subtext, source, variant }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  const formRow = (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        disabled={status === 'loading'}
        style={{
          flex: '1 1 220px',
          height: 38,
          padding: '0 10px',
          fontSize: 14,
          fontFamily: 'var(--font-ui)',
          color: 'var(--text1, #333333)',
          background: 'var(--card, #fff)',
          border: '1px solid var(--bdr, #D4D2CC)',
          borderRadius: 2,
          outline: 'none',
          transition: 'border-color 150ms ease',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--link, #1A73E8)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--bdr, #D4D2CC)')}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          height: 38,
          padding: '0 20px',
          fontSize: 14,
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          color: '#fff',
          background: 'var(--link, #1A73E8)',
          border: 'none',
          borderRadius: 2,
          cursor: status === 'loading' ? 'wait' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'opacity 150ms ease',
          whiteSpace: 'nowrap',
        }}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );

  if (status === 'success') {
    const successContent = (
      <p
        style={{
          fontSize: 14,
          fontFamily: 'var(--font-ui)',
          color: 'var(--data-positive, #16a34a)',
          fontWeight: 600,
          margin: 0,
          padding: '8px 0',
        }}
      >
        You&apos;re subscribed!
      </p>
    );

    if (variant === 'inline') return successContent;

    return (
      <div
        style={{
          background: 'var(--card, #fff)',
          border: '1px solid var(--bdr, #D4D2CC)',
          borderRadius: 2,
          padding: 24,
          textAlign: 'center',
        }}
      >
        {successContent}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 14,
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              color: 'var(--text1, #333333)',
            }}
          >
            {heading}
          </span>
          <span
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text2, #42403C)',
            }}
          >
            {subtext}
          </span>
        </div>
        {formRow}
        {status === 'error' && (
          <p style={{ fontSize: 12, color: 'var(--link, #dc2626)', margin: '6px 0 0', fontFamily: 'var(--font-ui)' }}>
            {errorMsg}
          </p>
        )}
      </div>
    );
  }

  // card variant
  return (
    <div
      style={{
        background: 'var(--card, #fff)',
        border: '1px solid var(--bdr, #D4D2CC)',
        borderRadius: 2,
        padding: 24,
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          color: 'var(--text1, #333333)',
          margin: '0 0 6px',
          lineHeight: 1.3,
        }}
      >
        {heading}
      </h3>
      <p
        style={{
          fontSize: 14,
          fontFamily: 'var(--font-ui)',
          color: 'var(--text2, #42403C)',
          lineHeight: 1.6,
          margin: '0 0 16px',
        }}
      >
        {subtext}
      </p>
      {formRow}
      {status === 'error' && (
        <p style={{ fontSize: 12, color: 'var(--link, #dc2626)', margin: '8px 0 0', fontFamily: 'var(--font-ui)' }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
