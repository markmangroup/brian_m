import { create } from 'zustand';

import { realMatrixNodes } from '../pages/matrix-v1/realMatrixFlow';
import { calculateProgressMetrics } from './progressMetrics';

const initialState = {
  cleanliness: 0,
  stubRatio: 0,
  rulesApplied: 0,
  recentUpgrades: [],
  history: [],
  worldMetrics: {},
};

export const useMetricsStore = create((set) => ({
  ...initialState,
  setMetrics: (metrics) =>
    set((state) => ({
      ...state,
      ...metrics,
    })),
  loadMetrics: () =>
    set(() => {
      const metrics = calculateProgressMetrics(realMatrixNodes);
      const history = Array.from({ length: 5 }, (_, i) => ({
        ts: Date.now() + i,
        cleanliness: metrics.cleanliness * ((i + 1) / 5),
        stubRatio: metrics.stubRatio * ((i + 1) / 5),
        rulesApplied: Math.round(metrics.rulesApplied * ((i + 1) / 5)),
      }));
      return { ...metrics, history };
    }),
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
  worldMetrics: state.worldMetrics,
});
