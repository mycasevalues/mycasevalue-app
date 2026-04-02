'use client';

import { useState } from 'react';

// SSR-safe JSON-LD schema
const getJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://mycasevalues.com/pricing' },
      ],
    },
    {
      '@type': 'Product',
      name: 'MyCaseValue Pricing Plans',
      description: 'Federal court outcome data with transparent pricing tiers.',
      offers: [
        {
          '@type': 'Offer',
          name: 'FREE Plan',
          price: '0',
          priceCurrency: 'USD',
          url: 'https://mycasevalues.com/pricing',
          availability: 'https://schema.org/InStock',
          description: 'Basic court outcome report with essential case data.',
        },
        {
          '@type': 'Offer',
          name: 'Single Report',
          price: '5.99',
          priceCurrency: 'USD',
          url: 'https://mycasevalues.com/pricing',
          availability: 'https://schema.org/InStock',
          description: 'One premium report with judge data and detailed analysis.',
        },
        {
          '@type': 'Offer',
          name: 'Unlimited Reports',
          price: '9.99',
          priceCurrency: 'USD',
          url: 'https://mycasevalues.com/pricing',
          availability: 'https://schema.org/InStock',
          description: 'Unlimited reports for all case types and districts.',
        },
      ],
    },
  ],
});

const pricingFaqs = [
  {
    q: 'Can I get a refund?',
    a: 'Yes. If you purchase a report and are not satisfied, you can request a refund within 30 days. We want you to be confident in our data.',
  },
  {
    q: 'Is this legal advice?',
    a: 'No. MyCaseValue provides aggregate historical data from public federal court records only. It is not legal advice, and no attorney-client relationship is created. Always consult a licensed attorney.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, and Google Pay. All payments are processed securely through Stripe.',
  },
  {
    q: 'Can I upgrade from one plan to another?',
    a: 'Yes. If you purchase a Single Report and later want Unlimited Reports, we can apply your payment toward the upgrade. Contact support@mycasevalue.com for details.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. The FREE plan lets you generate one basic report without payment. Premium plans unlock unlimited access and advanced features.',
  },
  {
    q: 'What is included in each plan?',
    a: 'FREE: basic court data. Single Report: premium analysis with judge impact. Unlimited: all features plus comparison tools and priority support.',
  },
  {
    q: 'Do you offer educational or non-profit discounts?',
    a: 'Yes. We offer 50% off for verified non-profit organizations, law schools, and civil rights groups. Contact us at support@mycasevalue.com with proof of status.',
  },
];

interface PricingCardProps {
  name: string;
  monthlyPrice?: string;
  annualPrice?: string;
  badge?: string;
  isFeatured?: boolean;
  features: string[];
  ctaText: string;
  ctaPlan?: string;
  onCta: () => void;
}

function PricingCard({
  name,
  monthlyPrice,
  annualPrice,
  badge,
  isFeatured,
  features,
  ctaText,
  ctaPlan,
  onCta,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-card border transition-all duration-200 ${
        isFeatured ? 'md:scale-105 shadow-card-elevated' : 'shadow-card hover:shadow-card-hover'
      }`}
      style={{
        borderColor: isFeatured ? 'var(--accent-primary)' : 'var(--border-default)',
        background: 'var(--bg-surface)',
        borderWidth: isFeatured ? '2px' : '1px',
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase"
          style={{
            background: 'var(--accent-primary)',
            color: 'var(--fg-inverse)',
          }}
        >
          {badge}
        </div>
      )}

      {/* Content */}
      <div className={`p-8 flex flex-col h-full ${badge ? 'pt-10' : ''}`}>
        {/* Title & Price */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--fg-primary)', fontFamily: 'Montserrat' }}>
            {name}
          </h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span
              className="text-5xl font-bold"
              style={{ color: isFeatured ? 'var(--accent-primary)' : 'var(--fg-primary)', fontFamily: 'PT Mono' }}
            >
              {monthlyPrice || annualPrice || '0'}
            </span>
            {monthlyPrice && <span style={{ color: 'var(--fg-muted)' }}>USD</span>}
          </div>
          {monthlyPrice && annualPrice && (
            <div className="text-xs mt-2 space-y-1">
              <p style={{ color: 'var(--fg-muted)' }}>
                Monthly <span style={{ textDecoration: 'line-through', color: 'var(--fg-subtle)' }}>${monthlyPrice}</span>
              </p>
              <p style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>
                Annual ${annualPrice} (save 20%)
              </p>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isFeatured ? 'var(--accent-primary)' : 'var(--success)'}
                strokeWidth="2.5"
                className="flex-shrink-0 mt-0.5"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={onCta}
          className={`w-full px-6 py-3 rounded-full text-sm font-semibold transition-all ${
            isFeatured
              ? 'hover:opacity-90'
              : 'border hover:bg-gray-50'
          }`}
          style={
            isFeatured
              ? {
                  background: 'var(--accent-primary)',
                  color: 'var(--fg-inverse)',
                }
              : {
                  borderColor: 'var(--border-default)',
                  color: 'var(--fg-primary)',
                }
          }
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to initiate checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    window.location.href = '/odds';
  };

  return (
    <div style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }}
      />

      {/* Header */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}
      >
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-70"
            style={{ color: 'var(--fg-primary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </a>

          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: 'var(--fg-primary)', fontFamily: 'Montserrat', letterSpacing: '-0.02em' }}
          >
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            Start free. Pay only for what you need. Federal court outcome data with no hidden fees or long-term commitments.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Pricing Cards */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              name="FREE"
              monthlyPrice="0"
              features={[
                'Basic court outcome report',
                'Case timeline data',
                'One report per month',
                'PACER-verified data',
                'Plain English summary',
              ]}
              ctaText="Get Started Free"
              onCta={handleGetStarted}
            />

            <PricingCard
              name="SINGLE REPORT"
              monthlyPrice="5.99"
              isFeatured={true}
              badge="MOST POPULAR"
              features={[
                'One complete premium report',
                'Judge impact analysis',
                'Case comparisons',
                'Recovery range estimates',
                'Export & share options',
                'Priority email support',
              ]}
              ctaText="Buy Report"
              ctaPlan="single"
              onCta={() => handleCheckout('single')}
            />

            <PricingCard
              name="UNLIMITED"
              monthlyPrice="9.99"
              features={[
                'Unlimited reports forever',
                'All case types & districts',
                'Judge analytics dashboard',
                'Cost estimator tool',
                'Comparison reports',
                'Priority support',
              ]}
              ctaText="Start Unlimited"
              ctaPlan="unlimited"
              onCta={() => handleCheckout('unlimited')}
            />
          </div>
        </div>

        {/* Included in All Plans */}
        <div
          className="rounded-card border p-8 text-center mb-20"
          style={{
            borderColor: 'var(--border-default)',
            background: 'var(--bg-elevated)',
          }}
        >
          <h3
            className="text-base font-semibold mb-4"
            style={{ color: 'var(--fg-primary)', fontFamily: 'Montserrat' }}
          >
            All plans include
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ color: 'var(--fg-secondary)' }}>PACER-verified data</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span style={{ color: 'var(--fg-secondary)' }}>WCAG AA accessible</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ color: 'var(--fg-secondary)' }}>Updated April 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span style={{ color: 'var(--fg-secondary)' }}>GDPR-ready</span>
            </div>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="mb-20">
          <h2
            className="text-2xl font-bold text-center mb-12"
            style={{ color: 'var(--fg-primary)', fontFamily: 'Montserrat' }}
          >
            Why trust MyCaseValue?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: 'lock', label: 'Encrypted', desc: 'Bank-grade SSL encryption' },
              { icon: 'scale', label: 'Court-verified', desc: 'PACER federal court data' },
              { icon: 'clock', label: 'Real-time', desc: 'Updated daily from courts' },
              { icon: 'shield', label: 'GDPR-ready', desc: 'Full data privacy compliance' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-card border"
                style={{
                  borderColor: 'var(--border-default)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div className="mb-3 flex justify-center">
                  {item.icon === 'lock' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  )}
                  {item.icon === 'scale' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                      <circle cx="12" cy="5" r="3" />
                      <line x1="12" y1="8" x2="12" y2="21" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                      <line x1="6" y1="18" x2="3" y2="12" />
                      <line x1="18" y1="18" x2="21" y2="12" />
                    </svg>
                  )}
                  {item.icon === 'clock' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                  {item.icon === 'shield' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--fg-primary)', fontFamily: 'Montserrat' }}>
                  {item.label}
                </h3>
                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2
            className="text-2xl font-bold text-center mb-12"
            style={{ color: 'var(--fg-primary)', fontFamily: 'Montserrat' }}
          >
            Frequently asked questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {pricingFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-5 rounded-card border cursor-pointer transition-colors"
                style={{
                  borderColor: 'var(--border-default)',
                  background: 'var(--bg-surface)',
                }}
              >
                <summary
                  className="flex items-start justify-between font-semibold select-none"
                  style={{ color: 'var(--fg-primary)' }}
                >
                  <span className="flex-1 text-sm leading-relaxed pr-4">
                    {faq.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="flex-shrink-0 transition-transform group-open:rotate-180"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          className="text-center p-10 rounded-card border"
          style={{
            borderColor: 'var(--border-default)',
            background: 'var(--bg-elevated)',
          }}
        >
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: 'var(--fg-primary)', fontFamily: 'Montserrat' }}
          >
            Ready to start?
          </h2>
          <p className="mb-8 max-w-xl mx-auto text-sm" style={{ color: 'var(--fg-muted)' }}>
            Get your first court outcome report free. Upgrade anytime if you need more. No credit card required.
          </p>
          <button
            onClick={handleGetStarted}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--fg-inverse)',
            }}
          >
            Get Your Free Report
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="border-t py-8 text-center"
        style={{
          borderColor: 'var(--border-default)',
          background: 'var(--bg-surface)',
        }}
      >
        <p className="text-xs max-w-2xl mx-auto px-6" style={{ color: 'var(--fg-muted)' }}>
          MyCaseValue provides federal court outcome data for informational purposes. Not legal advice. No attorney-client relationship.
          © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
