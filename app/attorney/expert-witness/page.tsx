import type { Metadata } from 'next';
import { getExpertTypes } from '@/lib/expert-witness';
import ExpertWitnessExplorer from '@/components/ExpertWitnessExplorer';

export const metadata: Metadata = {
  title: 'Expert Witness Database',
  description: 'Analyze Daubert challenge statistics, circuit outcomes, and expert witness patterns across 6 expert types. Access sample opinions and exclusion/admission grounds.',
  keywords: ['expert witness', 'Daubert challenges', 'expert testimony', 'litigation support'],
};

export default function ExpertWitnessPage() {
  const experts = getExpertTypes();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      <style>{`
        select:focus, input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08);
        }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>

      {/* Header */}
      <div style={{ background: 'var(--gradient-hero)', borderBottom: '1px solid var(--border-default)', padding: '20px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="font-display" style={{ fontSize: '26px', fontWeight: 600, color: 'var(--color-surface-0)', margin: 0 }}>
            Expert Witness Intelligence
          </h1>
          <p style={{ fontSize: '14px', color: '#B0B5BA', margin: '8px 0 0 0' }}>
            Daubert challenge success rates and expert retention patterns by case type
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <ExpertWitnessExplorer experts={experts} />
      </div>
    </div>
  );
}
