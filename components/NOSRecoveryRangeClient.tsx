'use client';

import { useMemo } from 'react';
import { useInflationStore } from '@/store/inflation';
import { adjustForInflation } from '@/lib/bls';
import { fmtK } from '@/lib/format';
import { AnimatedRangeBar } from './motion/NosAnimations';
import InflationToggle from './InflationToggle';

interface RecoveryRange {
  lo: number;
  md: number;
  hi: number;
}

interface NOSRecoveryRangeClientProps {
  recoveryRange: RecoveryRange;
  nosLabel: string;
  sourceYear?: number;
}

/**
 * NOSRecoveryRangeClient: Client-side wrapper for the recovery range visualization.
 * Handles inflation adjustment and toggle UI.
 * Assumes settlement data represents 2021 average (midpoint of 2020-2023 range).
 */
export default function NOSRecoveryRangeClient({
  recoveryRange,
  nosLabel,
  sourceYear = 2021,
}: NOSRecoveryRangeClientProps) {
  const { inflationEnabled } = useInflationStore();

  // Calculate adjusted values if inflation is enabled
  const adjustedRange = useMemo(() => {
    if (!inflationEnabled) {
      return recoveryRange;
    }

    return {
      lo: adjustForInflation(recoveryRange.lo, sourceYear, 2024),
      md: adjustForInflation(recoveryRange.md, sourceYear, 2024),
      hi: adjustForInflation(recoveryRange.hi, sourceYear, 2024),
    };
  }, [inflationEnabled, recoveryRange, sourceYear]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="content-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 className="section-title">Recovery Range Visualization</h2>
              <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '0px', fontFamily: 'var(--font-body)' }}>
                Typical monetary recovery for {nosLabel} cases {inflationEnabled ? '(in 2024 dollars)' : '(in thousands)'}
              </p>
            </div>
            <InflationToggle />
          </div>

          <AnimatedRangeBar className="recovery-range-bar">
            <div className="recovery-track"></div>
            <div
              className="recovery-gradient"
              style={{
                left: `${Math.max(0, (adjustedRange.lo / adjustedRange.hi) * 100)}%`,
                right: `${Math.max(0, 100 - (adjustedRange.hi / adjustedRange.hi) * 100)}%`,
              }}
            ></div>
            <div
              className="recovery-marker"
              style={{
                left: `${(adjustedRange.md / adjustedRange.hi) * 100}%`,
              }}
            ></div>
          </AnimatedRangeBar>

          <div className="recovery-percentiles" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', marginTop: '28px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                P25
              </div>
              <div className="font-mono" style={{ fontSize: '24px', fontWeight: 600, color: '#0966C3', fontFamily: 'var(--font-mono)' }}>
                {fmtK(adjustedRange.lo)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                P50 (Median)
              </div>
              <div className="font-mono" style={{ fontSize: '24px', fontWeight: 600, color: '#0966C3', fontFamily: 'var(--font-mono)' }}>
                {fmtK(adjustedRange.md)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                P75
              </div>
              <div className="font-mono" style={{ fontSize: '24px', fontWeight: 600, color: '#0966C3', fontFamily: 'var(--font-mono)' }}>
                {fmtK(adjustedRange.hi)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
