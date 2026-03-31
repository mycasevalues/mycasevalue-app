'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

interface SearchOption {
  label: string;
  nos: string;
  d: string;
}

interface SITCategory {
  id: string;
  label: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
  opts: SearchOption[];
}

interface EnhancedSearchProps {
  onSelect: (opt: any) => void;
  sits: SITCategory[];
  lang: 'en' | 'es';
}

interface SearchResult {
  opt: SearchOption;
  category: SITCategory;
  matchScore: number;
}

interface PopularItem {
  label: string;
  trending: boolean;
}

const POPULAR_SEARCHES_EN: PopularItem[] = [
  { label: 'Employment Discrimination', trending: true },
  { label: 'Vehicle Accident', trending: true },
  { label: 'Medical Malpractice', trending: false },
  { label: 'Debt Collection', trending: false },
  { label: 'Data Breach', trending: false },
  { label: 'Slip and Fall', trending: false },
];

const POPULAR_SEARCHES_ES: PopularItem[] = [
  { label: 'Discriminación Laboral', trending: true },
  { label: 'Accidente de Vehículo', trending: true },
  { label: 'Negligencia Médica', trending: false },
  { label: 'Cobro de Deudas', trending: false },
  { label: 'Violación de Datos', trending: false },
  { label: 'Caída y Lesión', trending: false },
];

/* ── Synonym map for common legal search terms ───────────────── */
const SEARCH_SYNONYMS: Record<string, string[]> = {
  fired: ['wrongful termination', 'terminated', 'let go', 'dismissed', 'employment'],
  harassed: ['harassment', 'hostile work environment', 'bullying', 'sexual harassment'],
  accident: ['vehicle', 'car', 'truck', 'motorcycle', 'crash', 'collision', 'motor'],
  hurt: ['injury', 'injured', 'harm', 'pain', 'damages', 'personal injury'],
  doctor: ['medical malpractice', 'surgical error', 'misdiagnosis', 'hospital'],
  police: ['excessive force', 'misconduct', 'wrongful arrest', 'brutality', 'civil rights'],
  landlord: ['housing', 'eviction', 'rent', 'lease', 'tenant', 'discrimination'],
  debt: ['collection', 'FDCPA', 'creditor', 'collector', 'debt collector'],
  scam: ['fraud', 'deceptive', 'false advertising', 'scammer'],
  slip: ['slip and fall', 'premises liability', 'trip', 'fell'],
  dog: ['dog bite', 'animal attack'],
  car: ['vehicle accident', 'auto accident', 'car crash', 'motor vehicle'],
  wage: ['unpaid wages', 'overtime', 'wage theft', 'FLSA', 'minimum wage'],
  discrimination: ['bias', 'prejudice', 'unequal treatment', 'discriminated'],
  disability: ['ADA', 'accommodation', 'disabled', 'handicap'],
  pregnant: ['pregnancy discrimination', 'maternity', 'FMLA'],
  insurance: ['bad faith', 'denial', 'claim denied', 'coverage'],
  contract: ['breach', 'agreement', 'broken promise', 'breach of contract'],
  robocall: ['TCPA', 'spam', 'telemarketer', 'robo', 'spam text'],
  death: ['wrongful death', 'fatal', 'deceased', 'killed'],
  race: ['racial discrimination', 'racial profiling', 'racism'],
  age: ['age discrimination', 'ADEA', 'ageism'],
  sue: ['lawsuit', 'legal action', 'litigation'],
  money: ['settlement', 'compensation', 'damages', 'recovery'],
};

const expandWithSynonyms = (query: string): string[] => {
  const lower = query.toLowerCase().trim();
  const words = lower.split(/\s+/);
  const expanded = new Set<string>(words);
  words.forEach((word) => {
    Object.entries(SEARCH_SYNONYMS).forEach(([key, syns]) => {
      if (word.includes(key) || key.includes(word)) {
        syns.forEach((s) => expanded.add(s.toLowerCase()));
      }
    });
  });
  return Array.from(expanded);
};

const fuzzyMatch = (query: string, text: string): number => {
  const lowerQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();

  if (!lowerQuery) return 0;
  if (lowerText === lowerQuery) return 1000;
  if (lowerText.startsWith(lowerQuery)) return 500;

  let score = 0;
  let queryIdx = 0;

  for (let i = 0; i < lowerText.length && queryIdx < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIdx]) {
      score += 10;
      queryIdx++;
      if (i === 0 || lowerText[i - 1] === ' ') {
        score += 50;
      }
    }
  }

  if (queryIdx === lowerQuery.length) {
    return score;
  }

  return -1;
};

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ onSelect, sits, lang }) => {
  const POPULAR_SEARCHES = lang === 'es' ? POPULAR_SEARCHES_ES : POPULAR_SEARCHES_EN;
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>(undefined as any);

  // Flatten all options with their categories
  const allOptions = useMemo(
    () =>
      sits.flatMap((category) =>
        category.opts.map((opt) => ({
          opt,
          category,
        }))
      ),
    [sits]
  );

  // Fuzzy search with synonym expansion
  const searchResults = useMemo(() => {
    if (!input.trim()) return [];

    const expandedTerms = expandWithSynonyms(input);

    const results: SearchResult[] = allOptions
      .map((item) => {
        // Direct fuzzy match on original query
        const labelScore = fuzzyMatch(input, item.opt.label);
        const descScore = fuzzyMatch(input, item.opt.d || '');
        let matchScore = Math.max(labelScore, descScore);

        // Synonym expansion boost
        if (matchScore <= 0) {
          const haystack = `${item.opt.label} ${item.opt.d || ''}`.toLowerCase();
          expandedTerms.forEach((term) => {
            if (haystack.includes(term) && term !== input.toLowerCase()) {
              matchScore = Math.max(matchScore, 80); // synonym match base score
            }
          });
        }

        return {
          ...item,
          matchScore,
        };
      })
      .filter((item) => item.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 8);

    return results;
  }, [input, allOptions]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchResult[] } = {};

    searchResults.forEach((result) => {
      if (!groups[result.category.id]) {
        groups[result.category.id] = [];
      }
      groups[result.category.id].push(result);
    });

    return groups;
  }, [searchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setSelectedIndex(-1);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim()) {
      debounceTimer.current = setTimeout(() => {
        setIsOpen(true);
      }, 100);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = useCallback(
    (result: SearchResult) => {
      onSelect(result.opt);
      setInput('');
      setIsOpen(false);
      setSelectedIndex(-1);
    },
    [onSelect]
  );

  const handlePopularSelect = useCallback(
    (label: string) => {
      const found = allOptions.find(
        (item) => item.opt.label.toLowerCase() === label.toLowerCase()
      );
      if (found) {
        onSelect(found.opt);
        setInput('');
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    },
    [allOptions, onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen && e.key !== 'ArrowDown' && e.key !== 'Enter') return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        const totalItems = input.trim() ? searchResults.length : POPULAR_SEARCHES.length;
        setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (input.trim()) {
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleSelect(searchResults[selectedIndex]);
          }
        } else if (selectedIndex >= 0 && selectedIndex < POPULAR_SEARCHES.length) {
          handlePopularSelect(POPULAR_SEARCHES[selectedIndex].label);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    },
    [isOpen, input, searchResults, selectedIndex, handleSelect, handlePopularSelect]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayResults = input.trim() ? searchResults : [];
  const displayPopular = !input.trim() ? POPULAR_SEARCHES : [];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      {/* Search Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#131B2E',
          border: '1px solid #1E293B',
          borderRadius: '8px',
          padding: '10px 14px',
          gap: '10px',
          transition: 'all 0.3s ease',
          borderColor: isOpen ? '#4F46E5' : '#1E293B',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (input.trim()) {
              setIsOpen(true);
            }
          }}
          placeholder={lang === 'en' ? 'Search case types...' : 'Buscar tipos de casos...'}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F0F2F5',
            fontSize: '14px',
            fontWeight: '500',
          }}
        />
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            backgroundColor: '#0B1221',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 50,
            maxHeight: '400px',
            overflowY: 'auto',
            animation: 'slideDown 0.2s ease-out',
          }}
        >
          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Search Results */}
          {displayResults.length > 0 ? (
            <div>
              {Object.entries(groupedResults).map(([categoryId, results]) => {
                const category = sits.find((s) => s.id === categoryId);
                if (!category) return null;

                return (
                  <div key={categoryId}>
                    {/* Category Header */}
                    <div
                      style={{
                        padding: '10px 14px 6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#94A3B8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: category.color,
                          marginRight: '8px',
                        }}
                      ></span>
                      {category.label}
                    </div>

                    {/* Category Results */}
                    {results.map((result, idx) => {
                      const globalIndex = searchResults.indexOf(result);
                      const isSelected = selectedIndex === globalIndex;

                      return (
                        <div
                          key={`${categoryId}-${idx}`}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          style={{
                            padding: '10px 14px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#1E293B' : 'transparent',
                            borderLeft: isSelected ? `3px solid ${category.color}` : '3px solid transparent',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#F0F2F5',
                                marginBottom: '2px',
                              }}
                            >
                              {result.opt.label}
                            </div>
                            {result.opt.d && (
                              <div
                                style={{
                                  fontSize: '12px',
                                  color: '#64748B',
                                  marginTop: '2px',
                                }}
                              >
                                {result.opt.d}
                              </div>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: '11px',
                              color: '#94A3B8',
                              marginLeft: '12px',
                              whiteSpace: 'nowrap',
                              fontFamily: '"JetBrains Mono", monospace',
                            }}
                          >
                            {lang === 'es' ? 'en' : 'in'} {category.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : displayPopular.length > 0 ? (
            // Popular Searches
            <div>
              <div
                style={{
                  padding: '12px 14px 8px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {lang === 'es' ? 'Búsquedas populares' : 'Popular Searches'}
              </div>
              {displayPopular.map((popular, idx) => {
                const isSelected = selectedIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handlePopularSelect(popular.label)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      padding: '10px 14px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#1E293B' : 'transparent',
                      borderLeft: isSelected ? '3px solid #4F46E5' : '3px solid transparent',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#F0F2F5',
                      }}
                    >
                      {popular.label}
                    </div>
                    {popular.trending && (
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#FFFFFF',
                          backgroundColor: '#4F46E5',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                        }}
                      >
                        {lang === 'es' ? 'Tendencia' : 'Trending'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // No Results
            <div
              style={{
                padding: '20px 14px',
                textAlign: 'center',
                color: '#94A3B8',
                fontSize: '14px',
              }}
            >
              {lang === 'en' ? 'No case types found' : 'No se encontraron tipos de casos'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
