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
  faction: {
    background: '#0f172a',
    border: '2px solid #14b8a6', // teal default
    color: '#14b8a6',
    fontWeight: 800,
    borderRadius: 18,
    padding: 22,
    minWidth: 180,
    textAlign: 'center',
    fontSize: 20,
    boxShadow: '0 0 18px #14b8a655',
  },
  training: {
    background: 'linear-gradient(135deg, #222 70%, #a259ff 100%)',
    border: '2px solid #a259ff',
    color: '#fff',
    fontWeight: 800,
    borderRadius: 28,
    padding: 24,
    minWidth: 200,
    textAlign: 'center',
    fontSize: 22,
    boxShadow: '0 0 18px #a259ff55',
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

const factionColors = {
  teal: {
    border: '2px solid #14b8a6',
    color: '#14b8a6',
    boxShadow: '0 0 18px #14b8a655',
  },
  gray: {
    border: '2px solid #64748b',
    color: '#64748b',
    boxShadow: '0 0 18px #64748b55',
  },
  gold: {
    border: '2px solid #fbbf24',
    color: '#fbbf24',
    boxShadow: '0 0 18px #fbbf2455',
  },
};

export default function CustomNode({ data, type, selected, visited }) {
  let className = '';
  if (selected) {
    className += ' matrix-glow-green';
  } else if (data.recommended) {
    className += ' matrix-glow-purple';
  } else if (visited) {
    className += ' matrix-glow-green';
  } else if (data.type === 'trap') {
    className += ' matrix-trap-red';
  } else if (data.type === 'choice') {
    className += ' matrix-gradient-purple';
  } else if (data.type === 'character') {
    className += ' matrix-glow-green';
  } else if (data.type === 'training') {
    className += ' matrix-gradient-purple';
  }

  let style = nodeStyles[data.type] || nodeStyles.unknown;
  if (data.type === 'faction') {
    // Override with faction color if present
    if (data.color && factionColors[data.color]) {
      style = {
        ...nodeStyles.faction,
        ...factionColors[data.color],
      };
    } else {
      style = nodeStyles.faction;
    }
  }
  if (data.type === 'training') {
    style = nodeStyles.training;
  }

  if (selected) {
    style = { ...style, border: '4px solid #00ff00' };
  }

  const badge = statusBadge[data.status] || '';

  return (
    <div
      className={className + ' relative cursor-pointer font-extrabold rounded-lg px-4 py-3 min-w-[110px] text-center m-2'}
      title={data.tooltip || data.label}
      style={{ position: 'relative', ...style }}
    >
      <span className="text-sm md:text-base px-2 py-1 rounded-md bg-white bg-opacity-80 text-black shadow-md hover:scale-105 transition-transform cursor-pointer">
        {data.label}
      </span>
      {data.guardian && (
        <span className="block text-sm mt-1 opacity-80">{data.guardian}</span>
      )}
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: 2,
            right: 6,
            fontSize: 22,
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
          fontSize: 15,
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