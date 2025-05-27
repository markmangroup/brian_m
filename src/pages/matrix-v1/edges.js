export const edges = [
  { id: 'e1', source: 'start', target: 'glitch', label: 'Mask Signature' },
  { id: 'e2', source: 'start', target: 'interference', label: 'Inject Static' },
  { id: 'e3', source: 'glitch', target: 'safe-mode', label: 'Play Along' },
  { id: 'e4', source: 'glitch', target: 'entry', label: 'Attempt Reset' },
  { id: 'e5', source: 'interference', target: 'stabilize', label: 'Try to Stabilize' },
  { id: 'e6', source: 'interference', target: 'error-loop', label: 'Descend Further' },
]; 