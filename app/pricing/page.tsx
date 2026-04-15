import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Pricing Built for Every Budget',
  description: 'Transparent pricing for federal court intelligence. Free tier, $5.99 single reports, $9.99/mo unlimited, $29.99/mo attorney mode. No hidden fees.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
        title: 'Pricing Built for Every Budget \u2014 MyCaseValue',
    description: 'Transparent pricing for federal court intelligence. Free tier, $5.99 single reports, $9.99/mo unlimited, $29.99/mo attorney mode.',
    type: 'website',
    url: `${SITE_URL}/pricing`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
        title: 'Pricing Built for Every Budget \u2014 MyCaseValue',
    description: 'Transparent pricing for federal court intelligence. Free, $5.99, $9.99/mo, $29.99/mo.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE_URL}/pricing` },
      ],
    },
    {
      '@type': 'Product',
      name: 'MyCaseValue Pricing Plans',
      description: 'Federal court outcome data with transparent pricing tiers.',
      offers: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'Basic court outcome report with essential case data.' },
        { '@type': 'Offer', name: 'Single Report', price: '5.99', priceCurrency: 'USD', url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'One premium report with judge data and detailed analysis.' },
        { '@type': 'Offer', name: 'Unlimited Reports', price: '9.99', priceCurrency: 'USD', url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'Unlimited reports for all case types and districts.' },
        { '@type': 'Offer', name: 'Attorney Mode', price: '29.99', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' }, url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'Professional attorney tools with bulk analysis and API access.' },
      ],
    },
  ],
};

interface PricingTier {
  id: string;
  name: string;
  bestFor: string;
  price: string;
  period: string;
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
    price: '$0',
    period: 'during beta',
    description: 'Essential case data and win rate analysis.',
    features: [
      'Win rate percentage by case type + district',
      'Median settlement amount',
      'Median case duration',
      'Sample size with every data point',
      'All 95 federal district overviews',
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
    price: '$5.99',
    period: 'one-time',
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
    price: '$9.99',
    period: '/month',
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
    price: '$29.99',
    period: '/month',
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
    ],
    ctaText: 'Try Attorney Mode',
    ctaHref: '/attorney',
  },
];

const faqItems = [
  {
    q: 'What does "Single Report" mean exactly?',
    a: 'You select one case type and one federal district. We generate a complete outcome report for that specific combination. You have 90 days of access to view and download the PDF. No subscription, no recurring charge.',
  },
  {
    q: 'Can I upgrade from Single Report to Unlimited later?',
    a: "Yes. If you upgrade within your 90-day access window, we'll credit the report purchase price toward your first month of Unlimited Reports.",
  },
  {
    q: 'Where does MyCaseValue data come from?',
    a: 'Case outcome data comes from three public federal court record sources: the FJC Integrated Database, PACER, and CourtListener. Our legal research hub additionally indexes 7 authoritative sources including the Federal Register, eCFR, SEC EDGAR, Harvard Caselaw Access, CanLII, and GovInfo â over 127,000 legal documents and growing.',
  },
  {
    q: 'How current is the data?',
    a: 'Free tier data is refreshed monthly. Unlimited data is refreshed weekly. Attorney Mode data is refreshed daily, providing the most current federal court information.',
  },
  {
    q: 'Is MyCaseValue legal advice?',
    a: 'No. MyCaseValue provides legal data for informational and research purposes only. Nothing on this platform constitutes legal advice or creates an attorney-client relationship. Always consult a licensed attorney.',
  },
  {
    q: 'Does my research activity stay private?',
    a: 'Yes. We do not sell, share, or expose any search data. What you research on MyCaseValue stays between you and the public federal court records.',
  },
  {
    q: 'Does Attorney Mode work for both plaintiffs and defense?',
    a: 'Yes. All analyticsâwin rates, settlement ranges, judge intelligence, and the AI predictorâpresent data neutrally. You can filter by party position in most tools.',
  },
  {
    q: 'What is the refund policy?',
    a: 'Single Report purchases are refundable within 24 hours if the report has not been downloaded. Subscription plans (Unlimited and Attorney Mode) can be cancelled anytime with no partial-month refunds.',
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
      <style>{`
        .pricing-header {
          background: var(--accent-primary);
          color: var(--color-text-inverse);
          padding: 3rem 1.5rem;
          text-align: center;
        }

        .pricing-h1 {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 600;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: var(--color-text-inverse);
        }

        .pricing-subtitle {
          font-family: var(--font-inter);
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          max-width: 42rem;
          margin: 0 auto 1.5rem;
        }

        .pricing-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
          }
        }

        .pricing-card {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-default);
          background: var(--color-surface-0);
          transition: all 0.3s ease;
          position: relative;
        }

        .pricing-card.highlighted {
          border: 2px solid var(--accent-primary);
          box-shadow: 0 8px 32px rgba(9, 102, 195, 0.15);
          transform: scale(1.02);
        }

        .pricing-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .pricing-card.highlighted:hover {
          box-shadow: 0 12px 40px rgba(9, 102, 195, 0.2);
        }

        .card-name {
          font-family: var(--font-inter);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
        }

        .card-best-for {
          font-family: var(--font-inter);
          font-size: 0.875rem;
          color: var(--accent-primary);
          font-weight: 500;
          margin-bottom: 1.25rem;
        }

        .card-price {
          font-family: var(--font-inter);
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--accent-primary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .card-period {
          font-family: var(--font-inter);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
        }

        .card-description {
          font-family: var(--font-inter);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .card-features {
          flex: 1;
          margin-bottom: 1.5rem;
        }

        .card-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card-features li {
          font-family: var(--font-inter);
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          padding: 0.5rem 0;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .card-features li::before {
          content: '\\2713';
          color: var(--accent-primary);
          font-weight: 600;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-family: var(--font-inter);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          width: 100%;
          text-align: center;
          background: var(--accent-primary);
          color: var(--color-text-inverse);
          border: none;
          cursor: pointer;
        }

        .card-cta:hover {
          background: var(--accent-primary-hover);
          transform: translateY(-2px);
        }

        .callout-section {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          margin-bottom: 4rem;
          max-width: 56rem;
          margin-left: auto;
          margin-right: auto;
        }

        .callout-text {
          font-family: var(--font-inter);
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          text-align: center;
        }

        .faq-section {
          max-width: 56rem;
          margin-left: auto;
          margin-right: auto;
        }

        .faq-heading {
          font-family: var(--font-inter);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 2rem;
          text-align: center;
        }

        .faq-item {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .faq-question {
          font-family: var(--font-inter);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 0.75rem;
        }

        .faq-answer {
          font-family: var(--font-inter);
          font-size: 0.9375rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        .breadcrumb-wrapper {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1.5rem 1.5rem 0;
          font-family: var(--font-inter);
        }

        @media (max-width: 640px) {
          .pricing-h1 {
            font-size: 1.75rem;
          }

          .pricing-subtitle {
            font-size: 1rem;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.highlighted {
            transform: scale(1);
          }

          .pricing-container {
            padding: 2rem 1rem;
          }

          .callout-section {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />
      </div>

      {/* Header */}
      <div className="pricing-header">
        <h1 className="pricing-h1">Pricing Built for Every Budget</h1>
        <p className="pricing-subtitle">
          Case outcomes, legal research, and analytics shouldn&apos;t cost what a junior associate earns. Pick the plan that fits.
        </p>
      </div>

      {/* Main Content */}
      <div className="pricing-container">
        {/* Pricing Cards */}
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div key={tier.id} className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}>
              <h2 className="card-name">{tier.name}</h2>
              <p className="card-best-for">Best for {tier.bestFor.toLowerCase()}</p>
              <div className="card-price">{tier.price}</div>
              <p className="card-period">{tier.period}</p>
              <p className="card-description">{tier.description}</p>
              <div className="card-features">
                <ul>
                  {tier.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Link href={tier.ctaHref} className="card-cta">
                {tier.ctaText}
              </Link>
            </div>
          ))}
        </div>

        {/* Callout Section */}
        <div className="callout-section">
          <p className="callout-text">
            Professional litigation analytics have historically been priced for large firm budgets. We built MyCaseValue for everyone else.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          {faqItems.map((item, idx) => (
            <div key={idx} className="faq-item">
              <h3 className="faq-question">{item.q}</h3>
              <p className="faq-answer">{item.a}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            Have other questions about pricing or features?
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              fontWeight: '600',
              textDecoration: 'none',
              background: 'var(--accent-primary)',
              color: 'var(--color-text-inverse)',
              transition: 'all 0.3s ease',
            }}
            className="hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
