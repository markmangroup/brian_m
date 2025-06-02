import { useEffect } from 'react';
import worlds from '../content/worlds.json';
import { useContentStore } from '../store/useContentStore';

/**
 * Retrieve world-aware content for a given node id.
 * Content is cached via Zustand so repeated calls are inexpensive.
 *
 * @param {string} world - active world key (e.g. "matrix", "witcher")
 * @param {string} nodeId - story node identifier
 * @returns {object} content fields like { title, dialogue, summary, options }
 */
export function useWorldContent(world = 'matrix', nodeId) {
  const cached = useContentStore((s) => s.worldContent[world]);
  const setWorldContent = useContentStore((s) => s.setWorldContent);

  // Load content for the requested world the first time it's used
  useEffect(() => {
    if (!cached) {
      // TODO: replace static import with fetch from CMS/Sheets
      setWorldContent(world, worlds[world] || {});
    }
  }, [world, cached, setWorldContent]);

  const worldData = cached || worlds[world] || {};
  const defaultData = worlds['matrix'] || {};
  return worldData[nodeId] || defaultData[nodeId] || {};
}
