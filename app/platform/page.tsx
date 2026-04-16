import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Legal Intelligence Platform',
  description: 'The Legal Intelligence Platform democratizing federal court data. 5.1M+ cases analyzed, AI-powered predictions, real-time settlement analytics, and attorney tools for data-driven legal decisions.',
  alternates: { canonical: `${SITE_URL}/platform` },
  openGraph: {
    title: 'Legal Intelligence Platform | MyCaseValue',
    description: 'Democratizing federal court data with AI-powered legal analytics. 5.1M+ cases, 95 federal districts, 55+ years of data.',
    type: 'website',
    url: `${SITE_URL}/platform`,
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MyCaseValue Legal Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Intelligence Platform | MyCaseValue',
    description: 'Democratizing federal court data with AI-powered legal analytics. 5.1M+ cases, 95 federal districts, 55+ years of data.',
  },
  keywords: [
    'legal technology', 'legal analytics', 'AI legal research', 'court data', 'settlement predictions',
    'case outcome analysis', 'federal court data', 'legal intelligence', 'litigation analytics',
  ].join(', '),
};

const DATA_SOURCES = [
  {
    name: 'Federal Judicial Center (FJC)',
    url: 'https://www.fjc.gov',
    description: 'Official case-level statistics and civil case outcome data',
    updateFrequency: 'Quarterly',
  },
  {
    name: 'PACER via CourtListener RECAP',
    url: 'https://www.courtlistener.com',
    description: 'Real-time docket data and case documents from active cases',
    updateFrequency: 'Daily',
  },
  {
    name: 'Bureau of Labor Statistics',
    url: 'https://www.bls.gov',
    description: 'CPI inflation data for damages adjustment and economic context',
    updateFrequency: 'Monthly',
  },
  {
    name: 'EEOC',
    url: 'https://www.eeoc.gov',
    description: 'Employment discrimination charges and outcomes data',
    updateFrequency: 'Annually',
  },
  {
    name: 'OSHA',
    url: 'https://www.osha.gov',
    description: 'Workplace enforcement actions and safety case data',
    updateFrequency: 'Annually',
  },
];

const AI_CAPABILITIES = [
  {
    title: 'Natural Language Search',
    description: 'Describe your legal situation in plain English and find matching case types and outcomes instantly.',
    icon: '◆',
  },
  {
    title: 'Document Intelligence',
    description: 'Extract key data from legal documents and automatically match against historical precedents.',
    icon: '◆',
  },
  {
    title: 'Outcome Prediction',
    description: 'Predict case outcomes based on historical patterns, judge tendencies, and case characteristics.',
    icon: '◆',
  },
  {
    title: 'Judge Analysis',
    description: 'Compare individual judge profiles to district averages and identify patterns in their rulings.',
    icon: '◆',
  },
];

const TOOLS_BY_CATEGORY = [
  {
    category: 'Research Tools',
    tools: [
      'Case Lookup',
      'District Explorer',
      'Win Rate Maps',
      'Glossary',
    ],
  },
  {
    category: 'Attorney Mode Tools',
    tools: [
      'Opposing Counsel Research',
      'Demand Package Generator',
      'Timeline Generator',
      'API Access',
    ],
  },
  {
    category: 'Paralegal Tools',
    tools: [
      'Intake Forms',
      'Case Strength Assessment',
      'Expert Witness Explorer',
      'Document Automation',
    ],
  },
  {
    category: 'Calculator Tools',
    tools: [
      'Case Value Calculator',
      'Lien Calculator',
      'Statute of Limitations',
      'Fee Calculator',
    ],
  },
];

const AUDIENCES = [
  {
    segment: 'Personal Injury Attorneys',
    usecase: 'Evaluate settlement ranges and judge tendencies before accepting cases.',
  },
  {
    segment: 'Employment Lawyers',
    usecase: 'Research EEOC discrimination patterns and calculate damages for class actions.',
  },
  {
    segment: 'Insurance Adjusters',
    usecase: 'Benchmark settlement expectations against comparable claims in the database.',
  },
  {
    segment: 'Legal Researchers',
    usecase: 'Access 5.1M+ cases with powerful filtering and statistical analysis tools.',
  },
  {
    segment: 'Law Students',
    usecase: 'Learn judicial decision-making patterns and legal outcomes from real data.',
  },
  {
    segment: 'Pro Se Litigants',
    usecase: 'Represent themselves with data-driven insights and judge analytics.',
  },
];

export default function PlatformPage() {
  return (
    <>
      <style>{`
        .tech-stack-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin: 40px 0;
        }

        .tech-layer {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .tech-box {
          background: #F5F3FF;
          border: 1px solid #E9D5FF;
          padding: 16px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #6B21A8;
          min-width: 120px;
          text-align: center;
        }

        .tech-arrow {
          color: #D1D5DB;
          font-size: 20px;
          font-weight: 300;
        }

        .data-flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin: 40px 0;
        }

        .flow-item {
          background: linear-gradient(135deg, #F3E8FF 0%, #FAF5FF 100%);
          border: 1px solid #E9D5FF;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
        }

        .flow-title {
          font-weight: 600;
          color: #6B21A8;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .flow-desc {
          font-size: 13px;
          color: #1e40af;
          line-height: 1.5;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 40px 0;
          background: white;
          border: 1px solid var(--border-default);
          border-radius: 12px;
          overflow: hidden;
        }

        .comparison-table th {
          background: var(--gradient-hero);
          color: white;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 2px solid var(--accent-primary);
        }

        .comparison-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #F3F4F6;
          font-size: 14px;
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .comparison-table .feature-name {
          font-weight: 600;
          color: #1F2937;
          min-width: 180px;
        }

        .comparison-table .yes {
          color: #059669;
          font-weight: 600;
        }

        .comparison-table .no {
          color: #DC2626;
          font-weight: 600;
        }

        .comparison-table .price {
          font-weight: 600;
          color: var(--accent-primary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin: 40px 0;
        }

        .feature-card {
          background: white;
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 10px 25px rgba(10, 102, 194, 0.1);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #A78BFA 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          margin-bottom: 16px;
        }

        .feature-title {
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 8px;
          font-size: 16px;
        }

        .feature-desc {
          font-size: 14px;
          color: #6B7280;
          line-height: 1.6;
        }

        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin: 40px 0;
          padding: 32px;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #2D5A8C 100%);
          border-radius: 12px;
        }

        .stat-item {
          text-align: center;
          color: white;
        }

        .stat-number {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: var(--accent-primary);
          margin-bottom: 8px;
          font-family: var(--font-mono);
        }

        .stat-label {
          font-size: 14px;
          color: var(--border-default);
          font-weight: 500;
        }

        .roadmap-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin: 40px 0;
        }

        .roadmap-phase {
          background: white;
          border: 2px solid var(--accent-primary);
          border-radius: 12px;
          padding: 32px;
          position: relative;
        }

        .roadmap-phase.current {
          background: linear-gradient(135deg, #F3E8FF 0%, #FAF5FF 100%);
        }

        .phase-badge {
          position: absolute;
          top: -12px;
          left: 24px;
          background: var(--gradient-hero);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .phase-title {
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
          margin-top: 8px;
          margin-bottom: 12px;
        }

        .phase-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .phase-list li {
          padding: 8px 0;
          font-size: 14px;
          color: var(--color-text-secondary);
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .phase-list li:before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--gradient-hero);
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .market-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin: 40px 0;
        }

        .market-card {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #A78BFA 100%);
          padding: 28px;
          border-radius: 12px;
          color: white;
          text-align: center;
        }

        .market-value {
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 700;
          margin-bottom: 8px;
          font-family: var(--font-pt-mono);
        }

        .market-label {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .tech-layer {
            flex-direction: column;
            gap: 12px;
          }

          .tech-arrow {
            transform: rotate(90deg);
          }

          .comparison-table {
            font-size: 12px;
          }

          .comparison-table th,
          .comparison-table td {
            padding: 12px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .stats-bar {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            padding: 24px;
          }

          .roadmap-container {
            grid-template-columns: 1fr;
          }

          .market-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-bar {
            grid-template-columns: 1fr;
          }

          .market-grid {
            grid-template-columns: 1fr;
          }

          .comparison-table {
            font-size: 11px;
            overflow-x: auto;
          }
        }
      `}</style>

      <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={{ background: 'var(--accent-primary)', padding: '80px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--color-surface-0)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '12px',
                fontFamily: 'var(--font-display)',
              }}>
                PLATFORM
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              color: 'var(--color-surface-0)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-1px',
              marginBottom: 16,
              lineHeight: 1.2,
            }}>
              The Legal Intelligence Platform
            </h1>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#D1D5DB',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
              maxWidth: 700,
            }}>
              Democratizing federal court data with AI-powered analytics. Providing attorneys, judges, law firms, and researchers with actionable insights from millions of court cases.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ padding: '60px 24px', background: 'var(--color-surface-1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="stats-bar">
              <div className="stat-item">
                <div className="stat-number">5.1M+</div>
                <div className="stat-label">Federal Cases Analyzed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">84</div>
                <div className="stat-label">Case Types Covered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">94</div>
                <div className="stat-label">Federal Districts</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">54</div>
                <div className="stat-label">Years of Data (1970-2025)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-0)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                Modern Technology Stack
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Built on enterprise-grade infrastructure for reliability, performance, and scale.
              </p>
            </div>

            <div className="tech-stack-container">
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#F3E8FF',
                  color: '#6B21A8',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}>
                  Frontend
                </span>
              </div>
              <div className="tech-layer">
                <div className="tech-box">Next.js 14</div>
                <div className="tech-box">React 19</div>
                <div className="tech-box">TypeScript</div>
                <div className="tech-box">TailwindCSS</div>
              </div>

              <div style={{ textAlign: 'center', color: '#D1D5DB', fontSize: 24 }}>
                {String.fromCharCode(8595)}
              </div>

              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#F3E8FF',
                  color: '#6B21A8',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}>
                  API & Services
                </span>
              </div>
              <div className="tech-layer">
                <div className="tech-box">Vercel Functions</div>
                <div className="tech-box">Anthropic Claude AI</div>
                <div className="tech-box">Prisma ORM</div>
                <div className="tech-box">Node.js</div>
              </div>

              <div style={{ textAlign: 'center', color: '#D1D5DB', fontSize: 24 }}>
                {String.fromCharCode(8595)}
              </div>

              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#F3E8FF',
                  color: '#6B21A8',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}>
                  Data & Infrastructure
                </span>
              </div>
              <div className="tech-layer">
                <div className="tech-box">Supabase (PostgreSQL)</div>
                <div className="tech-box">Vector DB</div>
                <div className="tech-box">Vercel Edge</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Pipeline */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                Data Pipeline Architecture
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Multi-source integration ensuring accuracy, timeliness, and comprehensive coverage.
              </p>
            </div>

            <div className="data-flow">
              <div className="flow-item">
                <div className="flow-title">Federal Judicial Center (FJC)</div>
                <div className="flow-desc">Integrated Database with 40+ years of civil case outcomes</div>
              </div>
              <div className="flow-item">
                <div className="flow-title">CourtListener</div>
                <div className="flow-desc">Real-time court opinions and docket monitoring</div>
              </div>
              <div className="flow-item">
                <div className="flow-title">PACER System</div>
                <div className="flow-desc">Live docket data and case status updates</div>
              </div>
              <div className="flow-item">
                <div className="flow-title">BLS Data</div>
                <div className="flow-desc">Economic context for damages assessment</div>
              </div>
            </div>

            <div style={{
              marginTop: 40,
              padding: 24,
              background: '#F3E8FF',
              borderRadius: 12,
              border: '1px solid #E9D5FF',
            }}>
              <p style={{
                color: '#6B21A8',
                fontSize: 14,
                lineHeight: 1.6,
                margin: 0,
              }}>
                Data flows through ETL pipelines with automated validation, deduplication, and enrichment. AI models trained on historical patterns enhance predictions and pattern detection. Real-time sync maintains data freshness for active case monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* Competitive Analysis */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-0)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                Market Position
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                MyCaseValue positions itself as the accessible, affordable alternative for attorneys and individuals seeking legal data insights.
              </p>
            </div>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>MyCaseValue</th>
                  <th>Westlaw</th>
                  <th>Lex Machina</th>
                  <th>PACER Direct</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">AI-Powered Analysis</td>
                  <td className="yes">Yes</td>
                  <td className="no">No</td>
                  <td className="yes">Yes</td>
                  <td className="no">No</td>
                </tr>
                <tr>
                  <td className="feature-name">Real-Time Data</td>
                  <td className="yes">Yes</td>
                  <td className="yes">Yes</td>
                  <td className="no">No</td>
                  <td className="yes">Yes</td>
                </tr>
                <tr>
                  <td className="feature-name">Settlement Predictions</td>
                  <td className="yes">Yes</td>
                  <td className="no">No</td>
                  <td className="yes">Yes</td>
                  <td className="no">No</td>
                </tr>
                <tr>
                  <td className="feature-name">Mobile Access</td>
                  <td className="yes">Yes</td>
                  <td className="yes">Yes</td>
                  <td className="yes">Yes</td>
                  <td className="no">No</td>
                </tr>
                <tr>
                  <td className="feature-name">API Access</td>
                  <td className="yes">Yes</td>
                  <td className="yes">Yes</td>
                  <td className="no">No</td>
                  <td className="no">No</td>
                </tr>
                <tr>
                  <td className="feature-name">Ease of Use</td>
                  <td className="yes">Excellent</td>
                  <td className="no">Complex</td>
                  <td className="no">Complex</td>
                  <td className="no">Poor</td>
                </tr>
                <tr>
                  <td className="feature-name">Free Access</td>
                  <td className="yes">Basic</td>
                  <td className="no">No</td>
                  <td className="no">No</td>
                  <td className="yes">Basic</td>
                </tr>
                <tr>
                  <td className="feature-name">Cost</td>
                  <td className="price">Free - $29.99/mo</td>
                  <td className="price">$100-400/mo</td>
                  <td className="price">$500+/mo</td>
                  <td className="price">Pay-per-docket</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                Platform Features
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                19+ integrated tools for data-driven legal decision-making, powered by AI and historical analysis.
              </p>
            </div>

            <div className="features-grid">
              {[
                { icon: '∴', title: 'Case Outcome Search', desc: 'Natural language search across 5.1M+ federal cases with instant results' },
                { icon: '↔', title: 'Settlement Range Calculator', desc: 'AI-predicted settlement ranges based on case type, jurisdiction, and judge' },
                { icon: '☆', title: 'Win Rate Analytics', desc: 'Historical win rates by case type, district, and attorney characteristics' },
                { icon: '█', title: 'Judge Analytics', desc: 'Judge-specific ruling patterns, settlement tendencies, and trial history' },
                { icon: '‖', title: 'Real-Time Monitoring', desc: 'Active case tracking with docket updates and status notifications' },
                { icon: 'M', title: 'Multi-Language Support', desc: 'English and Spanish interfaces for broader user accessibility' },
                { icon: 'Σ', title: 'Opposing Counsel Intel', desc: 'Attorney analytics and litigation track records' },
                { icon: '→', title: 'Timeline Predictions', desc: 'Expected case duration estimates with confidence intervals' },
                { icon: '₹', title: 'Litigation Cost Modeling', desc: 'Estimated attorney fees and discovery costs by case complexity' },
                { icon: '∞', title: 'Custom Cohort Analysis', desc: 'Build and analyze specific case populations with filters' },
                { icon: '>', title: 'API Integration', desc: 'RESTful API for enterprise system integration' },
                { icon: '◈', title: 'Bulk Export', desc: 'Download case data in multiple formats (CSV, JSON, PDF)' },
                { icon: '⌘', title: 'Natural Language Queries', desc: 'Ask questions in plain English, get data-driven answers' },
                { icon: '◆', title: 'Precedent Finder', desc: 'Identify relevant historical cases with citation linking' },
                { icon: '◇', title: 'Settlement Distribution', desc: 'Visualize settlement percentile distributions by case variables' },
                { icon: '⬥', title: 'Risk Assessment', desc: 'AI-powered case risk scoring based on comparable outcomes' },
                { icon: '∾', title: 'Damage Estimates', desc: 'Predicted damages ranges with percentile breakdowns' },
                { icon: '⬢', title: 'District Benchmarking', desc: 'Compare districts on speed, settlement rates, and outcomes' },
                { icon: '◐', title: 'Trend Analysis', desc: 'Historical trends in case outcomes and litigation patterns' },
              ].map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-title">{feature.title}</div>
                  <div className="feature-desc">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Opportunity */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-0)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                Market Opportunity
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Positioned at the intersection of legal technology, AI, and data analytics with significant growth potential.
              </p>
            </div>

            <div className="market-grid">
              <div className="market-card">
                <div className="market-value">15B</div>
                <div className="market-label">Legal Tech Market Size</div>
              </div>
              <div className="market-card">
                <div className="market-value">1.3M+</div>
                <div className="market-label">Attorneys in the US</div>
              </div>
              <div className="market-card">
                <div className="market-value">400K+</div>
                <div className="market-label">New Federal Cases Annually</div>
              </div>
              <div className="market-card">
                <div className="market-value">23%</div>
                <div className="market-label">YoY Legal Tech Growth</div>
              </div>
            </div>

            <div style={{
              marginTop: 40,
              padding: 32,
              background: '#F3E8FF',
              borderRadius: 12,
              border: '1px solid #E9D5FF',
            }}>
              <h3 style={{
                color: '#6B21A8',
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 16,
              }}>
                Key Market Drivers
              </h3>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                color: '#6B21A8',
                fontSize: 14,
              }}>
                <li style={{ marginBottom: 12, display: 'flex', gap: 10 }}>
                  <span style={{ fontWeight: 600, flexShrink: 0 }}>→</span>
                  <span>Growing demand for data-driven legal decisions among solo practitioners and small firms</span>
                </li>
                <li style={{ marginBottom: 12, display: 'flex', gap: 10 }}>
                  <span style={{ fontWeight: 600, flexShrink: 0 }}>→</span>
                  <span>Cost pressure driving adoption of alternatives to expensive platforms (Westlaw, Lex Machina)</span>
                </li>
                <li style={{ marginBottom: 12, display: 'flex', gap: 10 }}>
                  <span style={{ fontWeight: 600, flexShrink: 0 }}>→</span>
                  <span>AI integration enabling predictive analytics previously unavailable to general practitioners</span>
                </li>
                <li style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontWeight: 600, flexShrink: 0 }}>→</span>
                  <span>Regulatory focus on litigation cost control and case evaluation standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                Product Roadmap
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Phased expansion strategy building on current federal data foundation to adjacent markets.
              </p>
            </div>

            <div className="roadmap-container">
              <div className="roadmap-phase current">
                <div className="phase-badge">Phase 1 - Now</div>
                <div className="phase-title">Federal Civil Data</div>
                <ul className="phase-list">
                  <li>5.1M+ federal civil cases (1970-present)</li>
                  <li>84 case types, 95 federal districts</li>
                  <li>AI-powered settlement predictions</li>
                  <li>Judge analytics and win rates</li>
                  <li>Real-time case monitoring</li>
                  <li>19+ integrated attorney tools</li>
                </ul>
              </div>

              <div className="roadmap-phase">
                <div className="phase-badge">Phase 2 - Q3 2026</div>
                <div className="phase-title">State Courts Expansion</div>
                <ul className="phase-list">
                  <li>State appellate court data (50 states)</li>
                  <li>Criminal case analytics</li>
                  <li>State-specific judge profiles</li>
                  <li>Expanded coverage to 200+ case types</li>
                  <li>State licensing attorney analytics</li>
                  <li>Cross-jurisdiction case mapping</li>
                </ul>
              </div>

              <div className="roadmap-phase">
                <div className="phase-badge">Phase 3 - 2027</div>
                <div className="phase-title">Global & Marketplace</div>
                <ul className="phase-list">
                  <li>International court data (UK, EU, Canada)</li>
                  <li>API marketplace for integrations</li>
                  <li>White-label solutions for law firms</li>
                  <li>Advanced AI consulting services</li>
                  <li>Enterprise litigation intelligence</li>
                  <li>Multi-language global support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* The Problem Section */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-0)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                The Problem We're Solving
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Legal data costs $500–$2,000 per month at Westlaw and Lex Machina. That same public federal court data is freely available but buried in government databases. MyCaseValue surfaces it.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 24,
            }}>
              {[
                { number: '$500–$2,000', label: 'Monthly cost at Westlaw or Lex Machina' },
                { number: '95 districts', label: 'Federal court coverage nationwide' },
                { number: '5.1M+ Cases', label: 'Complete historical database available' },
                { number: 'Free', label: 'MyCaseValue base access with premium tiers' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 24,
                    background: 'var(--color-surface-1)',
                    borderRadius: 12,
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    marginBottom: 8,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {item.number}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: '#6B7280',
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Data Section */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                The Data: 5.1M+ Cases from 5 Official Sources
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Comprehensive federal court data spanning 55+ years across all 95 federal districts and 84 case types.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}>
              {DATA_SOURCES.map((source) => (
                <div
                  key={source.name}
                  style={{
                    padding: 28,
                    background: 'var(--color-surface-0)',
                    borderRadius: 12,
                    border: '1px solid var(--border-default)',
                    transition: 'all 0.3s ease',
                  }}
                  className="data-source-card"
                >
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: 8,
                    margin: 0,
                  }}>
                    {source.name}
                  </h4>
                  <p style={{
                    fontSize: 14,
                    color: '#6B7280',
                    marginBottom: 12,
                    margin: '8px 0 12px 0',
                    lineHeight: 1.6,
                  }}>
                    {source.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    marginBottom: 12,
                  }}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 13,
                        color: 'var(--accent-primary)',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Visit Source →
                    </a>
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--color-text-muted)',
                    fontWeight: 500,
                  }}>
                    Updates: {source.updateFrequency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Layer Section */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-0)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                The AI Layer: Four Core Capabilities
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Powered by Anthropic Claude API and trained on 55+ years of federal court data.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}>
              {AI_CAPABILITIES.map((cap) => (
                <div
                  key={cap.title}
                  style={{
                    padding: 28,
                    background: 'var(--color-surface-1)',
                    borderRadius: 12,
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <div style={{
                    fontSize: 32,
                    marginBottom: 16,
                  }}>
                    {cap.icon}
                  </div>
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: 8,
                    margin: 0,
                  }}>
                    {cap.title}
                  </h4>
                  <p style={{
                    fontSize: 14,
                    color: '#6B7280',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-1)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                The Tools: Organized by Role
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                Specialized toolsets for researchers, attorneys, paralegals, and calculators.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}>
              {TOOLS_BY_CATEGORY.map((group) => (
                <div
                  key={group.category}
                  style={{
                    padding: 28,
                    background: 'var(--color-surface-0)',
                    borderRadius: 12,
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <h4 style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    marginBottom: 16,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {group.category}
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                  }}>
                    {group.tools.map((tool) => (
                      <li
                        key={tool}
                        style={{
                          padding: '10px 0',
                          fontSize: 14,
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <span style={{
                          display: 'inline-block',
                          width: 6,
                          height: 6,
                          background: 'var(--accent-primary)',
                          borderRadius: '50%',
                        }} />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audiences Section */}
        <div style={{ padding: '80px 24px', background: 'var(--color-surface-0)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 60 }}>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}>
                Six Key Audiences
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6B7280',
                maxWidth: 600,
              }}>
                From solo practitioners to law students, MyCaseValue serves the entire legal ecosystem.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {AUDIENCES.map((audience) => (
                <div
                  key={audience.segment}
                  style={{
                    padding: 28,
                    background: 'var(--color-surface-1)',
                    borderRadius: 12,
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: 12,
                    margin: 0,
                  }}>
                    {audience.segment}
                  </h4>
                  <p style={{
                    fontSize: 14,
                    color: '#6B7280',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {audience.usecase}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: '80px 24px', background: 'var(--accent-primary)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--color-surface-0)',
              marginBottom: 16,
            }}>
              Join the Legal Intelligence Revolution
            </h2>
            <p style={{
              fontSize: 18,
              color: '#D1D5DB',
              marginBottom: 32,
              maxWidth: 600,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}>
              MyCaseValue is democratizing access to federal court data with AI-powered analytics, making sophisticated legal intelligence available to every attorney.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/sign-up" style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: 'var(--accent-primary)',
                color: 'var(--color-surface-0)',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: 16,
                transition: 'all 0.3s ease',
              }}
              >
                Start searching free
              </a>
              <a href="/contact" style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: 'transparent',
                color: 'var(--accent-primary)',
                border: '2px solid var(--accent-primary)',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: 16,
                transition: 'all 0.3s ease',
              }}>
                Enterprise Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
