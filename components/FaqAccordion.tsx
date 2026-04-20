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
          background-color: var(--gold-light, #FAF3E6);
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', borderRadius: '4px', border: '1px solid var(--bdr)', overflow: 'hidden' }}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const isLast = index === items.length - 1;

          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'active' : ''}`}
              style={{
                borderBottom: isLast ? 'none' : '1px solid var(--bdr)',
                backgroundColor: isOpen ? 'var(--gold-light, #FAF3E6)' : 'var(--card)',
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
                  padding: '24px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text1)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  borderLeft: isOpen ? '4px solid var(--link)' : '4px solid transparent',
                  paddingLeft: '16px',
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--surf)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ flex: 1, textAlign: 'left' }}>{item.q}</span>
                <svg aria-hidden="true"
                  className={`faq-chevron ${isOpen ? 'open' : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, color: 'var(--text1)' }}
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
                    paddingLeft: '24px',
                    borderTop: '1px solid var(--bdr)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'var(--text2)',
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
