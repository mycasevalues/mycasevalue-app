'use client';

import { useState, useRef, useEffect } from 'react';

type SaveToTeamButtonProps = {
  itemTitle?: string;
  itemType?: 'report' | 'note' | 'analysis';
};

export default function SaveToTeamButton({ itemTitle = 'Current Item', itemType = 'report' }: SaveToTeamButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showModal]);

  const handleSave = async () => {
    if (!noteText.trim()) return;

    setIsSaving(true);
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // TODO: Supabase integration - save report to team workspace
    // Expected flow:
    // 1. Call supabase function to insert team_shared_items record
    // 2. Include: item_title, item_type, note, shared_by (current user), shared_at (now)
    // 3. Trigger real-time event for team members

    setIsSaving(false);
    setShowSuccess(true);
    setNoteText('');
    setShowModal(false);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .save-modal-overlay {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      {/* Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: '8px 14px',
          backgroundColor: 'var(--accent-primary)',
          color: 'var(--color-surface-0)',
          border: 'none',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          transition: 'all 0.2s ease',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        Save to Team
      </button>

      {/* Success Message */}
      {showSuccess && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(5, 150, 105, 0.95)',
            color: 'var(--color-surface-0)',
            fontSize: '13px',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 10001,
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          Saved to team workspace
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="save-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
        >
          <div
            ref={modalRef}
            style={{
              background: 'var(--color-surface-0)',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                Save to Team Workspace
              </h2>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close dialog"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  padding: '0',
                  lineHeight: '1',
                }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
              <strong>{itemTitle}</strong>
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Add a note (optional)
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Why you're saving this..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border-default)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  minHeight: '80px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
                disabled={isSaving}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(10, 102, 194, 0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 16px' }}>
              This will be shared with your team on the Team Workspace
            </p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                disabled={isSaving}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--color-surface-1)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  opacity: isSaving ? 0.5 : 1,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--color-surface-0)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  opacity: isSaving ? 0.7 : 1,
                }}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
