'use client';

import { FormEvent, useState } from 'react';

interface FormState {
  name: string;
  email: string;
  intendedUse: string;
  submitted: boolean;
  loading: boolean;
  error: string | null;
}

export default function APIAccessForm() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    intendedUse: '',
    submitted: false,
    loading: false,
    error: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: `API Access Request - Intended Use: ${formState.intendedUse}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setFormState((prev) => ({
        ...prev,
        submitted: true,
        loading: false,
        name: '',
        email: '',
        intendedUse: '',
      }));
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  if (formState.submitted) {
    return (
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(5, 150, 105, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#059669"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#0f0f0f',
            margin: '0 0 8px',
          }}
        >
          Request Submitted
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: '#4B5563',
            margin: 0,
          }}
        >
          We have received your API access request. Our team will review it and contact you
          within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <p
        style={{
          fontSize: '14px',
          color: '#4B5563',
          margin: '0 0 20px',
          fontStyle: 'italic',
        }}
      >
        During beta, API access is available — contact us to get your API key.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={formState.name}
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="John Doe"
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              color: '#0f0f0f',
              backgroundColor: '#F8F9FA',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={formState.email}
            onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="john@lawfirm.com"
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              color: '#0f0f0f',
              backgroundColor: '#F8F9FA',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="intendedUse"
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Intended Use
          </label>
          <textarea
            id="intendedUse"
            value={formState.intendedUse}
            onChange={(e) => setFormState((prev) => ({ ...prev, intendedUse: e.target.value }))}
            placeholder="Describe how you plan to use the API (e.g., case prediction integration, bulk analysis pipeline, etc.)"
            required
            rows={4}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              color: '#0f0f0f',
              backgroundColor: '#F8F9FA',
              boxSizing: 'border-box',
              resize: 'vertical',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          />
        </div>

        {formState.error && (
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              color: '#DC2626',
              fontSize: '13px',
            }}
          >
            {formState.error}
          </div>
        )}

        <button
          type="submit"
          disabled={formState.loading}
          style={{
            padding: '12px 20px',
            backgroundColor: formState.loading ? '#A5A5A5' : '#0966C3',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: formState.loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s, transform 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            width: '100%',
          }}
        >
          {formState.loading ? 'Submitting...' : 'Request API Access'}
        </button>
      </form>
    </div>
  );
}
