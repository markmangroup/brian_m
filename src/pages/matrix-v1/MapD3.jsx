import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { realMatrixNodes, realMatrixEdges } from './realMatrixFlow';
import { convertToTree, filterTreeByStatus, findPathToNode } from '../../utils/convertToTree';

const LAYOUT_TYPES = {
  tree: 'tree',
  cluster: 'cluster',
  radial: 'radial'
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
  }
};

export default function MapD3() {
  const svgRef = useRef();
  const searchInputRef = useRef();
  const [layoutType, setLayoutType] = useState(LAYOUT_TYPES.tree);
  const [statusFilter, setStatusFilter] = useState(['live', 'wip', 'stub']);
  const [selectedNode, setSelectedNode] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['matrix-v1-entry']));
  const [currentTheme, setCurrentTheme] = useState('matrix');
  
  // Visual group states
  const [visibleGroups, setVisibleGroups] = useState(Object.keys(VISUAL_GROUPS));
  const [focusedGroup, setFocusedGroup] = useState(null);
  
  // Layer filter states
  const [showLayerControls, setShowLayerControls] = useState(false);
  const [activeCharacterFilters, setActiveCharacterFilters] = useState([]);
  const [activePuzzleFilters, setActivePuzzleFilters] = useState([]);
  const [activeInteractionFilters, setActiveInteractionFilters] = useState([]);
  const [activeFeatureFilters, setActiveFeatureFilters] = useState([]);
  
  // Search and UI states
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({
    characters: false, // Keep characters expanded by default
    puzzles: true,
    interactions: true,
    features: true
  });

  // Theme configurations
  const themeConfigs = {
    matrix: {
      bgColor: 'bg-black',
      primaryColor: 'text-green-400',
      accentColor: 'text-cyan-400',
      nodeColor: '#22c55e',
      linkColor: '#10b981',
      gridOpacity: 0.3
    },
    witcher: {
      bgColor: 'bg-amber-950',
      primaryColor: 'text-amber-400',
      accentColor: 'text-orange-400',
      nodeColor: '#f59e0b',
      linkColor: '#d97706',
      gridOpacity: 0.2
    },
    cyberpunk: {
      bgColor: 'bg-purple-950',
      primaryColor: 'text-purple-400',
      accentColor: 'text-pink-400',
      nodeColor: '#a855f7',
      linkColor: '#c084fc',
      gridOpacity: 0.4
    }
  };

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setCurrentTheme(event.detail.theme);
    };

    // Load initial theme
    const savedTheme = localStorage.getItem('matrixTheme') || 'matrix';
    setCurrentTheme(savedTheme);

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

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
  
  // Extract unique values from all nodes dynamically with counts
  const filterOptions = useMemo(() => {
    const characterCounts = new Map();
    const puzzleCounts = new Map();
    const interactionCounts = new Map();
    const featureCounts = new Map();
    
    realMatrixNodes.forEach(node => {
      // Characters
      if (node.data?.characters) {
        node.data.characters.forEach(char => {
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
    // If no filters are active, show all nodes
    if (activeCharacterFilters.length === 0 && 
        activePuzzleFilters.length === 0 && 
        activeInteractionFilters.length === 0 && 
        activeFeatureFilters.length === 0) {
      return true;
    }
    
    let matches = true;
    
    // Check character filters (AND logic)
    if (activeCharacterFilters.length > 0) {
      matches = matches && activeCharacterFilters.some(char => 
        node.data?.characters?.includes(char)
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

  // Check if a node's unlock conditions are met
  const checkUnlockConditions = useCallback((node, availableNodes) => {
    if (!node.unlockConditions || node.unlockConditions.length === 0) {
      return true; // No conditions means always unlocked
    }
    
    const availableNodeIds = new Set(availableNodes.map(n => n.id));
    return node.unlockConditions.every(conditionId => availableNodeIds.has(conditionId));
  }, []);

  // Reset all filters
  const resetAllFilters = () => {
    setActiveCharacterFilters([]);
    setActivePuzzleFilters([]);
    setActiveInteractionFilters([]);
    setActiveFeatureFilters([]);
  };

  // Convert data to tree structure
  const originalTree = convertToTree(realMatrixNodes, realMatrixEdges);
  const filteredTree = filterTreeByStatus(originalTree, statusFilter);

  const drawTree = useCallback(() => {
    if (!filteredTree) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const width = 1200;
    const height = 800;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    svg.attr('width', width).attr('height', height);

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const g = svg.append('g')
      .attr('class', 'main-group');

    // Create hierarchy
    const root = d3.hierarchy(filteredTree);
    
    // Apply layout based on selected type
    let treeLayout;
    
    switch (layoutType) {
      case LAYOUT_TYPES.cluster:
        treeLayout = d3.cluster()
          .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
        break;
      case LAYOUT_TYPES.radial:
        treeLayout = d3.tree()
          .size([2 * Math.PI, Math.min(width, height) / 2 - 120]) // Increased spacing
          .separation((a, b) => (a.parent === b.parent ? 1.5 : 2.5) / a.depth); // More separation
        break;
      default: // tree
        treeLayout = d3.tree()
          .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    }

    const treeData = treeLayout(root);

    // Position group for radial layout
    if (layoutType === LAYOUT_TYPES.radial) {
      g.attr('transform', `translate(${width / 2},${height / 2})`);
    } else {
      g.attr('transform', `translate(${margin.left},${margin.top})`);
    }

    // Add links
    const links = g.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d => {
        if (layoutType === LAYOUT_TYPES.radial) {
          return d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y)
            (d);
        } else {
          return d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x)
            (d);
        }
      })
      .style('fill', 'none')
      .style('stroke', '#4ade80')
      .style('stroke-width', 2)
      .style('stroke-opacity', 0.6);

    // Add nodes
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        if (layoutType === LAYOUT_TYPES.radial) {
          return `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`;
        } else {
          return `translate(${d.y},${d.x})`;
        }
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d));

    // Node circles with highlighting
    nodes.append('circle')
      .attr('r', d => d.children ? 8 : 6)
      .style('fill', d => getNodeColor(d.data))
      .style('stroke', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return '#7f1d1d'; // Dark red for locked nodes
        }
        
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0) 
          ? '#10b981' : '#fff';
      })
      .style('stroke-width', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return 3;
        }
        
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0) 
          ? 4 : 2;
      })
      .style('opacity', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return 0.5;
        }
        
        return matches ? 1 : 0.4;
      })
      .style('filter', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return 'drop-shadow(0 0 6px rgb(127 29 29 / 0.8))';
        }
        
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0)
          ? 'drop-shadow(0 0 8px rgb(16 185 129 / 0.8))' : 'none';
      })
      .style('stroke-dasharray', d => {
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        return !isUnlocked ? '3,3' : 'none'; // Dashed outline for locked nodes
      });

    // Node labels with conditional styling
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => {
        if (layoutType === LAYOUT_TYPES.radial) {
          return d.x < Math.PI === !d.children ? 6 : -6;
        } else {
          return d.children ? -13 : 13;
        }
      })
      .style('text-anchor', d => {
        if (layoutType === LAYOUT_TYPES.radial) {
          return d.x < Math.PI === !d.children ? 'start' : 'end';
        } else {
          return d.children ? 'end' : 'start';
        }
      })
      .attr('transform', d => {
        if (layoutType === LAYOUT_TYPES.radial && d.x >= Math.PI) {
          return 'rotate(180)';
        }
        return null;
      })
      .text(d => d.data.data?.title || d.data.id)
      .style('fill', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return '#dc2626';
        }
        
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0)
          ? '#10b981' : '#e5e7eb';
      })
      .style('font-size', '11px')
      .style('font-family', 'monospace')
      .style('pointer-events', 'none');

    // Status indicators
    nodes.append('text')
      .attr('dy', '-10')
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '8px')
      .style('pointer-events', 'none')
      .text(d => {
        const status = d.data.data?.status;
        switch (status) {
          case 'live': return '🟢';
          case 'wip': return '🟡';
          case 'stub': return '🔴';
          default: return '';
        }
      });

    // Lock icon for locked nodes
    nodes.filter(d => !checkUnlockConditions(d.data, realMatrixNodes))
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => d.children ? -25 : 25)
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', '#dc2626')
      .style('pointer-events', 'none')
      .text('🔒');

    // Conditional node indicator for nodes with unlock conditions
    nodes.filter(d => d.data.unlockConditions && d.data.unlockConditions.length > 0)
      .append('text')
      .attr('dy', '-12')
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '8px')
      .style('fill', d => {
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        return isUnlocked ? '#10b981' : '#dc2626';
      })
      .style('pointer-events', 'none')
      .text(d => {
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        return isUnlocked ? '⚡' : '⚠️';
      });

    // Expand/collapse indicators
    nodes.filter(d => d.children || d._children)
      .append('text')
      .attr('dy', '.35em')
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('fill', '#000')
      .style('pointer-events', 'none')
      .text(d => d.children ? '−' : '+');

  }, [filteredTree, layoutType, expandedNodes, nodeMatchesFilters, activeCharacterFilters, activePuzzleFilters, activeInteractionFilters, activeFeatureFilters]);

  const getNodeColor = (node) => {
    const status = node.data?.status || 'unknown';
    switch (status) {
      case 'live': return '#10b981'; // green
      case 'wip': return '#f59e0b';  // yellow
      case 'stub': return '#ef4444'; // red
      default: return '#6b7280';     // gray
    }
  };

  const handleNodeClick = (d) => {
    setSelectedNode(d.data);
    const path = findPathToNode(originalTree, d.data.id);
    setBreadcrumb(path);
  };

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Enhanced Layer Controls Sidebar */}
      <div className={`bg-black/95 border-r border-green-400/30 transition-all duration-300 ease-in-out flex-shrink-0 ${
        showLayerControls ? 'w-80' : 'w-0'
      } overflow-hidden`}>
        <div className="w-80 max-h-[90vh] flex flex-col">
          {/* Compact Sidebar Header */}
          <div className="px-3 py-2 border-b border-green-400/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-mono text-green-400 font-bold">🎛️ Filters</h3>
              <button
                onClick={() => setShowLayerControls(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Global Search Box */}
          <div className="px-3 py-2 border-b border-gray-600/20">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Filter nodes... (Press / to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1 text-sm bg-[#111827] border border-cyan-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="text-xs text-cyan-400 mt-1">
                {searchMatchCount} matches found
              </div>
            )}
          </div>
          
          {/* Filter Summary */}
          {activeFilterCount > 0 && (
            <div className="px-3 py-1.5 bg-purple-900/20 border-b border-purple-400/30">
              <div className="text-purple-400 font-mono text-[10px] font-bold mb-1">
                Active: {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
              </div>
              <button
                onClick={resetAllFilters}
                className="text-[10px] text-red-300 hover:text-red-100 transition-colors"
              >
                ✕ Clear All
              </button>
            </div>
          )}

          {/* Scrollable Filter Content */}
          <div className="flex-1 overflow-auto px-3 py-2 space-y-3">
            {/* Characters Section */}
            {filterOptions.characters.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('characters')}
                  className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
                >
                  <span className="text-sm">🎭</span>
                  <span className="text-purple-400 font-mono text-xs font-bold flex-1">
                    Characters {searchQuery && `(${filteredOptions.characters.length})`}
                  </span>
                  <span className="bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    {activeCharacterFilters.length}
                  </span>
                  <span className={`text-xs transition-transform ${collapsedSections.characters ? 'rotate-0' : 'rotate-90'}`}>
                    ▶
                  </span>
                </button>
                {!collapsedSections.characters && (
                  <div className="grid grid-cols-1 gap-1.5 ml-4">
                    {filteredOptions.characters.map(character => (
                      <button
                        key={character.name}
                        onClick={() => toggleCharacterFilter(character.name)}
                        className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                          activeCharacterFilters.includes(character.name)
                            ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                            : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                                itemMatchesSearch(character.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                              }`
                        }`}
                      >
                        <span className="truncate">{character.name}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                          activeCharacterFilters.includes(character.name)
                            ? 'bg-cyan-700 text-cyan-100'
                            : 'bg-cyan-900/60 text-cyan-400'
                        }`}>
                          {character.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Puzzles Section */}
            {filterOptions.puzzles.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('puzzles')}
                  className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
                >
                  <span className="text-sm">🧩</span>
                  <span className="text-yellow-400 font-mono text-xs font-bold flex-1">
                    Puzzles {searchQuery && `(${filteredOptions.puzzles.length})`}
                  </span>
                  <span className="bg-yellow-900/40 text-yellow-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    {activePuzzleFilters.length}
                  </span>
                  <span className={`text-xs transition-transform ${collapsedSections.puzzles ? 'rotate-0' : 'rotate-90'}`}>
                    ▶
                  </span>
                </button>
                {!collapsedSections.puzzles && (
                  <div className="grid grid-cols-1 gap-1.5 ml-4">
                    {filteredOptions.puzzles.map(puzzle => (
                      <button
                        key={puzzle.name}
                        onClick={() => togglePuzzleFilter(puzzle.name)}
                        className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                          activePuzzleFilters.includes(puzzle.name)
                            ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                            : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                                itemMatchesSearch(puzzle.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                              }`
                        }`}
                      >
                        <span className="truncate">{puzzle.name}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                          activePuzzleFilters.includes(puzzle.name)
                            ? 'bg-cyan-700 text-cyan-100'
                            : 'bg-cyan-900/60 text-cyan-400'
                        }`}>
                          {puzzle.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Interactions Section */}
            {filterOptions.interactions.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('interactions')}
                  className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
                >
                  <span className="text-sm">🎬</span>
                  <span className="text-blue-400 font-mono text-xs font-bold flex-1">
                    Interactions {searchQuery && `(${filteredOptions.interactions.length})`}
                  </span>
                  <span className="bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    {activeInteractionFilters.length}
                  </span>
                  <span className={`text-xs transition-transform ${collapsedSections.interactions ? 'rotate-0' : 'rotate-90'}`}>
                    ▶
                  </span>
                </button>
                {!collapsedSections.interactions && (
                  <div className="grid grid-cols-1 gap-1.5 ml-4">
                    {filteredOptions.interactions.map(interaction => (
                      <button
                        key={interaction.name}
                        onClick={() => toggleInteractionFilter(interaction.name)}
                        className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                          activeInteractionFilters.includes(interaction.name)
                            ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                            : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                                itemMatchesSearch(interaction.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                              }`
                        }`}
                      >
                        <span className="truncate">{interaction.name}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                          activeInteractionFilters.includes(interaction.name)
                            ? 'bg-cyan-700 text-cyan-100'
                            : 'bg-cyan-900/60 text-cyan-400'
                        }`}>
                          {interaction.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Features Section */}
            {filterOptions.features.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('features')}
                  className="flex items-center gap-2 mb-2 w-full text-left hover:bg-gray-800/30 px-2 py-1 rounded transition-colors"
                >
                  <span className="text-sm">💠</span>
                  <span className="text-emerald-400 font-mono text-xs font-bold flex-1">
                    Features {searchQuery && `(${filteredOptions.features.length})`}
                  </span>
                  <span className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    {activeFeatureFilters.length}
                  </span>
                  <span className={`text-xs transition-transform ${collapsedSections.features ? 'rotate-0' : 'rotate-90'}`}>
                    ▶
                  </span>
                </button>
                {!collapsedSections.features && (
                  <div className="grid grid-cols-1 gap-1.5 ml-4">
                    {filteredOptions.features.map(feature => {
                      const getFeatureIcon = (feat) => {
                        switch (feat.name) {
                          case 'hasTransition': return '🌊';
                          case 'hasCombat': return '⚔️';
                          case 'hasChoice': return '🤔';
                          case 'hasNPC': return '👤';
                          case 'hasAnimation': return '✨';
                          default: return '💠';
                        }
                      };

                      const getFeatureLabel = (feat) => {
                        return feat.name.replace('has', '').replace(/([A-Z])/g, ' $1').trim();
                      };

                      return (
                        <button
                          key={feature.name}
                          onClick={() => toggleFeatureFilter(feature.name)}
                          className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all text-left hover:scale-[1.02] hover:ring-1 hover:ring-cyan-300 flex items-center justify-between ${
                            activeFeatureFilters.includes(feature.name)
                              ? 'bg-cyan-900/30 text-cyan-200 border-cyan-400/60 ring-2 ring-cyan-400/30 ring-opacity-50 scale-[1.02]'
                              : `bg-gray-900/40 border-gray-600/40 hover:border-cyan-400/40 ${
                                  itemMatchesSearch(feature.name) ? 'text-gray-300 hover:text-cyan-300' : 'text-gray-500 opacity-50'
                                }`
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px]">{getFeatureIcon(feature)}</span>
                            <span className="truncate">{getFeatureLabel(feature)}</span>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ml-2 ${
                            activeFeatureFilters.includes(feature.name)
                              ? 'bg-cyan-700 text-cyan-100'
                              : 'bg-cyan-900/60 text-cyan-400'
                          }`}>
                            {feature.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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

        {/* Main SVG Canvas */}
        <div className="flex-1 relative">
          <svg
            ref={svgRef}
            className="w-full h-full bg-gradient-to-br from-gray-900 to-black border-l border-green-400/20"
            style={{ minHeight: '600px' }}
          />
          
          {/* Help Text */}
          <div className="absolute top-4 left-4 bg-black/80 text-xs text-gray-400 p-3 rounded border border-gray-600 font-mono">
            <div>🖱️ Click nodes to explore</div>
            <div>🔍 Scroll to zoom</div>
            <div>✋ Drag to pan</div>
            <div>🎛️ Use sidebar filters to highlight</div>
            <div>⚡ Toggle layouts & status</div>
            <div>⌨️ Press <kbd className="bg-gray-700 px-1 rounded">/</kbd> to search</div>
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

      {/* Node Detail Panel */}
      {selectedNode && (
        <div className="absolute top-20 right-4 w-80 bg-black/95 border border-green-400/30 rounded p-4 text-sm">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-green-400 font-bold">{selectedNode.data?.title || selectedNode.id}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-xs">
            <div><span className="text-gray-400">Status:</span> {selectedNode.data?.status || 'unknown'}</div>
            {selectedNode.data?.characters && (
              <div><span className="text-gray-400">Characters:</span> {selectedNode.data.characters.join(', ')}</div>
            )}
            {selectedNode.data?.puzzles && (
              <div><span className="text-gray-400">Puzzles:</span> {selectedNode.data.puzzles.join(', ')}</div>
            )}
            {selectedNode.data?.summary && (
              <div><span className="text-gray-400">Summary:</span> {selectedNode.data.summary}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 