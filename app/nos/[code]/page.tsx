import { Metadata } from 'next';
import Link from 'next/link';
import { SITS, OUTCOME_DATA } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';
import { NOS_TRENDS } from '../../../data/nos-trends';
import { DISPOSITION_DATA } from '../../../data/disposition-data';
import { SITE_URL } from '../../../lib/site-config';
import { fmtK } from '../../../lib/format';
import DataFreshness from '../../../components/DataFreshness';
import SampleSizeIndicator from '../../../components/SampleSizeIndicator';
import UpdatedBadge from '../../../components/UpdatedBadge';
import { NOS_STATUTE_MAP } from '../../../lib/statutes';
import RelevantOpinions from '../../../components/RelevantOpinions';
import EEOCPipeline from '../../../components/EEOCPipeline';
import NLRBContext from '../../../components/NLRBContext';
import OSHAContext from '../../../components/OSHAContext';
import { ATTORNEY_IMPACT } from '../../../lib/attorney-impact';
import { getWinRateColor } from '../../../lib/color-scale';
import { AnimatedRangeBar, MetricsStagger, MetricsStaggerItem } from '../../../components/motion/NosAnimations';
import NOSRecoveryRangeClient from '../../../components/NOSRecoveryRangeClient';
import DemoNOSPage from '../../../components/DemoNOSPage';
import JudgeSectionLoader from '../../../components/JudgeSectionLoader';
import dynamic from 'next/dynamic';

const SettlementViolin = dynamic(() => import('../../../components/charts/SettlementViolin'), { ssr: false });
const WinRateTrend = dynamic(() => import('../../../components/charts/WinRateTrend'), { ssr: false });
const DispositionBar = dynamic(() => import('../../../components/charts/DispositionBar'), { ssr: false });

// ISR: revalidate every 90 days (matches FJC quarterly update cycle)
export const revalidate = 7776000;

// Top 10 NOS codes that show the Relevant Opinions section
const OPINIONS_ENABLED_NOS = new Set(['442', '365', '190', '110', '360', '710', '445', '870', '440', '863']);

// Employment discrimination NOS codes that show EEOC data
const EEOC_ENABLED_NOS = new Set(['442', '445', '710']);

// Labor/Management Relations NOS codes that show NLRB data
const NLRB_ENABLED_NOS = new Set(['720']);

// Workplace safety NOS codes that show OSHA data
const OSHA_ENABLED_NOS = new Set(['710']);

// Helper function to flatten SITS and map NOS codes to display names
function getNOSMap(): Record<string, { label: string; category: string; description?: string }> {
  const nosMap: Record<string, { label: string; category: string; description?: string }> = {};

  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      const key = option.nos;
      if (!nosMap[key]) {
        nosMap[key] = { label: option.label, category: category.label, description: option.d };
      }
    });
  });

  return nosMap;
}

// Get all unique NOS codes for static generation
function getAllNOSCodes(): string[] {
  const nosSet = new Set<string>();
  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      nosSet.add(option.nos);
    });
  });
  return Array.from(nosSet).sort();
}

// Map circuit numbers to representative district codes
// Returns the first major district for each circuit for linking purposes
function getRepresentativeDistrictForCircuit(circuit: string): string | null {
  const circuitToDistrict: Record<string, string> = {
    '1': 'MADN',    // District of Massachusetts (1st Circuit)
    '2': 'SDNY',    // S.D.N.Y. (2nd Circuit)
    '3': 'EDPA',    // E.D. Pa. (3rd Circuit)
    '4': 'EDVA',    // E.D. Va. (4th Circuit)
    '5': 'EDTX',    // E.D. Tex. (5th Circuit)
    '6': 'EDMI',    // E.D. Mich. (6th Circuit)
    '7': 'NDIL',    // N.D. Ill. (7th Circuit)
    '8': 'EDMO',    // E.D. Mo. (8th Circuit)
    '9': 'NDCA',    // N.D. Cal. (9th Circuit)
    '10': 'CODN',   // District of Colorado (10th Circuit)
    '11': 'NDGA',   // N.D. Ga. (11th Circuit)
    'dc': 'DCDN',   // D.D.C. (D.C. Circuit)
  };
  return circuitToDistrict[circuit] || null;
}

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  const codes = getAllNOSCodes();
  return codes.map((code) => ({ code }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return {
      title: 'Case Type Not Found',
      description: 'This case type does not exist in our database.',
    };
  }

  const title = `${nosInfo.label} (NOS ${code}) — Win Rates, Timelines & Outcomes`;
  const description = `Research ${nosInfo.label} federal court outcomes. See win rates, median case duration, settlement percentages, and recovery data from real court records. NOS code ${code}.`;
  const canonical = `${SITE_URL}/nos/${code}`;

  // Get win rate from REAL_DATA for dynamic favicon
  const real = REAL_DATA[code];
  const winRate = real?.wr != null ? Math.round(real.wr) : 42;

  return {
    title,
    description,
    alternates: { canonical },
    icons: {
      icon: `${SITE_URL}/api/favicon?rate=${winRate}`,
    },
    openGraph: {
      title: `${nosInfo.label} — Federal Court Statistics`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [
        {
          url: `${SITE_URL}/api/og?type=nos&code=${code}`,
          width: 1200,
          height: 630,
          alt: `${nosInfo.label} Federal Court Statistics`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${nosInfo.label} — Federal Court Statistics`,
      description,
      images: [`${SITE_URL}/api/og?type=nos&code=${code}`],
    },
  };
}

export default async function NOSPage({ params }: PageProps) {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-surface-1)', color: 'var(--color-text-primary)' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case type not found</h1>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>NOS code {code} does not exist in our database.</p>
          <Link href="/" className="inline-block px-6 py-3 font-semibold text-white transition"
            style={{ background: 'var(--accent-primary)', borderRadius: '20px' }}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const outcomeData = OUTCOME_DATA[code] || OUTCOME_DATA._default;
  const real = REAL_DATA[code];

  // Prefer REAL_DATA for stats when available
  const totalCases = real?.total || 0;
  const winRate = real?.wr != null ? Math.round(real.wr) : 42;
  const medianDuration = real?.mo || outcomeData.set_mo || 6;
  const settleRate = real?.sp != null ? Math.round(real.sp) : 30;

  // Outcome bars: prefer REAL_DATA ends, fall back to OUTCOME_DATA
  const outcomePercentages = real?.ends
    ? real.ends.map((e: any) => ({
        label: e.l,
        value: e.p,
        percentage: Math.round(e.p),
        color: e.c,
        count: e.n,
      }))
    : [
        { label: 'Settled', value: outcomeData.fav_set || 30, color: '#057642' },
        { label: 'Dismissed', value: outcomeData.dismiss || 53, color: 'var(--color-text-secondary)' },
        { label: 'Trial Win', value: outcomeData.trial_win || 10, color: 'var(--accent-primary)' },
        { label: 'Trial Loss', value: outcomeData.trial_loss || 7, color: '#CC1016' },
      ].map(o => {
        const total = [outcomeData.fav_set || 30, outcomeData.dismiss || 53, outcomeData.trial_win || 10, outcomeData.trial_loss || 7].reduce((s, v) => s + v, 0);
        return { ...o, percentage: total > 0 ? Math.round((o.value / total) * 100) : 0 };
      });

  // Outcome distribution for horizontal stacked bar (Win/Settlement/Other)
  const outcomeDist = {
    win: real?.wr || winRate,
    settlement: real?.sp || settleRate,
    other: Math.max(0, 100 - (real?.wr || winRate) - (real?.sp || settleRate))
  };

  // Recovery range from REAL_DATA
  const recoveryRange = real?.rng;

  // Key factors from REAL_DATA
  const keyFactors = real?.factors;

  // Governing statute from NOS_STATUTE_MAP
  const statute = NOS_STATUTE_MAP[parseInt(code, 10)];

  // Attorney impact data (represented vs pro se)
  const attyImpact = ATTORNEY_IMPACT[code];

  // Circuit court rates from REAL_DATA
  const circuitRates = real?.circuit_rates;
  const CIRCUIT_NAMES: Record<string, string> = {
    '1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th',
    '6': '6th', '7': '7th', '8': '8th', '9': '9th', '10': '10th',
    '11': '11th', 'dc': 'D.C.',
  };

  // Related NOS codes in same category
  const relatedCodes: { code: string; label: string; category?: string }[] = [];
  SITS.forEach((cat: any) => {
    if (cat.label === nosInfo.category) {
      cat.opts.forEach((opt: any) => {
        if (opt.nos !== code && relatedCodes.length < 6) {
          relatedCodes.push({ code: opt.nos, label: opt.label, category: cat.label });
        }
      });
    }
  });

  // Get 3-4 related case types with their data
  const relatedCaseTypes = relatedCodes.slice(0, 4).map((rel) => {
    const relData = REAL_DATA[rel.code] || { wr: 42, sp: 30, total: 500 };
    return {
      code: rel.code,
      label: rel.label,
      wr: relData.wr || 42,
      sp: relData.sp || 30,
      total: relData.total || 500,
    };
  });

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
          { '@type': 'ListItem', position: 2, name: 'Cases', item: 'https://www.mycasevalues.com/nos' },
          { '@type': 'ListItem', position: 3, name: nosInfo.label, item: `https://mycasevalues.com/nos/${code}` },
        ],
      },
      {
        '@type': 'Dataset',
        '@id': `https://mycasevalues.com/nos/${code}#dataset`,
        name: `${nosInfo.label} Federal Court Statistics`,
        alternateName: `NOS ${code} - ${nosInfo.label} Case Data`,
        description: `Comprehensive federal court statistics for ${nosInfo.label} (NOS ${code}) cases. Includes win rates, case duration, settlement data, and outcome distribution from U.S. federal court system.`,
        url: `https://mycasevalues.com/nos/${code}`,
        creator: {
          '@type': 'Organization',
          name: 'Federal Judicial Center',
          url: 'https://www.fjc.gov',
        },
        provider: {
          '@type': 'Organization',
          name: 'MyCaseValue',
          url: 'https://mycasevalues.com',
        },
        isAccessibleForFree: true,
        spatialCoverage: 'United States Federal Courts',
        temporalCoverage: '1999-..',
        keywords: [
          `${nosInfo.label} statistics`,
          `NOS code ${code}`,
          'federal court outcomes',
          'case settlement data',
          'litigation timeline',
          nosInfo.category,
        ],
        distribution: {
          '@type': 'DataDownload',
          contentUrl: `https://mycasevalues.com/nos/${code}`,
          encodingFormat: 'application/json',
          inLanguage: 'en-US',
        },
        variableMeasured: [
          {
            '@type': 'PropertyValue',
            name: 'Win Rate',
            value: `${winRate}%`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Median Case Duration',
            value: `${medianDuration} months`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Settlement Rate',
            value: `${settleRate}%`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Total Cases Tracked',
            value: totalCases > 0 ? totalCases.toLocaleString() : '500+',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the win rate for ${nosInfo.label} cases?`,
            acceptedAnswer: { '@type': 'Answer', text: `Based on historical federal court data, ${nosInfo.label} cases have an approximate win rate of ${winRate}%. This includes both trial victories and favorable settlements. Individual results vary significantly based on case facts, jurisdiction, and representation.` },
          },
          {
            '@type': 'Question',
            name: `How long do ${nosInfo.label} cases typically take?`,
            acceptedAnswer: { '@type': 'Answer', text: `The median duration for ${nosInfo.label} cases is approximately ${medianDuration} months from filing to resolution. This varies based on court district, case complexity, and whether the case settles or goes to trial.` },
          },
          {
            '@type': 'Question',
            name: `What is NOS code ${code}?`,
            acceptedAnswer: { '@type': 'Answer', text: `NOS (Nature of Suit) code ${code} corresponds to ${nosInfo.label} cases in the federal court system. It falls under the ${nosInfo.category} category.` },
          },
          {
            '@type': 'Question',
            name: `What are the possible outcomes in ${nosInfo.label} cases?`,
            acceptedAnswer: { '@type': 'Answer', text: `${nosInfo.label} cases can result in several outcomes: settlement (${settleRate}% settlement rate), trial victory, trial loss, or dismissal. The distribution varies based on case-specific factors and jurisdiction.` },
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: `${nosInfo.label} Case Analysis & Research`,
        author: {
          '@type': 'Organization',
          name: 'MyCaseValue',
          url: 'https://mycasevalues.com',
        },
        datePublished: new Date().toISOString().split('T')[0],
        description: `Research guide and statistics for ${nosInfo.label} cases (NOS ${code}). Contains federal court outcome data, settlement information, and timeline analysis.`,
        inLanguage: 'en-US',
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)', background: 'var(--color-surface-1)', color: 'var(--color-text-secondary)' }}>
      <DemoNOSPage />
      <style>{`
        .nos-header {
          background: #080d19;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .nos-header::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .nos-header > * {
          position: relative;
        }

        .breadcrumb {
          font-size: 13px;
          font-family: var(--font-body);
          color: var(--border-default);
          margin-bottom: 16px;
        }

        .breadcrumb a {
          color: var(--border-default);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb a:hover {
          color: var(--color-text-inverse);
        }

        .breadcrumb-separator {
          margin: 0 8px;
        }

        .nos-badge {
          display: inline-block;
          padding: 8px 14px;
          background: #1a56db;
          color: var(--color-text-inverse);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          letter-spacing: 0.5px;
          font-family: var(--font-display);
        }

        .stat-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .stat-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 32px;
          font-weight: 600;
          font-family: var(--font-mono);
          margin: 12px 0 8px;
          letter-spacing: -1px;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
        }

        .outcome-bar {
          display: flex;
          height: 32px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-surface-1);
          margin-bottom: 16px;
        }

        .outcome-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-inverse);
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-display);
          transition: opacity 0.2s ease;
        }

        .outcome-legend {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-default);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-family: var(--font-body);
          color: var(--color-text-secondary);
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .related-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          display: block;
        }

        .related-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.12);
          transform: translateY(-2px);
        }

        .related-card-code {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
        }

        .related-card-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-top: 8px;
          font-family: var(--font-display);
        }

        .related-card-category {
          font-size: 12px;
          color: var(--color-text-secondary);
          margin-top: 4px;
          font-family: var(--font-body);
        }

        .disclaimer-box {
          background: rgba(234,179,8,0.1);
          border: 1px solid #FCD34D;
          border-radius: 12px;
          padding: 16px;
        }

        .disclaimer-box h3 {
          color: #92400E;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 8px 0;
          font-family: var(--font-display);
        }

        .disclaimer-box p {
          color: #78350F;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
          font-family: var(--font-body);
        }

        .cta-button {
          background: #1a56db;
          color: var(--color-text-inverse);
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-display);
          border: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          box-shadow: 0 2px 8px rgba(10, 102, 194, 0.2);
        }

        .cta-button:hover {
          background: #D41515;
          box-shadow: 0 4px 16px rgba(10, 102, 194, 0.25);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 28px !important;
          }
          h2 {
            font-size: 18px !important;
          }
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 20px;
          font-family: var(--font-display);
        }

        .content-box {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .outcome-dist-bar {
          display: flex;
          height: 20px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-surface-1);
          margin-bottom: 20px;
        }

        .outcome-dist-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-inverse);
          font-size: 10px;
          font-weight: 600;
          font-family: var(--font-display);
        }

        .outcome-dist-labels {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          font-size: 12px;
          color: var(--color-text-secondary);
          font-family: var(--font-body);
        }

        .outcome-dist-label {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .outcome-dist-dot {
          width: 10px;
          height: 10px;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .recovery-range-bar {
          position: relative;
          height: 40px;
          margin-bottom: 20px;
        }

        .recovery-track {
          position: absolute;
          top: 16px;
          left: 0;
          right: 0;
          height: 8px;
          background: rgba(59,130,246,0.08);
          border-radius: 4px;
        }

        .recovery-gradient {
          position: absolute;
          top: 16px;
          height: 8px;
          background: #3b82f6;
          border-radius: 4px;
        }

        .recovery-marker {
          position: absolute;
          top: 10px;
          width: 2px;
          height: 20px;
          background: #1a56db;
          transform: translateX(-50%);
          z-index: 10;
        }

        .key-factors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .factor-item {
          padding: 12px;
          background: var(--color-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .factor-dot {
          width: 8px;
          height: 8px;
          background: #1a56db;
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .factor-text {
          font-size: 13px;
          color: var(--color-text-secondary);
          font-family: var(--font-body);
          line-height: 1.5;
        }

        .related-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .related-type-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          display: block;
        }

        .related-type-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 2px 8px rgba(10, 102, 194, 0.1);
          transform: translateY(-1px);
        }

        .related-type-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
          margin-bottom: 8px;
        }

        .related-type-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 10px;
          font-family: var(--font-display);
        }

        .related-type-stats {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
          color: var(--color-text-secondary);
        }

        .related-type-stat {
          display: flex;
          justify-content: space-between;
        }

        .quick-actions-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }

        .quick-action-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          color: var(--accent-primary);
          text-align: center;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 13px;
          font-family: var(--font-display);
        }

        .quick-action-card:hover {
          border-color: var(--accent-primary);
          background: rgba(59,130,246,0.06);
          box-shadow: 0 2px 8px rgba(10, 102, 194, 0.1);
        }
      `}</style>

      {/* Dark Navy Header */}
      <header className="nos-header px-4 sm:px-6 lg:px-8 py-12" style={{ paddingTop: 'clamp(16px, 4vw, 48px)', paddingBottom: 'clamp(16px, 4vw, 48px)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/nos">Case Types</Link>
            <span className="breadcrumb-separator">/</span>
            <span style={{ color: 'var(--color-text-inverse)' }}>{nosInfo.label}</span>
          </div>

          <div className="flex items-start justify-between gap-6" style={{ flexWrap: 'wrap' }}>
            <div className="flex-1">
              <h1 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 600, margin: '0 0 12px 0', fontFamily: 'var(--font-display)', lineHeight: 1.2, color: 'var(--color-surface-0)' }}>
                {nosInfo.label}
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--border-default)', margin: 0, fontFamily: 'var(--font-body)' }}>
                {nosInfo.category}
              </p>
            </div>
            <div className="nos-badge">{`NOS ${code}`}</div>
          </div>
        </div>
      </header>

      {/* Key Stats Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Data Freshness Badge */}
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <Link href="/methodology" title="View data methodology and sources" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(59,130,246,0.08)', color: 'var(--accent-primary)', fontSize: '11px', fontWeight: 500, fontFamily: 'var(--font-body)', padding: '2px 8px', borderRadius: '4px', textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: '18px' }}>Updated Q4 2025</Link>
          </div>
          <MetricsStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Win Rate', value: `${winRate}%`, color: 'var(--accent-primary)', showSample: true, showDot: true },
              { label: 'Median Duration', value: `${medianDuration} mo`, color: 'var(--accent-primary)', showSample: false, showDot: false },
              { label: 'Settlement Rate', value: `${settleRate}%`, color: '#057642', showSample: false, showDot: false },
              { label: 'Cases Analyzed', value: totalCases > 0 ? totalCases.toLocaleString() : '500+', color: 'var(--accent-primary)', showSample: false, showDot: false },
            ].map((stat, i) => (
              <MetricsStaggerItem key={i} className="stat-card">
                <div className="stat-value" style={{ color: stat.color, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  {stat.value}
                  {stat.showDot && totalCases > 0 && (
                    <span title={`Based on ${totalCases.toLocaleString()} cases — ${totalCases >= 10000 ? 'High' : totalCases >= 1000 ? 'Medium' : totalCases >= 100 ? 'Low' : 'Insufficient'} confidence`} style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: totalCases >= 10000 ? '#057642' : totalCases >= 1000 ? '#C37D16' : totalCases >= 100 ? '#CC1016' : '#999999' }} />
                  )}
                  {stat.showSample && totalCases > 0 && <SampleSizeIndicator count={totalCases} />}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </MetricsStaggerItem>
            ))}
          </MetricsStagger>

          {/* Updated Badge */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
            <UpdatedBadge />
          </div>

          {/* Conditional Footnotes */}
          {code === '220' && (
            <div style={{
              marginTop: '24px',
              padding: '14px 16px',
              backgroundColor: 'rgba(234,179,8,0.1)',
              borderLeft: '3px solid #D97706',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#fde68a',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              <strong>Note:</strong> Foreclosure win rates primarily reflect lender (plaintiff) victories. Individual homeowners appear as defendants in most federal foreclosure actions.
            </div>
          )}

          {code === '863' && (
            <div style={{
              marginTop: '24px',
              padding: '14px 16px',
              backgroundColor: 'rgba(234,179,8,0.1)',
              borderLeft: '3px solid #D97706',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#fde68a',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              <strong>Note:</strong> Federal court win rates for Social Security disability cases reflect appeals of initial administrative denials. The majority of successful SSDI/SSI claims are resolved at the administrative level prior to federal filing.
            </div>
          )}
        </div>
      </section>

      {/* 10-Year Win Rate Trend */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="content-box">
            <h2 className="section-title">10-Year Win Rate Trend</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
              Historical win rate patterns over the past decade (2015-2024)
            </p>
            <WinRateTrend
              data={NOS_TRENDS[code] || []}
              nosCode={code}
              height={150}
            />
          </div>
        </div>
      </section>

      {/* Outcome Distribution - Stacked Horizontal Bar (Win/Settlement/Other) */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="content-box">
            <h2 className="section-title">Case Resolution Summary</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
              How {nosInfo.label} cases are resolved
            </p>

            <div className="outcome-dist-bar">
              {outcomeDist.win > 0 && (
                <div
                  className="outcome-dist-segment"
                  style={{
                    background: '#15803D',
                    width: `${outcomeDist.win}%`,
                  }}
                  title={`Win: ${Math.round(outcomeDist.win)}%`}
                >
                  {outcomeDist.win > 12 && `${Math.round(outcomeDist.win)}%`}
                </div>
              )}
              {outcomeDist.settlement > 0 && (
                <div
                  className="outcome-dist-segment"
                  style={{
                    background: '#B45309',
                    width: `${outcomeDist.settlement}%`,
                  }}
                  title={`Settlement: ${Math.round(outcomeDist.settlement)}%`}
                >
                  {outcomeDist.settlement > 12 && `${Math.round(outcomeDist.settlement)}%`}
                </div>
              )}
              {outcomeDist.other > 0 && (
                <div
                  className="outcome-dist-segment"
                  style={{
                    background: 'var(--color-text-muted)',
                    width: `${outcomeDist.other}%`,
                  }}
                  title={`Other: ${Math.round(outcomeDist.other)}%`}
                >
                  {outcomeDist.other > 12 && `${Math.round(outcomeDist.other)}%`}
                </div>
              )}
            </div>

            <div className="outcome-dist-labels">
              <div className="outcome-dist-label">
                <div className="outcome-dist-dot" style={{ background: '#15803D' }}></div>
                <span>Win: <strong style={{ color: 'var(--accent-primary)' }}>{Math.round(outcomeDist.win)}%</strong></span>
              </div>
              <div className="outcome-dist-label">
                <div className="outcome-dist-dot" style={{ background: '#B45309' }}></div>
                <span>Settlement: <strong style={{ color: 'var(--accent-primary)' }}>{Math.round(outcomeDist.settlement)}%</strong></span>
              </div>
              <div className="outcome-dist-label">
                <div className="outcome-dist-dot" style={{ background: 'var(--color-text-muted)' }}></div>
                <span>Other: <strong style={{ color: 'var(--accent-primary)' }}>{Math.round(outcomeDist.other)}%</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Distribution - CSS-based Chart */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="content-box">
            <h2 className="section-title">Outcome Distribution</h2>

            <div className="outcome-bar">
              {outcomePercentages.map((o, i) => (
                <div
                  key={i}
                  className="outcome-segment"
                  style={{
                    background: o.color,
                    width: `${o.percentage}%`,
                    minWidth: o.percentage > 5 ? 'auto' : '0px',
                  }}
                  title={`${o.label}: ${o.percentage}%`}
                >
                  {o.percentage > 8 && `${o.percentage}%`}
                </div>
              ))}
            </div>

            <div className="outcome-legend">
              {outcomePercentages.map((o, i) => (
                <div key={i} className="legend-item">
                  <div className="legend-color" style={{ background: o.color }}></div>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {o.label}: <strong style={{ color: 'var(--accent-primary)' }}>{o.percentage}%</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Disposition Breakdown */}
      {DISPOSITION_DATA[code] && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Case Disposition Breakdown</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                Detailed breakdown of case dispositions for {nosInfo.label} cases
              </p>
              <DispositionBar data={DISPOSITION_DATA[code]} />
            </div>
          </div>
        </section>
      )}

      {/* Recovery Range Visualization with Inflation Toggle */}
      {recoveryRange && recoveryRange.md > 0 && (
        <NOSRecoveryRangeClient
          recoveryRange={recoveryRange}
          nosLabel={nosInfo.label}
          sourceYear={2021}
        />
      )}

      {/* Settlement Distribution Violin Plot — for high-data NOS codes */}
      {recoveryRange && recoveryRange.md > 0 && ['442', '362', '365', '830'].includes(code) && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Settlement Distribution</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                Full distribution shape of monetary recoveries — reveals patterns beyond simple percentiles.
              </p>
              <SettlementViolin nosCode={code} height={140} />
            </div>
          </div>
        </section>
      )}

      {/* Governing Statute Reference */}
      {statute && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Governing Statute</h2>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                {statute.url ? (
                  <a
                    href={statute.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 14px',
                      background: 'rgba(59,130,246,0.08)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--accent-primary-hover)',
                      fontFamily: 'var(--font-mono)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      textDecoration: 'none',
                      transition: 'background 150ms ease',
                    }}
                  >
                    {statute.usc} ↗
                  </a>
                ) : (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 14px',
                    background: 'rgba(59,130,246,0.08)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--accent-primary-hover)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {statute.usc}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
                    {statute.title}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-body)' }}>
                    {statute.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EEOC Charge Pipeline (employment discrimination NOS codes only) */}
      {EEOC_ENABLED_NOS.has(code) && (
        <EEOCPipeline federalCaseWinRate={winRate} />
      )}

      {/* NLRB Case Context (labor/management relations NOS codes only) */}
      {NLRB_ENABLED_NOS.has(code) && (
        <NLRBContext />
      )}

      {/* OSHA Regulatory Context (workplace safety NOS codes only) */}
      {OSHA_ENABLED_NOS.has(code) && (
        <OSHAContext />
      )}

      {/* Relevant Opinions (top 10 NOS codes only) */}
      {OPINIONS_ENABLED_NOS.has(code) && (
        <RelevantOpinions nosCode={code} nosLabel={nosInfo.label} />
      )}

      {/* Circuit Court Win Rates */}
      {circuitRates && Object.keys(circuitRates).length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Win Rate by Circuit</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                Case outcome rates for {nosInfo.label} cases across federal circuits
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                {Object.entries(circuitRates)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([circuit, rate]) => {
                    const wr = rate as number;
                    const districtCode = getRepresentativeDistrictForCircuit(circuit);
                    const districtUrl = districtCode ? `/districts/${districtCode}/${code}` : null;
                    const cardContent = (
                      <div style={{
                        padding: '12px 16px',
                        background: 'var(--color-surface-1)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '12px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {CIRCUIT_NAMES[circuit] || circuit} Circuit
                          </span>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: wr >= winRate ? '#057642' : 'var(--accent-primary)',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {wr}%
                          </span>
                        </div>
                        <div style={{ height: '4px', background: 'var(--border-default)', borderRadius: '12px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(wr, 100)}%`,
                            background: wr >= winRate ? '#057642' : 'var(--accent-primary)',
                            borderRadius: '12px',
                          }} />
                        </div>
                      </div>
                    );
                    return districtUrl ? (
                      <Link key={circuit} href={districtUrl} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                        {cardContent}
                      </Link>
                    ) : (
                      <div key={circuit}>
                        {cardContent}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Factors */}
      {keyFactors && keyFactors.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Key Factors</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                Important factors that influence outcomes in {nosInfo.label} cases
              </p>
              <div className="key-factors-grid">
                {keyFactors.map((factor: any, idx: number) => (
                  <div key={idx} className="factor-item">
                    <div className="factor-dot"></div>
                    <div className="factor-text">{typeof factor === 'string' ? factor : factor.label || factor}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Attorney Impact */}
      {attyImpact && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Attorney Impact</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                How legal representation affects outcomes in {nosInfo.label} cases
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {/* Represented */}
                <div style={{
                  padding: '20px',
                  background: getWinRateColor(attyImpact.rwr).bg,
                  border: `1px solid ${getWinRateColor(attyImpact.rwr).border}`,
                  borderRadius: '12px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    With Attorney
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    color: getWinRateColor(attyImpact.rwr).text,
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.1,
                  }}>
                    {attyImpact.rwr}%
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
                    win rate · {attyImpact.rn.toLocaleString()} cases
                  </div>
                </div>

                {/* Pro Se */}
                <div style={{
                  padding: '20px',
                  background: 'rgba(239,68,68,0.06)',
                  border: '1px solid #CC1016',
                  borderRadius: '12px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Pro Se (No Attorney)
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    color: '#CC1016',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.1,
                  }}>
                    {attyImpact.pwr}%
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
                    win rate · {attyImpact.pn.toLocaleString()} cases
                  </div>
                </div>

                {/* Difference */}
                <div style={{
                  padding: '20px',
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid var(--accent-primary)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Representation Effect
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    color: 'var(--accent-primary-hover)',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.1,
                  }}>
                    +{attyImpact.rwr - attyImpact.pwr}%
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
                    higher win rate with counsel
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '16px',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)',
              }}>
                Based on {(attyImpact.rn + attyImpact.pn).toLocaleString()} cases in this category. Source: FJC Integrated Database.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Judges Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <JudgeSectionLoader nosCode={code} mode="top-national" />
        </div>
      </section>

      {/* Related Case Types */}
      {relatedCaseTypes.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="content-box">
              <h2 className="section-title">Related Case Types</h2>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
                Other case types in the {nosInfo.category} category
              </p>
              <div className="related-types-grid">
                {relatedCaseTypes.map((caseType) => (
                  <Link key={caseType.code} href={`/nos/${caseType.code}`} className="related-type-card">
                    <div className="related-type-label">NOS {caseType.code}</div>
                    <div className="related-type-name">{caseType.label}</div>
                    <div className="related-type-stats">
                      <div className="related-type-stat">
                        <span>Win Rate:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: caseType.wr >= 50 ? '#057642' : 'var(--accent-primary)' }}>{caseType.wr}%</strong>
                          <span title={`Based on ${caseType.total.toLocaleString()} cases — ${caseType.total >= 10000 ? 'High' : caseType.total >= 1000 ? 'Medium' : caseType.total >= 100 ? 'Low' : 'Insufficient'} confidence`} style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', backgroundColor: caseType.total >= 10000 ? '#057642' : caseType.total >= 1000 ? '#C37D16' : caseType.total >= 100 ? '#CC1016' : '#999999' }} />
                        </div>
                      </div>
                      <div className="related-type-stat">
                        <span>Settlement:</span>
                        <strong style={{ color: 'var(--accent-primary)' }}>{caseType.sp}%</strong>
                      </div>
                      <div className="related-type-stat">
                        <span>Cases:</span>
                        <strong style={{ color: 'var(--color-text-secondary)' }}>{caseType.total.toLocaleString()}</strong>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="content-box">
            <h2 className="section-title">Quick Actions</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
              Next steps for your research
            </p>
            <div className="quick-actions-bar">
              <Link href={`/report/${code}`} className="quick-action-card">
                - View Report
              </Link>
              <Link href="/calculator" className="quick-action-card">
                - Calculator
              </Link>
              <Link href="/compare" className="quick-action-card">
                - Compare Cases
              </Link>
              <Link href="/odds" className="quick-action-card">
                - Odds Finder
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="disclaimer-box">
            <h3>Legal Disclaimer</h3>
            <p>
              This information is provided for educational and research purposes only and does not constitute legal advice.
              The statistics presented are based on publicly available federal court data and should not be used
              as the sole basis for legal decisions. Actual case outcomes depend on specific facts, jurisdiction,
              and representation. Please consult with a qualified attorney to discuss your individual case.
            </p>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-default)' }}>
              <DataFreshness />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center" style={{ background: 'var(--color-surface-0)', borderTop: '1px solid var(--border-default)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 12px 0', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
            Research Your {nosInfo.label} Case
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
            Explore detailed outcomes, recovery ranges, and timeline data with our interactive research tool.
          </p>
          <Link href="/" className="cta-button">
            Start Your Research — Free
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
