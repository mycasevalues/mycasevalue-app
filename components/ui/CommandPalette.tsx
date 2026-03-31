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
  type: 'case' | 'page' | 'action';
  action?: () => void;
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

    // Case types from SITS
    sits.forEach((cat: any) => {
      cat.opts?.forEach((opt: any) => {
        items.push({
          id: `case-${opt.nos}-${opt.d}`,
          label: opt.label,
          description: opt.d,
          category: cat.label,
          categoryColor: cat.color || 'var(--fg-muted)',
          nos: opt.nos,
          type: 'case',
        });
      });
    });

    // Static pages
    const pages = [
      { id: 'page-home', label: lang === 'es' ? 'Inicio' : 'Home', description: lang === 'es' ? 'Volver al inicio' : 'Go to homepage', category: lang === 'es' ? 'Páginas' : 'Pages' },
      { id: 'page-faq', label: 'FAQ', description: lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions', category: lang === 'es' ? 'Páginas' : 'Pages' },
      { id: 'page-methodology', label: lang === 'es' ? 'Metodología' : 'Methodology', description: lang === 'es' ? 'Cómo funciona nuestro sistema' : 'How our data system works', category: lang === 'es' ? 'Páginas' : 'Pages' },
      { id: 'page-privacy', label: lang === 'es' ? 'Privacidad' : 'Privacy', description: lang === 'es' ? 'Política de privacidad' : 'Privacy policy', category: lang === 'es' ? 'Páginas' : 'Pages' },
      { id: 'page-terms', label: lang === 'es' ? 'Términos' : 'Terms', description: lang === 'es' ? 'Términos de servicio' : 'Terms of service', category: lang === 'es' ? 'Páginas' : 'Pages' },
    ];

    pages.forEach((p) => {
      items.push({ ...p, categoryColor: 'var(--fg-subtle)', type: 'page' as const });
    });

    // Quick actions
    const actions = [
      { id: 'action-theme', label: lang === 'es' ? 'Cambiar tema' : 'Toggle theme', description: lang === 'es' ? 'Modo claro / oscuro' : 'Switch light / dark mode', category: lang === 'es' ? 'Acciones' : 'Actions' },
      { id: 'action-lang', label: lang === 'es' ? 'English' : 'Español', description: lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish', category: lang === 'es' ? 'Acciones' : 'Actions' },
    ];

    actions.forEach((a) => {
      items.push({ ...a, categoryColor: 'var(--accent-secondary)', type: 'action' as const });
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
        if (item.id === 'action-theme') {
          const html = document.documentElement;
          const current = html.getAttribute('data-theme');
          html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
        } else if (item.id === 'action-lang') {
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

  /* ── Trap focus inside modal ───────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
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
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--r-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        } as React.CSSProperties}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-default)',
          }}
        >
          {/* Search icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'es' ? 'Buscar tipo de caso, página o acción...' : 'Search case type, page, or action...'}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 'var(--text-base)',
              color: 'var(--fg-primary)',
              caretColor: 'var(--accent-primary)',
            }}
            autoComplete="off"
            spellCheck="false"
          />
          {/* Escape hint */}
          <kbd
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--fg-subtle)',
              background: 'var(--bg-surface)',
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
                color: 'var(--fg-muted)',
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
                        padding: '10px 12px',
                        borderRadius: 'var(--r-md)',
                        cursor: 'pointer',
                        background: isSelected ? 'var(--accent-primary-subtle)' : 'transparent',
                        transition: 'background 100ms',
                      }}
                    >
                      {/* Type icon */}
                      <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {item.type === 'case' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={item.categoryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        ) : item.type === 'page' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                            color: 'var(--fg-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--fg-muted)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.description}
                          </div>
                        )}
                      </div>

                      {/* Category badge for case types */}
                      {item.type === 'case' && (
                        <span
                          style={{
                            flexShrink: 0,
                            fontSize: 'var(--text-2xs)',
                            fontWeight: 500,
                            color: item.categoryColor,
                            background: `color-mix(in srgb, ${item.categoryColor} 12%, transparent)`,
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
                            fontSize: '10px',
                            color: 'var(--fg-subtle)',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-default)',
                            borderRadius: '3px',
                            padding: '1px 5px',
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
            gap: '16px',
            padding: '8px 16px',
            borderTop: '1px solid var(--border-default)',
            fontSize: 'var(--text-2xs)',
            color: 'var(--fg-subtle)',
          }}
        >
          <span>↑↓ {lang === 'es' ? 'navegar' : 'navigate'}</span>
          <span>↵ {lang === 'es' ? 'seleccionar' : 'select'}</span>
          <span>esc {lang === 'es' ? 'cerrar' : 'close'}</span>
        </div>
      </div>
    </>
  );
}
