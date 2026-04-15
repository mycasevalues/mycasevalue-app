'use client';

/**
 * JudgeTableView — Compact, high-density table view for the judge directory.
 * Shows 20+ judges per screen instead of 6-8 cards.
 * Can be toggled alongside the existing card view.
 */

import Link from 'next/link';
import { JudgeWithStats } from '@/lib/supabase-judges';
import { getWinRateColor } from '@/lib/color-scale';
import { getPartyColor, getPartyLabel } from '@/lib/supabase-judges';
import SaveButton from './ui/SaveButton';

interface JudgeTableViewProps {
  judges: JudgeWithStats[];
  onSort?: (column: string) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

function SortIcon({ active, order }: { active: boolean; order: string }) {
  if (!active) return <span className="text-gray-300 ml-1">↕</span>;
  return <span className="text-brand-blue ml-1">{order === 'asc' ? '↑' : '↓'}</span>;
}

export default function JudgeTableView({ judges, onSort, sortBy = 'name', sortOrder = 'asc' }: JudgeTableViewProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-3 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wide cursor-pointer hover:text-gray-900 whitespace-nowrap"
                onClick={() => onSort?.('name')}>
              Judge <SortIcon active={sortBy === 'name'} order={sortOrder} />
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">
              District
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">
              Circuit
            </th>
            <th className="text-right px-3 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wide cursor-pointer hover:text-gray-900 whitespace-nowrap"
                onClick={() => onSort?.('cases')}>
              Cases <SortIcon active={sortBy === 'cases'} order={sortOrder} />
            </th>
            <th className="text-right px-3 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wide cursor-pointer hover:text-gray-900 whitespace-nowrap"
                onClick={() => onSort?.('winRate')}>
              Win % <SortIcon active={sortBy === 'winRate'} order={sortOrder} />
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">
              Appointed
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">
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
                className={`border-b border-gray-50 hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-25'}`}
              >
                <td className="px-3 py-2">
                  <Link
                    href={`/judges/${judge.id}`}
                    className="text-sm font-semibold text-gray-900 hover:text-brand-blue transition-colors"
                  >
                    {judge.full_name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">
                  {judge.district_id || '—'}
                </td>
                <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
                  {judge.circuit ? `${judge.circuit} Circuit` : '—'}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs font-semibold text-gray-900">
                  {judge.total_cases_handled > 0 ? judge.total_cases_handled.toLocaleString() : '—'}
                </td>
                <td className="px-3 py-2 text-right">
                  {winRate != null ? (
                    <span className="font-mono text-xs font-bold" style={{ color: wrColor }}>
                      {winRate.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
                  {judge.appointment_date
                    ? new Date(judge.appointment_date).getFullYear()
                    : '—'}
                  {judge.appointing_president && (
                    <span className="text-gray-400 ml-1">
                      ({judge.appointing_president.split(' ').pop()})
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {party && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        color: partyColor,
                        background: partyColor ? `${partyColor}15` : undefined,
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
        <div className="py-16 text-center text-sm text-gray-400">
          No judges match your filters
        </div>
      )}
    </div>
  );
}
