'use client';

import { useState } from 'react';

// Mock data for Brown v. Board of Education
const MOCK_CASE_DATA = {
  citation: '347 U.S. 483',
  caseName: 'Brown v. Board of Education',
  courtName: 'U.S. Supreme Court',
  decisionDate: '1954-05-17',
  decisionYear: 1954,
  syllabus: 'Separate educational facilities are inherently unequal. Therefore, segregation is a violation of the Equal Protection Clause of the Fourteenth Amendment of the U.S. Constitution.',
  headnotes: [
    { num: 1, topic: 'Constitutional Law', text: 'Equal protection and due process' },
    { num: 2, topic: 'Education', text: 'Segregation in public schools' },
    { num: 3, topic: 'Civil Rights', text: 'Equal access to education' },
  ],
  treatmentFlag: 'green',
  treatmentLabel: 'Followed',
  treatmentCount: 12847,
  historyTimeline: [
    { year: 1954, type: 'Decided', description: 'Brown v. Board of Education', status: 'landmark' },
    { year: 1955, type: 'Implementation', description: 'Brown II - Implementation guidance', status: 'followed' },
    { year: 1968, type: 'Cited', description: 'Green v. County School Board', status: 'followed' },
    { year: 1971, type: 'Applied', description: 'Swann v. Charlotte-Mecklenburg', status: 'followed' },
    { year: 1991, type: 'Distinguished', description: 'Board of Education v. Dowell', status: 'limited' },
    { year: 2007, type: 'Restricted', description: 'Parents Involved in Community Schools v. Seattle', status: 'negative' },
  ],
  citingReferences: [
    { citation: '391 U.S. 430', caseName: 'Green v. County School Board', court: 'U.S. Supreme Court', year: 1968, depthStars: 4, treatment: 'followed', headnotes: [1, 2] },
    { citation: '402 U.S. 1', caseName: 'Swann v. Charlotte-Mecklenburg', court: 'U.S. Supreme Court', year: 1971, depthStars: 4, treatment: 'followed', headnotes: [1, 2, 3] },
    { citation: '426 U.S. 229', caseName: 'Washington v. Davis', court: 'U.S. Supreme Court', year: 1976, depthStars: 3, treatment: 'followed', headnotes: [1] },
    { citation: '438 U.S. 265', caseName: 'University of California Regents v. Bakke', court: 'U.S. Supreme Court', year: 1978, depthStars: 4, treatment: 'followed', headnotes: [1] },
    { citation: '458 U.S. 613', caseName: 'Crawford v. Board of Education', court: 'U.S. Supreme Court', year: 1982, depthStars: 3, treatment: 'limited', headnotes: [2] },
    { citation: '515 U.S. 200', caseName: 'Miller v. Johnson', court: 'U.S. Supreme Court', year: 1995, depthStars: 2, treatment: 'distinguished', headnotes: [1] },
    { citation: '545 U.S. 469', caseName: 'Parents Involved v. Seattle', court: 'U.S. Supreme Court', year: 2007, depthStars: 4, treatment: 'negative', headnotes: [1, 2, 3] },
    { citation: '771 F.3d 712', caseName: 'Coalition to Save Our Children v. State Board', court: '4th Cir.', year: 2014, depthStars: 3, treatment: 'followed', headnotes: [2] },
    { citation: '878 F.3d 1047', caseName: 'Students for Fair Admissions v. Presidents Fellows', court: '1st Cir.', year: 2017, depthStars: 2, treatment: 'distinguished', headnotes: [1] },
    { citation: '597 U.S. 507', caseName: 'Students for Fair Admissions v. Harvard', court: 'U.S. Supreme Court', year: 2023, depthStars: 4, treatment: 'negative', headnotes: [1, 2] },
  ],
  negativeHistory: [
    { citation: '545 U.S. 469', caseName: 'Parents Involved in Community Schools v. Seattle School District No. 1', court: 'U.S. Supreme Court', year: 2007, flag: 'red', type: 'limited', headnotes: [1, 2], rationale: 'Restricted application to intentional de jure segregation' },
    { citation: '597 U.S. 507', caseName: 'Students for Fair Admissions v. President and Fellows of Harvard College', court: 'U.S. Supreme Court', year: 2023, flag: 'red', type: 'overruled_in_part', headnotes: [1], rationale: 'Race-based classifications held unconstitutional in admissions' },
  ],
};

type TabType = 'overview' | 'history' | 'citing' | 'negative' | 'authorities';
type JurisdictionFilter = 'all' | 'scotus' | 'appellate' | 'federal';
type TreatmentFilter = 'all' | 'positive' | 'neutral' | 'negative';

interface FilterState {
  jurisdiction: JurisdictionFilter;
  dateRange: { start: number; end: number };
  depthOfTreatment: number;
  headnoteTopic: string;
  treatment: TreatmentFilter;
}

export default function KeyCitePage() {
  const [citationInput, setCitationInput] = useState('347 U.S. 483');
  const [hasSearched, setHasSearched] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [filters, setFilters] = useState<FilterState>({
    jurisdiction: 'all',
    dateRange: { start: 1950, end: 2024 },
    depthOfTreatment: 1,
    headnoteTopic: 'all',
    treatment: 'all',
  });

  const handleSearch = () => {
    setHasSearched(true);
    setActiveTab('overview');
  };

  const getTreatmentColor = (flag: string): string => {
    switch (flag) {
      case 'red': return 'var(--data-negative)';
      case 'yellow': return 'var(--wrn-txt, #C4882A)';
      case 'green': return 'var(--data-positive)';
      case 'blue': return 'var(--link)';
      default: return 'var(--text-primary)';
    }
  };

  const getTreatmentBg = (flag: string): string => {
    switch (flag) {
      case 'red': return 'var(--data-negative-bg, #FAEAEA)';
      case 'yellow': return 'rgba(196, 136, 42, 0.1)';
      case 'green': return 'var(--data-positive-bg, #EAF4EF)';
      case 'blue': return 'rgba(59, 130, 246, 0.1)';
      default: return 'var(--surf)';
    }
  };

  const getTreatmentBorder = (flag: string): string => {
    switch (flag) {
      case 'red': return '1px solid rgba(239, 68, 68, 0.3)';
      case 'yellow': return '1px solid rgba(196, 136, 42, 0.3)';
      case 'green': return '1px solid rgba(34, 197, 94, 0.3)';
      case 'blue': return '1px solid rgba(59, 130, 246, 0.3)';
      default: return '1px solid var(--bdr)';
    }
  };

  const renderStars = (stars: number) => {
    const maxStars = 4;
    return (
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {Array.from({ length: maxStars }).map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill={i < stars ? 'var(--gold)' : 'var(--bdr)'}
            style={{ transition: 'all 0.2s' }}
          >
            <path d="M7 1l2.18 4.41 4.82.7-3.5 3.4.83 4.84L7 11.77l-4.33 2.28.83-4.84-3.5-3.4 4.82-.7z" />
          </svg>
        ))}
      </div>
    );
  };

  const treatmentFlags = {
    red: '⚠️ RED FLAG',
    yellow: '⚠️ YELLOW FLAG',
    green: '✓ GREEN FLAG',
    blue: 'ℹ️ BLUE H',
  };

  return (
    <div style={{ background: 'var(--surf)', minHeight: '100vh', fontFamily: 'var(--font-ui)' }}>
      {/* Header with status */}
      <div style={{
        background: 'var(--chrome-bg)',
        color: 'white',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }} className="keycite-page-header">
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 12px',
            marginBottom: 16,
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.1)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2s infinite' }} />
            Citation Validator
          </div>

          <h1 style={{
            fontFamily: 'var(--font-legal)',
            fontSize: 28,
            fontWeight: 700,
            color: 'white',
            margin: '0 0 12px',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
          }}>
            KeyCite Citation Analysis
          </h1>

          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.8)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: 640,
          }}>
            Track case treatment, citing references, negative history, and authority analysis with color-coded validation flags.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        background: 'var(--card)',
        borderBottom: '1px solid var(--bdr)',
        padding: '32px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 16,
            alignItems: 'end',
          }} className="keycite-search-grid">
            <div>
              <label htmlFor="citation-input" style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Enter Citation or Case Name
              </label>
              <input
                id="citation-input"
                type="text"
                value={citationInput}
                onChange={(e) => setCitationInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., 347 U.S. 483 or Brown v. Board of Education"
                style={{
                  width: '100%',
                  height: 48,
                  padding: '12px 16px',
                  fontSize: 15,
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  background: 'var(--surf)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196, 136, 42, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bdr)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              style={{
                height: 48,
                padding: '0 32px',
                background: 'var(--gold)',
                color: 'white',
                border: 'none',
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-ui)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#B0762A';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Validate Citation
            </button>
          </div>
        </div>
      </div>

      {hasSearched && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
          {/* Case Header with Treatment Flag */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: 4,
            padding: 32,
            marginBottom: 32,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'start' }} className="keycite-case-header-grid">
              {/* Flag Icon */}
              <div style={{
                width: 80,
                height: 80,
                borderRadius: 3,
                background: getTreatmentBg(MOCK_CASE_DATA.treatmentFlag),
                border: getTreatmentBorder(MOCK_CASE_DATA.treatmentFlag),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 40,
              }}>
                {MOCK_CASE_DATA.treatmentFlag === 'red' && '🚩'}
                {MOCK_CASE_DATA.treatmentFlag === 'yellow' && '🟨'}
                {MOCK_CASE_DATA.treatmentFlag === 'green' && '🟢'}
                {MOCK_CASE_DATA.treatmentFlag === 'blue' && '🔵'}
              </div>

              {/* Case Info */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-legal)',
                    fontSize: 20,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}>
                    {MOCK_CASE_DATA.caseName}
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  marginTop: 16,
                }}>
                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--text2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: 4,
                    }}>
                      Citation
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}>
                      {MOCK_CASE_DATA.citation}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--text2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: 4,
                    }}>
                      Court
                    </div>
                    <div style={{
                      fontSize: 14,
                      color: 'var(--text-primary)',
                    }}>
                      {MOCK_CASE_DATA.courtName}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--text2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: 4,
                    }}>
                      Decided
                    </div>
                    <div style={{
                      fontSize: 14,
                      color: 'var(--text-primary)',
                    }}>
                      {new Date(MOCK_CASE_DATA.decisionDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment Summary */}
              <div style={{
                textAlign: 'right',
              }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: 8,
                }}>
                  Treatment Status
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  background: getTreatmentBg(MOCK_CASE_DATA.treatmentFlag),
                  border: getTreatmentBorder(MOCK_CASE_DATA.treatmentFlag),
                  borderRadius: 3,
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: getTreatmentColor(MOCK_CASE_DATA.treatmentFlag),
                    textTransform: 'uppercase',
                  }}>
                    {MOCK_CASE_DATA.treatmentLabel}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: getTreatmentColor(MOCK_CASE_DATA.treatmentFlag),
                  marginBottom: 4,
                }}>
                  {MOCK_CASE_DATA.treatmentCount.toLocaleString()}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'var(--text2)',
                }}>
                  Cases Citing
                </div>
              </div>
            </div>
          </div>

          {/* Headnotes */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: 4,
            padding: 24,
            marginBottom: 32,
          }}>
            <h3 style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 16px',
            }}>
              Key Headnotes
            </h3>
            <div style={{
              display: 'grid',
              gap: 12,
            }}>
              {MOCK_CASE_DATA.headnotes.map((hn) => (
                <div
                  key={hn.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr',
                    gap: 12,
                    padding: 12,
                    background: 'var(--surf)',
                    borderRadius: 2,
                    border: '1px solid var(--bdr)',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 3,
                    background: 'rgba(196, 136, 42, 0.1)',
                    border: '1px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    fontSize: 14,
                  }}>
                    {hn.num}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--gold)',
                      marginBottom: 4,
                    }}>
                      {hn.topic}
                    </div>
                    <div style={{
                      fontSize: 13,
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                    }}>
                      {hn.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: 0,
            borderBottom: '2px solid var(--bdr)',
            marginBottom: 32,
            background: 'var(--card)',
            borderRadius: '4px 4px 0 0',
            padding: '0 24px',
            border: '1px solid var(--bdr)',
            borderBottomWidth: '2px',
          }}>
            {(['overview', 'history', 'citing', 'negative', 'authorities'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 20px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: activeTab === tab ? 'var(--gold)' : 'var(--text2)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: activeTab === tab ? '3px solid var(--gold)' : 'none',
                  transition: 'all 0.2s',
                  marginBottom: '-2px',
                }}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'history' && 'History'}
                {tab === 'citing' && `Citing References (${MOCK_CASE_DATA.citingReferences.length})`}
                {tab === 'negative' && `Negative (${MOCK_CASE_DATA.negativeHistory.length})`}
                {tab === 'authorities' && 'Authorities'}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: 24,
          }} className="keycite-sidebar-grid">
            {/* Filter Sidebar */}
            <div style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
              padding: 24,
              height: 'fit-content',
              position: 'sticky',
              top: 20,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0 0 16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Filters
              </h3>

              <div style={{ display: 'grid', gap: 16 }}>
                {/* Jurisdiction Filter */}
                <div>
                  <label htmlFor="jurisdiction-filter" style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text2)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Jurisdiction
                  </label>
                  <select
                    id="jurisdiction-filter"
                    value={filters.jurisdiction}
                    onChange={(e) =>
                      setFilters({ ...filters, jurisdiction: e.target.value as JurisdictionFilter })
                    }
                    style={{
                      width: '100%',
                      height: 36,
                      padding: '8px 10px',
                      fontSize: 13,
                      border: '1px solid var(--bdr)',
                      borderRadius: 2,
                      background: 'var(--surf)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-ui)',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="all">All Courts</option>
                    <option value="scotus">Supreme Court</option>
                    <option value="appellate">Appeals Courts</option>
                    <option value="federal">Federal District</option>
                  </select>
                </div>

                {/* Treatment Filter */}
                <div>
                  <label htmlFor="treatment-filter" style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text2)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Treatment
                  </label>
                  <select
                    id="treatment-filter"
                    value={filters.treatment}
                    onChange={(e) =>
                      setFilters({ ...filters, treatment: e.target.value as TreatmentFilter })
                    }
                    style={{
                      width: '100%',
                      height: 36,
                      padding: '8px 10px',
                      fontSize: 13,
                      border: '1px solid var(--bdr)',
                      borderRadius: 2,
                      background: 'var(--surf)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-ui)',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="all">All Cases</option>
                    <option value="positive">Positive Only</option>
                    <option value="neutral">Neutral Only</option>
                    <option value="negative">Negative Only</option>
                  </select>
                </div>

                {/* Depth of Treatment */}
                <div>
                  <label htmlFor="minimum-depth" style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text2)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Minimum Depth ({filters.depthOfTreatment} stars)
                  </label>
                  <input
                    id="minimum-depth"
                    type="range"
                    min="1"
                    max="4"
                    value={filters.depthOfTreatment}
                    onChange={(e) =>
                      setFilters({ ...filters, depthOfTreatment: parseInt(e.target.value) })
                    }
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      accentColor: 'var(--gold)',
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    gap: 4,
                    marginTop: 8,
                  }}>
                    {renderStars(filters.depthOfTreatment)}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label id="date-range-label" style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text2)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Date Range
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                  }}>
                    <input
                      aria-label="Date range start year"
                      type="number"
                      min="1950"
                      max="2024"
                      value={filters.dateRange.start}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          dateRange: { ...filters.dateRange, start: parseInt(e.target.value) },
                        })
                      }
                      style={{
                        height: 36,
                        padding: '8px 10px',
                        fontSize: 12,
                        border: '1px solid var(--bdr)',
                        borderRadius: 2,
                        background: 'var(--surf)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                      }}
                      placeholder="Start"
                    />
                    <input
                      aria-label="Date range end year"
                      type="number"
                      min="1950"
                      max="2024"
                      value={filters.dateRange.end}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          dateRange: { ...filters.dateRange, end: parseInt(e.target.value) },
                        })
                      }
                      style={{
                        height: 36,
                        padding: '8px 10px',
                        fontSize: 12,
                        border: '1px solid var(--bdr)',
                        borderRadius: 2,
                        background: 'var(--surf)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                      }}
                      placeholder="End"
                    />
                  </div>
                </div>

                {/* Headnote Topic */}
                <div>
                  <label htmlFor="headnote-topic" style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--text2)',
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Headnote Topic
                  </label>
                  <select
                    id="headnote-topic"
                    value={filters.headnoteTopic}
                    onChange={(e) =>
                      setFilters({ ...filters, headnoteTopic: e.target.value })
                    }
                    style={{
                      width: '100%',
                      height: 36,
                      padding: '8px 10px',
                      fontSize: 13,
                      border: '1px solid var(--bdr)',
                      borderRadius: 2,
                      background: 'var(--surf)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-ui)',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="all">All Topics</option>
                    <option value="constitutional">Constitutional Law</option>
                    <option value="education">Education</option>
                    <option value="civil-rights">Civil Rights</option>
                  </select>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() =>
                    setFilters({
                      jurisdiction: 'all',
                      dateRange: { start: 1950, end: 2024 },
                      depthOfTreatment: 1,
                      headnoteTopic: 'all',
                      treatment: 'all',
                    })
                  }
                  style={{
                    width: '100%',
                    height: 36,
                    padding: '8px 10px',
                    fontSize: 12,
                    border: '1px solid var(--bdr)',
                    borderRadius: 2,
                    background: 'var(--surf)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-ui)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    marginTop: 8,
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div>
              {activeTab === 'overview' && (
                <div style={{ display: 'grid', gap: 24 }}>
                  {/* Syllabus */}
                  <div style={{
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: 4,
                    padding: 24,
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: '0 0 12px',
                    }}>
                      Syllabus
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: 'var(--text-primary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {MOCK_CASE_DATA.syllabus}
                    </p>
                  </div>

                  {/* Treatment Timeline */}
                  <div style={{
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: 4,
                    padding: 24,
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: '0 0 20px',
                    }}>
                      Case History Timeline
                    </h3>
                    <div style={{
                      position: 'relative',
                      paddingLeft: 40,
                    }}>
                      {MOCK_CASE_DATA.historyTimeline.map((event, idx) => (
                        <div
                          key={idx}
                          style={{
                            position: 'relative',
                            marginBottom: idx < MOCK_CASE_DATA.historyTimeline.length - 1 ? 24 : 0,
                            paddingBottom: idx < MOCK_CASE_DATA.historyTimeline.length - 1 ? 24 : 0,
                            borderLeft: idx < MOCK_CASE_DATA.historyTimeline.length - 1 ? '2px solid var(--bdr)' : 'none',
                          }}
                        >
                          {/* Timeline dot */}
                          <div
                            style={{
                              position: 'absolute',
                              left: -33,
                              top: 0,
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              background: event.status === 'landmark' ? 'var(--gold)' : 'var(--data-positive)',
                              border: '3px solid var(--card)',
                              boxShadow: '0 0 0 1px var(--bdr)',
                            }}
                          />
                          <div>
                            <div style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: 'var(--gold)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              marginBottom: 4,
                            }}>
                              {event.year} — {event.type}
                            </div>
                            <div style={{
                              fontSize: 13,
                              color: 'var(--text-primary)',
                            }}>
                              {event.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 4,
                  padding: 24,
                }}>
                  <p style={{
                    fontSize: 14,
                    color: 'var(--text2)',
                    margin: 0,
                  }}>
                    Detailed prior and subsequent case history. Shows procedural history and appellate decisions related to this case.
                  </p>
                </div>
              )}

              {activeTab === 'citing' && (
                <div style={{ display: 'grid', gap: 16 }}>
                  {MOCK_CASE_DATA.citingReferences.map((ref, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--bdr)',
                        borderRadius: 4,
                        padding: 20,
                      }}
                    >
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: 16,
                        alignItems: 'start',
                        marginBottom: 12,
                      }}>
                        <div>
                          <div style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: 'var(--gold)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: 4,
                          }}>
                            {ref.citation} — {ref.year}
                          </div>
                          <h4 style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--link)',
                            margin: '0 0 8px',
                            cursor: 'pointer',
                          }}>
                            {ref.caseName}
                          </h4>
                          <div style={{
                            fontSize: 12,
                            color: 'var(--text2)',
                          }}>
                            {ref.court}
                          </div>
                        </div>
                        <div style={{
                          textAlign: 'right',
                        }}>
                          {renderStars(ref.depthStars)}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center',
                        padding: '12px 0',
                        borderTop: '1px solid var(--bdr)',
                        borderBottom: '1px solid var(--bdr)',
                        marginBottom: 12,
                      }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: getTreatmentColor(ref.treatment),
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            background: getTreatmentBg(ref.treatment),
                            borderRadius: 2,
                          }}
                        >
                          {ref.treatment === 'followed' && 'FOLLOWED'}
                          {ref.treatment === 'limited' && 'LIMITED'}
                          {ref.treatment === 'negative' && 'NEGATIVE'}
                          {ref.treatment === 'distinguished' && 'DISTINGUISHED'}
                        </span>
                        <span style={{
                          fontSize: 12,
                          color: 'var(--text2)',
                        }}>
                          Headnotes: {ref.headnotes.join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'negative' && (
                <div style={{ display: 'grid', gap: 16 }}>
                  {MOCK_CASE_DATA.negativeHistory.length > 0 ? (
                    MOCK_CASE_DATA.negativeHistory.map((neg, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: getTreatmentBg(neg.flag),
                          border: getTreatmentBorder(neg.flag),
                          borderRadius: 4,
                          padding: 20,
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          marginBottom: 12,
                        }}>
                          <span
                            style={{
                              fontSize: 18,
                            }}
                          >
                            {neg.flag === 'red' && '🚩'}
                            {neg.flag === 'yellow' && '🟨'}
                          </span>
                          <div>
                            <div style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: getTreatmentColor(neg.flag),
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}>
                              {neg.flag === 'red' ? 'RED FLAG' : 'YELLOW FLAG'} — {neg.type.toUpperCase().replace(/_/g, ' ')}
                            </div>
                            <h4 style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: 14,
                              fontWeight: 600,
                              color: 'var(--text-primary)',
                              margin: 0,
                            }}>
                              {neg.caseName}
                            </h4>
                            <div style={{
                              fontSize: 12,
                              color: 'var(--text2)',
                              marginTop: 4,
                            }}>
                              {neg.court} ({neg.year})
                            </div>
                          </div>
                        </div>
                        <div style={{
                          padding: '12px 0',
                          borderTop: `1px solid ${getTreatmentColor(neg.flag)}40`,
                        }}>
                          <div style={{
                            fontSize: 12,
                            color: 'var(--text-primary)',
                            lineHeight: 1.5,
                            marginBottom: 8,
                          }}>
                            <strong>Rationale:</strong> {neg.rationale}
                          </div>
                          <div style={{
                            fontSize: 11,
                            color: 'var(--text2)',
                          }}>
                            Affects headnotes: {neg.headnotes.join(', ')}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{
                      background: 'var(--card)',
                      border: '1px solid var(--bdr)',
                      borderRadius: 4,
                      padding: 24,
                      textAlign: 'center',
                    }}>
                      <p style={{
                        color: 'var(--text2)',
                        margin: 0,
                      }}>
                        No significant negative treatment found.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'authorities' && (
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 4,
                  padding: 24,
                }}>
                  <p style={{
                    fontSize: 14,
                    color: 'var(--text2)',
                    margin: 0,
                  }}>
                    Table of authorities showing all cases, statutes, regulations, and rules cited in this opinion.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export/Delivery Bar */}
      <div style={{
        background: 'var(--card)',
        borderTop: '1px solid var(--bdr)',
        padding: '24px',
        marginTop: 40,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text2)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Export & Share
            </div>
            <div style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
            }}>
              <button
                style={{
                  height: 40,
                  padding: '0 16px',
                  background: 'var(--surf)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bdr)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surf)';
                }}
              >
                Export as PDF
              </button>
              <button
                style={{
                  height: 40,
                  padding: '0 16px',
                  background: 'var(--surf)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bdr)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surf)';
                }}
              >
                Copy Link
              </button>
              <button
                style={{
                  height: 40,
                  padding: '0 16px',
                  background: 'var(--gold)',
                  border: 'none',
                  borderRadius: 2,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#B0762A';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Deliver to Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { name: 'Advanced Search', href: '/attorney/advanced-search', desc: 'Advanced legal research search tools' },
              { name: 'Secondary Sources', href: '/attorney/secondary-sources', desc: 'Legal secondary sources and treatises' },
              { name: 'Compare Text', href: '/attorney/compare-text', desc: 'Compare legal documents side by side' },
              { name: 'Alerts', href: '/attorney/alerts', desc: 'Real-time citation and case alerts' },
            ].map(tool => (
              <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: 'var(--surf)',
        color: 'var(--text2)',
        padding: '40px 24px',
        fontSize: 13,
        lineHeight: 1.6,
        borderTop: '1px solid var(--bdr)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ margin: 0, marginBottom: 12 }}>
            <strong>Disclaimer:</strong> This KeyCite-style analysis is for research purposes. Verify all legal citations through official sources and current legal databases. MyCaseValue provides analytical tools but does not replace Westlaw, LexisNexis, or official legal research.
          </p>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .keycite-search-grid { grid-template-columns: 1fr !important; }
          .keycite-case-header-grid { grid-template-columns: 1fr !important; }
          .keycite-sidebar-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .keycite-page-header { padding: 20px 12px !important; }
        }
      `}</style>
    </div>
  );
}
