import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'How It Works — Methodology & Workflow',
  description: 'Research federal court outcomes in 3 steps: Select case type, search 5.1M+ cases, get personalized report with win rates & settlement ranges. Methodology-grade workflow transparency.',
  alternates: { canonical: `${SITE_URL}/how-it-works` },
  openGraph: {
    title: 'Platform Overview',
    description: 'Three simple steps to research real federal court outcomes. Select your case type, we analyze 5.1M+ cases, you get a personalized report.',
    type: 'website',
    url: `${SITE_URL}/how-it-works`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform Overview — MyCaseValue | 3 Simple Steps',
    description: 'Tell us your situation → We search 5.1M+ federal court cases → Get your personalized report with real outcomes, win rates, and timelines.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Platform Overview', item: `${SITE_URL}/how-it-works` },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Research Federal Court Case Outcomes with MyCaseValue',
      description: 'A three-step process to research real outcomes from 5.1M+ federal cases.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Tell us your situation',
          text: 'Select your case type and federal district. No legal jargon needed — we use plain English labels.',
          image: `${SITE_URL}/step-1-icon.svg`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'We search 55+ years of data',
          text: 'Our system analyzes 5.1M+ federal court cases from the FJC Integrated Database, PACER, and CourtListener to find cases matching your situation.',
          image: `${SITE_URL}/step-2-icon.svg`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Get your personalized report',
          text: 'See real outcomes: win rates, settlement ranges, timelines, judge analytics, and plain-English explanations. All from verified public records.',
          image: `${SITE_URL}/step-3-icon.svg`,
        },
      ],
    },
  ],
};

const steps = [
  {
    number: '1',
    title: 'Tell Us Your Situation',
    description: 'No legal background required. Select your case type from 84 plain-English categories and your federal district. Takes 30 seconds.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    number: '2',
    title: 'We Search Real Cases',
    description: 'Our engine instantly analyzes 5.1M+ federal court cases from 55+ years of public records, matching outcomes to your specific situation and district.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <circle cx="8" cy="8" r="1"/>
        <path d="M8 5v6M5 8h6"/>
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Get Your Personalized Report',
    description: 'Seconds later, see win rates, settlement ranges, timelines, judge analytics, and more — all explained in plain English, never legal jargon. 100% from verified federal records.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const trustStats = [
  { value: '5.1M+', label: 'Federal cases analyzed' },
  { value: '95', label: 'Federal districts covered' },
  { value: '55+', label: 'Years of judicial data' },
  { value: '84', label: 'Case types supported' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .hover\\:shadow-md:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }
      `}} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div style={{ background: 'var(--accent-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(10, 102, 194, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
              <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
              <polyline points="12 12 20 7.5"></polyline>
              <polyline points="12 12 12 21"></polyline>
              <polyline points="12 12 4 7.5"></polyline>
            </svg>
            HOW IT WORKS
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-4" style={{ color: 'var(--color-surface-0)', letterSpacing: '-1.5px' }}>
            Platform Overview
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            How MyCaseValue transforms public federal court records into actionable litigation intelligence.
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)' }}>
        <div className="max-w-5xl mx-auto px-6 py-3">
          <nav style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            <a href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
              Home
            </a>
            <span style={{ margin: '0 8px', color: 'var(--border-default)' }}>›</span>
            <span>Platform Overview</span>
          </nav>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="relative">
          {/* Desktop vertical line connecting steps */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-24 bottom-0 w-1 bg-gradient-to-b from-transparent via-gray-300/30 to-transparent" style={{ background: 'linear-gradient(to bottom, transparent, rgba(213, 216, 220, 0.3), transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Card */}
                <div className="border h-full transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: 'var(--color-surface-0)',
                    borderRadius: '12px',
                    padding: '32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    animationDelay: `${idx * 100}ms`,
                  }}>

                  {/* Step number circle */}
                  <div className="inline-flex items-center justify-center font-display font-bold mb-6"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'var(--accent-primary)',
                      color: 'var(--color-surface-0)',
                      fontSize: '18px',
                    }}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h2 className="font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)', fontSize: '20px', fontWeight: '600' }}>
                    {step.title}
                  </h2>
                  <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: '15px', fontWeight: '300', lineHeight: '1.7' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile connecting line (vertical) */}
          <div className="md:hidden absolute left-7 top-32 bottom-0 w-0.5" style={{ background: 'linear-gradient(to bottom, rgba(213, 216, 220, 0.3), transparent)' }} />
        </div>
      </div>

      {/* What's in Your Report Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section>
          <h2 className="text-2xl font-display font-bold mb-3 text-center" style={{ color: 'var(--color-text-primary)' }}>
            What's in Your Report?
          </h2>
          <p className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-text-secondary)' }}>
            Every stat is powered by real outcomes from 5.1M+ federal cases. See what actually happens in courts like yours — not estimates or guesses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Win Rate Data',
                description: 'See the actual percentage of cases won by plaintiffs or defendants in your case category and district.',
              },
              {
                title: 'Settlement Ranges',
                description: 'Understand settlement patterns with P10-P90 ranges showing typical settlement values for cases like yours.',
              },
              {
                title: 'Timeline Analysis',
                description: 'Learn how long cases typically take from filing to resolution, broken down by outcome type.',
              },
              {
                title: 'Judge Analytics',
                description: 'Review statistics on specific judges who would hear your case, including their historical rulings.',
              },
              {
                title: 'District Comparison',
                description: 'Compare your federal district to others nationwide to understand regional variations in outcomes.',
              },
              {
                title: 'Case Trend Data',
                description: 'Track how outcomes have changed over time to understand current judicial patterns and trends.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
                {/* Red Icon */}
                <div className="mb-4" style={{ width: '24px', height: '24px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: '600' }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trust Stats Bar */}
      <section className="py-12 border-y" style={{ borderColor: 'var(--border-default)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-semibold mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            POWERING SMARTER LEGAL DECISIONS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map((stat, i) => (
              <div key={i} className="text-center p-4 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
                <div className="text-2xl font-display font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section>
          <h2 className="text-2xl font-display font-bold mb-6 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Verified Public Sources
          </h2>
          <p className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Unlike traditional legal research tools, we don't estimate or filter outcomes. 100% of our data comes directly from official federal court records — auditable and transparent.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Federal Judicial Center (FJC)',
                description: 'The official source for federal civil case statistics since 1970. Covers case type, disposition, and duration for every federal civil case.',
              },
              {
                title: 'CourtListener',
                description: 'Aggregates federal judicial opinions, oral arguments, and PACER filings. Provides supplementary data on case outcomes and judicial reasoning.',
              },
              {
                title: 'PACER',
                description: 'The Federal Judiciary\'s official electronic records system. All docket sheets and case filings referenced in our data originate from PACER.',
              },
            ].map((source, i) => (
              <div key={i} className="p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {source.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {source.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Platform Features Showcase Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section>
          <h2 className="text-2xl font-display font-bold mb-3 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Platform Features
          </h2>
          <p className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-text-secondary)' }}>
            Specialized tools built for outcome research — faster and more transparent than traditional enterprise legal software.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Search',
                description: 'Find matching cases across 5.1M+ federal court records.',
                href: '/search',
              },
              {
                title: 'Calculator',
                description: 'Estimate case value with data-backed settlement projections.',
                href: '/calculator',
              },
              {
                title: 'Judge Analytics',
                description: 'Research judges by district and analyze ruling patterns.',
                href: '/judges',
              },
              {
                title: 'Compare',
                description: 'Side-by-side comparison of case outcomes and statistics.',
                href: '/compare',
              },
              {
                title: 'NOS Explorer',
                description: 'Browse federal case categories and nature of suit classifications.',
                href: '/nos-explorer',
              },
              {
                title: 'Translator',
                description: 'Convert legal terms to plain English explanations.',
                href: '/glossary',
              },
              {
                title: 'Trends',
                description: 'Analyze how case outcomes have changed over time.',
                href: '/trends',
              },
              {
                title: 'Glossary',
                description: 'Complete reference for legal terms and case type definitions.',
                href: '/glossary',
              },
            ].map((feature, i) => (
              <Link
                key={i}
                href={feature.href}
                style={{
                  padding: '24px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--color-surface-0)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
                className="feature-card"
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-surface-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="1.5">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)', fontSize: '15px', fontWeight: '600', margin: 0 }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: '13px', margin: 0 }}>
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .feature-card:hover {
          border-color: #1e40af !important;
          box-shadow: 0 8px 24px rgba(27, 58, 92, 0.12) !important;
          transform: translateY(-4px);
        }
      `}</style>

      {/* Data Pipeline Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section>
          <h2 className="text-2xl font-display font-bold mb-12 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Data Pipeline
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}>
            {[
              { label: 'FJC IDB', description: '55+ years of data' },
              { label: 'Data Ingestion', description: 'Parse & normalize' },
              { label: 'Classification', description: 'Tag & categorize' },
              { label: 'Aggregation', description: 'Calculate stats' },
              { label: 'Your Report', description: 'Real-time insights' },
            ].map((step, idx, arr) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: idx % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-primary-hover)',
                      color: 'var(--color-surface-0)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '24px',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', marginTop: 4 }}>
                      {step.description}
                    </div>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div
                    style={{
                      width: '40px',
                      height: '2px',
                      backgroundColor: 'var(--border-default)',
                      margin: '0 24px',
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Start Exploring CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section style={{ textAlign: 'center' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Start Exploring
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-base" style={{ color: 'var(--color-text-secondary)' }}>
            Get started instantly — no account, no credit card, free during beta
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 600, margin: '0 auto' }}>
            {[
              {
                label: 'Search Cases',
                href: '/search',
                iconPath: 'M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
              },
              {
                label: 'Check Odds',
                href: '/calculator',
                iconPath: 'M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 7v10M15 7v10M9 9h6M9 13h6',
              },
              {
                label: 'Calculate Settlement',
                href: '/calculator',
                iconPath: 'M12 2v20M2 12h20M8.5 8.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM8.5 15.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0z',
              },
            ].map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                style={{
                  padding: '16px 24px',
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--color-surface-0)',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                className="start-exploring-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={btn.iconPath}/></svg>
                {btn.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .start-exploring-btn:hover {
          background-color: var(--accent-primary) !important;
          box-shadow: 0 8px 24px rgba(27, 58, 92, 0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Why Choose Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Why MyCaseValue Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '',
                title: 'Seconds, Not Weeks',
                description: 'Get your research instantly. Traditional legal databases take hours or days. We deliver in seconds.',
              },
              {
                icon: '',
                title: 'No Hidden Walls',
                description: 'All features free during beta. No account required, no credit card needed, no paywall obstacles.',
              },
              {
                icon: '',
                title: 'Real Data Only',
                description: 'Every number comes directly from federal court records. No proprietary estimates, no algorithmic black boxes.',
              },
              {
                icon: '',
                title: 'Privacy First',
                description: 'Your searches are completely anonymous. We never track, sell, or share your research behavior.',
              },
              {
                icon: '',
                title: 'Plain English',
                description: 'No legal jargon required. Everyone can understand their results, whether you\'re a lawyer or pro se.',
              },
              {
                icon: '',
                title: 'Bilingual Access',
                description: 'Available in English and Spanish. Legal data democratized for all communities.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="text-center p-12 border" style={{ borderColor: 'var(--border-default)', background: 'rgba(239,68,68,0.08)', borderRadius: '12px' }}>
          <h2 className="text-3xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            See what happens in courts like yours
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Free research backed by 5.1M+ real cases. No account. No credit card. No restrictions during beta.
          </p>
          <a href="/search"
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold transition-all hover:shadow-lg"
            style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '20px' }}>
            Start Free Research
            <ArrowRightIcon size={16} />
          </a>
        </section>
      </div>

    </div>
  );
}
