export interface CaseNarrativeParams {
  category: string;
  subType: string;
  state: string;
  timing: string;
  amount: string;
  attorney: string;
  winRate: number;
  medianTimeline: string;
}

export interface CaseNarrative {
  headline: string;
  summary: string;
  strengthIndicator: 'strong' | 'moderate' | 'challenging';
  keyInsights: string[];
  timelineNarrative: string;
  comparisonNote: string;
  nextSteps: string[];
  disclaimer: string;
}

const categoryLabels: Record<string, string> = {
  work: 'Employment',
  personal: 'Personal Injury',
  contract: 'Contract Dispute',
  property: 'Property',
  consumer: 'Consumer Law',
  family: 'Family Law',
  ip: 'Intellectual Property',
  criminal: 'Criminal',
  civil_rights: 'Civil Rights',
  tax: 'Tax Law',
};

const strengthPhrases = {
  strong: [
    'shows favorable historical patterns',
    'aligns with stronger case outcomes',
    'indicates potentially favorable conditions',
    'demonstrates encouraging statistical trends',
  ],
  moderate: [
    'presents mixed historical outcomes',
    'shows variable results across similar cases',
    'indicates neutral to slightly favorable conditions',
    'demonstrates moderate statistical variance',
  ],
  challenging: [
    'shows challenging historical patterns',
    'aligns with more difficult case outcomes',
    'presents headwinds based on historical data',
    'demonstrates lower statistical success rates',
  ],
};

const outcomePhrasesStrong = [
  'In similar cases from across federal courts, outcomes have historically favored plaintiffs when circumstances align like yours.',
  'Historical data from comparable cases suggests favorable patterns that may apply to your situation.',
  'Federal court records show that cases with similar characteristics have frequently resulted in favorable outcomes.',
];

const outcomePhrasesModerateLow = [
  'Case outcomes in your category show significant variation, with success heavily dependent on case-specific facts.',
  'Historical data indicates mixed results for cases in this category, with outcomes varying considerably.',
  'Federal court records show no clear pattern of consistently favorable outcomes for this case type.',
];

function selectRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function determineStrengthIndicator(winRate: number): 'strong' | 'moderate' | 'challenging' {
  if (winRate >= 0.65) return 'strong';
  if (winRate >= 0.45) return 'moderate';
  return 'challenging';
}

function generateKeyInsights(
  params: CaseNarrativeParams,
  strength: 'strong' | 'moderate' | 'challenging',
): string[] {
  const { category, subType, state, winRate, medianTimeline, attorney, amount } = params;

  const insights: string[] = [];

  // Insight 1: Win rate context
  if (strength === 'strong') {
    insights.push(
      `Comparable ${subType.toLowerCase()} cases in federal court show a ${(winRate * 100).toFixed(0)}% plaintiff success rate, which is above national averages.`,
    );
  } else if (strength === 'moderate') {
    insights.push(
      `Historical data on ${subType.toLowerCase()} cases shows approximately ${(winRate * 100).toFixed(0)}% of similar cases reach favorable settlements or verdicts.`,
    );
  } else {
    insights.push(
      `${subType} cases in federal court show a plaintiff success rate around ${(winRate * 100).toFixed(0)}%, indicating that outcomes vary significantly based on specific circumstances.`,
    );
  }

  // Insight 2: Timeline context
  const timelineYears = parseInt(medianTimeline);
  if (timelineYears < 2) {
    insights.push(
      `Cases in ${state} have historically resolved relatively quickly—the median timeline is approximately ${medianTimeline}, suggesting faster movement through the court system.`,
    );
  } else if (timelineYears < 4) {
    insights.push(
      `Based on historical data, ${category.toLowerCase()} cases in ${state} typically move through the system within ${medianTimeline}, following standard discovery and motion timelines.`,
    );
  } else {
    insights.push(
      `Cases in this category often require substantial time investment. Historical data shows the median timeline in ${state} is around ${medianTimeline}, reflecting the complexity of ${subType.toLowerCase()} litigation.`,
    );
  }

  // Insight 3: Attorney representation impact
  const attorneyContext =
    attorney.toLowerCase() === 'yes'
      ? `Having legal representation, especially in ${subType.toLowerCase()} matters, historically correlates with more favorable settlement terms and trial outcomes.`
      : `Many ${subType.toLowerCase()} cases proceed without attorney representation, though complex litigation may benefit from legal guidance as the case progresses.`;
  insights.push(attorneyContext);

  // Insight 4: Damage amount context
  const amountNum = parseInt(amount.replace(/[^0-9]/g, ''));
  if (amountNum > 500000) {
    insights.push(
      `Cases involving claims above $500,000 typically receive heightened scrutiny and require more substantial evidence, but historical data shows they also command greater settlement leverage.`,
    );
  } else if (amountNum > 100000) {
    insights.push(
      `Your damage range falls within the mid-to-upper tier for ${category.toLowerCase()} claims, where historical outcomes show reasonable potential for meaningful resolution.`,
    );
  } else {
    insights.push(
      `Smaller damage claims often resolve more quickly, though with potentially less leverage in settlement negotiations compared to larger cases.`,
    );
  }

  return insights.slice(0, 4);
}

function generateTimelineNarrative(params: CaseNarrativeParams): string {
  const { category, subType, state, medianTimeline } = params;
  const categoryLabel = categoryLabels[category] || category;
  const timelineYears = parseInt(medianTimeline);

  const templates = [
    `Based on ${timelineYears}-year historical data from federal courts across ${state}, ${subType.toLowerCase()} cases follow a predictable pattern. Initial pleadings and discovery typically consume the first 12-18 months, followed by motion practice and potential settlement discussions. Cases that proceed to trial usually take an additional 6-12 months. The median timeline of approximately ${medianTimeline} reflects the full arc from filing to resolution across both settled and litigated cases.`,

    `Historical records show that ${subType.toLowerCase()} litigation in ${state} federal courts typically progresses through distinct phases. Early settlement discussions occur in approximately 40-60% of cases, often shortening the overall timeline significantly. For cases proceeding through full discovery and trial, the median duration of ${medianTimeline} is consistent with standard federal civil procedure timelines. Your specific timeline may vary based on case complexity, judicial assignment, and settlement readiness.`,

    `The median ${medianTimeline} timeline for ${categoryLabel.toLowerCase()} cases in ${state} represents cases across the full settlement and litigation spectrum. Cases resolved through early negotiation may conclude in 12-24 months, while fully litigated matters frequently require 4+ years. This historical data suggests that understanding the court's case management practices and maintaining settlement readiness throughout the process can significantly impact your case timeline.`,
  ];

  return selectRandom(templates);
}

function generateComparisonNote(
  params: CaseNarrativeParams,
  strength: 'strong' | 'moderate' | 'challenging',
): string {
  const { state, winRate } = params;
  const nationalAverage = 0.52; // Approximate national average for civil litigation
  const statePerformance = winRate > nationalAverage ? 'above' : 'slightly below';

  if (strength === 'strong') {
    return `${state}'s historical plaintiff success rate of ${(winRate * 100).toFixed(0)}% is notably above the national average of approximately 52%, suggesting that jurisdiction may provide favorable conditions for cases similar to yours.`;
  } else if (strength === 'moderate') {
    return `${state}'s plaintiff success rate of ${(winRate * 100).toFixed(0)}% is ${statePerformance} the national average of approximately 52%, indicating outcomes in your jurisdiction are broadly representative of national patterns.`;
  } else {
    return `${state} shows a plaintiff success rate of ${(winRate * 100).toFixed(0)}%, which is below national averages. This suggests that cases in this category face particular headwinds in this jurisdiction and should be carefully evaluated against jurisdiction-specific factors.`;
  }
}

function generateNextSteps(params: CaseNarrativeParams): string[] {
  const { subType, attorney, winRate } = params;
  const hasAttorney = attorney.toLowerCase() === 'yes';

  const steps: string[] = [];

  if (!hasAttorney && winRate < 0.6) {
    steps.push(
      'Consult with a qualified attorney specializing in this case type to assess case viability and evaluate your specific facts against historical patterns.',
    );
  }

  steps.push(
    `Research local federal court rules and recent decisions in ${subType.toLowerCase()} cases to understand how your specific jurisdiction applies precedent.`,
  );

  if (winRate >= 0.6) {
    steps.push(
      `Strengthen your documentary evidence and witness testimony to align with the positive historical patterns typical in successful ${subType.toLowerCase()} cases.`,
    );
  } else {
    steps.push(
      `Identify distinguishing factors in your case that may overcome the historical headwinds indicated by lower success rates in similar matters.`,
    );
  }

  steps.push(
    'Evaluate settlement opportunities carefully, comparing any offers against the historical outcomes and median resolution values for comparable cases.',
  );

  steps.push(
    'Maintain detailed records of all communications, evidence, and damages documentation to support your case throughout the litigation timeline.',
  );

  return steps;
}

export function generateCaseNarrative(params: CaseNarrativeParams): CaseNarrative {
  const strength = determineStrengthIndicator(params.winRate);
  const categoryLabel = categoryLabels[params.category] || params.category;

  const strengthPhrase = selectRandom(strengthPhrases[strength]);
  const outcomePhrase =
    strength === 'strong'
      ? selectRandom(outcomePhrasesStrong)
      : selectRandom(outcomePhrasesModerateLow);

  const headline = `Your ${params.subType} Research — ${params.state}`;

  const summary =
    strength === 'strong'
      ? `Based on 50+ years of federal court data, ${params.subType.toLowerCase()} cases similar to yours show encouraging historical patterns. The data indicates a ${(params.winRate * 100).toFixed(0)}% plaintiff success rate in comparable situations, with median case resolution around ${params.medianTimeline}. While each case is unique and historical data cannot predict your specific outcome, these patterns suggest you should pursue this matter thoughtfully.`
      : strength === 'moderate'
        ? `Historical data on ${params.subType.toLowerCase()} cases shows mixed results. Comparable cases resolve at approximately ${(params.winRate * 100).toFixed(0)}% favorable rate to plaintiffs, with significant variation based on case-specific facts. The median timeline in your jurisdiction is around ${params.medianTimeline}. Success in cases like yours depends heavily on unique circumstances and the strength of evidence.`
        : `Cases in the ${params.subType.toLowerCase()} category have historically faced challenging outcomes in federal court, with approximately ${(params.winRate * 100).toFixed(0)}% favorable resolution rate. This suggests that similar cases require particularly strong evidence and careful case development. The median timeline of ${params.medianTimeline} remains consistent, though costs may be significant relative to recovery potential.`;

  return {
    headline,
    summary,
    strengthIndicator: strength,
    keyInsights: generateKeyInsights(params, strength),
    timelineNarrative: generateTimelineNarrative(params),
    comparisonNote: generateComparisonNote(params, strength),
    nextSteps: generateNextSteps(params),
    disclaimer: `IMPORTANT DISCLAIMER: This narrative is generated from historical federal court data and statistical analysis only. It is not legal advice and cannot predict the outcome of your specific case. Historical patterns do not guarantee future results. Your case outcome depends on unique facts, evidence, jurisdiction-specific law, judge assignment, and many other variables. Before taking any action, consult with a qualified attorney licensed to practice in your jurisdiction who can evaluate your specific situation. Do not rely on this data-driven narrative as a substitute for professional legal counsel. Federal court litigation involves significant risks and costs that should be carefully evaluated with competent legal representation.`,
  };
}
