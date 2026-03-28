import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — MyCaseValue | Federal Court Data Questions Answered',
  description: 'Comprehensive FAQ about MyCaseValue: How it works, data sources, whether it\'s legal advice, accuracy, pricing, privacy, and how to use court outcome data.',
  alternates: { canonical: 'https://mycasevalues.com/faq' },
  openGraph: {
    title: 'FAQ — MyCaseValue',
    description: 'Get answers to common questions about federal court data, win rates, settlement ranges, and how MyCaseValue works.',
    type: 'website',
    url: 'https://mycasevalues.com/faq',
  },
  keywords: 'federal court data FAQ, MyCaseValue questions, legal data FAQ, court outcome questions, case statistics',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://mycasevalues.com/faq' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is MyCaseValue?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MyCaseValue is a research platform that aggregates historical outcome data from 4.2M+ federal civil court cases. It provides win rates, settlement percentages, case timelines, and recovery ranges across 50+ case types. It is not legal advice.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is MyCaseValue legal advice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. MyCaseValue provides aggregate statistical data from public court records only. It does not evaluate individual cases, offer legal opinions, make predictions about your specific case, or create an attorney-client relationship. Always consult a licensed attorney for legal advice.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where does the data come from?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our data is sourced from three official federal court records systems: the Federal Judicial Center (FJC) Integrated Database, CourtListener, and PACER (Public Access to Court Electronic Records). All source data is public domain.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can MyCaseValue predict what my case is worth?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. MyCaseValue shows historical averages and ranges from past cases, but it cannot value your specific case. Case outcomes depend on unique facts, parties, evidence, and judge/jury decisions. Consult a licensed attorney for case evaluation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our data comes directly from official federal court records (FJC IDB, CourtListener, PACER) with automated quality checks. However, all statistics have limitations: outcome coding may not capture partial victories or complex settlements, and past outcomes do not guarantee future results.',
          },
        },
        {
          '@type': 'Question',
          name: 'What courts are covered?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MyCaseValue covers federal civil cases across all 94 federal district courts and appellate data. This includes federal district courts, circuit courts, and appeals. State and local courts are not included in our dataset.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does MyCaseValue cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Basic reports are completely free. Premium reports with detailed analytics, breakdowns by circuit/judge, and comparison tools cost $5.99 for a single report or $9.99/month for unlimited access.',
          },
        },
        {
          '@type': 'Question',
          name: 'What information do you collect about me?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MyCaseValue collects minimal data: your search queries, which case types you research, and basic usage analytics (page views, session duration). We do not track your identity, location, or browser behavior across other sites. We do not sell or share your data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you have a privacy policy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our full privacy policy is available at https://mycasevalues.com/privacy. It explains exactly what data we collect, how we use it, and your rights.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a "win rate"?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Win rate is the percentage of cases where the plaintiff received a judgment in their favor (plaintiff verdict). Win rates do not include settlements, dismissals, or transfers—only final judgments. They represent historical outcomes and do not predict future results.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why don\'t you show settlement amounts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Federal court records do not systematically report settlement amounts—most settlements are confidential. Recovery ranges shown in MyCaseValue come only from cases where monetary awards were publicly documented (judgments, consent decrees). This is a limitation of the data, not our tool.',
          },
        },
        {
          '@type': 'Question',
          name: 'What case types does MyCaseValue cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We cover 50+ federal case categories including employment discrimination, personal injury, contract disputes, intellectual property, civil rights, securities litigation, product liability, and many more. Visit our case type guide for the complete list.',
          },
        },
        {
          '@type': 'Question',
          name: 'How old is the data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our dataset includes federal cases going back 50+ years (since 1970), with quarterly updates from the Federal Judicial Center. Historical trends are visible in our data, but remember: past outcomes do not predict future results.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I download all the data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Individual reports can be exported as PDFs. We do not offer bulk data downloads. If you need bulk access to federal court data, you can access the raw Federal Judicial Center data directly at fjc.gov.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I use MyCaseValue instead of hiring an attorney?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. MyCaseValue provides background research data, not legal advice. If you are involved in a legal dispute or considering a lawsuit, you should consult a licensed attorney. MyCaseValue can help you ask better questions and understand the landscape, but it cannot replace professional legal counsel.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often is the data updated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Federal Judicial Center publishes case data quarterly. We ingest and process these updates to reflect the latest available federal court statistics. There is typically a 1-2 month lag between case closure and public reporting.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do outcomes vary by circuit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Different federal circuits (regional appellate courts) have different judges, case mixes, and legal interpretations. These factors create measurable outcome differences. Win rates and settlement patterns can vary significantly by circuit and district.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use MyCaseValue data in court?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MyCaseValue data is derived from public federal court records and statistical summaries. Courts may accept aggregate outcome statistics as background evidence in some contexts, but you should consult your attorney about using any research tool data in legal proceedings.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you have an API?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Currently, MyCaseValue is available through our web platform only. We are exploring API access for research institutions and legal professionals. Contact us at support@mycasevalue.com if you are interested.',
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What is MyCaseValue?',
        a: 'MyCaseValue is a research platform that aggregates historical outcome data from 4.2M+ federal civil court cases. It provides win rates, settlement percentages, case timelines, and recovery ranges across 50+ case types. It is not legal advice.',
      },
      {
        q: 'How does MyCaseValue work?',
        a: 'Search for your case type → instantly view aggregate outcome data (win rates, settlement ranges, timelines) → download a detailed report. The process takes seconds. No registration required for basic searches.',
      },
      {
        q: 'What case types does MyCaseValue cover?',
        a: 'We cover 50+ federal case categories including employment discrimination, personal injury, contract disputes, intellectual property, civil rights, securities litigation, product liability, consumer protection, and many more. Visit our case type guide for the complete list.',
      },
    ],
  },
  {
    category: 'Legal & Liability',
    questions: [
      {
        q: 'Is MyCaseValue legal advice?',
        a: 'No. MyCaseValue provides aggregate statistical data from public court records only. It does not evaluate individual cases, offer legal opinions, make predictions about your specific case, or create an attorney-client relationship. Always consult a licensed attorney for legal advice.',
      },
      {
        q: 'Should I use MyCaseValue instead of hiring an attorney?',
        a: 'No. MyCaseValue provides background research data, not legal advice. If you are involved in a legal dispute or considering a lawsuit, you should consult a licensed attorney. MyCaseValue can help you ask better questions and understand the landscape, but it cannot replace professional legal counsel.',
      },
      {
        q: 'Can MyCaseValue predict what my case is worth?',
        a: 'No. MyCaseValue shows historical averages and ranges from past cases, but it cannot value your specific case. Case outcomes depend on unique facts, parties, evidence, and judge/jury decisions. Consult a licensed attorney for case evaluation.',
      },
    ],
  },
  {
    category: 'Data & Accuracy',
    questions: [
      {
        q: 'Where does the data come from?',
        a: 'Our data is sourced from three official federal court records systems: the Federal Judicial Center (FJC) Integrated Database, CourtListener, and PACER (Public Access to Court Electronic Records). All source data is public domain.',
      },
      {
        q: 'How accurate is the data?',
        a: 'Our data comes directly from official federal court records (FJC IDB, CourtListener, PACER) with automated quality checks. However, all statistics have limitations: outcome coding may not capture partial victories or complex settlements, and past outcomes do not guarantee future results.',
      },
      {
        q: 'What is a "win rate"?',
        a: 'Win rate is the percentage of cases where the plaintiff received a judgment in their favor (plaintiff verdict). Win rates do not include settlements, dismissals, or transfers—only final judgments. They represent historical outcomes and do not predict future results.',
      },
      {
        q: 'Why don\'t you show settlement amounts?',
        a: 'Federal court records do not systematically report settlement amounts—most settlements are confidential. Recovery ranges shown in MyCaseValue come only from cases where monetary awards were publicly documented (judgments, consent decrees). This is a limitation of the data, not our tool.',
      },
      {
        q: 'How old is the data?',
        a: 'Our dataset includes federal cases going back 50+ years (since 1970), with quarterly updates from the Federal Judicial Center. Historical trends are visible in our data, but remember: past outcomes do not predict future results.',
      },
      {
        q: 'How often is the data updated?',
        a: 'The Federal Judicial Center publishes case data quarterly. We ingest and process these updates to reflect the latest available federal court statistics. There is typically a 1-2 month lag between case closure and public reporting.',
      },
    ],
  },
  {
    category: 'Coverage & Scope',
    questions: [
      {
        q: 'What courts are covered?',
        a: 'MyCaseValue covers federal civil cases across all 94 federal district courts and appellate data. This includes federal district courts, circuit courts, and appeals. State and local courts are not included in our dataset.',
      },
      {
        q: 'Why do outcomes vary by circuit?',
        a: 'Different federal circuits (regional appellate courts) have different judges, case mixes, and legal interpretations. These factors create measurable outcome differences. Win rates and settlement patterns can vary significantly by circuit and district.',
      },
      {
        q: 'Can I use MyCaseValue data in court?',
        a: 'MyCaseValue data is derived from public federal court records and statistical summaries. Courts may accept aggregate outcome statistics as background evidence in some contexts, but you should consult your attorney about using any research tool data in legal proceedings.',
      },
    ],
  },
  {
    category: 'Pricing & Access',
    questions: [
      {
        q: 'How much does MyCaseValue cost?',
        a: 'Basic reports are completely free. Premium reports with detailed analytics, breakdowns by circuit/judge, and comparison tools cost $5.99 for a single report or $9.99/month for unlimited access.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No. You can search and view basic reports without registering. To purchase premium reports or save searches, you can create a free account.',
      },
      {
        q: 'Can I download all the data?',
        a: 'Individual reports can be exported as PDFs. We do not offer bulk data downloads. If you need bulk access to federal court data, you can access the raw Federal Judicial Center data directly at fjc.gov.',
      },
      {
        q: 'Do you have an API?',
        a: 'Currently, MyCaseValue is available through our web platform only. We are exploring API access for research institutions and legal professionals. Contact us at support@mycasevalue.com if you are interested.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'What information do you collect about me?',
        a: 'MyCaseValue collects minimal data: your search queries, which case types you research, and basic usage analytics (page views, session duration). We do not track your identity, location, or browser behavior across other sites. We do not sell or share your data.',
      },
      {
        q: 'Do you have a privacy policy?',
        a: 'Yes. Our full privacy policy is available at https://mycasevalues.com/privacy. It explains exactly what data we collect, how we use it, and your rights.',
      },
      {
        q: 'Is my research private?',
        a: 'Yes. We do not identify or track individual users. Your searches are anonymous unless you create an account. We do not sell data to third parties.',
      },
      {
        q: 'Do you use cookies?',
        a: 'We use essential cookies for basic site functionality and optional analytics cookies to understand how our tool is used. You control cookie preferences in your browser settings.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F7FA' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: '#E2E8F0', background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#4F46E5' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: '#E4E5FF', color: '#4F46E5' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            FAQ
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-1.5px' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Get answers to common questions about MyCaseValue, federal court data, and how to use outcome statistics.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <section key={sectionIdx}>
              <h2 className="text-xl font-display font-bold mb-6" style={{ color: '#0F172A' }}>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((faq, qIdx) => (
                  <details
                    key={qIdx}
                    className="group p-5 rounded-xl border transition-colors cursor-pointer"
                    style={{
                      borderColor: '#E2E8F0',
                      background: '#FFFFFF',
                    }}
                  >
                    <summary className="flex items-start justify-between font-semibold select-none" style={{ color: '#0F172A' }}>
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
                    <div className="pt-4 mt-4 border-t" style={{ borderColor: '#E2E8F0' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center p-8 rounded-xl border" style={{ borderColor: '#E2E8F0', background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0F172A' }}>
            Still have questions?
          </h2>
          <p className="text-slate-500 mb-6">
            Get in touch with our support team.
          </p>
          <a href="mailto:support@mycasevalue.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#4F46E5' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact Support
          </a>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#E2E8F0' }}>
        <p className="text-[11px] text-slate-400 max-w-xl mx-auto px-6">
          MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only.
          This is not legal advice. No attorney-client relationship is created by using this tool.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
