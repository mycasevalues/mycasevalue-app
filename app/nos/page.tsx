import'{ Metadata } from 'next';
import'Link from 'next/link';
import'{ SITS } from '../../lib/data';
import'{ SITE_URL } from '../../lib/site-config';

export'const metadata: Metadata = {
' title: 'All Federal Case Types',
' description:
'   'Browse all federal case types with real court statistics. Explore win rates, case duration, and outcomes for employment, injury, consumer, civil rights, and more.',
' alternates: { canonical: `${SITE_URL}/nos` },
' openGraph: {
'   title: 'All Federal Case Types',
'   description:
'     'Browse all federal case types with real court statistics. Explore win rates, case duration, and outcomes for employment, injury, consumer, civil rights, and more.',
'   url: `${SITE_URL}/nos`,
'   type: 'website',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'All Federal Case Types',
'   description: 'Browse all federal case types with real court statistics. Explore win rates, case duration, and outcomes for employment, injury, consumer, civil rights, and more.',
' },
};

//'Helper to get all unique NOS codes and their details
interface'NOSDetail {
' code: string;
' label: string;
' category: string;
' categoryColor?: string;
}

function'getAllNOSDetails(): { byCategory: Record<string, NOSDetail[]> } {
' const byCategory: Record<string, NOSDetail[]> = {};

' SITS.forEach((category) => {
'   const categoryKey = category.label;
'   byCategory[categoryKey] = [];

'   const seenCodes = new Set<string>();

'   category.opts.forEach((option) => {
'     if (!seenCodes.has(option.nos)) {
'       seenCodes.add(option.nos);
'       byCategory[categoryKey].push({
'         code: option.nos,
'         label: option.label,
'         category: category.label,
'         categoryColor: category.color,
'       });
'     }
'   });
' });

' return { byCategory };
}

export'default function NOSIndexPage() {
' const { byCategory } = getAllNOSDetails();
' const categories = Object.keys(byCategory).sort();

' return (
'   <div style={{ minHeight: '100vh', color: 'var(--color-text-primary)', background: 'var(--color-surface-1)' }}>
'     <style>{`
'       .nos-card {
'         background: var(--color-surface-0);
'         border: 1px solid var(--border-default);
'         border-radius: 12px;
'         padding: 24px;
'         transition: all 0.2s ease;
'         text-decoration: none;
'         display: block;
'         cursor: pointer;
'       }
'       .nos-card:hover {
'         border-left: 3px solid var(--accent-primary);
'         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
'       }
'       .nos-card h3 {
'         font-weight: 600;
'         font-size: 18px;
'         color: var(--color-text-primary);
'         margin: 0 0 8px 0;
'         transition: color 0.2s ease;
'       }
'       .nos-card:hover h3 {
'         color: var(--accent-primary);
'       }
'       .nos-card-arrow {
'         color: var(--accent-primary);
'         font-size: 20px;
'         transition: transform 0.2s ease;
'       }
'       .nos-card:hover .nos-card-arrow {
'         transform: translateX(4px);
'       }
'       .nos-back-link {
'         color: var(--accent-primary);
'         text-decoration: none;
'         font-size: 14px;
'         display: inline-block;
'         margin-bottom: 16px;
'         transition: color 0.2s ease;
'       }
'       .nos-back-link:hover {
'         color: #C21119;
'       }
'       .nos-breadcrumb-link {
'         color: #1e40af;
'         text-decoration: none;
'         transition: color 0.2s ease;
'       }
'       .nos-breadcrumb-link:hover {
'         color: #004A6A;
'       }

'       @media (max-width: 768px) {
'         h1 {
'           font-size: 28px !important;
'         }
'         h2 {
'           font-size: 20px !important;
'         }
'         .nos-grid {
'           display: grid;
'           gridTemplateColumns: 1fr;
'           gap: 16px;
'         }
'       }
'     `}</style>

'     {/* Header */}
'     <header
'       style={{
'         background: 'var(--accent-primary)',
'         padding: 'clamp(24px, 5vw, 48px) 24px',
'         borderBottom: '1px solid var(--border-default)',
'       }}
'     >
'       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
'         <div style={{ marginBottom: '32px' }}>
'           <Link
'             href="/"
'             className="nos-back-link"
'           >
'             ← Back to Home
'           </Link>
'         </div>
'         <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
'           <h1
'             style={{
'               fontSize: 'clamp(28px, 6vw, 42px)',
'               fontWeight: 'bold',
'               color: 'var(--color-surface-0)',
'               margin: 0,
'               fontFamily: 'var(--font-display)',
'             }}
'           >
'             Federal Case Types Directory
'           </h1>
'           <span
'             style={{
'               background: 'var(--accent-primary)',
'               color: 'var(--color-surface-0)',
'               padding: '6px 12px',
'               borderRadius: '12px',
'               fontSize: '12px',
'               fontWeight: '600',
'               whiteSpace: 'nowrap',
'             }}
'           >
'             CASE TYPES
'           </span>
'         </div>
'         <p
'           style={{
'             fontSize: '16px',
'             color: 'var(--border-default)',
'             maxWidth: '600px',
'             margin: '0',
'             fontFamily: 'var(--font-body)',
'           }}
'         >
'           Explore all case types in our federal court database. Each case type includes real statistics
'           on win rates, case duration, and outcomes based on actual court records.
'         </p>
'       </div>
'     </header>

'     {/* Breadcrumb */}
'     <div
'       style={{
'         padding: '16px 24px',
'         background: 'var(--color-surface-0)',
'         borderBottom: '1px solid var(--border-default)',
'         fontSize: '14px',
'       }}
'     >
'       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
'         <Link
'           href="/"
'           className="nos-breadcrumb-link"
'         >
'           Home
'         </Link>
'         <span style={{ color: 'var(--color-text-secondary)', margin: '0 8px' }}>/</span>
'         <span style={{ color: 'var(--accent-primary-hover)', fontWeight: '600' }}>Case Types</span>
'       </div>
'     </div>

'     {/* Categories */}
'     <div style={{ padding: 'clamp(24px, 5vw, 48px) 24px', maxWidth: '1200px', margin: '0 auto' }}>
'       {categories.map((categoryName) => (
'         <section key={categoryName} style={{ marginBottom: '64px' }}>
'           <h2
'             style={{
'               fontSize: '24px',
'               fontWeight: 'bold',
'               marginBottom: '24px',
'               color: 'var(--color-text-primary)',
'               paddingLeft: '16px',
'               borderLeft: '3px solid var(--accent-primary)',
'               fontFamily: 'var(--font-display)',
'             }}
'           >
'             {categoryName}
'           </h2>

'           <div
'             style={{
'               display: 'grid',
'               gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
'               gap: '16px',
'             }}
'           >
'             {byCategory[categoryName].map((item) => (
'               <Link
'                 key={item.code}
'                 href={`/nos/${item.code}`}
'                 className="nos-card"
'               >
'                 <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
'                   <div style={{ flex: 1 }}>
'                     <h3>{item.label}</h3>
'                     <p
'                       style={{
'                         fontSize: '13px',
'                         color: 'var(--color-text-secondary)',
'                         margin: '0',
'                         fontFamily: 'var(--font-mono)',
'                       }}
'                     >
'                       NOS Code: {item.code}
'                     </p>
'                   </div>
'                   <span className="nos-card-arrow">→</span>
'                 </div>
'                 <p
'                   style={{
'                     fontSize: '13px',
'                     color: 'var(--color-text-secondary)',
'                     margin: '0',
'                     fontFamily: 'var(--font-body)',
'                   }}
'                 >
'                   View court statistics and case outcomes for this type
'                 </p>
'               </Link>
'             ))}
'           </div>
'         </section>
'       ))}
'     </div>

'     {/* Info Section */}
'     <section style={{ background: 'var(--color-surface-0)', borderTop: '1px solid var(--border-default)', padding: 'clamp(24px, 5vw, 48px) 24px' }}>
'       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
'         <div
'           style={{
'             background: 'var(--color-surface-0)',
'             border: '1px solid var(--border-default)',
'             borderRadius: '12px',
'             padding: '32px',
'         }}
'         >
'           <h2
'             style={{
'               fontSize: '24px',
'               fontWeight: 'bold',
'               marginBottom: '16px',
'               color: 'var(--color-text-primary)',
'               margin: '0 0 16px 0',
'               fontFamily: 'var(--font-display)',
'             }}
'           >
'             What are NOS Codes?
'           </h2>
'           <p
'             style={{
'               marginBottom: '16px',
'               color: 'var(--color-text-secondary)',
'               lineHeight: '1.6',
'               fontFamily: 'var(--font-body)',
'             }}
'           >
'             Nature of Suit (NOS) codes are standardized federal court classifications that categorize
'             cases by their legal nature. Each code corresponds to a specific type of civil case filed in
'             U.S. District Courts.
'           </p>
'           <p
'             style={{
'               marginBottom: '16px',
'               color: 'var(--color-text-secondary)',
'               lineHeight: '1.6',
'               fontFamily: 'var(--font-body)',
'             }}
'           >
'             The statistics on these pages are derived from actual federal court data, including case
'             outcomes, settlement rates, and case duration. This information can help you understand
'             how similar cases have performed in federal court.
'           </p>
'           <p
'             style={{
'               color: 'var(--color-text-secondary)',
'               lineHeight: '1.6',
'               margin: '0',
'               fontFamily: 'var(--font-body)',
'             }}
'           >
'             For legal advice specific to your situation, please consult with a qualified attorney in
'             your jurisdiction.
'           </p>
'         </div>
'       </div>
'     </section>

'     {/* Structured Data - JSON-LD */}
'     <script
'       type="application/ld+json"
'       dangerouslySetInnerHTML={{
'         __html: JSON.stringify({
'           '@context': 'https://schema.org',
'           '@type': 'CollectionPage',
'           name: 'Federal Case Types Directory',
'           description:
'             'Browse all federal case types with real court statistics and outcomes.',
'           url: `${SITE_URL}/nos`,
'           mainEntity: {
'             '@type': 'ItemList',
'             itemListElement: Object.entries(byCategory)
'               .flatMap(([categoryName, items]) =>
'                 items.map((item, idx) => ({
'                   '@type': 'ListItem',
'                   position: idx + 1,
'                   name: item.label,
'                   url: `${SITE_URL}/nos/${item.code}`,
'                   description: `Federal court statistics for ${item.label} cases`,
'                 }))
'               ),
'           },
'         }),
'       }}
'     />
'   </div>
' );
}
