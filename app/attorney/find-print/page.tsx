'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock citation data for demonstration
const MOCK_BATCH_RESULTS = [
  {
    input: 'Brown v. Board of Education',
    citation: '347 U.S. 483',
    docType: 'Supreme Court Case',
    status: 'found',
    title: 'Brown v. Board of Education, 347 U.S. 483 (1954) - Segregation in public schools declared unconstitutional',
    year: 1954,
  },
  {
    input: '42 U.S.C. § 1983',
    citation: '42 U.S.C. § 1983',
    docType: 'Federal Statute',
    status: 'found',
    title: 'Civil Action for Deprivation of Rights - Federal Statute',
    year: 1871,
  },
  {
    input: 'Miranda v. Arizona',
    citation: '384 U.S. 436',
    docType: 'Supreme Court Case',
    status: 'found',
    title: 'Miranda v. Arizona, 384 U.S. 436 (1966) - Rights of accused in police custody',
    year: 1966,
  },
  {
    input: '29 CFR § 1910.1200',
    citation: '29 CFR § 1910.1200',
    docType: 'Federal Regulation',
    status: 'found',
    title: 'Hazard Communication Standard - OSHA Regulation',
    year: 1983,
  },
  {
    input: 'Marbury v. Madison',
    citation: '5 U.S. 137',
    docType: 'Supreme Court Case',
    status: 'found',
    title: 'Marbury v. Madison, 5 U.S. 137 (1803) - Judicial review doctrine',
    year: 1803,
  },
  {
    input: 'Gideon v. Wainwright',
    citation: '372 U.S. 335',
    docType: 'Supreme Court Case',
    status: 'found',
    title: 'Gideon v. Wainwright, 372 U.S. 335 (1963) - Right to counsel',
    year: 1963,
  },
  {
    input: 'Roe v. Wade',
    citation: '410 U.S. 113',
    docType: 'Supreme Court Case',
    status: 'found',
    title: 'Roe v. Wade, 410 U.S. 113 (1973) - Constitutional right to privacy',
    year: 1973,
  },
  {
    input: '26 U.S.C. § 162',
    citation: '26 U.S.C. § 162',
    docType: 'Federal Statute',
    status: 'found',
    title: 'Deduction of Trade or Business Expenses - Internal Revenue Code',
    year: 1954,
  },
];

const MOCK_HISTORY = [
  {
    id: 1,
    batchName: 'Discovery Motion Citations',
    date: '2024-04-10',
    citationCount: 12,
    foundCount: 11,
    format: 'PDF',
    status: 'completed',
  },
  {
    id: 2,
    batchName: 'Precedent Analysis - Q1 2024',
    date: '2024-03-28',
    citationCount: 28,
    foundCount: 26,
    format: 'DOCX',
    status: 'completed',
  },
  {
    id: 3,
    batchName: 'Statutory References',
    date: '2024-03-15',
    citationCount: 8,
    foundCount: 8,
    format: 'PDF',
    status: 'completed',
  },
  {
    id: 4,
    batchName: 'Regulatory Compilation',
    date: '2024-02-20',
    citationCount: 15,
    foundCount: 14,
    format: 'RTF',
    status: 'completed',
  },
];

type CitationStatus = 'found' | 'not_found' | 'ambiguous';
type DeliveryFormat = 'pdf' | 'docx' | 'txt' | 'rtf';
type DeliveryMethod = 'download' | 'email' | 'folder' | 'print';

interface ParsedCitation {
  index: number;
  input: string;
  citation: string;
  docType: string;
  status: CitationStatus;
  title: string;
}

interface DeliveryOptions {
  format: DeliveryFormat;
  method: DeliveryMethod;
  includeKeyCite: boolean;
  includeCitingRefs: boolean;
  includeReporterImages: boolean;
  mergeIntoSingle: boolean;
  email?: string;
}

export default function FindPrintPage() {
  const [citationInput, setCitationInput] = useState(
    'Brown v. Board of Education\n42 U.S.C. § 1983\nMiranda v. Arizona\n29 CFR § 1910.1200\nMarbury v. Madison\nGideon v. Wainwright\nRoe v. Wade\n26 U.S.C. § 162'
  );
  const [parsedResults, setParsedResults] = useState<ParsedCitation[]>([]);
  const [processingState, setProcessingState] = useState<'idle' | 'parsing' | 'processing' | 'complete'>('idle');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState<number | null>(null);

  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptions>({
    format: 'pdf',
    method: 'download',
    includeKeyCite: true,
    includeCitingRefs: false,
    includeReporterImages: true,
    mergeIntoSingle: false,
    email: '',
  });

  const [showHelp, setShowHelp] = useState(true);
  const [batchName, setBatchName] = useState('');

  // Parse and process citations
  const handleParseCitations = async () => {
    const lines = citationInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      alert('Please enter at least one citation');
      return;
    }

    if (lines.length > 100) {
      alert('Maximum 100 citations per batch');
      return;
    }

    setProcessingState('parsing');
    setProcessingProgress(0);

    // Simulate parsing progress
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    clearInterval(interval);

    // Map input to mock results
    const results: ParsedCitation[] = lines.map((input, idx) => {
      const mockMatch = MOCK_BATCH_RESULTS.find(
        (m) => m.input.toLowerCase() === input.toLowerCase() || m.citation.toLowerCase() === input.toLowerCase()
      );

      if (mockMatch) {
        return {
          index: idx + 1,
          input,
          citation: mockMatch.citation,
          docType: mockMatch.docType,
          status: mockMatch.status as CitationStatus,
          title: mockMatch.title,
        };
      }

      return {
        index: idx + 1,
        input,
        citation: 'Unknown',
        docType: 'Unknown',
        status: 'not_found',
        title: 'Citation not found in database',
      };
    });

    setParsedResults(results);
    setProcessingProgress(100);
    setProcessingState('complete');
    setShowResults(true);
  };

  const handleRetrieveDocuments = async () => {
    if (parsedResults.length === 0) {
      alert('Please parse citations first');
      return;
    }

    setProcessingState('processing');
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearInterval(interval);

    // Simulate download/delivery
    const format = deliveryOptions.format.toUpperCase();
    const filename = `batch-${Date.now()}.${getFileExtension(deliveryOptions.format)}`;
    alert(`Document batch prepared (${parsedResults.filter(r => r.status === 'found').length} documents):\nFormat: ${format}\nDelivery: ${deliveryOptions.method.toUpperCase()}\n\nFile: ${filename}`);

    setProcessingProgress(100);
  };

  const getFileExtension = (format: DeliveryFormat): string => {
    switch (format) {
      case 'pdf': return 'pdf';
      case 'docx': return 'docx';
      case 'txt': return 'txt';
      case 'rtf': return 'rtf';
    }
  };

  const foundCount = parsedResults.filter((r) => r.status === 'found').length;
  const notFoundCount = parsedResults.filter((r) => r.status === 'not_found').length;
  const ambiguousCount = parsedResults.filter((r) => r.status === 'ambiguous').length;

  const getStatusBadge = (status: CitationStatus) => {
    switch (status) {
      case 'found':
        return { bg: 'var(--data-positive-bg, #EAF4EF)', text: 'var(--data-positive)', label: 'Found' };
      case 'not_found':
        return { bg: 'var(--data-negative-bg, #FAEAEA)', text: 'var(--data-negative)', label: 'Not Found' };
      case 'ambiguous':
        return { bg: 'rgba(196, 136, 42, 0.1)', text: 'var(--wrn-txt, #C4882A)', label: 'Ambiguous' };
    }
  };

  const getDocTypeColor = (docType: string): string => {
    if (docType.includes('Case')) return 'var(--link)';
    if (docType.includes('Statute')) return 'var(--data-positive)';
    if (docType.includes('Regulation')) return 'var(--gold)';
    return 'var(--text-secondary, #666)';
  };

  return (
    <div style={{ background: 'var(--surf)', minHeight: '100vh', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div
        style={{
          background: 'var(--chrome-bg)',
          color: 'white',
          padding: '40px 24px 32px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
        className="findprint-page-header"
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              marginBottom: 16,
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--gold)',
                animation: 'pulse 2s infinite',
              }}
            />
            Batch Retrieval
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-legal)',
              fontSize: 28,
              fontWeight: 700,
              color: 'white',
              margin: '0 0 12px',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            Find & Print Documents
          </h1>

          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            Retrieve multiple legal documents by citation. Enter up to 100 citations at once, parse to verify, then download or send formatted documents.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {/* Main Grid: Input + Help Sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, marginBottom: 32 }} className="findprint-main-grid">
          {/* Left Column: Citation Input */}
          <div>
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--bdr)',
                borderRadius: 4,
                padding: 24,
              }}
            >
              <label
                htmlFor="citation-input"
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Enter Citations (One Per Line)
              </label>

              <textarea
                id="citation-input"
                value={citationInput}
                onChange={(e) => setCitationInput(e.target.value)}
                placeholder="Brown v. Board of Education&#10;347 U.S. 483&#10;42 U.S.C. § 1983&#10;29 CFR § 1910.1200"
                style={{
                  width: '100%',
                  height: 320,
                  padding: '16px',
                  fontSize: 14,
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  background: 'var(--surf)',
                  color: 'var(--text-primary)',
                  resize: 'vertical',
                  lineHeight: 1.6,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 16,
                  fontSize: 12,
                  color: 'var(--text-secondary, #666)',
                }}
              >
                <span>{citationInput.split('\n').filter((l) => l.trim()).length} citations</span>
                <span>Max 100</span>
              </div>
            </div>

            {/* Parse Button */}
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              <button
                onClick={handleParseCitations}
                disabled={processingState !== 'idle' && processingState !== 'complete'}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  fontSize: 14,
                  fontWeight: 600,
                  background: processingState === 'parsing' ? 'var(--gold)' : 'var(--gold)',
                  color: 'var(--chrome-bg)',
                  border: 'none',
                  borderRadius: 2,
                  cursor: processingState !== 'idle' && processingState !== 'complete' ? 'not-allowed' : 'pointer',
                  transition: 'all 200ms',
                  opacity:
                    processingState !== 'idle' && processingState !== 'complete' ? 0.6 : 1,
                }}
              >
                {processingState === 'parsing' ? `Parsing... ${Math.round(processingProgress)}%` : 'Parse & Validate Citations'}
              </button>
              <button
                onClick={() => setCitationInput('')}
                style={{
                  padding: '14px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  background: 'transparent',
                  color: 'var(--text-secondary, #666)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Right Sidebar: Help & Format Examples */}
          {showHelp && (
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--bdr)',
                borderRadius: 4,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'var(--text-primary)',
                  }}
                >
                  Citation Format Help
                </h3>
                <button
                  onClick={() => setShowHelp(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                    color: 'var(--text-secondary, #666)',
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-secondary, #666)' }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Case Citations</div>
                  <code
                    style={{
                      display: 'block',
                      background: 'var(--surf)',
                      padding: '6px 8px',
                      borderRadius: 2,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--link)',
                    }}
                  >
                    347 U.S. 483
                    <br />
                    Brown v. Board
                  </code>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Federal Statutes</div>
                  <code
                    style={{
                      display: 'block',
                      background: 'var(--surf)',
                      padding: '6px 8px',
                      borderRadius: 2,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--data-positive)',
                    }}
                  >
                    42 U.S.C. § 1983
                  </code>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Regulations</div>
                  <code
                    style={{
                      display: 'block',
                      background: 'var(--surf)',
                      padding: '6px 8px',
                      borderRadius: 2,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--gold)',
                    }}
                  >
                    29 CFR § 1910.1200
                  </code>
                </div>

                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--bdr)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--wrn-txt, #C4882A)', fontSize: 12, marginBottom: 6 }}>Tips</div>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    <li>One citation per line</li>
                    <li>Full or short form</li>
                    <li>Spaces optional</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Processing Progress Bar */}
        {processingState !== 'idle' && (
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
              padding: 20,
              marginBottom: 32,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {processingState === 'parsing' ? 'Parsing Citations...' : 'Retrieving Documents...'}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary, #666)' }}>{Math.round(processingProgress)}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 6,
                    background: 'var(--surf)',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: 'var(--gold)',
                      width: `${processingProgress}%`,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parsed Results */}
        {showResults && processingState === 'complete' && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: '0 0 4px',
                    }}
                  >
                    Parsed Results
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--text-secondary, #666)',
                      margin: 0,
                    }}
                  >
                    {foundCount} of {parsedResults.length} documents found
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  {notFoundCount > 0 && (
                    <div
                      style={{
                        background: 'var(--data-negative-bg, #FAEAEA)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: 3,
                        padding: '8px 12px',
                        fontSize: 12,
                        color: 'var(--data-negative)',
                        fontWeight: 600,
                      }}
                    >
                      {notFoundCount} not found
                    </div>
                  )}
                </div>
              </div>

              {/* Results Table */}
              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 14,
                  }}
                >
                  <thead>
                    <tr style={{ background: 'var(--surf)', borderBottom: '1px solid var(--bdr)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Citation
                      </th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Type
                      </th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Status
                      </th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Preview
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedResults.map((result) => {
                      const statusBadge = getStatusBadge(result.status);
                      return (
                        <tr key={result.index} style={{ borderBottom: '1px solid var(--bdr)' }}>
                          <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                            {result.citation}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '4px 8px',
                                background: `${getDocTypeColor(result.docType)}20`,
                                color: getDocTypeColor(result.docType),
                                fontSize: 12,
                                fontWeight: 600,
                                borderRadius: 3,
                              }}
                            >
                              {result.docType.split(' ')[0]}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '4px 8px',
                                background: statusBadge.bg,
                                color: statusBadge.text,
                                fontSize: 12,
                                fontWeight: 600,
                                borderRadius: 3,
                              }}
                            >
                              {statusBadge.label}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: 'var(--text-secondary, #666)' }}>
                            {result.title}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Options Section */}
        {showResults && processingState === 'complete' && (
          <div style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: '0 0 20px',
              }}
            >
              Delivery Options
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="findprint-delivery-grid">
              {/* Format Selection */}
              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 4,
                  padding: 20,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Document Format
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['pdf', 'docx', 'txt', 'rtf'].map((fmt) => (
                    <label
                      key={fmt}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 12px',
                        borderRadius: 2,
                        cursor: 'pointer',
                        background: deliveryOptions.format === fmt ? 'var(--gold)20' : 'transparent',
                        border: deliveryOptions.format === fmt ? `1px solid var(--gold)` : '1px solid transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="format"
                        value={fmt}
                        checked={deliveryOptions.format === fmt as DeliveryFormat}
                        onChange={(e) =>
                          setDeliveryOptions({
                            ...deliveryOptions,
                            format: e.target.value as DeliveryFormat,
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                        {fmt === 'pdf' && 'PDF'}
                        {fmt === 'docx' && 'Word (.docx)'}
                        {fmt === 'txt' && 'Plain Text'}
                        {fmt === 'rtf' && 'Rich Text'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Method */}
              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 4,
                  padding: 20,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Delivery Method
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { id: 'download', label: 'Download' },
                    { id: 'email', label: 'Send to Email' },
                    { id: 'folder', label: 'Save to Folder' },
                    { id: 'print', label: 'Print' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 12px',
                        borderRadius: 2,
                        cursor: 'pointer',
                        background: deliveryOptions.method === method.id ? 'var(--gold)20' : 'transparent',
                        border: deliveryOptions.method === method.id ? `1px solid var(--gold)` : '1px solid transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={method.id}
                        checked={deliveryOptions.method === method.id as DeliveryMethod}
                        onChange={(e) =>
                          setDeliveryOptions({
                            ...deliveryOptions,
                            method: e.target.value as DeliveryMethod,
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--bdr)',
                borderRadius: 4,
                padding: 20,
                marginTop: 20,
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Additional Options
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="findprint-options-grid">
                {[
                  { key: 'includeKeyCite', label: 'Include KeyCite History' },
                  { key: 'includeCitingRefs', label: 'Include Citing References' },
                  { key: 'includeReporterImages', label: 'Include Reporter Images' },
                  { key: 'mergeIntoSingle', label: 'Merge into Single File' },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        deliveryOptions[opt.key as keyof DeliveryOptions] === true
                      }
                      onChange={(e) =>
                        setDeliveryOptions({
                          ...deliveryOptions,
                          [opt.key]: e.target.checked,
                        })
                      }
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Retrieve Button */}
            <button
              onClick={handleRetrieveDocuments}
              disabled={false}
              style={{
                width: '100%',
                marginTop: 20,
                padding: '16px 24px',
                fontSize: 14,
                fontWeight: 600,
                background: 'var(--gold)',
                color: 'var(--chrome-bg)',
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              {`Retrieve ${foundCount} Document${foundCount !== 1 ? 's' : ''}`}
            </button>
          </div>
        )}

        {/* Recent Batch History */}
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            Recent Retrievals
          </h2>

          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: 'var(--surf)', borderBottom: '1px solid var(--bdr)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Batch Name
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Date
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Citations
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Format
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, fontSize: 12, color: 'var(--text-secondary, #666)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {MOCK_HISTORY.map((batch) => (
                  <tr
                    key={batch.id}
                    style={{
                      borderBottom: '1px solid var(--bdr)',
                      background: activeHistoryId === batch.id ? 'var(--gold)10' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 200ms',
                    }}
                    onMouseEnter={() => setActiveHistoryId(batch.id)}
                    onMouseLeave={() => setActiveHistoryId(null)}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {batch.batchName}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--text-secondary, #666)' }}>
                      {new Date(batch.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: 14, color: 'var(--text-secondary, #666)' }}>
                      {batch.foundCount}/{batch.citationCount}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          background: 'var(--gold)20',
                          color: 'var(--gold)',
                          fontSize: 12,
                          fontWeight: 600,
                          borderRadius: 3,
                        }}
                      >
                        {batch.format}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          background: 'var(--data-positive-bg, #EAF4EF)',
                          color: 'var(--data-positive)',
                          fontSize: 12,
                          fontWeight: 600,
                          borderRadius: 3,
                        }}
                      >
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 20,
            }}
          >
            <button
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: 14,
                fontWeight: 600,
                background: 'var(--card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--bdr)',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              Load from Folder
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: 14,
                fontWeight: 600,
                background: 'var(--card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--bdr)',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 200ms',
              }}
            >
              Load Recent Search
            </button>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { name: 'Folders', href: '/attorney/folders', desc: 'Organize and manage research folders' },
              { name: 'Citation Check', href: '/attorney/keycite', desc: 'Citation validation and case treatment analysis' },
              { name: 'Compare Text', href: '/attorney/compare-text', desc: 'Compare legal documents side by side' },
              { name: 'Advanced Search', href: '/attorney/advanced-search', desc: 'Advanced legal research search tools' },
            ].map(tool => (
              <a key={tool.href} href={tool.href} style={{ display: 'block', padding: '16px', background: 'var(--surf)', border: '1px solid var(--bdr)', borderRadius: '4px', textDecoration: 'none', color: 'inherit', transition: 'border-color 200ms' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--link)', marginBottom: '4px' }}>{tool.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{tool.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @media (max-width: 768px) {
          .findprint-main-grid { grid-template-columns: 1fr !important; }
          .findprint-delivery-grid { grid-template-columns: 1fr !important; }
          .findprint-options-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .findprint-page-header { padding: 20px 12px !important; }
        }
      `}</style>
    </div>
  );
}
