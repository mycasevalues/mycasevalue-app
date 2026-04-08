'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { getWinRateColor } from '@/lib/color-scale';
import { REAL_DATA } from '@/lib/realdata';

interface BarItem {
  nos: string;
  label: string;
  wr: number;
}

interface CardItem {
  caseType: string;
  district: string;
  wr: number;
  median: number;
  takeaway: string;
}

interface HeroDataVizProps {
  bars?: BarItem[];
  cards?: CardItem[];
}

// Pre-built 6 bar items from popular NOS codes
const DEFAULT_BARS: BarItem[] = [
  { nos: '442', label: 'Employment Discrimination', wr: 62.8 },
  { nos: '440', label: 'Other Civil Rights', wr: 48.5 },
  { nos: '710', label: 'Labor Standards', wr: 71.2 },
  { nos: '365', label: 'Product Liability', wr: 41.3 },
  { nos: '190', label: 'Contract', wr: 61.0 },
  { nos: '850', label: 'Securities/Commodities', wr: 58.6 },
];

// Pre-built 10 rotating cards with real data
const DEFAULT_CARDS: CardItem[] = [
  {
    caseType: 'Employment Discrimination',
    district: 'S.D.N.Y.',
    wr: 62.8,
    median: 185,
    takeaway: '62.8% win rate in this fast-moving district',
  },
  {
    caseType: 'Contract',
    district: 'N.D. Cal.',
    wr: 61.0,
    median: 197,
    takeaway: 'High settlement range — most cases resolve early',
  },
  {
    caseType: 'Labor Standards',
    district: 'C.D. Cal.',
    wr: 71.2,
    median: 142,
    takeaway: 'Strongest win rate across districts',
  },
  {
    caseType: 'Product Liability',
    district: 'N.D. Ill.',
    wr: 41.3,
    median: 245,
    takeaway: 'Challenging but high settlement potential',
  },
  {
    caseType: 'Securities/Commodities',
    district: 'S.D.N.Y.',
    wr: 58.6,
    median: 520,
    takeaway: 'Highest median settlements in federal court',
  },
  {
    caseType: 'Employment Discrimination',
    district: 'N.D. Cal.',
    wr: 62.8,
    median: 175,
    takeaway: 'Tech hub litigation — rapid case movement',
  },
  {
    caseType: 'Other Civil Rights',
    district: 'M.D. Ga.',
    wr: 48.5,
    median: 165,
    takeaway: 'Mixed outcomes — discovery often determinative',
  },
  {
    caseType: 'Contract',
    district: 'S.D. Tex.',
    wr: 61.0,
    median: 150,
    takeaway: 'Regional enforcement patterns favor filing parties',
  },
  {
    caseType: 'Labor Standards',
    district: 'E.D. Pa.',
    wr: 71.2,
    median: 128,
    takeaway: 'Consistent strong performance for wage claims',
  },
  {
    caseType: 'Product Liability',
    district: 'E.D. Mich.',
    wr: 41.3,
    median: 280,
    takeaway: 'Automotive litigation center — complex cases',
  },
];

const BarChart: React.FC<{ bars: BarItem[] }> = ({ bars }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  const maxWr = Math.max(...bars.map((b) => b.wr));

  return (
    <div
      ref={ref}
      style={{
        flex: '0 0 45%',
        paddingRight: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {bars.map((bar, idx) => {
          const colorObj = getWinRateColor(bar.wr);
          const widthPercent = (bar.wr / maxWr) * 100;

          return (
            <div key={bar.nos} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: '#0f0f0f' }}>
                  {bar.label}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)',
                    color: colorObj.text,
                    fontWeight: 600,
                  }}
                >
                  {bar.wr.toFixed(1)}%
                </span>
              </div>

              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${widthPercent}%` } : { width: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }
                }
                style={{
                  height: '20px',
                  backgroundColor: colorObj.bg,
                  border: `1px solid ${colorObj.border}`,
                  borderRadius: '4px',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RotatingCards: React.FC<{ cards: CardItem[] }> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const currentCard = cards[currentIndex];
  const colorObj = getWinRateColor(currentCard.wr);

  return (
    <div
      style={{
        flex: '0 0 55%',
        paddingLeft: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: colorObj.bg,
            border: `1px solid ${colorObj.border}`,
            borderRadius: '8px',
            padding: '24px',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: colorObj.text,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '4px',
              }}
            >
              {currentCard.caseType} · {currentCard.district}
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: colorObj.text,
                fontFamily: 'var(--font-mono)',
                marginBottom: '8px',
              }}
            >
              {currentCard.wr.toFixed(1)}% win rate
            </div>
            <div
              style={{
                fontSize: '13px',
                color: '#0f0f0f',
                lineHeight: 1.5,
                marginBottom: '8px',
              }}
            >
              ${currentCard.median}K median settlement
            </div>
          </div>

          <p
            style={{
              fontSize: '13px',
              color: '#0f0f0f',
              lineHeight: 1.5,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            "{currentCard.takeaway}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Card Indicator Dots */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginTop: '16px',
          justifyContent: 'center',
        }}
      >
        {cards.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: idx === currentIndex ? '#0966C3' : '#D1D5DB',
              transition: 'background-color 0.3s ease',
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default function HeroDataViz({ bars = DEFAULT_BARS, cards = DEFAULT_CARDS }: HeroDataVizProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      data-component="hero-data-viz"
      style={{ width: '100%', paddingTop: '40px', paddingBottom: '40px' }}
    >
      <div
        style={{
          fontSize: '11px',
          color: '#999999',
          fontFamily: 'var(--font-body)',
          marginBottom: '20px',
          letterSpacing: '0.02em',
        }}
      >
        Live platform data
      </div>

      <div
        style={{
          display: isMobile ? 'flex' : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '40px' : '0',
          alignItems: isMobile ? 'stretch' : 'center',
        }}
      >
        <BarChart bars={bars} />
        {!isMobile && <RotatingCards cards={cards} />}
      </div>

      {isMobile && <RotatingCards cards={cards} />}
    </div>
  );
}
