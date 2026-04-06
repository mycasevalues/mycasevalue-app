import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Legal Glossary — Federal Court Terms & Definitions',
  description: 'Plain-English definitions of federal court terms including NOS codes, PACER, settlements, win rates, and more.',
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title: 'Legal Glossary — Federal Court Terms & Definitions',
    description: 'Plain-English definitions of federal court terms including NOS codes, PACER, settlements, win rates, and more.',
    url: `${SITE_URL}/glossary`,
    type: 'website',
  },
};

interface GlossaryTerm {
  term: string;
  definition: string;
  relatedLink?: string;
  relatedLabel?: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'ADA (Americans with Disabilities Act)',
    definition: 'Federal legislation enacted in 1990 that prohibits discrimination based on disability in employment, public accommodations, transportation, and telecommunications. ADA cases represent one of the largest categories in federal civil litigation.',
  },
  {
    term: 'ADEA (Age Discrimination in Employment Act)',
    definition: 'Federal law prohibiting discrimination against employees or job applicants age 40 or older based on age. ADEA claims are commonly filed alongside Title VII employment discrimination cases in federal district courts.',
  },
  {
    term: 'AO Codes',
    definition: 'Administrative Office disposition codes used by federal courts to classify case outcomes (e.g., judgment for plaintiff, judgment for defendant, settlement, dismissed). These codes form the basis of federal case outcome statistics.',
  },
  {
    term: 'Bench Trial',
    definition: 'A trial decided by a judge without a jury. In a bench trial, the judge acts as the finder of fact and determines both the facts and legal issues in the case. Bench trials are more common in federal civil litigation than jury trials.',
  },
  {
    term: 'Brief',
    definition: 'A written legal argument submitted to a court presenting the facts, law, and reasoning supporting a party\'s position. Briefs are filed before oral arguments, particularly on appeal, and serve as the primary vehicle for legal advocacy.',
  },
  {
    term: 'Burden of Proof',
    definition: 'The obligation to prove the claims or allegations presented in a case. In civil cases, the burden is "preponderance of the evidence" (more likely than not), while in criminal cases it is "beyond a reasonable doubt" (much higher standard).',
  },
  {
    term: 'Certiorari',
    definition: 'A petition to a higher court (typically the Supreme Court) requesting review of a lower court\'s decision. "Writ of Certiorari" is the formal order granting such review. The Supreme Court receives thousands of petitions annually but grants certiorari in only a small percentage of cases.',
  },
  {
    term: 'Circuit Court',
    definition: 'One of the 13 federal appellate courts (12 regional circuits plus the Federal Circuit) that hear appeals from district courts and federal agencies. Each circuit covers a specific geographic region or subject matter area.',
  },
  {
    term: 'Class Action',
    definition: 'A lawsuit in which one or more plaintiffs sue on behalf of themselves and a large group of other people (the "class") who share similar claims or injuries. Class actions allow efficient resolution of cases involving thousands or millions of similarly situated claimants.',
    relatedLink: '/cases/class-actions',
    relatedLabel: 'View Class Action Data',
  },
  {
    term: 'Confidence Interval',
    definition: 'A statistical measure of the precision and reliability of aggregate outcome data. It indicates a range within which the true outcome rate likely falls. Larger sample sizes produce narrower, more reliable confidence intervals.',
  },
  {
    term: 'Continuance',
    definition: 'A postponement or adjournment of a scheduled court proceeding. Continuances are commonly granted to allow parties more time to prepare, obtain evidence, or address other matters before trial or hearing.',
  },
  {
    term: 'Counterclaim',
    definition: 'A claim filed by the defendant against the plaintiff in response to the plaintiff\'s complaint. Counterclaims assert that the plaintiff has caused injury or loss to the defendant and seek relief from the original plaintiff.',
  },
  {
    term: 'CourtListener',
    definition: 'A free online legal research platform operated by the Free Law Project that aggregates 10M+ federal and state court opinions and docket records. MyCaseValue uses CourtListener data to supplement federal outcome statistics.',
  },
  {
    term: 'Damages',
    definition: 'Monetary compensation awarded by a court to compensate a plaintiff for harm, loss, or injury caused by the defendant. Damages may be compensatory (reimbursement for actual losses) or punitive (intended to punish and deter wrongdoing).',
  },
  {
    term: 'Default Judgment',
    definition: 'A judgment entered by the court against a defendant who fails to respond to a complaint or appear in court. Default judgments are typically automatic victories for the plaintiff and are coded as defendant liability in outcome statistics.',
  },
  {
    term: 'Defendant',
    definition: 'The party being sued or the person/entity accused of a crime. In civil litigation, the defendant is the respondent to the plaintiff\'s claims and bears the burden of defending against them.',
  },
  {
    term: 'Deposition',
    definition: 'A sworn out-of-court testimony given by a witness or party during the discovery phase, recorded by a court reporter. Depositions allow attorneys to question the other party and gather evidence before trial.',
  },
  {
    term: 'Discovery',
    definition: 'The pre-trial process in which both parties exchange evidence, documents, and testimony to prepare for trial. Discovery is often the longest and most costly phase of federal litigation and includes depositions, document requests, and interrogatories.',
  },
  {
    term: 'Dismissal',
    definition: 'A court order ending a case before trial, typically granted on a motion by the defendant. Common grounds include lack of jurisdiction, failure to state a legal claim, or settlement. Dismissals are a major category of case outcomes in federal courts.',
  },
  {
    term: 'Disposition',
    definition: 'The final outcome or resolution of a case, including verdicts, settlements, dismissals, transfers, or other terminal events. Disposition codes are the primary way federal courts classify how cases end.',
  },
  {
    term: 'Docket',
    definition: 'The court\'s official record of all filings, pleadings, orders, and events in a particular case. The docket is maintained by the court clerk and provides a chronological history of case activity and is publicly accessible through PACER.',
  },
  {
    term: 'ERISA (Employee Retirement Income Security Act)',
    definition: 'Federal law regulating employee benefit plans, including pensions and health insurance. ERISA claims involve disputes over employee benefits and plan administration and represent a distinct category of federal civil litigation.',
  },
  {
    term: 'FDCPA (Fair Debt Collection Practices Act)',
    definition: 'Federal statute prohibiting abusive, unfair, or deceptive practices by debt collectors. FDCPA violations are a major source of consumer litigation in federal courts, often handled as class actions.',
  },
  {
    term: 'FJC IDB (Federal Judicial Center Integrated Database)',
    definition: 'The official federal government database of all federal civil cases filed since 1970, containing 5.1M+ case records maintained by the Federal Judicial Center. It is the primary data source for MyCaseValue outcome statistics.',
  },
  {
    term: 'Federal District',
    definition: 'One of 94 federal districts organized geographically across the United States. Each district has at least one federal courthouse and district court, and together they handle all federal civil and criminal cases.',
    relatedLink: '/districts',
    relatedLabel: 'Explore All Districts',
  },
  {
    term: 'Injunction',
    definition: 'A court order requiring a party to do something or to refrain from doing something. Injunctions are equitable remedies (not monetary damages) used to prevent irreparable harm or enforce legal duties.',
  },
  {
    term: 'Interrogatories',
    definition: 'Written questions that one party sends to another party during discovery, requiring written answers under oath. Interrogatories are a common discovery tool for obtaining factual information and admissions.',
  },
  {
    term: 'Judgment',
    definition: 'The court\'s final determination of the parties\' rights and liabilities in a case. A judgment resolves the claims presented and may award damages, grant an injunction, or determine other relief as requested.',
  },
  {
    term: 'Jurisdiction',
    definition: 'The legal authority of a court to hear and decide a particular case. Federal courts have jurisdiction over cases involving federal questions, diversity of citizenship, or other matters within the scope of federal authority.',
  },
  {
    term: 'Jury Trial',
    definition: 'A trial in which a jury of ordinary citizens decides questions of fact, while the judge determines questions of law. Jury trials are less common in modern federal litigation (occurring in roughly 1-2% of federal cases), with most cases settling or being decided by judges.',
  },
  {
    term: 'Median Recovery',
    definition: 'The middle value in a distribution of settlement or judgment amounts—the amount above which 50% of recoveries fall and below which 50% fall. Median recovery is often more representative than averages of typical case outcomes.',
  },
  {
    term: 'Mediation',
    definition: 'A voluntary alternative dispute resolution process in which a neutral third party (mediator) assists the parties in negotiating a settlement. Mediation is often less costly and faster than litigation.',
  },
  {
    term: 'Motion to Dismiss',
    definition: 'A legal motion filed by the defendant asking the court to throw out the case, typically arguing that the plaintiff\'s complaint fails to state a valid legal claim. Rule 12(b)(6) motions to dismiss are one of the most common pretrial dispositions.',
  },
  {
    term: 'NOS Code (Nature of Suit)',
    definition: 'A three-digit classification code assigned to every federal case indicating the legal category (e.g., 442 for Employment Discrimination, 365 for Personal Injury). NOS codes are the standard way federal courts categorize case types.',
    relatedLink: '/nos',
    relatedLabel: 'Browse All NOS Codes',
  },
  {
    term: 'P10/P50/P90 Percentile',
    definition: 'Statistical measures showing outcome values at specific points in a distribution. P10 is the 10th percentile (bottom 10%), P50 is the median (50th percentile), and P90 is the 90th percentile (top 10%). These help describe settlement and verdict ranges.',
  },
  {
    term: 'PACER (Public Access to Court Electronic Records)',
    definition: 'The federal judiciary\'s official online system for accessing federal court docket sheets, filings, and documents. PACER contains the authoritative record for all federal cases but charges per-page access fees (though some documents are free through RECAP).',
  },
  {
    term: 'Plaintiff',
    definition: 'The party initiating a civil lawsuit by filing a complaint. The plaintiff is the person or entity asserting a claim and seeking relief (damages, injunction, etc.) from the defendant.',
  },
  {
    term: 'Pro Se',
    definition: 'A legal term meaning "for oneself"—referring to someone representing themselves in court without an attorney. Pro se litigants are common in federal court and often face disadvantages in outcomes compared to represented parties.',
  },
  {
    term: 'RECAP (Recap Archive)',
    definition: 'A free, crowdsourced archive of PACER documents operated by the Free Law Project. RECAP users contribute court filings they\'ve purchased on PACER, making them freely accessible and reducing public PACER fees.',
  },
  {
    term: 'Remand',
    definition: 'The action of an appellate court sending a case back to a lower court for further proceedings or a new trial. A remand typically occurs when the appellate court determines the lower court made an error requiring correction.',
  },
  {
    term: 'Sample Size',
    definition: 'The number of cases included in a statistical aggregate or analysis. Larger sample sizes increase statistical reliability and narrow confidence intervals. MyCaseValue flags aggregates with fewer than 100 cases as having reduced confidence.',
  },
  {
    term: 'Section 1983',
    definition: 'A federal statute allowing civil lawsuits against state and local government officials for constitutional violations. Section 1983 claims (named after 42 U.S.C. § 1983) are a major category of federal civil litigation involving civil rights.',
  },
  {
    term: 'Settlement',
    definition: 'An agreement between parties to resolve a dispute out of court, typically involving a monetary payment. Settlements represent the vast majority of case outcomes in federal litigation (roughly 95%+ of cases).',
  },
  {
    term: 'Statute of Limitations',
    definition: 'A legal deadline for filing a lawsuit, varying by case type and jurisdiction. Once the deadline passes, a claimant loses the right to sue. Statutes of limitations are a critical factor in timing case filings.',
  },
  {
    term: 'Subpoena',
    definition: 'A court order requiring a witness to testify at a deposition or trial, or requiring the production of documents or other evidence. Subpoenas are a fundamental tool for compelling participation in litigation.',
  },
  {
    term: 'Summary Judgment',
    definition: 'A court ruling that grants judgment to one party without trial, typically when no genuine dispute of material fact exists and one party is entitled to judgment as a matter of law. Summary judgment is a common pretrial disposition.',
  },
  {
    term: 'TCPA (Telephone Consumer Protection Act)',
    definition: 'Federal law restricting telemarketing, autodialers, and text messaging. TCPA violations are a major source of consumer litigation in federal courts, often pursued as class actions with significant damages.',
  },
  {
    term: 'Title VII',
    definition: 'The primary federal employment discrimination statute (Title VII of the Civil Rights Act of 1964) prohibiting discrimination based on race, color, religion, sex, or national origin. Title VII claims are among the largest categories of federal civil cases.',
  },
  {
    term: 'Tort',
    definition: 'A civil wrong (other than breach of contract) that causes injury or loss to another and creates legal liability. Torts are the basis for personal injury lawsuits and include negligence, intentional torts, and strict liability.',
  },
  {
    term: 'Trial Verdict',
    definition: 'A final decision by a judge or jury resolving the disputed facts and legal issues in a case. Verdicts can be for the plaintiff (liability) or defendant (no liability) and represent roughly 1-2% of federal civil case outcomes.',
  },
  {
    term: 'Venue',
    definition: 'The geographic location where a lawsuit should be filed or heard. Federal venue rules determine which district court has proper jurisdiction over a case based on where events occurred or where parties reside.',
  },
  {
    term: 'Voir Dire',
    definition: 'The jury selection process in which attorneys question potential jurors to assess their impartiality and suitability to serve. Voir dire allows attorneys to identify biases and select a fair and impartial jury.',
  },
  {
    term: 'Win Rate',
    definition: 'The percentage of cases in which the plaintiff achieved a favorable outcome (verdict or settlement). Win rates are calculated only from judgment-level outcomes and are a key metric for case type evaluation.',
  },
];

// Group terms by first letter
function groupTermsByLetter(terms: GlossaryTerm[]): Map<string, GlossaryTerm[]> {
  const grouped = new Map<string, GlossaryTerm[]>();

  terms.forEach(term => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!grouped.has(letter)) {
      grouped.set(letter, []);
    }
    grouped.get(letter)!.push(term);
  });

  return new Map(Array.from(grouped.entries()).sort());
}

export default function GlossaryPage() {
  const groupedTerms = groupTermsByLetter(glossaryTerms);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const lettersWithTerms = new Set(Array.from(groupedTerms.keys()));

  return (
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#D5D8DC', background: '#00172E' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" style={{ color: '#FFFFFF' }}>
            <a href="/" className="hover:opacity-80 transition-opacity">Home</a>
            <span>/</span>
            <span>Glossary</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: '#E8171F', color: '#FFFFFF', borderRadius: '2px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5"><path d="M12 2L2 7V12C2 16.5 6.48 20.68 12 22C17.52 20.68 22 16.5 22 12V7L12 2Z"/></svg>
            REFERENCE
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-1.5px', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
            Legal & Data Glossary
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#FFFFFF', maxWidth: '600px', fontFamily: 'var(--font-body)' }}>
            Plain-English definitions of federal court terms, data concepts, and legal statutes used throughout MyCaseValue.
          </p>
          <div className="mt-6 inline-block px-3 py-1.5 text-[13px] font-semibold" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderRadius: '2px' }}>
            {glossaryTerms.length} terms defined
          </div>
        </div>
      </div>

      {/* Alphabet Navigation */}
      <div style={{ background: '#FFFFFF', borderBottom: `1px solid #D5D8DC` }}>
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-2">
            {alphabet.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '2px',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                  color: lettersWithTerms.has(letter) ? '#E8171F' : '#A9AEB3',
                  background: lettersWithTerms.has(letter) ? 'transparent' : '#F5F6F7',
                  cursor: lettersWithTerms.has(letter) ? 'pointer' : 'default',
                }}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div style={{ background: '#FFFFFF', borderRadius: '2px', border: `1px solid #D5D8DC`, padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          {/* Letter-grouped terms */}
          {Array.from(groupedTerms.entries()).map(([letter, terms]) => (
            <div key={letter} className="mb-12" id={`letter-${letter}`}>
              {/* Letter header */}
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: '#E8171F',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: `2px solid #D5D8DC`,
              }}>
                {letter}
              </div>

              {/* Terms in this letter */}
              <div className="space-y-8">
                {terms.map((term, idx) => (
                  <div key={idx}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-display)',
                      color: '#212529',
                      marginBottom: '8px',
                    }}>
                      {term.term}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#455A64',
                      marginBottom: term.relatedLink ? '12px' : 0,
                    }}>
                      {term.definition}
                    </p>
                    {term.relatedLink && (
                      <>
                        <style>{`
                          .glossary-related-link:hover {
                            opacity: 0.75;
                          }
                        `}</style>
                        <a href={term.relatedLink} className="glossary-related-link" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#E8171F',
                          textDecoration: 'none',
                          transition: 'opacity 200ms ease',
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          {term.relatedLabel}
                        </a>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider between letters (except after last) */}
              {letter !== Array.from(groupedTerms.keys()).pop() && (
                <div style={{
                  borderBottom: `1px solid #D5D8DC`,
                  marginTop: '24px',
                  marginBottom: '24px',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t" style={{ borderColor: '#D5D8DC' }}>
          <p className="text-sm mb-4" style={{ color: '#455A64' }}>Have a term you think should be in this glossary?</p>
          <a href="mailto:support@mycasevalue.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', color: '#212529', borderRadius: '2px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Suggest a Term
          </a>
        </div>
      </div>

      {/* Related Tools */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <style>{`
          .glossary-tool-card {
            background: #FFFFFF;
            border: 1px solid #D5D8DC;
            border-radius: 2px;
            text-decoration: none;
            display: block;
            transition: all 200ms ease;
            padding: 20px;
          }

          .glossary-tool-card:hover {
            border-color: #E8171F;
            box-shadow: 0 2px 8px rgba(232, 23, 31, 0.12);
          }
        `}</style>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529', marginBottom: '24px', fontFamily: 'var(--font-display)' }}>
          Related Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/translate">
            <a className="glossary-tool-card group">
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Case Translator</div>
              <div style={{ fontSize: '13px', lineHeight: 1.5, color: '#455A64' }}>Convert between case types and legal citations.</div>
            </a>
          </Link>

          <Link href="/nos-explorer">
            <a className="glossary-tool-card group">
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>NOS Explorer</div>
              <div style={{ fontSize: '13px', lineHeight: 1.5, color: '#455A64' }}>Browse and explore Nature of Suit codes.</div>
            </a>
          </Link>

          <Link href="/search">
            <a className="glossary-tool-card group">
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Case Search</div>
              <div style={{ fontSize: '13px', lineHeight: 1.5, color: '#455A64' }}>Search federal court cases by type and location.</div>
            </a>
          </Link>

          <Link href="/methodology">
            <a className="glossary-tool-card group">
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#212529', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Our Methodology</div>
              <div style={{ fontSize: '13px', lineHeight: 1.5, color: '#455A64' }}>Learn how we analyze federal court data.</div>
            </a>
          </Link>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'Legal & Data Glossary',
            description: 'Plain-English definitions of federal court terms, data concepts, and legal statutes',
            url: `${SITE_URL}/glossary`,
            hasDefinedTerm: glossaryTerms.map(term => ({
              '@type': 'DefinedTerm',
              name: term.term,
              definition: term.definition,
            })),
          }),
        }}
      />
    </div>
  );
}
