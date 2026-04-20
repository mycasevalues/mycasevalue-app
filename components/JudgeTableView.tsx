'use client';

/**
 * JudgeTableView — Compact, high-density table view for the judge directory.
 * Shows 20+ judges per screen instead of 6-8 cards.
 * Can be toggled alongside the existing card view.
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { JudgeWithStats } from '@/lib/supabase-judges';
import { getWinRateColor } from '@/lib/color-scale';
import { getPartyColor, getPartyLabel } from '@/lib/supabase-judges';
import SaveButton from './ui/SaveButton';
import HoverPreview, { JudgePreviewCard } from './ui/HoverPreview';
import ExportDropdown from './ui/ExportDropdown';

interface JudgeTableViewProps {
  judges: JudgeWithStats[];
  onSort?: (column: string) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

function SortIcon({ active, order }: { active: boolean; order: string }) {
  if (!active) return <span className="text-[var(--color-text-muted)] ml-1">↕</span>;
  return <span className="text-brand-blue ml-1">{order === 'asc' ? '↑' : '↓'}</span>;
}

export default function JudgeTableView({ judges, onSort, sortBy = 'name', sortOrder = 'asc' }: JudgeTableViewProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const tableRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!tableRef.current?.contains(document.activeElement) && selectedIdx === -1) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx(prev => Math.min(prev + 1, judges.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIdx >= 0 && judges[selectedIdx]) {
        window.location.href = `/judges/${judges[selectedIdx].id}`;
      } else if (e.key === 'Escape') {
        setSelectedIdx(-1);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [selectedIdx, judges]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ExportDropdown />
      </div>
      <div ref={tableRef} className="overflow-x-auto" tabIndex={0} role="grid" aria-label="Judge directory table">
        <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0, fontSize: 14 }}>
        <thead>
          <tr className="bg-[var(--color-surface-2)] border-b border-[var(--bdr, #E2DFD8)]">
            <th className="text-left px-3 py-2.5 text-[var(--text2)] uppercase tracking-wide cursor-pointer hover:text-[var(--color-text-muted)] whitespace-nowrap"
 style={{ fontSize: 12, fontWeight: 600 }}
                onClick={() => onSort?.('name')}>
              Judge <SortIcon active={sortBy === 'name'} order={sortOrder} />
            </th>
            <th className="text-left px-3 py-2.5 text-[var(--text2)] uppercase tracking-wide whitespace-nowrap" style={{ fontSize: 12, fontWeight: 600 }}>
              District
            </th>
            <th className="text-left px-3 py-2.5 text-[var(--text2)] uppercase tracking-wide whitespace-nowrap" style={{ fontSize: 12, fontWeight: 600 }}>
              Circuit
            </th>
            <th className="text-right px-3 py-2.5 text-[var(--text2)] uppercase tracking-wide cursor-pointer hover:text-[var(--color-text-muted)] whitespace-nowrap"
 style={{ fontSize: 12, fontWeight: 600 }}
                onClick={() => onSort?.('cases')}>
              Cases <SortIcon active={sortBy === 'cases'} order={sortOrder} />
            </th>
            <th className="text-right px-3 py-2.5 text-[var(--text2)] uppercase tracking-wide cursor-pointer hover:text-[var(--color-text-muted)] whitespace-nowrap"
 style={{ fontSize: 12, fontWeight: 600 }}
                onClick={() => onSort?.('winRate')}>
              Win % <SortIcon active={sortBy === 'winRate'} order={sortOrder} />
            </th>
            <th className="text-left px-3 py-2.5 text-[var(--text2)] uppercase tracking-wide whitespace-nowrap" style={{ fontSize: 12, fontWeight: 600 }}>
              Appointed
            </th>
            <th className="text-left px-3 py-2.5 text-[var(--text2)] uppercase tracking-wide whitespace-nowrap" style={{ fontSize: 12, fontWeight: 600 }}>
              Party
            </th>
            <th className="w-10 px-2 py-2.5" aria-label="Save"></th>
          </tr>
        </thead>
        <tbody>
          {judges.map((judge, idx) => {
            const winRate = judge.overall_plaintiff_win_rate;
            const wrColorObj = winRate != null ? getWinRateColor(winRate) : null;
            const wrColor = wrColorObj?.text;
            const party = judge.party_of_appointing_president;
            const partyColor = party ? getPartyColor(party) : undefined;

            return (
              <tr
                key={judge.id}
                className={`border-b border-[var(--bdr, #E2DFD8)] hover:bg-white/5 transition-colors cursor-pointer ${
                  selectedIdx === idx ? 'bg-[var(--surf)] ring-1 ring-inset ring-brand-blue/30' : idx % 2 === 0 ? '' : 'bg-[var(--surf)]'
                }`}
                onClick={() => setSelectedIdx(idx)}
              >
                <td className="px-3 py-2">
                  <HoverPreview
                    preview={
                      <JudgePreviewCard
                        name={judge.full_name}
                        district={judge.district_id || undefined}
                        circuit={judge.circuit ? `${judge.circuit} Circuit` : undefined}
                        winRate={winRate ?? undefined}
                        totalCases={judge.total_cases_handled}
                        party={judge.party_of_appointing_president || undefined}
                      />
                    }
                  >
                    <Link
 href={`/judges/${judge.id}`}
 className="text-[var(--color-text-muted)] hover:text-brand-blue transition-colors" style={{ fontSize: 14, fontWeight: 600 }}
 >
                      {judge.full_name}
                    </Link>
                  </HoverPreview>
                </td>
                <td className="px-3 py-2 text-[var(--text2)] whitespace-nowrap" style={{ fontSize: 12 }}>
                  {judge.district_id || '—'}
                </td>
                <td className="px-3 py-2 text-[var(--color-text-muted)] whitespace-nowrap" style={{ fontSize: 12 }}>
                  {judge.circuit ? `${judge.circuit} Circuit` : '—'}
                </td>
                <td className="px-3 py-2 text-right font-mono text-[var(--color-text-muted)]" style={{ fontSize: 12, fontWeight: 600 }}>
                  {judge.total_cases_handled > 0 ? judge.total_cases_handled.toLocaleString() : '—'}
                </td>
                <td className="px-3 py-2 text-right">
                  {winRate != null ? (
                    <span className="font-mono" style={{ color: wrColor, fontSize: 12, fontWeight: 700 }}>
                      {winRate.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-[var(--color-text-muted)]" style={{ fontSize: 12 }}>—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-[var(--color-text-muted)] whitespace-nowrap" style={{ fontSize: 12 }}>
                  {judge.appointment_date
                    ? new Date(judge.appointment_date).getFullYear()
                    : '—'}
                  {judge.appointing_president && (
                    <span className="text-[var(--color-text-muted)] ml-1">
                      ({judge.appointing_president.split(' ').pop()})
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {party && (
                    <span
 className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded"
 style={{
 color: partyColor,
 background: partyColor ? `${partyColor}15` : undefined,
 fontWeight: 600,
 }}
 >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: partyColor }}
                      />
                      {getPartyLabel(party)}
                    </span>
                  )}
                </td>
                <td className="px-2 py-2">
                  <SaveButton
                    item={{
                      id: `judge-${judge.id}`,
                      type: 'judge',
                      label: judge.full_name,
                      sublabel: judge.district_id || undefined,
                      href: `/judges/${judge.id}`,
                      meta: {
                        winRate: winRate ?? undefined,
                        totalCases: judge.total_cases_handled,
                        district: judge.district_id || undefined,
                        circuit: judge.circuit || undefined,
                      },
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>

        {judges.length === 0 && (
          <div className="py-16 text-center text-[var(--color-text-muted)]" style={{ fontSize: 14 }}>
            No judges match your filters
          </div>
        )}
      </div>
    </div>
  );
}
