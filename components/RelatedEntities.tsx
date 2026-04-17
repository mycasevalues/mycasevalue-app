'use client';

/**
 * RelatedEntities — Contextual cross-link sidebar panel.
 * Shows related judges, districts, case types, and documents
 * based on the current page context. This is what makes a research
 * platform feel integrated — no dead ends, everything connects.
 *
 * Usage:
 *   <RelatedEntities
 *     context={{ type: 'case', categoryId: 'employment-workplace', nosCode: '442' }}
 *   />
 */

import Link from 'next/link';
import { SITS } from '@/lib/data';
import { REAL_DATA } from '@/lib/realdata';

interface RelatedEntitiesProps {
  context: {
    type: 'case' | 'judge' | 'district';
    categoryId?: string;
    nosCode?: string;
    district?: string;
    judgeId?: string;
  };
}

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-[#E0E0E0]">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</span>
      {count != null && <span className="text-[10px] text-gray-400 bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 rounded">{count}</span>}
    </div>
  );
}

function RelatedItem({ href, label, sublabel, stat, statColor }: {
  href: string;
  label: string;
  sublabel?: string;
  stat?: string;
  statColor?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-4 py-2 hover:bg-blue-50/50 transition-colors group"
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm text-gray-200 font-medium truncate group-hover:text-brand-blue transition-colors">{label}</div>
        {sublabel && <div className="text-[11px] text-gray-400 truncate">{sublabel}</div>}
      </div>
      {stat && (
        <span className="text-xs font-mono font-semibold flex-shrink-0 ml-2" style={{ color: statColor || 'var(--color-text-primary)' }}>
          {stat}
        </span>
      )}
    </Link>
  );
}

export default function RelatedEntities({ context }: RelatedEntitiesProps) {
  // Get related case types based on the current context
  const relatedCaseTypes = getRelatedCaseTypes(context);
  const relatedDistricts = getRelatedDistricts(context);

  if (relatedCaseTypes.length === 0 && relatedDistricts.length === 0) return null;

  return (
    <div className="border-l border-[#E0E0E0] bg-[var(--surf,#F6F5F2)]" style={{ width: '260px', minWidth: '260px', flexShrink: 0 }}>
      <div className="sticky top-[80px] h-[calc(100vh-120px)] overflow-y-auto">
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#E0E0E0]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Related</h3>
        </div>

        {/* Related Case Types */}
        {relatedCaseTypes.length > 0 && (
          <div>
            <SectionHeader title="Case Types" count={relatedCaseTypes.length} />
            {relatedCaseTypes.slice(0, 8).map((ct) => (
              <RelatedItem
                key={ct.nos}
                href={`/cases/${ct.categoryId}`}
                label={ct.label}
                sublabel={`NOS ${ct.nos}`}
                stat={ct.winRate != null ? `${ct.winRate}%` : undefined}
                statColor={ct.winRate && ct.winRate >= 50 ? '#057642' : ct.winRate && ct.winRate >= 35 ? '#B45309' : '#B91C1C'}
              />
            ))}
          </div>
        )}

        {/* Related Districts */}
        {relatedDistricts.length > 0 && (
          <div>
            <SectionHeader title="Top Districts" count={relatedDistricts.length} />
            {relatedDistricts.slice(0, 6).map((d) => (
              <RelatedItem
                key={d.code}
                href={`/districts/${d.code.toLowerCase()}`}
                label={d.name}
                sublabel={d.circuit}
              />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-2">
          <SectionHeader title="Quick Actions" />
          <div className="px-4 py-2 space-y-1">
            <Link href="/compare" className="flex items-center gap-2 text-xs text-gray-500 hover:text-brand-blue py-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M3 9h6M15 9h6M3 15h6M15 15h6"/></svg>
              Compare case types
            </Link>
            <Link href="/calculator" className="flex items-center gap-2 text-xs text-gray-500 hover:text-brand-blue py-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              Estimate settlement
            </Link>
            <Link href="/attorney/case-predictor" className="flex items-center gap-2 text-xs text-gray-500 hover:text-brand-blue py-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707"/></svg>
              Predict outcome
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Data helpers ──

function getRelatedCaseTypes(context: RelatedEntitiesProps['context']) {
  const results: Array<{ nos: string; label: string; categoryId: string; winRate: number | null }> = [];

  if (context.type === 'case' && context.categoryId) {
    // Show other case types in the same category
    const category = SITS.find(c => c.id === context.categoryId);
    if (category) {
      for (const opt of category.opts.slice(0, 10)) {
        const rd = REAL_DATA[opt.nos];
        results.push({
          nos: opt.nos,
          label: opt.label,
          categoryId: category.id,
          winRate: rd?.wr ?? null,
        });
      }
    }
  } else {
    // Show top case types across all categories
    for (const cat of SITS.slice(0, 5)) {
      for (const opt of cat.opts.slice(0, 2)) {
        const rd = REAL_DATA[opt.nos];
        results.push({
          nos: opt.nos,
          label: opt.label,
          categoryId: cat.id,
          winRate: rd?.wr ?? null,
        });
      }
    }
  }

  return results;
}

function getRelatedDistricts(context: RelatedEntitiesProps['context']) {
  // Show popular districts
  return [
    { code: 'SDNY', name: 'Southern District of New York', circuit: '2nd Circuit' },
    { code: 'CDCA', name: 'Central District of California', circuit: '9th Circuit' },
    { code: 'NDIL', name: 'Northern District of Illinois', circuit: '7th Circuit' },
    { code: 'SDFL', name: 'Southern District of Florida', circuit: '11th Circuit' },
    { code: 'EDPA', name: 'Eastern District of Pennsylvania', circuit: '3rd Circuit' },
    { code: 'NDTX', name: 'Northern District of Texas', circuit: '5th Circuit' },
  ];
}
