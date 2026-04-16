'use client';
import { useState } from 'react';

type FormErrors = {
  name?: string;
  organization?: string;
  email?: string;
  role?: string;
  teamSize?: string;
  useCase?: string;
  contactMethod?: string;
};

export default function EnterpriseDemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    role: '',
    teamSize: '',
    useCase: '',
    contactMethod: 'email',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Team size is required';
    }

    if (!formData.useCase.trim()) {
      newErrors.useCase = 'Primary use case is required';
    } else if (formData.useCase.length > 200) {
      newErrors.useCase = 'Use case must be 200 characters or less';
    }

    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Preferred contact method is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enterprise/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ email: errorData.error || 'An error occurred. Please try again.' });
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setErrors({ email: 'An error occurred. Please try again.' });
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        padding: '48px 32px',
        background: 'var(--color-surface-0)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', margin: '0 auto 16px' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
          marginBottom: '8px',
        }}>
          Thank You
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.6,
        }}>
          We will be in touch within one business day.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--border-default)',
    borderRadius: '12px',
    background: 'var(--color-surface-0)',
    outline: 'none',
    transition: 'border-color 200ms',
    height: '48px',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-body)',
    marginBottom: '8px',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#f87171',
    fontFamily: 'var(--font-body)',
    marginTop: '4px',
  };

  return (
    <>
      <style>{`
        .enterprise-input:focus {
          border-color: var(--accent-primary) !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.1);
        }
        .enterprise-select:focus {
          border-color: var(--accent-primary) !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.1);
        }
        .enterprise-textarea:focus {
          border-color: var(--accent-primary) !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.1);
        }
        .enterprise-submit {
          display: block;
          width: 100%;
          padding: 0 32px;
          height: 48px;
          background: var(--accent-primary);
          color: var(--color-surface-0);
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 200ms;
          font-family: var(--font-body);
        }
        .enterprise-submit:hover:not(:disabled) {
          background: #1e40af;
        }
        .enterprise-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
      <form onSubmit={handleSubmit} style={{
        padding: '32px',
        background: 'var(--color-surface-0)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label htmlFor="demo-name" style={labelStyle}>Full Name</label>
            <input
              id="demo-name"
              className="enterprise-input"
              style={{
                ...inputStyle,
                borderColor: errors.name ? '#DC2626' : 'var(--border-default)',
              }}
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <div style={errorStyle}>{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="demo-organization" style={labelStyle}>Organization</label>
            <input
              id="demo-organization"
              className="enterprise-input"
              style={{
                ...inputStyle,
                borderColor: errors.organization ? '#DC2626' : 'var(--border-default)',
              }}
              type="text"
              placeholder="Your organization"
              value={formData.organization}
              onChange={e => setFormData({ ...formData, organization: e.target.value })}
            />
            {errors.organization && <div style={errorStyle}>{errors.organization}</div>}
          </div>
        </div>

        <div>
          <label htmlFor="demo-email" style={labelStyle}>Email Address</label>
          <input
            id="demo-email"
            className="enterprise-input"
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#DC2626' : 'var(--border-default)',
            }}
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label htmlFor="demo-role" style={labelStyle}>Your Role</label>
            <select
              id="demo-role"
              className="enterprise-select"
              style={{
                ...inputStyle,
                borderColor: errors.role ? '#DC2626' : 'var(--border-default)',
                appearance: 'auto',
              }}
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="">Select a role</option>
              <option value="managing-partner">Managing Partner</option>
              <option value="partner">Partner</option>
              <option value="counsel">Of Counsel</option>
              <option value="associate">Associate</option>
              <option value="operations">Operations Manager</option>
              <option value="it">IT/Technology</option>
              <option value="legal">General Counsel</option>
              <option value="other">Other</option>
            </select>
            {errors.role && <div style={errorStyle}>{errors.role}</div>}
          </div>
          <div>
            <label htmlFor="demo-team-size" style={labelStyle}>Team Size</label>
            <select
              id="demo-team-size"
              className="enterprise-select"
              style={{
                ...inputStyle,
                borderColor: errors.teamSize ? '#DC2626' : 'var(--border-default)',
                appearance: 'auto',
              }}
              value={formData.teamSize}
              onChange={e => setFormData({ ...formData, teamSize: e.target.value })}
            >
              <option value="">Select team size</option>
              <option value="5-50">5-50 people</option>
              <option value="50-200">50-200 people</option>
              <option value="200-500">200-500 people</option>
              <option value="500+">500+ people</option>
            </select>
            {errors.teamSize && <div style={errorStyle}>{errors.teamSize}</div>}
          </div>
        </div>

        <div>
          <label htmlFor="demo-use-case" style={labelStyle}>Primary Use Case</label>
          <textarea
            id="demo-use-case"
            className="enterprise-textarea"
            style={{
              ...inputStyle,
              height: '100px',
              resize: 'vertical',
              borderColor: errors.useCase ? '#DC2626' : 'var(--border-default)',
            }}
            placeholder="How would you like to use MyCaseValue? (max 200 characters)"
            value={formData.useCase}
            onChange={e => setFormData({ ...formData, useCase: e.target.value.slice(0, 200) })}
          />
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            {formData.useCase.length}/200
          </div>
          {errors.useCase && <div style={errorStyle}>{errors.useCase}</div>}
        </div>

        <div>
          <label htmlFor="demo-contact-method" style={labelStyle}>Preferred Contact Method</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['email', 'phone'].map(method => (
              <label key={method} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}>
                <input
                  type="radio"
                  name="contact-method"
                  value={method}
                  checked={formData.contactMethod === method}
                  onChange={e => setFormData({ ...formData, contactMethod: e.target.value })}
                  style={{ cursor: 'pointer' }}
                />
                {method === 'email' ? 'Email' : 'Phone'}
              </label>
            ))}
          </div>
          {errors.contactMethod && <div style={errorStyle}>{errors.contactMethod}</div>}
        </div>

        <button
          type="submit"
          className="enterprise-submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Request Demo'}
        </button>
      </form>
    </>
  );
}
