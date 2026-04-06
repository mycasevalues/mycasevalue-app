'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

import { SITE_URL } from '../../lib/site-config';

const getJsonLd = () => ({
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
});

function getPlansByBillingPeriod(annual: boolean): PlanCard[] {
  return [
    {
      id: 'free',
      name: 'Free',
      tagline: 'For anyone researching a case',
      price: '$0',
      period: 'forever',
      description: 'Start your research with essential case data and win rate analysis.',
      sectionLabel: 'Includes:',
      features: [
        { text: 'Win rate percentage for any case + district', included: true },
        { text: 'Median settlement amount (national average)', included: true },
        { text: 'Median case duration', included: true },
        { text: 'Sample size with every data point', included: true },
        { text: 'All 94 district overview pages', included: true },
        { text: 'All 84 case type pages', included: true },
        { text: '3 free lookups per day', included: true },
        { text: 'Settlement range (full percentiles)', included: false },
        { text: 'Judge profiles', included: false },
        { text: 'PDF export', included: false },
      ],
      ctaText: 'Get Started Free',
      ctaSubtext: 'No account required',
    },
    {
      id: 'single_report',
      name: 'Single Report',
      tagline: 'For one specific case',
      price: '$5.99',
      period: 'one-time',
      description: 'Deep dive into a single case with full settlement ranges and judge data.',
      sectionLabel: 'Includes:',
      stripePlan: 'single',
      features: [
        { text: 'One full case outcome report (any case type + district)', included: true },
        { text: 'Full settlement range — 10th through 90th percentile', included: true },
        { text: 'Confidence intervals', included: true },
        { text: 'Settlement calculator — full results', included: true },
        { text: 'Basic judge overview for your district', included: true },
        { text: 'PDF export — clean, branded', included: true },
        { text: '90-day report access', included: true },
        { text: 'Email delivery — no account required', included: true },
        { text: 'Multiple reports', included: false },
        { text: 'Trend data (year-over-year)', included: false },
        { text: 'Saved reports library', included: false },
        { text: 'Judge intelligence profiles', included: false },
        { text: 'Attorney Mode features', included: false },
      ],
      ctaText: 'Buy a Report',
      ctaSubtext: 'Save and revisit for 90 days · No subscription',
    },
    {
      id: 'unlimited',
      name: 'Unlimited Reports',
      tagline: 'For ongoing case research',
      price: annual ? '$8.33' : '$9.99',
      period: annual ? '/mo (billed $99.99/yr)' : '/mo',
      description: 'Unlimited lookups across all case types and districts with trend analysis.',
      sectionLabel: 'Everything in Single Report, plus:',
      badge: 'MOST POPULAR',
      featured: true,
      stripePlan: 'unlimited',
      monthlyPrice: annual ? '$9.99' : undefined,
      features: [
        { text: 'Unlimited case type + district lookups', included: true },
        { text: 'All 84 case types · all 94 districts', included: true },
        { text: 'Full settlement percentile ranges', included: true },
        { text: 'Year-over-year trend data (10-year history)', included: true },
        { text: 'Compare up to 3 cases simultaneously', included: true },
        { text: 'Save unlimited reports — no expiry', included: true },
        { text: 'Search history (last 100 searches)', included: true },
        { text: 'Watchlist alerts for 10 districts or case types', included: true },
        { text: 'Standard judge profiles', included: true },
        { text: 'Clean PDF exports — no watermark', included: true },
        { text: 'Bilingual — English & Spanish', included: true },
        { text: 'Full account dashboard', included: true },
        { text: 'Advanced judge intelligence', included: false },
        { text: 'AI outcome predictor', included: false },
        { text: 'Opposing counsel research', included: false },
        { text: 'Attorney Mode features', included: false },
      ],
      ctaText: 'Start Unlimited',
      ctaSubtext: 'Cancel anytime',
    },
    {
      id: 'attorney',
      name: 'Attorney Mode',
      tagline: 'For legal professionals',
      price: annual ? '$24.99' : '$29.99',
      period: annual ? '/mo (billed $299.88/yr)' : '/mo',
      description: 'Advanced tools for law firms: AI predictions, bulk analysis, API access, and team collaboration.',
      sectionLabel: 'Everything in Unlimited Reports, plus:',
      stripePlan: 'attorney',
      monthlyPrice: annual ? '$29.99' : undefined,
      features: [
        { text: 'Advanced judge intelligence (motion rates, bias trends, behavioral patterns)', included: true },
        { text: 'AI case outcome predictor', included: true },
        { text: 'Opposing counsel research', included: true },
        { text: 'Document intelligence — upload any complaint or motion', included: true },
        { text: 'Venue selection optimizer (94 districts ranked)', included: true },
        { text: 'Case trajectory mapper', included: true },
        { text: 'Appeal probability scorer', included: true },
        { text: 'Motion success rate database', included: true },
        { text: 'Negotiation timing intelligence', included: true },
        { text: 'Expert witness tracker with Daubert risk scores', included: true },
        { text: 'Real-time PACER monitoring (up to 25 alerts)', included: true },
        { text: 'Class action intelligence', included: true },
        { text: 'Bulk analysis — up to 1,000 cases via CSV', included: true },
        { text: 'Full API access — unlimited calls', included: true },
        { text: 'Team workspace — 5 seats included', included: true },
        { text: 'White-label PDF reports — your firm\'s branding', included: true },
        { text: 'Custom dashboards — shareable with clients', included: true },
        { text: 'Daily data refresh (vs. weekly on Unlimited)', included: true },
        { text: 'Priority support — 24-hour response', included: true },
      ],
      ctaText: 'Start Attorney Mode',
      ctaSubtext: 'Cancel anytime · Team seats included',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'For legal departments & organizations',
      price: 'Custom',
      period: 'contact for pricing',
      description: 'Tailored solutions for large legal teams, insurance companies, litigation funders, and government agencies.',
      sectionLabel: 'Everything in Attorney Mode, plus:',
      features: [
        { text: 'Unlimited team seats', included: true },
        { text: 'SSO / SAML integration', included: true },
        { text: 'Custom API rate limits', included: true },
        { text: 'Bulk data exports (CSV, JSON, XML)', included: true },
        { text: 'Custom dashboards and reporting', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'SLA guarantee (99.9% uptime)', included: true },
        { text: 'White-label deployments', included: true },
        { text: 'Custom data integrations', included: true },
        { text: 'On-premises deployment option', included: true },
        { text: 'Training and onboarding', included: true },
        { text: 'Priority phone support', included: true },
      ],
      ctaText: 'Contact Sales',
      ctaSubtext: 'Custom pricing · Tailored onboarding',
    },
  ];
}

const pricingFaqs = [
  { q: 'What does "Single Report" mean exactly?', a: 'You select one case type and one district. We generate a complete outcome report for that specific combination. You have 90 days of access to view and download the PDF. No subscription, no recurring charge.' },
  { q: 'Can I upgrade from Single Report to Unlimited later?', a: "Yes. If you upgrade within your 90-day access window, we'll credit the report purchase price toward your first month of Unlimited Reports." },
  { q: "Where does MyCaseValue's data come from?", a: 'All data is derived from three public federal court record sources: the Federal Judicial Center Integrated Database (FJCID), PACER (Public Access to Court Electronic Records), and CourtListener. We do not create or estimate any data — we aggregate and analyze public court records only.' },
  { q: 'How current is the data?', a: 'Free and Single Report data is refreshed monthly. Unlimited Reports data is refreshed weekly. Attorney Mode data is refreshed daily.' },
  { q: 'Is this legal advice?', a: 'No. MyCaseValue provides legal data for informational and research purposes only. Nothing on this platform constitutes legal advice or creates an attorney-client relationship. Always consult a licensed attorney.' },
  { q: 'Does Attorney Mode work for both plaintiff and defense attorneys?', a: 'Yes. All analytics — win rates, settlement ranges, judge intelligence, and the AI predictor — present data neutrally. You can filter by party position in most tools.' },
  { q: 'Is my search activity private?', a: 'Yes. We do not sell, share, or expose any search data. What you research on MyCaseValue stays between you and the public court records.' },
  { q: 'Does MyCaseValue cover state courts?', a: 'Not currently. MyCaseValue covers all 94 federal judicial districts only. We focus exclusively on federal court records to ensure data accuracy and completeness.' },
  { q: 'Is there a Spanish language version?', a: 'Yes. Unlimited Reports and Attorney Mode include a full English/Spanish toggle. All UI, reports, and data labels are available in Spanish.' },
  { q: 'What is the refund policy?', a: 'Single Report purchases are refundable within 24 hours if the report has not been downloaded. Subscription plans (Unlimited and Attorney Mode) can be cancelled anytime. No partial-month refunds on monthly plans.' },
];

interface FeatureItem {
  text: string;
  included: boolean;
}

interface PlanCard {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  description: string;
  sectionLabel: string;
  features: FeatureItem[];
  ctaText: string;
  ctaSubtext: string;
  badge?: string;
  featured?: boolean;
  stripePlan?: 'single' | 'unlimited' | 'attorney';
  monthlyPrice?: string;
}

function PricingCard({
  plan,
  loadingPlan,
  onCheckout,
}: {
  plan: PlanCard;
  loadingPlan: string | null;
  onCheckout: (stripePlan: 'single' | 'unlimited' | 'attorney') => void;
}) {
  const f = plan.featured;
  const isLoading = loadingPlan === plan.stripePlan;
  const anyLoading = loadingPlan !== null;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '2px',
        border: '1px solid #D5D8DC',
        borderTop: f ? '4px solid #E8171F' : '1px solid #D5D8DC',
        background: '#FFFFFF',
        boxShadow: f ? '0 1px 3px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      {plan.badge && (
        <div
          style={{
            position: 'absolute',
            top: '-13px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '2px',
            padding: '4px 16px',
            background: '#E8171F',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
          }}
        >
          {plan.badge}
        </div>
      )}

      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingTop: plan.badge ? '32px' : '24px',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '4px',
            color: '#212529',
            fontFamily: 'var(--font-display)',
          }}
        >
          {plan.name}
        </h3>

        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            marginBottom: '20px',
            color: '#455A64',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: 'var(--font-body)',
          }}
        >
          {plan.tagline}
        </p>

        <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '48px',
              lineHeight: '1',
              fontWeight: 800,
              color: '#212529',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {plan.price}
          </span>
          {plan.monthlyPrice && (
            <span
              style={{
                fontSize: '14px',
                color: '#455A64',
                textDecoration: 'line-through',
                fontFamily: 'var(--font-body)',
              }}
            >
              {plan.monthlyPrice}
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: '14px',
            marginBottom: '24px',
            color: '#455A64',
            fontFamily: 'var(--font-body)',
          }}
        >
          {plan.period}
        </p>

        <p
          style={{
            fontSize: '13px',
            marginBottom: '24px',
            color: '#455A64',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.5',
          }}
        >
          {plan.description}
        </p>

        {/* CTA Button */}
        {plan.stripePlan ? (
          <button
            onClick={() => onCheckout(plan.stripePlan!)}
            disabled={loadingPlan === plan.stripePlan}
            style={{
              width: '100%',
              height: '48px',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '2px',
              border: 'none',
              background: f ? 'linear-gradient(to right, #d91b5a 0%, #dd2c00 100%)' : '#E8171F',
              color: '#FFFFFF',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-block',
              marginBottom: '8px',
              cursor: 'pointer',
              opacity: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
            className="pricing-cta-link"
          >
            {loadingPlan === plan.stripePlan ? 'Loading...' : plan.ctaText}
          </button>
        ) : (
          <Link
            href={plan.id === 'enterprise' ? '/contact' : '/search'}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '2px',
              border: plan.id === 'enterprise' ? '1.5px solid #D5D8DC' : 'none',
              background: plan.id === 'enterprise' ? 'transparent' : (f ? 'linear-gradient(to right, #d91b5a 0%, #dd2c00 100%)' : '#E8171F'),
              color: plan.id === 'enterprise' ? '#212529' : '#FFFFFF',
              textDecoration: 'none',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              marginBottom: '8px',
              cursor: 'pointer',
              opacity: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
            className={plan.id === 'enterprise' ? 'pricing-enterprise-link' : 'pricing-cta-link'}
          >
            {plan.ctaText}
          </Link>
        )}

        <p
          style={{
            fontSize: '12px',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#455A64',
            fontFamily: 'var(--font-body)',
          }}
        >
          {plan.ctaSubtext}
        </p>

        <div
          style={{
            marginBottom: '20px',
            height: '1px',
            background: '#D5D8DC',
          }}
        />

        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px',
            color: '#455A64',
            fontFamily: 'var(--font-body)',
          }}
        >
          {plan.sectionLabel}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flexGrow: 1,
          }}
        >
          {plan.features.map((feat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: '2px',
                  width: '14px',
                  textAlign: 'center',
                  fontSize: '14px',
                  lineHeight: '1',
                  color: feat.included ? '#E8171F' : '#C0C4C8',
                  fontWeight: feat.included ? 700 : 400,
                }}
              >
                {feat.included ? '✓' : '—'}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: feat.included ? '#212529' : '#C0C4C8',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {feat.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState('');
  const plans = getPlansByBillingPeriod(annual);

  async function handleCheckout(plan: 'single' | 'unlimited' | 'attorney') {
    setError('');
    setLoadingPlan(plan);
    try {
      // DEV MODE: All features unlocked — Stripe integration pending
      // When Stripe is re-added, this will create a checkout session
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        // Stripe not configured yet — redirect to sign-in as interim flow
        window.location.href = '/sign-in?plan=' + plan;
        return;
      }
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // Stripe not configured — redirect to sign-in as interim
      window.location.href = '/sign-in?plan=' + plan;
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div style={{ background: '#F5F6F7' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .pricing-cta-link:hover { background: #CC1019 !important; transform: translateY(-2px); box-shadow: none; }
        .pricing-enterprise-link:hover { opacity: 0.9 !important; }
      `}} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }}
      />

      {/* Header */}
      <div
        style={{
          background: '#00172E',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '64px',
            paddingBottom: '80px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(232, 23, 31, 0.1)',
              borderRadius: '2px',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#E8171F',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'var(--font-body)',
              }}
            >
              PRICING
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontWeight: '900',
              marginBottom: '16px',
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            Simple, transparent pricing.
          </h1>

          <p
            style={{
              fontSize: '18px',
              maxWidth: '448px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '32px',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-body)',
            }}
          >
            All features are currently free — no account required.
          </p>

          {/* Launch Banner */}
          <div style={{
            display: 'inline-block',
            background: '#07874A',
            color: '#FFFFFF',
            padding: '12px 32px',
            borderRadius: 2,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.02em',
          }}>
            🎉 LAUNCH SPECIAL — Everything is free. No limits.
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div style={{ borderBottom: '1px solid #D5D8DC', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: '1440px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '12px',
            paddingBottom: '12px',
          }}
        >
          <nav
            style={{
              fontSize: '14px',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
            }}
          >
            <Link href="/" style={{ color: '#006997', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px', color: '#455A64' }}>/</span>
            <span style={{ color: '#212529' }}>Pricing</span>
          </nav>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1344px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '64px',
        }}
      >
        {/* Billing Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              color: annual ? '#455A64' : '#212529',
              fontWeight: annual ? '400' : '500',
            }}
          >
            Monthly
          </span>

          <button
            onClick={() => setAnnual(!annual)}
            aria-label={`Switch to ${annual ? 'monthly' : 'annual'} billing`}
            style={{
              position: 'relative',
              width: '56px',
              height: '32px',
              borderRadius: '2px',
              border: 'none',
              background: annual ? '#E8171F' : '#D5D8DC',
              cursor: 'pointer',
              padding: '2px',
              transition: 'background 200ms ease',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: annual ? '26px' : '4px',
              paddingRight: annual ? '4px' : '26px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '2px',
                background: 'white',
                transition: 'all 200ms ease',
              }}
            />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                color: annual ? '#212529' : '#455A64',
                fontWeight: annual ? '500' : '400',
              }}
            >
              Annual
            </span>
            {annual && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '2px',
                  background: '#FFF3F4',
                  color: '#E8171F',
                  fontSize: '11px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.05em',
                }}
              >
                Save 16%
              </span>
            )}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto 24px',
              padding: '12px 16px',
              backgroundColor: '#FFF3F4',
              border: '1px solid #E8171F',
              borderRadius: '2px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#E8171F',
                margin: 0,
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '80px',
          }}
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              loadingPlan={loadingPlan}
              onCheckout={handleCheckout}
            />
          ))}
        </div>

        {/* Compare All Features Section */}
        <div
          style={{
            marginBottom: '80px',
            padding: '40px 24px',
            borderRadius: '2px',
            border: '1px solid #D5D8DC',
            background: '#FFFFFF',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '40px',
              color: '#212529',
              fontFamily: 'var(--font-display)',
            }}
          >
            Compare All Features
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-body)',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '16px',
                      borderBottom: '2px solid #D5D8DC',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#455A64',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      background: '#F8F9FA',
                    }}
                  >
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      style={{
                        textAlign: 'center',
                        padding: '16px',
                        borderBottom: '2px solid #D5D8DC',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#212529',
                        background: '#F8F9FA',
                      }}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans[0].features.map((feature, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #D5D8DC',
                    }}
                  >
                    <td
                      style={{
                        padding: '14px 16px',
                        fontSize: '14px',
                        color: '#212529',
                        fontWeight: '500',
                        textAlign: 'left',
                      }}
                    >
                      {feature.text}
                    </td>
                    {plans.map((plan) => {
                      const planFeature = plan.features[idx];
                      return (
                        <td
                          key={plan.id}
                          style={{
                            padding: '14px 16px',
                            textAlign: 'center',
                            borderLeft: '1px solid #D5D8DC',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '14px',
                              color: planFeature.included ? '#E8171F' : '#C0C4C8',
                              fontWeight: planFeature.included ? '700' : '400',
                            }}
                          >
                            {planFeature.included ? '✓' : '—'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: '13px',
            marginBottom: '48px',
            color: '#455A64',
            fontFamily: 'var(--font-body)',
          }}
        >
          All plans · PACER-verified data · WCAG AA accessible · No case data stored · Cancel subscriptions anytime
        </p>

        {/* Trust Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '80px',
          }}
        >
          {[
            {
              icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
              label: 'Encrypted',
              desc: 'Bank-grade SSL',
            },
            {
              icon: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z',
              label: 'Court-verified',
              desc: 'PACER data',
            },
            {
              icon: 'M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
              label: 'Updated regularly',
              desc: 'Daily to monthly',
            },
            {
              icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10',
              label: 'English & Spanish',
              desc: 'Full bilingual',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '24px',
                width: '200px',
                borderRadius: '2px',
                border: '1px solid #D5D8DC',
                background: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E8171F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.icon} />
                </svg>
              </div>
              <h3
                style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '4px',
                  color: '#212529',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {item.label}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: '#455A64',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: '80px' }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '48px',
              color: '#212529',
              fontFamily: 'var(--font-display)',
            }}
          >
            Frequently Asked Questions
          </h2>

          <div
            style={{
              maxWidth: '768px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {pricingFaqs.map((faq, idx) => (
              <details
                key={idx}
                style={{
                  padding: '20px',
                  borderRadius: '2px',
                  border: '1px solid #D5D8DC',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <summary
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    fontWeight: '600',
                    userSelect: 'none',
                    color: '#212529',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      fontSize: '14px',
                      lineHeight: '1.5',
                      paddingRight: '16px',
                    }}
                  >
                    {faq.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      flexShrink: 0,
                      transition: 'transform 200ms ease',
                      color: '#212529',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div
                  style={{
                    paddingTop: '16px',
                    marginTop: '16px',
                    borderTop: '1px solid #D5D8DC',
                  }}
                >
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#455A64',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            marginBottom: '64px',
            borderRadius: '2px',
            border: '1px solid #D5D8DC',
            background: '#FFFFFF',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              marginBottom: '16px',
              color: '#212529',
              fontFamily: 'var(--font-body)',
            }}
          >
            Need custom data access, more than 5 team seats, or a white-label integration?
          </p>
          <a
            href="mailto:enterprise@mycasevalue.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '12px',
              paddingBottom: '12px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '2px',
              border: 'none',
              background: '#E8171F',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'opacity 200ms ease',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
            className="pricing-enterprise-link"
          >
            Talk to Us{' '}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>


    </div>
  );
}
