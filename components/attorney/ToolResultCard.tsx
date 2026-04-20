'use client';

import React, { ReactNode } from 'react';

interface ToolResultCardProps {
  title: string;
  children: ReactNode;
  onExport?: () => void | Promise<void>;
  onSave?: () => void | Promise<void>;
  loading?: boolean;
}

export function ToolResultCard({
  title,
  children,
  onExport,
  onSave,
  loading = false,
}: ToolResultCardProps) {
  const [isExporting, setIsExporting] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleExport = async () => {
    if (!onExport) return;
    setIsExporting(true);
    try {
      await onExport();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className="bg-[var(--surf,#F6F5F2)] border border-[var(--bdr, #E2DFD8)] overflow-hidden"
        style={{ borderRadius: '4px' }}
      >
        <div className="p-8">
          <div className="space-y-4">
            <div className="h-6 bg-[rgba(255,255,255,0.08)] rounded w-1/3 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-[rgba(255,255,255,0.08)] rounded animate-pulse"></div>
              <div className="h-4 bg-[rgba(255,255,255,0.08)] rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-[rgba(255,255,255,0.08)] rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[var(--surf,#F6F5F2)] border border-[var(--bdr, #E2DFD8)] overflow-hidden"
      style={{ borderRadius: '4px' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-8 py-6 border-b border-[var(--bdr, #E2DFD8)]"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        <h2 className="text-xl font-semibold text-[var(--color-text-muted)]">{title}</h2>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {onExport && (
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 rounded-md font-medium text-[var(--color-text-muted)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          )}

          {onSave && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 rounded-md font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--link)',
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">{children}</div>
    </div>
  );
}
