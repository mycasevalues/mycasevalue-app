'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit form. Please try again.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        padding: '48px 32px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)',
        borderRadius: '12px', textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
          Message Sent
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Thank you for reaching out. We typically respond within 1 business day.
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)',
    border: '1px solid var(--border-default)', borderRadius: '12px',
    background: 'var(--color-surface-0)', outline: 'none',
    transition: 'border-color 200ms',
    height: '48px',
    boxSizing: 'border-box' as any,
    opacity: loading ? 0.6 : 1,
  } as React.CSSProperties;

  const labelStyle = {
    display: 'block', fontSize: '14px', fontWeight: 600,
    color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)',
    marginBottom: '8px',
  } as React.CSSProperties;

  return (
    <>
      <style>{`
        .contact-input:focus { border-color: var(--link-hover, #083D7A) !important; outline: none; }
        .contact-submit {
          display: block; padding: 0 32px; height: 48px;
          background: var(--accent-primary); color: var(--color-surface-0); border: none;
          border-radius: 12px; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: background 200ms;
          font-family: var(--font-body); width: 100%;
        }
        .contact-submit:hover:not(:disabled) { background: #0855a3; }
        .contact-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .error-message {
          background: #fee2e2; color: #991b1b; padding: 12px; border-radius: 8px;
          font-size: 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
        }
      `}</style>
      <form onSubmit={handleSubmit} style={{
        padding: '32px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)',
        borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
          Send Us a Message
        </h2>
        {error && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}
        <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label htmlFor="contact-name" style={labelStyle}>Full Name</label>
            <input id="contact-name" className="contact-input" style={inputStyle} type="text" placeholder="Your name" required
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label htmlFor="contact-email" style={labelStyle}>Email Address</label>
            <input id="contact-email" className="contact-input" style={inputStyle} type="email" placeholder="you@example.com" required
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" style={labelStyle}>Subject</label>
          <select id="contact-subject" className="contact-input" style={{...inputStyle, appearance: 'auto' as any}}
            value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
            <option value="general">General Inquiry</option>
            <option value="support">Account Support</option>
            <option value="enterprise">Enterprise & API</option>
            <option value="data">Data & Methodology</option>
            <option value="billing">Billing</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" style={labelStyle}>Message</label>
          <textarea id="contact-message" className="contact-input" style={{...inputStyle, height: '140px', resize: 'vertical'}} placeholder="How can we help?"
            required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        </div>
        <button type="submit" className="contact-submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}
