'use client';

import { useEffect, useState } from 'react';
import JudgeSection from './JudgeSection';

interface JudgeSectionLoaderProps {
  nosCode?: string;
  districtId?: string;
  mode: 'top-national' | 'district-all' | 'district-nos';
}

interface JudgeData {
  id: string;
  full_name: string;
  district_id: string | null;
  appointment_year?: number;
  appointing_president?: string | null;
  plaintiff_win_rate: number;
  total_cases: number;
}

export default function JudgeSectionLoader({ nosCode, districtId, mode }: JudgeSectionLoaderProps) {
  const [judges, setJudges] = useState<JudgeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJudges = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (nosCode) params.append('nosCode', nosCode);
        if (districtId) params.append('districtId', districtId);
        params.append('mode', mode);

        const response = await fetch(`/api/judges?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch judges');
        }

        const data = await response.json();
        setJudges(data.judges || []);
      } catch (err) {
        console.error('Error fetching judges:', err);
        setError(err instanceof Error ? err.message : 'Failed to load judges');
      } finally {
        setLoading(false);
      }
    };

    fetchJudges();
  }, [nosCode, districtId, mode]);

  if (loading) {
    return (
      <section style={{ marginTop: 56, marginBottom: 56 }}>
        <div style={{
          background: 'var(--card)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '4px',
          padding: 'clamp(24px, 4vw, 32px)',
        }}>
          <div style={{
            fontSize: 14,
            color: 'var(--text2)',
            fontFamily: 'var(--font-ui)',
          }}>
            Loading judges...
          </div>
        </div>
      </section>
    );
  }

  if (error || judges.length === 0) {
    return null;
  }

  const titles: Record<string, { title: string; subtitle: string }> = {
    'top-national': {
      title: 'Judges with Most Experience in This Case Type Nationally',
      subtitle: 'These judges have handled the most cases of this type across all federal districts.',
    },
    'district-all': {
      title: 'Active Judges in This District',
      subtitle: 'All active federal judges in this district, sorted by total case volume.',
    },
    'district-nos': {
      title: 'Judges for This Case Type in This District',
      subtitle: 'Judges in this district who have handled 10+ cases of this type.',
    },
  };

  const config = titles[mode];

  return (
    <JudgeSection
      title={config.title}
      subtitle={config.subtitle}
      judges={judges}
      showDistrict={mode === 'top-national'}
    />
  );
}
