'use client';

import { useState } from 'react';
import { REAL_DATA } from '../lib/realdata';

// Type definitions
interface Question {
  id: string;
  text: string;
  points: number;
  category?: string;
}

interface CaseType {
  nosCode: string;
  title: string;
  description: string;
  questions: Question[];
}

// SVG Icons
const EmploymentIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="9" y1="14" x2="9" y2="18" />
    <line x1="15" y1="14" x2="15" y2="18" />
  </svg>
);

const PersonalInjuryIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <circle cx="12" cy="6" r="3" />
    <path d="M9 12h6" />
    <path d="M12 12v6" />
    <path d="M8 15l-3 3" />
    <path d="M16 15l3 3" />
  </svg>
);

const ProductIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <path d="M6 9l6-6 6 6" />
    <rect x="2" y="9" width="20" height="12" rx="1" />
    <line x1="6" y1="13" x2="18" y2="13" />
  </svg>
);

const MedicalIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const ContractIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

const RightsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ADAIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M9 13h6" />
  </svg>
);

const WageIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <path d="M8.5 9.5c0-.5.5-1 1.5-1h4c1 0 1.5.5 1.5 1s-.5 1-1.5 1h-4c-1 0-1.5.5-1.5 1s.5 1 1.5 1h4c1 0 1.5.5 1.5 1" />
  </svg>
);

// Case type definitions with questions
const caseTypes: CaseType[] = [
  {
    nosCode: '442',
    title: 'Employment Discrimination',
    description: 'Race, gender, age, disability, or other protected class discrimination',
    questions: [
      { id: 'ed1', text: 'Written documentation of adverse action', points: 15 },
      { id: 'ed2', text: 'Comparator employees treated more favorably', points: 12 },
      { id: 'ed3', text: 'EEOC charge filed and right-to-sue received', points: 10 },
      { id: 'ed4', text: 'Witness testimony available', points: 10 },
      { id: 'ed5', text: 'Adverse action within 2 years', points: 8 },
      { id: 'ed6', text: 'Internal complaint prior to adverse action', points: 8 },
      { id: 'ed7', text: 'Employer size over 15 employees', points: 7 },
      { id: 'ed8', text: 'Prior performance reviews positive', points: 5 },
      { id: 'ed9', text: 'Direct evidence of discriminatory intent', points: 15 },
      { id: 'ed10', text: 'Pattern of similar complaints against employer', points: 10 },
    ],
  },
  {
    nosCode: '445',
    title: 'ADA Employment',
    description: 'Failure to accommodate disability or discriminatory treatment',
    questions: [
      { id: 'ada1', text: 'Documented disability diagnosis', points: 15 },
      { id: 'ada2', text: 'Requested reasonable accommodation in writing', points: 12 },
      { id: 'ada3', text: 'Employer explicitly denied accommodation', points: 13 },
      { id: 'ada4', text: 'Accommodation was feasible and low-cost', points: 12 },
      { id: 'ada5', text: 'Adverse action after accommodation request', points: 11 },
      { id: 'ada6', text: 'EEOC complaint filed', points: 8 },
      { id: 'ada7', text: 'Witness to accommodation discussion', points: 9 },
      { id: 'ada8', text: 'Medical documentation from healthcare provider', points: 10 },
      { id: 'ada9', text: 'Employer size over 15 employees', points: 7 },
      { id: 'ada10', text: 'Evidence of retaliatory intent', points: 12 },
    ],
  },
  {
    nosCode: '360',
    title: 'Personal Injury',
    description: 'Negligence, accident, or wrongful harm',
    questions: [
      { id: 'pi1', text: 'Clear liability/fault of defendant', points: 15 },
      { id: 'pi2', text: 'Documented medical treatment', points: 12 },
      { id: 'pi3', text: 'Permanent injury or disability', points: 10 },
      { id: 'pi4', text: 'Police/incident report filed', points: 8 },
      { id: 'pi5', text: 'Witness testimony available', points: 10 },
      { id: 'pi6', text: 'Lost wages/income documented', points: 8 },
      { id: 'pi7', text: 'Medical expert opinion obtained', points: 7 },
      { id: 'pi8', text: 'Incident within statute of limitations', points: 5 },
      { id: 'pi9', text: 'No comparative negligence', points: 10 },
      { id: 'pi10', text: 'Insurance coverage confirmed', points: 5 },
    ],
  },
  {
    nosCode: '365',
    title: 'Product Liability',
    description: 'Defective product causing injury or damage',
    questions: [
      { id: 'pl1', text: 'Defect clearly documented', points: 15 },
      { id: 'pl2', text: 'Injury directly caused by product defect', points: 14 },
      { id: 'pl3', text: 'Medical treatment documented', points: 12 },
      { id: 'pl4', text: 'Product still available for inspection', points: 11 },
      { id: 'pl5', text: 'Prior similar incidents reported', points: 10 },
      { id: 'pl6', text: 'No misuse or mishandling of product', points: 9 },
      { id: 'pl7', text: 'Manufacturing or design defect (not warning)', points: 10 },
      { id: 'pl8', text: 'Company had knowledge of defect', points: 12 },
      { id: 'pl9', text: 'Significant damages (medical, lost wages)', points: 8 },
      { id: 'pl10', text: 'Witness testimony to product failure', points: 7 },
    ],
  },
  {
    nosCode: '362',
    title: 'Medical Malpractice',
    description: 'Negligent medical care causing injury',
    questions: [
      { id: 'mm1', text: 'Clear deviation from standard of care', points: 16 },
      { id: 'mm2', text: 'Expert affidavit obtained', points: 14 },
      { id: 'mm3', text: 'Direct causation documented', points: 13 },
      { id: 'mm4', text: 'Significant damages (permanent injury)', points: 11 },
      { id: 'mm5', text: 'Medical records are complete', points: 10 },
      { id: 'mm6', text: 'Incident within statute of limitations', points: 8 },
      { id: 'mm7', text: 'No pre-existing condition complication', points: 8 },
      { id: 'mm8', text: 'Multiple witnesses to negligent act', points: 9 },
      { id: 'mm9', text: 'Prior complaints against provider', points: 10 },
      { id: 'mm10', text: 'Malpractice insurance confirmed', points: 6 },
    ],
  },
  {
    nosCode: '190',
    title: 'Contract Dispute',
    description: 'Breach of agreement or contract conflict',
    questions: [
      { id: 'cd1', text: 'Written contract exists', points: 15 },
      { id: 'cd2', text: 'Clear contractual terms', points: 12 },
      { id: 'cd3', text: 'Breach is unambiguous', points: 13 },
      { id: 'cd4', text: 'Damages clearly quantifiable', points: 11 },
      { id: 'cd5', text: 'Witness to contract formation', points: 8 },
      { id: 'cd6', text: 'Email or written communication of breach', points: 10 },
      { id: 'cd7', text: 'No dispute over contract interpretation', points: 9 },
      { id: 'cd8', text: 'No counterclaim or setoff', points: 8 },
      { id: 'cd9', text: 'All contract conditions satisfied', points: 10 },
      { id: 'cd10', text: 'Defendant not judgment-proof', points: 6 },
    ],
  },
  {
    nosCode: '710',
    title: 'FLSA/Wage & Hour',
    description: 'Unpaid wages, overtime, or minimum wage violations',
    questions: [
      { id: 'wh1', text: 'Clear wage payment records exist', points: 14 },
      { id: 'wh2', text: 'Overtime work documented', points: 13 },
      { id: 'wh3', text: 'Significant unpaid wages amount', points: 12 },
      { id: 'wh4', text: 'Employer size over 15 employees', points: 8 },
      { id: 'wh5', text: 'Pattern of wage violations', points: 11 },
      { id: 'wh6', text: 'Wage violation within statute of limitations', points: 7 },
      { id: 'wh7', text: 'Witness testimony available', points: 9 },
      { id: 'wh8', text: 'No settlement previously signed', points: 10 },
      { id: 'wh9', text: 'Violation affects multiple employees', points: 10 },
      { id: 'wh10', text: 'Employer not in bankruptcy', points: 5 },
    ],
  },
  {
    nosCode: '440',
    title: 'Civil Rights',
    description: 'Constitutional rights violation or discriminatory government action',
    questions: [
      { id: 'cr1', text: 'Constitutional violation clearly identified', points: 15 },
      { id: 'cr2', text: 'Government official involved', points: 13 },
      { id: 'cr3', text: 'Documented harm from violation', points: 12 },
      { id: 'cr4', text: 'Act not discretionary', points: 11 },
      { id: 'cr5', text: 'No qualified immunity defense apparent', points: 10 },
      { id: 'cr6', text: 'Witness testimony available', points: 9 },
      { id: 'cr7', text: 'Pattern of similar violations', points: 10 },
      { id: 'cr8', text: 'Administrative remedies exhausted', points: 8 },
      { id: 'cr9', text: 'Incident within statute of limitations', points: 6 },
      { id: 'cr10', text: 'Good documentation of violation', points: 7 },
    ],
  },
];

// Helper function to calculate score with proper color coding
function getScoreColor(score: number): string {
  if (score >= 75) return 'var(--accent-primary)'; // Strong - primary blue
  if (score >= 50) return '#4A93C9'; // Moderate - lighter blue
  if (score >= 25) return 'var(--color-text-muted)'; // Challenging - gray
  return '#E0DDD8'; // Difficult - light gray
}

function getScoreLabel(score: number): string {
  if (score >= 75) return 'Strong';
  if (score >= 50) return 'Moderate';
  if (score >= 25) return 'Challenging';
  return 'Difficult';
}

// Progress bar component
function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;
  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          height: '8px',
          backgroundColor: 'var(--border-default)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: 'var(--accent-primary)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--color-text-muted)', margin: '8px 0 0 0' }}>
        Step {current} of {total}
      </p>
    </div>
  );
}

// Circular gauge for score visualization
function CircularGauge({ score }: { score: number }) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
      <div style={{ position: 'relative', width: '140px', height: '140px' }}>
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--border-default)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        {/* Score text in center */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '26px',
              fontWeight: 'bold',
              color: 'var(--color-text-primary)',
              lineHeight: 1,
            }}
          >
            {score}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginTop: '4px',
            }}
          >
            out of 100
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function CaseStrengthAssessment() {
  const [step, setStep] = useState(0); // 0: case selection, 1-10+: questions, 11+: results
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);

  // Handle case type selection
  const handleSelectCaseType = (caseType: CaseType) => {
    setSelectedCaseType(caseType);
    setAnswers({});
    setStep(1);
  };

  // Handle question answer
  const handleAnswer = (questionId: string, isYes: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: isYes }));

    // Auto-advance to next question
    if (step < (selectedCaseType?.questions.length ?? 0)) {
      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 300);
    }
  };

  // Calculate final score when all questions answered
  const handleComplete = () => {
    if (!selectedCaseType) return;

    let totalScore = 0;
    selectedCaseType.questions.forEach((q) => {
      if (answers[q.id] === true) {
        totalScore += q.points;
      }
    });

    // Normalize to 0-100 scale
    const maxPossible = selectedCaseType.questions.reduce((sum, q) => sum + q.points, 0);
    const normalizedScore = Math.round((totalScore / maxPossible) * 100);
    setScore(normalizedScore);
    setStep(selectedCaseType.questions.length + 1); // Go to results
  };

  // Handle back navigation
  const handleBack = () => {
    if (step === 1) {
      setSelectedCaseType(null);
      setAnswers({});
      setStep(0);
    } else if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Reset and start over
  const handleRestart = () => {
    setStep(0);
    setSelectedCaseType(null);
    setAnswers({});
    setScore(0);
  };

  // Step 0: Case Type Selection
  if (step === 0) {
    return (
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--color-text-primary)',
              marginBottom: '12px',
              margin: '0 0 12px 0',
            }}
          >
            Case Strength Assessment
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              margin: '0 auto 0 auto',
            }}
          >
            Answer questions about your case to get a personalized strength assessment and see how similar cases have performed.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {caseTypes.map((caseType) => {
            const iconMap: Record<string, React.ReactNode> = {
              '442': <EmploymentIcon />,
              '445': <ADAIcon />,
              '360': <PersonalInjuryIcon />,
              '365': <ProductIcon />,
              '362': <MedicalIcon />,
              '190': <ContractIcon />,
              '710': <WageIcon />,
              '440': <RightsIcon />,
            };

            return (
              <button
                key={caseType.nosCode}
                onClick={() => handleSelectCaseType(caseType)}
                style={{
                  padding: '24px',
                  backgroundColor: 'white',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  {iconMap[caseType.nosCode] || <EmploymentIcon />}
                </div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    margin: '0 0 8px 0',
                  }}
                >
                  {caseType.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-muted)',
                    margin: '0',
                    lineHeight: '1.5',
                  }}
                >
                  {caseType.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Step 1+: Questions
  if (selectedCaseType && step > 0 && step <= selectedCaseType.questions.length) {
    const currentQuestion = selectedCaseType.questions[step - 1];
    const isAnswered = answers[currentQuestion.id] !== undefined;

    return (
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        <ProgressBar current={step} total={selectedCaseType.questions.length + 1} />

        <div
          style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
          }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
                margin: '0 0 8px 0',
              }}
            >
              {selectedCaseType.title}
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-muted)',
                margin: '0',
              }}
            >
              Question {step} of {selectedCaseType.questions.length}
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              {currentQuestion.text}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ].map((option) => (
                <label
                  key={option.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    backgroundColor:
                      answers[currentQuestion.id] === option.value
                        ? '#E7F3FF'
                        : 'transparent',
                    border: '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (answers[currentQuestion.id] !== option.value) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answers[currentQuestion.id] !== option.value) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={String(option.value)}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={() => handleAnswer(currentQuestion.id, option.value)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: 'var(--accent-primary)',
                      cursor: 'pointer',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '16px',
                      color: 'var(--color-text-primary)',
                      fontWeight: answers[currentQuestion.id] === option.value ? '600' : '400',
                    }}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            {isAnswered && currentQuestion.points > 0 && answers[currentQuestion.id] === true && (
              <p
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(34,197,94,0.06)',
                  borderLeft: '4px solid #10B981',
                  fontSize: '13px',
                  color: '#34d399',
                }}
              >
                +{currentQuestion.points} points if yes
              </p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'space-between',
            }}
          >
            <button
              onClick={handleBack}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: 'var(--accent-primary)',
                border: '1px solid var(--accent-primary)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-0)';
              }}
            >
              Back
            </button>

            {step === selectedCaseType.questions.length ? (
              <button
                onClick={handleComplete}
                disabled={!isAnswered}
                style={{
                  padding: '12px 32px',
                  backgroundColor: isAnswered ? 'var(--accent-primary)' : 'var(--bdr, #E2DFD8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isAnswered ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (isAnswered) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isAnswered) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  }
                }}
              >
                See Results
              </button>
            ) : (
              <button
                onClick={() => {
                  if (isAnswered) {
                    setStep((prev) => prev + 1);
                  }
                }}
                disabled={!isAnswered}
                style={{
                  padding: '12px 32px',
                  backgroundColor: isAnswered ? 'var(--accent-primary)' : 'var(--bdr, #E2DFD8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isAnswered ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (isAnswered) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isAnswered) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  }
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (selectedCaseType && step > selectedCaseType.questions.length) {
    const realDataEntry = REAL_DATA[selectedCaseType.nosCode];
    const winRate = realDataEntry?.wr ?? 0;
    const answeredQuestions = selectedCaseType.questions.filter((q) => answers[q.id] !== undefined);
    const scoreColor = getScoreColor(score);
    const scoreLabel = getScoreLabel(score);

    return (
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            padding: '40px',
          }}
        >
          {/* Score section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--color-text-primary)',
                marginBottom: '32px',
                margin: '0 0 32px 0',
              }}
            >
              {selectedCaseType.title}
            </h2>

            <CircularGauge score={score} />

            <div style={{ marginBottom: '24px' }}>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 8px 0',
                }}
              >
                Assessment Score
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: scoreColor,
                  margin: '0',
                }}
              >
                {scoreLabel}
              </p>
            </div>

            {score > 60 && (
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(34,197,94,0.06)',
                  borderLeft: '4px solid #10B981',
                  borderRadius: '4px',
                  marginBottom: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    color: '#34d399',
                    margin: '0',
                  }}
                >
                  Cases with similar strength profiles have historically seen favorable outcomes in {selectedCaseType.nosCode === '442' ? 'employment' : 'this type of'} litigation.
                </p>
              </div>
            )}
          </div>

          {/* Factor breakdown */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                margin: '0 0 16px 0',
              }}
            >
              Factor Breakdown
            </h3>
            <div style={{ backgroundColor: 'var(--color-surface-0)', padding: '16px', borderRadius: '6px' }}>
              {selectedCaseType.questions.map((q) => {
                const answered = answers[q.id] !== undefined;
                const isYes = answers[q.id] === true;

                return (
                  <div
                    key={q.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: '12px',
                      marginBottom: '12px',
                      borderBottom: '1px solid var(--border-default)',
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--color-text-primary)',
                          margin: '0',
                          fontWeight: answered ? '500' : '400',
                        }}
                      >
                        {q.text}
                      </p>
                    </div>
                    <div
                      style={{
                        marginLeft: '16px',
                        whiteSpace: 'nowrap',
                        fontWeight: '600',
                        color: isYes ? '#10B981' : 'var(--color-text-muted)',
                      }}
                    >
                      {isYes ? `+${q.points}` : '−'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comparison section */}
          <div style={{ marginBottom: '24px', backgroundColor: 'rgba(59,130,246,0.06)', padding: '20px', borderRadius: '6px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                margin: '0 0 12px 0',
              }}
            >
              Historical Performance
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-muted)',
                marginBottom: '8px',
                margin: '0 0 8px 0',
              }}
            >
              Win rate for similar {selectedCaseType.title.toLowerCase()} cases in federal court:
            </p>
            <p
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--accent-primary)',
                margin: '0',
              }}
            >
              {winRate}%
            </p>
          </div>

          {/* Recommended next steps */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                margin: '0 0 16px 0',
              }}
            >
              Recommended Next Steps
            </h3>
            <ol
              style={{
                paddingLeft: '20px',
                margin: '0',
              }}
            >
              <li
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  marginBottom: '12px',
                  lineHeight: '1.6',
                }}
              >
                <strong>Gather Documentation</strong> - Collect all relevant documents (emails, messages, medical records, performance reviews, incident reports) that support the factors in your assessment.
              </li>
              <li
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  marginBottom: '12px',
                  lineHeight: '1.6',
                }}
              >
                <strong>Consult an Attorney</strong> - Discuss your case with a lawyer in your jurisdiction who specializes in {selectedCaseType.title.toLowerCase()}. This assessment is not a substitute for legal advice.
              </li>
              <li
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  marginBottom: '12px',
                  lineHeight: '1.6',
                }}
              >
                <strong>Understand Deadlines</strong> - Ensure you file any necessary administrative complaints or lawsuits within applicable statutes of limitations.
              </li>
            </ol>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(234,179,8,0.1)',
              borderLeft: '4px solid #F59E0B',
              borderRadius: '4px',
              marginBottom: '24px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#fbbf24',
                margin: '0',
                lineHeight: '1.5',
              }}
            >
              <strong>Disclaimer:</strong> This tool provides an educational assessment based on case factors and historical federal court data. It is not legal advice and does not create an attorney-client relationship. Your case strength depends on facts specific to your situation, applicable state and federal law, and other considerations. Always consult with a qualified attorney before making legal decisions.
            </p>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'space-between',
            }}
          >
            <button
              onClick={handleRestart}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: 'var(--accent-primary)',
                border: '1px solid var(--accent-primary)',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59,130,246,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-0)';
              }}
            >
              Assess Another Case
            </button>
            <button
              onClick={() => {
                // Navigate to consultation or contact
                window.location.href = '/contact';
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--accent-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              }}
            >
              Get Legal Help
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
