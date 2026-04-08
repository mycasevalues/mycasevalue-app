'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AttorneySearchResult, AttorneyProfile, TopDistrict, CaseAppearance, CaseTypeBreakdown } from '../lib/opposing-counsel';

// ─── Icon Components ────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ChevronDownIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

// ─── Utility Components ────────────────────────────────────────────

interface MeterBarProps {
  value: number;
  max: number;
  color: string;
  label: string;
}

const MeterBar = ({ value, max, color, label }: MeterBarProps) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '12px', color: '#4B5563' }}>{label}</span>
      <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#0f0f0f' }}>
        {value}%
      </span>
    </div>
    <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          width: `${(value / max) * 100}%`,
          background: color,
          borderRadius: '3px',
          transition: 'width 0.5s ease',
        }}
      />
    </div>
  </div>
);

interface DistrictBarChartProps {
  districts: TopDistrict[];
}

const DistrictBarChart = ({ districts }: DistrictBarChartProps) => {
  const maxCases = Math.max(...districts.map((d) => d.caseCount), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {districts.map((district) => (
        <div key={district.district}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: '#4B5563' }}>{district.district}</span>
            <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#0f0f0f' }}>
              {district.caseCount}
            </span>
          </div>
          <div style={{ height: '5px', background: '#E5E7EB', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(district.caseCount / maxCases) * 100}%`,
                background: '#0966C3',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

interface CaseListProps {
  cases: CaseAppearance[];
}

const CaseList = ({ cases }: CaseListProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {cases.map((caseItem, idx) => {
      const outcomeColors: Record<string, string> = {
        trial_win: '#059669',
        trial_loss: '#DC2626',
        settlement: '#0966C3',
        dismissal: '#6B7280',
        other: '#8B5CF6',
      };

      return (
        <div
          key={idx}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: '12px',
            borderBottom: idx < cases.length - 1 ? '1px solid #E5E7EB' : 'none',
            gap: '12px',
          }}
        >
          <div style={{ flex: 1 }}>
            <a
              href={caseItem.courtlistenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#0966C3',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {caseItem.title}
            </a>
            <div style={{ fontSize: '12px', color: '#4B5563' }}>
              {caseItem.court} · {caseItem.year}
            </div>
          </div>
          <div
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              backgroundColor: outcomeColors[caseItem.outcome] + '1F',
              fontSize: '11px',
              fontWeight: 600,
              color: outcomeColors[caseItem.outcome],
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
            }}
          >
            {caseItem.outcome.replace(/_/g, ' ')}
          </div>
        </div>
      );
    })}
  </div>
);

interface CaseTypeTableProps {
  breakdown: CaseTypeBreakdown[];
}

const CaseTypeTable = ({ breakdown }: CaseTypeTableProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
    {breakdown.map((item, idx) => (
      <div
        key={idx}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 50px 50px',
          gap: '16px',
          padding: '12px 0',
          borderBottom: idx < breakdown.length - 1 ? '1px solid #E5E7EB' : 'none',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '13px', color: '#0f0f0f' }}>{item.type}</span>
        <div style={{ textAlign: 'center' }}>
          <div className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f' }}>
            {item.count}
          </div>
          <div style={{ fontSize: '10px', color: '#4B5563' }}>cases</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#0966C3' }}>
            {item.winRate}%
          </div>
          <div style={{ fontSize: '10px', color: '#4B5563' }}>win</div>
        </div>
      </div>
    ))}
  </div>
);

interface AttorneyCardProps {
  attorney: AttorneyProfile;
  isExpanded: boolean;
  onToggle: () => void;
}

const AttorneyCard = ({ attorney, isExpanded, onToggle }: AttorneyCardProps) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      border: isExpanded ? '2px solid #0966C3' : '1px solid #E5E7EB',
      overflow: 'hidden',
      boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.08)',
      transition: 'all 0.2s',
    }}
  >
    {/* Header */}
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '20px 24px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 4px' }}>
            {attorney.name}
          </h3>
          <p style={{ fontSize: '13px', color: '#4B5563', margin: 0 }}>
            {attorney.firmName} · {attorney.barNumber}
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="font-mono" style={{ fontSize: '20px', fontWeight: 600, color: '#0966C3' }}>
              {attorney.winRate}%
            </div>
            <div style={{ fontSize: '10px', color: '#4B5563', textTransform: 'uppercase' }}>Win Rate</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="font-mono" style={{ fontSize: '20px', fontWeight: 600, color: '#1B7C7D' }}>
              {attorney.settlementRate}%
            </div>
            <div style={{ fontSize: '10px', color: '#4B5563', textTransform: 'uppercase' }}>Settlement</div>
          </div>
          <div style={{ color: '#4B5563' }}>
            <ChevronDownIcon isExpanded={isExpanded} />
          </div>
        </div>
      </div>
    </button>

    {/* Expanded Content */}
    {isExpanded && (
      <div style={{ padding: '0 24px 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Left Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#0f0f0f',
                margin: '0 0 14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Litigation Profile
            </h4>
            <MeterBar value={attorney.winRate} max={100} color="#0966C3" label="Win Rate" />
            <MeterBar value={attorney.settlementRate} max={100} color="#1B7C7D" label="Settlement Rate" />
            <MeterBar value={attorney.trialVsSettlement.trialRate} max={100} color="#004D80" label="Trial Rate" />

            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#0f0f0f',
                margin: '20px 0 14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Settlement Timing
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { label: 'Early', value: attorney.trialVsSettlement.earlySettlementRate, color: '#059669' },
                { label: 'Standard', value: attorney.trialVsSettlement.settlementRate - attorney.trialVsSettlement.earlySettlementRate, color: '#B86E00' },
                { label: 'Late', value: 100 - attorney.trialVsSettlement.settlementRate, color: '#0966C3' },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1, padding: '8px', borderRadius: '12px', backgroundColor: `${s.color}15`, textAlign: 'center' }}>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: s.color }}>
                    {s.value}%
                  </div>
                  <div style={{ fontSize: '10px', color: '#4B5563' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#0f0f0f',
                margin: '0 0 14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Profile
            </h4>
            {[
              { label: 'Firm Name', value: attorney.firmName },
              { label: 'Bar Number', value: attorney.barNumber },
              { label: 'Total Cases', value: String(attorney.totalCases) },
              { label: 'Avg Time to Settlement', value: `${attorney.avgTimeToSettlement} months` },
              { label: 'District Average', value: `${attorney.districtAvg} months` },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '12px', color: '#4B5563' }}>{item.label}</span>
                <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#0f0f0f' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Districts */}
        <div style={{ marginTop: '20px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f0f0f',
              margin: '0 0 14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Top Districts
          </h4>
          <DistrictBarChart districts={attorney.topDistricts} />
        </div>

        {/* Recent Cases */}
        <div style={{ marginTop: '20px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f0f0f',
              margin: '0 0 14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Recent Cases
          </h4>
          <CaseList cases={attorney.recentCases.slice(0, 5)} />
        </div>

        {/* Case Type Breakdown */}
        <div style={{ marginTop: '20px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f0f0f',
              margin: '0 0 14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Case Type Breakdown
          </h4>
          <CaseTypeTable breakdown={attorney.caseTypeBreakdown} />
        </div>
      </div>
    )}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────

export default function OpposingCounselSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<AttorneySearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim() || query.trim().length < 2) {
      setError('Enter at least 2 characters');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    setExpandedIndex(null);

    try {
      const res = await fetch(`/api/attorney/search?q=${encodeURIComponent(query.trim())}`);
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Search failed');
      } else {
        setResult(await res.json());
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      <style>{`
        input:focus { border-color: #0966C3 !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>

      {/* Header */}
      <div style={{ background: '#0966C3', padding: '32px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{
              fontSize: '13px',
              color: '#0966C3',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '16px',
            }}
          >
            <HomeIcon />
            Home &gt; Attorney Tools &gt; Opposing Counsel
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(10, 102, 194, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0966C3',
              }}
            >
              <SearchIcon />
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Opposing Counsel Research
              </h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: '4px 0 0 0' }}>
                Analyze litigation track record, settlement patterns, and strategy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563' }}>
                <SearchIcon />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by attorney name, firm name, or bar number..."
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 42px',
                  height: '48px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#0f0f0f',
                  background: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0 24px',
                height: '48px',
                backgroundColor: '#0966C3',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid #FCA5A5',
              marginBottom: '24px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#991B1B', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <>
            <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px' }}>
              {result.resultCount} result{result.resultCount !== 1 ? 's' : ''} for "{result.query}"
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {result.profiles.map((attorney, i) => (
                <AttorneyCard
                  key={i}
                  attorney={attorney}
                  isExpanded={expandedIndex === i}
                  onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
                />
              ))}
            </div>

            {/* Disclaimer */}
            <div
              style={{
                padding: '14px 18px',
                backgroundColor: 'rgba(232, 149, 88, 0.12)',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
              }}
            >
              <p style={{ fontSize: '11px', color: '#E89558', margin: 0, lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> {result.disclaimer}
              </p>
            </div>
          </>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '64px 32px',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                background: 'rgba(10, 102, 194, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: '#0966C3',
              }}
            >
              <SearchIcon />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 600,
                color: '#0f0f0f',
                margin: '0 0 12px',
              }}
            >
              Research Opposing Counsel
            </h2>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 20px' }}>
              Search by attorney name, firm name, or bar number to view litigation track record, settlement patterns, and strategic tendencies.
            </p>
            <p style={{ fontSize: '13px', color: '#4B5563' }}>Try: Mitchell, Chen, Williams, or Martinez</p>
          </div>
        )}
      </div>
    </div>
  );
}
