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
    color: 'text-theme-primary',
    borderColor: 'border-theme-primary',
    groups: ['intro', 'red-pill', 'blue-pill', 'training', 'choice', 'awakening', 'factions', 'ghost-layer', 'echo', 'convergence', 'dynamic', 'finale', 'investigation', 'authority', 'compliance']
  },
  'witcher': {
    name: 'Witcher',
    icon: '⚔️',
    color: 'text-theme-primary',
    borderColor: 'border-theme-primary', 
    groups: ['witcher', 'kaer-morhen', 'novigrad', 'skellige']
  },
  'nightcity': {
    name: 'Night City',
    icon: '🌆',
    color: 'text-theme-primary',
    borderColor: 'border-theme-primary',
    groups: ['night-city', 'nightcity', 'corpo', 'street', 'nomad']
  }
};

// Theme-aware Priority Color Mapping
const getPriorityClasses = (priority, currentWorld) => {
  const baseClasses = {
    'CRITICAL': 'border-l-4',
    'HIGH': 'border-l-4', 
    'MEDIUM': 'border-l-4',
    'LOW': 'border-l-4'
  };
  
  // Use CSS variables for theme-aware colors
  const priorityColors = {
    'CRITICAL': currentWorld === 'witcher' ? 'border-l-red-600' : 'border-l-red-400',
    'HIGH': currentWorld === 'witcher' ? 'border-l-orange-600' : 'border-l-orange-400',
    'MEDIUM': currentWorld === 'witcher' ? 'border-l-yellow-600' : 'border-l-yellow-400',
    'LOW': 'border-l-green-400'
  };
  
  const bgColors = {
    'CRITICAL': 'bg-red-500/10',
    'HIGH': 'bg-orange-500/10',
    'MEDIUM': 'bg-yellow-500/10',
    'LOW': 'bg-green-500/10'
  };
  
  return `${baseClasses[priority]} ${priorityColors[priority]} ${bgColors[priority]}`;
};

// Mini Progress Bar Component - Theme Aware
const QualityProgress = ({ score }) => {
  const { currentWorld } = useTheme();
  const percentage = (score / 10) * 100;
  
  const getColor = (score, world) => {
    if (score >= 9) return world === 'witcher' ? 'bg-green-600' : 'bg-green-400';
    if (score >= 7) return world === 'witcher' ? 'bg-yellow-600' : 'bg-yellow-400';
    if (score >= 5) return world === 'witcher' ? 'bg-orange-600' : 'bg-orange-400';
    return world === 'witcher' ? 'bg-red-600' : 'bg-red-400';
  };
  
  return (
    <div className={`w-full rounded-full h-2 overflow-hidden ${
      currentWorld === 'witcher' ? 'bg-amber-900/40' : 
      currentWorld === 'nightcity' ? 'bg-purple-900/40' : 'bg-gray-700'
    }`}>
      <div 
        className={`h-full transition-all duration-500 ${getColor(score, currentWorld)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const NodeScoreProgress = ({ score }) => {
  const { currentWorld } = useTheme();
  const percentage = score;
  
  const getProgressColor = (world) => {
    switch(world) {
      case 'witcher': return 'bg-amber-500';
      case 'nightcity': return 'bg-purple-400';
      default: return 'bg-green-400';
    }
  };
  
  return (
    <div className={`w-full rounded-full h-2 overflow-hidden ${
      currentWorld === 'witcher' ? 'bg-amber-900/40' : 
      currentWorld === 'nightcity' ? 'bg-purple-900/40' : 'bg-gray-700'
    }`}>
      <div
        className={`h-full transition-all duration-500 ${getProgressColor(currentWorld)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Quality Score Badge Component - Theme Aware
const QualityBadge = ({ score }) => {
  const { currentWorld } = useTheme();
  
  const getColor = (score, world) => {
    if (score >= 9) {
      return world === 'witcher' ? 'bg-green-600 text-white' : 
             world === 'nightcity' ? 'bg-green-400 text-black' : 'bg-green-500 text-white';
    }
    if (score >= 7) {
      return world === 'witcher' ? 'bg-yellow-600 text-white' : 
             world === 'nightcity' ? 'bg-yellow-400 text-black' : 'bg-yellow-500 text-black';
    }
    if (score >= 5) {
      return world === 'witcher' ? 'bg-orange-600 text-white' : 
             world === 'nightcity' ? 'bg-orange-400 text-black' : 'bg-orange-500 text-white';
    }
    return world === 'witcher' ? 'bg-red-600 text-white' : 
           world === 'nightcity' ? 'bg-red-400 text-black' : 'bg-red-500 text-white';
  };
  
  return (
    <span className={`
      px-2 py-1 rounded-full text-xs font-bold font-mono
      ${getColor(score, currentWorld)}
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

// Executive Node Card Component - Theme Aware
const ExecutiveNodeCard = ({ node, onView, onEdit }) => {
  const { currentWorld } = useTheme();
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

  // Theme-aware card styling
  const getCardClasses = (world) => {
    const baseClasses = "relative rounded-xl p-3 hover:border-theme-primary transition-all duration-300 group shadow hover:shadow-xl hover:-translate-y-0.5 transform-gpu";
    
    switch(world) {
      case 'witcher':
        return `${baseClasses} bg-theme-secondary border-2 border-theme-accent text-theme-bright`;
      case 'nightcity':
        return `${baseClasses} bg-theme-secondary border-2 border-theme-accent text-theme-bright`;
      default:
        return `${baseClasses} bg-theme-secondary border-2 border-theme-accent text-theme-bright`;
    }
  };

  return (
    <div className={`
      ${getCardClasses(currentWorld)}
      ${getPriorityClasses(nodePriority, currentWorld)}
    `}>
      {/* Priority Indicator */}
      <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
        nodePriority === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
        nodePriority === 'HIGH' ? 'bg-orange-500/20 text-orange-300' :
        nodePriority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300' :
        'bg-green-500/20 text-green-300'
      }`}>
        {nodePriority}
      </div>

      {/* Top Section */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{getWorldIcon(node.group)}</span>
            <h3 className="font-bold text-sm text-theme-bright leading-tight">
              {node.data?.title || node.id}
            </h3>
          </div>
          <p className="text-xs text-theme-muted mb-2 leading-relaxed">
            {node.data?.summary || 'No summary available'}
          </p>
        </div>
      </div>

      {/* Quality & Score Section */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-theme-secondary">Quality</span>
          <QualityBadge score={quality.overall} />
        </div>
        <QualityProgress score={quality.overall} />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-theme-secondary">Node Score</span>
          <NodeScoreBadge score={nodeScore} />
        </div>
        <NodeScoreProgress score={nodeScore} />
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div>
          <span className="text-theme-muted">Type:</span>
          <span className="ml-1 text-theme-secondary">{node.type}</span>
        </div>
        <div>
          <span className="text-theme-muted">Depth:</span>
          <span className="ml-1 text-theme-secondary">{node.depth}</span>
        </div>
        <div>
          <span className="text-theme-muted">Status:</span>
          <span className="ml-1">{STATUS_ICONS[nodeStatus]} {STATUS_LABELS[nodeStatus]}</span>
        </div>
        <div>
          <span className="text-theme-muted">Edges:</span>
          <span className="ml-1 text-theme-secondary">{edgeInfo.in}→{edgeInfo.out}</span>
        </div>
      </div>

      {/* Updated Date */}
      <div className="text-xs text-theme-muted mb-3">
        <span>Updated: {formatDate(lastUpdated)}</span>
      </div>

      {/* Next Improvements */}
      {improvements.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-theme-secondary mb-1">Next Improvements:</div>
          <ul className="text-xs text-theme-muted space-y-1">
            {improvements.slice(0, 2).map((improvement, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-theme-accent mr-1">•</span>
                <span className="leading-tight">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="flex-1 bg-theme-primary text-theme-inverse px-3 py-2 rounded text-xs font-medium 
                     hover:bg-theme-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent"
        >
          {node.data?.pageUrl ? 'View Page' : 'Details'}
        </button>
        <button
          onClick={() => onEdit(node)}
          className="px-3 py-2 border border-theme-accent text-theme-accent rounded text-xs 
                     hover:bg-theme-accent hover:text-theme-inverse transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent"
        >
          Edit
        </button>
      </div>

      {/* Debug JSON Toggle */}
      <div className="mt-2">
        <button
          onClick={() => setShowJson(!showJson)}
          className="text-xs text-theme-muted hover:text-theme-secondary transition-colors"
        >
          {showJson ? 'Hide' : 'Show'} JSON
        </button>
        {showJson && (
          <pre className="text-xs text-theme-muted mt-2 p-2 bg-theme-tertiary rounded overflow-x-auto">
            {JSON.stringify(node, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

// Edit Node Modal Component - Theme Aware
const EditNodeModal = ({ node, onSave, onClose }) => {
  const { currentWorld } = useTheme();
  const [editData, setEditData] = useState({
    title: node.data?.title || '',
    summary: node.data?.summary || '',
    status: node.data?.enhancement?.status || node.data?.status || 'stub',
    priority: node.data?.enhancement?.priority || 'low'
  });

  const handleSave = () => {
    onSave(node.id, editData);
    onClose();
  };

  // Theme-aware modal styling
  const getModalClasses = (world) => {
    switch(world) {
      case 'witcher':
        return 'bg-theme-secondary border-2 border-theme-primary text-theme-bright';
      case 'nightcity':
        return 'bg-theme-secondary border-2 border-theme-primary text-theme-bright';
      default:
        return 'bg-theme-secondary border-2 border-theme-primary text-theme-bright';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className={`${getModalClasses(currentWorld)} rounded-xl p-6 max-w-lg w-full max-h-96 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-theme-bright">
            Edit Node: {node.id}
          </h2>
          <button
            onClick={onClose}
            className="text-theme-muted hover:text-theme-bright text-2xl transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-1">Title</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full px-3 py-2 bg-theme-tertiary border border-theme-accent rounded text-theme-bright 
                         focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-1">Summary</label>
            <textarea
              value={editData.summary}
              onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-theme-tertiary border border-theme-accent rounded text-theme-bright 
                         focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/50"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-1">Status</label>
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                className="w-full px-3 py-2 bg-theme-tertiary border border-theme-accent rounded text-theme-bright 
                           focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/50"
              >
                <option value="stub">Stub</option>
                <option value="wip">WIP</option>
                <option value="live">Live</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-1">Priority</label>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-theme-tertiary border border-theme-accent rounded text-theme-bright 
                           focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-theme-primary text-theme-inverse py-2 px-4 rounded font-medium 
                       hover:bg-theme-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-theme-accent text-theme-accent py-2 px-4 rounded font-medium 
                       hover:bg-theme-accent hover:text-theme-inverse transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// World Filter Component - Theme Aware
const WorldFilter = ({ selectedWorlds, onChange, onToggle, isCollapsed }) => {
  const { currentWorld } = useTheme();
  
  const getFilterClasses = (world) => {
    switch(world) {
      case 'witcher':
        return 'bg-theme-secondary border border-theme-accent rounded-lg p-3';
      case 'nightcity':
        return 'bg-theme-secondary border border-theme-accent rounded-lg p-3';
      default:
        return 'bg-theme-secondary border border-theme-accent rounded-lg p-3';
    }
  };

  return (
    <div className={`${getFilterClasses(currentWorld)} md:sticky top-2`}>
      <div className="flex items-center justify-between">
        <div className="text-theme-bright font-medium">🌍 Worlds</div>
        <button
          onClick={onToggle}
          className="text-theme-muted hover:text-theme-secondary transition-colors md:hidden"
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="mt-3 space-y-2">
          {Object.entries(WORLD_GROUPS).map(([worldKey, world]) => (
            <label key={worldKey} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedWorlds.includes(worldKey)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...selectedWorlds, worldKey]);
                  } else {
                    onChange(selectedWorlds.filter(w => w !== worldKey));
                  }
                }}
                className="text-theme-primary focus:ring-theme-primary focus:ring-2"
              />
              <span className="text-sm">
                {world.icon} {world.name}
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
  
  // State management
  const [selectedWorlds, setSelectedWorlds] = useState(['matrix', 'witcher', 'nightcity']);
  const [selectedStatuses, setSelectedStatuses] = useState(['live', 'wip', 'stub']);
  const [selectedPriorities, setSelectedPriorities] = useState(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);
  const [worldFilterCollapsed, setWorldFilterCollapsed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sortConfig, setSortConfig] = useState([{ key: 'updatedAt', direction: 'desc' }]);
  const [editingNode, setEditingNode] = useState(null);
  const [viewingNode, setViewingNode] = useState(null);

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
    }, 0) / (total || 1);
    
    const priorityCounts = filteredNodes.reduce((acc, node) => {
      const priority = calculateNodeQuality(node).priority;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});
    
    const percentUpgraded = total > 0 ? (filteredNodes.filter(n => 
      (n.data?.enhancement?.qualityRating || 0) > 6
    ).length / total) * 100 : 0;

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

  // Theme-aware background classes
  const getBackgroundClasses = (world) => {
    // Use CSS variables instead of hardcoded colors
    return 'min-h-screen p-4 md:p-6 transition-colors duration-300';
  };

  // Theme-aware container classes
  const getContainerClasses = (world) => {
    switch(world) {
      case 'witcher':
        return 'bg-theme-primary text-theme-bright';
      case 'nightcity':
        return 'bg-theme-primary text-theme-bright';
      default:
        return 'bg-theme-primary text-theme-bright';
    }
  };

  // Theme-aware KPI card classes
  const getKpiCardClasses = (type) => {
    const baseClasses = 'border-2 rounded-lg p-4 text-center transition-colors duration-300';
    
    switch(type) {
      case 'total':
        return `${baseClasses} bg-theme-secondary border-theme-primary`;
      case 'stub':
        return `${baseClasses} bg-theme-secondary border-red-400`;
      case 'wip':
        return `${baseClasses} bg-theme-secondary border-yellow-400`;
      case 'live':
        return `${baseClasses} bg-theme-secondary border-green-400`;
      case 'quality':
        return `${baseClasses} bg-theme-accent/20 border-theme-primary`;
      case 'high-priority':
        return `${baseClasses} bg-theme-secondary border-orange-400`;
      case 'low-priority':
        return `${baseClasses} bg-theme-secondary border-theme-accent`;
      case 'upgraded':
        return `${baseClasses} bg-theme-secondary border-theme-primary`;
      default:
        return `${baseClasses} bg-theme-secondary border-theme-accent`;
    }
  };

  return (
    <div className={`${getBackgroundClasses(currentWorld)} ${getContainerClasses(currentWorld)}`} 
         style={{ background: 'var(--world-background)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-theme-primary mb-2 font-theme-primary">
              Executive Quality Dashboard
            </h1>
            <p className="text-theme-secondary">
              Command view for systematic node enhancement • Current World: {WORLD_GROUPS[currentWorld]?.icon} {WORLD_GROUPS[currentWorld]?.name}
            </p>
          </div>
          <div className="text-sm text-theme-muted">
            Showing {displayNodes.length} of {filteredNodes.length} nodes
          </div>
        </div>

        {/* Top-Level KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className={getKpiCardClasses('total')}>
            <div className="text-2xl font-bold text-theme-primary">{kpis.total}</div>
            <div className="text-xs text-theme-muted">Total Nodes</div>
          </div>
          
          <div className={getKpiCardClasses('stub')}>
            <div className="text-2xl font-bold text-red-400">{kpis.stubCount}</div>
            <div className="text-xs text-theme-muted">🟥 Stub</div>
          </div>
          
          <div className={getKpiCardClasses('wip')}>
            <div className="text-2xl font-bold text-yellow-400">{kpis.wipCount}</div>
            <div className="text-xs text-theme-muted">🟨 WIP</div>
          </div>
          
          <div className={getKpiCardClasses('live')}>
            <div className="text-2xl font-bold text-green-400">{kpis.liveCount}</div>
            <div className="text-xs text-theme-muted">🟩 Live</div>
          </div>
          
          <div className={getKpiCardClasses('quality')}>
            <div className="text-2xl font-extrabold text-theme-bright">{kpis.avgQuality.toFixed(1)}</div>
            <div className="text-xs text-theme-secondary">Avg Quality</div>
          </div>
          
          <div className={getKpiCardClasses('high-priority')}>
            <div className="text-2xl font-bold text-orange-400">{kpis.priorityCounts.CRITICAL + kpis.priorityCounts.HIGH}</div>
            <div className="text-xs text-theme-muted">High Priority</div>
          </div>
          
          <div className={getKpiCardClasses('low-priority')}>
            <div className="text-2xl font-bold text-theme-muted">{kpis.priorityCounts.MEDIUM + kpis.priorityCounts.LOW}</div>
            <div className="text-xs text-theme-muted">Low Priority</div>
          </div>
          <div className={getKpiCardClasses('upgraded')}>
            <div className="text-2xl font-bold text-theme-primary">{kpis.percentUpgraded.toFixed(1)}%</div>
            <div className="text-xs text-theme-muted">Upgraded</div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => toggleSort('updatedAt')}
            className="text-sm text-theme-secondary hover:text-theme-primary transition-colors"
          >
            Updated {sortConfig[0].key === 'updatedAt' ? (sortConfig[0].direction === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button
            onClick={() => toggleSort('quality')}
            className="text-sm text-theme-secondary hover:text-theme-primary transition-colors"
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
          <div className="bg-theme-secondary border border-theme-accent rounded-lg p-3 md:sticky top-2">
            <div className="text-theme-bright font-medium mb-3">📊 Status</div>
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
                    className="text-theme-primary focus:ring-theme-primary focus:ring-2"
                  />
                  <span className="text-sm text-theme-secondary">{STATUS_ICONS[status]} {STATUS_LABELS[status]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="bg-theme-secondary border border-theme-accent rounded-lg p-3 md:sticky top-2">
            <div className="text-theme-bright font-medium mb-3">⚡ Priority</div>
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
                    className="text-theme-primary focus:ring-theme-primary focus:ring-2"
                  />
                  <span className="text-xs text-theme-secondary">{priority}</span>
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
              className="bg-theme-secondary hover:bg-theme-tertiary text-theme-primary px-6 py-2 rounded-lg 
                         transition-colors border border-theme-accent hover:border-theme-primary 
                         focus:outline-none focus:ring-2 focus:ring-theme-primary"
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
          <div className="bg-theme-secondary border-2 border-theme-primary rounded-xl p-6 max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-theme-bright">
                {viewingNode.data?.title || viewingNode.id}
              </h2>
              <button
                onClick={() => setViewingNode(null)}
                className="text-theme-muted hover:text-theme-bright text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-theme-secondary"><strong>Type:</strong> {viewingNode.type}</p>
              <p className="text-theme-secondary"><strong>Group:</strong> {viewingNode.group}</p>
              <p className="text-theme-secondary"><strong>Status:</strong> {STATUS_ICONS[viewingNode.data?.status]} {STATUS_LABELS[viewingNode.data?.status]}</p>
              <p className="text-theme-secondary"><strong>Summary:</strong> {viewingNode.data?.summary || 'No summary available'}</p>
              {viewingNode.data?.characters && (
                <p className="text-theme-secondary"><strong>Characters:</strong> {viewingNode.data.characters.join(', ')}</p>
              )}
              {viewingNode.data?.dialogue && (
                <div className="text-theme-secondary">
                  <strong>Dialogue:</strong>
                  <ul className="mt-1 space-y-1">
                    {viewingNode.data.dialogue.map((line, idx) => (
                      <li key={idx} className="text-theme-muted">• {line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
