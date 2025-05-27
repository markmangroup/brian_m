import React from 'react';

const nodeStyles = {
  character: {
    background: '#1a1a1a',
    border: '2px solid #00ff00',
    color: '#00ff00',
    fontWeight: 700,
    borderRadius: 10,
    padding: 14,
    minWidth: 140,
    textAlign: 'center',
    fontSize: 18,
    boxShadow: '0 0 12px #00ff0055',
  },
  choice: {
    background: 'linear-gradient(135deg, #222 70%, #a259ff 100%)',
    border: '2px solid #a259ff',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 16,
    padding: 12,
    minWidth: 110,
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 0 8px #a259ff55',
  },
  trap: {
    background: '#3a0000',
    border: '2px solid #ff4444',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 4,
    padding: 12,
    minWidth: 120,
    textAlign: 'center',
    fontSize: 15,
    boxShadow: '0 0 8px #ff444455',
  },
  unknown: {
    background: '#444',
    border: '2px dashed #bbb',
    color: '#eee',
    fontWeight: 600,
    borderRadius: 8,
    padding: 10,
    minWidth: 100,
    textAlign: 'center',
    fontSize: 15,
  },
};

const statusBadge = {
  live: '✅',
  wip: '🛠',
  stub: '❌',
};

export default function CustomNode({ data, type, selected }) {
  const style = nodeStyles[data.type] || nodeStyles.unknown;
  const badge = statusBadge[data.status] || '';
  // Matrix glow for current node (selected or hardcoded)
  const glow = selected ? { boxShadow: '0 0 24px 4px #00ff00, 0 0 8px #00ff00' } : {};
  return (
    <div
      style={{ ...style, ...glow, position: 'relative', cursor: 'pointer' }}
      title={data.tooltip || data.label}
    >
      <span style={{ fontSize: 18, fontWeight: 700 }}>{data.label}</span>
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: 2,
            right: 6,
            fontSize: 18,
            filter: 'drop-shadow(0 0 2px #000)',
          }}
          aria-label={data.status}
        >
          {badge}
        </span>
      )}
      {/* Tooltip overlay (on hover) */}
      <span
        style={{
          display: 'none',
          position: 'absolute',
          left: '50%',
          bottom: '110%',
          transform: 'translateX(-50%)',
          background: '#222',
          color: '#fff',
          padding: '4px 10px',
          borderRadius: 6,
          fontSize: 13,
          whiteSpace: 'nowrap',
          zIndex: 10,
        }}
        className="custom-node-tooltip"
      >
        {data.tooltip}
      </span>
    </div>
  );
} 