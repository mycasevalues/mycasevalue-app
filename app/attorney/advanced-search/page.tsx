'use client';

import { useState, useCallback, useMemo } from 'react';
import { ChevronDownIcon, SearchIcon } from '@/components/ui/Icons';

const StarIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </svg>
);

// Type definitions
interface SearchResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  relevance: number;
  snippet: string;
  type: 'case' | 'statute' | 'regulation' | 'secondary' | 'brief' | 'docket' | 'news';
}

interface SearchHistoryItem {
  id: string;
  query: string;
  mode: 'natural' | 'boolean';
  timestamp: number;
  isFavorite: boolean;
}

interface KeyNumberNode {
  id: string;
  title: string;
  children?: KeyNumberNode[];
  isExpanded?: boolean;
}

// Mock search results for employment discrimination
const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Davis v. General Motors Corp.',
    citation: '671 F.2d 100 (6th Cir. 1982)',
    court: 'U.S. Court of Appeals, Sixth Circuit',
    date: '1982-03-15',
    relevance: 98,
    snippet: 'Plaintiff alleged that defendant employer engaged in systematic discrimination based on race and gender in hiring and promotion decisions. The court found sufficient evidence of intentional discrimination under Title VII...',
    type: 'case',
  },
  {
    id: '2',
    title: 'McDonnell Douglas Corp. v. Green',
    citation: '411 U.S. 792 (1973)',
    court: 'U.S. Supreme Court',
    date: '1973-06-29',
    relevance: 96,
    snippet: 'Established the burden-shifting framework for Title VII employment discrimination claims. Plaintiff need only establish a prima facie case of discrimination by showing membership in a protected class...',
    type: 'case',
  },
  {
    id: '3',
    title: 'Texas Department of Housing v. Inclusive Communities',
    citation: '576 U.S. 521 (2015)',
    court: 'U.S. Supreme Court',
    date: '2015-06-25',
    relevance: 94,
    snippet: 'Extends the disparate impact theory of discrimination to the Fair Housing Act. Demonstrates that facially neutral policies can constitute illegal discrimination if they have a disproportionate effect...',
    type: 'case',
  },
  {
    id: '4',
    title: 'Employment Discrimination: Civil Rights Laws § 3.01',
    citation: 'Wright & Miller Federal Practice § 3.01',
    court: 'Secondary Source',
    date: '2024-01-01',
    relevance: 92,
    snippet: 'Comprehensive treatment of Title VII of the Civil Rights Act of 1964. Covers protected classes including race, color, religion, sex, and national origin. Discusses both intentional discrimination and disparate impact theories...',
    type: 'secondary',
  },
  {
    id: '5',
    title: 'EEOC v. Maricopa County',
    citation: '736 F.3d 510 (9th Cir. 2013)',
    court: 'U.S. Court of Appeals, Ninth Circuit',
    date: '2013-08-09',
    relevance: 90,
    snippet: 'Plaintiff alleged gender discrimination in hiring decisions. The court found the employer failed to adequately rebut the prima facie case with legitimate, non-discriminatory reasons for the hiring decisions...',
    type: 'case',
  },
  {
    id: '6',
    title: 'Diversity in Recruitment and Selection: Best Practices',
    citation: 'Bureau of Labor Statistics Analysis, 2023',
    court: 'Federal Regulation/Guidance',
    date: '2023-06-15',
    relevance: 87,
    snippet: 'EEOC guidance on employer obligations to maintain diverse hiring practices. Discusses statistical evidence of discrimination, documentation requirements, and affirmative action considerations in federal contracts...',
    type: 'regulation',
  },
  {
    id: '7',
    title: 'Smith v. St. Louis Public Schools',
    citation: '718 F.3d 677 (8th Cir. 2013)',
    court: 'U.S. Court of Appeals, Eighth Circuit',
    date: '2013-09-23',
    relevance: 85,
    snippet: 'Class action employment discrimination case involving alleged systemic discrimination in promotion decisions. Evidence included statistical disparity analysis showing significant underrepresentation of minority employees...',
    type: 'brief',
  },
  {
    id: '8',
    title: 'Johnson v. TransUnion LLC - Settlement',
    citation: 'N.D. Ill. Docket No. 09-cv-4361',
    court: 'Northern District of Illinois',
    date: '2023-02-14',
    relevance: 83,
    snippet: 'Settlement of class action alleging credit reporting company engaged in discriminatory practices. Settlement agreement establishes framework for identifying and compensating class members affected by discriminatory business practices...',
    type: 'docket',
  },
  {
    id: '9',
    title: 'New EEOC Guidance on Remote Work Discrimination Claims',
    citation: 'EEOC News Release 23-047',
    court: 'EEOC/News',
    date: '2024-03-01',
    relevance: 79,
    snippet: 'EEOC issues updated guidance addressing potential discrimination issues in remote work policies. Guidance addresses how work-from-home policies can create disparate impacts on protected classes and intersectional discrimination issues...',
    type: 'news',
  },
  {
    id: '10',
    title: 'Statutory Framework: Title VII of the Civil Rights Act',
    citation: '42 U.S.C. § 2000e et seq.',
    court: 'Federal Statute',
    date: '1964-07-02',
    relevance: 77,
    snippet: 'The foundational federal statute prohibiting employment discrimination based on race, color, religion, sex, or national origin. Applies to employers with 15 or more employees. Creates private right of action with damages...',
    type: 'statute',
  },
];

// West Key Number System - hierarchical structure
const KEY_NUMBERS: KeyNumberNode[] = [
  {
    id: 'employment',
    title: 'Employment Relations',
    children: [
      {
        id: 'disc',
        title: 'Discrimination',
        children: [
          { id: 'disc-race', title: 'Race and Color Discrimination' },
          { id: 'disc-gender', title: 'Sex and Gender Discrimination' },
          { id: 'disc-religion', title: 'Religious Discrimination' },
          { id: 'disc-national', title: 'National Origin Discrimination' },
          { id: 'disc-disability', title: 'Disability Discrimination' },
          { id: 'disc-age', title: 'Age Discrimination' },
        ],
      },
      {
        id: 'harassment',
        title: 'Harassment and Hostile Work Environment',
      },
      {
        id: 'retaliation',
        title: 'Retaliation for Protected Activity',
      },
    ],
  },
  {
    id: 'civil-rights',
    title: 'Civil Rights',
    children: [
      { id: 'cr-title7', title: 'Title VII - Civil Rights Act of 1964' },
      { id: 'cr-ada', title: 'Americans with Disabilities Act' },
      { id: 'cr-adea', title: 'Age Discrimination in Employment Act' },
      { id: 'cr-equal-pay', title: 'Equal Pay Act' },
    ],
  },
];

// Connector reference data
const CONNECTORS = [
  { symbol: '&', name: 'AND', description: 'Both terms must appear', example: 'discrimination & retaliation' },
  { symbol: 'space', name: 'OR', description: 'Either term may appear', example: 'sex OR gender OR woman' },
  { symbol: '/p', name: 'Within Paragraph', description: 'Terms in same paragraph', example: 'intentional /p discrimination' },
  { symbol: '/s', name: 'Within Sentence', description: 'Terms in same sentence', example: 'evidence /s discrimination' },
  { symbol: '/n', name: 'Within N Words', description: 'Terms within n words', example: 'employer /5 discriminated' },
  { symbol: '%', name: 'NOT', description: 'Exclude this term', example: 'discrimination % federal' },
  { symbol: '""', name: 'Phrase', description: 'Exact phrase match', example: '"disparate impact"' },
  { symbol: '!', name: 'Root Expander', description: 'Include root variations', example: 'discriminat!' },
  { symbol: '*', name: 'Universal Character', description: 'Wildcard for one character', example: 'wom*n' },
];

// Jurisdiction data
const JURISDICTIONS = {
  federal: {
    label: 'Federal',
    children: [
      { label: 'U.S. Supreme Court' },
      { label: 'First Circuit' },
      { label: 'Second Circuit' },
      { label: 'Third Circuit' },
      { label: 'Fourth Circuit' },
      { label: 'Fifth Circuit' },
      { label: 'Sixth Circuit' },
      { label: 'Seventh Circuit' },
      { label: 'Eighth Circuit' },
      { label: 'Ninth Circuit' },
      { label: 'Tenth Circuit' },
      { label: 'Eleventh Circuit' },
      { label: 'D.C. Circuit' },
      { label: 'Federal Circuit' },
    ],
  },
};

export default function AdvancedSearchPage() {
  // Search mode state
  const [searchMode, setSearchMode] = useState<'natural' | 'boolean'>('natural');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>(MOCK_RESULTS);

  // Filter state
  const [contentTypes, setContentTypes] = useState<Set<SearchResult['type']>>(new Set(['case', 'statute', 'regulation', 'secondary', 'brief', 'docket', 'news'] as SearchResult['type'][]));
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '1y' | '5y' | 'custom'>('5y');
  const [customDateStart, setCustomDateStart] = useState('');
  const [customDateEnd, setCustomDateEnd] = useState('');

  // Results display state
  const [sortBy, setSortBy] = useState<'relevance' | 'date-newest' | 'date-oldest' | 'court-level'>('relevance');
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [favoriteResults, setFavoriteResults] = useState<Set<string>>(new Set());

  // History and key number state
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [expandedKeyNumbers, setExpandedKeyNumbers] = useState<Set<string>>(new Set(['employment', 'disc']));

  // Content type options
  const contentTypeOptions: { label: string; value: SearchResult['type'] }[] = [
    { label: 'Cases', value: 'case' },
    { label: 'Statutes', value: 'statute' },
    { label: 'Regulations', value: 'regulation' },
    { label: 'Secondary Sources', value: 'secondary' },
    { label: 'Briefs', value: 'brief' },
    { label: 'Dockets', value: 'docket' },
    { label: 'News', value: 'news' },
  ];

  // Handlers
  const handleSearch = useCallback(() => {
    if (!query.trim()) return;

    // Add to history
    const historyItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query,
      mode: searchMode,
      timestamp: Date.now(),
      isFavorite: false,
    };
    setSearchHistory(prev => [historyItem, ...prev.slice(0, 19)]);

    // Mock: Sort results based on selected sort
    const sorted = [...MOCK_RESULTS].sort((a, b) => {
      if (sortBy === 'relevance') return b.relevance - a.relevance;
      if (sortBy === 'date-newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'date-oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      return 0;
    });
    setResults(sorted);
  }, [query, searchMode, sortBy]);

  const handleContentTypeToggle = (type: SearchResult['type']) => {
    const newTypes = new Set(contentTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setContentTypes(newTypes);
  };

  const handleJurisdictionToggle = (jurisdiction: string) => {
    const newJurisdictions = new Set(selectedJurisdictions);
    if (newJurisdictions.has(jurisdiction)) {
      newJurisdictions.delete(jurisdiction);
    } else {
      newJurisdictions.add(jurisdiction);
    }
    setSelectedJurisdictions(newJurisdictions);
  };

  const toggleResultExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedResults(newExpanded);
  };

  const toggleFavorite = (resultId: string) => {
    const newFavorites = new Set(favoriteResults);
    if (newFavorites.has(resultId)) {
      newFavorites.delete(resultId);
    } else {
      newFavorites.add(resultId);
    }
    setFavoriteResults(newFavorites);
  };

  const toggleKeyNumber = (nodeId: string) => {
    const newExpanded = new Set(expandedKeyNumbers);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedKeyNumbers(newExpanded);
  };

  const filteredResults = useMemo(() => {
    return results.filter(r => contentTypes.has(r.type));
  }, [results, contentTypes]);

  // Helper: render key number tree
  const renderKeyNumbers = (nodes: KeyNumberNode[], depth: number = 0): React.ReactNode => {
    return (
      <div style={{ marginLeft: depth > 0 ? '12px' : '0' }}>
        {nodes.map(node => (
          <div key={node.id} style={{ marginBottom: '4px' }}>
            <div
              onClick={() => toggleKeyNumber(node.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 0',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                userSelect: 'none',
              }}
            >
              {node.children && node.children.length > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    width: '16px',
                    height: '16px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 150ms ease',
                    transform: expandedKeyNumbers.has(node.id) ? 'rotate(0deg)' : 'rotate(-90deg)',
                  }}
                >
                  <ChevronDownIcon size={14} color="var(--text2)" />
                </span>
              )}
              {!node.children && <span style={{ width: '16px' }} />}
              <span>{node.title}</span>
            </div>
            {node.children && expandedKeyNumbers.has(node.id) && renderKeyNumbers(node.children, depth + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ background: 'var(--surf)', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .advanced-search-header {
          background: var(--card);
          border-bottom: 1px solid var(--bdr);
          padding: 32px 24px;
        }
        .search-input {
          width: 100%;
          padding: 14px 16px;
          fontSize: 15px;
          border: 1px solid var(--bdr);
          border-radius: 2px;
          background: var(--card);
          color: var(--text-primary);
          fontFamily: var(--font-ui);
          box-sizing: border-box;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--link);
          box-shadow: var(--shadow-focus);
        }
        .mode-toggle {
          display: inline-flex;
          border-radius: 2px;
          border: 1px solid var(--bdr);
          background: var(--card);
          gap: 0;
        }
        .mode-button {
          padding: 8px 16px;
          fontSize: 13px;
          fontWeight: 600;
          border: none;
          background: transparent;
          color: var(--text-primary);
          fontFamily: var(--font-ui);
          cursor: pointer;
          transition: all 150ms ease;
        }
        .mode-button.active {
          background: var(--link);
          color: white;
        }
        .connector-ref {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }
        .connector-item {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 3px;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 12px;
        }
        .connector-symbol {
          color: var(--gold);
          font-weight: 700;
          font-size: 14px;
        }
        .connector-name {
          color: var(--text-primary);
          font-weight: 600;
          margin-top: 4px;
        }
        .connector-desc {
          color: var(--text3);
          font-size: 11px;
          margin-top: 2px;
          font-family: var(--font-ui);
        }
        .results-container {
          display: grid;
          grid-template-columns: 1fr 280px 240px;
          gap: 24px;
          maxWidth: 1200px;
          margin: 0 auto;
          padding: 24px;
        }
        .result-card {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 4px;
          padding: 16px;
          transition: border-color 150ms ease, box-shadow 150ms ease;
          cursor: pointer;
        }
        .result-card:hover {
          border-color: var(--link);
          box-shadow: var(--shadow-xs);
        }
        .result-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--link);
          margin: 0 0 8px;
          font-family: var(--font-ui);
        }
        .result-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .result-meta-item {
          font-size: 11px;
          color: var(--text3);
          fontFamily: var(--font-mono);
        }
        .result-snippet {
          font-size: 13px;
          color: var(--text2);
          line-height: 1.5;
          margin-bottom: 8px;
          font-family: var(--font-ui);
        }
        .result-relevance {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text3);
          fontFamily: var(--font-mono);
        }
        .relevance-bar {
          width: 40px;
          height: 4px;
          background: var(--bdr);
          border-radius: 1px;
          overflow: hidden;
        }
        .relevance-fill {
          height: 100%;
          background: var(--gold);
          border-radius: 1px;
        }
        .filter-section {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 4px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .filter-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          fontFamily: var(--font-ui);
        }
        .filter-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-size: 13px;
          color: var(--text2);
          fontFamily: var(--font-ui);
        }
        .filter-option input[type="checkbox"] {
          accentColor: var(--gold);
          cursor: pointer;
        }
        .sort-select {
          width: 100%;
          padding: 8px;
          font-size: 13px;
          border: 1px solid var(--bdr);
          border-radius: 2px;
          background: var(--card);
          color: var(--text-primary);
          fontFamily: var(--font-ui);
          cursor: pointer;
        }
        .history-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 3px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 150ms ease;
          font-size: 12px;
          color: var(--text2);
          fontFamily: var(--font-ui);
        }
        .history-item:hover {
          background: var(--surf);
          border-color: var(--link);
        }
        .favorite-star {
          cursor: pointer;
          transition: color 150ms ease;
          color: var(--text3);
        }
        .favorite-star.active {
          color: var(--gold);
        }
        @media (max-width: 1024px) {
          .results-container {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      {/* Header */}
      <div className="advanced-search-header">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '2px 8px', marginBottom: 12,
            borderRadius: 3,
            border: '1px solid rgba(10, 80, 160, 0.2)',
            background: 'rgba(10, 80, 160, 0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            color: 'var(--chrome-bg)',
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            Advanced Research
          </div>
          <h1 style={{
            fontSize: 28, fontWeight: 700,
            color: 'var(--text-primary)', margin: '0 0 12px', letterSpacing: '-0.025em',
            fontFamily: 'var(--font-legal)', lineHeight: 1.1,
          }}>
            Advanced Legal Research
          </h1>
          <p style={{
            fontSize: 15, color: 'var(--text3)', margin: 0, lineHeight: 1.6, maxWidth: 640,
            fontFamily: 'var(--font-ui)',
          }}>
            Search millions of cases, statutes, and legal documents using natural language or Boolean operators.
          </p>
        </div>
      </div>

      {/* Search Mode Toggle & Main Search */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--bdr)', padding: '24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Search Mode
            </label>
            <div className="mode-toggle">
              <button
                className={`mode-button ${searchMode === 'natural' ? 'active' : ''}`}
                onClick={() => setSearchMode('natural')}
              >
                Natural Language
              </button>
              <button
                className={`mode-button ${searchMode === 'boolean' ? 'active' : ''}`}
                onClick={() => setSearchMode('boolean')}
              >
                Terms & Connectors
              </button>
            </div>
          </div>

          {/* Search input */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SearchIcon size={18} color="var(--text3)" />
            </div>
            <input
              type="text"
              placeholder={searchMode === 'natural'
                ? 'Find employment discrimination cases in tech industry...'
                : 'discriminat! & (technology OR software) & jurisdiction(fed)'}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="search-input"
              style={{ paddingLeft: '48px' }}
              aria-label="Advanced search query"
            />
          </div>

          {/* Search button and example queries */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: searchMode === 'boolean' ? 16 : 0 }}>
            <button
              onClick={handleSearch}
              style={{
                padding: '10px 24px',
                background: 'var(--gold)',
                color: 'white',
                border: 'none',
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 13,
                fontFamily: 'var(--font-ui)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
            >
              Search
            </button>
            {searchMode === 'natural' && (
              <div style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-ui)' }}>
                Example: &ldquo;race discrimination in hiring&rdquo; or &ldquo;gender wage gap damages&rdquo;
              </div>
            )}
          </div>

          {/* Boolean connector reference */}
          {searchMode === 'boolean' && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-ui)' }}>
                Connector Reference
              </div>
              <div className="connector-ref">
                {CONNECTORS.map(conn => (
                  <div key={conn.symbol} className="connector-item">
                    <div className="connector-symbol">{conn.symbol}</div>
                    <div className="connector-name">{conn.name}</div>
                    <div className="connector-desc">{conn.description}</div>
                    <div style={{ marginTop: 4, fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                      {conn.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Field-specific search hints for boolean mode */}
      {searchMode === 'boolean' && (
        <div style={{ background: 'var(--bhn)', border: '1px solid var(--bhn-border)', padding: '12px 16px', margin: '16px 24px', borderRadius: 3 }}>
          <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Field Codes:</strong> ti() title • ju() judge • at() attorney • da() date • ct() court • ju() jurisdiction<br/>
            <strong style={{ color: 'var(--text-primary)' }}>Example:</strong> ti(&ldquo;employment discrimination&rdquo;) & da(aft 2020-01-01)
          </div>
        </div>
      )}

      {/* Results Section */}
      {query && (
        <div className="results-container">
          {/* Main Results */}
          <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {filteredResults.length} Results
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="sort-select">
                <option value="relevance">Relevance</option>
                <option value="date-newest">Newest First</option>
                <option value="date-oldest">Oldest First</option>
                <option value="court-level">Court Level</option>
              </select>
            </div>

            {/* Results List */}
            {filteredResults.map((result) => (
              <div key={result.id} className="result-card" onClick={() => toggleResultExpanded(result.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <h3 className="result-title">{result.title}</h3>
                    <div className="result-meta">
                      <span className="result-meta-item">{result.citation}</span>
                      <span className="result-meta-item">{result.court}</span>
                      <span className="result-meta-item">{new Date(result.date).getFullYear()}</span>
                    </div>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(result.id);
                    }}
                    className={`favorite-star ${favoriteResults.has(result.id) ? 'active' : ''}`}
                    style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer' }}
                    aria-label={favoriteResults.has(result.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <StarIcon size={16} color={favoriteResults.has(result.id) ? 'var(--gold)' : 'var(--bdr)'} />
                  </button>
                </div>

                <p className="result-snippet">{result.snippet}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="result-relevance">
                    <div className="relevance-bar">
                      <div className="relevance-fill" style={{ width: `${result.relevance}%` }} />
                    </div>
                    <span>{result.relevance}%</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-ui)', textTransform: 'capitalize' }}>
                    {result.type}
                  </span>
                </div>

                {/* Expanded details */}
                {expandedResults.has(result.id) && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--bdr)', fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>Full citation:</strong> {result.citation}
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>Court:</strong> {result.court}
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>Date:</strong> {new Date(result.date).toLocaleDateString()}
                    </p>
                    <button style={{
                      padding: '6px 12px',
                      background: 'var(--link)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 2,
                      fontSize: 12,
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginTop: 8,
                    }}>
                      View Full Document
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar: Filters */}
          <div>
            <div className="filter-section">
              <div className="filter-title">Content Type</div>
              {contentTypeOptions.map(opt => (
                <label key={opt.value} className="filter-option">
                  <input
                    type="checkbox"
                    checked={contentTypes.has(opt.value)}
                    onChange={() => handleContentTypeToggle(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <div className="filter-title">Date Range</div>
              {(['7d', '30d', '1y', '5y', 'custom'] as const).map(range => (
                <label key={range} className="filter-option">
                  <input
                    type="radio"
                    name="dateRange"
                    checked={dateRange === range}
                    onChange={() => setDateRange(range)}
                  />
                  {range === '7d' && 'Last 7 Days'}
                  {range === '30d' && 'Last 30 Days'}
                  {range === '1y' && 'Last Year'}
                  {range === '5y' && 'Last 5 Years'}
                  {range === 'custom' && 'Custom Range'}
                </label>
              ))}
              {dateRange === 'custom' && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input type="date" value={customDateStart} onChange={e => setCustomDateStart(e.target.value)} style={{ padding: '6px', fontSize: 12, border: '1px solid var(--bdr)', borderRadius: 2 }} />
                  <input type="date" value={customDateEnd} onChange={e => setCustomDateEnd(e.target.value)} style={{ padding: '6px', fontSize: 12, border: '1px solid var(--bdr)', borderRadius: 2 }} />
                </div>
              )}
            </div>

            <div className="filter-section">
              <div className="filter-title">Jurisdiction</div>
              {JURISDICTIONS.federal.children.slice(0, 5).map(j => (
                <label key={j.label} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedJurisdictions.has(j.label)}
                    onChange={() => handleJurisdictionToggle(j.label)}
                  />
                  {j.label}
                </label>
              ))}
              {JURISDICTIONS.federal.children.length > 5 && (
                <div style={{ fontSize: 12, color: 'var(--link)', cursor: 'pointer', marginTop: 8 }}>
                  +{JURISDICTIONS.federal.children.length - 5} more
                </div>
              )}
            </div>
          </div>

          {/* Right Rail: Key Numbers & History */}
          <div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 4, padding: 16, marginBottom: 16 }}>
              <div className="filter-title" style={{ marginBottom: 12 }}>
                West Key Numbers
              </div>
              {renderKeyNumbers(KEY_NUMBERS)}
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 4, padding: 16 }}>
              <div className="filter-title" style={{ marginBottom: 12 }}>
                Search History
              </div>
              {searchHistory.length === 0 ? (
                <p style={{ fontSize: 12, color: 'var(--text3)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                  No recent searches
                </p>
              ) : (
                searchHistory.map(item => (
                  <div
                    key={item.id}
                    className="history-item"
                    onClick={() => {
                      setQuery(item.query);
                      setSearchMode(item.mode);
                    }}
                  >
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.query}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setFavoriteResults(prev => {
                          const next = new Set(prev);
                          if (item.isFavorite) next.delete(item.id);
                          else next.add(item.id);
                          return next;
                        });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '2px',
                        cursor: 'pointer',
                      }}
                    >
                      <StarIcon size={12} color={item.isFavorite ? 'var(--gold)' : 'var(--bdr)'} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!query && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12, fontFamily: 'var(--font-ui)' }}>
            Start Your Research
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 32, fontFamily: 'var(--font-ui)' }}>
            Enter a search query above to find relevant cases, statutes, and legal documents.
          </p>

          {/* Quick example queries */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { text: 'Employment discrimination cases', query: 'employment discrimination' },
              { text: 'Title VII violations with settlements', query: 'Title VII /p settlement' },
              { text: 'Recent age discrimination cases', query: 'age discrimination 2023' },
              { text: 'Class action employment disputes', query: 'class action & employment' },
            ].map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(example.query);
                  setSearchMode('natural');
                }}
                style={{
                  padding: '12px 16px',
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  fontSize: 13,
                  color: 'var(--link)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-ui)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--link)';
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--link-light)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--bdr)';
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--card)';
                }}
              >
                {example.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { name: 'KeyCite', href: '/attorney/keycite', desc: 'Citation validation and case treatment analysis' },
              { name: 'Secondary Sources', href: '/attorney/secondary-sources', desc: 'Legal secondary sources and treatises' },
              { name: 'State Survey', href: '/attorney/state-survey', desc: 'State-by-state legal survey analysis' },
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
    </div>
  );
}
