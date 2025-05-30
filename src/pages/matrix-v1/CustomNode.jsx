import React from 'react';

// Enhanced base styles with Matrix theme
const baseCard =
  'w-72 rounded-md shadow-lg ring-1 ring-white/10 bg-gradient-to-br from-[#111827] to-[#1f2937] transition-all duration-300 font-mono text-white overflow-hidden';
const hoverCard =
  'hover:scale-[1.05] hover:shadow-2xl hover:ring-cyan-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer';
const headerClass = 'text-xs font-semibold uppercase tracking-wider text-white/90 font-mono';
const bodyClass = 'text-xs leading-relaxed text-gray-300 font-mono';

// Enhanced status system with better visual feedback
const statusConfig = {
  live: { 
    label: 'Built', 
    icon: '✅', 
    className: 'text-emerald-400 border-emerald-400/60 bg-emerald-900/40' 
  },
  wip: { 
    label: 'In Progress', 
    icon: '🛠', 
    className: 'text-yellow-400 border-yellow-400/60 bg-yellow-900/40' 
  },
  stub: { 
    label: 'Planned', 
    icon: '❌', 
    className: 'text-red-400 border-red-400/60 bg-red-900/40' 
  },
};

// New StatusBadge component with better styling
const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status];
  if (!cfg) return null;
  
  return (
    <div className={`inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded border mt-2 ${cfg.className}`}>
      <span>{cfg.icon}</span>
      <span>{cfg.label}</span>
    </div>
  );
};

// Enhanced accent colors for different node types
const accent = {
  scene: 'border-2 border-purple-500 bg-purple-100',
  dialogue: 'border-2 border-blue-500 bg-blue-100',
  choice: 'border-2 border-green-500 bg-green-100',
  ending: 'border-2 border-red-500 bg-red-100',
  npc: 'border-2 border-yellow-900 bg-yellow-100',
  faction: 'border-2 border-yellow-500 bg-yellow-50',
  training: 'border-2 border-pink-500 bg-pink-100',
  end: 'border-2 border-gray-500 bg-gray-100',
};

export const SceneNode = ({ data = {}, type = 'scene' }) => (
  <div
    onMouseEnter={data?.onMouseEnter}
    onMouseLeave={data?.onMouseLeave}
    onClick={data?.onClick}
    className={`${baseCard} ${hoverCard} ${data?.isOverlay ? 'cursor-pointer' : ''} animate-fade-slide`}
    style={{
      '--accent': '#60a5fa',
      borderColor: 'var(--accent)',
    }}
  >
    <h3 className={headerClass} style={{ color: 'var(--accent)' }}>🎬 {data.title || 'Untitled Scene'}</h3>
    <p className={bodyClass}>{data.description || 'No description.'}</p>
    {data.setting && (
      <div className="text-xs text-gray-400 italic font-mono">📍 Setting: {data.setting}</div>
    )}
    <StatusBadge status={data.status} />
  </div>
);

export const DialogueNode = ({ data = {}, type = 'dialogue' }) => (
  <div
    onMouseEnter={data?.onMouseEnter}
    onMouseLeave={data?.onMouseLeave}
    onClick={data?.onClick}
    className={`${baseCard} ${hoverCard} ${data?.isOverlay ? 'cursor-pointer' : ''} animate-fade-slide`}
    style={{
      '--accent': '#4ade80',
      borderColor: 'var(--accent)',
    }}
  >
    <div className={headerClass} style={{ color: 'var(--accent)' }}>{data.character || 'Unknown'}</div>
    <p className={bodyClass}>{data.dialogue || '...'}</p>
    <div className="text-gray-400 text-xs font-mono">{data.emotion || 'neutral'}</div>
    <StatusBadge status={data.status} />
  </div>
);

export const ChoiceNode = ({ data = {}, type = 'choice' }) => {
  const { isExpandable, isExpanded, onBranchToggle } = data || {};
  const options = Array.isArray(data.options)
    ? data.options.map(opt => typeof opt === 'string' ? opt : opt?.text || String(opt))
    : [];
  return (
    <div
      onMouseEnter={data?.onMouseEnter}
      onMouseLeave={data?.onMouseLeave}
      onClick={data?.onClick}
      className={`${baseCard} ${hoverCard} ${data?.isOverlay ? 'cursor-pointer' : ''} animate-fade-slide`}
      style={{
        '--accent': '#a78bfa',
        borderColor: 'var(--accent)',
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className={headerClass} style={{ color: 'var(--accent)' }}>{data.prompt || 'Make a choice...'}</h3>
        {isExpandable && (
          <button
            onClick={e => { e.stopPropagation(); onBranchToggle && onBranchToggle(); }}
            className={`ml-2 p-1 rounded-full border border-cyan-400/50 text-cyan-400 hover:bg-cyan-900/40 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            title={isExpanded ? 'Collapse branch' : 'Expand branch'}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        )}
      </div>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="text-gray-200 text-xs bg-white/10 p-2 rounded border border-purple-300 font-mono">
            {option}
          </div>
        ))}
      </div>
      <StatusBadge status={data.status} />
    </div>
  );
};

export const EndingNode = ({ data = {}, type = 'ending' }) => (
  <div
    onMouseEnter={data?.onMouseEnter}
    onMouseLeave={data?.onMouseLeave}
    onClick={data?.onClick}
    className={`${baseCard} ${hoverCard} ${data?.isOverlay ? 'cursor-pointer' : ''} animate-fade-slide`}
    style={{
      '--accent': '#f87171',
      borderColor: 'var(--accent)',
    }}
  >
    <div className={headerClass} style={{ color: 'var(--accent)' }}>{data.outcome || 'Unknown'}</div>
    <h3 className={headerClass}>{data.title || 'Untitled Ending'}</h3>
    <p className={bodyClass}>{data.description || 'No description.'}</p>
    <StatusBadge status={data.status} />
  </div>
);
