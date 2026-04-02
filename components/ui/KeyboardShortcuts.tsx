'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface Shortcut {
  key: string;
  label: string;
  description: string;
  action: () => void;
  modifier?: 'ctrl' | 'meta' | 'shift';
}

interface KeyboardShortcutsProps {
  shortcuts: Shortcut[];
  lang?: 'en' | 'es';
}

export default function KeyboardShortcuts({ shortcuts, lang = 'en' }: KeyboardShortcutsProps) {
  const [showPanel, setShowPanel] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Toggle shortcuts panel with "?"
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) return;
      e.preventDefault();
      setShowPanel(p => !p);
      return;
    }

    // Escape closes panel
    if (e.key === 'Escape' && showPanel) {
      setShowPanel(false);
      return;
    }

    // Check each shortcut
    for (const s of shortcuts) {
      const modMatch = s.modifier
        ? (s.modifier === 'ctrl' && e.ctrlKey) || (s.modifier === 'meta' && e.metaKey) || (s.modifier === 'shift' && e.shiftKey)
        : !e.ctrlKey && !e.metaKey;
      if (e.key.toLowerCase() === s.key.toLowerCase() && modMatch) {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) return;
        e.preventDefault();
        s.action();
        return;
      }
    }
  }, [shortcuts, showPanel]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!showPanel) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={() => setShowPanel(false)}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      }} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', zIndex: 1,
          background: 'linear-gradient(180deg, #E5E7EB, #FFFFFF)',
          border: '1px solid #334155',
          borderRadius: '16px', padding: '28px',
          maxWidth: '440px', width: '90%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0 }}>
             {lang === 'es' ? 'Atajos de teclado' : 'Keyboard Shortcuts'}
          </h3>
          <button
            onClick={() => setShowPanel(false)}
            style={{
              background: 'none', border: 'none', color: '#9CA3AF',
              cursor: 'pointer', fontSize: '18px', padding: '4px',
            }}
          >✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {shortcuts.map((s, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 12px', borderRadius: '8px',
              background: 'rgba(15,23,42,0.5)',
            }}>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>{s.description}</span>
              <kbd style={{
                padding: '3px 8px', borderRadius: '6px', fontSize: '12px',
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                background: '#FAFAF8', border: '1px solid #334155',
                color: '#8B5CF6', minWidth: '28px', textAlign: 'center',
              }}>
                {s.modifier ? `${s.modifier === 'ctrl' ? 'Ctrl' : s.modifier === 'meta' ? '⌘' : '⇧'}+` : ''}{s.label}
              </kbd>
            </div>
          ))}

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 12px', borderRadius: '8px',
            background: 'rgba(15,23,42,0.5)',
          }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>
              {lang === 'es' ? 'Mostrar/ocultar atajos' : 'Toggle shortcuts'}
            </span>
            <kbd style={{
              padding: '3px 8px', borderRadius: '6px', fontSize: '12px',
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
              background: '#FAFAF8', border: '1px solid #334155',
              color: '#8B5CF6',
            }}>?</kbd>
          </div>
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#4B5563' }}>
            {lang === 'es' ? 'Presiona Esc o ? para cerrar' : 'Press Esc or ? to close'}
          </span>
        </div>
      </div>
    </div>
  );
}
