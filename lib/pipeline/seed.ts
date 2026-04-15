/**
 * Seed Data for Development
 *
 * Provides realistic sample records for all canonical tables so
 * frontend development can continue without live API access.
 * These records are representative of real federal court data.
 *
 * Usage: npx tsx scripts/seed-pipeline.ts
 */

import {
  getOrCreateCourt,
  upsertCase,
  upsertCaseSource,
  insertParties,
  upsertOpinion,
  upsertSummary,
  upsertTags,
  buildExternalCaseKey,
  normalizeCaseName,
} from './db';
import type { CaseTagRow } from './types';

// ── Sample Courts ──

const SAMPLE_COURTS = [
  { name: 'Southern District of New York', abbreviation: 'SDNY', jurisdiction: 'federal', circuit: '2', state: 'NY', source_slug: 'nysd' },
  { name: 'Central District of California', abbreviation: 'CACD', jurisdiction: 'federal', circuit: '9', state: 'CA', source_slug: 'cacd' },
  { name: 'Northern District of Illinois', abbreviation: 'ILND', jurisdiction: 'federal', circuit: '7', state: 'IL', source_slug: 'ilnd' },
  { name: 'District of Delaware', abbreviation: 'DED', jurisdiction: 'federal', circuit: '3', state: 'DE', source_slug: 'ded' },
  { name: 'Eastern District of Texas', abbreviation: 'TXED', jurisdiction: 'federal', circuit: '5', state: 'TX', source_slug: 'txed' },
];

// ── Sample Cases ──

const SAMPLE_CASES = [
  {
    case_name: 'SEC v. Terraform Labs PTE Ltd.',
    court: 'SDNY',
    docket_number: '1:23-cv-01346',
    case_type: 'Securities Fraud',
    nature_of_suit: '850',
    filing_date: '2023-02-16',
    termination_date: '2024-06-13',
    status: 'closed',
    parties: [
      { party_name: 'Securities and Exchange Commission', role: 'plaintiff' },
      { party_name: 'Terraform Labs PTE Ltd.', role: 'defendant' },
      { party_name: 'Do Hyeong Kwon', role: 'defendant' },
    ],
    summary: 'SEC enforcement action alleging that Terraform Labs and its CEO orchestrated a securities fraud involving crypto asset securities. The SEC alleged the defendants raised billions of dollars from investors through an inter-connected web of securities fraud. The case resulted in a jury verdict finding defendants liable for fraud.',
    tags: [
      { tag: 'Securities Law', category: 'practice_area', confidence: 1.0 },
      { tag: 'Securities Fraud', category: 'claim_type', confidence: 1.0 },
      { tag: 'SEC Enforcement', category: 'subject_matter', confidence: 1.0 },
      { tag: 'Closed', category: 'procedural_stage', confidence: 1.0 },
      { tag: 'District Court', category: 'forum_type', confidence: 1.0 },
    ],
  },
  {
    case_name: 'Johnson v. Amazon.com Inc.',
    court: 'CACD',
    docket_number: '2:24-cv-00892',
    case_type: 'Employment Discrimination',
    nature_of_suit: '442',
    filing_date: '2024-02-05',
    status: 'open',
    parties: [
      { party_name: 'Maria Johnson', role: 'plaintiff' },
      { party_name: 'Amazon.com Inc.', role: 'defendant' },
    ],
    summary: 'Employment discrimination action alleging violations of Title VII of the Civil Rights Act. The plaintiff alleges workplace discrimination based on race and gender, including adverse employment actions and a hostile work environment. The case is in the discovery phase.',
    tags: [
      { tag: 'Employment Law', category: 'practice_area', confidence: 1.0 },
      { tag: 'Employment Discrimination', category: 'claim_type', confidence: 1.0 },
      { tag: 'Title VII', category: 'subject_matter', confidence: 0.9 },
      { tag: 'Discovery', category: 'procedural_stage', confidence: 0.7 },
      { tag: 'District Court', category: 'forum_type', confidence: 1.0 },
    ],
  },
  {
    case_name: 'Acme Pharmaceuticals Inc. v. Generic Drug Corp.',
    court: 'DED',
    docket_number: '1:23-cv-01122',
    case_type: 'Patent Infringement',
    nature_of_suit: '830',
    filing_date: '2023-10-11',
    status: 'open',
    parties: [
      { party_name: 'Acme Pharmaceuticals Inc.', role: 'plaintiff' },
      { party_name: 'Generic Drug Corp.', role: 'defendant' },
    ],
    summary: 'Patent infringement action in which the plaintiff alleges the defendant has filed an Abbreviated New Drug Application (ANDA) that infringes patents covering a pharmaceutical compound. The case involves Hatch-Waxman litigation over drug formulation patents. Currently in claim construction proceedings.',
    tags: [
      { tag: 'Intellectual Property', category: 'practice_area', confidence: 1.0 },
      { tag: 'Patent Infringement', category: 'claim_type', confidence: 1.0 },
      { tag: 'Hatch-Waxman', category: 'subject_matter', confidence: 0.9 },
      { tag: 'District Court', category: 'forum_type', confidence: 1.0 },
    ],
  },
  {
    case_name: 'Williams v. City of Chicago',
    court: 'ILND',
    docket_number: '1:24-cv-03456',
    case_type: 'Civil Rights',
    nature_of_suit: '440',
    filing_date: '2024-05-20',
    status: 'open',
    parties: [
      { party_name: 'David Williams', role: 'plaintiff' },
      { party_name: 'City of Chicago', role: 'defendant' },
      { party_name: 'Officer James Baker', role: 'defendant' },
    ],
    summary: 'Section 1983 civil rights action alleging excessive force by a Chicago police officer during a traffic stop. The plaintiff sustained injuries requiring hospitalization. The complaint asserts Fourth Amendment violations and seeks compensatory and punitive damages against the officer and the municipality.',
    tags: [
      { tag: 'Civil Rights', category: 'practice_area', confidence: 1.0 },
      { tag: 'Excessive Force', category: 'claim_type', confidence: 1.0 },
      { tag: 'Section 1983', category: 'subject_matter', confidence: 1.0 },
      { tag: 'Government Entity', category: 'subject_matter', confidence: 1.0 },
      { tag: 'District Court', category: 'forum_type', confidence: 1.0 },
    ],
  },
  {
    case_name: 'In re: East Texas Patent Litigation (Smith v. TechCo)',
    court: 'TXED',
    docket_number: '6:23-cv-00567',
    case_type: 'Patent Infringement',
    nature_of_suit: '830',
    filing_date: '2023-08-14',
    termination_date: '2024-11-03',
    status: 'closed',
    parties: [
      { party_name: 'Robert Smith', role: 'plaintiff' },
      { party_name: 'TechCo International LLC', role: 'defendant' },
    ],
    summary: 'Patent infringement case involving software technology patents. The case was resolved through settlement after the court denied defendant\'s motion to transfer venue. The settlement terms are confidential.',
    tags: [
      { tag: 'Intellectual Property', category: 'practice_area', confidence: 1.0 },
      { tag: 'Patent Infringement', category: 'claim_type', confidence: 1.0 },
      { tag: 'Closed', category: 'procedural_stage', confidence: 1.0 },
      { tag: 'District Court', category: 'forum_type', confidence: 1.0 },
    ],
  },
];

// ── Seed Runner ──

export async function seedPipelineData(): Promise<void> {
  console.log('[seed] Starting pipeline seed data insertion...');

  // 1. Seed courts
  const courtIds: Record<string, number> = {};
  for (const court of SAMPLE_COURTS) {
    const id = await getOrCreateCourt(court);
    courtIds[court.abbreviation] = id;
    console.log(`[seed] Court: ${court.name} (id: ${id})`);
  }

  // 2. Seed cases with full data
  for (const sample of SAMPLE_CASES) {
    const externalKey = buildExternalCaseKey(sample.court, sample.docket_number);

    const { id: caseId, inserted } = await upsertCase({
      external_case_key: externalKey,
      case_name: sample.case_name,
      normalized_case_name: normalizeCaseName(sample.case_name),
      court_id: courtIds[sample.court],
      docket_number: sample.docket_number,
      case_type: sample.case_type,
      nature_of_suit: sample.nature_of_suit,
      filing_date: sample.filing_date,
      termination_date: sample.termination_date,
      status: sample.status,
      source_priority: 'seed',
    });

    console.log(`[seed] Case: ${sample.case_name.slice(0, 50)} (id: ${caseId}, ${inserted ? 'inserted' : 'exists'})`);

    // 3. Source provenance
    await upsertCaseSource({
      case_id: caseId,
      source_name: 'seed',
      source_record_id: `seed-${externalKey}`,
      source_url: undefined,
      raw_payload: { seeded: true, seeded_at: new Date().toISOString() },
      fetched_at: new Date().toISOString(),
    });

    // 4. Parties
    if (sample.parties.length > 0) {
      await insertParties(
        caseId,
        sample.parties.map((p) => ({
          case_id: caseId,
          party_name: p.party_name,
          normalized_party_name: p.party_name.toLowerCase().trim(),
          role: p.role,
        }))
      );
    }

    // 5. Summary
    await upsertSummary({
      case_id: caseId,
      summary_type: 'overview',
      summary_text: sample.summary,
      model_name: 'seed-data',
      prompt_version: 'seed',
      confidence_notes: 'This is sample data for development purposes.',
      generated_at: new Date().toISOString(),
    });

    // 6. Tags
    if (sample.tags.length > 0) {
      await upsertTags(
        sample.tags.map((t) => ({
          case_id: caseId,
          tag: t.tag,
          tag_category: t.category as CaseTagRow['tag_category'],
          source: 'manual' as const,
          confidence: t.confidence,
        }))
      );
    }
  }

  console.log(`[seed] Seeded ${SAMPLE_COURTS.length} courts and ${SAMPLE_CASES.length} cases with summaries and tags.`);
}
