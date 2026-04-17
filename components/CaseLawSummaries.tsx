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
  'Frequently Cited': 'bg-blue-100 text-blue-800',
  Recent: 'bg-green-100 text-green-800',
  Distinguishing: 'bg-yellow-100 text-yellow-800',
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
        className="rounded-lg border border-[var(--bdr, #E2DFD8)] bg-[var(--surf,#F6F5F2)] p-6"
      >
        <h2 className="text-lg font-semibold text-gray-100 mb-3">Relevant Case Law</h2>
        <div className="text-sm text-gray-400">
          <p className="font-medium text-gray-300 mb-1">Landmark cases and recent precedents</p>
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
      className="rounded-lg border border-[var(--bdr, #E2DFD8)] bg-[var(--surf,#F6F5F2)] p-6"
    >
      <h2 className="text-lg font-semibold text-gray-100 mb-6">Relevant Case Law</h2>

      <div className="space-y-3">
        <AnimatePresence>
          {cases.map((caseItem: CaseLawSummary, index: number) => (
            <motion.div
              key={`${caseItem.citation}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-[var(--bdr, #E2DFD8)] rounded-lg overflow-hidden hover:border-[var(--bdr, #E2DFD8)] transition-colors"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left p-4 hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-100">{caseItem.name}</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                          relevanceColors[caseItem.relevance]
                        }`}
                      >
                        {caseItem.relevance}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      <span>{caseItem.court}</span>
                      <span className="text-gray-400">•</span>
                      <span>{caseItem.year}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-mono">{caseItem.citation}</span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400"
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
                    className="border-t border-[var(--bdr, #E2DFD8)] bg-[var(--color-surface-2)]"
                  >
                    <div className="p-4">
                      <p className="text-sm text-gray-300 leading-relaxed">{caseItem.summary}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-6 border-t border-[var(--bdr, #E2DFD8)]">
        <p className="text-xs text-gray-400">
          <span className="font-semibold text-gray-300">Source:</span> CourtListener federal court opinions.
          Summaries generated by AI analysis of case documents.
        </p>
      </div>
    </motion.div>
  );
}
