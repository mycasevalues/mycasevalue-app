'use'client';

import'{ motion } from 'framer-motion';

export'default function DynamicBackground() {
' return (
'   <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }}>
'     <motion.div
'       style={{
'         position: 'absolute', top: '-50%', left: '-50%', right: '-50%', bottom: '-50%',
'         background: 'radial-gradient(circle at 30% 40%, rgba(139,92,246,0.03) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(5,150,105,0.02) 0%, transparent 50%)',
'       }}
'       animate={{ rotate: [0, 360] }}
'       transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
'     />
'   </div>
' );
}
