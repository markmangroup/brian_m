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

export default function MapD3() {
  const svgRef = useRef();
  const [layoutType, setLayoutType] = useState(LAYOUT_TYPES.tree);
  const [statusFilter, setStatusFilter] = useState(['live', 'wip', 'stub']);
  const [selectedNode, setSelectedNode] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['matrix-v1-entry']));
  
  // Layer filter states
  const [showLayerControls, setShowLayerControls] = useState(false);
  const [activeCharacterFilters, setActiveCharacterFilters] = useState([]);
  const [activePuzzleFilters, setActivePuzzleFilters] = useState([]);
  const [activeInteractionFilters, setActiveInteractionFilters] = useState([]);
  const [activeFeatureFilters, setActiveFeatureFilters] = useState([]);
  
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

    // Position nodes for radial layout
    if (layoutType === LAYOUT_TYPES.radial) {
      treeData.each(d => {
        d.radius = d.depth * 100 + 40; // Increased radius spacing
        const angle = d.x;
        d.x = Math.cos(angle - Math.PI / 2) * d.radius;
        d.y = Math.sin(angle - Math.PI / 2) * d.radius;
        d.angle = angle; // Store angle for label rotation
      });
      g.attr('transform', `translate(${width / 2}, ${height / 2})`);

      // Add central orb ring effect
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 30)
        .style('fill', 'none')
        .style('stroke', '#06b6d4')
        .style('stroke-width', 2)
        .style('stroke-opacity', 0.3)
        .style('stroke-dasharray', '5,5')
        .style('animation', 'spin 20s linear infinite');

      // Add faint orbital rings
      [60, 120, 200, 300].forEach(radius => {
        g.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', radius)
          .style('fill', 'none')
          .style('stroke', '#374151')
          .style('stroke-width', 1)
          .style('stroke-opacity', 0.1);
      });

      // Add CSS for rotation animation
      if (!document.getElementById('radial-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'radial-animation-styles';
        style.textContent = `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes radialEntry {
            from { 
              transform: translate(0, 0) scale(0);
              opacity: 0;
            }
            to { 
              transform: translate(var(--final-x, 0), var(--final-y, 0)) scale(1);
              opacity: 1;
            }
          }
        `;
        document.head.appendChild(style);
      }

    } else {
      g.attr('transform', `translate(${margin.left}, ${margin.top})`);
    }

    // Draw links with conditional styling
    const links = g.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', layoutType === LAYOUT_TYPES.radial 
        ? d3.linkRadial()
            .angle(d => d.angle || d.x)
            .radius(d => d.radius || d.y)
        : d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
      .style('fill', 'none')
      .style('stroke', d => {
        const sourceMatches = nodeMatchesFilters(d.source.data);
        const targetMatches = nodeMatchesFilters(d.target.data);
        return (sourceMatches && targetMatches) ? '#06b6d4' : '#374151';
      })
      .style('stroke-width', 2)
      .style('stroke-opacity', d => {
        const sourceMatches = nodeMatchesFilters(d.source.data);
        const targetMatches = nodeMatchesFilters(d.target.data);
        return (sourceMatches && targetMatches) ? 0.8 : 0.3;
      });

    // Draw nodes with conditional styling
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        if (layoutType === LAYOUT_TYPES.radial) {
          // Start from center for animation
          return `translate(0, 0)`;
        }
        return `translate(${d.y}, ${d.x})`;
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d));

    // Animate nodes to final position in radial layout
    if (layoutType === LAYOUT_TYPES.radial) {
      nodes.transition()
        .duration(800)
        .delay((d, i) => i * 50) // Stagger animation
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('opacity', 1);
    }

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
          // Position text based on angle to avoid center overlap
          const angle = d.angle || 0;
          return angle > Math.PI ? -12 : 12;
        }
        return d.children ? -12 : 12;
      })
      .attr('transform', d => {
        if (layoutType === LAYOUT_TYPES.radial) {
          const angle = d.angle || 0;
          let rotation = angle * 180 / Math.PI - 90;
          // Flip text for better readability on left side
          if (angle > Math.PI) {
            rotation += 180;
          }
          return `rotate(${rotation})`;
        }
        return '';
      })
      .style('text-anchor', d => {
        if (layoutType === LAYOUT_TYPES.radial) {
          const angle = d.angle || 0;
          return angle > Math.PI ? 'end' : 'start';
        }
        return d.children ? 'end' : 'start';
      })
      .style('font-size', layoutType === LAYOUT_TYPES.radial ? '10px' : '12px')
      .style('font-family', 'monospace')
      .style('fill', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return '#991b1b'; // Dark red for locked nodes
        }
        
        return matches ? '#fff' : '#9ca3af';
      })
      .style('opacity', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return 0.6;
        }
        
        return matches ? 1 : 0.6;
      })
      .style('pointer-events', 'none')
      .text(d => d.data.data?.title || d.data.id);

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
      {/* Layer Controls Sidebar */}
      <div className={`bg-black/95 border-r border-green-400/30 transition-all duration-300 ease-in-out flex-shrink-0 ${
        showLayerControls ? 'w-80' : 'w-0'
      } overflow-hidden`}>
        <div className="w-80 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-green-400/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-mono text-green-400 font-bold">🎛️ Layer Filters</h3>
              <button
                onClick={() => setShowLayerControls(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Filter Summary */}
            {activeFilterCount > 0 && (
              <div className="mt-3 p-2 bg-purple-900/20 rounded border border-purple-400/30">
                <div className="text-purple-400 font-mono text-xs font-bold mb-1">
                  Active: {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
                </div>
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-red-300 hover:text-red-100 transition-colors"
                >
                  ✕ Clear All
                </button>
              </div>
            )}
          </div>

          {/* Scrollable Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Characters Section */}
            {filterOptions.characters.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🎭</span>
                  <span className="text-purple-400 font-mono text-sm font-bold">
                    Characters
                  </span>
                  <span className="ml-auto bg-purple-900/40 text-purple-300 px-2 py-1 rounded text-xs font-mono">
                    {activeCharacterFilters.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {filterOptions.characters.map(character => (
                    <button
                      key={character.name}
                      onClick={() => toggleCharacterFilter(character.name)}
                      className={`px-3 py-2 rounded text-sm font-mono border transition-all text-left hover:scale-[1.02] flex items-center justify-between ${
                        activeCharacterFilters.includes(character.name)
                          ? 'bg-purple-900/40 text-purple-200 border-purple-400/60 shadow-purple-400/20 shadow ring-2 ring-purple-400/30 font-bold'
                          : 'bg-gray-900/40 text-gray-300 border-gray-600/40 hover:border-purple-400/40 hover:text-purple-300'
                      }`}
                    >
                      <span>{character.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeCharacterFilters.includes(character.name)
                          ? 'bg-purple-700 text-purple-100'
                          : 'bg-purple-900/60 text-purple-400'
                      }`}>
                        {character.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Puzzles Section */}
            {filterOptions.puzzles.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🧩</span>
                  <span className="text-yellow-400 font-mono text-sm font-bold">
                    Puzzles
                  </span>
                  <span className="ml-auto bg-yellow-900/40 text-yellow-300 px-2 py-1 rounded text-xs font-mono">
                    {activePuzzleFilters.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {filterOptions.puzzles.map(puzzle => (
                    <button
                      key={puzzle.name}
                      onClick={() => togglePuzzleFilter(puzzle.name)}
                      className={`px-3 py-2 rounded text-sm font-mono border transition-all text-left hover:scale-[1.02] flex items-center justify-between ${
                        activePuzzleFilters.includes(puzzle.name)
                          ? 'bg-yellow-900/40 text-yellow-200 border-yellow-400/60 shadow-yellow-400/20 shadow ring-2 ring-yellow-400/30 font-bold'
                          : 'bg-gray-900/40 text-gray-300 border-gray-600/40 hover:border-yellow-400/40 hover:text-yellow-300'
                      }`}
                    >
                      <span>{puzzle.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activePuzzleFilters.includes(puzzle.name)
                          ? 'bg-yellow-700 text-yellow-100'
                          : 'bg-yellow-900/60 text-yellow-400'
                      }`}>
                        {puzzle.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactions Section */}
            {filterOptions.interactions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🎬</span>
                  <span className="text-blue-400 font-mono text-sm font-bold">
                    Interactions
                  </span>
                  <span className="ml-auto bg-blue-900/40 text-blue-300 px-2 py-1 rounded text-xs font-mono">
                    {activeInteractionFilters.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {filterOptions.interactions.map(interaction => (
                    <button
                      key={interaction.name}
                      onClick={() => toggleInteractionFilter(interaction.name)}
                      className={`px-3 py-2 rounded text-sm font-mono border transition-all text-left hover:scale-[1.02] flex items-center justify-between ${
                        activeInteractionFilters.includes(interaction.name)
                          ? 'bg-blue-900/40 text-blue-200 border-blue-400/60 shadow-blue-400/20 shadow ring-2 ring-blue-400/30 font-bold'
                          : 'bg-gray-900/40 text-gray-300 border-gray-600/40 hover:border-blue-400/40 hover:text-blue-300'
                      }`}
                    >
                      <span>{interaction.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeInteractionFilters.includes(interaction.name)
                          ? 'bg-blue-700 text-blue-100'
                          : 'bg-blue-900/60 text-blue-400'
                      }`}>
                        {interaction.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features Section */}
            {filterOptions.features.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">💠</span>
                  <span className="text-emerald-400 font-mono text-sm font-bold">
                    Features
                  </span>
                  <span className="ml-auto bg-emerald-900/40 text-emerald-300 px-2 py-1 rounded text-xs font-mono">
                    {activeFeatureFilters.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {filterOptions.features.map(feature => {
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
                        className={`px-3 py-2 rounded text-sm font-mono border transition-all text-left hover:scale-[1.02] flex items-center justify-between ${
                          activeFeatureFilters.includes(feature.name)
                            ? 'bg-emerald-900/40 text-emerald-200 border-emerald-400/60 shadow-emerald-400/20 shadow ring-2 ring-emerald-400/30 font-bold'
                            : 'bg-gray-900/40 text-gray-300 border-gray-600/40 hover:border-emerald-400/40 hover:text-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{getFeatureIcon(feature)}</span>
                          <span>{getFeatureLabel(feature)}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activeFeatureFilters.includes(feature.name)
                            ? 'bg-emerald-700 text-emerald-100'
                            : 'bg-emerald-900/60 text-emerald-400'
                        }`}>
                          {feature.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
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

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="fixed bottom-6 right-6 bg-black/95 border border-green-400/30 rounded-lg p-3 max-w-[360px] max-h-[75vh] overflow-y-auto shadow-xl backdrop-blur-sm z-30">
          <h3 className="text-base font-mono text-green-400 mb-2 pr-6">
            {selectedNode.data?.title || selectedNode.id}
          </h3>
          
          {/* Basic Info */}
          <div className="space-y-1 text-xs mb-3 text-gray-300">
            <div><span className="text-gray-500">Type:</span> {selectedNode.type}</div>
            <div><span className="text-gray-500">Group:</span> {selectedNode.group}</div>
            <div><span className="text-gray-500">Depth:</span> {selectedNode.depth}</div>
            <div><span className="text-gray-500">Status:</span> 
              <span className={getStatusColor(selectedNode.data?.status)}>
                {selectedNode.data?.status}
              </span>
            </div>
            {/* Reviewed Badge */}
            {selectedNode.data?.reviewedBy && selectedNode.data?.reviewedAt && (
              <div className="px-2 py-1 bg-green-900/20 border border-green-400/30 rounded text-green-300 text-[10px] font-mono">
                ✅ Reviewed by {selectedNode.data.reviewedBy} ({new Date(selectedNode.data.reviewedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })})
              </div>
            )}
            
            {/* Unlock Conditions */}
            {selectedNode.unlockConditions && selectedNode.unlockConditions.length > 0 && (
              <div className="px-2 py-1 bg-yellow-900/20 border border-yellow-400/30 rounded text-yellow-300 text-[10px] font-mono">
                <div className="flex items-center gap-1 mb-1">
                  <span>🔗</span>
                  <span className="font-bold">Unlock Requirements:</span>
                </div>
                <div className="space-y-1">
                  {selectedNode.unlockConditions.map((conditionId, index) => {
                    const conditionNode = realMatrixNodes.find(n => n.id === conditionId);
                    const isMet = checkUnlockConditions(selectedNode, realMatrixNodes);
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <span className={isMet ? '✅' : '❌'}></span>
                        <span className={isMet ? 'text-green-300' : 'text-red-300'}>
                          {conditionNode?.data?.title || conditionId}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-1 text-[9px] text-gray-400">
                  {checkUnlockConditions(selectedNode, realMatrixNodes) ? 
                    '🔓 All requirements met' : 
                    '🔒 Complete required paths to unlock'
                  }
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          {selectedNode.data?.summary && (
            <div className="mb-3 p-2 bg-gray-800/60 rounded border border-gray-600/50">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">🧠</span>
                <span className="text-cyan-400 font-mono text-xs font-bold">Summary</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                {selectedNode.data.summary}
              </p>
            </div>
          )}

          {/* Characters */}
          {selectedNode.data?.characters && selectedNode.data.characters.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm">🎭</span>
                <span className="text-purple-400 font-mono text-xs font-bold">Characters</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedNode.data.characters.map((character, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-purple-900/30 text-purple-300 rounded text-[10px] font-mono border border-purple-600/30"
                  >
                    {character}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Puzzles */}
          {selectedNode.data?.puzzles && selectedNode.data.puzzles.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm">🧩</span>
                <span className="text-yellow-400 font-mono text-xs font-bold">Puzzles</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedNode.data.puzzles.map((puzzle, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-yellow-900/30 text-yellow-300 rounded text-[10px] font-mono border border-yellow-600/30"
                  >
                    {puzzle}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interactions */}
          {selectedNode.data?.interactions && selectedNode.data.interactions.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm">🎬</span>
                <span className="text-blue-400 font-mono text-xs font-bold">Interactions</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedNode.data.interactions.map((interaction, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-blue-900/30 text-blue-300 rounded text-[10px] font-mono border border-blue-600/30"
                  >
                    {interaction}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feature Badges */}
          {selectedNode.data?.features && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm">💠</span>
                <span className="text-emerald-400 font-mono text-xs font-bold">Features</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {Object.entries(selectedNode.data.features).map(([feature, enabled]) => {
                  if (!enabled) return null;
                  
                  const getFeatureIcon = (feat) => {
                    switch (feat) {
                      case 'hasTransition': return '🌊';
                      case 'hasCombat': return '⚔️';
                      case 'hasChoice': return '🤔';
                      case 'hasNPC': return '👤';
                      case 'hasAnimation': return '✨';
                      default: return '💠';
                    }
                  };

                  const getFeatureLabel = (feat) => {
                    return feat.replace('has', '').replace(/([A-Z])/g, ' $1').trim();
                  };

                  return (
                    <span
                      key={feature}
                      className="px-1.5 py-0.5 bg-emerald-900/30 text-emerald-300 rounded text-[10px] font-mono border border-emerald-600/30 flex items-center gap-1"
                    >
                      <span className="text-[8px]">{getFeatureIcon(feature)}</span>
                      {getFeatureLabel(feature)}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Original Description */}
          {selectedNode.data?.description && selectedNode.data.description !== selectedNode.data?.summary && (
            <div className="mb-3 text-xs text-gray-400 border-t border-gray-700 pt-2">
              <strong className="text-[10px] uppercase tracking-wide">Original:</strong><br />
              <span className="text-[10px] leading-relaxed">{selectedNode.data.description}</span>
            </div>
          )}

          {/* Component URL Link */}
          {selectedNode.data?.pageUrl && (
            <div className="mt-3 pt-2 border-t border-gray-600">
              <a
                href={selectedNode.data.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-xs border border-cyan-400/50 rounded px-2 py-1.5 hover:border-cyan-400 hover:bg-cyan-400/10 w-full justify-center"
              >
                🔗 View Component
              </a>
            </div>
          )}

          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'live': return 'text-green-400';
    case 'wip': return 'text-yellow-400';
    case 'stub': return 'text-red-400';
    default: return 'text-gray-400';
  }
} 