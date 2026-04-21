'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCaseLawForNos } from '@/data/case-law-summaries';
import type { CaseLawSummary } from '@/data/case-law-summaries';

interface CaseLawSummariesProps {
  nosCode: string;
}

const relevanceColors: Record<string, string> = {
  Landmark: 'bg-red-100 text-red-800',
  'Frequently Cited': 'bg-[var(--surf)] text-blue-800',
  Recent: 'bg-green-100 text-[var(--data-positive)]',
  Distinguishing: 'bg-yellow-100 text-[var(--wrn-txt)]',
};

export default function CaseLawSummaries({ nosCode }: CaseLawSummariesProps) {
  const cases = getCaseLawForNos(nosCode);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!cases) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded border border-[var(--bdr, #E5E7EB)] bg-[var(--surf,#FFFFFF)] p-6"
      >
        <h2 className="text-[var(--color-text-muted)] mb-3" style={{ fontSize: 16, fontWeight: 600 }}>Relevant Case Law</h2>
        <div className="text-[var(--color-text-muted)]" style={{ fontSize: 14 }}>
          <p className="text-[var(--color-text-muted)] mb-1" style={{ fontWeight: 500 }}>Landmark cases and recent precedents</p>
          <p>
            AI-powered analysis of precedents for NOS {nosCode}. See landmark cases and recent opinions
            relevant to this case type.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded border border-[var(--bdr, #E5E7EB)] bg-[var(--surf,#FFFFFF)] p-6"
    >
      <h2 className="text-[var(--color-text-muted)] mb-6" style={{ fontSize: 16, fontWeight: 600 }}>Relevant Case Law</h2>

      <div className="space-y-3">
        <AnimatePresence>
          {cases.map((caseItem: CaseLawSummary, index: number) => (
            <motion.div
              key={`${caseItem.citation}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-[var(--bdr, #E5E7EB)] rounded overflow-hidden hover:border-[var(--bdr, #E5E7EB)] transition-colors"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left p-4 hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[var(--color-text-muted)]" style={{ fontWeight: 600 }}>{caseItem.name}</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded   ${
                          relevanceColors[caseItem.relevance]
                        }`}
                      >
                        {caseItem.relevance}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[var(--color-text-muted)]" style={{ fontSize: 12 }}>
                      <span>{caseItem.court}</span>
                      <span className="text-[var(--color-text-muted)]">•</span>
                      <span>{caseItem.year}</span>
                      <span className="text-[var(--color-text-muted)]">•</span>
                      <span className="font-mono">{caseItem.citation}</span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[var(--color-text-muted)]"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[var(--bdr, #E5E7EB)] bg-[var(--color-surface-2)]"
                  >
                    <div className="p-4">
                      <p className="text-[var(--color-text-muted)] leading-relaxed" style={{ fontSize: 14 }}>{caseItem.summary}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-6 border-t border-[var(--bdr, #E5E7EB)]">
        <p className="text-[var(--color-text-muted)]" style={{ fontSize: 12 }}>
          <span className="text-[var(--color-text-muted)]" style={{ fontWeight: 600 }}>Source:</span> CourtListener federal court opinions.
          Summaries generated by AI analysis of case documents.
        </p>
      </div>
    </motion.div>
  );
}
