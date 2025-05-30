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
      status: 'live'
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
      status: 'wip'
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
      isExpanded: false
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
      status: 'live'
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
      status: 'live'
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
      status: 'live'
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
      status: 'live'
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
      status: 'live'
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