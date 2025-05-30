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
  
  // Extract unique values from all nodes dynamically
  const filterOptions = useMemo(() => {
    const characters = new Set();
    const puzzles = new Set();
    const interactions = new Set();
    const features = new Set();
    
    realMatrixNodes.forEach(node => {
      // Characters
      if (node.data?.characters) {
        node.data.characters.forEach(char => characters.add(char));
      }
      
      // Puzzles
      if (node.data?.puzzles) {
        node.data.puzzles.forEach(puzzle => puzzles.add(puzzle));
      }
      
      // Interactions
      if (node.data?.interactions) {
        node.data.interactions.forEach(interaction => interactions.add(interaction));
      }
      
      // Features (only enabled ones)
      if (node.data?.features) {
        Object.entries(node.data.features).forEach(([feature, enabled]) => {
          if (enabled) features.add(feature);
        });
      }
    });
    
    return {
      characters: Array.from(characters).sort(),
      puzzles: Array.from(puzzles).sort(),
      interactions: Array.from(interactions).sort(),
      features: Array.from(features).sort()
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
          .size([2 * Math.PI, Math.min(width, height) / 2 - 100])
          .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
        break;
      default: // tree
        treeLayout = d3.tree()
          .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
    }

    const treeData = treeLayout(root);

    // Position nodes for radial layout
    if (layoutType === LAYOUT_TYPES.radial) {
      treeData.each(d => {
        d.y = d.depth * 80;
        const angle = d.x;
        d.x = Math.cos(angle - Math.PI / 2) * d.y;
        d.y = Math.sin(angle - Math.PI / 2) * d.y;
      });
      g.attr('transform', `translate(${width / 2}, ${height / 2})`);
    } else {
      g.attr('transform', `translate(${margin.left}, ${margin.top})`);
    }

    // Draw links with conditional styling
    const links = g.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => layoutType === LAYOUT_TYPES.radial ? d.x : d.y)
        .y(d => layoutType === LAYOUT_TYPES.radial ? d.y : d.x))
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
      .attr('transform', d => 
        layoutType === LAYOUT_TYPES.radial 
          ? `translate(${d.x}, ${d.y})`
          : `translate(${d.y}, ${d.x})`
      )
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d));

    // Node circles with highlighting
    nodes.append('circle')
      .attr('r', d => d.children ? 8 : 6)
      .style('fill', d => getNodeColor(d.data))
      .style('stroke', d => {
        const matches = nodeMatchesFilters(d.data);
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0) 
          ? '#10b981' : '#fff';
      })
      .style('stroke-width', d => {
        const matches = nodeMatchesFilters(d.data);
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0) 
          ? 4 : 2;
      })
      .style('opacity', d => {
        const matches = nodeMatchesFilters(d.data);
        return matches ? 1 : 0.4;
      })
      .style('filter', d => {
        const matches = nodeMatchesFilters(d.data);
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0)
          ? 'drop-shadow(0 0 8px rgb(16 185 129 / 0.8))' : 'none';
      });

    // Node labels with conditional styling
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children ? -12 : 12)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .style('font-size', '12px')
      .style('font-family', 'monospace')
      .style('fill', d => {
        const matches = nodeMatchesFilters(d.data);
        return matches ? '#fff' : '#9ca3af';
      })
      .style('opacity', d => {
        const matches = nodeMatchesFilters(d.data);
        return matches ? 1 : 0.6;
      })
      .style('pointer-events', 'none')
      .text(d => d.data.data?.title || d.data.id);

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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header Controls */}
      <div className="bg-black/90 border-b border-green-400/20 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-mono text-green-400">🧠 Matrix Story Map D3</h1>
          
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

          {/* Layer Controls Toggle */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowLayerControls(!showLayerControls)}
              className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                showLayerControls || activeFilterCount > 0
                  ? 'bg-purple-900 text-purple-300 border-purple-400'
                  : 'bg-gray-900 text-gray-400 border-gray-600 hover:border-gray-500'
              }`}
            >
              🎛️ Layers {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            
            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="px-2 py-1 rounded text-xs font-mono border border-red-400/60 bg-red-900/40 text-red-300 hover:bg-red-900/60 transition-colors"
              >
                ✕ Reset
              </button>
            )}
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

      {/* Layer Controls Panel */}
      {showLayerControls && (
        <div className="fixed top-20 right-4 bg-black/95 border border-green-400/30 rounded-lg p-4 max-w-xs max-h-[70vh] overflow-y-auto shadow-xl backdrop-blur-sm z-30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-mono text-green-400 font-bold">🎛️ Layer Filters</h3>
            <button
              onClick={() => setShowLayerControls(false)}
              className="text-gray-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>

          {/* Characters Section */}
          {filterOptions.characters.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm">🎭</span>
                <span className="text-purple-400 font-mono text-xs font-bold">
                  Characters ({activeCharacterFilters.length})
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filterOptions.characters.map(character => (
                  <button
                    key={character}
                    onClick={() => toggleCharacterFilter(character)}
                    className={`px-2 py-1 rounded text-xs font-mono border transition-colors text-left ${
                      activeCharacterFilters.includes(character)
                        ? 'bg-purple-900/40 text-purple-300 border-purple-400/60'
                        : 'bg-gray-900/40 text-gray-400 border-gray-600/40 hover:border-gray-500'
                    }`}
                  >
                    {character}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Puzzles Section */}
          {filterOptions.puzzles.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm">🧩</span>
                <span className="text-yellow-400 font-mono text-xs font-bold">
                  Puzzles ({activePuzzleFilters.length})
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filterOptions.puzzles.map(puzzle => (
                  <button
                    key={puzzle}
                    onClick={() => togglePuzzleFilter(puzzle)}
                    className={`px-2 py-1 rounded text-xs font-mono border transition-colors text-left ${
                      activePuzzleFilters.includes(puzzle)
                        ? 'bg-yellow-900/40 text-yellow-300 border-yellow-400/60'
                        : 'bg-gray-900/40 text-gray-400 border-gray-600/40 hover:border-gray-500'
                    }`}
                  >
                    {puzzle}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Interactions Section */}
          {filterOptions.interactions.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm">🎬</span>
                <span className="text-blue-400 font-mono text-xs font-bold">
                  Interactions ({activeInteractionFilters.length})
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filterOptions.interactions.map(interaction => (
                  <button
                    key={interaction}
                    onClick={() => toggleInteractionFilter(interaction)}
                    className={`px-2 py-1 rounded text-xs font-mono border transition-colors text-left ${
                      activeInteractionFilters.includes(interaction)
                        ? 'bg-blue-900/40 text-blue-300 border-blue-400/60'
                        : 'bg-gray-900/40 text-gray-400 border-gray-600/40 hover:border-gray-500'
                    }`}
                  >
                    {interaction}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {filterOptions.features.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm">💠</span>
                <span className="text-emerald-400 font-mono text-xs font-bold">
                  Features ({activeFeatureFilters.length})
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {filterOptions.features.map(feature => {
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
                    <button
                      key={feature}
                      onClick={() => toggleFeatureFilter(feature)}
                      className={`px-2 py-1 rounded text-xs font-mono border transition-colors text-left flex items-center gap-1 ${
                        activeFeatureFilters.includes(feature)
                          ? 'bg-emerald-900/40 text-emerald-300 border-emerald-400/60'
                          : 'bg-gray-900/40 text-gray-400 border-gray-600/40 hover:border-gray-500'
                      }`}
                    >
                      <span className="text-[10px]">{getFeatureIcon(feature)}</span>
                      {getFeatureLabel(feature)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reset All Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="w-full px-3 py-2 rounded text-xs font-mono border border-red-400/60 bg-red-900/40 text-red-300 hover:bg-red-900/60 transition-colors"
            >
              ✕ Reset All Filters
            </button>
          )}
        </div>
      )}

      {/* Main SVG Canvas */}
      <div className="relative">
        <svg
          ref={svgRef}
          className="w-full bg-gradient-to-br from-gray-900 to-black border border-green-400/20"
          style={{ minHeight: '800px' }}
        />
        
        {/* Help Text */}
        <div className="absolute top-4 left-4 bg-black/80 text-xs text-gray-400 p-3 rounded border border-gray-600 font-mono">
          <div>🖱️ Click nodes to explore</div>
          <div>🔍 Scroll to zoom</div>
          <div>✋ Drag to pan</div>
          <div>🎛️ Use layer filters to highlight</div>
          <div>⚡ Toggle layouts & filters</div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="absolute top-4 right-4 bg-black/80 text-xs p-3 rounded border border-purple-400/40 font-mono max-w-xs">
            <div className="text-purple-400 font-bold mb-1">Active Filters:</div>
            {activeCharacterFilters.length > 0 && (
              <div className="text-purple-300">🎭 Characters: {activeCharacterFilters.join(', ')}</div>
            )}
            {activePuzzleFilters.length > 0 && (
              <div className="text-yellow-300">🧩 Puzzles: {activePuzzleFilters.join(', ')}</div>
            )}
            {activeInteractionFilters.length > 0 && (
              <div className="text-blue-300">🎬 Interactions: {activeInteractionFilters.join(', ')}</div>
            )}
            {activeFeatureFilters.length > 0 && (
              <div className="text-emerald-300">💠 Features: {activeFeatureFilters.map(f => f.replace('has', '').replace(/([A-Z])/g, ' $1').trim()).join(', ')}</div>
            )}
          </div>
        )}
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="fixed bottom-6 right-6 bg-black/95 border border-green-400/30 rounded-lg p-3 max-w-[360px] max-h-[75vh] overflow-y-auto shadow-xl backdrop-blur-sm">
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