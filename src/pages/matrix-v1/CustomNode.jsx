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
    fontWeight: 700,
    borderRadius: 14,
    padding: 14,
    minWidth: 140,
    textAlign: 'center',
    fontSize: 17,
    boxShadow: '0 0 12px #14b8a655',
  },
  training: {
    background: 'linear-gradient(135deg, #222 70%, #a259ff 100%)',
    border: '2px solid #a259ff',
    color: '#fff',
    fontWeight: 700,
    borderRadius: 16,
    padding: 14,
    minWidth: 130,
    textAlign: 'center',
    fontSize: 16,
    boxShadow: '0 0 12px #a259ff55',
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
    boxShadow: '0 0 12px #14b8a655',
  },
  gray: {
    border: '2px solid #64748b',
    color: '#64748b',
    boxShadow: '0 0 12px #64748b55',
  },
  gold: {
    border: '2px solid #fbbf24',
    color: '#fbbf24',
    boxShadow: '0 0 12px #fbbf2455',
  },
};

export default function CustomNode(props) {
  const {
    data = {},
    type,
    selected = false,
    visited = false,
  } = props || {};

  // Compose className for spacing, font, hover, etc.
  let className = '';
  if (data.type === 'trap') {
    className += ' matrix-trap-red';
  } else if (data.type === 'choice' || data.type === 'training') {
    className += ' matrix-gradient-purple';
  } else if (data.type === 'character') {
    className += ' matrix-glow-green';
  }

  if (visited) {
    className += ' opacity-50 hover:opacity-100 transition';
  }

  if (selected) {
    className += ' animate-glow-green ring-2 ring-lime-400';
  }

  let style = nodeStyles[data.type] || nodeStyles.unknown;
  if (data.type === 'faction') {
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
    style = { ...style, border: '2px solid #22c55e' };
  }
  const badge = statusBadge[data.status] || '';

  return (
    <div
      className={
        className +
        ' relative cursor-pointer font-extrabold rounded-lg px-4 py-3 min-w-[110px] text-center m-2 ' +
        'transition-transform hover:scale-105 hover:ring hover:ring-green-300'
      }
      title={data.tooltip || data.label}
      style={{ position: 'relative', ...style }}
    >
      <span className="text-base px-2 py-1 rounded bg-white bg-opacity-80 text-black shadow-md">
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
      {data.tooltip && (
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
      )}
    </div>
  );
} 