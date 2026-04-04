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
      <div style={{ minHeight: '100vh', backgroundColor: '#EDEEEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid #D5D8DC', borderTopColor: '#E8171F', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const hasData = reports.length > 0 || searches.length > 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDEEEE' }}>
      {/* Dark Navy Header */}
      <div style={{ backgroundColor: '#00172E', padding: '40px 20px', marginBottom: '32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              My Reports
            </h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8171F', color: '#FFFFFF', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
              Reports
            </div>
          </div>
          <p style={{ fontSize: '14px', color: '#FFFFFF', margin: '0 0 16px 0', opacity: 0.9 }}>
            Your saved case reports and search history
          </p>
          {/* Breadcrumb */}
          <div style={{ fontSize: '12px', color: '#FFFFFF', opacity: 0.7 }}>
            <Link href="/" style={{ color: '#FFFFFF', textDecoration: 'none', opacity: 0.7 }}>Home</Link>
            {' > '}
            <Link href="/dashboard" style={{ color: '#FFFFFF', textDecoration: 'none', opacity: 0.7 }}>Dashboard</Link>
            {' > '}
            <span>Reports</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

        {!hasData ? (
          /* Empty State */
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '64px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #D5D8DC', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '4px', background: 'rgba(0,105,151,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </div>
            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 700, color: '#212529', margin: '0 0 12px 0' }}>
              No reports yet
            </h2>
            <p style={{ fontSize: '15px', color: '#455A64', lineHeight: 1.6, margin: '0 0 32px 0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
              Your saved case research reports and search history will appear here. Start by running a case lookup.
            </p>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#E8171F', color: '#FFFFFF', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase' }}>
              Start a Case Lookup
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '4px', border: '1px solid #D5D8DC' }}>
              {(['reports', 'history'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: tab === t ? '#E8171F' : 'transparent',
                    color: tab === t ? '#FFFFFF' : '#455A64',
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
                <style>{`
                  .report-card {
                    transition: all 0.2s;
                  }
                  .report-card:hover {
                    border-left: 4px solid #E8171F;
                    box-shadow: 0 4px 12px rgba(232, 23, 31, 0.12);
                  }
                `}</style>
                {reports.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '40px', border: '1px solid #D5D8DC', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <p style={{ fontSize: '14px', color: '#455A64' }}>No saved reports yet. Reports are saved automatically when you view case data.</p>
                  </div>
                ) : (
                  reports.map((r) => (
                    <Link
                      key={r.id}
                      href={`/cases/${encodeURIComponent(r.category)}${r.district ? `?district=${encodeURIComponent(r.district)}` : ''}`}
                      className="report-card"
                      style={{ display: 'block', backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '20px 24px', border: '1px solid #D5D8DC', borderLeft: '4px solid transparent', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: '#212529', marginBottom: '4px' }}>
                            {r.category}
                          </div>
                          {r.district && (
                            <div style={{ fontSize: '13px', color: '#455A64' }}>
                              District: {r.district}
                            </div>
                          )}
                        </div>
                        <div className="font-mono" style={{ fontSize: '12px', color: '#455A64' }}>
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
                <style>{`
                  .history-card {
                    transition: all 0.2s;
                  }
                  .history-card:hover {
                    border-left: 4px solid #E8171F;
                    box-shadow: 0 4px 12px rgba(232, 23, 31, 0.12);
                  }
                `}</style>
                {searches.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '40px', border: '1px solid #D5D8DC', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <p style={{ fontSize: '14px', color: '#455A64' }}>No search history yet.</p>
                  </div>
                ) : (
                  searches.map((s) => (
                    <div
                      key={s.id}
                      className="history-card"
                      style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '16px 24px', border: '1px solid #D5D8DC', borderLeft: '4px solid transparent', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#212529' }}>
                            {s.query}
                          </div>
                          {s.category && (
                            <div style={{ fontSize: '12px', color: '#455A64', marginTop: '2px' }}>
                              {s.category}
                            </div>
                          )}
                        </div>
                        <div className="font-mono" style={{ fontSize: '12px', color: '#455A64' }}>
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
