'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReferralDashboard from './ReferralDashboard';

type Tab = 'overview' | 'history' | 'saved' | 'alerts' | 'account';

interface DashboardTabsProps {
  userEmail: string;
  userId?: string;
  memberSince: string;
  planLabel: string;
  reportsCount: number;
  savedCount: number;
  alertsCount: number;
  recentActivity: { label: string; time: string; link: string }[];
  searchHistory: { query: string; category: string | null; searched_at: string }[];
  savedReports: { category: string; district: string; viewed_at: string }[];
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: '' },
  { key: 'history', label: 'Research History', icon: '' },
  { key: 'saved', label: 'Saved Reports', icon: '' },
  { key: 'alerts', label: 'Alerts', icon: '' },
  { key: 'account', label: 'Account', icon: '' },
];

export default function DashboardTabs({
  userEmail, userId, memberSince, planLabel, reportsCount, savedCount, alertsCount,
  recentActivity, searchHistory, savedReports,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [historySearch, setHistorySearch] = useState('');
  const [historyPage, setHistoryPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const userName = userEmail.split('@')[0] || 'User';

  // Filter search history
  const filteredHistory = searchHistory.filter(h =>
    !historySearch || (h.query + (h.category || '')).toLowerCase().includes(historySearch.toLowerCase())
  );
  const historyPages = Math.ceil(filteredHistory.length / 20);
  const pagedHistory = filteredHistory.slice(historyPage * 20, (historyPage + 1) * 20);

  // Mock API key
  const apiKey = `mcv_${btoa(userEmail).slice(0, 24)}...`;
  const referralLink = `https://mycasevalues.com/ref/${btoa(userEmail).slice(0, 8)}`;

  const tabStyle = (key: Tab): React.CSSProperties => ({
    padding: '10px 18px', borderRadius: '10px', border: 'none',
    background: activeTab === key ? '#0966C3' : 'transparent',
    color: activeTab === key ? '#FFF' : '#4B5563',
    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
    fontFamily: 'var(--font-body)', transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', gap: 6,
  });

  const cardStyle: React.CSSProperties = {
    background: '#FFF', borderRadius: '12px', padding: '24px',
    border: '1px solid #E5E7EB',
  };

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: '#FFF', borderRadius: '12px', padding: '4px', border: '1px solid #E5E7EB', marginBottom: 24, flexWrap: 'wrap' }}>
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={tabStyle(tab.key)}>
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Welcome */}
          <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1C3A5E 0%, #003366 100%)', color: '#FFF', border: 'none' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 4px', fontFamily: 'var(--font-display)' }}>
              Welcome back, {userName}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              {planLabel} · Member since {memberSince}
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { label: 'Reports Generated', value: reportsCount, color: '#0966C3' },
              { label: 'Saved Reports', value: savedCount, color: '#057642' },
              { label: 'Active Alerts', value: alertsCount, color: '#D97706' },
            ].map(stat => (
              <div key={stat.label} style={{ ...cardStyle, textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 600, color: stat.color, fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#4B5563', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { label: 'Search Cases', href: '/search', icon: '' },
              { label: 'Calculator', href: '/calculator', icon: '' },
              { label: 'Attorney Tools', href: '/attorney', icon: '' },
              { label: 'Set Alerts', href: '#', icon: '' },
            ].map(action => (
              <Link key={action.label} href={action.href} style={{ textDecoration: 'none' }}>
                <div style={{ ...cardStyle, textAlign: 'center', padding: '16px', cursor: 'pointer' }}>
                  <div style={{ fontSize: '24px', marginBottom: 6 }}>{action.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f' }}>{action.label}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>Recent Activity</h3>
            {recentActivity.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {recentActivity.slice(0, 5).map((a, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < Math.min(recentActivity.length, 5) - 1 ? '1px solid #E5E7EB' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href={a.link} style={{ fontSize: '13px', color: '#0966C3', textDecoration: 'none', fontWeight: 500 }}>{a.label}</Link>
                    <span style={{ fontSize: '11px', color: '#4B5563', fontFamily: 'var(--font-mono)' }}>{a.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#4B5563', margin: 0 }}>No recent activity yet. Start by searching for a case type.</p>
            )}
          </div>
        </div>
      )}

      {/* RESEARCH HISTORY TAB */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-display)' }}>Research History</h3>
            <input
              type="text"
              placeholder="Search history..."
              value={historySearch}
              onChange={e => { setHistorySearch(e.target.value); setHistoryPage(0); }}
              style={{ padding: '8px 14px', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '13px', width: 200, fontFamily: 'var(--font-body)' }}
            />
          </div>

          {pagedHistory.length > 0 ? (
            <div style={cardStyle}>
              {pagedHistory.map((h, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: i < pagedHistory.length - 1 ? '1px solid #E5E7EB' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f' }}>{h.query}</div>
                    {h.category && <div style={{ fontSize: '11px', color: '#4B5563' }}>{h.category}</div>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '11px', color: '#4B5563', fontFamily: 'var(--font-mono)' }}>
                      {new Date(h.searched_at).toLocaleDateString()}
                    </span>
                    <Link href={`/search?q=${encodeURIComponent(h.query)}`} style={{ fontSize: '12px', color: '#0966C3', textDecoration: 'none', fontWeight: 600, padding: '4px 10px', background: '#EDF3FB', borderRadius: 6 }}>
                      Search Again
                    </Link>
                  </div>
                </div>
              ))}
              {historyPages > 1 && (
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                  {Array.from({ length: historyPages }).map((_, p) => (
                    <button key={p} onClick={() => setHistoryPage(p)} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: historyPage === p ? '#0966C3' : '#E5E7EB', color: historyPage === p ? '#FFF' : '#4B5563', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                      {p + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '40px' }}>
              <p style={{ fontSize: '14px', color: '#4B5563' }}>No search history yet.</p>
            </div>
          )}
        </div>
      )}

      {/* SAVED REPORTS TAB */}
      {activeTab === 'saved' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...cardStyle }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>Saved Reports</h3>
            {savedReports.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {savedReports.map((r, i) => (
                  <div key={i} style={{ padding: '16px', background: '#FAFBFC', borderRadius: 10, border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', marginBottom: 4 }}>{r.category}</div>
                    {r.district && <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: 8 }}>{r.district}</div>}
                    <div style={{ fontSize: '11px', color: '#4B5563', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                      Saved {new Date(r.viewed_at).toLocaleDateString()}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Link href={`/nos/${r.category}`} style={{ fontSize: '12px', color: '#FFF', background: '#0966C3', padding: '4px 12px', borderRadius: 6, textDecoration: 'none', fontWeight: 600 }}>View</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: '#4B5563', textAlign: 'center', padding: '24px 0' }}>No saved reports yet. Bookmark NOS report pages and district pages to save them here.</p>
            )}
          </div>
        </div>
      )}

      {/* ALERTS TAB */}
      {activeTab === 'alerts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-display)' }}>Docket Monitoring Alerts</h3>
              <span style={{ fontSize: '12px', color: '#4B5563' }}>0 / 10 active (beta limit)</span>
            </div>
            <div style={{ padding: '32px', textAlign: 'center', background: '#FAFBFC', borderRadius: 10, border: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: 16 }}>No active alerts. Set up monitoring for case numbers, case types, or judge assignments.</p>
              <div style={{ background: '#EDF3FB', borderRadius: 10, padding: '20px', maxWidth: 400, margin: '0 auto' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#004182', marginBottom: 10 }}>New Alert</p>
                <input
                  type="text"
                  placeholder="Enter case number, e.g. 1:24-cv-01234"
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: '13px', marginBottom: 8, boxSizing: 'border-box' as const }}
                />
                <button style={{ width: '100%', padding: '10px', background: '#0966C3', color: '#FFF', border: 'none', borderRadius: 8, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Create Alert
                </button>
              </div>
            </div>
          </div>

          {/* Recent Triggered Events */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>Recent Alert Events</h3>
            <p style={{ fontSize: '13px', color: '#4B5563', margin: 0 }}>No triggered events yet. Events will appear here when a monitored case has new docket activity.</p>
          </div>
        </div>
      )}

      {/* ACCOUNT TAB */}
      {activeTab === 'account' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Profile */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>Profile</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '13px', color: '#4B5563' }}>Email</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f' }}>{userEmail}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '13px', color: '#4B5563' }}>Plan</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0966C3' }}>{planLabel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span style={{ fontSize: '13px', color: '#4B5563' }}>Member Since</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f' }}>{memberSince}</span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>Preferences</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '13px', color: '#0f0f0f' }}>Language</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #0966C3', background: '#EDF3FB', color: '#004182', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>English</button>
                <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#FFF', color: '#4B5563', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Español</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
              <span style={{ fontSize: '13px', color: '#0f0f0f' }}>Weekly Digest Email</span>
              <button
                onClick={() => setWeeklyDigest(!weeklyDigest)}
                style={{
                  width: 44, height: 24, borderRadius: 12, border: 'none',
                  background: weeklyDigest ? '#0966C3' : '#E5E7EB',
                  position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#FFF',
                  position: 'absolute', top: 3,
                  left: weeklyDigest ? 23 : 3,
                  transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </button>
            </div>
          </div>

          {/* API Key */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>API Access</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#FAFBFC', borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <code style={{ flex: 1, fontSize: '13px', color: '#0f0f0f', fontFamily: 'var(--font-mono)' }}>{apiKey}</code>
              <button
                onClick={() => { navigator.clipboard.writeText(apiKey); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                style={{ padding: '6px 12px', background: copied ? '#057642' : '#0966C3', color: '#FFF', border: 'none', borderRadius: 8, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button style={{ marginTop: 10, padding: '8px 16px', background: '#FFF', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: '12px', color: '#4B5563', cursor: 'pointer', fontWeight: 600 }}>
              Regenerate Key
            </button>
          </div>

          {/* Referral Program */}
          {userId && <ReferralDashboard userId={userId} userEmail={userEmail} />}

          {/* Danger Zone */}
          <div style={{ ...cardStyle, borderColor: '#FECACA' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#CC1016', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>Danger Zone</h3>
            <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: 12 }}>Permanently delete your account and all associated data. This action cannot be undone.</p>
            {!showDeleteConfirm ? (
              <button onClick={() => setShowDeleteConfirm(true)} style={{ padding: '10px 20px', background: '#FFF', border: '1px solid #CC1016', borderRadius: 8, fontSize: '13px', color: '#CC1016', fontWeight: 600, cursor: 'pointer' }}>
                Delete Account
              </button>
            ) : (
              <div style={{ padding: '16px', background: '#FEF0EF', borderRadius: 10, border: '1px solid #CC1016' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#CC1016', marginBottom: 10 }}>Are you sure? This will permanently delete all your data.</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ padding: '8px 16px', background: '#CC1016', color: '#FFF', border: 'none', borderRadius: 8, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Yes, Delete Everything
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: '8px 16px', background: '#FFF', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: '13px', color: '#4B5563', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sign Out */}
          <button
            onClick={async () => {
              const { getSupabase } = await import('../lib/supabase');
              await getSupabase().auth.signOut();
              window.location.href = '/';
            }}
            style={{ width: '100%', padding: '12px', background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', fontWeight: 600, color: '#4B5563', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
