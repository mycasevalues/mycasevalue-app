'use client';

import React, { useMemo } from 'react';
import FeatureGate from '../ui/FeatureGate';
import { type Tier } from '../../lib/access';

// ─── Types ────────────────────────────────────────────────────────

export interface TrackedCase {
  id: string;
  caseType: string;
  caseTypeEs: string;
  district: string;
  districtEs: string;
  addedDate: string; // ISO
  lastChecked: string; // ISO
  hasNewData: boolean;
  winRate: number;
  winRateChange: number; // delta since last check
  medianSettlement: string;
}

export interface CaseTrackerProps {
  trackedCases: TrackedCase[];
  maxTracked?: number; // limit based on tier
  onRemove?: (id: string) => void;
  onRefresh?: (id: string) => void;
  lang?: 'en' | 'es';
  userTier?: Tier;
}

// ─── Translations ─────────────────────────────────────────────────

interface Labels {
  title: string;
  subtitle: string;
  newData: string;
  winRate: string;
  settlement: string;
  addedDate: string;
  lastChecked: string;
  remove: string;
  refresh: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  emptyStateCta: string;
  slotsFull: string;
  slotUsed: (current: number, max: number) => string;
  tierLimitFree: string;
  tierLimitSingleReport: string;
  tierLimitUnlimited: string;
  tierLimitAttorney: string;
}

const LABELS: Record<'en' | 'es', Labels> = {
  en: {
    title: 'Case Tracker',
    subtitle: 'Monitor the case types and districts you care about',
    newData: 'New Data',
    winRate: 'Win Rate',
    settlement: 'Median Settlement',
    addedDate: 'Added',
    lastChecked: 'Last checked',
    remove: 'Remove',
    refresh: 'Refresh',
    emptyStateTitle: 'Start tracking cases',
    emptyStateDescription: 'Save case types and districts to get alerts when new data is available.',
    emptyStateCta: 'Add case to tracker',
    slotsFull: 'Tracker limit reached',
    slotUsed: (current: number, max: number) => `${current} of ${max} slots used`,
    tierLimitFree: 'Not available on Free plan',
    tierLimitSingleReport: 'Not available on Single Report plan',
    tierLimitUnlimited: 'Available on Unlimited Reports and higher',
    tierLimitAttorney: 'Available on all plans',
  },
  es: {
    title: 'Rastreador de Casos',
    subtitle: 'Monitorea los tipos de casos y distritos que te interesan',
    newData: 'Nuevos Datos',
    winRate: 'Tasa de Éxito',
    settlement: 'Acuerdo Mediano',
    addedDate: 'Agregado',
    lastChecked: 'Última revisión',
    remove: 'Eliminar',
    refresh: 'Actualizar',
    emptyStateTitle: 'Comienza a rastrear casos',
    emptyStateDescription: 'Guarda tipos de casos y distritos para recibir alertas cuando haya nuevos datos.',
    emptyStateCta: 'Agregar caso al rastreador',
    slotsFull: 'Límite de rastreador alcanzado',
    slotUsed: (current: number, max: number) => `${current} de ${max} espacios utilizados`,
    tierLimitFree: 'No disponible en plan Gratis',
    tierLimitSingleReport: 'No disponible en plan Individual',
    tierLimitUnlimited: 'Disponible en Informes Ilimitados y superior',
    tierLimitAttorney: 'Disponible en todos los planes',
  },
};

// ─── Tier Limits ──────────────────────────────────────────────────

const TIER_LIMITS: Record<Tier, number> = {
  free: 0,
  single_report: 1,
  unlimited: 5,
  attorney: Infinity,
};

// ─── Main Component ───────────────────────────────────────────────

export function CaseTracker({
  trackedCases,
  maxTracked,
  onRemove,
  onRefresh,
  lang = 'en',
  userTier = 'free',
}: CaseTrackerProps) {
  const t = LABELS[lang === 'es' ? 'es' : 'en'];
  const es = lang === 'es';

  // Compute effective limit
  const effectiveLimit = useMemo(() => {
    return maxTracked !== undefined ? maxTracked : TIER_LIMITS[userTier];
  }, [maxTracked, userTier]);

  // Check if at capacity
  const isAtCapacity = trackedCases.length >= effectiveLimit && effectiveLimit !== Infinity;

  // Filter and sort cases
  const visibleCases = useMemo(() => {
    return trackedCases.slice(0, effectiveLimit === Infinity ? trackedCases.length : effectiveLimit);
  }, [trackedCases, effectiveLimit]);

  // Gate behind 'unlimited' tier
  return (
    <FeatureGate userTier={userTier} feature="watchlist_alerts" lang={lang}>
      <div
        className="w-full rounded-[12px] border p-6 transition-all"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E0D8',
        }}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#111111]" style={{ letterSpacing: '-0.3px' }}>
              {t.title}
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">{t.subtitle}</p>
          </div>

          {/* Slot indicator (if capacity limited) */}
          {effectiveLimit !== Infinity && (
            <div className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-3 py-2">
              <span className="text-xs font-medium text-[#6B7280]">
                {t.slotUsed(visibleCases.length, effectiveLimit as number)}
              </span>
              {isAtCapacity && (
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#EF4444' }}
                  aria-label="Capacity reached"
                />
              )}
            </div>
          )}
        </div>

        {/* Cases List or Empty State */}
        {visibleCases.length === 0 ? (
          <EmptyState t={t} es={es} />
        ) : (
          <CasesList cases={visibleCases} t={t} es={es} onRemove={onRemove} onRefresh={onRefresh} />
        )}
      </div>
    </FeatureGate>
  );
}

// ─── Sub-Component: Empty State ───────────────────────────────────

interface EmptyStateProps {
  t: Labels;
  es: boolean;
}

function EmptyState({ t, es }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-[#111111]">{t.emptyStateTitle}</h3>
      <p className="max-w-xs text-sm text-[#6B7280]">{t.emptyStateDescription}</p>
      <button
        className="mt-2 px-6 py-2 rounded-full font-medium text-white transition-all hover:opacity-90"
        style={{
          backgroundColor: '#111111',
          fontFamily: 'Roboto, system-ui, sans-serif',
        }}
      >
        {t.emptyStateCta}
      </button>
    </div>
  );
}

// ─── Sub-Component: Cases List ────────────────────────────────────

interface CasesListProps {
  cases: TrackedCase[];
  t: Labels;
  es: boolean;
  onRemove?: (id: string) => void;
  onRefresh?: (id: string) => void;
}

function CasesList({ cases, t, es, onRemove, onRefresh }: CasesListProps) {
  return (
    <div className="space-y-3">
      {cases.map((trackedCase, idx) => (
        <CaseItem
          key={trackedCase.id}
          trackedCase={trackedCase}
          t={t}
          es={es}
          onRemove={onRemove}
          onRefresh={onRefresh}
          isLast={idx === cases.length - 1}
        />
      ))}
    </div>
  );
}

// ─── Sub-Component: Case Item ─────────────────────────────────────

interface CaseItemProps {
  trackedCase: TrackedCase;
  t: Labels;
  es: boolean;
  onRemove?: (id: string) => void;
  onRefresh?: (id: string) => void;
  isLast: boolean;
}

function CaseItem({ trackedCase, t, es, onRemove, onRefresh, isLast }: CaseItemProps) {
  const displayCaseType = es ? trackedCase.caseTypeEs : trackedCase.caseType;
  const displayDistrict = es ? trackedCase.districtEs : trackedCase.district;

  // Format dates
  const addedDateObj = new Date(trackedCase.addedDate);
  const lastCheckedObj = new Date(trackedCase.lastChecked);

  const formatDate = (date: Date): string => {
    if (es) {
      return date.toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const addedDateStr = formatDate(addedDateObj);
  const lastCheckedStr = formatDate(lastCheckedObj);

  // Win rate change direction
  const winRateDirection = trackedCase.winRateChange > 0 ? '↑' : trackedCase.winRateChange < 0 ? '↓' : '→';
  const winRateColor =
    trackedCase.winRateChange > 0 ? '#0D9488' : trackedCase.winRateChange < 0 ? '#EF4444' : '#9CA3AF';

  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-lg bg-[#F9F8F6] p-4 transition-all hover:bg-[#F3F1ED] ${
        !isLast ? 'border-b border-[#E5E0D8]' : ''
      }`}
    >
      {/* Left: Case info + stats */}
      <div className="flex-1 min-w-0">
        {/* Title row with new data badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#111111] truncate">
              {displayCaseType}
              {displayDistrict && <span className="text-[#6B7280]"> • {displayDistrict}</span>}
            </h3>
          </div>

          {/* New data indicator */}
          {trackedCase.hasNewData && (
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: '#EF4444' }}
                aria-label="New data available"
              />
              <span className="text-xs font-semibold text-[#EF4444]">{t.newData}</span>
            </div>
          )}
        </div>

        {/* Stats row: win rate + settlement */}
        <div className="flex items-center gap-4 text-xs mb-2">
          {/* Win rate with change indicator */}
          <div className="flex items-center gap-1">
            <span className="font-medium text-[#111111]">{t.winRate}:</span>
            <span className="font-semibold text-[#111111]">{trackedCase.winRate}%</span>
            {trackedCase.winRateChange !== 0 && (
              <span
                className="text-xs font-bold"
                style={{ color: winRateColor }}
                title={`${trackedCase.winRateChange > 0 ? '+' : ''}${trackedCase.winRateChange.toFixed(1)}%`}
              >
                {winRateDirection}
              </span>
            )}
          </div>

          {/* Settlement */}
          <div className="flex items-center gap-1">
            <span className="font-medium text-[#111111]">{t.settlement}:</span>
            <span className="font-semibold text-[#111111]">{trackedCase.medianSettlement}</span>
          </div>
        </div>

        {/* Meta row: dates */}
        <div className="flex items-center gap-3 text-[11px] text-[#9CA3AF]">
          <span>{t.addedDate}: {addedDateStr}</span>
          <span>•</span>
          <span>{t.lastChecked}: {lastCheckedStr}</span>
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => onRefresh?.(trackedCase.id)}
          className="px-4 py-2 rounded-full text-xs font-medium transition-all border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#D1D5DB',
            color: '#111111',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
          title={t.refresh}
        >
          {t.refresh}
        </button>
        <button
          onClick={() => onRemove?.(trackedCase.id)}
          className="px-4 py-2 rounded-full text-xs font-medium transition-all border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#D1D5DB',
            color: '#EF4444',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
          title={t.remove}
        >
          {t.remove}
        </button>
      </div>
    </div>
  );
}

export default CaseTracker;
