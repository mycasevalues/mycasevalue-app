import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'FAQ — MyCaseValue Federal Court Questions',
  description: 'Questions about federal court data, win rates, settlement ranges, pricing, accuracy, privacy, and whether MyCaseValue is legal advice.',
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: 'FAQ — MyCaseValue',
    description: 'Get answers to common questions about federal court data, win rates, settlement ranges, and how MyCaseValue works.',
    type: 'website',
    url: `${SITE_URL}/faq`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'FAQ - MyCaseValue' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — MyCaseValue',
    description: 'Get answers to common questions about federal court data, win rates, settlement ranges, and how MyCaseValue works.',
    images: [`${SITE_URL}/og-image.png`],
  },
  keywords: 'federal court data FAQ, MyCaseValue questions, legal data FAQ, court outcome questions, case statistics',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
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
            text: 'MyCaseValue is a research platform that aggregates historical outcome data from 5.1M+ federal civil court cases. It provides win rates, settlement percentages, case timelines, and recovery ranges across 84 case types. It is not legal advice.',
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
            text: 'MyCaseValue covers federal civil cases across all 95 federal district courts and appellate data. This includes federal district courts, circuit courts, and appeals. State and local courts are not included in our dataset.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does MyCaseValue cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All features are currently free during our public beta — no account, no payment required. After beta, pricing will be tiered: free basic reports, $5.99 single premium report, $9.99/month for unlimited reports, or $29.99/month for Attorney Mode.',
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
            text: 'Yes. Our full privacy policy is available at https://www.mycasevalues.com/privacy. It explains exactly what data we collect, how we use it, and your rights.',
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
            text: 'We cover 84 federal case types including employment discrimination, personal injury, contract disputes, intellectual property, civil rights, securities litigation, product liability, and many more. Visit our case type guide for the complete list.',
          },
        },
        {
          '@type': 'Question',
          name: 'How old is the data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our dataset includes federal cases spanning 55+ years (1970–2025), with quarterly updates from the Federal Judicial Center. Historical trends are visible in our data, but remember: past outcomes do not predict future results.',
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
            text: 'Currently, MyCaseValue is available through our web platform only. We are exploring API access for research institutions and legal professionals. Contact us at support@mycasevalues.com if you are interested.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does MyCaseValue work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Search for your case type, instantly view aggregate outcome data including win rates, settlement ranges, and timelines, then download a detailed report. The process takes seconds. No registration required for basic searches.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to create an account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. You can search and view basic reports without registering. To purchase premium reports or save searches, you can create a free account.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my research private?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We do not identify or track individual users. Your searches are anonymous unless you create an account. We do not sell data to third parties.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you use cookies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We use essential cookies for basic site functionality and optional analytics cookies to understand how our tool is used. You control cookie preferences in your browser settings.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a NOS code?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NOS stands for Nature of Suit. It is a three-digit code assigned by the Administrative Office of the U.S. Courts to classify the type of federal civil case being filed. For example, NOS 442 is Employment Discrimination and NOS 350 is Motor Vehicle. MyCaseValue covers 84 NOS codes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How are settlement percentiles calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Settlement percentiles (P10, P50, P90) are calculated from the distribution of publicly reported monetary outcomes in the Federal Judicial Center database. P50 is the median settlement value. P10 and P90 represent the 10th and 90th percentiles respectively, giving you the range of typical outcomes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are settlement amounts underreported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most settlement agreements are confidential. When parties settle, they typically file a stipulated dismissal without reporting the dollar amount. The settlement figures in federal data come from consent decrees, court-approved class action settlements, and judgments entered after settlement. This means the reported figures represent a subset of all settlements.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does "dismissal rate" mean?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dismissal rate is the percentage of cases that end without a substantive ruling on the merits. Dismissals can result from procedural defects, failure to state a claim, voluntary withdrawal, or lack of jurisdiction. A high dismissal rate does not mean your case will be dismissed. It often reflects technical issues in filings rather than the strength of underlying claims.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I compare different case types?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. MyCaseValue offers a Compare Cases tool that lets you view side-by-side outcome data for up to three federal case types. You can compare win rates, settlement rates, dismissal rates, and median duration. Visit ${SITE_URL}/compare to use this feature.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a NOS code?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Nature of Suit code is a three-digit classification assigned to every federal civil case. There are 84 active NOS codes covering categories from employment discrimination (442) to personal injury (360) to contract disputes (190). Browse all codes on our NOS Explorer.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Settlement Calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our free Settlement Calculator estimates a settlement range based on your case type, damages, severity, and other factors. It uses multipliers derived from federal court outcome data. Note: estimates are statistical approximations, not predictions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you track individual judges?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our Judge Analytics feature profiles federal judges with win rates, motion grant rates, median case durations, and top case types. Visit the Judges page to explore.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Jargon Translator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our Legal Jargon Translator converts complex legal language from court documents into plain English. Paste any legal text and get an instant, free explanation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I read the recovery ranges?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Recovery ranges show the 25th percentile (conservative), 50th percentile (median), and 75th percentile (favorable) of monetary awards for a case type. The median is the most representative value for typical outcomes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my data saved or tracked?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We collect minimal analytics (page views, search queries) to improve the platform. We do not track your identity, sell your data, or share it with third parties. See our Privacy Policy for details.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can attorneys use MyCaseValue?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Many attorneys use MyCaseValue for case evaluation, settlement negotiation preparation, and client counseling. Our data helps attorneys benchmark expectations against federal court outcomes.',
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
        a: 'MyCaseValue is a research platform that aggregates historical outcome data from 5.1M+ federal civil court cases. It provides win rates, settlement percentages, case timelines, and recovery ranges across 84 case types. It is not legal advice.',
      },
      {
        q: 'How does MyCaseValue work?',
        a: 'Search for your case type → instantly view aggregate outcome data (win rates, settlement ranges, timelines) → download a detailed report. The process takes seconds. No registration required for basic searches.',
      },
      {
        q: 'What case types does MyCaseValue cover?',
        a: 'We cover 84 federal case types including employment discrimination, personal injury, contract disputes, intellectual property, civil rights, securities litigation, product liability, consumer protection, and many more. Visit our case type guide for the complete list.',
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
        a: 'Our dataset includes federal cases spanning 55+ years (1970–2025), with quarterly updates from the Federal Judicial Center. Historical trends are visible in our data, but remember: past outcomes do not predict future results.',
      },
      {
        q: 'How often is the data updated?',
        a: 'The Federal Judicial Center publishes case data quarterly. We ingest and process these updates to reflect the latest available federal court statistics. There is typically a 1-2 month lag between case closure and public reporting.',
      },
    ],
  },
  {
    category: 'Technical & Methodology',
    questions: [
      {
        q: 'What does NOS code mean?',
        a: 'NOS stands for "Nature of Suit" — a three-digit classification assigned by the Administrative Office of the U.S. Courts to categorize federal civil cases. For example, NOS 442 is Employment Discrimination, NOS 360 is Personal Injury, and NOS 190 is Contract disputes. MyCaseValue covers 84 active NOS codes.',
      },
      {
        q: 'What is a NOS code?',
        a: 'NOS stands for Nature of Suit. It is a three-digit code assigned by the Administrative Office of the U.S. Courts to classify the type of federal civil case being filed. For example, NOS 442 is Employment Discrimination and NOS 350 is Motor Vehicle. MyCaseValue covers 84 NOS codes.',
      },
      {
        q: 'How are settlement percentiles calculated?',
        a: 'Settlement percentiles (P10, P50, P90) are calculated from the distribution of publicly reported monetary outcomes in the Federal Judicial Center database. P50 is the median settlement value. P10 and P90 represent the 10th and 90th percentiles respectively, giving you the range of typical outcomes.',
      },
      {
        q: 'How is a plaintiff win defined?',
        a: 'A plaintiff win is defined as a case resolved by plaintiff verdict — a judgment entered in favor of the plaintiff. This includes both jury verdicts and bench trial decisions. Win rates do not include settlements, dismissals, or transfers. For more details, see our <a href="/methodology" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>methodology page</a>.',
      },
      {
        q: 'Why are settlement amounts underreported?',
        a: 'Most settlement agreements are confidential. When parties settle, they typically file a stipulated dismissal without reporting the dollar amount. The settlement figures in federal data come from consent decrees, court-approved class action settlements, and judgments entered after settlement. This means the reported figures represent a subset of all settlements.',
      },
      {
        q: 'What is the minimum sample size?',
        a: 'We require a minimum of 30 cases in a category before publishing statistics. This ensures data reliability and prevents misleading conclusions from small datasets. For more details on our confidence methodology, see our <a href="/methodology" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>methodology page</a>.',
      },
      {
        q: 'What does "dismissal rate" mean?',
        a: 'Dismissal rate is the percentage of cases that end without a substantive ruling on the merits. Dismissals can result from procedural defects, failure to state a claim, voluntary withdrawal, or lack of jurisdiction. A high dismissal rate does not mean your case will be dismissed — it often reflects technical issues in filings rather than the strength of underlying claims.',
      },
    ],
  },
  {
    category: 'Coverage & Scope',
    questions: [
      {
        q: 'Does MyCaseValue cover state courts?',
        a: 'No. MyCaseValue covers federal civil courts only. Our database includes all 95 federal districts and 13 circuit courts, but does not include state or local court cases.',
      },
      {
        q: 'What courts are covered?',
        a: 'MyCaseValue covers federal civil cases across all 95 federal district courts and appellate data. This includes federal district courts, circuit courts, and appeals. State and local courts are not included in our dataset.',
      },
      {
        q: 'Why do outcomes vary by circuit?',
        a: 'Different federal circuits (regional appellate courts) have different judges, case mixes, and legal interpretations. These factors create measurable outcome differences. Win rates and settlement patterns can vary significantly by circuit and district.',
      },
      {
        q: 'Can I use MyCaseValue data in court?',
        a: 'MyCaseValue data is derived from public federal court records and statistical summaries. Courts may accept aggregate outcome statistics as background evidence in some contexts, but you should consult your attorney about using any research tool data in legal proceedings.',
      },
      {
        q: 'Can I compare different case types?',
        a: 'Yes. Our Compare tool lets you select up to 3 case types and see win rates, settlement rates, duration, and recovery ranges side by side. Visit the Compare page to start.',
      },
    ],
  },
  {
    category: 'Tools & Features',
    questions: [
      {
        q: 'What is Attorney Mode?',
        a: 'Attorney Mode is our professional analytics suite designed for legal professionals. It includes advanced judge intelligence, AI outcome predictions, opposing counsel research, document intelligence, real-time PACER monitoring, bulk analysis, full API access, team workspaces, and white-label reporting.',
      },
      {
        q: 'What is the Settlement Calculator?',
        a: 'Our free Settlement Calculator estimates a settlement range based on your case type, damages, severity, and other factors. It uses multipliers derived from federal court outcome data. Note: estimates are statistical approximations, not predictions.',
      },
      {
        q: 'Do you track individual judges?',
        a: 'Yes. Our Judge Analytics feature profiles federal judges with win rates, motion grant rates, median case durations, and top case types. Visit the Judges page to explore.',
      },
      {
        q: 'What is the Jargon Translator?',
        a: 'Our Legal Jargon Translator converts complex legal language from court documents into plain English. Paste any legal text and get an instant, free explanation.',
      },
      {
        q: 'Can attorneys use MyCaseValue?',
        a: 'Absolutely. Many attorneys use MyCaseValue for case evaluation, settlement negotiation preparation, and client counseling. Our data helps attorneys benchmark expectations against federal court outcomes.',
      },
    ],
  },
  {
    category: 'Understanding Your Data',
    questions: [
      {
        q: 'What is a NOS code?',
        a: 'A Nature of Suit code is a three-digit classification assigned to every federal civil case. There are 84 active NOS codes covering categories from employment discrimination (442) to personal injury (360) to contract disputes (190). Browse all codes on our NOS Explorer.',
      },
      {
        q: 'How do I read the recovery ranges?',
        a: 'Recovery ranges show the 25th percentile (conservative), 50th percentile (median), and 75th percentile (favorable) of monetary awards for a case type. The median is the most representative value for typical outcomes.',
      },
    ],
  },
  {
    category: 'Privacy & Tracking',
    questions: [
      {
        q: 'Is my data saved or tracked?',
        a: 'We collect minimal analytics (page views, search queries) to improve the platform. We do not track your identity, sell your data, or share it with third parties. See our Privacy Policy for details.',
      },
    ],
  },
  {
    category: 'Pricing & Access',
    questions: [
      {
        q: 'How much does MyCaseValue cost?',
        a: 'All features are currently free during our public beta — no account, no payment, no catch. After beta, pricing will be tiered: free basic reports, $5.99 for a single premium report, $9.99/month for unlimited reports, or $29.99/month for Attorney Mode with judge intelligence and API access. See the pricing page for the full plan.',
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
        q: 'Do you offer an API?',
        a: 'Yes, during beta we offer API access for qualified users. <a href="/contact" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Contact us</a> to learn about API availability and integration options.',
      },
      {
        q: 'Do you have an API?',
        a: 'Currently, MyCaseValue is available through our web platform only. We are exploring API access for research institutions and legal professionals. Contact us at support@mycasevalues.com if you are interested.',
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
        a: 'Yes. Our full privacy policy is available at https://www.mycasevalues.com/privacy. It explains exactly what data we collect, how we use it, and your rights.',
      },
      {
        q: 'Is my search activity private?',
        a: 'Yes. Your searches are private and anonymous. We do not track, identify, or share your search activity. We do not sell your data to third parties.',
      },
      {
        q: 'Is my research private?',
        a: 'Yes. We do not identify or track individual users. Your searches are anonymous unless you create an account. We do not sell data to third parties.',
      },
      {
        q: 'Do you use cookies?',
        a: 'We use essential cookies for basic site functionality and optional analytics cookies to understand how our tool is used. You control cookie preferences in your browser settings.',
      },
      {
        q: 'Is the data available in Spanish?',
        a: 'Yes, bilingual support is available. MyCaseValue offers full English and Spanish language options for the platform interface, reports, and data labels.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'var(--accent-primary)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: 'var(--color-surface-0)' }}>
            <a href="/" className="hover:opacity-80 transition-opacity">Home</a>
            <span>/</span>
            <span>FAQ</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '8px' }}>
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-surface-0)" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            FAQ
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--color-surface-0)', letterSpacing: '-1.5px' }}>
            Common Questions
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--color-surface-0)' }}>
            Platform capabilities, data sources, and usage.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <section key={sectionIdx} style={{ borderLeftWidth: '4px', borderLeftColor: 'var(--accent-primary)', paddingLeft: '24px' }}>
              <h2 className="text-xl font-display font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((faq, qIdx) => (
                  <details
                    key={qIdx}
                    className="group p-5 border transition-colors cursor-pointer"
                    style={{
                      borderColor: 'var(--border-default)',
                      background: 'var(--color-surface-0)',
                      borderRadius: '12px',
                    }}
                  >
                    <summary className="flex items-start justify-between font-semibold select-none" style={{ color: 'var(--color-text-primary)' }}>
                      <span className="flex-1 text-base leading-relaxed pr-4">
                        {faq.q}
                      </span>
                      <svg aria-hidden="true"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0 transition-transform group-open:rotate-180"
                        style={{ color: 'var(--color-text-primary)', marginTop: '2px' }}
                      >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </summary>
                    <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
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
        <div className="mt-16 p-8 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', borderLeftWidth: '4px', borderLeftColor: 'var(--accent-primary)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Still Have Questions?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Check our detailed methodology, explore our glossary of legal terms, or get in touch with our support team.
          </p>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <a href="mailto:support@mycasevalues.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '8px' }}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Support
            </a>
            <Link href="/methodology"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', color: 'var(--accent-primary-hover)', borderRadius: '12px' }}>
              Methodology
            </Link>
            <Link href="/glossary"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', color: 'var(--accent-primary-hover)', borderRadius: '12px' }}>
              Glossary
            </Link>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: 'var(--color-text-primary)' }}>
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/calculator"
              className="group p-6 border transition-all hover:shadow-md"
              style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-base transition-colors" style={{ color: 'var(--color-text-primary)' }}>Settlement Calculator</h3>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-primary)' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Estimate settlement ranges based on case type, damages, and severity using federal court data.
              </p>
            </Link>

            <Link href="/compare"
              className="group p-6 border transition-all hover:shadow-md"
              style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-base transition-colors" style={{ color: 'var(--color-text-primary)' }}>Compare Cases</h3>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-primary)' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Compare up to 3 case types side-by-side to see win rates, settlement ranges, and timelines.
              </p>
            </Link>

            <Link href="/translate"
              className="group p-6 border transition-all hover:shadow-md"
              style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-base transition-colors" style={{ color: 'var(--color-text-primary)' }}>Jargon Translator</h3>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-primary)' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Convert complex legal language from court documents into plain English explanations.
              </p>
            </Link>

            <Link href="/nos-explorer"
              className="group p-6 border transition-all hover:shadow-md"
              style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-base transition-colors" style={{ color: 'var(--color-text-primary)' }}>NOS Explorer</h3>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-primary)' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Browse all 84 federal Nature of Suit codes and explore case types with detailed breakdowns.
              </p>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
