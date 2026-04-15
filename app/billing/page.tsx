'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

type PlanInfo = {
  plan: string;
  grantedAt: string | null;
  expiresAt: string | null;
};

const PLAN_DETAILS: Record<string, { name: string; price: string; features: string[] }> = {
  free: {
    name: 'Free',
    price: '$0',
    features: ['Basic win rates', 'Basic settlement data', 'Basic duration data', '3 lookups per day'],
  },
  single_report: {
    name: 'Single Report',
    price: '$5.99',
    features: ['Full settlement range', 'Confidence intervals', 'PDF export', 'District judge overview'],
  },
  unlimited: {
    name: 'Unlimited',
    price: '$9.99',
    features: ['Unlimited lookups', 'Trend data', 'Case comparison', 'Saved reports', 'Search history', 'Spanish language'],
  },
  attorney: {
    name: 'Attorney Mode',
    price: '$29.99/mo',
    features: ['Judge intelligence', 'Document intelligence', 'AI outcome predictor', 'Venue optimizer', 'PACER monitoring', 'API access', 'Team workspace'],
  },
};

export default function BillingPage() {
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const { data: { user } } = await getSupabase().auth.getUser();
        if (user?.email) {
          const res = await fetch(`/api/premium/status?email=${encodeURIComponent(user.email)}`);
          if (res.ok) {
            const data = await res.json();
            setPlanInfo({ plan: data.plan || 'free', grantedAt: data.grantedAt, expiresAt: data.expiresAt });
          } else {
            setError('Unable to load plan information. Showing default plan.');
            setPlanInfo({ plan: 'free', grantedAt: null, expiresAt: null });
          }
        } else {
          setPlanInfo({ plan: 'free', grantedAt: null, expiresAt: null });
        }
      } catch {
        setError('Unable to connect. Please check your connection and try again.');
        setPlanInfo({ plan: 'free', grantedAt: null, expiresAt: null });
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--border-default)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const currentPlan = planInfo?.plan || 'free';
  const details = PLAN_DETAILS[currentPlan] || PLAN_DETAILS.free;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)' }}>
      {/* Dark Navy Header */}
      <div style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', padding: '32px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <Link href="/account" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
              Account
            </Link>
            <span style={{ margin: '0 8px' }}>&gt;</span>
            <span>Billing</span>
          </div>

          {/* Badge and Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ padding: '6px 14px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              BILLING
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: '36px', fontWeight: 600, color: 'var(--color-surface-0)', margin: '0 0 12px 0' }}>
            Billing & Subscription
          </h1>

          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>
            Manage your subscription and billing information
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Error Banner */}
          {error && (
            <div style={{ padding: '14px 18px', marginBottom: '24px', borderRadius: '12px', backgroundColor: 'rgba(232,149,88,0.12)', border: '1px solid rgba(232,149,88,0.30)' }}>
              <p style={{ fontSize: '13px', color: '#E89558', margin: 0 }}>{error}</p>
            </div>
          )}
          {/* Current Plan Card */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                  Current Plan
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="font-display" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {details.name}
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, backgroundColor: 'rgba(0,105,151,0.06)', color: 'var(--accent-primary-hover)' }}>
                    Active
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {details.price}
                </span>
                {currentPlan === 'attorney' && (
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>per month</p>
                )}
              </div>
            </div>

            {planInfo?.grantedAt && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '16px 0 0 0' }}>
                Active since {new Date(planInfo.grantedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
            {planInfo?.expiresAt && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
                Next billing date: {new Date(planInfo.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>

          {/* Plan Features */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px 0' }}>
              Your Plan Includes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {details.features.map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-default)' }}>
              <Link href="/pricing" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase' }}>
                {currentPlan === 'free' ? 'Upgrade Plan' : 'Change Plan'}
              </Link>
            </div>
          </div>

          {/* Payment Method (placeholder for future Stripe) */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px 0' }}>
              Payment Method
            </h2>
            <div style={{ backgroundColor: '#FAFBFC', borderRadius: '12px', padding: '24px', border: '2px dashed var(--border-default)', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 4px 0' }}>
                No payment method on file
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                All features are currently free during our beta period
              </p>
            </div>
          </div>

          {/* Back link */}
          <div style={{ textAlign: 'center' }}>
            <Link href="/account" style={{ fontSize: '14px', color: 'var(--accent-primary-hover)', textDecoration: 'none' }}>
              Back to Account Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
