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

type SavedReport = {
  id: number;
  category: string;
  district: string | null;
  viewed_at: string;
};

type SearchEntry = {
  id: number;
  query: string;
  category: string | null;
  searched_at: string;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [searches, setSearches] = useState<SearchEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'reports' | 'history'>('reports');

  useEffect(() => {
    async function load() {
      const { data: { user } } = await getSupabase().auth.getUser();
      if (!user?.email) {
        setLoading(false);
        return;
      }

      const [reportsRes, searchRes] = await Promise.all([
        getSupabase()
          .from('saved_reports')
          .select('*')
          .eq('user_email', user.email)
          .order('viewed_at', { ascending: false })
          .limit(50),
        getSupabase()
          .from('search_history')
          .select('*')
          .eq('user_email', user.email)
          .order('searched_at', { ascending: false })
          .limit(50),
      ]);

      setReports(reportsRes.data || []);
      setSearches(searchRes.data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid #E5E7EB', borderTopColor: '#8B5CF6', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const hasData = reports.length > 0 || searches.length > 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: '#111111', margin: '0 0 8px 0' }}>
            My Reports
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
            Your saved case reports and search history
          </p>
        </div>

        {!hasData ? (
          /* Empty State */
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '64px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </div>
            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: '#111111', margin: '0 0 12px 0' }}>
              No reports yet
            </h2>
            <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6, margin: '0 0 32px 0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
              Your saved case research reports and search history will appear here. Start by running a case lookup.
            </p>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#8B5CF6', color: '#FFFFFF', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              Start a Case Lookup
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '4px', border: '1px solid #E5E7EB' }}>
              {(['reports', 'history'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: tab === t ? '#8B5CF6' : 'transparent',
                    color: tab === t ? '#FFFFFF' : '#6B7280',
                    transition: 'all 0.2s',
                  }}
                >
                  {t === 'reports' ? `Saved Reports (${reports.length})` : `Search History (${searches.length})`}
                </button>
              ))}
            </div>

            {/* Reports Tab */}
            {tab === 'reports' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reports.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '40px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>No saved reports yet. Reports are saved automatically when you view case data.</p>
                  </div>
                ) : (
                  reports.map((r) => (
                    <Link
                      key={r.id}
                      href={`/cases/${encodeURIComponent(r.category)}${r.district ? `?district=${encodeURIComponent(r.district)}` : ''}`}
                      style={{ display: 'block', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px 24px', border: '1px solid #E5E7EB', textDecoration: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: '#111111', marginBottom: '4px' }}>
                            {r.category}
                          </div>
                          {r.district && (
                            <div style={{ fontSize: '13px', color: '#6B7280' }}>
                              District: {r.district}
                            </div>
                          )}
                        </div>
                        <div className="font-mono" style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          {new Date(r.viewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            {/* History Tab */}
            {tab === 'history' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {searches.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '40px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#6B7280' }}>No search history yet.</p>
                  </div>
                ) : (
                  searches.map((s) => (
                    <div
                      key={s.id}
                      style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px 24px', border: '1px solid #E5E7EB' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#111111' }}>
                            {s.query}
                          </div>
                          {s.category && (
                            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                              {s.category}
                            </div>
                          )}
                        </div>
                        <div className="font-mono" style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          {new Date(s.searched_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
