export const realMatrixNodes = [
  // Base story flow (always visible)
  {
    id: 'matrix-v1-entry',
    type: 'scene',
    position: { x: 80, y: 180 },
    data: {
      title: 'Matrix Entry',
      description: 'First load of /matrix-v1',
      setting: 'route: matrix-v1'
    }
  },
  {
    id: 'matrix-name-prompt',
    type: 'dialogue',
    position: { x: 260, y: 220 },
    data: {
      character: 'System',
      dialogue: 'What is your name?',
      emotion: 'neutral'
    }
  },
  {
    id: 'matrix-pill-choice',
    type: 'choice',
    position: { x: 440, y: 260 },
    data: {
      prompt: 'Red or Blue?',
      options: [
        'Red Pill',
        'Blue Pill'
      ]
    }
  },

  // Expandable Red Pill Path
  {
    id: 'matrix-pill-choice-red',
    type: 'scene',
    position: { x: 760, y: 100 },
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Pill Path',
      description: 'You chose the red pill.',
      setting: 'route: red-pill'
    }
  },
  {
    id: 'matrix-red-awakening',
    type: 'scene',
    position: { x: 980, y: 100 },
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Awakening',
      description: 'You awaken in a strange room filled with old computers and cryptic messages.',
      setting: 'The Real World'
    }
  },
  {
    id: 'matrix-red-trainer',
    type: 'training',
    position: { x: 1200, y: 100 },
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Training Upload',
      description: 'Combat training begins. You feel your muscles download new knowledge.',
      setting: 'Sim Program'
    }
  },

  // Expandable Blue Pill Path
  {
    id: 'matrix-pill-choice-blue',
    type: 'scene',
    position: { x: 760, y: 340 },
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Blue Pill Path',
      description: 'You chose the blue pill.',
      setting: 'route: blue-pill'
    }
  },
  {
    id: 'matrix-blue-loop',
    type: 'scene',
    position: { x: 980, y: 340 },
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Dream Within a Dream',
      description: 'You wake up in your bed, unsure if anything happened at all.',
      setting: 'Neo\'s Apartment'
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