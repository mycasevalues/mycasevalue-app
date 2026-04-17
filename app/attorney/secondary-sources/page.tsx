'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';

// Type definitions
interface SecondarySource {
  id: string;
  title: string;
  category: 'treatise' | 'encyclopedia' | 'law-review' | 'practice-guide' | 'form' | 'restatement' | 'jury-instruction';
  author: string;
  publisher: string;
  edition: string;
  lastUpdated: string;
  coverage: string;
  jurisdiction: string[];
  topicAreas: string[];
  isFavorite?: boolean;
  views?: number;
  usageCount?: number;
  tableOfContents?: string[];
}

// Mock data: 20 realistic secondary sources
const SECONDARY_SOURCES: SecondarySource[] = [
  {
    id: '1',
    title: 'Federal Civil Procedure',
    category: 'treatise',
    author: 'James W. Moore, Jo Desha Lucas',
    publisher: 'LexisNexis',
    edition: '3rd Edition (2023)',
    lastUpdated: 'March 2024',
    coverage: 'Comprehensive treatise covering all aspects of federal civil procedure under the Federal Rules of Civil Procedure',
    jurisdiction: ['federal'],
    topicAreas: ['civil-procedure', 'federal-rules'],
    views: 1243,
    usageCount: 487,
    tableOfContents: ['Rule 1: Scope of Rules', 'Rule 4: Summons', 'Rule 11: Signing of Pleadings', 'Rule 26: General Provisions Governing Discovery', 'Rule 56: Summary Judgment'],
  },
  {
    id: '2',
    title: 'Fundamentals of Patent Law',
    category: 'practice-guide',
    author: 'Janet Freilich, Sapna Kumar',
    publisher: 'West Publishing',
    edition: '5th Edition (2024)',
    lastUpdated: 'February 2024',
    coverage: 'Practical guide to patent prosecution, litigation, and licensing with checklists and forms',
    jurisdiction: ['federal'],
    topicAreas: ['patent', 'intellectual-property'],
    views: 892,
    usageCount: 312,
    tableOfContents: ['Patent Prosecution Checklist', 'Claim Drafting Strategies', 'Patent Infringement Analysis', 'Licensing Agreements', 'Patent Litigation Overview'],
  },
  {
    id: '3',
    title: 'American Jurisprudence (Am. Jur. 2d)',
    category: 'encyclopedia',
    author: 'Thomson Reuters Editorial Staff',
    publisher: 'Thomson Reuters',
    edition: 'Updated to 2024',
    lastUpdated: 'April 2024',
    coverage: 'Comprehensive legal encyclopedia covering every area of substantive and procedural law',
    jurisdiction: ['federal', 'alabama', 'alaska', 'arizona'],
    topicAreas: ['general', 'all-areas'],
    views: 2156,
    usageCount: 923,
    tableOfContents: ['Abandonment', 'Abatement and Revival', 'Abuse of Process', 'Acceleration', 'Acceptance of Goods'],
  },
  {
    id: '4',
    title: 'Employment Law: A Practical Guide',
    category: 'practice-guide',
    author: 'Noah Fineberg, Paul Hastings',
    publisher: 'BNA',
    edition: '7th Edition (2023)',
    lastUpdated: 'January 2024',
    coverage: 'Practical approaches to employment law issues including discrimination, wage & hour, and FMLA',
    jurisdiction: ['federal', 'california', 'new-york', 'texas'],
    topicAreas: ['employment', 'labor'],
    views: 1645,
    usageCount: 678,
    tableOfContents: ['Title VII Discrimination', 'Wage and Hour Compliance', 'FMLA Obligations', 'ADA Requirements', 'Termination Protocols'],
  },
  {
    id: '5',
    title: 'Modern Commercial Transactions',
    category: 'treatise',
    author: 'Robert J. Nordstrom',
    publisher: 'LexisNexis',
    edition: '2nd Edition (2023)',
    lastUpdated: 'March 2024',
    coverage: 'In-depth analysis of UCC Articles 1-9, commercial paper, secured transactions, and sales',
    jurisdiction: ['federal'],
    topicAreas: ['commercial', 'ucc'],
    views: 756,
    usageCount: 234,
    tableOfContents: ['UCC Article 1: General Provisions', 'Article 3: Negotiable Instruments', 'Article 9: Secured Transactions', 'Sales Under Article 2', 'Warranties and Disclaimers'],
  },
  {
    id: '6',
    title: 'Law Review: Quarterly Journal of Legal Studies',
    category: 'law-review',
    author: 'Stanford Law School',
    publisher: 'Stanford University',
    edition: 'Vol. 76, No. 2 (2024)',
    lastUpdated: 'April 2024',
    coverage: 'Peer-reviewed articles on emerging legal issues, judicial trends, and innovative legal theories',
    jurisdiction: ['federal'],
    topicAreas: ['legal-theory', 'emerging-issues'],
    views: 443,
    usageCount: 156,
    tableOfContents: ['Article 1: Digital Privacy and Fourth Amendment', 'Article 2: AI Liability Frameworks', 'Article 3: ESG and Corporate Governance'],
  },
  {
    id: '7',
    title: 'Restatement (Third) of Torts',
    category: 'restatement',
    author: 'American Law Institute',
    publisher: 'American Law Institute',
    edition: '3rd Restatement (2010-ongoing)',
    lastUpdated: 'February 2024',
    coverage: 'Authoritative restatement of tort law including negligence, strict liability, and defamation',
    jurisdiction: ['federal'],
    topicAreas: ['tort', 'negligence'],
    views: 1567,
    usageCount: 612,
    tableOfContents: ['Chapter 1: Liability for Physical and Emotional Harm', 'Chapter 2: Negligence', 'Chapter 3: Strict Liability', 'Chapter 4: Defamation'],
  },
  {
    id: '8',
    title: 'California Family Law Practice',
    category: 'practice-guide',
    author: 'Family Law Section, State Bar of California',
    publisher: 'West Publishing',
    edition: '2024 Edition',
    lastUpdated: 'April 2024',
    coverage: 'Complete practice guide to California family law including divorce, custody, support, and property division',
    jurisdiction: ['california'],
    topicAreas: ['family', 'estate-planning'],
    views: 987,
    usageCount: 445,
    tableOfContents: ['Marital Property Division', 'Child Custody Standards', 'Child Support Guidelines', 'Spousal Support', 'Domestic Violence Orders'],
  },
  {
    id: '9',
    title: 'Federal Criminal Procedure',
    category: 'treatise',
    author: 'Charles H. Whitebread, Christopher Slobogin',
    publisher: 'Thomson Reuters',
    edition: '5th Edition (2023)',
    lastUpdated: 'March 2024',
    coverage: 'Authoritative treatment of federal criminal procedure, constitutional protections, and discovery rules',
    jurisdiction: ['federal'],
    topicAreas: ['criminal', 'evidence'],
    views: 1234,
    usageCount: 501,
    tableOfContents: ['Fourth Amendment: Search and Seizure', 'Fifth Amendment: Self-Incrimination', 'Sixth Amendment: Right to Counsel', 'Discovery Obligations', 'Sentencing Guidelines'],
  },
  {
    id: '10',
    title: 'Real Property Practice Forms and Clauses',
    category: 'form',
    author: 'American College of Real Estate Lawyers',
    publisher: 'West Publishing',
    edition: '2nd Edition (2023)',
    lastUpdated: 'February 2024',
    coverage: 'Comprehensive collection of real estate transaction forms, deed templates, and contract language',
    jurisdiction: ['federal'],
    topicAreas: ['real-estate', 'contracts'],
    views: 654,
    usageCount: 389,
    tableOfContents: ['Purchase Agreements', 'Warranty Deed Forms', 'Mortgage Documents', 'Lease Templates', 'Easement Agreements'],
  },
  {
    id: '11',
    title: 'Jury Instructions on Federal Questions (INSTR)',
    category: 'jury-instruction',
    author: 'Federal Judicial Center',
    publisher: 'Federal Judicial Center',
    edition: '2024 Edition',
    lastUpdated: 'April 2024',
    coverage: 'Official jury instructions for federal civil cases covering contract, tort, and statutory claims',
    jurisdiction: ['federal'],
    topicAreas: ['evidence', 'trial-practice'],
    views: 2089,
    usageCount: 834,
    tableOfContents: ['Contract Formation Instructions', 'Damages Instructions', 'Burden of Proof', 'Comparative Negligence', 'Punitive Damages'],
  },
  {
    id: '12',
    title: 'Securities Regulation: Law and Practice',
    category: 'treatise',
    author: 'Louis Loss, Joel Seligman, Maureen Stipp',
    publisher: 'Aspen Publishers',
    edition: '6th Edition (2022)',
    lastUpdated: 'January 2024',
    coverage: 'Comprehensive reference on federal and state securities law, including public offerings and private placements',
    jurisdiction: ['federal'],
    topicAreas: ['securities', 'corporate'],
    views: 523,
    usageCount: 178,
    tableOfContents: ['SEC Jurisdiction and Authority', 'Registration Requirements', 'Insider Trading', '10b-5 Liability', 'Section 16 Transactions'],
  },
  {
    id: '13',
    title: 'Bankruptcy Practice and Procedure',
    category: 'practice-guide',
    author: 'Hon. Brenda Poppy Smith',
    publisher: 'LexisNexis',
    edition: '3rd Edition (2024)',
    lastUpdated: 'March 2024',
    coverage: 'Practical guide to bankruptcy law with forms, timelines, and strategies for creditors and debtors',
    jurisdiction: ['federal'],
    topicAreas: ['bankruptcy', 'creditor-debtor'],
    views: 876,
    usageCount: 341,
    tableOfContents: ['Chapter 7 Liquidation', 'Chapter 13 Reorganization', 'Automatic Stay Limitations', 'Discharge Exceptions', 'Adversary Proceeding Rules'],
  },
  {
    id: '14',
    title: 'Texas Civil Practice and Remedies Code Annotated',
    category: 'encyclopedia',
    author: 'Vernon\'s Editorial Staff',
    publisher: 'Thomson Reuters',
    edition: '2024 Edition',
    lastUpdated: 'April 2024',
    coverage: 'Annotated statutory text with commentary, case notes, and practice references for Texas civil procedures',
    jurisdiction: ['texas'],
    topicAreas: ['civil-procedure', 'state-specific'],
    views: 645,
    usageCount: 267,
    tableOfContents: ['Title 1: General Provisions', 'Title 2: Trial, Judgment, and Appeal', 'Chapter 27: Parties', 'Chapter 28: Venue', 'Chapter 34: Damages'],
  },
  {
    id: '15',
    title: 'Environmental Law: Wetlands Handbook',
    category: 'practice-guide',
    author: 'Environmental Law Institute',
    publisher: 'Environmental Law Institute',
    edition: '4th Edition (2023)',
    lastUpdated: 'February 2024',
    coverage: 'Practical guide to federal and state wetlands regulations, permitting processes, and enforcement',
    jurisdiction: ['federal'],
    topicAreas: ['environmental', 'administrative'],
    views: 389,
    usageCount: 112,
    tableOfContents: ['CWA Section 404 Overview', 'Jurisdictional Determinations', 'Permit Application Process', 'Mitigation Requirements', 'Enforcement Penalties'],
  },
  {
    id: '16',
    title: 'New York Pattern Jury Instructions',
    category: 'jury-instruction',
    author: 'Association of Judges of New York',
    publisher: 'West Publishing',
    edition: '2024 Edition',
    lastUpdated: 'March 2024',
    coverage: 'Approved jury instructions for New York civil trials covering contracts, torts, and special verdicts',
    jurisdiction: ['new-york'],
    topicAreas: ['evidence', 'trial-practice'],
    views: 734,
    usageCount: 298,
    tableOfContents: ['CPLR General Instructions', 'Contract Formation and Performance', 'Negligence and Proximate Cause', 'Property Damage and Personal Injury'],
  },
  {
    id: '17',
    title: 'International Commercial Arbitration',
    category: 'treatise',
    author: 'Albert Jan van den Berg',
    publisher: 'Kluwer Law International',
    edition: 'International Handbook (2023)',
    lastUpdated: 'January 2024',
    coverage: 'Comprehensive treatise on arbitration law, procedure, and enforcement of awards under UNCITRAL Model Law',
    jurisdiction: ['federal'],
    topicAreas: ['arbitration', 'dispute-resolution'],
    views: 267,
    usageCount: 89,
    tableOfContents: ['Arbitration Agreement', 'Arbitrator Selection', 'Arbitral Procedure', 'Awards and Enforcement', 'Convention Recognition'],
  },
  {
    id: '18',
    title: 'Tax Practice Series: Corporate Tax Planning',
    category: 'law-review',
    author: 'American Bar Association Section of Taxation',
    publisher: 'American Bar Association',
    edition: 'Vol. 34 (2024)',
    lastUpdated: 'April 2024',
    coverage: 'Articles on current corporate tax issues, planning strategies, and IRS developments',
    jurisdiction: ['federal'],
    topicAreas: ['tax', 'corporate'],
    views: 456,
    usageCount: 187,
    tableOfContents: ['C Corporation Taxation', 'Pass-Through Entity Planning', 'M&A Tax Considerations', 'IRS Examination Trends'],
  },
  {
    id: '19',
    title: 'Intellectual Property Litigation Handbook',
    category: 'practice-guide',
    author: 'Practical Law IP Litigation',
    publisher: 'Thomson Reuters',
    edition: '2024 Edition',
    lastUpdated: 'March 2024',
    coverage: 'Comprehensive guide to IP litigation including patent, trademark, copyright, and trade secret disputes',
    jurisdiction: ['federal'],
    topicAreas: ['intellectual-property', 'litigation'],
    views: 812,
    usageCount: 356,
    tableOfContents: ['Patent Infringement Pleading', 'Trademark Infringement Litigation', 'Copyright Claim Elements', 'Trade Secret Misappropriation', 'Damages Calculation'],
  },
  {
    id: '20',
    title: 'Restatement (Second) of Contracts',
    category: 'restatement',
    author: 'American Law Institute',
    publisher: 'American Law Institute',
    edition: '2nd Restatement (1981, updated to 2024)',
    lastUpdated: 'April 2024',
    coverage: 'Authoritative restatement of contract law with comprehensive commentary and illustrations',
    jurisdiction: ['federal'],
    topicAreas: ['contracts', 'general'],
    views: 2341,
    usageCount: 1089,
    tableOfContents: ['Chapter 1: Meaning of Terms', 'Chapter 2: Formation of Contracts', 'Chapter 3: Terms', 'Chapter 4: Mistake', 'Chapter 5: Conditional Terms'],
  },
];

const CATEGORIES = [
  { id: 'treatise', label: 'Treatises', count: 6 },
  { id: 'encyclopedia', label: 'Legal Encyclopedias', count: 3 },
  { id: 'law-review', label: 'Law Reviews & Journals', count: 3 },
  { id: 'practice-guide', label: 'Practice Guides', count: 5 },
  { id: 'form', label: 'Forms', count: 1 },
  { id: 'restatement', label: 'Restatements', count: 2 },
  { id: 'jury-instruction', label: 'Jury Instructions', count: 3 },
];

const JURISDICTIONS = [
  'federal',
  'alabama', 'alaska', 'arizona', 'arkansas', 'california',
  'colorado', 'connecticut', 'delaware', 'florida', 'georgia',
  'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland',
  'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri',
  'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey',
  'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina',
  'south-dakota', 'tennessee', 'texas', 'utah', 'vermont',
  'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming',
];

const TOPIC_AREAS = [
  'civil-procedure', 'criminal', 'patent', 'intellectual-property',
  'employment', 'labor', 'commercial', 'ucc', 'tort', 'negligence',
  'family', 'estate-planning', 'real-estate', 'contracts', 'evidence',
  'trial-practice', 'securities', 'corporate', 'bankruptcy', 'creditor-debtor',
  'state-specific', 'administrative', 'environmental', 'arbitration', 'dispute-resolution',
  'tax', 'litigation', 'general', 'federal-rules', 'legal-theory', 'emerging-issues', 'all-areas',
];

export default function SecondarySourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(['federal']);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedSource, setSelectedSource] = useState<SecondarySource | null>(null);

  // Filter and search logic
  const filteredSources = useMemo(() => {
    return SECONDARY_SOURCES.filter((source) => {
      const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.publisher.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !activeCategory || source.category === activeCategory;

      const matchesJurisdiction = selectedJurisdictions.length === 0 ||
        source.jurisdiction.some((j) => selectedJurisdictions.includes(j));

      const matchesTopic = selectedTopics.length === 0 ||
        source.topicAreas.some((t) => selectedTopics.includes(t));

      return matchesSearch && matchesCategory && matchesJurisdiction && matchesTopic;
    });
  }, [searchQuery, activeCategory, selectedJurisdictions, selectedTopics]);

  // Recently viewed (mock)
  const recentlyViewed = useMemo(() => {
    return SECONDARY_SOURCES.slice(0, 3);
  }, []);

  // Frequently used (mock)
  const frequentlyUsed = useMemo(() => {
    return [...SECONDARY_SOURCES].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 4);
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const toggleJurisdiction = (jurisdiction: string) => {
    const newJurisdictions = new Set(selectedJurisdictions);
    if (newJurisdictions.has(jurisdiction)) {
      newJurisdictions.delete(jurisdiction);
    } else {
      newJurisdictions.add(jurisdiction);
    }
    setSelectedJurisdictions(Array.from(newJurisdictions));
  };

  const toggleTopic = (topic: string) => {
    const newTopics = new Set(selectedTopics);
    if (newTopics.has(topic)) {
      newTopics.delete(topic);
    } else {
      newTopics.add(topic);
    }
    setSelectedTopics(Array.from(newTopics));
  };

  const getCategoryLabel = (id: string) => {
    const cat = CATEGORIES.find((c) => c.id === id);
    return cat?.label || id;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surf)', fontFamily: 'var(--font-ui)' }}>
      <style>{`
        @media (max-width: 768px) {
          .secondary-sidebar-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .secondary-page-header { padding: 20px 12px !important; }
        }
      `}</style>
      {/* Hero Header */}
      <div style={{
        background: 'var(--chrome-bg)',
        color: 'var(--chrome-text)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--chrome-border)',
      }} className="secondary-page-header">
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <h1
            style={{
              fontFamily: 'var(--font-legal)',
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--chrome-text)',
              margin: '0 0 8px 0',
            }}
          >
            Secondary Sources Library
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--chrome-text-muted)', margin: 0 }}>
            Browse comprehensive legal research materials including treatises, encyclopedias, law reviews, and practice guides.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        background: 'var(--surface-primary)',
        padding: '24px',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
            <input
              type="text"
              placeholder="Search publications, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                backgroundColor: 'var(--surface-secondary)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: '10px 16px',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                fontWeight: '500',
                backgroundColor: 'var(--surface-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-tertiary)')}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              style={{
                padding: '10px 16px',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                fontWeight: '500',
                backgroundColor: viewMode === 'grid' ? 'var(--gold)' : 'var(--surface-tertiary)',
                color: viewMode === 'grid' ? '#FFFFFF' : 'var(--text-primary)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                if (viewMode === 'list') {
                  e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode === 'list') {
                  e.currentTarget.style.backgroundColor = 'var(--surface-tertiary)';
                }
              }}
            >
              {viewMode === 'grid' ? 'Grid' : 'List'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: showFilters ? '280px 1fr' : '1fr', gap: '24px', padding: '24px' }} className="secondary-sidebar-grid">
        {/* Sidebar Filters */}
        {showFilters && (
          <aside style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            padding: '20px',
            height: 'fit-content',
            position: 'sticky',
            top: '20px',
          }}>
            {/* Category Filter */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: 'var(--text-tertiary)',
                marginBottom: '12px',
              }}>
                Publication Type
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-ui)',
                    backgroundColor: !activeCategory ? 'var(--link-light)' : 'transparent',
                    color: !activeCategory ? 'var(--link)' : 'var(--text-primary)',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    fontWeight: !activeCategory ? '600' : '500',
                  }}
                >
                  All Sources
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: '14px',
                      fontFamily: 'var(--font-ui)',
                      backgroundColor: activeCategory === cat.id ? 'var(--link-light)' : 'transparent',
                      color: activeCategory === cat.id ? 'var(--link)' : 'var(--text-primary)',
                      border: 'none',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontWeight: activeCategory === cat.id ? '600' : '500',
                    }}
                  >
                    {cat.label} <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Jurisdiction Filter */}
            <div style={{ marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid var(--bdr)' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: 'var(--text-tertiary)',
                marginBottom: '12px',
              }}>
                Jurisdiction
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {JURISDICTIONS.slice(0, 10).map((jurisdiction) => (
                  <label key={jurisdiction} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedJurisdictions.includes(jurisdiction)}
                      onChange={() => toggleJurisdiction(jurisdiction)}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer',
                        accentColor: 'var(--link)',
                      }}
                    />
                    {jurisdiction.charAt(0).toUpperCase() + jurisdiction.slice(1).replace('-', ' ')}
                  </label>
                ))}
              </div>
            </div>

            {/* Topic Filter */}
            <div style={{ paddingTop: '24px', borderTop: '1px solid var(--bdr)' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: 'var(--text-tertiary)',
                marginBottom: '12px',
              }}>
                Topic Area
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {TOPIC_AREAS.slice(0, 12).map((topic) => (
                  <label key={topic} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic)}
                      onChange={() => toggleTopic(topic)}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer',
                        accentColor: 'var(--link)',
                      }}
                    />
                    {topic.charAt(0).toUpperCase() + topic.slice(1).replace('-', ' ')}
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          {/* Frequently Used Section */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              fontFamily: 'var(--font-ui)',
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}>
              Frequently Used
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '16px',
            }}>
              {frequentlyUsed.map((source) => (
                <div
                  key={source.id}
                  onClick={() => setSelectedSource(source)}
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '4px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--link)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bdr)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      fontSize: '11px',
                      fontWeight: '500',
                      fontFamily: 'var(--font-ui)',
                      backgroundColor: 'var(--link-light)',
                      color: 'var(--link)',
                      borderRadius: '3px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {getCategoryLabel(source.category)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(source.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                      }}
                    >
                      {favorites.has(source.id) ? '★' : '☆'}
                    </button>
                  </div>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}>
                    {source.title}
                  </h4>
                  <p style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                  }}>
                    {source.author}
                  </p>
                  <div style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-tertiary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span>{source.usageCount} uses</span>
                    <span>{source.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'var(--bdr)', marginBottom: '32px' }} />

          {/* Results Header */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              fontFamily: 'var(--font-ui)',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              Search Results
            </h2>
            <p style={{
              fontSize: '13px',
              fontFamily: 'var(--font-ui)',
              color: 'var(--text-secondary)',
            }}>
              Found {filteredSources.length} publication{filteredSources.length !== 1 ? 's' : ''}
              {activeCategory && ` in ${getCategoryLabel(activeCategory)}`}
            </p>
          </div>

          {/* Publications Grid/List */}
          {filteredSources.length > 0 ? (
            <div style={{
              display: viewMode === 'grid'
                ? 'grid'
                : 'flex',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : undefined,
              flexDirection: viewMode === 'list' ? 'column' : undefined,
              gap: '16px',
            }}>
              {filteredSources.map((source) => (
                <div
                  key={source.id}
                  onClick={() => setSelectedSource(source)}
                  style={{
                    backgroundColor: 'var(--surface-primary)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '4px',
                    padding: viewMode === 'grid' ? '20px' : '16px',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--link)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bdr)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      fontSize: '11px',
                      fontWeight: '500',
                      fontFamily: 'var(--font-ui)',
                      backgroundColor: source.category === 'treatise' ? 'var(--link-light)' : source.category === 'encyclopedia' ? 'var(--gold-light)' : 'var(--data-positive-bg)',
                      color: source.category === 'treatise' ? 'var(--link)' : source.category === 'encyclopedia' ? 'var(--gold)' : 'var(--data-positive)',
                      borderRadius: '3px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {getCategoryLabel(source.category)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(source.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: favorites.has(source.id) ? 'var(--gold)' : 'var(--text-tertiary)',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {favorites.has(source.id) ? '★' : '☆'}
                    </button>
                  </div>

                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}>
                    {source.title}
                  </h3>

                  <div style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-secondary)',
                    marginBottom: '12px',
                  }}>
                    <div>{source.author}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                      {source.publisher} • {source.edition}
                    </div>
                  </div>

                  <p style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    marginBottom: '12px',
                  }}>
                    {source.coverage}
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '12px',
                  }}>
                    {source.topicAreas.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-ui)',
                          backgroundColor: 'var(--surface-tertiary)',
                          color: 'var(--text-secondary)',
                          borderRadius: '3px',
                        }}
                      >
                        {topic.replace('-', ' ')}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-tertiary)',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--bdr)',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <span>Updated {source.lastUpdated}</span>
                    <span>{source.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--surface-primary)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '40px 20px',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-secondary)',
              }}>
                No publications found matching your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}

          {/* Related Tools */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
              {[
                { name: 'KeyCite', href: '/attorney/keycite', desc: 'Citation validation and case treatment analysis' },
                { name: 'Advanced Search', href: '/attorney/advanced-search', desc: 'Advanced legal research search tools' },
                { name: 'Folders', href: '/attorney/folders', desc: 'Organize and manage research folders' },
                { name: 'State Survey', href: '/attorney/state-survey', desc: 'State-by-state legal survey analysis' },
              ].map(tool => (
                <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedSource && (
        <div
          onClick={() => setSelectedSource(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--surface-primary)',
              borderRadius: '4px',
              padding: '32px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                {selectedSource.title}
              </h2>
              <button
                onClick={() => setSelectedSource(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: '500',
                backgroundColor: 'var(--link-light)',
                color: 'var(--link)',
                borderRadius: '3px',
                textTransform: 'uppercase',
              }}>
                {getCategoryLabel(selectedSource.category)}
              </span>
              <button
                onClick={() => toggleFavorite(selectedSource.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: favorites.has(selectedSource.id) ? 'var(--gold)' : 'var(--text-tertiary)',
                }}
              >
                {favorites.has(selectedSource.id) ? '★ Saved' : '☆ Save'}
              </button>
            </div>

            <div style={{
              fontSize: '13px',
              fontFamily: 'var(--font-ui)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '20px',
            }}>
              <div style={{ marginBottom: '8px' }}><strong>Author/Editor:</strong> {selectedSource.author}</div>
              <div style={{ marginBottom: '8px' }}><strong>Publisher:</strong> {selectedSource.publisher}</div>
              <div style={{ marginBottom: '8px' }}><strong>Edition:</strong> {selectedSource.edition}</div>
              <div><strong>Last Updated:</strong> {selectedSource.lastUpdated}</div>
            </div>

            <div style={{
              backgroundColor: 'var(--surface-tertiary)',
              padding: '16px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}>
                Coverage
              </h3>
              <p style={{
                fontSize: '13px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6',
              }}>
                {selectedSource.coverage}
              </p>
            </div>

            {selectedSource.tableOfContents && selectedSource.tableOfContents.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}>
                  Table of Contents
                </h3>
                <ul style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}>
                  {selectedSource.tableOfContents.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '13px',
                        fontFamily: 'var(--font-ui)',
                        color: 'var(--text-secondary)',
                        padding: '6px 0',
                        paddingLeft: '20px',
                        position: 'relative',
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0 }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setSelectedSource(null)}
                style={{
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: '500',
                  backgroundColor: 'var(--surface-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              <button
                style={{
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: '500',
                  backgroundColor: 'var(--gold)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              >
                Access Publication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
