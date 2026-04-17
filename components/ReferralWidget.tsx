'use client';

/**
 * ReferralWidget - Display and manage user's referral link
 * Shows referral code, shareable URL, copy button, and referral count
 */

import { useEffect, useState } from 'react';
import { SITE_URL } from '@/lib/site-config';
import { getReferralStats } from '@/lib/referral';

interface ReferralStats {
  total: number;
  activated: number;
}

export interface ReferralWidgetProps {
  userId: string;
  userEmail?: string;
}

export default function ReferralWidget({ userId, userEmail }: ReferralWidgetProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const referralUrl = referralCode
    ? `${SITE_URL}?ref=${referralCode}`
    : null;

  // Load referral code and stats on mount
  useEffect(() => {
    const loadReferralData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch referral code
        const codeResponse = await fetch('/api/referral/code', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getAuthToken()}`,
          },
        });

        if (!codeResponse.ok) {
          if (codeResponse.status === 401) {
            setError('Please log in to view your referral link');
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch referral code');
        }

        const codeData = await codeResponse.json();
        setReferralCode(codeData.referralCode);

        // Fetch referral stats
        const statsData = await getReferralStats(userId);
        setStats(statsData);
      } catch (err) {
        console.error('Error loading referral data:', err);
        setError('Failed to load referral information');
      } finally {
        setLoading(false);
      }
    };

    loadReferralData();
  }, [userId]);

  // Handle copying referral URL to clipboard
  const handleCopyClick = async () => {
    if (!referralUrl) return;

    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setError('Failed to copy link');
    }
  };

  // Get auth token from session storage or cookie
  // This is a simplified example - adjust based on your auth implementation
  const getAuthToken = async (): Promise<string> => {
    // This would typically come from your auth provider
    // For now, return an empty string and adjust in your auth setup
    return '';
  };

  if (loading) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading referral information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '16px',
          borderRadius: '4px',
          backgroundColor: 'rgba(239,68,68,0.1)',
          color: 'var(--data-negative, #B01E1E)',
          border: '1px solid var(--data-negative-border, #FCA5A5)',
        }}
      >
        <p>{error}</p>
      </div>
    );
  }

  if (!referralCode) {
    return (
      <div
        style={{
          padding: '24px',
          borderRadius: '4px',
          backgroundColor: 'rgba(59,130,246,0.08)',
          border: '1px solid rgba(59,130,246,0.15)',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--link, #0A50A2)' }}>
          Referral Link Not Set
        </h3>
        <p style={{ margin: '0 0 16px 0', color: '#1E3A8A', fontSize: '14px' }}>
          Your referral link hasn't been generated yet.
        </p>
        <button
          onClick={async () => {
            try {
              const response = await fetch('/api/referral/code', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${await getAuthToken()}`,
                },
              });

              if (response.ok) {
                const data = await response.json();
                setReferralCode(data.referralCode);
              } else {
                setError('Failed to generate referral code');
              }
            } catch (err) {
              console.error('Error generating code:', err);
              setError('Failed to generate referral code');
            }
          }}
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Generate Referral Link
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '4px',
        backgroundColor: 'var(--color-surface-1)',
        border: '1px solid var(--border-default)',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text-primary)', fontSize: '18px' }}>
        Share Your Referral Link
      </h3>

      {/* Referral URL Display */}
      <div
        style={{
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: 'white',
          borderRadius: '4px',
          border: '1px solid var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <input
          type="text"
          readOnly
          value={referralUrl}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: '#495057',
            fontFamily: 'monospace',
          }}
        />
        <button
          onClick={handleCopyClick}
          style={{
            backgroundColor: copied ? 'var(--data-positive, #176438)' : 'var(--accent-primary)',
            color: 'white',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>

      {/* Referral Stats */}
      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          <div
            style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid var(--border-default)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--accent-primary)',
                marginBottom: '4px',
              }}
            >
              {stats.total}
            </div>
            <div
              style={{
                fontSize: '13px',
                color: '#6C757D',
              }}
            >
              Total Referrals
            </div>
          </div>

          <div
            style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid var(--border-default)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--data-positive, #176438)',
                marginBottom: '4px',
              }}
            >
              {stats.activated}
            </div>
            <div
              style={{
                fontSize: '13px',
                color: '#6C757D',
              }}
            >
              Active Referrals
            </div>
          </div>
        </div>
      )}

      {/* Sharing Tips */}
      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: 'rgba(234,179,8,0.1)',
          borderRadius: '4px',
          border: '1px solid var(--wrn-bg, #FCD34D)',
          fontSize: '13px',
          color: 'var(--wrn-txt, #7A5800)',
        }}
      >
        <strong>Share your link:</strong> Send it to friends, family, or
        colleagues via email, text, or social media. When they sign up using
        your link, you both get rewarded!
      </div>
    </div>
  );
}
