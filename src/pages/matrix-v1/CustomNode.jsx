import React from 'react';

const nodeStyles = {
  npc: {
    background: '#1a1a1a',
    border: '1px solid #00ff00',
    color: '#00ff00',
    fontWeight: 600,
    borderRadius: 8,
    padding: 12,
    minWidth: 120,
    textAlign: 'center',
    fontSize: 16,
  },
  choice: {
    background: '#222',
    border: '1px solid #888',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 8,
    padding: 10,
    minWidth: 100,
    textAlign: 'center',
    fontSize: 15,
  },
  end: {
    background: '#3a0000',
    border: '1px solid #ff4444',
    color: '#ff4444',
    fontWeight: 600,
    borderRadius: 8,
    padding: 10,
    minWidth: 120,
    textAlign: 'center',
    fontSize: 15,
  },
};

export default function CustomNode({ data, type }) {
  // Tooltip: use title attribute for now
  return (
    <div style={nodeStyles[type] || nodeStyles.choice} title={data.tooltip || data.label}>
      {data.label}
    </div>
  );
} 