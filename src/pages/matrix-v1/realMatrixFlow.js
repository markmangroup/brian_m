export const realMatrixNodes = [
  // Base story flow (always visible)
  {
    id: 'matrix-v1-entry',
    type: 'scene',
    depth: 0,
    group: 'intro',
    data: {
      title: 'Matrix Entry',
      description: 'First load of /matrix-v1',
      setting: 'route: matrix-v1',
      status: 'live',
      pageUrl: '/matrix-v1',
      summary: 'The gateway into the Matrix experience begins here. Users enter their name and prepare for the journey ahead.',
      characters: ['System', 'User'],
      puzzles: ['Name Input', 'Identity Setup'],
      interactions: ['TextInput', 'FormSubmission'],
      features: {
        hasTransition: true,
        hasCombat: false,
        hasChoice: false,
        hasNPC: false,
        hasAnimation: true
      }
    }
  },
  {
    id: 'matrix-name-prompt',
    type: 'dialogue',
    depth: 1,
    group: 'intro',
    data: {
      character: 'System',
      dialogue: 'What is your name?',
      emotion: 'neutral',
      status: 'wip',
      pageUrl: '/matrix-v1',
      summary: 'The system prompts for user identification, establishing the personal connection to the Matrix narrative.',
      characters: ['System', 'User'],
      puzzles: ['Identity Verification'],
      interactions: ['DialoguePrompt', 'NameEntry'],
      features: {
        hasTransition: false,
        hasCombat: false,
        hasChoice: false,
        hasNPC: true,
        hasAnimation: false
      }
    }
  },
  {
    id: 'matrix-pill-choice',
    type: 'choice',
    depth: 2,
    group: 'intro',
    data: {
      prompt: 'Red or Blue?',
      options: [
        'Red Pill',
        'Blue Pill'
      ],
      status: 'stub',
      isExpanded: false,
      pageUrl: '/matrix-v1',
      summary: 'The pivotal moment of choice that determines the path through the Matrix. Red pill leads to truth, blue pill to comfortable illusion.',
      characters: ['Morpheus', 'User'],
      puzzles: ['Moral Dilemma', 'Path Selection'],
      interactions: ['ChoicePrompt', 'BinaryDecision'],
      features: {
        hasTransition: true,
        hasCombat: false,
        hasChoice: true,
        hasNPC: true,
        hasAnimation: true
      }
    }
  },

  // Expandable Red Pill Path
  {
    id: 'matrix-pill-choice-red',
    type: 'scene',
    depth: 3,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Pill Path',
      description: 'You chose the red pill.',
      setting: 'route: red-pill',
      status: 'live',
      pageUrl: '/matrix-v1/terminal',
      summary: 'The red pill choice leads to awakening. Users face their first taste of the real world and its harsh truths.',
      characters: ['Morpheus', 'Neo', 'System'],
      puzzles: ['Terminal Access', 'Reality Acceptance'],
      interactions: ['SceneTransition', 'RealityShift'],
      features: {
        hasTransition: true,
        hasCombat: false,
        hasChoice: false,
        hasNPC: true,
        hasAnimation: true
      }
    }
  },
  {
    id: 'matrix-red-awakening',
    type: 'scene',
    depth: 4,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Awakening',
      description: 'You awaken in a strange room filled with old computers and cryptic messages.',
      setting: 'The Real World',
      status: 'live',
      pageUrl: '/matrix-v1/checkpoint',
      summary: 'First glimpse of the real world outside the Matrix. Ancient technology and mysterious signals hint at a larger conspiracy.',
      characters: ['Neo', 'Mysterious Signals'],
      puzzles: ['Environment Exploration', 'Signal Decoding'],
      interactions: ['EnvironmentScan', 'MessageDecryption'],
      features: {
        hasTransition: true,
        hasCombat: false,
        hasChoice: false,
        hasNPC: false,
        hasAnimation: true
      }
    }
  },
  {
    id: 'matrix-red-trainer',
    type: 'training',
    depth: 5,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Training Upload',
      description: 'Combat training begins. You feel your muscles download new knowledge.',
      setting: 'Sim Program',
      status: 'live',
      pageUrl: '/matrix-v1/guardian-call',
      summary: 'Advanced combat training simulation. Neural upload technology transfers fighting skills directly to the mind.',
      characters: ['Morpheus', 'Neo', 'Training AI'],
      puzzles: ['Combat Mastery', 'Neural Integration'],
      interactions: ['SkillUpload', 'CombatSimulation', 'GuardianChallenge'],
      features: {
        hasTransition: true,
        hasCombat: true,
        hasChoice: false,
        hasNPC: true,
        hasAnimation: true
      }
    }
  },

  // Expandable Blue Pill Path
  {
    id: 'matrix-pill-choice-blue',
    type: 'scene',
    depth: 3,
    group: 'blue-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Blue Pill Path',
      description: 'You chose the blue pill.',
      setting: 'route: blue-pill',
      status: 'live',
      pageUrl: '/matrix-v1/stage-1',
      summary: 'The blue pill choice maintains the illusion. Users return to comfortable ignorance but subtle glitches persist.',
      characters: ['Agent Smith', 'Neo', 'System'],
      puzzles: ['Memory Suppression', 'Glitch Management'],
      interactions: ['MemoryWipe', 'RealityMaintenance'],
      features: {
        hasTransition: true,
        hasCombat: false,
        hasChoice: false,
        hasNPC: true,
        hasAnimation: true
      }
    }
  },
  {
    id: 'matrix-blue-loop',
    type: 'scene',
    depth: 4,
    group: 'blue-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Dream Within a Dream',
      description: 'You wake up in your bed, unsure if anything happened at all.',
      setting: 'Neo\'s Apartment',
      status: 'live',
      pageUrl: '/matrix-v1/stage-2',
      summary: 'Trapped in recursive dreams and false awakenings. Reality becomes increasingly uncertain as the Matrix tightens its grip.',
      characters: ['Neo', 'Reflection', 'Dream Figures'],
      puzzles: ['Reality Testing', 'Dream Escape'],
      interactions: ['DreamSequence', 'RealityCheck', 'LoopDetection'],
      features: {
        hasTransition: true,
        hasCombat: false,
        hasChoice: false,
        hasNPC: false,
        hasAnimation: true
      }
    }
  }
];

export const realMatrixEdges = [
  // Base flow edges
  { id: 'edge1', source: 'matrix-v1-entry', target: 'matrix-name-prompt' },
  { id: 'edge2', source: 'matrix-name-prompt', target: 'matrix-pill-choice' },
  
  // Choice branch edges (only shown when expanded)
  { id: 'edge3', source: 'matrix-pill-choice', target: 'matrix-pill-choice-red', label: 'Red Pill' },
  { id: 'edge4', source: 'matrix-pill-choice', target: 'matrix-pill-choice-blue', label: 'Blue Pill' },
  
  // Red path continuation
  { id: 'edge5', source: 'matrix-pill-choice-red', target: 'matrix-red-awakening' },
  { id: 'edge6', source: 'matrix-red-awakening', target: 'matrix-red-trainer' },
  
  // Blue path continuation
  { id: 'edge7', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop' }
];