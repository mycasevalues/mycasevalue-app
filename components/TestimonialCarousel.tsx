'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  firm: string;
  stars: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "MyCaseValue's settlement data accuracy is unmatched. I used it to evaluate a recent personal injury case and the range data perfectly aligned with where the case eventually settled. This tool has become essential for my practice.",
    author: "Jennifer Martinez",
    title: "Personal Injury Attorney",
    firm: "Martinez & Associates, Los Angeles, CA",
    stars: 5,
  },
  {
    quote: "As an employment law specialist, I rely on MyCaseValue to benchmark win rates for discrimination cases. The district-by-district breakdown gives me confidence when advising clients on settlement strategy and litigation risk.",
    author: "David Chen",
    title: "Employment Law Counsel",
    firm: "Chen Legal Group, San Francisco, CA",
    stars: 5,
  },
  {
    quote: "The case duration insights are invaluable. I can now give civil rights clients realistic timelines and help them understand what to expect. The data transparency has earned me trust and repeat business.",
    author: "Amelia Richardson",
    title: "Civil Rights Litigation Director",
    firm: "Richardson & Associates, Atlanta, GA",
    stars: 5,
  },
  {
    quote: "For insurance defense work, MyCaseValue's outcome trend data helps us understand plaintiff strategies and settlement expectations. It's a game-changer for case evaluation and risk assessment on the defense side.",
    author: "Marcus Thompson",
    title: "Insurance Defense Specialist",
    firm: "Thompson Legal Defense, Chicago, IL",
    stars: 5,
  },
  {
    quote: "Family law is complex, but MyCaseValue's district court comparisons help me understand local judicial patterns. It's improved my settlement negotiations and given families realistic expectations about outcomes in their jurisdiction.",
    author: "Sarah Williams",
    title: "Family Law Attorney",
    firm: "Williams Family Law Center, Austin, TX",
    stars: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #D5D8DC',
        borderBottom: '1px solid #D5D8DC',
        padding: '80px 24px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Legal professional testimonials"
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {/* Header with decorative line */}
        <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative' }}>
          {/* Red decorative line above heading */}
          <div
            style={{
              width: '60px',
              height: '4px',
              background: '#E8171F',
              margin: '0 auto 16px',
              borderRadius: '2px',
            }}
          />
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#212529',
              fontFamily: 'var(--font-display)',
              margin: '0 0 12px 0',
            }}
          >
            What Legal Professionals Say
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#455A64',
              fontFamily: 'var(--font-body)',
              margin: '0',
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Trusted by attorneys across all practice areas for accurate federal court analytics.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            style={{
              position: 'relative',
              zIndex: 10,
              flexShrink: 0,
              width: '44px',
              height: '44px',
              borderRadius: '2px',
              border: 'none',
              background: '#00172E',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 200ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8171F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00172E';
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Testimonial Card with Fade Transition */}
          <div
            style={{
              flex: 1,
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              key={currentIndex}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D5D8DC',
                borderRadius: '2px',
                padding: '32px',
                width: '100%',
                animation: 'fadeIn 300ms ease-in-out',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: '20px', display: 'flex', gap: '4px' }}>
                {Array.from({ length: currentTestimonial.stars }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#E8171F"
                    stroke="none"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  fontSize: '16px',
                  color: '#455A64',
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  margin: '0 0 24px 0',
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#212529',
                    fontFamily: 'var(--font-display)',
                    margin: '0 0 2px 0',
                  }}
                >
                  {currentTestimonial.author}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#455A64',
                    fontFamily: 'var(--font-body)',
                    margin: '0 0 4px 0',
                    fontWeight: 500,
                  }}
                >
                  {currentTestimonial.title}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#455A64',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {currentTestimonial.firm}
                </p>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            aria-label="Next testimonial"
            style={{
              position: 'relative',
              zIndex: 10,
              flexShrink: 0,
              width: '44px',
              height: '44px',
              borderRadius: '2px',
              border: 'none',
              background: '#00172E',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 200ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8171F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00172E';
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '32px',
          }}
        >
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: index === currentIndex ? 'none' : '1px solid #D5D8DC',
                background: index === currentIndex ? '#E8171F' : 'transparent',
                cursor: 'pointer',
                transition: 'all 200ms',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.borderColor = '#E8171F';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.borderColor = '#D5D8DC';
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS for fade animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
