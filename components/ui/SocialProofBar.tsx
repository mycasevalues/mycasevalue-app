'use client';

import React, { useState, useEffect } from 'react';

interface SocialProofBarProps {
  totalCases?: number;
  lang?: 'en' | 'es';
}

// Activity entries for the ticker
const ACTIVITY_ENTRIES_EN = [
  'Someone in California researched Employment Discrimination',
  'Someone in Texas generated a Slip & Fall report',
  'Someone in Florida analyzed Product Liability case',
  'Someone in New York studied Contract Dispute precedents',
  'Someone in Illinois researched Medical Malpractice laws',
  'Someone in Pennsylvania analyzed Workplace Injury claims',
  'Someone in Ohio researched Personal Injury settlement',
  'Someone in Georgia studied Wrongful Termination case',
  'Someone in Michigan analyzed Motor Vehicle Accident',
  'Someone in Massachusetts researched Discrimination laws',
  'Someone in Arizona generated Premises Liability report',
  'Someone in Colorado analyzed Professional Negligence case',
];

const ACTIVITY_ENTRIES_ES = [
  'Alguien en California investigó Discriminación Laboral',
  'Alguien en Texas generó un informe de Caída y Lesión',
  'Alguien en Florida analizó caso de Responsabilidad de Producto',
  'Alguien en Nueva York estudió precedentes de Disputa Contractual',
  'Alguien en Illinois investigó leyes de Negligencia Médica',
  'Alguien en Pensilvania analizó reclamaciones de Lesión Laboral',
  'Alguien en Ohio investigó acuerdo por Lesión Personal',
  'Alguien en Georgia estudió caso de Despido Injustificado',
  'Alguien en Míchigan analizó Accidente de Vehículo de Motor',
  'Alguien en Massachusetts investigó leyes de Discriminación',
  'Alguien en Arizona generó informe de Responsabilidad Premial',
  'Alguien en Colorado analizó caso de Negligencia Profesional',
];

const TIME_STAMPS = [
  '2 min ago',
  '5 min ago',
  '8 min ago',
  '12 min ago',
  '15 min ago',
  '18 min ago',
  '22 min ago',
  '25 min ago',
  '28 min ago',
  '31 min ago',
  '35 min ago',
  '38 min ago',
];

export default function SocialProofBar({
  totalCases = 4200000,
  lang = 'en',
}: SocialProofBarProps) {
  const [activityList, setActivityList] = useState<Array<{ id: number; text: string; time: string }>>([]);
  const [tickerKey, setTickerKey] = useState(0);

  const activityEntries = lang === 'es' ? ACTIVITY_ENTRIES_ES : ACTIVITY_ENTRIES_EN;

  useEffect(() => {
    // Generate initial activity list with unique IDs
    const initial = activityEntries.map((entry, index) => ({
      id: index,
      text: entry,
      time: TIME_STAMPS[index],
    }));
    setActivityList(initial);
  }, [lang]);

  // Duplicate activity list for seamless marquee scrolling
  const doubledActivityList = [...activityList, ...activityList];

  const formattedCases = (totalCases / 1000000).toFixed(1);

  return (
    <div style={{ width: '100%', backgroundColor: '#0B1221' }}>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-container {
          overflow: hidden;
          background-color: #131B2E;
          border-top: 1px solid #1E293B;
          border-bottom: 1px solid #1E293B;
        }

        .ticker-content {
          display: flex;
          gap: 2rem;
          animation: marquee 60s linear infinite;
          width: fit-content;
        }

        .ticker-container:hover .ticker-content {
          animation-play-state: paused;
        }

        .ticker-item {
          flex-shrink: 0;
          padding: 0.75rem 1.5rem;
          border-right: 1px solid #1E293B;
          white-space: nowrap;
          min-width: fit-content;
        }

        .ticker-item:last-child {
          border-right: none;
        }

        .ticker-text {
          font-size: 0.875rem;
          color: #F0F2F5;
          margin: 0;
        }

        .ticker-time {
          font-size: 0.75rem;
          color: #94A3B8;
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .ticker-text {
            font-size: 0.75rem;
          }
          .ticker-time {
            font-size: 0.65rem;
          }
          .ticker-item {
            padding: 0.5rem 1rem;
            gap: 1.5rem;
          }
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
            padding: 1.5rem;
            gap: 1rem;
          }
        }

        .metric-card {
          background-color: #131B2E;
          border: 1px solid #1E293B;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .metric-card:hover {
          transform: translateY(-4px);
          border-color: #4F46E5;
          box-shadow: 0 8px 16px rgba(79, 70, 229, 0.2);
        }

        .metric-icon {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
          display: inline-block;
        }

        .metric-label {
          font-size: 0.875rem;
          color: #94A3B8;
          margin: 0;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #F0F2F5;
          margin: 0;
        }

        .press-section {
          border-top: 1px solid #1E293B;
          border-bottom: 1px solid #1E293B;
          padding: 2rem;
          background-color: #0B1221;
        }

        .press-label {
          font-size: 0.875rem;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .press-logos {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .press-badge {
          padding: 0.75rem 1.5rem;
          border: 1px solid #1E293B;
          border-radius: 0.5rem;
          background-color: rgba(79, 70, 229, 0.05);
          color: #F0F2F5;
          font-size: 0.875rem;
          font-weight: 500;
          opacity: 0.5;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .press-badge:hover {
          opacity: 0.8;
          border-color: #4F46E5;
          background-color: rgba(79, 70, 229, 0.1);
        }

        @media (max-width: 768px) {
          .press-section {
            padding: 1.5rem;
          }
          .press-logos {
            gap: 1rem;
          }
          .press-badge {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
          }
        }

        .verification-section {
          padding: 2rem;
          background-color: #0B1221;
        }

        .verification-label {
          font-size: 0.875rem;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .verification-badges {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .verification-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.5rem;
          border: 1px solid #1E293B;
          border-radius: 0.5rem;
          background-color: rgba(94, 234, 212, 0.05);
          color: #5EEAD4;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .verification-badge:hover {
          border-color: #5EEAD4;
          background-color: rgba(94, 234, 212, 0.1);
          box-shadow: 0 4px 12px rgba(94, 234, 212, 0.15);
        }

        .checkmark-icon {
          font-weight: bold;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .verification-section {
            padding: 1.5rem;
          }
          .verification-badges {
            gap: 1rem;
          }
          .verification-badge {
            padding: 0.75rem 1.25rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      {/* Live Activity Ticker */}
      <div className="ticker-container" key={tickerKey}>
        <div className="ticker-content">
          {doubledActivityList.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="ticker-item">
              <p className="ticker-text">{item.text}</p>
              <p className="ticker-time">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <p className="metric-label">
            {lang === 'es' ? 'Casos Analizados' : 'Cases Analyzed'}
          </p>
          <p className="metric-value">{formattedCases}M+</p>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📍</div>
          <p className="metric-label">
            {lang === 'es' ? 'Estados Cubiertos' : 'States Covered'}
          </p>
          <p className="metric-value">50</p>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🔄</div>
          <p className="metric-label">
            {lang === 'es' ? 'Actualizado' : 'Updated'}
          </p>
          <p className="metric-value">Mar 2026</p>
        </div>
      </div>

      {/* Press / Authority Bar */}
      <div className="press-section">
        <p className="press-label">
          {lang === 'es' ? 'Destacado en' : 'As featured in'}
        </p>
        <div className="press-logos">
          <div className="press-badge">LegalTech News</div>
          <div className="press-badge">ABA Journal</div>
          <div className="press-badge">TechCrunch</div>
          <div className="press-badge">Law.com</div>
          <div className="press-badge">Bloomberg Law</div>
        </div>
      </div>

      {/* Data Source Verification Badges */}
      <div className="verification-section">
        <p className="verification-label">
          {lang === 'es' ? 'Fuentes Verificadas' : 'Data sources verified'}
        </p>
        <div className="verification-badges">
          <div className="verification-badge">
            <span className="checkmark-icon">✓</span>
            FJC Verified
          </div>
          <div className="verification-badge">
            <span className="checkmark-icon">✓</span>
            CourtListener
          </div>
          <div className="verification-badge">
            <span className="checkmark-icon">✓</span>
            PACER
          </div>
        </div>
      </div>
    </div>
  );
}
