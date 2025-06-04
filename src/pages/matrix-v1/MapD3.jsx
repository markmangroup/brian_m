import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { realMatrixNodes, realMatrixEdges } from './realMatrixFlow';
import { convertToTree, filterTreeByStatus, findPathToNode, validateTreeNoCycles, analyzeTree } from '../../utils/convertToTree';
import { useTheme } from '../../theme/ThemeContext';
import useTreeLayout from './useTreeLayout';
import SidebarFilters from './SidebarFilters';
import DetailPanel from './DetailPanel';
import ZoomControls from './ZoomControls';
import DiagnosticOverlay from './DiagnosticOverlay';
import { getWorldCharacters } from '../../utils/worldContentLoader';

const LAYOUT_TYPES = {
  tree: 'tree',
  cluster: 'cluster',
  radial: 'radial',
  network: 'network'
};

const STATUS_FILTERS = [
  { key: 'live', label: '🟢 Live', color: 'text-green-400' },
  { key: 'wip', label: '🟡 WIP', color: 'text-yellow-400' },
  { key: 'stub', label: '🔴 Stub', color: 'text-red-400' }
];

// Visual Group Overlays for different story sections
const VISUAL_GROUPS = {
  factions: {
    label: 'Factions',
    icon: '⚔️',
    color: 'cyan',
    bgColor: 'bg-cyan-900/10',
    borderColor: 'border-cyan-400/40',
    textColor: 'text-cyan-400',
    nodeIds: ['matrix-zion-fleet', 'matrix-rebel-hackers', 'matrix-oracle-seekers', 'matrix-faction-portal'],
    bounds: { x: 200, y: 300, width: 600, height: 200 }
  },
  ghostLayer: {
    label: 'Ghost Layer',
    icon: '👻',
    color: 'purple',
    bgColor: 'bg-purple-900/10',
    borderColor: 'border-purple-400/40',
    textColor: 'text-purple-400',
    nodeIds: ['matrix-glitch-portal', 'matrix-echo-loop', 'matrix-system-anomaly'],
    bounds: { x: 50, y: 100, width: 400, height: 150 }
  },
  echoFork: {
    label: 'Echo Fork',
    icon: '🔄',
    color: 'amber',
    bgColor: 'bg-amber-900/10',
    borderColor: 'border-amber-400/40',
    textColor: 'text-amber-400',
    nodeIds: ['matrix-echo-chamber', 'matrix-recursive-loop', 'matrix-temporal-anomaly'],
    bounds: { x: 500, y: 50, width: 350, height: 180 }
  },
  mainStory: {
    label: 'Main Story',
    icon: '📖',
    color: 'green',
    bgColor: 'bg-green-900/10',
    borderColor: 'border-green-400/40',
    textColor: 'text-green-400',
    nodeIds: ['matrix-v1-entry', 'matrix-pill-choice', 'matrix-awakening'],
    bounds: { x: 100, y: 500, width: 500, height: 120 }
  },
  nightCity: {
    label: 'Night City',
    icon: '🌆',
    color: 'pink',
    bgColor: 'bg-gradient-to-r from-purple-900/10 via-pink-900/15 to-cyan-900/10',
    borderColor: 'border-pink-400/60',
    textColor: 'text-pink-400',
    nodeIds: ['nc-entry', 'nc-bouncer', 'nc-netdiver', 'nc-escape', 'nc-file', 'nc-silverhand'],
    bounds: { x: 300, y: 700, width: 650, height: 220 },
    isNeon: true, // Special neon effects
    glowIntensity: 'high' // Stronger glow when cyberpunk theme active
  }
};

// Helper function to apply expansion state to tree
function applyExpansionState(tree, expandedNodes) {
  if (!tree) return null;
  
  const isExpanded = expandedNodes.has(tree.id);
  const newNode = { ...tree };
  
  if (tree.children && tree.children.length > 0) {
    if (isExpanded) {
      // Node is expanded, show children
      newNode.children = tree.children.map(child => applyExpansionState(child, expandedNodes));
      newNode._children = null;
    } else {
      // Node is collapsed, hide children
      newNode._children = tree.children;
      newNode.children = null;
    }
  }
  
  return newNode;
}

// Utility function to get initial expanded nodes (auto-expand linear chains)
function getInitialExpandedNodes(nodes, edges, rootId = 'matrix-v1-entry') {
  const expandedSet = new Set();
  
  // Always expand the root
  expandedSet.add(rootId);
  
  // Create a map of node ID to its children for efficient lookup
  const nodeChildren = {};
  edges.forEach(edge => {
    if (!nodeChildren[edge.source]) {
      nodeChildren[edge.source] = [];
    }
    nodeChildren[edge.source].push(edge.target);
  });

  // Create a map of node ID to node data for terminal checking
  const nodeMap = {};
  nodes.forEach(node => {
    nodeMap[node.id] = node;
  });

  // Helper function to check if a node is terminal
  const isTerminalNode = (nodeId) => {
    const node = nodeMap[nodeId];
    return node && (
      node.type === 'ending' || 
      node.data?.features?.hasEnding === true ||
      node.data?.terminal === true
    );
  };

  // Recursively expand linear chains from a given node
  const expandLinearChain = (nodeId, visited = new Set()) => {
    // Prevent infinite loops
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    const children = nodeChildren[nodeId] || [];
    
    // If node is terminal, stop expansion
    if (isTerminalNode(nodeId)) {
      return;
    }
    
    // If node has exactly one child, it's part of a linear chain
    if (children.length === 1) {
      const childId = children[0];
      expandedSet.add(childId);
      expandLinearChain(childId, visited);
    }
    // If node has multiple children, it's a branch point - expand it but stop the chain
    else if (children.length > 1) {
      expandedSet.add(nodeId);
      // Don't continue expanding the children as they are branch options
    }
  };

  // Start expanding from the root
  expandLinearChain(rootId);
  
  return expandedSet;
}

export default function MapD3() {
  const svgRef = useRef();
  const searchInputRef = useRef();
  const { currentTheme, theme, getThemeD3 } = useTheme();
  
  const [layoutType, setLayoutType] = useState(LAYOUT_TYPES.tree);
  const [statusFilter, setStatusFilter] = useState(['live', 'wip', 'stub']);
  const [selectedNode, setSelectedNode] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [initialCentered, setInitialCentered] = useState(false);
  
  // 🛠 DEBUGGING: Temporarily expand ALL nodes instead of using getInitialExpandedNodes()
  // TODO: Revert to: useState(getInitialExpandedNodes(realMatrixNodes, realMatrixEdges))
  const [expandedNodes, setExpandedNodes] = useState(new Set(realMatrixNodes.map(n => n.id)));
  
  // Force layout controls
  const [showForceControls, setShowForceControls] = useState(false);
  const [forceStrength, setForceStrength] = useState(-300);
  const [linkDistance, setLinkDistance] = useState(80);
  const [centerStrength, setCenterStrength] = useState(0.3);
  const [collideRadius, setCollideRadius] = useState(30);
  
  // Visual group states
  const [visibleGroups, setVisibleGroups] = useState(Object.keys(VISUAL_GROUPS));
  const [focusedGroup, setFocusedGroup] = useState(null);
  
  // Layer filter states
  const [showLayerControls, setShowLayerControls] = useState(false);
  const [activeCharacterFilters, setActiveCharacterFilters] = useState([]);
  const [activePuzzleFilters, setActivePuzzleFilters] = useState([]);
  const [activeInteractionFilters, setActiveInteractionFilters] = useState([]);
  const [activeFeatureFilters, setActiveFeatureFilters] = useState([]);

  // Metrics overlay toggle
  const [showMetrics, setShowMetrics] = useState(false);
  
  // Search and UI states
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({
    characters: false, // Keep characters expanded by default
    puzzles: true,
    interactions: true,
    features: true
  });

  // Theme configurations using global theme system
  const themeConfigs = useMemo(() => ({
    matrix: {
      bgColor: 'bg-black',
      primaryColor: 'text-green-400',
      accentColor: 'text-cyan-400',
      nodeColor: getThemeD3('nodeColor') || '#22c55e',
      linkColor: getThemeD3('linkColor') || '#10b981',
      gridOpacity: getThemeD3('gridOpacity') || 0.3
    },
    witcher: {
      bgColor: 'bg-amber-950',
      primaryColor: 'text-amber-400',
      accentColor: 'text-orange-400',
      nodeColor: getThemeD3('nodeColor') || '#f59e0b',
      linkColor: getThemeD3('linkColor') || '#d97706',
      gridOpacity: getThemeD3('gridOpacity') || 0.2
    },
    cyberpunk: {
      bgColor: 'bg-purple-950',
      primaryColor: 'text-purple-400',
      accentColor: 'text-pink-400',
      nodeColor: getThemeD3('nodeColor') || '#a855f7',
      linkColor: getThemeD3('linkColor') || '#c084fc',
      gridOpacity: getThemeD3('gridOpacity') || 0.4
    },
    // Support the new theme naming
    nightcity: {
      bgColor: 'bg-purple-950',
      primaryColor: 'text-purple-400',
      accentColor: 'text-pink-400',
      nodeColor: getThemeD3('nodeColor') || '#a855f7',
      linkColor: getThemeD3('linkColor') || '#c084fc',
      gridOpacity: getThemeD3('gridOpacity') || 0.4
    }
  }), [getThemeD3]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        if (!showLayerControls) {
          setShowLayerControls(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showLayerControls]);

  // Zoom to group functionality
  const zoomToGroup = useCallback((groupKey) => {
    const group = VISUAL_GROUPS[groupKey];
    if (!group || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const { x, y, width, height } = group.bounds;
    
    // Calculate transform to center the group
    const svgRect = svgRef.current.getBoundingClientRect();
    const centerX = svgRect.width / 2;
    const centerY = svgRect.height / 2;
    const groupCenterX = x + width / 2;
    const groupCenterY = y + height / 2;
    
    const scale = Math.min(
      svgRect.width / (width * 1.5),
      svgRect.height / (height * 1.5),
      3 // Max zoom
    );
    
    const translateX = centerX - groupCenterX * scale;
    const translateY = centerY - groupCenterY * scale;
    
    svg.transition()
       .duration(1000)
       .call(
         d3.zoom().transform,
         d3.zoomIdentity.translate(translateX, translateY).scale(scale)
       );
    
    setFocusedGroup(groupKey);
    setTimeout(() => setFocusedGroup(null), 2000);
  }, []);

  // Toggle group visibility
  const toggleGroup = (groupKey) => {
    setVisibleGroups(prev => 
      prev.includes(groupKey) 
        ? prev.filter(g => g !== groupKey)
        : [...prev, groupKey]
    );
  };
  
  // Calculate filter options from nodes data
  const filterOptions = useMemo(() => {
    const { currentWorld } = useTheme();
    const characterCounts = new Map();
    const puzzleCounts = new Map();
    const interactionCounts = new Map();
    const featureCounts = new Map();
    
    realMatrixNodes.forEach(node => {
      // Characters - handle world-aware content
      if (node.data?.characters) {
        const characters = getWorldCharacters(node.data.characters, currentWorld);
        characters.forEach(char => {
          characterCounts.set(char, (characterCounts.get(char) || 0) + 1);
        });
      }
      
      // Puzzles
      if (node.data?.puzzles) {
        node.data.puzzles.forEach(puzzle => {
          puzzleCounts.set(puzzle, (puzzleCounts.get(puzzle) || 0) + 1);
        });
      }
      
      // Interactions
      if (node.data?.interactions) {
        node.data.interactions.forEach(interaction => {
          interactionCounts.set(interaction, (interactionCounts.get(interaction) || 0) + 1);
        });
      }
      
      // Features (only enabled ones)
      if (node.data?.features) {
        Object.entries(node.data.features).forEach(([feature, enabled]) => {
          if (enabled) {
            featureCounts.set(feature, (featureCounts.get(feature) || 0) + 1);
          }
        });
      }
    });
    
    return {
      characters: Array.from(characterCounts.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name)),
      puzzles: Array.from(puzzleCounts.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name)),
      interactions: Array.from(interactionCounts.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name)),
      features: Array.from(featureCounts.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name))
    };
  }, []);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return filterOptions;
    
    const query = searchQuery.toLowerCase();
    return {
      characters: filterOptions.characters.filter(item => item.name.toLowerCase().includes(query)),
      puzzles: filterOptions.puzzles.filter(item => item.name.toLowerCase().includes(query)),
      interactions: filterOptions.interactions.filter(item => item.name.toLowerCase().includes(query)),
      features: filterOptions.features.filter(item => item.name.toLowerCase().includes(query))
    };
  }, [filterOptions, searchQuery]);

  // Count total matches for search
  const searchMatchCount = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    return filteredOptions.characters.length + filteredOptions.puzzles.length + 
           filteredOptions.interactions.length + filteredOptions.features.length;
  }, [filteredOptions, searchQuery]);

  // Check if a filter item matches search
  const itemMatchesSearch = useCallback((itemName) => {
    if (!searchQuery.trim()) return true;
    return itemName.toLowerCase().includes(searchQuery.toLowerCase());
  }, [searchQuery]);

  // Toggle section collapse
  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Check if a node matches active filters
  const nodeMatchesFilters = useCallback((node) => {
    const { currentWorld } = useTheme();
    
    // If no filters are active, show all nodes
    if (activeCharacterFilters.length === 0 && 
        activePuzzleFilters.length === 0 && 
        activeInteractionFilters.length === 0 && 
        activeFeatureFilters.length === 0) {
      return true;
    }
    
    let matches = true;
    
    // Check character filters (AND logic) - handle world-aware content
    if (activeCharacterFilters.length > 0) {
      const nodeCharacters = getWorldCharacters(node.data?.characters, currentWorld);
      matches = matches && activeCharacterFilters.some(char => 
        nodeCharacters.includes(char)
      );
    }
    
    // Check puzzle filters (AND logic)
    if (activePuzzleFilters.length > 0) {
      matches = matches && activePuzzleFilters.some(puzzle => 
        node.data?.puzzles?.includes(puzzle)
      );
    }
    
    // Check interaction filters (AND logic)
    if (activeInteractionFilters.length > 0) {
      matches = matches && activeInteractionFilters.some(interaction => 
        node.data?.interactions?.includes(interaction)
      );
    }
    
    // Check feature filters (AND logic)
    if (activeFeatureFilters.length > 0) {
      matches = matches && activeFeatureFilters.some(feature => 
        node.data?.features?.[feature] === true
      );
    }
    
    return matches;
  }, [activeCharacterFilters, activePuzzleFilters, activeInteractionFilters, activeFeatureFilters]);

  // Reset all filters
  const resetAllFilters = () => {
    setActiveCharacterFilters([]);
    setActivePuzzleFilters([]);
    setActiveInteractionFilters([]);
    setActiveFeatureFilters([]);
  };

  // Convert data to tree structure
  const originalTree = convertToTree(realMatrixNodes, realMatrixEdges);
  
  // Validate the tree structure for cycles (development only)
  if (process.env.NODE_ENV === 'development') {
    const isValid = validateTreeNoCycles(originalTree);
    const treeStats = analyzeTree(originalTree);
    
    console.log('Tree validation:', isValid ? '✅ No cycles detected' : '❌ Cycles detected');
    console.log('Tree stats:', treeStats);
    
    if (!isValid) {
      console.error('Tree structure has cycles! This may cause rendering issues.');
    }
  }
  
  const filteredTree = filterTreeByStatus(originalTree, statusFilter);

  // Node expansion toggle function
  const toggleNodeExpansion = useCallback((nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  // Enhanced node click handler
  const handleNodeClick = useCallback((d, isExpandButton = false) => {
    if (isExpandButton && (d.children || d._children)) {
      // Handle expand/collapse
      toggleNodeExpansion(d.data.id);
    } else {
      // Handle regular node selection
      setSelectedNode(d.data);
      const path = findPathToNode(originalTree, d.data.id);
      setBreadcrumb(path);
    }
  }, [toggleNodeExpansion, originalTree]);

  const { drawTree, rootPosRef } = useTreeLayout({
    svgRef,
    filteredTree,
    layoutType,
    expandedNodes,
    nodeMatchesFilters,
    themeConfigs,
    currentTheme,
    forceStrength,
    linkDistance,
    centerStrength,
    collideRadius,
    selectedNode,
    handleNodeClick,
    showMetrics,
  });

  const toggleStatusFilter = (status) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  // Toggle functions for layer filters
  const toggleCharacterFilter = (character) => {
    setActiveCharacterFilters(prev => 
      prev.includes(character)
        ? prev.filter(c => c !== character)
        : [...prev, character]
    );
  };

  const togglePuzzleFilter = (puzzle) => {
    setActivePuzzleFilters(prev => 
      prev.includes(puzzle)
        ? prev.filter(p => p !== puzzle)
        : [...prev, puzzle]
    );
  };

  const toggleInteractionFilter = (interaction) => {
    setActiveInteractionFilters(prev => 
      prev.includes(interaction)
        ? prev.filter(i => i !== interaction)
        : [...prev, interaction]
    );
  };

  const toggleFeatureFilter = (feature) => {
    setActiveFeatureFilters(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  // Count active filters
  const activeFilterCount = activeCharacterFilters.length + activePuzzleFilters.length + 
                           activeInteractionFilters.length + activeFeatureFilters.length;

  useEffect(() => {
    drawTree();
  }, [drawTree]);

  useEffect(() => {
    if (!initialCentered && rootPosRef?.current && svgRef.current) {
      const { x, y } = rootPosRef.current;
      const svgRect = svgRef.current.getBoundingClientRect();
      const centerX = svgRect.width / 2;
      const centerY = svgRect.height / 2;
      d3.select(svgRef.current)
        .transition()
        .call(
          d3.zoom().transform,
          d3.zoomIdentity.translate(centerX - x, centerY - y).scale(1)
        );
      setInitialCentered(true);
    }
  }, [rootPosRef, initialCentered]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Enhanced Layer Controls Sidebar */}
      <SidebarFilters
        show={showLayerControls}
        onClose={() => setShowLayerControls(false)}
        searchInputRef={searchInputRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchMatchCount={searchMatchCount}
        activeFilterCount={activeFilterCount}
        resetAllFilters={resetAllFilters}
        filterOptions={filterOptions}
        filteredOptions={filteredOptions}
        collapsedSections={collapsedSections}
        toggleSection={toggleSection}
        activeCharacterFilters={activeCharacterFilters}
        activePuzzleFilters={activePuzzleFilters}
        activeInteractionFilters={activeInteractionFilters}
        activeFeatureFilters={activeFeatureFilters}
        toggleCharacterFilter={toggleCharacterFilter}
        togglePuzzleFilter={togglePuzzleFilter}
        toggleInteractionFilter={toggleInteractionFilter}
        toggleFeatureFilter={toggleFeatureFilter}
        itemMatchesSearch={itemMatchesSearch}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header Controls */}
        <div className="bg-black/90 border-b border-green-400/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-mono text-green-400">🧠 Matrix Story Map D3</h1>
              
              {/* Layer Controls Toggle */}
              <button
                onClick={() => setShowLayerControls(!showLayerControls)}
                className={`px-4 py-2 rounded text-sm font-mono border transition-all flex items-center gap-2 ${
                  showLayerControls || activeFilterCount > 0
                    ? 'bg-purple-900/40 text-purple-300 border-purple-400/60 shadow-purple-400/20 shadow'
                    : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-purple-400/60 hover:text-purple-300'
                }`}
              >
                <span className="text-lg">🎛️</span>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
            
            {/* Layout Toggle */}
            <div className="flex gap-2">
              <span className="text-sm text-gray-400 mr-2">Layout:</span>
              {Object.values(LAYOUT_TYPES).map(type => (
                <button
                  key={type}
                  onClick={() => setLayoutType(type)}
                  className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                    layoutType === type
                      ? 'bg-green-900 text-green-300 border-green-400'
                      : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {type}
                </button>
              ))}
              
              {/* Force Controls Toggle (only for network layout) */}
              {layoutType === LAYOUT_TYPES.network && (
                <button
                  onClick={() => setShowForceControls(!showForceControls)}
                  className={`ml-2 px-3 py-1 rounded text-xs font-mono border transition-colors ${
                    showForceControls
                      ? 'bg-orange-900 text-orange-300 border-orange-400'
                      : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-orange-400'
                  }`}
                >
                  ⚙️ Force Controls
                </button>
              )}

              {/* Metrics Overlay Toggle */}
              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className={`ml-2 px-3 py-1 rounded text-xs font-mono border transition-colors ${
                  showMetrics
                    ? 'bg-cyan-900 text-cyan-300 border-cyan-400'
                    : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-cyan-400'
                }`}
              >
                📊 Metrics
              </button>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2">
              <span className="text-sm text-gray-400 mr-2">Status:</span>
              {STATUS_FILTERS.map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => toggleStatusFilter(key)}
                  className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                    statusFilter.includes(key)
                      ? 'bg-blue-900 text-blue-300 border-blue-400'
                      : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Breadcrumb Trail */}
          {breadcrumb.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-gray-400">Path:</span>
              {breadcrumb.map((node, index) => (
                <React.Fragment key={node.id}>
                  <button
                    onClick={() => handleNodeClick({ data: node })}
                    className="text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    {node.data?.title || node.id}
                  </button>
                  {index < breadcrumb.length - 1 && (
                    <span className="text-gray-600">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Force Controls Panel (only for network layout) */}
        {layoutType === LAYOUT_TYPES.network && showForceControls && (
          <div className="bg-orange-900/20 border-b border-orange-400/30 p-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-orange-400 font-mono font-bold mb-4">⚙️ Force Simulation Controls</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Force Strength */}
                <div className="space-y-2">
                  <label className="text-orange-300 text-sm font-mono">
                    Charge Force: {forceStrength}
                  </label>
                  <input
                    type="range"
                    min="-1000"
                    max="0"
                    step="10"
                    value={forceStrength}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setForceStrength(newValue);
                      // Update simulation if it exists
                      const svg = d3.select(svgRef.current);
                      const g = svg.select('.main-group');
                      if (g.node() && g.node().simulation) {
                        g.node().simulation.force('charge').strength(newValue);
                        g.node().simulation.alpha(0.3).restart();
                      }
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
                  />
                  <div className="text-xs text-gray-400">Node repulsion strength</div>
                </div>

                {/* Link Distance */}
                <div className="space-y-2">
                  <label className="text-orange-300 text-sm font-mono">
                    Link Distance: {linkDistance}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={linkDistance}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setLinkDistance(newValue);
                      const svg = d3.select(svgRef.current);
                      const g = svg.select('.main-group');
                      if (g.node() && g.node().simulation) {
                        g.node().simulation.force('link').distance(newValue);
                        g.node().simulation.alpha(0.3).restart();
                      }
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
                  />
                  <div className="text-xs text-gray-400">Preferred link length</div>
                </div>

                {/* Center Strength */}
                <div className="space-y-2">
                  <label className="text-orange-300 text-sm font-mono">
                    Center Force: {centerStrength.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={centerStrength}
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      setCenterStrength(newValue);
                      const svg = d3.select(svgRef.current);
                      const g = svg.select('.main-group');
                      if (g.node() && g.node().simulation) {
                        g.node().simulation.force('center').strength(newValue);
                        g.node().simulation.alpha(0.3).restart();
                      }
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
                  />
                  <div className="text-xs text-gray-400">Pull toward center</div>
                </div>

                {/* Collision Radius */}
                <div className="space-y-2">
                  <label className="text-orange-300 text-sm font-mono">
                    Collision: {collideRadius}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="2"
                    value={collideRadius}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setCollideRadius(newValue);
                      const svg = d3.select(svgRef.current);
                      const g = svg.select('.main-group');
                      if (g.node() && g.node().simulation) {
                        g.node().simulation.force('collide').radius(newValue);
                        g.node().simulation.alpha(0.3).restart();
                      }
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
                  />
                  <div className="text-xs text-gray-400">Node collision radius</div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    const svg = d3.select(svgRef.current);
                    const g = svg.select('.main-group');
                    if (g.node() && g.node().simulation) {
                      g.node().simulation.alpha(1).restart();
                    }
                  }}
                  className="px-3 py-1 bg-green-900 text-green-300 rounded text-sm font-mono border border-green-400 hover:bg-green-800 transition-colors"
                >
                  🔄 Restart Simulation
                </button>
                
                <button
                  onClick={() => {
                    const svg = d3.select(svgRef.current);
                    const g = svg.select('.main-group');
                    if (g.node() && g.node().simulation) {
                      g.node().simulation.stop();
                    }
                  }}
                  className="px-3 py-1 bg-red-900 text-red-300 rounded text-sm font-mono border border-red-400 hover:bg-red-800 transition-colors"
                >
                  ⏹️ Stop Simulation
                </button>

                <button
                  onClick={() => {
                    // Reset to defaults
                    setForceStrength(-300);
                    setLinkDistance(80);
                    setCenterStrength(0.3);
                    setCollideRadius(30);
                    
                    const svg = d3.select(svgRef.current);
                    const g = svg.select('.main-group');
                    if (g.node() && g.node().simulation) {
                      g.node().simulation
                        .force('charge').strength(-300)
                        .force('link').distance(80)
                        .force('center').strength(0.3)
                        .force('collide').radius(30);
                      g.node().simulation.alpha(0.3).restart();
                    }
                  }}
                  className="px-3 py-1 bg-blue-900 text-blue-300 rounded text-sm font-mono border border-blue-400 hover:bg-blue-800 transition-colors"
                >
                  🔧 Reset Defaults
                </button>
              </div>

              {/* Network Layout Instructions */}
              <div className="mt-4 p-3 bg-orange-900/10 border border-orange-400/20 rounded text-xs text-orange-200">
                <strong>Network Layout Controls:</strong> Drag nodes to reposition • Double-click to pin/unpin • 
                Adjust forces for different network behaviors • Higher charge = more repulsion • 
                Lower link distance = tighter connections
              </div>
            </div>
          </div>
        )}

        {/* Main SVG Canvas */}
        <div className="flex-1 relative">
          <svg
            ref={svgRef}
            className="w-full h-full bg-gradient-to-br from-gray-900 to-black border-l border-green-400/20"
            style={{ minHeight: '600px' }}
          />
          <ZoomControls svgRef={svgRef} />
          
          {/* Help Text */}
          <div className="absolute top-4 left-4 bg-black/80 text-xs text-gray-400 p-3 rounded border border-gray-600 font-mono">
            <div>🖱️ Click nodes to explore</div>
            <div>🔍 Scroll to zoom</div>
            <div>✋ Drag to pan</div>
            <div>🎛️ Use sidebar filters to highlight</div>
            <div>⚡ Toggle layouts & status</div>
            <div>⌨️ Press <kbd className="bg-gray-700 px-1 rounded">/</kbd> to search</div>
            {layoutType === LAYOUT_TYPES.network && (
              <>
                <div className="border-t border-gray-600 my-2"></div>
                <div className="text-orange-300">Network Layout:</div>
                <div>🫱 Drag nodes to reposition</div>
                <div>🖱️ Double-click to pin/unpin</div>
                <div>⚙️ Use force controls to adjust</div>
              </>
            )}
          </div>

          {/* Active Filters Mini-Display */}
          {activeFilterCount > 0 && (
            <div className="absolute bottom-4 left-4 bg-black/90 text-xs p-3 rounded border border-purple-400/40 font-mono max-w-xs">
              <div className="text-purple-400 font-bold mb-1">🎯 Showing filtered results</div>
              <div className="text-gray-300">
                {activeCharacterFilters.length > 0 && `🎭 ${activeCharacterFilters.length} characters`}
                {activePuzzleFilters.length > 0 && ` 🧩 ${activePuzzleFilters.length} puzzles`}
                {activeInteractionFilters.length > 0 && ` 🎬 ${activeInteractionFilters.length} interactions`}
                {activeFeatureFilters.length > 0 && ` 💠 ${activeFeatureFilters.length} features`}
              </div>
            </div>
          )}
        </div>
      </div>

      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      <DiagnosticOverlay />
    </div>
  );
}
