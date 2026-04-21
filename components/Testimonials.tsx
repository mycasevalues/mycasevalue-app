'use client';

const testimonials = [
  {
    quote:
      'I used MyCaseValue to research employment discrimination outcomes in SDNY before my mediation. The data matched what I\u2019d seen in 15 years of practice.',
    name: 'Sarah Chen',
    title: 'Employment Attorney',
  },
  {
    quote:
      'As a pro se litigant, I had no idea what to expect from my federal case. MyCaseValue showed me the real numbers \u2014 win rates, timelines, settlement ranges. It changed how I approached my case.',
    name: 'Marcus Rivera',
    title: 'Pro Se Litigant',
  },
  {
    quote:
      'We use MyCaseValue for case valuation across our entire litigation practice. At $29.99/month, it\u2019s a fraction of what we paid for Lex Machina.',
    name: 'David Park',
    title: 'Managing Partner, Park & Associates',
  },
];

export default function Testimonials() {
  return (
    <>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <p className="testimonial-name">{t.name}</p>
            <p className="testimonial-title">{t.title}</p>
          </div>
        ))}
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .testimonial-card {
          background: var(--card, #FFFFFF);
          border: 1px solid var(--bdr, #E5E2DA);
          border-radius: 4px;
          padding: 20px;
        }

        .testimonial-quote {
          font-family: var(--font-legal);
          font-size: 14px;
          font-style: italic;
          color: var(--text2, #525252);
          line-height: 1.65;
          margin: 0 0 14px;
        }

        .testimonial-name {
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 600;
          color: var(--text1, #333333);
          margin: 0 0 2px;
        }

        .testimonial-title {
          font-family: var(--font-ui);
          font-size: 12px;
          color: var(--text3, #4A4940);
          margin: 0;
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
