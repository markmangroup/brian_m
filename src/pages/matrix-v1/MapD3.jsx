import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { realMatrixNodes, realMatrixEdges } from './realMatrixFlow';
import { convertToTree, filterTreeByStatus, findPathToNode } from '../../utils/convertToTree';
import { useTheme } from '../../theme/ThemeContext';

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

export default function MapD3() {
  const svgRef = useRef();
  const searchInputRef = useRef();
  const { currentTheme, theme, getThemeD3 } = useTheme();
  
  const [layoutType, setLayoutType] = useState(LAYOUT_TYPES.tree);
  const [statusFilter, setStatusFilter] = useState(['live', 'wip', 'stub']);
  const [selectedNode, setSelectedNode] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['matrix-v1-entry']));
  
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
    if (!node || !node.unlockConditions || node.unlockConditions.length === 0) {
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
    
    // Apply dramatically different layouts based on selected type
    let treeLayout;
    let nodeRadius, separation, linkGenerator;
    
    switch (layoutType) {
      case LAYOUT_TYPES.cluster:
        // HORIZONTAL FLOWING CLUSTER - nodes spread horizontally like a river
        treeLayout = d3.cluster()
          .size([height - margin.top - margin.bottom, width - margin.left - margin.right - 100])
          .separation((a, b) => (a.parent === b.parent ? 2 : 3));
        
        nodeRadius = d => d.children ? 10 : 7;
        separation = 1.8;
        linkGenerator = d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x);
          
        g.attr('transform', `translate(${margin.left + 50},${margin.top})`);
        break;
        
      case LAYOUT_TYPES.radial:
        // IMPROVED RADIAL CLUSTER - uniform distribution around circle
        const radius = Math.min(width, height) / 2 - 150;
        treeLayout = d3.cluster() // Using cluster for better leaf distribution!
          .size([2 * Math.PI, radius])
          .separation((a, b) => (a.parent === b.parent ? 1.2 : 2.5) / a.depth);
        
        nodeRadius = d => d.children ? 12 : 8;
        separation = 2.0;
        linkGenerator = d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y);
          
        g.attr('transform', `translate(${width / 2},${height / 2})`);
        break;
        
      case LAYOUT_TYPES.network:
        // FORCE-DIRECTED NETWORK LAYOUT - completely different approach
        const filteredNodes = realMatrixNodes.filter(node => 
          statusFilter.includes(node.data?.status || 'unknown') && 
          nodeMatchesFilters(node)
        );
        
        const filteredEdges = realMatrixEdges.filter(edge => 
          filteredNodes.some(n => n.id === edge.source) && 
          filteredNodes.some(n => n.id === edge.target)
        );

        // Prepare nodes for force simulation
        const forceNodes = filteredNodes.map(node => ({
          ...node,
          x: Math.random() * width,
          y: Math.random() * height,
          fx: null, // Fixed position (null = not fixed)
          fy: null
        }));

        // Create force simulation
        const simulation = d3.forceSimulation(forceNodes)
          .force('link', d3.forceLink(filteredEdges)
            .id(d => d.id)
            .distance(linkDistance)
            .strength(0.3))
          .force('charge', d3.forceManyBody()
            .strength(forceStrength))
          .force('center', d3.forceCenter(width / 2, height / 2)
            .strength(centerStrength))
          .force('collide', d3.forceCollide(collideRadius));

        nodeRadius = d => {
          const status = d.data?.status;
          const baseRadius = 8;
          if (status === 'live') return baseRadius + 3;
          if (status === 'wip') return baseRadius + 1;
          return baseRadius;
        };

        // Draw force-directed network
        const networkLinks = g.selectAll('.network-link')
          .data(filteredEdges)
          .enter().append('line')
          .attr('class', 'network-link')
          .style('stroke', d => {
            const targetNode = realMatrixNodes.find(n => n.id === d.target);
            const isUnlocked = checkUnlockConditions(targetNode, realMatrixNodes);
            return isUnlocked ? themeConfigs[currentTheme].linkColor : '#7f1d1d';
          })
          .style('stroke-width', 2)
          .style('stroke-opacity', 0.7)
          .style('stroke-dasharray', d => {
            const targetNode = realMatrixNodes.find(n => n.id === d.target);
            const isUnlocked = checkUnlockConditions(targetNode, realMatrixNodes);
            return !isUnlocked ? '5,5' : 'none';
          })
          .style('filter', `drop-shadow(0 0 2px ${themeConfigs[currentTheme].linkColor})`);

        // Create drag behavior
        const dragBehavior = d3.drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            // Keep node fixed on double-click, unfix on single release
            if (event.sourceEvent.detail !== 2) {
              d.fx = null;
              d.fy = null;
            }
          });

        const networkNodes = g.selectAll('.network-node')
          .data(forceNodes)
          .enter().append('g')
          .attr('class', 'network-node')
          .style('cursor', 'grab')
          .call(dragBehavior)
          .on('click', (event, d) => handleNodeClick({ data: d }))
          .on('dblclick', (event, d) => {
            // Toggle fixed position
            if (d.fx !== null) {
              d.fx = null;
              d.fy = null;
            } else {
              d.fx = d.x;
              d.fy = d.y;
            }
          });

        // Network node circles
        networkNodes.append('circle')
          .attr('r', nodeRadius)
          .style('fill', d => {
            const baseColor = getNodeColor(d);
            return d3.color(baseColor).brighter(0.2);
          })
          .style('stroke', d => {
            const matches = nodeMatchesFilters(d);
            const isUnlocked = checkUnlockConditions(d, realMatrixNodes);
            
            if (!isUnlocked) return '#7f1d1d';
            return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                              activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0) 
              ? themeConfigs[currentTheme].nodeColor : '#fff';
          })
          .style('stroke-width', d => {
            const matches = nodeMatchesFilters(d);
            const baseWidth = matches ? 3 : 2;
            return d.fx !== null ? baseWidth + 2 : baseWidth; // Thicker stroke for fixed nodes
          })
          .style('filter', d => {
            const matches = nodeMatchesFilters(d);
            const isNightCityNode = d.group === 'night-city';
            const isCyberpunkTheme = currentTheme === 'cyberpunk';
            
            if (isNightCityNode && isCyberpunkTheme) {
              return `drop-shadow(0 0 15px #ec4899) drop-shadow(0 0 30px #a855f7) drop-shadow(0 0 45px #06b6d4)`;
            }
            
            if (matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                           activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0)) {
              return `drop-shadow(0 0 12px ${themeConfigs[currentTheme].nodeColor}) drop-shadow(0 0 20px ${themeConfigs[currentTheme].nodeColor})`;
            }
            
            return 'drop-shadow(0 0 6px rgba(255,255,255,0.3))';
          });

        // Network node labels
        networkNodes.append('text')
          .attr('dy', '0.35em')
          .attr('text-anchor', 'middle')
          .text(d => d.data?.title || d.id)
          .style('fill', d => {
            const matches = nodeMatchesFilters(d);
            const isUnlocked = checkUnlockConditions(d, realMatrixNodes);
            
            if (!isUnlocked) return '#dc2626';
            return matches ? themeConfigs[currentTheme].primaryColor.replace('text-', '') : '#e5e7eb';
          })
          .style('font-size', '10px')
          .style('font-family', 'monospace')
          .style('font-weight', 'bold')
          .style('text-shadow', `0 0 3px ${themeConfigs[currentTheme].linkColor}`)
          .style('pointer-events', 'none');

        // Status indicators for network nodes
        networkNodes.append('text')
          .attr('dy', '-12px')
          .attr('text-anchor', 'middle')
          .style('font-size', '8px')
          .style('pointer-events', 'none')
          .text(d => {
            const status = d.data?.status;
            switch (status) {
              case 'live': return '🟢';
              case 'wip': return '🟡';
              case 'stub': return '🔴';
              default: return '';
            }
          });

        // Lock icons for unlocked nodes
        networkNodes.filter(d => !checkUnlockConditions(d, realMatrixNodes))
          .append('text')
          .attr('dy', '15px')
          .attr('text-anchor', 'middle')
          .style('font-size', '12px')
          .style('fill', '#dc2626')
          .style('pointer-events', 'none')
          .text('🔒');

        // Update positions on simulation tick
        simulation.on('tick', () => {
          networkLinks
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          networkNodes
            .attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Store simulation for controls
        g.simulation = simulation;
        
        return; // Exit early for network layout
        
      default: // LAYOUT_TYPES.tree
        // ENHANCED VERTICAL TREE - classic top-down hierarchy
        treeLayout = d3.tree()
          .size([width - margin.left - margin.right, height - margin.top - margin.bottom - 100])
          .separation((a, b) => (a.parent === b.parent ? 1.5 : 2.8));
        
        nodeRadius = d => d.children ? 9 : 6;
        separation = 1.6;
        linkGenerator = d3.linkVertical()
          .x(d => d.x)
          .y(d => d.y);
          
        g.attr('transform', `translate(${margin.left},${margin.top + 50})`);
    }

    const treeData = treeLayout(root);
    const theme = themeConfigs[currentTheme];

    // Enhanced link styling with layout-specific animations
    const links = g.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .style('fill', 'none')
      .style('stroke', theme.linkColor)
      .style('stroke-width', d => {
        // Different stroke widths based on layout
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return 3;
          case LAYOUT_TYPES.radial: return 2.5;
          case LAYOUT_TYPES.network: return 2;
          default: return 2;
        }
      })
      .style('stroke-opacity', 0.7)
      .style('stroke-linecap', 'round')
      .style('filter', `drop-shadow(0 0 3px ${theme.linkColor})`)
      .style('stroke-dasharray', d => {
        // Animated dashes for radial layout
        return layoutType === LAYOUT_TYPES.radial ? '8,4' : 'none';
      });

    // Animate dash array for radial layout
    if (layoutType === LAYOUT_TYPES.radial) {
      links.style('stroke-dashoffset', 0)
        .transition()
        .duration(8000)
        .ease(d3.easeLinear)
        .style('stroke-dashoffset', -100)
        .on('end', function repeat() {
          d3.select(this)
            .transition()
            .duration(8000)
            .ease(d3.easeLinear)
            .style('stroke-dashoffset', -200)
            .on('end', repeat);
        });
    }

    // Enhanced nodes with layout-specific positioning
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster:
            return `translate(${d.y},${d.x})`;
          case LAYOUT_TYPES.radial:
            return `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`;
          case LAYOUT_TYPES.network:
            return `translate(${d.x},${d.y})`;
          default: // tree
            return `translate(${d.x},${d.y})`;
        }
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d));

    // Enhanced node circles with layout-specific sizing and effects
    nodes.append('circle')
      .attr('r', nodeRadius)
      .style('fill', d => {
        const baseColor = getNodeColor(d.data);
        // Add layout-specific color variations
        switch (layoutType) {
          case LAYOUT_TYPES.cluster:
            return d3.color(baseColor).brighter(0.3);
          case LAYOUT_TYPES.radial:
            return d3.color(baseColor).darker(0.2);
          case LAYOUT_TYPES.network:
            return d3.color(baseColor).brighter(0.3);
          default:
            return baseColor;
        }
      })
      .style('stroke', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return '#7f1d1d';
        }
        
        return matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                          activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0) 
          ? themeConfigs[currentTheme].nodeColor : '#fff';
      })
      .style('stroke-width', d => {
        const matches = nodeMatchesFilters(d.data);
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        
        if (!isUnlocked) {
          return 4;
        }
        
        // Layout-specific stroke widths
        const baseWidth = matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                                     activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0) ? 4 : 2;
        
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return baseWidth + 1;
          case LAYOUT_TYPES.radial: return baseWidth + 0.5;
          case LAYOUT_TYPES.network: return baseWidth;
          default: return baseWidth;
        }
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
        const isNightCityNode = d.data.group === 'night-city';
        const isCyberpunkTheme = currentTheme === 'cyberpunk';
        
        if (!isUnlocked) {
          return 'drop-shadow(0 0 6px rgb(127 29 29 / 0.8))';
        }
        
        // Special Night City neon effects
        if (isNightCityNode && isCyberpunkTheme) {
          return `drop-shadow(0 0 15px #ec4899) drop-shadow(0 0 30px #a855f7) drop-shadow(0 0 45px #06b6d4)`;
        }
        
        // Enhanced glow effects based on layout
        if (matches && (activeCharacterFilters.length > 0 || activePuzzleFilters.length > 0 || 
                       activeInteractionFilters.length > 0 || activeFeatureFilters.length > 0)) {
          switch (layoutType) {
            case LAYOUT_TYPES.cluster:
              return `drop-shadow(0 0 12px ${themeConfigs[currentTheme].nodeColor}) drop-shadow(0 0 20px ${themeConfigs[currentTheme].nodeColor})`;
            case LAYOUT_TYPES.radial:
              return `drop-shadow(0 0 8px ${themeConfigs[currentTheme].nodeColor}) drop-shadow(0 0 16px ${themeConfigs[currentTheme].nodeColor})`;
            case LAYOUT_TYPES.network:
              return `drop-shadow(0 0 12px ${themeConfigs[currentTheme].nodeColor}) drop-shadow(0 0 20px ${themeConfigs[currentTheme].nodeColor})`;
            default:
              return `drop-shadow(0 0 8px ${themeConfigs[currentTheme].nodeColor})`;
          }
        }
        
        return 'none';
      })
      .style('stroke-dasharray', d => {
        const isUnlocked = checkUnlockConditions(d.data, realMatrixNodes);
        return !isUnlocked ? '3,3' : 'none';
      });

    // Enhanced node labels with layout-specific positioning
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster:
            return d.children ? -15 : 15;
          case LAYOUT_TYPES.radial:
            return (d.x < Math.PI) === !d.children ? 10 : -10;
          case LAYOUT_TYPES.network:
            return 0;
          default: // tree
            return 0;
        }
      })
      .attr('y', d => {
        // For tree layout, position text below nodes
        return layoutType === LAYOUT_TYPES.tree ? (d.children ? -15 : 18) : 0;
      })
      .style('text-anchor', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster:
            return d.children ? 'end' : 'start';
          case LAYOUT_TYPES.radial:
            return (d.x < Math.PI) === !d.children ? 'start' : 'end';
          case LAYOUT_TYPES.network:
            return 'middle';
          default: // tree
            return 'middle';
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
          ? themeConfigs[currentTheme].primaryColor.replace('text-', '') : '#e5e7eb';
      })
      .style('font-size', d => {
        // Layout-specific font sizes
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return '12px';
          case LAYOUT_TYPES.radial: return '10px';
          case LAYOUT_TYPES.network: return '11px';
          default: return '11px';
        }
      })
      .style('font-family', 'monospace')
      .style('font-weight', d => d.children ? 'bold' : 'normal')
      .style('text-shadow', `0 0 3px ${themeConfigs[currentTheme].linkColor}`)
      .style('pointer-events', 'none');

    // Enhanced status indicators with layout-specific positioning
    nodes.append('text')
      .attr('dy', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return d.children ? -8 : -12;
          case LAYOUT_TYPES.radial: return -8;
          case LAYOUT_TYPES.network: return -15;
          default: return -15;
        }
      })
      .attr('x', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return d.children ? -8 : 8;
          case LAYOUT_TYPES.radial: return 0;
          case LAYOUT_TYPES.network: return 0;
          default: return 0;
        }
      })
      .style('text-anchor', 'middle')
      .style('font-size', layoutType === LAYOUT_TYPES.radial ? '7px' : '8px')
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

    // Lock icons with layout-specific positioning
    nodes.filter(d => !checkUnlockConditions(d.data, realMatrixNodes))
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return d.children ? -30 : 30;
          case LAYOUT_TYPES.radial: return (d.x < Math.PI) ? 15 : -15;
          case LAYOUT_TYPES.network: return 0;
          default: return 0;
        }
      })
      .attr('y', d => layoutType === LAYOUT_TYPES.tree ? 25 : 0)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#dc2626')
      .style('pointer-events', 'none')
      .text('🔒');

    // Enhanced expand/collapse indicators
    nodes.filter(d => d.children || d._children)
      .append('circle')
      .attr('r', 8)
      .attr('cy', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return 0;
          case LAYOUT_TYPES.radial: return 0;
          case LAYOUT_TYPES.network: return 0;
          default: return 0;
        }
      })
      .style('fill', themeConfigs[currentTheme].nodeColor)
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .style('opacity', 0.8);

    nodes.filter(d => d.children || d._children)
      .append('text')
      .attr('dy', '.35em')
      .attr('cy', d => {
        switch (layoutType) {
          case LAYOUT_TYPES.cluster: return 0;
          case LAYOUT_TYPES.radial: return 0;
          case LAYOUT_TYPES.network: return 0;
          default: return 0;
        }
      })
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('fill', '#000')
      .style('pointer-events', 'none')
      .text(d => d.children ? '−' : '+');

    // Add layout-specific visual enhancements
    if (layoutType === LAYOUT_TYPES.radial) {
      // Add concentric circles for depth guides in radial layout
      const depthCircles = [100, 200, 300, 400];
      depthCircles.forEach(radius => {
        g.append('circle')
          .attr('r', radius)
          .style('fill', 'none')
          .style('stroke', themeConfigs[currentTheme].linkColor)
          .style('stroke-width', 0.5)
          .style('stroke-opacity', 0.2)
          .style('stroke-dasharray', '2,8');
      });
    }

    if (layoutType === LAYOUT_TYPES.cluster) {
      // Add flowing lines background for cluster layout
      const flowLines = d3.range(5).map(i => ({
        y: (height / 6) * (i + 1),
        opacity: 0.1 - (i * 0.015)
      }));
      
      flowLines.forEach(line => {
        g.append('line')
          .attr('x1', 0)
          .attr('y1', line.y)
          .attr('x2', width - margin.left - margin.right)
          .attr('y2', line.y)
          .style('stroke', themeConfigs[currentTheme].linkColor)
          .style('stroke-width', 1)
          .style('stroke-opacity', line.opacity)
          .style('stroke-dasharray', '10,20');
      });
    }

  }, [filteredTree, layoutType, expandedNodes, nodeMatchesFilters, activeCharacterFilters, activePuzzleFilters, activeInteractionFilters, activeFeatureFilters, currentTheme, themeConfigs, checkUnlockConditions, forceStrength, linkDistance, centerStrength, collideRadius]);

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