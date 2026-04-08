'use client';

/**
 * Judge Directory Client Component
 * Interactive search, filtering, and pagination for the judge directory
 * Includes tabbed interface for judge directory and case type finder
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { JudgeWithStats } from '@/lib/supabase-judges';
import { getWinRateColor } from '@/lib/color-scale';
import { getPartyColor, getPartyLabel } from '@/lib/supabase-judges';
import { SITS } from '@/lib/data';

const CIRCUITS = [
  { value: '', label: 'All Circuits' },
  { value: '1st', label: '1st Circuit' },
  { value: '2nd', label: '2nd Circuit' },
  { value: '3rd', label: '3rd Circuit' },
  { value: '4th', label: '4th Circuit' },
  { value: '5th', label: '5th Circuit' },
  { value: '6th', label: '6th Circuit' },
  { value: '7th', label: '7th Circuit' },
  { value: '8th', label: '8th Circuit' },
  { value: '9th', label: '9th Circuit' },
  { value: '10th', label: '10th Circuit' },
  { value: '11th', label: '11th Circuit' },
  { value: 'DC', label: 'D.C. Circuit' },
];

const PRESIDENTS = [
  { value: '', label: 'All Presidents' },
  { value: 'Ronald Reagan', label: 'Ronald Reagan' },
  { value: 'George H.W. Bush', label: 'George H.W. Bush' },
  { value: 'Bill Clinton', label: 'Bill Clinton' },
  { value: 'George W. Bush', label: 'George W. Bush' },
  { value: 'Barack Obama', label: 'Barack Obama' },
  { value: 'Donald Trump', label: 'Donald Trump' },
  { value: 'Joe Biden', label: 'Joe Biden' },
];

const DISTRICTS_BY_CIRCUIT: { [key: string]: { value: string; label: string }[] } = {
  '1st': [
    { value: 'D. Mass.', label: 'District of Massachusetts' },
    { value: 'D. R.I.', label: 'District of Rhode Island' },
    { value: 'D. Me.', label: 'District of Maine' },
    { value: 'D. N.H.', label: 'District of New Hampshire' },
  ],
  '2nd': [
    { value: 'S.D.N.Y.', label: 'Southern District of New York' },
    { value: 'E.D.N.Y.', label: 'Eastern District of New York' },
    { value: 'D. Conn.', label: 'District of Connecticut' },
    { value: 'D. Vt.', label: 'District of Vermont' },
  ],
  '3rd': [
    { value: 'E.D. Pa.', label: 'Eastern District of Pennsylvania' },
    { value: 'D.N.J.', label: 'District of New Jersey' },
    { value: 'D. Del.', label: 'District of Delaware' },
  ],
  '4th': [
    { value: 'D. Md.', label: 'District of Maryland' },
    { value: 'E.D. Va.', label: 'Eastern District of Virginia' },
    { value: 'W.D. Va.', label: 'Western District of Virginia' },
  ],
  '5th': [
    { value: 'S.D. Tex.', label: 'Southern District of Texas' },
    { value: 'N.D. Tex.', label: 'Northern District of Texas' },
    { value: 'E.D. La.', label: 'Eastern District of Louisiana' },
  ],
  '7th': [
    { value: 'N.D. Ill.', label: 'Northern District of Illinois' },
    { value: 'E.D. Wis.', label: 'Eastern District of Wisconsin' },
    { value: 'S.D. Ind.', label: 'Southern District of Indiana' },
  ],
  '9th': [
    { value: 'C.D. Cal.', label: 'Central District of California' },
    { value: 'N.D. Cal.', label: 'Northern District of California' },
    { value: 'D. Ariz.', label: 'District of Arizona' },
    { value: 'D. Nev.', label: 'District of Nevada' },
  ],
  '11th': [
    { value: 'S.D. Fla.', label: 'Southern District of Florida' },
    { value: 'M.D. Fla.', label: 'Middle District of Florida' },
    { value: 'N.D. Ga.', label: 'Northern District of Georgia' },
  ],
};

const SORT_OPTIONS = [
  { value: 'name', label: 'Judge Name' },
  { value: 'cases_high', label: 'Cases Handled (Most)' },
  { value: 'cases_low', label: 'Cases Handled (Least)' },
  { value: 'winrate_high', label: 'Win Rate (Highest)' },
  { value: 'winrate_low', label: 'Win Rate (Lowest)' },
  { value: 'appointment_newest', label: 'Appointment Date (Newest)' },
];

interface JudgeDirectoryState {
  judges: JudgeWithStats[];
  total: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

interface FindByNOSState {
  judges: JudgeWithStats[];
  total: number;
  loading: boolean;
  error: string | null;
}

const JUDGES_PER_PAGE = 24;

/**
 * Extract all unique NOS codes from SITS data with labels
 */
function getNosCodes(): Array<{ code: string; label: string }> {
  const nosMap = new Map<string, string>();

  SITS.forEach((category) => {
    category.opts.forEach((opt) => {
      if (!nosMap.has(opt.nos)) {
        nosMap.set(opt.nos, opt.label);
      }
    });
  });

  const result: Array<{ code: string; label: string }> = Array.from(nosMap).map(([code, label]) => ({
    code,
    label,
  }));

  result.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  return result;
}

interface JudgeDirectoryClientProps {
  initialJudges?: JudgeWithStats[];
  initialTotal?: number;
}

export default function JudgeDirectoryClient({ initialJudges = [], initialTotal = 0 }: JudgeDirectoryClientProps) {
  const [activeTab, setActiveTab] = useState<'directory' | 'by-case-type'>('directory');
  const hasInitialData = initialJudges.length > 0;

  // Directory tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCircuit, setSelectedCircuit] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedPresident, setSelectedPresident] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [state, setState] = useState<JudgeDirectoryState>({
    judges: initialJudges,
    total: initialTotal,
    currentPage: 1,
    loading: !hasInitialData,
    error: null,
  });

  // Find by case type state
  const [selectedNOS, setSelectedNOS] = useState('');
  const [selectedNOSDistrict, setSelectedNOSDistrict] = useState('');
  const [minCasesFilter, setMinCasesFilter] = useState('10');
  const [byNOSState, setByNOSState] = useState<FindByNOSState>({
    judges: [],
    total: 0,
    loading: false,
    error: null,
  });

  // Skip initial client fetch when server-side data is available
  const skipInitialFetch = useRef(hasInitialData);

  // Fetch judges from API (directory tab)
  useEffect(() => {
    // On first mount with SSR data, skip the redundant fetch
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    const fetchJudges = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (selectedCircuit) params.append('circuit', selectedCircuit);
        if (selectedDistrict) params.append('district', selectedDistrict);
        if (selectedPresident) params.append('president', selectedPresident);
        params.append('sort', sortBy);
        params.append('page', String(state.currentPage));
        params.append('limit', String(JUDGES_PER_PAGE));

        const response = await fetch(`/api/judges?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch judges');

        const data = await response.json();
        setState(prev => ({
          ...prev,
          judges: data.judges,
          total: data.total,
          loading: false,
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false,
        }));
      }
    };

    if (activeTab === 'directory') {
      fetchJudges();
    }
  }, [searchQuery, selectedCircuit, selectedDistrict, selectedPresident, sortBy, state.currentPage, activeTab]);

  // Fetch judges by NOS code (find by case type tab)
  useEffect(() => {
    const fetchJudgesByNOS = async () => {
      if (!selectedNOS) {
        setByNOSState({ judges: [], total: 0, loading: false, error: null });
        return;
      }

      setByNOSState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const params = new URLSearchParams();
        params.append('nos_code', selectedNOS);
        if (selectedNOSDistrict) params.append('district', selectedNOSDistrict);
        params.append('min_cases', minCasesFilter);

        const response = await fetch(`/api/judges?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch judges');

        const data = await response.json();
        setByNOSState(prev => ({
          ...prev,
          judges: data.judges,
          total: data.total,
          loading: false,
        }));
      } catch (err) {
        setByNOSState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false,
        }));
      }
    };

    if (activeTab === 'by-case-type') {
      fetchJudgesByNOS();
    }
  }, [selectedNOS, selectedNOSDistrict, minCasesFilter, activeTab]);

  // Handle circuit change
  const handleCircuitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCircuit(e.target.value);
    setSelectedDistrict('');
    setState(prev => ({ ...prev, currentPage: 1 }));
  };

  // Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setState(prev => ({ ...prev, currentPage: 1 }));
  };

  // Get available districts for selected circuit
  const availableDistricts = selectedCircuit && DISTRICTS_BY_CIRCUIT[selectedCircuit as keyof typeof DISTRICTS_BY_CIRCUIT]
    ? [{ value: '', label: 'All Districts' }, ...DISTRICTS_BY_CIRCUIT[selectedCircuit as keyof typeof DISTRICTS_BY_CIRCUIT]]
    : [{ value: '', label: 'All Districts' }];

  // Get all NOS codes with labels
  const nosCodes = getNosCodes();

  const totalPages = Math.ceil(state.total / JUDGES_PER_PAGE);

  return (
    <div>
      {/* Tabbed Interface */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid #E5E7EB',
        marginBottom: 32,
      }}>
        <button
          onClick={() => {
            setActiveTab('directory');
            setState(prev => ({ ...prev, currentPage: 1 }));
          }}
          style={{
            padding: '16px 24px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            color: activeTab === 'directory' ? '#0966C3' : '#666666',
            background: activeTab === 'directory' ? '#FFFFFF' : '#F7F8FA',
            border: 'none',
            borderBottom: activeTab === 'directory' ? '3px solid #0966C3' : '3px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Judge Directory
        </button>

        <button
          onClick={() => {
            setActiveTab('by-case-type');
            setSelectedNOS('');
          }}
          style={{
            padding: '16px 24px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            color: activeTab === 'by-case-type' ? '#0966C3' : '#666666',
            background: activeTab === 'by-case-type' ? '#FFFFFF' : '#F7F8FA',
            border: 'none',
            borderBottom: activeTab === 'by-case-type' ? '3px solid #0966C3' : '3px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Find Judges by Case Type
        </button>
      </div>

      {/* TAB 1: JUDGE DIRECTORY */}
      {activeTab === 'directory' && (
      <div>
      {/* Search and Filter Section */}
      <div style={{
        padding: '24px',
        borderRadius: 2,
        border: '1px solid #E5E7EB',
        background: '#FFFFFF',
        marginBottom: 32,
      }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontFamily: 'var(--font-body)',
          }}>
            Search Judge Name
          </label>
          <input
            type="text"
            placeholder="Enter judge name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setState(prev => ({ ...prev, currentPage: 1 }));
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 2,
              border: '1px solid #E5E7EB',
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Filter Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-body)',
            }}>
              Circuit
            </label>
            <select
              value={selectedCircuit}
              onChange={handleCircuitChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 2,
                border: '1px solid #E5E7EB',
                fontSize: 14,
                fontFamily: 'var(--font-body)',
              }}
            >
              {CIRCUITS.map(circuit => (
                <option key={circuit.value || 'all'} value={circuit.value}>{circuit.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-body)',
            }}>
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedCircuit}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 2,
                border: '1px solid #E5E7EB',
                fontSize: 14,
                fontFamily: 'var(--font-body)',
                opacity: !selectedCircuit ? 0.5 : 1,
                cursor: !selectedCircuit ? 'not-allowed' : 'pointer',
              }}
            >
              {availableDistricts.map(district => (
                <option key={district.value || 'all'} value={district.value}>{district.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-body)',
            }}>
              Appointing President
            </label>
            <select
              value={selectedPresident}
              onChange={(e) => {
                setSelectedPresident(e.target.value);
                setState(prev => ({ ...prev, currentPage: 1 }));
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 2,
                border: '1px solid #E5E7EB',
                fontSize: 14,
                fontFamily: 'var(--font-body)',
              }}
            >
              {PRESIDENTS.map(president => (
                <option key={president.value || 'all'} value={president.value}>{president.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-body)',
            }}>
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setState(prev => ({ ...prev, currentPage: 1 }));
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 2,
                border: '1px solid #E5E7EB',
                fontSize: 14,
                fontFamily: 'var(--font-body)',
              }}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div style={{
        fontSize: 14,
        fontFamily: 'var(--font-body)',
        color: '#4B5563',
        marginBottom: 20,
      }}>
        Showing {state.judges.length > 0 ? (state.currentPage - 1) * JUDGES_PER_PAGE + 1 : 0} to{' '}
        {Math.min(state.currentPage * JUDGES_PER_PAGE, state.total)} of {state.total} judges
      </div>

      {/* Loading State */}
      {state.loading && (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: '#4B5563',
          fontFamily: 'var(--font-body)',
        }}>
          Loading judges...
        </div>
      )}

      {/* Error State */}
      {state.error && (
        <div style={{
          padding: '24px',
          borderRadius: 2,
          border: '1px solid #CC1016',
          background: '#FAEAE9',
          color: '#8C1515',
          fontFamily: 'var(--font-body)',
          marginBottom: 24,
        }}>
          {state.error}
        </div>
      )}

      {/* Judge Cards Grid */}
      {!state.loading && state.judges.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
          marginBottom: 32,
        }}>
          {state.judges.map(judge => {
            const winRateColor = getWinRateColor(judge.overall_plaintiff_win_rate || 0);
            const partyColor = getPartyColor(judge.party_of_appointing_president);
            const appointmentYear = judge.appointment_date ? new Date(judge.appointment_date).getFullYear() : null;

            return (
              <div key={judge.id} style={{
                padding: '20px',
                borderRadius: 2,
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                const elem = e.currentTarget;
                elem.style.borderColor = '#0966C3';
                elem.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.15)';
              }}
              onMouseLeave={(e) => {
                const elem = e.currentTarget;
                elem.style.borderColor = '#E5E7EB';
                elem.style.boxShadow = 'none';
              }}
              >
                {/* Judge Name */}
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1.3,
                }}>
                  {judge.full_name}
                </h3>

                {/* District and Circuit */}
                <p style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#666666',
                  margin: '0 0 4px 0',
                  fontFamily: 'var(--font-body)',
                }}>
                  {judge.district_id && judge.circuit ? `${judge.district_id} • ${judge.circuit} Circuit` : 'District not specified'}
                </p>

                {/* Appointment */}
                <p style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#999999',
                  margin: '0 0 12px 0',
                  fontFamily: 'var(--font-body)',
                }}>
                  {appointmentYear ? `Appointed ${appointmentYear}` : 'No appointment date'} {judge.appointing_president ? `by ${judge.appointing_president}` : ''}
                </p>

                {/* Party Indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                  fontSize: 12,
                  fontFamily: 'var(--font-body)',
                  color: '#666666',
                }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: partyColor,
                  }} />
                  <span>Appointing party: {judge.party_of_appointing_president || 'Unknown'}</span>
                </div>

                {/* Win Rate Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 2,
                  background: winRateColor.bg,
                  border: `1px solid ${winRateColor.border}`,
                  marginBottom: 12,
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  width: 'fit-content',
                }}>
                  <span style={{ color: winRateColor.text }}>
                    {judge.overall_plaintiff_win_rate !== null ? `${judge.overall_plaintiff_win_rate.toFixed(1)}%` : 'N/A'}
                  </span>
                  <span style={{ color: winRateColor.text, fontSize: 11, opacity: 0.8 }}>
                    {winRateColor.label}
                  </span>
                </div>

                {/* Cases Handled */}
                <p style={{
                  fontSize: 13,
                  fontWeight: 400,
                  fontFamily: 'var(--font-mono)',
                  color: '#4B5563',
                  margin: '0 0 16px 0',
                }}>
                  {judge.total_cases_handled} cases handled
                </p>

                {/* View Profile Link */}
                <Link href={`/judges/${judge.id}`} style={{
                  marginTop: 'auto',
                  padding: '12px 16px',
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid #0966C3',
                  color: '#0966C3',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const elem = e.currentTarget as HTMLAnchorElement;
                  elem.style.background = '#0966C3';
                  elem.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const elem = e.currentTarget as HTMLAnchorElement;
                  elem.style.background = '#FFFFFF';
                  elem.style.color = '#0966C3';
                }}
                >
                  View Profile
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!state.loading && state.judges.length === 0 && !state.error && (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: '#4B5563',
          fontFamily: 'var(--font-body)',
        }}>
          No judges found matching your criteria. Try adjusting your filters.
        </div>
      )}

      {/* Pagination */}
      {!state.loading && totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          padding: '24px 0',
          fontFamily: 'var(--font-body)',
        }}>
          <button
            onClick={() => setState(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
            disabled={state.currentPage === 1}
            style={{
              padding: '10px 16px',
              borderRadius: 2,
              border: '1px solid #E5E7EB',
              background: state.currentPage === 1 ? '#F7F8FA' : '#FFFFFF',
              color: state.currentPage === 1 ? '#999999' : '#0f0f0f',
              cursor: state.currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrentPage = pageNum === state.currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => setState(prev => ({ ...prev, currentPage: pageNum }))}
                style={{
                  padding: '10px 14px',
                  borderRadius: 2,
                  border: '1px solid #E5E7EB',
                  background: isCurrentPage ? '#0966C3' : '#FFFFFF',
                  color: isCurrentPage ? '#FFFFFF' : '#0f0f0f',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setState(prev => ({ ...prev, currentPage: Math.min(totalPages, prev.currentPage + 1) }))}
            disabled={state.currentPage === totalPages}
            style={{
              padding: '10px 16px',
              borderRadius: 2,
              border: '1px solid #E5E7EB',
              background: state.currentPage === totalPages ? '#F7F8FA' : '#FFFFFF',
              color: state.currentPage === totalPages ? '#999999' : '#0f0f0f',
              cursor: state.currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            Next
          </button>
        </div>
      )}
      </div>
      )}

      {/* TAB 2: FIND JUDGES BY CASE TYPE */}
      {activeTab === 'by-case-type' && (
      <div>
        {/* Case Type Filter Section */}
        <div style={{
          padding: '24px',
          borderRadius: 2,
          border: '1px solid #E5E7EB',
          background: '#FFFFFF',
          marginBottom: 32,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {/* Case Type Dropdown */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#0f0f0f',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-body)',
              }}>
                Case Type
              </label>
              <select
                value={selectedNOS}
                onChange={(e) => {
                  setSelectedNOS(e.target.value);
                  setSelectedNOSDistrict('');
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 2,
                  border: '1px solid #E5E7EB',
                  fontSize: 14,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">Select a case type...</option>
                {nosCodes.map(nos => (
                  <option key={nos.code} value={nos.code}>
                    {nos.label} (NOS {nos.code})
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#0f0f0f',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-body)',
              }}>
                District (Optional)
              </label>
              <select
                value={selectedNOSDistrict}
                onChange={(e) => setSelectedNOSDistrict(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 2,
                  border: '1px solid #E5E7EB',
                  fontSize: 14,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">All districts</option>
                {/* Simple list of all available districts from DISTRICTS_BY_CIRCUIT */}
                {Object.entries(DISTRICTS_BY_CIRCUIT).map(([circuit, districts]) => (
                  districts.map(district => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))
                ))}
              </select>
            </div>

            {/* Minimum Cases Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#0f0f0f',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-body)',
              }}>
                Minimum Cases Handled
              </label>
              <select
                value={minCasesFilter}
                onChange={(e) => setMinCasesFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 2,
                  border: '1px solid #E5E7EB',
                  fontSize: 14,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="10">10+ cases</option>
                <option value="25">25+ cases</option>
                <option value="50">50+ cases</option>
                <option value="100">100+ cases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        {selectedNOS && (
          <div style={{
            fontSize: 14,
            fontFamily: 'var(--font-body)',
            color: '#4B5563',
            marginBottom: 20,
          }}>
            Showing {byNOSState.judges.length} judges
          </div>
        )}

        {/* Loading State */}
        {byNOSState.loading && (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            color: '#4B5563',
            fontFamily: 'var(--font-body)',
          }}>
            Loading judges...
          </div>
        )}

        {/* Error State */}
        {byNOSState.error && (
          <div style={{
            padding: '24px',
            borderRadius: 2,
            border: '1px solid #CC1016',
            background: '#FAEAE9',
            color: '#8C1515',
            fontFamily: 'var(--font-body)',
            marginBottom: 24,
          }}>
            {byNOSState.error}
          </div>
        )}

        {/* Results List */}
        {!byNOSState.loading && selectedNOS && byNOSState.judges.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            {byNOSState.judges.map((judge, idx) => {
              const judgeStats = judge.statistics?.find(s => s.nos_code === parseInt(selectedNOS, 10));
              const winRate = judgeStats?.plaintiff_win_rate ?? 0;
              const winRateColor = getWinRateColor(winRate);
              const totalCases = judgeStats?.total_cases ?? 0;
              const avgDuration = judgeStats?.avg_duration_months ?? 0;

              return (
                <div
                  key={judge.id}
                  style={{
                    padding: '20px',
                    borderRadius: 2,
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    marginBottom: 16,
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto auto auto auto auto auto',
                    gap: 20,
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const elem = e.currentTarget;
                    elem.style.borderColor = '#0966C3';
                    elem.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    const elem = e.currentTarget;
                    elem.style.borderColor = '#E5E7EB';
                    elem.style.boxShadow = 'none';
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#0966C3',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    #{idx + 1}
                  </div>

                  {/* Judge Name and District */}
                  <div>
                    <h3 style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      margin: '0 0 4px 0',
                      fontFamily: 'var(--font-display)',
                    }}>
                      {judge.full_name}
                    </h3>
                    <p style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#666666',
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                    }}>
                      {judge.district_id || 'District not specified'}
                    </p>
                  </div>

                  {/* Win Rate */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: 2,
                      background: winRateColor.bg,
                      border: `1px solid ${winRateColor.border}`,
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: winRateColor.text,
                        fontFamily: 'var(--font-body)',
                      }}>
                        {winRate.toFixed(1)}%
                      </div>
                      <div style={{
                        fontSize: 10,
                        color: winRateColor.text,
                        fontFamily: 'var(--font-body)',
                        marginTop: 2,
                      }}>
                        {winRateColor.label}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: '#999999',
                      fontFamily: 'var(--font-body)',
                      textAlign: 'center',
                    }}>
                      Plaintiff
                    </div>
                  </div>

                  {/* Total Cases */}
                  <div style={{
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {totalCases}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: '#999999',
                      fontFamily: 'var(--font-body)',
                      marginTop: 2,
                    }}>
                      Cases
                    </div>
                  </div>

                  {/* Average Duration */}
                  <div style={{
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {avgDuration.toFixed(1)}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: '#999999',
                      fontFamily: 'var(--font-body)',
                      marginTop: 2,
                    }}>
                      months
                    </div>
                  </div>

                  {/* View Profile Link */}
                  <Link href={`/judges/${judge.id}`} style={{
                    padding: '10px 16px',
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid #0966C3',
                    color: '#0966C3',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    const elem = e.currentTarget as HTMLAnchorElement;
                    elem.style.background = '#0966C3';
                    elem.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    const elem = e.currentTarget as HTMLAnchorElement;
                    elem.style.background = '#FFFFFF';
                    elem.style.color = '#0966C3';
                  }}
                  >
                    View Profile
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!byNOSState.loading && selectedNOS && byNOSState.judges.length === 0 && !byNOSState.error && (
          <div style={{
            padding: '48px 24px',
            textAlign: 'center',
            color: '#4B5563',
            fontFamily: 'var(--font-body)',
          }}>
            No judges found matching your criteria. Try adjusting your filters.
          </div>
        )}

        {/* Disclaimer */}
        {selectedNOS && (
          <div style={{
            padding: '24px',
            borderRadius: 2,
            border: '1px solid #E5E7EB',
            background: '#F7F8FA',
            marginTop: 32,
          }}>
            <p style={{
              fontSize: 12,
              lineHeight: 1.6,
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              Statistical data from public federal court records. This ranking does not predict future rulings and should not be used as the sole basis for any litigation decision. Always consult a licensed attorney.
            </p>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
