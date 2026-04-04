/**
 * ServerContent.tsx — Server Component
 * Renders SEO-critical content (FAQ, case types, features, CTA)
 * as static HTML for crawlers. Hidden when the client-side app mounts.
 * No 'use client' directive — this is a pure Server Component.
 */

import NewsletterSignup from './ui/NewsletterSignup';
import UpgradeBanner from './UpgradeBanner';
import FaqAccordion from './FaqAccordion';
import AnimatedCounter from './AnimatedCounter';
import TestimonialCarousel from './TestimonialCarousel';
import TrustBadges from './TrustBadges';

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
      {/* ── TRUST BADGES ──────────────────────────── */}
      <TrustBadges />

      {/* ── TRUSTED CASE INTELLIGENCE ──────────────────────────── */}
      <section id="features" style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="trusted-grid">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
                Trusted Case Intelligence
              </p>
              <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '16px', lineHeight: 1.3 }}>
                Built on the most authoritative federal court records
              </h2>
              <p style={{ fontSize: '16px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.7, fontWeight: 300, marginBottom: '24px' }}>
                MyCaseValue+ surfaces the most relevant case data fast — reducing time spent searching and increasing certainty in your case assessment.
              </p>
              <a href="/search" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 24px', background: '#E8171F', color: '#FFFFFF', borderRadius: '4px',
                fontWeight: 700, fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase',
                letterSpacing: '0.04em', fontFamily: 'var(--font-display)',
              }}>
                Instant Free Trial
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { title: 'Start with real data', desc: 'Every statistic sourced from official PACER records and the Federal Judicial Center database.' },
                { title: 'Search intelligently', desc: 'Select your case type and district — our system instantly finds matching outcomes from 5.1M+ cases.' },
                { title: 'Verify case strength', desc: 'Compare your situation against historical win rates, settlement distributions, and timeline patterns.' },
                { title: 'Understand judge behavior', desc: 'See how specific judges have ruled on cases like yours, including motion grant rates and tendencies.' },
                { title: 'Analyze settlement trends', desc: 'Access full settlement distributions from P10 to P90, with median values and trend data over time.' },
                { title: 'Act with confidence', desc: 'From data-driven settlement estimates to judge-specific insights, get the intelligence that drives better decisions.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E5EBF0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                    fontFamily: 'var(--font-display)',
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
                    fontFamily: 'var(--font-body)',
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

      {/* ── TESTIMONIALS WITH CAROUSEL ─────────────────────────────────── */}
      <TestimonialCarousel />

      {/* ── WHO IS MYCASEVALUE FOR? ────────────────────────────── */}
      <section id="who" data-section style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Who is it for?
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              Built for everyone in the legal process
            </h2>
            <p style={{ fontSize: '19px', color: '#455A64', fontFamily: 'var(--font-body)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              MyCaseValue+ is designed for all segments of the legal community, with features and pricing that fit unique needs.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="who-grid">
            {[
              { title: 'Individual Plaintiffs', desc: 'Research what happened in cases like yours before hiring an attorney or negotiating a settlement. Understand your odds with real federal court data.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { title: 'Solo & Small Firm Attorneys', desc: 'Get the same data large firms pay thousands for. Benchmark settlements, evaluate venues, and build stronger cases with instant analytics.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { title: 'Large Law Firms', desc: 'Enterprise analytics with bulk analysis, API access, team workspaces, and white-label PDF reports for client presentations.', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
              { title: 'Insurance Companies', desc: 'Evaluate claim values with real settlement data. Understand exposure across case types and jurisdictions with district-level analytics.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { title: 'Legal Aid & Nonprofits', desc: 'Free tier designed for access to justice. Help underrepresented communities understand their legal options with real outcome data.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              { title: 'Legal Researchers & Academics', desc: 'Access comprehensive federal court statistics spanning 50+ years. Perfect for empirical legal studies and policy analysis.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '28px', background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(232,23,31,0.08)', border: '1px solid rgba(232,23,31,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS & RECOGNITION ───────────────────────────────── */}
      <section id="awards" data-section style={{ background: '#EDEEEE', padding: '80px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
            Recognition
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
            Trusted by thousands of case researchers
          </h2>
          <p style={{ fontSize: '16px', color: '#455A64', fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 300 }}>
            MyCaseValue+ is built on verified public court records and has been recognized for making federal case data accessible to everyone.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="awards-grid">
            {[
              { stat: '5.1M+', label: 'Federal cases analyzed', sub: 'From FJC, PACER & CourtListener' },
              { stat: '94', label: 'Federal districts covered', sub: 'Complete national coverage' },
              { stat: '94%', label: 'Data accuracy rate', sub: 'Verified outcome classifications' },
              { stat: '50+', label: 'Years of court data', sub: 'Historical records since 1970' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '32px 20px', background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '4px' }}>
                <p style={{ fontSize: '36px', fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)', marginBottom: '8px', lineHeight: 1 }}><AnimatedCounter end={item.stat} /></p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>{item.label}</p>
                <p style={{ fontSize: '12px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>{item.sub}</p>
              </div>
            ))}
          </div>
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
                fontFamily: 'var(--font-body)',
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
              fontFamily: 'var(--font-body)',
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
                      fontFamily: 'var(--font-display)',
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
                      fontFamily: 'var(--font-body)',
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
              fontFamily: 'var(--font-body)',
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
                fontFamily: 'var(--font-body)',
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
                    fontFamily: 'var(--font-display)',
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
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#212529',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
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
                    fontFamily: 'var(--font-body)',
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
                    fontFamily: 'var(--font-display)',
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
              fontFamily: 'var(--font-body)',
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

      {/* ── UPGRADE BANNER (Lexis+ Protégé style) ──────────── */}
      <UpgradeBanner />

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section
        id="faq"
        data-section
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

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ── RELATED SOLUTIONS ──────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '64px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
            Related Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="related-grid">
            {[
              { title: 'Attorney Mode', desc: 'AI-powered attorney tools for case prediction, judge intelligence, and document analysis.', href: '/attorney' },
              { title: 'Settlement Calculator', desc: 'Estimate your case value with our data-driven settlement calculator.', href: '/calculator' },
              { title: 'District Reports', desc: 'Explore case outcomes across all 94 federal judicial districts.', href: '/districts' },
              { title: 'Blog & Insights', desc: 'Legal research articles, case studies, and federal court data analysis.', href: '/blog' },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{
                display: 'block', padding: '24px', background: '#F8F9FA', border: '1px solid #D5D8DC',
                borderRadius: '4px', textDecoration: 'none', transition: 'all 200ms',
              }} className="related-card">
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </a>
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
                fontFamily: 'var(--font-display)',
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
                fontFamily: 'var(--font-display)',
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

      <style>{`
        .trusted-grid { gap: 64px; }
        .who-grid, .awards-grid, .related-grid { gap: 24px; }
        .related-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
          border-color: #E8171F !important;
        }
        @media (max-width: 768px) {
          .trusted-grid { grid-template-columns: 1fr !important; }
          .who-grid { grid-template-columns: 1fr !important; }
          .awards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .awards-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </div>
  );
}
