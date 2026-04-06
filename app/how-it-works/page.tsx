import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'How It Works — MyCaseValue | 3 Simple Steps',
  description: 'Tell us your situation → We search 5.1M+ federal court cases → Get your personalized report with real outcomes, win rates, and timelines.',
  alternates: { canonical: `${SITE_URL}/how-it-works` },
  openGraph: {
    title: 'How It Works — MyCaseValue',
    description: 'Three simple steps to research real federal court outcomes. Select your case type, we analyze 5.1M+ cases, you get a personalized report.',
    type: 'website',
    url: `${SITE_URL}/how-it-works`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'How It Works', item: `${SITE_URL}/how-it-works` },
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
          name: 'We search 54 years of data',
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
    title: 'Select Your Case Type',
    description: 'Choose from 84 federal case categories. No legal jargon needed — we use plain English labels to describe every case type.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Choose Your District',
    description: 'Pick from 94 federal judicial districts across the United States. We analyze cases from your specific district for maximum relevance.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <circle cx="8" cy="8" r="1"/>
        <path d="M8 5v6M5 8h6"/>
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Get Your Report',
    description: 'Instant results with win rates, settlement ranges, timelines, judge analytics, and plain-English explanations. All from verified public records.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const trustStats = [
  { value: '5.1M+', label: 'Federal cases analyzed' },
  { value: '94', label: 'Federal districts covered' },
  { value: '54', label: 'Years of judicial data' },
  { value: '84', label: 'Case types supported' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
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
      <div style={{ background: '#00172E' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(232, 23, 31, 0.1)', color: '#E8171F', borderRadius: '2px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2">
              <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
              <polyline points="12 12 20 7.5"></polyline>
              <polyline points="12 12 12 21"></polyline>
              <polyline points="12 12 4 7.5"></polyline>
            </svg>
            HOW IT WORKS
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-4" style={{ color: '#FFFFFF', letterSpacing: '-1.5px' }}>
            How It Works
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            From selecting your case type to getting a complete analysis of real federal court outcomes across 5.1M+ cases — all in minutes.
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="border-b" style={{ borderColor: '#D5D8DC', background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto px-6 py-3">
          <nav style={{ fontSize: '14px', color: '#455A64' }}>
            <a href="/" style={{ color: '#455A64', textDecoration: 'none' }}>
              Home
            </a>
            <span style={{ margin: '0 8px', color: '#D5D8DC' }}>›</span>
            <span>How It Works</span>
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
                    borderColor: '#D5D8DC',
                    background: '#FFFFFF',
                    borderRadius: '2px',
                    padding: '32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    animationDelay: `${idx * 100}ms`,
                  }}>

                  {/* Step number circle */}
                  <div className="inline-flex items-center justify-center font-display font-bold mb-6"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '2px',
                      background: '#00172E',
                      color: '#FFFFFF',
                      fontSize: '18px',
                    }}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h2 className="font-display font-bold mb-3" style={{ color: '#212529', fontSize: '20px', fontWeight: '700' }}>
                    {step.title}
                  </h2>
                  <p className="leading-relaxed" style={{ color: '#455A64', fontSize: '15px', fontWeight: '300', lineHeight: '1.7' }}>
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
          <h2 className="text-2xl font-display font-bold mb-3 text-center" style={{ color: '#212529' }}>
            What's in Your Report?
          </h2>
          <p className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: '#455A64' }}>
            Get comprehensive insights from 5.1M+ federal court cases with real data about outcomes, trends, and case analytics.
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
              <div key={i} className="p-6 border" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px' }}>
                {/* Red Icon */}
                <div className="mb-4" style={{ width: '24px', height: '24px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="1.5">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#212529', fontSize: '15px', fontWeight: '700' }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#455A64', fontSize: '13px' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trust Stats Bar */}
      <section className="py-12 border-y" style={{ borderColor: '#D5D8DC' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-semibold mb-8" style={{ color: '#455A64' }}>
            TRUSTED BY THOUSANDS OF CASE RESEARCHERS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map((stat, i) => (
              <div key={i} className="text-center p-4 border" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px' }}>
                <div className="text-2xl font-display font-extrabold" style={{ color: '#212529' }}>
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold mt-2" style={{ color: '#455A64' }}>
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
          <h2 className="text-2xl font-display font-bold mb-6 text-center" style={{ color: '#212529' }}>
            Verified Public Sources
          </h2>
          <p className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: '#455A64' }}>
            All data comes from official federal court records, ensuring accuracy and transparency.
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
              <div key={i} className="p-6 border" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px' }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#212529' }}>
                  {source.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#455A64' }}>
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
          <h2 className="text-2xl font-display font-bold mb-3 text-center" style={{ color: '#212529' }}>
            Platform Features
          </h2>
          <p className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: '#455A64' }}>
            A complete suite of tools designed for legal professionals, researchers, and case evaluation.
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
                href: '/attorney/judge-intelligence',
              },
              {
                title: 'Compare',
                description: 'Side-by-side comparison of case outcomes and statistics.',
                href: '/search',
              },
              {
                title: 'NOS Explorer',
                description: 'Browse federal case categories and nature of suit classifications.',
                href: '/search',
              },
              {
                title: 'Translator',
                description: 'Convert legal terms to plain English explanations.',
                href: '/glossary',
              },
              {
                title: 'Trends',
                description: 'Analyze how case outcomes have changed over time.',
                href: '/how-it-works',
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
                  border: '1px solid #D5D8DC',
                  background: '#FFFFFF',
                  borderRadius: '2px',
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
                    borderRadius: '2px',
                    backgroundColor: '#F5F6F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                </div>
                <h3 className="font-semibold" style={{ color: '#212529', fontSize: '15px', fontWeight: '700', margin: 0 }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#455A64', fontSize: '13px', margin: 0 }}>
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .feature-card:hover {
          border-color: #006997 !important;
          box-shadow: 0 8px 24px rgba(0, 23, 46, 0.12) !important;
          transform: translateY(-4px);
        }
      `}</style>

      {/* Data Pipeline Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section>
          <h2 className="text-2xl font-display font-bold mb-12 text-center" style={{ color: '#212529' }}>
            Data Pipeline
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}>
            {[
              { label: 'FJC IDB', description: '54 years of data' },
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
                      backgroundColor: idx % 2 === 0 ? '#E8171F' : '#006997',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '24px',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)' }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#455A64', fontFamily: 'var(--font-body)', marginTop: 4 }}>
                      {step.description}
                    </div>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div
                    style={{
                      width: '40px',
                      height: '2px',
                      backgroundColor: '#D5D8DC',
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
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
            Start Exploring
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-base" style={{ color: '#455A64' }}>
            Choose your starting point — no account required
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 600, margin: '0 auto' }}>
            {[
              {
                label: 'Search Cases',
                href: '/search',
                icon: '🔍',
              },
              {
                label: 'Check Odds',
                href: '/calculator',
                icon: '📊',
              },
              {
                label: 'Calculate Settlement',
                href: '/calculator',
                icon: '💰',
              },
            ].map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                style={{
                  padding: '16px 24px',
                  backgroundColor: '#E8171F',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  borderRadius: '2px',
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
                <span>{btn.icon}</span>
                {btn.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .start-exploring-btn:hover {
          background-color: #00172E !important;
          box-shadow: 0 8px 24px rgba(0, 23, 46, 0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Why Choose Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: '#212529' }}>
            Why MyCaseValue Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '',
                title: 'Instant Results',
                description: 'Get your report in seconds, not weeks. Real-time analysis of 5.1M+ cases.',
              },
              {
                icon: '',
                title: 'Private & Secure',
                description: 'Your searches are anonymous. We don\'t track, sell, or share your data.',
              },
              {
                icon: '',
                title: 'Free During Launch',
                description: 'All features are free during our launch period. No account required, no credit card needed.',
              },
              {
                icon: '',
                title: 'Bilingual',
                description: 'Available in English and Spanish. Accessible to everyone.',
              },
              {
                icon: '',
                title: 'Data-Driven',
                description: 'Every statistic comes from official federal court records with documented sources.',
              },
              {
                icon: '',
                title: 'Plain English',
                description: 'No legal jargon. Results explained in language everyone can understand.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px' }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#212529' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#455A64' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <section className="text-center p-12 border" style={{ borderColor: '#D5D8DC', background: '#FFF3F4', borderRadius: '2px' }}>
          <h2 className="text-3xl font-display font-bold mb-3" style={{ color: '#212529' }}>
            Ready to see your case data?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-lg" style={{ color: '#455A64' }}>
            Start your free research — no account required
          </p>
          <a href="/search"
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold transition-all hover:shadow-lg"
            style={{ background: '#E8171F', color: '#FFFFFF', borderRadius: '2px' }}>
            Start Free Research
            <ArrowRightIcon size={16} />
          </a>
        </section>
      </div>

    </div>
  );
}
