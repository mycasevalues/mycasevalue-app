import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About MyCaseValue — Democratizing Federal Court Data',
  description: 'MyCaseValue is on a mission to democratize access to federal court outcome data. Learn how we aggregate 4.2M+ cases to help you research real case outcomes and timelines.',
  alternates: { canonical: 'https://mycasevalues.com/about' },
  openGraph: {
    title: 'About MyCaseValue — Democratizing Federal Court Data',
    description: 'MyCaseValue aggregates 4.2M+ federal court cases to help you research real outcomes, win rates, and settlement data.',
    type: 'website',
    url: 'https://mycasevalues.com/about',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: 'https://mycasevalues.com',
      logo: 'https://mycasevalues.com/icon-512.png',
      description: 'A platform democratizing access to federal court outcome data from 4.2M+ cases.',
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
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://mycasevalues.com/about' },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F7FA' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E2E8F0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#4040F2' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: '#E4E5FF', color: '#4040F2' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            ABOUT US
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-1.5px' }}>
            Democratizing Federal Court Data
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            MyCaseValue puts outcome data from 4.2M+ federal cases at your fingertips, making real court outcomes accessible to everyone.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none space-y-12">

          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: '#0F172A' }}>
              Our Mission
            </h2>
            <div className="p-6 rounded-xl border" style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}>
              <p className="text-base leading-relaxed text-slate-600 m-0">
                Federal court data exists in the public domain, yet it remains locked away in systems designed for clerks and attorneys. We believe outcome data—win rates, settlement ranges, timelines, and recovery patterns—should be accessible to everyone making informed decisions about their legal situation.
              </p>
              <p className="text-base leading-relaxed text-slate-600 m-0 mt-4">
                MyCaseValue makes real federal court outcomes transparent and searchable, so you can base decisions on facts, not fear.
              </p>
            </div>
          </section>

          {/* How It Works Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: '#0F172A' }}>
              How It Works
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Search',
                  description: 'Select your case type from 50+ federal case categories. Get instant access to historical outcome data specific to your legal scenario.',
                  icon: '🔍',
                },
                {
                  step: '02',
                  title: 'Review',
                  description: 'Explore win rates, settlement percentages, recovery ranges, and case timelines derived from 4.2M+ real federal cases.',
                  icon: '📊',
                },
                {
                  step: '03',
                  title: 'Research',
                  description: 'Use data-driven insights to make informed decisions. Share findings with attorneys or use them for your own evaluation.',
                  icon: '💡',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-5 rounded-xl border" style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: '#F8FAFC' }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold m-0 mb-2" style={{ color: '#0F172A' }}>
                      {item.step}. {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed m-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Data Sources Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: '#0F172A' }}>
              Our Data Sources
            </h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              We aggregate outcome data from official federal court records, ensuring accuracy and transparency.
            </p>
            <div className="space-y-4">
              {[
                {
                  name: 'Federal Judicial Center (FJC) Integrated Database',
                  description: 'The official source for federal civil case statistics since 1970. Covers case type, disposition, and duration for every federal civil case.',
                  color: '#4040F2',
                },
                {
                  name: 'CourtListener (Free Law Project)',
                  description: 'Aggregates federal judicial opinions, oral arguments, and PACER filings. Provides supplementary data on case outcomes and judicial reasoning.',
                  color: '#0D9488',
                },
                {
                  name: 'PACER (Public Access to Court Electronic Records)',
                  description: 'The Federal Judiciary\'s official electronic records system. All docket sheets and case filings referenced in our data originate from PACER.',
                  color: '#64748B',
                },
              ].map((source, i) => (
                <div key={i} className="p-5 rounded-xl border" style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}>
                  <h3 className="text-base font-semibold m-0 mb-2" style={{ color: '#0F172A' }}>
                    {source.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed m-0">
                    {source.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: '#0F172A' }}>
              Team & Vision
            </h2>
            <div className="p-6 rounded-xl border" style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}>
              <p className="text-base leading-relaxed text-slate-600 m-0">
                MyCaseValue is built by legal researchers, data engineers, and technologists who believe transparency drives better decisions. We are not a law firm. We do not provide legal advice. We are a data platform.
              </p>
              <p className="text-base leading-relaxed text-slate-600 m-0 mt-4">
                Our team is committed to:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600" style={{ paddingLeft: '1.5rem' }}>
                <li><strong>Accuracy:</strong> All data comes from official public records with rigorous quality checks.</li>
                <li><strong>Transparency:</strong> Our methodology is fully documented and open to scrutiny.</li>
                <li><strong>Privacy:</strong> We never sell data or track individual research behavior.</li>
                <li><strong>Accessibility:</strong> Federal court data belongs to the public; we make it accessible.</li>
              </ul>
            </div>
          </section>

          {/* Coverage Section */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6" style={{ color: '#0F172A' }}>
              What We Cover
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { v: '4.2M+', l: 'Federal cases', c: '#4040F2' },
                { v: '50+', l: 'Case types', c: '#0D9488' },
                { v: '94', l: 'Federal districts', c: '#1A3260' },
                { v: '50+ yrs', l: 'Historical data', c: '#64748B' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl border" style={{ borderColor: '#E2E8F0', background: '#FFFFFF' }}>
                  <div className="text-xl font-display font-extrabold" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[11px] text-slate-400 font-semibold mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center p-8 rounded-xl border" style={{ borderColor: '#E2E8F0', background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)' }}>
            <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0F172A' }}>
              Ready to Research Real Case Outcomes?
            </h2>
            <p className="text-slate-500 mb-6 max-w-xl mx-auto">
              Access aggregate federal court data for informed decision-making. Free basic reports, premium analytics available.
            </p>
            <a href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#4040F2', color: '#FFFFFF' }}>
              Start Researching
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </section>

        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#E2E8F0' }}>
        <p className="text-[11px] text-slate-400 max-w-xl mx-auto px-6">
          MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only.
          We are not a law firm. This is not legal advice. No attorney-client relationship is created by using this tool.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
