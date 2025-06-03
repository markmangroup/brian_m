import { useWorldContent } from './useWorldContent';

/**
 * Retrieve oracle dialogue sequences for a given node.
 * Wraps useWorldContent with the "oracle" world key.
 *
 * @param {string} nodeId - dialogue node identifier
 * @returns {{dialogue: Array, options: Array}}
 */
export function useOracleDialogue(nodeId) {
  const { dialogue = [], options = [] } = useWorldContent('oracle', nodeId);
  return { dialogue, options };
}
