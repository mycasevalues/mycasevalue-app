/**
 * Mock judge data for MyCaseValue
 * 50+ judges with realistic statistics across major federal districts
 * Data is deterministically seeded from judge names for consistency
 */

import { Judge, JudgeStatistics, JudgeOpinion } from '@/lib/supabase-judges';

// Simple deterministic hash function for seeding
function stringToHash(str: string): number {
  let hash = 0;
  let i = 0;
  while (i < str.length) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
    i += 1;
  }
  return Math.abs(hash);
}

// Seeded random number generator
function seededRandom(seed: number, index: number = 0): number {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
}

const DISTRICTS = [
  { id: 'S.D.N.Y.', name: 'Southern District of New York', circuit: '2nd' },
  { id: 'C.D. Cal.', name: 'Central District of California', circuit: '9th' },
  { id: 'N.D. Ill.', name: 'Northern District of Illinois', circuit: '7th' },
  { id: 'S.D. Tex.', name: 'Southern District of Texas', circuit: '5th' },
  { id: 'E.D. Pa.', name: 'Eastern District of Pennsylvania', circuit: '3rd' },
  { id: 'N.D. Cal.', name: 'Northern District of California', circuit: '9th' },
  { id: 'D. Mass.', name: 'District of Massachusetts', circuit: '1st' },
  { id: 'C.D. Ill.', name: 'Central District of Illinois', circuit: '7th' },
  { id: 'N.D. Tex.', name: 'Northern District of Texas', circuit: '5th' },
  { id: 'M.D. Fla.', name: 'Middle District of Florida', circuit: '11th' },
];

const FIRST_NAMES = [
  'John', 'James', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Charles', 'Christopher',
  'Sarah', 'Elizabeth', 'Margaret', 'Karen', 'Susan', 'Jessica', 'Patricia', 'Jennifer', 'Linda', 'Barbara',
  'Thomas', 'Nancy', 'Lisa', 'Sandra', 'Ashley', 'Dorothy', 'Angela', 'Alice', 'Rebecca', 'Michelle',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
];

const APPOINTING_PRESIDENTS = [
  'Ronald Reagan', 'George H.W. Bush', 'Bill Clinton', 'George W. Bush', 'Barack Obama', 'Donald Trump', 'Joe Biden',
];

const PARTY_BY_PRESIDENT: { [key: string]: string } = {
  'Ronald Reagan': 'Republican',
  'George H.W. Bush': 'Republican',
  'Bill Clinton': 'Democrat',
  'George W. Bush': 'Republican',
  'Barack Obama': 'Democrat',
  'Donald Trump': 'Republican',
  'Joe Biden': 'Democrat',
};

const NOS_CODES = [210, 220, 230, 240, 250, 260, 290, 310, 320, 330, 340, 350, 360, 370, 375, 380, 385, 400];

const CASE_NAMES = [
  'Smith v. Jones Industrial Corp.',
  'Brown Estate v. Municipal Authority',
  'Garcia Manufacturing v. Workers Union',
  'Rodriguez v. Department of Labor',
  'Williams Healthcare v. Insurance Co.',
  'Johnson Construction v. County',
  'Martinez LLC v. Federal Agency',
  'Chen Technology v. Patent Office',
  'Thompson Securities v. Investors',
  'Anderson Environmental v. EPA',
  'Lee Real Estate v. City Council',
  'White Transportation v. DOT',
  'Harris Pharmaceuticals v. FDA',
  'Davis Finance v. Credit Bureau',
  'Jackson Entertainment v. Performers',
  'Miller Energy v. Environmental Board',
  'Taylor Communications v. FCC',
  'Moore Aviation v. FAA',
  'Wilson Retail v. Labor Relations',
  'Lewis Telecommunications v. Competitors',
];

const OPINION_SUMMARIES = [
  'Court held that plaintiff failed to establish sufficient causal nexus between alleged conduct and injury. Motion for summary judgment on causation granted.',
  'Affirmed district court judgment on liability but reversed damages calculation, remanding for recalculation consistent with this opinion.',
  'En banc reversal of panel decision on statutory interpretation. Majority found that plain language requires different reading than lower court applied.',
  'Dismissed on ripeness grounds, finding that disputed controversy not yet sufficiently mature for adjudication. Administrative remedies not exhausted.',
  'Found violation of plaintiff\'s constitutional rights under established precedent. Qualified immunity denied as law was clearly established at time of conduct.',
  'Granted preliminary injunction based on strong likelihood of success on merits, irreparable harm, and balance of equities favoring plaintiff.',
  'Denial of class certification affirmed. Court found Rule 23 requirements not satisfied regarding commonality and typicality of claims.',
  'Summary judgment for defendant upheld. Plaintiff failed to create genuine issue of material fact for jury on essential element.',
  'Patent claim construed narrowly per Phillips analysis. Accused device does not infringe any valid claim of the patent.',
  'Contract interpretation dispute resolved by reference to plain language and course of dealing between sophisticated commercial parties.',
];

function generateJudges(): Judge[] {
  const judges: Judge[] = [];
  const judgesPerDistrict = 5;

  let judgeId = 1;

  DISTRICTS.forEach((district, districtIdx) => {
    Array.from(new Set()).forEach((_, i) => {
      if (i < judgesPerDistrict) {
        const seed = stringToHash(district.id) + i;
        const firstNameIdx = Math.floor(seededRandom(seed, 0) * FIRST_NAMES.length);
        const lastNameIdx = Math.floor(seededRandom(seed, 1) * LAST_NAMES.length);
        const appointingIdx = Math.floor(seededRandom(seed, 2) * APPOINTING_PRESIDENTS.length);

        const firstName = FIRST_NAMES[firstNameIdx];
        const lastName = LAST_NAMES[lastNameIdx];
        const appointingPresident = APPOINTING_PRESIDENTS[appointingIdx];
        const party = PARTY_BY_PRESIDENT[appointingPresident];

        // Appointment date between 1985-2020
        const appointmentYear = 1985 + Math.floor(seededRandom(seed, 3) * 35);
        const appointmentMonth = Math.floor(seededRandom(seed, 4) * 12);
        const appointmentDay = Math.floor(seededRandom(seed, 5) * 28) + 1;

        judges.push({
          id: `judge_${judgeId}`,
          courtlistener_id: 100000 + judgeId,
          full_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          district_id: district.id,
          circuit: district.circuit,
          appointment_date: `${appointmentYear}-${String(appointmentMonth + 1).padStart(2, '0')}-${String(appointmentDay).padStart(2, '0')}`,
          appointing_president: appointingPresident,
          party_of_appointing_president: party,
          termination_date: null,
          is_active: true,
          position: 'United States District Judge',
          courtlistener_url: `https://www.courtlistener.com/judge/${100000 + judgeId}/`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        judgeId += 1;
      }
    });
  });

  return judges;
}

function generateStatistics(judges: Judge[]): JudgeStatistics[] {
  const statistics: JudgeStatistics[] = [];
  let statsId = 1;

  judges.forEach((judge) => {
    const seed = stringToHash(judge.id);
    // 3-8 NOS codes per judge
    const nosCount = 3 + Math.floor(seededRandom(seed, 100) * 6);

    Array.from(new Set()).forEach((_, i) => {
      if (i < nosCount) {
        const nosIdx = Math.floor(seededRandom(seed, 200 + i) * NOS_CODES.length);
        const nosCode = NOS_CODES[nosIdx];

        const totalCases = 50 + Math.floor(seededRandom(seed, 300 + i) * 200);
        const plaintiffWinPct = 15 + seededRandom(seed, 400 + i) * 60;
        const plaintiffWins = Math.floor(totalCases * (plaintiffWinPct / 100));
        const defendantWins = Math.floor(totalCases * ((100 - plaintiffWinPct) / 100) * 0.4);
        const settlements = Math.floor(totalCases * 0.35);
        const dismissals = totalCases - plaintiffWins - defendantWins - settlements;

        const avgDuration = 8 + seededRandom(seed, 500 + i) * 16;
        const sjDefense = Math.floor(totalCases * (15 + seededRandom(seed, 600 + i) * 25) / 100);
        const mtdGranted = Math.floor(totalCases * (10 + seededRandom(seed, 700 + i) * 30) / 100);

        statistics.push({
          id: statsId,
          judge_id: judge.id,
          nos_code: nosCode,
          total_cases: totalCases,
          plaintiff_wins: plaintiffWins,
          defendant_wins: defendantWins,
          settlements: settlements,
          dismissals: dismissals,
          summary_judgments_defense: sjDefense,
          motions_to_dismiss_granted: mtdGranted,
          avg_duration_months: parseFloat(avgDuration.toFixed(1)),
          plaintiff_win_rate: parseFloat(plaintiffWinPct.toFixed(1)),
          summary_judgment_rate_defense: parseFloat(((sjDefense / totalCases) * 100).toFixed(1)),
          dismissal_rate: parseFloat(((dismissals / totalCases) * 100).toFixed(1)),
          settlement_rate: parseFloat(((settlements / totalCases) * 100).toFixed(1)),
          last_calculated: new Date().toISOString(),
        });

        statsId += 1;
      }
    });
  });

  return statistics;
}

function generateOpinions(judges: Judge[]): JudgeOpinion[] {
  const opinions: JudgeOpinion[] = [];
  let opinionId = 1;

  judges.forEach((judge) => {
    const seed = stringToHash(judge.id);
    // 2-5 opinions per judge
    const opinionCount = 2 + Math.floor(seededRandom(seed, 800) * 4);

    Array.from(new Set()).forEach((_, i) => {
      if (i < opinionCount) {
        const caseNameIdx = Math.floor(seededRandom(seed, 900 + i) * CASE_NAMES.length);
        const summaryIdx = Math.floor(seededRandom(seed, 1000 + i) * OPINION_SUMMARIES.length);
        const nosIdx = Math.floor(seededRandom(seed, 1100 + i) * NOS_CODES.length);

        // Year between 2015-2023
        const opinionYear = 2015 + Math.floor(seededRandom(seed, 1200 + i) * 9);
        const citationCount = Math.floor(seededRandom(seed, 1300 + i) * 50);

        opinions.push({
          id: opinionId,
          judge_id: judge.id,
          courtlistener_opinion_id: 5000000 + opinionId,
          case_name: CASE_NAMES[caseNameIdx],
          court: judge.district_id,
          year: opinionYear,
          citation_count: citationCount,
          nos_code: NOS_CODES[nosIdx],
          ai_summary: OPINION_SUMMARIES[summaryIdx],
          ai_summary_generated_at: new Date().toISOString(),
          courtlistener_url: `https://www.courtlistener.com/opinion/5000000${opinionId}/`,
          created_at: new Date().toISOString(),
        });

        opinionId += 1;
      }
    });
  });

  return opinions;
}

// Generate all mock data
const mockJudges = generateJudges();
const mockStatistics = generateStatistics(mockJudges);
const mockOpinions = generateOpinions(mockJudges);

export { mockJudges, mockStatistics, mockOpinions };

// Export combined interface for convenience
export interface MockJudgesData {
  judges: Judge[];
  statistics: JudgeStatistics[];
  opinions: JudgeOpinion[];
}

export const mockJudgesData: MockJudgesData = {
  judges: mockJudges,
  statistics: mockStatistics,
  opinions: mockOpinions,
};
