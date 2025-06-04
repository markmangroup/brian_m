import { create } from 'zustand';

const initialState = {
  cleanliness: 0,
  stubRatio: 0,
  rulesApplied: 0,
  recentUpgrades: [],
  history: [],
};

export const useMetricsStore = create((set) => ({
  ...initialState,
  setMetrics: (metrics) =>
    set((state) => ({
      ...state,
      ...metrics,
    })),
  addUpgrade: (upgrade) =>
    set((state) => ({
      recentUpgrades: [upgrade, ...state.recentUpgrades].slice(0, 5),
    })),
  recordSnapshot: () =>
    set((state) => ({
      history: [
        ...state.history,
        {
          ts: Date.now(),
          cleanliness: state.cleanliness,
          stubRatio: state.stubRatio,
          rulesApplied: state.rulesApplied,
        },
      ],
    })),
}));

export const selectProgressMetrics = (state) => ({
  cleanliness: state.cleanliness,
  stubRatio: state.stubRatio,
  rulesApplied: state.rulesApplied,
  recentUpgrades: state.recentUpgrades,
  history: state.history,
});
