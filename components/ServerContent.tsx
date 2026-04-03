/**
 * ServerContent.tsx — Server Component
 * Renders SEO-critical content (FAQ, case types, features, CTA, footer)
 * as static HTML for crawlers. Hidden when the client-side app mounts.
 * No 'use client' directive — this is a pure Server Component.
 */

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
  { name: 'Employment & Workplace', description: 'Wrongful termination, discrimination, sexual harassment, unpaid wages, retaliation, ADA violations, and more.', count: 18 },
  { name: 'Personal Injury', description: 'Car accidents, truck accidents, medical malpractice, product liability, slip and fall, wrongful death, and more.', count: 18 },
  { name: 'Consumer Protection', description: 'Debt collection harassment (FDCPA), data breaches, robocalls (TCPA), credit reporting errors, and more.', count: 11 },
  { name: 'Civil Rights', description: 'Police excessive force, racial discrimination, housing discrimination, wrongful arrest, voting rights, and more.', count: 11 },
  { name: 'Money & Business', description: 'Insurance bad faith, breach of contract, fraud, securities violations, intellectual property disputes, and more.', count: 13 },
  { name: 'Housing & Property', description: 'Evictions, foreclosures, construction defects, landlord disputes, HOA issues, and property damage claims.', count: 11 },
  { name: 'Healthcare & Benefits', description: 'Insurance denials, disability benefits (SSDI/SSI), ERISA disputes, veterans benefits, and more.', count: 9 },
  { name: 'Family Law', description: 'Divorce, child custody, child support, domestic violence protective orders, adoption, and parental rights.', count: 6 },
  { name: 'Government', description: 'Benefits denied, constitutional violations, tax disputes, immigration, Social Security, and FOIA requests.', count: 9 },
  { name: 'Education', description: 'Title IX, special education disputes (IDEA), student discipline, student loan servicing, and school negligence.', count: 5 },
];

export default function ServerContent() {
  return (
    <div className="server-content-seo" aria-label="Additional content">
      {/* ── CASE CATEGORIES ───────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                letterSpacing: '-0.02em',
                margin: '0 0 12px 0',
              }}
            >
              84 Federal Case Types Covered
            </h2>
            <p
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '16px',
                color: 'var(--fg-muted)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
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
              <div
                key={i}
                style={{
                  background: 'var(--bg-base)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--fg-primary)',
                    margin: '0 0 8px 0',
                  }}
                >
                  {cat.name}
                  <span
                    style={{
                      fontFamily: '"PT Mono", monospace',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--fg-muted)',
                      marginLeft: '8px',
                    }}
                  >
                    {cat.count} types
                  </span>
                </h3>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'var(--fg-muted)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-base)',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                letterSpacing: '-0.02em',
                margin: '0 0 12px 0',
              }}
            >
              What You Get in Every Report
            </h2>
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
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--fg-primary)',
                    margin: '0 0 8px 0',
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '14px',
                    color: 'var(--fg-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAIN ENGLISH ────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: '"PT Mono", monospace',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--accent-secondary)',
                marginBottom: '12px',
              }}
            >
              IN PLAIN ENGLISH
            </span>
            <h2
              style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                letterSpacing: '-0.02em',
                margin: '0 0 16px 0',
              }}
            >
              What this data actually tells you
            </h2>
            <p
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '16px',
                color: 'var(--fg-muted)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              We take millions of public federal court records and turn them into clear, actionable insights.
              Here&apos;s what the numbers mean for you.
            </p>
          </div>

          <div
            style={{
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontFamily: '"PT Mono", monospace',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--fg-muted)',
                marginBottom: '16px',
              }}
            >
              Sample data — Employment Discrimination, S.D.N.Y.
            </span>
          </div>

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
                  background: 'var(--bg-base)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    fontFamily: '"PT Mono", monospace',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--accent-secondary)',
                    background: 'var(--bg-hover)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    minWidth: '90px',
                    textAlign: 'center',
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
                      color: 'var(--fg-primary)',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontSize: '14px',
                      color: 'var(--fg-muted)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '24px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '13px',
                color: 'var(--fg-muted)',
                margin: '0 0 12px 0',
                lineHeight: 1.5,
              }}
            >
              Your actual data will reflect your specific case type, district, and circumstances.
            </p>
            <a
              href="/cases"
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent-secondary)',
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
          background: 'var(--bg-base)',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                letterSpacing: '-0.02em',
                margin: '0 0 12px 0',
              }}
            >
              Simple, Transparent Pricing
            </h2>
            <p
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '16px',
                color: 'var(--fg-muted)',
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
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
                  background: 'var(--bg-surface)',
                  border: plan.featured ? '2px solid var(--accent-primary)' : '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
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
                      background: 'var(--accent-primary)',
                      color: 'var(--fg-inverse)',
                      padding: '4px 12px',
                      borderRadius: '20px',
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
                    color: 'var(--fg-primary)',
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
                      color: 'var(--fg-primary)',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontSize: '14px',
                      color: 'var(--fg-muted)',
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
                    color: 'var(--fg-muted)',
                    lineHeight: 1.5,
                    margin: '0 0 16px 0',
                    flex: 1,
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
                    borderRadius: '8px',
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: plan.featured ? 'var(--accent-primary)' : 'transparent',
                    color: plan.featured ? 'var(--fg-inverse)' : 'var(--fg-primary)',
                    border: plan.featured ? 'none' : '1px solid var(--border-default)',
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
              color: 'var(--fg-muted)',
            }}
          >
            <a href="/pricing" style={{ color: 'var(--fg-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Compare all features →
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          padding: '64px 24px',
        }}
      >
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              margin: '0 0 48px 0',
            }}
          >
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQ_ITEMS.map((faq, i) => (
              <details
                key={i}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-base)',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--fg-primary)',
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
                    color: 'var(--fg-muted)',
                    lineHeight: 1.7,
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-default)',
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-base)',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
            }}
          >
            Find out where you stand
          </h2>
          <p
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: '16px',
              color: 'var(--fg-muted)',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
            }}
          >
            Get a free outcome report in under 60 seconds. No account required. Research real data from 5.1M+ federal court cases.
          </p>
          <a
            href="/cases"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'var(--accent-primary)',
              color: 'var(--fg-inverse)',
              borderRadius: '12px',
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Generate My Free Report
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '24px',
              flexWrap: 'wrap',
            }}
          >
            {['No account required', 'Instant delivery', 'Secure & private'].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontSize: '13px',
                  color: 'var(--fg-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SITE LINKS (SEO) ──────────────────────────────── */}
      <nav
        aria-label="Site navigation"
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1140px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px 32px',
          }}
        >
          {[
            { href: '/cases', label: 'Case Categories' },
            { href: '/districts', label: 'Federal Districts' },
            { href: '/judges', label: 'Judge Intelligence' },
            { href: '/calculator', label: 'Settlement Calculator' },
            { href: '/pricing', label: 'Pricing' },
            { href: '/methodology', label: 'Methodology' },
            { href: '/faq', label: 'FAQ' },
            { href: '/how-it-works', label: 'How It Works' },
            { href: '/attorney', label: 'Attorney Mode' },
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Service' },
            { href: '/disclaimer', label: 'Legal Disclaimer' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontSize: '14px',
                color: 'var(--fg-muted)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '12px',
            color: 'var(--fg-subtle)',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
        >
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Disclaimer:</strong> MyCaseValue provides aggregate data from public federal court records for informational purposes only. This is not legal advice. No attorney-client relationship is created. Always consult a licensed attorney.
          </p>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved. Data from PACER, Federal Judicial Center, and CourtListener.
          </p>
        </div>
      </nav>
    </div>
  );
}
