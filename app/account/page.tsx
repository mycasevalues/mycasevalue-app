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
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#1B3A5C', padding: '24px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                Home
              </Link>
              {' > Account'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#7C3AED', color: '#FFFFFF', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Account
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>
              Account Settings
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Manage your profile, subscription, and security settings
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
          <div style={{ width: 32, height: 32, border: '3px solid #E5E7EB', borderTopColor: '#7C3AED', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA' }}>
      {/* Dark Navy Header */}
      <div style={{ backgroundColor: '#1B3A5C', padding: '24px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
              Home
            </Link>
            {' > Account'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#7C3AED', color: '#FFFFFF', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Account
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>
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
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 24px 0' }}>
              Profile Information
            </h2>

            <form onSubmit={handleProfileSave}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="name" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '14px', color: '#212529', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '14px', color: '#4B5563', backgroundColor: '#F7F8FA', boxSizing: 'border-box', cursor: 'not-allowed' }}
                />
                <p style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              {profileMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', fontWeight: 500, backgroundColor: profileMsg.type === 'success' ? '#ECFDF5' : '#FEF2F2', color: profileMsg.type === 'success' ? '#065F46' : '#991B1B', border: `1px solid ${profileMsg.type === 'success' ? '#A7F3D0' : '#FECACA'}` }}>
                  {profileMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                style={{ padding: '10px 20px', backgroundColor: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, textTransform: 'uppercase' }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Password Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 24px 0' }}>
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="new-password" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '14px', color: '#212529', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="confirm-password" style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  style={{ width: '100%', height: '48px', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '14px', color: '#212529', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                />
              </div>

              {passwordMsg && (
                <div style={{ padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', fontWeight: 500, backgroundColor: passwordMsg.type === 'success' ? '#ECFDF5' : '#FEF2F2', color: passwordMsg.type === 'success' ? '#065F46' : '#991B1B', border: `1px solid ${passwordMsg.type === 'success' ? '#A7F3D0' : '#FECACA'}` }}>
                  {passwordMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={passwordSaving}
                style={{ padding: '10px 20px', backgroundColor: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: passwordSaving ? 'not-allowed' : 'pointer', opacity: passwordSaving ? 0.6 : 1, textTransform: 'uppercase' }}
              >
                {passwordSaving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Subscription Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 24px 0' }}>
              Subscription Plan
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="font-display" style={{ fontSize: '20px', fontWeight: 700, color: '#212529' }}>
                {planLabels[planInfo?.plan || 'free'] || 'Free'}
              </span>
              <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.5px', backgroundColor: planInfo?.plan === 'free' ? '#FAFBFC' : 'rgba(0,105,151,0.06)', color: planInfo?.plan === 'free' ? '#4B5563' : '#6D28D9' }}>
                {planInfo?.plan === 'free' ? 'Free' : 'Active'}
              </span>
            </div>

            {planInfo?.grantedAt && (
              <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 8px 0' }}>
                Member since {new Date(planInfo.grantedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
            {planInfo?.expiresAt && (
              <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 16px 0' }}>
                Renews {new Date(planInfo.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <Link href="/pricing" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase' }}>
                {planInfo?.plan === 'free' ? 'Upgrade Plan' : 'Change Plan'}
              </Link>
              <Link href="/billing" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#FAFBFC', color: '#212529', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                Billing History
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 24px 0' }}>
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
                  style={{ display: 'block', padding: '16px', borderRadius: '6px', border: '1px solid #E5E7EB', textDecoration: 'none', transition: 'all 0.2s' }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#212529', marginBottom: '4px' }}>{link.label}</div>
                  <div style={{ fontSize: '12px', color: '#4B5563' }}>{link.desc}</div>
                </Link>
              ))}
            </div>
            <style>{`
              .quick-link-card:hover {
                border-color: #6D28D9;
                box-shadow: 0 2px 8px rgba(124, 58, 237, 0.12);
              }
            `}</style>
          </div>

          {/* Sign Out & Danger Zone */}
          <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' as const }}>
            <button
              onClick={handleSignOut}
              className="sign-out-btn"
              style={{ width: '100%', padding: '12px', backgroundColor: '#FAFBFC', color: '#212529', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Sign Out
            </button>
            <style>{`
              .sign-out-btn:hover {
                background-color: #f0f1f2;
                border-color: #C5C8CC;
              }
            `}</style>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '2px solid #7C3AED' }}>
              <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#7C3AED', margin: '0 0 16px 0' }}>
                Danger Zone
              </h2>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>
                To delete your account, contact{' '}
                <a href="mailto:support@mycasevalues.com" style={{ color: '#6D28D9', textDecoration: 'none' }}>support@mycasevalues.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
