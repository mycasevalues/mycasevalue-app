'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PricingTier {
  id: string;
  name: string;
  bestFor: string;
  monthlyPrice: string;
  annualPrice: string | null;
  annualBilledAt: string | null;
  period: string;
  annualPeriod: string | null;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    bestFor: 'Self-represented litigants',
    monthlyPrice: '$0',
    annualPrice: null,
    annualBilledAt: null,
    period: 'during public beta',
    annualPeriod: null,
    description: 'Essential case data and win rate analysis.',
    features: [
      'Win rate percentage by case type + district',
      'Median settlement amount',
      'Median case duration',
      'Sample size with every data point',
      'All 94 federal district overviews',
      'All 84 case type pages',
      '3 lookups per day',
      'Preview: related regulations per case type',
    ],
    ctaText: 'Get Started Free',
    ctaHref: '/search',
  },
  {
    id: 'single_report',
    name: 'Single Report',
    bestFor: 'One specific case analysis',
    monthlyPrice: '$5.99',
    annualPrice: null,
    annualBilledAt: null,
    period: 'one-time',
    annualPeriod: null,
    description: 'Deep dive into one case with full settlement ranges and legal context.',
    features: [
      'One full case outcome report',
      'Full settlement range (10th\u201390th percentile)',
      'Confidence intervals',
      'Settlement calculator',
      'Judge district overview',
      'Top 3 relevant citations & regulations',
      'PDF export with legal landscape section',
      '90-day report access',
      'Email delivery (no account required)',
    ],
    ctaText: 'Buy Single Report',
    ctaHref: '/search',
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    bestFor: 'Ongoing case research',
    monthlyPrice: '$9.99',
    annualPrice: '$7.99',
    annualBilledAt: '$95.88',
    period: '/month',
    annualPeriod: '/mo',
    description: 'Unlimited lookups with legal research and trend analysis.',
    features: [
      'Unlimited case type + district lookups',
      'All 84 case types across all 94 districts',
      'Full settlement percentile ranges',
      '10-year trend data',
      'Legal document search (7 sources)',
      'Citation explorer access',
      'Related regulations on every case page',
      'Save unlimited reports (no expiry)',
      'Watchlist alerts (10 items)',
      'Judge profiles',
      'PDF exports without watermark',
      'English & Spanish',
    ],
    ctaText: 'Get Unlimited',
    ctaHref: '/sign-up',
    highlighted: true,
  },
  {
    id: 'attorney',
    name: 'Attorney Mode',
    bestFor: 'Legal professionals',
    monthlyPrice: '$29.99',
    annualPrice: '$23.99',
    annualBilledAt: '$287.88',
    period: '/month',
    annualPeriod: '/mo',
    description: 'Full legal intelligence suite for law firms.',
    features: [
      'Advanced judge intelligence (motion rates, bias patterns)',
      'AI case outcome predictor',
      'Full legal research hub (127K+ documents)',
      'Citation network analysis & export',
      'Regulatory alerts (Federal Register monitoring)',
      'Opposing counsel citation patterns',
      'Document intelligence (upload complaints/motions)',
      'Venue selection optimizer (94 districts ranked)',
      'Bulk analysis (up to 1,000 cases via CSV)',
      'Full API access (case data + legal docs)',
      'Team workspace (5 seats included)',
      'Citation-backed PDF reports',
      'Daily data refresh across all 7 sources',
      'Priority support (24-hour response)',
      'toolsDetail',
    ],
    ctaText: 'Try Attorney Mode',
    ctaHref: '/attorney',
  },
];

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <style>{`
        .billing-toggle {
          display: inline-flex;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--bdr);
          margin-bottom: 2.5rem;
        }
        .billing-toggle-btn {
          padding: 8px 20px;
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 150ms ease, color 150ms ease;
          letter-spacing: -0.005em;
        }
        .billing-toggle-btn.active {
          background: var(--chrome-bg);
          color: #fff;
        }
        .billing-toggle-btn.inactive {
          background: var(--card);
          color: var(--text2, #6B6B60);
        }
        .billing-toggle-btn.inactive:hover {
          background: var(--surface-warm, #FAF3E6);
        }
        .annual-subtext {
          display: block;
          font-family: var(--font-ui);
          font-size: 0.75rem;
          color: var(--text3, #4A4940);
          margin-top: 2px;
        }
        .most-popular-badge {
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold, #C4882A);
          color: #fff;
          padding: 2px 8px;
          border-radius: 3px;
          font-family: var(--font-ui);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
          z-index: 1;
        }
      `}</style>

      {/* Billing Toggle */}
      <div style={{ textAlign: 'center' }}>
        <div className="billing-toggle">
          <button
            type="button"
            className={`billing-toggle-btn ${!isAnnual ? 'active' : 'inactive'}`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`billing-toggle-btn ${isAnnual ? 'active' : 'inactive'}`}
            onClick={() => setIsAnnual(true)}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-grid">
        {tiers.map((tier) => {
          const showAnnual = isAnnual && tier.annualPrice !== null;
          const displayPrice = showAnnual ? tier.annualPrice : tier.monthlyPrice;
          const displayPeriod = showAnnual ? tier.annualPeriod : tier.period;

          return (
            <div key={tier.id} className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}>
              {tier.highlighted && (
                <span className="most-popular-badge">Most Popular</span>
              )}
              <h2 className="card-name">{tier.name}</h2>
              <p className="card-best-for">Best for {tier.bestFor.toLowerCase()}</p>
              <div className="card-price">{displayPrice}</div>
              <p className="card-period">{displayPeriod}</p>
              {showAnnual && tier.annualBilledAt && (
                <p className="annual-subtext">Billed annually at {tier.annualBilledAt}</p>
              )}
              <p className="card-description">{tier.description}</p>
              <div className="card-features">
                <ul>
                  {tier.features.map((feature, idx) => {
                    if (feature === 'toolsDetail') {
                      return (
                        <li key={idx} style={{ display: 'block', padding: '1rem 0', marginTop: '1rem', borderTop: '1px solid var(--bdr)' }}>
                          <div style={{ marginBottom: '0.75rem', fontWeight: 600, color: 'var(--text1)' }}>Key Tools Included:</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8125rem' }}>
                            <Link href="/attorney/case-predictor" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                              • AI Case Predictor
                            </Link>
                            <Link href="/attorney/advanced-search" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                              • Advanced Search
                            </Link>
                            <Link href="/attorney/citation-check" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                              • Citation Check
                            </Link>
                            <Link href="/attorney/judge-intelligence" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                              • Judge Intelligence
                            </Link>
                            <Link href="/attorney/state-survey" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                              • 50-State Survey
                            </Link>
                            <Link href="/attorney/document-intelligence" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                              • Document Intelligence
                            </Link>
                            <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                              <Link href="/attorney" style={{ color: 'var(--link)', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600 }}>
                                + 29 more tools →
                              </Link>
                            </div>
                          </div>
                        </li>
                      );
                    }
                    return <li key={idx}>{feature}</li>;
                  })}
                </ul>
              </div>
              <Link href={tier.ctaHref} className="card-cta">
                {tier.ctaText}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
