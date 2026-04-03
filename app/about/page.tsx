import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About MyCaseValue — Democratizing Federal Court Data',
  description: 'MyCaseValue democratizes federal court outcome data. Explore aggregate results from 5.1M+ cases for informed legal research.',
  alternates: { canonical: 'https://www.mycasevalues.com/about' },
  openGraph: {
    title: 'About MyCaseValue — Democratizing Federal Court Data',
    description: 'MyCaseValue aggregates 5.1M+ federal court cases to help you research real outcomes, win rates, and settlement data.',
    type: 'website',
    url: 'https://www.mycasevalues.com/about',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: 'https://mycasevalues.com',
      logo: 'https://www.mycasevalues.com/icon-512.png',
      description: 'A platform democratizing access to federal court outcome data from 5.1M+ cases.',
      sameAs: [
        'https://twitter.com/mycasevalue',
        'https://linkedin.com/company/mycasevalue',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@mycasevalue.com',
        contactType: 'customer support',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.mycasevalues.com/about' },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F6 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            ABOUT US
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            Democratizing Federal Court Data
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            MyCaseValue puts outcome data from 5.1M+ federal cases at your fingertips, making real court outcomes accessible to everyone.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-invert max-w-none space-y-12">

          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--fg-primary)' }}>
              Our Mission
            </h2>
            <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
              <p className="text-base leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>
                Federal court data exists in the public domain, yet it remains locked away in systems designed for clerks and attorneys. We believe outcome data—win rates, settlement ranges, timelines, and recovery patterns—should be accessible to everyone making informed decisions about their legal situation.
              </p>
              <p className="text-base leading-relaxed m-0 mt-4" style={{ color: 'var(--fg-muted)' }}>
                MyCaseValue makes real federal court outcomes transparent and searchable, so you can base decisions on facts, not fear.
              </p>
            </div>
          </section>

          {/* How It Works Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--fg-primary)' }}>
              How It Works
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Search',
                  description: 'Select your case type from 84 federal case types. Get instant access to historical outcome data specific to your legal scenario.',
                  icon: '',
                },
                {
                  step: '02',
                  title: 'Review',
                  description: 'Explore win rates, settlement percentages, recovery ranges, and case timelines derived from 5.1M+ real federal cases.',
                  icon: '',
                },
                {
                  step: '03',
                  title: 'Research',
                  description: 'Use data-driven insights to make informed decisions. Share findings with attorneys or use them for your own evaluation.',
                  icon: '',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-5 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: '#FFFFFF' }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold m-0 mb-2" style={{ color: 'var(--fg-primary)' }}>
                      {item.step}. {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Data Sources Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--fg-primary)' }}>
              Our Data Sources
            </h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              We aggregate outcome data from official federal court records, ensuring accuracy and transparency.
            </p>
            <div className="space-y-4">
              {[
                {
                  name: 'Federal Judicial Center (FJC) Integrated Database',
                  description: 'The official source for federal civil case statistics since 1970. Covers case type, disposition, and duration for every federal civil case.',
                  color: '#111111',
                },
                {
                  name: 'CourtListener (Free Law Project)',
                  description: 'Aggregates federal judicial opinions, oral arguments, and PACER filings. Provides supplementary data on case outcomes and judicial reasoning.',
                  color: '#0D9488',
                },
                {
                  name: 'PACER (Public Access to Court Electronic Records)',
                  description: 'The Federal Judiciary\'s official electronic records system. All docket sheets and case filings referenced in our data originate from PACER.',
                  color: '#9CA3AF',
                },
              ].map((source, i) => (
                <div key={i} className="p-5 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                  <h3 className="text-base font-semibold m-0 mb-2" style={{ color: 'var(--fg-primary)' }}>
                    {source.name}
                  </h3>
                  <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>
                    {source.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--fg-primary)' }}>
              Team & Vision
            </h2>
            <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
              <p className="text-base leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>
                MyCaseValue is built by legal researchers, data engineers, and technologists who believe transparency drives better decisions. We are not a law firm. We do not provide legal advice. We are a data platform.
              </p>
              <p className="text-base leading-relaxed m-0 mt-4" style={{ color: 'var(--fg-muted)' }}>
                Our team is committed to:
              </p>
              <ul className="mt-4 space-y-2 text-sm" style={{ paddingLeft: '1.5rem', color: 'var(--fg-muted)' }}>
                <li><strong>Accuracy:</strong> All data comes from official public records with rigorous quality checks.</li>
                <li><strong>Transparency:</strong> Our methodology is fully documented and open to scrutiny.</li>
                <li><strong>Privacy:</strong> We never sell data or track individual research behavior.</li>
                <li><strong>Accessibility:</strong> Federal court data belongs to the public; we make it accessible.</li>
              </ul>
            </div>
          </section>

          {/* Coverage Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--fg-primary)' }}>
              What We Cover
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { v: '5.1M+', l: 'Federal cases', c: '#111111' },
                { v: '84', l: 'Case types', c: '#0D9488' },
                { v: '94', l: 'Federal districts', c: '#1A3260' },
                { v: '50+ yrs', l: 'Historical data', c: '#9CA3AF' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
                  <div className="text-xl font-display font-extrabold" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[11px] font-semibold mt-1" style={{ color: 'var(--fg-muted)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)' }}>
            <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
              Ready to Research Real Case Outcomes?
            </h2>
            <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
              Access aggregate federal court data for informed decision-making. Free basic reports, premium analytics available.
            </p>
            <a href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#111111', color: '#FFFFFF' }}>
              Start Researching
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </section>

        </div>
      </div>

    </div>
  );
}
