// AI Case Type Matcher
// Uses keyword matching to map user descriptions to NOS codes

const KEYWORD_MAP: Record<string, { nos: string; label: string; category: string }> = {
  // Employment / Workplace (NOS 442, 710, 445, 190)
  'wrongful termination': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'wrongful dismissal': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'fired': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'fired without cause': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'terminated': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'laid off': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'let go': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'dismissed': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'retaliation': { nos: '442', label: 'Retaliation', category: 'work' },
  'retaliated': { nos: '442', label: 'Retaliation', category: 'work' },
  'sexual harassment': { nos: '442', label: 'Sexual harassment', category: 'work' },
  'harassment': { nos: '442', label: 'Hostile work environment', category: 'work' },
  'hostile work environment': { nos: '442', label: 'Hostile work environment', category: 'work' },
  'discrimination': { nos: '442', label: 'Employment discrimination', category: 'work' },
  'discriminated': { nos: '442', label: 'Employment discrimination', category: 'work' },
  'race discrimination': { nos: '442', label: 'Race discrimination', category: 'work' },
  'racial discrimination': { nos: '442', label: 'Race discrimination', category: 'work' },
  'gender discrimination': { nos: '442', label: 'Employment discrimination', category: 'work' },
  'age discrimination': { nos: '442', label: 'Age discrimination (ADEA)', category: 'work' },
  'pregnancy discrimination': { nos: '442', label: 'Pregnancy discrimination', category: 'work' },
  'disability discrimination': { nos: '445', label: 'Disability discrimination (ADA)', category: 'work' },
  'ada': { nos: '445', label: 'Disability discrimination (ADA)', category: 'work' },
  'accommodation': { nos: '445', label: 'Disability discrimination (ADA)', category: 'work' },
  'unpaid wages': { nos: '710', label: 'Unpaid wages / overtime', category: 'work' },
  'wage theft': { nos: '710', label: 'Wage theft', category: 'work' },
  'overtime': { nos: '710', label: 'Unpaid wages / overtime', category: 'work' },
  'minimum wage': { nos: '710', label: 'Unpaid wages / overtime', category: 'work' },
  'unpaid salary': { nos: '710', label: 'Unpaid wages / overtime', category: 'work' },
  'not paid': { nos: '710', label: 'Unpaid wages / overtime', category: 'work' },
  'whistleblower': { nos: '442', label: 'Whistleblower retaliation', category: 'work' },
  'fmla': { nos: '710', label: 'Family / medical leave (FMLA)', category: 'work' },
  'family medical leave': { nos: '710', label: 'Family / medical leave (FMLA)', category: 'work' },
  'workers compensation': { nos: '710', label: 'Workers compensation retaliation', category: 'work' },
  'workers comp': { nos: '710', label: 'Workers compensation retaliation', category: 'work' },
  'non-compete': { nos: '190', label: 'Non-compete violation', category: 'work' },
  'workplace safety': { nos: '710', label: 'Workplace safety (OSHA)', category: 'work' },
  'osha': { nos: '710', label: 'Workplace safety (OSHA)', category: 'work' },

  // Injury / Accidents (NOS 350, 360, 362, 365, 370)
  'car accident': { nos: '350', label: 'Vehicle / car accident', category: 'injury' },
  'vehicle accident': { nos: '350', label: 'Vehicle / car accident', category: 'injury' },
  'auto accident': { nos: '350', label: 'Vehicle / car accident', category: 'injury' },
  'car crash': { nos: '350', label: 'Vehicle / car accident', category: 'injury' },
  'hit and run': { nos: '350', label: 'Vehicle / car accident', category: 'injury' },
  'traffic accident': { nos: '350', label: 'Vehicle / car accident', category: 'injury' },
  'truck accident': { nos: '350', label: 'Truck / commercial vehicle accident', category: 'injury' },
  'motorcycle accident': { nos: '350', label: 'Motorcycle accident', category: 'injury' },
  'bike accident': { nos: '350', label: 'Motorcycle accident', category: 'injury' },
  'slip and fall': { nos: '360', label: 'Slip and fall', category: 'injury' },
  'slip fall': { nos: '360', label: 'Slip and fall', category: 'injury' },
  'slipped': { nos: '360', label: 'Slip and fall', category: 'injury' },
  'fell': { nos: '360', label: 'Slip and fall', category: 'injury' },
  'premises liability': { nos: '360', label: 'Premises liability', category: 'injury' },
  'dog bite': { nos: '360', label: 'Dog bite / animal attack', category: 'injury' },
  'animal attack': { nos: '360', label: 'Dog bite / animal attack', category: 'injury' },
  'construction accident': { nos: '360', label: 'Construction accident', category: 'injury' },
  'assault': { nos: '360', label: 'Assault / battery', category: 'injury' },
  'battery': { nos: '360', label: 'Assault / battery', category: 'injury' },
  'beaten': { nos: '360', label: 'Assault / battery', category: 'injury' },
  'mold': { nos: '360', label: 'Mold / toxic conditions', category: 'injury' },
  'medical malpractice': { nos: '362', label: 'Medical malpractice', category: 'injury' },
  'malpractice': { nos: '362', label: 'Medical malpractice', category: 'injury' },
  'surgical error': { nos: '362', label: 'Surgical error', category: 'injury' },
  'surgery error': { nos: '362', label: 'Surgical error', category: 'injury' },
  'misdiagnosis': { nos: '362', label: 'Misdiagnosis', category: 'injury' },
  'misdiagnosed': { nos: '362', label: 'Misdiagnosis', category: 'injury' },
  'nursing home': { nos: '362', label: 'Nursing home neglect / abuse', category: 'injury' },
  'nursing home abuse': { nos: '362', label: 'Nursing home neglect / abuse', category: 'injury' },
  'nursing home neglect': { nos: '362', label: 'Nursing home neglect / abuse', category: 'injury' },
  'birth injury': { nos: '362', label: 'Birth injury', category: 'injury' },
  'defective product': { nos: '365', label: 'Defective product', category: 'injury' },
  'defective drug': { nos: '365', label: 'Defective drug / medication', category: 'injury' },
  'medication': { nos: '365', label: 'Defective drug / medication', category: 'injury' },
  'drug side effects': { nos: '365', label: 'Defective drug / medication', category: 'injury' },
  'medical device': { nos: '365', label: 'Defective medical device', category: 'injury' },
  'toxic exposure': { nos: '365', label: 'Toxic exposure / environmental', category: 'injury' },
  'environmental': { nos: '365', label: 'Toxic exposure / environmental', category: 'injury' },
  'wrongful death': { nos: '370', label: 'Wrongful death', category: 'injury' },

  // Consumer (NOS 870, 370, 440, 190)
  'debt collector': { nos: '870', label: 'Debt collector harassment (FDCPA)', category: 'consumer' },
  'debt collection': { nos: '870', label: 'Debt collector harassment (FDCPA)', category: 'consumer' },
  'harassing calls': { nos: '870', label: 'Debt collector harassment (FDCPA)', category: 'consumer' },
  'fdcpa': { nos: '870', label: 'Debt collector harassment (FDCPA)', category: 'consumer' },
  'identity theft': { nos: '370', label: 'Identity theft / fraud', category: 'consumer' },
  'identity stolen': { nos: '370', label: 'Identity theft / fraud', category: 'consumer' },
  'stolen identity': { nos: '370', label: 'Identity theft / fraud', category: 'consumer' },
  'data breach': { nos: '370', label: 'Data breach / privacy violation', category: 'consumer' },
  'privacy violation': { nos: '370', label: 'Data breach / privacy violation', category: 'consumer' },
  'robocall': { nos: '440', label: 'Robocalls / spam texts (TCPA)', category: 'consumer' },
  'spam text': { nos: '440', label: 'Robocalls / spam texts (TCPA)', category: 'consumer' },
  'tcpa': { nos: '440', label: 'Robocalls / spam texts (TCPA)', category: 'consumer' },
  'credit reporting': { nos: '370', label: 'Credit reporting error', category: 'consumer' },
  'credit error': { nos: '370', label: 'Credit reporting error', category: 'consumer' },
  'lemon law': { nos: '365', label: 'Lemon law / defective vehicle', category: 'consumer' },
  'predatory lending': { nos: '370', label: 'Predatory lending', category: 'consumer' },
  'payday loan': { nos: '370', label: 'Predatory lending', category: 'consumer' },
  'warranty breach': { nos: '190', label: 'Warranty breach', category: 'consumer' },
  'false advertising': { nos: '370', label: 'False advertising / deceptive practices', category: 'consumer' },
  'deceptive practices': { nos: '370', label: 'False advertising / deceptive practices', category: 'consumer' },
  'fraud': { nos: '370', label: 'Fraud / scam', category: 'consumer' },
  'scam': { nos: '370', label: 'Fraud / scam', category: 'consumer' },
  'scammed': { nos: '370', label: 'Fraud / scam', category: 'consumer' },

  // Civil Rights (NOS 440, 441, 442, 443, 550)
  'police excessive force': { nos: '440', label: 'Police excessive force', category: 'rights' },
  'police brutality': { nos: '440', label: 'Police excessive force', category: 'rights' },
  'police misconduct': { nos: '440', label: 'Police excessive force', category: 'rights' },
  'racial profiling': { nos: '440', label: 'Racial profiling', category: 'rights' },
  'wrongful arrest': { nos: '440', label: 'Wrongful arrest / false imprisonment', category: 'rights' },
  'false imprisonment': { nos: '440', label: 'Wrongful arrest / false imprisonment', category: 'rights' },
  'housing discrimination': { nos: '443', label: 'Housing discrimination', category: 'rights' },
  'voting rights': { nos: '441', label: 'Voting rights violation', category: 'rights' },
  'free speech': { nos: '440', label: 'First Amendment / free speech', category: 'rights' },
  'first amendment': { nos: '440', label: 'First Amendment / free speech', category: 'rights' },
  'lgbtq': { nos: '442', label: 'LGBTQ+ discrimination', category: 'rights' },
  'prison conditions': { nos: '550', label: 'Prison conditions (Section 1983)', category: 'rights' },
  'government misconduct': { nos: '440', label: 'Government misconduct / abuse of power', category: 'rights' },

  // Money & Business (NOS 190, 110, 370, 850, 820, 830, 840)
  'breach of contract': { nos: '190', label: 'Breach of contract', category: 'money' },
  'contract dispute': { nos: '190', label: 'Breach of contract', category: 'money' },
  'business dispute': { nos: '190', label: 'Business dispute', category: 'money' },
  'partnership dispute': { nos: '190', label: 'Partnership / LLC dispute', category: 'money' },
  'llc dispute': { nos: '190', label: 'Partnership / LLC dispute', category: 'money' },
  'fiduciary duty': { nos: '190', label: 'Breach of fiduciary duty', category: 'money' },
  'unjust enrichment': { nos: '190', label: 'Unjust enrichment', category: 'money' },
  'insurance bad faith': { nos: '110', label: 'Insurance bad faith / denial', category: 'money' },
  'insurance claim denied': { nos: '110', label: 'Insurance bad faith / denial', category: 'money' },
  'insurance denial': { nos: '110', label: 'Insurance bad faith / denial', category: 'money' },
  'securities fraud': { nos: '850', label: 'Securities / investment fraud', category: 'money' },
  'investment fraud': { nos: '850', label: 'Securities / investment fraud', category: 'money' },
  'copyright infringement': { nos: '820', label: 'Copyright infringement', category: 'money' },
  'copyright': { nos: '820', label: 'Copyright infringement', category: 'money' },
  'patent': { nos: '830', label: 'Intellectual property theft', category: 'money' },
  'invention': { nos: '830', label: 'Intellectual property theft', category: 'money' },
  'trademark infringement': { nos: '840', label: 'Trademark infringement', category: 'money' },
  'trade secret': { nos: '840', label: 'Trade secret misappropriation', category: 'money' },
  'intellectual property': { nos: '830', label: 'Intellectual property theft', category: 'money' },

  // Housing & Property (NOS 220, 230, 385, 900, 195, 190)
  'security deposit': { nos: '230', label: 'Security deposit dispute', category: 'housing' },
  'wrongful eviction': { nos: '230', label: 'Wrongful eviction', category: 'housing' },
  'eviction': { nos: '230', label: 'Wrongful eviction', category: 'housing' },
  'landlord': { nos: '230', label: 'Landlord negligence / habitability', category: 'housing' },
  'landlord dispute': { nos: '230', label: 'Landlord negligence / habitability', category: 'housing' },
  'habitability': { nos: '230', label: 'Landlord negligence / habitability', category: 'housing' },
  'foreclosure': { nos: '220', label: 'Foreclosure', category: 'housing' },
  'property damage': { nos: '385', label: 'Property damage', category: 'housing' },
  'neighbor dispute': { nos: '385', label: 'Neighbor dispute / nuisance', category: 'housing' },
  'neighbor': { nos: '385', label: 'Neighbor dispute / nuisance', category: 'housing' },
  'nuisance': { nos: '385', label: 'Neighbor dispute / nuisance', category: 'housing' },
  'hoa dispute': { nos: '190', label: 'HOA dispute', category: 'housing' },
  'construction defect': { nos: '195', label: 'Construction defect', category: 'housing' },
  'contractor dispute': { nos: '190', label: 'Contractor dispute', category: 'housing' },
  'eminent domain': { nos: '900', label: 'Eminent domain / condemnation', category: 'housing' },

  // Healthcare & Benefits (NOS 110, 863, 791)
  'health insurance denied': { nos: '110', label: 'Health insurance denied', category: 'medical' },
  'insurance denied': { nos: '110', label: 'Health insurance denied', category: 'medical' },
  'disability benefits': { nos: '863', label: 'Disability benefits denied (SSDI/SSI)', category: 'medical' },
  'ssdi': { nos: '863', label: 'Disability benefits denied (SSDI/SSI)', category: 'medical' },
  'ssi': { nos: '863', label: 'Disability benefits denied (SSDI/SSI)', category: 'medical' },
  'erisa': { nos: '791', label: 'ERISA / employee benefits denied', category: 'medical' },
  'veterans benefits': { nos: '863', label: 'Veterans benefits denied', category: 'medical' },
  'social security': { nos: '863', label: 'Social Security dispute', category: 'medical' },
  'medicare': { nos: '863', label: 'Medicare / Medicaid dispute', category: 'medical' },
  'medicaid': { nos: '863', label: 'Medicare / Medicaid dispute', category: 'medical' },

  // Spanish translations
  'despido': { nos: '442', label: 'Wrongful termination', category: 'work' },
  'discriminación': { nos: '442', label: 'Employment discrimination', category: 'work' },
  'acoso': { nos: '442', label: 'Sexual harassment', category: 'work' },
  'salarios impagos': { nos: '710', label: 'Unpaid wages / overtime', category: 'work' },
  'horas extras': { nos: '710', label: 'Unpaid wages / overtime', category: 'work' },
  'robo de salarios': { nos: '710', label: 'Wage theft', category: 'work' },
  'represalia': { nos: '442', label: 'Retaliation', category: 'work' },
  'accidente de auto': { nos: '350', label: 'Vehicle / car accident', category: 'injury' },
  'accidente': { nos: '360', label: 'Slip and fall', category: 'injury' },
  'caída': { nos: '360', label: 'Slip and fall', category: 'injury' },
  'negligencia médica': { nos: '362', label: 'Medical malpractice', category: 'injury' },
  'error quirúrgico': { nos: '362', label: 'Surgical error', category: 'injury' },
  'diagnóstico incorrecto': { nos: '362', label: 'Misdiagnosis', category: 'injury' },
  'producto defectuoso': { nos: '365', label: 'Defective product', category: 'injury' },
  'medicamento defectuoso': { nos: '365', label: 'Defective drug / medication', category: 'injury' },
  'acoso de deudas': { nos: '870', label: 'Debt collector harassment (FDCPA)', category: 'consumer' },
  'llamadas de acoso': { nos: '870', label: 'Debt collector harassment (FDCPA)', category: 'consumer' },
  'robo de identidad': { nos: '370', label: 'Identity theft / fraud', category: 'consumer' },
  'filtración de datos': { nos: '370', label: 'Data breach / privacy violation', category: 'consumer' },
  'fraude': { nos: '370', label: 'Fraud / scam', category: 'consumer' },
  'estafa': { nos: '370', label: 'Fraud / scam', category: 'consumer' },
  'violencia policial': { nos: '440', label: 'Police excessive force', category: 'rights' },
  'arresto injustificado': { nos: '440', label: 'Wrongful arrest / false imprisonment', category: 'rights' },
  'discriminación de vivienda': { nos: '443', label: 'Housing discrimination', category: 'rights' },
  'incumplimiento de contrato': { nos: '190', label: 'Breach of contract', category: 'money' },
  'disputa comercial': { nos: '190', label: 'Business dispute', category: 'money' },
  'depósito de seguridad': { nos: '230', label: 'Security deposit dispute', category: 'housing' },
  'desalojo': { nos: '230', label: 'Wrongful eviction', category: 'housing' },
  'disputa con el propietario': { nos: '230', label: 'Landlord negligence / habitability', category: 'housing' },
  'ejecución hipotecaria': { nos: '220', label: 'Foreclosure', category: 'housing' },
};

export interface CaseMatch {
  nos: string;
  label: string;
  category: string;
  confidence: number;
}

/**
 * Matches a user-provided case description to the most likely NOS code
 * Uses keyword matching with confidence scoring
 */
export function matchCaseType(description: string): CaseMatch | null {
  if (!description || description.trim().length === 0) {
    return null;
  }

  const lowerDesc = description.toLowerCase().trim();

  // Score each keyword in the KEYWORD_MAP
  const scores: Record<string, { nos: string; label: string; category: string; score: number }> = {};

  for (const [keyword, data] of Object.entries(KEYWORD_MAP)) {
    if (lowerDesc.includes(keyword)) {
      const key = `${data.nos}-${data.label}`;
      if (!scores[key]) {
        scores[key] = { ...data, score: 0 };
      }
      // Score based on keyword length (longer keywords = more specific = higher confidence)
      // Also boost score for exact multi-word matches
      const wordCount = keyword.split(/\s+/).length;
      scores[key].score += wordCount * (keyword.split(' ').length > 1 ? 1.5 : 1);
    }
  }

  // Find the best match
  let bestMatch: { nos: string; label: string; category: string; score: number } | null = null;
  for (const match of Object.values(scores)) {
    if (!bestMatch || match.score > bestMatch.score) {
      bestMatch = match;
    }
  }

  if (!bestMatch) {
    return null;
  }

  // Convert score to confidence (0-1)
  // Score is roughly proportional to keyword weight, normalize it
  // Assume max reasonable score is around 3-5 for a very strong match
  let confidence = Math.min(1, (bestMatch.score / 5) * 0.8 + 0.2);

  // Apply a slight boost if multiple keywords matched (indication of clarity)
  const matchCount = Object.values(scores).filter(s => s.nos === bestMatch!.nos).length;
  if (matchCount > 1) {
    confidence = Math.min(1, confidence + 0.15);
  }

  return {
    nos: bestMatch.nos,
    label: bestMatch.label,
    category: bestMatch.category,
    confidence: Math.round(confidence * 100) / 100,
  };
}
