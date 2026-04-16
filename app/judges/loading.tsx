export'default function JudgesLoading() {
' return (
'   <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
'     {/* Navy header with title skeleton */}
'     <div style={{ background: 'var(--gradient-hero)', padding: '48px 24px', borderBottom: '3px solid var(--accent-primary)' }}>
'       <div style={{ maxWidth: '900px', margin: '0 auto' }}>
'         <div style={{ height: '14px', width: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
'         <div style={{ height: '42px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '12px' }} />
'         <div style={{ height: '14px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
'       </div>
'     </div>

'     {/* Grid of judge cards */}
'     <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
'       <div style={{
'         display: 'grid',
'         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
'         gap: '24px'
'       }}>
'         {[1, 2, 3, 4, 5, 6].map(i => (
'           <div key={i} style={{
'             background: 'var(--color-surface-0)',
'             border: '1px solid var(--border-default)',
'             borderRadius: '12px',
'             padding: '24px',
'             minHeight: '180px',
'             boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
'           }}>
'             {/* Judge name/avatar skeleton */}
'             <div style={{ height: '20px', width: '75%', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '16px' }} />

'             {/* Judge details */}
'             <div style={{ height: '12px', width: '100%', background: 'var(--color-surface-1)', borderRadius: '12px', marginBottom: '8px' }} />
'             <div style={{ height: '12px', width: '90%', background: 'var(--color-surface-1)', borderRadius: '12px', marginBottom: '8px' }} />

'             {/* Statistics */}
'             <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-default)' }}>
'               <div style={{ height: '12px', width: '60%', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '6px' }} />
'               <div style={{ height: '12px', width: '50%', background: 'var(--color-surface-1)', borderRadius: '12px' }} />
'             </div>
'           </div>
'         ))}
'       </div>
'     </div>
'   </div>
' );
}
