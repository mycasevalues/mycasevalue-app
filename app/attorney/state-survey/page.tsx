'use client';

import { useState, useMemo } from 'react';

// US States & Territories
const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const STATE_NAMES: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
};

const REGIONS: Record<string, string[]> = {
  'Northeast': ['CT', 'ME', 'MA', 'NH', 'RI', 'VT', 'NJ', 'NY', 'PA'],
  'Southeast': ['DE', 'FL', 'GA', 'MD', 'NC', 'SC', 'VA', 'WV', 'AL', 'KY', 'MS', 'TN', 'AR', 'LA'],
  'Midwest': ['IL', 'IN', 'MI', 'OH', 'WI', 'IA', 'KS', 'MN', 'MO', 'NE', 'ND', 'SD'],
  'Southwest': ['OK', 'TX', 'NM', 'AZ'],
  'West': ['CO', 'ID', 'MT', 'NV', 'UT', 'WY', 'AK', 'CA', 'HI', 'OR', 'WA'],
};

// Survey Topics - Westlaw-style legal topics
const SURVEY_TOPICS = [
  { id: 'sol-pi', label: 'Statute of Limitations - Personal Injury', category: 'Torts' },
  { id: 'sol-contract', label: 'Statute of Limitations - Contract Actions', category: 'Contracts' },
  { id: 'non-compete', label: 'Non-Compete Agreements', category: 'Employment' },
  { id: 'at-will', label: 'At-Will Employment Exceptions', category: 'Employment' },
  { id: 'wrongful-term', label: 'Wrongful Termination Standards', category: 'Employment' },
  { id: 'discovery', label: 'Discovery Rules & Limitations', category: 'Civil Procedure' },
  { id: 'eul', label: 'Exemplary & Punitive Damages', category: 'Damages' },
  { id: 'workers-comp', label: 'Workers Compensation Coverage', category: 'Workers Comp' },
];

// Mock jurisdiction-specific data
type JurisdictionData = {
  state: string;
  stateName: string;
  status: 'favorable' | 'unfavorable' | 'mixed' | 'no-data';
  statute?: string;
  keyProvisions: string;
  effectiveDate: string;
  keycite: string;
  link?: string;
};

// Generate mock 50-state data for "Statute of Limitations - Personal Injury"
function generateMockSurveyData(topicId: string): JurisdictionData[] {
  const mockByTopic: Record<string, Record<string, Partial<JurisdictionData>>> = {
    'sol-pi': {
      'AL': { statute: 'Ala. Code § 6-2-38', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2015-01-01', status: 'mixed', keycite: 'Good' },
      'AK': { statute: 'Alaska Stat. § 09.10.070', keyProvisions: 'Two years from discovery or with reasonable diligence', effectiveDate: '2010-06-01', status: 'favorable', keycite: 'Good' },
      'AZ': { statute: 'Ariz. Rev. Stat. § 34-226', keyProvisions: 'Three years from date of injury or discovery', effectiveDate: '2008-03-01', status: 'favorable', keycite: 'Good' },
      'AR': { statute: 'Ark. Code § 16-56-102', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2012-01-01', status: 'mixed', keycite: 'Neutral' },
      'CA': { statute: 'Cal. Code Civ. Proc. § 335.1', keyProvisions: 'Two years from discovery, three years from injury', effectiveDate: '2001-01-01', status: 'favorable', keycite: 'Good' },
      'CO': { statute: 'Colo. Rev. Stat. § 13-80-102', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2018-01-01', status: 'favorable', keycite: 'Good' },
      'CT': { statute: 'Conn. Gen. Stat. § 52-577', keyProvisions: 'Three years from injury discovery', effectiveDate: '2006-01-01', status: 'favorable', keycite: 'Excellent' },
      'DE': { statute: 'Del. Code Ann. tit. 10, § 8106', keyProvisions: 'Two years from discovery date', effectiveDate: '2009-01-01', status: 'mixed', keycite: 'Neutral' },
      'FL': { statute: 'Fla. Stat. § 95.031', keyProvisions: 'Four years from discovery of injury', effectiveDate: '2011-01-01', status: 'unfavorable', keycite: 'Challenging' },
      'GA': { statute: 'O.C.G.A. § 34-7-2', keyProvisions: 'Two years from injury date', effectiveDate: '2007-01-01', status: 'unfavorable', keycite: 'Challenging' },
      'HI': { statute: 'Haw. Rev. Stat. § 657-7', keyProvisions: 'Two years from discovery or reasonable diligence', effectiveDate: '2013-01-01', status: 'favorable', keycite: 'Good' },
      'ID': { statute: 'Idaho Code § 5-219', keyProvisions: 'Two years from discovery date', effectiveDate: '2010-01-01', status: 'mixed', keycite: 'Neutral' },
      'IL': { statute: 'ILCS 5/13-202', keyProvisions: 'Two years from discovery; up to 5 years tolled', effectiveDate: '2015-01-01', status: 'favorable', keycite: 'Good' },
      'IN': { statute: 'Ind. Code § 34-11-2-4', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2008-01-01', status: 'mixed', keycite: 'Neutral' },
      'IA': { statute: 'Iowa Code § 614.1', keyProvisions: 'Two years from discovery; medical discovery rule applies', effectiveDate: '2012-01-01', status: 'favorable', keycite: 'Good' },
      'KS': { statute: 'Kan. Stat. Ann. § 60-513', keyProvisions: 'Two years from date of injury', effectiveDate: '2009-01-01', status: 'unfavorable', keycite: 'Challenging' },
      'KY': { statute: 'Ky. Rev. Stat. § 413.140', keyProvisions: 'One year from discovery of injury', effectiveDate: '2006-01-01', status: 'unfavorable', keycite: 'Challenging' },
      'LA': { statute: 'La. C.C.P. art. 3494', keyProvisions: 'One year from injury or discovery', effectiveDate: '2010-01-01', status: 'unfavorable', keycite: 'Very Challenging' },
      'ME': { statute: 'Me. Rev. Stat. tit. 14, § 754', keyProvisions: 'Three years from injury discovery', effectiveDate: '2007-01-01', status: 'favorable', keycite: 'Excellent' },
      'MD': { statute: 'Md. Code Ann. Cts. & Jud. Proc. § 5-101', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2008-01-01', status: 'favorable', keycite: 'Good' },
      'MA': { statute: 'Mass. Gen. Laws c. 260, § 2A', keyProvisions: 'Three years from discovery; discovery rule applies', effectiveDate: '2005-01-01', status: 'favorable', keycite: 'Excellent' },
      'MI': { statute: 'Mich. Comp. Laws § 600.5805', keyProvisions: 'Two years from notice of injury', effectiveDate: '2011-01-01', status: 'mixed', keycite: 'Neutral' },
      'MN': { statute: 'Minn. Stat. § 541.07', keyProvisions: 'Two years from discovery; discovery rule applies', effectiveDate: '2009-01-01', status: 'favorable', keycite: 'Good' },
      'MS': { statute: 'Miss. Code Ann. § 15-1-49', keyProvisions: 'Three years from date injury discovered', effectiveDate: '2013-01-01', status: 'favorable', keycite: 'Good' },
      'MO': { statute: 'Mo. Rev. Stat. § 516.097', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2010-01-01', status: 'mixed', keycite: 'Neutral' },
      'MT': { statute: 'Mont. Code Ann. § 27-2-206', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2008-01-01', status: 'favorable', keycite: 'Good' },
      'NE': { statute: 'Neb. Rev. Stat. § 25-222', keyProvisions: 'Two years from discovery date', effectiveDate: '2012-01-01', status: 'mixed', keycite: 'Neutral' },
      'NV': { statute: 'Nev. Rev. Stat. § 11.190', keyProvisions: 'Two years from injury or discovery', effectiveDate: '2014-01-01', status: 'favorable', keycite: 'Good' },
      'NH': { statute: 'N.H. Rev. Stat. Ann. § 507:4', keyProvisions: 'Three years from discovery date', effectiveDate: '2007-01-01', status: 'favorable', keycite: 'Excellent' },
      'NJ': { statute: 'N.J. Stat. Ann. § 2A:14-2', keyProvisions: 'Two years from discovery; notice rule', effectiveDate: '2009-01-01', status: 'favorable', keycite: 'Good' },
      'NM': { statute: 'N.M. Stat. Ann. § 37-1-4', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2011-01-01', status: 'favorable', keycite: 'Good' },
      'NY': { statute: 'N.Y. C.P.L.R. § 214', keyProvisions: 'Three years from discovery; medical discovery rule', effectiveDate: '2006-01-01', status: 'favorable', keycite: 'Excellent' },
      'NC': { statute: 'N.C. Gen. Stat. § 1-52', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2013-01-01', status: 'favorable', keycite: 'Good' },
      'ND': { statute: 'N.D. Cent. Code § 28-01-16', keyProvisions: 'Two years from discovery; discovery rule applies', effectiveDate: '2010-01-01', status: 'mixed', keycite: 'Neutral' },
      'OH': { statute: 'Ohio Rev. Code § 2305.19', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2008-01-01', status: 'mixed', keycite: 'Neutral' },
      'OK': { statute: 'Okla. Stat. § 12 § 95', keyProvisions: 'Two years from discovery of cause of action', effectiveDate: '2009-01-01', status: 'mixed', keycite: 'Neutral' },
      'OR': { statute: 'Or. Rev. Stat. § 12.110', keyProvisions: 'Two years from discovery; discovery rule applies', effectiveDate: '2007-01-01', status: 'favorable', keycite: 'Good' },
      'PA': { statute: 'Pa. Cons. Stat. § 5524', keyProvisions: 'Two years from discovery date', effectiveDate: '2012-01-01', status: 'mixed', keycite: 'Neutral' },
      'RI': { statute: 'R.I. Gen. Laws § 9-1-14', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2006-01-01', status: 'favorable', keycite: 'Excellent' },
      'SC': { statute: 'S.C. Code § 15-3-530', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2011-01-01', status: 'mixed', keycite: 'Neutral' },
      'SD': { statute: 'S.D. Codified Laws § 15-2-14', keyProvisions: 'Three years from injury discovery date', effectiveDate: '2010-01-01', status: 'favorable', keycite: 'Good' },
      'TN': { statute: 'Tenn. Code Ann. § 28-3-104', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2009-01-01', status: 'favorable', keycite: 'Good' },
      'TX': { statute: 'Tex. Civ. Prac. & Rem. Code § 16.031', keyProvisions: 'Two years from discovery date', effectiveDate: '2008-01-01', status: 'unfavorable', keycite: 'Challenging' },
      'UT': { statute: 'Utah Code § 78B-2-307', keyProvisions: 'Two years from discovery; discovery rule applies', effectiveDate: '2012-01-01', status: 'favorable', keycite: 'Good' },
      'VT': { statute: 'Vt. Stat. Ann. tit. 12, § 512', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2007-01-01', status: 'favorable', keycite: 'Excellent' },
      'VA': { statute: 'Va. Code Ann. § 8.01-243', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2009-01-01', status: 'mixed', keycite: 'Neutral' },
      'WA': { statute: 'Wash. Rev. Code § 4.16.130', keyProvisions: 'Two years from discovery of injury', effectiveDate: '2011-01-01', status: 'favorable', keycite: 'Good' },
      'WV': { statute: 'W. Va. Code § 55-2-12', keyProvisions: 'Two years from discovery date', effectiveDate: '2010-01-01', status: 'mixed', keycite: 'Neutral' },
      'WI': { statute: 'Wis. Stat. § 893.55', keyProvisions: 'Three years from discovery; discovery rule', effectiveDate: '2008-01-01', status: 'favorable', keycite: 'Good' },
      'WY': { statute: 'Wyo. Stat. Ann. § 1-3-105', keyProvisions: 'Three years from discovery of injury', effectiveDate: '2006-01-01', status: 'favorable', keycite: 'Excellent' },
    },
  };

  const baseData = mockByTopic[topicId] || {};
  return STATES.map(state => ({
    state,
    stateName: STATE_NAMES[state],
    statute: baseData[state]?.statute || `${state} Stat. § XX-XX-XX`,
    keyProvisions: baseData[state]?.keyProvisions || 'See statute for details',
    effectiveDate: baseData[state]?.effectiveDate || '2010-01-01',
    status: (baseData[state]?.status as any) || 'mixed',
    keycite: baseData[state]?.keycite || 'Neutral',
  }));
}

type SortField = 'state' | 'status' | 'effectiveDate';

export default function StateSurveyPage() {
  const [selectedTopic, setSelectedTopic] = useState('sol-pi');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedStates, setSelectedStates] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortField>('state');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const surveyData = useMemo(() => generateMockSurveyData(selectedTopic), [selectedTopic]);

  const topic = SURVEY_TOPICS.find(t => t.id === selectedTopic);

  const regionStates = selectedRegion ? REGIONS[selectedRegion] : null;

  const filteredData = useMemo(() => {
    let data = [...surveyData];

    if (regionStates) {
      data = data.filter(d => regionStates.includes(d.state));
    }

    if (selectedStates.size > 0) {
      data = data.filter(d => selectedStates.has(d.state));
    }

    // Sort
    data.sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];

      if (sortBy === 'status') {
        const statusOrder: Record<string, number> = {
          'favorable': 0,
          'mixed': 1,
          'unfavorable': 2,
          'no-data': 3,
        };
        aVal = statusOrder[a.status];
        bVal = statusOrder[b.status];
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [surveyData, regionStates, selectedStates, sortBy, sortOrder]);

  const statusCounts = useMemo(() => {
    return {
      favorable: surveyData.filter(d => d.status === 'favorable').length,
      mixed: surveyData.filter(d => d.status === 'mixed').length,
      unfavorable: surveyData.filter(d => d.status === 'unfavorable').length,
      noData: surveyData.filter(d => d.status === 'no-data').length,
    };
  }, [surveyData]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'favorable': return 'var(--data-positive)';
      case 'unfavorable': return 'var(--data-negative)';
      case 'mixed': return 'var(--gold)';
      default: return 'var(--bdr)';
    }
  };

  const getStatusBgColor = (status: string): string => {
    switch (status) {
      case 'favorable': return '#EAF4EF';
      case 'unfavorable': return '#FAEAEA';
      case 'mixed': return '#FAF3E6';
      default: return '#F5F5F5';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'favorable': return 'Favorable';
      case 'unfavorable': return 'Unfavorable';
      case 'mixed': return 'Mixed';
      default: return 'No Data';
    }
  };

  const handleExportPDF = () => {
    const content = `
50-STATE JURISDICTIONAL SURVEY
Topic: ${topic?.label}

SUMMARY STATISTICS:
- Favorable Jurisdictions: ${statusCounts.favorable}
- Mixed Jurisdictions: ${statusCounts.mixed}
- Unfavorable Jurisdictions: ${statusCounts.unfavorable}

STATE-BY-STATE ANALYSIS:
${filteredData.map(d => `
${d.stateName}:
Statute: ${d.statute}
Key Provisions: ${d.keyProvisions}
Status: ${getStatusLabel(d.status)}
Effective Date: ${d.effectiveDate}
KeyCite: ${d.keycite}
`).join('')}

Generated: ${new Date().toLocaleDateString()}
Platform: MyCaseValue Legal Research
    `;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `survey-${selectedTopic}-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportCSV = () => {
    const headers = ['State', 'Statute', 'Key Provisions', 'Effective Date', 'Status', 'KeyCite'];
    const rows = filteredData.map(d => [
      d.stateName,
      d.statute,
      d.keyProvisions,
      d.effectiveDate,
      getStatusLabel(d.status),
      d.keycite,
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${(cell as string).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `survey-${selectedTopic}-${Date.now()}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--card)',
        padding: '32px 24px 32px',
        borderBottom: '1px solid var(--bdr)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '2px 8px',
            marginBottom: '12px',
            borderRadius: '3px',
            border: '1px solid rgba(196, 136, 42, 0.2)',
            background: 'rgba(196, 136, 42, 0.08)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: 'var(--chrome-bg)',
          }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            Legal Research
          </div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            fontFamily: 'var(--font-legal)',
            color: 'var(--text1)',
            margin: '0 0 16px 0',
            letterSpacing: '-0.025em',
            lineHeight: '1.1',
          }}>
            50-State Jurisdictional Survey
          </h1>

          <p style={{
            fontSize: '14px',
            color: 'var(--text3, #4A4940)',
            margin: '0',
            lineHeight: '1.6',
            maxWidth: '640px',
            fontFamily: 'var(--font-ui)',
          }}>
            Comprehensive state-by-state analysis of statutes, case law, and legal provisions across all 50 states.
            Compare jurisdictional differences, identify favorable forums, and stay current with legal changes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Topic Selector */}
        <div style={{ marginBottom: '40px' }}>
          <label htmlFor="research-topic" style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text2)',
            marginBottom: '12px',
            fontFamily: 'var(--font-ui)',
          }}>
            Select Research Topic
          </label>
          <select
            id="research-topic"
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setSelectedRegion(null);
              setSelectedStates(new Set());
            }}
            style={{
              width: '100%',
              maxWidth: '480px',
              height: '48px',
              padding: '12px 16px',
              fontSize: '14px',
              fontFamily: 'var(--font-ui)',
              border: '1px solid var(--bdr)',
              borderRadius: '2px',
              background: 'var(--card)',
              color: 'var(--text1)',
              cursor: 'pointer',
              transition: 'border-color 200ms',
            }}
          >
            {SURVEY_TOPICS.map(t => (
              <option key={t.id} value={t.id}>
                {t.label} ({t.category})
              </option>
            ))}
          </select>
        </div>

        {/* Statistics Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
          background: 'var(--card)',
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '24px',
        }}>
          <div>
            <div style={{
              fontSize: '22px',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)',
              color: 'var(--data-positive)',
              marginBottom: '4px',
            }}>
              {statusCounts.favorable}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--text2)',
              fontFamily: 'var(--font-ui)',
            }}>
              Favorable Jurisdictions
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '22px',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)',
              color: 'var(--gold)',
              marginBottom: '4px',
            }}>
              {statusCounts.mixed}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--text2)',
              fontFamily: 'var(--font-ui)',
            }}>
              Mixed Jurisdictions
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '22px',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)',
              color: 'var(--data-negative)',
              marginBottom: '4px',
            }}>
              {statusCounts.unfavorable}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--text2)',
              fontFamily: 'var(--font-ui)',
            }}>
              Unfavorable Jurisdictions
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '22px',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text1)',
              marginBottom: '4px',
            }}>
              50
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--text2)',
              fontFamily: 'var(--font-ui)',
            }}>
              Total States
            </div>
          </div>
        </div>

        {/* Interactive US Map */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1)',
            margin: '0 0 24px 0',
            letterSpacing: '-0.3px',
          }}>
            Jurisdictional Map
          </h2>
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            padding: '24px',
            overflow: 'auto',
          }}>
            <svg viewBox="0 0 960 600" width="100%" height="auto" style={{ maxWidth: '100%', minHeight: '400px' }}>
              {/* Simplified US State Map - Shows all states with colors by status */}
              <defs>
                <style>{`
                  .state-path { stroke: 'white'; stroke-width: 0.5; cursor: pointer; transition: opacity 200ms; }
                  .state-path:hover { opacity: 0.8; }
                `}</style>
              </defs>

              {/* Background */}
              <rect width="960" height="600" fill="var(--surf)" />

              {/* Placeholder map grid showing state positions */}
              {STATES.map((state, idx) => {
                const data = surveyData.find(d => d.state === state);
                const color = data ? getStatusBgColor(data.status) : '#f0f0f0';
                const row = Math.floor(idx / 10);
                const col = idx % 10;
                const x = col * 96;
                const y = row * 120;

                return (
                  <g key={state} onClick={() => {
                    const newSelected = new Set(selectedStates);
                    if (newSelected.has(state)) {
                      newSelected.delete(state);
                    } else {
                      newSelected.add(state);
                    }
                    setSelectedStates(newSelected);
                  }}>
                    <rect
                      x={x}
                      y={y}
                      width="90"
                      height="110"
                      fill={color}
                      stroke="var(--bdr)"
                      strokeWidth="1"
                      className="state-path"
                      style={{
                        cursor: 'pointer',
                        opacity: selectedStates.has(state) ? 0.7 : 1,
                      }}
                    />
                    <text
                      x={x + 45}
                      y={y + 35}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="600"
                      fontFamily="var(--font-mono)"
                      fill="var(--text1)"
                    >
                      {state}
                    </text>
                    <text
                      x={x + 45}
                      y={y + 55}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="var(--font-ui)"
                      fill="var(--text2)"
                    >
                      {getStatusLabel(data?.status || 'no-data')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Region & Filter Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}>
          <div>
            <label htmlFor="filter-by-region" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text2)',
              marginBottom: '8px',
              fontFamily: 'var(--font-ui)',
            }}>
              Filter by Region
            </label>
            <select
              id="filter-by-region"
              value={selectedRegion || ''}
              onChange={(e) => setSelectedRegion(e.target.value || null)}
              style={{
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                background: 'var(--card)',
                color: 'var(--text1)',
                cursor: 'pointer',
              }}
            >
              <option value="">All Regions</option>
              {Object.keys(REGIONS).map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort-by" style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text2)',
              marginBottom: '8px',
              fontFamily: 'var(--font-ui)',
            }}>
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              style={{
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                background: 'var(--card)',
                color: 'var(--text1)',
                cursor: 'pointer',
              }}
            >
              <option value="state">State Name</option>
              <option value="status">Jurisdiction Status</option>
              <option value="effectiveDate">Effective Date</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{
                height: '40px',
                padding: '8px 16px',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                background: 'var(--card)',
                color: 'var(--text1)',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 200ms',
              }}
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'} Order
            </button>
            <button
              onClick={() => setSelectedStates(new Set())}
              style={{
                height: '40px',
                padding: '8px 16px',
                fontSize: '14px',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                background: 'var(--card)',
                color: 'var(--text1)',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 200ms',
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* State-by-State Comparison Table */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1)',
            margin: '0 0 16px 0',
            letterSpacing: '-0.3px',
          }}>
            State-by-State Comparison ({filteredData.length} states)
          </h2>

          <div style={{
            overflowX: 'auto',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            background: 'var(--card)',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--bdr)', background: 'var(--surf)' }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: 'var(--text1)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    State
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: 'var(--text1)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Statute/Rule
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: 'var(--text1)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Key Provisions
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: 'var(--text1)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Effective Date
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: 'var(--text1)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: 'var(--text1)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    KeyCite
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, idx) => (
                  <tr
                    key={row.state}
                    style={{
                      borderBottom: '1px solid var(--bdr)',
                      background: idx % 2 === 0 ? 'transparent' : 'var(--surf)',
                      transition: 'background-color 200ms',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background = 'var(--gold)';
                      (e.currentTarget as HTMLTableRowElement).style.opacity = '0.1';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background = idx % 2 === 0 ? 'transparent' : 'var(--surf)';
                      (e.currentTarget as HTMLTableRowElement).style.opacity = '1';
                    }}
                  >
                    <td style={{ padding: '16px', fontWeight: '600', color: 'var(--link)' }}>
                      <button
                        onClick={() => {
                          const newSelected = new Set(selectedStates);
                          if (newSelected.has(row.state)) {
                            newSelected.delete(row.state);
                          } else {
                            newSelected.add(row.state);
                          }
                          setSelectedStates(newSelected);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--link)',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontWeight: '600',
                          fontFamily: 'var(--font-ui)',
                          padding: 0,
                        }}
                      >
                        {row.stateName}
                      </button>
                    </td>
                    <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)' }}>
                      {row.statute}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text1)', maxWidth: '280px' }}>
                      {row.keyProvisions}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text2)', fontSize: '12px' }}>
                      {new Date(row.effectiveDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '3px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: getStatusBgColor(row.status),
                        color: getStatusColor(row.status),
                        border: `1px solid ${getStatusColor(row.status)}`,
                      }}>
                        {getStatusLabel(row.status)}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text2)', fontSize: '12px' }}>
                      {row.keycite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1)',
            margin: '0 0 16px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Export Survey Data
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleExportPDF}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                background: 'var(--card)',
                color: 'var(--link)',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--link)';
                (e.target as HTMLButtonElement).style.background = 'var(--surf)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--bdr)';
                (e.target as HTMLButtonElement).style.background = 'var(--card)';
              }}
            >
              📄 Export as Report (TXT)
            </button>

            <button
              onClick={handleExportCSV}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                background: 'var(--card)',
                color: 'var(--link)',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--link)';
                (e.target as HTMLButtonElement).style.background = 'var(--surf)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--bdr)';
                (e.target as HTMLButtonElement).style.background = 'var(--card)';
              }}
            >
              📊 Export as CSV
            </button>

            <button
              onClick={() => window.print()}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--bdr)',
                borderRadius: '2px',
                background: 'var(--card)',
                color: 'var(--link)',
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--link)';
                (e.target as HTMLButtonElement).style.background = 'var(--surf)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--bdr)';
                (e.target as HTMLButtonElement).style.background = 'var(--card)';
              }}
            >
              🖨️ Print
            </button>
          </div>
        </div>

        {/* Summary Analysis Panel */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '32px',
          marginBottom: '40px',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1)',
            margin: '0 0 16px 0',
          }}>
            Summary Analysis
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text2)',
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-ui)',
              }}>
                Favorable Jurisdictions
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'var(--text1)',
                margin: 0,
                lineHeight: '1.6',
                fontFamily: 'var(--font-ui)',
              }}>
                {statusCounts.favorable} states have favorable statutes or case law regarding {topic?.label?.toLowerCase() || 'this topic'}.
                These jurisdictions are generally more plaintiff-friendly or offer stronger protections.
              </p>
            </div>

            <div>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text2)',
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-ui)',
              }}>
                Mixed or Neutral Jurisdictions
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'var(--text1)',
                margin: 0,
                lineHeight: '1.6',
                fontFamily: 'var(--font-ui)',
              }}>
                {statusCounts.mixed} states have mixed or neutral provisions. These jurisdictions may have complexity
                based on specific circumstances or recent legal developments requiring close analysis.
              </p>
            </div>

            <div>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text2)',
                margin: '0 0 12px 0',
                fontFamily: 'var(--font-ui)',
              }}>
                Unfavorable Jurisdictions
              </h4>
              <p style={{
                fontSize: '14px',
                color: 'var(--text1)',
                margin: 0,
                lineHeight: '1.6',
                fontFamily: 'var(--font-ui)',
              }}>
                {statusCounts.unfavorable} states have unfavorable statutes or case law. These jurisdictions typically impose
                stricter standards or provide less protection under {topic?.label?.toLowerCase() || 'this area of law'}.
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid var(--bdr)',
          }}>
            <h4 style={{
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text2)',
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-ui)',
            }}>
              Research Notes
            </h4>
            <p style={{
              fontSize: '14px',
              color: 'var(--text1)',
              margin: 0,
              lineHeight: '1.6',
              fontFamily: 'var(--font-ui)',
            }}>
              This survey reflects current statutory law as of the publication date. Case law and recent amendments may affect analysis.
              Individual circumstances vary significantly. Consult with local counsel in relevant jurisdictions for specific legal advice.
              Use this tool for research and comparative analysis only.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          background: 'var(--surf)',
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '24px',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1)',
            margin: '0 0 16px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Status Legend
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '3px',
                background: 'var(--data-positive-bg)',
                border: `2px solid var(--data-positive)`,
              }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text1)' }}>
                  Favorable
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text2)' }}>
                  Plaintiff-friendly jurisdiction
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '3px',
                background: 'var(--gold-light)',
                border: `2px solid var(--gold)`,
              }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text1)' }}>
                  Mixed
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text2)' }}>
                  Fact-dependent or neutral
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '3px',
                background: 'var(--data-negative-bg)',
                border: `2px solid var(--data-negative)`,
              }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text1)' }}>
                  Unfavorable
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text2)' }}>
                  Defendant-friendly jurisdiction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { name: 'Compare Text', href: '/attorney/compare-text', desc: 'Compare legal documents side by side' },
              { name: 'Citation Check', href: '/attorney/citation-check', desc: 'Citation validation and case treatment analysis' },
              { name: 'Advanced Search', href: '/attorney/advanced-search', desc: 'Advanced legal research search tools' },
              { name: 'Secondary Sources', href: '/attorney/secondary-sources', desc: 'Legal secondary sources and treatises' },
            ].map(tool => (
              <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 200ms' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: 'var(--surface-warm, #FAF3E6)',
        color: 'var(--text2, #42403C)',
        padding: '40px 24px',
        fontSize: '14px',
        lineHeight: '1.6',
        borderTop: '1px solid var(--bdr)',
        marginTop: '60px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 12px 0', fontFamily: 'var(--font-ui)' }}>
            <strong>Legal Disclaimer:</strong> This 50-State Jurisdictional Survey is provided for research and comparative analysis purposes only and does not constitute legal advice. The information reflects statutory law as of publication and may not account for recent amendments or developments in case law. Jurisdictional analysis is necessarily general and individual circumstances may vary significantly. Always consult with a qualified attorney licensed in the relevant jurisdiction before relying on any legal analysis or making litigation decisions.
          </p>
          <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'var(--text2)' }}>
            © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved. Data compiled from public legal sources and maintained for legal research purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
