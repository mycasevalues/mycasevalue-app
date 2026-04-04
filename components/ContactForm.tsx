'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        padding: '48px 32px', background: '#FFFFFF', border: '1px solid #D5D8DC',
        borderRadius: '4px', textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#07874A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
          Message Sent
        </h3>
        <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Thank you for reaching out. We typically respond within 1 business day.
        </p>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#212529',
    border: '1px solid #D5D8DC', borderRadius: '4px',
    background: '#FFFFFF', outline: 'none',
    transition: 'border-color 200ms',
    height: '48px',
  } as React.CSSProperties;

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: 600,
    color: '#212529', fontFamily: 'var(--font-body)',
    marginBottom: '6px',
  } as React.CSSProperties;

  return (
    <>
      <style>{`
        .contact-input:focus { border-color: #E8171F !important; }
        .contact-submit {
          display: inline-block; padding: 14px 32px;
          background: #E8171F; color: #FFFFFF; border: none;
          border-radius: 4px; font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.04em;
          cursor: pointer; transition: background 200ms;
          font-family: var(--font-display); width: 100%;
        }
        .contact-submit:hover { background: #E8171F; }
      `}</style>
      <form onSubmit={handleSubmit} style={{
        padding: '32px', background: '#FFFFFF', border: '1px solid #D5D8DC',
        borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
          Send Us a Message
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input className="contact-input" style={inputStyle} type="text" placeholder="Your name" required
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input className="contact-input" style={inputStyle} type="email" placeholder="you@example.com" required
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Subject</label>
          <select className="contact-input" style={{...inputStyle, appearance: 'auto' as any}}
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
          <label style={labelStyle}>Message</label>
          <textarea className="contact-input" style={{...inputStyle, height: '140px', resize: 'vertical'}} placeholder="How can we help?"
            required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        </div>
        <button type="submit" className="contact-submit">Send Message</button>
      </form>
    </>
  );
}
