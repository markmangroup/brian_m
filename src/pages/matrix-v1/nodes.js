export const nodes = [
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Agent Echo', tooltip: 'System Guardian: Echo', type: 'character', status: 'live' }, type: 'npc' },
  { id: 'glitch', position: { x: -200, y: 150 }, data: { label: 'Archivist (Simulated Recovery)', tooltip: 'Archivist: Simulated Recovery', type: 'character', status: 'wip' }, type: 'npc' },
  { id: 'interference', position: { x: 200, y: 150 }, data: { label: 'Agent Shadow (Signal Distorted)', tooltip: 'System anomaly containment unit', type: 'character', status: 'live' }, type: 'npc' },
  { id: 'safe-mode', position: { x: -250, y: 300 }, data: { label: 'Safe Mode (Fabricated Timeline)', tooltip: 'End: Fabricated Timeline', type: 'trap', status: 'stub' }, type: 'end' },
  { id: 'entry', position: { x: -100, y: 300 }, data: { label: 'Reset / Entry', tooltip: 'Restart the journey', type: 'trap', status: 'stub' }, type: 'end' },
  { id: 'stabilize', position: { x: 100, y: 300 }, data: { label: 'Stabilize (Puzzle)', tooltip: 'Puzzle node (under construction)', type: 'choice', status: 'wip' }, type: 'choice' },
  { id: 'error-loop', position: { x: 300, y: 300 }, data: { label: 'Error Loop (Recursive)', tooltip: 'Unstable recursive logic state', type: 'trap', status: 'stub' }, type: 'end' },
]; 