export const edges = [
  { id: 'e1', source: 'start', target: 'glitch', label: 'Mask Signature', style: { stroke: '#00ff00' }, type: 'smoothstep', animated: true },
  { id: 'e2', source: 'start', target: 'interference', label: 'Inject Static', style: { stroke: '#00ff00' }, type: 'smoothstep', animated: true },
  { id: 'e3', source: 'glitch', target: 'safe-mode', label: 'Play Along', style: { stroke: '#00ff00' }, type: 'smoothstep', animated: true },
  { id: 'e4', source: 'glitch', target: 'entry', label: 'Attempt Reset', style: { stroke: '#ff4444' }, type: 'smoothstep', animated: true },
  { id: 'e5', source: 'interference', target: 'stabilize', label: 'Try to Stabilize', style: { stroke: '#a259ff' }, type: 'smoothstep', animated: true },
  { id: 'e6', source: 'interference', target: 'error-loop', label: 'Descend Further', style: { stroke: '#ff4444' }, type: 'smoothstep', animated: true },

  { id: 'e7', source: 'deeper-profile', target: 'factions', label: 'Analyze Profile', style: { stroke: '#14b8a6' }, type: 'smoothstep', animated: true },
  { id: 'e8', source: 'factions', target: 'align-signal', label: 'Signal Brokers', style: { stroke: '#14b8a6' }, type: 'smoothstep', animated: false },
  { id: 'e9', source: 'factions', target: 'align-oblivion', label: 'Oblivion Hand', style: { stroke: '#64748b' }, type: 'smoothstep', animated: false },
  { id: 'e10', source: 'factions', target: 'align-architects', label: 'Architects of Silence', style: { stroke: '#fbbf24' }, type: 'smoothstep', animated: false },

  { id: 'e11', source: 'training-hub', target: 'guardian-call', label: 'Begin Training', style: { stroke: '#a259ff' }, type: 'smoothstep', animated: true },
  { id: 'e12', source: 'guardian-call', target: 'data-filter', label: 'AWAKEN', style: { stroke: '#a259ff' }, type: 'smoothstep', animated: true },
  { id: 'e13', source: 'data-filter', target: 'code-match', label: 'Find Signal', style: { stroke: '#a259ff' }, type: 'smoothstep', animated: true },
  { id: 'e14', source: 'code-match', target: 'training-hub', label: 'Retry', style: { stroke: '#a259ff', strokeDasharray: '6 3' }, type: 'smoothstep', animated: false },
]; 