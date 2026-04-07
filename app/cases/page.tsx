'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { ArrowRightIcon, SearchIcon } from '../../components/ui/Icons';
import DataFreshness from '../../components/DataFreshness';
import { StaggerGrid, StaggerItem } from '../../components/motion';
import { SITE_URL } from '../../lib/site-config';
import ConfidenceDot from '../../components/ConfidenceDot';

// Pre-compute aggregate stats for each category
function getCategoryStats(categoryId: string, opts: { nos: string }[]): { totalCases: number; avgWinRate: number; avgSettlement: number; avgDuration: number } {
  let total = 0, wrSum = 0, spSum = 0, moSum = 0, count = 0;
  const seen = new Set<string>();
  for (const opt of opts) {
    if (seen.has(opt.nos)) continue;
    seen.add(opt.nos);
    const rd = REAL_DATA[opt.nos];
    if (!rd || !rd.total) continue;
    total += rd.total;
    wrSum += rd.wr || 0;
    spSum += rd.sp || 0;
    moSum += rd.mo || 0;
    count++;
  }
  return {
    totalCases: total,
    avgWinRate: count > 0 ? Math.round(wrSum / count) : 0,
    avgSettlement: count > 0 ? Math.round(spSum / count) : 0,
    avgDuration: count > 0 ? Math.round(moSum / count) : 0,
  };
}

// Compute platform-wide statistics
function getPlatformStats(): { totalCases: number; totalNOS: number; totalCategories: number; avgWinRate: number } {
  let totalCases = 0, totalWR = 0, nosSet = new Set<string>();
  for (const cat of SITS) {
    for (const opt of cat.opts) {
      const rd = REAL_DATA[opt.nos];
      if (rd && rd.total) {
        totalCases += rd.total;
        totalWR += rd.wr || 0;
        nosSet.add(opt.nos);
      }
    }
  }
  return {
    totalCases,
    totalNOS: nosSet.size,
    totalCategories: SITS.length,
    avgWinRate: nosSet.size > 0 ? Math.round(totalWR / nosSet.size) : 0,
  };
}

// Get top 10 most-filed case types
function getTopFiledCaseTypes(): Array<{ nos: string; label: string; total: number; categoryLabel: string }> {
  const cases: Array<{ nos: string; label: string; total: number; categoryLabel: string }> = [];
  for (const cat of SITS) {
    for (const opt of cat.opts) {
      const rd = REAL_DATA[opt.nos];
      if (rd && rd.total) {
        cases.push({ nos: opt.nos, label: opt.label, total: rd.total, categoryLabel: cat.label });
      }
    }
  }
  return cases.sort((a, b) => b.total - a.total).slice(0, 10);
}

// Get top 10 highest win rate case types
function getTopWinRateCaseTypes(): Array<{ nos: string; label: string; wr: number; categoryLabel: string; total: number }> {
  const cases: Array<{ nos: string; label: string; wr: number; categoryLabel: string; total: number }> = [];
  for (const cat of SITS) {
    for (const opt of cat.opts) {
      const rd = REAL_DATA[opt.nos];
      if (rd && rd.total && rd.wr) {
        cases.push({ nos: opt.nos, label: opt.label, wr: rd.wr, categoryLabel: cat.label, total: rd.total });
      }
    }
  }
  return cases.sort((a, b) => b.wr - a.wr).slice(0, 10);
}

// Get color for win rate — matches lib/color-scale.ts palette
function getWinRateColor(wr: number): string {
  if (wr >= 65) return '#057642';
  if (wr >= 50) return '#0A66C2';
  if (wr >= 35) return '#C37D16';
  if (wr >= 20) return '#CC1016';
  return '#8C1515';
}

function getWinRateBg(wr: number): string {
  if (wr >= 65) return '#E8F3EB';
  if (wr >= 50) return '#EDF3FB';
  if (wr >= 35) return '#FDF4EC';
  if (wr >= 20) return '#FEF0EF';
  return '#FAEAE9';
}

function getWinRateLabel(wr: number): string {
  if (wr >= 65) return 'Strong';
  if (wr >= 50) return 'Favorable';
  if (wr >= 35) return 'Moderate';
  if (wr >= 20) return 'Challenging';
  return 'Difficult';
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Federal Court Case Categories',
  description: 'Browse federal court outcome data across 10 major case types.',
  url: `${SITE_URL}/cases`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Categories', item: `${SITE_URL}/cases` },
    ],
  },
};

export default function CasesIndexPage() {
  const [search, setSearch] = useState('');

  const platformStats = getPlatformStats();
  const topFiledCases = getTopFiledCaseTypes();
  const topWinRateCases = getTopWinRateCaseTypes();
  const maxCases = Math.max(...topFiledCases.map(c => c.total));

  const filtered = SITS.filter(cat =>
    cat.label.toLowerCase().includes(search.toLowerCase()) ||
    cat.sub.toLowerCase().includes(search.toLowerCase()) ||
    cat.opts.some(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', background: 'rgba(255,255,255,0.1)', color: '#0A66C2' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            CASE TYPES
          </div>
          <h1 className="font-display" style={{ fontSize: 44, fontWeight: 600, color: '#FFFFFF', margin: '0 0 16px', letterSpacing: '-0.5px' }}>
            Case Categories
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6, maxWidth: 600 }}>
            Research real federal court outcomes across 10 major case types. Explore win rates, settlements, timelines, and recovery data from 5.1M+ public cases.
          </p>
        </div>
      </div>

      {/* Platform Statistics Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <DataFreshness />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 28, fontWeight: 600, color: '#1B3A5C', marginBottom: 4 }}>
              {platformStats.totalCases.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Cases Analyzed
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 28, fontWeight: 600, color: '#004182', marginBottom: 4 }}>
              {platformStats.totalNOS}
            </div>
            <div style={{ fontSize: 12, color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              NOS Code Types
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 28, fontWeight: 600, color: '#1B3A5C', marginBottom: 4 }}>
              {platformStats.totalCategories}
            </div>
            <div style={{ fontSize: 12, color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Case Categories
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 28, fontWeight: 600, color: getWinRateColor(platformStats.avgWinRate), marginBottom: 4 }}>
              {platformStats.avgWinRate}%
            </div>
            <div style={{ fontSize: 12, color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Average Win Rate
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', marginBottom: '32px' }}>
          <div
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon size={20} color="#4B5563" />
          </div>
          <input
            type="text"
            placeholder="Search case types... (e.g. wrongful termination, medical malpractice)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search case types"
            style={{
              width: '100%',
              height: '56px',
              padding: '12px 16px 12px 48px',
              fontSize: '15px',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              background: '#FFFFFF',
              color: '#0f0f0f',
              fontFamily: 'var(--font-body)',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              outline: 'none',
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#0A66C2';
              (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(10, 102, 194, 0.08)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#E5E7EB';
              (e.target as HTMLInputElement).style.boxShadow = 'none';
            }}
          />
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .cat-card {
            background: #FFFFFF;
            border: 1px solid #E0DDD8;
            border-radius: 8px;
            padding: 32px;
            transition: border-color 150ms ease, box-shadow 150ms ease;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .cat-card:hover {
            border-color: #0A66C2;
            box-shadow: 0 0 0 1px #0A66C2;
          }
          .cat-card-arrow {
            color: #0A66C2;
            transition: transform 0.2s ease;
            margin-left: auto;
          }
          .cat-card:hover .cat-card-arrow {
            transform: translateX(4px);
          }
          .clear-search-btn:hover {
            background: #FAFBFC;
            border-color: #B5B9BD;
          }
          .cta-link:hover {
            background: #B91C1C;
            box-shadow: none;
            transform: translateY(-2px);
          }
          .stat-bar {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            height: 8px;
            width: 100%;
            overflow: hidden;
            margin-top: 8px;
          }
          .stat-bar-fill {
            height: 100%;
            background: #004182;
            transition: width 0.3s ease;
          }
          .quick-link-card {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            transition: all 0.2s ease;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .quick-link-card:hover {
            border-color: #0A66C2;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }
        `}} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: 18, color: '#4B5563', fontFamily: 'var(--font-body)' }}>
              No case types match &ldquo;{search}&rdquo;
            </p>
            <button
              onClick={() => setSearch('')}
              className="clear-search-btn"
              style={{
                marginTop: 16,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid #E5E7EB',
                borderRadius: 4,
                background: '#FFFFFF',
                color: '#0f0f0f',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
              }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((category) => {
              const catStats = getCategoryStats(category.id, category.opts);
              return (
                <StaggerItem key={category.id}>
                <Link href={`/cases/${category.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="cat-card">
                    <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                      {category.label}
                    </h2>
                    <p style={{ fontSize: 14, color: '#4B5563', margin: 0, lineHeight: 1.5, marginBottom: 16 }}>{category.sub}</p>

                    {/* Inline Stats */}
                    {catStats.totalCases > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 'auto', padding: '12px 0' }}>
                        <div>
                          <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: '#004182' }}>{catStats.totalCases.toLocaleString()}</div>
                          <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 500 }}>Total Cases</div>
                        </div>
                        <div>
                          <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: getWinRateColor(catStats.avgWinRate), display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {catStats.avgWinRate}%
                            <ConfidenceDot n={catStats.totalCases} />
                          </div>
                          <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 500 }}>Avg Win Rate</div>
                        </div>
                        <div>
                          <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: '#0f0f0f' }}>{catStats.avgSettlement}%</div>
                          <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 500 }}>Settlement Rate</div>
                        </div>
                        <div>
                          <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: '#0f0f0f' }}>{catStats.avgDuration}mo</div>
                          <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 500 }}>Avg Duration</div>
                        </div>
                      </div>
                    )}

                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #E0DDD8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {catStats.avgWinRate > 0 && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: getWinRateColor(catStats.avgWinRate), background: getWinRateBg(catStats.avgWinRate), border: `1px solid ${getWinRateColor(catStats.avgWinRate)}`, borderRadius: '4px', padding: '2px 8px' }}>
                          {catStats.avgWinRate}% · {getWinRateLabel(catStats.avgWinRate)}
                        </span>
                      )}
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#666666', marginLeft: 'auto' }}>
                        {catStats.totalCases > 0 ? catStats.totalCases.toLocaleString() : ''} cases
                      </span>
                    </div>
                  </div>
                </Link>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        )}

        {/* Most-Filed Case Types Section */}
        {filtered.length !== 0 && topFiledCases.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: '#0f0f0f', marginBottom: 32, letterSpacing: '-0.3px' }}>
              Most-Filed Case Types
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {topFiledCases.map((caseType, idx) => (
                <Link key={caseType.nos} href={`/cases/${caseType.categoryLabel.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: '40px 1fr 120px', gap: 16, alignItems: 'center', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: '#1B3A5C' }}>
                      #{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', marginBottom: 2 }}>
                        {caseType.label}
                      </div>
                      <div style={{ fontSize: 12, color: '#4B5563' }}>
                        {caseType.categoryLabel}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: '#004182' }}>
                        {caseType.total.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 500 }}>Cases</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Highest Win Rate Case Types Section */}
        {filtered.length !== 0 && topWinRateCases.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: '#0f0f0f', marginBottom: 32, letterSpacing: '-0.3px' }}>
              Highest Win Rate Case Types
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {topWinRateCases.map((caseType) => (
                <Link key={caseType.nos} href={`/cases/${caseType.categoryLabel.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: 20, height: '100%', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                    <div style={{ fontSize: 14, color: '#4B5563', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>
                      {caseType.categoryLabel}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#0f0f0f', marginBottom: 16 }}>
                      {caseType.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                      <div className="font-mono" style={{ fontSize: 32, fontWeight: 600, color: getWinRateColor(caseType.wr) }}>
                        {caseType.wr}%
                      </div>
                      <div style={{ fontSize: 12, color: '#4B5563' }}>Win Rate</div>
                    </div>
                    <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 500 }}>
                      {caseType.total.toLocaleString()} cases analyzed
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links Section */}
        {filtered.length !== 0 && (
          <div style={{ marginTop: 80, marginBottom: 40 }}>
            <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: '#0f0f0f', marginBottom: 32, letterSpacing: '-0.3px' }}>
              Quick Links
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <Link href="/search" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#0f0f0f' }}>Search Cases</div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>Find outcomes by keyword</div>
                </div>
              </Link>

              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                    <path d="M8 6h8M8 10h8M8 14h8M8 18h8"></path>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#0f0f0f' }}>Estimate Value</div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>Calculate case value</div>
                </div>
              </Link>

              <Link href="/compare" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2">
                    <path d="M12 3v18M3 9h6M15 9h6M3 15h6M15 15h6"></path>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#0f0f0f' }}>Compare Cases</div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>Side-by-side analysis</div>
                </div>
              </Link>

              <Link href="/trends" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#0f0f0f' }}>View Trends</div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>Win rate trends</div>
                </div>
              </Link>

              <Link href="/map" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#0f0f0f' }}>Circuit Map</div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>By court circuit</div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px', letterSpacing: '-0.3px' }}>
            Ready to research your case?
          </h2>
          <p style={{ fontSize: 18, color: '#4B5563', margin: '0 0 32px', lineHeight: 1.6 }}>
            Start with our interactive research tool to find real outcome data for cases like yours.
          </p>
          <a href="/cases" className="cta-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', padding: '0 40px', background: '#0A66C2', color: '#FFFFFF', borderRadius: '12px', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-display)', textDecoration: 'none', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)', textTransform: 'uppercase', letterSpacing: '0.04em', gap: '8px' }}>
            Start Researching
            <ArrowRightIcon size={14} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#F7F8FA', color: '#4B5563', padding: '40px 20px', fontSize: 14, lineHeight: 1.6, borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ margin: 0 }}>
            <strong>Legal Disclaimer:</strong> This data is for research purposes only and is not legal advice. MyCaseValue provides historical federal court outcome data from public records. This does not constitute a prediction of any case outcome. Consult a qualified attorney for legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
          </p>
        </div>
      </div>
    </div>
  );
}
