const VISITED_KEY = 'matrixVisited';
const NODE_KEY = 'matrixCurrentNode';

export function getVisited() {
  try {
    const data = localStorage.getItem(VISITED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveVisited(id) {
  try {
    const visited = getVisited();
    if (!visited.includes(id)) {
      visited.push(id);
      localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
    }
  } catch {}
}

export function getCurrentNode() {
  try {
    return localStorage.getItem(NODE_KEY) || '';
  } catch {
    return '';
  }
}

export function setCurrentNode(id) {
  try {
    localStorage.setItem(NODE_KEY, id);
  } catch {}
}

export function resetProgress() {
  try {
    localStorage.removeItem(VISITED_KEY);
    localStorage.removeItem(NODE_KEY);
  } catch {}
}
