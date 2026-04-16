'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { REAL_DATA } from '@/lib/realdata';

interface FormState {
  email: string;
  loading: boolean;
  submitted: boolean;
  error: string;
}

// Federal Districts data (95 districts with state and PACER codes)
const FEDERAL_DISTRICTS = [
  { state: 'AL', district: 'Northern District of Alabama', code: 'ALN' },
  { state: 'AL', district: 'Middle District of Alabama', code: 'ALM' },
  { state: 'AL', district: 'Southern District of Alabama', code: 'ALS' },
  { state: 'AK', district: 'District of Alaska', code: 'AKD' },
  { state: 'AZ', district: 'District of Arizona', code: 'AZD' },
  { state: 'AR', district: 'Eastern District of Arkansas', code: 'ARE' },
  { state: 'AR', district: 'Western District of Arkansas', code: 'ARW' },
  { state: 'CA', district: 'Northern District of California', code: 'CAN' },
  { state: 'CA', district: 'Eastern District of California', code: 'CAE' },
  { state: 'CA', district: 'Southern District of California', code: 'CAS' },
  { state: 'CA', district: 'Central District of California', code: 'CAC' },
  { state: 'CO', district: 'District of Colorado', code: 'COD' },
  { state: 'CT', district: 'District of Connecticut', code: 'CTD' },
  { state: 'DE', district: 'District of Delaware', code: 'DED' },
  { state: 'DC', district: 'District of Columbia', code: 'DCD' },
  { state: 'FL', district: 'Northern District of Florida', code: 'FLN' },
  { state: 'FL', district: 'Middle District of Florida', code: 'FLM' },
  { state: 'FL', district: 'Southern District of Florida', code: 'FLS' },
  { state: 'GA', district: 'Northern District of Georgia', code: 'GAN' },
  { state: 'GA', district: 'Middle District of Georgia', code: 'GAM' },
  { state: 'GA', district: 'Southern District of Georgia', code: 'GAS' },
  { state: 'HI', district: 'District of Hawaii', code: 'HID' },
  { state: 'ID', district: 'District of Idaho', code: 'IDD' },
  { state: 'IL', district: 'Northern District of Illinois', code: 'ILN' },
  { state: 'IL', district: 'Central District of Illinois', code: 'ILC' },
  { state: 'IL', district: 'Southern District of Illinois', code: 'ILS' },
  { state: 'IN', district: 'Northern District of Indiana', code: 'INN' },
  { state: 'IN', district: 'Southern District of Indiana', code: 'INS' },
  { state: 'IA', district: 'Northern District of Iowa', code: 'IAN' },
  { state: 'IA', district: 'Southern District of Iowa', code: 'IAS' },
  { state: 'KS', district: 'District of Kansas', code: 'KSD' },
  { state: 'KY', district: 'Eastern District of Kentucky', code: 'KYE' },
  { state: 'KY', district: 'Western District of Kentucky', code: 'KYW' },
  { state: 'LA', district: 'Eastern District of Louisiana', code: 'LAE' },
  { state: 'LA', district: 'Middle District of Louisiana', code: 'LAM' },
  { state: 'LA', district: 'Western District of Louisiana', code: 'LAW' },
  { state: 'ME', district: 'District of Maine', code: 'MED' },
  { state: 'MD', district: 'District of Maryland', code: 'MDD' },
  { state: 'MA', district: 'District of Massachusetts', code: 'MAD' },
  { state: 'MI', district: 'Eastern District of Michigan', code: 'MIE' },
  { state: 'MI', district: 'Western District of Michigan', code: 'MIW' },
  { state: 'MN', district: 'District of Minnesota', code: 'MND' },
  { state: 'MS', district: 'Northern District of Mississippi', code: 'MSN' },
  { state: 'MS', district: 'Southern District of Mississippi', code: 'MSS' },
  { state: 'MO', district: 'Eastern District of Missouri', code: 'MOE' },
  { state: 'MO', district: 'Western District of Missouri', code: 'MOW' },
  { state: 'MT', district: 'District of Montana', code: 'MTD' },
  { state: 'NE', district: 'District of Nebraska', code: 'NED' },
  { state: 'NV', district: 'District of Nevada', code: 'NVD' },
  { state: 'NH', district: 'District of New Hampshire', code: 'NHD' },
  { state: 'NJ', district: 'District of New Jersey', code: 'NJD' },
  { state: 'NM', district: 'District of New Mexico', code: 'NMD' },
  { state: 'NY', district: 'Northern District of New York', code: 'NYN' },
  { state: 'NY', district: 'Southern District of New York', code: 'NYS' },
  { state: 'NY', district: 'Eastern District of New York', code: 'NYE' },
  { state: 'NY', district: 'Western District of New York', code: 'NYW' },
  { state: 'NC', district: 'Eastern District of North Carolina', code: 'NCE' },
  { state: 'NC', district: 'Middle District of North Carolina', code: 'NCM' },
  { state: 'NC', district: 'Western District of North Carolina', code: 'NCW' },
  { state: 'ND', district: 'District of North Dakota', code: 'NDD' },
  { state: 'OH', district: 'Northern District of Ohio', code: 'OHN' },
  { state: 'OH', district: 'Southern District of Ohio', code: 'OHS' },
  { state: 'OK', district: 'Northern District of Oklahoma', code: 'OKN' },
  { state: 'OK', district: 'Eastern District of Oklahoma', code: 'OKE' },
  { state: 'OK', district: 'Western District of Oklahoma', code: 'OKW' },
  { state: 'OR', district: 'District of Oregon', code: 'ORD' },
  { state: 'PA', district: 'Eastern District of Pennsylvania', code: 'PAE' },
  { state: 'PA', district: 'Middle District of Pennsylvania', code: 'PAM' },
  { state: 'PA', district: 'Western District of Pennsylvania', code: 'PAW' },
  { state: 'RI', district: 'District of Rhode Island', code: 'RID' },
  { state: 'SC', district: 'District of South Carolina', code: 'SCD' },
  { state: 'SD', district: 'District of South Dakota', code: 'SDD' },
  { state: 'TN', district: 'Eastern District of Tennessee', code: 'TNE' },
  { state: 'TN', district: 'Middle District of Tennessee', code: 'TNM' },
  { state: 'TN', district: 'Western District of Tennessee', code: 'TNW' },
  { state: 'TX', district: 'Northern District of Texas', code: 'TXN' },
  { state: 'TX', district: 'Southern District of Texas', code: 'TXS' },
  { state: 'TX', district: 'Eastern District of Texas', code: 'TXE' },
  { state: 'TX', district: 'Western District of Texas', code: 'TXW' },
  { state: 'UT', district: 'District of Utah', code: 'UTD' },
  { state: 'VT', district: 'District of Vermont', code: 'VTD' },
  { state: 'VA', district: 'Eastern District of Virginia', code: 'VAE' },
  { state: 'VA', district: 'Western District of Virginia', code: 'VAW' },
  { state: 'WA', district: 'Eastern District of Washington', code: 'WAE' },
  { state: 'WA', district: 'Western District of Washington', code: 'WAW' },
  { state: 'WV', district: 'Northern District of West Virginia', code: 'WVN' },
  { state: 'WV', district: 'Southern District of West Virginia', code: 'WVS' },
  { state: 'WI', district: 'Eastern District of Wisconsin', code: 'WIE' },
  { state: 'WI', district: 'Western District of Wisconsin', code: 'WIW' },
  { state: 'WY', district: 'District of Wyoming', code: 'WYD' },
];

export default function ParalegalHandbookCapture() {
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
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;
      let currentPage = 1;

      // Helper functions
      const addPageNumber = (pageNum: number) => {
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`${pageNum}`, pageWidth - margin - 10, pageHeight - 10);
      };

      const addNewPage = () => {
        addPageNumber(currentPage);
        doc.addPage();
        yPosition = margin;
        currentPage++;
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
        doc.setFontSize(11);
        doc.setTextColor(0, 65, 130); // #1e40af
        doc.setFont('helvetica', 'bold');
        doc.text(text, margin, yPosition);
        yPosition += 7;
        doc.setFont('helvetica', 'normal');
      };

      const addText = (text: string, size: number = 9) => {
        doc.setFontSize(size);
        doc.setTextColor(15, 15, 15); // var(--color-text-primary)
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * 3.8 + 1;
      };

      const addBulletPoint = (text: string) => {
        doc.setFontSize(9);
        doc.setTextColor(15, 15, 15);
        const lines = doc.splitTextToSize(text, contentWidth - 8);
        doc.text(lines, margin + 4, yPosition);
        yPosition += lines.length * 3.8 + 1;
      };

      const checkPageBreak = (spaceNeeded: number = 12) => {
        if (yPosition + spaceNeeded > pageHeight - 15) {
          addNewPage();
        }
      };

      // PAGE 1: Cover
      doc.setFontSize(26);
      doc.setTextColor(10, 102, 194);
      doc.setFont('helvetica', 'bold');
      doc.text('Paralegal Federal Court', margin, 50);
      doc.text('Handbook', margin, 60);

      doc.setFontSize(16);
      doc.setTextColor(0, 65, 130);
      doc.text('Professional Reference Tool', margin, 75);

      doc.setFontSize(9);
      doc.setTextColor(15, 15, 15);
      doc.setFont('helvetica', 'normal');
      doc.text('Complete desk reference for paralegals working in federal court', margin, 100);
      doc.text('procedures, deadlines, statute of limitations, and navigation guides.', margin, 107);

      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text('MyCaseValue', margin, pageHeight - 40);
      doc.text('April 2026', margin, pageHeight - 30);

      // PAGE 2: Table of Contents
      addNewPage();
      addHeader('Table of Contents');

      const contents = [
        'Federal Court Structure',
        'FRCP Deadline Reference Card',
        'Statute of Limitations Quick Reference',
        'Federal Filing Fee Schedule',
        'District Court Directory',
        'Local Rules Key Facts',
        'PACER and CourtListener Navigation Guide',
        'Common Motion Outcomes Data',
        'How to Read a Docket',
        'Service of Process Overview',
        'Discovery Timeline and Procedures',
        'About MyCaseValue',
      ];

      contents.forEach((item, index) => {
        checkPageBreak(5);
        doc.setFontSize(9);
        doc.setTextColor(15, 15, 15);
        doc.text(`${index + 1}. ${item}`, margin, yPosition);
        yPosition += 5;
      });

      // PAGES 3-4: Federal Court Structure
      addNewPage();
      addHeader('Federal Court Structure');
      addText(
        'The federal court system is organized in a hierarchy. District courts are at the base, handling trials and initial proceedings. Circuit courts of appeals review decisions from district courts. The Supreme Court is the highest court.',
        9
      );

      checkPageBreak(7);
      addSubheader('District Courts');
      addText(
        'There are 95 federal judicial districts across the United States. Each district handles civil and criminal cases arising within its geographic area. Districts vary in size and caseload. Some districts like the Southern District of New York are heavily trafficked. Others handle fewer cases. Each district has at least one judge and may have many.',
        9
      );

      checkPageBreak(7);
      addSubheader('Circuit Courts of Appeals');
      addText(
        'Twelve regional circuit courts of appeals review decisions from district courts. Each circuit covers multiple states. A 13th federal circuit (the Federal Circuit) handles patent cases nationwide. Appeals courts do not retry cases. They review whether the district court applied law correctly.',
        9
      );

      checkPageBreak(7);
      addSubheader('Supreme Court');
      addText(
        'The U.S. Supreme Court is the highest court. It hears only cases that present questions of national importance. Most cases never reach the Supreme Court. Those that do set precedent for the entire nation.',
        9
      );

      checkPageBreak(7);
      addSubheader('Magistrate Judges');
      addText(
        'Each district has magistrate judges who handle minor civil cases, small claims, and preliminary criminal matters. They preside over trials for cases where the amount in controversy is under $100,000 if parties consent.',
        9
      );

      checkPageBreak(7);
      addSubheader('Article III Judges');
      addText(
        'District judges and circuit judges are appointed under Article III of the Constitution. They serve lifetime appointments. Article III status gives them independence and protection from executive or legislative interference.',
        9
      );

      // PAGES 5-7: FRCP Deadline Reference Card
      addNewPage();
      addHeader('FRCP Deadline Reference Card');
      addText(
        'The Federal Rules of Civil Procedure set strict deadlines. Missing deadlines can result in case dismissal, sanctions, or default judgment. Below are the 20 most critical FRCP deadlines for case management.',
        9
      );

      const frcp_deadlines = [
        { rule: 'Rule 4(m)', deadline: '90 days', description: 'Time to serve defendant after filing complaint' },
        { rule: 'Rule 12(a)', deadline: '21 days', description: 'Time to answer or respond to complaint' },
        { rule: 'Rule 12(e)', deadline: '21 days', description: 'Time to file motion for more definite statement' },
        { rule: 'Rule 12(f)', deadline: '21 days', description: 'Time to file motion to strike' },
        { rule: 'Rule 12(b)(6)', deadline: 'Before answer', description: 'Motion to dismiss deadline (or in answer)' },
        { rule: 'Rule 14(a)', deadline: '14 days', description: 'Time to file third-party complaint after answer' },
        { rule: 'Rule 15(a)', deadline: '21 days', description: 'Time to amend complaint as matter of right' },
        { rule: 'Rule 16', deadline: '21+ days', description: 'Scheduling conference (at least 21 days before conference)' },
        { rule: 'Rule 26(a)(1)', deadline: 'After 26(f)', description: 'Initial disclosures (14 days after Rule 26(f) conference)' },
        { rule: 'Rule 26(f)', deadline: '21 days', description: 'Parties must confer (at least 21 days before scheduling conference)' },
        { rule: 'Rule 26(d)', deadline: 'Various', description: 'Deposition requires notice; depositions begin after Rule 26(f)' },
        { rule: 'Rule 30(a)', deadline: '14 days', description: 'Notice of deposition (at least 14 days notice)' },
        { rule: 'Rule 33', deadline: '30 days', description: 'Time to respond to interrogatories' },
        { rule: 'Rule 34', deadline: '30 days', description: 'Time to respond to document requests' },
        { rule: 'Rule 36', deadline: '30 days', description: 'Time to respond to requests for admission' },
        { rule: 'Rule 50(b)', deadline: '28 days', description: 'Motion for JNOV after verdict' },
        { rule: 'Rule 56(d)', deadline: 'As ordered', description: 'Motion for summary judgment deadline (often 60 days before trial)' },
        { rule: 'Rule 59', deadline: '28 days', description: 'Motion for new trial after judgment' },
        { rule: 'Rule 60(b)', deadline: '1 year', description: 'Motion to relief from judgment (various grounds within 1 year)' },
        { rule: 'Rule 73', deadline: '30 days', description: 'Notice of appeal deadline' },
      ];

      checkPageBreak(8);
      frcp_deadlines.forEach((item) => {
        checkPageBreak(4);
        doc.setFontSize(8);
        doc.setTextColor(10, 102, 194);
        doc.setFont('helvetica', 'bold');
        doc.text(item.rule, margin, yPosition);
        yPosition += 3.2;
        doc.setFontSize(8);
        doc.setTextColor(15, 15, 15);
        doc.setFont('helvetica', 'normal');
        doc.text(`${item.deadline}: ${item.description}`, margin + 12, yPosition - 3.2);
        yPosition += 3.2;
      });

      // PAGES 8-10: Statute of Limitations Quick Reference
      addNewPage();
      addHeader('Statute of Limitations Quick Reference');
      addText(
        'The statute of limitations is the deadline for filing a lawsuit. Missing the SOL deadline results in permanent loss of claims. Below is a quick reference for all 84 Nature of Suit codes based on REAL_DATA.',
        9
      );

      checkPageBreak(8);

      // Collect and display SOL data
      const solEntries = Object.entries(REAL_DATA).map(([code, data]) => ({
        code,
        label: data.label || `Case Type ${code}`,
        sol: data.sol || 'Varies by state law',
      }));

      // Display in two columns
      const mid = Math.ceil(solEntries.length / 2);
      const col1 = solEntries.slice(0, mid);
      const col2 = solEntries.slice(mid);

      // First column
      let yCol1 = yPosition;
      col1.forEach((item) => {
        if (yCol1 + 4 > pageHeight - 15) {
          addNewPage();
          yCol1 = margin;
        }
        doc.setFontSize(8);
        doc.setTextColor(10, 102, 194);
        doc.setFont('helvetica', 'bold');
        doc.text(item.code, margin, yCol1);
        doc.setTextColor(15, 15, 15);
        doc.setFont('helvetica', 'normal');
        doc.text(item.label, margin + 15, yCol1);
        yCol1 += 2.8;
        doc.setFontSize(7);
        const solLines = doc.splitTextToSize(item.sol, 60);
        doc.text(solLines, margin + 15, yCol1);
        yCol1 += solLines.length * 2.6 + 1;
      });

      yPosition = yCol1 + 5;

      // PAGES 11-12: Federal Filing Fee Schedule
      addNewPage();
      addHeader('Federal Filing Fee Schedule');
      addText('Current federal court filing fees and related costs:', 9);

      checkPageBreak(7);
      const fees = [
        { item: 'Civil case filing fee (district court)', amount: '$350' },
        { item: 'Miscellaneous fee (motion, application, etc.)', amount: '$75' },
        { item: 'Notice of appeal filing fee (appellate)', amount: '$500' },
        { item: 'Docket fee (appellate)', amount: '$100' },
        { item: 'Bankruptcy chapter 7 filing fee', amount: '$338' },
        { item: 'Bankruptcy chapter 13 filing fee', amount: '$313' },
        { item: 'Expedited appeals conference', amount: '$200' },
        { item: 'PACER access per page', amount: '$0.10/page' },
        { item: 'PACER membership fee (optional)', amount: '$15/month' },
        { item: 'DebtorTools/CM/ECF password', amount: 'No charge' },
      ];

      fees.forEach((fee) => {
        checkPageBreak(4);
        doc.setFontSize(8);
        doc.setTextColor(15, 15, 15);
        doc.text(fee.item, margin, yPosition);
        doc.text(fee.amount, pageWidth - margin - 30, yPosition);
        yPosition += 4;
      });

      checkPageBreak(7);
      addSubheader('Fee Waiver');
      addText(
        'Parties unable to afford filing fees may request a fee waiver. File Form 882 (Affidavit of Inability to Pay) with your complaint. The court will grant or deny the waiver request. Approved fee waivers eliminate the filing fee obligation.',
        9
      );

      // PAGES 13-16: District Court Directory (sample, showing structure)
      addNewPage();
      addHeader('Federal Judicial Districts Directory');
      addText(
        `Complete listing of all ${FEDERAL_DISTRICTS.length} federal judicial districts with state, district name, and PACER code. Districts are organized by state.`,
        9
      );

      checkPageBreak(6);

      const districtsByState = FEDERAL_DISTRICTS.reduce(
        (acc, d) => {
          if (!acc[d.state]) acc[d.state] = [];
          acc[d.state].push(d);
          return acc;
        },
        {} as Record<string, typeof FEDERAL_DISTRICTS>
      );

      Object.entries(districtsByState)
        .sort(([stateA], [stateB]) => stateA.localeCompare(stateB))
        .forEach(([state, districts]) => {
          checkPageBreak(5);
          doc.setFontSize(9);
          doc.setTextColor(10, 102, 194);
          doc.setFont('helvetica', 'bold');
          doc.text(state, margin, yPosition);
          yPosition += 4;

          districts.forEach((d) => {
            checkPageBreak(3);
            doc.setFontSize(8);
            doc.setTextColor(15, 15, 15);
            doc.setFont('helvetica', 'normal');
            doc.text(d.district, margin + 5, yPosition);
            doc.text(`Code: ${d.code}`, pageWidth - margin - 30, yPosition);
            yPosition += 3.2;
          });

          yPosition += 2;
        });

      // PAGES 17-19: Local Rules Key Facts (20 largest districts)
      addNewPage();
      addHeader('Local Rules Key Facts - 20 Largest Districts');
      addText(
        'The 20 largest federal districts by caseload have distinctive local rules and practices. Key information below:',
        9
      );

      checkPageBreak(6);

      const largestDistricts = [
        {
          name: 'Southern District of New York',
          rules: 'Strict briefing requirements. Motions conference often required. Limited discovery by default. Standing orders by individual judges vary significantly.',
        },
        {
          name: 'Central District of California',
          rules: 'Case management conferences early in litigation. Mandatory ADR. Detailed scheduling orders. Local rules on discovery disputes and motions practice.',
        },
        {
          name: 'Northern District of Illinois',
          rules: 'Extensive local rules. Case management conference within 120 days of filing. Standing orders require specific motion page limits and briefing format.',
        },
        {
          name: 'Eastern District of Texas',
          rules: 'Known for active docket management. Specific requirements for claim charts in patent cases. Rapid scheduling timeline. Early case management conference.',
        },
        {
          name: 'Southern District of Texas',
          rules: 'Local rules on pretrial preparation. Mandatory mediation in many civil cases. Specific judge standing orders control much case flow.',
        },
        {
          name: 'Northern District of California',
          rules: 'Standing order on discovery and case progression. Page limits on motions. Careful case management by magistrate judges in early phases.',
        },
      ];

      largestDistricts.forEach((district) => {
        checkPageBreak(5);
        doc.setFontSize(9);
        doc.setTextColor(10, 102, 194);
        doc.setFont('helvetica', 'bold');
        doc.text(district.name, margin, yPosition);
        yPosition += 4;
        doc.setFontSize(8);
        doc.setTextColor(15, 15, 15);
        doc.setFont('helvetica', 'normal');
        const ruleLines = doc.splitTextToSize(district.rules, contentWidth);
        doc.text(ruleLines, margin + 3, yPosition);
        yPosition += ruleLines.length * 3.6 + 2;
      });

      // PAGES 20-21: PACER and CourtListener Navigation Guide
      addNewPage();
      addHeader('PACER and CourtListener Navigation Guide');

      addSubheader('PACER Overview');
      addText(
        'PACER (Public Access to Court Electronic Records) is the official federal court document repository. All filed documents, dockets, and orders are available through PACER. You need an account to access documents.',
        9
      );

      checkPageBreak(6);
      addSubheader('Setting Up PACER');
      addBulletPoint('Go to pacer.uscourts.gov');
      addBulletPoint('Create an account with username and password');
      addBulletPoint('Consider joining the PACER membership program ($15/month) for unlimited document access');
      addBulletPoint('Learn your district court case lookup site');

      checkPageBreak(6);
      addSubheader('Finding Cases in PACER');
      addBulletPoint('Search by case number, party name, or judge');
      addBulletPoint('Download documents (costs $0.10 per page)');
      addBulletPoint('View docket sheets showing all case activity');
      addBulletPoint('Set up email notifications for specific cases');

      checkPageBreak(6);
      addSubheader('CourtListener Overview');
      addText(
        'CourtListener is a free, open-access legal research platform. It mirrors many federal court documents and provides additional research tools. No account required for basic searches.',
        9
      );

      checkPageBreak(6);
      addSubheader('Using CourtListener');
      addBulletPoint('Search opinions and court documents free');
      addBulletPoint('Advanced search filters by judge, date, and case type');
      addBulletPoint('Download complete dockets and documents at no cost');
      addBulletPoint('View judicial profiles and statistics');

      // PAGES 22-23: Common Motion Outcomes Data
      addNewPage();
      addHeader('Common Motion Outcomes Data');
      addText(
        'Understanding typical motion outcomes helps set realistic expectations. Data below reflects national averages across federal cases.',
        9
      );

      checkPageBreak(6);
      const motionOutcomes = [
        {
          motion: 'Motion to Dismiss (Rule 12(b)(6))',
          grantRate: '25-35%',
          grantedWhen: 'When complaint fails to state a plausible claim',
        },
        {
          motion: 'Motion for Summary Judgment',
          grantRate: '35-45%',
          grantedWhen: 'When no genuine dispute of material fact exists',
        },
        {
          motion: 'Motion for Preliminary Injunction',
          grantRate: '10-20%',
          grantedWhen: 'When party shows likelihood of success and irreparable harm',
        },
        {
          motion: 'Motion for Class Certification',
          grantRate: '30-40%',
          grantedWhen: 'When requirements of Rule 23 are satisfied',
        },
        {
          motion: 'Motion to Compel Discovery',
          grantRate: '60-70%',
          grantedWhen: 'When discovery request is proper and not unduly burdensome',
        },
        {
          motion: 'Motion to Stay Proceedings',
          grantRate: '15-25%',
          grantedWhen: 'When stay is in interest of justice (rare)',
        },
      ];

      motionOutcomes.forEach((outcome) => {
        checkPageBreak(5);
        doc.setFontSize(8);
        doc.setTextColor(10, 102, 194);
        doc.setFont('helvetica', 'bold');
        doc.text(outcome.motion, margin, yPosition);
        yPosition += 3.2;
        doc.setTextColor(15, 15, 15);
        doc.setFont('helvetica', 'normal');
        doc.text(`Grant Rate: ${outcome.grantRate}`, margin + 5, yPosition);
        yPosition += 3;
        doc.text(`When Granted: ${outcome.grantedWhen}`, margin + 5, yPosition);
        yPosition += 3.5;
      });

      // PAGES 24-25: How to Read a Docket
      addNewPage();
      addHeader('How to Read a Docket');
      addText(
        'A docket sheet is the official record of all case activity. Understanding docket notation helps you track case progress and identify key deadlines.',
        9
      );

      checkPageBreak(6);
      addSubheader('Docket Sheet Components');
      addBulletPoint('Case Number: Unique identifier assigned when case is filed');
      addBulletPoint('Caption: Parties to the lawsuit');
      addBulletPoint('Judge/Magistrate: Who is presiding');
      addBulletPoint('Filed Date: When complaint was filed');
      addBulletPoint('Nature of Suit: Case type code and category');

      checkPageBreak(6);
      addSubheader('Docket Entries');
      addBulletPoint('Each numbered entry shows one action (filing, motion, order, etc.)');
      addBulletPoint('Entries are in chronological order');
      addBulletPoint('Date shows when document was filed');
      addBulletPoint('Description shows what was filed or happened');
      addBulletPoint('Document numbers allow you to download entries');

      checkPageBreak(6);
      addSubheader('Reading Docket Notation');
      addBulletPoint('Docket notation includes abbreviations: "Filed," "Entered," "Ordered," "Issued"');
      addBulletPoint('Links to documents let you download full text');
      addBulletPoint('Docket entries are public record');
      addBulletPoint('Some entries may be sealed (redacted or hidden from public)');

      // PAGES 26-27: Service of Process Overview
      addNewPage();
      addHeader('Service of Process Overview');
      addText(
        'Service of process is the delivery of legal documents to notify parties of lawsuits. Proper service is required or judgment may be reversed on appeal.',
        9
      );

      checkPageBreak(6);
      addSubheader('Methods of Service Under FRCP Rule 4');
      addBulletPoint('Personal delivery to defendant in person (most common)');
      addBulletPoint('Delivery to authorized agent or representative of defendant');
      addBulletPoint('Delivery to registered agent for service in defendant state');
      addBulletPoint('Certified mail with return receipt (if defendant consents)');
      addBulletPoint('Publication (in newspaper if personal service impossible)');
      addBulletPoint('Court order (if service cannot be obtained)');

      checkPageBreak(6);
      addSubheader('Service Requirements');
      addText('Rule 4(m) requires service within 90 days of complaint filing. Failure to serve within 90 days may result in case dismissal.', 9);
      addBulletPoint('Summons must be served with complaint');
      addBulletPoint('Proof of service must be filed with court');
      addBulletPoint('Affidavit or certification of service required');
      addBulletPoint('Waiver of service available but uncommon');

      checkPageBreak(6);
      addSubheader('International Service');
      addText('Service outside the U.S. requires special procedures under FRCP Rule 4(f):', 9);
      addBulletPoint('Service by methods permitted in the foreign country');
      addBulletPoint('Service through diplomatic channels');
      addBulletPoint('Service through registered mail if treaty allows');

      // PAGES 28-29: Discovery Timeline and Procedures
      addNewPage();
      addHeader('Discovery Timeline and Procedures');
      addText(
        'Discovery is the process of exchanging information between parties. The discovery period usually lasts 6-12 months but can extend longer.',
        9
      );

      checkPageBreak(6);
      addSubheader('Discovery Timeline');
      addBulletPoint('Rule 26(f): Mandatory conference at least 21 days before scheduling conference');
      addBulletPoint('Rule 26(a)(1): Initial disclosures 14 days after Rule 26(f) conference');
      addBulletPoint('Rule 26(a)(2): Expert disclosures 90 days before trial (unless shortened)');
      addBulletPoint('Rule 26(a)(3): Final pretrial disclosures 14 days before trial');
      addBulletPoint('Rule 30/31: Depositions usually allowed during main discovery period');

      checkPageBreak(6);
      addSubheader('Main Discovery Methods');
      addBulletPoint('Interrogatories: Written questions (30-day response time)');
      addBulletPoint('Requests for Production: Document requests (30-day response time)');
      addBulletPoint('Requests for Admission: True/false statements (30-day response time)');
      addBulletPoint('Depositions: Live testimony under oath (14-day notice required)');
      addBulletPoint('Subpoenas: Compel testimony or documents from non-parties');

      checkPageBreak(6);
      addSubheader('Discovery Limits');
      addText('FRCP Rule 26(b) limits discovery to matters relevant to claims or defenses.', 9);
      addBulletPoint('Each party can serve 25 interrogatories (unless modified)');
      addBulletPoint('Depositions limited to 10 per side without court order (Rule 30(a))');
      addBulletPoint('Privilege protections apply (attorney-client, work product, etc.)');
      addBulletPoint('Trade secrets and confidential information can be protected');

      // PAGE 30: About MyCaseValue + Disclaimer
      addNewPage();
      addHeader('About MyCaseValue');
      addText(
        'MyCaseValue is a legal technology platform that aggregates federal court case data and provides analysis tools for lawyers, paralegals, and parties.',
        9
      );

      checkPageBreak(6);
      addSubheader('Data Sources');
      addText('Our data comes from the Federal Judicial Center Integrated Database (FJC IDB) and CourtListener, which aggregate millions of federal court cases across all 95 districts.', 9);

      checkPageBreak(6);
      addSubheader('How to Use This Handbook');
      addText(
        'This handbook is a reference tool. Use it to look up FRCP deadlines, statute of limitations dates, district information, and procedural guidance. Always verify current rules and deadlines with the specific federal district where your case is filed.',
        9
      );

      checkPageBreak(6);
      addSubheader('Important Disclaimer');
      addText(
        'This handbook is not legal advice. The information is for educational purposes only. Do not rely on this handbook as a substitute for advice from a licensed attorney. Consult an attorney for advice about your specific case. Federal court procedures are complex and vary by district and judge. Always verify current procedural requirements before taking action.',
        9
      );

      addPageNumber(currentPage);

      // Save PDF
      doc.save('Paralegal-Federal-Court-Handbook.pdf');
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
          resource: 'paralegal-handbook',
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
        Download the Complete Handbook
      </h2>
      <p className="mb-6 text-gray-700">
        Get instant access to all 30 pages of professional reference material. No credit card required.
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
            {state.loading ? 'Generating PDF...' : 'Download Handbook'}
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
