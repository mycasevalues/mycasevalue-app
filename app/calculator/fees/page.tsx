import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Federal Court Fees Calculator',
  description: 'Calculate federal court filing fees, PACER fees, pro hac vice fees, and other litigation costs.',
  alternates: { canonical: `${SITE_URL}/calculator/fees` },
  openGraph: {
    title: 'Federal Court Fees Calculator',
    description: 'Calculate federal court filing fees, PACER fees, pro hac vice fees, and other litigation costs.',
    url: `${SITE_URL}/calculator/fees`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Fees Calculator',
    description: 'Calculate federal court filing fees and litigation costs.',
  },
};

const FILING_FEES = [
  { label: 'Civil Case Filing Fee', amount: '$405', note: 'Required for all new civil actions', rule: '28 U.S.C. § 1914(a)' },
  { label: 'Notice of Appeal', amount: '$605', note: 'Filing fee for appeals to Circuit Court', rule: '28 U.S.C. § 1913' },
  { label: 'Petition for Writ of Certiorari', amount: '$300', note: 'Filing fee for Supreme Court petitions', rule: 'Supreme Court Rule 38' },
  { label: 'Miscellaneous Case Filing', amount: '$52', note: 'E.g., motions to quash, registration of judgment', rule: '28 U.S.C. § 1914(b)' },
];

const PACER_FEES = [
  { label: 'Per-Page Access Fee', amount: '$0.10/page', note: 'Applies to search results, documents, and reports' },
  { label: 'Audio File Access', amount: '$2.40', note: 'Per audio file of court proceedings' },
  { label: 'Quarterly Fee Waiver', amount: 'Under $30', note: 'Fees waived if total charges are less than $30 per quarter' },
  { label: 'PACER Case Locator', amount: '$0.10/page', note: 'Searches across all federal courts' },
];

const PRO_HAC_VICE = [
  { district: 'S.D.N.Y.', fee: '$200' },
  { district: 'C.D. Cal.', fee: '$450' },
  { district: 'N.D. Ill.', fee: '$300' },
  { district: 'S.D. Tex.', fee: '$100' },
  { district: 'E.D.N.Y.', fee: '$200' },
  { district: 'D.N.J.', fee: '$150' },
  { district: 'N.D. Tex.', fee: '$250' },
  { district: 'S.D. Fla.', fee: '$150' },
];

export default function FeesPage() {
  return (
    <>
      {/* Header */}
      <header style={{ background: 'var(--gradient-hero)', padding: 'clamp(16px, 3vw, 32px) clamp(16px, 3vw, 24px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#FFF', padding: '4px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-display)' }}>
            REFERENCE
          </div>
          <h1 style={{ color: '#FFF', fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 600, margin: '0 0 12px', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
            Know Your Federal Court Costs Before Filing
          </h1>
          <p style={{ color: '#b8bcc0', fontSize: 'clamp(14px, 2vw, 16px)', margin: 0, maxWidth: 600, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
            Reference current filing fees, PACER costs, and fee waiver eligibility across all federal districts.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{ background: 'var(--color-surface-0)', padding: '12px 0', borderBottom: '1px solid var(--border-default)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <Link href="/calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Calculator</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Fee Schedule</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ background: 'var(--color-surface-1)', minHeight: '60vh', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Filing Fees */}
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>
              Court Filing Fees
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {FILING_FEES.map((fee, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#FAFBFC', borderRadius: 10, border: '1px solid var(--border-default)', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: 2 }}>
                      {fee.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {fee.note}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                      {fee.rule}
                    </div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                    {fee.amount}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              Source:{' '}
              <a href="https://www.uscourts.gov/services-forms/fees/district-court-miscellaneous-fee-schedule" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
                U.S. Courts — District Court Fee Schedule
              </a>
            </div>
          </div>

          {/* PACER Fees */}
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>
              PACER Access Fees
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {PACER_FEES.map((fee, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#FAFBFC', borderRadius: 10, border: '1px solid var(--border-default)', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: 2 }}>
                      {fee.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      {fee.note}
                    </div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                    {fee.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Hac Vice */}
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
              Pro Hac Vice Admission Fees
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 20px', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
              Fees vary by district. Below is a sample of common federal districts. Check your specific district&apos;s local rules for the exact fee.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
              {PRO_HAC_VICE.map((d, i) => (
                <div key={i} style={{ padding: '14px 18px', background: '#FAFBFC', borderRadius: 10, border: '1px solid var(--border-default)', textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', marginBottom: 4 }}>
                    {d.district}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                    {d.fee}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: '14px 0 0', fontFamily: 'var(--font-body)' }}>
              Range across all federal districts: approximately $100 – $450+
            </p>
          </div>

          {/* IFP Fee Waiver Section */}
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#E8F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                &#9733;
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-display)' }}>
                Fee Waiver (In Forma Pauperis)
              </h2>
            </div>

            <p style={{ fontSize: 14, color: 'var(--color-text-primary)', margin: '0 0 16px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              Under 28 U.S.C. § 1915, courts may authorize individuals to proceed without prepaying filing fees if they demonstrate inability to pay. This is known as proceeding <em>in forma pauperis</em> (IFP).
            </p>

            <div style={{ background: '#EDF3FB', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent-primary-hover)', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
                General Eligibility Guidelines
              </h3>
              <div style={{ fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                Courts typically consider whether your income falls below 150% of the federal poverty guidelines. For 2024, this is approximately $22,590 for an individual (varies by household size). You must disclose all income, assets, debts, and monthly expenses on the application. Receipt of government assistance (SSI, SNAP, Medicaid) generally supports eligibility but is not automatically sufficient.
              </div>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              <a
                href="https://www.uscourts.gov/forms/fee-waiver-forms/application-proceed-district-court-without-prepaying-fees-or-costs"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px',
                  background: '#FAFBFC', border: '1px solid var(--border-default)', borderRadius: 10,
                  textDecoration: 'none', color: 'var(--color-text-primary)', transition: 'border-color 0.2s',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                  AO 239 — Application to Proceed Without Prepaying Fees
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                  uscourts.gov &rarr;
                </span>
              </a>
              <a
                href="https://www.uscourts.gov/forms/fee-waiver-forms/application-proceed-district-court-without-prepaying-fees-or-costs-short"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px',
                  background: '#FAFBFC', border: '1px solid var(--border-default)', borderRadius: 10,
                  textDecoration: 'none', color: 'var(--color-text-primary)', transition: 'border-color 0.2s',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                  AO 240 — Short Form (for cases under $10,000)
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                  uscourts.gov &rarr;
                </span>
              </a>
            </div>

            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: '14px 0 0', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              Note: IFP status waives filing fees only — it does not waive service costs, deposition fees, or other litigation expenses. Prisoner litigants must pay filing fees in installments under the PLRA even with IFP status.
            </p>
          </div>

          {/* Disclaimer */}
          <div style={{
            padding: '16px', background: '#FEF3C7', borderLeft: '3px solid #D97706', borderRadius: 6,
            fontSize: 12, color: '#78350F', lineHeight: 1.6, fontFamily: 'var(--font-body)',
          }}>
            <strong>Important:</strong> Fee amounts are current as of December 2024. Fees are set by the Judicial Conference and may change. Always verify fees with the specific court before filing. Local district fees (e.g., pro hac vice, attorney admission) vary and are set by individual courts.
          </div>
        </div>
      </div>
    </>
  );
}
