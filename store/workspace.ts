import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Workspace Store — persistent state for saved research items.
 * Powers bookmarks, collections, and the "save to project" feature.
 * Persisted to localStorage, syncs to Supabase when authenticated.
 */

export interface SavedItem {
  id: string;
  type: 'case' | 'judge' | 'district' | 'search';
  label: string;
  sublabel?: string;
  href: string;
  savedAt: number;
  /** Optional metadata for display */
  meta?: {
    winRate?: number;
    totalCases?: number;
    nosCode?: string;
    district?: string;
    circuit?: string;
  };
}

export interface ResearchProject {
  id: string;
  name: string;
  description?: string;
  items: SavedItem[];
  createdAt: number;
  updatedAt: number;
}

interface WorkspaceState {
  /** Quick-saved items (no project) */
  savedItems: SavedItem[];
  /** Research projects */
  projects: ResearchProject[];

  // Actions
  saveItem: (item: Omit<SavedItem, 'savedAt'>) => void;
  unsaveItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  createProject: (name: string, description?: string) => string;
  deleteProject: (id: string) => void;
  addToProject: (projectId: string, item: Omit<SavedItem, 'savedAt'>) => void;
  removeFromProject: (projectId: string, itemId: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      savedItems: [],
      projects: [],

      saveItem: (item) => {
        const existing = get().savedItems.find(i => i.id === item.id);
        if (existing) return; // Already saved
        set((state) => ({
          savedItems: [{ ...item, savedAt: Date.now() }, ...state.savedItems].slice(0, 100),
        }));
      },

      unsaveItem: (id) => {
        set((state) => ({
          savedItems: state.savedItems.filter(i => i.id !== id),
        }));
      },

      isSaved: (id) => {
        return get().savedItems.some(i => i.id === id);
      },

      createProject: (name, description) => {
        const id = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        set((state) => ({
          projects: [
            {
              id,
              name,
              description,
              items: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
            ...state.projects,
          ],
        }));
        return id;
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter(p => p.id !== id),
        }));
      },

      addToProject: (projectId, item) => {
        set((state) => ({
          projects: state.projects.map(p =>
            p.id === projectId
              ? {
                  ...p,
                  items: [{ ...item, savedAt: Date.now() }, ...p.items],
                  updatedAt: Date.now(),
                }
              : p
          ),
        }));
      },

      removeFromProject: (projectId, itemId) => {
        set((state) => ({
          projects: state.projects.map(p =>
            p.id === projectId
              ? {
                  ...p,
                  items: p.items.filter(i => i.id !== itemId),
                  updatedAt: Date.now(),
                }
              : p
          ),
        }));
      },
    }),
    {
      name: 'mcv-workspace',
      version: 1,
    }
  )
);
