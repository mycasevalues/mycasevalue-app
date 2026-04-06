import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Disclaimer — MyCaseValue | Not Legal Advice',
  description: 'Important disclaimer: MyCaseValue is not a law firm and provides data for informational purposes only, not legal advice.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Disclaimer — MyCaseValue',
    description: 'Important disclaimer: MyCaseValue is not a law firm and provides data for informational purposes only, not legal advice.',
    url: `${SITE_URL}/disclaimer`,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: `${SITE_URL}/disclaimer` },
  ],
};

export default function DisclaimerPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F6F7' }}>
      <style>{`
        a[data-link-type="teal"] {
          color: #006997;
          text-decoration: none;
        }
        a[data-link-type="teal"]:hover {
          text-decoration: underline;
          opacity: 0.9;
        }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div
        style={{
          backgroundColor: '#00172E',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: '#E8171F',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              fontFamily: 'var(--font-display)',
            }}>
              LEGAL
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-1px',
              marginBottom: 12,
            }}
          >
            Disclaimer
          </h1>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.7,
            }}
          >
            Please read this disclaimer carefully. By using MyCaseValue, you agree to the terms outlined below.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #D5D8DC', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: '#F5F6F7' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
            <a href="/" data-link-type="teal" style={{ color: '#006997' }}>
              Home
            </a>
            <span style={{ color: '#455A64' }}>/</span>
            <span style={{ color: '#455A64' }}>Disclaimer</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', paddingTop: '64px', paddingBottom: '64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Not Legal Advice */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Not Legal Advice
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              MyCaseValue is <strong>not a law firm</strong> and does not provide legal advice. The information, tools, and data presented on this website are for informational and research purposes only. Nothing on MyCaseValue should be construed as legal advice, and you should not rely on any content for the purpose of taking legal action without first consulting with a qualified attorney licensed to practice law in your jurisdiction.
            </p>
          </section>

          {/* No Attorney-Client Relationship */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              No Attorney-Client Relationship
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              Your use of MyCaseValue does not create an attorney-client relationship between you and MyCaseValue, its creators, or any associated parties. We cannot advise you on your specific legal situation, and we do not have the attorney-client privilege with you. If you need legal advice specific to your case, you must consult with a licensed attorney.
            </p>
          </section>

          {/* Data Sources */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Data Sources
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              All data presented on MyCaseValue is sourced from publicly available federal court records, including the Federal Judicial Center Integrated Database (FJC IDB), Public Access to Court Electronic Records (PACER), and CourtListener. These sources provide historical case outcome data collected from actual federal civil litigation. We do not create, modify, or invent data—we aggregate and analyze what is publicly available.
            </p>
          </section>

          {/* Historical Data, Not Predictions */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Historical Data, Not Predictions
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              The statistics, win rates, settlement ranges, and case timelines presented on MyCaseValue are based on aggregate historical data from past federal court cases. These figures show what has happened in similar cases in the past. They are not predictions of what will happen in your case. Every case is unique, and the outcome of your specific case depends on numerous factors including the specific facts, applicable law, jurisdiction, judge, and quality of legal representation.
            </p>
          </section>

          {/* Limitations and Accuracy */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Data Limitations and Accuracy
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              While we strive for accuracy, we make no representation or warranty regarding the completeness, accuracy, timeliness, or reliability of any data on MyCaseValue. Federal court data can be incomplete, contain clerical errors, or reflect classification issues. Some cases may not be properly categorized. Historical data may not reflect current legal standards, judge assignments, or procedural changes. You acknowledge and accept that all data is provided on an "as-is" basis.
            </p>
          </section>

          {/* No Guarantees */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              No Guarantees About Outcomes
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              MyCaseValue provides no guarantees, warranties, or assurances regarding the outcome of any case. The fact that historical cases in a category achieved a certain win rate does not mean your case will achieve the same outcome. Court decisions are made by judges and, in some cases, juries, and depend on countless factors specific to your case that are not captured in historical aggregate data.
            </p>
          </section>

          {/* Always Consult an Attorney */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Always Consult a Licensed Attorney
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              If you believe you have a legal claim or are involved in a legal dispute, you should consult with a qualified, licensed attorney in your jurisdiction as soon as possible. An attorney can review the specific facts of your situation, advise you of your legal rights and options, and represent your interests. Many attorneys offer free initial consultations. If you cannot afford an attorney, contact your local bar association or legal aid office for resources.
            </p>
          </section>

          {/* Liability Limitations */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Liability Limitations
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              To the fullest extent permitted by law, MyCaseValue, its creators, owners, operators, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or related to your use of this website, including any claims based on reliance on data, breach of warranty, or any other legal theory. This limitation applies even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Privacy & Data Handling */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Privacy & Data Handling
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              We respect your privacy. We do not store information about the cases you research or the queries you make. All searches are performed privately and encrypted. We do not sell, trade, or share your research data with third parties. For complete details on our privacy practices, please see our <a href="/privacy" data-link-type="teal" style={{ color: '#006997', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>
          </section>

          {/* Changes to Disclaimer */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Changes to This Disclaimer
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              MyCaseValue reserves the right to update or modify this disclaimer at any time. Changes are effective immediately upon posting. Your continued use of the website after any changes constitutes your acceptance of the updated disclaimer. We encourage you to review this disclaimer periodically to stay informed of any changes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#212529',
            }}>
              Questions?
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              If you have questions about this disclaimer or how MyCaseValue works, please contact us at <a href="mailto:support@mycasevalue.com" data-link-type="teal" style={{ color: '#006997', textDecoration: 'none' }}>support@mycasevalue.com</a>.
            </p>
          </section>

          {/* Acknowledgment */}
          <section style={{
            padding: '32px',
            borderRadius: '2px',
            border: '1px solid #D5D8DC',
            backgroundColor: '#FFFFFF',
          }}>
            <p style={{
              fontSize: '0.875rem',
              lineHeight: '1.5',
              margin: 0,
              color: '#455A64',
              fontFamily: 'var(--font-body)',
            }}>
              By using MyCaseValue, you acknowledge that you have read this disclaimer, understand it, and agree to be bound by it. If you do not agree with any part of this disclaimer, you should not use MyCaseValue.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
}
