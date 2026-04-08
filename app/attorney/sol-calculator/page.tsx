'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';

type StatuteOfLimitations = {
  caseType: string;
  category: string;
  federalSOL: string;
  singleYear?: number;
  doubleYear?: number;
  notes: string[];
  tollingRules: string[];
  discoveryRule: boolean;
  keyDeadlines?: string;
};

const SOL_DATA: Record<string, StatuteOfLimitations> = {
  'employment-discrimination': {
    caseType: 'Employment Discrimination (Title VII/ADEA/ADA)',
    category: 'Employment & Workplace',
    federalSOL: '180 or 300 days',
    notes: [
      'EEOC charge must be filed within 180 days (or 300 days in dual-filing states)',
      'Applies to Title VII, ADEA, ADA claims',
      'Federal lawsuit must be filed within 90 days of EEOC Right-to-Sue letter',
      'Continuing violation doctrine may extend deadline',
      'Failure to file EEOC charge bars federal lawsuit'
    ],
    tollingRules: [
      'EEOC charge filing tolls federal statute',
      'Reasonable administrative pursuit may extend period',
      'No tolling for lack of knowledge of violation'
    ],
    discoveryRule: false,
    keyDeadlines: 'EEOC charge: 180/300 days from incident. Federal suit: 90 days after Right-to-Sue'
  },
  'unpaid-wages-flsa': {
    caseType: 'Unpaid Wages / Overtime (FLSA)',
    category: 'Employment & Workplace',
    federalSOL: '2 years (3 for willful)',
    doubleYear: 3,
    notes: [
      'Statute of limitations is 2 years from violation',
      '3 years if violation is willful (employer knew or recklessly disregarded violation)',
      'No requirement to exhaust administrative remedies',
      'Tolling rules are very restrictive; plaintiff must affirmatively show fraudulent concealment',
      'Class action may affect deadline for certain claimants'
    ],
    tollingRules: [
      'Fraudulent concealment may toll for period defendant actively hid violation',
      'No automatic tolling for lack of knowledge',
      'No estoppel based on employer assurances'
    ],
    discoveryRule: false,
    keyDeadlines: '2-3 years from date of wage violation'
  },
  'section-1983-civil-rights': {
    caseType: 'Civil Rights / Section 1983',
    category: 'Civil Rights',
    federalSOL: 'State personal injury statute',
    notes: [
      'No federal statute; federal court applies state personal injury statute by borrowing doctrine',
      'Typically 2-4 years depending on state',
      'Notice of claim to state/local government may be required within 90 days',
      'State tort claims act procedures must be followed (notice, damages caps)',
      'Discovery rule may apply in some states'
    ],
    tollingRules: [
      'State tolling rules apply (minority, insanity, fraud)',
      'Discovery rule may toll in some jurisdictions',
      'Notice requirement to government entity must be met'
    ],
    discoveryRule: true,
    keyDeadlines: 'Varies by state; check Notice of Claim deadline for government defendants'
  },
  'medical-malpractice': {
    caseType: 'Medical Malpractice',
    category: 'Personal Injury',
    federalSOL: 'State statute (typically 2-3 years)',
    notes: [
      'Statute of limitations varies significantly by state (typically 1-4 years)',
      'Discovery rule applies in many states (date injury discovered, not date of negligent act)',
      'Affidavit of merit or expert certification often required',
      'Some states cap damages (e.g., $250,000 non-economic damages)',
      'Notice of intent to sue may be required (pre-suit notice periods vary)'
    ],
    tollingRules: [
      'Discovery rule: begins when injury was discovered or should have been discovered',
      'Minority rule: tolled if plaintiff under 18',
      'Fraudulent concealment may extend deadline',
      'Some states toll for defendant\'s absence from state'
    ],
    discoveryRule: true,
    keyDeadlines: 'Check state-specific discovery rule; many require notice of intent 90-180 days before filing'
  },
  'breach-of-contract': {
    caseType: 'Breach of Contract',
    category: 'Money & Business',
    federalSOL: 'State statute (typically 4-6 years)',
    singleYear: 6,
    notes: [
      'Typically 4-6 years depending on state (written contracts often 6 years)',
      'Oral contracts usually have shorter period (2-3 years)',
      'Statute begins to run when breach occurs',
      'Continued performance may be treated as separate breaches',
      'Some states recognize "discovery rule" for hidden breaches'
    ],
    tollingRules: [
      'Fraudulent concealment of breach may toll period',
      'Written acknowledgment of debt may extend period',
      'Minority rule: tolled if defendant absent from state',
      'Payment or promise to pay may restart period'
    ],
    discoveryRule: false,
    keyDeadlines: 'Generally 4-6 years from date of breach; check state law'
  },
  'personal-injury-general': {
    caseType: 'Personal Injury (General Tort)',
    category: 'Personal Injury',
    federalSOL: 'State statute (typically 2-3 years)',
    singleYear: 3,
    notes: [
      'Most states allow 2-3 years from date of injury',
      'Some states apply discovery rule (from discovery of injury)',
      'Government defendant claims may require notice of claim within 6 months to 2 years',
      'Comparative negligence rules vary by state',
      'Damages caps may apply in some jurisdictions (e.g., non-economic damages)'
    ],
    tollingRules: [
      'Minority rule: tolled for minors and incompetents',
      'Some states toll during defendant\'s absence',
      'Discovery rule in some states: begins when injury discovered',
      'Notice requirement to government entities (varies by state)'
    ],
    discoveryRule: true,
    keyDeadlines: 'Typically 2-3 years from injury date; check state and government notice deadlines'
  },
  'product-liability': {
    caseType: 'Product Liability / Defective Product',
    category: 'Personal Injury',
    federalSOL: 'State statute + discovery rule (typically 2-4 years)',
    singleYear: 4,
    notes: [
      'Statute of limitations typically 2-4 years from injury',
      'Discovery rule often applies (from discovery of defect)',
      'Repose period may bar claims after product first sold (5-10 years)',
      'Notice to seller may toll or extend deadline in some states',
      'Warnings and instructions defense affects damages, not statute'
    ],
    tollingRules: [
      'Discovery rule: begins when defect discovered, not when product sold',
      'Minority rule: tolled for minors and incompetents',
      'Fraudulent concealment of defect may toll period',
      'Subsequent injury may not restart period for original defect'
    ],
    discoveryRule: true,
    keyDeadlines: 'Check state discovery rule date; separate repose period may apply'
  },
  'premises-liability': {
    caseType: 'Premises Liability / Negligence',
    category: 'Personal Injury',
    federalSOL: 'State statute (typically 2-3 years)',
    singleYear: 3,
    notes: [
      'Typically 2-3 years from date of injury',
      'Discovery rule may apply in some states',
      'Government property may have different notice requirements (6 months to 2 years)',
      'Hidden defects may trigger discovery rule',
      'Notice to property owner may be required'
    ],
    tollingRules: [
      'Discovery rule for hidden hazards in some states',
      'Minority rule: tolled for minors and incompetents',
      'Government defendant notice requirement (varies widely)',
      'Some states toll during defendant\'s absence'
    ],
    discoveryRule: true,
    keyDeadlines: 'Typically 2-3 years from injury; check government notice deadlines'
  },
  'wrongful-death': {
    caseType: 'Wrongful Death',
    category: 'Personal Injury',
    federalSOL: 'State statute (typically 2-3 years)',
    singleYear: 3,
    notes: [
      'Statute of limitations for wrongful death varies by state (typically 2-3 years)',
      'Starts from date of death, not discovery of wrongfulness',
      'Different survival statute may have separate deadline for pain-and-suffering claims',
      'Beneficiary status and standing rules vary by state',
      'Government defendant notice requirements often differ'
    ],
    tollingRules: [
      'Starts from date of death',
      'Minority rule: tolled if beneficiary unknown at death',
      'Some states toll for government defendants pending claim',
      'Discovery rule typically does NOT apply to wrongful death'
    ],
    discoveryRule: false,
    keyDeadlines: 'Typically 2-3 years from death; separate survival statute may have different period'
  },
  'copyright-infringement': {
    caseType: 'Copyright Infringement',
    category: 'Money & Business',
    federalSOL: '3 years',
    notes: [
      'Federal statute: 3 years from discovery of infringement (discovery rule applies)',
      'Each separate act of infringement starts new clock',
      'Infringer need not know work was copyrighted',
      'Willful infringement may enhance damages',
      'Registration not required for suit, but increases damages availability'
    ],
    tollingRules: [
      'Fraudulent concealment may toll period',
      'Infringer\'s knowledge of copyright not required',
      'Each distinct act of infringement is separate claim',
      'System clock restarts with each new infringing act'
    ],
    discoveryRule: true,
    keyDeadlines: '3 years from discovery of infringement'
  },
  'trademark-infringement': {
    caseType: 'Trademark Infringement',
    category: 'Money & Business',
    federalSOL: '5 years',
    notes: [
      'Federal statute (15 U.S.C. § 1658): 5 years from discovery of infringement',
      'No requirement that defendant\'s use be willful or knowing',
      'Actual confusion not required; likelihood of confusion is standard',
      'Continued infringement may be treated as separate acts'
    ],
    tollingRules: [
      'Fraudulent concealment may toll period',
      'Each sale/use may be separate infringement',
      'Trademark registration provides prima facie evidence of validity',
      'Tolling for non-discovery in some circumstances'
    ],
    discoveryRule: true,
    keyDeadlines: '5 years from discovery of infringement'
  },
  'securities-fraud': {
    caseType: 'Securities Fraud / Investment Fraud',
    category: 'Money & Business',
    federalSOL: '2 or 5 years',
    doubleYear: 5,
    notes: [
      'Discovery rule: 2 years from discovery of fraud',
      'Absolute bar: 5 years from act of fraud (even if not discovered)',
      'Scienter requirement: plaintiff must prove intent to deceive, manipulate, or defraud',
      'Section 10(b) and Rule 10b-5 most common claim',
      'Notice pleading requirements are strict'
    ],
    tollingRules: [
      'Discovery rule: 2 years from when fraud discovered with reasonable diligence',
      'Absolute bar: 5 years from when fraud occurred',
      'Fraudulent concealment does not extend 5-year absolute bar',
      'Some courts toll for continuing scheme'
    ],
    discoveryRule: true,
    keyDeadlines: '2 years from discovery / 5 years from act (whichever is earlier)'
  },
  'fmla-violation': {
    caseType: 'FMLA Violation',
    category: 'Employment & Workplace',
    federalSOL: '2 years (3 for willful)',
    doubleYear: 3,
    notes: [
      'Statute of limitations is 2 years from violation',
      '3 years if violation is willful',
      'No requirement to file administrative charge first (unlike Title VII)',
      'Liquidated damages available (equal to unpaid wages + interest)',
      'Attorney fees and costs recoverable'
    ],
    tollingRules: [
      'Fraudulent concealment may toll for period defendant actively hid violation',
      'No equitable tolling for failure to know of FMLA rights',
      'Continuing violations doctrine may apply to ongoing interference'
    ],
    discoveryRule: false,
    keyDeadlines: '2-3 years from FMLA violation'
  },
  'ada-discrimination': {
    caseType: 'ADA Discrimination',
    category: 'Employment & Workplace',
    federalSOL: '180 or 300 days (EEOC charge)',
    notes: [
      'EEOC charge filing required; deadline is 180 days (or 300 in dual-filing states)',
      'Federal lawsuit filed within 90 days of Right-to-Sue letter',
      'Applies to all forms of disability discrimination',
      'Reasonable accommodation disputes follow same timeline',
      'Continuing violation doctrine applies'
    ],
    tollingRules: [
      'EEOC charge filing tolls federal statute',
      'Right-to-Sue letter must be obtained before filing suit',
      'Continuing violation doctrine extends deadline for pattern of discrimination'
    ],
    discoveryRule: false,
    keyDeadlines: 'EEOC charge: 180/300 days. Federal suit: 90 days after Right-to-Sue'
  },
  'wage-theft': {
    caseType: 'Wage Theft / Minimum Wage Violation',
    category: 'Employment & Workplace',
    federalSOL: '2 years (3 for willful)',
    doubleYear: 3,
    notes: [
      'FLSA statute of limitations: 2 years (3 for willful violation)',
      'Applicable to minimum wage, overtime, and other wage laws',
      'Willful = employer knew or recklessly disregarded violation',
      'Collective action available (opt-in requirement for FLSA)',
      'Liquidated damages equal to unpaid wages'
    ],
    tollingRules: [
      'Fraudulent concealment tolls deadline',
      'No automatic equitable tolling',
      'Some courts recognize fraudulent inducement to continue employment as tolling'
    ],
    discoveryRule: false,
    keyDeadlines: '2-3 years from date of wage violation'
  },
  'wrongful-termination': {
    caseType: 'Wrongful Termination',
    category: 'Employment & Workplace',
    federalSOL: 'State statute (varies 2-6 years)',
    singleYear: 4,
    notes: [
      'No federal statute; state law applies (typically 2-4 years)',
      'Public policy exception: contract claim survives',
      'At-will employment is default (limited exceptions)',
      'Fraud or constructive discharge claims may have different statutes',
      'Some states require clear and convincing evidence'
    ],
    tollingRules: [
      'State tolling rules apply',
      'Fraudulent concealment may toll',
      'Minority rule: tolled for minors',
      'Some states toll during defendant\'s absence'
    ],
    discoveryRule: false,
    keyDeadlines: 'State-specific; typically 2-4 years from termination'
  },
};

const US_STATES = [
  'Federal Court', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function SOLCalculatorPage() {
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedState, setSelectedState] = useState('Federal Court');
  const [incidentDate, setIncidentDate] = useState('');
  const [deadline, setDeadline] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  const allCaseTypes = SITS.flatMap(cat =>
    cat.opts.map(opt => ({
      label: opt.label,
      value: opt.d.toLowerCase().replace(/\s+/g, '-'),
    }))
  ).sort((a, b) => a.label.localeCompare(b.label));

  const selectedSOLData = selectedCaseType
    ? Object.values(SOL_DATA).find(d =>
        selectedCaseType.toLowerCase().includes('employment') && d.caseType.includes('Employment') ||
        selectedCaseType.toLowerCase().includes('wage') && d.caseType.includes('Wage') ||
        selectedCaseType.toLowerCase().includes('flsa') && d.caseType.includes('FLSA') ||
        selectedCaseType.toLowerCase().includes('fmla') && d.caseType.includes('FMLA') ||
        selectedCaseType.toLowerCase().includes('medical') && d.caseType.includes('Medical') ||
        selectedCaseType.toLowerCase().includes('product') && d.caseType.includes('Product') ||
        selectedCaseType.toLowerCase().includes('wrongful') && d.caseType.includes('Wrongful') ||
        selectedCaseType.toLowerCase().includes('wrongful-death') && d.caseType.includes('Wrongful Death') ||
        selectedCaseType.toLowerCase().includes('premises') && d.caseType.includes('Premises') ||
        selectedCaseType.toLowerCase().includes('breach') && d.caseType.includes('Breach') ||
        selectedCaseType.toLowerCase().includes('copyright') && d.caseType.includes('Copyright') ||
        selectedCaseType.toLowerCase().includes('trademark') && d.caseType.includes('Trademark') ||
        selectedCaseType.toLowerCase().includes('securities') && d.caseType.includes('Securities') ||
        selectedCaseType.toLowerCase().includes('police') && d.caseType.includes('Section 1983') ||
        selectedCaseType.toLowerCase().includes('civil-rights') && d.caseType.includes('Section 1983') ||
        selectedCaseType.toLowerCase().includes('discrimination') && d.caseType.includes('Discrimination') ||
        selectedCaseType.toLowerCase().includes('ada') && d.caseType.includes('ADA') ||
        selectedCaseType.toLowerCase().includes('wrongful-termination') && d.caseType.includes('Wrongful Termination')
      )
    : null;

  const handleCalculateDeadline = () => {
    if (!incidentDate || !selectedSOLData) return;

    const incident = new Date(incidentDate);
    const today = new Date();

    let deadlineDate: Date;
    let solPeriod = selectedSOLData.federalSOL;

    if (selectedSOLData.federalSOL === '180 or 300 days') {
      deadlineDate = new Date(incident);
      deadlineDate.setDate(deadlineDate.getDate() + 300);
      solPeriod = '300 days';
    } else if (selectedSOLData.federalSOL === '2 years' || selectedSOLData.federalSOL === '2 or 5 years') {
      deadlineDate = new Date(incident);
      deadlineDate.setFullYear(deadlineDate.getFullYear() + 2);
      solPeriod = '2 years';
    } else if (selectedSOLData.federalSOL.includes('3 years') || selectedSOLData.doubleYear === 3) {
      deadlineDate = new Date(incident);
      deadlineDate.setFullYear(deadlineDate.getFullYear() + 3);
      solPeriod = '3 years';
    } else if (selectedSOLData.federalSOL.includes('4') || selectedSOLData.singleYear === 4) {
      deadlineDate = new Date(incident);
      deadlineDate.setFullYear(deadlineDate.getFullYear() + 4);
      solPeriod = '4 years';
    } else if (selectedSOLData.federalSOL.includes('5') || selectedSOLData.doubleYear === 5) {
      deadlineDate = new Date(incident);
      deadlineDate.setFullYear(deadlineDate.getFullYear() + 5);
      solPeriod = '5 years';
    } else if (selectedSOLData.federalSOL.includes('6') || selectedSOLData.singleYear === 6) {
      deadlineDate = new Date(incident);
      deadlineDate.setFullYear(deadlineDate.getFullYear() + 6);
      solPeriod = '6 years';
    } else {
      deadlineDate = new Date(incident);
      deadlineDate.setFullYear(deadlineDate.getFullYear() + 2);
    }

    const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const remaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setDeadline(formattedDeadline);
    setDaysRemaining(remaining);
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#0f0f0f',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    height: 'auto',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f0f0f',
    backgroundColor: '#FFFFFF',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const isWarning = daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 90;
  const isExpired = daysRemaining !== null && daysRemaining < 0;

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        input:focus, select:focus { border-color: #0966C3 !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        @media (max-width: 640px) { h1 { font-size: clamp(28px, 5vw, 40px); } }
      `}</style>

      {/* Header */}
      <div style={{ background: '#0966C3', borderBottom: '1px solid #E5E7EB', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#0966C3', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Attorney Tools
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
                Statute of Limitations Calculator
              </h1>
            </div>
          </div>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '8px 0 0 52px' }}>
            Calculate filing deadlines and statute of limitations periods for federal and state law claims
          </p>
          <div style={{ marginTop: '12px', display: 'inline-block', background: 'rgba(10, 102, 194, 0.1)', padding: '6px 12px', borderRadius: '12px', border: '1px solid rgba(10, 102, 194, 0.3)' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0966C3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Free during public beta
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="sol-grid">
          <style>{`.sol-grid { grid-template-columns: 1fr !important; } @media (min-width: 768px) { .sol-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>

          {/* Input Section */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Calculate Deadline
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Case Type Select */}
              <div>
                <label style={labelStyle}>Case Type</label>
                <select
                  value={selectedCaseType}
                  onChange={(e) => {
                    setSelectedCaseType(e.target.value);
                    setDeadline(null);
                    setDaysRemaining(null);
                  }}
                  style={inputStyle}
                >
                  <option value="">Select a case type...</option>
                  {allCaseTypes.map((ct) => (
                    <option key={ct.value} value={ct.value}>
                      {ct.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Select */}
              <div>
                <label style={labelStyle}>Jurisdiction</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} style={inputStyle}>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Incident Date */}
              <div>
                <label style={labelStyle}>Incident Date</label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => {
                    setIncidentDate(e.target.value);
                    setDeadline(null);
                    setDaysRemaining(null);
                  }}
                  style={inputStyle}
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculateDeadline}
                disabled={!selectedCaseType || !incidentDate}
                style={{
                  padding: '14px 20px',
                  height: '48px',
                  backgroundColor: selectedCaseType && incidentDate ? '#0966C3' : '#D1D5DB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: selectedCaseType && incidentDate ? 'pointer' : 'not-allowed',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginTop: '8px',
                  transition: 'all 0.2s',
                }}
              >
                Calculate Deadline
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {deadline && (
              <>
                {/* Main Deadline Card */}
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '28px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Filing Deadline
                  </h3>
                  <p style={{ fontSize: '32px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>
                    {deadline}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                    {selectedSOLData?.federalSOL}
                  </p>
                </div>

                {/* Warning Banner */}
                {isExpired && (
                  <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                    </svg>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#991B1B', margin: '0 0 4px' }}>Statute Expired</p>
                      <p style={{ fontSize: '12px', color: '#7F1D1D', margin: 0 }}>
                        This deadline has passed. Consult an attorney immediately about possible exceptions.
                      </p>
                    </div>
                  </div>
                )}

                {isWarning && !isExpired && (
                  <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M12 2v20M2 10h20" />
                    </svg>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#92400E', margin: '0 0 4px' }}>Deadline in {daysRemaining} Days</p>
                      <p style={{ fontSize: '12px', color: '#78350F', margin: 0 }}>
                        You are within 90 days of the filing deadline. Act immediately.
                      </p>
                    </div>
                  </div>
                )}

                {!isWarning && !isExpired && daysRemaining && daysRemaining > 0 && (
                  <div style={{ background: '#D1FAE5', border: '1px solid #6EE7B7', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#065F46', margin: '0 0 4px' }}>
                        {daysRemaining} days remaining
                      </p>
                      <p style={{ fontSize: '12px', color: '#047857', margin: 0 }}>
                        You have sufficient time to prepare your case.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedSOLData && (
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>
                  Key Rules
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedSOLData.notes.slice(0, 3).map((note, i) => (
                    <li key={i} style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.5 }}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Detailed SOL Data Table */}
        {selectedSOLData && (
          <div style={{ marginTop: '40px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                {selectedSOLData.caseType}
              </h2>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Federal Statute
                  </h3>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                    {selectedSOLData.federalSOL}
                  </p>
                </div>
                {selectedSOLData.discoveryRule && (
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Discovery Rule
                    </h3>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#059669', margin: 0 }}>
                      Applies
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>
                  Important Notes
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedSOLData.notes.map((note, i) => (
                    <li key={i} style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6 }}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>
                  Tolling Rules
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedSOLData.tollingRules.map((rule, i) => (
                    <li key={i} style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6 }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '14px', background: '#F3F4F6', borderRadius: '20px', borderLeft: '4px solid #0966C3' }}>
                <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                  <strong>Disclaimer:</strong> This tool provides general information about statutory deadlines. Statute of limitations rules vary significantly by state and claim type. Tolling, discovery rules, and equitable estoppel may apply. Consult a licensed attorney in your jurisdiction immediately—missing a deadline can be catastrophic.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
