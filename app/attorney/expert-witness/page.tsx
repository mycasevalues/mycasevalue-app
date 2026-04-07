import type { Metadata } from 'next';
import { getExpertTypes } from '@/lib/expert-witness';
import ExpertWitnessExplorer from '@/components/ExpertWitnessExplorer';

export const metadata: Metadata = {
  title: 'Expert Witness Database | MyCaseValue Attorney Tools',
  description: 'Analyze Daubert challenge statistics, circuit outcomes, and expert witness patterns across 6 expert types. Access sample opinions and exclusion/admission grounds.',
  keywords: ['expert witness', 'Daubert challenges', 'expert testimony', 'litigation support'],
};

export default function ExpertWitnessPage() {
  const experts = getExpertTypes();

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      <style>{`
        select:focus, input:focus {
          outline: none;
          border-color: #0A66C2;
          box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08);
        }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>

      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <a href="/attorney" style={{ fontSize: '13px', color: '#0A66C2', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Attorney Tools
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                Expert Witness Database
              </h1>
              <p style={{ fontSize: '14px', color: '#B0B5BA', margin: '4px 0 0 0' }}>
                Daubert challenges, circuit outcomes, and expert testimony patterns
              </p>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(10, 102, 194, 0.8)', margin: '12px 0 0', fontWeight: 500 }}>
            Based on federal opinions data
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <ExpertWitnessExplorer experts={experts} />
      </div>
    </div>
  );
}
