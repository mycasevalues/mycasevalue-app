'use client';

/**
 * ReferralDashboard - Comprehensive referral section for the user dashboard
 * Displays referral code, link, stats, shareable LinkedIn message, and referral list
 */

import { useEffect, useState } from 'react';
import { SITE_URL } from '@/lib/site-config';
import { getReferralStats, getReferralHistory } from '@/lib/referral';

interface ReferralStats {
  total: number;
  activated: number;
}

interface ReferralRecord {
  referred_user_id: string;
  created_at: string;
  activated_at: string | null;
}

interface ReferralDashboardProps {
  userId: string;
  userEmail?: string;
}

export default function ReferralDashboard({ userId, userEmail }: ReferralDashboardProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [referralHistory, setReferralHistory] = useState<ReferralRecord[]>([]);
  const [copied, setCopied] = useState(false);
  const [linkedInCopied, setLinkedInCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const referralUrl = referralCode
    ? `${SITE_URL}?ref=${referralCode}`
    : null;

  const linkedInMessage = referralCode
    ? `I've been using MyCaseValue to research federal court outcomes — win rates, settlement data, and judge analytics from 5.1M+ public cases. It's free during beta: ${SITE_URL}?ref=${referralCode}`
    : null;

  // Load referral code, stats, and history on mount
  useEffect(() => {
    const loadReferralData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get auth token
        const authToken = await getAuthToken();

        // Fetch referral code
        const codeResponse = await fetch('/api/referral/code', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
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
        if (statsData) {
          setStats(statsData);
        }

        // Fetch referral history
        const historyData = await getReferralHistory(userId);
        if (historyData) {
          setReferralHistory(historyData);
        }
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
  const handleCopyLink = async () => {
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

  // Handle copying LinkedIn message to clipboard
  const handleCopyLinkedInMessage = async () => {
    if (!linkedInMessage) return;

    try {
      await navigator.clipboard.writeText(linkedInMessage);
      setLinkedInCopied(true);
      setTimeout(() => setLinkedInCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setError('Failed to copy message');
    }
  };

  // Get auth token from session storage or cookie
  const getAuthToken = async (): Promise<string> => {
    // This would typically come from your auth provider
    // For now, return an empty string and adjust in your auth setup
    return '';
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-surface-0)',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid var(--border-default)',
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
          borderRadius: '8px',
          backgroundColor: 'rgba(239,68,68,0.1)',
          color: '#f87171',
          border: '1px solid #FECACA',
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
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.15)',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
          Referral Link Not Set
        </h3>
        <p style={{ margin: '0 0 16px 0', color: 'var(--accent-primary)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
          Your referral link hasn't been generated yet.
        </p>
        <button
          onClick={async () => {
            try {
              const authToken = await getAuthToken();
              const response = await fetch('/api/referral/code', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authToken}`,
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
            color: 'var(--color-text-inverse)',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'var(--font-body)',
          }}
        >
          Generate Referral Link
        </button>
      </div>
    );
  }

  const hasBetaPioneerBadge = stats && stats.total >= 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Referral Link Section */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
            Your Referral Link
          </h3>
          {hasBetaPioneerBadge && (
            <span style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-text-inverse)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
            }}>
              Beta Pioneer
            </span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '8px',
            border: '1px solid var(--border-default)',
          }}
        >
          <input
            type="text"
            readOnly
            value={referralUrl || ''}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-mono)',
              backgroundColor: 'transparent',
            }}
          />
          <button
            onClick={handleCopyLink}
            style={{
              backgroundColor: copied ? 'var(--color-success)' : 'var(--accent-primary)',
              color: 'var(--color-text-inverse)',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-body)',
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
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '8px',
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
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {stats.total}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Total Referrals
              </div>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '8px',
                border: '1px solid var(--border-default)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--color-success)',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {stats.activated}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Active (Logged In)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LinkedIn Share Section */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
          Share on LinkedIn
        </h3>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
            Pre-written message:
          </p>
          <div
            style={{
              padding: '12px',
              backgroundColor: 'var(--color-surface-1)',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
              fontSize: '13px',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.5',
              marginBottom: '12px',
            }}
          >
            {linkedInMessage}
          </div>
        </div>
        <button
          onClick={handleCopyLinkedInMessage}
          style={{
            backgroundColor: linkedInCopied ? 'var(--color-success)' : 'var(--accent-primary)',
            color: 'var(--color-text-inverse)',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'background-color 0.2s',
            fontFamily: 'var(--font-body)',
          }}
        >
          {linkedInCopied ? 'Message Copied!' : 'Copy Message'}
        </button>
      </div>

      {/* Referral List Section */}
      {referralHistory.length > 0 && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
            Your Referrals
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {referralHistory.map((referral, index) => (
              <div
                key={index}
                style={{
                  padding: '12px 0',
                  borderBottom: index < referralHistory.length - 1 ? '1px solid var(--border-default)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {referral.referred_user_id.substring(0, 8)}...
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    Referred on {new Date(referral.created_at).toLocaleDateString()}
                  </div>
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-body)',
                    backgroundColor: referral.activated_at ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                    color: referral.activated_at ? '#065F46' : '#92400E',
                  }}
                >
                  {referral.activated_at ? '✓ Active' : '○ Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div
        style={{
          padding: '12px',
          backgroundColor: 'rgba(59,130,246,0.08)',
          borderRadius: '8px',
          border: '1px solid rgba(59,130,246,0.15)',
          fontSize: '13px',
          color: 'var(--accent-primary-hover)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <strong>How referrals work:</strong> Share your link with friends and colleagues. When they sign up using your link, both of you get rewards. Referrals are marked as "Active" once they've logged in to their account.
      </div>
    </div>
  );
}
