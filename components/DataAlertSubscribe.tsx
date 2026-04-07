'use client';

import { useState } from 'react';

interface DataAlertSubscribeProps {
  caseType: string;
  nosCode?: string;
}

export default function DataAlertSubscribe({
  caseType,
  nosCode,
}: DataAlertSubscribeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    threshold: 'any_change',
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, threshold: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/alerts/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          caseType,
          nosCode,
          threshold: formData.threshold,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.error || 'Failed to subscribe to alerts'
        );
      }

      setIsSuccess(true);
      setFormData({ email: '', threshold: 'any_change' });
      setIsExpanded(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #D1D5DB',
        borderRadius: '8px',
        fontFamily: 'var(--font-body)',
      }}
    >
      {isSuccess ? (
        <div
          style={{
            backgroundColor: '#E8F3EB',
            border: '1px solid #057642',
            borderRadius: '6px',
            padding: '12px',
            color: '#057642',
            fontSize: '14px',
          }}
        >
          <strong>Success!</strong> You'll be notified when data updates for{' '}
          {caseType}.
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#0A66C2',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor =
                '#004182';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor =
                '#0A66C2';
            }}
          >
            <span>Get notified when data changes</span>
            <span
              style={{
                transition: 'transform 0.2s',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼
            </span>
          </button>

          {isExpanded && (
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #E5E7EB',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#0f0f0f',
                    marginBottom: '6px',
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                    backgroundColor: '#FFFFFF',
                    color: '#0f0f0f',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#0f0f0f',
                    marginBottom: '6px',
                  }}
                >
                  Notification Threshold
                </label>
                <select
                  value={formData.threshold}
                  onChange={handleThresholdChange}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                    backgroundColor: '#FFFFFF',
                    color: '#0f0f0f',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="any_change">Any change</option>
                  <option value="5_percent">Greater than 5% change</option>
                  <option value="10_percent">Greater than 10% change</option>
                </select>
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: '#6B7280',
                  marginBottom: '16px',
                  backgroundColor: '#F9FAFB',
                  padding: '8px 10px',
                  borderRadius: '4px',
                }}
              >
                <strong>Case Type:</strong> {caseType}
              </div>

              {error && (
                <p
                  style={{
                    fontSize: '13px',
                    color: '#CC1016',
                    marginBottom: '12px',
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setError('');
                  }}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#F3F4F6',
                    color: '#0f0f0f',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      '#F3F4F6';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: isLoading ? '#B0D0F5' : '#0A66C2',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        '#004182';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        '#0A66C2';
                    }
                  }}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
