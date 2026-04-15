'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';

interface FormState {
  email: string;
  loading: boolean;
  submitted: boolean;
  error: string;
}

export default function CourtGuideCapture() {
  const [state, setState] = useState<FormState>({
    email: '',
    loading: false,
    submitted: false,
    error: '',
  });

  const generatePDF = async (email: string) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Helper functions
      const addPageNumber = (pageNum: number) => {
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`Page ${pageNum}`, pageWidth - margin - 20, pageHeight - 10);
      };

      const addHeader = (text: string) => {
        doc.setFontSize(14);
        doc.setTextColor(10, 102, 194); // var(--accent-primary)
        doc.setFont('helvetica', 'bold');
        doc.text(text, margin, yPosition);
        yPosition += 10;
        doc.setFont('helvetica', 'normal');
      };

      const addSubheader = (text: string) => {
        doc.setFontSize(12);
        doc.setTextColor(15, 15, 15);
        doc.setFont('helvetica', 'bold');
        doc.text(text, margin, yPosition);
        yPosition += 8;
        doc.setFont('helvetica', 'normal');
      };

      const addText = (text: string, size: number = 10) => {
        doc.setFontSize(size);
        doc.setTextColor(15, 15, 15);
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * 4.5 + 2;
      };

      const addBulletPoint = (text: string) => {
        doc.setFontSize(10);
        doc.setTextColor(15, 15, 15);
        const lines = doc.splitTextToSize(text, contentWidth - 10);
        doc.text('', margin, yPosition);
        doc.text(lines, margin + 5, yPosition);
        yPosition += lines.length * 4.5 + 2;
      };

      const checkPageBreak = (spaceNeeded: number = 15) => {
        if (yPosition + spaceNeeded > pageHeight - 15) {
          const currentPageNum = (doc.internal as any).pages.length;
          addPageNumber(currentPageNum);
          doc.addPage();
          yPosition = margin;
        }
      };

      // PAGE 1: Cover
      doc.setFontSize(28);
      doc.setTextColor(10, 102, 194);
      doc.setFont('helvetica', 'bold');
      doc.text('Federal Court Research Guide', margin, 60);

      doc.setFontSize(20);
      doc.setTextColor(0, 65, 130);
      doc.text('for Non-Lawyers', margin, 85);

      doc.setFontSize(11);
      doc.setTextColor(15, 15, 15);
      doc.setFont('helvetica', 'normal');
      doc.text('A Plain English Guide to Understanding Federal Courts,', margin, 120);
      doc.text('Finding Case Data, and Navigating Litigation Independently', margin, 128);

      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text('MyCaseValue', margin, pageHeight - 40);
      doc.text('April 2026', margin, pageHeight - 30);

      // PAGE 2: Table of Contents
      addPageNumber(1);
      doc.addPage();
      yPosition = margin;

      addHeader('Table of Contents');

      const contents = [
        'What Is Federal Court?',
        'Finding Your Federal District',
        'Understanding Nature of Suit (NOS) Codes',
        'What Case Documents Mean',
        'How to Read Win Rates and Settlement Data',
        'How to Use MyCaseValue Step by Step',
        'Statute of Limitations - Why Timing Matters',
        'Hiring an Attorney',
        'Pro Se Resources',
        'Key Legal Terms',
      ];

      contents.forEach((item, index) => {
        checkPageBreak(6);
        doc.setFontSize(10);
        doc.setTextColor(15, 15, 15);
        doc.text(`${index + 1}. ${item}`, margin, yPosition);
        yPosition += 6;
      });

      // PAGE 3: What Is Federal Court?
      addPageNumber(2);
      doc.addPage();
      yPosition = margin;

      addHeader('What Is Federal Court?');
      addText(
        'Federal courts are the national court system. They handle cases that cross state lines or involve federal law. Not all cases go to federal court, only specific types.',
        10
      );

      checkPageBreak(8);
      addSubheader('Federal vs. State Courts');
      addText(
        'State courts handle most lawsuits - divorces, local business disputes, and crimes under state law. Federal courts handle cases that involve federal laws or disputes between people from different states. Think of federal courts as the higher-level system for cases that affect the whole country.',
        10
      );

      checkPageBreak(8);
      addSubheader('When Do Cases Go to Federal Court?');
      addText(
        'A case typically goes to federal court for two main reasons: First, if it involves a federal law or a federal question. Second, if the people involved are from different states and the amount in dispute is more than $75,000. This is called diversity jurisdiction.',
        10
      );

      checkPageBreak(8);
      addSubheader('Federal Question vs. Diversity Jurisdiction');
      addText(
        'Federal question means the case is about a federal law - like employment discrimination, trademark infringement, or bankruptcy. Diversity jurisdiction means the case is between parties from different states.',
        10
      );

      // PAGE 4: Finding Your Federal District
      addPageNumber(3);
      doc.addPage();
      yPosition = margin;

      addHeader('Finding Your Federal District');
      addText(
        'The United States is divided into 94 federal judicial districts. Your case will likely be filed in your district - the one where you live or where the defendant lives.',
        10
      );

      checkPageBreak(8);
      addSubheader('Why District Matters');
      addText(
        'Your district matters for four reasons. First, you file your case there. Second, the judges and court rules are specific to that district. Third, case outcomes vary by district - some districts favor plaintiffs, others favor defendants. Fourth, MyCaseValue organizes data by district so you can compare outcomes where you are.',
        10
      );

      checkPageBreak(8);
      addSubheader('How to Find Your District');
      addText(
        'Go to MyCaseValue or the Federal Judicial Center website. Search for your state and county. The website will show you your district. Most states have multiple districts. For example, California has four districts: Northern, Southern, Eastern, and Central.',
        10
      );

      // PAGE 5: Understanding Nature of Suit (NOS) Codes
      addPageNumber(4);
      doc.addPage();
      yPosition = margin;

      addHeader('Understanding Nature of Suit (NOS) Codes');
      addText(
        'Federal courts categorize cases using Nature of Suit codes. These are standardized codes that tell you what type of case it is. Every case filed in federal court gets a NOS code.',
        10
      );

      checkPageBreak(8);
      addSubheader('What Are NOS Codes?');
      addText(
        'NOS codes are numbers. Each number represents a type of case. For example, code 820 means copyright, code 850 means patent, and code 365 means employment discrimination. The codes help organize the millions of federal cases so you can compare similar cases.',
        10
      );

      checkPageBreak(8);
      addSubheader('Main Case Categories');
      addText(
        'Federal cases fall into broad categories: Contract cases, real property cases, torts (personal injury and property damage), civil rights, patent and intellectual property, labor and employment, and regulatory cases. Within each category are more specific types.',
        10
      );

      checkPageBreak(8);
      addSubheader('Why This Matters');
      addText(
        'When you search for your case type on MyCaseValue, you are searching by NOS code. The data you see (win rates, settlements, timelines) is specific to that code. Understanding what your case type is helps you find the right data.',
        10
      );

      // PAGE 6: What Case Documents Mean
      addPageNumber(5);
      doc.addPage();
      yPosition = margin;

      addHeader('What Case Documents Mean');
      addText(
        'Federal cases generate many documents. Each document serves a purpose. Understanding the main documents helps you follow a case and understand what is happening.',
        10
      );

      checkPageBreak(8);
      addSubheader('Complaint');
      addText(
        'The complaint is the first document filed. It tells the story of your case - what happened, who is responsible, and what you are asking for. The complaint must be specific enough that the defendant understands what they are accused of.',
        10
      );

      checkPageBreak(8);
      addSubheader('Answer');
      addText(
        'The answer is the defendant response to the complaint. They can admit facts, deny them, or say they do not know. The answer is filed within a certain time period after the complaint.',
        10
      );

      checkPageBreak(8);
      addSubheader('Motions');
      addText(
        'Motions are formal requests to the court. A motion to dismiss asks the court to throw the case out. A motion for summary judgment asks for a decision without a trial. Motions can happen at any stage of the case.',
        10
      );

      checkPageBreak(8);
      addSubheader('Discovery');
      addText(
        'Discovery is the process where both sides exchange documents and information. Interrogatories are written questions. Depositions are in-person interviews. Requests for documents ask the other side to produce files and emails.',
        10
      );

      checkPageBreak(8);
      addSubheader('Orders and Judgment');
      addText(
        'Orders are decisions by the judge during the case. A judgment is the final decision at the end. If you win, the judgment says the defendant owes you money or must do something. If you lose, the judgment dismisses your case.',
        10
      );

      // PAGE 7: How to Read Win Rates and Settlement Data
      addPageNumber(6);
      doc.addPage();
      yPosition = margin;

      addHeader('How to Read Win Rates and Settlement Data');
      addText(
        'MyCaseValue shows statistics about past cases. Understanding what these numbers mean helps you interpret your own case realistically.',
        10
      );

      checkPageBreak(8);
      addSubheader('What Win Rate Means');
      addText(
        'Win rate is the percentage of cases where the plaintiff (the person who filed the lawsuit) got a favorable outcome. A 60% win rate means 6 out of 10 similar cases resulted in a plaintiff win. But this does not mean your case will win. Your specific facts matter.',
        10
      );

      checkPageBreak(8);
      addSubheader('What Median Settlement Means');
      addText(
        'Median settlement is the middle amount paid in settled cases. If 100 cases settled, the median is the 50th case payment. Half settled for more, half for less. The median is useful because it is not skewed by very large or very small settlements.',
        10
      );

      checkPageBreak(8);
      addSubheader('What IQR Means');
      addText(
        'IQR stands for Interquartile Range. This shows where 50% of settlements fell. If the IQR is $100,000 to $500,000, that means half of all settlements were between these amounts. This helps you see the realistic range of outcomes.',
        10
      );

      checkPageBreak(8);
      addSubheader('What These Numbers Cannot Tell You');
      addText(
        'These numbers cannot predict your specific case outcome. They cannot account for the strength of your evidence, the quality of your attorney, the judge assigned, or the specific facts of your situation. Use this data to get context, not to predict your outcome.',
        10
      );

      // PAGE 8: How to Use MyCaseValue Step by Step
      addPageNumber(7);
      doc.addPage();
      yPosition = margin;

      addHeader('How to Use MyCaseValue Step by Step');
      addText(
        'MyCaseValue makes federal court research accessible. Here is how to use it.',
        10
      );

      checkPageBreak(8);
      addSubheader('Step 1: Navigate to Your Case Type');
      addText(
        'Go to MyCaseValue.com. Select your case type from the list. If you are not sure of your case type, check the Nature of Suit code from your complaint. MyCaseValue organizes cases by type so you see data relevant to your situation.',
        10
      );

      checkPageBreak(8);
      addSubheader('Step 2: Read the Report');
      addText(
        'The report shows overall statistics: how many cases of this type are filed each year, what percentage settle, what percentage go to trial, and win rates. Read this to understand general trends.',
        10
      );

      checkPageBreak(8);
      addSubheader('Step 3: Use the Calculator');
      addText(
        'The calculator lets you filter by district, judge, or year. You can see how outcomes differ in your specific district or with your specific judge. This gives you more precise information.',
        10
      );

      checkPageBreak(8);
      addSubheader('Step 4: Compare Districts');
      addText(
        'Use the comparison tool to see how your district compares to others. If your district has higher win rates for your case type, that is good information. If it has lower settlement ranges, that changes your strategy.',
        10
      );

      checkPageBreak(8);
      addSubheader('Step 5: Use AI Tools');
      addText(
        'MyCaseValue includes AI-powered research tools. You can ask questions about case outcomes, precedents, and strategies. These tools help interpret the data and provide context.',
        10
      );

      // PAGE 9: Statute of Limitations - Why Timing Matters
      addPageNumber(8);
      doc.addPage();
      yPosition = margin;

      addHeader('Statute of Limitations - Why Timing Matters');
      addText(
        'The statute of limitations is a deadline. If you do not file your lawsuit before the deadline, you lose your right to sue. This is critical.',
        10
      );

      checkPageBreak(8);
      addSubheader('What Is the Statute of Limitations?');
      addText(
        'It is a law that sets a time limit for filing a lawsuit. The clock starts when something happens to you - an injury, a contract breach, discrimination, or fraud. You must file within that time period or you cannot sue.',
        10
      );

      checkPageBreak(8);
      addSubheader('Why It Is Critical');
      addText(
        'Missing the statute of limitations deadline is permanent and usually cannot be fixed. The court will dismiss your case automatically. You cannot sue if the time period has passed. This is why timing matters more than anything else.',
        10
      );

      checkPageBreak(8);
      addSubheader('How to Find Your Statute of Limitations');
      addText(
        'Statute of limitations varies by case type and state law. A personal injury claim might have 2-3 years. A contract breach might have 4-6 years. Fraud might have longer. Federal cases are handled in federal district courts, so your statute of limitations is usually determined by the relevant federal law or the state law where your case is filed.',
        10
      );

      checkPageBreak(8);
      addSubheader('What to Do Right Now');
      addText(
        'If you think you have a case, find out your statute of limitations deadline immediately. Count backward from today. If you are within 6 months of the deadline, contact an attorney now. Do not wait.',
        10
      );

      // PAGE 10: Hiring an Attorney
      addPageNumber(9);
      doc.addPage();
      yPosition = margin;

      addHeader('Hiring an Attorney');
      addText(
        'Most federal cases require a licensed attorney. Here is what you need to know about hiring one and working with them.',
        10
      );

      checkPageBreak(8);
      addSubheader('When to Hire an Attorney');
      addText(
        'For federal cases, you should hire an attorney in almost all situations. Federal courts are complex. The rules are strict. Even simple-sounding cases require legal expertise. If you are filing or defending a federal case, hire an attorney.',
        10
      );

      checkPageBreak(8);
      addSubheader('Contingency Fees Explained');
      addText(
        'Many attorneys work on contingency for plaintiffs. This means they do not charge you upfront. Instead, they take a percentage (usually 25-40%) of what you win or settle for. If you lose and get nothing, the attorney gets nothing. This aligns your interest with theirs.',
        10
      );

      checkPageBreak(8);
      addSubheader('How to Find an Attorney');
      addText(
        'Start with the State Bar Association website for your state. They have referral services. Ask friends or family for recommendations. Look for attorneys who have experience with your specific case type. Use your research from MyCaseValue to ask informed questions.',
        10
      );

      checkPageBreak(8);
      addSubheader('What to Ask When You Call');
      addText(
        'Ask: Do you take contingency cases for my type of case? How much experience do you have with my specific case type? How many similar cases have you handled? What is your typical timeline and settlement range? What are your fees? Do you take federal cases in my district?',
        10
      );

      // PAGE 11: Pro Se Resources
      addPageNumber(10);
      doc.addPage();
      yPosition = margin;

      addHeader('Pro Se Resources');
      addText(
        'Pro se means filing a lawsuit yourself without an attorney. This is difficult in federal court but possible. Here are resources if you choose to represent yourself.',
        10
      );

      checkPageBreak(8);
      addSubheader('Filing Pro Se');
      addText(
        'To file pro se, you can go directly to your federal district court website. Each district has forms and instructions. You will file your complaint, pay a filing fee (around $300-400), and serve the defendant. It is complicated but the court provides guidance.',
        10
      );

      checkPageBreak(8);
      addSubheader('Court Self-Help Resources');
      addText(
        'Most federal districts have self-help centers. They provide free guidance on how to file, what forms to use, and basic procedures. They cannot give legal advice but they can answer procedural questions. Visit your federal district court website to find the self-help center.',
        10
      );

      checkPageBreak(8);
      addSubheader('Legal Aid Organizations');
      addText(
        'Legal Aid organizations help low-income people. They may provide free attorneys or limited representation. Go to lawhelp.org to find organizations in your area. Each state has a legal aid network.',
        10
      );

      checkPageBreak(8);
      addSubheader('Fee Waivers');
      addText(
        'If you cannot afford the filing fee, you can request a fee waiver. Fill out a form (Form 882) saying you cannot afford it. The court may waive the filing fee. This does not eliminate other costs but it helps.',
        10
      );

      // PAGE 12: Key Legal Terms
      addPageNumber(11);
      doc.addPage();
      yPosition = margin;

      addHeader('Key Legal Terms');
      addText(
        'Here are 30 essential legal terms explained in plain English.',
        10
      );

      const terms = [
        { term: 'Plaintiff', definition: 'The person who files the lawsuit.' },
        { term: 'Defendant', definition: 'The person being sued.' },
        { term: 'Complaint', definition: 'The first document filed to start a lawsuit.' },
        { term: 'Jurisdiction', definition: 'The power of a court to hear a case.' },
        { term: 'Motion', definition: 'A formal request to the court.' },
        { term: 'Discovery', definition: 'The process where both sides exchange information.' },
        { term: 'Deposition', definition: 'An in-person interview under oath.' },
        { term: 'Interrogatory', definition: 'Written questions answered under oath.' },
        { term: 'Settlement', definition: 'An agreement between parties to end the lawsuit.' },
        { term: 'Judgment', definition: 'The final decision by the court.' },
        { term: 'Verdict', definition: 'The decision by a jury.' },
        { term: 'Trial', definition: 'The formal court hearing before a judge or jury.' },
        { term: 'Appeal', definition: 'A request to a higher court to review a decision.' },
        { term: 'Statute of Limitations', definition: 'The deadline for filing a lawsuit.' },
        { term: 'Contingency Fee', definition: 'Attorney payment based on winning the case.' },
        { term: 'Pro Se', definition: 'Representing yourself without an attorney.' },
        { term: 'Affidavit', definition: 'A written statement made under oath.' },
        { term: 'Precedent', definition: 'A prior court decision that influences future cases.' },
        { term: 'Damages', definition: 'Money paid to compensate for harm.' },
        { term: 'Injunction', definition: 'A court order to do or stop doing something.' },
        { term: 'Arbitration', definition: 'Private dispute resolution outside court.' },
        { term: 'Mediation', definition: 'A neutral third party helps parties reach agreement.' },
        { term: 'Burden of Proof', definition: 'The obligation to prove facts in a case.' },
        { term: 'Evidence', definition: 'Information presented to prove or disprove facts.' },
        { term: 'Pleading', definition: 'A formal written statement filed with the court.' },
        { term: 'Motion for Summary Judgment', definition: 'A request for a decision without trial.' },
        { term: 'Discovery Dispute', definition: 'A disagreement about information exchange.' },
        { term: 'Contempt', definition: 'Violation of a court order or disrespect in court.' },
        { term: 'Subpoena', definition: 'An order to appear in court or produce documents.' },
        { term: 'Continuance', definition: 'A delay in court proceedings.' },
      ];

      terms.forEach((item) => {
        checkPageBreak(5);
        doc.setFontSize(10);
        doc.setTextColor(10, 102, 194);
        doc.setFont('helvetica', 'bold');
        doc.text(item.term, margin, yPosition);
        yPosition += 4;
        doc.setFontSize(9);
        doc.setTextColor(15, 15, 15);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(item.definition, contentWidth - 5);
        doc.text(lines, margin + 5, yPosition);
        yPosition += lines.length * 3.5 + 2;
      });

      addPageNumber(12);

      // Save PDF
      doc.save('Federal-Court-Research-Guide.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      setState((prev) => ({
        ...prev,
        error: 'Failed to generate PDF. Please try again.',
        loading: false,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.email.trim()) {
      setState((prev) => ({ ...prev, error: 'Email is required' }));
      return;
    }

    if (!state.email.includes('@')) {
      setState((prev) => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: '',
    }));

    try {
      // Submit email to API
      const response = await fetch('/api/resources/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.email.toLowerCase().trim(),
          resource: 'court-guide',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save email');
      }

      // Generate and download PDF
      await generatePDF(state.email);

      setState((prev) => ({
        ...prev,
        submitted: true,
        loading: false,
        email: '',
      }));

      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, submitted: false }));
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setState((prev) => ({
        ...prev,
        error: 'An error occurred. Please try again.',
        loading: false,
      }));
    }
  };

  return (
    <section className="rounded-lg border-2 border-blue-200 bg-blue-50 p-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Download the Complete Guide
      </h2>
      <p className="mb-6 text-gray-700">
        Get instant access to all 12 pages. No credit card required.
      </p>

      {state.submitted ? (
        <div className="rounded-lg bg-green-50 p-6 text-center">
          <h3 className="mb-2 font-semibold text-green-900">
            Download started!
          </h3>
          <p className="text-green-800">
            Check your browser downloads folder for the PDF.
          </p>
          <p className="mt-2 text-sm text-green-700">
            We have also sent a copy to {state.email}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  email: e.target.value,
                  error: '',
                }))
              }
              placeholder="you@example.com"
              className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={state.loading}
            />
          </div>

          {state.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={state.loading}
            className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            {state.loading ? 'Generating PDF...' : 'Download Guide'}
          </button>

          <p className="text-xs text-gray-600">
            Your email will only be used to send you resources and updates about MyCaseValue.
            We never share or sell your information.
            <a href="/privacy" className="ml-1 text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      )}
    </section>
  );
}
