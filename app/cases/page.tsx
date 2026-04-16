'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { ArrowRightIcon, SearchIcon } from '../../components/ui/Icons';
import DataFreshness from '../../components/DataFreshness';
import { StaggerGrid, StaggerItem } from '../../components/motion';
import TrendSparkline from '../../components/charts/TrendSparkline';
import { SITE_URL } from '../../lib/site-config';
import ConfidenceDot from '../../components/ConfidenceDot';
import SaveButton from '../../components/ui/SaveButton';

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
  if (wr >= 50) return '#0052CC';
  if (wr >= 35) return '#C37D16';
  if (wr >= 20) return '#CC1016';
  return '#8C1515';
}

function getWinRateBg(wr: number): string {
  if (wr >= 65) return 'rgba(34,197,94,0.1)';
  if (wr >= 50) return 'rgba(59,130,246,0.08)';
  if (wr >= 35) return 'rgba(234,179,8,0.1)';
  if (wr >= 20) return 'rgba(239,68,68,0.08)';
  return 'rgba(239,68,68,0.06)';
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
  name: 'Federal Court Case Analytics',
  description: 'Browse federal court outcome data across 10 major case types.',
  url: `${SITE_URL}/cases`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Analytics', item: `${SITE_URL}/cases` },
    ],
  },
};

export default function CasesIndexPage() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const router = useRouter();

  const platformStats = getPlatformStats();
  const topFiledCases = getTopFiledCaseTypes();
  const topWinRateCases = getTopWinRateCaseTypes();
  const filtered = SITS.filter(cat =>
    cat.label.toLowerCase().includes(search.toLowerCase()) ||
    cat.sub.toLowerCase().includes(search.toLowerCase()) ||
    cat.opts.some(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelectCategory = (categoryId: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
    } else if (newSelected.size < 3) {
      newSelected.add(categoryId);
    }
    setSelectedCategories(newSelected);
  };

  const handleCompare = () => {
    const categoryIds = Array.from(selectedCategories).join(',');
    router.push(`/compare?categories=${categoryIds}`);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <div style={{
        background: '#FFFFFF',
        padding: '28px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #E0E0E0',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 12,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#0052CC',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: '#15803D' }} />
            Case Intelligence
          </div>
          <h1 className="font-inter" style={{
            fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: 700,
            color: '#1A1A1A', margin: '0 0 10px', letterSpacing: '-0.025em', lineHeight: 1.1,
          }}>
            Federal Case Analytics
          </h1>
          <p style={{
            fontSize: 15, color: '#666666', margin: 0, lineHeight: 1.6, maxWidth: 640,
            fontFamily: 'var(--font-inter)',
          }}>
            Outcome data and litigation intelligence across 84 federal case types. Win rates, settlements, and duration benchmarks from 5.1M+ cases.
          </p>
        </div>
      </div>

      {/* Platform Statistics Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-default)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <DataFreshness />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          <div>
            <div className="font-mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
              {platformStats.totalCases.toLocaleString()}
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Cases Analyzed
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 22, fontWeight: 600, color: '#CC5200', marginBottom: 4 }}>
              {platformStats.totalNOS}
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              NOS Code Types
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
              {platformStats.totalCategories}
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Case Analytics
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
              55+
            </div>
            <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Years of Data
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', marginBottom: '24px' }}>
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
            <SearchIcon size={20} color="var(--color-text-secondary)" />
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
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              background: '#FFFFFF',
              color: '#1A1A1A',
              fontFamily: 'var(--font-inter)',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              outline: 'none',
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--accent-primary)';
              (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(10, 102, 194, 0.08)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-default)';
              (e.target as HTMLInputElement).style.boxShadow = 'none';
            }}
          />
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .cat-card {
            background: #FFFFFF;
            border: 1px solid var(--border-default);
            border-radius: var(--radius-md);
            padding: 32px;
            transition: border-color 150ms ease, box-shadow 150ms ease;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .cat-card:hover {
            border-color: #0052CC;
            box-shadow: 0 0 0 1px #0052CC;
          }
          .cat-card-arrow {
            color: #E65C00;
            transition: transform 0.2s ease;
            margin-left: auto;
          }
          .cat-card:hover .cat-card-arrow {
            transform: translateX(4px);
          }
          .clear-search-btn:hover {
            background: #F7F7F5;
            border-color: var(--color-border-medium);
          }
          .cta-link:hover {
            background: #CC5200;
            box-shadow: none;
            transform: translateY(-2px);
          }
          .stat-bar {
            background: #FFFFFF;
            border: 1px solid var(--border-default);
            border-radius: var(--radius-lg);
            height: 8px;
            width: 100%;
            overflow: hidden;
            margin-top: 8px;
          }
          .stat-bar-fill {
            height: 100%;
            background: #CC5200;
            transition: width 0.3s ease;
          }
          .quick-link-card {
            background: #FFFFFF;
            border: 1px solid var(--border-default);
            border-radius: var(--radius-lg);
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
            border-color: #E65C00;
            box-shadow: var(--shadow-lg);
          }
        `}} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: 18, color: '#444444', fontFamily: 'var(--font-inter)' }}>
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
                border: '1px solid var(--border-default)',
                borderRadius: 8,
                background: '#FFFFFF',
                color: '#1A1A1A',
                fontFamily: 'var(--font-inter)',
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
              const isSelected = selectedCategories.has(category.id);
              return (
                <StaggerItem key={category.id}>
                <div style={{ position: 'relative', height: '100%' }}>
                  {/* Compare Checkbox - Positioned absolutely */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectCategory(category.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 20,
                      height: 20,
                      cursor: 'pointer',
                      zIndex: 10,
                      accentColor: 'var(--accent-primary)',
                    }}
                    title="Select for comparison"
                  />

                  <Link href={`/cases/${category.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div className="cat-card" style={{
                      borderColor: isSelected ? '#E65C00' : 'var(--border-default)',
                      background: isSelected ? '#EFF5FF' : '#FFFFFF',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, paddingRight: 28 }}>
                        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                          {category.label}
                        </h2>
                        <SaveButton
                          item={{
                            id: `category-${category.id}`,
                            type: 'case',
                            label: category.label,
                            sublabel: `${catStats.totalCases.toLocaleString()} cases · ${catStats.avgWinRate}% win rate`,
                            href: `/cases/${category.id}`,
                            meta: { winRate: catStats.avgWinRate, totalCases: catStats.totalCases },
                          }}
                        />
                      </div>
                      <p style={{ fontSize: 14, color: '#444444', margin: 0, lineHeight: 1.5, marginBottom: 16 }}>{category.sub}</p>

                      {/* Inline Stats */}
                      {catStats.totalCases > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 'auto', padding: '12px 0' }}>
                          <div>
                            <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: '#CC5200' }}>{catStats.totalCases.toLocaleString()}</div>
                            <div style={{ fontSize: 11, color: '#444444', fontWeight: 500 }}>Total Cases</div>
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: getWinRateColor(catStats.avgWinRate) }}>
                                {catStats.avgWinRate}%
                              </div>
                              {catStats.avgWinRate > 0 && (
                                <span style={{ fontSize: 9, fontWeight: 700, color: getWinRateColor(catStats.avgWinRate), background: getWinRateBg(catStats.avgWinRate), border: `1px solid ${getWinRateColor(catStats.avgWinRate)}`, borderRadius: '8px', padding: '1px 4px', whiteSpace: 'nowrap' }}>
                                  {getWinRateLabel(catStats.avgWinRate)}
                                </span>
                              )}
                              <ConfidenceDot n={catStats.totalCases} />
                            </div>
                            <div style={{ fontSize: 11, color: '#444444', fontWeight: 500 }}>Avg Win Rate</div>
                          </div>
                          <div>
                            <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>{catStats.avgSettlement}%</div>
                            <div style={{ fontSize: 11, color: '#444444', fontWeight: 500 }}>Settlement Rate</div>
                          </div>
                          <div>
                            <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>{catStats.avgDuration}mo</div>
                            <div style={{ fontSize: 11, color: '#444444', fontWeight: 500 }}>Avg Duration</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        )}

        {/* Most-Filed Case Types Section */}
        {filtered.length !== 0 && topFiledCases.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: '#1A1A1A', marginBottom: 32, letterSpacing: '-0.3px' }}>
              Most-Filed Case Types
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {topFiledCases.map((caseType, idx) => (
                <Link key={caseType.nos} href={`/cases/${caseType.categoryLabel.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-{2,}/g, '-')}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: '40px 1fr 80px 120px', gap: 16, alignItems: 'center', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>
                      #{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>
                        {caseType.label}
                      </div>
                      <div style={{ fontSize: 12, color: '#444444' }}>
                        {caseType.categoryLabel}
                      </div>
                    </div>
                    <TrendSparkline nosCode={caseType.nos} width={80} height={32} />
                    <div style={{ textAlign: 'right' }}>
                      <div className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: '#CC5200' }}>
                        {caseType.total.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 11, color: '#444444', fontWeight: 500 }}>Cases</div>
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
            <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: '#1A1A1A', marginBottom: 32, letterSpacing: '-0.3px' }}>
              Highest Win Rate Case Types
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {topWinRateCases.map((caseType) => (
                <Link key={caseType.nos} href={`/cases/${caseType.categoryLabel.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-{2,}/g, '-')}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: '#FFFFFF', border: '1px solid var(--border-default)', borderRadius: '12px', padding: 20, height: '100%', transition: 'all 0.2s ease', cursor: 'pointer' }}>
                    <div style={{ fontSize: 14, color: '#444444', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>
                      {caseType.categoryLabel}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 16 }}>
                      {caseType.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div>
                        <div className="font-mono" style={{ fontSize: 32, fontWeight: 600, color: getWinRateColor(caseType.wr) }}>
                          {caseType.wr}%
                        </div>
                        <div style={{ fontSize: 12, color: '#444444' }}>Win Rate</div>
                      </div>
                      <TrendSparkline nosCode={caseType.nos} width={100} height={40} />
                    </div>
                    <div style={{ fontSize: 11, color: '#444444', fontWeight: 500 }}>
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
            <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: '#1A1A1A', marginBottom: 32, letterSpacing: '-0.3px' }}>
              Quick Links
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <Link href="/search" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC5200" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#1A1A1A' }}>Search Cases</div>
                  <div style={{ fontSize: 12, color: '#444444' }}>Find outcomes by keyword</div>
                </div>
              </Link>

              <Link href="/calculator" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                    <path d="M8 6h8M8 10h8M8 14h8M8 18h8"></path>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#1A1A1A' }}>Estimate Value</div>
                  <div style={{ fontSize: 12, color: '#444444' }}>Calculate case value</div>
                </div>
              </Link>

              <Link href="/compare" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E65C00" strokeWidth="2">
                    <path d="M12 3v18M3 9h6M15 9h6M3 15h6M15 15h6"></path>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#1A1A1A' }}>Compare Cases</div>
                  <div style={{ fontSize: 12, color: '#444444' }}>Side-by-side analysis</div>
                </div>
              </Link>

              <Link href="/trends" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#1A1A1A' }}>View Trends</div>
                  <div style={{ fontSize: 12, color: '#444444' }}>Win rate trends</div>
                </div>
              </Link>

              <Link href="/map" style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC5200" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div style={{ fontWeight: 600, color: '#1A1A1A' }}>Circuit Map</div>
                  <div style={{ fontSize: 12, color: '#444444' }}>By court circuit</div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--border-default)', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 600, color: '#1A1A1A', margin: '0 0 16px', letterSpacing: '-0.3px' }}>
            Ready to research your case?
          </h2>
          <p style={{ fontSize: 18, color: '#444444', margin: '0 0 32px', lineHeight: 1.6 }}>
            Start with our interactive research tool to find real outcome data for cases like yours.
          </p>
          <a href="/cases" className="cta-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', padding: '0 40px', background: '#E65C00', color: '#FFFFFF', borderRadius: '12px', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-display)', textDecoration: 'none', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)', textTransform: 'uppercase', letterSpacing: '0.04em', gap: '8px' }}>
            Start Researching
            <ArrowRightIcon size={14} />
          </a>
        </div>
      </div>

      {/* Floating Compare Bar */}
      {selectedCategories.size >= 2 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#E65C00',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          zIndex: 100,
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        }}>
          <span style={{ color: 'white', fontWeight: 600, fontSize: 15, fontFamily: 'var(--font-inter)' }}>
            Compare {selectedCategories.size} categor{selectedCategories.size === 1 ? 'y' : 'ies'}
          </span>
          <button
            onClick={handleCompare}
            style={{
              background: '#FFFFFF',
              color: '#E65C00',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 20px',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-inter)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Compare
            <ArrowRightIcon size={14} />
          </button>
        </div>
      )}

      {/* Add bottom margin when compare bar is visible */}
      {selectedCategories.size >= 2 && <div style={{ height: '48px' }} />}

      {/* Footer */}
      <div style={{ background: '#F7F7F5', color: '#444444', padding: '40px 20px', fontSize: 14, lineHeight: 1.6, borderTop: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ margin: 0 }}>
            <strong>Legal Disclaimer:</strong> This data is for research purposes only and is not legal advice. MyCaseValue provides historical federal court outcome data from public records. This does not constitute a prediction of any case outcome. Consult a qualified attorney for legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
          </p>
        </div>
      </div>
    </div>
  );
}
