/**
 * NOS Code to Governing Statute Mapping
 * Maps Nature of Suit (NOS) codes to their primary federal statutes
 */

export const NOS_STATUTE_MAP: Record<
  number,
  { title: string; usc: string; description: string }
> = {
  110: {
    title: "Insurance",
    usc: "28 U.S.C. § 1332",
    description:
      "Federal question or diversity jurisdiction for insurance disputes, including coverage disputes and bad faith claims",
  },
  190: {
    title: "Contract",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for contract disputes, including breach of contract and contract interpretation cases",
  },
  220: {
    title: "Foreclosure",
    usc: "28 U.S.C. § 1332",
    description:
      "Foreclosure actions under diversity jurisdiction, including mortgage foreclosures and real property lien enforcement",
  },
  240: {
    title: "Torts to Land",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for tort actions involving damage to real property, including trespass and nuisance",
  },
  290: {
    title: "Real Property",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for real property disputes, including boundary disputes, title issues, and land claims",
  },
  310: {
    title: "Airplane Personal Injury",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for personal injury claims arising from airplane accidents and aviation incidents",
  },
  320: {
    title: "Assault, Libel & Slander",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for tort claims including assault, battery, libel, slander, and defamation",
  },
  340: {
    title: "Marine Personal Injury (Jones Act)",
    usc: "46 U.S.C. § 30104",
    description:
      "Jones Act claims for maritime workers' personal injury, unseaworthiness, and maintenance and cure",
  },
  350: {
    title: "Motor Vehicle Personal Injury",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for personal injury claims arising from motor vehicle accidents",
  },
  360: {
    title: "Other Personal Injury",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for personal injury claims not otherwise classified, including slip and fall and premises liability",
  },
  362: {
    title: "Medical Malpractice",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for medical malpractice claims against healthcare providers and medical institutions",
  },
  365: {
    title: "Product Liability",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for product liability claims based on design defect, manufacturing defect, or failure to warn",
  },
  367: {
    title: "Asbestos",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for asbestos-related personal injury claims and occupational disease cases",
  },
  368: {
    title: "Asbestos Personal Injury Product Liability",
    usc: "28 U.S.C. § 1332",
    description:
      "Asbestos-specific product liability claims for personal injury from asbestos-containing products",
  },
  370: {
    title: "Fraud",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for fraud claims, including common law fraud and fraudulent misrepresentation",
  },
  380: {
    title: "Other Personal Property Damage",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for property damage claims not otherwise classified",
  },
  440: {
    title: "Civil Rights - Other",
    usc: "42 U.S.C. § 1983",
    description:
      "Federal question jurisdiction for civil rights claims including deprivation of rights under color of law",
  },
  441: {
    title: "Civil Rights - Voting",
    usc: "52 U.S.C. § 10301",
    description:
      "Federal question jurisdiction for voting rights claims under the Voting Rights Act and constitutional protections",
  },
  442: {
    title: "Employment Discrimination",
    usc: "42 U.S.C. § 2000e",
    description:
      "Federal question jurisdiction for Title VII employment discrimination claims based on race, color, religion, sex, or national origin",
  },
  443: {
    title: "Housing & Accommodations",
    usc: "42 U.S.C. § 3604",
    description:
      "Federal question jurisdiction for Fair Housing Act claims and housing discrimination cases",
  },
  445: {
    title: "ADA Employment",
    usc: "42 U.S.C. § 12112",
    description:
      "Federal question jurisdiction for Americans with Disabilities Act employment discrimination claims",
  },
  446: {
    title: "ADA Other",
    usc: "42 U.S.C. § 12101 et seq.",
    description:
      "Federal question jurisdiction for ADA claims in areas other than employment, including public accommodations",
  },
  448: {
    title: "Education",
    usc: "20 U.S.C. § 1681",
    description:
      "Federal question jurisdiction for Title IX education discrimination claims and educational rights violations",
  },
  710: {
    title: "FLSA",
    usc: "29 U.S.C. § 201 et seq.",
    description:
      "Federal question jurisdiction for Fair Labor Standards Act claims regarding wages, hours, and overtime",
  },
  720: {
    title: "LMRA",
    usc: "29 U.S.C. § 185",
    description:
      "Federal question jurisdiction for Labor-Management Relations Act claims and labor disputes",
  },
  740: {
    title: "ERISA",
    usc: "29 U.S.C. § 1001 et seq.",
    description:
      "Federal question jurisdiction for Employee Retirement Income Security Act claims involving pension and benefits plans",
  },
  791: {
    title: "ERISA Tax",
    usc: "26 U.S.C.",
    description:
      "Federal question jurisdiction for ERISA claims involving tax-related issues and plan taxation",
  },
  820: {
    title: "Copyright",
    usc: "17 U.S.C. § 101 et seq.",
    description:
      "Federal question jurisdiction for copyright infringement claims and copyright protection disputes",
  },
  830: {
    title: "Patent",
    usc: "35 U.S.C.",
    description:
      "Federal question jurisdiction for patent infringement claims and patent validity disputes",
  },
  840: {
    title: "Trademark",
    usc: "15 U.S.C. § 1051",
    description:
      "Federal question jurisdiction for Lanham Act trademark infringement and unfair competition claims",
  },
  850: {
    title: "Securities/Commodities/Exchange",
    usc: "15 U.S.C. § 78j",
    description:
      "Federal question jurisdiction for Securities Exchange Act claims and securities fraud litigation",
  },
  860: {
    title: "Social Security",
    usc: "42 U.S.C. § 405(g)",
    description:
      "Federal question jurisdiction for Social Security benefits appeals and disability determinations",
  },
  863: {
    title: "Social Security DIWC/DIWW",
    usc: "42 U.S.C. § 405(g)",
    description:
      "Social Security Disability Insurance Worker's Compensation/Disability Insurance Worker's Widow claims",
  },
  864: {
    title: "SSID Title XVI",
    usc: "42 U.S.C. § 1383(c)(3)",
    description:
      "Supplemental Security Income appeals under Title XVI of the Social Security Act",
  },
  870: {
    title: "Tax Suits",
    usc: "26 U.S.C. § 7422",
    description:
      "Federal question jurisdiction for federal tax refund claims and tax liability disputes",
  },
  871: {
    title: "IRS Third Party",
    usc: "26 U.S.C. § 7609",
    description:
      "IRS third-party summons enforcement and tax administration disputes under federal tax law",
  },
};
