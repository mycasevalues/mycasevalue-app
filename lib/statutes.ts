/**
 * NOS Code to Governing Statute Mapping
 * Maps Nature of Suit (NOS) codes to their primary federal statutes
 */

export const NOS_STATUTE_MAP: Record<
  number,
  { title: string; usc: string; description: string; url?: string }
> = {
  110: {
    title: "Insurance",
    usc: "28 U.S.C. § 1332",
    description:
      "Federal question or diversity jurisdiction for insurance disputes, including coverage disputes and bad faith claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  190: {
    title: "Contract",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for contract disputes, including breach of contract and contract interpretation cases",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
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
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  290: {
    title: "Real Property",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for real property disputes, including boundary disputes, title issues, and land claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  310: {
    title: "Airplane Personal Injury",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for personal injury claims arising from airplane accidents and aviation incidents",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title49/html/USCODE-2023-title49-subtitleVII-partA-subpartI-chap401-sec40101.htm",
  },
  320: {
    title: "Assault, Libel & Slander",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for tort claims including assault, battery, libel, slander, and defamation",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  340: {
    title: "Marine Personal Injury (Jones Act)",
    usc: "46 U.S.C. § 30104",
    description:
      "Jones Act claims for maritime workers' personal injury, unseaworthiness, and maintenance and cure",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1333.htm",
  },
  350: {
    title: "Motor Vehicle Personal Injury",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for personal injury claims arising from motor vehicle accidents",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  360: {
    title: "Other Personal Injury",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for personal injury claims not otherwise classified, including slip and fall and premises liability",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  362: {
    title: "Medical Malpractice",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for medical malpractice claims against healthcare providers and medical institutions",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  365: {
    title: "Product Liability",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for product liability claims based on design defect, manufacturing defect, or failure to warn",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
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
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
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
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  440: {
    title: "Civil Rights - Other",
    usc: "42 U.S.C. § 1983",
    description:
      "Federal question jurisdiction for civil rights claims including deprivation of rights under color of law",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap21-subchapI-sec1983.htm",
  },
  441: {
    title: "Civil Rights - Voting",
    usc: "52 U.S.C. § 10301",
    description:
      "Federal question jurisdiction for voting rights claims under the Voting Rights Act and constitutional protections",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title52/html/USCODE-2023-title52-subtitleII-chap103-sec10301.htm",
  },
  442: {
    title: "Employment Discrimination",
    usc: "42 U.S.C. § 2000e",
    description:
      "Federal question jurisdiction for Title VII employment discrimination claims based on race, color, religion, sex, or national origin",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap21-subchapVI-sec2000e.htm",
  },
  443: {
    title: "Housing & Accommodations",
    usc: "42 U.S.C. § 3604",
    description:
      "Federal question jurisdiction for Fair Housing Act claims and housing discrimination cases",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap45-sec3601.htm",
  },
  445: {
    title: "ADA Employment",
    usc: "42 U.S.C. § 12112",
    description:
      "Federal question jurisdiction for Americans with Disabilities Act employment discrimination claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap126-sec12112.htm",
  },
  446: {
    title: "ADA Other",
    usc: "42 U.S.C. § 12101 et seq.",
    description:
      "Federal question jurisdiction for ADA claims in areas other than employment, including public accommodations",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap126-sec12101.htm",
  },
  448: {
    title: "Education",
    usc: "20 U.S.C. § 1681",
    description:
      "Federal question jurisdiction for Title IX education discrimination claims and educational rights violations",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title20/html/USCODE-2023-title20-chap38-subchapV-sec1681.htm",
  },
  710: {
    title: "FLSA",
    usc: "29 U.S.C. § 201 et seq.",
    description:
      "Federal question jurisdiction for Fair Labor Standards Act claims regarding wages, hours, and overtime",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap8-sec201.htm",
  },
  720: {
    title: "LMRA",
    usc: "29 U.S.C. § 185",
    description:
      "Federal question jurisdiction for Labor-Management Relations Act claims and labor disputes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap7-sec141.htm",
  },
  740: {
    title: "ERISA",
    usc: "29 U.S.C. § 1001 et seq.",
    description:
      "Federal question jurisdiction for Employee Retirement Income Security Act claims involving pension and benefits plans",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title45/html/USCODE-2023-title45-chap8-sec151.htm",
  },
  791: {
    title: "ERISA Tax",
    usc: "26 U.S.C.",
    description:
      "Federal question jurisdiction for ERISA claims involving tax-related issues and plan taxation",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap18-subchapI-sec1001.htm",
  },
  820: {
    title: "Copyright",
    usc: "17 U.S.C. § 101 et seq.",
    description:
      "Federal question jurisdiction for copyright infringement claims and copyright protection disputes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title17/html/USCODE-2023-title17-chap1-sec101.htm",
  },
  830: {
    title: "Patent",
    usc: "35 U.S.C.",
    description:
      "Federal question jurisdiction for patent infringement claims and patent validity disputes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title35/html/USCODE-2023-title35-partI-chap1-sec1.htm",
  },
  840: {
    title: "Trademark",
    usc: "15 U.S.C. § 1051",
    description:
      "Federal question jurisdiction for Lanham Act trademark infringement and unfair competition claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title15/html/USCODE-2023-title15-chap22-sec1051.htm",
  },
  850: {
    title: "Securities/Commodities/Exchange",
    usc: "15 U.S.C. § 78j",
    description:
      "Federal question jurisdiction for Securities Exchange Act claims and securities fraud litigation",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title15/html/USCODE-2023-title15-chap2A-sec77a.htm",
  },
  860: {
    title: "Social Security",
    usc: "42 U.S.C. § 405(g)",
    description:
      "Federal question jurisdiction for Social Security benefits appeals and disability determinations",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap7-subchapII-sec401.htm",
  },
  863: {
    title: "Social Security DIWC/DIWW",
    usc: "42 U.S.C. § 405(g)",
    description:
      "Social Security Disability Insurance Worker's Compensation/Disability Insurance Worker's Widow claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap7-subchapII-sec401.htm",
  },
  864: {
    title: "SSID Title XVI",
    usc: "42 U.S.C. § 1383(c)(3)",
    description:
      "Supplemental Security Income appeals under Title XVI of the Social Security Act",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap7-subchapXVI-sec1381.htm",
  },
  870: {
    title: "Tax Suits",
    usc: "26 U.S.C. § 7422",
    description:
      "Federal question jurisdiction for federal tax refund claims and tax liability disputes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title26/html/USCODE-2023-title26-subtitleF-chap76-subchapD-sec7421.htm",
  },
  871: {
    title: "IRS Third Party",
    usc: "26 U.S.C. § 7609",
    description:
      "IRS third-party summons enforcement and tax administration disputes under federal tax law",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title26/html/USCODE-2023-title26-subtitleF-chap78-subchapA-sec7609.htm",
  },
  120: {
    title: "Marine",
    usc: "28 U.S.C. § 1333",
    description:
      "Federal maritime jurisdiction over marine and shipping contract disputes under diversity jurisdiction",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1333.htm",
  },
  130: {
    title: "Miller Act",
    usc: "40 U.S.C. § 3131",
    description:
      "Federal jurisdiction over payment bonds for federal construction contracts under the Miller Act",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title40/html/USCODE-2023-title40-subtitleI-chap31-subchapV-sec3131.htm",
  },
  140: {
    title: "Negotiable Instrument",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for disputes involving negotiable instruments and commercial paper",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  150: {
    title: "Recovery of Overpayment",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for recovery of overpayment and unjust enrichment claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  151: {
    title: "Medicare Act",
    usc: "42 U.S.C. § 1395",
    description:
      "Federal jurisdiction over disputes arising under the Medicare Act and federal health insurance programs",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap7-subchapXVIII-sec1395.htm",
  },
  152: {
    title: "Recovery of Student Loans",
    usc: "20 U.S.C. § 1091",
    description:
      "Federal jurisdiction over disputes concerning federal student loan repayment and recovery",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title20/html/USCODE-2023-title20-chap28-subchapIV-partC-sec1091.htm",
  },
  153: {
    title: "Recovery of Overpayment of Veteran's Benefits",
    usc: "38 U.S.C. § 5101",
    description:
      "Federal jurisdiction over disputes regarding overpayment and recovery of veteran's benefits",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title38/html/USCODE-2023-title38-partIII-chap51-sec5101.htm",
  },
  160: {
    title: "Stockholders' Suits",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for stockholder derivative and direct action suits against corporations",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  195: {
    title: "Contract Product Liability",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for product liability claims arising from breach of contract and warranty",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  196: {
    title: "Franchise",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for disputes between franchisors and franchisees involving contract and tort claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  210: {
    title: "Land Condemnation",
    usc: "28 U.S.C. § 1332",
    description:
      "Federal jurisdiction for eminent domain and land condemnation proceedings under diversity jurisdiction",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  230: {
    title: "Rent, Lease & Ejectment",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for ejectment, eviction, and disputes over rent and lease obligations",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  245: {
    title: "Tort Product Liability",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for tort-based product liability claims involving design and manufacturing defects",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  315: {
    title: "Airplane Product Liability",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for product liability claims arising from aircraft and aviation products",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  330: {
    title: "Federal Employers' Liability",
    usc: "45 U.S.C. § 51",
    description:
      "Federal question jurisdiction over railroad employee injury claims under the Federal Employers' Liability Act",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title45/html/USCODE-2023-title45-chap2-sec51.htm",
  },
  345: {
    title: "Marine Product Liability",
    usc: "28 U.S.C. § 1333",
    description:
      "Federal maritime jurisdiction for product liability claims involving marine vessels and equipment",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1333.htm",
  },
  355: {
    title: "Motor Vehicle Product Liability",
    usc: "28 U.S.C. § 1332",
    description:
      "Diversity jurisdiction for product liability claims arising from motor vehicles and automotive products",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1332.htm",
  },
  375: {
    title: "False Claims Act",
    usc: "31 U.S.C. § 3729",
    description:
      "Federal question jurisdiction for civil False Claims Act cases involving fraud against the government",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title31/html/USCODE-2023-title31-subtitleIII-chap37-subchapIII-sec3729.htm",
  },
  376: {
    title: "Qui Tam",
    usc: "31 U.S.C. § 3730",
    description:
      "Federal question jurisdiction for qui tam actions brought under the False Claims Act by private whistleblowers",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title31/html/USCODE-2023-title31-subtitleIII-chap37-subchapIII-sec3730.htm",
  },
  465: {
    title: "Other Immigration Actions",
    usc: "8 U.S.C. § 1101",
    description:
      "Federal question jurisdiction for immigration matters not covered by specific removal or naturalization statutes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title8/html/USCODE-2023-title8-chap12-subchapI-sec1101.htm",
  },
  485: {
    title: "Telephone Consumer Protection Act",
    usc: "47 U.S.C. § 227",
    description:
      "Federal question jurisdiction for TCPA claims involving telemarketing calls, faxes, and text messages",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title47/html/USCODE-2023-title47-chap5-subchapII-partI-sec227.htm",
  },
  555: {
    title: "Prison Conditions",
    usc: "42 U.S.C. § 1983",
    description:
      "Federal question jurisdiction for prisoner civil rights claims regarding conditions of confinement under Section 1983",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap21-subchapI-sec1983.htm",
  },
  400: {
    title: "State Reapportionment",
    usc: "28 U.S.C. § 1342",
    description:
      "Federal jurisdiction over constitutional challenges to state legislative reapportionment and redistricting",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1342.htm",
  },
  410: {
    title: "Antitrust",
    usc: "15 U.S.C. § 1",
    description:
      "Federal question jurisdiction for Sherman Act and antitrust violations involving restraint of trade and monopolies",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title15/html/USCODE-2023-title15-chap1-sec1.htm",
  },
  422: {
    title: "Bankruptcy Appeal",
    usc: "28 U.S.C. § 1334",
    description:
      "Federal jurisdiction over appeals from bankruptcy court decisions and bankruptcy proceedings",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1334.htm",
  },
  423: {
    title: "Withdrawal of Reference",
    usc: "28 U.S.C. § 157",
    description:
      "Federal jurisdiction over withdrawal of bankruptcy proceedings from bankruptcy court to district court",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partI-chap8-sec157.htm",
  },
  430: {
    title: "Banks and Banking",
    usc: "12 U.S.C. § 24",
    description:
      "Federal regulation and jurisdiction over national bank operations, powers, and banking activities",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title12/html/USCODE-2023-title12-chap2-sec24.htm",
  },
  444: {
    title: "Welfare",
    usc: "42 U.S.C. § 601",
    description:
      "Federal question jurisdiction for welfare and public assistance benefit disputes and denials",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap7-subchapIV-sec601.htm",
  },
  450: {
    title: "Commerce/Interstate",
    usc: "28 U.S.C. § 1337",
    description:
      "Federal jurisdiction over actions arising under federal interstate commerce and regulatory statutes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1337.htm",
  },
  460: {
    title: "Deportation",
    usc: "8 U.S.C. § 1227",
    description:
      "Federal jurisdiction over deportation and removal proceedings for aliens from the United States",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title8/html/USCODE-2023-title8-chap12-subchapII-partIV-sec1227.htm",
  },
  462: {
    title: "Naturalization",
    usc: "8 U.S.C. § 1422",
    description:
      "Federal jurisdiction over naturalization proceedings and citizenship application cases",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title8/html/USCODE-2023-title8-chap12-subchapIII-partI-sec1422.htm",
  },
  463: {
    title: "Habeas Corpus - Alien Detainee",
    usc: "28 U.S.C. § 2241",
    description:
      "Federal jurisdiction for habeas corpus petitions by alien detainees challenging unlawful detention",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partII-chap153-sec2241.htm",
  },
  470: {
    title: "RICO",
    usc: "18 U.S.C. § 1961",
    description:
      "Federal question jurisdiction for Racketeer Influenced and Corrupt Organizations Act claims involving patterns of racketeering",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title18/html/USCODE-2023-title18-partI-chap96-sec1961.htm",
  },
  480: {
    title: "Consumer Credit",
    usc: "15 U.S.C. § 1601",
    description:
      "Federal question jurisdiction for consumer credit protection and lending law claims",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title15/html/USCODE-2023-title15-chap41-subchapI-sec1601.htm",
  },
  490: {
    title: "Cable/Satellite TV",
    usc: "47 U.S.C. § 521",
    description:
      "Federal jurisdiction over cable television and satellite television regulation and rate disputes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title47/html/USCODE-2023-title47-chap5-subchapV-partI-sec521.htm",
  },
  510: {
    title: "Prisoner Petition - Motions to Vacate",
    usc: "28 U.S.C. § 2255",
    description:
      "Federal jurisdiction for prisoner motions to vacate sentence and challenge unlawful convictions",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partII-chap154-sec2255.htm",
  },
  530: {
    title: "Habeas Corpus - General",
    usc: "28 U.S.C. § 2241",
    description:
      "Federal jurisdiction for general habeas corpus petitions challenging unlawful detention",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partII-chap153-sec2241.htm",
  },
  535: {
    title: "Habeas Corpus - Death Penalty",
    usc: "28 U.S.C. § 2254",
    description:
      "Federal jurisdiction for death penalty habeas corpus petitions from state prisoners challenging constitutional violations",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partII-chap153-sec2254.htm",
  },
  540: {
    title: "Mandamus & Other",
    usc: "28 U.S.C. § 1361",
    description:
      "Federal jurisdiction for mandamus petitions and other remedies against federal officers for non-discretionary duties",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1361.htm",
  },
  550: {
    title: "Civil Rights (prisoner)",
    usc: "42 U.S.C. § 1983",
    description:
      "Federal question jurisdiction for prisoner civil rights claims under Section 1983 for deprivation of constitutional rights",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap21-subchapI-sec1983.htm",
  },
  751: {
    title: "Family and Medical Leave Act",
    usc: "29 U.S.C. § 2601",
    description:
      "Federal question jurisdiction for FMLA claims involving unpaid job-protected leave for family and medical purposes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap28-sec2601.htm",
  },
  790: {
    title: "Other Labor Litigation",
    usc: "29 U.S.C. § 1",
    description:
      "Federal question jurisdiction for miscellaneous labor law disputes not covered by specific statutes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap1-sec1.htm",
  },
  810: {
    title: "Selective Service",
    usc: "50 U.S.C. § 3801",
    description:
      "Federal jurisdiction over selective service and military draft registration disputes and challenges",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title50/html/USCODE-2023-title50-chap49-sec3801.htm",
  },
  862: {
    title: "Social Security - Black Lung",
    usc: "30 U.S.C. § 901",
    description:
      "Federal jurisdiction for Black Lung Benefits Act claims for coal miners with occupational lung disease",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title30/html/USCODE-2023-title30-chap22-sec901.htm",
  },
  865: {
    title: "Social Security - RSI",
    usc: "42 U.S.C. § 401",
    description:
      "Federal jurisdiction for Retirement and Survivors Insurance claims under Social Security",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap7-subchapII-sec401.htm",
  },
  890: {
    title: "Other Statutory Actions",
    usc: "28 U.S.C. § 1331",
    description:
      "Federal question jurisdiction for civil actions arising under federal statutes not otherwise classified",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1331.htm",
  },
  891: {
    title: "Agricultural Acts",
    usc: "7 U.S.C. § 1281",
    description:
      "Federal question jurisdiction for agricultural law disputes involving farming, crop insurance, and agricultural regulations",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title7/html/USCODE-2023-title7-chap33-sec1281.htm",
  },
  893: {
    title: "Environmental Matters",
    usc: "42 U.S.C. § 4321",
    description:
      "Federal question jurisdiction for environmental law claims under NEPA and other environmental statutes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap55-sec4321.htm",
  },
  895: {
    title: "Freedom of Information Act",
    usc: "5 U.S.C. § 552",
    description:
      "Federal question jurisdiction for FOIA requests and disputes regarding public access to government records",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title5/html/USCODE-2023-title5-partI-chap5-subchapII-sec552.htm",
  },
  896: {
    title: "Arbitration",
    usc: "9 U.S.C. § 1",
    description:
      "Federal Arbitration Act jurisdiction for enforcement of arbitration agreements and arbitration disputes",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title9/html/USCODE-2023-title9-chap1-sec1.htm",
  },
  899: {
    title: "Admin Procedure Act/Review",
    usc: "5 U.S.C. § 702",
    description:
      "Federal question jurisdiction for judicial review of federal agency actions and administrative decisions",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title5/html/USCODE-2023-title5-partI-chap7-sec702.htm",
  },
  950: {
    title: "Constitutionality of State Statutes",
    usc: "28 U.S.C. § 1331",
    description:
      "Federal question jurisdiction for constitutional challenges to state statutes and laws",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title28/html/USCODE-2023-title28-partIV-chap85-sec1331.htm",
  },
};
