'use client';

import { useState } from 'react';

const getJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.mycasevalues.com/pricing' },
      ],
    },
    {
      '@type': 'Product',
      name: 'MyCaseValue Pricing Plans',
      description: 'Federal court outcome data with transparent pricing tiers.',
      offers: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', url: 'https://www.mycasevalues.com/pricing', availability: 'https://schema.org/InStock', description: 'Basic court outcome report with essential case data.' },
        { '@type': 'Offer', name: 'Single Report', price: '5.99', priceCurrency: 'USD', url: 'https://www.mycasevalues.com/pricing', availability: 'https://schema.org/InStock', description: 'One premium report with judge data and detailed analysis.' },
        { '@type': 'Offer', name: 'Unlimited Reports', price: '9.99', priceCurrency: 'USD', url: 'https://www.mycasevalues.com/pricing', availability: 'https://schema.org/InStock', description: 'Unlimited reports for all case types and districts.' },
        { '@type': 'Offer', name: 'Attorney Mode', price: '29.99', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' }, url: 'https://www.mycasevalues.com/pricing', availability: 'https://schema.org/InStock', description: 'Professional attorney tools with bulk analysis and API access.' },
      ],
    },
  ],
});

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

interface FeatureItem { text: string; included: boolean; }

interface PlanCard {
  id: string; name: string; tagline: string; price: string; period: string;
  sectionLabel: string; features: FeatureItem[]; ctaText: string; ctaSubtext: string;
  ctaStyle: 'ghost' | 'primary' | 'accent'; badge?: string; badgeStyle?: 'accent' | 'primary';
  featured?: boolean;
}

const PLANS: PlanCard[] = [
  {
    id: 'free', name: 'Free', tagline: 'For anyone researching a case',
    price: '$0', period: 'forever', sectionLabel: 'Includes:',
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
    ctaText: 'Get Started Free', ctaSubtext: 'No account required', ctaStyle: 'ghost',
  },
  {
    id: 'single_report', name: 'Single Report', tagline: 'For one specific case',
    price: '$5.99', period: 'one-time', sectionLabel: 'Includes:',
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
    ctaText: 'Buy a Report', ctaSubtext: 'Access for 90 days · No subscription', ctaStyle: 'primary',
  },
  {
    id: 'unlimited', name: 'Unlimited Reports', tagline: 'For ongoing case research',
    price: '$9.99', period: '/mo', sectionLabel: 'Everything in Single Report, plus:',
    badge: 'BEST VALUE', badgeStyle: 'primary',
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
    ctaText: 'Start Unlimited', ctaSubtext: 'Cancel anytime', ctaStyle: 'accent',
  },
  {
    id: 'attorney', name: 'Attorney Mode', tagline: 'For legal professionals',
    price: '$29.99', period: '/mo', sectionLabel: 'Everything in Unlimited Reports, plus:',
    badge: 'MOST POPULAR', badgeStyle: 'accent', featured: true,
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
    ctaText: 'Start Attorney Mode', ctaSubtext: 'Cancel anytime · Team seats included', ctaStyle: 'primary',
  },
];

function Card({ plan, onCta }: { plan: PlanCard; onCta: (id: string) => void }) {
  const f = plan.featured;
  const ctaBg = plan.ctaStyle === 'primary' ? '#111111' : plan.ctaStyle === 'accent' ? '#8B5CF6' : 'transparent';
  const ctaColor = plan.ctaStyle === 'ghost' ? '#111827' : '#FFFFFF';
  const ctaBorder = plan.ctaStyle === 'ghost' ? '1px solid #E5E0D8' : 'none';

  return (
    <div className="relative flex flex-col h-full" style={{
      borderRadius: '12px', border: f ? '2px solid #8B5CF6' : '1px solid #E5E0D8', background: '#FFFFFF',
      boxShadow: f ? '0 32px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    }}>
      {plan.badge && (
        <div className="absolute text-[10px] font-semibold uppercase tracking-wider" style={{
          top: '-8px', right: f ? '-8px' : '50%', transform: f ? 'none' : 'translateX(50%)',
          borderRadius: '9999px', padding: '4px 12px',
          background: plan.badgeStyle === 'accent' ? '#8B5CF6' : '#111111', color: '#FFFFFF',
          fontFamily: 'Roboto, system-ui, sans-serif',
        }}>{plan.badge}</div>
      )}
      <div className={`p-6 flex flex-col h-full ${plan.badge ? 'pt-8' : ''}`}>
        <h3 className="text-xl font-black mb-1" style={{ color: '#111111', fontFamily: 'Montserrat, system-ui, sans-serif' }}>{plan.name}</h3>
        <p className="text-[13px] mb-5" style={{ color: '#6B7280', fontFamily: 'Roboto, system-ui, sans-serif' }}>{plan.tagline}</p>
        <div className="mb-1">
          <span className="text-[48px] leading-none font-extrabold" style={{ color: '#111111', fontFamily: 'Montserrat, system-ui, sans-serif' }}>{plan.price}</span>
        </div>
        <p className="text-sm mb-6" style={{ color: '#9CA3AF', fontFamily: 'Roboto, system-ui, sans-serif' }}>{plan.period}</p>
        <button type="button" onClick={() => onCta(plan.id)} className="w-full py-3 px-4 text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-px mb-2" style={{
          borderRadius: '9999px', background: ctaBg, color: ctaColor, border: ctaBorder, cursor: 'pointer', fontFamily: 'Roboto, system-ui, sans-serif',
        }}>{plan.ctaText}</button>
        <p className="text-xs text-center mb-6" style={{ color: '#9CA3AF', fontFamily: 'Roboto, system-ui, sans-serif' }}>{plan.ctaSubtext}</p>
        <div className="mb-5" style={{ height: '1px', background: '#E5E0D8' }} />
        <p className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: '#9CA3AF', fontFamily: 'Roboto, system-ui, sans-serif', letterSpacing: '0.08em' }}>{plan.sectionLabel}</p>
        <div className="space-y-3 flex-grow">
          {plan.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {feat.included ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" className="flex-shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5" /></svg>
              ) : (
                <span className="flex-shrink-0 mt-0.5 w-[14px] text-center text-sm leading-none" style={{ color: '#9CA3AF' }}>—</span>
              )}
              <span className="text-sm" style={{ color: feat.included ? '#111827' : '#9CA3AF', fontFamily: 'Roboto, system-ui, sans-serif' }}>{feat.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCta = async (planId: string) => {
    if (planId === 'free') { window.location.href = '/odds'; return; }
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: planId }) });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; } else { alert('Something went wrong on our end. Please try again in a moment.'); }
    } catch { alert('Something went wrong on our end. Please try again in a moment.'); } finally { setLoading(false); }
  };

  return (
    <div style={{ background: '#F9F8F6' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }} />

      {/* Header */}
      <div style={{ borderBottom: '1px solid #E5E0D8', background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 text-center">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-70" style={{ color: '#111827' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </a>
          <p className="text-[11px] font-semibold uppercase mb-4" style={{ color: '#8B5CF6', letterSpacing: '0.12em', fontFamily: 'Roboto, system-ui, sans-serif' }}>PRICING</p>
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: '#111111', fontFamily: 'Montserrat, system-ui, sans-serif', letterSpacing: '-0.02em' }}>Simple, transparent pricing.</h1>
          <p className="text-lg max-w-md mx-auto mb-8" style={{ color: '#6B7280', fontFamily: 'Roboto, system-ui, sans-serif' }}>Start free. Buy one report. Or go unlimited.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PLANS.map((plan) => <Card key={plan.id} plan={plan} onCta={handleCta} />)}
        </div>

        <p className="text-center text-[13px] mb-12" style={{ color: '#9CA3AF', fontFamily: 'Roboto, system-ui, sans-serif' }}>
          All plans · PACER-verified data · WCAG AA accessible · No case data stored · Cancel subscriptions anytime
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {[
            { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Encrypted', desc: 'Bank-grade SSL' },
            { icon: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z', label: 'Court-verified', desc: 'PACER data' },
            { icon: 'M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Updated regularly', desc: 'Daily to monthly' },
            { icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10', label: 'English & Spanish', desc: 'Full bilingual' },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 w-[200px]" style={{ borderRadius: '12px', border: '1px solid #E5E0D8', background: '#FFFFFF' }}>
              <div className="flex justify-center mb-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg></div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: '#111827', fontFamily: 'Montserrat, system-ui, sans-serif' }}>{item.label}</h3>
              <p className="text-xs" style={{ color: '#6B7280', fontFamily: 'Roboto, system-ui, sans-serif' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12" style={{ color: '#111827', fontFamily: 'Montserrat, system-ui, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {pricingFaqs.map((faq, idx) => (
              <details key={idx} className="group p-5 cursor-pointer" style={{ borderRadius: '12px', border: '1px solid #E5E0D8', background: '#FFFFFF' }}>
                <summary className="flex items-start justify-between font-semibold select-none" style={{ color: '#111827', fontFamily: 'Roboto, system-ui, sans-serif' }}>
                  <span className="flex-1 text-sm leading-relaxed pr-4">{faq.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 transition-transform group-open:rotate-180" style={{ color: '#111111' }}><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <div className="pt-4 mt-4" style={{ borderTop: '1px solid #E5E0D8' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280', fontFamily: 'Roboto, system-ui, sans-serif' }}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="text-center p-10 mb-16" style={{ borderRadius: '12px', border: '1px solid #E5E0D8', background: '#F5F3EF' }}>
          <p className="text-base mb-4" style={{ color: '#374151', fontFamily: 'Roboto, system-ui, sans-serif' }}>Need custom data access, more than 5 team seats, or a white-label integration?</p>
          <a href="mailto:enterprise@mycasevalue.com" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:opacity-90" style={{ borderRadius: '9999px', border: '1px solid #E5E0D8', color: '#111827', textDecoration: 'none', fontFamily: 'Roboto, system-ui, sans-serif' }}>
            Talk to Us <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E5E0D8', background: '#FFFFFF', padding: '32px 0', textAlign: 'center' }}>
        <p className="text-xs max-w-2xl mx-auto px-6" style={{ color: '#6B7280', fontFamily: 'Roboto, system-ui, sans-serif' }}>
          For informational purposes only. Not legal advice. No attorney-client relationship. © {new Date().getFullYear()} MyCaseValue. All rights reserved.
        </p>
      </div>
    </div>
  );
}
