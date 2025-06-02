import { create } from 'zustand';

/**
 * Simple store for caching world content by key.
 * In the future content may be loaded from an external CMS.
 */
export const useContentStore = create((set) => ({
  worldContent: {},
  setWorldContent: (world, content) =>
    set((state) => ({
      worldContent: { ...state.worldContent, [world]: content }
    }))
}));
