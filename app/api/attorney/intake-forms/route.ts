import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type IntakeFormInput = {
  caseType: string;
  category: string;
};

type FormField = {
  label: string;
  type: 'text' | 'date' | 'email' | 'phone' | 'number' | 'textarea' | 'checkbox-group';
  required: boolean;
  placeholder?: string;
  options?: string[];
};

type FormSection = {
  title: string;
  fields: FormField[];
};

const formTemplates: Record<string, { sections: FormSection[]; disclaimer: string }> = {
  employment: {
    sections: [
      {
        title: 'Client Information',
        fields: [
          { label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
          { label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
          { label: 'Phone Number', type: 'phone', required: true, placeholder: '(555) 123-4567' },
          { label: 'Date of Birth', type: 'date', required: false },
          { label: 'Current Address', type: 'text', required: true, placeholder: '123 Main St, City, State' },
        ],
      },
      {
        title: 'Employment Information',
        fields: [
          { label: 'Employer Name', type: 'text', required: true, placeholder: 'Company Name' },
          { label: 'Job Title/Position', type: 'text', required: true, placeholder: 'Job Title' },
          { label: 'Department', type: 'text', required: false, placeholder: 'Department Name' },
          { label: 'Direct Supervisor Name', type: 'text', required: false, placeholder: 'Supervisor Name' },
          { label: 'Supervisor Contact Information', type: 'text', required: false },
          { label: 'Employment Start Date', type: 'date', required: true },
          { label: 'Employment End Date (if applicable)', type: 'date', required: false },
          { label: 'Salary/Wage Amount', type: 'number', required: false, placeholder: 'Annual salary' },
        ],
      },
      {
        title: 'Nature of Claim',
        fields: [
          {
            label: 'Type of Discrimination/Issue',
            type: 'checkbox-group',
            required: true,
            options: [
              'Wrongful Termination',
              'Discrimination (Race, Gender, Age, Religion, etc.)',
              'Sexual Harassment',
              'Unpaid Wages/Overtime',
              'Retaliation',
              'Hostile Work Environment',
              'Whistleblower Retaliation',
              'Disability Discrimination (ADA)',
              'FMLA Violation',
              'Other',
            ],
          },
          { label: 'Detailed Description of Incident(s)', type: 'textarea', required: true, placeholder: 'Please describe what happened in detail...' },
          { label: 'Date(s) of Incident', type: 'date', required: true },
          { label: 'Witnesses to Incident', type: 'text', required: false, placeholder: 'Names and positions of witnesses' },
        ],
      },
      {
        title: 'Damages',
        fields: [
          { label: 'Lost Wages (Amount)', type: 'number', required: false, placeholder: 'In dollars' },
          { label: 'Medical/Psychological Treatment Costs', type: 'number', required: false },
          { label: 'Other Economic Damages', type: 'number', required: false },
          { label: 'Describe Non-Economic Damages (emotional distress, etc.)', type: 'textarea', required: false },
        ],
      },
      {
        title: 'Prior Actions',
        fields: [
          { label: 'Have you filed an EEOC charge?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'EEOC Charge Number/Date (if applicable)', type: 'text', required: false },
          { label: 'Have you filed any internal complaints?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Description of Internal Complaint Process', type: 'textarea', required: false },
          { label: 'Any Prior Legal Action on This Matter?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Conflict Check',
        fields: [
          { label: 'Other Parties Involved', type: 'text', required: false, placeholder: 'Names of opposing parties, co-workers, etc.' },
          { label: 'Have You Previously Hired Our Firm?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Any Family Relationships with Potential Opposing Parties?', type: 'text', required: false },
        ],
      },
    ],
    disclaimer:
      'This intake form is confidential and protected by attorney-client privilege. Information provided will be used solely for evaluating your case. Do not include any information you do not wish to disclose.',
  },

  'personal-injury': {
    sections: [
      {
        title: 'Client Information',
        fields: [
          { label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
          { label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
          { label: 'Phone Number', type: 'phone', required: true, placeholder: '(555) 123-4567' },
          { label: 'Date of Birth', type: 'date', required: false },
          { label: 'Current Address', type: 'text', required: true, placeholder: '123 Main St, City, State' },
        ],
      },
      {
        title: 'Accident Details',
        fields: [
          { label: 'Date of Accident/Injury', type: 'date', required: true },
          { label: 'Time of Incident', type: 'text', required: false, placeholder: 'HH:MM AM/PM' },
          { label: 'Location of Accident', type: 'text', required: true, placeholder: 'Address or description' },
          {
            label: 'Type of Accident',
            type: 'checkbox-group',
            required: true,
            options: [
              'Vehicle Accident',
              'Slip and Fall',
              'Medical Malpractice',
              'Product Liability',
              'Dog Bite/Animal Attack',
              'Workplace Accident',
              'Premises Liability',
              'Other',
            ],
          },
          { label: 'Detailed Description of What Happened', type: 'textarea', required: true, placeholder: 'Please describe in detail...' },
        ],
      },
      {
        title: 'Witnesses',
        fields: [
          { label: 'Names and Contact Information of Witnesses', type: 'textarea', required: false, placeholder: 'List witnesses who saw the accident' },
        ],
      },
      {
        title: 'Medical Treatment',
        fields: [
          { label: 'Did You Receive Medical Treatment?', type: 'checkbox-group', required: true, options: ['Yes', 'No'] },
          { label: 'Medical Provider Name(s)', type: 'text', required: false, placeholder: 'Hospital, Clinic, Doctor names' },
          { label: 'Date of First Medical Treatment', type: 'date', required: false },
          { label: 'Ongoing Medical Treatment Required?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Describe Injuries Sustained', type: 'textarea', required: false, placeholder: 'List all injuries...' },
          { label: 'Medical Bills/Expenses (Estimate)', type: 'number', required: false },
        ],
      },
      {
        title: 'Insurance Information',
        fields: [
          { label: 'At-Fault Party Name(s)', type: 'text', required: false },
          { label: 'Their Insurance Company Name', type: 'text', required: false },
          { label: 'Insurance Policy Number', type: 'text', required: false },
          { label: 'Your Health Insurance Company', type: 'text', required: false },
          { label: 'Your Health Insurance Policy Number', type: 'text', required: false },
        ],
      },
      {
        title: 'Economic Damages',
        fields: [
          { label: 'Lost Wages (if any)', type: 'number', required: false },
          { label: 'Days of Work Missed', type: 'number', required: false },
          { label: 'Ongoing Lost Earning Capacity?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Property Damage (if applicable)', type: 'number', required: false },
          { label: 'Other Economic Damages', type: 'textarea', required: false },
        ],
      },
      {
        title: 'Prior Medical History',
        fields: [
          {
            label: 'Any Prior Injuries to Same Area?',
            type: 'checkbox-group',
            required: false,
            options: ['Yes', 'No'],
          },
          { label: 'Description of Prior Injuries', type: 'textarea', required: false },
          { label: 'Pre-Existing Medical Conditions?', type: 'textarea', required: false },
        ],
      },
      {
        title: 'Conflict Check',
        fields: [
          { label: 'At-Fault Party or Related Parties', type: 'text', required: false },
          { label: 'Any Family Relationship with Opposing Party?', type: 'text', required: false },
        ],
      },
    ],
    disclaimer:
      'This intake form is confidential and protected by attorney-client privilege. Medical information provided is sensitive and will be handled according to HIPAA guidelines.',
  },

  'civil-rights': {
    sections: [
      {
        title: 'Client Information',
        fields: [
          { label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
          { label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
          { label: 'Phone Number', type: 'phone', required: true, placeholder: '(555) 123-4567' },
          { label: 'Date of Birth', type: 'date', required: false },
          { label: 'Current Address', type: 'text', required: true, placeholder: '123 Main St, City, State' },
        ],
      },
      {
        title: 'Nature of Rights Violation',
        fields: [
          {
            label: 'Type of Civil Rights Violation',
            type: 'checkbox-group',
            required: true,
            options: [
              'Police Misconduct/Excessive Force',
              'Wrongful Arrest/False Imprisonment',
              'Racial Discrimination',
              'Housing Discrimination',
              'Education Discrimination',
              'Voting Rights Violation',
              'Free Speech Violation',
              'Religious Discrimination',
              'LGBTQ+ Discrimination',
              'Other',
            ],
          },
          { label: 'Date of Violation', type: 'date', required: true },
          { label: 'Detailed Description of Violation', type: 'textarea', required: true, placeholder: 'Describe what happened in detail...' },
        ],
      },
      {
        title: 'Government Entity Information',
        fields: [
          { label: 'Government Agency/Entity Involved', type: 'text', required: true, placeholder: 'Police Department, School District, etc.' },
          { label: 'Officials/Officers Involved (Names and Badges if known)', type: 'textarea', required: false },
          { label: 'Jurisdiction (City, County, State)', type: 'text', required: true },
        ],
      },
      {
        title: 'Witnesses and Evidence',
        fields: [
          { label: 'Names and Contact Info of Witnesses', type: 'textarea', required: false },
          { label: 'Any Video/Audio Evidence (Body Cam, Security Cam, etc.)?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Any Physical Evidence?', type: 'text', required: false, placeholder: 'Description of evidence' },
          { label: 'Any Written Records (Incident Reports, etc.)?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Prior Remedies',
        fields: [
          { label: 'Have You Filed a Complaint with the Agency?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Complaint Date and Case Number (if applicable)', type: 'text', required: false },
          { label: 'Have You Exhausted Administrative Remedies?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Describe Administrative Actions Taken', type: 'textarea', required: false },
          { label: 'Any Prior Legal Action on This Matter?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Damages',
        fields: [
          { label: 'Economic Damages (Medical, Lost Income, etc.)', type: 'number', required: false },
          { label: 'Describe Non-Economic Damages (emotional distress, reputational harm, etc.)', type: 'textarea', required: false },
          { label: 'Seeking Injunctive Relief (cease behavior)?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Conflict Check',
        fields: [
          { label: 'Names of Opposing Government Officials/Entities', type: 'text', required: false },
          { label: 'Any Family Connections to Opposing Party?', type: 'text', required: false },
        ],
      },
    ],
    disclaimer:
      'This intake form is confidential. Civil rights cases often involve government entities. This representation may be subject to notice requirements and specific statutory procedures.',
  },

  contract: {
    sections: [
      {
        title: 'Client Information',
        fields: [
          { label: 'Full Name/Business Name', type: 'text', required: true, placeholder: 'Name' },
          { label: 'Email Address', type: 'email', required: true, placeholder: 'email@example.com' },
          { label: 'Phone Number', type: 'phone', required: true, placeholder: '(555) 123-4567' },
          { label: 'Address', type: 'text', required: true, placeholder: '123 Main St, City, State' },
        ],
      },
      {
        title: 'Contract Information',
        fields: [
          { label: 'Parties to Contract', type: 'text', required: true, placeholder: 'Names of all parties' },
          { label: 'Date of Contract', type: 'date', required: false },
          { label: 'Subject Matter of Contract', type: 'text', required: true, placeholder: 'Description of what contract covers' },
          { label: 'Do You Have a Copy of the Contract?', type: 'checkbox-group', required: true, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Dispute Details',
        fields: [
          { label: 'Date Dispute Arose', type: 'date', required: true },
          { label: 'Describe the Breach', type: 'textarea', required: true, placeholder: 'What was not performed as promised...' },
          { label: 'Your Obligations Under Contract', type: 'textarea', required: false },
          { label: 'Other Party\'s Obligations', type: 'textarea', required: false },
          { label: 'Your Performance (Fulfilled or Not?)', type: 'text', required: false },
        ],
      },
      {
        title: 'Communications',
        fields: [
          { label: 'Correspondence with Other Party (Emails, Letters, etc.)', type: 'textarea', required: false, placeholder: 'Summary of key communications' },
          { label: 'Has Breach Been Disputed by Other Party?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Other Party\'s Explanation for Non-Performance', type: 'textarea', required: false },
        ],
      },
      {
        title: 'Damages',
        fields: [
          { label: 'Amounts Due Under Contract', type: 'number', required: false },
          { label: 'Costs Incurred Due to Breach', type: 'number', required: false },
          { label: 'Lost Profits/Opportunities', type: 'number', required: false },
          { label: 'Other Damages Description', type: 'textarea', required: false },
        ],
      },
      {
        title: 'Prior Actions',
        fields: [
          { label: 'Any Negotiation/Settlement Attempts?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Describe Settlement Negotiations', type: 'textarea', required: false },
          { label: 'Any Prior Legal Action on This Matter?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Conflict Check',
        fields: [
          { label: 'Other Parties to Contract', type: 'text', required: false },
          { label: 'Any Family Relationships with Other Parties?', type: 'text', required: false },
        ],
      },
    ],
    disclaimer:
      'This intake form is confidential. Bring the original contract and all related correspondence to your consultation. Contract disputes are highly dependent on specific contract language.',
  },

  consumer: {
    sections: [
      {
        title: 'Client Information',
        fields: [
          { label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
          { label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
          { label: 'Phone Number', type: 'phone', required: true, placeholder: '(555) 123-4567' },
          { label: 'Address', type: 'text', required: true, placeholder: '123 Main St, City, State' },
        ],
      },
      {
        title: 'Consumer Transaction',
        fields: [
          { label: 'Name of Company/Merchant', type: 'text', required: true, placeholder: 'Business Name' },
          { label: 'Type of Product/Service', type: 'text', required: true, placeholder: 'What was purchased' },
          { label: 'Purchase Date', type: 'date', required: true },
          { label: 'Amount Paid', type: 'number', required: true, placeholder: 'Total purchase price' },
          { label: 'How Payment Was Made', type: 'checkbox-group', required: true, options: ['Credit Card', 'Debit Card', 'Cash', 'Check', 'Wire Transfer', 'Other'] },
        ],
      },
      {
        title: 'Nature of Problem',
        fields: [
          {
            label: 'Type of Consumer Problem',
            type: 'checkbox-group',
            required: true,
            options: [
              'Defective Product',
              'Fraud/Scam',
              'Debt Collection Abuse',
              'Credit Reporting Error',
              'Data Breach/Privacy Violation',
              'Unauthorized Charges',
              'Warranty Violation',
              'Lemon Law (Defective Vehicle)',
              'Identity Theft',
              'False Advertising',
              'Other',
            ],
          },
          { label: 'Detailed Description of Problem', type: 'textarea', required: true, placeholder: 'What went wrong...' },
          { label: 'When Did You Discover the Problem?', type: 'date', required: true },
        ],
      },
      {
        title: 'Communications with Company',
        fields: [
          { label: 'Have You Contacted the Company?', type: 'checkbox-group', required: true, options: ['Yes', 'No'] },
          { label: 'Method of Contact (Phone, Email, Letter, etc.)', type: 'text', required: false },
          { label: 'Company\'s Response/Explanation', type: 'textarea', required: false },
          { label: 'Date(s) of Contact', type: 'date', required: false },
          { label: 'Do You Have Written Documentation of Complaints?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Damages',
        fields: [
          { label: 'Amount Seeking to Recover', type: 'number', required: false },
          { label: 'Additional Costs/Expenses Incurred', type: 'number', required: false },
          { label: 'Describe Impact on You (Time, Stress, Credit, etc.)', type: 'textarea', required: false },
        ],
      },
      {
        title: 'Conflict Check',
        fields: [
          { label: 'Company/Merchant Name', type: 'text', required: false },
          { label: 'Any Family Relationships with Company?', type: 'text', required: false },
        ],
      },
    ],
    disclaimer:
      'Consumer protection laws provide various remedies and often include statutory damages. Many consumer cases can be pursued on a class-action basis. Documentation of all communications is critical.',
  },

  medical: {
    sections: [
      {
        title: 'Client Information',
        fields: [
          { label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
          { label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
          { label: 'Phone Number', type: 'phone', required: true, placeholder: '(555) 123-4567' },
          { label: 'Date of Birth', type: 'date', required: false },
          { label: 'Address', type: 'text', required: true, placeholder: '123 Main St, City, State' },
        ],
      },
      {
        title: 'Medical Provider Information',
        fields: [
          { label: 'Name of Medical Provider/Hospital', type: 'text', required: true },
          { label: 'Treating Physician/Surgeon Name', type: 'text', required: true },
          { label: 'Type of Treatment/Procedure', type: 'text', required: true, placeholder: 'Surgery, diagnosis, treatment, etc.' },
          { label: 'Date of Treatment', type: 'date', required: true },
        ],
      },
      {
        title: 'Nature of Malpractice Claim',
        fields: [
          {
            label: 'Type of Medical Error',
            type: 'checkbox-group',
            required: true,
            options: [
              'Surgical Error',
              'Misdiagnosis',
              'Delayed Diagnosis',
              'Wrong Site Surgery',
              'Anesthesia Error',
              'Medication Error',
              'Birth Injury',
              'Failure to Treat',
              'Infection/Complication',
              'Other',
            ],
          },
          { label: 'Detailed Description of Error and Outcome', type: 'textarea', required: true, placeholder: 'What was done wrong and what was the result...' },
        ],
      },
      {
        title: 'Injuries and Consequences',
        fields: [
          { label: 'Injuries Resulting from Error', type: 'textarea', required: true, placeholder: 'List all injuries...' },
          { label: 'Permanent or Temporary?', type: 'checkbox-group', required: true, options: ['Permanent', 'Temporary', 'Ongoing'] },
          { label: 'Current Medical Status/Prognosis', type: 'textarea', required: false },
          { label: 'Additional Medical Treatment Required?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
        ],
      },
      {
        title: 'Medical Records',
        fields: [
          { label: 'Do You Have Medical Records from Treatment?', type: 'checkbox-group', required: true, options: ['Yes', 'No', 'Requesting'] },
          { label: 'Have You Obtained a Second Opinion?', type: 'checkbox-group', required: false, options: ['Yes', 'No'] },
          { label: 'Second Opinion Provider Name (if applicable)', type: 'text', required: false },
        ],
      },
      {
        title: 'Damages',
        fields: [
          { label: 'Medical Bills (Current and Anticipated)', type: 'number', required: false },
          { label: 'Lost Wages', type: 'number', required: false },
          { label: 'Describe Non-Economic Damages (Pain, Disability, etc.)', type: 'textarea', required: false },
        ],
      },
      {
        title: 'Conflict Check',
        fields: [
          { label: 'Medical Provider/Hospital Name', type: 'text', required: false },
          { label: 'Any Personal Relationships with Treating Provider?', type: 'text', required: false },
        ],
      },
    ],
    disclaimer:
      'Medical malpractice claims require expert testimony and are complex. We will arrange for medical records and expert review. These cases typically take time to develop. Statute of limitations varies by state and circumstance.',
  },
};

async function generateIntakeForm(input: IntakeFormInput): Promise<typeof formTemplates['employment']> {
  // Return template based on category
  const categoryMap: Record<string, string> = {
    employment: 'employment',
    'personal-injury': 'personal-injury',
    'civil-rights': 'civil-rights',
    contract: 'contract',
    consumer: 'consumer',
    medical: 'medical',
  };

  const templateKey = categoryMap[input.category] || 'employment';
  const template = formTemplates[templateKey];

  if (!template) {
    return formTemplates.employment;
  }

  return template;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseType, category } = body;

    if (!caseType || !category) {
      return NextResponse.json(
        { error: 'Case type and category are required' },
        { status: 400 }
      );
    }

    const form = await generateIntakeForm({
      caseType,
      category,
    });

    return NextResponse.json({
      success: true,
      ...form,
    });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Failed to generate intake form. Please try again.' },
      { status: 500 }
    );
  }
}
