'use client';

/**
 * Legal Intelligence Terminal
 *
 * Enterprise split-view interface: results list (left) + case detail (right).
 * Persistent search, filters, keyboard navigation, saved cases.
 *
 * Route: /terminal?q=...&court=...&caseType=...
 */

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// ── Types ──

interface SearchResult {
  id: number;
  caseName: string;
  docketNumber: string;
  caseType: string | null;
  filingDate: string | null;
  status: string | null;
  court: { name: string; abbreviation: string; circuit: string } | null;
  summaryPreview: string | null;
  tags: Array<{ tag: string; category: string }>;
}

interface CaseDetail {
  id: number;
  caseName: string;
  docketNumber: string;
  caseType: string | null;
  natureOfSuit: string | null;
  filingDate: string | null;
  terminationDate: string | null;
  status: string | null;
  proceduralPosture: string | null;
  court: { name: string; abbreviation: string; circuit: string; state: string } | null;
  parties: Array<{ name: string; role: string }>;
  summary: { type: string; text: string; confidenceNotes: string; model: string; generatedAt: string } | null;
  tags: Array<{ tag: string; category: string; confidence: number }>;
  sources: Array<{ sourceName: string; sourceUrl: string; fetchedAt: string }>;
  filings: Array<{ number: number; date: string; title: string }>;
  opinions: Array<{ title: string; author: string; date: string; sourceUrl: string }>;
  relatedCases: Array<{ id: number; caseName: string; caseType: string; filingDate: string; courtAbbreviation: string }>;
}

// ── Saved Cases (simple localStorage) ──

function getSavedCases(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('mcv-saved-cases') || '[]');
  } catch { return []; }
}

function toggleSavedCase(id: number): number[] {
  const saved = getSavedCases();
  const idx = saved.indexOf(id);
  if (idx >= 0) saved.splice(idx, 1);
  else saved.push(id);
  localStorage.setItem('mcv-saved-cases', JSON.stringify(saved));
  return saved;
}

// ── Recent Searches (localStorage) ──

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('mcv-recent-searches') || '[]');
  } catch { return []; }
}

function addRecentSearch(q: string): void {
  if (!q.trim()) return;
  const recent = getRecentSearches().filter(s => s !== q);
  recent.unshift(q);
  localStorage.setItem('mcv-recent-searches', JSON.stringify(recent.slice(0, 8)));
}

// ── Ordinal suffix ──

function ordinal(n: string): string {
  const num = parseInt(n, 10);
  if (isNaN(num)) return '';
  const m = num % 100;
  if (m >= 11 && m <= 13) return 'th';
  switch (num % 10) { case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; }
}

// ── Main ──

function TerminalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search state
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [court, setCourt] = useState(searchParams.get('court') || '');
  const [caseType, setCaseType] = useState(searchParams.get('caseType') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [sort, setSort] = useState('newest');

  // Results
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Selected case (right panel)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [caseLoading, setCaseLoading] = useState(false);

  // Saved
  const [savedCases, setSavedCases] = useState<number[]>([]);

  // Keyboard nav
  const [focusIdx, setFocusIdx] = useState(-1);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Sidebar collapsed
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Compact mode
  const [compact, setCompact] = useState(false);

  // Recent searches
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Collapsed sections in case detail
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const toggleSection = (key: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Load saved cases + recent searches
  useEffect(() => {
    setSavedCases(getSavedCases());
    setRecentSearches(getRecentSearches());
  }, []);

  // ── Search ──
  const performSearch = useCallback(async () => {
    setLoading(true);
    setHasSearched(true);
    const p = new URLSearchParams();
    if (query) p.set('q', query);
    if (court) p.set('court', court);
    if (caseType) p.set('caseType', caseType);
    if (status) p.set('status', status);
    p.set('sort', sort);
    p.set('limit', '50');

    // Track recent search
    if (query.trim()) {
      addRecentSearch(query.trim());
      setRecentSearches(getRecentSearches());
    }

    window.history.replaceState({}, '', `/terminal?${p.toString()}`);

    try {
      const res = await fetch(`/api/cases/search?${p.toString()}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotal(data.total || 0);
      setFocusIdx(-1);
    } catch { setResults([]); setTotal(0); }
    finally { setLoading(false); }
  }, [query, court, caseType, status, sort]);

  // Auto-search on mount
  useEffect(() => {
    if (searchParams.get('q') || searchParams.get('court') || searchParams.get('caseType')) {
      performSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Load case detail ──
  const loadCase = useCallback(async (id: number) => {
    setSelectedId(id);
    setCaseLoading(true);
    try {
      const res = await fetch(`/api/cases/${id}`);
      if (res.ok) setCaseDetail(await res.json());
      else setCaseDetail(null);
    } catch { setCaseDetail(null); }
    finally { setCaseLoading(false); }
  }, []);

  // ── Keyboard ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.key === 'ArrowDown' && results.length > 0) {
        e.preventDefault();
        setFocusIdx(i => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp' && results.length > 0) {
        e.preventDefault();
        setFocusIdx(i => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && focusIdx >= 0 && results[focusIdx]) {
        e.preventDefault();
        loadCase(results[focusIdx].id);
      }
      if (e.key === 'Escape') {
        setSelectedId(null);
        setCaseDetail(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [results, focusIdx, loadCase]);

  // Auto-scroll focused result
  useEffect(() => {
    if (focusIdx >= 0) {
      const el = resultsRef.current?.children[focusIdx] as HTMLElement;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusIdx]);

  const handleSave = (id: number) => {
    const updated = toggleSavedCase(id);
    setSavedCases([...updated]);
  };

  const isSaved = (id: number) => savedCases.includes(id);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#0f1117' }}>
      {/* ── TOP BAR ── */}
      <div className="flex-shrink-0 h-12 flex items-center gap-3 px-3 border-b" style={{ background: '#161822', borderColor: '#252833' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/5 text-gray-400 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <Link href="/" className="text-sm font-bold text-white tracking-tight">
          MCV<span className="text-[var(--link)]">.</span>
        </Link>
        <form onSubmit={(e) => { e.preventDefault(); performSearch(); }} className="flex-1 max-w-2xl flex items-center gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search cases, dockets, parties..."
              className="w-full h-8 pl-8 pr-3 rounded-md text-xs text-white placeholder:text-gray-500 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-colors"
              style={{ background: '#1e2030', borderColor: '#303347' }}
            />
          </div>
          <button type="submit" className="h-8 px-3 rounded-md bg-[var(--link)] text-white text-xs font-medium hover:bg-[var(--color-surface-1)]0 transition-colors">Search</button>
        </form>
        <div className="flex items-center gap-2">
          {/* Compact mode toggle */}
          <button
            onClick={() => setCompact(!compact)}
            className={`h-7 px-2 rounded text-[10px] font-medium border transition-colors hidden md:flex items-center gap-1 ${compact ? 'bg-[var(--link)]/20 text-[var(--link)] border-blue-500/30' : 'text-gray-500 border-gray-700 hover:border-gray-500'}`}
            title={compact ? 'Switch to comfortable view' : 'Switch to compact view'}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              {compact ? (
                <><line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/></>
              ) : (
                <><rect x="2" y="2" width="12" height="4" rx="1"/><rect x="2" y="10" width="12" height="4" rx="1"/></>
              )}
            </svg>
            {compact ? 'Compact' : 'Comfortable'}
          </button>
          <span className="text-[10px] text-gray-500 hidden lg:block">
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">↑↓</kbd>
            <kbd className="ml-1 px-1 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">↵</kbd>
            <kbd className="ml-1 px-1 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">esc</kbd>
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT SIDEBAR ── */}
        {sidebarOpen && (
          <div className="w-48 flex-shrink-0 border-r overflow-y-auto" style={{ background: '#161822', borderColor: '#252833' }}>
            <div className="p-3 space-y-4">
              {/* Filters */}
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Filters</p>
                <div className="space-y-2">
                  <input type="text" value={court} onChange={e => setCourt(e.target.value)} placeholder="Court (e.g. SDNY)"
                    className="w-full h-7 px-2 rounded text-xs border outline-none focus:border-blue-500 text-gray-300 placeholder:text-gray-400"
                    style={{ background: '#1e2030', borderColor: '#303347' }} />
                  <input type="text" value={caseType} onChange={e => setCaseType(e.target.value)} placeholder="Case type"
                    className="w-full h-7 px-2 rounded text-xs border outline-none focus:border-blue-500 text-gray-300 placeholder:text-gray-400"
                    style={{ background: '#1e2030', borderColor: '#303347' }} />
                  <select value={status} onChange={e => setStatus(e.target.value)}
                    className="w-full h-7 px-2 rounded text-xs border outline-none text-gray-300"
                    style={{ background: '#1e2030', borderColor: '#303347' }}>
                    <option value="">All statuses</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                  <select value={sort} onChange={e => setSort(e.target.value)}
                    className="w-full h-7 px-2 rounded text-xs border outline-none text-gray-300"
                    style={{ background: '#1e2030', borderColor: '#303347' }}>
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                  <button onClick={performSearch} className="w-full h-7 rounded text-xs font-medium bg-[var(--link)]/20 text-[var(--link)] hover:bg-[var(--link)]/30 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Saved */}
              {savedCases.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Saved ({savedCases.length})</p>
                  <div className="space-y-1">
                    {savedCases.slice(0, 5).map(id => (
                      <button key={id} onClick={() => loadCase(id)}
                        className={`w-full text-left px-2 py-1 rounded text-[11px] truncate transition-colors ${selectedId === id ? 'bg-[var(--link)]/20 text-[var(--link)]' : 'text-gray-400 hover:bg-white/5'}`}>
                        Case #{id}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Recent</p>
                  <div className="space-y-0.5">
                    {recentSearches.slice(0, 5).map((q, i) => (
                      <button key={i} onClick={() => { setQuery(q); performSearch(); }}
                        className="w-full text-left px-2 py-1 rounded text-[11px] text-gray-400 hover:bg-white/5 truncate transition-colors">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Nav */}
              <div>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Navigate</p>
                <div className="space-y-0.5">
                  {[
                    { label: 'Case Types', href: '/cases' },
                    { label: 'Judges', href: '/judges' },
                    { label: 'Districts', href: '/districts' },
                    { label: 'Data Sources', href: '/data-sources' },
                    { label: 'Pricing', href: '/pricing' },
                  ].map(n => (
                    <Link key={n.href} href={n.href} className="block px-2 py-1 rounded text-xs text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors">
                      {n.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS LIST ── */}
        <div className={`flex-shrink-0 border-r overflow-y-auto ${selectedId ? 'w-80 lg:w-96' : 'flex-1 max-w-3xl'}`} style={{ borderColor: '#252833', background: '#12141d' }}>
          {/* Results header */}
          <div className="sticky top-0 z-10 px-3 py-2 border-b flex items-center justify-between" style={{ background: '#161822', borderColor: '#252833' }}>
            <span className="text-[11px] text-gray-400">
              {loading ? 'Searching...' : hasSearched ? `${total} result${total !== 1 ? 's' : ''}` : 'Enter a query'}
            </span>
            {(court || caseType || status) && (
              <button onClick={() => { setCourt(''); setCaseType(''); setStatus(''); }} className="text-[10px] text-[var(--link)] hover:underline">Clear filters</button>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="p-3 space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-16 rounded animate-pulse" style={{ background: '#1e2030' }} />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && hasSearched && results.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-3">No cases found.</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {['Patent infringement', 'SEC v. Terraform', 'Employment discrimination'].map(q => (
                  <button key={q} onClick={() => { setQuery(q); performSearch(); }}
                    className="text-[10px] px-2 py-1 rounded border text-gray-500 hover:text-[var(--link)] hover:border-blue-500/30 transition-colors"
                    style={{ borderColor: '#303347' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pre-search */}
          {!loading && !hasSearched && (
            <div className="p-6 text-center">
              <p className="text-xs text-gray-500 mb-4">Search federal court records by case name, docket number, or legal topic.</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {['SEC v. Terraform', 'Patent infringement', 'Civil rights', 'Employment discrimination', 'Class action'].map(q => (
                  <button key={q} onClick={() => { setQuery(q); setTimeout(performSearch, 50); }}
                    className="text-[10px] px-2 py-1 rounded border text-gray-500 hover:text-[var(--link)] hover:border-blue-500/30 transition-colors"
                    style={{ borderColor: '#303347' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          <div ref={resultsRef}>
            {results.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => loadCase(r.id)}
                className={`w-full text-left px-3 ${compact ? 'py-1.5' : 'py-2.5'} border-b transition-colors ${
                  selectedId === r.id
                    ? 'bg-[var(--link)]/10 border-l-2 border-l-blue-500'
                    : focusIdx === idx
                    ? 'bg-white/[0.03]'
                    : 'hover:bg-white/[0.02]'
                }`}
                style={{ borderBottomColor: '#1e2030', borderLeftColor: selectedId === r.id ? undefined : 'transparent' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`${compact ? 'text-[11px]' : 'text-xs'} font-medium text-gray-200 leading-snug line-clamp-1`}>{r.caseName}</span>
                  {r.status && (
                    <span className={`flex-shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded ${r.status === 'open' ? 'bg-[var(--color-surface-1)]0/10 text-[var(--link)]' : 'bg-[var(--color-surface-1)]0/10 text-[var(--data-positive)]'}`}>
                      {r.status.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className={`flex items-center gap-2 ${compact ? 'mt-0.5' : 'mt-1'} text-[10px] text-gray-500`}>
                  {r.court && <span>{r.court.abbreviation}</span>}
                  {r.docketNumber && <span>{r.docketNumber}</span>}
                  {r.filingDate && <span>{new Date(r.filingDate).getFullYear()}</span>}
                </div>
                {!compact && r.tags.length > 0 && (
                  <div className="flex gap-1 mt-1.5">
                    {r.tags.slice(0, 3).map(t => (
                      <span key={t.tag} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#1e2030', color: '#8b8fa3' }}>
                        {t.tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── CASE DETAIL PANEL ── */}
        {selectedId && (
          <div className="flex-1 overflow-y-auto" style={{ background: '#12141d' }}>
            {caseLoading && (
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 rounded animate-pulse" style={{ background: '#1e2030' }} />
                <div className="h-4 w-1/2 rounded animate-pulse" style={{ background: '#1e2030' }} />
                <div className="h-32 rounded animate-pulse" style={{ background: '#1e2030' }} />
              </div>
            )}

            {!caseLoading && caseDetail && (
              <div className="p-4 lg:p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-base font-bold text-white leading-snug mb-1">{caseDetail.caseName}</h1>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400">
                      {caseDetail.court && <span className="text-gray-300">{caseDetail.court.name}</span>}
                      {caseDetail.docketNumber && <span>No. {caseDetail.docketNumber}</span>}
                      {caseDetail.filingDate && <span>Filed {new Date(caseDetail.filingDate).toLocaleDateString()}</span>}
                      {caseDetail.terminationDate && <span>Terminated {new Date(caseDetail.terminationDate).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleSave(caseDetail.id)}
                      className={`h-7 px-2.5 rounded text-[10px] font-medium border transition-colors ${isSaved(caseDetail.id) ? 'bg-[var(--link)]/20 text-[var(--link)] border-blue-500/30' : 'text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                      {isSaved(caseDetail.id) ? 'Saved' : 'Save'}
                    </button>
                    {caseDetail.status && (
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded ${caseDetail.status === 'open' ? 'bg-[var(--color-surface-1)]0/10 text-[var(--link)]' : 'bg-[var(--color-surface-1)]0/10 text-[var(--data-positive)]'}`}>
                        {caseDetail.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4">
                  {/* Main column */}
                  <div className="flex-1 min-w-0 space-y-4">
                    {/* Summary */}
                    {caseDetail.summary && (
                      <Panel title="Case Overview">
                        <p className="text-xs text-gray-300 leading-relaxed">{caseDetail.summary.text}</p>
                        {caseDetail.summary.confidenceNotes && caseDetail.summary.confidenceNotes !== 'No confidence notes.' && (
                          <p className="text-[10px] text-gray-500 mt-2 italic">Note: {caseDetail.summary.confidenceNotes}</p>
                        )}
                      </Panel>
                    )}

                    {/* Parties */}
                    {caseDetail.parties.length > 0 && (
                      <Panel title="Parties" collapsible collapsed={collapsedSections.has('parties')} onToggle={() => toggleSection('parties')}>
                        <div className="grid grid-cols-2 gap-4">
                          {['plaintiff', 'defendant'].map(role => {
                            const ps = caseDetail.parties.filter(p => p.role === role);
                            return ps.length > 0 ? (
                              <div key={role}>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{role}s</p>
                                {ps.map((p, i) => <p key={i} className="text-xs text-gray-300">{p.name}</p>)}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </Panel>
                    )}

                    {/* Filings timeline */}
                    {caseDetail.filings.length > 0 && (
                      <Panel title="Docket Activity" collapsible collapsed={collapsedSections.has('filings')} onToggle={() => toggleSection('filings')}>
                        <div className="space-y-0">
                          {caseDetail.filings.slice(0, 15).map((f, i) => (
                            <div key={i} className="flex items-start gap-3 py-1.5 border-b last:border-0" style={{ borderColor: '#252833' }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-surface-1)]0/50 mt-1.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-gray-300 truncate">{f.title || `Filing #${f.number || i + 1}`}</p>
                                {f.date && <p className="text-[10px] text-gray-500">{new Date(f.date).toLocaleDateString()}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Panel>
                    )}

                    {/* Related cases */}
                    {caseDetail.relatedCases.length > 0 && (
                      <Panel title="Related Cases" collapsible collapsed={collapsedSections.has('related')} onToggle={() => toggleSection('related')}>
                        <div className="space-y-1">
                          {caseDetail.relatedCases.map(rc => (
                            <button key={rc.id} onClick={() => loadCase(rc.id)}
                              className="w-full text-left px-2 py-1.5 rounded text-xs text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors">
                              <span className="text-gray-300">{rc.caseName}</span>
                              <span className="text-[10px] text-gray-500 ml-2">{rc.courtAbbreviation} {rc.filingDate && new Date(rc.filingDate).getFullYear()}</span>
                            </button>
                          ))}
                        </div>
                      </Panel>
                    )}

                    {/* Sources */}
                    <Panel title="Data Sources" collapsible collapsed={collapsedSections.has('sources')} onToggle={() => toggleSection('sources')}>
                      {caseDetail.sources.length > 0 ? caseDetail.sources.map((s, i) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span className="text-gray-400 capitalize">{s.sourceName}</span>
                          <span className="text-gray-500">{s.fetchedAt && new Date(s.fetchedAt).toLocaleDateString()}</span>
                        </div>
                      )) : (
                        <p className="text-[11px] text-gray-500">Public federal court records.</p>
                      )}
                    </Panel>
                  </div>

                  {/* Right metadata column */}
                  <div className="w-full xl:w-56 flex-shrink-0 space-y-4">
                    {/* Metadata */}
                    <Panel title="Details">
                      <div className="space-y-2">
                        {caseDetail.caseType && <MetaRow label="Case Type" value={caseDetail.caseType} />}
                        {caseDetail.natureOfSuit && <MetaRow label="NOS Code" value={caseDetail.natureOfSuit} />}
                        {caseDetail.court?.circuit && <MetaRow label="Circuit" value={`${caseDetail.court.circuit}${ordinal(caseDetail.court.circuit)} Circuit`} />}
                        {caseDetail.proceduralPosture && <MetaRow label="Stage" value={caseDetail.proceduralPosture} />}
                      </div>
                    </Panel>

                    {/* Tags */}
                    {caseDetail.tags.length > 0 && (
                      <Panel title="Tags">
                        <div className="flex flex-wrap gap-1">
                          {caseDetail.tags.map(t => (
                            <span key={`${t.category}-${t.tag}`} className="text-[10px] px-2 py-0.5 rounded" style={{ background: '#1e2030', color: '#8b8fa3' }}>
                              {t.tag}
                            </span>
                          ))}
                        </div>
                      </Panel>
                    )}

                    {/* Open full page */}
                    <Link href={`/case/${caseDetail.id}`}
                      className="block text-center text-[10px] text-[var(--link)] hover:underline py-2">
                      Open full page &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {!caseLoading && !caseDetail && selectedId && (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-500">Case not found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Reusable ──

function Panel({ title, children, collapsible, collapsed, onToggle }: { title: string; children: React.ReactNode; collapsible?: boolean; collapsed?: boolean; onToggle?: () => void }) {
  return (
    <div className="rounded border" style={{ background: '#1a1c28', borderColor: '#252833' }}>
      <button
        onClick={collapsible ? onToggle : undefined}
        className={`w-full flex items-center justify-between px-3 py-2 ${collapsible ? 'cursor-pointer hover:bg-white/[0.02]' : 'cursor-default'} transition-colors rounded-t-lg`}
      >
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{title}</p>
        {collapsible && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-gray-600 transition-transform ${collapsed ? '-rotate-90' : ''}`}>
            <path d="M2 3.5L5 6.5L8 3.5" />
          </svg>
        )}
      </button>
      {!collapsed && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[11px]">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-300">{value}</span>
    </div>
  );
}

// ── Export ──

export default function TerminalPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center" style={{ background: '#0f1117' }}><p className="text-gray-500 text-sm">Loading terminal...</p></div>}>
      <TerminalContent />
    </Suspense>
  );
}
