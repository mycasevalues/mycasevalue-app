import'{ Metadata } from 'next';
import'Link from 'next/link';
import'{ SITS } from '../../../../lib/data';
import'{ REAL_DATA } from '../../../../lib/realdata';
import'{ ATTORNEY_IMPACT } from '../../../../lib/attorney-impact';
import'{ GUIDE_CONTENT } from '../../../../data/guide-content';
import'{ getWinRateColor } from '../../../../lib/color-scale';
import'{ SITE_URL } from '../../../../lib/site-config';
import'{ fmtK } from '../../../../lib/format';

//'Codes to generate static pages for
const'GUIDE_NOS_CODES = ['442', '445', '710', '360', '362', '365', '370', '440', '190', '110', '870', '863', '220', '350', '830', '820', '840', '550', '791', '376'];

interface'PageProps {
' params: Promise<{ code: string }>;
}

function'getNOSMap(): Record<string, { label: string; category: string; description?: string }> {
' const nosMap: Record<string, { label: string; category: string; description?: string }> = {};

' SITS.forEach((category) => {
'   category.opts.forEach((option) => {
'     const key = option.nos;
'     if (!nosMap[key]) {
'       nosMap[key] = { label: option.label, category: category.label, description: option.d };
'     }
'   });
' });

' return nosMap;
}

export'async function generateStaticParams() {
' return GUIDE_NOS_CODES.map((code) => ({ code }));
}

export'async function generateMetadata(
' { params }: PageProps
):'Promise<Metadata> {
' const { code } = await params;
' const nosMap = getNOSMap();
' const nosInfo = nosMap[code];

' if (!nosInfo) {
'   return { title: 'Case Guide' };
' }

' const title = `${nosInfo.label} Cases — Federal Court Guide & Legal Explainer`;
' const description = `Understand ${nosInfo.label.toLowerCase()} cases in federal court. Win rates, settlements, legal elements to prove, and next steps for parties. Based on real court data.`;

' return {
'   title,
'   description,
'   openGraph: {
'     title,
'     description,
'     type: 'article',
'     url: `${SITE_URL}/nos/${code}/guide`,
'   },
' };
}

export'default async function GuidePage({ params }: PageProps) {
' const { code } = await params;
' const nosMap = getNOSMap();
' const nosInfo = nosMap[code];

' if (!nosInfo) {
'   return (
'     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
'       <h1 style={{ color: 'var(--color-text-primary)' }}>Case Guide Not Found</h1>
'       <p>This NOS code does not have a guide yet.</p>
'       <Link href="/nos" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
'         Back to Case Types
'       </Link>
'     </div>
'   );
' }

' const content = GUIDE_CONTENT[code];
' const realData = REAL_DATA[code];
' const attorneyData = ATTORNEY_IMPACT[code];

' if (!content) {
'   return (
'     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
'       <h1 style={{ color: 'var(--color-text-primary)' }}>Case Guide</h1>
'       <p>A detailed guide for {nosInfo.label} cases is not yet available. View the case data instead.</p>
'       <Link href={`/nos/${code}`} style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
'         View {nosInfo.label} Case Data
'       </Link>
'     </div>
'   );
' }

' const winRateColor = realData?.wr ? getWinRateColor(realData.wr) : null;
' const settlementMedian = realData?.rng?.md || null;
' const duration = realData?.mo || null;

' return (
'   <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 30px' }}>
'     {/* Header */}
'     <h1 style={{
'       fontSize: '2.5rem',
'       fontWeight: 700,
'       color: 'var(--color-text-primary)',
'       marginBottom: '30px',
'       lineHeight: 1.2,
'       fontFamily: 'var(--font-heading)',
'     }}>
'       Understanding {nosInfo.label} Cases in Federal Court — A Practical Guide
'     </h1>

'     <p style={{
'       fontSize: '1.1rem',
'       color: '#5c5c5c',
'       marginBottom: '50px',
'       lineHeight: 1.6,
'       fontFamily: 'var(--font-body)',
'     }}>
'       This guide explains what {nosInfo.label.toLowerCase()} cases are, how to evaluate if you have a claim, what you must prove, and the next steps to take. It's based on real federal court data.
'     </p>

'     {/* What Is This Case Type? */}
'     <section style={{ marginBottom: '50px' }}>
'       <h2 style={{
'         fontSize: '1.8rem',
'         fontWeight: 600,
'         color: 'var(--color-text-primary)',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-heading)',
'       }}>
'         What Is a {nosInfo.label} Case?
'       </h2>
'       {content.whatIs.map((para, idx) => (
'         <p key={idx} style={{
'           fontSize: '1rem',
'           color: '#3c3c3c',
'           marginBottom: '15px',
'           lineHeight: 1.8,
'           fontFamily: 'var(--font-body)',
'         }}>
'           {para}
'         </p>
'       ))}
'     </section>

'     {/* Do I Have a Case? */}
'     <section style={{ marginBottom: '50px' }}>
'       <h2 style={{
'         fontSize: '1.8rem',
'         fontWeight: 600,
'         color: 'var(--color-text-primary)',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-heading)',
'       }}>
'         Do I Have a {nosInfo.label} Case?
'       </h2>
'       <p style={{
'         fontSize: '0.95rem',
'         color: '#5c5c5c',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-body)',
'       }}>
'         Ask yourself these questions:
'       </p>
'       <div style={{ display: 'grid', gap: '20px' }}>
'         {content.doIHaveCase.map((item, idx) => (
'           <div key={idx} style={{
'             padding: '20px',
'             backgroundColor: '#f8f9fa',
'             border: '1px solid #e0e0e0',
'             borderRadius: '6px',
'           }}>
'             <p style={{
'               fontSize: '1rem',
'               fontWeight: 600,
'               color: 'var(--accent-primary)',
'               marginBottom: '10px',
'               fontFamily: 'var(--font-heading)',
'             }}>
'               {item.q}
'             </p>
'             <p style={{
'               fontSize: '0.95rem',
'               color: '#3c3c3c',
'               margin: 0,
'               lineHeight: 1.6,
'               fontFamily: 'var(--font-body)',
'             }}>
'               {item.a}
'             </p>
'           </div>
'         ))}
'       </div>
'     </section>

'     {/* What You Must Prove */}
'     <section style={{ marginBottom: '50px' }}>
'       <h2 style={{
'         fontSize: '1.8rem',
'         fontWeight: 600,
'         color: 'var(--color-text-primary)',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-heading)',
'       }}>
'         What You Must Prove
'       </h2>
'       <p style={{
'         fontSize: '0.95rem',
'         color: '#5c5c5c',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-body)',
'       }}>
'         To win a {nosInfo.label.toLowerCase()} case, you must establish:
'       </p>
'       <ol style={{
'         paddingLeft: '20px',
'         margin: '0 0 30px 0',
'       }}>
'         {content.whatToProve.map((item, idx) => (
'           <li key={idx} style={{
'             fontSize: '1rem',
'             color: '#3c3c3c',
'             marginBottom: '12px',
'             lineHeight: 1.6,
'             fontFamily: 'var(--font-body)',
'           }}>
'             {item}
'           </li>
'         ))}
'       </ol>
'     </section>

'     {/* Common Dismissal Reasons */}
'     <section style={{ marginBottom: '50px' }}>
'       <h2 style={{
'         fontSize: '1.8rem',
'         fontWeight: 600,
'         color: 'var(--color-text-primary)',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-heading)',
'       }}>
'         Why {nosInfo.label} Cases Get Dismissed
'       </h2>
'       <p style={{
'         fontSize: '0.95rem',
'         color: '#5c5c5c',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-body)',
'       }}>
'         Courts dismiss cases for several reasons. Understanding them helps you strengthen your claim:
'       </p>
'       <div style={{ display: 'grid', gap: '15px' }}>
'         {content.dismissalReasons.map((reason, idx) => (
'           <div key={idx} style={{
'             padding: '15px',
'             borderLeft: '4px solid #CC1016',
'             backgroundColor: '#FDF4EC',
'             borderRadius: '4px',
'           }}>
'             <p style={{
'               fontSize: '0.95rem',
'               color: '#3c3c3c',
'               margin: 0,
'               lineHeight: 1.6,
'               fontFamily: 'var(--font-body)',
'             }}>
'               {reason}
'             </p>
'           </div>
'         ))}
'       </div>
'     </section>

'     {/* Real Data Section - Outcomes */}
'     {realData && (
'       <section style={{ marginBottom: '50px' }}>
'         <h2 style={{
'           fontSize: '1.8rem',
'           fontWeight: 600,
'           color: 'var(--color-text-primary)',
'           marginBottom: '30px',
'           fontFamily: 'var(--font-heading)',
'         }}>
'           What Outcomes Look Like
'         </h2>

'         <div style={{
'           display: 'grid',
'           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
'           gap: '20px',
'           marginBottom: '30px',
'         }}>
'           {/* Win Rate */}
'           {realData.wr && winRateColor && (
'             <div style={{
'               padding: '20px',
'               backgroundColor: winRateColor.bg,
'               border: `1px solid ${winRateColor.border}`,
'               borderRadius: '8px',
'             }}>
'               <p style={{
'                 fontSize: '0.85rem',
'                 color: '#5c5c5c',
'                 marginBottom: '8px',
'                 fontFamily: 'var(--font-body)',
'               }}>
'                 Win Rate
'               </p>
'               <p style={{
'                 fontSize: '2.5rem',
'                 fontWeight: 700,
'                 color: winRateColor.text,
'                 margin: '0 0 10px 0',
'                 fontFamily: 'var(--font-heading)',
'               }}>
'                 {realData.wr}%
'               </p>
'               <p style={{
'                 fontSize: '0.85rem',
'                 color: '#5c5c5c',
'                 margin: 0,
'                 fontFamily: 'var(--font-body)',
'               }}>
'                 {winRateColor.label} outcomes in federal court
'               </p>
'             </div>
'           )}

'           {/* Settlement Rate */}
'           {realData.sp && (
'             <div style={{
'               padding: '20px',
'               backgroundColor: '#EDF3FB',
'               border: '1px solid var(--accent-primary)',
'               borderRadius: '8px',
'             }}>
'               <p style={{
'                 fontSize: '0.85rem',
'                 color: '#5c5c5c',
'                 marginBottom: '8px',
'                 fontFamily: 'var(--font-body)',
'               }}>
'                 Settlement Rate
'               </p>
'               <p style={{
'                 fontSize: '2.5rem',
'                 fontWeight: 700,
'                 color: 'var(--accent-primary-hover)',
'                 margin: '0 0 10px 0',
'                 fontFamily: 'var(--font-heading)',
'               }}>
'                 {realData.sp}%
'               </p>
'               <p style={{
'                 fontSize: '0.85rem',
'                 color: '#5c5c5c',
'                 margin: 0,
'                 fontFamily: 'var(--font-body)',
'               }}>
'                 End in settlement rather than trial
'               </p>
'             </div>
'           )}

'           {/* Median Duration */}
'           {duration && (
'             <div style={{
'               padding: '20px',
'               backgroundColor: '#F0F6FB',
'               border: '1px solid #378FE9',
'               borderRadius: '8px',
'             }}>
'               <p style={{
'                 fontSize: '0.85rem',
'                 color: '#5c5c5c',
'                 marginBottom: '8px',
'                 fontFamily: 'var(--font-body)',
'               }}>
'                 Median Duration
'               </p>
'               <p style={{
'                 fontSize: '2.5rem',
'                 fontWeight: 700,
'                 color: 'var(--accent-primary-hover)',
'                 margin: '0 0 10px 0',
'                 fontFamily: 'var(--font-heading)',
'               }}>
'                 {duration} mo
'               </p>
'               <p style={{
'                 fontSize: '0.85rem',
'                 color: '#5c5c5c',
'                 margin: 0,
'                 fontFamily: 'var(--font-body)',
'               }}>
'                 From filing to resolution
'               </p>
'             </div>
'           )}
'         </div>

'         {/* Settlement Range */}
'         {realData.rng && (
'           <div style={{
'             padding: '20px',
'             backgroundColor: '#f8f9fa',
'             border: '1px solid #e0e0e0',
'             borderRadius: '8px',
'             marginBottom: '20px',
'           }}>
'             <p style={{
'               fontSize: '0.9rem',
'               color: '#5c5c5c',
'               marginBottom: '15px',
'               fontFamily: 'var(--font-body)',
'             }}>
'               <strong>Typical Settlement Range</strong>
'             </p>
'             <p style={{
'               fontSize: '0.95rem',
'               color: '#3c3c3c',
'               margin: 0,
'               lineHeight: 1.6,
'               fontFamily: 'var(--font-body)',
'             }}>
'               <strong>25th percentile:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>${fmtK(realData.rng.lo)}k</span> | <strong>Median:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>${fmtK(realData.rng.md)}k</span> | <strong>75th percentile:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>${fmtK(realData.rng.hi)}k</span>
'             </p>
'           </div>
'         )}
'       </section>
'     )}

'     {/* Attorney Impact */}
'     {attorneyData && (
'       <section style={{ marginBottom: '50px' }}>
'         <h2 style={{
'           fontSize: '1.8rem',
'           fontWeight: 600,
'           color: 'var(--color-text-primary)',
'           marginBottom: '20px',
'           fontFamily: 'var(--font-heading)',
'         }}>
'           The Value of an Attorney
'         </h2>

'         <p style={{
'           fontSize: '0.95rem',
'           color: '#5c5c5c',
'           marginBottom: '20px',
'           fontFamily: 'var(--font-body)',
'         }}>
'           Having a licensed attorney makes a significant difference in {nosInfo.label.toLowerCase()} cases:
'         </p>

'         <div style={{
'           display: 'grid',
'           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
'           gap: '20px',
'         }}>
'           <div style={{
'             padding: '20px',
'             backgroundColor: '#E8F3EB',
'             border: '1px solid #057642',
'             borderRadius: '8px',
'           }}>
'             <p style={{
'               fontSize: '0.85rem',
'               color: '#5c5c5c',
'               marginBottom: '8px',
'               fontFamily: 'var(--font-body)',
'             }}>
'               With Attorney
'             </p>
'             <p style={{
'               fontSize: '2rem',
'               fontWeight: 700,
'               color: '#057642',
'               margin: '0 0 10px 0',
'               fontFamily: 'var(--font-heading)',
'             }}>
'               {attorneyData.rwr}%
'             </p>
'             <p style={{
'               fontSize: '0.85rem',
'               color: '#3c3c3c',
'               margin: 0,
'               fontFamily: 'var(--font-body)',
'             }}>
'               Outcome rate for represented parties
'             </p>
'           </div>

'           <div style={{
'             padding: '20px',
'             backgroundColor: '#FDF4EC',
'             border: '1px solid #C37D16',
'             borderRadius: '8px',
'           }}>
'             <p style={{
'               fontSize: '0.85rem',
'               color: '#5c5c5c',
'               marginBottom: '8px',
'               fontFamily: 'var(--font-body)',
'             }}>
'               Without Attorney
'             </p>
'             <p style={{
'               fontSize: '2rem',
'               fontWeight: 700,
'               color: '#B24020',
'               margin: '0 0 10px 0',
'               fontFamily: 'var(--font-heading)',
'             }}>
'               {attorneyData.pwr}%
'             </p>
'             <p style={{
'               fontSize: '0.85rem',
'               color: '#3c3c3c',
'               margin: 0,
'               fontFamily: 'var(--font-body)',
'             }}>
'               Outcome rate for pro se (self-represented) parties
'             </p>
'           </div>
'         </div>

'         <div style={{
'           marginTop: '20px',
'           padding: '15px',
'           backgroundColor: '#EDF3FB',
'           borderLeft: '4px solid var(--accent-primary)',
'           borderRadius: '4px',
'         }}>
'           <p style={{
'             fontSize: '0.95rem',
'             color: '#3c3c3c',
'             margin: 0,
'             lineHeight: 1.6,
'             fontFamily: 'var(--font-body)',
'           }}>
'             <strong>Impact:</strong> An attorney increases your win rate by {attorneyData.rwr - attorneyData.pwr} percentage points. Most employment, personal injury, and consumer protection attorneys work on contingency—you don't pay upfront, and they take a percentage of your settlement or verdict.
'           </p>
'         </div>
'       </section>
'     )}

'     {/* Next Steps */}
'     <section style={{ marginBottom: '50px' }}>
'       <h2 style={{
'         fontSize: '1.8rem',
'         fontWeight: 600,
'         color: 'var(--color-text-primary)',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-heading)',
'       }}>
'         Your Next Steps
'       </h2>

'       <ol style={{
'         paddingLeft: '20px',
'         margin: '0 0 30px 0',
'       }}>
'         {content.nextSteps.slice(0, -1).map((step, idx) => (
'           <li key={idx} style={{
'             fontSize: '1rem',
'             color: '#3c3c3c',
'             marginBottom: '15px',
'             lineHeight: 1.6,
'             fontFamily: 'var(--font-body)',
'           }}>
'             {step}
'           </li>
'         ))}
'         <li style={{
'           fontSize: '1rem',
'           color: '#3c3c3c',
'           marginBottom: '15px',
'           lineHeight: 1.6,
'           fontFamily: 'var(--font-body)',
'           fontWeight: 600,
'         }}>
'           {content.nextSteps[content.nextSteps.length - 1]}
'         </li>
'       </ol>
'     </section>

'     {/* Important Disclaimer */}
'     <section style={{
'       padding: '20px',
'       backgroundColor: '#FAEAE9',
'       border: '1px solid #CC1016',
'       borderRadius: '8px',
'       marginBottom: '50px',
'     }}>
'       <h3 style={{
'         fontSize: '1rem',
'         fontWeight: 600,
'         color: '#8C1515',
'         marginBottom: '10px',
'         fontFamily: 'var(--font-heading)',
'       }}>
'         Important Disclaimer
'       </h3>
'       <p style={{
'         fontSize: '0.9rem',
'         color: '#3c3c3c',
'         margin: 0,
'         lineHeight: 1.6,
'         fontFamily: 'var(--font-body)',
'       }}>
'         This guide is educational and not legal advice. Every case is unique and depends on specific facts, applicable law, and jurisdiction. This information is based on aggregated federal court data and does not apply to state court cases, administrative claims, or proceedings outside the federal system. Consult a licensed attorney in your jurisdiction for advice about your specific situation.
'       </p>
'     </section>

'     {/* Related Resources */}
'     <section style={{ marginBottom: '50px' }}>
'       <h2 style={{
'         fontSize: '1.8rem',
'         fontWeight: 600,
'         color: 'var(--color-text-primary)',
'         marginBottom: '20px',
'         fontFamily: 'var(--font-heading)',
'       }}>
'         Related Resources
'       </h2>

'       <div style={{
'         display: 'grid',
'         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
'         gap: '20px',
'       }}>
'         <Link href={`/nos/${code}`} style={{
'           padding: '20px',
'           backgroundColor: '#EDF3FB',
'           border: '1px solid var(--accent-primary)',
'           borderRadius: '8px',
'           textDecoration: 'none',
'           color: 'var(--accent-primary)',
'           transition: 'all 0.2s ease',
'         }}>
'           <p style={{
'             fontSize: '1rem',
'             fontWeight: 600,
'             margin: '0 0 8px 0',
'             fontFamily: 'var(--font-heading)',
'           }}>
'             {nosInfo.label} Case Data
'           </p>
'           <p style={{
'             fontSize: '0.85rem',
'             color: '#3c3c3c',
'             margin: 0,
'             fontFamily: 'var(--font-body)',
'           }}>
'             See detailed analytics and settlement data
'           </p>
'         </Link>

'         <Link href="/calculator" style={{
'           padding: '20px',
'           backgroundColor: '#F0F6FB',
'           border: '1px solid #378FE9',
'           borderRadius: '8px',
'           textDecoration: 'none',
'           color: 'var(--accent-primary)',
'           transition: 'all 0.2s ease',
'         }}>
'           <p style={{
'             fontSize: '1rem',
'             fontWeight: 600,
'             margin: '0 0 8px 0',
'             fontFamily: 'var(--font-heading)',
'           }}>
'             Settlement Calculator
'           </p>
'           <p style={{
'             fontSize: '0.85rem',
'             color: '#3c3c3c',
'             margin: 0,
'             fontFamily: 'var(--font-body)',
'           }}>
'             Estimate your case's potential value
'           </p>
'         </Link>

'         <Link href="/nos" style={{
'           padding: '20px',
'           backgroundColor: 'var(--color-surface-1)',
'           border: '1px solid #e0e0e0',
'           borderRadius: '8px',
'           textDecoration: 'none',
'           color: 'var(--accent-primary)',
'           transition: 'all 0.2s ease',
'         }}>
'           <p style={{
'             fontSize: '1rem',
'             fontWeight: 600,
'             margin: '0 0 8px 0',
'             fontFamily: 'var(--font-heading)',
'           }}>
'             Explore All Case Types
'           </p>
'           <p style={{
'             fontSize: '0.85rem',
'             color: '#3c3c3c',
'             margin: 0,
'             fontFamily: 'var(--font-body)',
'           }}>
'             Browse guides for other case types
'           </p>
'         </Link>
'       </div>
'     </section>
'   </div>
' );
}
