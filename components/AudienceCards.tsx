'use client';

import { useState } from 'react';

interface AudienceCard {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    title: 'Pro Se Litigants',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
      </svg>
    ),
    description: 'Understand what outcomes look like for cases like yours \u2014 win rates, typical timelines, and what happens in your specific district.',
  },
  {
    title: 'Solo & Small Firm Attorneys',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M10 16.5l6-4.5 6 4.5v-9h-12m0-3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m2 5h8v2h-8V8m0 4h8v2h-8v-2"/>
      </svg>
    ),
    description: 'Benchmark your cases, evaluate venue options, and understand how your judge has ruled \u2014 without the enterprise price tag.',
  },
  {
    title: 'Paralegals',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z M16 18H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V8h8v2z"/>
      </svg>
    ),
    description: 'Pull federal court outcome data in minutes. Research judge analytics, filter by district, and support your attorneys with usable data.',
  },
  {
    title: 'Law Students',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2L2 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
    description: "Research how courts actually rule on the issues you're studying. Prep for moot court and sharpen arguments with real data.",
  },
  {
    title: 'Academic Researchers',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2V17zm4 0h-2V7h2V17zm4 0h-2v-4h2V17z"/>
      </svg>
    ),
    description: 'Access millions of federal case records filtered by district, judge, outcome, and year. Citable. Built for empirical research.',
  },
  {
    title: 'Other Legal Professionals',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    description: 'Mediators, arbitrators, and consultants \u2014 anchor settlement strategy and expert analysis with federal court outcome data.',
  },
];

export default function AudienceCards() {
  const [expanded, setExpanded] = useState(false);
  const primaryCards = AUDIENCE_CARDS.slice(0, 3);
  const secondaryCards = AUDIENCE_CARDS.slice(3);

  return (
    <section id="who-uses" className="scroll-mt-[72px] px-4 md:px-8 py-16 md:py-24 bg-[var(--surf,#FFFFFF)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="md: text-[var(--color-text-muted)] mb-3" style={{ fontSize: 20, fontWeight: 700 }}>
            Built for Legal Professionals
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto" style={{ fontSize: 14 }}>
            Whether you&apos;re representing yourself or preparing a complex federal brief.
          </p>
        </div>

        {/* Primary audience cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryCards.map((card) => (
            <div
              key={card.title}
              className="bg-[var(--surf,#FFFFFF)] border border-[var(--bdr, #E5E7EB)] rounded p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-brand-blue mb-4">
                {card.icon}
              </div>
              <h3 className="text-[var(--color-text-muted)] mb-3" style={{ fontSize: 14, fontWeight: 600 }}>
                {card.title}
              </h3>
              <p className="text-[var(--text2)] leading-relaxed" style={{ fontSize: 14 }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary audience cards \u2014 expandable */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: expanded ? '600px' : '0px',
            opacity: expanded ? 1 : 0,
            marginTop: expanded ? '24px' : '0px',
          }}
        >
          {secondaryCards.map((card) => (
            <div
              key={card.title}
              className="bg-[var(--surf,#FFFFFF)] border border-[var(--bdr, #E5E7EB)] rounded p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-brand-blue mb-4">
                {card.icon}
              </div>
              <h3 className="text-[var(--color-text-muted)] mb-3" style={{ fontSize: 14, fontWeight: 600 }}>
                {card.title}
              </h3>
              <p className="text-[var(--text2)] leading-relaxed" style={{ fontSize: 14 }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Toggle button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue/80 transition-colors"
          >
            {expanded ? 'Show fewer' : 'Also built for students, researchers & more'}
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
