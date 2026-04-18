'use client';

/**
 * Client-side wrapper to render a sample JudgeRadar on the judges page.
 * Shows an anonymized judge profile vs district average as a preview.
 */

import dynamic from 'next/dynamic';
import type { JudgeRadarData } from './charts/JudgeRadar';

const JudgeRadar = dynamic(() => import('./charts/JudgeRadar'), { ssr: false });

const SAMPLE_JUDGE: JudgeRadarData = {
  plaintiffWinRate: 58.2,
  sjGrantRate: 32.1,
  caseDuration: 14.8,
  settlementRate: 61.5,
  mtdGrantRate: 41.3,
};

const SAMPLE_DISTRICT_AVG: JudgeRadarData = {
  plaintiffWinRate: 47.6,
  sjGrantRate: 44.8,
  caseDuration: 18.2,
  settlementRate: 52.3,
  mtdGrantRate: 48.7,
};

export default function JudgeRadarPreview() {
  return (
    <div style={{ maxWidth: 380, margin: '24px auto 0' }}>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 8, fontFamily: 'var(--font-ui)' }}>
        Sample Judge Profile Preview
      </div>
      <JudgeRadar
        judge={SAMPLE_JUDGE}
        districtAvg={SAMPLE_DISTRICT_AVG}
        label="Sample anonymized judge radar chart preview"
      />
    </div>
  );
}
