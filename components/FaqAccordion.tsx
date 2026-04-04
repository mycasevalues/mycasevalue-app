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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'active' : ''}`}
              style={{
                border: '1px solid #D5D8DC',
                borderLeft: isOpen ? '3px solid #E8171F' : '1px solid #D5D8DC',
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: isOpen ? '#FFFFFF' : '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#212529',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F8F9FA';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFFFF';
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
                  style={{ flexShrink: 0, color: '#212529' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div
                className="faq-answer-container"
                style={{
                  maxHeight: isOpen ? '1000px' : '0px',
                }}
              >
                <div
                  className="faq-answer"
                  style={{
                    padding: '0 20px 20px 20px',
                    paddingTop: '16px',
                    borderTop: '1px solid #D5D8DC',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#212529',
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
