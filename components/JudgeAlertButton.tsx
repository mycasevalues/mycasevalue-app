'use client';

/**
 * JudgeAlertButton — button to set up judge alerts
 * Opens a form where users can enter their email to be notified of new judge opinions
 */

import { useState } from 'react';

interface JudgeAlertButtonProps {
  judgeId: string;
  judgeName: string;
}

export default function JudgeAlertButton({ judgeId, judgeName }: JudgeAlertButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/alerts/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judge_id: judgeId, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to set up alert');
        return;
      }

      setSuccess(true);
      setEmail('');
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2500);
    } catch (err) {
      console.error('Alert submission error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmail('');
    setError('');
    setSuccess(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '8px 24px',
          background: 'var(--accent-primary)',
          color: 'var(--color-surface-0)',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: 'var(--font-ui)',
          transition: 'all 150ms ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent-primary-hover)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--accent-primary)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ flexShrink: 0 }}
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        Set Alert
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontFamily: 'var(--font-ui)',
          }}
          onClick={handleClose}
        >
          <div
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '4px',
              padding: '32px',
              maxWidth: '420px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              animation: 'slideUp 200ms ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(16px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 8px 0', fontFamily: 'var(--font-ui)' }}>
              Set Judge Alert
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 24px 0', lineHeight: '1.6' }}>
              Get notified when Judge {judgeName} publishes new opinions.
            </p>

            {success ? (
              <div
                style={{
                  padding: '16px',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid var(--data-positive-border, #BFEFE5)',
                  borderRadius: '4px',
                  marginBottom: '24px',
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--data-positive, #176438)', margin: 0, fontWeight: '500' }}>
                  ✓ You'll be notified when Judge {judgeName} publishes new opinions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    htmlFor="judge-alert-email"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="judge-alert-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      fontSize: '14px',
                      border: error ? '1px solid #CC1016' : '1px solid var(--border-default)',
                      borderRadius: '4px',
                      background: 'var(--color-surface-0)',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 150ms',
                      fontFamily: 'var(--font-ui)',
                    }}
                    onFocus={(e) => {
                      if (!error) {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 102, 194, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      if (!error) {
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                      }
                    }}
                  />
                  {error && <p style={{ fontSize: '12px', color: 'var(--data-negative, #B01E1E)', margin: '6px 0 0 0' }}>{error}</p>}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handleClose}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-ui)',
                      transition: 'all 150ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--border-default)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      background: loading || !email.trim() ? 'var(--bdr, #E2DFD8)' : 'var(--accent-primary)',
                      color: 'var(--color-surface-0)',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-ui)',
                      transition: 'all 150ms',
                      opacity: loading || !email.trim() ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading && email.trim()) {
                        e.currentTarget.style.background = 'var(--accent-primary-hover)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--accent-primary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {loading ? 'Setting up...' : 'Create Alert'}
                  </button>
                </div>
              </form>
            )}

            {!success && (
              <button
                onClick={handleClose}
                aria-label="Close dialog"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
