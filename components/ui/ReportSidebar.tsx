'use client';

import { REPORT_TABS } from './ReportTabs';

interface ReportSidebarProps {
  lang?: string;
  caseType: string;
  category: string;
  winRate: number;
  medianDays: number;
  settlementRate: number;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

export default function ReportSidebar({
  lang = 'en',
  caseType,
  category,
  winRate,
  medianDays,
  settlementRate,
  activeTab,
  onTabChange,
  isPremium = false,
  onUpgrade,
}: ReportSidebarProps) {
  const stats = [
    {
      label: lang === 'es' ? 'Tasa de éxito' : 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      color: winRate > 36 ? 'var(--outcome-win)' : 'var(--outcome-settle)',
    },
    {
      label: lang === 'es' ? 'Duración mediana' : 'Median Duration',
      value: `${Math.round(medianDays / 30)}mo`,
      color: '#111111',
    },
    {
      label: lang === 'es' ? 'Tasa de acuerdo' : 'Settlement Rate',
      value: `${settlementRate.toFixed(1)}%`,
      color: 'var(--outcome-settle)',
    },
  ];

  return (
    <aside
      className="report-sidebar"
      style={{
        width: 260,
        position: 'sticky',
        top: 'calc(60px + 52px)',
        height: 'fit-content',
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
        background: '#FFFFFF',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        padding: 'var(--space-5)',
        flexShrink: 0,
      }}
    >
      {/* Case type name */}
      <h3 style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'var(--text-base)',
        fontWeight: 600,
        color: '#111111',
        margin: 0,
        textTransform: 'capitalize',
      }}>
        {caseType}
      </h3>

      {/* Category badge */}
      <span style={{
        display: 'inline-block',
        marginTop: 'var(--space-2)',
        padding: '2px 10px',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        color: '#6B7280',
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-full)',
      }}>
        {category}
      </span>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-subtle)', margin: 'var(--space-4) 0' }} />

      {/* Quick stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{
              fontSize: 'var(--text-xs)',
              color: '#6B7280',
              fontWeight: 500,
              letterSpacing: '0.01em',
              marginBottom: 2,
            }}>
              {s.label}
            </div>
            <div style={{
              fontFamily: "'PT Mono', monospace",
              fontSize: 20,
              fontWeight: 600,
              color: s.color,
              letterSpacing: '-0.01em',
            }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-subtle)', margin: 'var(--space-4) 0' }} />

      {/* Jump to section links */}
      <nav aria-label={lang === 'es' ? 'Secciones' : 'Sections'}>
        {REPORT_TABS.map(tab => {
          const isActive = tab.id === activeTab;
          const label = lang === 'es' ? tab.labelEs : tab.label;
          return (
            <button type="button"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#8B5CF6' : '#6B7280',
                background: 'transparent',
                border: 'none',
                borderLeft: isActive ? '2px solid #8B5CF6' : '2px solid transparent',
                cursor: 'pointer',
                borderRadius: 0,
                transition: 'all var(--duration-fast) var(--ease-out)',
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* Upgrade CTA (if free tier) */}
      {!isPremium && (
        <>
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: 'var(--space-4) 0' }} />
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--accent-primary-subtle)',
            borderRadius: '8px',
          }}>
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: '#111111',
              marginBottom: 'var(--space-2)',
            }}>
              {lang === 'es' ? 'Desbloquea datos completos' : 'Unlock full data'}
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 var(--space-3) 0',
              fontSize: 'var(--text-xs)',
              color: '#6B7280',
            }}>
              <li style={{ marginBottom: 4 }}> {lang === 'es' ? 'Análisis de jueces' : 'Judge analytics'}</li>
              <li> {lang === 'es' ? 'Informe PDF descargable' : 'Downloadable PDF report'}</li>
            </ul>
            <button type="button"
              onClick={onUpgrade}
              style={{
                width: '100%',
                padding: '8px 0',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: '#fff',
                background: '#8B5CF6',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {lang === 'es' ? 'Informe Premium $5.99' : 'Premium Report $5.99'}
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
