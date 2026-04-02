import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — MyCaseValue | Reports Starting at $5.99',
  description: 'Affordable federal court outcome reports. Choose from Single Report ($5.99), Unlimited Reports ($9.99), or Attorney Mode ($29.99/mo). All plans include source citations and bilingual support.',
  alternates: { canonical: 'https://mycasevalues.com/pricing' },
  openGraph: {
    title: 'Pricing — MyCaseValue | Federal Court Data Plans',
    description: 'Transparent, affordable pricing for federal court outcome data. Single reports, unlimited access, or attorney analytics dashboard.',
    type: 'website',
    url: 'https://mycasevalues.com/pricing',
  },
};

const jsonLd = {
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
      description: 'Federal court outcome data with three transparent pricing tiers.',
      offers: [
        {
          '@type': 'Offer',
          name: 'Single Report',
          price: '5.99',
          priceCurrency: 'USD',
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
          url: 'https://mycasevalues.com/pricing',
          availability: 'https://schema.org/InStock',
          description: 'One complete federal court outcome report with judge data and case analysis.',
        },
        {
          '@type': 'Offer',
          name: 'Unlimited Reports',
          price: '9.99',
          priceCurrency: 'USD',
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
          url: 'https://mycasevalues.com/pricing',
          availability: 'https://schema.org/InStock',
          description: 'Unlimited reports for all case types and districts with comparison tools.',
        },
        {
          '@type': 'Offer',
          name: 'Attorney Mode',
          price: '29.99',
          priceCurrency: 'USD',
          priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
          url: 'https://mycasevalues.com/pricing',
          availability: 'https://schema.org/InStock',
          description: 'Professional analytics dashboard with judge predictor, bulk queries, and white-label options.',
          billingIncrement: 'P1M',
        },
      ],
    },
  ],
};

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
    a: 'Yes. You can generate a free basic report without purchasing anything. Premium features require a one-time payment or monthly subscription.',
  },
  {
    q: 'What is included in "Attorney Mode"?',
    a: 'Attorney Mode includes unlimited reports, judge analytics dashboard, motion predictor, bulk query capability, brief export (PDF/DOCX), embeddable widgets, affiliate program access, and white-label options for firms.',
  },
  {
    q: 'Can I cancel my Attorney Mode subscription?',
    a: 'Yes, you can cancel anytime. Your subscription continues until the end of your billing cycle, then stops. No long-term commitment required.',
  },
  {
    q: 'Do you offer educational or non-profit discounts?',
    a: 'Yes. We offer 50% off for verified non-profit organizations, law schools, and civil rights groups. Contact us at support@mycasevalue.com with proof of status.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #131B2E 0%, #0B1221 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#4F46E5' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#4F46E5' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            PRICING
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            Access federal court outcome data starting at just $5.99. No hidden fees. No subscriptions required (unless you want unlimited access).
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Single Report Card */}
          <div className="rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
            style={{
              borderColor: 'var(--border-default)',
              background: 'rgba(25, 32, 56, 0.4)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Single Report
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#4F46E5', fontFamily: 'JetBrains Mono' }}>
                  $5.99
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  one-time
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                '1 full report with judge data',
                'Case timeline analysis',
                'Case comparisons',
                'Share card',
                'Plain English explanation',
                'Source citations',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a href="/odds"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#4F46E5', color: '#131B2E' }}>
              Get Report
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Unlimited Reports Card — Middle, Larger, Gold Border */}
          <div className="rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg md:scale-105 hover:shadow-amber-500/30"
            style={{
              borderColor: '#F59E0B',
              background: 'rgba(25, 32, 56, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
              BEST VALUE
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Unlimited Reports
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#F59E0B', fontFamily: 'JetBrains Mono' }}>
                  $9.99
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  one-time
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Everything in Single Report',
                'Unlimited reports for all case types & districts',
                'Compare tool',
                'Cost estimator',
                'Priority support',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a href="/odds"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#F59E0B', color: '#131B2E' }}>
              Get Unlimited
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Attorney Mode Card */}
          <div className="rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            style={{
              borderColor: 'var(--border-default)',
              background: 'rgba(25, 32, 56, 0.4)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Attorney Mode
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#8B5CF6', fontFamily: 'JetBrains Mono' }}>
                  $29.99
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  /month
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Everything in Unlimited',
                'Judge analytics dashboard',
                'Motion predictor',
                'Brief export (PDF/DOCX)',
                'Bulk queries',
                'Embeddable widgets',
                'Affiliate program',
                'White-label options',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a href="/odds"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#8B5CF6', color: 'white' }}>
              Start Attorney Mode
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

        </div>

        {/* Plan Notes */}
        <div className="text-center p-6 rounded-xl mb-12" style={{ background: '#131B2E', borderColor: 'var(--border-default)', border: '1px solid var(--border-default)' }}>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            All plans include source citations, bilingual support (English/Spanish), and a "not legal advice" disclaimer.
          </p>
        </div>

        {/* Pricing FAQ */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: 'var(--fg-primary)' }}>
            Pricing Questions
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {pricingFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-5 rounded-xl border transition-colors cursor-pointer"
                style={{
                  borderColor: 'var(--border-default)',
                  background: '#131B2E',
                }}
              >
                <summary className="flex items-start justify-between font-semibold select-none" style={{ color: 'var(--fg-primary)' }}>
                  <span className="flex-1 text-base leading-relaxed pr-4">
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
                    style={{ color: '#4F46E5', marginTop: '2px' }}
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, #131B2E 0%, #0F172A 100%)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Ready to see your case odds?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
            Generate your free basic report instantly, then upgrade to premium features if you want deeper analysis.
          </p>
          <a href="/odds"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#4F46E5', color: '#131B2E' }}>
            Check My Case Type
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>

      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-muted)' }}>
          MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only.
          We are not a law firm. This is not legal advice. No attorney-client relationship is created by using this tool.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
