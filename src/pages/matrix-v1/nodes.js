export const nodes = [
  // Scene Nodes
  {
    id: 'scene-1',
    type: 'scene',
    position: { x: 0, y: 0 },
    data: {
      title: 'The Matrix',
      description: 'A dark room filled with monitors. The air hums with digital energy.',
      setting: 'Neo\'s Apartment'
    }
  },
  {
    id: 'scene-2',
    type: 'scene',
    position: { x: 200, y: 0 },
    data: {
      title: 'The Construct',
      description: 'An endless white space where anything is possible.',
      setting: 'Training Program'
    }
  },

  // Dialogue Nodes
  {
    id: 'dialogue-1',
    type: 'dialogue',
    position: { x: 0, y: 200 },
    data: {
      character: 'Morpheus',
      dialogue: 'I'm going to show you how deep the rabbit hole goes.',
      emotion: 'serious'
    }
  },
  {
    id: 'dialogue-2',
    type: 'dialogue',
    position: { x: 200, y: 200 },
    data: {
      character: 'Neo',
      dialogue: 'I know kung fu.',
      emotion: 'confident'
    }
  },

  // Choice Nodes
  {
    id: 'choice-1',
    type: 'choice',
    position: { x: 0, y: 400 },
    data: {
      prompt: 'Choose your path',
      options: [
        'Take the red pill',
        'Take the blue pill'
      ]
    }
  },
  {
    id: 'choice-2',
    type: 'choice',
    position: { x: 200, y: 400 },
    data: {
      prompt: 'How do you proceed?',
      options: [
        'Fight the agents',
        'Run and hide',
        'Try to reason with them'
      ]
    }
  },

  // Ending Nodes
  {
    id: 'ending-1',
    type: 'ending',
    position: { x: 0, y: 600 },
    data: {
      title: 'The One',
      outcome: 'Victory',
      description: 'You've become the One, capable of bending the Matrix to your will.'
    }
  },
  {
    id: 'ending-2',
    type: 'ending',
    position: { x: 200, y: 600 },
    data: {
      title: 'System Failure',
      outcome: 'Defeat',
      description: 'The agents have caught you. Your consciousness is lost in the Matrix.'
    }
  },

  // Anomaly Route (center)
  { id: 'start', position: { x: 0, y: 0 }, data: { label: 'Agent Echo', tooltip: 'System Guardian: Echo', type: 'character', status: 'live', guardian: 'Echo' }, type: 'npc' },
  { id: 'glitch', position: { x: -200, y: 150 }, data: { label: 'Archivist (Simulated Recovery)', tooltip: 'Archivist: Simulated Recovery', type: 'character', status: 'wip', guardian: 'Archivist' }, type: 'npc' },
  { id: 'interference', position: { x: 200, y: 150 }, data: { label: 'Agent Shadow (Signal Distorted)', tooltip: 'System anomaly containment unit', type: 'character', status: 'live', guardian: 'Shadow' }, type: 'npc' },
  { id: 'safe-mode', position: { x: -250, y: 300 }, data: { label: 'Safe Mode (Fabricated Timeline)', tooltip: 'End: Fabricated Timeline', type: 'trap', status: 'stub', guardian: null }, type: 'end' },
  { id: 'entry', position: { x: -100, y: 300 }, data: { label: 'Reset / Entry', tooltip: 'Restart the journey', type: 'trap', status: 'stub', guardian: null }, type: 'end' },
  { id: 'stabilize', position: { x: 100, y: 300 }, data: { label: 'Stabilize (Puzzle)', tooltip: 'Puzzle node (under construction)', type: 'choice', status: 'wip', recommended: true, guardian: null }, type: 'choice' },
  { id: 'error-loop', position: { x: 300, y: 300 }, data: { label: 'Error Loop (Recursive)', tooltip: 'Unstable recursive logic state', type: 'trap', status: 'stub', guardian: null }, type: 'end' },

  // Faction Alignment Tree (left)
  { id: 'deeper-profile', position: { x: -400, y: 0 }, data: { label: 'Deeper Profile', tooltip: 'Profile analysis', type: 'faction', status: 'live', guardian: 'Unknown' }, type: 'faction' },
  { id: 'factions', position: { x: -600, y: 0 }, data: { label: "Choose who's watching you", tooltip: 'Faction selection', type: 'faction', status: 'live', guardian: 'Unknown' }, type: 'faction' },
  { id: 'align-signal', position: { x: -700, y: -100 }, data: { label: 'Aligned: Signal Brokers', tooltip: 'Signal Brokers (teal)', type: 'faction', status: 'stub', guardian: 'Signal Brokers', color: 'teal' }, type: 'faction' },
  { id: 'align-oblivion', position: { x: -700, y: 0 }, data: { label: 'Aligned: Oblivion Hand', tooltip: 'Oblivion Hand (gray)', type: 'faction', status: 'stub', guardian: 'Oblivion Hand', color: 'gray' }, type: 'faction' },
  { id: 'align-architects', position: { x: -700, y: 100 }, data: { label: 'Aligned: Architects of Silence', tooltip: 'Architects of Silence (gold)', type: 'faction', status: 'stub', guardian: 'Architects of Silence', color: 'gold' }, type: 'faction' },

  // Training Track (right)
  { id: 'training-hub', position: { x: 500, y: 0 }, data: { label: 'Training Entry', tooltip: 'Begin your training', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },
  { id: 'guardian-call', position: { x: 700, y: 0 }, data: { label: 'AWAKEN Challenge', tooltip: 'Face the guardian', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },
  { id: 'data-filter', position: { x: 900, y: 0 }, data: { label: 'Find the Real Signal', tooltip: 'Discern truth from noise', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },
  { id: 'code-match', position: { x: 1100, y: 0 }, data: { label: 'Memory Puzzle', tooltip: 'Test your recall', type: 'training', status: 'live', guardian: 'Morpheus' }, type: 'training' },
]; 