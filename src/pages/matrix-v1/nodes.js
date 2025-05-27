export const nodes = [
  // Anomaly Route (center)
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Agent Echo', tooltip: 'System Guardian: Echo', type: 'character', status: 'live', guardian: 'Echo' }, type: 'npc' },
  { id: 'glitch', position: { x: -200, y: 150 }, data: { label: 'Archivist (Simulated Recovery)', tooltip: 'Archivist: Simulated Recovery', type: 'character', status: 'wip', guardian: 'Archivist' }, type: 'npc' },
  { id: 'interference', position: { x: 200, y: 150 }, data: { label: 'Agent Shadow (Signal Distorted)', tooltip: 'System anomaly containment unit', type: 'character', status: 'live', guardian: 'Shadow' }, type: 'npc' },
  { id: 'safe-mode', position: { x: -250, y: 300 }, data: { label: 'Safe Mode (Fabricated Timeline)', tooltip: 'End: Fabricated Timeline', type: 'trap', status: 'stub', guardian: null }, type: 'end' },
  { id: 'entry', position: { x: -100, y: 300 }, data: { label: 'Reset / Entry', tooltip: 'Restart the journey', type: 'trap', status: 'stub', guardian: null }, type: 'end' },
  { id: 'stabilize', position: { x: 100, y: 300 }, data: { label: 'Stabilize (Puzzle)', tooltip: 'Puzzle node (under construction)', type: 'choice', status: 'wip', recommended: true, guardian: null }, type: 'choice' },
  { id: 'error-loop', position: { x: 300, y: 300 }, data: { label: 'Error Loop (Recursive)', tooltip: 'Unstable recursive logic state', type: 'trap', status: 'stub', guardian: null }, type: 'end' },

  // Faction Alignment Tree (left, stacked vertically)
  { id: 'deeper-profile', position: { x: -600, y: 0 }, data: { label: 'Deeper Profile', tooltip: 'Profile analysis', type: 'faction', status: 'live', guardian: 'Unknown' }, type: 'faction' },
  { id: 'factions', position: { x: -900, y: 0 }, data: { label: "Choose who's watching you", tooltip: 'Faction selection', type: 'faction', status: 'live', guardian: 'Unknown' }, type: 'faction' },
  { id: 'align-signal', position: { x: -1100, y: -120 }, data: { label: 'Aligned: Signal Brokers', tooltip: 'Signal Brokers (teal)', type: 'faction', status: 'stub', guardian: 'Signal Brokers', color: 'teal' }, type: 'faction' },
  { id: 'align-oblivion', position: { x: -1100, y: 0 }, data: { label: 'Aligned: Oblivion Hand', tooltip: 'Oblivion Hand (gray)', type: 'faction', status: 'stub', guardian: 'Oblivion Hand', color: 'gray' }, type: 'faction' },
  { id: 'align-architects', position: { x: -1100, y: 120 }, data: { label: 'Aligned: Architects of Silence', tooltip: 'Architects of Silence (gold)', type: 'faction', status: 'stub', guardian: 'Architects of Silence', color: 'gold' }, type: 'faction' },

  // Training Track (right, spaced horizontally)
  { id: 'training-hub', position: { x: 600, y: 0 }, data: { label: 'Training Entry', tooltip: 'Begin your training', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },
  { id: 'guardian-call', position: { x: 900, y: 0 }, data: { label: 'AWAKEN Challenge', tooltip: 'Face the guardian', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },
  { id: 'data-filter', position: { x: 1200, y: 0 }, data: { label: 'Find the Real Signal', tooltip: 'Discern truth from noise', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },
  { id: 'code-match', position: { x: 1500, y: 0 }, data: { label: 'Memory Puzzle', tooltip: 'Test your recall', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },

  // Ghost Layer Branch (center right)
  { id: 'ghost-access', position: { x: 400, y: -200 }, data: { label: 'Ghost Access', tooltip: 'Access confirmation', type: 'choice', status: 'live', color: 'green' }, type: 'choice' },
  { id: 'ghost-layer-1', position: { x: 600, y: -200 }, data: { label: 'Ghost Layer 1', tooltip: 'Terminal choice node', type: 'choice', status: 'live', color: 'green' }, type: 'choice' },
  // SHARD.EXE fork
  { id: 'shard-init', position: { x: 800, y: -300 }, data: { label: 'SHARD.EXE: Logic Injection', tooltip: 'Logic puzzle', type: 'choice', status: 'wip', color: 'red' }, type: 'choice' },
  { id: 'shard-insert', position: { x: 1000, y: -300 }, data: { label: 'SHARD.EXE: Insert', tooltip: 'Timed click minigame', type: 'choice', status: 'wip', color: 'red' }, type: 'choice' },
  // ECHO.BIN fork
  { id: 'echo-loop', position: { x: 800, y: -100 }, data: { label: 'ECHO.BIN: AI Loop', tooltip: 'AI dialogue', type: 'choice', status: 'wip', color: 'green' }, type: 'choice' },
  { id: 'echo-verify', position: { x: 1000, y: -100 }, data: { label: 'ECHO.BIN: Verify', tooltip: 'Pattern minigame', type: 'choice', status: 'wip', color: 'green' }, type: 'choice' },
  // Ghost Layer 2
  { id: 'ghost-layer-2', position: { x: 1200, y: -200 }, data: { label: 'Ghost Layer 2', tooltip: 'Next phase', type: 'choice', status: 'stub', color: 'blue' }, type: 'choice' },
  // DED fallback
  { id: 'ded', position: { x: 1400, y: 200 }, data: { label: 'You DED', tooltip: 'Dead end', type: 'end', status: 'live', color: 'red', icon: '❌' }, type: 'end' },
]; 