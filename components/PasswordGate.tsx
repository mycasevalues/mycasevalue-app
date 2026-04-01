'use client';

import { useState, useEffect, useCallback } from 'react';

const PASS = process.env.NEXT_PUBLIC_SITE_PASSWORD || '';
const STORAGE_KEY = 'mcv_auth';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shake, setShake] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === 'true') {
        setAuthed(true);
      }
    } catch {}
    setLoading(false);
  }, []);

  const submit = useCallback(() => {
    if (input === PASS) {
      setError(false);
      setAuthed(true);
      try { sessionStorage.setItem(STORAGE_KEY, 'true'); } catch {}
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [input]);

  if (loading) return null;
  if (!PASS) return <>{children}</>;
  if (authed) return <>{children}</>;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#0B1221',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Outfit, system-ui, sans-serif',
    }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        backgroundImage: 'radial-gradient(rgba(99,102,241,0.15) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 420, padding: '0 24px',
        animation: 'fadeInUp 0.6s ease-out',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="url(#lg)" />
              <path d="M12 28V14l8-4 8 4v14l-8 4-8-4z" fill="rgba(255,255,255,0.15)" />
              <path d="M20 10v18M12 14l8 4 8-4M12 22l8 4 8-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              <defs><linearGradient id="lg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#4F46E5" /><stop offset="1" stopColor="#6366F1" /></linearGradient></defs>
            </svg>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-1px', color: '#F0F2F5' }}>
              MyCase<span style={{ color: '#A5B4FC' }}>Value</span>
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#64748B', letterSpacing: '0.5px' }}>
            RESTRICTED ACCESS
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(19,27,46,0.95) 0%, rgba(15,23,42,0.9) 100%)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 20,
          padding: '36px 32px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.08)',
          animation: shake ? 'shakeX 0.4s ease' : 'none',
        }}>
          <label style={{
            display: 'block',
            fontSize: 11, fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase' as const,
            color: '#64748B',
            marginBottom: 12,
          }}>
            ENTER PASSWORD
          </label>

          <div style={{ position: 'relative' }}>
            <input
              type={show ? 'text' : 'password'}
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              onKeyDown={e => e.key === 'Enter' && submit()}
              autoFocus
              placeholder="••••••••••"
              style={{
                width: '100%',
                padding: '16px 48px 16px 18px',
                fontSize: 16,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '1px',
                background: '#0F172A',
                border: `1.5px solid ${error ? '#EF4444' : 'rgba(99,102,241,0.25)'}`,
                borderRadius: 12,
                color: '#E2E8F0',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box' as const,
              }}
              onFocus={e => {
                if (!error) {
                  e.target.style.borderColor = '#4F46E5';
                  e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.15)';
                }
              }}
              onBlur={e => {
                if (!error) {
                  e.target.style.borderColor = 'rgba(99,102,241,0.25)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                color: '#64748B',
              }}
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              )}
            </button>
          </div>

          {error && (
            <div style={{
              marginTop: 10, fontSize: 13, color: '#EF4444',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Incorrect password
            </div>
          )}

          <button
            onClick={submit}
            style={{
              width: '100%',
              marginTop: 20,
              padding: '16px',
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'Outfit, system-ui, sans-serif',
              color: '#fff',
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(79,70,229,0.3)',
              letterSpacing: '0.3px',
            }}
            onMouseOver={e => {
              (e.target as HTMLElement).style.transform = 'translateY(-1px)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(79,70,229,0.4)';
            }}
            onMouseOut={e => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(79,70,229,0.3)';
            }}
          >
            Access Platform
          </button>
        </div>

        <div style={{
          textAlign: 'center', marginTop: 24,
          fontSize: 11, color: '#475569', letterSpacing: '0.5px',
        }}>
          MyCaseValue LLC. &copy; 2026. All rights reserved.
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
