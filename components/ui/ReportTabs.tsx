'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface TabConfig {
  id: string;
  label: string;
  labelEs: string;
  icon: string;
}

export const REPORT_TABS: TabConfig[] = [
  { id: 'overview',   label: 'Overview',        labelEs: 'Resumen',           icon: '📊' },
  { id: 'win-rates',  label: 'Win Rates',       labelEs: 'Tasas de Éxito',    icon: '⚖️' },
  { id: 'timeline',   label: 'Timeline',        labelEs: 'Cronología',        icon: '⏱' },
  { id: 'settlements',label: 'Settlements',     labelEs: 'Acuerdos',          icon: '💰' },
  { id: 'attorney',   label: 'Attorney Impact', labelEs: 'Impacto del Abogado',icon: '👤' },
  { id: 'similar',    label: 'Similar Cases',   labelEs: 'Casos Similares',   icon: '🔗' },
];

interface ReportTabsProps {
  lang?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function ReportTabs({ lang = 'en', activeTab, onTabChange }: ReportTabsProps) {
  const [active, setActive] = useState(activeTab || 'overview');
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Sync with URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && REPORT_TABS.some(t => t.id === hash)) {
      setActive(hash);
    }
  }, []);

  // Update when activeTab prop changes
  useEffect(() => {
    if (activeTab) setActive(activeTab);
  }, [activeTab]);

  const handleTabClick = useCallback((tabId: string) => {
    setActive(tabId);
    window.history.replaceState(null, '', `#${tabId}`);
    onTabChange?.(tabId);

    // Scroll the active tab into view in the tab bar
    const tabEl = tabRefs.current.get(tabId);
    if (tabEl && tabsRef.current) {
      tabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [onTabChange]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % REPORT_TABS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + REPORT_TABS.length) % REPORT_TABS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = REPORT_TABS.length - 1;
    } else {
      return;
    }
    const nextTab = REPORT_TABS[nextIndex];
    handleTabClick(nextTab.id);
    tabRefs.current.get(nextTab.id)?.focus();
  }, [handleTabClick]);

  return (
    <div
      className="report-tab-bar"
      style={{
        position: 'sticky',
        top: 60,
        zIndex: 'var(--z-sticky, 60)' as any,
        background: 'var(--bg-base)',
        borderBottom: '1px solid var(--border-default)',
        marginBottom: 'var(--space-6)',
      }}
    >
      <div
        ref={tabsRef}
        role="tablist"
        aria-label={lang === 'es' ? 'Secciones del informe' : 'Report sections'}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          maxWidth: 800,
          margin: '0 auto',
          gap: 0,
        }}
      >
        {REPORT_TABS.map((tab, i) => {
          const isActive = active === tab.id;
          const label = lang === 'es' ? tab.labelEs : tab.label;
          return (
            <button
              key={tab.id}
              ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 16px',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--accent-primary)' : 'var(--fg-muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
              }}
            >
              <span aria-hidden="true" style={{ fontSize: 14 }}>{tab.icon}</span>
              {label}
            </button>
          );
        })}
      </div>
      {/* Hide scrollbar */}
      <style>{`.report-tab-bar div[role="tablist"]::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

/** Tab panel wrapper — renders content for one tab */
export function TabPanel({
  tabId,
  activeTab,
  children,
}: {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
}) {
  const isActive = tabId === activeTab;
  return (
    <div
      role="tabpanel"
      id={`panel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      hidden={!isActive}
      style={{
        opacity: isActive ? 1 : 0,
        transition: 'opacity var(--duration-fast, 180ms) var(--ease-out)',
      }}
    >
      {isActive ? children : null}
    </div>
  );
}
