import'{ type ReactNode } from 'react';

/**
'* Page Transition — Subtle entrance animation
'* animate-page-enter: 150ms opacity-only fade (crisp, professional)
'* No transform/scale to keep interaction feeling instant
'*/
export'default function Template({ children }: { children: ReactNode }) {
' return (
'   <div className="animate-page-enter">
'     {children}
'   </div>
' );
}
