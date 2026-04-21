import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import JsonLd from '../../components/JsonLd';
import PricingCards from '../../components/PricingCards';
import TrustSignals from '../../components/TrustSignals';

export const metadata: Metadata = {
  title: 'Pricing — Federal Court Intelligence Plans',
  description: 'Transparent pricing for federal court intelligence. Free, $5.99 single reports, $9.99/mo, $29.99/mo attorney mode. Start free, no card required.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
        title: 'Pricing Built for Every Budget \u2014 MyCaseValue',
    description: 'Transparent pricing for federal court intelligence. Free tier, $5.99 single reports, $9.99/mo unlimited, $29.99/mo attorney mode.',
    type: 'website',
    url: `${SITE_URL}/pricing`,
    images: [{ url: `${SITE_URL}/api/og?type=generic&title=${encodeURIComponent('Plans Starting at $0')}&subtitle=${encodeURIComponent('Transparent pricing for federal court intelligence')}`, width: 1200, height: 630, alt: 'MyCaseValue Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
        title: 'Pricing Built for Every Budget \u2014 MyCaseValue',
    description: 'Transparent pricing for federal court intelligence. Free, $5.99, $9.99/mo, $29.99/mo.',
    images: [`${SITE_URL}/api/og?type=generic&title=${encodeURIComponent('Plans Starting at $0')}&subtitle=${encodeURIComponent('Transparent pricing for federal court intelligence')}`],
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
        { '@type': 'Offer', name: 'Unlimited Reports (Monthly)', price: '9.99', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' }, url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'Unlimited reports for all case types and districts.' },
        { '@type': 'Offer', name: 'Unlimited Reports (Annual)', price: '95.88', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1Y', unitText: '$7.99/mo billed annually' }, url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'Unlimited reports for all case types and districts, billed annually.' },
        { '@type': 'Offer', name: 'Attorney Mode (Monthly)', price: '29.99', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' }, url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'Professional attorney tools with bulk analysis and API access.' },
        { '@type': 'Offer', name: 'Attorney Mode (Annual)', price: '287.88', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1Y', unitText: '$23.99/mo billed annually' }, url: `${SITE_URL}/pricing`, availability: 'https://schema.org/InStock', description: 'Professional attorney tools with bulk analysis and API access, billed annually.' },
      ],
    },
  ],
};


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
    a: 'Case outcome data comes from three public federal court record sources: the FJC Integrated Database, PACER, and CourtListener. Our legal research hub additionally indexes 7 authoritative sources including the Federal Register, eCFR, SEC EDGAR, Harvard Caselaw Access, CanLII, and GovInfo — over 127,000 legal documents and growing.',
  },
  {
    q: 'How current is the data?',
    a: 'Free tier data is refreshed monthly. Unlimited data is refreshed weekly. Attorney Mode data is refreshed daily, providing the most current federal court information.',
  },
  {
    q: 'Is MyCaseValue legal advice?',
    a: 'No. MyCaseValue provides legal data for informational and research purposes only. Nothing on this platform constitutes legal advice or creates an attorney-client relationship. Always consult a licensed attorney for legal guidance.',
  },
  {
    q: 'Does my research activity stay private?',
    a: 'Yes. We do not sell, share, or expose any search data. What you research on MyCaseValue stays between you and the public federal court records.',
  },
  {
    q: 'Does Attorney Mode work for both plaintiffs and defense?',
    a: 'Yes. All analytics—win rates, settlement ranges, judge intelligence, and the AI predictor—present data neutrally. You can filter by party position in most tools.',
  },
  {
    q: 'What is the refund policy?',
    a: 'Single Report purchases are refundable within 24 hours if the report has not been downloaded. Subscription plans (Unlimited and Attorney Mode) can be cancelled anytime with no partial-month refunds.',
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: 'var(--card)', minHeight: '100vh' }}>
      <style>{`
        .pricing-header {
          background: var(--surface-warm, #FAF3E6);
          color: var(--text-primary, #18181A);
          padding: 3rem 1.5rem 3.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--bdr);
        }
        .pricing-header > * { position: relative; }

        .pricing-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          margin-bottom: 16px;
          border-radius: 4px;
          border: 1px solid var(--bdr);
          background: var(--card);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--link, #C4882A);
        }
        .pricing-eyebrow-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--data-positive);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .pricing-h1 {
          font-family: var(--font-legal);
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 0.75rem;
          color: var(--text-primary, #18181A);
        }

        .pricing-subtitle {
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text3, #4A4940);
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
          padding: 1.75rem;
          border-radius: 4px;
          border: 1px solid var(--bdr);
          background: var(--card);
          transition: border-color 150ms ease, box-shadow 150ms ease;
          position: relative;
        }

        .pricing-card.highlighted {
          border: 2px solid var(--link, #C4882A);
          background: var(--card);
        }

        .pricing-card:hover {
          border-color: var(--chrome-bg);
          box-shadow: var(--shadow-sm);
        }

        .pricing-card.highlighted:hover {
          border-color: var(--link, #C4882A);
          box-shadow: var(--shadow-sm);
        }

        /* Tier name is the primary visual anchor for each pricing card.
           Was 1.0625rem / weight 600 — the eyebrow below (tracked uppercase gold)
           was reading louder than the name. Increased to 1.5rem / weight 700
           so the name reads first, eyebrow reads second. */
        .card-name {
          font-family: var(--font-ui);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--text1);
          margin-bottom: 0.375rem;
        }

        /* Eyebrow ("Best for …"). Softened from weight 600 / tracking 0.12em
           to weight 500 / 0.08em and reduced to 11px so the tier name above
           dominates the visual hierarchy. Gold color retained for brand. */
        .card-best-for {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--link, #C4882A);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }


        .card-price {
          font-family: var(--font-mono);
          font-size: 2.25rem;
          font-weight: 600;
          color: var(--text1);
          font-variant-numeric: tabular-nums;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .card-period {
          font-family: var(--font-ui);
          font-size: 0.875rem;
          color: var(--text2);
          margin-bottom: 1rem;
        }

        .card-description {
          font-family: var(--font-ui);
          font-size: 0.875rem;
          color: var(--text2);
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
          font-family: var(--font-ui);
          font-size: 0.875rem;
          color: var(--text2);
          padding: 0.5rem 0;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .card-features li::before {
          content: '\\2713';
          color: var(--link);
          font-weight: 600;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.005em;
          text-decoration: none;
          transition: background-color 120ms ease;
          width: 100%;
          text-align: center;
          background: var(--link, #C4882A);
          color: var(--card);
          border: none;
          cursor: pointer;
        }

        .card-cta:hover {
          background: var(--gold);
        }

        .callout-section {
          background: var(--surface-warm, #FAF3E6);
          border: 1px solid var(--bdr);
          border-radius: 4px;
          padding: 2.5rem;
          margin-bottom: 4rem;
          max-width: 56rem;
          margin-left: auto;
          margin-right: auto;
        }

        .callout-text {
          font-family: var(--font-ui);
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text2);
          text-align: center;
        }

        .faq-section {
          max-width: 56rem;
          margin-left: auto;
          margin-right: auto;
        }

        .faq-heading {
          font-family: var(--font-ui);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text1);
          margin-bottom: 2rem;
          text-align: center;
        }

        .faq-item {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 4px;
          padding: 1.5rem;
          margin-bottom: 16px;
        }

        .faq-question {
          font-family: var(--font-ui);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text1);
          margin-bottom: 0.75rem;
        }

        .faq-answer {
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          color: var(--text2);
          line-height: 1.7;
        }

        .breadcrumb-wrapper {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1.5rem 1.5rem 0;
          font-family: var(--font-ui);
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .pricing-card {
            padding: 1.25rem !important;
          }

          .pricing-header {
            padding: 2rem 1rem 2.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .pricing-h1 {
            font-size: 1.75rem;
          }

          .pricing-subtitle {
            font-size: 1rem;
          }

          .pricing-grid {
            grid-template-columns: 1fr !important;
          }

          .pricing-card {
            padding: 1.25rem !important;
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

      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />
      </div>

      {/* Header */}
      <div className="pricing-header">
        <div className="pricing-eyebrow">
          <span className="pricing-eyebrow-dot" />
          Pricing
        </div>
        <h1 className="pricing-h1">Enterprise intelligence. Non-enterprise pricing.</h1>
        <p className="pricing-subtitle">
          Federal court outcome analytics, AI case prediction, and litigation research. Transparent pricing, no long-term contracts.
        </p>
      </div>

      {/* Main Content */}
      <div className="pricing-container">
        {/* Trust Signals */}
        <div style={{ marginBottom: '2rem' }}>
          <TrustSignals />
        </div>

        {/* Pricing Cards with Billing Toggle */}
        <PricingCards />

        {/* Callout Section */}
        <div className="callout-section">
          <p className="callout-text">
            Outcome analytics, judge intelligence, and AI case prediction for solo practitioners, small firms, and litigation professionals.
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
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '1rem', color: 'var(--text2)', marginBottom: '1.5rem' }}>
            Have other questions about pricing or features?
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderRadius: '4px',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem',
              fontWeight: '600',
              textDecoration: 'none',
              background: 'var(--link, #C4882A)',
              color: 'var(--card)',
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
