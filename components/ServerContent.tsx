/**
 * ServerContent.tsx — Server Component
 * Renders SEO-critical content (FAQ, case types, features, CTA)
 * as static HTML for crawlers. Hidden when the client-side app mounts.
 * No 'use client' directive — this is a pure Server Component.
 */

import NewsletterSignup from './ui/NewsletterSignup';
import UpgradeBanner from './UpgradeBanner';
import FaqAccordion from './FaqAccordion';
import TestimonialCarousel from './TestimonialCarousel';
import TrustBadges from './TrustBadges';
import ScrollReveal from './ScrollReveal';
import Link from 'next/link';
import { REAL_DATA } from '../lib/realdata';
import CaseFilingTicker from './CaseFilingTicker';

const FAQ_ITEMS = [
  { q: 'What is MyCaseValue?', a: 'MyCaseValue is a research tool that displays aggregate historical outcome data from over 5.1 million public federal court records. It helps individuals and attorneys research win rates, settlement ranges, timelines, and judge analytics. It is not legal advice.' },
  { q: 'Where does the data come from?', a: 'All data is sourced from three official public federal court record systems: the Federal Judicial Center Integrated Database (FJCID), PACER (Public Access to Court Electronic Records), and CourtListener. We do not create or estimate any data.' },
  { q: 'What federal courts does your data cover?', a: 'We have comprehensive data from all 94 federal judicial districts across all 50 states, plus historical records dating back to 1970. Our database includes civil cases from federal PACER records and the Federal Judicial Center Integrated Database.' },
  { q: 'Is MyCaseValue legal advice?', a: 'No. MyCaseValue provides aggregate data from public records only. It does not evaluate individual cases, provide legal opinions, or create any attorney-client relationship. Always consult a licensed attorney for legal advice.' },
  { q: 'How accurate is the data?', a: 'Our data comes directly from federal court records (PACER, Federal Judicial Center, CourtListener). We have reported 94% accuracy in case outcome classifications. Data limitations are always noted in your report.' },
  { q: 'What types of cases does MyCaseValue cover?', a: 'MyCaseValue covers 84 federal case types across 10 categories including employment discrimination, personal injury, medical malpractice, product liability, civil rights, consumer protection, breach of contract, and more. Data spans all 94 federal districts.' },
  { q: 'How much does it cost?', a: 'MyCaseValue is currently free for all users with no account required. All features — including settlement ranges, judge data, circuit breakdowns, and attorney tools — are available at no cost during our launch period.' },
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
      <ScrollReveal delay={0}>
        <TrustBadges />
      </ScrollReveal>

      {/* ── CASE FILING TICKER ──────────────────────────── */}
      <CaseFilingTicker />

      <section
        style={{
          background: '#F7F8FA',
          borderTop: '1px solid #E5E7EB',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              In plain English
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
              What this data actually tells you
            </h2>
            <p style={{ fontSize: '19px', color: '#4B5563', fontFamily: 'var(--font-body)', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300 }}>
              We take millions of public federal court records and turn them into clear, actionable insights.
              Here&apos;s what the numbers mean for you.
            </p>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#4B5563',
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
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
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
                    fontWeight: 600,
                    color: '#0A66C2',
                    background: 'rgba(10, 102, 194, 0.08)',
                    padding: '8px 14px',
                    borderRadius: '12px',
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
                      fontWeight: 600,
                      color: '#0f0f0f',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: '#0f0f0f',
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
              color: '#4B5563',
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
                color: '#004182',
                textDecoration: 'none',
              }}
            >
              See real data for your case →
            </a>
          </div>
        </div>
      </section>


      {/* ── TRUSTED CASE INTELLIGENCE ──────────────────────────── */}
      <section id="features" style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="trusted-grid">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
                Trusted Case Intelligence
              </p>
              <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: '16px', lineHeight: 1.3 }}>
                Built on the most authoritative federal court records
              </h2>
              <p style={{ fontSize: '16px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.7, fontWeight: 300, marginBottom: '24px' }}>
                MyCaseValue surfaces the most relevant case data fast — reducing time spent searching and increasing certainty in your case assessment.
              </p>
              <a href="/search" className="cta-btn-primary" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                height: '48px', padding: '0 32px', background: '#0A66C2', color: '#FFFFFF', borderRadius: '12px',
                fontWeight: 600, fontSize: '14px', textDecoration: 'none', textTransform: 'uppercase',
                letterSpacing: '0.04em', fontFamily: 'var(--font-display)',
              }}>
                Start Researching
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
                <div key={i} style={{ padding: '16px', background: '#F8F9FA', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE CATEGORIES ───────────────────────────────── */}
      <section
        style={{
          background: '#F7F8FA',
          borderTop: '1px solid #E5E7EB',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Case types
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
              84 Federal Case Types Covered
            </h2>
            <p style={{ fontSize: '19px', color: '#4B5563', fontFamily: 'var(--font-body)', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300 }}>
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
                <div className="category-card" style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  height: '100%',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', margin: 0 }}>
                      {cat.name}
                    </h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      background: 'rgba(10, 102, 194, 0.08)',
                      color: '#0A66C2',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-body)',
                      flexShrink: 0,
                      marginLeft: '8px',
                      border: '1px solid rgba(232,23,31,0.15)',
                    }}>
                      {cat.count} types
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#0f0f0f', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                    {cat.description}
                  </p>
                  <p style={{ fontSize: '13px', color: '#004182', fontFamily: 'var(--font-body)', marginTop: '16px', marginBottom: 0, fontWeight: 500 }}>
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
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              What you get
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
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
              <ScrollReveal key={i} delay={i * 100} direction="up">
                <div
                  className="feature-card"
                  style={{
                    background: '#FAFBFC',
                    border: '1px solid #E5E7EB',
                    borderTop: '3px solid #0A66C2',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1B3A5C',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: '#4B5563',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {feat.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CASE TYPES ───────────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          padding: '80px 24px',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <style>{`
          .featured-case-card {
            transition: all 0.3s ease;
            position: relative;
            border-left: 4px solid transparent;
          }
          .featured-case-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.12);
            border-left-color: #0A66C2;
          }
        `}</style>

        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 600,
                color: '#1B3A5C',
                fontFamily: 'var(--font-display)',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
                borderLeft: '3px solid #0A66C2',
                paddingLeft: '20px',
              }}
            >
              Explore Popular Case Types
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              gridAutoRows: 'auto',
            }}
          >
            {[
              {
                name: 'Employment Discrimination',
                code: '442',
                desc: 'Win rates, settlement data, and outcomes',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                name: 'Personal Injury',
                code: '360',
                desc: 'Accident and injury case statistics',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                  </svg>
                ),
              },
              {
                name: 'Civil Rights',
                code: '440',
                desc: 'Federal civil rights case outcomes',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                ),
              },
              {
                name: 'Contract Disputes',
                code: '190',
                desc: 'Breach of contract case data',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                ),
              },
              {
                name: 'Insurance',
                code: '110',
                desc: 'Insurance dispute statistics',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l7 3.46v5.12c0 5.55-3.84 10.74-7 12-3.16-1.26-7-6.45-7-12V5.46L12 2z" />
                    <path d="M10 14l2 2 4-4" />
                  </svg>
                ),
              },
              {
                name: 'FMLA',
                code: '710',
                desc: 'Family medical leave case outcomes',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7h3v2h-3zm-4 0h3v2H9z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100} direction="up">
                <a
                  href={`/nos/${item.code}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="featured-case-card"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '28px 24px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: 'rgba(232, 23, 31, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      {item.icon}
                    </div>

                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#0f0f0f',
                        fontFamily: 'var(--font-display)',
                        marginBottom: '8px',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                        margin: '0 0 16px 0',
                        flex: 1,
                        fontWeight: 300,
                      }}
                    >
                      {item.desc}
                    </p>

                    <div
                      style={{
                        fontSize: '14px',
                        color: '#004182',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                      }}
                    >
                      View Statistics →
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS WITH CAROUSEL ─────────────────────────────────── */}
      <ScrollReveal delay={0}>
        <TestimonialCarousel />
      </ScrollReveal>

      {/* ── WHO IS MYCASEVALUE FOR? ────────────────────────────── */}
      <section id="who" data-section style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Who is it for?
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
              Built for everyone in the legal process
            </h2>
            <p style={{ fontSize: '19px', color: '#4B5563', fontFamily: 'var(--font-body)', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300 }}>
              MyCaseValue is designed for all segments of the legal community, with features and pricing that fit unique needs.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="who-grid">
            {[
              { title: 'Individual Plaintiffs', desc: 'Research what happened in cases like yours before hiring an attorney or negotiating a settlement. Understand your odds with real federal court data.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { title: 'Solo & Small Firm Attorneys', desc: 'Get the same data large firms pay thousands for. Benchmark settlements, evaluate venues, and build stronger cases with instant analytics.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { title: 'Large Law Firms', desc: 'Enterprise analytics with bulk analysis, API access, team workspaces, and white-label PDF reports for client presentations.', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
              { title: 'Insurance Companies', desc: 'Evaluate claim values with real settlement data. Understand exposure across case types and jurisdictions with district-level analytics.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { title: 'Legal Aid & Nonprofits', desc: 'Free tier designed for access to justice. Help underrepresented communities understand their legal options with real outcome data.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              { title: 'Legal Researchers & Academics', desc: 'Access comprehensive federal court statistics spanning 54 years (1970–2024). Perfect for empirical legal studies and policy analysis.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            ].map((item, i) => (
              <div key={i} className="who-card" style={{ padding: '28px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s ease' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.08)', border: '1px solid rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── HOW IT COMPARES ──────────────────────────────── */}
      <section
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E5E7EB',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              How we compare
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
              Built for plaintiffs, not law firms
            </h2>
            <p style={{ fontSize: '19px', color: '#4B5563', fontFamily: 'var(--font-body)', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300 }}>
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
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#4B5563', fontWeight: 600, fontSize: '13px' }}>Feature</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#0f0f0f', fontWeight: 600, background: 'rgba(10, 102, 194, 0.08)', borderRadius: '2px 2px 0 0' }}>MyCaseValue</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#4B5563', fontWeight: 600, fontSize: '13px' }}>Westlaw Litigation Analytics</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#4B5563', fontWeight: 600, fontSize: '13px' }}>Lex Machina</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#4B5563', fontWeight: 600, fontSize: '13px' }}>PACER Direct</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Win rate analytics', mcv: true, westlaw: true, lexis: true, pacer: false },
                  { feature: 'Settlement range data', mcv: true, westlaw: true, lexis: true, pacer: false },
                  { feature: 'Judge-level analytics', mcv: true, westlaw: true, lexis: true, pacer: false },
                  { feature: 'District comparison', mcv: true, westlaw: false, lexis: 'partial', pacer: false },
                  { feature: 'Natural language search', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'AI outcome prediction', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'Plain-English results', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'Plaintiff-focused interface', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'Paralegal workflow tools', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'Free tier', mcv: true, westlaw: false, lexis: false, pacer: false },
                  { feature: 'API access', mcv: true, westlaw: true, lexis: true, pacer: true },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '12px 16px', color: '#0f0f0f', fontWeight: 500 }}>{row.feature}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', background: 'rgba(10, 102, 194, 0.08)', color: row.mcv ? '#059669' : '#9ca3af', fontWeight: 600, fontSize: '16px' }}>{row.mcv ? 'Yes' : 'No'}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', color: row.westlaw ? '#059669' : '#9ca3af', fontSize: '16px' }}>{row.westlaw ? 'Yes' : 'No'}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', color: row.lexis === 'partial' ? '#d97706' : (row.lexis ? '#059669' : '#9ca3af'), fontSize: '16px' }}>{row.lexis === 'partial' ? 'Partial' : (row.lexis ? 'Yes' : 'No')}</td>
                    <td style={{ textAlign: 'center', padding: '12px 16px', color: row.pacer ? '#059669' : '#9ca3af', fontSize: '16px' }}>{row.pacer ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '12px 16px', color: '#0f0f0f', fontWeight: 500 }}>Starting price</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', background: 'rgba(10, 102, 194, 0.08)', color: '#0f0f0f', fontWeight: 600 }}>Free</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', color: '#4B5563' }}>$500+/mo</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', color: '#4B5563' }}>$2,000+/mo</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px', color: '#4B5563' }}>$0.10/page</td>
                </tr>
              </tbody>
            </table>
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
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              Pricing
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: '19px', color: '#4B5563', fontFamily: 'var(--font-body)', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300 }}>
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
                  border: plan.featured ? '2px solid #0A66C2' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: plan.featured ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
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
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      background: '#0A66C2',
                      color: '#FFFFFF',
                      padding: '4px 12px',
                      borderRadius: '12px',
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
                    fontWeight: 600,
                    color: '#0f0f0f',
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
                      fontWeight: 600,
                      color: '#0f0f0f',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: '#4B5563',
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
                    color: '#0f0f0f',
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
                    borderRadius: '12px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: plan.featured ? '#0A66C2' : 'transparent',
                    color: plan.featured ? '#FFFFFF' : '#0f0f0f',
                    border: plan.featured ? 'none' : '1px solid #E5E7EB',
                    boxShadow: 'none',
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
              color: '#4B5563',
            }}
          >
            <a href="/pricing" style={{ color: '#004182', fontWeight: 600, textDecoration: 'none' }}>
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
          background: '#F7F8FA',
          borderTop: '1px solid #E5E7EB',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '768px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              FAQ
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px', letterSpacing: '-0.01em', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ── RELATED SOLUTIONS ──────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '24px', borderLeft: '3px solid #0A66C2', paddingLeft: '20px' }}>
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
                display: 'block', padding: '24px', background: '#F8F9FA', border: '1px solid #E5E7EB',
                borderRadius: '12px', textDecoration: 'none', transition: 'all 200ms',
              }} className="related-card">
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
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
          <ScrollReveal delay={0} direction="up">
            <NewsletterSignup />
          </ScrollReveal>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
            Research Tools
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: '48px', textAlign: 'center', letterSpacing: '-0.01em' }}>
            Free Tools for Case Research
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { href: '/search', title: 'Case Search', desc: 'Search all 84 federal case types by keyword', iconPath: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z' },
              { href: '/nos-explorer', title: 'NOS Code Explorer', desc: 'Browse and compare all NOS codes with data', iconPath: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
              { href: '/calculator', title: 'Settlement Calculator', desc: 'Estimate your potential case value', iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              { href: '/translate', title: 'Jargon Translator', desc: 'Convert legal language to plain English', iconPath: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0 1 6.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
              { href: '/odds', title: 'Case Odds Checker', desc: 'See win rates and outcome probabilities', iconPath: 'M16 8v8M12 11v5M8 14v2M3 3v18h18' },
              { href: '/judges', title: 'Judge Intelligence', desc: 'Research federal judges across all circuits', iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
              { href: '/trends', title: 'Filing Trends', desc: 'Track case outcome trends over time', iconPath: 'M23 6l-9.5 9.5-5-5L1 18' },
              { href: '/glossary', title: 'Legal Glossary', desc: 'Plain-English definitions of court terms', iconPath: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 0 3-3h7z' },
            ].map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                style={{
                  display: 'block', padding: '24px', background: '#F8F9FA', border: '1px solid #E5E7EB',
                  borderRadius: 6, textDecoration: 'none', transition: 'all 0.2s ease',
                }}
              >
                <div style={{ marginBottom: 8 }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={tool.iconPath}/></svg></div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 4 }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: 13, color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0, lineHeight: 1.5 }}>
                  {tool.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED DATA SOURCES ──────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
              Trusted Data Sources
            </h2>
            <p style={{ fontSize: '14px', color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0 }}>
              All data sourced from official federal court record systems
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '24px',
            background: '#FFFFFF',
            padding: '28px 32px',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            justifyContent: 'center',
          }}>
            {[
              { name: 'Federal Judicial Center' },
              { name: 'CourtListener' },
              { name: 'PACER' },
              { name: 'Bureau of Justice Statistics' },
            ].map((source, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: '#4B5563', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" style={{display:'inline', verticalAlign:'middle', marginRight: '6px'}}><path d="M20 6L9 17l-5-5"/></svg>
                  {source.name}
                </span>
                {i < 3 && <span style={{ fontSize: '12px', color: '#E5E7EB', marginLeft: '20px' }}>•</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM STATISTICS ──────────────────────────────── */}
      <section style={{ background: '#1B3A5C', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              Platform at a Glance
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', margin: 0 }}>
              The scale of our federal court data repository
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}>
            {[
              { stat: '5.1M+', label: 'Federal Cases Analyzed' },
              { stat: '84', label: 'Case Type Categories' },
              { stat: '94', label: 'Federal Districts Covered' },
              { stat: '5', label: 'Data Sources Integrated' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'transparent',
                border: '2px solid #0A66C2',
                borderRadius: '12px',
                padding: '28px 20px',
                textAlign: 'center',
              }}>
                <p style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  color: '#0A66C2',
                  fontFamily: 'var(--font-display)',
                  margin: '0 0 8px 0',
                  lineHeight: 1,
                }}>
                  {item.stat}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  margin: 0,
                  fontWeight: 500,
                }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              How It Works
            </h2>
            <p style={{ fontSize: '14px', color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0 }}>
              Three simple steps to make informed legal decisions
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {[
              {
                step: 1,
                title: 'Select Your Case Type',
                desc: 'Choose from 84 federal case categories or search by keyword',
              },
              {
                step: 2,
                title: 'View Real Outcomes',
                desc: 'See win rates, settlement ranges, timelines, and judge data from actual federal cases',
              },
              {
                step: 3,
                title: 'Make Informed Decisions',
                desc: 'Use data-driven insights for research, case evaluation, or settlement negotiation',
              },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#0A66C2',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 600,
                  margin: '0 auto 16px',
                  fontFamily: 'var(--font-display)',
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1B3A5C',
                  fontFamily: 'var(--font-display)',
                  marginBottom: '8px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CASE TYPES BY VOLUME ──────────────────────────────── */}
      <section style={{ background: '#F7F8FA', padding: '64px 24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1B3A5C', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
              Most Common Federal Case Types
            </h2>
            <p style={{ fontSize: '14px', color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0 }}>
              Explore the case types with the most federal court data available
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {Object.entries(REAL_DATA)
              .sort(([, a]: any, [, b]: any) => (b.total || 0) - (a.total || 0))
              .slice(0, 6)
              .map(([nos, data]: any, i) => {
                const winRate = data.wr || 0;
                const winRateColor = winRate > 60 ? '#059669' : winRate > 40 ? '#F59E0B' : '#EF4444';
                return (
                  <Link key={i} href={`/report/${nos}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '24px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }} className="featured-type-card">
                      <div style={{ marginBottom: '12px' }}>
                        <h3 style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#0f0f0f',
                          fontFamily: 'var(--font-display)',
                          margin: '0 0 4px 0',
                        }}>
                          {data.label || `NOS ${nos}`}
                        </h3>
                        <p style={{
                          fontSize: '12px',
                          color: '#4B5563',
                          fontFamily: 'var(--font-body)',
                          margin: '0 0 8px 0',
                        }}>
                          Code: {nos}
                        </p>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <p style={{
                          fontSize: '12px',
                          color: '#4B5563',
                          fontFamily: 'var(--font-body)',
                          margin: '0 0 4px 0',
                        }}>
                          {(data.total || 0).toLocaleString()} cases
                        </p>
                      </div>

                      <div style={{
                        padding: '8px 12px',
                        background: 'rgba(10, 102, 194, 0.08)',
                        borderRadius: '12px',
                        marginBottom: '12px',
                      }}>
                        <p style={{
                          fontSize: '12px',
                          color: winRateColor,
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          margin: 0,
                        }}>
                          {winRate.toFixed(1)}% Win Rate
                        </p>
                      </div>

                      <p style={{
                        fontSize: '12px',
                        color: '#004182',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        margin: 0,
                      }}>
                        View Details →
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        style={{
          background: '#1B3A5C',
          padding: '100px 24px',
          textAlign: 'center',
          borderBottom: '3px solid #0A66C2',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Ready to Win Cases with Data
          </p>
          <h2 style={{ fontSize: '48px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '20px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            Research Federal Court Outcomes Instantly
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7, marginBottom: '48px', fontWeight: 300 }}>
            Access 5.1M+ federal court cases, settlement ranges, judge analytics, and outcome data to make confident case decisions.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a
              href="/search"
              className="cta-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                padding: '0 40px',
                background: '#0A66C2',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: 'none',
                textTransform: 'uppercase',
                border: 'none',
                letterSpacing: '0.04em',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Start Researching
            </a>
            <a
              href="/sign-in"
              className="cta-btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                padding: '0 40px',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
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

        /* LexisNexis-style hover effects for all card types */
        .category-card:hover,
        .feature-card:hover,
        .who-card:hover,
        .stat-card:hover,
        .related-card:hover,
        .featured-type-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
          border-left: 3px solid #0A66C2 !important;
          padding-left: calc(24px - 2px) !important;
        }

        .newsletter-btn:hover {
          background-color: #0A66C2 !important;
        }

        /* CTA Button Styles */
        .cta-btn-primary {
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .cta-btn-primary:hover {
          background: #B91C1C !important;
          box-shadow: none !important;
          transform: translateY(-2px) !important;
        }

        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.15) !important;
          border-color: rgba(255,255,255,0.5) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
          transform: translateY(-2px) !important;
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
