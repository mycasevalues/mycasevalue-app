/**
 * Explainer guide content for top 20 NOS codes
 * Provides substantive, accurate content for federal case type education
 */

export interface GuideContent {
  whatIs: string[];
  doIHaveCase: { q: string; a: string }[];
  whatToProve: string[];
  dismissalReasons: string[];
  nextSteps: string[];
}

export const GUIDE_CONTENT: Record<string, GuideContent> = {
  // 442 - Employment Discrimination
  "442": {
    whatIs: [
      "Employment discrimination cases arise when an employer treats you unfairly based on a protected characteristic—such as race, color, religion, sex, national origin, age (40+), disability, or genetic information. These cases can involve wrongful termination, denial of promotion, hostile work environment, harassment, retaliation, or other adverse employment actions motivated by discrimination.",
      "Federal employment discrimination claims typically arise under Title VII of the Civil Rights Act (race, color, religion, sex, national origin), the Age Discrimination in Employment Act (age), the Americans with Disabilities Act (disability), and the Genetic Information Nondiscrimination Act (genetic information). These laws apply to employers with 15+ employees and provide robust protections and remedies."
    ],
    doIHaveCase: [
      { q: "Was I treated differently because of a protected characteristic?", a: "You must show that you were treated less favorably than similarly situated employees outside your protected class. This includes being fired, harassed, demoted, passed over for promotion, or suffering other adverse employment actions due to your race, color, religion, sex, national origin, age, disability, or genetic information." },
      { q: "Did the employer know about the discriminatory reason?", a: "The employer must have had knowledge that the adverse employment action was motivated (at least in part) by discrimination. Sometimes this is direct evidence (discriminatory comments or policies), but often it's circumstantial (timing, inconsistent application of rules, poor performance pretexts)." },
      { q: "Was there a legitimate business reason given, but it seems pretextual?", a: "Employers often claim they fired you for poor performance, restructuring, or other neutral reasons. If you can show this reason is pretextual—meaning the real reason was discrimination—you have a strong claim. This happens when the reason is inconsistently applied or when non-protected employees engaged in similar conduct without consequence." },
      { q: "Did I experience retaliation after complaining?", a: "If you were fired, demoted, or suffered other adverse action after complaining about discrimination to your employer or filing an EEOC charge, you likely have a retaliation claim. The protected activity (complaining) and adverse action must be causally connected in time." },
      { q: "Was the environment so hostile I had to quit?", a: "If harassment or discrimination became so pervasive and severe that a reasonable person would feel forced to resign, you may have a constructive discharge claim. This is treated the same as a wrongful termination." }
    ],
    whatToProve: [
      "You were a member of a protected class (or perceived to be).",
      "You were performing your job satisfactorily (or meeting employer expectations).",
      "You suffered an adverse employment action (termination, denial of promotion, harassment, etc.).",
      "Similarly situated employees outside your protected class were treated more favorably, or the employer's stated reason for the action is pretextual (false).",
      "The protected characteristic was a motivating factor in the employer's decision."
    ],
    dismissalReasons: [
      "Lack of comparator evidence: You cannot show that similarly situated non-protected employees were treated better.",
      "At-will employment: The employer argues it could fire you for any reason or no reason (though this doesn't apply to discriminatory reasons).",
      "Legitimate, non-discriminatory reason: The employer provides a credible, consistently applied business reason for the adverse action and you cannot show pretext.",
      "Failure to exhaust administrative remedies: You did not file an EEOC charge within 180–300 days (depending on state law) before filing suit.",
      "Insufficient severity or pervasiveness: For harassment claims, the conduct was isolated incidents rather than severe and pervasive enough to alter working conditions."
    ],
    nextSteps: [
      "Document everything: Gather pay stubs, emails, performance reviews, schedules, witness names, dates of discriminatory comments, and any communications about the adverse employment action.",
      "File an EEOC charge: You must file with the Equal Employment Opportunity Commission within 180–300 days of the discriminatory act (depending on your state). This is a mandatory administrative step before you can sue in federal court.",
      "Preserve evidence: Do not delete emails or destroy documents. Tell your employer to preserve relevant records. Spoliation (destruction of evidence) can result in severe sanctions.",
      "Identify witnesses: Gather names and contact information of coworkers who witnessed discrimination, heard discriminatory comments, or can testify about different treatment.",
      "Calculate damages: Document lost wages, benefits, emotional distress, and any other harm. Keep records of job-search efforts and mitigation (applying for new jobs).",
      "Consult a licensed attorney: Employment discrimination law is complex and fact-intensive. An experienced employment attorney can evaluate the strength of your claim, navigate the EEOC process, and represent you in settlement negotiations or litigation."
    ]
  },

  // 445 - ADA Disability Discrimination
  "445": {
    whatIs: [
      "Disability discrimination claims under the Americans with Disabilities Act (ADA) arise when an employer refuses to hire, terminates, demotes, or otherwise discriminates against you based on a disability or perceived disability. The ADA defines disability broadly: a physical or mental impairment that substantially limits a major life activity, a history of such impairment, or being regarded as having such an impairment.",
      "The ADA also requires employers to provide reasonable accommodations to qualified employees with disabilities—changes to the job, workplace, or how work is performed that allow the employee to perform essential functions. A claim may arise from either disability discrimination or failure to provide a reasonable accommodation."
    ],
    doIHaveCase: [
      { q: "Do I have a disability under the ADA?", a: "A disability is a physical or mental impairment that substantially limits a major life activity (walking, seeing, hearing, sleeping, concentrating, working, etc.). Courts broadly interpret this definition. You may have a claim even if you manage your disability with medication or assistive technology." },
      { q: "Did I request a reasonable accommodation?", a: "You should notify your employer that you need a change due to your disability. You don't need to use the word 'accommodation,' but the employer must understand that you're requesting a modification. Examples include flexible scheduling, remote work, ergonomic equipment, or modified duties." },
      { q: "Is the accommodation reasonable and job-related?", a: "The accommodation must enable you to perform the essential functions of your job without undue hardship to the employer. Undue hardship means significant difficulty or expense. Most common accommodations (flexible hours, work-from-home, modified equipment) are not undue hardships." },
      { q: "Did the employer deny the accommodation or terminate me for requesting it?", a: "If your employer refused to accommodate you or fired/demoted you after requesting accommodation, you likely have a claim. Retaliation for requesting accommodation is illegal." },
      { q: "Was I denied a job or benefit because of my disability?", a: "If you were not hired, not promoted, or lost a benefit solely or substantially because of your disability or perceived disability, you have a discrimination claim, even if no accommodation was requested."
      }
    ],
    whatToProve: [
      "You have a disability as defined by the ADA (a physical or mental impairment that substantially limits a major life activity).",
      "You are qualified to do the essential functions of the job, with or without a reasonable accommodation.",
      "You suffered an adverse employment action (non-hire, termination, denial of accommodation, etc.) based on your disability.",
      "The employer knew or should have known about your disability.",
      "A reasonable accommodation exists that would allow you to perform the job's essential functions without undue hardship to the employer."
    ],
    dismissalReasons: [
      "No qualified disability: The impairment does not substantially limit a major life activity, or you cannot perform essential job functions even with accommodation.",
      "Legitimate performance or conduct reason: The employer terminated you for poor performance, misconduct, or other non-disability reasons unrelated to your disability.",
      "Undue hardship: The requested accommodation would impose significant difficulty or substantial expense on the employer.",
      "Essential functions conflict: You cannot perform the essential (not marginal) functions of the job even with accommodation.",
      "Safety risk: The employer can show that you pose a significant safety risk that cannot be mitigated by reasonable accommodation."
    ],
    nextSteps: [
      "Document your disability and limitations: Gather medical records, doctor's letters describing your disability and how it limits major life activities, and treatment history.",
      "Submit a formal accommodation request: Provide written notice to your employer (HR or manager) describing your disability and the specific accommodation you need. Be clear that it is disability-related.",
      "Keep records of the response: Save all emails, meeting notes, and communications about your accommodation request and the employer's response.",
      "Propose alternatives: If the employer rejects your request, suggest alternative accommodations that might address your limitation with less burden on the employer.",
      "File an EEOC charge if appropriate: If the employer denies accommodation or retaliates, file an EEOC charge within 180–300 days.",
      "Consult a licensed attorney: ADA claims require understanding of the statute's broad definitions and reasonable accommodation standards. An attorney can help you evaluate your claim and negotiate with the employer."
    ]
  },

  // 710 - Fair Labor Standards Act (FLSA) / Wage Claims
  "710": {
    whatIs: [
      "Wage and hour cases arise under the Fair Labor Standards Act (FLSA) and related state laws. These cases typically involve unpaid overtime, misclassification as 'exempt' from overtime, improper deductions from pay, failure to pay minimum wage, off-the-clock work, travel time disputes, or violations of break and meal period rules. These claims can be brought on behalf of yourself and similarly situated coworkers as a collective action or class action.",
      "The FLSA is strict and does not require proof of intentional wrongdoing—it focuses on whether the employer paid you correctly according to the law. Even if your employer claims budget problems or made an honest mistake, they are still liable. The FLSA also provides 'liquidated damages' (double the unpaid amount) and attorney's fees in many cases."
    ],
    doIHaveCase: [
      { q: "Am I properly classified as exempt from overtime?", a: "Exempt employees (salaried managers, professionals, salespeople meeting certain thresholds) do not receive overtime. However, many employers misclassify hourly employees or low-level supervisors as exempt to avoid paying overtime. If you perform non-exempt duties (serving customers, handling operations, not making independent decisions affecting the business), you likely qualify for overtime." },
      { q: "Did I work more than 40 hours in a week without overtime pay?", a: "If you worked over 40 hours per week and were paid a flat salary regardless of hours, or paid only straight-time (not time-and-a-half) for extra hours, you likely have an unpaid overtime claim." },
      { q: "Did I work off-the-clock?", a: "If you performed work before clocking in, after clocking out, during unpaid lunch breaks, or on your personal phone/computer without compensation, that is off-the-clock work. You must be paid for all hours worked, even if your employer prohibited off-the-clock work." },
      { q: "Was I paid less than minimum wage in my state?", a: "Federal minimum wage is $7.25/hour, but many states have higher minimums. You must be paid at least the applicable minimum wage for all hours worked, including overtime and special situations." },
      { q: "Did my employer deduct pay for uniforms, tools, or cash register shortages?", a: "Employers cannot deduct from your paycheck for uniforms, equipment, breakage, or shortages if it brings you below minimum wage or if it's not permitted under state law. Many deductions are illegal, particularly in blue-collar and service industry jobs." }
    ],
    whatToProve: [
      "You are a non-exempt employee under FLSA (not properly classified as exempt).",
      "You worked more than 40 hours per week (or met other overtime thresholds under state law).",
      "You were not paid at least time-and-a-half for overtime hours worked.",
      "Your employer knew or should have known about the wage violation (or the violation was systematic).",
      "You suffered quantifiable damages (unpaid wages plus interest)."
    ],
    dismissalReasons: [
      "You are properly classified as exempt: You meet the salary threshold, perform exempt duties (management, professional, sales), and exercise independent judgment affecting significant business operations.",
      "You were paid all overtime correctly: Your employer paid you at least time-and-a-half for all hours over 40 per week.",
      "You did not work the hours you claim: The employer disputes the hours worked and you cannot prove otherwise with timesheets or witness testimony.",
      "Statute of limitations: Your claim for unpaid wages is barred (typically 2–3 years depending on state law and whether the violation was willful).",
      "Applicable exemption: You fall under a specific FLSA exemption (executive, administrative, professional, outside sales, or other)."
    ],
    nextSteps: [
      "Gather timekeeping records: Collect all time cards, punch records, emails showing hours worked, text messages, calendar invites, and any other evidence of hours worked. Ask your employer for records if you don't have them.",
      "Calculate unpaid overtime: Document the total hours worked each week, subtract 40, multiply excess hours by 1.5 times your regular hourly rate, and sum for all affected pay periods.",
      "Identify similarly situated coworkers: Note the names and contact information of other employees with similar job duties and compensation who were also not paid overtime correctly.",
      "Document communications: Preserve emails, messages, or memos showing the employer's wage practices, deductions, or off-the-clock work expectations.",
      "File a complaint or demand letter: You can file a complaint with the Department of Labor, your state labor board, or send a demand letter to the employer. The DOL can investigate at no cost to you.",
      "Consult a licensed attorney: Wage and hour claims can recover significant damages and are often handled on contingency. An attorney can advise whether a collective action (suing on behalf of multiple employees) is viable and stronger."
    ]
  },

  // 110 - Diversity Jurisdiction Cases (General Federal Question)
  "110": {
    whatIs: [
      "NOS 110 covers 'Diversity' cases—civil lawsuits between parties from different states where federal courts have jurisdiction purely because of the different state citizenship of the parties (not because of a federal law claim). These typically involve contract disputes, property disputes, or common-law tort claims (like negligence or breach of contract) that would normally be heard in state court but are brought in federal court due to diversity jurisdiction.",
      "These cases are governed by state law, not federal law. Federal courts apply the substantive law of the relevant state (e.g., if the contract was formed in New York, the court applies New York contract law). Federal courts handle these cases simply because they involve parties from different states, and Congress granted federal courts this jurisdiction to avoid bias against out-of-state litigants."
    ],
    doIHaveCase: [
      { q: "Is my claim based on state law, not federal law?", a: "Diversity cases involve ordinary state-law claims (contract breach, negligence, property disputes, fraud). If your claim arises under a federal statute (like the FLSA or ADA), it's a federal question case, not pure diversity." },
      { q: "Are the parties from different states?", a: "Diversity jurisdiction requires complete diversity—if you are suing a company, the company must be incorporated in a different state or have its principal place of business in a different state. If there is any party from your state, diversity is destroyed." },
      { q: "Does the claim meet the amount-in-controversy requirement?", a: "For diversity jurisdiction to apply, the amount claimed must exceed $75,000 (not including interest and costs). This is a jurisdictional requirement; if the claim is for less, the federal court may dismiss for lack of jurisdiction." },
      { q: "Can this claim be brought in state court instead?", a: "Yes, diversity cases can be brought in state court. Federal jurisdiction is optional, not exclusive. However, federal courts sometimes have advantages: neutral judges (potentially), predictable procedures, and less local bias." }
    ],
    whatToProve: [
      "Complete diversity exists: All plaintiffs are citizens of different states than all defendants.",
      "The amount in controversy exceeds $75,000.",
      "The claim arises under state law (contract, tort, property, etc.) and is not preempted by federal law.",
      "The relevant state law supports your claim (this depends entirely on state law)."
    ],
    dismissalReasons: [
      "Lack of diversity: You and the defendant are from the same state, or a defendant is from your state, destroying diversity jurisdiction.",
      "Amount in controversy does not meet threshold: The claim is for less than $75,000 (excluding interest and costs).",
      "Federal question preempts the claim: The claim is actually based on federal law, not state law, making it a federal question case (different NOS code).",
      "The defendant is a resident of your state or the same state as the plaintiff.",
      "Failure to allege diversity and amount in controversy in the complaint."
    ],
    nextSteps: [
      "Verify citizenship: Confirm that you and all defendants are citizens of different states. If a defendant is incorporated, it is a citizen of its state of incorporation and principal place of business.",
      "Calculate the amount in controversy: Ensure your claim exceeds $75,000. Include the value of all relief sought (damages, injunctive relief, attorney's fees if recoverable under state law).",
      "Research applicable state law: Identify which state's law governs your claim (the state where the contract was formed, where the injury occurred, where the parties agreed, etc.) and research that state's law on your claim.",
      "File in federal court: If diversity and amount in controversy are clear, file in the federal district court for the district where the defendant resides or where events occurred.",
      "Be prepared for diversity defenses: The defendant may argue lack of diversity or insufficient amount in controversy to get the case dismissed.",
      "Consult a licensed attorney: Federal procedure and diversity jurisdiction rules are technical. An attorney experienced in federal litigation can ensure proper jurisdiction and filing."
    ]
  },

  // 190 - Contract Disputes
  "190": {
    whatIs: [
      "Contract disputes encompass a wide range of disagreements over the meaning, performance, or breach of a contract. These include disputes over payment obligations, delivery of goods or services, quality of work, breach of non-compete or non-disclosure agreements, lease disputes, employment contract disputes, and disagreements over the interpretation of contract terms. Contract cases are based on state law (e.g., New York law, California law) which governs the formation, performance, and enforcement of contracts.",
      "Contract disputes can be resolved through litigation, but many are resolved through mediation or arbitration. The outcome depends on the specific language of the contract, the law of the relevant state, and what each party actually performed or failed to perform."
    ],
    doIHaveCase: [
      { q: "Is there a valid contract?", a: "A valid contract requires: (1) offer and acceptance, (2) consideration (exchange of value), (3) mutual intent to be bound, and (4) no defenses (like fraud, duress, or illegality). If the other party made a promise and you accepted it with the understanding that both sides were bound, you likely have a contract." },
      { q: "Did the other party breach the contract?", a: "Breach means the other party failed to perform a material term of the contract—something important, not a minor deviation. If the other party failed to pay, deliver, or perform when due, that is a breach." },
      { q: "Did you fully perform your obligations?", a: "You generally cannot recover if you failed to perform your side of the contract. However, if your non-performance was caused by the other party's breach (like they refused to pay, so you stopped providing services), that may be excused." },
      { q: "What are your damages?", a: "You can recover the value of the other party's non-performance—usually the cost to 'cover' (hire someone else to do the work) or the value of goods/services you didn't receive, minus any value you actually obtained." },
      { q: "Was there a dispute about what the contract means?", a: "If both parties interpreted contract language differently, courts will look at the plain language, industry custom, prior dealings, and surrounding circumstances to interpret the contract. Ambiguous language is often interpreted against the drafter (the party that wrote it)." }
    ],
    whatToProve: [
      "A valid contract existed between you and the defendant.",
      "You performed your obligations under the contract (or were not required to because of the other party's breach).",
      "The defendant breached a material term of the contract.",
      "You suffered damages as a result of the breach.",
      "The amount of damages is quantifiable."
    ],
    dismissalReasons: [
      "No valid contract: The parties did not mutually agree to be bound, or an essential term was not agreed upon.",
      "No breach: The defendant performed as promised, or any non-performance was not material.",
      "Plaintiff's non-performance: You failed to perform your obligations first, and that failure was not excused by the defendant's breach.",
      "Statute of limitations: The breach occurred more than 4–6 years ago (depending on state law).",
      "Waiver or estoppel: You waived the breach by accepting partial performance or continuing the relationship after discovering the breach.",
      "Illegality: The contract is illegal or against public policy."
    ],
    nextSteps: [
      "Gather the contract and all related documents: Collect the signed contract, emails, texts, amendments, invoices, payment records, and communications showing the agreement and the breach.",
      "Document the breach: Clearly explain what the defendant failed to do and when. Show what the contract required and how the defendant's conduct fell short.",
      "Quantify your damages: Calculate the cost of cover (paying someone else to perform), the value of goods/services you didn't receive, or other quantifiable harms. Keep receipts and invoices.",
      "Preserve evidence of performance: Show that you performed your obligations. Include timesheets, delivery confirmations, emails showing you were ready to perform, or payment records showing you paid what was due.",
      "Send a demand letter: Write to the defendant outlining the contract, the breach, your performance, and the damages you are entitled to. Offer to settle to avoid litigation.",
      "Consult a licensed attorney: Contract interpretation and damages calculation require legal expertise. An attorney can review the contract language, advise on remedies available, and negotiate or litigate on your behalf."
    ]
  },

  // 220 - Bankruptcy / Insolvency
  "220": {
    whatIs: [
      "Bankruptcy cases involve disputes arising under the federal Bankruptcy Code. These include appeals of bankruptcy court decisions, challenges to discharge (the elimination of debts), disputes about property that is part of the bankruptcy estate, objections to claims filed by creditors, and litigation over the treatment of assets or debts in a bankruptcy proceeding. Bankruptcy jurisdiction is specialized and involves federal law exclusively.",
      "These cases require an understanding of bankruptcy law, including how assets are distributed, which debts can be discharged, the rights of secured versus unsecured creditors, and the debtor's fresh start. Bankruptcy cases often raise collateral questions like whether a creditor's lien is properly secured or whether fraudulent transfers should be recovered."
    ],
    doIHaveCase: [
      { q: "Is this related to a bankruptcy filing?", a: "Bankruptcy cases arise only in the context of an active bankruptcy case or appeal of a bankruptcy court decision. They involve disputes about the bankruptcy estate, discharge, claims, or priorities of creditors." },
      { q: "Am I the debtor or a creditor?", a: "If you are the debtor, you may dispute discharge of certain debts or challenge actions by the trustee. If you are a creditor, you may object to the debtor's discharge or challenge how your claim is treated in the bankruptcy." },
      { q: "Does my dispute involve a core bankruptcy issue?", a: "Core bankruptcy issues include preference actions (recovering transfers made shortly before bankruptcy), fraudulent conveyances, determination of whether a debt is dischargeable, and priority of claims. Non-core issues (like contract interpretation) are handled differently." }
    ],
    whatToProve: [
      "The case arises under the federal Bankruptcy Code (11 U.S.C.).",
      "Either a bankruptcy petition has been filed, or you are appealing a bankruptcy court decision.",
      "Your dispute directly involves the bankruptcy estate, discharge, creditor claims, or trustee actions.",
      "You have legal standing in the bankruptcy (you are the debtor, an affected creditor, the trustee, or a party granted relief)."
    ],
    dismissalReasons: [
      "No bankruptcy pending: There is no active bankruptcy case or the bankruptcy has been closed, so the bankruptcy court lacks jurisdiction.",
      "Claim is not core bankruptcy matter: Your dispute is tangential to bankruptcy (like a simple contract dispute between parties unrelated to the bankruptcy) and should be handled in state court.",
      "Statute of limitations: Your claim to recover a preference or fraudulent transfer is barred (typically 4 years from filing).",
      "Discharge obtained: The debtor received a discharge and your debt was eliminated, so you cannot sue the debtor (though you may object to dischargeability before discharge is entered)."
    ],
    nextSteps: [
      "Identify the bankruptcy case: Locate the bankruptcy case number, docket, and court. Search PACER (Public Access to Court Electronic Records) for the bankruptcy filing.",
      "Review the bankruptcy documents: Obtain the petition, schedules, statement of financial affairs, discharge papers, and any orders relevant to your dispute.",
      "Determine your role: Confirm whether you are the debtor, a creditor, the trustee, or another party with standing in the bankruptcy.",
      "File a proof of claim (if creditor): If you are an owed a debt, file a claim in the bankruptcy estate by the claim deadline or you will not receive payment.",
      "Object to discharge (if appropriate): If you believe certain debts should not be dischargeable (like debt from fraud or willful injury), file an objection to discharge before the discharge is entered.",
      "Consult a licensed bankruptcy attorney: Bankruptcy law is federal and specialized. A bankruptcy attorney can advise on your rights and obligations in the bankruptcy, represent you in objections or adversary proceedings, and help you recover assets or enforce your claims."
    ]
  },

  // 350 - Motor Vehicle Accident / Torts
  "350": {
    whatIs: [
      "Motor vehicle accident cases arise from personal injuries caused by negligent, reckless, or intentional conduct by another driver or vehicle operator. These cases typically involve claims for injuries (broken bones, spinal cord damage, burns, etc.), property damage, lost wages, and medical expenses resulting from car, truck, motorcycle, or commercial vehicle accidents. Liability is based on negligence: the defendant owed you a duty of care, breached that duty, and caused your injury.",
      "These cases are usually settled through insurance claims, but if the defendant is uninsured, underinsured, or the injuries are severe, they may proceed to litigation. The amount of recovery depends on the severity of your injuries, medical treatment, lost wages, and comparative fault (whether you were partially responsible)."
    ],
    doIHaveCase: [
      { q: "Did the other driver breach a duty of care?", a: "Drivers must follow traffic laws and exercise reasonable care. Examples of breaches: speeding, running red lights, distracted driving, DUI, improper turns, or failure to yield. Most traffic violations constitute breaches of the duty of care." },
      { q: "Did the accident cause your injury?", a: "There must be a direct causal link between the accident and your injury. If you were injured in the accident, this element is usually clear. If you have a pre-existing condition made worse, you may still recover for the aggravation." },
      { q: "What are your damages?", a: "Damages include medical treatment, surgery, hospitalization, ongoing therapy, lost wages, lost earning capacity, pain and suffering, emotional distress, and property damage. Keep all medical records and receipts." },
      { q: "Were you partially at fault?", a: "Even if you were partially at fault, you may still recover in most states (comparative negligence). Your recovery will be reduced by your percentage of fault. A few states use 'contributory negligence' (complete bar to recovery if you are any percent at fault)." },
      { q: "Do you have an insurer to pursue?", a: "The defendant's auto insurance is usually the source of recovery. You may also have underinsured or uninsured motorist coverage under your own policy if the defendant lacks sufficient insurance." }
    ],
    whatToProve: [
      "The defendant owed you a duty of care (as a driver to other road users).",
      "The defendant breached that duty (by violating traffic laws or driving negligently).",
      "The breach caused the accident.",
      "The accident caused you injury.",
      "You suffered quantifiable damages (medical costs, lost wages, pain and suffering, property damage)."
    ],
    dismissalReasons: [
      "No breach of duty: The defendant drove reasonably and followed traffic laws.",
      "No causation: The accident did not cause your injury, or the injury was caused by a pre-existing condition or other intervening factor.",
      "Comparative fault bar: In a pure contributory negligence state, you were any percentage at fault.",
      "Statute of limitations: The accident occurred more than 2–3 years ago (depending on state law).",
      "Failure to mitigate: You failed to seek timely medical treatment or failed to follow medical advice, worsening your condition."
    ],
    nextSteps: [
      "Seek medical attention immediately: Document all injuries and treatment. This is critical for both health and proving damages.",
      "Report the accident: File a report with local police if there are injuries. Obtain the police report number.",
      "Gather scene evidence: Take photos of vehicle damage, road conditions, traffic signs, and the accident scene. Note the time of day and weather.",
      "Get witness information: Collect names and contact information of anyone who saw the accident. Get statements if possible.",
      "Document communications: Keep all emails, texts, and notes from the other driver, insurance companies, and doctors.",
      "Notify your insurance company: Report the accident to your insurer and provide a detailed account.",
      "Preserve evidence: Do not repair the vehicle immediately; allow the insurer and/or attorney to inspect damage. Preserve medical records and bills.",
      "Consult a licensed personal injury attorney: Motor vehicle accident cases can recover substantial damages. An attorney can negotiate with insurers, gather expert evidence on liability and damages, and represent you in litigation if necessary."
    ]
  },

  // 360 - Personal Injury / Other
  "360": {
    whatIs: [
      "NOS 360 covers a broad range of personal injury cases not specifically classified elsewhere: slip and fall accidents on business premises, dog bites and animal attacks, construction site injuries, swimming pool drowning claims, amusement park injuries, and assault or battery. These cases are based on premises liability, negligent supervision, or intentional tort theories. The common thread is that someone's negligence or intentional conduct caused you physical injury.",
      "These cases typically involve property owners' or business operators' duty to maintain safe premises and warn of known hazards. They also may involve criminal conduct (assault, battery) and the attacker's liability, as well as the property owner's liability for inadequate security or supervision."
    ],
    doIHaveCase: [
      { q: "Did a property owner or business operator breach a duty to you?", a: "Property owners must maintain safe premises and warn of known hazards. If you slipped on a wet floor without a wet floor sign, or the owner knew of a hazard and did nothing, that is a breach. The owner did not need to know about the hazard if it should have been discovered by reasonable inspection." },
      { q: "Was the hazard open and obvious?", a: "If a hazard is obvious (like a large pothole), owners may not be liable because you had a duty to avoid it. However, if the hazard is hidden, obscured, or not reasonably apparent, the owner is more likely liable." },
      { q: "Were you lawfully on the property?", a: "You must have been an invitee (customer), licensee (social guest), or have permission to be there. Trespassers have limited rights. However, owners cannot use traps or engage in intentional misconduct even toward trespassers." },
      { q: "Did someone intentionally hurt you (assault or battery)?", a: "If another person intentionally touched you in a harmful or offensive way, or threatened immediate harm, that is assault or battery. The property owner may also be liable if they failed to provide adequate security or if an employee committed the assault." },
      { q: "Do you have clear causation between the hazard and your injury?", a: "You must show that the hazard directly caused your injury. If you fell on a wet floor and broke your arm, causation is clear. If you have pre-existing conditions, you may still recover for aggravation." }
    ],
    whatToProve: [
      "The defendant (property owner, business, or other person) owed you a duty of care.",
      "The defendant breached that duty by maintaining an unsafe premise or failing to warn of a hazard, or by committing an intentional tort.",
      "The breach caused your injury.",
      "You suffered quantifiable damages (medical costs, lost wages, pain and suffering).",
      "You were lawfully on the property (or the defendant engaged in intentional misconduct)."
    ],
    dismissalReasons: [
      "Open and obvious hazard: The hazard was so obvious that you had a duty to avoid it.",
      "No duty: You were a trespasser or were not lawfully on the property (with limited exceptions for intentional torts).",
      "No breach: The property was reasonably safe; the owner did inspect regularly and remedied known hazards promptly.",
      "Assumption of risk: You knowingly accepted the risk (e.g., participating in a sport with inherent dangers).",
      "Statute of limitations: The injury occurred more than 2–3 years ago (depending on state law).",
      "Comparative fault: You were partially responsible for your injury, reducing or eliminating recovery in many states."
    ],
    nextSteps: [
      "Document the scene: Take photos and video of the hazard, signage, lighting, and surrounding area. Include date and time stamps.",
      "Report to the property owner or business: Notify the owner in writing about the hazard. Many claims require prompt notice.",
      "Get witness information: Collect names and contact information of people who saw the hazard or accident.",
      "Seek medical attention: Document all injuries and obtain medical records. Preserve all medical bills and receipts.",
      "Gather property owner records: Request information about prior complaints, maintenance logs, and incident reports related to the hazard (use discovery or public records requests).",
      "Determine insurance coverage: Identify the property owner's general liability insurance. Most premises liability claims are covered.",
      "Preserve evidence: Do not allow the property owner to remove or alter the hazard. Photograph and document it thoroughly.",
      "Consult a licensed personal injury attorney: Premises liability cases require understanding of your state's duty standards and comparative fault rules. An attorney can evaluate the claim, gather expert evidence, and negotiate or litigate."
    ]
  },

  // 362 - Medical Malpractice
  "362": {
    whatIs: [
      "Medical malpractice cases arise when a healthcare provider (doctor, surgeon, nurse, hospital) fails to provide treatment that meets the accepted standard of care, resulting in injury. These cases include surgical errors, medication mistakes, misdiagnosis, delayed diagnosis, failure to obtain informed consent, birth injuries, anesthesia errors, and nursing home abuse or neglect. The key is that the provider's conduct fell below what a reasonably competent healthcare provider would have done in similar circumstances.",
      "Medical malpractice cases are highly technical and require expert testimony from another healthcare provider to establish that the standard of care was breached. Many states have pre-litigation requirements like submitting the case to arbitration or obtaining an expert opinion letter before filing suit."
    ],
    doIHaveCase: [
      { q: "Did the healthcare provider breach the standard of care?", a: "The standard of care is what a reasonably competent provider in the same specialty would do under similar circumstances. Examples of breaches: operating while intoxicated, using obviously outdated procedures, failing to follow standard protocols, or making a gross error. You need an expert healthcare provider to testify that the care fell below the standard." },
      { q: "Did the breach cause your injury?", a: "The provider's negligence must have directly caused or substantially contributed to your injury. If you have a pre-existing condition, you must show that the provider's negligence worsened it or prevented recovery." },
      { q: "Did you suffer damages as a result?", a: "Damages include medical costs of corrective treatment, lost wages, lost earning capacity, pain and suffering, and emotional distress. If the malpractice caused permanent disability, damages are typically much higher." },
      { q: "What is the applicable standard of care?", a: "The standard varies by specialty (surgery vs. internal medicine vs. nursing). You need an expert in the same or similar specialty to testify about what the standard of care is and whether it was breached." }
    ],
    whatToProve: [
      "The healthcare provider owed you a duty of care (an established doctor-patient relationship).",
      "The provider breached the standard of care applicable to their specialty.",
      "The breach caused your injury (causation in fact and proximate cause).",
      "You suffered damages as a result of the breach.",
      "The damages are quantifiable and proven by credible medical evidence."
    ],
    dismissalReasons: [
      "No breach of standard of care: The provider's treatment was within the accepted standard for their specialty.",
      "No causation: The provider's treatment did not cause your injury, or the injury was caused by a pre-existing condition or other factor.",
      "Failure to retain expert: You did not obtain affidavit or testimony from a qualified expert in the same specialty opining that the standard of care was breached.",
      "Assumption of risk: You understood and accepted the risks inherent in the treatment and signed an informed consent form.",
      "Statute of limitations: The malpractice occurred more than 1–3 years ago (depending on state law and when you discovered the injury).",
      "Failure to satisfy pre-litigation requirements: Some states require a certificate of merit or expert opinion letter before filing suit."
    ],
    nextSteps: [
      "Obtain all medical records: Get complete records from all providers involved in your care, including office notes, test results, imaging, surgery reports, and pathology reports.",
      "Retain a qualified expert: Hire a healthcare provider (doctor, surgeon, nurse specialist) in the same or closely related specialty to review the records and opine on whether the standard of care was breached.",
      "Request an expert affidavit: Many states require a written expert affidavit or certificate of merit before filing suit. Have your expert prepare this document.",
      "Document damages: Gather all medical bills, receipts, lost wage statements, and records of pain and suffering (journals, diary entries, testimony from family). If the injury causes permanent disability, document this.",
      "Notify the defendant: Some states require pre-litigation notice to the healthcare provider and insurer. Send a demand letter with your expert's opinion.",
      "Negotiate or file suit: Many cases settle during pre-litigation negotiations. If not, file suit before the statute of limitations expires.",
      "Consult a licensed medical malpractice attorney: Medical malpractice law is highly specialized. An experienced attorney can identify experts, satisfy pre-litigation requirements, and evaluate the strength and value of your claim."
    ]
  },

  // 365 - Product Liability
  "365": {
    whatIs: [
      "Product liability cases arise when a defective or dangerous product injures you. These cases typically involve three types of defects: (1) manufacturing defects (the product was made incorrectly), (2) design defects (the product was designed unsafely), and (3) warning/marketing defects (the manufacturer failed to warn of known hazards or misrepresented the product). Product liability cases can name manufacturers, distributors, retailers, or all of them.",
      "Product liability law is strict—you generally do not need to prove the manufacturer intended to injure you or was negligent. You only need to show the product was defective and caused your injury. Defendants must prove the product was not defective or that you misused it in an unforeseeable way."
    ],
    doIHaveCase: [
      { q: "Is the product actually defective?", a: "A product is defective if it is more dangerous than a consumer would reasonably expect. A sharp knife is expected to be sharp; a blender with a faulty motor that explodes is defective. Defects include manufacturing flaws, unsafe design, and inadequate warnings." },
      { q: "Did the defect cause your injury?", a: "The defect must have directly caused your injury. If you were injured while using the product as intended, causation is usually clear. If you misused the product in an unforeseeable way, the defendant may not be liable." },
      { q: "Were you using the product as intended?", a: "You should recover even if you were not the purchaser (the product was given to you) or even if you were not the primary user (e.g., a child using a parent's tool). However, if you used the product in a completely unforeseeable way, the manufacturer may not be liable." },
      { q: "What warnings or instructions were provided?", a: "If the manufacturer provided clear warnings about the hazard that injured you, your claim is weakened (though not necessarily defeated if the warning was inadequate). If no warning was provided for a known hazard, that is a strong claim." }
    ],
    whatToProve: [
      "The product was defective (manufacturing, design, or warning defect).",
      "The product was used as intended or in a reasonably foreseeable way.",
      "The defect caused your injury.",
      "You suffered damages (medical costs, lost wages, pain and suffering).",
      "The product reached you without substantial change from how the manufacturer sold it."
    ],
    dismissalReasons: [
      "The product was not defective: It was manufactured correctly, designed safely, and included adequate warnings.",
      "Misuse: You used the product in an unforeseeable way that the manufacturer could not have anticipated.",
      "Assumption of risk: You knew of the hazard and voluntarily chose to use the product anyway.",
      "No causation: Your injury was caused by your own conduct or another intervening factor, not the defect.",
      "Statute of limitations: The injury occurred too long ago (typically 2–4 years, depending on state law).",
      "Failure to preserve product: The actual product was destroyed or substantially altered, preventing inspection and testing."
    ],
    nextSteps: [
      "Preserve the defective product: Do not use, repair, or discard the product. Store it in a safe place. This is the most critical step—the product is evidence.",
      "Document the injury and circumstances: Take photos and video of the product and how it failed. Document your injuries and how the product caused them.",
      "Gather all documentation: Collect the product receipt, manual, packaging, warranty information, and any recalls or warnings later issued by the manufacturer.",
      "Report the defect: Report the defect to the manufacturer and the Consumer Product Safety Commission (CPSC) if applicable. This creates a record and may show the manufacturer knew of similar defects.",
      "Research prior incidents: Determine if other consumers were injured by the same product. Search online, check CPSC databases, and research prior lawsuits.",
      "Obtain medical records: Document all injuries, treatment, medical bills, lost wages, and pain and suffering.",
      "Retain an expert: Hire an engineer or product safety expert to examine the product and opine on the defect and causation.",
      "Consult a licensed product liability attorney: Product liability cases require technical expertise and are often handled on contingency. An attorney can investigate the defect, retain experts, and pursue claims against all responsible defendants."
    ]
  },

  // 370 - Wrongful Death
  "370": {
    whatIs: [
      "Wrongful death cases arise when someone's death is caused by another person's negligence, intentional conduct, or strict liability (like a defective product). The deceased's family or estate files suit against the person responsible for the death. These cases recover damages for the loss of the deceased's earning capacity, companionship, emotional distress to survivors, and the cost of the death (medical bills, funeral expenses).",
      "Wrongful death cases are brought by a representative of the deceased's estate (usually a family member). Different states allow recovery for different family members (spouse, children, parents) and different damages. The wrongful act can be negligence (like a car accident), medical malpractice, product liability, assault, or any conduct that causes death."
    ],
    doIHaveCase: [
      { q: "Was the death caused by another party's negligence, intentional act, or strict liability?", a: "The same principles apply as any negligence case: the defendant owed the deceased a duty, breached it, and caused the death. If the defendant intentionally killed the deceased, that is also wrongful death (as well as criminal homicide). If a defective product caused the death, strict liability applies." },
      { q: "Who can bring the wrongful death claim?", a: "The deceased's personal representative (usually appointed by the probate court) brings the claim. Different states allow different family members to recover (spouse, children, parents, sometimes siblings or grandchildren). Consult your state law on who has standing." },
      { q: "What damages can be recovered?", a: "Damages typically include the deceased's lost earning capacity (wages and benefits the deceased would have earned), loss of household services, loss of companionship, emotional distress, and funeral and medical expenses related to the death. Punitive damages may be available if the defendant's conduct was reckless or intentional." },
      { q: "Was the death foreseeable?", a: "If the defendant's conduct created a foreseeable risk of death, the defendant is liable. Most negligent conduct that causes serious injury also creates a foreseeable risk of death." }
    ],
    whatToProve: [
      "The defendant owed the deceased a duty of care.",
      "The defendant breached that duty.",
      "The breach caused the deceased's death.",
      "The survivors (family) suffered damages as a result.",
      "The personal representative of the estate has standing to bring the suit."
    ],
    dismissalReasons: [
      "No breach of duty: The defendant's conduct was reasonable and did not breach any duty.",
      "No causation: The defendant's conduct did not cause the death; the death was caused by the deceased's own conduct or an intervening factor.",
      "Comparative fault bar: In some states, if the deceased was partially at fault, recovery is reduced or barred.",
      "Statute of limitations: The death occurred too long ago (typically 2–3 years, depending on state law).",
      "Failure to appoint personal representative: No representative has been appointed by the probate court to bring the suit on behalf of the estate."
    ],
    nextSteps: [
      "Obtain a death certificate: Get the official death certificate, which lists the cause of death.",
      "Appoint a personal representative: The probate court must appoint a personal representative (executor) of the deceased's estate. The representative brings the wrongful death claim.",
      "Gather information about the deceased's life: Collect financial records, tax returns, pay stubs, employment history, and benefits information to calculate lost earning capacity. Include information about household services (childcare, cooking, cleaning) the deceased provided.",
      "Determine the family's damages: Identify all family members who depended on the deceased or suffered emotional loss. Document the nature and extent of their loss.",
      "Investigate the cause of death: Determine who was responsible for the death. Obtain the police report, autopsy report, medical records, and any incident reports.",
      "Preserve evidence: Prevent the responsible party from destroying evidence. Send a preservation letter to the defendant and relevant parties.",
      "Calculate total damages: Combine lost earning capacity, lost household services, funeral and medical expenses, and family damages.",
      "Consult a licensed wrongful death attorney: Wrongful death cases are emotionally difficult and legally complex. An experienced attorney can guide the family through probate, calculate damages, investigate the death, and pursue the claim."
    ]
  },

  // 440 - Civil Rights / Section 1983
  "440": {
    whatIs: [
      "Civil rights cases under 42 U.S.C. Section 1983 arise when a government official (police officer, correctional officer, city official, etc.) violates your constitutional rights while acting under color of state law. These cases include claims of excessive force, unlawful arrest, unlawful search and seizure, due process violations, and discrimination by government actors. Section 1983 is a federal statute that allows individuals to sue government officials for constitutional violations.",
      "These cases require showing that the government official violated a 'clearly established' constitutional right. The defendant official may assert 'qualified immunity,' which shields them from liability unless the specific right violated was clearly established at the time of the conduct. Cases often settle for significant damages because municipal governments carry liability insurance."
    ],
    doIHaveCase: [
      { q: "Was the person who harmed you a government official acting under color of state law?", a: "The defendant must be a government official—police, corrections, FBI, military, city employee, etc. They must have been acting in their official capacity (not purely personal conduct). Private security, homeowners, and civilians are not state actors." },
      { q: "Did the official violate a constitutional right?", a: "Constitutional rights include freedom from excessive force, unlawful arrest without probable cause, unreasonable search and seizure, due process, and equal protection. The right must be clearly established in case law—the official cannot claim they did not know the conduct was unconstitutional." },
      { q: "Were you injured or suffered damages?", a: "You must have suffered actual injury (physical harm, loss of liberty, property damage, emotional distress). Damages can be substantial in Section 1983 cases." },
      { q: "Did the official act with deliberate indifference?", a: "For some rights, you must show the official's conduct was deliberate or reckless, not merely negligent. For excessive force claims, the conduct must be 'objectively unreasonable.' Different rights have different standards." }
    ],
    whatToProve: [
      "The defendant was a government official acting under color of state law.",
      "The official violated a constitutional right (clearly established at the time).",
      "The violation caused you injury.",
      "You suffered quantifiable damages.",
      "The right was clearly established so that a reasonable official would know their conduct violated it."
    ],
    dismissalReasons: [
      "Qualified immunity: The official's conduct did not violate a clearly established constitutional right, so they are immune from liability.",
      "No state action: The defendant was a private citizen or private entity, not a government official.",
      "No constitutional violation: The conduct, while wrong, did not violate a constitutional right (it may violate state law, but that is a state-law claim).",
      "Statute of limitations: The violation occurred too long ago (typically 2 years under Section 1983, sometimes longer for related state law claims).",
      "Absolute immunity: Some officials (judges, prosecutors) have absolute immunity for conduct within their official role."
    ],
    nextSteps: [
      "Document everything: Record the incident in writing immediately, including date, time, location, names of officials involved, witnesses, and what happened. Take photos of injuries, property damage, and the scene.",
      "Seek medical attention: Document all injuries. This creates a medical record and is important for damages.",
      "Gather witness information: Collect names and contact information of anyone who saw the incident. Get written or recorded statements if possible.",
      "File a complaint with the agency: Report the official's conduct to their supervisor, the police department's internal affairs unit, or the civilian complaints board. This creates a record and may result in the agency investigating.",
      "File with federal agencies: Depending on the type of violation, consider filing complaints with the FBI, Department of Justice, or relevant federal agency.",
      "Preserve evidence: Ensure the agency preserves all evidence (video footage, reports, records). Send a preservation letter.",
      "Send a demand letter: Write to the defendant official and the municipality, outlining the constitutional violation and your damages. Many cases settle at this stage.",
      "Consult a licensed civil rights attorney: Section 1983 cases are complex, involving constitutional law and qualified immunity doctrine. An attorney can investigate, identify the clearly established rights violated, and negotiate or litigate."
    ]
  },

  // 550 - Real Estate / Mortgage / Foreclosure
  "550": {
    whatIs: [
      "Real estate cases include disputes over property ownership, title defects, mortgage fraud, wrongful foreclosure, deed-related disputes, and breach of purchase agreements. These cases may involve claims that a foreclosure was improper, that title to the property is defective, that a mortgage lender engaged in predatory lending, or that a seller made fraudulent misrepresentations about the property's condition.",
      "Real estate disputes are often highly technical, involving property law, mortgage law, and sometimes securities law (if mortgages were securitized and sold). Many foreclosure cases are brought by homeowners challenging the lender's right to foreclose or the process used to foreclose."
    ],
    doIHaveCase: [
      { q: "Is the foreclosure procedurally proper?", a: "Foreclosure must follow state law procedures strictly. Common defects: the party foreclosing lacked authority, required notices were not provided, or the foreclosure sale did not comply with statutory procedures. If procedures were not followed, the foreclosure may be invalid." },
      { q: "Did the lender commit fraud or misconduct?", a: "Examples: the lender falsified documents, engaged in predatory lending practices, manipulated loan modification processes, or made false representations about the loan. This can give rise to claims in addition to foreclosure challenges." },
      { q: "Is the title to the property defective?", a: "Title defects include liens you did not know about, conflicting claims to ownership, or documents in the chain of title that are forged or invalid. Title insurance may not cover defects if they were disclosed or the insured party was negligent." },
      { q: "Was there a breach of the purchase agreement?", a: "If you purchased the property and the seller failed to disclose known defects, made false representations, or failed to transfer clear title, you may have claims against the seller for fraud, breach of contract, or breach of warranty." }
    ],
    whatToProve: [
      "You have an ownership interest in the property or a right to challenge the foreclosure.",
      "The defendant violated property law, mortgage law, or contract law.",
      "The violation caused you harm (loss of the property, diminished value, overpayment).",
      "You suffered quantifiable damages.",
      "You took timely action (notice of lis pendens was given, or you acted within the statute of limitations)."
    ],
    dismissalReasons: [
      "Proper foreclosure procedure: The lender followed all statutory procedures and had the right to foreclose.",
      "Valid mortgage: The mortgage is valid, and the lender has the right to enforce it.",
      "No defect in title: Title to the property is clear, and any liens or defects were properly disclosed.",
      "Statute of limitations: Your claim is barred (typically 3–5 years for fraud claims, depending on state law).",
      "Waiver or estoppel: You waived your right to challenge the foreclosure by failing to act timely or by accepting benefits of the challenged transaction."
    ],
    nextSteps: [
      "Gather all loan and mortgage documents: Collect the original mortgage, promissory note, loan modification documents, payment records, and all correspondence from the lender.",
      "Verify the lender's authority: Confirm that the party foreclosing actually owns the mortgage and has the right to foreclose. Request documentation of the chain of title to the mortgage.",
      "Review foreclosure notices: Examine all foreclosure notices and sale documents for procedural defects. Many foreclosures are improper due to failure to provide required notices or advertise properly.",
      "Obtain the property appraisal: If you believe the property's value was misrepresented or underappraised, obtain an independent appraisal.",
      "File a lis pendens (if appropriate): If foreclosure is pending, file a lis pendens to notify third parties that the property is subject to litigation.",
      "Request a loan modification: If you are current or can catch up on payments, request a loan modification from the lender. This may stop or delay foreclosure.",
      "Consult a licensed real estate or foreclosure attorney: Real estate law is technical and varies significantly by state. An attorney can challenge improper foreclosures, negotiate with lenders, and protect your interests in the property."
    ]
  },

  // 791 - Constitutional Law / Statute / Preemption
  "791": {
    whatIs: [
      "NOS 791 covers constitutional challenges, statutory interpretation disputes, and preemption questions. These cases typically involve challenges to the constitutionality of a law, disputes over what a statute means, or conflicts between state law and federal law (preemption). These are purely legal questions, often without individual fact disputes. Examples include challenges to a law's constitutionality under the First Amendment, Second Amendment, or Due Process Clause, or disputes over whether state law is preempted by federal law.",
      "These cases are decided by federal judges based on law and interpretation, not facts. They often result in summary judgment (decided without trial) because the legal issues are the core dispute. Constitutional cases may affect many people and can result in injunctions affecting entire industries or government practices."
    ],
    doIHaveCase: [
      { q: "Is this a legal question about constitutionality or statute interpretation?", a: "Constitutional cases involve claims that a law violates the Constitution (First Amendment, Second Amendment, Due Process, Equal Protection, etc.). Statutory interpretation cases ask what a law means. These are legal questions, not factual disputes." },
      { q: "Do you have standing to bring the case?", a: "You must be directly harmed by the law or be about to be harmed. You generally cannot challenge a law just because you think it is unconstitutional; you must show personal injury." },
      { q: "Is the law preempted by federal law?", a: "If a state law conflicts with federal law or the Constitution, the state law is preempted and unenforceable. This is a legal question about the scope and meaning of both the state and federal law." },
      { q: "Has the issue been decided by higher courts?", a: "If an appellate court has already decided the constitutional or statutory question, lower courts are bound by that decision. Your case may have no chance if settled law is against you." }
    ],
    whatToProve: [
      "You have standing to bring the case (personal injury or imminent injury).",
      "The law you are challenging is unconstitutional or is in conflict with and preempted by federal law.",
      "There is a factual or legal basis for your constitutional argument.",
      "You have exhausted or are not required to exhaust administrative remedies.",
      "The relief you seek is available (if seeking an injunction, show irreparable harm)."
    ],
    dismissalReasons: [
      "Lack of standing: You are not directly harmed by the law and have no personal stake in the outcome.",
      "Political question doctrine: The issue is a political question reserved for the legislative or executive branch, not courts.",
      "Ripeness or mootness: The issue is not ripe for adjudication (no concrete application of the law yet), or the issue is moot (already resolved).",
      "Abstention: A parallel state court case is pending, and federal court may abstain to allow state court to address the issue first.",
      "Precedent against you: Higher courts have already decided the constitutional question against your position."
    ],
    nextSteps: [
      "Research applicable constitutional law: Determine what constitutional right is at issue and how courts have interpreted it. This is critical because you must show a well-established violation.",
      "Gather evidence of the law's effect: Document how the law harms you personally. Vague or speculative harm is not enough for standing.",
      "Identify the defendant: Determine who enforces the law (the government official, agency, or entity responsible for its application).",
      "Send a demand letter or request administrative review: Before filing suit, request that the government agency interpret or enforce the law in a constitutional manner. This may resolve the issue and shows you exhausted administrative remedies.",
      "File a complaint in federal court: Clearly state the constitutional right violated, the law's actual effect on you, and the relief you seek (e.g., an injunction preventing enforcement).",
      "Prepare for summary judgment: Constitutional cases often end on summary judgment (a legal decision without trial). Prepare legal briefs on constitutional interpretation.",
      "Consult a licensed constitutional or civil rights attorney: Constitutional law is highly specialized. An experienced attorney can identify the right constitutional claim, research applicable precedent, and present the legal argument effectively."
    ]
  },

  // 820 - Patent Infringement
  "820": {
    whatIs: [
      "Patent infringement cases arise when someone uses, sells, or manufactures a patented invention without the patent holder's permission. These are federal cases because patent law is governed entirely by federal statute. Cases involve disputes over whether the defendant's product infringes the patent, whether the patent is valid, and what damages the patent holder is entitled to (typically lost profits, reasonable royalties, or both).",
      "Patent cases are highly technical and require expert testimony from engineers or scientists to explain how the patent works and whether the defendant's product meets all the elements of the patent. Defendants often challenge the validity of the patent itself."
    ],
    doIHaveCase: [
      { q: "Do you hold a valid patent?", a: "You must have a U.S. patent issued by the Patent and Trademark Office. The patent must be valid (have survived prior art and other challenges). If the patent was issued, it is presumed valid, but the defendant can challenge its validity." },
      { q: "Does the defendant's product infringe your patent?", a: "Infringement means the defendant's product meets all the elements of your patent claims. A product does not need to be identical to infringe; it just needs to have all the essential features covered by the claims." },
      { q: "Did the defendant make, use, or sell the product in the U.S.?", a: "Patent infringement occurs only within the United States (unless the patent holder is the U.S. patent holder for a patent on foreign sales). Foreign manufacturing is not U.S. patent infringement, but importation into the U.S. is." },
      { q: "What damages are you entitled to?", a: "You can recover lost profits (if you can show you lost sales to the infringer) or a reasonable royalty (a fair licensing fee for the defendant's use). In exceptional cases, you can recover treble damages and attorney's fees." }
    ],
    whatToProve: [
      "You are the owner of a valid U.S. patent.",
      "The patent has not expired or been abandoned.",
      "The defendant makes, uses, or sells a product that infringes the patent claims.",
      "The defendant's infringement occurred in the United States.",
      "You suffered damages (lost profits, reasonable royalties, or both)."
    ],
    dismissalReasons: [
      "Invalid patent: The patent does not meet statutory requirements (35 U.S.C. § 101, § 102, § 103, or § 112) or was incorrectly issued.",
      "No infringement: The defendant's product does not meet all the elements of the patent claims.",
      "Patent expired: The patent term has ended (generally 20 years from filing for utility patents).",
      "Doctrine of equivalents fails: The defendant's product does not perform substantially the same function in substantially the same way to achieve substantially the same result.",
      "Inequitable conduct: You committed fraud or misconduct before the Patent Office when obtaining the patent."
    ],
    nextSteps: [
      "Conduct a validity analysis: Research prior patents, publications, and existing products to determine if your patent is vulnerable to a validity challenge.",
      "Analyze the defendant's product: Obtain and analyze the defendant's product (purchase it, tear it down, examine the design and functionality) to determine if it infringes your patent claims.",
      "Retain a technical expert: Hire an engineer or scientist in the relevant field to provide expert testimony on infringement and the defendant's product's technical features.",
      "Send a cease and desist letter: Send a detailed letter to the defendant explaining the patent, the infringement, and demanding cessation of the infringing activity. This letter is important for establishing damages.",
      "Gather evidence of damages: Collect records showing your lost sales (if any), licensing royalties for similar technologies, and the defendant's profits from the infringing product.",
      "Consider licensing: If enforcement is costly, consider offering the defendant a license to use the patent under reasonable royalties.",
      "Consult a patent attorney: Patent litigation is expensive and complex. A patent attorney can conduct validity and infringement analyses, handle prosecution, and represent you in litigation. Patent attorneys are specialized lawyers with scientific or engineering backgrounds."
    ]
  },

  // 830 - Trademark / Copyright / Intellectual Property
  "830": {
    whatIs: [
      "Intellectual property cases include trademark infringement (using someone else's brand name or mark without permission), copyright infringement (copying protected creative works), trade secret misappropriation, and false advertising. These cases arise under federal statute and common law. Trademark cases protect brand names and logos; copyright cases protect books, music, software, and other creative works; trade secret cases protect confidential business information.",
      "Damages in IP cases can be substantial: lost profits for the rightsholder, profits the defendant earned from the infringement, attorney's fees in some cases, and statutory damages for copyright infringement (up to $150,000 per work if infringement is willful). Injunctions are also common, ordering the defendant to stop using the IP."
    ],
    doIHaveCase: [
      { q: "Do you own a trademark, copyright, or trade secret?", a: "Trademarks are registered or common-law marks used in commerce. Copyrights protect original creative works; you own the copyright automatically when you create the work (registration not required but recommended). Trade secrets are confidential information that gives you competitive advantage." },
      { q: "Did the defendant use your mark without permission?", a: "For trademark infringement, the defendant must have used a mark that is confusingly similar to your mark in connection with similar goods or services. The defendant's use must likely cause consumer confusion." },
      { q: "Did the defendant copy your creative work?", a: "For copyright infringement, the defendant must have copied original expression (not just ideas). They must have had access to your work and copied a substantial portion." },
      { q: "Did the defendant misappropriate your trade secret?", a: "Trade secret misappropriation occurs when the defendant wrongfully obtains, uses, or discloses your confidential business information. You must have taken reasonable steps to keep it secret." },
      { q: "What damages did you suffer?", a: "Damages include lost profits, the defendant's profits from infringement, corrective advertising costs (for false advertising), and statutory damages for copyright (if registered)." }
    ],
    whatToProve: [
      "You own a valid trademark, copyright, or trade secret.",
      "The defendant used the IP without permission or authorization.",
      "The defendant's use is confusingly similar (trademarks) or substantially similar (copyright).",
      "Consumer confusion exists (trademark) or the work was copied (copyright).",
      "You suffered damages or the defendant earned profits from infringement."
    ],
    dismissalReasons: [
      "Fair use: The defendant's use is fair use (criticism, parody, news reporting, education) and does not infringe.",
      "No ownership: You do not own the IP, or your copyright was not registered (for statutory damages).",
      "No infringement: The defendant's use is not confusingly similar (trademark) or substantially similar (copyright).",
      "Abandoned mark: You abandoned the trademark by failing to use it or allowing genericide (the mark became generic).",
      "Laches: You delayed in asserting your rights, and the defendant relied on your delay.",
      "Statute of limitations: The infringement occurred too long ago (typically 3 years for trademark, 3 years for copyright, varying for trade secret)."
    ],
    nextSteps: [
      "Verify ownership: Confirm you own the IP. For copyright, check registration records. For trademark, verify use in commerce and any registration.",
      "Document the infringement: Gather evidence of the defendant's use: screenshots, products, advertisements, marketing materials, or website content.",
      "Compare the marks or works: Create a side-by-side comparison showing how the defendant's mark or work is similar to yours.",
      "Analyze consumer confusion (for trademark): Gather evidence showing customers are confused about the source of the defendant's product. Surveys, customer complaints, or sales records can help.",
      "Send a cease and desist letter: Write to the defendant explaining the IP, the infringement, and demanding cessation. This is important for establishing willfulness (for enhanced damages) and damages.",
      "Consider licensing: If enforcement is costly, consider offering a license to the defendant.",
      "Consult an IP attorney: Intellectual property litigation requires specialized expertise. An IP attorney can advise on ownership, infringement, fair use defenses, and remedies including injunctions."
    ]
  },

  // 840 - FLSA / Labor / Antitrust (Antitrust)
  "840": {
    whatIs: [
      "Antitrust cases arise under the Sherman Act and Clayton Act when competitors illegally conspire to fix prices, divide markets, boycott competitors, or engage in other anti-competitive conduct. These cases also include monopolization claims—when a dominant firm uses its power to unfairly exclude competitors or harm consumers. Antitrust cases can be brought by competitors (who lost sales) or by consumers (who paid artificially high prices).",
      "Antitrust damages are trebled (triple) under federal law, making these cases potentially very valuable. Class actions are common in antitrust, where consumers band together to recover damages from price-fixing conspiracies. Private antitrust litigation complements enforcement by the Department of Justice and Federal Trade Commission."
    ],
    doIHaveCase: [
      { q: "Are you a competitor harmed by anti-competitive conduct?", a: "Competitors who lost sales or market share due to illegal price-fixing, market-division, or other collusion can sue. You must show the conspiracy or monopolistic conduct caused you direct harm (lost sales or revenue)." },
      { q: "Are you a consumer who paid higher prices due to price-fixing?", a: "Consumers can sue if they paid artificially high prices due to competitors fixing prices or a monopolist charging supra-competitive prices. You must show the conspiracy or monopoly caused you to overpay." },
      { q: "Is the defendant a dominant firm using its power to exclude competitors?", a: "Monopolization claims require the defendant to have monopoly power and to have used it to foreclose competitors or harm consumers. Mere dominance or high prices alone do not violate antitrust law." },
      { q: "Did competitors explicitly agree to fix prices or divide markets?", a: "A formal agreement is not required; conduct can show an implicit agreement or conspiracy. Price parallelism (all competitors raising prices together) can suggest collusion, but it is not conclusive." }
    ],
    whatToProve: [
      "Competitors agreed (explicitly or implicitly) to restrict competition (price-fixing, market division, bid-rigging, group boycott).",
      "Or: A defendant has monopoly power and used it to exclude competitors or restrict competition.",
      "The conduct harmed you directly (lost sales for competitors, or paid high prices for consumers).",
      "You suffered quantifiable damages.",
      "The conduct violated the Sherman Act (Section 1 for agreements) or Section 2 (for monopolization)."
    ],
    dismissalReasons: [
      "No agreement or conspiracy: The defendants acted independently; there was no agreement to fix prices or divide markets.",
      "No market power or monopoly: The defendant lacks the market power to fix prices or monopolize.",
      "Legitimate business justification: The conduct has legitimate, pro-competitive reasons (efficiency, cost reduction, customer benefit).",
      "Standing: You are not a direct victim of the anti-competitive conduct and lack standing to sue.",
      "Statute of limitations: The conduct occurred more than 4 years ago.",
      "Damages too speculative: You cannot prove causation or quantify damages with reasonable certainty."
    ],
    nextSteps: [
      "Document the anti-competitive conduct: Gather evidence of price-fixing, market division, or monopolistic conduct: emails, meeting notes, pricing communications, parallel price increases, or exclusive dealing agreements.",
      "Identify co-conspirators: Determine which competitors are involved in the conspiracy or which firm is monopolizing.",
      "Analyze market structure: Determine the relevant market definition (product and geographic) and each firm's market share. This is critical for proving market power or dominance.",
      "Calculate damages: For competitors, calculate lost sales or profits. For consumers, calculate overpayment (the difference between the price paid and the competitive price).",
      "Research prior cases: Look for prior antitrust actions against the same defendants or similar conduct. Prior convictions or settlements are strong evidence.",
      "File a complaint with antitrust authorities: Report the conduct to the Department of Justice Antitrust Division or Federal Trade Commission. A government investigation can provide discovery and support a private action.",
      "Consult an antitrust attorney: Antitrust law is complex and highly technical. An antitrust attorney can analyze the conduct, identify liability theories, calculate damages, and determine whether a class action is viable."
    ]
  },

  // 863 - Consumer Protection / Fair Credit Reporting Act
  "863": {
    whatIs: [
      "Consumer protection cases arise under the Fair Debt Collection Practices Act (FDCPA), Fair Credit Reporting Act (FCRA), Telephone Consumer Protection Act (TCPA), and state consumer protection laws. These cases typically involve claims that collectors harassed you, credit bureaus reported false information, companies sent illegal robocalls or texts, or businesses engaged in unfair or deceptive practices. These statutes provide private rights of action with statutory damages—you do not need to prove financial harm.",
      "Consumer protection statutes are plaintiff-friendly: they provide statutory damages per violation (often $500–$1,000 per violation), attorney's fees, and sometimes punitive damages. Class actions are common because many consumers suffer the same violations. These cases often result in substantial recoveries even if individual damages are small."
    ],
    doIHaveCase: [
      { q: "Did a debt collector harass or threaten you?", a: "Under the FDCPA, debt collectors cannot call repeatedly to harass, call before 8 a.m. or after 9 p.m., use profanity, make threats, or contact you at work if your employer forbids it. Each violation is a separate cause of action with statutory damages." },
      { q: "Did a credit bureau report false information about you?", a: "Under the FCRA, credit bureaus must maintain accurate records and disclose what they report. If false information appears on your credit report and you did not authorize it, the bureau and the creditor reporting the false information are liable." },
      { q: "Did you receive illegal robocalls or texts?", a: "Under the TCPA, companies must obtain prior express written consent before sending robocalls or texts to cell phones. Each violation is a separate cause of action with statutory damages of $500–$1,500 per call or text." },
      { q: "Did a business use unfair or deceptive practices?", a: "State consumer protection statutes prohibit unfair or deceptive practices: false advertising, bait-and-switch, failing to disclose material information, etc. You may have claims under both federal and state law." }
    ],
    whatToProve: [
      "The defendant is subject to the applicable statute (FDCPA, FCRA, TCPA, or state consumer law).",
      "The defendant violated a specific provision of the statute.",
      "The violation caused you harm (though statutory damages don't require proof of actual harm).",
      "The violation was intentional or reckless (for some statutes) or merely negligent (for others)."
    ],
    dismissalReasons: [
      "No violation: The conduct does not violate the statute (e.g., a single call is not repeated harassment under FDCPA).",
      "Consent obtained: For TCPA, the defendant obtained valid prior express written consent to send the message.",
      "Business purpose exception: For FDCPA, the defendant is not a debt collector or the call was for a purpose other than debt collection.",
      "Statute of limitations: The violation occurred too long ago (FDCPA and TCPA: 1 year; FCRA: varies).",
      "Standing: You were not directly affected by the violation and lack standing to sue."
    ],
    nextSteps: [
      "Document the violations: Save all evidence: calls, texts, voicemails, emails, letters from collectors or credit bureaus, and written communication from the company.",
      "Dispute false credit information: If false information is on your credit report, send a written dispute to the credit bureau and the creditor reporting the false information. Keep copies.",
      "Request your credit report: Obtain copies of your credit report from all three bureaus (Equifax, Experian, TransUnion) to document false information.",
      "Request written verification: Ask the debt collector to send written verification of the debt. The FDCPA requires this, and if they violate this requirement, you have a claim.",
      "Stop communication: Send a written cease and desist letter to the debt collector demanding they stop contacting you. The FDCPA requires them to honor this.",
      "Calculate statutory damages: Count the number of violations (e.g., each harassing call is a violation). Multiply by the statutory damage per violation ($500–$1,500 for TCPA, $100–$1,000 for FDCPA, etc.).",
      "Consult a consumer protection attorney: Consumer protection cases are often handled on contingency because statutory damages can be substantial. An attorney can identify all violations, assess class action viability, and negotiate or litigate."
    ]
  },

  // 870 - Debt Collection / Fair Debt Collection Practices Act
  "870": {
    whatIs: [
      "Fair Debt Collection Practices Act (FDCPA) cases arise when a debt collector uses abusive, unfair, or deceptive practices to collect a debt. These include harassment (repeated calls), threats, calling at unreasonable times or at work if prohibited, false statements about the debt or threat of legal action that is not intended, failure to provide written notice of the debt, and contacting third parties to harass the debtor. The FDCPA provides a private right of action with statutory damages, meaning you do not need to prove financial loss.",
      "FDCPA claims are plaintiff-friendly: each violation is a separate cause of action. A collector who calls 10 times to harass you has committed 10 violations, each entitling you to statutory damages. Class actions are common because collectors often use the same abusive tactics on many people. These cases often settle for significant amounts."
    ],
    doIHaveCase: [
      { q: "Is the defendant a debt collector?", a: "The defendant must be a debt collector as defined by the FDCPA: someone whose principal business is collecting debts or who regularly collects debts owed to others. Some creditors who collect their own debts are excluded." },
      { q: "Did the collector use abusive or deceptive practices?", a: "Examples: calling repeatedly to harass, calling before 8 a.m. or after 9 p.m., threatening arrest or lawsuits that are not intended, falsely claiming the debt will destroy credit or result in wage garnishment, or calling your employer if prohibited." },
      { q: "Did the collector contact you at work after you told them your employer forbids it?", a: "Once you tell a collector your employer forbids collection calls at work, they must stop calling you there (except through your attorney). Continued calls violate the FDCPA." },
      { q: "Did the collector threaten illegal action?", a: "Threatening arrest, imprisonment, or wage garnishment when the collector cannot or does not intend to pursue these actions is a violation. Threatening to sue when the debt is time-barred may also violate the FDCPA." },
      { q: "Did the collector fail to provide written notice of the debt?", a: "Within 5 days of initial contact, the collector must send written notice of the debt, the creditor's name, and your right to dispute the debt. Failure to provide this notice is a violation." }
    ],
    whatToProve: [
      "The defendant is a debt collector under the FDCPA.",
      "The defendant violated a specific provision of the FDCPA (harassment, false statements, improper contact, etc.).",
      "The violation was intentional or reckless (for many FDCPA provisions) or merely negligent (for some provisions).",
      "The violation caused you to suffer harm (though statutory damages don't require proof of actual harm)."
    ],
    dismissalReasons: [
      "No debt collection: The defendant is not a debt collector; they are the original creditor collecting their own debt (though some original creditors are covered by FDCPA).",
      "No violation: The conduct does not violate the FDCPA (one call is not harassment; the collector complied with time and place restrictions).",
      "Statute of limitations: The violation occurred more than 1 year ago.",
      "Fair Debt Collection: The collector's conduct was fair and reasonable, not abusive or deceptive.",
      "Bona fide error: The collector made a good-faith error and took steps to prevent the error (though this is a narrow defense)."
    ],
    nextSteps: [
      "Document all contact: Save voicemails, texts, emails, and letters from the debt collector. Record the date, time, content, and any harassing or deceptive statements.",
      "Identify the collector: Determine the collector's name, company, and contact information. Verify they are a debt collector (they are required to identify themselves).",
      "Send a cease and desist letter: Write to the collector in writing demanding they stop calling. The FDCPA requires collectors to honor written requests to cease communication (except to confirm the debt will not be pursued or to notify you of specific action like a lawsuit).",
      "Verify the debt: Request written verification of the debt within 30 days of the collector's initial contact. If they cannot verify it, they must cease collection efforts.",
      "Determine if the debt is time-barred: Check your state's statute of limitations. If the debt is more than 3–6 years old (depending on state), it may be time-barred and unenforceable.",
      "Calculate statutory damages: Document each violation. Count the number of violations (each call, text, or improper contact is a violation). Multiply by the statutory damage per violation ($100–$1,000 per violation, depending on whether the violation is willful or negligent).",
      "File a complaint: Report the collector to the Consumer Financial Protection Bureau (CFPB) and your state attorney general.",
      "Consult a consumer protection attorney: FDCPA cases are often handled on contingency. An attorney can calculate damages, identify all violations, assess class action viability, and negotiate or litigate."
    ]
  },

  // 376 - Fraud
  "376": {
    whatIs: [
      "Fraud cases arise when someone deceives you with the intent to cause you financial or other harm. A fraud claim requires: (1) a false statement or concealment of material fact, (2) knowledge that the statement is false or reckless disregard for its truth, (3) intent to deceive you, (4) reasonable reliance by you on the false statement, and (5) resulting damages. Fraud can occur in business transactions, real estate sales, insurance applications, investment schemes, or any contract-based relationship.",
      "Fraud cases are often complex because they require proving the defendant's state of mind (knowledge or intent to deceive) and your reliance on the false statement. However, damages can be substantial, including the money lost, lost profits, punitive damages (in some cases), and attorney's fees. Fraud claims are not subject to typical warranty disclaimers and can be brought even if you accepted the risk in a contract."
    ],
    doIHaveCase: [
      { q: "Did the defendant make a false statement or conceal a material fact?", a: "A false statement must be about a fact that matters to the transaction. Concealment of a known defect or material information is treated the same as an explicit false statement. Statements of opinion or 'puffery' (exaggeration common in sales) are not fraud, but false statements about material facts are." },
      { q: "Did the defendant know the statement was false?", a: "The defendant must have known the statement was false, or made it with reckless disregard for whether it was true. This is the intent to deceive element. A statement made with innocent mistake may not be fraud, but a statement made without caring whether it was true is fraud." },
      { q: "Did you reasonably rely on the false statement?", a: "You must have believed the statement and acted on that belief. If you were aware the statement was false, or if a reasonable person would not have believed it, reliance may fail. However, you do not need to have investigated the statement's truth if it was reasonable to rely on the defendant's representation." },
      { q: "Did the false statement cause you to lose money?", a: "You must have suffered financial harm as a result of relying on the false statement. This can be the money you paid, lost profits, or the cost to fix the defect. Document all expenses related to the fraud." },
      { q: "Can you prove the defendant's knowledge of the falsity?", a: "This is the hardest element to prove. Direct evidence (emails, messages admitting the falsity) is ideal. Circumstantial evidence (the defendant's position or expertise suggesting they should have known, contradictory conduct) can also prove intent to deceive." }
    ],
    whatToProve: [
      "The defendant made a statement about a material fact, or concealed a material fact.",
      "The statement was false, or the defendant knew it was false or acted with reckless disregard for its truth.",
      "The defendant intended to deceive you.",
      "You reasonably relied on the false statement.",
      "Your reliance caused you financial or other damages."
    ],
    dismissalReasons: [
      "Statement was opinion, not fact: The defendant's statement was puffery or opinion common in sales, not a factual assertion.",
      "No reasonable reliance: You knew or should have known the statement was false, or a reasonable person would not have relied on it.",
      "No damages: You cannot prove you suffered financial harm as a result of the fraud.",
      "No intent: The defendant made an honest mistake; you cannot show knowledge of falsity or intent to deceive.",
      "Statute of limitations: The fraud occurred too long ago (typically 2–3 years from discovery, depending on state law).",
      "Disclaimer or caveat: The contract included a disclaimer disclaiming reliance on any representations outside the written agreement (though this may not bar fraud claims in some states)."
    ],
    nextSteps: [
      "Document the false statement: Gather all communications from the defendant—emails, text messages, advertisements, contracts, emails, recorded calls—that contain the false statement or concealment.",
      "Verify the falsity: Obtain evidence proving the statement was false. This might be expert inspection, documentation from a third party, property appraisals, test results, or prior admissions by the defendant.",
      "Show your reliance: Gather evidence you relied on the statement: emails showing you asked about the fact, messages indicating you believed the statement, or testimony about what the defendant told you.",
      "Calculate damages: Document all money you lost as a result: purchase price less actual value, cost to repair or replace, lost profits, or cost of alternative performance.",
      "Gather evidence of intent: Look for contradictory conduct, prior complaints about similar false statements, internal documents suggesting the defendant knew the truth, or evidence of similar frauds.",
      "Consider expert testimony: In complex fraud cases (investment, real estate, product), experts can testify about industry standards, proper disclosures, and the defendant's deviation from accepted practices.",
      "Consult a fraud attorney: Fraud cases are complex and require detailed factual investigation. An attorney can analyze the statement, gather evidence of falsity and intent, calculate damages, and negotiate or litigate the claim."
    ]
  }
};
