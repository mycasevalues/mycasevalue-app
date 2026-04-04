'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* ── Data for searchable items ───────────────────────────────── */
interface SearchItem {
  id: string;
  label: string;
  description: string;
  category: string;
  categoryColor: string;
  nos?: string;
  type: 'case' | 'page' | 'action' | 'quick-link';
  action?: () => void;
  icon?: string;
  keyboardHint?: string;
}

interface CommandPaletteProps {
  lang?: 'en' | 'es';
  isOpen: boolean;
  onClose: () => void;
  onSelectCase?: (nos: string, description: string) => void;
  onNavigate?: (tab: string) => void;
  sits?: any[];
}

/* ── Synonym map for legal search queries ────────────────────── */
const SYNONYMS: Record<string, string[]> = {
  fired: ['wrongful termination', 'terminated', 'let go', 'dismissed'],
  harassed: ['harassment', 'hostile work environment', 'bullying'],
  accident: ['vehicle', 'car', 'truck', 'motorcycle', 'crash', 'collision'],
  sued: ['lawsuit', 'litigation', 'legal action'],
  hurt: ['injury', 'injured', 'harm', 'pain', 'damages'],
  money: ['settlement', 'compensation', 'recovery', 'payout', 'award'],
  doctor: ['medical malpractice', 'surgical error', 'misdiagnosis'],
  police: ['excessive force', 'misconduct', 'wrongful arrest', 'brutality'],
  landlord: ['housing', 'eviction', 'rent', 'lease', 'tenant'],
  debt: ['collection', 'FDCPA', 'creditor', 'collector'],
  scam: ['fraud', 'deceptive', 'false advertising'],
  slip: ['slip and fall', 'premises liability', 'trip'],
  dog: ['dog bite', 'animal attack'],
  car: ['vehicle accident', 'auto accident', 'car crash', 'motor vehicle'],
  wage: ['unpaid wages', 'overtime', 'wage theft', 'FLSA'],
  discrimination: ['bias', 'prejudice', 'unequal treatment'],
  disability: ['ADA', 'accommodation', 'disabled'],
  pregnant: ['pregnancy discrimination', 'maternity', 'FMLA'],
  insurance: ['bad faith', 'denial', 'claim denied', 'coverage'],
  contract: ['breach', 'agreement', 'broken promise'],
  robocall: ['TCPA', 'spam', 'telemarketer', 'robo'],
  divorce: ['family', 'custody', 'separation', 'alimony'],
  death: ['wrongful death', 'fatal', 'deceased', 'killed'],
};

export default function CommandPalette({
  lang = 'en',
  isOpen,
  onClose,
  onSelectCase,
  onNavigate,
  sits = [],
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* ── Build searchable items from SITS data ─────────────────── */
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // Quick links (top-level actions)
    const quickLinks = [
      {
        id: 'quick-search',
        label: lang === 'es' ? 'Buscar casos' : 'Search Cases',
        description: lang === 'es' ? 'Explorar resultados de casos' : 'Browse case outcomes',
        category: lang === 'es' ? 'Enlaces rápidos' : 'Quick Links',
        icon: '🔍',
      },
      {
        id: 'quick-calculator',
        label: lang === 'es' ? 'Calculadora' : 'Calculator',
        description: lang === 'es' ? 'Calcular costos y recuperaciones' : 'Calculate recovery and costs',
        category: lang === 'es' ? 'Enlaces rápidos' : 'Quick Links',
        icon: '🧮',
      },
      {
        id: 'quick-pricing',
        label: lang === 'es' ? 'Precios' : 'Pricing',
        description: lang === 'es' ? 'Ver planes y opciones' : 'View our pricing plans',
        category: lang === 'es' ? 'Enlaces rápidos' : 'Quick Links',
        icon: '💰',
      },
      {
        id: 'quick-dashboard',
        label: lang === 'es' ? 'Panel' : 'Dashboard',
        description: lang === 'es' ? 'Ver tus reportes guardados' : 'View your saved reports',
        category: lang === 'es' ? 'Enlaces rápidos' : 'Quick Links',
        icon: '📊',
      },
      {
        id: 'quick-compare',
        label: lang === 'es' ? 'Comparar casos' : 'Compare Cases',
        description: lang === 'es' ? 'Comparar múltiples casos' : 'Compare case outcomes',
        category: lang === 'es' ? 'Enlaces rápidos' : 'Quick Links',
        icon: '⚖️',
      },
    ];

    quickLinks.forEach((link) => {
      items.push({
        ...link,
        categoryColor: '#006997',
        type: 'quick-link' as const,
      });
    });

    // Case categories (from SITS data)
    const caseCategories = [
      { id: 'cat-work', label: lang === 'es' ? 'Trabajo' : 'Work', description: lang === 'es' ? 'Casos de empleo y derechos laborales' : 'Employment & workplace', icon: '👔', color: '#006997' },
      { id: 'cat-injury', label: lang === 'es' ? 'Lesiones' : 'Injury', description: lang === 'es' ? 'Lesiones personales y responsabilidad' : 'Personal injury & liability', icon: '⚠️', color: '#006997' },
      { id: 'cat-consumer', label: lang === 'es' ? 'Consumidor' : 'Consumer', description: lang === 'es' ? 'Derechos del consumidor' : 'Consumer protection', icon: '🛍️', color: '#006997' },
      { id: 'cat-rights', label: lang === 'es' ? 'Derechos' : 'Rights', description: lang === 'es' ? 'Derechos civiles y constitucionales' : 'Civil rights & liberties', icon: '⚖️', color: '#006997' },
      { id: 'cat-money', label: lang === 'es' ? 'Dinero' : 'Money', description: lang === 'es' ? 'Disputas financieras y deudas' : 'Financial disputes & debt', icon: '💵', color: '#006997' },
      { id: 'cat-housing', label: lang === 'es' ? 'Vivienda' : 'Housing', description: lang === 'es' ? 'Vivienda y litigios de bienes raíces' : 'Housing & real estate', icon: '🏠', color: '#006997' },
      { id: 'cat-medical', label: lang === 'es' ? 'Médico' : 'Medical', description: lang === 'es' ? 'Negligencia médica y mala praxis' : 'Medical malpractice', icon: '⚕️', color: '#006997' },
      { id: 'cat-family', label: lang === 'es' ? 'Familia' : 'Family', description: lang === 'es' ? 'Derecho familiar y custodia' : 'Family law & custody', icon: '👨‍👩‍👧', color: '#006997' },
      { id: 'cat-gov', label: lang === 'es' ? 'Gobierno' : 'Government', description: lang === 'es' ? 'Acceso a la información y FOIA' : 'Government & access', icon: '🏛️', color: '#006997' },
    ];

    caseCategories.forEach((cat) => {
      items.push({
        id: cat.id,
        label: cat.label,
        description: cat.description,
        category: lang === 'es' ? 'Categorías de casos' : 'Case Categories',
        categoryColor: cat.color,
        type: 'case' as const,
        icon: cat.icon,
      });
    });

    // Case types from SITS (only if sits data is available)
    if (sits && sits.length > 0) {
      sits.forEach((cat: any) => {
        cat.opts?.forEach((opt: any) => {
          items.push({
            id: `case-${opt.nos}-${opt.d}`,
            label: opt.label,
            description: opt.d,
            category: cat.label,
            categoryColor: cat.color || '#455A64',
            nos: opt.nos,
            type: 'case',
          });
        });
      });
    }

    // Static pages
    const pages = [
      {
        id: 'page-home',
        label: lang === 'es' ? 'Inicio' : 'Home',
        description: lang === 'es' ? 'Volver al inicio' : 'Go to homepage',
        category: lang === 'es' ? 'Páginas' : 'Pages',
        icon: '🏠',
      },
      {
        id: 'page-blog',
        label: lang === 'es' ? 'Blog' : 'Blog',
        description: lang === 'es' ? 'Artículos y análisis' : 'Articles and insights',
        category: lang === 'es' ? 'Páginas' : 'Pages',
        icon: '📰',
      },
      {
        id: 'page-about',
        label: lang === 'es' ? 'Acerca de' : 'About',
        description: lang === 'es' ? 'Quiénes somos' : 'About our team',
        category: lang === 'es' ? 'Páginas' : 'Pages',
        icon: 'ℹ️',
      },
      {
        id: 'page-how-it-works',
        label: lang === 'es' ? 'Cómo funciona' : 'How It Works',
        description: lang === 'es' ? 'Guía paso a paso' : 'Step-by-step guide',
        category: lang === 'es' ? 'Páginas' : 'Pages',
        icon: '🔧',
      },
      {
        id: 'page-methodology',
        label: lang === 'es' ? 'Metodología' : 'Methodology',
        description: lang === 'es' ? 'Cómo funciona nuestro sistema' : 'How our data works',
        category: lang === 'es' ? 'Páginas' : 'Pages',
        icon: '📊',
      },
      {
        id: 'page-glossary',
        label: lang === 'es' ? 'Glosario' : 'Glossary',
        description: lang === 'es' ? 'Términos legales explicados' : 'Legal terms explained',
        category: lang === 'es' ? 'Páginas' : 'Pages',
        icon: '📚',
      },
    ];

    pages.forEach((p) => {
      items.push({ ...p, categoryColor: 'var(--fg-subtle)', type: 'page' as const });
    });

    // Quick actions
    const actions = [
      {
        id: 'action-lang',
        label: lang === 'es' ? 'English' : 'Español',
        description: lang === 'es' ? 'Cambiar idioma' : 'Switch language',
        category: lang === 'es' ? 'Acciones' : 'Actions',
        icon: '🌐',
      },
    ];

    actions.forEach((a) => {
      items.push({ ...a, categoryColor: '#3D72FF', type: 'action' as const });
    });

    return items;
  }, [sits, lang]);

  /* ── Fuzzy search with synonym expansion ───────────────────── */
  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12);

    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/);

    // Expand synonyms
    const expandedTerms = new Set<string>(words);
    words.forEach((word) => {
      Object.entries(SYNONYMS).forEach(([key, syns]) => {
        if (word.includes(key) || key.includes(word)) {
          syns.forEach((s) => expandedTerms.add(s.toLowerCase()));
        }
      });
    });

    const termsArr = Array.from(expandedTerms);

    // Score each item
    const scored = allItems.map((item) => {
      const haystack = `${item.label} ${item.description} ${item.category}`.toLowerCase();
      let score = 0;

      termsArr.forEach((term) => {
        if (haystack.includes(term)) score += 10;
      });

      // Exact label match bonus
      if (item.label.toLowerCase().includes(q)) score += 20;
      // NOS code match
      if (item.nos && item.nos === q) score += 50;
      // Start-of-word match bonus
      words.forEach((w) => {
        if (item.label.toLowerCase().startsWith(w)) score += 15;
      });

      return { item, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
      .map((s) => s.item);
  }, [query, allItems]);

  /* ── Keyboard navigation ───────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [results, selectedIndex, onClose]
  );

  const handleSelect = useCallback(
    (item: SearchItem) => {
      if (item.type === 'case' && item.nos && onSelectCase) {
        onSelectCase(item.nos, item.description);
      } else if (item.type === 'page') {
        const page = item.id.replace('page-', '');
        if (page === 'home') {
          onNavigate?.('home');
        } else {
          window.location.href = `/${page}`;
        }
      } else if (item.type === 'action') {
        if (item.id === 'action-lang') {
          onNavigate?.('lang');
        }
      }
      onClose();
      setQuery('');
    },
    [onSelectCase, onNavigate, onClose]
  );

  /* ── Focus input on open ───────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  /* ── Reset selection when results change ───────────────────── */
  useEffect(() => {
    setSelectedIndex(0);
  }, [results.length]);

  /* ── Scroll selected item into view ────────────────────────── */
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[selectedIndex] as HTMLElement;
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  /* ── Global keyboard shortcuts (Cmd+K, Ctrl+K, and / key) ───── */
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const isTypingInInput =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;

      // Cmd+K / Ctrl+K: toggle command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // This will be handled by parent component, but we can still trap Escape here
      }

      // / key: focus search (only when not in input)
      if (e.key === '/' && !isTypingInInput && isOpen) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // Escape: close palette
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* ── Animation styles ──────────────────────────────────────── */
  const styleSheet = document.createElement('style');
  if (!document.querySelector('style[data-command-palette-animation]')) {
    styleSheet.setAttribute('data-command-palette-animation', '');
    styleSheet.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes backdropFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  /* ── Group results by type ─────────────────────────────────── */
  const grouped: Record<string, SearchItem[]> = {};
  results.forEach((item) => {
    const group = item.type === 'case' ? (lang === 'es' ? 'Tipos de caso' : 'Case Types') : item.type === 'page' ? (lang === 'es' ? 'Páginas' : 'Pages') : (lang === 'es' ? 'Acciones' : 'Actions');
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(item);
  });

  let flatIndex = 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--z-modal)',
          background: 'rgba(0,0,0,0.5)',
          animation: 'backdropFadeIn 0.2s ease-out',
        } as React.CSSProperties}
        aria-hidden="true"
      />

      {/* Palette */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'es' ? 'Paleta de comandos' : 'Command palette'}
        style={{
          position: 'fixed',
          top: 'min(20vh, 160px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 'var(--z-modal)',
          width: 'min(95vw, 560px)',
          maxHeight: '60vh',
          background: '#FFFFFF',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--r-lg)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.2s ease-out',
        } as React.CSSProperties}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 18px',
            borderBottom: '1px solid var(--border-default)',
            background: '#FFFFFF',
          }}
        >
          {/* Search icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#455A64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'es' ? 'Buscar casos, páginas...' : 'Search cases, pages...'}
            aria-label={lang === 'es' ? 'Búsqueda de comandos' : 'Command search'}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 'var(--text-base)',
              color: '#F0F2F5',
              caretColor: '#006997',
              fontFamily: 'var(--font-body)',
            }}
            autoComplete="off"
            spellCheck="false"
          />
          {/* Escape hint */}
          <kbd
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--fg-subtle)',
              background: '#FFFFFF',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--r-xs)',
              padding: '2px 6px',
              lineHeight: 1.4,
              fontFamily: 'inherit',
            }}
          >
            esc
          </kbd>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          style={{
            overflowY: 'auto',
            padding: '6px',
            maxHeight: 'calc(60vh - 56px)',
          }}
          role="listbox"
          aria-label={lang === 'es' ? 'Resultados de búsqueda' : 'Search results'}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: '24px',
                textAlign: 'center',
                color: '#455A64',
                fontSize: 'var(--text-sm)',
              }}
            >
              {lang === 'es'
                ? 'No se encontraron resultados. Intenta con otros términos.'
                : 'No results found. Try different search terms.'}
            </div>
          ) : (
            Object.entries(grouped).map(([groupLabel, items]) => (
              <div key={groupLabel}>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--fg-subtle)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '8px 10px 4px',
                  }}
                >
                  {groupLabel}
                </div>
                {items.map((item) => {
                  const idx = flatIndex++;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '11px 12px',
                        borderRadius: 'var(--r-md)',
                        cursor: 'pointer',
                        background: isSelected ? '#006997' : 'transparent',
                        color: isSelected ? 'white' : '#455A64',
                        transition: 'all 100ms ease-out',
                      }}
                    >
                      {/* Icon or emoji */}
                      <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        {item.icon ? (
                          item.icon
                        ) : item.type === 'case' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isSelected ? 'white' : item.categoryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        ) : item.type === 'page' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isSelected ? 'white' : '#455A64'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        ) : item.type === 'quick-link' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isSelected ? 'white' : '#006997'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isSelected ? 'white' : '#3D8FB5'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        )}
                      </span>

                      {/* Label + description */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 500,
                            color: 'inherit',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: isSelected ? 'rgba(255,255,255,0.7)' : '#455A64',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            {item.description}
                          </div>
                        )}
                      </div>

                      {/* Category badge for case types */}
                      {item.type === 'case' && item.nos && (
                        <span
                          style={{
                            flexShrink: 0,
                            fontSize: 'var(--text-2xs)',
                            fontWeight: 500,
                            color: isSelected ? 'rgba(255,255,255,0.8)' : item.categoryColor,
                            background: isSelected
                              ? 'rgba(255,255,255,0.2)'
                              : `color-mix(in srgb, ${item.categoryColor} 12%, transparent)`,
                            padding: '2px 8px',
                            borderRadius: 'var(--r-full)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.category}
                        </span>
                      )}

                      {/* Enter hint for selected */}
                      {isSelected && (
                        <kbd
                          style={{
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.7)',
                            background: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '3px',
                            padding: '2px 6px',
                            lineHeight: 1.4,
                            fontFamily: 'inherit',
                            flexShrink: 0,
                          }}
                        >
                          ↵
                        </kbd>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            padding: '10px 16px',
            borderTop: '1px solid var(--border-default)',
            fontSize: 'var(--text-2xs)',
            color: '#455A64',
            background: '#FFFFFF',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span>
            <kbd style={{ fontSize: '10px', fontFamily: 'monospace', marginRight: '4px' }}>↑↓</kbd>
            {lang === 'es' ? 'navegar' : 'navigate'}
          </span>
          <span>
            <kbd style={{ fontSize: '10px', fontFamily: 'monospace', marginRight: '4px' }}>↵</kbd>
            {lang === 'es' ? 'seleccionar' : 'select'}
          </span>
          <span>
            <kbd style={{ fontSize: '10px', fontFamily: 'monospace', marginRight: '4px' }}>esc</kbd>
            {lang === 'es' ? 'cerrar' : 'close'}
          </span>
        </div>
      </div>
    </>
  );
}
