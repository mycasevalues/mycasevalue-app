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

export default function AccountPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile form
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password form
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // API Key management
  const [apiKeys, setApiKeys] = useState<Array<{ id: string; prefix: string; createdAt: string; lastUsed: string | null }>>([]);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [apiKeyLoading, setApiKeyLoading] = useState(false);
  const [apiKeyMsg, setApiKeyMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user: authUser } } = await getSupabase().auth.getUser();
      if (authUser) {
        const fullName = authUser.user_metadata?.full_name || '';
        setUser({ email: authUser.email || '', name: fullName });
        setName(fullName);

        // Fetch plan info
        try {
          const res = await fetch(`/api/premium/status?email=${encodeURIComponent(authUser.email || '')}`);
          if (res.ok) {
            const data = await res.json();
            setPlanInfo({
              plan: data.plan || 'free',
              grantedAt: data.grantedAt || null,
              expiresAt: data.expiresAt || null,
            });
          } else {
            setPlanInfo({ plan: 'free', grantedAt: null, expiresAt: null });
          }
        } catch {
          setPlanInfo({ plan: 'free', grantedAt: null, expiresAt: null });
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function loadApiKeys() {
    try {
      const res = await fetch('/api/user/api-keys');
      if (res.ok) {
        const data = await res.json();
        setApiKeys(data.keys || []);
      }
    } catch {
      // silently fail — keys section will show empty
    }
  }

  useEffect(() => {
    if (user) {
      loadApiKeys();
    }
  }, [user]);

  async function handleGenerateApiKey() {
    setApiKeyLoading(true);
    setApiKeyMsg(null);
    setNewApiKey(null);
    try {
      const res = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Default' }),
      });
      if (res.ok) {
        const data = await res.json();
        setNewApiKey(data.key);
        setApiKeyMsg({ type: 'success', text: 'API key generated. Copy it now — it will not be shown again.' });
        loadApiKeys();
      } else {
        const err = await res.json();
        setApiKeyMsg({ type: 'error', text: err.error || 'Failed to generate API key.' });
      }
    } catch {
      setApiKeyMsg({ type: 'error', text: 'Network error. Please try again.' });
    }
    setApiKeyLoading(false);
  }

  async function handleRevokeApiKey(keyId: string) {
    try {
      const res = await fetch(`/api/user/api-keys?id=${keyId}`, { method: 'DELETE' });
      if (res.ok) {
        setApiKeys((prev) => prev.filter((k) => k.id !== keyId));
        setApiKeyMsg({ type: 'success', text: 'API key revoked.' });
      } else {
        setApiKeyMsg({ type: 'error', text: 'Failed to revoke API key.' });
      }
    } catch {
      setApiKeyMsg({ type: 'error', text: 'Network error.' });
    }
  }

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setProfileMsg(null);

    const { error } = await getSupabase().auth.updateUser({
      data: { full_name: name },
    });

    if (error) {
      setProfileMsg({ type: 'error', text: error.message });
    } else {
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
    }
    setSaving(false);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 8 characters.' });
      setPasswordSaving(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match.' });
      setPasswordSaving(false);
      return;
    }

    const { error } = await getSupabase().auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMsg({ type: 'error', text: error.message });
    } else {
      setPasswordMsg({ type: 'success', text: 'Password updated successfully.' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordSaving(false);
  }

  async function handleSignOut() {
    await getSupabase().auth.signOut();
    window.location.href = '/';
  }

  const planLabels: Record<string, string> = {
    free: 'Free',
    single_report: 'Single Report',
    unlimited: 'Unlimited',
    attorney: 'Attorney Mode',
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'var(--accent-primary)', padding: '24px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-surface-0)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                Home
              </Link>
              {' > Account'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Account
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 600, color: 'var(--color-surface-0)', margin: '0 0 8px 0' }}>
              Account Settings
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Manage your profile, subscription, and security settings
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '40px' }}>
          <div style={{ width: 32, height: 32, border: '3px solid var(--border-default)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)' }}>
      {/* Dark Navy Header */}
      <div style={{ backgroundColor: 'var(--accent-primary)', padding: '24px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-surface-0)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
              Home
            </Link>
            {' > Account'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Account
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 600, color: 'var(--color-surface-0)', margin: '0 0 8px 0' }}>
            Account Settings
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            Manage your profile, subscription, and security settings
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Profile Card */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px 0' }}>
              Profile Information
            </h2>

            <form onSubmit={handleProfileSave}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="name" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid var(--border-default)', borderRadius: '6px', fontSize: '14px', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-surface-0)', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid var(--border-default)', borderRadius: '6px', fontSize: '14px', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface-1)', boxSizing: 'border-box', cursor: 'not-allowed' }}
                />
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              {profileMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px', fontWeight: 500, backgroundColor: profileMsg.type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', color: profileMsg.type === 'success' ? '#34d399' : '#f87171', border: `1px solid ${profileMsg.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                  {profileMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                style={{ padding: '10px 20px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, textTransform: 'uppercase' }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Password Card */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px 0' }}>
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="new-password" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid var(--border-default)', borderRadius: '6px', fontSize: '14px', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-surface-0)', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="confirm-password" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid var(--border-default)', borderRadius: '6px', fontSize: '14px', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-surface-0)', boxSizing: 'border-box' }}
                />
              </div>

              {passwordMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px', fontWeight: 500, backgroundColor: passwordMsg.type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', color: passwordMsg.type === 'success' ? '#34d399' : '#f87171', border: `1px solid ${passwordMsg.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                  {passwordMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={passwordSaving}
                style={{ padding: '10px 20px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: passwordSaving ? 'not-allowed' : 'pointer', opacity: passwordSaving ? 0.6 : 1, textTransform: 'uppercase' }}
              >
                {passwordSaving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Subscription Card */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px 0' }}>
              Subscription Plan
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {planLabels[planInfo?.plan || 'free'] || 'Free'}
              </span>
              <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', backgroundColor: planInfo?.plan === 'free' ? 'var(--color-surface-1)' : 'rgba(0,105,151,0.06)', color: planInfo?.plan === 'free' ? 'var(--color-text-secondary)' : 'var(--accent-primary-hover)' }}>
                {planInfo?.plan === 'free' ? 'Free' : 'Active'}
              </span>
            </div>

            {planInfo?.grantedAt && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0' }}>
                Member since {new Date(planInfo.grantedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
            {planInfo?.expiresAt && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0' }}>
                Renews {new Date(planInfo.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <Link href="/pricing" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase' }}>
                {planInfo?.plan === 'free' ? 'Upgrade Plan' : 'Change Plan'}
              </Link>
              <Link href="/billing" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: 'var(--color-surface-1)', color: 'var(--color-text-primary)', border: '1px solid var(--border-default)', borderRadius: '6px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                Billing History
              </Link>
            </div>
          </div>

          {/* API Key Management */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px 0' }}>
              API Keys
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 24px 0', lineHeight: 1.5 }}>
              Use API keys to access the MyCaseValue REST API programmatically. Keys are scoped to your account and plan.
            </p>

            {apiKeyMsg && (
              <div style={{ padding: '10px 14px', borderRadius: '4px', marginBottom: '16px', fontSize: '13px', fontWeight: 500, backgroundColor: apiKeyMsg.type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', color: apiKeyMsg.type === 'success' ? '#34d399' : '#f87171', border: `1px solid ${apiKeyMsg.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                {apiKeyMsg.text}
              </div>
            )}

            {newApiKey && (
              <div style={{ padding: '14px', borderRadius: '6px', marginBottom: '16px', backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid #B3D4FC' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary-hover)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your New API Key (copy now)
                </p>
                <code style={{ display: 'block', padding: '10px 12px', backgroundColor: 'var(--color-surface-0)', borderRadius: '4px', fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)', wordBreak: 'break-all', border: '1px solid var(--border-default)' }}>
                  {newApiKey}
                </code>
              </div>
            )}

            {apiKeys.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                      <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Key</th>
                      <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Created</th>
                      <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Last Used</th>
                      <th style={{ textAlign: 'right', padding: '8px 0', fontWeight: 600, color: 'var(--color-text-secondary)' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px 0', fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}>
                          {key.prefix}...
                        </td>
                        <td style={{ padding: '10px 0', color: 'var(--color-text-secondary)' }}>
                          {new Date(key.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '10px 0', color: 'var(--color-text-secondary)' }}>
                          {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
                        </td>
                        <td style={{ padding: '10px 0', textAlign: 'right' }}>
                          <button
                            onClick={() => handleRevokeApiKey(key.id)}
                            className="revoke-btn"
                            style={{ padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#f87171', backgroundColor: 'transparent', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}
                          >
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <style>{`
                  .revoke-btn:hover { background-color: rgba(239,68,68,0.08); border-color: #DC2626; }
                `}</style>
              </div>
            )}

            <button
              onClick={handleGenerateApiKey}
              disabled={apiKeyLoading}
              style={{ padding: '10px 20px', backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: apiKeyLoading ? 'not-allowed' : 'pointer', opacity: apiKeyLoading ? 0.6 : 1, textTransform: 'uppercase' }}
            >
              {apiKeyLoading ? 'Generating...' : 'Generate New API Key'}
            </button>
          </div>

          {/* Quick Links */}
          <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px 0' }}>
              Quick Links
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Dashboard', href: '/dashboard', desc: 'View your overview' },
                { label: 'Saved Reports', href: '/reports', desc: 'View past reports' },
                { label: 'Search Cases', href: '/', desc: 'Start a new lookup' },
                { label: 'Attorney Tools', href: '/attorney', desc: 'Professional suite' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="quick-link-card"
                  style={{ display: 'block', padding: '16px', borderRadius: '6px', border: '1px solid var(--border-default)', textDecoration: 'none', transition: 'all 0.2s' }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>{link.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{link.desc}</div>
                </Link>
              ))}
            </div>
            <style>{`
              .quick-link-card:hover {
                border-color: var(--accent-primary-hover);
                box-shadow: 0 2px 8px rgba(10, 102, 194, 0.12);
              }
            `}</style>
          </div>

          {/* Sign Out & Danger Zone */}
          <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' as const }}>
            <button
              onClick={handleSignOut}
              className="sign-out-btn"
              style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-surface-1)', color: 'var(--color-text-primary)', border: '1px solid var(--border-default)', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Sign Out
            </button>
            <style>{`
              .sign-out-btn:hover {
                background-color: rgba(255,255,255,0.05);
                border-color: #C5C8CC;
              }
            `}</style>

            <div style={{ backgroundColor: 'var(--color-surface-0)', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '2px solid var(--accent-primary)' }}>
              <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--accent-primary)', margin: '0 0 16px 0' }}>
                Danger Zone
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
                To delete your account, contact{' '}
                <a href="mailto:support@mycasevalues.com" style={{ color: 'var(--accent-primary-hover)', textDecoration: 'none' }}>support@mycasevalues.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
