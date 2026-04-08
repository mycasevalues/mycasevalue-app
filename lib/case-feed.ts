/**
 * Case Feed Data Generator
 * Generates realistic federal court case activity for live feed
 * Uses real case type data, NOS codes, and federal districts
 */

import { SITS, OUTCOME_DATA, NOS_FALLBACK } from './data';

/**
 * Federal district court abbreviations (95 federal districts)
 */
export const DISTRICTS = [
  // First Circuit (1)
  'D. Maine', 'D.N.H.', 'D.Mass.', 'D.R.I.', 'D.P.R.',

  // Second Circuit (2)
  'D.Vt.', 'D.Conn.', 'N.D.N.Y.', 'S.D.N.Y.', 'E.D.N.Y.', 'W.D.N.Y.',

  // Third Circuit (3)
  'N.D.W.Va.', 'S.D.W.Va.', 'D.N.J.', 'E.D.Pa.', 'W.D.Pa.', 'D.Del.', 'M.D.Pa.',

  // Fourth Circuit (4)
  'E.D.Va.', 'W.D.Va.', 'D.Md.', 'D.W.Va.', 'E.D.N.C.', 'M.D.N.C.', 'W.D.N.C.', 'D.S.C.',

  // Fifth Circuit (5)
  'E.D.Tex.', 'W.D.Tex.', 'N.D.Tex.', 'S.D.Tex.', 'E.D.La.', 'M.D.La.', 'W.D.La.', 'N.D. Miss.',
  'S.D. Miss.',

  // Sixth Circuit (6)
  'E.D.Ky.', 'W.D.Ky.', 'N.D. Ohio', 'S.D. Ohio', 'E.D. Tenn.', 'M.D. Tenn.', 'W.D. Tenn.',
  'E.D. Mich.', 'W.D. Mich.',

  // Seventh Circuit (7)
  'N.D. Ill.', 'C.D. Ill.', 'S.D. Ill.', 'N.D. Ind.', 'S.D. Ind.', 'E.D. Wis.', 'W.D. Wis.',

  // Eighth Circuit (8)
  'D. Minn.', 'D. Iowa', 'N.D. Iowa', 'S.D. Iowa', 'E.D. Mo.', 'W.D. Mo.', 'D. Ark.', 'E.D. Ark.',
  'W.D. Ark.', 'D.N.D.', 'D.S.D.',

  // Ninth Circuit (9)
  'D. Alaska', 'D. Hawaii', 'D. Idaho', 'D. Mont.', 'D. Nev.', 'N.D. Cal.', 'E.D. Cal.', 'S.D. Cal.',
  'D. Oregon', 'E.D. Wash.', 'W.D. Wash.', 'D. Arizona', 'D. Utah', 'D. Wyoming',

  // Tenth Circuit (10)
  'D. Colorado', 'D. Kansas', 'D.N.M.', 'N.D. Okla.', 'E.D. Okla.', 'W.D. Okla.',

  // Eleventh Circuit (11)
  'N.D. Ga.', 'M.D. Ga.', 'S.D. Ga.', 'N.D. Fla.', 'M.D. Fla.', 'S.D. Fla.', 'N.D. Ala.',
  'M.D. Ala.', 'S.D. Ala.',

  // D.C. Circuit
  'D.D.C.',
];

/**
 * Realistic plaintiff/defendant name patterns
 */
const PLAINTIFF_PATTERNS = [
  'John {lastname}',
  'Jane {lastname}',
  'Michael {lastname}',
  '{lastname} v. {defendant}',
  '{firstname} {lastname}',
  'Estate of {firstname} {lastname}',
  '{lastname} et al.',
];

const DEFENDANT_PATTERNS = [
  '{company} LLC',
  '{company} Inc.',
  'County of {location}',
  'City of {location}',
  '{lastname} & Associates',
  '{company} Corp.',
  'State of {state}',
  'Department of {dept}',
];

const FIRST_NAMES = [
  'John', 'Mary', 'Robert', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda',
  'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah',
  'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty',
  'James', 'Margaret', 'Anthony', 'Sandra', 'Mark', 'Ashley', 'Donald', 'Kathy',
  'Steven', 'Donna', 'Paul', 'Carol', 'Andrew', 'Michelle', 'Joshua', 'Emily',
  'Kenneth', 'Melissa', 'Kevin', 'Deborah', 'Brian', 'Stephanie', 'Edward', 'Rebecca',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Young',
  'Alonso', 'Allen', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams',
  'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Parker', 'Evans', 'Edwards',
];

const COMPANY_NAMES = [
  'Amazon', 'Google', 'Microsoft', 'Apple', 'Meta', 'Tesla', 'Walmart', 'Target',
  'Starbucks', 'Best Buy', 'Bank of America', 'Wells Fargo', 'Goldman Sachs',
  'Morgan Stanley', 'Coca-Cola', 'Pepsi', 'Nestle', 'Pfizer', 'Johnson & Johnson',
  'AbbVie', 'Eli Lilly', 'Abbott', 'United Airlines', 'American Airlines', 'Delta',
  'Southwest', 'Comcast', 'AT&T', 'Verizon', 'Sprint', 'T-Mobile', 'HomeDepot',
  'Lowes', 'CVS', 'Walgreens', 'Dollar Tree', 'Five Below', 'IKEA', 'Nike', 'Adidas',
  'Gucci', 'Louis Vuitton', 'Hermes', 'Prada',
];

const LOCATIONS = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
  'Fort Worth', 'Columbus', 'Indianapolis', 'Charlotte', 'San Francisco', 'Seattle',
  'Denver', 'Boston', 'Miami', 'Atlanta', 'Nashville', 'Memphis', 'Detroit',
];

const DEPARTMENTS = [
  'Health and Human Services', 'Transportation', 'Veterans Affairs',
  'Education', 'Labor', 'Justice', 'Treasury', 'Defense', 'Interior', 'Commerce',
];

const STATES = [
  'California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois', 'Ohio',
  'Georgia', 'North Carolina', 'Michigan', 'Washington', 'Colorado', 'Virginia',
  'Massachusetts', 'Arizona', 'Tennessee', 'Indiana', 'Missouri', 'Maryland',
  'Wisconsin', 'Minnesota', 'Louisiana', 'Alabama', 'Kentucky', 'South Carolina',
];

/**
 * Case outcome type
 */
export interface FeedItem {
  id: string;
  caseType: string; // Case type label (e.g., "Employment Discrimination")
  nosCode: string; // NOS code (e.g., "442")
  district: string; // District (e.g., "S.D.N.Y.")
  state: string; // State abbreviation (e.g., "NY")
  outcome: 'won' | 'lost' | 'settled';
  filingDate: Date;
  closedDate: Date;
  amount?: number; // Settlement/award amount in thousands
  plaintiff: string;
  defendant: string;
  isSettlement: boolean;
  timestamp: Date;
}

/**
 * Generate a realistic case name with plaintiff and defendant
 */
function generateCaseName(): { plaintiff: string; defendant: string } {
  const plaintiff = PLAINTIFF_PATTERNS[Math.floor(Math.random() * PLAINTIFF_PATTERNS.length)]
    .replace('{firstname}', FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)])
    .replace('{lastname}', LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]);

  const defendantPattern = DEFENDANT_PATTERNS[Math.floor(Math.random() * DEFENDANT_PATTERNS.length)];
  const defendant = defendantPattern
    .replace('{company}', COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)])
    .replace('{location}', LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)])
    .replace('{state}', STATES[Math.floor(Math.random() * STATES.length)])
    .replace('{dept}', DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)]);

  return { plaintiff, defendant };
}

/**
 * Get a random case type from SITS data
 */
function getRandomCaseType(): { label: string; nos: string } {
  // Select random category from SITS
  const category = SITS[Math.floor(Math.random() * SITS.length)];
  // Select random case type from that category
  const option = category.opts[Math.floor(Math.random() * category.opts.length)];
  return { label: option.label, nos: option.nos };
}

/**
 * Get outcome weighted by actual case statistics
 */
function getWeightedOutcome(nosCode: string): {
  outcome: 'won' | 'lost' | 'settled';
  isSettlement: boolean;
} {
  const outcomeData = OUTCOME_DATA[nosCode] || OUTCOME_DATA[NOS_FALLBACK[nosCode]] || {
    trial_win: 10,
    trial_loss: 7,
    dismiss: 53,
    fav_set: 30,
    set_mo: 6,
  };

  // Calculate probabilities from outcome data
  const totalTrialOutcomes = outcomeData.trial_win + outcomeData.trial_loss;
  const settlementChance = outcomeData.fav_set || 30;
  const dismissChance = outcomeData.dismiss || 53;

  const rand = Math.random() * 100;

  // Weighted: settlements > dismissals > trial outcomes
  if (rand < settlementChance) {
    return { outcome: 'settled', isSettlement: true };
  } else if (rand < settlementChance + dismissChance) {
    // Treat dismissal as plaintiff loss for simplicity
    return { outcome: 'lost', isSettlement: false };
  } else {
    // Trial outcome
    const trialRand = Math.random();
    const winProbability = totalTrialOutcomes > 0
      ? outcomeData.trial_win / totalTrialOutcomes
      : 0.6;
    return { outcome: trialRand < winProbability ? 'won' : 'lost', isSettlement: false };
  }
}

/**
 * Generate settlement amount in realistic range for case type
 */
function generateSettlementAmount(nosCode: string): number {
  // Use outcome data settlement median if available
  const outcomeData = OUTCOME_DATA[nosCode] || OUTCOME_DATA[NOS_FALLBACK[nosCode]] || {};
  const baseAmount = outcomeData.set_mo || 50; // thousands

  // Add variance (±50%)
  const variance = (Math.random() - 0.5) * baseAmount;
  const amount = Math.max(10, baseAmount + variance);

  return Math.round(amount);
}

/**
 * Generate a single realistic feed item
 */
export function generateRealisticFeedItem(): FeedItem {
  const now = new Date();
  const caseType = getRandomCaseType();
  const { plaintiff, defendant } = generateCaseName();
  const district = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];

  // Extract state from district abbreviation (e.g., "S.D.N.Y." → "NY")
  const stateMatch = district.match(/([A-Z]{2})/);
  const state = stateMatch ? stateMatch[1] : 'CA';

  const { outcome, isSettlement } = getWeightedOutcome(caseType.nos);

  // Realistic filing dates (1-5 years ago)
  const daysAgo = Math.floor(Math.random() * (365 * 5));
  const filingDate = new Date(now);
  filingDate.setDate(filingDate.getDate() - daysAgo);

  // Closing date 30 days to 2 years after filing
  const closureDays = Math.floor(Math.random() * 730) + 30;
  const closedDate = new Date(filingDate);
  closedDate.setDate(closedDate.getDate() + closureDays);

  const amount = isSettlement ? generateSettlementAmount(caseType.nos) : undefined;

  return {
    id: `case-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    caseType: caseType.label,
    nosCode: caseType.nos,
    district,
    state,
    outcome,
    filingDate,
    closedDate,
    amount,
    plaintiff,
    defendant,
    isSettlement,
    timestamp: new Date(),
  };
}

/**
 * Generate a batch of feed items with staggered timestamps
 */
export function generateFeedBatch(count: number): FeedItem[] {
  const items: FeedItem[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const item = generateRealisticFeedItem();
    // Stagger timestamps backwards (most recent first)
    const minutesAgo = i * Math.floor(Math.random() * 8) + Math.floor(Math.random() * 3);
    item.timestamp = new Date(now - minutesAgo * 60000);
    items.push(item);
  }

  // Sort by timestamp descending (newest first)
  return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
