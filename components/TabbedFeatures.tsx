'use client';

import React, { useState, useEffect } from 'react';

interface Feature {
  id: number;
  title: string;
  description: string;
  preview: React.ReactNode;
}

const TabbedFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [nextTab, setNextTab] = useState<number | null>(null);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate tabs every 6 seconds, pausing on hover
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const features: Feature[] = [
    {
      id: 1,
      title: 'Win Rate Analysis',
      description:
        'See plaintiff win rates broken down by case type, district, and time period. Understand your odds before filing.',
      preview: <WinRatePreview />,
    },
    {
      id: 2,
      title: 'Settlement Ranges',
      description:
        'Full settlement distributions from the 10th to 90th percentile, based on actual court records.',
      preview: <SettlementPreview />,
    },
    {
      id: 3,
      title: 'Judge Analytics',
      description:
        'Research judicial behavior patterns, motion grant rates, and case disposition tendencies.',
      preview: <JudgeAnalyticsPreview />,
    },
    {
      id: 4,
      title: 'Timeline Insights',
      description:
        'How long do cases take? See median disposition times by case type and district.',
      preview: <TimelinePreview />,
    },
    {
      id: 5,
      title: 'District Comparison',
      description:
        'Compare case outcomes across all 94 federal districts to identify favorable venues.',
      preview: <DistrictComparisonPreview />,
    },
    {
      id: 6,
      title: 'AI Predictions',
      description:
        'Machine learning models trained on 5.1M+ cases deliver data-driven outcome predictions.',
      preview: <AIPredictionsPreview />,
    },
  ];

  const currentFeature = features[activeTab];

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '80px 24px',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <p
            style={{
              fontSize: '11px',
              color: '#7C3AED',
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '0.08em',
              margin: '0 0 12px 0',
            }}
          >
            Legal Intelligence Features
          </p>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#212529',
              margin: 0,
              fontFamily: 'var(--font-display, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
            }}
          >
            Powered by real federal court data
          </h2>
        </div>

        {/* Main Content Grid */}
        <div
          className="tabbed-features-grid"
          style={{
            display: isMobile ? 'block' : 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '40% 60%',
            gap: isMobile ? '32px' : '48px',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Side - Feature Tabs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
            }}
          >
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                style={{
                  padding: '20px 24px',
                  backgroundColor: activeTab === index ? '#FFFFFF' : '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderBottom: activeTab === index ? 'none' : '1px solid #E5E7EB',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: index === 0 ? '1px solid #E5E7EB' : 'none',
                  position: 'relative',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== index) {
                    e.currentTarget.style.backgroundColor = '#F8F8F8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== index) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: activeTab === index ? '#7C3AED' : '#4B5563',
                    margin: '0 0 8px 0',
                    fontFamily: 'var(--font-display, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {feature.title}
                </div>
                {activeTab === index && (
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#4B5563',
                      margin: 0,
                      lineHeight: '1.5',
                      fontFamily: 'var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
                      animation: 'fadeInTab 0.3s ease-in',
                    }}
                  >
                    {feature.description}
                  </div>
                )}
                {/* Animated bottom border indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: activeTab === index ? '3px' : '0px',
                    backgroundColor: '#7C3AED',
                    transition: 'height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right Side - Preview Area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isMobile ? 'auto' : '500px',
            }}
          >
            <div
              key={activeTab}
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                padding: '40px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                animation: 'fadeInContent 0.4s ease-in 0.05s both',
                fontFamily: 'var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
              }}
            >
              {currentFeature.preview}
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeInTab {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInContent {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tabbed-features-grid button {
          font-family: inherit;
          outline: none;
        }

        .tabbed-features-grid button:focus-visible {
          outline: 2px solid #7C3AED;
          outline-offset: -2px;
        }

        .tabbed-features-grid button:first-child {
          border-radius: 2px 4px 0 0;
        }

        .tabbed-features-grid button:last-child {
          border-radius: 0 0 4px 4px;
          border-bottom: 1px solid #E5E7EB;
        }

        @media (max-width: 768px) {
          .tabbed-features-grid {
            grid-template-columns: 1fr !important;
          }

          .tabbed-features-grid button {
            border-radius: 2px !important;
            margin-bottom: 8px;
          }

          .tabbed-features-grid button:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
};

// Preview Components
const WinRatePreview: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', margin: '0 0 24px 0' }}>
      Win Rate by Case Type
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[
        { label: 'Contract Disputes', rate: 68 },
        { label: 'Patent Litigation', rate: 52 },
        { label: 'Employment Claims', rate: 45 },
        { label: 'Securities Cases', rate: 61 },
      ].map((item) => (
        <div key={item.label}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '13px',
            }}
          >
            <span style={{ color: '#212529', fontWeight: 500 }}>{item.label}</span>
            <span style={{ color: '#7C3AED', fontWeight: 600 }}>{item.rate}%</span>
          </div>
          <div
            style={{
              height: '8px',
              backgroundColor: '#F7F8FA',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: '#7C3AED',
                width: `${item.rate}%`,
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettlementPreview: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', margin: '0 0 24px 0' }}>
      Settlement Distribution
    </h3>
    <div
      className="tabbed-data-grid-5"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        gap: '12px',
      }}
    >
      {[
        { label: 'P10', amount: '$125K' },
        { label: 'P25', amount: '$245K' },
        { label: 'Median', amount: '$580K' },
        { label: 'P75', amount: '$1.2M' },
        { label: 'P90', amount: '$2.8M' },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            padding: '16px',
            backgroundColor: item.label === 'Median' ? '#F0F0F0' : '#FFFFFF',
            border: item.label === 'Median' ? '2px solid #7C3AED' : '1px solid #E5E7EB',
            borderRadius: '2px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '6px' }}>{item.label}</div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#212529',
            }}
          >
            {item.amount}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const JudgeAnalyticsPreview: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', margin: '0 0 8px 0' }}>
      Judge Profile
    </h3>
    <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 20px 0' }}>
      Hon. Judge Sarah Martinez, U.S. District Court - Northern District of California
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { label: 'Summary Judgment Grant Rate', value: '34%' },
        { label: 'Motion to Dismiss Success', value: '28%' },
        { label: 'Average Case Duration', value: '18 months' },
        { label: 'Settlement Rate', value: '62%' },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: '#F9F9F9',
            borderRadius: '2px',
          }}
        >
          <span style={{ fontSize: '13px', color: '#4B5563' }}>{item.label}</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const TimelinePreview: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', margin: '0 0 24px 0' }}>
      Median Disposition Time
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[
        { label: 'Contract Disputes', months: 14 },
        { label: 'Patent Litigation', months: 28 },
        { label: 'Employment Claims', months: 12 },
        { label: 'Securities Cases', months: 22 },
      ].map((item) => (
        <div key={item.label}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontSize: '13px',
            }}
          >
            <span style={{ color: '#212529', fontWeight: 500 }}>{item.label}</span>
            <span style={{ color: '#212529', fontWeight: 600 }}>{item.months}mo</span>
          </div>
          <div
            style={{
              height: '6px',
              backgroundColor: '#F7F8FA',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: '#4B5563',
                width: `${(item.months / 30) * 100}%`,
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DistrictComparisonPreview: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', margin: '0 0 20px 0' }}>
      Top Federal Districts
    </h3>
    <div
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        fontSize: '13px',
      }}
    >
      <div
        className="tabbed-data-grid-3"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0',
          borderBottom: '2px solid #E5E7EB',
          padding: '12px 0',
          fontWeight: 600,
          color: '#212529',
        }}
      >
        <div>District</div>
        <div>Cases</div>
        <div>Success Rate</div>
      </div>
      {[
        { district: 'S.D. New York', cases: 2847, rate: '56%' },
        { district: 'C.D. California', cases: 2156, rate: '52%' },
        { district: 'N.D. Illinois', cases: 1923, rate: '58%' },
        { district: 'D. Delaware', cases: 1654, rate: '61%' },
      ].map((item, idx) => (
        <div
          key={item.district}
          className="tabbed-data-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0',
            borderBottom: idx < 3 ? '1px solid #E5E7EB' : 'none',
            padding: '12px 0',
            color: '#4B5563',
          }}
        >
          <div style={{ fontWeight: 500, color: '#212529' }}>{item.district}</div>
          <div>{item.cases.toLocaleString()}</div>
          <div style={{ color: '#7C3AED', fontWeight: 600 }}>{item.rate}</div>
        </div>
      ))}
    </div>
  </div>
);

const AIPredictionsPreview: React.FC = () => (
  <div>
    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', margin: '0 0 24px 0' }}>
      Predicted Outcome
    </h3>
    <div
      style={{
        padding: '20px',
        backgroundColor: '#F0F0F0',
        borderRadius: '2px',
        marginBottom: '20px',
      }}
    >
      <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '8px' }}>
        Based on 5.1M+ case analysis
      </div>
      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#7C3AED',
          marginBottom: '8px',
        }}
      >
        68% Favorable
      </div>
      <div style={{ fontSize: '12px', color: '#212529' }}>
        Confidence Score: 82%
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '4px' }}>
        Probability Distribution:
      </div>
      {[
        { label: 'Plaintiff Victory', prob: 68 },
        { label: 'Settlement', prob: 22 },
        { label: 'Defendant Victory', prob: 10 },
      ].map((item) => (
        <div key={item.label}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              marginBottom: '4px',
            }}
          >
            <span>{item.label}</span>
            <span style={{ fontWeight: 600, color: '#212529' }}>{item.prob}%</span>
          </div>
          <div
            style={{
              height: '6px',
              backgroundColor: '#F7F8FA',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: item.prob > 50 ? '#7C3AED' : item.prob > 25 ? '#4B5563' : '#B0BEC5',
                width: `${item.prob}%`,
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TabbedFeatures;
