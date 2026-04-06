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
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA' }}>
      <style>{`
        a[data-link-type="teal"] {
          color: #6D28D9;
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
          backgroundColor: '#1B3A5C',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: '#8B5CF6',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '12px',
              fontFamily: 'var(--font-display)',
            }}>
              LEGAL
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
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
            Please read this disclaimer carefully before using MyCaseValue. This document explains important limitations on how our service should be used and what it cannot provide. By using MyCaseValue, you acknowledge and agree to all terms outlined below.
          </p>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-body)',
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            Last updated: April 2026. This page is print-friendly. Use your browser's print function (Ctrl+P / Cmd+P).
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #E5E7EB', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: '#F7F8FA' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
            <a href="/" data-link-type="teal" style={{ color: '#6D28D9' }}>
              Home
            </a>
            <span style={{ color: '#4B5563' }}>/</span>
            <span style={{ color: '#4B5563' }}>Disclaimer</span>
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
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Not Legal Advice
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
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
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              No Attorney-Client Relationship
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
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
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Data Sources and Public Records
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              All data presented on MyCaseValue is sourced from publicly available federal court records and databases, including:
            </p>
            <ul style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              marginTop: 12,
              paddingLeft: '24px',
            }}>
              <li style={{ marginBottom: '8px' }}><strong>Federal Judicial Center Integrated Database (FJC IDB):</strong> Comprehensive federal civil case outcome data</li>
              <li style={{ marginBottom: '8px' }}><strong>Public Access to Court Electronic Records (PACER):</strong> Official federal court case documents and docket information</li>
              <li style={{ marginBottom: '8px' }}><strong>CourtListener:</strong> Open-source federal court data and research platform</li>
              <li><strong>Other official federal court databases:</strong> Additional public records from federal courts</li>
            </ul>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
              marginTop: 12,
            }}>
              The underlying federal court data is in the public domain under 17 U.S.C. § 105. We do not create, modify, or invent data—we aggregate, categorize, analyze, and present publicly available information. MyCaseValue's value-add is in our aggregation methodology, categorization scheme, and analytical presentation, not in the creation of the underlying data.
            </p>
          </section>

          {/* Historical Data, Not Predictions */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Historical Data, Not Predictions
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
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
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Data Limitations and Accuracy
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              While we strive for accuracy and employ quality control measures, we make no representation or warranty regarding the completeness, accuracy, timeliness, or reliability of any data on MyCaseValue. You should be aware of the following limitations:
            </p>

            <ul style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              marginTop: 12,
              paddingLeft: '24px',
            }}>
              <li style={{ marginBottom: '8px' }}><strong>Incomplete data:</strong> Not all federal cases are fully documented in public databases. Some records may be incomplete, redacted, or unavailable.</li>
              <li style={{ marginBottom: '8px' }}><strong>Clerical and classification errors:</strong> Federal court records may contain data entry errors, clerical mistakes, or misclassifications by court staff.</li>
              <li style={{ marginBottom: '8px' }}><strong>Case categorization challenges:</strong> Complex cases may not be perfectly categorized. Cases with multiple claims may be classified under only one primary claim type.</li>
              <li style={{ marginBottom: '8px' }}><strong>Partial victories and settlements:</strong> Outcome coding simplifies complex results. A case marked "plaintiff win" may have resulted in a partial victory, settlement, or favorable judgment on limited claims.</li>
              <li style={{ marginBottom: '8px' }}><strong>Hidden settlement data:</strong> Most settlement amounts are confidential and not reported in court records, so settlement ranges are based on incomplete data.</li>
              <li style={{ marginBottom: '8px' }}><strong>Procedural changes:</strong> Federal civil procedure, judicial practices, and sentencing guidelines have changed significantly over decades. Historical data may not reflect current legal standards or procedural requirements.</li>
              <li style={{ marginBottom: '8px' }}><strong>Judge reassignments:</strong> Judge identities and assignments may have changed over time, affecting historical trend analysis.</li>
              <li><strong>Data delays:</strong> There may be significant delays between case disposition and publication in federal databases.</li>
            </ul>

            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
              marginTop: 12,
            }}>
              You acknowledge and accept that all data is provided on an "AS-IS" basis without warranties. Always verify critical information independently from original federal court documents and consult with a licensed attorney.
            </p>
          </section>

          {/* No Guarantees */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              No Guarantees About Outcomes
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              <strong>MyCaseValue provides no guarantees, warranties, or assurances regarding the outcome of any case.</strong> Historical aggregate data cannot and should not be used to predict individual case outcomes. The fact that cases in a specific category achieved a 60% win rate does not mean your case will result in a win. Many unique factors affect each case's outcome:
            </p>

            <ul style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              marginTop: 12,
              paddingLeft: '24px',
            }}>
              <li style={{ marginBottom: '8px' }}><strong>Specific facts:</strong> Your case's unique facts differ from others, making historical patterns non-predictive.</li>
              <li style={{ marginBottom: '8px' }}><strong>Legal arguments:</strong> The specific legal theories raised in your case may differ from previous cases.</li>
              <li style={{ marginBottom: '8px' }}><strong>Applicable law:</strong> Controlling precedent, statutory law, and regulations may have changed since historical cases were decided.</li>
              <li style={{ marginBottom: '8px' }}><strong>Jurisdiction:</strong> Different judges, courts, and circuits apply law differently based on their interpretation and precedent.</li>
              <li style={{ marginBottom: '8px' }}><strong>Judge assignments:</strong> Your assigned judge may have different ruling patterns, biases, or experience than historical averages.</li>
              <li style={{ marginBottom: '8px' }}><strong>Quality of representation:</strong> The skill and experience of your attorney and opposing counsel will significantly impact outcome.</li>
              <li style={{ marginBottom: '8px' }}><strong>Procedural posture:</strong> Whether your case is decided on a motion, summary judgment, trial, or appeal changes likely outcomes.</li>
              <li><strong>Settlement dynamics:</strong> Settlement negotiation skill, risk tolerance, and timing differ case-by-case.</li>
            </ul>

            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
              marginTop: 12,
            }}>
              <strong>Past win rates do not guarantee future results for your case. Settlement ranges are historical averages, not valuations of your claim.</strong>
            </p>
          </section>

          {/* Always Consult an Attorney */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Always Consult a Licensed Attorney
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
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
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Liability Limitations
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
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
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Privacy & Data Handling
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              We respect your privacy. We do not store information about the cases you research or the queries you make. All searches are performed privately and encrypted. We do not sell, trade, or share your research data with third parties. For complete details on our privacy practices, please see our <a href="/privacy" data-link-type="teal" style={{ color: '#6D28D9', textDecoration: 'none' }}>Privacy Policy</a>.
            </p>
          </section>

          {/* Changes to Disclaimer */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Changes to This Disclaimer
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
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
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Questions About This Disclaimer?
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              If you have questions about this disclaimer, how MyCaseValue works, or need clarification about our data limitations, please contact us:
            </p>
            <div style={{
              marginTop: 16,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Email:</strong> <a href="mailto:support@mycasevalue.com" data-link-type="teal" style={{ color: '#6D28D9', textDecoration: 'none' }}>support@mycasevalue.com</a>
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Website:</strong> <a href="https://mycasevalues.com" data-link-type="teal" style={{ color: '#6D28D9', textDecoration: 'none' }}>https://mycasevalues.com</a>
              </p>
            </div>
          </section>

          {/* Related Legal Pages */}
          <section>
            <h2 style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              marginBottom: '1rem',
              marginTop: 0,
              color: '#0f0f0f',
            }}>
              Related Legal Pages
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              This disclaimer is part of MyCaseValue's complete legal framework. Please review our other legal documents to fully understand your rights and our obligations:
            </p>
            <div style={{
              marginTop: 16,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Terms of Service:</strong> <a href="/terms" data-link-type="teal" style={{ color: '#6D28D9', textDecoration: 'none' }}>Read our Terms of Service</a> for rules governing use of MyCaseValue and our limitations of liability.
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Privacy Policy:</strong> <a href="/privacy" data-link-type="teal" style={{ color: '#6D28D9', textDecoration: 'none' }}>Review our Privacy Policy</a> to understand how we collect, use, and protect your data.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section style={{
            padding: '32px',
            borderRadius: '12px',
            border: '2px solid #8B5CF6',
            backgroundColor: '#FFF3F4',
          }}>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: 0,
              color: '#0f0f0f',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
            }}>
              <strong>Your Acknowledgment:</strong> By using MyCaseValue, you acknowledge that you have carefully read and understood this disclaimer in its entirety. You understand and accept:
            </p>
            <ul style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              color: '#0f0f0f',
              fontFamily: 'var(--font-body)',
              marginTop: 12,
              paddingLeft: '24px',
              margin: '12px 0 0 0',
            }}>
              <li style={{ marginBottom: '8px' }}>MyCaseValue is not legal advice and does not create an attorney-client relationship</li>
              <li style={{ marginBottom: '8px' }}>You will consult with a licensed attorney before taking any legal action</li>
              <li style={{ marginBottom: '8px' }}>Historical case data cannot predict your specific case outcome</li>
              <li style={{ marginBottom: '8px' }}>MyCaseValue data has limitations and may contain errors or incomplete information</li>
              <li style={{ marginBottom: '8px' }}>You use MyCaseValue entirely at your own risk</li>
              <li>MyCaseValue is not liable for any decisions or actions you take based on our data</li>
            </ul>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: '12px 0 0 0',
              color: '#0f0f0f',
              fontFamily: 'var(--font-body)',
            }}>
              If you do not agree with this disclaimer, you should not use MyCaseValue.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
}
