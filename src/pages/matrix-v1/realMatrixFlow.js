export const realMatrixNodes = [
  // === DEPTH 0: INTRO GROUP ===
  {
    id: 'matrix-v1-entry',
    type: 'scene',
    depth: 0,
    group: 'intro',
    data: {
      title: 'Matrix Entry',
      pageUrl: '/matrix-v1',
      status: 'live',
      summary: 'User awakens in the simulation. System begins engagement.',
      characters: ['System'],
      puzzles: [],
      interactions: ['SceneIntro', 'NarrativeStart'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['Welcome to the simulation.', 'Your identity is not yet confirmed.']
    }
  },

  // === DEPTH 1: INTRO GROUP ===
  {
    id: 'matrix-name-prompt',
    type: 'dialogue',
    depth: 1,
    group: 'intro',
    data: {
      title: 'Name Prompt',
      pageUrl: '/matrix-v1',
      status: 'live',
      summary: 'System asks the user to input a name, establishing identity.',
      characters: ['System'],
      puzzles: ['IdentityPrompt'],
      interactions: ['InputField', 'DialogueResponse'],
      features: { hasTransition: false, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: false },
      dialogue: ['What is your name?']
    }
  },

  // === DEPTH 2: INTRO GROUP ===
  {
    id: 'matrix-pill-choice',
    type: 'choice',
    depth: 2,
    group: 'intro',
    data: {
      title: 'The Choice',
      pageUrl: '/matrix-v1',
      status: 'live',
      summary: 'Morpheus presents a decision to the user: red or blue pill.',
      characters: ['Morpheus'],
      puzzles: [],
      interactions: ['ChoicePrompt'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true },
      dialogue: ['This is your last chance.', 'Take the red pill, or stay in the Matrix.'],
      options: ['Red Pill', 'Blue Pill']
    }
  },

  // === DEPTH 3: RED PILL GROUP ===
  {
    id: 'matrix-pill-choice-red',
    type: 'scene',
    depth: 3,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Pill Path',
      pageUrl: '/matrix-v1/terminal',
      status: 'live',
      summary: 'The world begins to glitch. The user descends into raw data.',
      characters: ['System'],
      puzzles: [],
      interactions: ['SceneTransition', 'GlitchReveal'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['Connection destabilized.', 'Prepare for extraction.']
    }
  },

  // === DEPTH 3: BLUE PILL GROUP ===
  {
    id: 'matrix-pill-choice-blue',
    type: 'scene',
    depth: 3,
    group: 'blue-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Blue Pill Path',
      pageUrl: '/matrix-v1/stage-1',
      status: 'live',
      summary: 'User returns to the simulated world, forgetting the offer.',
      characters: ['Neo'],
      puzzles: [],
      interactions: ['SceneReset'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['You wake up and everything feels... normal.']
    }
  },

  // === DEPTH 4: RED PILL GROUP ===
  {
    id: 'matrix-red-awakening',
    type: 'scene',
    depth: 4,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Awakening',
      pageUrl: '/matrix-v1/checkpoint',
      status: 'live',
      summary: 'Neo awakens in the real world and reaches a checkpoint.',
      characters: ['Neo', 'Morpheus'],
      puzzles: [],
      interactions: ['Cutscene', 'CheckpointMarker'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: true, hasAnimation: true },
      dialogue: ['You\'ve crossed the line.', 'We have to move fast.']
    }
  },

  // === DEPTH 4: BLUE PILL GROUP ===
  {
    id: 'matrix-blue-loop',
    type: 'scene',
    depth: 4,
    group: 'blue-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Dream Within a Dream',
      pageUrl: '/matrix-v1/stage-2',
      status: 'live',
      summary: 'User experiences a looped sequence, hinting at suppressed memories.',
      characters: ['Neo'],
      puzzles: ['Loop Test'],
      interactions: ['LoopDetection'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['Didn\'t this already happen?', 'You feel a sense of déjà vu.']
    }
  },

  // === DEPTH 5: RED PILL GROUP ===
  {
    id: 'matrix-red-trainer',
    type: 'training',
    depth: 5,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Training Upload',
      pageUrl: '/matrix-v1/guardian-call',
      status: 'live',
      summary: 'Neo enters training mode and begins combat simulation.',
      characters: ['Neo'],
      puzzles: ['Combat Basics'],
      interactions: ['CombatEngine', 'InstructionOverlay'],
      features: { hasTransition: false, hasChoice: false, hasCombat: true, hasNPC: false, hasAnimation: true },
      dialogue: ['Loading training sequence.', 'Let\'s see what you can do.']
    }
  }
];

export const realMatrixEdges = [
  // Base flow edges
  { id: 'edge-entry-to-name', source: 'matrix-v1-entry', target: 'matrix-name-prompt' },
  { id: 'edge-name-to-choice', source: 'matrix-name-prompt', target: 'matrix-pill-choice' },
  
  // Choice branch edges (only shown when expanded)
  { id: 'edge-choice-to-red', source: 'matrix-pill-choice', target: 'matrix-pill-choice-red', label: 'Red Pill' },
  { id: 'edge-choice-to-blue', source: 'matrix-pill-choice', target: 'matrix-pill-choice-blue', label: 'Blue Pill' },
  
  // Red path continuation
  { id: 'edge-red-to-awakening', source: 'matrix-pill-choice-red', target: 'matrix-red-awakening' },
  { id: 'edge-awakening-to-trainer', source: 'matrix-red-awakening', target: 'matrix-red-trainer' },
  
  // Blue path continuation
  { id: 'edge-blue-to-loop', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop' }
];