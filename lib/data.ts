// MyCaseValue Data Layer
// All data from public federal court records (FJC IDB + CourtListener)

import { REAL_DATA, TOTAL_REAL_CASES, REAL_OUTCOME_DATA } from './realdata';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export const SITS = [
  { id: "employment-workplace", label: "Employment & Workplace", sub: "Fired, harassed, underpaid, discrimination", color: "#4338CA", icon: "briefcase", q: "What happened at work?", dm: "mid", opts: [
    { label: "Wrongful termination", nos: "442", d: "wrongful termination" },
    { label: "Employment discrimination", nos: "442", d: "employment discrimination" },
    { label: "Sexual harassment", nos: "442", d: "sexual harassment" },
    { label: "Unpaid wages / overtime", nos: "710", d: "unpaid wages" },
    { label: "Retaliation", nos: "442", d: "retaliation" },
    { label: "Disability discrimination (ADA)", nos: "445", d: "disability discrimination" },
    { label: "Age discrimination (ADEA)", nos: "442", d: "age discrimination" },
    { label: "Race discrimination", nos: "442", d: "race discrimination" },
    { label: "Family / medical leave (FMLA)", nos: "710", d: "FMLA violation" },
    { label: "Whistleblower retaliation", nos: "442", d: "whistleblower retaliation" },
    { label: "Hostile work environment", nos: "442", d: "hostile work environment" },
    { label: "Wage theft", nos: "710", d: "wage theft" },
    { label: "Wrongful demotion", nos: "442", d: "wrongful demotion" },
    { label: "Contract — Other (NOS 190)", nos: "190", d: "non-compete dispute" },
    { label: "Workplace safety (OSHA)", nos: "710", d: "workplace safety violation" },
    { label: "Pregnancy discrimination", nos: "442", d: "pregnancy discrimination" },
    { label: "Religious discrimination", nos: "442", d: "religious discrimination" },
    { label: "Workers' compensation retaliation", nos: "710", d: "workers comp retaliation" },
  ]},
  { id: "personal-injury", label: "Personal Injury", sub: "Accident, medical, product, wrongful death", color: "#8B5CF6", icon: "heart", q: "How were you hurt?", dm: "large", opts: [
    { label: "Vehicle / car accident", nos: "350", d: "vehicle accident" },
    { label: "Truck / commercial vehicle accident", nos: "350", d: "truck accident" },
    { label: "Motorcycle accident", nos: "350", d: "motorcycle accident" },
    { label: "Medical malpractice", nos: "362", d: "medical malpractice" },
    { label: "Surgical error", nos: "362", d: "surgical error" },
    { label: "Misdiagnosis", nos: "362", d: "misdiagnosis" },
    { label: "Defective product", nos: "365", d: "product liability" },
    { label: "Defective drug / medication", nos: "365", d: "defective drug" },
    { label: "Defective medical device", nos: "365", d: "defective medical device" },
    { label: "Personal Injury — Other (NOS 360)", nos: "360", d: "slip and fall" },
    { label: "Dog bite / animal attack", nos: "360", d: "animal attack" },
    { label: "Wrongful death", nos: "370", d: "wrongful death" },
    { label: "Nursing home neglect / abuse", nos: "362", d: "nursing home abuse" },
    { label: "Premises liability", nos: "360", d: "premises liability" },
    { label: "Construction accident", nos: "360", d: "construction accident" },
    { label: "Assault / battery", nos: "360", d: "assault and battery" },
    { label: "Toxic exposure / environmental", nos: "365", d: "toxic exposure" },
    { label: "Birth injury", nos: "362", d: "birth injury" },
  ]},
  { id: "consumer-protection", label: "Consumer Protection", sub: "Debt, fraud, scam, data breach, robocalls", color: "#2563EB", icon: "shield", q: "What happened?", dm: "mid", opts: [
    { label: "Debt collector harassment (FDCPA)", nos: "870", d: "debt collection" },
    { label: "Identity theft / fraud", nos: "370", d: "identity theft" },
    { label: "Data breach / privacy violation", nos: "370", d: "data breach" },
    { label: "Civil Rights — Other", nos: "440", d: "civil rights other" },
    { label: "Credit reporting error", nos: "370", d: "credit reporting error" },
    { label: "Lemon law / defective vehicle", nos: "365", d: "lemon law" },
    { label: "Predatory lending", nos: "370", d: "predatory lending" },
    { label: "Warranty breach", nos: "190", d: "warranty breach" },
    { label: "False advertising / deceptive practices", nos: "370", d: "deceptive practices" },
    { label: "Student loan dispute", nos: "370", d: "student loan dispute" },
    { label: "Unfair business practices", nos: "370", d: "unfair business practices" },
  ]},
  { id: "civil-rights", label: "Civil Rights", sub: "Police, discrimination, voting, free speech", color: "#8B5CF6", icon: "scale", q: "What happened?", dm: "large", opts: [
    { label: "Police excessive force", nos: "440", d: "police misconduct" },
    { label: "Racial discrimination", nos: "440", d: "racial discrimination" },
    { label: "Housing discrimination", nos: "443", d: "housing discrimination" },
    { label: "Wrongful arrest / false imprisonment", nos: "440", d: "wrongful arrest" },
    { label: "Racial profiling", nos: "440", d: "racial profiling" },
    { label: "First Amendment / free speech", nos: "440", d: "free speech violation" },
    { label: "Voting rights violation", nos: "441", d: "voting rights" },
    { label: "Prison conditions (Section 1983)", nos: "550", d: "prison conditions" },
    { label: "Education discrimination (Title IX)", nos: "442", d: "education discrimination" },
    { label: "LGBTQ+ discrimination", nos: "442", d: "LGBTQ discrimination" },
    { label: "Government misconduct / abuse of power", nos: "440", d: "government misconduct" },
  ]},
  { id: "money-business", label: "Money & Business", sub: "Contracts, insurance, fraud, partnership", color: "#D97706", icon: "dollar", q: "What is the issue?", dm: "mid", opts: [
    { label: "Insurance bad faith / denial", nos: "110", d: "insurance bad faith" },
    { label: "Breach of contract", nos: "190", d: "breach of contract" },
    { label: "Fraud / scam", nos: "370", d: "fraud" },
    { label: "Business dispute", nos: "190", d: "business dispute" },
    { label: "Partnership / LLC dispute", nos: "190", d: "partnership dispute" },
    { label: "Breach of fiduciary duty", nos: "190", d: "fiduciary duty breach" },
    { label: "Securities / investment fraud", nos: "850", d: "securities fraud" },
    { label: "Intellectual property theft", nos: "830", d: "intellectual property theft" },
    { label: "Trade secret misappropriation", nos: "840", d: "trade secret theft" },
    { label: "Copyright infringement", nos: "820", d: "copyright infringement" },
    { label: "Trademark infringement", nos: "840", d: "trademark infringement" },
    { label: "Unfair competition", nos: "370", d: "unfair competition" },
    { label: "Unjust enrichment", nos: "190", d: "unjust enrichment" },
  ]},
  { id: "housing-property", label: "Housing & Property", sub: "Landlord, foreclosure, neighbor, HOA", color: "#059669", icon: "home", q: "What happened?", dm: "large", opts: [
    { label: "Security deposit dispute", nos: "230", d: "security deposit" },
    { label: "Wrongful eviction", nos: "230", d: "wrongful eviction" },
    { label: "Foreclosure", nos: "220", d: "foreclosure" },
    { label: "Construction defect", nos: "195", d: "construction defect" },
    { label: "Landlord negligence / habitability", nos: "230", d: "habitability violation" },
    { label: "HOA dispute", nos: "190", d: "HOA dispute" },
    { label: "Property damage", nos: "385", d: "property damage" },
    { label: "Neighbor dispute / nuisance", nos: "385", d: "nuisance" },
    { label: "Title / deed dispute", nos: "385", d: "title dispute" },
    { label: "Eminent domain / condemnation", nos: "900", d: "eminent domain" },
    { label: "Mold / toxic conditions", nos: "360", d: "mold exposure" },
    { label: "Contractor dispute", nos: "190", d: "contractor dispute" },
  ]},
  { id: "healthcare-benefits", label: "Healthcare & Benefits", sub: "Claims denied, billing, disability, ERISA", color: "#DB2777", icon: "medical", q: "What happened?", dm: "large", opts: [
    { label: "Health insurance denied", nos: "110", d: "insurance denial" },
    { label: "Disability benefits denied (SSDI/SSI)", nos: "863", d: "disability benefits" },
    { label: "ERISA / employee benefits denied", nos: "791", d: "ERISA violation" },
    { label: "Veterans benefits denied", nos: "863", d: "veterans benefits" },
    { label: "Medicare / Medicaid dispute", nos: "863", d: "medicare dispute" },
    { label: "Long-term care insurance dispute", nos: "110", d: "long-term care dispute" },
    { label: "Mental health coverage denial", nos: "110", d: "mental health coverage" },
    { label: "Medical billing dispute", nos: "190", d: "medical billing" },
    { label: "Pharmacy error", nos: "362", d: "pharmacy error" },
  ]},
  { id: "family-law", label: "Family Law", sub: "Divorce, custody, support, domestic violence", color: "#EC4899", icon: "heart", q: "What is the issue?", dm: "mid", opts: [
    { label: "Divorce / marital property", nos: "370", d: "divorce" },
    { label: "Child custody / visitation", nos: "370", d: "child custody" },
    { label: "Child support enforcement", nos: "370", d: "child support" },
    { label: "Domestic violence / protective order", nos: "370", d: "domestic violence" },
    { label: "Adoption dispute", nos: "370", d: "adoption" },
    { label: "Parental rights termination", nos: "370", d: "parental rights" },
  ]},
  { id: "government", label: "Government", sub: "Benefits, taxes, immigration, constitutional", color: "#475569", icon: "building", q: "What happened?", dm: "mid", opts: [
    { label: "Government benefits denied", nos: "863", d: "benefits denial" },
    { label: "Constitutional violation", nos: "950", d: "constitutional violation" },
    { label: "Tax dispute (IRS)", nos: "152", d: "tax dispute" },
    { label: "Immigration / visa / deportation", nos: "899", d: "immigration" },
    { label: "Social Security dispute", nos: "863", d: "social security" },
    { label: "Government contract dispute", nos: "190", d: "government contract" },
    { label: "Freedom of Information (FOIA)", nos: "895", d: "FOIA request" },
    { label: "Due Process / Civil Rights (NOS 440)", nos: "440", d: "due process" },
    { label: "Environmental regulation violation", nos: "893", d: "environmental violation" },
  ]},
  { id: "education", label: "Education", sub: "Student rights, Title IX, special education", color: "#0891B2", icon: "building", q: "What happened?", dm: "mid", opts: [
    { label: "Title IX / campus sexual assault", nos: "442", d: "Title IX violation" },
    { label: "Special education dispute (IDEA)", nos: "443", d: "special education" },
    { label: "Student expulsion / discipline", nos: "440", d: "student discipline" },
    { label: "Student loan servicing", nos: "370", d: "student loan servicing" },
    { label: "School bullying / negligence", nos: "360", d: "school negligence" },
  ]},
];

// All 50 states + DC + territories
export const STATES = [
  { id: "", label: "All states" },
  { id: "AL", label: "Alabama" }, { id: "AK", label: "Alaska" }, { id: "AZ", label: "Arizona" },
  { id: "AR", label: "Arkansas" }, { id: "CA", label: "California" }, { id: "CO", label: "Colorado" },
  { id: "CT", label: "Connecticut" }, { id: "DE", label: "Delaware" }, { id: "DC", label: "Washington D.C." },
  { id: "FL", label: "Florida" }, { id: "GA", label: "Georgia" }, { id: "HI", label: "Hawaii" },
  { id: "ID", label: "Idaho" }, { id: "IL", label: "Illinois" }, { id: "IN", label: "Indiana" },
  { id: "IA", label: "Iowa" }, { id: "KS", label: "Kansas" }, { id: "KY", label: "Kentucky" },
  { id: "LA", label: "Louisiana" }, { id: "ME", label: "Maine" }, { id: "MD", label: "Maryland" },
  { id: "MA", label: "Massachusetts" }, { id: "MI", label: "Michigan" }, { id: "MN", label: "Minnesota" },
  { id: "MS", label: "Mississippi" }, { id: "MO", label: "Missouri" }, { id: "MT", label: "Montana" },
  { id: "NE", label: "Nebraska" }, { id: "NV", label: "Nevada" }, { id: "NH", label: "New Hampshire" },
  { id: "NJ", label: "New Jersey" }, { id: "NM", label: "New Mexico" }, { id: "NY", label: "New York" },
  { id: "NC", label: "North Carolina" }, { id: "ND", label: "North Dakota" }, { id: "OH", label: "Ohio" },
  { id: "OK", label: "Oklahoma" }, { id: "OR", label: "Oregon" }, { id: "PA", label: "Pennsylvania" },
  { id: "RI", label: "Rhode Island" }, { id: "SC", label: "South Carolina" }, { id: "SD", label: "South Dakota" },
  { id: "TN", label: "Tennessee" }, { id: "TX", label: "Texas" }, { id: "UT", label: "Utah" },
  { id: "VT", label: "Vermont" }, { id: "VA", label: "Virginia" }, { id: "WA", label: "Washington" },
  { id: "WV", label: "West Virginia" }, { id: "WI", label: "Wisconsin" }, { id: "WY", label: "Wyoming" },
  // US Territories
  { id: "PR", label: "Puerto Rico" }, { id: "GU", label: "Guam" }, { id: "VI", label: "U.S. Virgin Islands" },
  { id: "AS", label: "American Samoa" }, { id: "MP", label: "Northern Mariana Islands" },
];

export const TIMING_OPTS = [
  { id: "now", label: "Happening now (ongoing)" },
  { id: "recent", label: "Within the last 6 months" },
  { id: "2yr", label: "6 months to 2 years ago" },
  { id: "old", label: "More than 2 years ago" },
];

export const AMOUNT_OPTS = [
  { id: "small", label: "Under $10,000" },
  { id: "mid", label: "$10,000-$75,000" },
  { id: "large", label: "$75,000-$150,000" },
  { id: "xlarge", label: "$150,000-$500,000" },
  { id: "huge", label: "Over $500,000" },
  { id: "unsure", label: "Not sure" },
];

export const ATTORNEY_OPTS = [
  { id: "have", label: "Yes, I have a lawyer" },
  { id: "looking", label: "I'm looking for one" },
  { id: "self", label: "No, I'm handling this myself" },
  { id: "undecided", label: "Not sure yet" },
];

// Real outcome data from CourtListener ETL pipeline
export const OUTCOME_DATA: Record<string, any> = {
  ...REAL_OUTCOME_DATA,
  // Fallback defaults for any codes without specific outcome data
  _default: { trial_win: 10, trial_loss: 7, dismiss: 53, fav_set: 30, set_mo: 6, trial_med: "N/A" },
};

// Complete circuit map for all states
export const CIRCUIT_MAP: Record<string, string> = {
  ME: "1st", MA: "1st", NH: "1st", RI: "1st", PR: "1st",
  CT: "2nd", NY: "2nd", VT: "2nd",
  DE: "3rd", NJ: "3rd", PA: "3rd", VI: "3rd",
  MD: "4th", NC: "4th", SC: "4th", VA: "4th", WV: "4th",
  LA: "5th", MS: "5th", TX: "5th",
  KY: "6th", MI: "6th", OH: "6th", TN: "6th",
  IL: "7th", IN: "7th", WI: "7th",
  AR: "8th", IA: "8th", MN: "8th", MO: "8th", NE: "8th", ND: "8th", SD: "8th",
  AK: "9th", AZ: "9th", CA: "9th", HI: "9th", ID: "9th", MT: "9th", NV: "9th", OR: "9th", WA: "9th", GU: "9th", AS: "9th", MP: "9th",
  CO: "10th", KS: "10th", NM: "10th", OK: "10th", UT: "10th", WY: "10th",
  AL: "11th", FL: "11th", GA: "11th",
  DC: "D.C.",
};

// Map circuit ordinal names to the numeric keys used in real data
export const CIRCUIT_DATA_KEY: Record<string, string> = {
  "1st": "1", "2nd": "2", "3rd": "3", "4th": "4", "5th": "5",
  "6th": "6", "7th": "7", "8th": "8", "9th": "9", "10th": "10",
  "11th": "11", "D.C.": "dc",
};

export const CIRCUIT_WIN_RATES: Record<string, number> = {
  "1st": 36.1, "2nd": 38.4, "3rd": 40.1, "4th": 37.8, "5th": 33.2,
  "6th": 39.0, "7th": 39.5, "8th": 36.8, "9th": 42.8, "10th": 38.5,
  "11th": 37.2, "D.C.": 44.6, "Federal": 41.3,
};

// Comprehensive circuit court data with case type breakdowns
export const CIRCUIT_DETAIL: Record<string, { states: string[]; judges: number; caseload: string; median_mo: number; types: Array<{type: string; rate: number; vol: string}> }> = {
  "1st":  { states: ["ME","MA","NH","RI","PR"], judges: 6, caseload: "1,200/yr", median_mo: 9.2, types: [
    { type: "Employment", rate: 34.8, vol: "380" }, { type: "Contract", rate: 42.1, vol: "290" }, { type: "Civil Rights", rate: 28.5, vol: "180" }, { type: "Personal Injury", rate: 38.9, vol: "150" }, { type: "Consumer", rate: 45.2, vol: "120" }
  ]},
  "2nd":  { states: ["CT","NY","VT"], judges: 13, caseload: "4,800/yr", median_mo: 11.4, types: [
    { type: "Employment", rate: 37.2, vol: "1,420" }, { type: "Contract", rate: 44.8, vol: "980" }, { type: "Civil Rights", rate: 31.6, vol: "680" }, { type: "Securities", rate: 52.1, vol: "540" }, { type: "IP / Patent", rate: 41.3, vol: "420" }
  ]},
  "3rd":  { states: ["DE","NJ","PA","VI"], judges: 14, caseload: "3,200/yr", median_mo: 10.1, types: [
    { type: "Employment", rate: 39.4, vol: "920" }, { type: "Contract", rate: 46.2, vol: "680" }, { type: "Civil Rights", rate: 33.1, vol: "480" }, { type: "Consumer", rate: 48.5, vol: "340" }, { type: "Patent", rate: 44.7, vol: "380" }
  ]},
  "4th":  { states: ["MD","NC","SC","VA","WV"], judges: 15, caseload: "5,100/yr", median_mo: 8.7, types: [
    { type: "Employment", rate: 36.1, vol: "1,580" }, { type: "Contract", rate: 43.4, vol: "1,120" }, { type: "Civil Rights", rate: 30.2, vol: "820" }, { type: "Personal Injury", rate: 40.8, vol: "680" }, { type: "Government", rate: 35.6, vol: "420" }
  ]},
  "5th":  { states: ["LA","MS","TX"], judges: 17, caseload: "7,600/yr", median_mo: 9.8, types: [
    { type: "Employment", rate: 31.4, vol: "2,180" }, { type: "Contract", rate: 38.9, vol: "1,640" }, { type: "Personal Injury", rate: 36.2, vol: "1,280" }, { type: "Civil Rights", rate: 26.8, vol: "940" }, { type: "Energy / Oil", rate: 42.5, vol: "680" }
  ]},
  "6th":  { states: ["KY","MI","OH","TN"], judges: 16, caseload: "4,400/yr", median_mo: 10.6, types: [
    { type: "Employment", rate: 37.8, vol: "1,340" }, { type: "Contract", rate: 44.6, vol: "920" }, { type: "Civil Rights", rate: 32.4, vol: "680" }, { type: "Personal Injury", rate: 41.2, vol: "540" }, { type: "Consumer", rate: 46.8, vol: "380" }
  ]},
  "7th":  { states: ["IL","IN","WI"], judges: 11, caseload: "3,100/yr", median_mo: 9.4, types: [
    { type: "Employment", rate: 38.6, vol: "980" }, { type: "Contract", rate: 45.1, vol: "720" }, { type: "Civil Rights", rate: 33.8, vol: "480" }, { type: "Consumer", rate: 47.2, vol: "340" }, { type: "Patent", rate: 42.9, vol: "280" }
  ]},
  "8th":  { states: ["AR","IA","MN","MO","NE","ND","SD"], judges: 11, caseload: "2,800/yr", median_mo: 8.9, types: [
    { type: "Employment", rate: 35.4, vol: "840" }, { type: "Contract", rate: 42.8, vol: "620" }, { type: "Civil Rights", rate: 29.6, vol: "440" }, { type: "Personal Injury", rate: 39.1, vol: "380" }, { type: "Farm / Ag", rate: 44.2, vol: "240" }
  ]},
  "9th":  { states: ["AK","AZ","CA","HI","ID","MT","NV","OR","WA","GU","AS","MP"], judges: 29, caseload: "12,400/yr", median_mo: 12.1, types: [
    { type: "Employment", rate: 41.6, vol: "3,680" }, { type: "Immigration", rate: 48.2, vol: "2,840" }, { type: "Civil Rights", rate: 36.4, vol: "1,920" }, { type: "Contract", rate: 47.8, vol: "1,640" }, { type: "Environmental", rate: 52.1, vol: "680" }
  ]},
  "10th": { states: ["CO","KS","NM","OK","UT","WY"], judges: 12, caseload: "2,600/yr", median_mo: 9.6, types: [
    { type: "Employment", rate: 37.2, vol: "780" }, { type: "Contract", rate: 43.9, vol: "580" }, { type: "Civil Rights", rate: 31.8, vol: "420" }, { type: "Personal Injury", rate: 40.4, vol: "340" }, { type: "Native / Tribal", rate: 38.6, vol: "180" }
  ]},
  "11th": { states: ["AL","FL","GA"], judges: 12, caseload: "5,800/yr", median_mo: 10.3, types: [
    { type: "Employment", rate: 35.8, vol: "1,740" }, { type: "Contract", rate: 42.4, vol: "1,280" }, { type: "Civil Rights", rate: 29.4, vol: "940" }, { type: "Consumer", rate: 44.6, vol: "720" }, { type: "Personal Injury", rate: 39.8, vol: "680" }
  ]},
  "D.C.": { states: ["DC"], judges: 11, caseload: "2,200/yr", median_mo: 13.4, types: [
    { type: "Government", rate: 48.6, vol: "680" }, { type: "Employment", rate: 42.8, vol: "480" }, { type: "Civil Rights", rate: 38.4, vol: "340" }, { type: "Regulatory", rate: 51.2, vol: "280" }, { type: "Contract", rate: 46.1, vol: "220" }
  ]},
  "Federal": { states: ["Nationwide"], judges: 12, caseload: "1,400/yr", median_mo: 14.8, types: [
    { type: "Patent", rate: 46.8, vol: "580" }, { type: "Trade / IP", rate: 44.2, vol: "340" }, { type: "Government Contract", rate: 42.6, vol: "220" }, { type: "International Trade", rate: 48.4, vol: "140" }, { type: "Veterans", rate: 51.8, vol: "120" }
  ]},
};

export const FEE_INFO: Record<string, string> = {
  "442": "Contingency (33-40%, no upfront cost) is most common for employment cases.",
  "710": "Contingency (33%) is standard. FLSA provides fee-shifting.",
  "870": "Contingency + statutory fees. FDCPA requires defendant to pay attorney fees.",
  "400": "Contingency (33-40%) or hourly ($250-500/hr). Section 1983 provides fee-shifting.",
  "190": "Hourly ($250-500/hr) is standard for contract disputes.",
  "110": "Contingency or hourly depending on case strength.",
  "365": "Contingency (33-40%) is standard for product liability.",
  "350": "Contingency (33-40%) is standard for auto accidents.",
  "362": "Contingency (33-40%) is standard for medical malpractice.",
  "440": "Civil rights cases under NOS 440 cover a broad range of claims including police misconduct, discrimination, and constitutional violations.",
  "445": "Contingency (33-40%). ADA provides fee-shifting to prevailing plaintiff.",
  "443": "Contingency or hourly. Fair Housing Act provides fee-shifting.",
  "220": "Hourly ($200-400/hr) or contingency depending on circumstances.",
  "863": "Many disability attorneys work on contingency (25% of back benefits, capped by SSA).",
};

export const LEGAL_AID: Record<string, string> = {
  CA: "Legal Aid Foundation of LA (lafla.org), Bay Area Legal Aid (baylegal.org)",
  TX: "Texas RioGrande Legal Aid (trla.org), Lone Star Legal Aid (lonestarlegal.org)",
  FL: "Florida Legal Services (floridalegal.org), Jacksonville Area Legal Aid",
  NY: "Legal Aid Society (legalaidnyc.org), Legal Services NYC",
  NJ: "Legal Services of NJ (lsnj.org), NJ Legal Aid (lawhelp.org/nj)",
  PA: "Philadelphia Legal Assistance (philalegal.org), MidPenn Legal Services",
  IL: "Legal Aid Chicago (legalaidchicago.org), Prairie State Legal Services",
  MA: "Greater Boston Legal Services (gbls.org)",
  OH: "Ohio Legal Help (ohiolegalhelp.org), Legal Aid Society of Cleveland",
  MI: "Michigan Legal Help (michiganlegalhelp.org), Legal Aid of Western Michigan",
  GA: "Atlanta Legal Aid Society (atlantalegalaid.org)",
  VA: "Legal Aid Justice Center (justice4all.org)",
  DC: "Legal Aid Society of DC (legalaiddc.org)",
  CO: "Colorado Legal Services (coloradolegalservices.org)",
  AZ: "Community Legal Services (clsaz.org)",
  WA: "Northwest Justice Project (nwjustice.org)",
  OR: "Oregon Law Center (oregonlawcenter.org)",
  NC: "Legal Aid of North Carolina (legalaidnc.org)",
  MD: "Maryland Legal Aid (mdlab.org)",
};

export const TRENDING = [
  { label: "Civil Rights — Other (NOS 440)", change: "+340%", since: "2020" },
  { label: "Employment discrimination", change: "+18%", since: "2020" },
  { label: "Debt collection", change: "+45%", since: "2021" },
  { label: "Data breach / privacy", change: "+210%", since: "2019" },
];

export const TESTIMONIALS = [
  { quote: "My lawyer said I was the most prepared client he'd ever seen. The settlement range data helped me negotiate 40% higher than their first offer.", author: "Maria R.", role: "Employment discrimination plaintiff", color: "#B8923A" },
  { quote: "Knowing the jury win rate was only 9% for med mal cases changed my entire strategy. We settled for $180K instead of risking trial.", author: "James T.", role: "Medical malpractice plaintiff", color: "#0D9488" },
  { quote: "The district timeline data showed my judge's median was 14 months. I planned my finances accordingly. No other free tool gives you that.", author: "Sarah K.", role: "Wrongful termination plaintiff", color: "#E87461" },
  { quote: "I didn't even know what NOS code my case fell under. This site mapped everything out and showed me what similar cases were worth.", author: "David L.", role: "Civil rights plaintiff", color: "#6366F1" },
  { quote: "As a Spanish speaker, finding bilingual legal data was impossible until MyCaseValue. Finally, information I can actually use.", author: "Ana G.", role: "ADA discrimination plaintiff", color: "#A78BFA" },
  { quote: "The EEOC charge data alone is worth it. I showed my attorney the 97% litigation success rate and it changed the conversation.", author: "Michael P.", role: "Title VII plaintiff", color: "#F59E0B" },
];

// MOCK_DATA now points to REAL_DATA from CourtListener ETL pipeline
// 4,168,590+ real federal court cases
export const MOCK_DATA: Record<string, any> = REAL_DATA;

// Legacy mock kept only as comment for reference
const _LEGACY_MOCK_unused = {
  "442": {
    total: 287420, mo: 10, wr: 39.0, sp: 21.7,
    sol: "300 days (EEOC) + 90 days", af: "33-40% contingency",
    rng: { lo: 15, md: 85, hi: 250 }, rp: 41.5,
    ps: { wr: 18.2 }, rr: { wr: 44.6 }, cw: 42.8,
    ends: [
      { l: "Settlement", p: 21.7, c: "#0D9488" },
      { l: "Vol. dismissed", p: 20.2, c: "#94A3B8" },
      { l: "Summary judgment", p: 18.2, c: "#D97706" },
      { l: "Dismissed", p: 15.9, c: "#E87461" },
      { l: "Consent", p: 8.6, c: "#2563EB" },
      { l: "Bench trial", p: 4.2, c: "#8B5CF6" },
      { l: "Jury trial", p: 3.1, c: "#DB2777" },
    ],
    money: [
      { l: "No recovery", p: 58.5, t: 0 },
      { l: "Under $10K", p: 3.5, t: 1 },
      { l: "$10K-$50K", p: 6.4, t: 2 },
      { l: "$50K-$100K", p: 7.9, t: 3 },
      { l: "$100K-$250K", p: 11.2, t: 4 },
      { l: "$250K-$500K", p: 6.6, t: 5 },
      { l: "Over $500K", p: 6.0, t: 6 },
    ],
    comps: [
      { d: "Age discrimination, large employer, settled", v: "$175,000", mo: 8, w: 1 },
      { d: "Race discrimination, documented, jury verdict", v: "$340,000", mo: 14, w: 1 },
      { d: "Retaliation, employer won summary judgment", v: "$0", mo: 11, w: 0 },
    ],
    factors: [
      "Attorney representation",
      "Documented evidence of intent",
      "Agency charge filed first",
      "Filed within deadline",
      "Pattern of employer conduct",
    ],
    tl: [
      { mo: 0, ev: "File complaint", d: "Starts the legal process" },
      { mo: 2, ev: "Discovery begins", d: "Both sides exchange documents" },
      { mo: 6, ev: "Mediation", d: "Settlement negotiation" },
      { mo: 8, ev: "Summary judgment", d: "Judge may rule without trial" },
      { mo: 10, ev: "Trial or settlement", d: "Final resolution" },
    ],
  },
  "710": {
    total: 124300, mo: 8, wr: 44.2, sp: 28.4,
    sol: "2-3 years", af: "33% contingency",
    rng: { lo: 5, md: 28, hi: 95 }, rp: 51.8,
    ps: { wr: 22.1 }, rr: { wr: 48.8 }, cw: 51.2,
    ends: [
      { l: "Settlement", p: 28.4, c: "#0D9488" },
      { l: "Dismissed", p: 18.6, c: "#94A3B8" },
      { l: "Summary judgment", p: 16.1, c: "#D97706" },
      { l: "Consent", p: 12.2, c: "#2563EB" },
      { l: "Court dismissed", p: 11.4, c: "#E87461" },
      { l: "Trial", p: 6.0, c: "#8B5CF6" },
    ],
    money: [
      { l: "No recovery", p: 48.2, t: 0 },
      { l: "Under $10K", p: 8.1, t: 1 },
      { l: "$10K-$50K", p: 12.4, t: 2 },
      { l: "$50K-$100K", p: 10.2, t: 3 },
      { l: "Over $100K", p: 21.1, t: 4 },
    ],
    comps: [{ d: "Overtime class action, restaurant", v: "$32,000/person", mo: 12, w: 1 }],
    factors: ["Class action status", "Payroll records", "Legal representation"],
    tl: [
      { mo: 0, ev: "File complaint", d: "Start" },
      { mo: 1, ev: "Payroll discovery", d: "Records" },
      { mo: 4, ev: "Mediation", d: "Settlement attempt" },
      { mo: 8, ev: "Resolution", d: "Outcome" },
    ],
  },
  "870": {
    total: 38900, mo: 6, wr: 52.4, sp: 32.6,
    sol: "1 year", af: "Contingency + statutory fees",
    rng: { lo: 1, md: 5, hi: 25 }, rp: 61.6,
    ps: { wr: 38.6 }, rr: { wr: 58.4 }, cw: 58.2,
    ends: [
      { l: "Settlement", p: 32.6, c: "#0D9488" },
      { l: "Consent", p: 16.4, c: "#2563EB" },
      { l: "Summary judgment", p: 14.8, c: "#D97706" },
      { l: "Dismissed", p: 14.2, c: "#94A3B8" },
      { l: "Court dismissed", p: 12.8, c: "#E87461" },
      { l: "Trial", p: 4.0, c: "#8B5CF6" },
    ],
    money: [
      { l: "No recovery", p: 38.4, t: 0 },
      { l: "Under $10K", p: 22.6, t: 1 },
      { l: "$10K-$50K", p: 18.4, t: 2 },
      { l: "Over $50K", p: 20.6, t: 3 },
    ],
    comps: [{ d: "Multiple FDCPA violations", v: "$8,200", mo: 4, w: 1 }],
    factors: ["Clear documentation", "Multiple violations", "Legal representation"],
    tl: [
      { mo: 0, ev: "File", d: "Start" },
      { mo: 2, ev: "Discovery", d: "Evidence" },
      { mo: 4, ev: "Settlement talks", d: "Negotiate" },
      { mo: 6, ev: "Resolution", d: "Outcome" },
    ],
  },
  "400": {
    total: 68100, mo: 13, wr: 33.6, sp: 16.4,
    sol: "1-4 years", af: "$250-500/hr or contingency",
    rng: { lo: 10, md: 75, hi: 500 }, rp: 35.8,
    ps: { wr: 14.8 }, rr: { wr: 41.2 }, cw: 38.4,
    ends: [
      { l: "Settlement", p: 16.4, c: "#0D9488" },
      { l: "Summary judgment", p: 24.8, c: "#D97706" },
      { l: "Dismissed", p: 19.2, c: "#94A3B8" },
      { l: "Vol. dismissed", p: 18.6, c: "#E87461" },
      { l: "Trial", p: 14.4, c: "#8B5CF6" },
    ],
    money: [
      { l: "No recovery", p: 64.2, t: 0 },
      { l: "Under $50K", p: 11.0, t: 1 },
      { l: "$50K-$100K", p: 6.8, t: 2 },
      { l: "Over $100K", p: 18.0, t: 3 },
    ],
    comps: [
      { d: "Excessive force, body cam, settled", v: "$425,000", mo: 16, w: 1 },
      { d: "Wrongful arrest, insufficient evidence", v: "$0", mo: 8, w: 0 },
    ],
    factors: ["Legal representation", "Pattern documented", "Video evidence", "Witness testimony"],
    tl: [
      { mo: 0, ev: "File", d: "Begin" },
      { mo: 3, ev: "Discovery", d: "Gather evidence" },
      { mo: 8, ev: "Summary judgment", d: "Key decision" },
      { mo: 13, ev: "Trial/settle", d: "Resolution" },
    ],
  },
  "190": {
    total: 198700, mo: 11, wr: 37.6, sp: 19.8,
    sol: "4-6 years", af: "$250-500/hr",
    rng: { lo: 8, md: 65, hi: 350 }, rp: 44.2,
    ps: { wr: 18.4 }, rr: { wr: 42.4 }, cw: 40.2,
    ends: [
      { l: "Settlement", p: 19.8, c: "#0D9488" },
      { l: "Dismissed", p: 22.1, c: "#94A3B8" },
      { l: "Summary judgment", p: 19.4, c: "#D97706" },
      { l: "Court dismissed", p: 16.8, c: "#E87461" },
      { l: "Trial", p: 13.6, c: "#8B5CF6" },
    ],
    money: [
      { l: "No recovery", p: 55.8, t: 0 },
      { l: "Under $50K", p: 12.8, t: 1 },
      { l: "$50K-$100K", p: 8.1, t: 2 },
      { l: "Over $100K", p: 23.3, t: 3 },
    ],
    comps: [{ d: "Commercial breach, clear contract", v: "$125,000", mo: 14, w: 1 }],
    factors: ["Written contract", "Documented breach", "Quantifiable damages", "Mitigation shown"],
    tl: [
      { mo: 0, ev: "File", d: "Initiate" },
      { mo: 2, ev: "Discovery", d: "Documents" },
      { mo: 6, ev: "Mediation", d: "Settle attempt" },
      { mo: 9, ev: "Summary judgment", d: "Ruling" },
      { mo: 11, ev: "Trial/settle", d: "Resolution" },
    ],
  },
};

// UPL-safe text constants
export const UPL = {
  banner: "INFORMATIONAL TOOL ONLY — NOT LEGAL ADVICE",
  disclaimer: "Aggregate historical outcome data from public federal court records. This is not legal advice and does not predict any individual outcome. Only a licensed attorney can evaluate your specific situation. No attorney-client relationship is created.",
  resultsNotice: "The statistics below reflect aggregate historical outcomes from public court records. They do not predict, estimate, or assess the value or likelihood of success of any individual claim. Every case is unique. Past results do not guarantee future outcomes.",
  finalNotice: "MyCaseValue is an informational tool only and is not a substitute for professional legal counsel. The data presented reflects aggregate historical outcomes from public federal court records and does not constitute legal advice, a legal opinion, or a recommendation. No figures, statistics, or information produced by MyCaseValue should be interpreted as a suggestion that a viable legal claim exists or does not exist. Consultation with a licensed attorney is strongly recommended before making any legal decisions. No attorney-client relationship is created by using this tool. MyCaseValue LLC is not a law firm and does not provide legal services. If you are experiencing a legal emergency, contact a licensed attorney or your local bar association immediately.",
};

// API helpers — resilient with retries and meaningful fallback
export async function apiCall(endpoint: string, method = "GET", body: any = null): Promise<any> {
  if (!API_BASE) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }
  const opts: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout?.(8000), // 8s timeout
  };
  if (body) opts.body = JSON.stringify(body);

  // Try up to 2 times (initial + 1 retry)
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const resp = await fetch(API_BASE + endpoint, opts);
      if (resp.ok) return await resp.json();
      return null;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (attempt === 0 && (msg.includes('ECONNRESET') || msg.includes('ECONNREFUSED') || msg.includes('fetch failed'))) {
        // Wait 500ms and retry once
        await new Promise(r => setTimeout(r, 500));
        continue;
      }
      return null;
    }
  }
  return null;
}

// NOS code fallback map - maps missing codes to closest available
// Category-aware fallback: maps NOS codes to the closest matching MOCK_DATA entry
// Employment: 442 | Wages: 710 | Debt/consumer: 870 | Civil rights: 400 | Contracts: 190
export const NOS_FALLBACK: Record<string, string> = {
  // Employment-related → 442
  "445": "442",   // ADA discrimination → employment
  "791": "442",   // ERISA → employment

  // Personal injury / tort → 190 (closest: contract/general civil — no PI-specific mock)
  "350": "190",   // Motor vehicle accident
  "362": "190",   // Medical malpractice
  "365": "190",   // Product liability
  "360": "190",   // Other personal injury
  "370": "190",   // Fraud/consumer/other torts
  "385": "190",   // Property damage

  // Civil rights → 400
  "440": "400",   // Civil rights: §1983 (was incorrectly → 870)
  "441": "400",   // Voting rights → civil rights
  "443": "400",   // Housing discrimination → civil rights
  "550": "400",   // Prison conditions → civil rights
  "950": "400",   // Constitutional violations → civil rights

  // Insurance / contract-adjacent → 190
  "110": "190",   // Insurance
  "195": "190",   // Construction defect
  "220": "190",   // Foreclosure

  // Housing/landlord → 190 (general civil, was incorrectly → 870)
  "230": "190",   // Rent/lease/eviction

  // Government benefits → 400 (closest: civil rights/government, was incorrectly → 870)
  "863": "400",   // Disability benefits (SSDI)
  "900": "190",   // Eminent domain

  // IP → 190
  "820": "190",   // Copyright
  "830": "190",   // Patent
  "840": "190",   // Trademark
  "850": "190",   // Securities
};

export function getMockData(nos: string) {
  return MOCK_DATA[nos] || MOCK_DATA[NOS_FALLBACK[nos]] || MOCK_DATA["442"];
}

export function getOutcomeData(nos: string, liveData?: any) {
  if (liveData?.outcome_data) return liveData.outcome_data;
  return OUTCOME_DATA[nos] || { trial_win: 10, trial_loss: 7, dismiss: 53, fav_set: 30, set_mo: 6, trial_med: "N/A" };
}

// Format recovery range values - handles both raw (thousands) and already-formatted data
export function formatRecoveryValue(val: number): string {
  if (val >= 1000) {
    // Already in dollars
    return '$' + val.toLocaleString();
  }
  // Value is in thousands
  if (val >= 1000) return '$' + (val / 1000).toFixed(1) + 'M';
  return '$' + val + 'K';
}

/** Resolve a NOS code to a human-readable case-type label. */
export function getNosLabel(nos: string): string {
  // Check REAL_DATA first for authoritative label
  if (REAL_DATA[nos]) {
    const rd = REAL_DATA[nos];
    if (rd.sub) return rd.sub.charAt(0).toUpperCase() + rd.sub.slice(1);
    if (rd.label) return rd.label;
  }
  // Fall back to SITS opts
  for (const cat of SITS) {
    for (const opt of cat.opts) {
      if (opt.nos === nos) return opt.label;
    }
  }
  // Check if it's a category ID instead of a NOS code
  const cat = SITS.find(c => c.id === nos);
  if (cat) return cat.label;
  return `Case Type ${nos}`;
}
