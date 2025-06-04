export const nodes = [
  {
    id: 'visible-test',
    type: 'scene',
    position: { x: 50, y: 50 },
    narrativeTier: 'intro',
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
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
    world: 'matrix',
    data: {
      label: 'Aligned: Architects of Silence',
      tooltip: 'Architects of Silence (gold)',
      type: 'faction',
      status: 'stub',
      guardian: 'Architects of Silence',
      color: 'gold'
    }
  },

  // Night City nodes
  {
    id: 'nc-entry',
    type: 'scene',
    position: { x: 600, y: 0 },
    depth: 0,
    group: 'night-city',
    narrativeTier: 'intro',
    world: 'nightcity',
    data: {
      title: 'Night City Entry',
      description: 'The neon-soaked streets of Night City stretch before you.',
      setting: 'Watson District',
      status: 'live',
      enhancement: {
        qualityRating: 5,
        status: 'live',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-bouncer',
    type: 'npc',
    position: { x: 600, y: 200 },
    depth: 1,
    group: 'night-city',
    narrativeTier: 'intro',
    world: 'nightcity',
    data: {
      title: 'Afterlife Bouncer',
      description: 'A chrome-enhanced bouncer guards the entrance to the legendary bar.',
      character: 'Bouncer',
      setting: 'The Afterlife',
      status: 'live',
      enhancement: {
        qualityRating: 5,
        status: 'live',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-netdiver',
    type: 'choice',
    position: { x: 600, y: 400 },
    depth: 2,
    group: 'night-city',
    narrativeTier: 'mid',
    world: 'nightcity',
    data: {
      title: 'Netrunner Dive',
      description: 'Jack into the Net and dive deep into the data stream.',
      prompt: 'How do you proceed with the hack?',
      options: ['Stealth approach', 'Brute force', 'Social engineering'],
      setting: 'Cyberspace',
      status: 'live',
      enhancement: {
        qualityRating: 5,
        status: 'live',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-file',
    type: 'scene',
    position: { x: 600, y: 600 },
    depth: 3,
    group: 'night-city',
    narrativeTier: 'mid',
    world: 'nightcity',
    data: {
      title: 'Data Theft',
      description: 'Corporate secrets flow through your neural interface.',
      setting: 'Data Vault',
      status: 'live',
      enhancement: {
        qualityRating: 5,
        status: 'live',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-silverhand',
    type: 'dialogue',
    position: { x: 600, y: 800 },
    depth: 4,
    group: 'night-city',
    narrativeTier: 'climax',
    world: 'nightcity',
    data: {
      title: 'Ghost of Johnny',
      character: 'Johnny Silverhand',
      dialogue: 'Wake the fuck up, samurai. We have a city to burn.',
      emotion: 'rebellious',
      setting: 'Neural Interface',
      status: 'live',
      enhancement: {
        qualityRating: 5,
        status: 'live',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-escape',
    type: 'choice',
    position: { x: 800, y: 400 },
    depth: 2,
    group: 'night-city',
    narrativeTier: 'mid',
    world: 'nightcity',
    data: {
      title: 'Corporate Escape',
      description: 'Security forces are closing in. Time to run.',
      prompt: 'How do you escape?',
      options: ['Rooftop parkour', 'Underground tunnels', 'Hijack vehicle'],
      setting: 'Corporate Plaza',
      status: 'live',
      enhancement: {
        qualityRating: 5,
        status: 'live',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-archive-dive',
    type: 'scene',
    position: { x: 800, y: 600 },
    depth: 3,
    group: 'night-city',
    narrativeTier: 'climax',
    world: 'nightcity',
    data: {
      title: 'Archive Dive',
      description: 'Deep in the corporate data archives, truth awaits.',
      setting: 'Arasaka Data Center',
      status: 'live',
      enhancement: {
        qualityRating: 5,
        status: 'live',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-final-protocol',
    type: 'choice',
    position: { x: 600, y: 1000 },
    depth: 5,
    group: 'night-city',
    narrativeTier: 'finale',
    world: 'nightcity',
    data: {
      title: 'Final Protocol',
      description: 'The ultimate choice: upload, erase, or rewrite reality.',
      prompt: 'What is your final decision?',
      options: [
        'Upload alternate timeline data',
        'Erase memory and walk away',
        'Rewrite protocol for control'
      ],
      setting: 'Quantum Vault',
      status: 'wip',
      enhancement: {
        qualityRating: 5,
        status: 'wip',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-neutral-ending',
    type: 'ending',
    position: { x: 400, y: 1200 },
    depth: 6,
    group: 'night-city',
    narrativeTier: 'finale',
    world: 'nightcity',
    data: {
      title: 'Neutral Ending',
      outcome: 'Freedom',
      description: 'You walk away from it all, memories intact but changed.',
      setting: 'Night City Streets',
      status: 'stub',
      enhancement: {
        qualityRating: 5,
        status: 'stub',
        priority: 'medium'
      }
    }
  },
  {
    id: 'nc-control-ending',
    type: 'ending',
    position: { x: 800, y: 1200 },
    depth: 6,
    group: 'night-city',
    narrativeTier: 'finale',
    world: 'nightcity',
    data: {
      title: 'Control Ending',
      outcome: 'Power',
      description: 'You seize control of the corporate machinery.',
      setting: 'Arasaka Tower',
      status: 'stub',
      enhancement: {
        qualityRating: 5,
        status: 'stub',
        priority: 'medium'
      }
    }
  }
]; 