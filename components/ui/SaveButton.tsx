'use client';

/**
 * SaveButton — Bookmark/save toggle for any research entity.
 * Shows filled bookmark when saved, outline when not.
 * Persists to workspace store (localStorage → Supabase).
 */

import { useWorkspaceStore, SavedItem } from '@/store/workspace';
import { useToastStore } from '@/store/toast';

interface SaveButtonProps {
  item: Omit<SavedItem, 'savedAt'>;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export default function SaveButton({ item, size = 'sm', showLabel = false }: SaveButtonProps) {
  const { saveItem, unsaveItem, isSaved } = useWorkspaceStore();
  const { addToast } = useToastStore();
  const saved = isSaved(item.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      unsaveItem(item.id);
      addToast('Removed from workspace', 'info');
    } else {
      saveItem(item);
      addToast('Saved to workspace', 'success');
    }
  };

  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <button
      onClick={handleToggle}
      className={`
        inline-flex items-center gap-1.5 transition-all duration-150
        ${saved
          ? 'text-brand-blue'
          : 'text-gray-400 hover:text-brand-blue'
        }
      `}
      title={saved ? 'Remove from saved' : 'Save to workspace'}
      aria-label={saved ? `Unsave ${item.label}` : `Save ${item.label}`}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {showLabel && (
        <span className={`text-xs font-medium ${saved ? 'text-brand-blue' : 'text-gray-500'}`}>
          {saved ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
