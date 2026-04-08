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
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid #E5E7EB', borderTopColor: '#0966C3', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const hasData = reports.length > 0 || searches.length > 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA' }}>
      {/* Dark Navy Header */}
      <div style={{ backgroundColor: '#1C3A5E', padding: '40px 20px', marginBottom: '32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              My Reports
            </h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0966C3', color: '#FFFFFF', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
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

        {/* "All Reports Free During Beta" Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.08) 0%, rgba(21, 128, 61, 0.04) 100%)',
          border: '1px solid #059669',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#059669',
            margin: 0,
          }}>
            All Reports Free During Beta — Explore unlimited case research, settlement data, and judge analytics at no cost.
          </p>
        </div>

        {/* What's In a Report Section */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: '24px',
            fontFamily: 'var(--font-display)',
          }}>
            What's In a Report
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}>
            {[
              'Win Rate Analysis',
              'Settlement Range',
              'Case Duration',
              'Circuit Breakdown',
              'Judge Data',
              'Key Factors',
              'Historical Trends',
              'Outcome Distribution',
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center' as const,
                  transition: 'all 0.2s ease',
                }}
                className="feature-card"
              >
                <style>{`
                  .feature-card:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    border-color: #004182;
                  }
                `}</style>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(0, 105, 151, 0.08)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0f0f0f',
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Reports Section */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: '24px',
            fontFamily: 'var(--font-display)',
          }}>
            Popular Reports
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}>
            {[
              { name: 'Employment Discrimination', nos: '442' },
              { name: 'Personal Injury', nos: '360' },
              { name: 'Breach of Contract', nos: '190' },
              { name: 'Civil Rights', nos: '440' },
            ].map((report) => (
              <Link
                key={report.nos}
                href={`/cases/${encodeURIComponent(report.name)}`}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                className="report-link"
              >
                <style>{`
                  .report-link:hover {
                    border-color: #0966C3;
                    box-shadow: 0 8px 24px rgba(232, 23, 31, 0.12);
                    transform: translateY(-2px);
                  }
                `}</style>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#0f0f0f',
                      margin: '0 0 8px 0',
                      fontFamily: 'var(--font-display)',
                    }}>
                      {report.name}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#4B5563',
                      margin: 0,
                    }}>
                      Nature of Suit: {report.nos}
                    </p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {!hasData ? (
          /* Empty State */
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '64px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(0,105,151,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </div>
            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px 0' }}>
              No reports yet
            </h2>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 32px 0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
              Your saved case research reports and search history will appear here. Start by running a case lookup.
            </p>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#0966C3', color: '#FFFFFF', borderRadius: '20px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase' }}>
              Start a Case Lookup
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '4px', border: '1px solid #E5E7EB' }}>
              {(['reports', 'history'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: tab === t ? '#0966C3' : 'transparent',
                    color: tab === t ? '#FFFFFF' : '#4B5563',
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
                    border-left: 4px solid #0966C3;
                    box-shadow: 0 4px 12px rgba(232, 23, 31, 0.12);
                  }
                `}</style>
                {reports.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '40px', border: '1px solid #E5E7EB', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <p style={{ fontSize: '14px', color: '#4B5563' }}>No saved reports yet. Reports are saved automatically when you view case data.</p>
                  </div>
                ) : (
                  reports.map((r) => (
                    <Link
                      key={r.id}
                      href={`/cases/${encodeURIComponent(r.category)}${r.district ? `?district=${encodeURIComponent(r.district)}` : ''}`}
                      className="report-card"
                      style={{ display: 'block', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px 24px', border: '1px solid #E5E7EB', borderLeft: '4px solid transparent', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', marginBottom: '4px' }}>
                            {r.category}
                          </div>
                          {r.district && (
                            <div style={{ fontSize: '13px', color: '#4B5563' }}>
                              District: {r.district}
                            </div>
                          )}
                        </div>
                        <div className="font-mono" style={{ fontSize: '12px', color: '#4B5563' }}>
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
                    border-left: 4px solid #0966C3;
                    box-shadow: 0 4px 12px rgba(232, 23, 31, 0.12);
                  }
                `}</style>
                {searches.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '40px', border: '1px solid #E5E7EB', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <p style={{ fontSize: '14px', color: '#4B5563' }}>No search history yet.</p>
                  </div>
                ) : (
                  searches.map((s) => (
                    <div
                      key={s.id}
                      className="history-card"
                      style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px 24px', border: '1px solid #E5E7EB', borderLeft: '4px solid transparent', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#0f0f0f' }}>
                            {s.query}
                          </div>
                          {s.category && (
                            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
                              {s.category}
                            </div>
                          )}
                        </div>
                        <div className="font-mono" style={{ fontSize: '12px', color: '#4B5563' }}>
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
