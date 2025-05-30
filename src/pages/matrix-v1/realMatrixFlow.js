export const realMatrixNodes = [
  {
    id: 'matrix-v1-entry',
    type: 'scene',
    position: { x: 50, y: 100 },
    data: {
      title: 'Matrix Entry',
      description: 'First load of /matrix-v1',
      setting: 'route: matrix-v1'
    }
  },
  {
    id: 'matrix-name-prompt',
    type: 'dialogue',
    position: { x: 250, y: 100 },
    data: {
      character: 'System',
      dialogue: 'What is your name?',
      emotion: 'neutral'
    }
  },
  {
    id: 'matrix-pill-choice',
    type: 'choice',
    position: { x: 500, y: 100 },
    data: {
      prompt: 'Red or Blue?',
      options: [
        'Red Pill',
        'Blue Pill'
      ]
    }
  },
  {
    id: 'matrix-pill-choice-red',
    type: 'scene',
    position: { x: 700, y: 60 },
    parentChoice: 'matrix-pill-choice',
    option: 'Red Pill',
    data: {
      title: 'Red Pill Path',
      description: 'You chose the red pill.',
      setting: 'route: red-pill'
    }
  },
  {
    id: 'matrix-pill-choice-blue',
    type: 'scene',
    position: { x: 700, y: 140 },
    parentChoice: 'matrix-pill-choice',
    option: 'Blue Pill',
    data: {
      title: 'Blue Pill Path',
      description: 'You chose the blue pill.',
      setting: 'route: blue-pill'
    }
  }
];

export const realMatrixEdges = [
  { id: 'edge1', source: 'matrix-v1-entry', target: 'matrix-name-prompt' },
  { id: 'edge2', source: 'matrix-name-prompt', target: 'matrix-pill-choice' },
  { id: 'edge3', source: 'matrix-pill-choice', target: 'matrix-pill-choice-red', label: 'Red Pill' },
  { id: 'edge4', source: 'matrix-pill-choice', target: 'matrix-pill-choice-blue', label: 'Blue Pill' }
]; 