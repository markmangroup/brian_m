import { useEffect } from 'react';

export default function useMatrixProgress(nodeId) {
  useEffect(() => {
    if (!nodeId) return;
    try {
      localStorage.setItem('currentNodeId', nodeId);
      const visited = JSON.parse(localStorage.getItem('visitedNodes') || '[]');
      if (!visited.includes(nodeId)) {
        visited.push(nodeId);
        localStorage.setItem('visitedNodes', JSON.stringify(visited));
      }
    } catch (err) {
      // ignore write errors (e.g. SSR)
    }
  }, [nodeId]);
}
