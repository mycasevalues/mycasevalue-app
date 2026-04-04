/**
 * ServerContent.tsx — Server Component
 * Renders SEO-critical content (FAQ, case types, features, CTA)
 * as static HTML for crawlers. Hidden when the client-side app mounts.
 * No 'use client' directive — this is a pure Server Component.
 */

import NewsletterSignup from './ui/NewsletterSignup';

const FAQ_ITEMS = [
  { q: 'What is MyCaseValue?', a: 'MyCaseValue is a research tool that displays aggregate historical outcome data from over 5.1 million public federal court records. It helps individuals and attorneys research win rates, settlement ranges, timelines, and judge analytics. It is not legal advice.' },
  { q: 'Where does the data come from?', a: 'All data is sourced from three official public federal court record systems: the Federal Judicial Center Integrated Database (FJCID), PACER (Public Access to Court Electronic Records), and CourtListener. We do not create or estimate any data.' },
  { q: 'What federal courts does your data cover?', a: 'We have comprehensive data from all 94 federal judicial districts across all 50 states, plus historical records dating back to 1970. Our database includes civil cases from federal PACER records and the Federal Judicial Center Integrated Database.' },
  { q: 'Is MyCaseValue legal advice?', a: 'No. MyCaseValue provides aggregate data from public records only. It does not evaluate individual cases, provide legal opinions, or create any attorney-client relationship. Always consult a licensed attorney for legal advice.' },
  { q: 'How accurate is the data?', a: 'Our data comes directly from federal court records (PACER, Federal Judicial Center, CourtListener). We have reported 94% accuracy in case outcome classifications. Data limitations are always noted in your report.' },
  { q: 'What types of cases does MyCaseValue cover?', a: 'MyCaseValue covers 84 federal case types across 10 categories including employment discrimination, personal injury, medical malpractice, product liability, civil rights, consumer protection, breach of contract, and more. Data spans all 94 federal districts.' },
  { q: 'How much does it cost?', a: 'Basic reports are free with no account required. Premium reports are $5.99 for a single report with full settlement ranges and judge data. Unlimited Reports are $9.99/month. Attorney Mode with AI predictions and bulk analysis is $29.99/month.' },
  { q: 'How is MyCaseValue different from Westlaw or LexisNexis?', a: 'MyCaseValue is designed specifically for individuals and small firms, not large law firms. It offers free access to federal court outcome data, transparent pricing, bilingual support (English/Spanish), and plaintiff-focused analytics — all without requiring a legal subscription.' },
  { q: 'Is my information kept confidential?', a: 'Yes. We do not store, share, or sell your data. All case information you enter is used only to generate your report. We do not track individuals or contact you about your case unless you opt into our mailing list.' },
  { q: 'How quickly do I get my report?', a: 'Your free report is generated instantly, typically within 60 seconds. Premium reports with detailed settlement data and attorney impact analysis also generate in real time. No account required for free reports.' },
  { q: 'What do the settlement percentiles mean?', a: 'Settlement percentiles show where outcomes fall in the distribution. P10 means 10% of cases settled for less. P50 is the median. P90 means only 10% exceeded that amount. These come from FJC IDB and BJS Civil Trial Statistics.' },
  { q: 'How often is the data updated?', a: 'Core data from the Federal Judicial Center IDB is updated quarterly. EEOC statistics are updated annually. CourtListener opinion data updates daily. Premium tiers get more frequent updates.' },
];

const CASE_CATEGORIES = [
  { id: 'employment-workplace', name: 'Employment & Workplace', description: 'Wrongful termination, discrimination, sexual harassment, unpaid wages, retaliation, ADA violations, and more.', count: 18 },
  { id: 'personal-injury', name: 'Personal Injury', description: 'Car accidents, truck accidents, medical malpractice, product liability, slip and fall, wrongful death, and more.', count: 18 },
  { id: 'consumer-protection', name: 'Consumer Protection', description: 'Debt collection harassment (FDCPA), data breaches, robocalls (TCPA), credit reporting errors, and more.', count: 11 },
  { id: 'civil-rights', name: 'Civil Rights', description: 'Police excessive force, racial discrimination, housing discrimination, wrongful arrest, voting rights, and more.', count: 11 },
  { id: 'money-business', name: 'Money & Business', description: 'Insurance bad faith, breach of contract, fraud, securities violations, intellectual property disputes, and more.', count: 13 },
  { id: 'housing-property', name: 'Housing & Property', description: 'Evictions, foreclosures, construction defects, landlord disputes, HOA issues, and property damage claims.', count: 11 },
  { id: 'healthcare-benefits', name: 'Healthcare & Benefits', description: 'Insurance denials, disability benefits (SSDI/SSI), ERISA disputes, veterans benefits, and more.', count: 9 },
  { id: 'family-law', name: 'Family Law', description: 'Divorce, child custody, child support, domestic violence protective orders, adoption, and parental rights.', count: 6 },
  { id: 'government', name: 'Government', description: 'Benefits denied, constitutional violations, tax disputes, immigration, Social Security, and FOIA requests.', count: 9 },
  { id: 'education', name: 'Education', description: 'Title IX, special education disputes (IDEA), student discipline, student loan servicing, and school negligence.', count: 5 },
];

export default function ServerContent() {
  return (
    <div className="server-content-seo" aria-label="Additional content">
      {/* ── CASE CATEGORIES ───────────────────────────────── */}
      <section
        style={{
          background: '#EDEEEE',
          borderTop: '1px solid #D5D8DC',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Case types
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              84 Federal Case Types Covered
            </h2>
            <p style={{ fontSize: '19px', color: '#212529', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Research win rates, settlement ranges, and timelines for any federal case type across all 94 districts.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {CASE_CATEGORIES.map((cat, i) => (
              <a key={i} href={`/cases/${cat.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                  transition: 'all 150ms',
                  cursor: 'pointer',
                  height: '100%',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', margin: 0 }}>
                      {cat.name}
                    </h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      background: 'rgba(232,23,31,0.08)',
                      color: '#E8171F',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-body)',
                      flexShrink: 0,
                      marginLeft: '8px',
                      border: '1px solid rgba(232,23,31,0.15)',
                    }}>
                      {cat.count} types
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#212529', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                    {cat.description}
                  </p>
                  <p style={{ fontSize: '13px', color: '#006997', fontFamily: 'var(--font-body)', marginTop: '16px', marginBottom: 0, fontWeight: 500 }}>
                    View outcome data →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              What you get
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              What You Get in Every Report
            </h2>
            <p style={{ fontSize: '19px', color: '#212529', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              { title: 'Win Rate Analysis', desc: 'Plaintiff vs. defendant win percentages based on historical federal court outcomes for your specific case type and district.' },
              { title: 'Settlement Ranges', desc: 'Full settlement distribution from 10th to 90th percentile. See median amounts, typical ranges, and outlier values from real cases.' },
              { title: 'Case Timeline Data', desc: 'Average case duration from filing to resolution. Understand how long similar cases typically take in your district.' },
              { title: 'Judge Analytics', desc: 'Judge-specific outcome patterns, motion grant rates, and behavioral trends for judges in your federal district.' },
              { title: 'Attorney Impact', desc: 'How outcomes differ between represented plaintiffs and pro se litigants. Data-driven evidence on the value of legal representation.' },
              { title: 'District Comparison', desc: 'Compare outcomes across all 94 federal districts. See how your district ranks for your case type.' },
            ].map((feat, i) => (
              <div
                key={i}
                style={{
                  background: '#FAFBFC',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#212529',
                    margin: '0 0 8px 0',
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#212529',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section
        style={{
          background: '#EDEEEE',
          borderTop: '1px solid #D5D8DC',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Testimonials
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              What people are saying
            </h2>
            <p style={{ fontSize: '19px', color: '#212529', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              From plaintiffs and attorneys using MyCaseValue to research federal court outcomes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              {
                quote: 'I had no idea what my wrongful termination case was worth before finding this. The data gave me the confidence to negotiate instead of just accepting the first offer.',
                name: 'Sarah M.',
                role: 'Plaintiff, Employment Discrimination Case',
                district: 'S.D.N.Y.',
              },
              {
                quote: 'As a solo practitioner, I use MyCaseValue to quickly benchmark settlement ranges for clients. It\u2019s the first tool I\u2019ve found that\u2019s actually designed for smaller firms.',
                name: 'James T.',
                role: 'Personal Injury Attorney',
                district: 'N.D. California',
              },
              {
                quote: 'The judge analytics feature helped me understand what to expect in my district. The data was consistent with what my attorney told me, which built my confidence in the process.',
                name: 'Maria R.',
                role: 'Plaintiff, Civil Rights Case',
                district: 'S.D. Florida',
              },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderLeft: '3px solid #E8171F',
                  borderRadius: '4px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '15px',
                    color: '#212529',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    margin: '0 0 16px 0',
                    fontWeight: 300,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#212529',
                    margin: '0 0 4px 0',
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '13px',
                    color: '#455A64',
                    margin: 0,
                  }}
                >
                  {t.role} · {t.district}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: '12px',
              color: '#455A64',
              textAlign: 'center',
              marginTop: '16px',
              fontStyle: 'italic',
            }}
          >
            Testimonials are illustrative examples of typical user experiences. Individual results vary.
          </p>
        </div>
      </section>

      {/* ── HOW IT COMPARES ──────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid #D5D8DC',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              How we compare
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Built for plaintiffs, not law firms
            </h2>
            <p style={{ fontSize: '19px', color: '#212529', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              MyCaseValue is the only federal court data platform designed from the ground up for individuals and small firms.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #D5D8DC' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#455A64', fontWeight: 600, fontSize: '13px' }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#212529', fontWeight: 700, background: 'rgba(232,23,31,0.08)', borderRadius: '4px 4px 0 0' }}>MyCaseValue</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#455A64', fontWeight: 600, fontSize: '13px' }}>Westlaw</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#455A64', fontWeight: 600, fontSize: '13px' }}>LexisNexis</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#455A64', fontWeight: 600, fontSize: '13px' }}>PACER</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Free access to outcome data', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'Plain-English results', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'Plaintiff-focused analytics', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'Settlement range data', mcv: true, westlaw: true, lexis: true, pacer: false },
                  { feature: 'Judge analytics', mcv: true, westlaw: true, lexis: true, pacer: false },
                  { feature: 'No subscription required', mcv: true, westlaw: false, lexis: false, pacer: true },
                  { feature: 'Bilingual (English/Spanish)', mcv: true, westlaw: false, lexis: false, pacer: false },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #D5D8DC' }}>
                    <td style={{ padding: '12px 16px', color: '#212529', fontWeight: 500 }}>{row.feature}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', background: 'rgba(232,23,31,0.08)', color: row.mcv ? '#07CA6B' : '#455A64', fontWeight: 700, fontSize: '16px' }}>{row.mcv ? '\u2713' : '\u2014'}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', color: row.westlaw ? '#07CA6B' : '#455A64', fontSize: '16px' }}>{row.westlaw ? '\u2713' : '\u2014'}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', color: row.lexis ? '#07CA6B' : '#455A64', fontSize: '16px' }}>{row.lexis ? '\u2713' : '\u2014'}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', color: row.pacer ? '#07CA6B' : '#455A64', fontSize: '16px' }}>{row.pacer ? '\u2713' : '\u2014'}</td>
                  </tr>
                ))}
                <tr style={{ borderBottom: '1px solid #D5D8DC' }}>
                  <td style={{ padding: '12px 16px', color: '#212529', fontWeight: 500 }}>Starting price</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', background: 'rgba(232,23,31,0.08)', color: '#212529', fontWeight: 700 }}>Free</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', color: '#455A64' }}>$500+/mo</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', color: '#455A64' }}>$400+/mo</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', color: '#455A64' }}>$0.10/page</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PLAIN ENGLISH ────────────────────────────────── */}
      <section
        style={{
          background: '#EDEEEE',
          borderTop: '1px solid #D5D8DC',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              In plain English
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              What this data actually tells you
            </h2>
            <p style={{ fontSize: '19px', color: '#212529', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              We take millions of public federal court records and turn them into clear, actionable insights.
              Here&apos;s what the numbers mean for you.
            </p>
          </div>

          <p
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: '13px',
              color: '#455A64',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            Example data — Employment Discrimination, S.D.N.Y.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                label: 'Win Rate',
                example: '42%',
                explanation: 'Of cases like yours that went to trial, 42% resulted in a plaintiff verdict. This tells you how often people in similar situations won their case.',
              },
              {
                label: 'Settlement Range',
                example: '$18K – $145K',
                explanation: 'The middle 80% of settlements in your case type fell in this range. The median (50th percentile) is the most likely outcome if your case settles.',
              },
              {
                label: 'Timeline',
                example: '14 months',
                explanation: 'From filing to resolution, similar cases in your district took about 14 months on average. Cases that settled resolved faster than those that went to trial.',
              },
              {
                label: 'Attorney Impact',
                example: '+23% win rate',
                explanation: 'Plaintiffs with attorneys won 23% more often than those who represented themselves. This measures the statistical advantage of legal representation.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    fontFamily: '"PT Mono", monospace',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#E8171F',
                    background: 'rgba(232,23,31,0.08)',
                    padding: '8px 14px',
                    borderRadius: '4px',
                    minWidth: '90px',
                    textAlign: 'center',
                    border: '1px solid rgba(232,23,31,0.15)',
                  }}
                >
                  {item.example}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#212529',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#212529',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: '12px',
              color: '#455A64',
              textAlign: 'center',
              marginTop: '12px',
              fontStyle: 'italic',
            }}
          >
            Sample figures only. Your results depend on your specific case type, district, and facts.
          </p>

          <div
            style={{
              marginTop: '24px',
              textAlign: 'center',
            }}
          >
            <a
              href="/cases"
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: '#006997',
                textDecoration: 'none',
              }}
            >
              See real data for your case →
            </a>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Pricing
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: '19px', color: '#212529', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Start free. Upgrade when you need deeper data.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {[
              { name: 'Free', price: '$0', period: 'forever', desc: 'Basic win rates and case type data', cta: 'Get Started', featured: false },
              { name: 'Single Report', price: '$5.99', period: 'one-time', desc: 'Full settlement ranges, judge data, and trends', cta: 'Buy Report', featured: false },
              { name: 'Unlimited Reports', price: '$9.99', period: '/month', desc: 'Unlimited reports, saved history, and export', cta: 'Subscribe', featured: true },
              { name: 'Attorney Mode', price: '$29.99', period: '/month', desc: 'AI predictions, opposing counsel, API access', cta: 'Start Trial', featured: false },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: plan.featured ? '2px solid #E8171F' : '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: plan.featured ? '0 4px 12px rgba(232,23,31,0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                {plan.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: '"PT Mono", monospace',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      background: '#E8171F',
                      color: '#FFFFFF',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    MOST POPULAR
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#212529',
                    margin: '0 0 8px 0',
                  }}
                >
                  {plan.name}
                </h3>
                <div style={{ margin: '0 0 12px 0' }}>
                  <span
                    style={{
                      fontFamily: 'Montserrat, system-ui, sans-serif',
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#212529',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#455A64',
                      marginLeft: '4px',
                    }}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#212529',
                    lineHeight: 1.5,
                    margin: '0 0 16px 0',
                    flex: 1,
                    fontWeight: 300,
                  }}
                >
                  {plan.desc}
                </p>
                <a
                  href="/pricing"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '10px 16px',
                    borderRadius: '0px',
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: plan.featured ? '#E8171F' : 'transparent',
                    color: plan.featured ? '#FFFFFF' : '#212529',
                    border: plan.featured ? 'none' : '1px solid #D5D8DC',
                    boxShadow: plan.featured ? '0 2px 8px rgba(232,23,31,0.12)' : 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: '24px',
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: '13px',
              color: '#455A64',
            }}
          >
            <a href="/pricing" style={{ color: '#006997', fontWeight: 600, textDecoration: 'none' }}>
              Compare all features →
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section
        style={{
          background: '#EDEEEE',
          borderTop: '1px solid #D5D8DC',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              FAQ
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '19px', color: '#212529', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQ_ITEMS.map((faq, i) => (
              <details
                key={i}
                style={{
                  padding: '20px',
                  borderRadius: '4px',
                  border: '1px solid #D5D8DC',
                  background: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#212529',
                    cursor: 'pointer',
                    lineHeight: 1.5,
                  }}
                >
                  {faq.q}
                </summary>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#212529',
                    lineHeight: 1.7,
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #D5D8DC',
                    fontWeight: 300,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ─────────────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          padding: '80px 24px 0',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <NewsletterSignup />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        style={{
          background: '#00172E',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'Lato, var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
            Get MyCaseValue+
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6, marginBottom: '32px', fontWeight: 300 }}>
            Start your free trial today. Research real outcomes from 5.1M+ federal court cases.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a
              href="/free-trial"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 32px',
                background: '#E8171F',
                color: '#FFFFFF',
                borderRadius: '0px',
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(232,23,31,0.12)',
                textTransform: 'uppercase',
                border: 'none',
              }}
            >
              Free Trial
            </a>
            <a
              href="/signin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 32px',
                background: 'transparent',
                color: '#FFFFFF',
                borderRadius: '0px',
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid #FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
