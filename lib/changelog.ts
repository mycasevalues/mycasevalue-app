/**
 * lib/changelog.ts — Changelog data loading and type definitions
 */

export type UpdateType = 'launch' | 'data_update' | 'feature' | 'fix';

export interface ChangelogEntry {
  id: string;
  date: string;
  updateType: UpdateType;
  title: string;
  description: string;
  affectedNosCodes: string[];
  affectedDistricts: string[];
}

/**
 * Load changelog entries from JSON
 */
export async function getChangelogEntries(): Promise<ChangelogEntry[]> {
  try {
    const changelog = await import('../data/changelog.json');
    return changelog.default as ChangelogEntry[];
  } catch (error) {
    console.error('Failed to load changelog:', error);
    return [];
  }
}

/**
 * Get badge color and label for update type
 */
export function getUpdateTypeBadge(updateType: UpdateType): { color: string; bgColor: string; label: string } {
  const badges: Record<UpdateType, { color: string; bgColor: string; label: string }> = {
    launch: {
      color: '#FFFFFF',
      bgColor: '#10B981',
      label: 'Launch',
    },
    data_update: {
      color: '#FFFFFF',
      bgColor: '#0966C3',
      label: 'Data Update',
    },
    feature: {
      color: '#FFFFFF',
      bgColor: '#8B5CF6',
      label: 'Feature',
    },
    fix: {
      color: '#FFFFFF',
      bgColor: '#F97316',
      label: 'Fix',
    },
  };
  return badges[updateType];
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
