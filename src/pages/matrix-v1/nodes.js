export const nodes = [
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Agent Echo', tooltip: 'System Guardian: Echo' }, type: 'npc' },
  { id: 'glitch', position: { x: -200, y: 150 }, data: { label: 'Archivist (Simulated Recovery)', tooltip: 'Archivist: Simulated Recovery' }, type: 'npc' },
  { id: 'interference', position: { x: 200, y: 150 }, data: { label: 'Agent Shadow (Signal Distorted)', tooltip: 'Agent Shadow: Signal Distorted' }, type: 'npc' },
  { id: 'safe-mode', position: { x: -250, y: 300 }, data: { label: 'Safe Mode (Fabricated Timeline)', tooltip: 'End: Fabricated Timeline' }, type: 'end' },
  { id: 'entry', position: { x: -100, y: 300 }, data: { label: 'Reset / Entry', tooltip: 'Restart the journey' }, type: 'end' },
  { id: 'stabilize', position: { x: 100, y: 300 }, data: { label: 'Stabilize (Puzzle)', tooltip: 'System Challenge: Puzzle' }, type: 'choice' },
  { id: 'error-loop', position: { x: 300, y: 300 }, data: { label: 'Error Loop (Recursive)', tooltip: 'Loop: Recursive Void' }, type: 'end' },
]; 