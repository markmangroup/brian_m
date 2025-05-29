export function getVisited() {
  try {
    return JSON.parse(localStorage.getItem('visitedNodes') || '[]');
  } catch {
    return [];
  }
}

export function getCurrentNode() {
  return localStorage.getItem('currentNodeId') || 'start';
}
