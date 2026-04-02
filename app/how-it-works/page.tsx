import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — MyCaseValue | 3 Simple Steps',
  description: 'Tell us your situation → We search 4.1M+ federal court cases → Get your personalized report with real outcomes, win rates, and timelines.',
  alternates: { canonical: 'https://mycasevalues.com/how-it-works' },
  openGraph: {
    title: 'How It Works — MyCaseValue',
    description: 'Three simple steps to research real federal court outcomes. Select your case type, we analyze 4.1M+ cases, you get a personalized report.',
    type: 'website',
    url: 'https://mycasevalues.com/how-it-works',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'How It Works', item: 'https://mycasevalues.com/how-it-works' },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Research Federal Court Case Outcomes with MyCaseValue',
      description: 'A three-step process to research real outcomes from 4.1M+ federal cases.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Tell us your situation',
          text: 'Select your case type and federal district. No legal jargon needed — we use plain English labels.',
          image: 'https://mycasevalues.com/step-1-icon.svg',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'We search 54 years of data',
          text: 'Our system analyzes 4.1M+ federal court cases from the FJC Integrated Database, PACER, and CourtListener to find cases matching your situation.',
          image: 'https://mycasevalues.com/step-2-icon.svg',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Get your personalized report',
          text: 'See real outcomes: win rates, settlement ranges, timelines, judge analytics, and plain-English explanations. All from verified public records.',
          image: 'https://mycasevalues.com/step-3-icon.svg',
        },
      ],
    },
  ],
};

const steps = [
  {
    number: '1',
    title: 'Tell us your situation',
    description: 'Select your case type and federal district. No legal jargon needed — we use plain English labels.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    number: '2',
    title: 'We search 54 years of data',
    description: 'Our system analyzes 4.1M+ federal court cases from the FJC Integrated Database, PACER, and CourtListener to find cases matching your situation.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <circle cx="8" cy="8" r="1"/>
        <path d="M8 5v6M5 8h6"/>
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Get your personalized report',
    description: 'See real outcomes: win rates, settlement ranges, timelines, judge analytics, and plain-English explanations. All from verified public records.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const trustStats = [
  { value: '4.1M+', label: 'Federal cases analyzed' },
  { value: '94', label: 'Federal districts covered' },
  { value: '54', label: 'Years of judicial data' },
  { value: '84', label: 'Case types supported' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F6 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#111111' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            HOW IT WORKS
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            3 Simple Steps
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            From selecting your case type to getting a complete analysis of real federal court outcomes — all in minutes.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="relative">
          {/* Desktop vertical line connecting steps */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-24 bottom-0 w-1 bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Card */}
                <div className="rounded-2xl border p-8 h-full transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: 'rgba(25, 32, 56, 0.4)',
                    backdropFilter: 'blur(10px)',
                    animationDelay: `${idx * 100}ms`,
                  }}>

                  {/* Step number circle */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full font-display font-extrabold text-lg mb-6"
                    style={{
                      background: ['rgba(17,17,17,0.15)', 'rgba(13,148,136,0.15)', 'rgba(245,158,11,0.15)'][idx],
                      color: ['#111111', '#0D9488', '#F59E0B'][idx],
                    }}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile connecting line (vertical) */}
          <div className="md:hidden absolute left-7 top-32 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/30 to-transparent" />
        </div>
      </div>

      {/* Trust Stats Bar */}
      <section className="py-12 border-y" style={{ borderColor: 'var(--border-default)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-semibold mb-8" style={{ color: 'var(--fg-muted)' }}>
            TRUSTED BY THOUSANDS OF CASE RESEARCHERS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                <div className="text-2xl font-display font-extrabold" style={{ color: '#111111' }}>
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold mt-2" style={{ color: 'var(--fg-muted)' }}>
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
          <h2 className="text-2xl font-display font-bold mb-6 text-center" style={{ color: 'var(--fg-primary)' }}>
            Verified Public Sources
          </h2>
          <p className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: 'var(--fg-muted)' }}>
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
              <div key={i} className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {source.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  {source.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Why Choose Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: 'var(--fg-primary)' }}>
            Why MyCaseValue Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Instant Results',
                description: 'Get your report in seconds, not weeks. Real-time analysis of 4.1M+ cases.',
              },
              {
                icon: '',
                title: 'Private & Secure',
                description: 'Your searches are anonymous. We don\'t track, sell, or share your data.',
              },
              {
                icon: '',
                title: 'Affordable',
                description: 'Start free, or upgrade to premium features for $5.99–$29.99. No surprise fees.',
              },
              {
                icon: '🌐',
                title: 'Bilingual',
                description: 'Available in English and Spanish. Accessible to everyone.',
              },
              {
                icon: '',
                title: 'Data-Driven',
                description: 'Every statistic comes from official federal court records with documented sources.',
              },
              {
                icon: '📖',
                title: 'Plain English',
                description: 'No legal jargon. Results explained in language everyone can understand.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <section className="text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Ready to see your odds?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
            In three simple steps, discover what happened in cases like yours.
          </p>
          <a href="/odds"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#111111', color: '#FFFFFF' }}>
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
