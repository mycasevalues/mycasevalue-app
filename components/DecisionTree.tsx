'use client';

import { useState } from 'react';
import Link from 'next/link';
import { REAL_DATA } from '../lib/realdata';

// Category type definitions
type Category =
  | 'employment'
  | 'personal-injury'
  | 'consumer'
  | 'government'
  | 'contract'
  | 'other';

interface Answer {
  [key: string]: string;
}

interface QuestionConfig {
  id: string;
  question: string;
  type: 'radio' | 'text';
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
}

interface CategoryConfig {
  id: Category;
  title: string;
  description: string;
  icon: React.ReactNode;
  questions: QuestionConfig[];
  nosCodes: string[];
}

// SVG Icons
const BriefcaseIcon = () => (
  <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="9" y1="14" x2="9" y2="18" />
    <line x1="15" y1="14" x2="15" y2="18" />
  </svg>
);

const ShieldIcon = () => (
  <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const DocumentIcon = () => (
  <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

const BuildingIcon = () => (
  <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
    <line x1="9" y1="8" x2="9" y2="7" />
    <line x1="15" y1="8" x2="15" y2="7" />
    <line x1="12" y1="14" x2="12" y2="15" />
  </svg>
);

const HandshakeIcon = () => (
  <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 12h-5v2h5v-2zm0-7H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
    <path d="M8 12l2-2 3 3 5-5" />
  </svg>
);

const QuestionIcon = () => (
  <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v.01" />
    <path d="M12 13c-1.1 0-2 .9-2 2" />
    <path d="M9 9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1-1 2-2 2" />
  </svg>
);

// Category configurations
const categories: CategoryConfig[] = [
  {
    id: 'employment',
    title: 'Employment',
    description: 'Fired, discriminated, or harassed at work',
    icon: <BriefcaseIcon />,
    questions: [
      {
        id: 'employer_size',
        question: 'Does your employer have 15+ employees?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
      {
        id: 'when_happened',
        question: 'When did this happen?',
        type: 'radio',
        options: [
          { value: 'within_6mo', label: 'Within last 6 months' },
          { value: '6mo_to_1yr', label: '6 months to 1 year ago' },
          { value: '1_to_2yrs', label: '1 to 2 years ago' },
          { value: 'over_2yrs', label: 'More than 2 years ago' },
        ],
      },
      {
        id: 'eeoc_filed',
        question: 'Have you filed an EEOC charge?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'planning', label: 'Planning to file' },
        ],
      },
      {
        id: 'protected_class',
        question: 'Was it based on a protected class? (race, color, religion, sex, national origin, age 40+, disability)',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
    ],
    nosCodes: ['442', '445'],
  },
  {
    id: 'personal-injury',
    title: 'Personal Injury',
    description: 'Negligence, accident, or wrongful harm',
    icon: <ShieldIcon />,
    questions: [
      {
        id: 'severity',
        question: 'What is the severity of your injuries?',
        type: 'radio',
        options: [
          { value: 'minor', label: 'Minor (minor cuts, bruises, soreness)' },
          { value: 'moderate', label: 'Moderate (fractures, sprains, requiring surgery)' },
          { value: 'severe', label: 'Severe (permanent damage, lost wages, ongoing care)' },
        ],
      },
      {
        id: 'at_fault_identified',
        question: 'Is the at-fault party clearly identified?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
      {
        id: 'incident_state',
        question: 'In which state did this happen?',
        type: 'text',
      },
      {
        id: 'medical_treatment',
        question: 'Have you received or do you need medical treatment?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
    nosCodes: ['350', '360', '365', '362'],
  },
  {
    id: 'consumer',
    title: 'Consumer Rights',
    description: 'Defective product or unfair business practice',
    icon: <DocumentIcon />,
    questions: [
      {
        id: 'product_service_type',
        question: 'What type of product or service?',
        type: 'text',
      },
      {
        id: 'amount_in_dispute',
        question: 'What is the amount in dispute?',
        type: 'text',
      },
      {
        id: 'contacted_company',
        question: 'Have you contacted the company about this?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
    nosCodes: ['480'],
  },
  {
    id: 'government',
    title: 'Government Rights',
    description: 'Disability benefits, voting, or constitutional rights',
    icon: <BuildingIcon />,
    questions: [
      {
        id: 'right_type',
        question: 'What type of government right?',
        type: 'radio',
        options: [
          { value: 'disability_benefits', label: 'Disability benefits (SSDI/SSI)' },
          { value: 'voting', label: 'Voting rights' },
          { value: 'constitutional', label: 'Constitutional rights' },
          { value: 'other', label: 'Other government action' },
        ],
      },
      {
        id: 'agency_involved',
        question: 'Which agency is involved?',
        type: 'text',
      },
      {
        id: 'exhausted_remedies',
        question: 'Have you exhausted administrative remedies?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
    ],
    nosCodes: ['440'],
  },
  {
    id: 'contract',
    title: 'Contract Dispute',
    description: 'Breach of agreement or contract conflict',
    icon: <HandshakeIcon />,
    questions: [
      {
        id: 'written_contract',
        question: 'Is there a written contract?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'partial', label: 'Partial (email, text, partial writing)' },
        ],
      },
      {
        id: 'amount_at_stake',
        question: 'What amount is at stake?',
        type: 'text',
      },
      {
        id: 'parties_different_states',
        question: 'Are you and the other party in different states?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
    ],
    nosCodes: ['190'],
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Something else entirely',
    icon: <QuestionIcon />,
    questions: [
      {
        id: 'description',
        question: 'Please briefly describe your situation',
        type: 'text',
      },
    ],
    nosCodes: [],
  },
];

// Map categories to NOS codes (expanded)
const categoryToNOSMap: Record<Category, string[]> = {
  employment: ['442', '445', '710'],
  'personal-injury': ['350', '360', '365', '362'],
  consumer: ['480'],
  government: ['440'],
  contract: ['190'],
  other: [],
};

// Determine qualification based on answers
function determineQualification(
  category: Category,
  answers: Answer
): { qualifies: boolean; nosCode: string; reasoning: string } {
  const baseNOSCodes = categoryToNOSMap[category];

  if (category === 'employment') {
    const hasProtectedClass = answers.protected_class === 'yes';
    const hasEmployer = answers.employer_size !== 'no';
    const withinStatutes =
      answers.when_happened === 'within_6mo' ||
      answers.when_happened === '6mo_to_1yr';

    if (hasProtectedClass && hasEmployer && withinStatutes) {
      return {
        qualifies: true,
        nosCode: '442',
        reasoning:
          'Your situation appears to involve potential federal employment discrimination with a protected class basis within the statute of limitations.',
      };
    } else {
      return {
        qualifies: false,
        nosCode: '442',
        reasoning: baseNOSCodes.length > 0
          ? 'While your situation may have merit, some key factors (protected class, employer size, or statute of limitations) may not align with federal jurisdiction.'
          : 'This may be more appropriate for state court.',
      };
    }
  }

  if (category === 'personal-injury') {
    const hasSeverity =
      answers.severity === 'moderate' || answers.severity === 'severe';
    const hasAtFault = answers.at_fault_identified === 'yes';
    const hasMedicalTreatment = answers.medical_treatment === 'yes';

    const dosCalculated: boolean =
      (answers.incident_state && answers.incident_state.length > 0) ||
      answers.incident_state === 'diversity';

    if (
      (hasSeverity || hasMedicalTreatment) &&
      hasAtFault &&
      dosCalculated
    ) {
      return {
        qualifies: true,
        nosCode: '360',
        reasoning:
          'Your personal injury case may qualify for federal court under diversity jurisdiction if the amount exceeds $75,000 and parties are from different states.',
      };
    } else {
      return {
        qualifies: false,
        nosCode: '360',
        reasoning:
          'Personal injury cases typically require either federal question jurisdiction or diversity jurisdiction with an amount exceeding $75,000 with parties from different states.',
      };
    }
  }

  if (category === 'consumer') {
    return {
      qualifies: false,
      nosCode: '480',
      reasoning:
        'Consumer cases may qualify if they involve a federal statute or if diversity jurisdiction applies with amount over $75,000.',
    };
  }

  if (category === 'government') {
    const hasAdminRemedies = answers.exhausted_remedies === 'yes';
    const isConstitutional =
      answers.right_type === 'constitutional' ||
      answers.right_type === 'disability_benefits';

    if (isConstitutional && hasAdminRemedies) {
      return {
        qualifies: true,
        nosCode: '440',
        reasoning:
          'Your case involves federal constitutional or statutory rights that may qualify for federal jurisdiction.',
      };
    } else {
      return {
        qualifies: false,
        nosCode: '440',
        reasoning:
          'Federal question jurisdiction may apply to certain government rights cases. Exhausting administrative remedies may be required.',
      };
    }
  }

  if (category === 'contract') {
    const hasWrittenContract =
      answers.written_contract === 'yes' ||
      answers.written_contract === 'partial';
    const isDiversity = answers.parties_different_states === 'yes';
    const isLargeAmount =
      answers.amount_at_stake &&
      parseInt(answers.amount_at_stake) > 75000;

    if (hasWrittenContract && (isDiversity || isLargeAmount)) {
      return {
        qualifies: true,
        nosCode: '190',
        reasoning:
          'Your contract dispute may qualify for federal court if parties are from different states and the amount exceeds $75,000.',
      };
    } else {
      return {
        qualifies: false,
        nosCode: '190',
        reasoning:
          'Contract disputes typically require either federal question jurisdiction or diversity jurisdiction with an amount exceeding $75,000.',
      };
    }
  }

  return {
    qualifies: false,
    nosCode: '190',
    reasoning: 'Please consult with a local attorney to evaluate your situation.',
  };
}

export default function DecisionTree() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [answers, setAnswers] = useState<Answer>({});
  const [qualificationResult, setQualificationResult] = useState<{
    qualifies: boolean;
    nosCode: string;
    reasoning: string;
  } | null>(null);

  const currentCategoryConfig = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;

  const handleCategorySelect = (categoryId: Category) => {
    setSelectedCategory(categoryId);
    setAnswers({});
    setCurrentStep(2);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 2 && selectedCategory) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const result = determineQualification(selectedCategory!, answers);
      setQualificationResult(result);
      setCurrentStep(4);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedCategory(null);
    setAnswers({});
    setQualificationResult(null);
  };

  const isStep2Complete =
    currentCategoryConfig &&
    currentCategoryConfig.questions.every(
      (q) => !q.required || answers[q.id]
    );

  const nosData = qualificationResult
    ? REAL_DATA[qualificationResult.nosCode]
    : null;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--color-text-primary)',
          }}
        >
          <span>Step {currentStep} of 4</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>
            {currentStep === 1 && 'Category Selection'}
            {currentStep === 2 && 'Your Situation'}
            {currentStep === 3 && 'Jurisdiction Check'}
            {currentStep === 4 && 'Results'}
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'var(--border-default)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(currentStep / 4) * 100}%`,
              backgroundColor: 'var(--accent-primary)',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </div>
      </div>

      {/* Step 1: Category Selection */}
      {currentStep === 1 && (
        <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              color: 'var(--color-text-primary)',
            }}
          >
            What happened?
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
              marginBottom: '2rem',
            }}
          >
            Select the category that best describes your situation.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                style={{
                  padding: '1.5rem',
                  border: '2px solid var(--border-default)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-surface-0)',
                  cursor: 'pointer',
                  transition:
                    'all 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(10, 102, 194, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                  }}
                >
                  {category.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    margin: '0',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {category.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    margin: '0',
                  }}
                >
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Follow-up Questions */}
      {currentStep === 2 && currentCategoryConfig && (
        <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              color: 'var(--color-text-primary)',
            }}
          >
            {currentCategoryConfig.title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {currentCategoryConfig.questions.map((question) => (
              <div key={question.id}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {question.question}
                </label>

                {question.type === 'radio' && question.options ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {question.options.map((option) => (
                      <label
                        key={option.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          padding: '0.5rem 0',
                        }}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={answers[question.id] === option.value}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: 'var(--accent-primary)',
                          }}
                        />
                        <span style={{ color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={answers[question.id] || ''}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    placeholder="Enter your answer"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Jurisdiction Check */}
      {currentStep === 3 && (
        <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Understanding Jurisdiction
          </h2>

          <div
            style={{
              backgroundColor: 'rgba(59,130,246,0.06)',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: 'var(--color-text-primary)',
              }}
            >
              Federal vs. State Court
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-primary)',
                lineHeight: '1.6',
                margin: '0 0 1rem 0',
              }}
            >
              Federal courts have limited jurisdiction. Your case qualifies if:
            </p>
            <ul
              style={{
                margin: '0',
                paddingLeft: '1.5rem',
                color: 'var(--color-text-primary)',
                fontSize: '0.95rem',
                lineHeight: '1.8',
              }}
            >
              <li>
                <strong>Federal Question:</strong> The case involves a federal law or constitutional right
              </li>
              <li>
                <strong>Diversity:</strong> You and the defendant are from different states AND the amount in controversy exceeds $75,000
              </li>
            </ul>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              backgroundColor: 'rgba(234,179,8,0.06)',
              border: '1px solid #fcd34d',
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                fontSize: '0.9rem',
                color: '#92400e',
                margin: '0',
                fontWeight: '500',
              }}
            >
              <strong>Note:</strong> Many cases can be filed in either federal or state court. This tool helps assess federal potential.
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {currentStep === 4 && qualificationResult && nosData && (
        <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Your Results
          </h2>

          {/* Qualification Status */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              backgroundColor: qualificationResult.qualifies
                ? '#dcfce7'
                : '#fee2e2',
              border: `1px solid ${
                qualificationResult.qualifies ? '#86efac' : '#fecaca'
              }`,
            }}
          >
            <p
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0',
                color: qualificationResult.qualifies ? '#15803d' : '#991b1b',
              }}
            >
              {qualificationResult.qualifies
                ? 'Your situation may qualify for federal court'
                : 'May be more appropriate for state court'}
            </p>
            <p
              style={{
                fontSize: '0.95rem',
                color: qualificationResult.qualifies ? '#166534' : '#7f1d1d',
                margin: '0',
                lineHeight: '1.5',
              }}
            >
              {qualificationResult.reasoning}
            </p>
          </div>

          {/* Case Type Details */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--color-text-primary)',
              }}
            >
              {nosData.label} Cases
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    margin: '0 0 0.25rem 0',
                    fontWeight: '500',
                  }}
                >
                  Win Rate
                </p>
                <p
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--accent-primary)',
                    margin: '0',
                  }}
                >
                  {nosData.wr}%
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    margin: '0 0 0.25rem 0',
                    fontWeight: '500',
                  }}
                >
                  Median Settlement
                </p>
                <p
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--accent-primary)',
                    margin: '0',
                  }}
                >
                  ${nosData.rng?.md ? (nosData.rng.md * 1000).toLocaleString() : 'N/A'}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    margin: '0 0 0.25rem 0',
                    fontWeight: '500',
                  }}
                >
                  Settlement Rate
                </p>
                <p
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--accent-primary)',
                    margin: '0',
                  }}
                >
                  {nosData.sp}%
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    margin: '0 0 0.25rem 0',
                    fontWeight: '500',
                  }}
                >
                  Statute of Limitations
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    margin: '0',
                  }}
                >
                  {nosData.sol}
                </p>
              </div>
            </div>

            <Link
              href={`/nos/${qualificationResult.nosCode}`}
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--color-surface-0)',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                fontSize: '0.95rem',
                transition: 'background-color 0.2s ease-in',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              }}
            >
              View Full Case Type Report
            </Link>
          </div>

          {/* Next Steps */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--color-text-primary)',
              }}
            >
              Recommended Next Steps
            </h3>
            <ol
              style={{
                margin: '0',
                paddingLeft: '1.5rem',
                color: 'var(--color-text-primary)',
                fontSize: '0.95rem',
                lineHeight: '1.8',
              }}
            >
              <li>
                <strong>Document everything:</strong> Collect relevant documents, emails, contracts, and evidence related to your case.
              </li>
              <li>
                <strong>Understand deadlines:</strong> Note the statute of limitations for your case type to ensure you file within the required timeframe.
              </li>
              <li>
                <strong>Consult an attorney:</strong> Even for pro se plaintiffs, initial consultation with a licensed attorney in your state can clarify options.
              </li>
            </ol>
          </div>

          {/* Attorney Resources */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--color-text-primary)',
              }}
            >
              Finding Attorney Help
            </h3>
            <ul
              style={{
                margin: '0',
                paddingLeft: '1.5rem',
                color: 'var(--color-text-primary)',
                fontSize: '0.95rem',
                lineHeight: '1.8',
              }}
            >
              <li>
                <strong>State Bar Association:</strong> Search for attorneys licensed in your jurisdiction.
              </li>
              <li>
                <strong>Legal Aid:</strong> If you qualify financially, contact local legal aid societies for free or low-cost services.
              </li>
              <li>
                <strong>Law School Clinics:</strong> Many universities offer free legal clinics for qualified individuals.
              </li>
              <li>
                <strong>Contingency Basis:</strong> Some attorneys take cases on contingency (payment only if you win).
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-primary)',
                margin: '0',
                lineHeight: '1.6',
              }}
            >
              <strong>Legal Disclaimer:</strong> This tool provides educational information only and does not constitute legal advice. The results are based on general federal jurisdiction principles and statistical data from past cases. Your specific situation may differ significantly. Always consult with a qualified attorney licensed in your jurisdiction before making any legal decisions or filing in federal court. The data presented is from historical cases and actual outcomes in your case may vary.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '3rem',
          gap: '1rem',
        }}
      >
        <button
          onClick={handleReset}
          style={{
            padding: '0.75rem 1.5rem',
            border: '1px solid #d1d5db',
            backgroundColor: 'var(--color-surface-0)',
            color: 'var(--color-text-primary)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease-in',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-0)';
          }}
        >
          Start Over
        </button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {currentStep > 1 && (
            <button
              onClick={handlePreviousStep}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #d1d5db',
                backgroundColor: 'var(--color-surface-0)',
                color: 'var(--color-text-primary)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease-in',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-0)';
              }}
            >
              Back
            </button>
          )}

          {currentStep < 4 && (
            <button
              onClick={handleNextStep}
              disabled={currentStep === 2 && !isStep2Complete}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor:
                  currentStep === 2 && !isStep2Complete
                    ? '#d1d5db'
                    : 'var(--accent-primary)',
                color: 'var(--color-surface-0)',
                border: 'none',
                borderRadius: '6px',
                cursor:
                  currentStep === 2 && !isStep2Complete
                    ? 'not-allowed'
                    : 'pointer',
                fontWeight: '500',
                fontSize: '0.95rem',
                transition: 'background-color 0.2s ease-in',
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 2 || isStep2Complete) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentStep !== 2 || isStep2Complete) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                }
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
