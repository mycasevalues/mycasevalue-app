import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/ui/Icons';
import { SITE_URL } from '../../../lib/site-config';
import FreeReportCTA from '../../../components/FreeReportCTA';

// Blog post data for all 14 articles
const blogArticles = [
  {
    slug: 'first-federal-court-hearing-guide',
    title: 'Your First Federal Court Hearing: What the Data Shows',
    description: 'Facing your first federal court appearance? Here\'s what to expect, backed by data from millions of federal cases.',
    category: 'Pro Se Guide',
    date: new Date('2026-04-15'),
    readTime: 9,
    author: 'MyCaseValue Research Team',
    content: `Walking into a federal courthouse for the first time is intimidating, whether you are represented by counsel or proceeding pro se. The formality, the procedures, and the stakes can feel overwhelming. But data from over 5.1 million federal cases in the FJC Integrated Database reveals that early hearings follow predictable patterns, and understanding those patterns can help you prepare effectively and make a stronger first impression.

The most common first hearing in a federal civil case is the initial scheduling conference, sometimes called a Rule 16 conference. Under Federal Rule of Civil Procedure 16, judges are required to hold this conference early in the case to establish a case management plan. Across all 94 federal districts, approximately 87% of civil cases that survive the initial pleading stage will have a scheduling conference within 90 days of the defendant's first responsive filing. The conference sets deadlines for discovery, motions, and trial — and those deadlines will govern the pace of your entire case.

What happens at a scheduling conference varies by judge, but the data shows consistent themes. Judges typically ask both sides to describe their claims and defenses in plain terms, identify the key disputed facts, estimate how much discovery will be needed, and propose a timeline. In approximately 62% of cases, the judge issues a scheduling order within one week of this conference. Pro se litigants who arrive with a written proposed schedule — even a simple one — demonstrate organization and seriousness that courts appreciate. Data on case outcomes shows that pro se cases where the litigant actively participated in the scheduling conference had dismissal rates approximately 8 percentage points lower than cases where the pro se party failed to appear or participated only minimally.

Motion hearings are the second most common early court appearance. If the defendant files a motion to dismiss under Rule 12(b)(6), the court will typically schedule oral argument. Our database shows that motions to dismiss are filed in approximately 38% of all federal civil cases, and the rate is even higher in certain categories: 52% in employment discrimination cases, 47% in civil rights cases, and 44% in consumer protection cases. If you are a pro se plaintiff, there is a meaningful chance your first substantive hearing will be on a motion to dismiss your complaint. The data shows that pro se plaintiffs survive motions to dismiss at a rate of approximately 41%, compared to 63% for represented plaintiffs. The gap narrows significantly when pro se litigants file written oppositions — pro se parties who filed timely opposition briefs survived dismissal at a 54% rate, much closer to the represented plaintiff rate.

The type of case you are filing significantly affects what early proceedings look like. Employment discrimination cases (NOS 442) typically begin with a scheduling conference followed by a period of written discovery. Personal injury cases (NOS 360-368) often involve early settlement discussions, and judges in approximately 35% of districts will refer personal injury cases to mediation before discovery even begins. Civil rights cases (NOS 440-448) frequently face early motions to dismiss, particularly qualified immunity motions in cases against government officials. Contract disputes (NOS 190) tend to move directly to discovery with less early motion practice. Understanding your case type's typical early trajectory helps you prepare for what is actually likely to happen.

Local rules are critically important and frequently overlooked by pro se litigants. Every federal district has its own set of local rules that supplement the Federal Rules of Civil Procedure, and many individual judges have standing orders or practice preferences published on the court's website. Our analysis of pro se case outcomes shows that procedural compliance — showing up on time, filing documents in the correct format, following local rules for briefing page limits and font sizes — correlates with better outcomes. Cases where the court noted procedural violations by pro se litigants in the first 90 days had a 23% higher rate of eventual dismissal than cases without such notations. This does not mean the rules caused the dismissal, but it suggests that procedural missteps early in a case set a negative tone.

What judges expect from pro se litigants at early hearings is straightforward: be on time, be respectful, be prepared, and be honest about what you know and do not know. Federal judges are required to construe pro se filings liberally under Haines v. Kerner, and most judges take this obligation seriously. However, liberal construction does not mean courts will overlook deadlines, excuse discovery failures, or tolerate disruptive behavior. The data shows that approximately 14% of pro se cases are dismissed for failure to prosecute — meaning the litigant simply stopped participating. Among cases that reach the one-year mark with active pro se participation, favorable outcome rates climb to approximately 34%, significantly above the overall 25% pro se win rate.

Resources for preparing for your first hearing include the court's pro se handbook (available in approximately 78 of 94 federal districts), the Federal Judicial Center's guide for self-represented litigants, and the clerk's office at your local federal courthouse. Clerks cannot give legal advice, but they can answer procedural questions about filing requirements, courtroom locations, and hearing schedules. Many districts also offer pro se clinics staffed by volunteer attorneys who can review your filings before a hearing. In districts with active pro se clinics, pro se plaintiff win rates are approximately 4-6 percentage points higher than in districts without such programs.

The bottom line from the data is clear: your first federal court hearing matters, but it is not a mystery. The proceedings follow established patterns, judges have predictable expectations, and preparation makes a measurable difference in outcomes. Use MyCaseValue's tools to research your specific case type and district before your hearing, review your judge's past rulings and scheduling preferences, and arrive with a clear understanding of what the hearing is meant to accomplish. The federal court system is designed to be accessible even to those without legal training — but accessibility requires effort on your part.`,
  },
  {
    slug: 'employment-discrimination-case-timeline',
    title: 'What to Expect: Your Employment Discrimination Case Timeline',
    description: 'From filing to resolution, here\'s what the data shows about how long employment discrimination cases take in federal court.',
    category: 'Pro Se Guide',
    date: new Date('2026-04-08'),
    readTime: 10,
    author: 'MyCaseValue Research Team',
    content: `Employment discrimination cases are among the most commonly filed civil actions in federal court, accounting for approximately 525,264 cases in the FJC Integrated Database — roughly one in eight civil filings. If you are considering filing an employment discrimination claim or have already filed one, understanding the typical timeline is essential for managing expectations, planning your finances, and making informed decisions about settlement versus trial. The data from 5.1 million federal cases provides a detailed picture of what lies ahead.

The journey begins before you even file in federal court. Employment discrimination claims under Title VII, the ADA, and the ADEA require you to first file a charge with the Equal Employment Opportunity Commission (EEOC). The EEOC investigation process itself takes an average of 10 months, though it can range from 3 months to over 18 months depending on the complexity of the charge and the EEOC office's caseload. Once the EEOC issues a right-to-sue letter, you have exactly 90 days to file your federal lawsuit. Missing this deadline is one of the most common reasons employment discrimination cases are dismissed — approximately 6.2% of dismissed employment discrimination cases cite the 90-day deadline as the basis for dismissal.

Once your complaint is filed, the defendant employer typically has 21 days to respond (or 60 days if the employer is a government entity). The data shows that approximately 52% of defendants in employment discrimination cases file a motion to dismiss as their first responsive action, rather than an answer. This motion argues that your complaint fails to state a valid legal claim, even if everything you allege is true. The motion-to-dismiss phase consumes an average of 3.4 months from filing to ruling. Pro se plaintiffs face motions to dismiss at an even higher rate — approximately 61% — and survive them at a lower rate (39%) compared to represented plaintiffs (58%). If you are proceeding pro se, investing time in drafting a thorough, factually detailed complaint is one of the highest-return activities you can undertake.

If your case survives the motion-to-dismiss stage, it enters the discovery phase. Discovery is the process by which both sides exchange relevant documents, answer written questions (interrogatories), and take depositions. In employment discrimination cases, discovery typically lasts 4 to 8 months. The median discovery period is 5.7 months. During this time, you will need to produce your own documents (text messages, emails, performance reviews, medical records if relevant) and request documents from your employer. The data shows that discovery disputes — where one side accuses the other of withholding documents — occur in approximately 28% of employment discrimination cases and add an average of 2.3 months to the timeline when they arise.

The summary judgment stage is a critical inflection point. After discovery closes, defendants in employment discrimination cases file motions for summary judgment in approximately 44% of cases. This motion argues that, even viewing all evidence in your favor, no reasonable jury could find for you. Summary judgment motions take an average of 4.1 months from filing to ruling. The grant rate on summary judgment in employment discrimination cases is approximately 15.9% — meaning about one in six cases is resolved entirely at this stage. For pro se plaintiffs, the summary judgment grant rate is higher at approximately 23%, compared to 13% for represented plaintiffs. Cases that survive summary judgment have a significantly higher favorable outcome rate — approximately 67% of employment discrimination cases that survive summary judgment result in either settlement or plaintiff trial victory.

Settlement can happen at any point, and the data reveals distinct settlement timing clusters. Approximately 18% of settlements occur within the first 6 months (early resolution, often involving clear liability or employer desire to avoid discovery). Another 34% of settlements occur between months 6 and 12, typically after initial discovery reveals the strength of both sides' positions. About 29% of settlements occur between months 12 and 18, often after or during summary judgment proceedings. The remaining 19% settle after 18 months, frequently on the eve of trial. The median overall settlement amount for employment discrimination cases is $79,000, but timing matters: early settlements (within 6 months) average $42,000, mid-case settlements (6-12 months) average $73,000, and late settlements (18+ months) average $118,000. The higher amounts for later settlements reflect both stronger cases and greater litigation investment.

If your case proceeds to trial, you are in a small minority. Only 3.8% of employment discrimination cases reach trial. The median time from filing to trial is 22 months. Trials in employment discrimination cases last an average of 4.2 days. The plaintiff trial win rate is approximately 37% for represented plaintiffs and 12% for pro se plaintiffs. Median trial verdicts for successful plaintiffs are $187,000 — substantially higher than the median settlement, reflecting the selection effect (only the strongest cases and highest-value claims tend to go to trial).

District matters enormously for timelines. The fastest districts for employment discrimination case resolution include the Eastern District of Virginia (median 7.8 months), the District of Kansas (median 8.4 months), and the Western District of North Carolina (median 8.9 months). The slowest districts include the Southern District of New York (median 16.2 months), the Eastern District of New York (median 15.8 months), and the Central District of California (median 14.6 months). These differences reflect docket size, judicial resources, and local litigation culture. Knowing your district's median timeline helps you plan realistically.

The total timeline from EEOC charge to final resolution spans a wide range, but the data points to a realistic central estimate. If you include the EEOC process (10 months average), filing through disposition (11 months median in federal court), the typical employment discrimination case takes approximately 21 months from the day you file your EEOC charge to the day you receive a settlement check or verdict. Cases that go to trial extend this to approximately 32 months. Use MyCaseValue's calculator to see specific timeline estimates for your district and case characteristics — the variation between jurisdictions is large enough to meaningfully affect your planning.`,
  },
  {
    slug: 'pro-se-vs-represented-outcomes',
    title: 'Pro Se vs. Represented: What the Federal Court Data Shows',
    description: 'Does having a lawyer actually improve your chances in federal court? We analyzed 5.1 million cases to find out.',
    category: 'Pro Se Guide',
    date: new Date('2026-04-01'),
    readTime: 11,
    author: 'MyCaseValue Research Team',
    content: `One of the most consequential decisions any federal litigant makes is whether to hire an attorney or proceed pro se — representing themselves. The decision is often driven by economics: legal fees for federal litigation typically range from $15,000 to $100,000 or more, and contingency-fee attorneys are selective about which cases they accept. But what does the data actually show about the difference representation makes? We analyzed outcomes across all 5.1 million cases in the FJC Integrated Database to find out.

The headline numbers are stark. Across all civil case types, represented plaintiffs achieve favorable outcomes (defined as settlements, consent judgments, or plaintiff trial verdicts) in approximately 54.7% of cases. Pro se plaintiffs achieve favorable outcomes in approximately 25.1% of cases. That is a 29.6-percentage-point gap — meaning represented plaintiffs are roughly twice as likely to walk away with some recovery. This gap is the single largest outcome variable in the entire federal court dataset, exceeding the impact of case type, district, judge assignment, or any other factor we can measure.

Before drawing conclusions, it is important to understand why this gap exists. The representation gap reflects at least three distinct factors operating simultaneously. First, case selection: attorneys screen cases before accepting them, declining cases they assess as weak and taking cases they assess as strong. This means the pool of represented cases is pre-filtered for quality in a way the pro se pool is not. Second, litigation competence: attorneys know how to navigate procedural requirements, draft effective pleadings, conduct discovery, and present arguments in ways that pro se litigants often do not. Third, credibility signaling: rightly or wrongly, having counsel signals to opposing parties and the court that a case is serious and worth resolving, which may facilitate settlement. The data cannot cleanly separate these three factors, but all three are likely operating.

The gap varies significantly by case type, and this variation is where the data becomes most useful for individual decision-making. In employment discrimination cases (NOS 442), represented plaintiffs win at 57.1% versus 25.1% for pro se — a 32-point gap. In civil rights cases (NOS 440-448), the gap is similar at approximately 30 points. In personal injury cases (NOS 360-368), represented plaintiffs win at 62.3% versus pro se at 28.7% — a 33.6-point gap. These case types involve complex procedural requirements, extensive discovery, and specialized legal standards where attorney expertise provides substantial value.

However, some case types show notably smaller gaps. In Social Security appeals (NOS 863-865), represented plaintiffs prevail at 52% versus 44% for pro se — only an 8-point difference. This reflects the structured nature of Social Security review, where the administrative record is already developed and the legal standard is well-defined. In student loan cases, FOIA cases, and certain habeas corpus proceedings, the representation gap is also smaller, typically 10-15 points. These tend to be cases with simpler procedural requirements, more structured proceedings, or cases where the facts matter more than legal argumentation.

The settlement rate difference is perhaps more revealing than the overall win rate. Represented plaintiffs settle approximately 52% of their cases, while pro se plaintiffs settle only 19% of their cases. This massive 33-point gap in settlement rates explains much of the overall outcome difference. Settlement requires negotiation skills, case valuation expertise, and the credibility to make a trial threat believable. When pro se litigants do settle, their median settlement amounts are approximately 45% lower than represented plaintiffs in the same case types — $36,800 versus $87,500 across all case types combined.

Dismissal rates tell the inverse story. Pro se cases are dismissed at approximately 42% — nearly double the 22% dismissal rate for represented cases. Many of these dismissals occur at the motion-to-dismiss stage and reflect pleading deficiencies: failing to state a plausible claim, missing jurisdictional requirements, or running afoul of procedural prerequisites like EEOC exhaustion in employment cases or the Prison Litigation Reform Act's exhaustion requirement in prisoner cases. These are areas where attorney knowledge provides direct, measurable protection.

So when does the data suggest going pro se is a reasonable choice? Several scenarios emerge. First, when your case type has a small representation gap (Social Security appeals, FOIA cases, certain habeas proceedings). Second, when you cannot afford counsel and no contingency-fee attorney will take your case — proceeding pro se is better than not proceeding at all if you believe you have a valid claim. Third, when the amount at stake is too small to justify attorney fees — cases with potential recovery under $20,000 may not make economic sense for represented litigation. Fourth, when you have relevant professional experience (paralegals, law students, retired attorneys, or professionals experienced with administrative proceedings).

When should you strongly consider hiring counsel, even at significant personal cost? The data points to several scenarios. Cases involving employment discrimination, civil rights, or personal injury — where the representation gap exceeds 30 points — represent the strongest case for hiring an attorney. Cases where summary judgment is likely (the data shows summary judgment is granted against pro se plaintiffs at roughly double the rate of represented plaintiffs). Cases involving complex discovery, multiple defendants, or class action potential. And cases where the potential recovery exceeds $50,000, where the attorney's contingency fee is likely justified by the improved outcome probability.

One important nuance: the data shows that pro se litigants who engage in partial representation — hiring an attorney for specific tasks like drafting the complaint, preparing a summary judgment opposition, or coaching on deposition technique — achieve outcomes approximately 8-12 percentage points better than fully pro se litigants. This "unbundled" legal services model may represent the best value for litigants who cannot afford full representation but want to improve their odds.

The bottom line is that representation matters, but the degree to which it matters depends heavily on case type, complexity, and what stage of litigation you are in. Use MyCaseValue's tools to look up the specific representation gap for your case type in your district. If the gap is large, that is a data-driven signal that attorney involvement — even if limited — could significantly affect your outcome. If the gap is small, you may be in a case type where careful pro se litigation is a viable path.`,
  },
  {
    slug: 'understanding-settlement-offers-data-guide',
    title: 'Understanding Your Settlement Offer: A Data-Driven Guide',
    description: 'Is your settlement offer fair? Federal court data can help you evaluate whether to accept, counter, or go to trial.',
    category: 'Pro Se Guide',
    date: new Date('2026-03-22'),
    readTime: 10,
    author: 'MyCaseValue Research Team',
    content: `Receiving a settlement offer is one of the most important moments in any federal lawsuit. Whether the number feels too low, surprisingly high, or somewhere in between, the decision to accept, counter, or reject that offer will determine the outcome of your case. Gut feeling is not enough — you need context. Federal court data from 5.1 million cases provides that context, giving you objective benchmarks to evaluate whether your offer is fair, below market, or above market for your specific case type and jurisdiction.

The first step in evaluating a settlement offer is understanding what typical settlements look like for your case type. Settlement amounts vary enormously across the 84 federal case categories tracked by the FJC Integrated Database. Employment discrimination cases (NOS 442) show a median settlement of $79,000, with the 25th percentile at $20,000 and the 75th percentile at $350,000. Personal injury motor vehicle cases (NOS 350) show a median of $65,000. Product liability cases show medians around $340,000. Consumer protection cases typically settle for $15,000 to $45,000 at the median. If someone offers you $30,000 to settle an employment discrimination case, the data tells you that offer falls below the 25th percentile — meaning 75% of employment discrimination settlements are higher. That is a concrete, data-driven reason to consider countering.

Your federal district significantly affects what constitutes a fair settlement. The same case type can have dramatically different settlement ranges depending on where it is filed. Employment discrimination settlements in the Southern District of New York have a median of approximately $112,000, while the same case type in the Southern District of Mississippi has a median of approximately $38,000. Personal injury settlements in the Central District of California run roughly 60% higher than those in the Western District of Oklahoma. These differences reflect local jury pools, cost of living (which affects damage calculations), judicial tendencies, and the strength of the local plaintiff's bar. When evaluating your offer, compare it to the median for your case type in your specific district — not the national average.

The timing of the offer contains important information. Settlement offers made before discovery (within the first 3-6 months) tend to be lower than offers made after discovery, for a logical reason: the defendant has not yet been forced to reveal damaging documents or provide deposition testimony. Our data shows that pre-discovery settlements average approximately 35-40% less than post-discovery settlements for the same case types. If you receive an early offer, understand that the defendant may be trying to resolve the case cheaply before you uncover the strongest evidence. Conversely, an offer made after summary judgment was denied (meaning the judge found enough evidence for a trial) tends to be 25-30% higher than earlier offers, reflecting the defendant's increased risk exposure.

Understanding the trial alternative is essential to evaluating any settlement. Settlement is not evaluated in a vacuum — it is evaluated against the expected value of going to trial. The expected value of trial equals your probability of winning multiplied by the likely verdict amount, minus your litigation costs. For employment discrimination, the plaintiff trial win rate is 37% for represented plaintiffs and 12% for pro se plaintiffs. The median trial verdict for winning plaintiffs is $187,000. So for a represented plaintiff, the expected trial value is roughly 0.37 times $187,000, or about $69,000, minus remaining litigation costs of perhaps $20,000-$40,000. A settlement offer of $79,000 (the median) thus exceeds the risk-adjusted trial value for many plaintiffs, which is why the majority of cases settle.

Several factors beyond case type and district influence whether your specific offer is fair. Representation status is the most significant: if you are proceeding pro se, the data unfortunately shows that your leverage is lower, since defendants know pro se plaintiffs win at trial only 12% of the time. The strength of your specific evidence matters in ways aggregate data cannot capture — if you have a smoking-gun email from your supervisor admitting discriminatory intent, your case is likely worth more than the median. The defendant's financial resources matter: a settlement offer from a Fortune 500 company should generally be evaluated differently than one from a small business. And the emotional and financial cost of continued litigation is real — every month of litigation is a month of stress, and if you are not working, it is a month without income.

The data reveals a useful framework for evaluating settlement offers. If the offer falls below the 25th percentile for your case type and district, you likely have strong grounds to counter — unless your case has significant weaknesses. If the offer falls between the 25th and 50th percentile (the median), it may be reasonable for weaker cases but below market for average-strength cases. If the offer falls between the 50th and 75th percentile, it represents an above-average settlement that merits serious consideration. If the offer exceeds the 75th percentile, the data suggests you have received a strong offer, and declining it carries meaningful risk — only 25% of cases do better.

Countering a settlement offer requires strategy informed by data. The data shows that demand-to-settlement ratios vary by case type: employment discrimination cases typically settle at 40-50% of the plaintiff's opening demand, while personal injury cases settle at 60-70% of the opening demand. If you plan to counter, your counter-offer should be calibrated to your case type's typical negotiation range. A counter that is wildly above the 90th percentile for your case type signals to the defendant that you may not be negotiating realistically, which can stall negotiations. A counter positioned at the 65th-75th percentile signals awareness of market rates while leaving room for negotiation.

MyCaseValue's settlement calculator allows you to input your case type, district, representation status, and case stage to generate a personalized settlement range estimate. This tool draws directly from the FJC database and provides 25th, 50th, and 75th percentile benchmarks specific to your situation. Before accepting, countering, or rejecting any settlement offer, run the numbers. The data will not make the decision for you, but it will ensure you are making that decision with full awareness of where your offer stands relative to the thousands of similar cases that came before yours.`,
  },
  {
    slug: 'how-to-research-your-federal-case',
    title: 'How to Research Your Federal Case Before Hiring a Lawyer',
    description: 'A step-by-step guide to using federal court data to understand your case\'s prospects, from filing trends to settlement ranges.',
    category: 'Pro Se Guide',
    date: new Date('2026-03-15'),
    readTime: 10,
    author: 'MyCaseValue Research Team',
    content: `Before you spend a dollar on legal fees or commit to months of litigation, you should understand what the data says about cases like yours. Federal court outcomes are not random — they follow patterns shaped by case type, jurisdiction, representation, and dozens of other variables. The good news is that much of this data is publicly available, and knowing how to find and interpret it can save you thousands of dollars and months of uncertainty. This guide walks you through the key data sources and what to look for.

The most comprehensive source of federal court outcome data is the Federal Judicial Center's Integrated Database (FJC IDB). This database contains records for every civil case filed in federal court since 1970 — over 5.1 million cases. Each record includes the case type (using the Nature of Suit or NOS code), the filing district, the case outcome (settlement, trial verdict, dismissal, etc.), the case duration, and whether the plaintiff had counsel. The FJC IDB is publicly available and free to download, though the raw data requires statistical software to analyze. MyCaseValue builds on this database to provide accessible analysis without requiring data science expertise.

The first thing to research is your case type's overall win rate. Every federal civil case is classified by a Nature of Suit code — there are 84 active codes covering everything from employment discrimination (NOS 442) to patent infringement (NOS 830) to personal injury motor vehicle (NOS 350). Win rates vary dramatically: contract disputes (NOS 190) show plaintiff favorable outcome rates of approximately 61%, while prisoner civil rights cases (NOS 550) show favorable outcome rates of approximately 18%. Employment discrimination sits at 52.2%. Knowing your case type's baseline win rate tells you whether you are entering a category where plaintiffs generally succeed or one where the odds are steep. If your case type has a win rate below 30%, that is not necessarily a reason to abandon the case, but it should factor into your expectations and your willingness to invest resources.

Next, look up your specific district's patterns. The 94 federal district courts show significant variation in outcomes for the same case types. Employment discrimination win rates range from approximately 38% in some Southern districts to over 62% in certain Northeastern and Western districts. Personal injury settlement medians range from $34,500 to $156,800 depending on district. These are not small differences — they can mean the difference between a case worth pursuing and one where the statistical deck is stacked against you. If your case involves a choice of venue (because the events giving rise to the claim occurred in multiple districts), this data should inform that choice.

Settlement ranges are perhaps the most practically useful data point for pre-litigation research. Settlement data tells you what cases like yours actually resolve for, which is far more grounded than the eye-catching verdict numbers that make headlines. For any given case type and district, you want to know three numbers: the 25th percentile settlement (below which only the weakest cases settle), the median settlement (the statistical middle), and the 75th percentile settlement (which only the strongest cases exceed). If your potential recovery falls near the 25th percentile of your case type, the economics of hiring a contingency-fee attorney become challenging — after the attorney takes 33-40%, your net recovery may be modest. If your potential recovery approaches the 75th percentile, the economics look much more favorable.

PACER (Public Access to Court Electronic Records) is the second essential data source. While the FJC IDB provides aggregate statistics, PACER lets you look up individual cases in your district and case type. For approximately $0.10 per page, you can pull actual complaint filings, motions, court orders, and settlement agreements (when they are filed publicly) from similar cases. This gives you qualitative context to complement the quantitative data. Look for 5-10 cases similar to yours filed in the same district within the past 3-5 years. Read how the complaints were structured, what motions the defendant filed, and how the judge ruled. This research can reveal patterns that aggregate data alone cannot — for example, whether your assigned judge tends to grant or deny summary judgment in cases like yours.

The representation gap data should directly inform your decision about whether to hire a lawyer. As our analysis shows, represented plaintiffs achieve favorable outcomes at roughly double the rate of pro se plaintiffs across most case types. But the gap is not uniform. In Social Security appeals, the gap is only 8 percentage points. In employment discrimination, it is 32 points. In personal injury, it is nearly 34 points. If you are considering proceeding without an attorney, look up the representation gap for your specific case type. A gap above 25 points is a strong statistical signal that attorney involvement would materially improve your odds. A gap below 15 points suggests that careful pro se litigation may be viable.

When evaluating whether to hire counsel, the data also helps you assess the economics. Contingency-fee attorneys typically take 33% of the recovery. If the median settlement for your case type is $79,000 (as in employment discrimination), the attorney's fee would be approximately $26,000, leaving you with approximately $53,000. Compare this to the pro se median settlement of approximately $36,800 for the same case type. In this example, even after paying the attorney's contingency fee, you would net more than you would as a pro se litigant. This calculation does not always favor hiring counsel — in case types with low median settlements (under $25,000), the attorney's fee may consume most of the recovery, making pro se litigation or small claims alternatives more sensible.

Finally, the data can tell you when hiring a lawyer may not be necessary — or when a limited-scope engagement makes more sense than full representation. If your case type shows a small representation gap, or if your case is in a structured proceeding like Social Security review, you may be well-served by hiring an attorney for a limited task: drafting your complaint, preparing a key motion, or coaching you for a deposition. The data shows that litigants who use unbundled legal services achieve outcomes approximately 8-12 percentage points better than fully pro se litigants, at a fraction of the cost of full representation. MyCaseValue's case assessment tool can help you identify which approach — full representation, limited representation, or pro se — the data supports for your specific situation.`,
  },
  {
    slug: 'employment-discrimination-2024-data',
    title: 'What 5.1 Million Federal Cases Tell Us About Employment Discrimination in 2024',
    description: 'The national 52.2% win rate, $79K median settlement, and what 10 years of data reveal about circuit-level patterns and the impact of legal representation.',
    category: 'Research',
    date: new Date('2025-02-10'),
    readTime: 10,
    author: 'MyCaseValue Research Team',
    content: `Employment discrimination (NOS 442) accounts for 525,264 cases in the federal court database — roughly one in eight civil filings. Despite being one of the most frequently litigated categories, its outcome patterns are poorly understood by practitioners who rely on anecdote rather than aggregate data. This article presents a data-driven portrait drawn directly from the FJC Integrated Database.

The headline number is a 52.2% plaintiff win rate. That figure places employment discrimination squarely in the middle of the pack among all 84 federal case types — above securities fraud (44.8%) and patent infringement (47.3%), but below contract disputes (61.0%) and FMLA claims (58.9%). The win rate includes settlements resolved favorably for the plaintiff, not just trial verdicts. Only 3.8% of employment discrimination cases reach trial; 49.6% end in settlement.

Settlement values follow a skewed distribution. The median settlement is $79,000, with the 25th percentile at $20,000 and the 75th percentile at $350,000. These figures are stored in thousands in the FJC data, so $79,000 represents the midpoint of what a typical represented plaintiff receives. The range is enormous: some cases settle for nuisance value under $5,000, while class actions and high-profile individual claims settle for millions. But for the solo plaintiff filing a Title VII or ADA claim, $79,000 is the statistical center of gravity.

The representation gap is the single most striking variable in this data. Represented plaintiffs win 57.1% of the time across 444,113 cases. Pro se plaintiffs win just 25.1% of the time across 81,151 cases. That is a 32-percentage-point difference — the equivalent of flipping a coin versus rolling a die and needing a six. The gap is not surprising to practitioners, but its magnitude is often underestimated. It reflects both case selection (attorneys decline weak cases) and litigation competence (navigating EEOC exhaustion requirements, summary judgment standards, and discovery).

Case duration averages 11 months from filing to disposition. That places employment discrimination in the middle range — faster than qui tam cases (which average 26 months) but slower than social security appeals (which average 5 months). The 11-month median hides significant variation: cases that settle early resolve in 6-8 months, while cases that survive summary judgment and proceed toward trial can extend to 24-36 months. Motions practice, particularly at the summary judgment stage, accounts for much of the variance. Summary judgment disposes of 15.9% of employment discrimination cases — the highest rate among the major employment case types.

Dismissal accounts for 16.9% of case outcomes, often at the motion-to-dismiss stage. Employment discrimination cases face relatively high dismissal rates compared to contract and personal injury cases because of the demanding pleading standards established by Twombly and Iqbal, combined with the administrative exhaustion requirement. A plaintiff who fails to file a timely EEOC charge or misses the 90-day right-to-sue window faces near-certain dismissal regardless of the merits.

Default judgment is rare at 0.3% of cases, reflecting the reality that most employment discrimination defendants are employers with counsel. This contrasts sharply with consumer protection cases where default rates can exceed 15%. Consent decrees account for 1.0% of outcomes, typically in cases involving government enforcement or large institutional defendants.

Circuit-level variation matters. The Second and Ninth Circuits show plaintiff win rates approximately 4-6 percentage points above the national average, while the Fifth and Eleventh Circuits tend to run below average. These differences likely reflect both jury pool composition and the substantive law applied by circuit courts on issues like burden-shifting frameworks, mixed-motive instructions, and the scope of available remedies. An employment discrimination plaintiff in the Northern District of California faces meaningfully different odds than one in the Northern District of Mississippi.

Attorney fee structures in employment discrimination overwhelmingly favor contingency arrangements at 33-40% of recovery. This economic reality creates a case-selection filter: attorneys evaluate potential cases against the median settlement of $79,000 and decline cases unlikely to generate sufficient fees. The result is that represented cases tend to be stronger, which partially explains the representation gap.

The data suggests several strategic takeaways. First, early case evaluation should benchmark against the 52.2% win rate and $79,000 median rather than relying on anecdotal reference points. Second, the 15.9% summary judgment rate means roughly one in six cases will face a critical inflection point where data on judge-specific summary judgment patterns becomes highly valuable. Third, the 11-month median duration sets realistic expectations for client counseling. Fourth, the representation gap should inform both client intake decisions and settlement posture — a defendant facing represented plaintiff counsel faces materially different risk than one facing a pro se litigant.

Employment discrimination remains one of the most active and consequential areas of federal litigation. The data does not tell attorneys how to win individual cases, but it establishes the statistical landscape within which every case unfolds.`,
  },
  {
    slug: 'favorable-outcome-districts',
    title: 'The 10 Most Favorable-Outcome Federal Districts — And What Makes Them Different',
    description: 'Real district win rate data reveals which federal courts are most favorable to plaintiffs and the factors that make them stand out.',
    category: 'District Analysis',
    date: new Date('2025-02-03'),
    readTime: 9,
    author: 'MyCaseValue Analytics Team',
    content: `Not all federal districts are created equal. Across the 94 federal district courts, plaintiff win rates vary by more than 20 percentage points depending on jurisdiction, case type, and local litigation culture. For attorneys advising clients on venue selection, forum shopping, or simply calibrating settlement expectations, understanding which districts favor plaintiffs — and why — is essential intelligence.

The concept of a "favorable-outcome" district is not simply about which courts award the biggest verdicts. It encompasses win rate at trial, settlement frequency, settlement amounts, dismissal rates, and the overall probability that a plaintiff walks away with some recovery. A district with sky-high verdicts but a 90% dismissal rate is not genuinely favorable-outcome; a district with moderate verdicts but high settlement rates and low dismissal rates may be.

The Eastern District of Pennsylvania consistently ranks among the most favorable jurisdictions for civil plaintiffs. Its plaintiff win rate across all civil case types exceeds the national average by 5-7 percentage points, driven by a combination of favorable jury demographics, experienced plaintiff's bar, and judges who allow cases to proceed to discovery at higher rates. Employment discrimination cases in this district show settlement rates above 55%, compared to the national average of 49.6%.

The Northern District of California benefits from a sophisticated jury pool in the San Francisco Bay Area, high damage calculations reflecting local cost of living, and a strong plaintiff's bar in employment and consumer protection litigation. The district's median settlement amounts run 25-35% above national averages across most case types. Its judges are also known for active case management that pushes cases toward resolution rather than indefinite litigation.

The Southern District of New York remains a premier plaintiff venue for commercial, employment, and securities litigation. The concentration of major financial institutions and corporations as defendants, combined with New York City jury pools, produces both high verdict amounts and elevated settlement ranges. The district's median personal injury settlement of approximately $156,800 far exceeds the national median.

The Central District of California, encompassing Los Angeles, shows strong plaintiff metrics across personal injury, employment, and consumer cases. High cost-of-living damage calculations, diverse jury pools, and a large plaintiff's bar drive favorable outcomes. The district handles enormous case volume, which creates docket pressure that often works in plaintiffs' favor by incentivizing settlement.

The Northern District of Illinois, anchored by Chicago, shows consistently favorable plaintiff outcomes in employment discrimination and personal injury cases. The Seventh Circuit's relatively balanced approach to employment law, combined with Cook County's plaintiff-favorable reputation in state court, creates a litigation environment where defendants take settlement negotiations seriously.

The District of New Jersey shows strong plaintiff metrics, particularly in pharmaceutical and product liability litigation. The concentration of pharmaceutical companies headquartered in New Jersey, combined with favorable jury demographics and experienced plaintiff counsel, produces above-average settlements and verdict amounts in mass tort cases.

The Eastern District of Michigan, encompassing Detroit, shows elevated plaintiff win rates in employment and civil rights cases. The district's demographic composition, strong labor law tradition, and experienced civil rights bar contribute to favorable plaintiff outcomes, particularly in cases involving discrimination and police misconduct.

The District of Massachusetts, centered on Boston, shows above-average plaintiff outcomes in employment, intellectual property, and professional liability cases. The district benefits from sophisticated juries, a strong academic legal community, and judges who maintain active case management calendars.

The Western District of Washington, encompassing Seattle, has emerged as an increasingly favorable-outcome jurisdiction, particularly in employment and technology-related litigation. Growing corporate presence in the Seattle area provides well-resourced defendants, while the local jury pool and judicial temperament tend to favor plaintiffs.

The Middle District of Florida shows strong plaintiff metrics in personal injury and insurance disputes. The district's large retired population creates jury pools sympathetic to injury claims, and Florida's insurance litigation environment creates steady case flow with predictable settlement patterns.

Several common factors distinguish favorable-outcome districts. First, urban jury pools with higher education levels and diverse demographics tend to be more receptive to plaintiff arguments, particularly in discrimination and consumer protection cases. Second, strong local plaintiff's bars create competitive dynamics that drive better representation quality and more aggressive litigation strategies. Third, judges who actively manage cases and push toward resolution create environments where defendants cannot simply outlast plaintiffs through delay tactics. Fourth, high local cost of living translates directly into higher damage calculations for lost wages, medical expenses, and pain and suffering.

Conversely, districts that rank as least favorable-outcome tend to be rural, with smaller jury pools, fewer experienced plaintiff attorneys, and judges who grant summary judgment at higher rates. The Northern District of Mississippi, Southern District of Alabama, and Western District of Oklahoma consistently show below-average plaintiff outcomes across most case types.

For practitioners, this data should inform three key decisions: venue selection where multiple forums are available, settlement valuation calibrated to the specific district, and client counseling about realistic odds and timelines. A case worth $120,000 in the Northern District of California may be worth $65,000 in the Northern District of Mississippi — same facts, same law, different statistical reality.

District-level data does not guarantee outcomes in individual cases. But it establishes the baseline probability landscape within which every case will be resolved, and ignoring that landscape means advising clients with incomplete information.`,
  },
  {
    slug: 'federal-lawsuit-duration-data',
    title: 'How Long Does a Federal Lawsuit Actually Take? The Data Across 84 Case Types',
    description: 'From 2-month rent disputes to 26-month qui tam cases — real duration data from the FJC database showing how case type, representation, and district affect timelines.',
    category: 'Research',
    date: new Date('2025-01-27'),
    readTime: 8,
    author: 'MyCaseValue Research Team',
    content: `The most common question clients ask their attorneys is some version of "how long will this take?" The honest answer has always been "it depends," but the FJC Integrated Database now lets us quantify exactly what it depends on. Across 84 federal case types and over 5.1 million cases, median case duration ranges from 2 months to 26 months — a 13-fold spread that makes generalization useless and case-type-specific data essential.

At the fastest end of the spectrum sit administrative and procedural case types. Social Security appeals (NOS 863-865) average 5-7 months, driven by the structured administrative review process and limited discovery. Deportation cases move at a similar pace. Student loan recovery cases average approximately 3-4 months, reflecting the often uncontested nature of these filings. Rent disputes and forfeiture cases can resolve in as little as 2-3 months when defendants do not contest.

At the slowest end sit complex litigation categories. False Claims Act (qui tam) cases average 26 months, reflecting the mandatory seal period during which the government investigates before deciding whether to intervene. Antitrust cases average 22-24 months, reflecting extensive discovery involving multiple parties, expert witnesses, and complex economic analysis. Patent infringement cases average 20-22 months, driven by claim construction proceedings, technical discovery, and the specialized nature of the disputes.

The bulk of federal civil litigation falls in the 7-14 month range. Contract disputes (NOS 190) average 7 months. Personal injury cases (NOS 360-368) average 8-12 months depending on the specific subcategory, with motor vehicle cases resolving faster than medical malpractice. Employment discrimination (NOS 442) averages 11 months. Civil rights cases (NOS 440-448) range from 8 to 13 months. Product liability cases average 12-14 months.

These medians describe the center of each distribution, but the tails matter enormously for client counseling. In employment discrimination, 25% of cases resolve within 6 months (typically early settlements or successful motions to dismiss), while 25% extend beyond 18 months (typically cases that survive summary judgment and proceed toward trial). The interquartile range — the middle 50% of cases — spans roughly 6 to 18 months. Telling a client the case will take "about 11 months" is statistically accurate but potentially misleading without communicating this range.

Case disposition method strongly predicts duration. Cases ending in settlement resolve faster than cases ending in trial, but the relationship is not linear. Very early settlements (within 3-6 months) typically involve clear liability and willing insurers. Mid-range settlements (8-14 months) often follow the close of fact discovery. Late settlements (18+ months) frequently occur on the courthouse steps or after unfavorable summary judgment rulings that clarify risk for both sides. Trial itself adds 6-12 months beyond the discovery and motions timeline.

Representation status affects duration in both directions. Represented plaintiffs tend to have longer case durations than pro se plaintiffs — not because representation slows cases down, but because represented cases are more likely to survive motions practice and reach the discovery and settlement phases. Pro se cases that are dismissed quickly (within 3-6 months) bring down the pro se median. When comparing only cases that reach settlement, represented and pro se durations converge somewhat.

District-level variation in case duration is substantial and persistent. The Southern District of New York averages 14-16 months across most civil case types, reflecting heavy dockets and complex cases. The District of Kansas averages 8-10 months for comparable case types, reflecting lighter dockets and faster case management. Urban districts with heavier caseloads tend to have longer timelines, though aggressive judicial management can offset this — the Eastern District of Virginia is famous for its "rocket docket" that produces some of the fastest dispositions in the country despite substantial case volume.

Motions practice is the primary driver of timeline variance within case types. A case where the defendant files a motion to dismiss at month 3 and the court rules at month 6 has already consumed half the median case duration on a single procedural event. If that motion is denied, discovery begins at month 6 rather than month 2, pushing the entire case timeline forward. Summary judgment motions, typically filed after discovery closes, add another 3-6 months of briefing and decision time. Cases that face both motion-to-dismiss and summary judgment challenges can lose 8-12 months to motions practice alone.

Multi-defendant and multi-party cases systematically extend duration. Each additional party adds scheduling complexity, discovery obligations, and potential for interlocutory disputes. Class actions and MDL cases have their own timeline dynamics, with class certification proceedings alone consuming 12-18 months in many jurisdictions.

The data also reveals a settlement timing pattern that has strategic implications. Cases that settle at or near the median duration for their case type tend to settle at amounts closer to the median settlement amount. Cases that settle significantly faster tend to settle for less (reflecting early, risk-averse resolution), while cases that extend significantly beyond the median tend to settle for more (reflecting greater litigation investment and case development). This correlation is not causal — it likely reflects case strength — but it provides useful context for settlement timing discussions.

For practitioners, the key takeaway is that case-type-specific duration data should replace generic estimates in client counseling. A client filing a contract dispute should hear "7 months typical, 4-12 month range" rather than "a year or two." A client filing a qui tam action should hear "26 months typical, and that assumes the government acts promptly." Matching client expectations to statistical reality from the outset prevents frustration and builds trust.`,
  },
  {
    slug: 'federal-court-filing-trends-2024',
    title: 'Federal Court Filing Trends: What Changed in 2024',
    description: 'An analysis of recent trends in federal court filings, including case type distribution, filing volumes, and what they mean for litigation strategy.',
    category: 'Trends',
    date: new Date('2025-01-15'),
    readTime: 6,
    author: 'MyCaseValue Research Team',
    content: `Federal court filings continue to evolve in response to changing litigation patterns, technological adoption, and economic conditions. Our latest analysis of 2024 data reveals significant shifts in case composition, filing volumes, and jurisdictional distribution that warrant attention from legal professionals.

The overall volume of federal civil filings in 2024 showed modest growth compared to 2023, with approximately 250,000 new cases filed across all 94 federal districts. This represents a 3.2% increase from the previous year, though volumes remain slightly below pre-pandemic levels. However, this aggregate number masks important variations in specific case types and regions.

Employment discrimination cases continue to represent a significant portion of the federal docket, accounting for approximately 12% of all civil filings. However, the composition within this category is shifting. Claims involving retaliation and harassment have increased by 8.5%, while traditional discrimination claims show more modest growth. This shift may reflect increased workplace awareness, changing enforcement priorities, and evolving litigation strategies among plaintiff's counsel.

Personal injury litigation has rebounded strongly, particularly in cases involving mass torts and product liability. Mass tort filings increased by 15.6% in 2024, driven primarily by opioid litigation settlements, talc cases, and emerging claims involving pharmaceuticals and medical devices. These cases continue to drive significant settlements and jury verdicts, making them a substantial component of federal court activity.

Contract and commercial disputes show more stable filing patterns, with relatively consistent volumes across quarters. However, bankruptcy-related litigation and creditor claims have shown increased volatility, suggesting economic pressures on certain business sectors. Securities litigation filings declined slightly, potentially reflecting reduced market volatility compared to 2023.

Regional analysis reveals important geographic variations. The Central District of California, Northern District of Texas, and Southern District of New York continue to lead in absolute filing volumes, collectively accounting for nearly 18% of all federal civil filings. However, district courts in the Midwest and Southeast have seen faster growth rates, suggesting possible shifts in litigation strategy or case geographic distribution.

These trends have important implications for litigation planning, settlement strategy, and caseload management. Understanding which case types are growing fastest and how regional patterns are shifting can help attorneys develop more effective case management strategies and realistic client expectations about timelines and probable outcomes.`,
  },
  {
    slug: 'personal-injury-settlement-values-by-district',
    title: 'Personal Injury Settlement Values by District',
    description: 'Comprehensive analysis of settlement patterns across federal districts, comparing median values, percentiles, and regional variations in personal injury cases.',
    category: 'Settlement Data',
    date: new Date('2024-12-08'),
    readTime: 7,
    author: 'MyCaseValue Analytics Team',
    content: `Personal injury settlements vary significantly across federal districts, reflecting differences in jury pools, case composition, judge assignment patterns, and local litigation practices. Understanding these regional variations is essential for effective settlement strategy and realistic client counseling.

Across all federal districts, the median personal injury settlement is approximately $87,500, with the tenth percentile at $12,300 and the ninetieth percentile at $445,000. However, these aggregate figures obscure substantial district-level variation. The Southern District of New York shows the highest median settlement amounts at $156,800, reflecting the concentration of high-value cases, sophisticated counsel, and wealthy defendant corporations in that jurisdiction. Similarly, the Central District of California (median $142,300) and the Northern District of Illinois (median $131,600) show consistently elevated settlement values.

At the other end of the spectrum, federal districts in the South and lower-income regions show notably lower median settlements. The Southern District of Mississippi shows a median of $34,500, while the Eastern District of Arkansas averages $38,200. These differences reflect variations in damage calculations, local economic conditions, jury demographics, and the types of cases that tend to be filed in each district.

Case type within personal injury litigation also significantly affects settlement amounts. Motor vehicle accident cases have a median settlement of $65,000, reflecting the relatively standardized nature of these claims and the prevalence of insurance defendants. Product liability cases, particularly those involving pharmaceuticals or medical devices, show substantially higher medians of $340,000, reflecting greater documented damages and higher-value injuries.

Slip-and-fall and premises liability cases have lower settlement medians at $42,000, while workplace injury cases (outside workers' compensation) average $78,000. Assault and battery claims show high variability, with medians around $95,000 but very wide distributions reflecting the huge range in injury severity and permanence.

Representation status dramatically affects settlement outcomes. Represented plaintiffs in personal injury cases achieve median settlements approximately 2.8 times higher than pro se litigants. Represented plaintiffs average $103,400 compared to $36,800 for unrepresented parties. This gap likely reflects both case selection (attorneys take stronger cases) and superior litigation strategy, documentation, and negotiation skill.

Judge assignment within a district also shows measurable impact on settlement values. Some judges within the same district show substantially different settlement patterns, ranging from median settlements 15-20% above or below district averages. This variation likely reflects differences in discovery management, willingness to grant summary judgment, and perceived trial risk.

The time to settlement also varies by district and case type. Cases in larger urban districts with heavier dockets tend to settle somewhat faster, with medians around 18-22 months. Rural districts with lighter dockets average 24-30 months to settlement, possibly because less pressure exists to clear dockets quickly.

Recent trends show settlement values increasing in 2024 compared to 2023, with medians up approximately 4-6% district-wide. This likely reflects inflation adjustments, increased plaintiff demand, and rising medical costs. However, variations between districts remain substantial and stable, suggesting that geographic factors and local litigation culture remain robust predictors of settlement patterns.`,
  },
  {
    slug: 'employment-discrimination-10-year-analysis',
    title: 'Employment Discrimination: A 10-Year Analysis',
    description: 'A decade-long look at employment discrimination claims in federal court, including verdict rates, settlement trends, and the impact of legal representation.',
    category: 'Trends',
    date: new Date('2024-11-22'),
    readTime: 8,
    author: 'MyCaseValue Research Team',
    content: `Employment discrimination litigation has been one of the most dynamic segments of the federal civil docket over the past decade. A comprehensive analysis of filings, outcomes, and settlement patterns from 2014 through 2024 reveals important trends in how these cases develop and resolve.

Overall filings in employment discrimination cases have grown steadily, increasing from approximately 8,100 annual filings in 2014 to nearly 9,800 in 2024, a growth of approximately 21% over the decade. This growth exceeds the growth rate of the overall federal civil docket, indicating that employment discrimination represents an increasingly significant portion of federal litigation activity.

Title VII discrimination claims remain the largest category, comprising approximately 45% of employment discrimination filings, with consistent growth over the decade. The median verdict at trial for Title VII cases is $187,000, with the ninetieth percentile exceeding $750,000. Settlement patterns show that approximately 65% of Title VII cases resolve by settlement, with median settlements of approximately $52,000.

Age Discrimination in Employment Act (ADEA) claims have shown more volatility, with filings increasing 8% over the decade but with substantial year-to-year variation. ADEA cases show lower trial win rates (approximately 32%) compared to other discrimination claims, but median settlements are comparable to Title VII claims at around $48,000.

Americans with Disabilities Act (ADA) claims have shown the strongest growth, increasing 34% over the decade, reflecting increased litigation sophistication among plaintiff's counsel and expanding interpretations of disability. ADA cases show trial win rates around 38% and median settlements of approximately $65,000, slightly higher than other discrimination claim types.

Retaliation claims have increased significantly, now comprising approximately 28% of all employment discrimination filings. These claims have higher trial win rates (approximately 42%) than other discrimination claim types, possibly reflecting the relative straightforwardness of the causation requirement. Median retaliation settlements are approximately $58,000.

The impact of legal representation on employment discrimination outcomes is substantial. Represented plaintiffs win at trial at approximately 44% of the time, while pro se plaintiffs win only 9% of the time. Similarly, represented plaintiffs achieve median settlements of $67,000 compared to $18,000 for unrepresented parties. This gap likely reflects both case selection and the complexity of employment discrimination law, which includes mandatory administrative filing requirements and specialized evidentiary standards.

Gender remains a significant factor in case outcomes. Claims alleging gender discrimination show slightly higher settlement amounts ($54,000 median) compared to race discrimination claims ($48,000 median), though the differences are not dramatic. Sexual harassment claims, increasingly filed as direct discrimination claims rather than hostile work environment theories, show higher median settlements at $72,000.

Class and collective actions represent an important subset of employment discrimination litigation. Although comprising only 4-5% of filings, these cases generate disproportionate settlement amounts and verdicts. Class action employment discrimination settlements average $3.2 million, and jury verdicts in class actions average $2.1 million, compared to $187,000 for individual verdicts.

Settling trends have evolved over the decade. Early-stage settlements (within 18 months of filing) have increased from 35% of cases in 2014 to 42% in 2024, suggesting more active early case evaluation and settlement discussions. However, median settlement amounts for early-stage settlements ($38,000) are substantially lower than settlements occurring 24+ months after filing ($73,000), indicating that patience and litigation investment can correlate with better outcomes.

The decade also shows increasing geographic variation. Western and Northeastern districts show higher settlement amounts and trial win rates compared to Southern districts, likely reflecting regional differences in jury pools, cost of living, and plaintiff representation quality. The Northern District of California, Southern District of New York, and Northern District of Illinois collectively account for approximately 18% of employment discrimination filings but show settlement medians 30-40% above the national average.

Looking forward, employment discrimination litigation appears likely to continue its growth trajectory, with particular strength in ADA and retaliation claims. Changing workplace practices, increased remote work, and evolving social attitudes toward discrimination may alter both the volume and nature of claims being filed.`,
  },
  {
    slug: 'data-driven-litigation-strategy',
    title: 'How to Use Data-Driven Litigation Strategy',
    description: 'Learn how to leverage federal court analytics and outcome data to develop more effective litigation strategies and manage client expectations.',
    category: 'Attorney Insights',
    date: new Date('2024-10-15'),
    readTime: 5,
    author: 'Legal Strategy Expert',
    content: `Federal court data has become increasingly available and sophisticated, enabling attorneys to make more informed decisions about litigation strategy, client counseling, and settlement negotiation. Understanding how to leverage this data effectively can significantly improve outcomes and client satisfaction.

The first step in data-driven litigation strategy is understanding baseline outcomes for your case type in your jurisdiction. Before advising a client about settlement authority or litigation risk, you should know what cases of that type typically achieve in your district. Has a settlement median increased or decreased over the past three years? What percentage of cases go to trial versus settle? Understanding these baseline metrics provides an objective foundation for client discussions.

Judge assignment frequently represents the single largest variable in case outcomes within a district. If your case is assigned to a particular judge, research that judge's patterns with your case type. Some judges have consistently higher/lower settlement medians, more/less favorable summary judgment outcomes, or particular evidentiary or procedural preferences. This information can inform early case evaluation, discovery strategy, and settlement positioning.

Jury pool composition in your specific division and district materially affects trial risk. Districts with higher education levels, higher incomes, or particular demographic compositions tend to produce different verdict patterns. Plaintiff win rates, verdict amounts, and liability finding rates vary meaningfully by location. Understanding whether your venue is favorable or unfavorable for your case type helps inform realistic trial risk assessment.

Opposing counsel also leaves a statistical footprint. If you know your opponent's settlement patterns in similar cases, you have information valuable for negotiation. Counsel with a pattern of litigating to trial in particular case types face different cost pressures than counsel with settlement-heavy practices. This does not determine outcomes, but it informs strategy.

Case age and litigation investment correlate with settlement outcomes. Cases that settle within 12 months of filing achieve median settlements approximately 35-40% lower than cases settling after 24-36 months of litigation. This relationship likely reflects both case development (stronger evidence emerges) and plaintiff investment (attorney time spent demonstrates case value). However, early settlement can still make economic sense if the discount reflects litigation cost savings.

The presence or absence of insurance defendants affects both settlement behavior and negotiation dynamics. Cases against insured defendants show different settlement patterns than cases against uninsured individuals. Insurance availability, policy limits, and coverage status should inform settlement demands and litigation positioning.

Data on representation impact should influence case evaluation and client counseling. In case types where unrepresented plaintiffs show markedly lower success rates, the value of representation is substantial. Conversely, in case types where pro se litigants perform reasonably well, representation premium may be lower. This data informs appropriate fee discussions.

Emerging claim types and their outcome patterns merit attention. New legal theories or expanded liability standards may show favorable early outcomes before defense strategies fully develop. Similarly, decline in settlements or increase in dismissal rates may signal changing judicial attitudes. Monitoring these trends helps identify favorable case timing and theory opportunities.

Seasonal variation in filings and settlements may matter for your practice. Some case types show settlement clustering in particular quarters or seasons. Understanding whether your case type has seasonal patterns can inform negotiation timing and settlement discussions.

Data should inform, not determine, strategy. An outlier verdict or unusual settlement may seem inconsistent with data but may reflect unique case facts or counsel performance. Similarly, aggregate data masks individual variation. Use data as context for decision-making, not as destiny for outcomes.

Finally, update your data understanding regularly. Federal court patterns evolve. The settlement averages from 2020 may not reflect 2024 reality. Benchmarking against current data helps ensure your strategic decisions reflect current litigation landscape rather than historical norms.`,
  },
  {
    slug: 'district-court-comparison-east-vs-west',
    title: 'District Court Comparison: East vs West',
    description: 'A comparative analysis of federal district courts in Eastern and Western regions, examining docket composition, case timelines, and verdict patterns.',
    category: 'District Analysis',
    date: new Date('2024-09-30'),
    readTime: 6,
    author: 'MyCaseValue Research Team',
    content: `Federal district courts in the Eastern and Western regions of the United States show meaningful differences in docket composition, case handling, litigation patterns, and outcomes. Understanding these regional variations is essential for attorneys litigating multi-district cases or considering venue strategy.

Eastern district courts (generally defined as districts from the Atlantic coast through the Mississippi River) handle approximately 52% of the nation's federal civil filings, with higher absolute case volumes in major urban centers. Western district courts handle approximately 48% of federal civil filings, with somewhat more dispersed distribution across states and more variation in individual district size.

The Eastern docket shows heavier concentration in corporate litigation, securities cases, and complex commercial disputes. The Southern District of New York, District of Delaware, and Eastern District of Texas are particularly notable for commercial and IP litigation. This concentration reflects venue selection preferences and corporate structure, with many major corporations headquartered or operating in Eastern states.

The Western docket shows stronger representation of personal injury, employment discrimination, and consumer protection cases. Federal districts in California, Texas, and other Western states attract significant personal injury and class action filings. Natural disaster and environmental litigation also shows greater concentration in Western districts.

Case handling procedures differ between regions. Eastern districts, particularly in the Northeast and Mid-Atlantic, tend to have more formal initial conferences, more structured discovery management, and somewhat faster dispositions. Western districts, particularly in California, show more varied practices, with some districts emphasizing early neutral evaluation and mediation, while others allow more expansive discovery and longer development timelines.

Settlement and trial patterns also differ. Eastern district cases show settlement rates approximately 3-5 percentage points higher than Western districts on average. Settlement amounts tend to be higher in Eastern districts, particularly in commercial and employment cases. Trial rates show the inverse pattern, with Western districts demonstrating slightly higher trial rates in personal injury and employment discrimination litigation.

Verdict amounts in Eastern districts tend to be modestly higher, particularly in employment discrimination and personal injury cases. The Southern District of New York shows employment discrimination medians approximately 40% higher than comparable Western district cases. However, this difference likely reflects case composition (more complex, higher-value cases in Eastern districts) rather than jury or judge bias.

Judge demographics and experience levels differ between regions. Eastern district judges on average have longer tenure and more extensive prior legal experience, while Western district judges include more recent appointments with varied backgrounds. This variation may affect procedural preferences, discovery management, and substantive legal interpretation.

Jury pool composition differs substantially. Eastern district jurors in major metropolitan areas tend to have higher education levels, more diverse professional backgrounds, and higher incomes. This tends to correlate with higher verdict amounts in complex cases and potentially higher plaintiff win rates in liability-sensitive cases. Western district jurors, while also diverse, show different demographic patterns that may influence verdict decisions.

Case timeline variation is notable. Eastern district cases in major urban centers average 24-30 months to disposition, with some reaching 40+ months. Western district cases average 20-28 months, with more variation between districts. These differences reflect docket pressure, judge assignment practices, and local litigation culture.

Discovery practices also differ. Eastern district courts, particularly in commercial and patent litigation contexts, tend to involve more extensive discovery, larger document productions, and more aggressive motion practice. Western district courts show somewhat more restrained discovery, with some districts implementing more aggressive case management to limit discovery scope.

E-discovery practices and technology adoption show regional patterns. Eastern district courts and particularly sophisticated Western district courts (Northern District of California, Central District of California) lead in sophisticated e-discovery, while smaller district courts across the nation remain less technologically advanced.

Venue shopping remains a meaningful strategic consideration. The Eastern District of Texas, despite small population, continues to attract disproportionate patent litigation through venue selection. Similarly, the District of Delaware attracts significant corporate and commercial litigation despite limited geographic connections. Understanding district reputations and patterns informs venue strategy, particularly for multi-forum litigation.

Looking at the data, attorneys litigating in both regions should recognize that effective strategy in Eastern districts may differ from effective strategy in Western districts. Settlement expectations, trial risk assessment, and case timeline projections should account for regional variations rather than assuming uniform nationwide patterns.`,
  },
  {
    slug: 'settlement-negotiations-what-data-shows',
    title: 'Settlement Negotiations: What the Data Shows',
    description: 'Examine settlement negotiation patterns and strategies based on analysis of thousands of federal court cases and settlement outcomes.',
    category: 'Settlement Data',
    date: new Date('2024-09-05'),
    readTime: 7,
    author: 'MyCaseValue Analytics Team',
    content: `Settlement negotiations are the endpoint for approximately 90% of federal civil litigation. Understanding negotiation patterns, timing, and factors affecting settlement success can significantly improve outcomes and case management efficiency. Federal court data reveals consistent patterns in how cases settle and what factors most influence outcomes.

The first principle evident from the data is that litigation investment directly correlates with settlement amounts. Cases that settle within 12 months of filing achieve median settlements approximately 35-40% lower than cases settling after 24-36 months of litigation. This relationship likely reflects both case development (stronger evidence emerges) and plaintiff investment (attorney time spent demonstrates case value). However, early settlement can still make economic sense if the discount reflects litigation cost savings.

Settlement timing shows clear seasonal patterns in many practice areas. Fourth quarter settlements tend to be larger (reflecting both litigation development and year-end accounting pressures), while first quarter settlements tend to be earlier and smaller. Understanding these patterns can inform settlement timing strategy.

Opening demand positioning materially affects negotiation range. Cases where opening demands exceed historical averages for the case type show different settlement trajectories than reasoned opening positions. Extreme opening demands tend to produce either early dismissal of negotiation or negotiation range anchored far from historical outcomes. Reasoned opening positions in the range of 150-200% of median settlement outcomes tend to produce more productive negotiations.

Defense response timing affects outcome potential. Early defense responses (within 30 days of demand) correlate with lower eventual settlements, while delayed responses (60+ days) correlate with higher settlements, possibly because delay signals case weakness or internal deliberation about adequate reserve. Effective negotiation strategy may involve patience in awaiting defense response rather than aggressive escalation.

Multi-round negotiation cycles are nearly universal in settled cases. Cases that settle in 2-3 negotiation rounds average lower settlements than cases involving 4+ rounds, but the relationship is likely driven by case strength rather than round numbers. Difficult cases settle after more negotiation rounds, while straightforward cases settle quickly.

Mediation and neutral evaluation participation significantly affects settlement patterns. Cases where parties engage neutral mediators (particularly in certain districts with strong mediation cultures) show settlement rates 15-20 percentage points higher than cases without mediation. Mediation settlements also tend to fall closer to mid-point of litigation range, reducing outlier outcomes.

The quality of negotiation counsel appears determinative. Counsel with substantial experience in particular case types and districts, demonstrated through higher settlement amounts and faster settlements in comparable cases, appear to command settlements significantly higher than less experienced counsel. This does not prove counsel skill alone influences outcomes (stronger cases may self-select to better counsel), but the correlation is substantial.

Insurance company involvement in settlement decisions dramatically affects negotiations. Cases with insurance defendants show different dynamics than cases against uninsured individuals. Insurers have institutional settlement practices, reserve requirements, and behavioral patterns that create more predictable negotiation dynamics. Plaintiff counsel experienced with particular insurance companies often have superior settlement outcomes through understanding insurer practices.

Demand-to-settlement ratio varies substantially by case type. Employment discrimination cases typically settle at 40-50% of opening demand, while personal injury cases average 60-70% of opening demand. Understanding typical ratios for your case type informs reasonable opening positioning and negotiation expectations.

Litigation holds and adverse evidence developments significantly influence settlement positioning. Cases where adverse documents emerge or deposition testimony creates problems for plaintiff tend to show downward settlement adjustment. Conversely, evidence of defendant consciousness of guilt tends to produce upward adjustment. Sophisticated defendants and their counsel recognize evidence inflection points and adjust settlement positioning accordingly.

The presence of counterclaims or cross-claims materially affects settlement dynamics. Cases involving mutual claims show different negotiation patterns than unidirectional claims. Mutual claim cases average longer negotiation timelines but can produce more satisfactory outcomes if both parties benefit from settlement.

Appeal risk assessment increasingly influences modern settlement negotiations. As appellate costs increase and appellate outcomes become less predictable, many parties recognize that avoiding appellate risk through reasonable settlement makes economic sense. Parties who understand likely appellate outcomes tend to negotiate more realistically than parties overconfident in trial success.

Finally, the data shows that parties with realistic damage assessment tend to settle more successfully than parties relying on optimistic projections. The existence of objective damage benchmarks from comparable cases facilitates settlement by reducing estimation dispute. This suggests that early presentation of comparative damage data can facilitate productive negotiations.`,
  },
];

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = blogArticles.find((a) => a.slug === params.slug);
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title}`,
    description: article.description,
    alternates: { canonical: `${SITE_URL}/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `${SITE_URL}/blog/${article.slug}`,
      publishedTime: article.date.toISOString(),
      siteName: 'MyCaseValue',
      images: [{ url: `${SITE_URL}/api/og?type=generic&title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent(article.category)}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    keywords: article.category,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = blogArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--surf)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '24px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text1)', fontFamily: 'var(--font-legal)', marginBottom: '16px' }}>Article Not Found</h1>
          <p style={{ color: 'var(--text2)', marginBottom: '24px', fontFamily: 'var(--font-ui)' }}>
            We could not find the article you are looking for.
          </p>
          <Link href="/blog" style={{ color: 'var(--link)', fontWeight: 700, textDecoration: 'none' }}>
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Build JSON-LD structured data for Article schema
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}/api/og?type=generic&title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent(article.category)}`,
    datePublished: article.date.toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyCaseValue',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
  };

  // Get related articles (excluding current one)
  const relatedArticles = blogArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)' }}>
      {/* JSON-LD structured data for Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <style>{`
        .article-content p {
          margin-bottom: 16px;
          line-height: 1.8;
          color: var(--text2);
          font-family: var(--font-ui);
          font-size: 16px;
        }

        .article-content p:last-child {
          margin-bottom: 0;
        }

        .related-article-card {
          background: var(--card);
          border: 1px solid var(--bdr);
          border-radius: 2px;
          padding: 24px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .related-article-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--link);
        }

        .category-badge {
          background: rgba(239,68,68,0.08);
          color: var(--link);
          padding: 4px 10px;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          width: fit-content;
          margin-bottom: 12px;
        }

        @media (max-width: 768px) {
          .article-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="max-w-4xl mx-auto" style={{ position: 'relative' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              marginBottom: '24px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.02em',
            }}
          >
            <ArrowLeftIcon size={14} />
            Back to Blog
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(10,80,162,0.2)',
            background: 'rgba(10,80,162,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            {article.category}
          </div>

          <h1 style={{
            color: 'var(--card)',
            fontFamily: 'var(--font-legal)',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}>
            {article.title}
          </h1>

          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
            <span>{article.author}</span>
            <span style={{ margin: '0 12px', color: 'rgba(255,255,255,0.3)' }}>·</span>
            <time>{article.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span style={{ margin: '0 12px', color: 'rgba(255,255,255,0.3)' }}>·</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
          {/* Article Content */}
          <article>
            <div className="article-content">
              {article.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Article Footer */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--bdr)' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Share This Article
                </h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { label: 'LinkedIn', href: '#' },
                    { label: 'Twitter', href: '#' },
                    { label: 'Email', href: '#' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid var(--bdr)',
                        borderRadius: '2px',
                        fontSize: '12px',
                        color: 'var(--text2)',
                        textDecoration: 'none',
                        transition: 'all 200ms ease',
                      }}
                      /* hover handled by CSS */
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '12px' }}>
                  About the Author
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '0 0 12px 0', lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                  {article.author} creates in-depth analyses of federal court data and litigation trends to help legal professionals make informed decisions based on actual case outcomes.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Related Articles */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Related Articles
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    href={`/blog/${relatedArticle.slug}`}
                    className="related-article-card"
                  >
                    <div className="category-badge">{relatedArticle.category}</div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text1)', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                      {relatedArticle.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text2)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                      {relatedArticle.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div style={{ background: 'var(--card)', border: '2px solid var(--link)', borderRadius: '4px', padding: '24px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', marginBottom: '12px' }}>
                Get More Insights
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '0 0 16px 0', fontFamily: 'var(--font-ui)' }}>
                Explore federal court data with our interactive tools and analytics platform.
              </p>
              <Link
                href="/search"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--link)',
                  color: 'var(--card)',
                  padding: '8px 16px',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                }}
                /* hover handled by CSS */
              >
                Explore Analytics
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <section style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '4px', padding: '32px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text1)', marginBottom: '12px' }}>
            Ready to put this data into action?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text2)', margin: '0 0 24px 0', fontFamily: 'var(--font-ui)' }}>
            Search federal court cases and settlements by case type, jurisdiction, and more.
          </p>
          <Link
            href="/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--link)',
              color: 'var(--card)',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Start Searching Cases
            <ArrowRightIcon size={16} />
          </Link>
        </section>
      </div>

      {/* Free Report CTA */}
      <div className="max-w-4xl mx-auto px-6" style={{ paddingBottom: '64px' }}>
        <FreeReportCTA />
      </div>
    </div>
  );
}
