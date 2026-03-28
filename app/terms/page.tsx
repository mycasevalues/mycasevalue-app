import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — MyCaseValue',
  description: 'MyCaseValue Terms of Service. Read our service agreement, disclaimers, and user responsibilities.',
  alternates: { canonical: 'https://mycasevalues.com/terms' },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Terms', item: 'https://mycasevalues.com/terms' },
      ],
    },
  ],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0B1221' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: '#1E293B', background: 'linear-gradient(180deg, #131B2E 0%, #0B1221 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#4F46E5' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: '#E4E5FF', color: '#4F46E5' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            TERMS
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#F0F2F5', letterSpacing: '-1.5px' }}>
            Terms of Service
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-slate max-w-none space-y-8 text-[#94A3B8] text-sm leading-relaxed">

          <div className="p-6 rounded-xl border-l-4" style={{ borderColor: '#D97706', background: '#1E293B' }}>
            <p className="m-0 font-semibold" style={{ color: '#D97706' }}>
              IMPORTANT: By using MyCaseValue, you agree that this Service provides informational data only and is NOT legal advice.
              MyCaseValue does not create an attorney-client relationship. Always consult a licensed attorney for legal matters.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of MyCaseValue (the "Service").
              By accessing, browsing, or using MyCaseValue, you accept and agree to be bound by these Terms.
              If you do not agree, do not use the Service.
            </p>
            <p>
              We may modify these Terms at any time. Changes are effective immediately upon posting.
              Your continued use constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              2. Description of Service
            </h2>
            <p>
              MyCaseValue is a research tool that aggregates and displays historical outcome data from 4.2M+ federal civil court cases.
              The Service provides aggregate statistics on case outcomes, win rates, settlement percentages, timelines, and recovery ranges
              by case type, circuit, and jurisdiction.
            </p>
            <p>
              The Service is provided "as-is" for informational and research purposes only. It is not a legal service, does not provide legal advice,
              and does not replace consultation with a licensed attorney.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              3. NOT Legal Advice — Disclaimer
            </h2>
            <p>
              <strong>MyCaseValue is not a law firm. We do not provide legal advice, legal opinions, or legal analysis of individual cases.</strong>
            </p>
            <p>
              Specifically:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li>No attorney-client relationship is created by using MyCaseValue</li>
              <li>Aggregate data cannot evaluate your specific case</li>
              <li>Historical outcomes do not predict your case outcome</li>
              <li>We do not evaluate case strength, liability, or damages</li>
              <li>Past win rates do not guarantee future results</li>
              <li>Settlement ranges are historical averages, not valuations</li>
            </ul>
            <p className="mt-4">
              <strong>You are solely responsible for consulting with a licensed attorney before taking legal action.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              4. Limitations of Liability
            </h2>
            <p>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li>MyCaseValue is provided "AS-IS" without warranties of any kind</li>
              <li>We disclaim all implied warranties (merchantability, fitness for purpose)</li>
              <li>We are not liable for errors, omissions, or inaccuracies in data</li>
              <li>We are not liable for decisions made based on our data</li>
              <li>In no event shall MyCaseValue be liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount you paid us (if any)</li>
            </ul>
            <p className="mt-4">
              You use MyCaseValue entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              5. Data Accuracy & Disclaimers
            </h2>
            <p>
              MyCaseValue aggregates data from official federal court records. While we employ quality checks, we do not guarantee:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li>100% accuracy of historical data or statistical calculations</li>
              <li>That outcome coding captures all nuances (e.g., partial victories, consent decrees)</li>
              <li>That settlement amounts are systematically reported (most are confidential)</li>
              <li>That future cases will follow historical patterns</li>
              <li>That data is free from errors, gaps, or anomalies</li>
            </ul>
            <p className="mt-4">
              Always verify critical information independently and consult a licensed attorney.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              6. User Responsibilities
            </h2>
            <p>
              By using MyCaseValue, you agree to:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li>Use the Service only for lawful purposes</li>
              <li>Not engage in harassment, abuse, or illegal activity</li>
              <li>Not attempt to disrupt or hack the Service</li>
              <li>Not scrape or bulk-download data without permission</li>
              <li>Not reverse-engineer or copy our software</li>
              <li>Not use the Service for automated data collection</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              7. Intellectual Property
            </h2>
            <p>
              MyCaseValue's aggregation, categorization, presentation, and analytical methods are protected by copyright.
            </p>
            <p className="mt-4">
              The underlying federal court data is public domain under 17 U.S.C. § 105. You may use, cite, and reference this data,
              but you must attribute MyCaseValue when using our aggregations or statistics.
            </p>
            <p className="mt-4">
              You may not:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li>Copy, reproduce, or distribute MyCaseValue's presentation or analysis</li>
              <li>Create competing products based on our methodology</li>
              <li>Claim ownership of our data or analysis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              8. Payment & Refunds
            </h2>
            <p>
              MyCaseValue offers free basic reports and premium paid reports.
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Single reports:</strong> $5.99 per report (non-refundable after delivery)</li>
              <li><strong>Subscription:</strong> $9.99/month for unlimited premium reports (cancellable anytime)</li>
            </ul>
            <p className="mt-4">
              <strong>Refund Policy:</strong> Reports are delivered immediately upon purchase and are non-refundable unless there is a technical error.
              Subscription cancellations take effect at the end of the current billing period.
            </p>
            <p className="mt-4">
              Payments are processed securely via Stripe. We do not store full credit card information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              9. Termination of Use
            </h2>
            <p>
              We may suspend or terminate your access to MyCaseValue at any time, with or without cause, if you:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li>Violate these Terms or applicable laws</li>
              <li>Engage in abusive or disruptive behavior</li>
              <li>Attempt to hack or disrupt the Service</li>
              <li>Violate intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              10. Third-Party Links & Services
            </h2>
            <p>
              MyCaseValue may contain links to third-party websites (PACER, CourtListener, Federal Judicial Center, etc.).
              We are not responsible for the content, accuracy, or practices of third-party sites.
              Your use of third-party sites is governed by their own terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              11. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless MyCaseValue, its owners, employees, and service providers from any claims,
              damages, or costs arising from your use of the Service, violation of these Terms, or infringement of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              12. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of the United States without regard to conflict of law principles.
              Any disputes shall be subject to exclusive jurisdiction of the federal and state courts located in the United States.
            </p>
            <p className="mt-4">
              Before litigation, we encourage good-faith negotiation. Contact us at support@mycasevalue.com to resolve disputes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              13. Privacy
            </h2>
            <p>
              Your use of MyCaseValue is also governed by our Privacy Policy at https://mycasevalues.com/privacy.
              Please review it to understand our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
              14. Contact Us
            </h2>
            <p>
              For questions about these Terms, contact us:
            </p>
            <div className="mt-4 p-4 rounded-lg" style={{ background: '#131B2E' }}>
              <p className="m-0"><strong>Email:</strong> support@mycasevalue.com</p>
              <p className="m-0 mt-2"><strong>Website:</strong> https://mycasevalues.com</p>
            </div>
          </section>

        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#1E293B' }}>
        <p className="text-[11px] text-[#94A3B8] max-w-xl mx-auto px-6">
          © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
