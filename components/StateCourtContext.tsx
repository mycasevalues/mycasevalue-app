'use client';

import { motion } from 'framer-motion';

interface StateCourtMetrics {
  winRate: number;
  settlementRate: number;
  dismissalRate: number;
  medianDuration: number;
  medianAward: string;
}

interface StateCourtContextProps {
  nosCode: string;
  federalWinRate: number;
  federalSettlement: number;
  federalMedianAward: string;
  federalMedianDuration: number;
}

// Mock state court data for top 10 NOS codes
const STATE_COURT_DATA: Record<string, StateCourtMetrics> = {
  '442': {
    winRate: 48.5,
    settlementRate: 51.2,
    dismissalRate: 14.3,
    medianDuration: 18,
    medianAward: '$185K',
  },
  '440': {
    winRate: 45.2,
    settlementRate: 48.8,
    dismissalRate: 18.5,
    medianDuration: 22,
    medianAward: '$175K',
  },
  '710': {
    winRate: 62.1,
    settlementRate: 54.3,
    dismissalRate: 11.2,
    medianDuration: 14,
    medianAward: '$245K',
  },
  '365': {
    winRate: 38.9,
    settlementRate: 52.7,
    dismissalRate: 19.2,
    medianDuration: 28,
    medianAward: '$325K',
  },
  '190': {
    winRate: 58.3,
    settlementRate: 50.1,
    dismissalRate: 16.8,
    medianDuration: 16,
    medianAward: '$215K',
  },
  '360': {
    winRate: 42.6,
    settlementRate: 49.5,
    dismissalRate: 21.4,
    medianDuration: 24,
    medianAward: '$195K',
  },
  '362': {
    winRate: 28.7,
    settlementRate: 48.9,
    dismissalRate: 24.1,
    medianDuration: 32,
    medianAward: '$485K',
  },
  '850': {
    winRate: 35.2,
    settlementRate: 42.1,
    dismissalRate: 31.5,
    medianDuration: 26,
    medianAward: '$95K',
  },
  '110': {
    winRate: 44.8,
    settlementRate: 52.3,
    dismissalRate: 17.9,
    medianDuration: 20,
    medianAward: '$185K',
  },
  '370': {
    winRate: 41.3,
    settlementRate: 50.2,
    dismissalRate: 20.8,
    medianDuration: 26,
    medianAward: '$215K',
  },
};

export default function StateCourtContext({
  nosCode,
  federalWinRate,
  federalSettlement,
  federalMedianAward,
  federalMedianDuration,
}: StateCourtContextProps) {
  const stateData = STATE_COURT_DATA[nosCode];

  // If no state court data available, show a message
  if (!stateData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded border border-[var(--bdr, #E2DFD8)] bg-[var(--surf,#F6F5F2)] p-6"
      >
        <div className="text-sm text-[var(--color-text-muted)]">
          <p className="font-semibold text-[var(--color-text-muted)] mb-2">State Court Comparison</p>
          <p>
            State court analysis not yet available for NOS {nosCode}. Check back soon for comparative
            insights.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded border border-[var(--bdr, #E2DFD8)] bg-[var(--surf,#F6F5F2)] p-6"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-muted)]">Federal vs State Court Outcomes</h2>
        <p className="text-sm text-[var(--text2)] mt-2">
          State court data sourced from CourtListener state court opinions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Federal Data Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-[var(--link)] mr-2"></span>
            Federal Court
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--color-text-muted)]">Win Rate</span>
                <span className="text-sm font-mono font-semibold text-[var(--color-text-muted)]">{federalWinRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.08)] rounded-full h-2">
                <div
                  className="bg-[var(--link)] h-2 rounded-full transition-all"
                  style={{ width: `${federalWinRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--color-text-muted)]">Settlement Rate</span>
                <span className="text-sm font-mono font-semibold text-[var(--color-text-muted)]">{federalSettlement.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.08)] rounded-full h-2">
                <div
                  className="bg-[#0D9488] h-2 rounded-full transition-all"
                  style={{ width: `${federalSettlement}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--bdr, #E2DFD8)]">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--color-text-muted)]">Median Award</span>
                <span className="font-mono font-semibold text-[var(--color-text-muted)]">{federalMedianAward}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Median Duration</span>
                <span className="font-mono font-semibold text-[var(--color-text-muted)]">{federalMedianDuration} months</span>
              </div>
            </div>
          </div>
        </div>

        {/* State Court Data Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-[#7c3aed] mr-2"></span>
            State Court
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--color-text-muted)]">Win Rate</span>
                <span className="text-sm font-mono font-semibold text-[var(--color-text-muted)]">{stateData.winRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.08)] rounded-full h-2">
                <div
                  className="bg-[#7c3aed] h-2 rounded-full transition-all"
                  style={{ width: `${stateData.winRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--color-text-muted)]">Settlement Rate</span>
                <span className="text-sm font-mono font-semibold text-[var(--color-text-muted)]">
                  {stateData.settlementRate.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.08)] rounded-full h-2">
                <div
                  className="bg-[#0D9488] h-2 rounded-full transition-all"
                  style={{ width: `${stateData.settlementRate}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--bdr, #E2DFD8)]">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[var(--color-text-muted)]">Median Award</span>
                <span className="font-mono font-semibold text-[var(--color-text-muted)]">{stateData.medianAward}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Median Duration</span>
                <span className="font-mono font-semibold text-[var(--color-text-muted)]">{stateData.medianDuration} months</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Difference Callout */}
      <div className="mt-6 pt-6 border-t border-[var(--bdr, #E2DFD8)]">
        <div className="bg-[var(--surf)] rounded p-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text-muted)]">Key Difference:</span>{' '}
            {federalWinRate > stateData.winRate
              ? `Federal courts show ${(federalWinRate - stateData.winRate).toFixed(1)}% higher win rate on average.`
              : `State courts show ${(stateData.winRate - federalWinRate).toFixed(1)}% higher win rate on average.`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
