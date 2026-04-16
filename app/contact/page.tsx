import'{ Metadata } from 'next';
import'Link from 'next/link';
import'ContactForm from '@/components/ContactForm';
import'{ SITE_URL } from '../../lib/site-config';

export'const revalidate = 0;

export'const metadata: Metadata = {
' title: 'Contact MyCaseValue — Support & Enterprise',
' description: 'Contact the MyCaseValue team for support, enterprise API inquiries, partnerships, or data methodology questions.',
' alternates: { canonical: `${SITE_URL}/contact` },
' openGraph: {
'   title: 'Contact Us',
'   description: 'Get in touch with the MyCaseValue team for support, enterprise inquiries, or data methodology questions.',
'   url: `${SITE_URL}/contact`,
'   type: 'website',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Contact Us',
'   description: 'Get in touch with the MyCaseValue team for support, enterprise inquiries, or data methodology questions.',
' },
};

const'jsonLd = {
' '@context': 'https://schema.org',
' '@type': 'ContactPage',
' name: 'Contact MyCaseValue',
' url: `${SITE_URL}/contact`,
' mainEntity: {
'   '@type': 'Organization',
'   name: 'MyCaseValue',
'   url: SITE_URL,
'   contactPoint: [
'     {
'       '@type': 'ContactPoint',
'       contactType: 'Customer Support',
'       email: 'support@mycasevalues.com',
'     },
'     {
'       '@type': 'ContactPoint',
'       contactType: 'Enterprise & API',
'       email: 'enterprise@mycasevalues.com',
'     },
'   ],
' },
};

export'default function ContactPage() {
' return (
'   <>
'     <style>{`
'       @media (max-width: 1024px) {
'         .contact-grid {
'           display: grid !important;
'           gridTemplateColumns: 1fr !important;
'           gap: 32px !important;
'         }
'       }
'     `}</style>
'     <script
'       type="application/ld+json"
'       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
'     />
'     <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
'       {/* Header Banner */}
'       <div style={{ background: 'var(--gradient-hero)', padding: '64px 24px' }}>
'         <div style={{ maxWidth: 1280, margin: '0 auto' }}>
'           <div style={{ marginBottom: 16 }}>
'             <span style={{
'               display: 'inline-block',
'               padding: '6px 12px',
'               backgroundColor: 'var(--accent-primary)',
'               color: 'var(--color-surface-0)',
'               fontSize: '11px',
'               fontWeight: 600,
'               letterSpacing: '0.08em',
'               textTransform: 'uppercase',
'               borderRadius: '12px',
'               fontFamily: 'var(--font-display)',
'             }}>
'               CONTACT US
'             </span>
'           </div>
'           <h1
'             style={{
'               fontSize: 'clamp(28px, 4vw, 40px)',
'               fontWeight: 600,
'               color: 'var(--color-surface-0)',
'               fontFamily: 'var(--font-display)',
'               letterSpacing: '-1px',
'               marginBottom: 12,
'             }}
'           >
'             Contact
'           </h1>
'           <p
'             style={{
'               fontSize: 16,
'               color: 'rgba(255,255,255,0.7)',
'               fontFamily: 'var(--font-body)',
'               lineHeight: 1.7,
'             }}
'           >
'             Questions, feedback, or partnership inquiries.
'           </p>
'         </div>
'       </div>

'       {/* Breadcrumb Navigation */}
'       <div style={{ borderBottom: '1px solid var(--border-default)', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'var(--color-surface-1)' }}>
'         <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
'           <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
'             <Link href="/" style={{ color: 'var(--accent-primary-hover)', textDecoration: 'none' }}>
'               Home
'             </Link>
'             <span style={{ color: 'var(--color-text-secondary)' }}>/</span>
'             <span style={{ color: 'var(--color-text-secondary)' }}>Contact</span>
'           </nav>
'         </div>
'       </div>

'       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>

'       {/* Quick Links Section */}
'       <div style={{ marginBottom: '64px' }}>
'         <h2
'           style={{
'             fontSize: 24,
'             fontWeight: 600,
'             color: 'var(--color-text-primary)',
'             fontFamily: 'var(--font-display)',
'             marginBottom: 24,
'           }}
'         >
'           Helpful Resources
'         </h2>
'         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
'           {[
'             {
'               title: 'FAQ',
'               href: '/faq',
'               description: 'Answers to common questions about MyCaseValue.',
'             },
'             {
'               title: 'Methodology',
'               href: '/methodology',
'               description: 'Learn how we analyze and calculate case data.',
'             },
'             {
'               title: 'Glossary',
'               href: '/glossary',
'               description: 'Legal terms explained in plain English.',
'             },
'             {
'               title: 'About',
'               href: '/about',
'               description: 'Our mission and story.',
'             },
'           ].map((link, index) => (
'             <Link
'               key={link.href}
'               href={link.href}
'               style={{
'                 padding: 24,
'                 borderRadius: '12px',
'                 border: '1px solid var(--border-default)',
'                 background: 'var(--color-surface-0)',
'                 boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
'                 textDecoration: 'none',
'                 color: 'inherit',
'                 transition: 'all 0.3s ease',
'                 display: 'flex',
'                 flexDirection: 'column',
'                 gap: 8,
'               }}
'               className="contact-quick-link"
'             >
'               <h3
'                 style={{
'                   fontSize: 16,
'                   fontWeight: 600,
'                   color: 'var(--color-text-primary)',
'                   fontFamily: 'var(--font-display)',
'                   margin: 0,
'                 }}
'               >
'                 {link.title}
'               </h3>
'               <p
'                 style={{
'                   fontSize: 13,
'                   color: 'var(--color-text-secondary)',
'                   fontFamily: 'var(--font-body)',
'                   lineHeight: 1.5,
'                   margin: 0,
'                 }}
'               >
'                 {link.description}
'               </p>
'             </Link>
'           ))}
'         </div>
'       </div>

'       <style>{`
'         .contact-quick-link:hover {
'           border-color: #1e40af !important;
'           box-shadow: 0 8px 24px rgba(27, 58, 92, 0.12) !important;
'           transform: translateY(-4px);
'         }
'       `}</style>

'       <div className="contact-page-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
'         {/* Left Column: Contact Info Cards */}
'         <div style={{ display: 'grid', gap: 24, gridColumn: '1' }}>
'           {/* Support */}
'           <div
'             style={{
'               padding: 32,
'               borderRadius: '12px',
'               border: '1px solid var(--border-default)',
'               background: 'var(--color-surface-0)',
'               boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
'             }}
'           >
'             <h2
'               style={{
'                 fontSize: 18,
'                 fontWeight: 600,
'                 color: 'var(--color-text-primary)',
'                 fontFamily: 'var(--font-display)',
'                 marginBottom: 8,
'               }}
'             >
'               Support & Feedback
'             </h2>
'             <p
'               style={{
'                 fontSize: 14,
'                 color: 'var(--color-text-secondary)',
'                 fontFamily: 'var(--font-body)',
'                 lineHeight: 1.6,
'                 marginBottom: 16,
'               }}
'             >
'               Account questions, technical issues, billing inquiries, or feature ideas. We read every message and respond promptly.
'             </p>
'             <a
'               href="mailto:support@mycasevalues.com"
'               style={{
'                 display: 'inline-flex',
'                 alignItems: 'center',
'                 gap: 8,
'                 fontSize: 15,
'                 fontWeight: 600,
'                 color: 'var(--accent-primary)',
'                 textDecoration: 'none',
'                 fontFamily: 'var(--font-body)',
'               }}
'             >
'               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
'                 <rect x="2" y="4" width="20" height="16" rx="2" />
'                 <path d="M22 7l-10 7L2 7" />
'               </svg>
'               support@mycasevalues.com
'             </a>
'           </div>

'           {/* Enterprise */}
'           <div
'             style={{
'               padding: 32,
'               borderRadius: '12px',
'               border: '1px solid var(--border-default)',
'               background: 'var(--color-surface-0)',
'               boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
'             }}
'           >
'             <h2
'               style={{
'                 fontSize: 18,
'                 fontWeight: 600,
'                 color: 'var(--color-text-primary)',
'                 fontFamily: 'var(--font-display)',
'                 marginBottom: 8,
'               }}
'             >
'               Enterprise Solutions
'             </h2>
'             <p
'               style={{
'                 fontSize: 14,
'                 color: 'var(--color-text-secondary)',
'                 fontFamily: 'var(--font-body)',
'                 lineHeight: 1.6,
'                 marginBottom: 16,
'               }}
'             >
'               Bulk data licensing, API access, custom integrations, team accounts, and dedicated support for your firm.
'             </p>
'             <a
'               href="mailto:enterprise@mycasevalues.com"
'               style={{
'                 display: 'inline-flex',
'                 alignItems: 'center',
'                 gap: 8,
'                 fontSize: 15,
'                 fontWeight: 600,
'                 color: 'var(--accent-primary)',
'                 textDecoration: 'none',
'                 fontFamily: 'var(--font-body)',
'               }}
'             >
'               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
'                 <rect x="2" y="4" width="20" height="16" rx="2" />
'                 <path d="M22 7l-10 7L2 7" />
'               </svg>
'               enterprise@mycasevalues.com
'             </a>
'           </div>

'           {/* Methodology */}
'           <div
'             style={{
'               padding: 32,
'               borderRadius: '12px',
'               border: '1px solid var(--border-default)',
'               background: 'var(--color-surface-0)',
'               boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
'             }}
'           >
'             <h2
'               style={{
'                 fontSize: 18,
'                 fontWeight: 600,
'                 color: 'var(--color-text-primary)',
'                 fontFamily: 'var(--font-display)',
'                 marginBottom: 8,
'               }}
'             >
'               Data Transparency
'             </h2>
'             <p
'               style={{
'                 fontSize: 14,
'                 color: 'var(--color-text-secondary)',
'                 fontFamily: 'var(--font-body)',
'                 lineHeight: 1.6,
'                 marginBottom: 16,
'               }}
'             >
'               Want to understand our methodology? Need details about data sources or how we calculate outcomes? We provide full transparency on everything.
'             </p>
'             <Link
'               href="/methodology"
'               style={{
'                 display: 'inline-flex',
'                 alignItems: 'center',
'                 gap: 8,
'                 fontSize: 15,
'                 fontWeight: 600,
'                 color: 'var(--accent-primary)',
'                 textDecoration: 'none',
'                 fontFamily: 'var(--font-body)',
'               }}
'             >
'               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
'                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
'                 <polyline points="14 2 14 8 20 8" />
'                 <line x1="16" y1="13" x2="8" y2="13" />
'                 <line x1="16" y1="17" x2="8" y2="17" />
'               </svg>
'               View Methodology
'             </Link>
'           </div>
'         </div>

'         {/* Right Column: Contact Form */}
'         <div style={{ gridColumn: '2' }}>
'           <ContactForm />
'         </div>
'       </div>

'       {/* Response Time Info Box */}
'       <div
'         style={{
'           padding: '24px',
'           marginTop: 48,
'           marginBottom: 24,
'           borderRadius: '12px',
'           border: '1px solid var(--border-default)',
'           backgroundColor: 'rgba(0,105,151,0.05)',
'           textAlign: 'center',
'         }}
'       >
'         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
'           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
'             <circle cx="12" cy="12" r="10" />
'             <polyline points="12 6 12 12 16 14" />
'           </svg>
'           <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-display)' }}>
'             Response Time
'           </span>
'         </div>
'         <p
'           style={{
'             fontSize: 14,
'             color: 'var(--color-text-secondary)',
'             fontFamily: 'var(--font-body)',
'             margin: 0,
'             lineHeight: 1.6,
'           }}
'         >
'           We typically respond within 24-48 hours. For urgent account issues, include your account email in your message.
'         </p>
'       </div>

'       <p
'         style={{
'           fontSize: 13,
'           color: 'var(--color-text-secondary)',
'           fontFamily: 'var(--font-body)',
'           textAlign: 'center',
'           marginTop: 24,
'           lineHeight: 1.6,
'         }}
'       >
'         You can also reach out via email at <a href="mailto:support@mycasevalues.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>support@mycasevalues.com</a> or <a href="mailto:enterprise@mycasevalues.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>enterprise@mycasevalues.com</a>
'       </p>
'       </div>
'     </div>
'   </>
' );
}
