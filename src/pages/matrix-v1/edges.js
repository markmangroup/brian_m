export const edges = [
  { id: 'e1', source: 'start', target: 'glitch', label: 'Mask Signature', style: { stroke: '#00ff00' }, type: 'smoothstep', animated: true },
  { id: 'e2', source: 'start', target: 'interference', label: 'Inject Static', style: { stroke: '#00ff00' }, type: 'smoothstep', animated: true },
  { id: 'e3', source: 'glitch', target: 'safe-mode', label: 'Play Along', style: { stroke: '#00ff00' }, type: 'smoothstep', animated: true },
  { id: 'e4', source: 'glitch', target: 'entry', label: 'Attempt Reset', style: { stroke: '#ff4444' }, type: 'smoothstep', animated: true },
  { id: 'e5', source: 'interference', target: 'stabilize', label: 'Try to Stabilize', style: { stroke: '#a259ff' }, type: 'smoothstep', animated: true },
  { id: 'e6', source: 'interference', target: 'error-loop', label: 'Descend Further', style: { stroke: '#ff4444' }, type: 'smoothstep', animated: true },
]; 