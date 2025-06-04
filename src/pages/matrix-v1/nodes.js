export const nodes = [
  {
    id: 'visible-test',
    type: 'scene',
    position: { x: 50, y: 50 },
    narrativeTier: 'intro',
    data: {
      title: 'Visible Test',
      description: 'This should always be on screen.',
      setting: 'Top Left'
    }
  },
  // Scene Nodes
  {
    id: 'scene-1',
    type: 'scene',
    position: { x: 0, y: 0 },
    narrativeTier: 'intro',
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
    narrativeTier: 'mid',
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
    narrativeTier: 'intro',
    data: {
      character: 'Morpheus',
      dialogue: 'I\'m going to show you how deep the rabbit hole goes.',
      emotion: 'serious'
    }
  },
  {
    id: 'dialogue-2',
    type: 'dialogue',
    position: { x: 200, y: 200 },
    narrativeTier: 'mid',
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
    narrativeTier: 'climax',
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
    narrativeTier: 'climax',
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
    narrativeTier: 'finale',
    data: {
      title: 'The One',
      outcome: 'Victory',
      description: 'You\'ve become the One, capable of bending the Matrix to your will.'
    }
  },
  {
    id: 'ending-2',
    type: 'ending',
    position: { x: 200, y: 600 },
    narrativeTier: 'finale',
    data: {
      title: 'System Failure',
      outcome: 'Defeat',
      description: 'The agents have caught you. Your consciousness is lost in the Matrix.'
    }
  },

  // Training nodes
  {
    id: 'training-hub',
    type: 'training',
    depth: 0,
    group: 'training',
    narrativeTier: 'intro',
    data: {
      label: 'Training Entry',
      tooltip: 'Begin your training',
      type: 'training',
      status: 'live',
      guardian: 'Morpheus'
    }
  },
  {
    id: 'guardian-call',
    type: 'training',
    depth: 1,
    group: 'training',
    narrativeTier: 'mid',
    data: {
      label: 'AWAKEN Challenge',
      tooltip: 'Face the guardian',
      type: 'training',
      status: 'live',
      guardian: 'Morpheus'
    }
  },
  {
    id: 'data-filter',
    type: 'training',
    depth: 2,
    group: 'training',
    narrativeTier: 'mid',
    data: {
      label: 'Find the Real Signal',
      tooltip: 'Discern truth from noise',
      type: 'training',
      status: 'live',
      guardian: 'Morpheus'
    }
  },
  {
    id: 'code-match',
    type: 'training',
    depth: 3,
    group: 'training',
    narrativeTier: 'climax',
    data: {
      label: 'Memory Puzzle',
      tooltip: 'Test your recall',
      type: 'training',
      status: 'live',
      guardian: 'Morpheus'
    }
  },

  // Main story nodes
  {
    id: 'start',
    type: 'npc',
    depth: 0,
    group: 'main',
    narrativeTier: 'intro',
    data: {
      label: 'Agent Echo',
      tooltip: 'System Guardian: Echo',
      type: 'character',
      status: 'live',
      guardian: 'Echo'
    }
  },
  {
    id: 'glitch',
    type: 'npc',
    depth: 1,
    group: 'main',
    narrativeTier: 'mid',
    data: {
      label: 'Archivist (Simulated Recovery)',
      tooltip: 'Archivist: Simulated Recovery',
      type: 'character',
      status: 'wip',
      guardian: 'Archivist'
    }
  },
  {
    id: 'interference',
    type: 'npc',
    depth: 1,
    group: 'main',
    narrativeTier: 'mid',
    data: {
      label: 'Agent Shadow (Signal Distorted)',
      tooltip: 'System anomaly containment unit',
      type: 'character',
      status: 'live',
      guardian: 'Shadow'
    }
  },
  {
    id: 'safe-mode',
    type: 'end',
    depth: 2,
    group: 'main',
    narrativeTier: 'finale',
    data: {
      label: 'Safe Mode (Fabricated Timeline)',
      tooltip: 'End: Fabricated Timeline',
      type: 'trap',
      status: 'stub',
      guardian: null
    }
  },
  {
    id: 'entry',
    type: 'end',
    depth: 2,
    group: 'main',
    narrativeTier: 'finale',
    data: {
      label: 'Reset / Entry',
      tooltip: 'Restart the journey',
      type: 'trap',
      status: 'stub',
      guardian: null
    }
  },
  {
    id: 'stabilize',
    type: 'choice',
    depth: 2,
    group: 'main',
    narrativeTier: 'climax',
    data: {
      label: 'Stabilize (Puzzle)',
      tooltip: 'Puzzle node (under construction)',
      type: 'choice',
      status: 'wip',
      recommended: true,
      guardian: null
    }
  },
  {
    id: 'error-loop',
    type: 'end',
    depth: 2,
    group: 'main',
    narrativeTier: 'finale',
    data: {
      label: 'Error Loop (Recursive)',
      tooltip: 'Unstable recursive logic state',
      type: 'trap',
      status: 'stub',
      guardian: null
    }
  },

  // Faction nodes
  {
    id: 'deeper-profile',
    type: 'faction',
    depth: 0,
    group: 'factions',
    narrativeTier: 'intro',
    data: {
      label: 'Deeper Profile',
      tooltip: 'Profile analysis',
      type: 'faction',
      status: 'live',
      guardian: 'Unknown'
    }
  },
  {
    id: 'factions',
    type: 'faction',
    depth: 1,
    group: 'factions',
    narrativeTier: 'mid',
    data: {
      label: "Choose who's watching you",
      tooltip: 'Faction selection',
      type: 'faction',
      status: 'live',
      guardian: 'Unknown'
    }
  },
  {
    id: 'align-signal',
    type: 'faction',
    depth: 2,
    group: 'factions',
    narrativeTier: 'climax',
    data: {
      label: 'Aligned: Signal Brokers',
      tooltip: 'Signal Brokers (teal)',
      type: 'faction',
      status: 'stub',
      guardian: 'Signal Brokers',
      color: 'teal'
    }
  },
  {
    id: 'align-oblivion',
    type: 'faction',
    depth: 2,
    group: 'factions',
    narrativeTier: 'climax',
    data: {
      label: 'Aligned: Oblivion Hand',
      tooltip: 'Oblivion Hand (gray)',
      type: 'faction',
      status: 'stub',
      guardian: 'Oblivion Hand',
      color: 'gray'
    }
  },
  {
    id: 'align-architects',
    type: 'faction',
    depth: 2,
    group: 'factions',
    narrativeTier: 'climax',
    data: {
      label: 'Aligned: Architects of Silence',
      tooltip: 'Architects of Silence (gold)',
      type: 'faction',
      status: 'stub',
      guardian: 'Architects of Silence',
      color: 'gold'
    }
  }
]; 