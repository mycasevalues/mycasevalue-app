'use client';

import { useState, useMemo, useCallback } from 'react';
import { Metadata } from 'next';

// ============================================================
// TYPES & INTERFACES
// ============================================================

type DiffType = 'match' | 'addition' | 'deletion' | 'modification';

interface DiffSegment {
  type: DiffType;
  text: string;
  wordIndex: number;
}

interface ComparisonResult {
  docASegments: DiffSegment[];
  docBSegments: DiffSegment[];
  allSegments: DiffSegment[];
  similarity: number;
  additionCount: number;
  deletionCount: number;
  modificationCount: number;
  matchCount: number;
}

interface SavedComparison {
  id: string;
  docATitle: string;
  docBTitle: string;
  timestamp: number;
  similarity: number;
  docA: string;
  docB: string;
}

// ============================================================
// DIFF ALGORITHM — Word-Level Comparison
// ============================================================

function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function tokenizeWords(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter(word => word.length > 0);
}

function computeLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i][j - 1] + 1,
        matrix[i - 1][j] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

function isSimilarWord(word1: string, word2: string, threshold = 0.8): boolean {
  if (word1 === word2) return true;
  const distance = computeLevenshteinDistance(word1, word2);
  const maxLen = Math.max(word1.length, word2.length);
  const similarity = 1 - distance / maxLen;
  return similarity >= threshold;
}

function performDiff(textA: string, textB: string): ComparisonResult {
  const wordsA = tokenizeWords(textA);
  const wordsB = tokenizeWords(textB);

  const docASegments: DiffSegment[] = [];
  const docBSegments: DiffSegment[] = [];
  let additionCount = 0;
  let deletionCount = 0;
  let modificationCount = 0;
  let matchCount = 0;

  let i = 0;
  let j = 0;
  let wordIndexA = 0;
  let wordIndexB = 0;

  while (i < wordsA.length || j < wordsB.length) {
    if (i >= wordsA.length) {
      // Remaining words in B are additions
      docBSegments.push({
        type: 'addition',
        text: wordsB[j],
        wordIndex: wordIndexB,
      });
      additionCount++;
      j++;
      wordIndexB++;
    } else if (j >= wordsB.length) {
      // Remaining words in A are deletions
      docASegments.push({
        type: 'deletion',
        text: wordsA[i],
        wordIndex: wordIndexA,
      });
      deletionCount++;
      i++;
      wordIndexA++;
    } else if (isSimilarWord(wordsA[i], wordsB[j])) {
      // Words match or are similar
      const isDifferent = wordsA[i] !== wordsB[j];

      docASegments.push({
        type: isDifferent ? 'modification' : 'match',
        text: wordsA[i],
        wordIndex: wordIndexA,
      });

      docBSegments.push({
        type: isDifferent ? 'modification' : 'match',
        text: wordsB[j],
        wordIndex: wordIndexB,
      });

      if (isDifferent) {
        modificationCount++;
      } else {
        matchCount++;
      }

      i++;
      j++;
      wordIndexA++;
      wordIndexB++;
    } else {
      // Check for additions/deletions
      const lookAheadDistance = 3;
      let matchFoundInA = false;
      let matchFoundInB = false;

      // Look ahead in B for a match with current A word
      for (let k = 1; k <= lookAheadDistance && j + k < wordsB.length; k++) {
        if (isSimilarWord(wordsA[i], wordsB[j + k])) {
          matchFoundInB = true;
          break;
        }
      }

      // Look ahead in A for a match with current B word
      for (let k = 1; k <= lookAheadDistance && i + k < wordsA.length; k++) {
        if (isSimilarWord(wordsA[i + k], wordsB[j])) {
          matchFoundInA = true;
          break;
        }
      }

      if (matchFoundInB && !matchFoundInA) {
        // Words in B before match are additions
        docBSegments.push({
          type: 'addition',
          text: wordsB[j],
          wordIndex: wordIndexB,
        });
        additionCount++;
        j++;
        wordIndexB++;
      } else if (matchFoundInA && !matchFoundInB) {
        // Words in A before match are deletions
        docASegments.push({
          type: 'deletion',
          text: wordsA[i],
          wordIndex: wordIndexA,
        });
        deletionCount++;
        i++;
        wordIndexA++;
      } else {
        // Treat as modification
        docASegments.push({
          type: 'modification',
          text: wordsA[i],
          wordIndex: wordIndexA,
        });

        docBSegments.push({
          type: 'modification',
          text: wordsB[j],
          wordIndex: wordIndexB,
        });

        modificationCount++;
        i++;
        j++;
        wordIndexA++;
        wordIndexB++;
      }
    }
  }

  const totalWords = Math.max(wordsA.length, wordsB.length);
  const similarity = totalWords > 0 ? Math.round((matchCount / totalWords) * 100) : 100;

  return {
    docASegments,
    docBSegments,
    allSegments: [...docASegments, ...docBSegments],
    similarity,
    additionCount,
    deletionCount,
    modificationCount,
    matchCount,
  };
}

// ============================================================
// EXAMPLE DOCUMENTS — Statute Versions
// ============================================================

const EXAMPLE_DOC_A = `28 U.S.C. § 1332 - Diversity of Citizenship

(a) The district courts shall have original jurisdiction of all civil actions where the matter in controversy exceeds the sum or value of $75,000, exclusive of interest and costs, and is between:
(1) citizens of different States;
(2) citizens of a State and citizens or subjects of a foreign state;
(3) citizens of different States and in which citizens or subjects of a foreign state are additional parties; and
(4) a foreign state as defined in section 1603(a) of this title, as plaintiff and citizens of a State or of different States.

For the purposes of this section and section 1441 of this title, district courts shall have jurisdiction of any civil action by a foreign state against citizens of a State or of different States, or against any citizen or subject of a foreign state.

(b) Except when express provision therefor is otherwise made in a statute of the United States, where the plaintiff who files the case originally in the Federal courts is finally adjudged to be entitled to recover less than the sum or value of $75,000, computed without regard to any setoff or counterclaim to which the defendant may be entitled, by the laws of the State in which the action is brought, the district court may in its discretion deny costs to the plaintiff and, in addition, may impose on the plaintiff an additional penalty not to exceed costs on the counterclaim.`;

const EXAMPLE_DOC_B = `28 U.S.C. § 1332 - Diversity of Citizenship (Amended)

(a) The district courts shall have original jurisdiction of all civil actions where the matter in controversy exceeds the sum or value of $100,000, exclusive of interest and costs, and is between:
(1) citizens of different States;
(2) citizens of a State and citizens or subjects of a foreign country;
(3) citizens of different States and in which citizens or subjects of a foreign country are additional parties; and
(4) a foreign state as defined in section 1603(a) of this title, as plaintiff and citizens of a State or of different States.

For the purposes of this section and section 1441 of this title, district courts shall have jurisdiction of any civil action by a foreign state against citizens of a State or of different States, or against any citizen or subject of a foreign country.

(b) Except when express provision therefor is otherwise made in a statute of the United States, where the plaintiff who initiates the case originally in the Federal courts is finally adjudged to be entitled to recover less than the sum or value of $100,000, computed without regard to any setoff or counterclaim to which the defendant may be entitled, by the laws of the State in which the action is brought, the district court may in its discretion deny costs to the plaintiff and, in addition, may impose on the plaintiff an additional penalty not to exceed costs on the counterclaim.`;

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CompareTextPage() {
  // State management
  const [docA, setDocA] = useState(EXAMPLE_DOC_A);
  const [docB, setDocB] = useState(EXAMPLE_DOC_B);
  const [viewMode, setViewMode] = useState<'sidebyside' | 'redline'>('sidebyside');
  const [showAdditions, setShowAdditions] = useState(true);
  const [showDeletions, setShowDeletions] = useState(true);
  const [showMatches, setShowMatches] = useState(true);
  const [currentDifferenceIndex, setCurrentDifferenceIndex] = useState(0);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [docATitle, setDocATitle] = useState('Document A');
  const [docBTitle, setDocBTitle] = useState('Document B');

  // Compute diff
  const comparison = useMemo(() => performDiff(docA, docB), [docA, docB]);

  // Get differences for navigation
  const differences = useMemo(() => {
    return comparison.allSegments.filter(
      seg =>
        (seg.type === 'addition' && showAdditions) ||
        (seg.type === 'deletion' && showDeletions) ||
        (seg.type === 'modification' && (showAdditions || showDeletions))
    );
  }, [comparison, showAdditions, showDeletions]);

  // Navigate differences
  const handleNextDifference = useCallback(() => {
    if (differences.length > 0) {
      setCurrentDifferenceIndex(prev => (prev + 1) % differences.length);
    }
  }, [differences.length]);

  const handlePreviousDifference = useCallback(() => {
    if (differences.length > 0) {
      setCurrentDifferenceIndex(prev => (prev - 1 + differences.length) % differences.length);
    }
  }, [differences.length]);

  // Save comparison
  const handleSaveComparison = useCallback(() => {
    const saved: SavedComparison = {
      id: Math.random().toString(36).substr(2, 9),
      docATitle,
      docBTitle,
      timestamp: Date.now(),
      similarity: comparison.similarity,
      docA,
      docB,
    };
    setSavedComparisons(prev => [saved, ...prev].slice(0, 10));
  }, [docA, docB, docATitle, docBTitle, comparison.similarity]);

  // Load saved comparison
  const handleLoadComparison = useCallback((saved: SavedComparison) => {
    setDocA(saved.docA);
    setDocB(saved.docB);
    setDocATitle(saved.docATitle);
    setDocBTitle(saved.docBTitle);
    setCurrentDifferenceIndex(0);
  }, []);

  // Export functionality
  const handleExportPDF = useCallback(() => {
    const content = `
Text Comparison Report
${docATitle} vs ${docBTitle}

Similarity: ${comparison.similarity}%
Additions: ${comparison.additionCount}
Deletions: ${comparison.deletionCount}
Modifications: ${comparison.modificationCount}

Document A:
${docA}

Document B:
${docB}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparison-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [docA, docB, docATitle, docBTitle, comparison]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // ============================================================
  // RENDER FUNCTIONS
  // ============================================================

  const renderSegment = (segment: DiffSegment, isRedlineView: boolean) => {
    const baseStyle: React.CSSProperties = {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      lineHeight: '1.6',
    };

    if (!showMatches && segment.type === 'match') {
      return null;
    }

    if (!showAdditions && segment.type === 'addition') {
      return null;
    }

    if (!showDeletions && segment.type === 'deletion') {
      return null;
    }

    switch (segment.type) {
      case 'match':
        return (
          <span key={`${segment.wordIndex}-${segment.text}`} style={baseStyle}>
            {segment.text}{' '}
          </span>
        );

      case 'addition':
        return isRedlineView ? (
          <span
            key={`${segment.wordIndex}-${segment.text}`}
            style={{
              ...baseStyle,
              color: 'var(--data-positive)',
              textDecoration: 'underline',
              textDecorationColor: 'var(--data-positive)',
              backgroundColor: 'rgba(23, 100, 56, 0.08)',
              padding: '1px 2px',
            }}
          >
            {segment.text}{' '}
          </span>
        ) : (
          <span
            key={`${segment.wordIndex}-${segment.text}`}
            style={{
              ...baseStyle,
              color: 'var(--data-positive)',
              backgroundColor: 'rgba(23, 100, 56, 0.12)',
              padding: '2px 4px',
              borderRadius: '2px',
            }}
          >
            {segment.text}{' '}
          </span>
        );

      case 'deletion':
        return isRedlineView ? (
          <span
            key={`${segment.wordIndex}-${segment.text}`}
            style={{
              ...baseStyle,
              color: 'var(--data-negative)',
              textDecoration: 'line-through',
              textDecorationColor: 'var(--data-negative)',
              backgroundColor: 'rgba(176, 30, 30, 0.08)',
              padding: '1px 2px',
            }}
          >
            {segment.text}{' '}
          </span>
        ) : (
          <span
            key={`${segment.wordIndex}-${segment.text}`}
            style={{
              ...baseStyle,
              color: 'var(--data-negative)',
              backgroundColor: 'rgba(176, 30, 30, 0.12)',
              padding: '2px 4px',
              borderRadius: '2px',
              opacity: 0.7,
            }}
          >
            {segment.text}{' '}
          </span>
        );

      case 'modification':
        return isRedlineView ? (
          <span
            key={`${segment.wordIndex}-${segment.text}`}
            style={{
              ...baseStyle,
              color: 'var(--flag-yellow)',
              backgroundColor: 'rgba(200, 144, 10, 0.12)',
              padding: '1px 2px',
              borderRadius: '2px',
            }}
          >
            {segment.text}{' '}
          </span>
        ) : (
          <span
            key={`${segment.wordIndex}-${segment.text}`}
            style={{
              ...baseStyle,
              color: 'var(--flag-yellow)',
              backgroundColor: 'rgba(200, 144, 10, 0.15)',
              padding: '2px 4px',
              borderRadius: '2px',
            }}
          >
            {segment.text}{' '}
          </span>
        );

      default:
        return null;
    }
  };

  const renderSideBySide = () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginTop: '24px',
      }}
      className="compare-sidebyside-grid"
    >
      {/* Document A */}
      <div
        style={{
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '20px',
          backgroundColor: 'var(--card)',
          maxHeight: '600px',
          overflowY: 'auto',
        }}
      >
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1)',
            marginBottom: '12px',
          }}
        >
          {docATitle}
        </h3>
        <div
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: 'var(--text1)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {comparison.docASegments.map((seg, i) => (
            <span key={i}>{renderSegment(seg, false)}</span>
          ))}
        </div>
      </div>

      {/* Document B */}
      <div
        style={{
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '20px',
          backgroundColor: 'var(--card)',
          maxHeight: '600px',
          overflowY: 'auto',
        }}
      >
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1)',
            marginBottom: '12px',
          }}
        >
          {docBTitle}
        </h3>
        <div
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: 'var(--text1)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {comparison.docBSegments.map((seg, i) => (
            <span key={i}>{renderSegment(seg, false)}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRedline = () => (
    <div
      style={{
        border: '1px solid var(--bdr)',
        borderRadius: '4px',
        padding: '20px',
        backgroundColor: 'var(--card)',
        marginTop: '24px',
        maxHeight: '600px',
        overflowY: 'auto',
      }}
    >
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'var(--font-ui)',
          color: 'var(--text1)',
          marginBottom: '12px',
        }}
      >
        Redlined View ({docATitle} → {docBTitle})
      </h3>
      <div
        style={{
          fontSize: '13px',
          lineHeight: '1.8',
          color: 'var(--text1)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {comparison.allSegments.map((seg, i) => (
          <span key={i}>{renderSegment(seg, true)}</span>
        ))}
      </div>
    </div>
  );

  // ============================================================
  // MAIN RENDER
  // ============================================================

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surf)' }}>
      <style>{`
        @media (max-width: 768px) {
          .compare-input-grid { grid-template-columns: 1fr !important; }
          .compare-sidebyside-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .compare-page-header { padding: 20px 12px !important; }
        }
      `}</style>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--chrome-bg)', padding: '32px 40px', color: 'var(--chrome-text)' }} className="compare-page-header">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'var(--font-legal)',
              marginBottom: '8px',
            }}
          >
            Text Comparison & Redline Tool
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--chrome-text-muted)', marginBottom: 0 }}>
            Compare two documents side-by-side or in redlined view. Identify additions, deletions, and modifications.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 40px' }}>
        {/* Input Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 600,
              fontFamily: 'var(--font-ui)',
              marginBottom: '16px',
              color: 'var(--text1)',
            }}
          >
            Input Documents
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '16px',
            }}
            className="compare-input-grid"
          >
            {/* Document A Input */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text1)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                Document A Title
              </label>
              <input
                type="text"
                value={docATitle}
                onChange={e => setDocATitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-ui)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--text1)',
                  marginBottom: '8px',
                }}
              />
              <textarea
                value={docA}
                onChange={e => setDocA(e.target.value)}
                placeholder="Paste Document A here..."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '12px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--text1)',
                  resize: 'vertical',
                  lineHeight: '1.6',
                }}
              />
            </div>

            {/* Document B Input */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text1)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                Document B Title
              </label>
              <input
                type="text"
                value={docBTitle}
                onChange={e => setDocBTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-ui)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--text1)',
                  marginBottom: '8px',
                }}
              />
              <textarea
                value={docB}
                onChange={e => setDocB(e.target.value)}
                placeholder="Paste Document B here..."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '12px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--text1)',
                  resize: 'vertical',
                  lineHeight: '1.6',
                }}
              />
            </div>
          </div>
        </div>

        {/* Metrics & Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {/* Similarity Score */}
          <div
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold)',
                marginBottom: '4px',
              }}
            >
              {comparison.similarity}%
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Similarity Score
            </div>
          </div>

          {/* Additions */}
          <div
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--data-positive)',
                marginBottom: '4px',
              }}
            >
              +{comparison.additionCount}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Additions
            </div>
          </div>

          {/* Deletions */}
          <div
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--data-negative)',
                marginBottom: '4px',
              }}
            >
              -{comparison.deletionCount}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Deletions
            </div>
          </div>

          {/* Modifications */}
          <div
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: 'var(--flag-yellow)',
                marginBottom: '4px',
              }}
            >
              ~{comparison.modificationCount}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text2)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Modifications
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            padding: '20px',
            marginBottom: '32px',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1)',
                marginBottom: '12px',
              }}
            >
              View Mode
            </h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                onClick={() => setViewMode('sidebyside')}
                style={{
                  padding: '10px 16px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  backgroundColor: viewMode === 'sidebyside' ? 'var(--gold)' : 'var(--card)',
                  color: viewMode === 'sidebyside' ? '#FFFFFF' : 'var(--text1)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Side by Side
              </button>
              <button
                onClick={() => setViewMode('redline')}
                style={{
                  padding: '10px 16px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  backgroundColor: viewMode === 'redline' ? 'var(--gold)' : 'var(--card)',
                  color: viewMode === 'redline' ? '#FFFFFF' : 'var(--text1)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Redline View
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={showAdditions}
                onChange={e => setShowAdditions(e.target.checked)}
                style={{
                  marginRight: '8px',
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px',
                }}
              />
              Show Additions
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={showDeletions}
                onChange={e => setShowDeletions(e.target.checked)}
                style={{
                  marginRight: '8px',
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px',
                }}
              />
              Show Deletions
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '13px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1)',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={showMatches}
                onChange={e => setShowMatches(e.target.checked)}
                style={{
                  marginRight: '8px',
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px',
                }}
              />
              Show Matches
            </label>
          </div>
        </div>

        {/* Difference Navigation */}
        {differences.length > 0 && (
          <div
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1)',
                fontWeight: 500,
              }}
            >
              Difference {currentDifferenceIndex + 1} of {differences.length}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handlePreviousDifference}
                style={{
                  padding: '8px 12px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  backgroundColor: 'var(--card)',
                  color: 'var(--text1)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Previous
              </button>
              <button
                onClick={handleNextDifference}
                style={{
                  padding: '8px 12px',
                  border: '1px solid var(--bdr)',
                  borderRadius: '2px',
                  backgroundColor: 'var(--gold)',
                  color: 'var(--chrome-text)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Comparison View */}
        {viewMode === 'sidebyside' ? renderSideBySide() : renderRedline()}

        {/* Export & Actions */}
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleSaveComparison}
            style={{
              padding: '12px 20px',
              border: '1px solid var(--bdr)',
              borderRadius: '2px',
              backgroundColor: 'var(--card)',
              color: 'var(--text1)',
              fontFamily: 'var(--font-ui)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Save Comparison
          </button>
          <button
            onClick={handleExportPDF}
            style={{
              padding: '12px 20px',
              border: '1px solid var(--bdr)',
              borderRadius: '2px',
              backgroundColor: 'var(--card)',
              color: 'var(--text1)',
              fontFamily: 'var(--font-ui)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Export as Text
          </button>
          <button
            onClick={handlePrint}
            style={{
              padding: '12px 20px',
              border: '1px solid var(--bdr)',
              borderRadius: '2px',
              backgroundColor: 'var(--card)',
              color: 'var(--text1)',
              fontFamily: 'var(--font-ui)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            Print
          </button>
        </div>

        {/* Saved Comparisons */}
        {savedComparisons.length > 0 && (
          <div
            style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid var(--bdr)',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                color: 'var(--text1)',
              }}
            >
              Recent Comparisons
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '16px',
              }}
            >
              {savedComparisons.map(saved => (
                <div
                  key={saved.id}
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '4px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onClick={() => handleLoadComparison(saved)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gold)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--bdr)';
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--text1)',
                      marginBottom: '8px',
                    }}
                  >
                    {saved.docATitle} → {saved.docBTitle}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text2)',
                      marginBottom: '8px',
                    }}
                  >
                    {new Date(saved.timestamp).toLocaleDateString()}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--text2)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Similarity: {saved.similarity}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--bdr)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', marginBottom: '16px' }}>Related Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {[
              { name: 'State Survey', href: '/attorney/state-survey', desc: 'State-by-state legal survey analysis' },
              { name: 'KeyCite', href: '/attorney/keycite', desc: 'Citation validation and case treatment analysis' },
              { name: 'Secondary Sources', href: '/attorney/secondary-sources', desc: 'Legal secondary sources and treatises' },
              { name: 'Find & Print', href: '/attorney/find-print', desc: 'Find, print and export legal documents' },
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
