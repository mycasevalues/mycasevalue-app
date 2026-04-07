'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .faq-item {
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.active {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          background-color: rgba(232, 23, 31, 0.02);
        }

        .faq-question {
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-chevron {
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
        }

        .faq-chevron.open {
          transform: rotate(180deg);
        }

        .faq-answer-container {
          overflow: hidden;
          transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-answer {
          animation: slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const isLast = index === items.length - 1;

          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'active' : ''}`}
              style={{
                borderBottom: isLast ? 'none' : '1px solid #E5E7EB',
                backgroundColor: isOpen ? 'rgba(232, 23, 31, 0.02)' : '#FFFFFF',
                overflow: 'hidden',
              }}
            >
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0f0f0f',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  borderLeft: isOpen ? '4px solid #0A66C2' : '4px solid transparent',
                  paddingLeft: '16px',
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F8F9FA';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ flex: 1, textAlign: 'left' }}>{item.q}</span>
                <svg
                  className={`faq-chevron ${isOpen ? 'open' : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, color: '#0f0f0f' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div
                className="faq-answer-container"
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                style={{
                  maxHeight: isOpen ? '1000px' : '0px',
                }}
              >
                <div
                  className="faq-answer"
                  style={{
                    padding: '0 20px 20px 20px',
                    paddingLeft: '20px',
                    borderTop: '1px solid #E5E7EB',
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#4B5563',
                    lineHeight: '1.6',
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
