import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InflationState {
  /** Whether inflation adjustment is enabled */
  inflationEnabled: boolean;
  /** Toggle inflation adjustment on/off */
  toggleInflation: () => void;
  /** Set inflation state explicitly */
  setInflationEnabled: (enabled: boolean) => void;
}

export const useInflationStore = create<InflationState>()(
  persist(
    (set) => ({
      inflationEnabled: false,

      toggleInflation: () =>
        set((state) => ({ inflationEnabled: !state.inflationEnabled })),

      setInflationEnabled: (enabled) =>
        set({ inflationEnabled: enabled }),
    }),
    {
      name: 'mcv-inflation', // localStorage key
    }
  )
);
