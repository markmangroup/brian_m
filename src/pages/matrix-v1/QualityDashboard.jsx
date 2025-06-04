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
import { useColorMode } from '../../theme/ColorModeContext';
import DiagnosticOverlay from './DiagnosticOverlay';
import { getWorldDialogue, getWorldSummary, getWorldCharacters } from '../../utils/worldContentLoader';

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

// World Group Mapping with enhanced theme awareness
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

// Enhanced Theme-aware Priority Color Mapping
const getPriorityClasses = (priority, colorMode) => {
  const baseClasses = 'border-l-4';
  
  // Use CSS variables for consistent theming
  const priorityStyles = {
    'CRITICAL': colorMode === 'light' 
      ? 'border-l-red-700 bg-red-50' 
      : 'border-l-red-400 bg-red-500/10',
    'HIGH': colorMode === 'light' 
      ? 'border-l-orange-700 bg-orange-50' 
      : 'border-l-orange-400 bg-orange-500/10',
    'MEDIUM': colorMode === 'light' 
      ? 'border-l-yellow-700 bg-yellow-50' 
      : 'border-l-yellow-400 bg-yellow-500/10',
    'LOW': colorMode === 'light' 
      ? 'border-l-green-700 bg-green-50' 
      : 'border-l-green-400 bg-green-500/10'
  };
  
  return `${baseClasses} ${priorityStyles[priority] || priorityStyles.LOW}`;
};

// Enhanced Progress Bar Component with better contrast
const QualityProgress = ({ score }) => {
  const { colorMode } = useColorMode();
  const percentage = (score / 10) * 100;
  
  const getProgressColor = (score, mode) => {
    if (mode === 'light') {
      if (score >= 9) return 'bg-green-600';
      if (score >= 7) return 'bg-yellow-600'; 
      if (score >= 5) return 'bg-orange-600';
      return 'bg-red-600';
    } else {
      if (score >= 9) return 'bg-green-400';
      if (score >= 7) return 'bg-yellow-400';
      if (score >= 5) return 'bg-orange-400';
      return 'bg-red-400';
    }
  };
  
  const getBackgroundColor = (mode) => {
    return mode === 'light' ? 'bg-gray-200' : 'bg-theme-tertiary';
  };
  
  return (
    <div className={`w-full rounded-full h-2 overflow-hidden ${getBackgroundColor(colorMode)}`}>
      <div 
        className={`h-full transition-all duration-500 ${getProgressColor(score, colorMode)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const NodeScoreProgress = ({ score }) => {
  const { colorMode } = useColorMode();
  const percentage = score;
  
  const getProgressColor = (mode) => {
    return mode === 'light' ? 'bg-blue-600' : 'bg-theme-primary';
  };
  
  const getBackgroundColor = (mode) => {
    return mode === 'light' ? 'bg-gray-200' : 'bg-theme-tertiary';
  };
  
  return (
    <div className={`w-full rounded-full h-2 overflow-hidden ${getBackgroundColor(colorMode)}`}>
      <div
        className={`h-full transition-all duration-500 ${getProgressColor(colorMode)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Enhanced Quality Score Badge Component with better contrast
const QualityBadge = ({ score }) => {
  const { colorMode } = useColorMode();
  
  const getBadgeStyles = (score, mode) => {
    if (mode === 'light') {
      if (score >= 9) return 'bg-green-600 text-white';
      if (score >= 7) return 'bg-yellow-600 text-white';
      if (score >= 5) return 'bg-orange-600 text-white';
      return 'bg-red-600 text-white';
    } else {
      if (score >= 9) return 'bg-green-500 text-black';
      if (score >= 7) return 'bg-yellow-500 text-black';
      if (score >= 5) return 'bg-orange-500 text-white';
      return 'bg-red-500 text-white';
    }
  };
  
  return (
    <span className={`
      px-2 py-1 rounded-full text-xs font-bold font-mono
      ${getBadgeStyles(score, colorMode)}
    `}>
      {score.toFixed(1)}
    </span>
  );
};

// Enhanced Node Score badge with dynamic color
const NodeScoreBadge = ({ score }) => {
  const { colorMode } = useColorMode();
  
  const getScoreBadgeStyles = (mode) => {
    return mode === 'light' 
      ? 'bg-blue-600 text-white' 
      : 'bg-blue-400 text-black';
  };
  
  return (
    <span className={`
      px-2 py-1 rounded-full text-xs font-bold font-mono
      ${getScoreBadgeStyles(colorMode)}
    `}>
      {score}
    </span>
  );
};

// Enhanced Executive Node Card Component with complete theme awareness
const ExecutiveNodeCard = ({ node, onView, onEdit }) => {
  const { currentWorld } = useTheme();
  const { colorMode } = useColorMode();
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

  // Enhanced priority indicator with better contrast
  const getPriorityIndicatorStyles = (priority, mode) => {
    const baseClasses = 'absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded';
    
    if (mode === 'light') {
      switch(priority) {
        case 'CRITICAL': return `${baseClasses} bg-red-100 text-red-800 border border-red-300`;
        case 'HIGH': return `${baseClasses} bg-orange-100 text-orange-800 border border-orange-300`;
        case 'MEDIUM': return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-300`;
        default: return `${baseClasses} bg-green-100 text-green-800 border border-green-300`;
      }
    } else {
      switch(priority) {
        case 'CRITICAL': return `${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`;
        case 'HIGH': return `${baseClasses} bg-orange-500/20 text-orange-300 border border-orange-500/30`;
        case 'MEDIUM': return `${baseClasses} bg-yellow-500/20 text-yellow-300 border border-yellow-500/30`;
        default: return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`;
      }
    }
  };

  return (
    <div className={`
      relative rounded-xl p-3 hover:border-theme-primary transition-all duration-300 group 
      shadow hover:shadow-xl hover:-translate-y-0.5 transform-gpu
      bg-theme-secondary border-2 border-theme-accent text-theme-bright
      ${getPriorityClasses(nodePriority, colorMode)}
    `}>
      {/* Enhanced Priority Indicator */}
      <div className={getPriorityIndicatorStyles(nodePriority, colorMode)}>
        {nodePriority}
      </div>

      {/* Top Section with enhanced readability */}
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

      {/* Quality & Score Section with enhanced contrast */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-theme-secondary font-medium">Quality</span>
          <QualityBadge score={quality.overall} />
        </div>
        <QualityProgress score={quality.overall} />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-theme-secondary font-medium">Node Score</span>
          <NodeScoreBadge score={nodeScore} />
        </div>
        <NodeScoreProgress score={nodeScore} />
      </div>

      {/* Enhanced Metadata with better contrast */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div>
          <span className="text-theme-muted font-medium">Type:</span>
          <span className="ml-1 text-theme-bright">{node.type}</span>
        </div>
        <div>
          <span className="text-theme-muted font-medium">Depth:</span>
          <span className="ml-1 text-theme-bright">{node.depth}</span>
        </div>
        <div>
          <span className="text-theme-muted font-medium">Status:</span>
          <span className="ml-1">{STATUS_ICONS[nodeStatus]} <span className="text-theme-bright">{STATUS_LABELS[nodeStatus]}</span></span>
        </div>
        <div>
          <span className="text-theme-muted font-medium">Edges:</span>
          <span className="ml-1 text-theme-bright">{edgeInfo.in}→{edgeInfo.out}</span>
        </div>
      </div>

      {/* Updated Date with better visibility */}
      <div className="text-xs text-theme-muted mb-3 font-medium">
        <span>Updated: <span className="text-theme-secondary">{formatDate(lastUpdated)}</span></span>
      </div>

      {/* Next Improvements with enhanced readability */}
      {improvements.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-theme-secondary mb-1 font-medium">Next Improvements:</div>
          <ul className="text-xs text-theme-muted space-y-1">
            {improvements.slice(0, 2).map((improvement, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-theme-accent mr-1 font-bold">•</span>
                <span className="leading-tight text-theme-bright">
                  {typeof improvement === 'string' ? improvement : improvement.description || improvement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Enhanced Action Buttons with better contrast */}
      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="flex-1 btn-theme-primary text-xs font-medium focus-theme"
        >
          {node.data?.pageUrl ? 'View Page' : 'Details'}
        </button>
        <button
          onClick={() => onEdit(node)}
          className="px-3 py-2 border-2 border-theme-accent text-theme-accent rounded text-xs font-medium
                     hover:bg-theme-accent hover:text-theme-inverse transition-colors focus-theme"
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

// Enhanced Edit Node Modal with better theme support
const EditNodeModal = ({ node, onSave, onClose }) => {
  const { colorMode } = useColorMode();
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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-secondary border-2 border-theme-primary text-theme-bright rounded-xl p-6 max-w-lg w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-theme-bright">
            Edit Node: {node.id}
          </h2>
          <button
            onClick={onClose}
            className="text-theme-muted hover:text-theme-bright text-2xl transition-colors focus-theme"
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
              className="input-theme w-full focus-theme"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-1">Summary</label>
            <textarea
              value={editData.summary}
              onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
              rows={3}
              className="input-theme w-full focus-theme"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-1">Status</label>
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                className="input-theme w-full focus-theme"
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
                className="input-theme w-full focus-theme"
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
            className="flex-1 btn-theme-primary focus-theme"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 border-2 border-theme-accent text-theme-accent py-2 px-4 rounded font-medium 
                       hover:bg-theme-accent hover:text-theme-inverse transition-colors focus-theme"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced World Filter Component
const WorldFilter = ({ selectedWorlds, onChange, onToggle, isCollapsed }) => {
  const { colorMode } = useColorMode();
  
  return (
    <div className="bg-theme-secondary border-2 border-theme-accent rounded-lg p-3 md:sticky top-2">
      <div className="flex items-center justify-between">
        <div className="text-theme-bright font-medium">🌍 Worlds</div>
        <button
          onClick={onToggle}
          className="text-theme-muted hover:text-theme-secondary transition-colors md:hidden focus-theme"
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
                className="w-4 h-4 text-theme-primary focus:ring-theme-primary focus:ring-2 rounded border-theme-accent"
              />
              <span className="text-sm text-theme-bright">
                {world.icon} {world.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Executive Quality Dashboard with complete theme integration
export default function QualityDashboard() {
  const { currentWorld } = useTheme();
  const { colorMode } = useColorMode();
  
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

  // Calculate KPIs with consistent status logic
  const kpis = useMemo(() => {
    const statusCounts = filteredNodes.reduce((acc, node) => {
      const status = node.data?.enhancement?.status || node.data?.status || 'stub';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const qualities = filteredNodes.map(node => calculateNodeQuality(node).overall);
    const avgQuality = qualities.length > 0 ? qualities.reduce((sum, q) => sum + q, 0) / qualities.length : 0;

    const priorityCounts = filteredNodes.reduce((acc, node) => {
      const priority = calculateNodeQuality(node).priority;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 });

    const upgradedCount = filteredNodes.filter(node => 
      node.data?.enhancement && Object.keys(node.data.enhancement).length > 0
    ).length;
    const percentUpgraded = filteredNodes.length > 0 ? (upgradedCount / filteredNodes.length) * 100 : 0;

    return {
      total: filteredNodes.length,
      stubCount: statusCounts.stub || 0,
      wipCount: statusCounts.wip || 0,
      liveCount: statusCounts.live || 0,
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

  // Enhanced KPI card styling with better contrast
  const getKpiCardStyles = (type, mode) => {
    const baseClasses = 'border-2 rounded-lg p-4 text-center transition-colors duration-300';
    
    if (mode === 'light') {
      switch(type) {
        case 'total': return `${baseClasses} bg-white border-gray-300 shadow-sm`;
        case 'stub': return `${baseClasses} bg-red-50 border-red-200`;
        case 'wip': return `${baseClasses} bg-yellow-50 border-yellow-200`;
        case 'live': return `${baseClasses} bg-green-50 border-green-200`;
        case 'quality': return `${baseClasses} bg-blue-50 border-blue-200`;
        case 'high-priority': return `${baseClasses} bg-orange-50 border-orange-200`;
        case 'low-priority': return `${baseClasses} bg-gray-50 border-gray-200`;
        case 'upgraded': return `${baseClasses} bg-purple-50 border-purple-200`;
        default: return `${baseClasses} bg-white border-gray-300`;
      }
    } else {
      switch(type) {
        case 'total': return `${baseClasses} bg-theme-secondary border-theme-primary`;
        case 'stub': return `${baseClasses} bg-theme-secondary border-red-400`;
        case 'wip': return `${baseClasses} bg-theme-secondary border-yellow-400`;
        case 'live': return `${baseClasses} bg-theme-secondary border-green-400`;
        case 'quality': return `${baseClasses} bg-theme-accent/20 border-theme-primary`;
        case 'high-priority': return `${baseClasses} bg-theme-secondary border-orange-400`;
        case 'low-priority': return `${baseClasses} bg-theme-secondary border-theme-accent`;
        case 'upgraded': return `${baseClasses} bg-theme-secondary border-theme-primary`;
        default: return `${baseClasses} bg-theme-secondary border-theme-accent`;
      }
    }
  };

  // Enhanced KPI value styling with better contrast
  const getKpiValueStyles = (type, mode) => {
    if (mode === 'light') {
      switch(type) {
        case 'total': return 'text-gray-900 font-bold text-2xl';
        case 'stub': return 'text-red-700 font-bold text-2xl';
        case 'wip': return 'text-yellow-700 font-bold text-2xl';
        case 'live': return 'text-green-700 font-bold text-2xl';
        case 'quality': return 'text-blue-700 font-extrabold text-2xl';
        case 'high-priority': return 'text-orange-700 font-bold text-2xl';
        case 'low-priority': return 'text-gray-700 font-bold text-2xl';
        case 'upgraded': return 'text-purple-700 font-bold text-2xl';
        default: return 'text-gray-900 font-bold text-2xl';
      }
    } else {
      switch(type) {
        case 'total': return 'text-theme-primary font-bold text-2xl';
        case 'stub': return 'text-red-400 font-bold text-2xl';
        case 'wip': return 'text-yellow-400 font-bold text-2xl';
        case 'live': return 'text-green-400 font-bold text-2xl';
        case 'quality': return 'text-theme-bright font-extrabold text-2xl';
        case 'high-priority': return 'text-orange-400 font-bold text-2xl';
        case 'low-priority': return 'text-theme-muted font-bold text-2xl';
        case 'upgraded': return 'text-theme-primary font-bold text-2xl';
        default: return 'text-theme-bright font-bold text-2xl';
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 transition-colors duration-300 bg-theme-primary text-theme-bright" 
         style={{ background: 'var(--world-background)' }}>
      {/* Enhanced Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-theme text-4xl mb-2">
              Executive Quality Dashboard
            </h1>
            <p className="text-theme-secondary">
              Command view for systematic node enhancement • Current World: {WORLD_GROUPS[currentWorld]?.icon} {WORLD_GROUPS[currentWorld]?.name} • Mode: {colorMode}
            </p>
          </div>
          <div className="text-sm text-theme-muted">
            Showing {displayNodes.length} of {filteredNodes.length} nodes
          </div>
        </div>

        {/* Enhanced Top-Level KPIs with better contrast */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <div className={getKpiCardStyles('total', colorMode)}>
            <div className={getKpiValueStyles('total', colorMode)}>{kpis.total}</div>
            <div className="text-xs text-theme-muted font-medium">Total Nodes</div>
          </div>
          
          <div className={getKpiCardStyles('stub', colorMode)}>
            <div className={getKpiValueStyles('stub', colorMode)}>{kpis.stubCount}</div>
            <div className="text-xs text-theme-muted font-medium">🟥 Stub</div>
          </div>
          
          <div className={getKpiCardStyles('wip', colorMode)}>
            <div className={getKpiValueStyles('wip', colorMode)}>{kpis.wipCount}</div>
            <div className="text-xs text-theme-muted font-medium">🟨 WIP</div>
          </div>
          
          <div className={getKpiCardStyles('live', colorMode)}>
            <div className={getKpiValueStyles('live', colorMode)}>{kpis.liveCount}</div>
            <div className="text-xs text-theme-muted font-medium">🟩 Live</div>
          </div>
          
          <div className={getKpiCardStyles('quality', colorMode)}>
            <div className={getKpiValueStyles('quality', colorMode)}>{kpis.avgQuality.toFixed(1)}</div>
            <div className="text-xs text-theme-secondary font-medium">Avg Quality</div>
          </div>
          
          <div className={getKpiCardStyles('high-priority', colorMode)}>
            <div className={getKpiValueStyles('high-priority', colorMode)}>{kpis.priorityCounts.CRITICAL + kpis.priorityCounts.HIGH}</div>
            <div className="text-xs text-theme-muted font-medium">High Priority</div>
          </div>
          
          <div className={getKpiCardStyles('low-priority', colorMode)}>
            <div className={getKpiValueStyles('low-priority', colorMode)}>{kpis.priorityCounts.MEDIUM + kpis.priorityCounts.LOW}</div>
            <div className="text-xs text-theme-muted font-medium">Low Priority</div>
          </div>

          <div className={getKpiCardStyles('upgraded', colorMode)}>
            <div className={getKpiValueStyles('upgraded', colorMode)}>{kpis.percentUpgraded.toFixed(1)}%</div>
            <div className="text-xs text-theme-muted font-medium">Upgraded</div>
          </div>
        </div>

        {/* Enhanced Sort Controls */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => toggleSort('updatedAt')}
            className="text-sm text-theme-secondary hover:text-theme-primary transition-colors focus-theme px-2 py-1 rounded"
          >
            Updated {sortConfig[0].key === 'updatedAt' ? (sortConfig[0].direction === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button
            onClick={() => toggleSort('quality')}
            className="text-sm text-theme-secondary hover:text-theme-primary transition-colors focus-theme px-2 py-1 rounded"
          >
            Quality {sortConfig[0].key === 'quality' ? (sortConfig[0].direction === 'asc' ? '▲' : '▼') : ''}
          </button>
        </div>

        {/* Enhanced Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <WorldFilter
            selectedWorlds={selectedWorlds}
            onChange={setSelectedWorlds}
            onToggle={() => setWorldFilterCollapsed(!worldFilterCollapsed)}
            isCollapsed={worldFilterCollapsed}
          />
          
          {/* Enhanced Status Filter */}
          <div className="bg-theme-secondary border-2 border-theme-accent rounded-lg p-3 md:sticky top-2">
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
                    className="w-4 h-4 text-theme-primary focus:ring-theme-primary focus:ring-2 rounded border-theme-accent"
                  />
                  <span className="text-sm text-theme-bright">{STATUS_ICONS[status]} {STATUS_LABELS[status]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Enhanced Priority Filter */}
          <div className="bg-theme-secondary border-2 border-theme-accent rounded-lg p-3 md:sticky top-2">
            <div className="text-theme-bright font-medium mb-3">⚡ Priority</div>
            <div className="grid grid-cols-2 gap-2">
              {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(priority => (
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
                    className="w-4 h-4 text-theme-primary focus:ring-theme-primary focus:ring-2 rounded border-theme-accent"
                  />
                  <span className="text-xs text-theme-bright">{priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {displayNodes.map(node => (
            <ExecutiveNodeCard
              key={node.id}
              node={node}
              onView={setViewingNode}
              onEdit={setEditingNode}
            />
          ))}
        </div>

        {/* Enhanced Show More Button */}
        {sortedNodes.length > 12 && (
          <div className="text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="btn-theme-secondary focus-theme"
            >
              {showMore ? 'Show Less' : `Show All ${sortedNodes.length} Nodes`}
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Edit Modal */}
      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onSave={handleSaveEdit}
          onClose={() => setEditingNode(null)}
        />
      )}

      {/* Enhanced View Modal */}
      {viewingNode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-theme-secondary border-2 border-theme-primary rounded-xl p-6 max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-theme-bright">
                {viewingNode.data?.title || viewingNode.id}
              </h2>
              <button
                onClick={() => setViewingNode(null)}
                className="text-theme-muted hover:text-theme-bright text-2xl transition-colors focus-theme"
              >
                ×
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-theme-secondary"><strong>Type:</strong> <span className="text-theme-bright">{viewingNode.type}</span></p>
              <p className="text-theme-secondary"><strong>Group:</strong> <span className="text-theme-bright">{viewingNode.group}</span></p>
              <p className="text-theme-secondary"><strong>Status:</strong> <span className="text-theme-bright">{STATUS_ICONS[viewingNode.data?.status]} {STATUS_LABELS[viewingNode.data?.status]}</span></p>
              
              {/* World-aware Summary */}
              <p className="text-theme-secondary">
                <strong>Summary:</strong> 
                <span className="text-theme-bright">
                  {getWorldSummary(viewingNode.data?.summary, currentWorld) || 'No summary available'}
                </span>
              </p>
              
              {/* World-aware Characters */}
              {viewingNode.data?.characters && (
                <p className="text-theme-secondary">
                  <strong>Characters:</strong> 
                  <span className="text-theme-bright">
                    {getWorldCharacters(viewingNode.data.characters, currentWorld).join(', ')}
                  </span>
                </p>
              )}
              
              {/* World-aware Dialogue */}
              {viewingNode.data?.dialogue && (
                <div className="text-theme-secondary">
                  <strong>Dialogue ({currentWorld} theme):</strong>
                  <ul className="mt-1 space-y-1">
                    {getWorldDialogue(viewingNode.data.dialogue, currentWorld).map((line, idx) => (
                      <li key={idx} className="text-theme-bright">• {line}</li>
                    ))}
                  </ul>
                  {/* Show world availability indicator */}
                  {typeof viewingNode.data.dialogue === 'object' && !Array.isArray(viewingNode.data.dialogue) && (
                    <div className="mt-2 text-xs text-theme-muted">
                      Available worlds: {Object.keys(viewingNode.data.dialogue).filter(key => key !== 'default').join(', ')}
                    </div>
                  )}
                </div>
              )}
              
              {/* World-aware content indicator */}
              {viewingNode.data?.features?.hasWorldAwareContent && (
                <div className="bg-theme-info/20 border border-theme-info/30 rounded p-2 mt-3">
                  <div className="text-theme-info text-xs font-medium">
                    🌍 World-Aware Content: This node adapts to different world themes
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
