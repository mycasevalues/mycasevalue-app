import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer — MyCaseValue | Not Legal Advice',
  description: 'Important disclaimer: MyCaseValue is not a law firm and provides data for informational purposes only, not legal advice.',
  alternates: { canonical: 'https://mycasevalues.com/disclaimer' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Disclaimer — MyCaseValue',
    description: 'Important disclaimer: MyCaseValue is not a law firm and provides data for informational purposes only, not legal advice.',
    url: 'https://mycasevalues.com/disclaimer',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
    { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: 'https://mycasevalues.com/disclaimer' },
  ],
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b py-4" style={{ borderColor: 'var(--border-default)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
            <a href="/" className="hover:opacity-80 transition-opacity" style={{ color: '#4F46E5' }}>
              Home
            </a>
            <span>/</span>
            <span>Disclaimer</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div
        className="border-b py-16 sm:py-20"
        style={{
          borderColor: 'var(--border-default)',
          background: 'linear-gradient(180deg, #131B2E 0%, #0B1221 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            Disclaimer
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Please read this disclaimer carefully. By using MyCaseValue, you agree to the terms outlined below.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-invert max-w-none space-y-8">
          {/* Not Legal Advice */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Not Legal Advice
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              MyCaseValue is <strong>not a law firm</strong> and does not provide legal advice. The information, tools, and data presented on this website are for informational and research purposes only. Nothing on MyCaseValue should be construed as legal advice, and you should not rely on any content for the purpose of taking legal action without first consulting with a qualified attorney licensed to practice law in your jurisdiction.
            </p>
          </section>

          {/* No Attorney-Client Relationship */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              No Attorney-Client Relationship
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Your use of MyCaseValue does not create an attorney-client relationship between you and MyCaseValue, its creators, or any associated parties. We cannot advise you on your specific legal situation, and we do not have the attorney-client privilege with you. If you need legal advice specific to your case, you must consult with a licensed attorney.
            </p>
          </section>

          {/* Data Sources */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Data Sources
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              All data presented on MyCaseValue is sourced from publicly available federal court records, including the Federal Judicial Center Integrated Database (FJC IDB), Public Access to Court Electronic Records (PACER), and CourtListener. These sources provide historical case outcome data collected from actual federal civil litigation. We do not create, modify, or invent data—we aggregate and analyze what is publicly available.
            </p>
          </section>

          {/* Historical Data, Not Predictions */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Historical Data, Not Predictions
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              The statistics, win rates, settlement ranges, and case timelines presented on MyCaseValue are based on aggregate historical data from past federal court cases. These figures show what has happened in similar cases in the past. They are not predictions of what will happen in your case. Every case is unique, and the outcome of your specific case depends on numerous factors including the specific facts, applicable law, jurisdiction, judge, and quality of legal representation.
            </p>
          </section>

          {/* Limitations and Accuracy */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Data Limitations and Accuracy
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
              While we strive for accuracy, we make no representation or warranty regarding the completeness, accuracy, timeliness, or reliability of any data on MyCaseValue. Federal court data can be incomplete, contain clerical errors, or reflect classification issues. Some cases may not be properly categorized. Historical data may not reflect current legal standards, judge assignments, or procedural changes. You acknowledge and accept that all data is provided on an "as-is" basis.
            </p>
          </section>

          {/* No Guarantees */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              No Guarantees About Outcomes
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              MyCaseValue provides no guarantees, warranties, or assurances regarding the outcome of any case. The fact that historical cases in a category achieved a certain win rate does not mean your case will achieve the same outcome. Court decisions are made by judges and, in some cases, juries, and depend on countless factors specific to your case that are not captured in historical aggregate data.
            </p>
          </section>

          {/* Always Consult an Attorney */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Always Consult a Licensed Attorney
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              If you believe you have a legal claim or are involved in a legal dispute, you should consult with a qualified, licensed attorney in your jurisdiction as soon as possible. An attorney can review the specific facts of your situation, advise you of your legal rights and options, and represent your interests. Many attorneys offer free initial consultations. If you cannot afford an attorney, contact your local bar association or legal aid office for resources.
            </p>
          </section>

          {/* Liability Limitations */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Liability Limitations
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              To the fullest extent permitted by law, MyCaseValue, its creators, owners, operators, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of this website, including any claims based on reliance on data, breach of warranty, or any other legal theory. This limitation applies even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Privacy & Data Handling */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Privacy & Data Handling
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              We respect your privacy. We do not store information about the cases you research or the queries you make. All searches are performed privately and encrypted. We do not sell, trade, or share your research data with third parties. For complete details on our privacy practices, please see our <a href="/privacy" style={{ color: '#4F46E5', textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>
          </section>

          {/* Changes to Disclaimer */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Changes to This Disclaimer
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              MyCaseValue reserves the right to update or modify this disclaimer at any time. Changes are effective immediately upon posting. Your continued use of the website after any changes constitutes your acceptance of the updated disclaimer. We encourage you to review this disclaimer periodically to stay informed of any changes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              Questions?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              If you have questions about this disclaimer or how MyCaseValue works, please contact us at <a href="mailto:support@mycasevalue.com" style={{ color: '#4F46E5', textDecoration: 'underline' }}>support@mycasevalue.com</a>.
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#131B2E' }}>
            <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>
              By using MyCaseValue, you acknowledge that you have read this disclaimer, understand it, and agree to be bound by it. If you do not agree with any part of this disclaimer, you should not use MyCaseValue.
            </p>
          </section>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center mt-16" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-muted)' }}>
          MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only.
          We are not a law firm. This is not legal advice. No attorney-client relationship is created by using this tool.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
