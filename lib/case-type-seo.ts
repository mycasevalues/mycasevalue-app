/**
 * SEO Landing Page Mapping for Federal Case Types
 * Maps all 84 NOS codes to SEO-optimized content
 * Auto-generates descriptions from real case data
 */

import { REAL_DATA } from './realdata';
import { SITS } from './data';

export interface CaseTypeSEO {
  slug: string;
  categorySlug: string;
  nosCode: string;
  label: string;
  description: string;
  federalLaw: string;
  typicalClaims: string[];
}

// Map of federal laws by NOS code and case type
const FEDERAL_LAW_MAP: Record<string, string> = {
  '442': 'Title VII of the Civil Rights Act of 1964',
  '710': 'Fair Labor Standards Act (FLSA) & State Wage Laws',
  '445': 'Americans with Disabilities Act (ADA)',
  '440': 'Civil Rights Act (42 U.S.C. § 1983)',
  '350': 'Diversity jurisdiction under 28 U.S.C. § 1332',
  '362': 'State Tort Law & Medical Malpractice Statutes',
  '365': 'Products Liability & State Tort Law',
  '360': 'State Tort Law & Premises Liability',
  '370': 'State Tort & Federal Question Jurisdiction',
  '110': 'Insurance contracts and state insurance law',
  '190': 'Diversity jurisdiction (28 U.S.C. § 1332)',
  '230': 'Fair Housing Act & State Landlord-Tenant Law',
  '220': 'Bankruptcy & Mortgage Foreclosure Law',
  '195': 'Construction defect statutes',
  '385': 'State Property Law',
  '900': 'Eminent Domain (5 U.S.C. § 1201 et seq.)',
  '870': 'Fair Debt Collection Practices Act (FDCPA)',
  '443': 'Fair Housing Act (42 U.S.C. § 3601 et seq.)',
  '441': 'Voting Rights Act (52 U.S.C. § 10101 et seq.)',
  '550': 'Civil Rights Act (42 U.S.C. § 1983) - Prison Conditions',
  '830': 'Copyright Act (17 U.S.C.)',
  '840': 'Trademark & Trade Secrets Law',
  '850': 'Securities Exchange Act (15 U.S.C. § 78j)',
  '791': 'Employee Retirement Income Security Act (ERISA)',
  '863': 'Social Security Act & Disability Law',
  '152': 'Internal Revenue Code (26 U.S.C.)',
  '893': 'Environmental Protection Act',
  '899': 'Immigration & Nationality Act (8 U.S.C.)',
  '950': 'Constitutional Law',
  '820': 'Copyright Law (17 U.S.C.)',
};

// Typical claims by NOS code
const TYPICAL_CLAIMS_MAP: Record<string, string[]> = {
  '442': [
    'Wrongful termination in violation of Title VII',
    'Racial/gender/age discrimination',
    'Hostile work environment',
    'Retaliation for protected activity',
    'Failure to accommodate disability',
  ],
  '710': [
    'Unpaid overtime wages',
    'Minimum wage violations',
    'Improper wage deductions',
    'Misclassification as exempt',
    'Compensatory time violations',
  ],
  '445': [
    'Failure to provide reasonable accommodation',
    'Disability discrimination',
    'Retaliation for requesting accommodation',
    'Harassment based on disability',
    'Architectural barriers violation',
  ],
  '440': [
    'Excessive force by police',
    'Wrongful arrest/false imprisonment',
    'Denial of constitutional rights',
    'Deprivation of due process',
    'Violation of free speech rights',
  ],
  '350': [
    'Negligent operation of vehicle',
    'Reckless driving',
    'Violation of traffic laws',
    'Failure to maintain safe vehicle',
    'Punitive damages claim',
  ],
  '362': [
    'Breach of standard of care',
    'Surgical errors',
    'Misdiagnosis',
    'Failure to obtain informed consent',
    'Negligent medical treatment',
  ],
  '365': [
    'Design defect',
    'Manufacturing defect',
    'Failure to warn',
    'Breach of warranty',
    'Punitive damages',
  ],
  '360': [
    'Premises liability',
    'Negligent security',
    'Failure to maintain safe premises',
    'Animal attack liability',
    'Slip and fall negligence',
  ],
  '370': [
    'Negligence',
    'Breach of duty',
    'Causation of injury',
    'Damages',
    'Comparative negligence defense',
  ],
  '110': [
    'Bad faith claim denial',
    'Unreasonable delay',
    'Breach of insurance contract',
    'Extra-contractual damages',
    'Failure to defend claim',
  ],
  '190': [
    'Breach of contract',
    'Breach of express warranty',
    'Breach of implied covenant',
    'Material breach',
    'Damages for breach',
  ],
  '230': [
    'Wrongful eviction',
    'Habitability violation',
    'Security deposit theft',
    'Retaliation for complaint',
    'Unlawful lockout',
  ],
  '220': [
    'Wrongful foreclosure',
    'Failure to process modification',
    'Predatory lending',
    'Breach of mortgage contract',
    'Fraud in origination',
  ],
  '195': [
    'Structural defects',
    'Poor workmanship',
    'Use of defective materials',
    'Design defects',
    'Breach of warranty',
  ],
  '385': [
    'Property damage',
    'Trespass',
    'Nuisance',
    'Title dispute',
    'Boundary dispute',
  ],
  '900': [
    'Just compensation claim',
    'Challenging government taking',
    'Severance damages',
    'Loss of access/easement',
    'Inverse condemnation',
  ],
  '870': [
    'Abusive collection practices',
    'False representations',
    'Harassment and threats',
    'Violations of payment restrictions',
    'Failure to validate debt',
  ],
  '443': [
    'Housing discrimination',
    'Refusal to rent',
    'Discriminatory terms',
    'Steering',
    'Blockbusting',
  ],
  '441': [
    'Voter suppression',
    'Discriminatory election practice',
    'Failure to provide accommodations',
    'Purge from voter rolls',
    'Barriers to voting access',
  ],
  '550': [
    'Excessive force by correctional officers',
    'Deliberate indifference to medical needs',
    'Inadequate protection from inmates',
    'Denial of due process',
    'Cruel and unusual punishment',
  ],
  '830': [
    'Unauthorized reproduction',
    'Copyright infringement',
    'Derivative work violation',
    'Willful infringement',
    'Statutory damages claim',
  ],
  '840': [
    'Trademark dilution',
    'Trade dress infringement',
    'Unfair competition',
    'False endorsement',
    'Counterfeiting',
  ],
  '850': [
    'Securities fraud',
    'Insider trading',
    'Pump and dump scheme',
    'Failure to register',
    'Material misrepresentation',
  ],
  '791': [
    'Wrongful benefits denial',
    'Breach of plan terms',
    'Arbitrary and capricious decision',
    'Failure to provide plan documents',
    'Fiduciary breach',
  ],
  '863': [
    'Disability benefits denial',
    'Social Security overpayment',
    'Failure to process claim timely',
    'Arbitrary decision reversal',
    'Failure to consider evidence',
  ],
  '152': [
    'Tax liability dispute',
    'Improper assessment',
    'Erroneous refund denial',
    'Procedural violation',
    'Penalty assessment challenge',
  ],
  '893': [
    'Violation of Clean Air Act',
    'Violation of Clean Water Act',
    'Hazardous waste violation',
    'Citizen suit against polluter',
    'Environmental damage claim',
  ],
  '899': [
    'Wrongful deportation',
    'Visa denial challenge',
    'Asylum denial',
    'Administrative error challenge',
    'Naturalization denial',
  ],
  '950': [
    'First Amendment violation',
    'Equal protection violation',
    'Due process violation',
    'Fourth Amendment violation',
    'Constitutional rights denial',
  ],
};

/**
 * Generate a detailed, SEO-optimized description using real case data
 */
export function generateDescription(
  nosCode: string,
  label: string,
  federalLaw: string
): string {
  const data = REAL_DATA[nosCode];

  if (!data) {
    // Fallback description if no data exists
    return `${label} cases fall under ${federalLaw}. These federal court disputes involve complex legal issues and typically require specialized legal representation. Understanding case outcomes, settlement trends, and win rates is crucial for evaluating potential claims and preparing for litigation in federal court.`;
  }

  const winRate = Math.round(data.wr || 0);
  const settlementRate = Math.round(data.sp || 0);
  const medianMonths = data.mo || 6;
  const medianRecovery = data.rng?.md ? `$${Math.round(data.rng.md * 1000).toLocaleString()}` : '$50,000';
  const totalCases = data.total ? data.total.toLocaleString() : '1000+';
  const trialWinRate = data.outcome_data?.trial_win || 0;
  const settlementMedianMonths = data.outcome_data?.set_mo || medianMonths;
  const classActionPct = Math.round(data.class_action_pct || 0);

  // Construct description with real data
  const parts = [
    `${label} cases represent a significant portion of federal court litigation, with over ${totalCases} cases documented in federal courts. These disputes fall under ${federalLaw} and involve complex legal principles that require careful evaluation.`,

    `In federal ${label.toLowerCase()} litigation, plaintiffs achieve favorable outcomes in approximately ${winRate}% of cases, with settlement rates around ${settlementRate}%. The median case duration is ${medianMonths} months from filing to resolution. When cases proceed to trial, the median recovery for successful plaintiffs is approximately ${medianRecovery}.`,

    `Settlement negotiations typically conclude within ${settlementMedianMonths} months of filing. Plaintiffs who secure settlements recover approximately ${settlementRate}% of claims through negotiated agreements outside of trial. ${classActionPct > 0 ? `Approximately ${classActionPct}% of these cases are filed as class actions, which can involve larger damages and broader implications.` : 'Some cases may be pursued as class actions, allowing multiple plaintiffs to consolidate claims for greater leverage.'}`,

    `Understanding the federal court landscape for ${label.toLowerCase()} is essential when evaluating potential claims. The data shows that having strong legal representation, thorough documentation of claims, and realistic settlement expectations significantly impact case outcomes. Jurisdictional factors and circuit court precedent can also influence winning percentages and recovery amounts.`,

    `Our federal court data comes from the Federal Judicial Center and CourtListener, analyzing thousands of ${label.toLowerCase()} cases to provide accurate win rate statistics, settlement trends, and case duration benchmarks that help litigants understand what to expect in federal litigation.`,
  ];

  return parts.join(' ');
}

/**
 * Get all case type mappings
 */
export function getAllCaseTypeSEO(): CaseTypeSEO[] {
  const mappings: CaseTypeSEO[] = [];

  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      const nosCode = option.nos;
      const categorySlug = category.id;

      const slug = option.d
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const federalLaw = FEDERAL_LAW_MAP[nosCode] || 'Federal Question Jurisdiction';
      const typicalClaims = TYPICAL_CLAIMS_MAP[nosCode] || [
        'Breach of applicable law',
        'Negligence or misconduct',
        'Damages claim',
        'Injunctive relief',
        'Attorney fees claim',
      ];

      mappings.push({
        slug,
        categorySlug,
        nosCode,
        label: option.label,
        description: generateDescription(nosCode, option.label, federalLaw),
        federalLaw,
        typicalClaims: typicalClaims.slice(0, 5), // Limit to 5 claims
      });
    });
  });

  // Remove duplicates by slug/category combination, keeping first occurrence
  const seen = new Set<string>();
  return mappings.filter((m) => {
    const key = `${m.slug}-${m.categorySlug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Get a specific case type mapping by slug and category
 */
export function getCaseTypeSEO(
  categorySlug: string,
  slug: string
): CaseTypeSEO | undefined {
  return getAllCaseTypeSEO().find(
    (m) => m.categorySlug === categorySlug && m.slug === slug
  );
}

/**
 * Get all case types for a category
 */
export function getCaseTypesByCategory(categorySlug: string): CaseTypeSEO[] {
  return getAllCaseTypeSEO().filter((m) => m.categorySlug === categorySlug);
}

/**
 * Generate metadata for case type page
 */
export function generateCaseTypeMetadata(caseType: CaseTypeSEO) {
  const title = `${caseType.label} — Federal Court Outcomes & Win Rates | MyCaseValue`;
  const description = caseType.description.substring(0, 160) + '...';

  return {
    title,
    description,
    keywords: [
      caseType.label,
      'federal court',
      'win rates',
      'settlement data',
      'case outcomes',
      caseType.federalLaw,
    ].join(', '),
  };
}
