import { Metadata } from 'next';
import Link from 'next/link';
import { SITS } from '../../../../lib/data';
import { REAL_DATA } from '../../../../lib/realdata';
import { ATTORNEY_IMPACT } from '../../../../lib/attorney-impact';
import { GUIDE_CONTENT } from '../../../../data/guide-content';
import { getWinRateColor } from '../../../../lib/color-scale';
import { SITE_URL } from '../../../../lib/site-config';
import { fmtK } from '../../../../lib/format';

// Codes to generate static pages for
const GUIDE_NOS_CODES = ['442', '445', '710', '360', '362', '365', '370', '440', '190', '110', '870', '863', '220', '350', '830', '820', '840', '550', '791', '376'];

interface PageProps {
  params: Promise<{ code: string }>;
}

function getNOSMap(): Record<string, { label: string; category: string; description?: string }> {
  const nosMap: Record<string, { label: string; category: string; description?: string }> = {};

  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      const key = option.nos;
      if (!nosMap[key]) {
        nosMap[key] = { label: option.label, category: category.label, description: option.d };
      }
    });
  });

  return nosMap;
}

export async function generateStaticParams() {
  return GUIDE_NOS_CODES.map((code) => ({ code }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return { title: 'Case Guide' };
  }

  const title = `${nosInfo.label} Cases — Federal Court Guide & Legal Explainer`;
  const description = `Understand ${nosInfo.label.toLowerCase()} cases in federal court. Win rates, settlements, legal elements to prove, and next steps for parties. Based on real court data.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/nos/${code}/guide`,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ color: 'var(--color-text-primary)' }}>Case Guide Not Found</h1>
        <p>This NOS code does not have a guide yet.</p>
        <Link href="/nos" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
          Back to Case Types
        </Link>
      </div>
    );
  }

  const content = GUIDE_CONTENT[code];
  const realData = REAL_DATA[code];
  const attorneyData = ATTORNEY_IMPACT[code];

  if (!content) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ color: 'var(--color-text-primary)' }}>Case Guide</h1>
        <p>A detailed guide for {nosInfo.label} cases is not yet available. View the case data instead.</p>
        <Link href={`/nos/${code}`} style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
          View {nosInfo.label} Case Data
        </Link>
      </div>
    );
  }

  const winRateColor = realData?.wr ? getWinRateColor(realData.wr) : null;
  const settlementMedian = realData?.rng?.md || null;
  const duration = realData?.mo || null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 30px' }}>
      {/* Header */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginBottom: '30px',
        lineHeight: 1.2,
        fontFamily: 'var(--font-legal)',
      }}>
        Understanding {nosInfo.label} Cases in Federal Court — A Practical Guide
      </h1>

      <p style={{
        fontSize: '1.1rem',
        color: 'var(--text-tertiary)',
        marginBottom: '50px',
        lineHeight: 1.6,
        fontFamily: 'var(--font-ui)',
      }}>
        This guide explains what {nosInfo.label.toLowerCase()} cases are, how to evaluate if you have a claim, what you must prove, and the next steps to take. It's based on real federal court data.
      </p>

      {/* What Is This Case Type? */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-legal)',
        }}>
          What Is a {nosInfo.label} Case?
        </h2>
        {content.whatIs.map((para, idx) => (
          <p key={idx} style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '15px',
            lineHeight: 1.8,
            fontFamily: 'var(--font-ui)',
          }}>
            {para}
          </p>
        ))}
      </section>

      {/* Do I Have a Case? */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-legal)',
        }}>
          Do I Have a {nosInfo.label} Case?
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-tertiary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-ui)',
        }}>
          Ask yourself these questions:
        </p>
        <div style={{ display: 'grid', gap: '24px' }}>
          {content.doIHaveCase.map((item, idx) => (
            <div key={idx} style={{
              padding: '24px',
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
            }}>
              <p style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                marginBottom: '8px',
                fontFamily: 'var(--font-legal)',
              }}>
                {item.q}
              </p>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.6,
                fontFamily: 'var(--font-ui)',
              }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Must Prove */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-legal)',
        }}>
          What You Must Prove
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-tertiary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-ui)',
        }}>
          To win a {nosInfo.label.toLowerCase()} case, you must establish:
        </p>
        <ol style={{
          paddingLeft: '24px',
          margin: '0 0 30px 0',
        }}>
          {content.whatToProve.map((item, idx) => (
            <li key={idx} style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '12px',
              lineHeight: 1.6,
              fontFamily: 'var(--font-ui)',
            }}>
              {item}
            </li>
          ))}
        </ol>
      </section>

      {/* Common Dismissal Reasons */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-legal)',
        }}>
          Why {nosInfo.label} Cases Get Dismissed
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-tertiary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-ui)',
        }}>
          Courts dismiss cases for several reasons. Understanding them helps you strengthen your claim:
        </p>
        <div style={{ display: 'grid', gap: '16px' }}>
          {content.dismissalReasons.map((reason, idx) => (
            <div key={idx} style={{
              padding: '16px',
              borderLeft: '4px solid var(--data-negative)',
              backgroundColor: 'rgba(249,115,22,0.06)',
              borderRadius: '4px',
            }}>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.6,
                fontFamily: 'var(--font-ui)',
              }}>
                {reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Real Data Section - Outcomes */}
      {realData && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '30px',
            fontFamily: 'var(--font-legal)',
          }}>
            What Outcomes Look Like
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '30px',
          }}>
            {/* Win Rate */}
            {realData.wr && winRateColor && (
              <div style={{
                padding: '24px',
                backgroundColor: winRateColor.bg,
                border: `1px solid ${winRateColor.border}`,
                borderRadius: '4px',
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-ui)',
                }}>
                  Win Rate
                </p>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: winRateColor.text,
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--font-legal)',
                }}>
                  {realData.wr}%
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-tertiary)',
                  margin: 0,
                  fontFamily: 'var(--font-ui)',
                }}>
                  {winRateColor.label} outcomes in federal court
                </p>
              </div>
            )}

            {/* Settlement Rate */}
            {realData.sp && (
              <div style={{
                padding: '24px',
                backgroundColor: 'rgba(59,130,246,0.08)',
                border: '1px solid var(--accent-primary)',
                borderRadius: '4px',
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-ui)',
                }}>
                  Settlement Rate
                </p>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--font-legal)',
                }}>
                  {realData.sp}%
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-tertiary)',
                  margin: 0,
                  fontFamily: 'var(--font-ui)',
                }}>
                  End in settlement rather than trial
                </p>
              </div>
            )}

            {/* Median Duration */}
            {duration && (
              <div style={{
                padding: '24px',
                backgroundColor: 'rgba(59,130,246,0.06)',
                border: '1px solid var(--link)',
                borderRadius: '4px',
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-ui)',
                }}>
                  Median Duration
                </p>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  margin: '0 0 10px 0',
                  fontFamily: 'var(--font-legal)',
                }}>
                  {duration} mo
                </p>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-tertiary)',
                  margin: 0,
                  fontFamily: 'var(--font-ui)',
                }}>
                  From filing to resolution
                </p>
              </div>
            )}
          </div>

          {/* Settlement Range */}
          {realData.rng && (
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              marginBottom: '24px',
            }}>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-tertiary)',
                marginBottom: '15px',
                fontFamily: 'var(--font-ui)',
              }}>
                <strong>Typical Settlement Range</strong>
              </p>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.6,
                fontFamily: 'var(--font-ui)',
              }}>
                <strong>25th percentile:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>${fmtK(realData.rng.lo)}k</span> | <strong>Median:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>${fmtK(realData.rng.md)}k</span> | <strong>75th percentile:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>${fmtK(realData.rng.hi)}k</span>
              </p>
            </div>
          )}
        </section>
      )}

      {/* Attorney Impact */}
      {attorneyData && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '24px',
            fontFamily: 'var(--font-legal)',
          }}>
            The Value of an Attorney
          </h2>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-tertiary)',
            marginBottom: '24px',
            fontFamily: 'var(--font-ui)',
          }}>
            Having a licensed attorney makes a significant difference in {nosInfo.label.toLowerCase()} cases:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            <div style={{
              padding: '24px',
              backgroundColor: 'rgba(34,197,94,0.1)',
              border: '1px solid var(--data-positive)',
              borderRadius: '4px',
            }}>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-tertiary)',
                marginBottom: '8px',
                fontFamily: 'var(--font-ui)',
              }}>
                With Attorney
              </p>
              <p style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--data-positive)',
                margin: '0 0 10px 0',
                fontFamily: 'var(--font-legal)',
              }}>
                {attorneyData.rwr}%
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                margin: 0,
                fontFamily: 'var(--font-ui)',
              }}>
                Outcome rate for represented parties
              </p>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'rgba(249,115,22,0.06)',
              border: '1px solid var(--wrn-bg)',
              borderRadius: '4px',
            }}>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-tertiary)',
                marginBottom: '8px',
                fontFamily: 'var(--font-ui)',
              }}>
                Without Attorney
              </p>
              <p style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--data-negative)',
                margin: '0 0 10px 0',
                fontFamily: 'var(--font-legal)',
              }}>
                {attorneyData.pwr}%
              </p>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                margin: 0,
                fontFamily: 'var(--font-ui)',
              }}>
                Outcome rate for pro se (self-represented) parties
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'rgba(59,130,246,0.08)',
            borderLeft: '4px solid var(--accent-primary)',
            borderRadius: '4px',
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.6,
              fontFamily: 'var(--font-ui)',
            }}>
              <strong>Impact:</strong> An attorney increases your win rate by {attorneyData.rwr - attorneyData.pwr} percentage points. Most employment, personal injury, and consumer protection attorneys work on contingency—you don't pay upfront, and they take a percentage of your settlement or verdict.
            </p>
          </div>
        </section>
      )}

      {/* Next Steps */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-legal)',
        }}>
          Your Next Steps
        </h2>

        <ol style={{
          paddingLeft: '24px',
          margin: '0 0 30px 0',
        }}>
          {content.nextSteps.slice(0, -1).map((step, idx) => (
            <li key={idx} style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '15px',
              lineHeight: 1.6,
              fontFamily: 'var(--font-ui)',
            }}>
              {step}
            </li>
          ))}
          <li style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '15px',
            lineHeight: 1.6,
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
          }}>
            {content.nextSteps[content.nextSteps.length - 1]}
          </li>
        </ol>
      </section>

      {/* Important Disclaimer */}
      <section style={{
        padding: '24px',
        backgroundColor: 'rgba(239,68,68,0.06)',
        border: '1px solid var(--data-negative)',
        borderRadius: '4px',
        marginBottom: '50px',
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--data-negative)',
          marginBottom: '8px',
          fontFamily: 'var(--font-legal)',
        }}>
          Important Disclaimer
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          margin: 0,
          lineHeight: 1.6,
          fontFamily: 'var(--font-ui)',
        }}>
          This guide is educational and not legal advice. Every case is unique and depends on specific facts, applicable law, and jurisdiction. This information is based on aggregated federal court data and does not apply to state court cases, administrative claims, or proceedings outside the federal system. Consult a licensed attorney in your jurisdiction for advice about your specific situation.
        </p>
      </section>

      {/* Related Resources */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '24px',
          fontFamily: 'var(--font-legal)',
        }}>
          Related Resources
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}>
          <Link href={`/nos/${code}`} style={{
            padding: '24px',
            backgroundColor: 'rgba(59,130,246,0.08)',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            textDecoration: 'none',
            color: 'var(--accent-primary)',
            transition: 'all 0.2s ease',
          }}>
            <p style={{
              fontSize: '1rem',
              fontWeight: 600,
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-legal)',
            }}>
              {nosInfo.label} Case Data
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              margin: 0,
              fontFamily: 'var(--font-ui)',
            }}>
              See detailed analytics and settlement data
            </p>
          </Link>

          <Link href="/calculator" style={{
            padding: '24px',
            backgroundColor: 'rgba(59,130,246,0.06)',
            border: '1px solid var(--link)',
            borderRadius: '4px',
            textDecoration: 'none',
            color: 'var(--accent-primary)',
            transition: 'all 0.2s ease',
          }}>
            <p style={{
              fontSize: '1rem',
              fontWeight: 600,
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-legal)',
            }}>
              Settlement Calculator
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              margin: 0,
              fontFamily: 'var(--font-ui)',
            }}>
              Estimate your case's potential value
            </p>
          </Link>

          <Link href="/nos" style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface-1)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            textDecoration: 'none',
            color: 'var(--accent-primary)',
            transition: 'all 0.2s ease',
          }}>
            <p style={{
              fontSize: '1rem',
              fontWeight: 600,
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-legal)',
            }}>
              Explore All Case Types
            </p>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              margin: 0,
              fontFamily: 'var(--font-ui)',
            }}>
              Browse guides for other case types
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
