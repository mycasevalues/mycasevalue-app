'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCode() {
      try {
        const res = await fetch('/api/referral/code');
        if (res.ok) {
          const data = await res.json();
          setReferralCode(data.code || null);
        } else if (res.status === 401) {
          setError('Sign in to access your referral code.');
        }
      } catch {
        setError('Could not load referral code.');
      }
      setLoading(false);
    }
    fetchCode();
  }, []);

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await fetch('/api/referral/code', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setReferralCode(data.code);
        setError(null);
      } else {
        setError('Could not generate referral code.');
      }
    } catch {
      setError('Network error.');
    }
    setLoading(false);
  }

  function handleCopy() {
    if (!referralCode) return;
    const url = `https://www.mycasevalues.com/?ref=${referralCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const rewards = [
    { count: '1 referral', reward: '1 free premium report' },
    { count: '3 referrals', reward: '1 month unlimited access' },
    { count: '5 referrals', reward: '3 months unlimited access' },
    { count: '10 referrals', reward: '1 year unlimited access' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1B3A5C', padding: '24px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            {' > Referral Program'}
          </div>
          <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 8px 0' }}>
            Referral Program
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            Share MyCaseValue and earn free access for every friend who signs up.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* How It Works */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px 0' }}>
              How It Works
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
              {[
                { step: '1', title: 'Share Your Link', desc: 'Copy your unique referral link and share it with colleagues.' },
                { step: '2', title: 'Friend Signs Up', desc: 'When someone creates an account using your link, you both benefit.' },
                { step: '3', title: 'Earn Rewards', desc: 'Get free premium access for each successful referral.' },
              ].map((item) => (
                <div key={item.step} style={{ textAlign: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0A66C2', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '18px', fontWeight: 700 }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 6px 0' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Your Referral Link */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px 0' }}>
              Your Referral Link
            </h2>

            {error && (
              <div style={{ padding: '12px 16px', borderRadius: '12px', marginBottom: '16px', fontSize: '13px', backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }}>
                {error}
                {error.includes('Sign in') && (
                  <span>{' '}<Link href="/sign-in" style={{ color: '#004182', fontWeight: 600 }}>Sign in here</Link></span>
                )}
              </div>
            )}

            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4B5563', fontSize: '14px' }}>
                <div style={{ width: 20, height: 20, border: '2px solid #E5E7EB', borderTopColor: '#0A66C2', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                Loading...
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : referralCode ? (
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <code style={{ flex: 1, padding: '12px 16px', backgroundColor: '#F7F8FA', borderRadius: '12px', fontSize: '14px', fontFamily: 'var(--font-mono)', color: '#0f0f0f', border: '1px solid #E5E7EB', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    https://www.mycasevalues.com/?ref={referralCode}
                  </code>
                  <button
                    onClick={handleCopy}
                    style={{ padding: '12px 20px', backgroundColor: copied ? '#065F46' : '#0A66C2', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background-color 0.2s' }}
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
                <p style={{ fontSize: '12px', color: '#4B5563', marginTop: '8px' }}>
                  Your code: <strong>{referralCode}</strong>
                </p>
              </div>
            ) : (
              <button
                onClick={handleGenerate}
                style={{ padding: '12px 24px', backgroundColor: '#0A66C2', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Generate Referral Code
              </button>
            )}
          </div>

          {/* Reward Tiers */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px 0' }}>
              Reward Tiers
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ textAlign: 'left', padding: '10px 0', fontWeight: 600, color: '#4B5563' }}>Milestone</th>
                  <th style={{ textAlign: 'left', padding: '10px 0', fontWeight: 600, color: '#4B5563' }}>Reward</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((r) => (
                  <tr key={r.count} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '12px 0', fontWeight: 500, color: '#0f0f0f' }}>{r.count}</td>
                    <td style={{ padding: '12px 0', color: '#004182', fontWeight: 500 }}>{r.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
