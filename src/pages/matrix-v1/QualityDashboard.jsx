import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { realMatrixNodes } from './realMatrixFlow';
import { edges } from './edges';
import { 
  generateQualityReport,
  calculateNodeQuality,
  calculateNodeScore,
  getScoreColor,
  getNextImprovements,
  QUALITY_CRITERIA,
  ENHANCEMENT_PRIORITY
} from '../../utils/nodeQualitySystem';
import { useTheme } from '../../theme/ThemeContext';
import DiagnosticOverlay from './DiagnosticOverlay';

// Status icon mapping
const STATUS_ICONS = {
  'live': '🟩',
  'wip': '🟨', 
  'stub': '🟥'
};

const STATUS_LABELS = {
  'live': 'Live',
  'wip': 'WIP',
  'stub': 'Stub'
};

// World Group Mapping
const WORLD_GROUPS = {
  'matrix': {
    name: 'Matrix',
    icon: '🔴',
    color: 'text-green-400',
    borderColor: 'border-green-400',
    groups: ['intro', 'red-pill', 'blue-pill', 'training', 'choice', 'awakening', 'factions', 'ghost-layer', 'echo', 'convergence', 'dynamic', 'finale', 'investigation', 'authority', 'compliance']
  },
  'witcher': {
    name: 'Witcher',
    icon: '⚔️',
    color: 'text-amber-400',
    borderColor: 'border-amber-400', 
    groups: ['witcher', 'kaer-morhen', 'novigrad', 'skellige']
  },
  'nightcity': {
    name: 'Night City',
    icon: '🌆',
    color: 'text-purple-400',
    borderColor: 'border-purple-400',
    groups: ['night-city', 'nightcity', 'corpo', 'street', 'nomad']
  }
};

// Priority Color Mapping
const PRIORITY_COLORS = {
  'CRITICAL': 'border-l-red-500 bg-red-500/10',
  'HIGH': 'border-l-orange-500 bg-orange-500/10',
  'MEDIUM': 'border-l-yellow-500 bg-yellow-500/10', 
  'LOW': 'border-l-green-500 bg-green-500/10'
};

// Mini Progress Bar Component
const QualityProgress = ({ score }) => {
  const percentage = (score / 10) * 100;
  const getColor = (score) => {
    if (score >= 9) return 'bg-green-400';
    if (score >= 7) return 'bg-yellow-400';
    if (score >= 5) return 'bg-orange-400';
    return 'bg-red-400';
  };
  
  return (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full transition-all duration-500 ${getColor(score)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const NodeScoreProgress = ({ score }) => {
  const percentage = score;
  return (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-cyan-400 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Quality Score Badge Component
const QualityBadge = ({ score }) => {
  const getColor = (score) => {
    if (score >= 9) return 'bg-green-500 text-white';
    if (score >= 7) return 'bg-yellow-500 text-black';
    if (score >= 5) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
  };
  
  return (
    <span className={`
      px-2 py-1 rounded-full text-xs font-bold font-mono
      ${getColor(score)}
    `}>
      {score.toFixed(1)}
    </span>
  );
};

// Real-time Node Score badge
const NodeScoreBadge = ({ score }) => {
  const color = getScoreColor(score);
  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-bold font-mono"
      style={{ backgroundColor: color }}
    >
      {score}
    </span>
  );
};

// Executive Node Card Component
const ExecutiveNodeCard = ({ node, onView, onEdit }) => {
  const quality = calculateNodeQuality(node);
  const { score: nodeScore, contributions } = calculateNodeScore(node, edges);
  const improvements = getNextImprovements(node, 2);
  const navigate = useNavigate();
  const [showJson, setShowJson] = useState(false);
  const edgeInfo = useMemo(() => {
    return edges.reduce((acc, e) => {
      if (e.source === node.id) acc.out++;
      if (e.target === node.id) acc.in++;
      return acc;
    }, { in: 0, out: 0 });
  }, [node.id]);
  
  const getWorldIcon = (group) => {
    for (const [worldKey, world] of Object.entries(WORLD_GROUPS)) {
      if (world.groups.includes(group)) {
        return world.icon;
      }
    }
    return '🔵';
  };

  const lastUpdated = node.data?.enhancement?.updatedAt || 
                     node.data?.lastModified || 
                     null;

  const formatDate = (date) => {
    if (!date) return 'Unknown';
    if (date === 'Never') return 'Never';
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown';
    }
  };

  const getNodeStatus = () => {
    return node.data?.enhancement?.status || node.data?.status || 'stub';
  };

  const getNodePriority = () => {
    return node.data?.enhancement?.priority?.toUpperCase() || quality.priority;
  };

  const handleView = () => {
    if (node.data?.pageUrl) {
      navigate(node.data.pageUrl);
    } else {
      onView(node);
    }
  };

  const getEnhancementTooltip = () => {
    if (!node.data?.enhancement) return 'No enhancement data';
    return JSON.stringify(node.data.enhancement, null, 2);
  };

  const nodeStatus = getNodeStatus();
  const nodePriority = getNodePriority();

  return (
    <div className={`
      relative bg-gray-900 border-2 border-gray-700 rounded-xl p-3
      hover:border-cyan-400 transition-all duration-300 group shadow
      hover:shadow-xl hover:-translate-y-0.5 transform-gpu
      border-l-4 ${PRIORITY_COLORS[nodePriority]}
      ${['CRITICAL','HIGH'].includes(nodePriority) ? 'animate-pulse-glow' : ''}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{getWorldIcon(node.group)}</span>
            {node.data?.hasWorldVariant && (
              <span title="Has world variant">🌍</span>
            )}
            <h3 className="text-white font-semibold text-base truncate">
              {node.data?.title || node.id}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span
              title={`Status: ${STATUS_LABELS[nodeStatus]} (from enhancement.status)`}
              className="cursor-help"
            >
              {STATUS_ICONS[nodeStatus]} {STATUS_LABELS[nodeStatus]}
            </span>
            <span>•</span>
            <span className="capitalize">{node.type}</span>
            <span
              className="ml-1 bg-gray-700 text-gray-300 px-1 rounded text-[10px]"
              title="Inbound/Outbound edges"
            >
              {edgeInfo.in}/{edgeInfo.out}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div title={`Quality Score: ${quality.overall.toFixed(1)}/10`} className="cursor-help">
            <QualityBadge score={quality.overall} />
          </div>
          <div
            title={Object.entries(contributions).map(([k,v]) => `${k}: ${v}%`).join('\n')}
            className="cursor-help"
          >
            <NodeScoreBadge score={nodeScore} />
          </div>
        </div>
      </div>

      {/* Quality Progress */}
      <div className="mb-3">
        <QualityProgress score={quality.overall} />
        <NodeScoreProgress score={nodeScore} />
      </div>

      {/* Priority & Stats */}
      <div className="flex items-center justify-between mb-3">
        <span 
          className={`
            px-2 py-1 rounded text-xs font-bold cursor-help
            ${nodePriority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
              nodePriority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
              nodePriority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'}
          `}
          title={`Priority: ${nodePriority} (from enhancement.priority)`}
        >
          {nodePriority}
        </span>
        <span className="text-xs text-gray-500">
          {improvements.length > 0 ? `${improvements.length} improvements` : 'No improvements'}
        </span>
      </div>

      {/* Last Updated */}
      <div className="text-xs mb-3">
        <span className={lastUpdated ? 'text-gray-500' : 'text-gray-600'}>
          Updated: {formatDate(lastUpdated)}
        </span>
      </div>

      {/* Enhancement JSON Modal Trigger */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setShowJson(true)}
          className="text-xs text-cyan-400 hover:text-cyan-300 underline"
        >
          📋 View enhancement JSON
        </button>
      </div>

      {showJson && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-400 rounded-xl p-6 max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Enhancement JSON</h2>
              <button
                onClick={() => setShowJson(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <pre className="text-xs whitespace-pre-wrap">
{JSON.stringify(node.data?.enhancement, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs py-2 px-3 rounded transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(node)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs py-2 px-3 rounded transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

// Edit Node Modal
const EditNodeModal = ({ node, onSave, onClose }) => {
  const [editData, setEditData] = useState({
    qualityRating: node.data?.enhancement?.qualityRating || 5,
    status: node.data?.enhancement?.status || node.data?.status || 'stub',
    notes: node.data?.enhancement?.notes || '',
    priority: calculateNodeQuality(node).priority
  });

  const handleSave = () => {
    onSave(node.id, editData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-cyan-400 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            Edit Node: {node.data?.title || node.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Quality Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quality Rating (0-10)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={editData.qualityRating}
              onChange={(e) => setEditData(prev => ({ ...prev, qualityRating: parseFloat(e.target.value) }))}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status (will update enhancement.status)
            </label>
            <select
              value={editData.status}
              onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
            >
              <option value="stub">🟥 Stub</option>
              <option value="wip">🟨 WIP</option>
              <option value="live">🟩 Live</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={editData.notes}
              onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-20"
              placeholder="Add notes about this node..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// World Filter Component
const WorldFilter = ({ selectedWorlds, onChange, onToggle, isCollapsed }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 md:sticky top-2">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left text-white font-medium"
      >
        <span>🌍 Worlds</span>
        <span className="text-gray-400">
          {isCollapsed ? '▼' : '▲'}
        </span>
      </button>
      
      {!isCollapsed && (
        <div className="mt-3 space-y-2">
          {Object.entries(WORLD_GROUPS).map(([key, world]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedWorlds.includes(key)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...selectedWorlds, key]);
                  } else {
                    onChange(selectedWorlds.filter(w => w !== key));
                  }
                }}
                className="text-cyan-400"
              />
              <span className="text-sm flex items-center gap-1">
                <span>{world.icon}</span>
                <span className={world.color}>{world.name}</span>
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Executive Quality Dashboard
export default function QualityDashboard() {
  const { currentWorld } = useTheme();
  const [selectedWorlds, setSelectedWorlds] = useState(['matrix', 'witcher', 'nightcity']);
  const [selectedPriorities, setSelectedPriorities] = useState(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);
  const [selectedStatuses, setSelectedStatuses] = useState(['live', 'wip', 'stub']);
  const [worldFilterCollapsed, setWorldFilterCollapsed] = useState(false);
  const [editingNode, setEditingNode] = useState(null);
  const [viewingNode, setViewingNode] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [sortConfig, setSortConfig] = useState([
    { key: 'updatedAt', direction: 'desc' },
    { key: 'quality', direction: 'desc' }
  ]);

  const report = useMemo(() => generateQualityReport(realMatrixNodes), []);

  // Enhanced filtering logic
  const filteredNodes = useMemo(() => {
    return realMatrixNodes.filter(node => {
      // World filtering
      const nodeWorld = Object.keys(WORLD_GROUPS).find(worldKey => 
        WORLD_GROUPS[worldKey].groups.includes(node.group)
      ) || 'matrix';
      
      if (!selectedWorlds.includes(nodeWorld)) return false;

      // Status filtering - consistent with getNodeStatus() logic
      const nodeStatus = node.data?.enhancement?.status || node.data?.status || 'stub';
      if (!selectedStatuses.includes(nodeStatus)) return false;

      // Priority filtering
      const quality = calculateNodeQuality(node);
      if (!selectedPriorities.includes(quality.priority)) return false;

      return true;
    });
  }, [selectedWorlds, selectedStatuses, selectedPriorities]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const total = filteredNodes.length;
    // Use consistent status logic for KPIs too
    const stubCount = filteredNodes.filter(n => {
      const nodeStatus = n.data?.enhancement?.status || n.data?.status || 'stub';
      return nodeStatus === 'stub';
    }).length;
    const wipCount = filteredNodes.filter(n => {
      const nodeStatus = n.data?.enhancement?.status || n.data?.status || 'stub';
      return nodeStatus === 'wip';
    }).length;
    const liveCount = filteredNodes.filter(n => {
      const nodeStatus = n.data?.enhancement?.status || n.data?.status || 'stub';
      return nodeStatus === 'live';
    }).length;
    
    const avgQuality = filteredNodes.reduce((sum, node) => {
      return sum + calculateNodeQuality(node).overall;
    }, 0) / total || 0;

    const upgradedCount = filteredNodes.filter(n => {
      const nodeStatus = n.data?.enhancement?.status || n.data?.status || 'stub';
      return ['live', 'wip'].includes(nodeStatus);
    }).length;
    const percentUpgraded = total ? (upgradedCount / total) * 100 : 0;

    const priorityCounts = {
      CRITICAL: filteredNodes.filter(n => calculateNodeQuality(n).priority === 'CRITICAL').length,
      HIGH: filteredNodes.filter(n => calculateNodeQuality(n).priority === 'HIGH').length,
      MEDIUM: filteredNodes.filter(n => calculateNodeQuality(n).priority === 'MEDIUM').length,
      LOW: filteredNodes.filter(n => calculateNodeQuality(n).priority === 'LOW').length
    };

    return {
      total,
      stubCount,
      wipCount,
      liveCount,
      avgQuality,
      priorityCounts,
      percentUpgraded
    };
  }, [filteredNodes]);

  const sortedNodes = useMemo(() => {
    return [...filteredNodes].sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        let valA;
        let valB;
        if (key === 'updatedAt') {
          valA = new Date(
            a.data?.enhancement?.updatedAt || a.data?.lastModified || 0
          ).getTime();
          valB = new Date(
            b.data?.enhancement?.updatedAt || b.data?.lastModified || 0
          ).getTime();
        } else if (key === 'quality') {
          valA = calculateNodeQuality(a).overall;
          valB = calculateNodeQuality(b).overall;
        } else {
          valA = 0;
          valB = 0;
        }
        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredNodes, sortConfig]);

  // Display logic - show max 12 nodes by default
  const displayNodes = showMore ? sortedNodes : sortedNodes.slice(0, 12);

  const handleSaveEdit = (nodeId, editData) => {
    // In a real app, this would update the data source
    console.log('Saving edit for node:', nodeId, editData);
    // For now, just log the change
  };

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      const existing = prev.find((p) => p.key === key);
      const direction = existing && existing.direction === 'desc' ? 'asc' : 'desc';
      const newConfig = [{ key, direction }, ...prev.filter((p) => p.key !== key)];
      return newConfig;
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-2">
              Executive Quality Dashboard
            </h1>
            <p className="text-gray-400">
              Command view for systematic node enhancement • Current World: {WORLD_GROUPS[currentWorld]?.icon} {WORLD_GROUPS[currentWorld]?.name}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Showing {displayNodes.length} of {filteredNodes.length} nodes
          </div>
        </div>

        {/* Top-Level KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-gray-900 border border-cyan-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{kpis.total}</div>
            <div className="text-xs text-gray-400">Total Nodes</div>
          </div>
          
          <div className="bg-gray-900 border border-red-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{kpis.stubCount}</div>
            <div className="text-xs text-gray-400">🟥 Stub</div>
          </div>
          
          <div className="bg-gray-900 border border-yellow-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{kpis.wipCount}</div>
            <div className="text-xs text-gray-400">🟨 WIP</div>
          </div>
          
          <div className="bg-gray-900 border border-green-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{kpis.liveCount}</div>
            <div className="text-xs text-gray-400">🟩 Live</div>
          </div>
          
          <div className="bg-purple-700/40 border border-purple-500 rounded-lg p-4 text-center">
            <div className="text-2xl font-extrabold text-white">{kpis.avgQuality.toFixed(1)}</div>
            <div className="text-xs text-purple-200">Avg Quality</div>
          </div>
          
          <div className="bg-gray-900 border border-orange-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{kpis.priorityCounts.CRITICAL + kpis.priorityCounts.HIGH}</div>
            <div className="text-xs text-gray-400">High Priority</div>
          </div>
          
          <div className="bg-gray-900 border border-gray-400 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{kpis.priorityCounts.MEDIUM + kpis.priorityCounts.LOW}</div>
            <div className="text-xs text-gray-400">Low Priority</div>
          </div>
          <div className="bg-gray-900 border border-cyan-500 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-500">{kpis.percentUpgraded.toFixed(1)}%</div>
            <div className="text-xs text-gray-400">Upgraded</div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => toggleSort('updatedAt')}
            className="text-sm text-cyan-300"
          >
            Updated {sortConfig[0].key === 'updatedAt' ? (sortConfig[0].direction === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button
            onClick={() => toggleSort('quality')}
            className="text-sm text-cyan-300"
          >
            Quality {sortConfig[0].key === 'quality' ? (sortConfig[0].direction === 'asc' ? '▲' : '▼') : ''}
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <WorldFilter
            selectedWorlds={selectedWorlds}
            onChange={setSelectedWorlds}
            onToggle={() => setWorldFilterCollapsed(!worldFilterCollapsed)}
            isCollapsed={worldFilterCollapsed}
          />
          
          {/* Status Filter */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 md:sticky top-2">
            <div className="text-white font-medium mb-3">📊 Status</div>
            <div className="flex gap-2">
              {['live', 'wip', 'stub'].map(status => (
                <label key={status} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatuses([...selectedStatuses, status]);
                      } else {
                        setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                      }
                    }}
                    className="text-cyan-400"
                  />
                  <span className="text-sm">{STATUS_ICONS[status]} {STATUS_LABELS[status]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 md:sticky top-2">
            <div className="text-white font-medium mb-3">⚡ Priority</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(ENHANCEMENT_PRIORITY).map(priority => (
                <label key={priority} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPriorities.includes(priority)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPriorities([...selectedPriorities, priority]);
                      } else {
                        setSelectedPriorities(selectedPriorities.filter(p => p !== priority));
                      }
                    }}
                    className="text-cyan-400"
                  />
                  <span className="text-xs">{priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {displayNodes.map(node => (
            <ExecutiveNodeCard
              key={node.id}
              node={node}
              onView={setViewingNode}
              onEdit={setEditingNode}
            />
          ))}
        </div>

        {/* Show More Button */}
        {filteredNodes.length > 12 && (
          <div className="text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-gray-800 hover:bg-gray-700 text-cyan-400 px-6 py-2 rounded-lg transition-colors"
            >
              {showMore ? 'Show Less' : `Show ${filteredNodes.length - 12} More Nodes`}
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onSave={handleSaveEdit}
          onClose={() => setEditingNode(null)}
        />
      )}

      {/* View Modal */}
      {viewingNode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-cyan-400 rounded-xl p-6 max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                {viewingNode.data?.title || viewingNode.id}
              </h2>
              <button
                onClick={() => setViewingNode(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p><strong>Type:</strong> {viewingNode.type}</p>
              <p><strong>Group:</strong> {viewingNode.group}</p>
              <p><strong>Status:</strong> {STATUS_ICONS[viewingNode.data?.status]} {STATUS_LABELS[viewingNode.data?.status]}</p>
              <p><strong>Summary:</strong> {viewingNode.data?.summary || 'No summary available'}</p>
              <p><strong>Quality:</strong> {calculateNodeQuality(viewingNode).overall.toFixed(1)}/10</p>
            </div>
          </div>
        </div>
      )}
      <DiagnosticOverlay />
    </div>
  );
}
