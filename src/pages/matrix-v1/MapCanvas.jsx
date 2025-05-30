import React, { useState, useMemo, useEffect, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, useReactFlow, MarkerType } from 'reactflow';
import 'reactflow/dist/base.css';
import ZoomHUD from './ZoomHUD';
import {
  SceneNode,
  DialogueNode,
  ChoiceNode,
  EndingNode
} from './CustomNode';
import { edges } from './edges';
import { realMatrixNodes, realMatrixEdges } from './realMatrixFlow';

const nodeTypes = {
  scene: SceneNode,
  dialogue: DialogueNode,
  choice: ChoiceNode,
  ending: EndingNode,
  npc: SceneNode,
  end: EndingNode,
  faction: SceneNode,
  training: DialogueNode,
};

const NODE_TYPE_FILTERS = [
  { key: 'scene', label: '🎬 Scene', color: 'blue' },
  { key: 'dialogue', label: '💬 Dialogue', color: 'green' },
  { key: 'choice', label: '🤔 Choice', color: 'purple' },
  { key: 'ending', label: '🏁 Ending', color: 'red' },
  { key: 'npc', label: '👤 NPC', color: 'yellow' },
  { key: 'faction', label: '⚔️ Faction', color: 'orange' },
  { key: 'training', label: '🧪 Training', color: 'cyan' },
  { key: 'end', label: '🛑 End', color: 'red' },
];

// Enhanced overlay groups with better styling
const overlayGroups = [
  {
    id: 'intro',
    label: 'Introduction',
    color: 'bg-cyan-900/20 border-cyan-400/40',
    bounds: { x: 60, y: 140, width: 480, height: 180 }
  },
  {
    id: 'red-pill',
    label: 'Red Pill Path',
    color: 'bg-red-900/20 border-red-400/40',
    bounds: { x: 700, y: 60, width: 520, height: 180 }
  },
  {
    id: 'blue-pill',
    label: 'Blue Pill Path',
    color: 'bg-blue-900/20 border-blue-400/40',
    bounds: { x: 720, y: 320, width: 420, height: 180 }
  }
];

// Enhanced edge styles
const getEdgeStyle = (edge) => {
  const baseStyle = {
    stroke: '#60a5fa',
    strokeWidth: 2,
    strokeDasharray: '5,5',
    animation: 'flow-dash 1s linear infinite',
  };

  // Different styles for different connection types
  if (edge.type === 'main') {
    return {
      ...baseStyle,
      stroke: '#60a5fa',
      strokeWidth: 3,
      strokeDasharray: 'none',
    };
  }

  if (edge.type === 'choice') {
    return {
      ...baseStyle,
      stroke: '#a78bfa',
      strokeWidth: 2,
    };
  }

  if (edge.type === 'ending') {
    return {
      ...baseStyle,
      stroke: '#f87171',
      strokeWidth: 2,
    };
  }

  return baseStyle;
};

// Enhanced node layout with better spacing
const getNodeLayout = (node) => {
  const baseLayout = {
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
    transform: 'translate(0, 0)',
  };

  if (node.type === 'choice' && node.data.isExpanded) {
    return {
      ...baseLayout,
      zIndex: 10,
      transform: 'scale(1.05)',
    };
  }

  return baseLayout;
};

// Improved layout function - don't override positions for overlay nodes
function layoutNodesByDepth(nodes, useOverlayPositions = false) {
  if (useOverlayPositions) {
    // For overlay nodes, use their predefined positions, but always ensure x and y are defined
    return nodes.map(node => {
      let pos = node.position;
      if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number') {
        pos = { x: 0, y: 0 };
      }
      return {
        ...node,
        position: pos
      };
    });
  }

  const spacingX = 300;
  const spacingY = 220;
  const groupOffsets = {
    'intro': { x: 0, y: 0 },
    'red-pill': { x: 0, y: -100 },
    'blue-pill': { x: 0, y: 100 },
    'main': { x: 0, y: 0 },
    'training': { x: 0, y: 200 },
    'factions': { x: 0, y: 300 }
  };

  const depthBuckets = {};

  return nodes.map((node, idx) => {
    const depth = typeof node.depth === 'number' ? node.depth : 0;
    const group = node.group || 'intro';
    const groupOffset = groupOffsets[group] || { x: 0, y: 0 };

    if (!depthBuckets[depth]) {
      depthBuckets[depth] = {};
    }
    if (!depthBuckets[depth][group]) {
      depthBuckets[depth][group] = 0;
    }

    let pos = node.position;
    if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number') {
      pos = {
        x: depth * spacingX + groupOffset.x,
        y: depthBuckets[depth][group] * spacingY + groupOffset.y
      };
    }

    depthBuckets[depth][group]++;

    return {
      ...node,
      position: pos
    };
  });
}

function MapCanvasInner({ nodes }) {
  const [activeTypes, setActiveTypes] = useState(() => NODE_TYPE_FILTERS.map(f => f.key));
  const [showEdges, setShowEdges] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [highlightPath, setHighlightPath] = useState(true);
  const [showRealPath, setShowRealPath] = useState(true);
  const [expandedPaths, setExpandedPaths] = useState(['matrix-pill-choice']); // Start with choice expanded
  const [focusedOverlayNodeId, setFocusedOverlayNodeId] = useState(null);
  
  const reactFlowInstance = useReactFlow();

  // Helper functions
  const getChoiceChildren = useCallback((choiceId) => {
    return realMatrixNodes.filter(n => n.parentChoice === choiceId);
  }, []);

  const getBaseNodes = useCallback(() => {
    return realMatrixNodes.filter(n => !n.parentChoice);
  }, []);

  const getVisibleOverlayNodes = useCallback(() => {
    const baseNodes = getBaseNodes();
    const expandedNodes = expandedPaths.flatMap(choiceId => getChoiceChildren(choiceId));
    return [...baseNodes, ...expandedNodes];
  }, [expandedPaths, getBaseNodes, getChoiceChildren]);

  const getVisibleOverlayEdges = useCallback(() => {
    const visibleNodeIds = new Set(getVisibleOverlayNodes().map(n => n.id));
    return realMatrixEdges.filter(edge => 
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );
  }, [getVisibleOverlayNodes]);

  // Get downstream nodes for focus functionality
  const getDownstreamNodes = useCallback((nodeId, visited = new Set()) => {
    if (!nodeId || visited.has(nodeId)) return visited;
    visited.add(nodeId);
    realMatrixEdges.forEach(e => {
      if (e.source === nodeId) {
        getDownstreamNodes(e.target, visited);
      }
    });
    return visited;
  }, []);

  // Memoized computations
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => activeTypes.includes(n.type));
  }, [nodes, activeTypes]);

  const laidOutNodes = useMemo(() => 
    layoutNodesByDepth(filteredNodes, false), 
    [filteredNodes]
  );

  const overlayNodes = useMemo(() => {
    const visibleNodes = getVisibleOverlayNodes();
    const focusedNodeSet = focusedOverlayNodeId ? getDownstreamNodes(focusedOverlayNodeId) : null;
    
    return visibleNodes.map(node => ({
      ...node,
      className: focusedNodeSet && !focusedNodeSet.has(node.id) ? 'opacity-30' : '',
      data: {
        ...node.data,
        isOverlay: true,
        onMouseEnter: () => setHoveredNode({ 
          id: node.id, 
          type: node.type, 
          x: window.event?.clientX || 0, 
          y: window.event?.clientY || 0 
        }),
        onMouseLeave: () => setHoveredNode(null),
        onClick: () => {
          setFocusedOverlayNodeId(focusedOverlayNodeId === node.id ? null : node.id);
        },
      }
    }));
  }, [getVisibleOverlayNodes, focusedOverlayNodeId, getDownstreamNodes]);

  const overlayEdges = useMemo(() => {
    const visibleEdges = getVisibleOverlayEdges();
    const focusedNodeSet = focusedOverlayNodeId ? getDownstreamNodes(focusedOverlayNodeId) : null;
    
    return visibleEdges.map(edge => ({
      ...edge,
      style: {
        stroke: '#06b6d4',
        strokeWidth: 2,
        opacity: focusedNodeSet && (!focusedNodeSet.has(edge.source) || !focusedNodeSet.has(edge.target)) ? 0.2 : 0.8,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#06b6d4',
        width: 20,
        height: 20,
      }
    }));
  }, [getVisibleOverlayEdges, focusedOverlayNodeId, getDownstreamNodes]);

  // Enhanced choice node type for overlay
  const overlayNodeTypes = useMemo(() => ({
    ...nodeTypes,
    choice: (props) => {
      const { id } = props;
      const hasChildren = getChoiceChildren(id).length > 0;
      const isExpanded = expandedPaths.includes(id);
      
      return (
        <div className="relative">
          {props.data.isOverlay && (
            <div className="absolute -top-2 -left-2 bg-cyan-500 text-black text-xs px-2 py-1 rounded font-mono font-bold z-10">
              OVERLAY
            </div>
          )}
          <ChoiceNode
            {...props}
            isExpandable={hasChildren}
            isExpanded={isExpanded}
            onBranchToggle={() => {
              setExpandedPaths(prev =>
                prev.includes(id)
                  ? prev.filter(x => x !== id)
                  : [...prev, id]
              );
            }}
          />
        </div>
      );
    }
  }), [nodeTypes, getChoiceChildren, expandedPaths]);

  // Main flow edges
  const visibleEdges = useMemo(() => {
    const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
    return edges
      .filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      .map(e => ({
        ...e,
        style: {
          strokeWidth: 2,
          stroke: highlightPath && e.source === 'start' ? 'cyan' : 'rgba(255,255,255,0.2)',
          strokeDasharray: e.animated ? '6 3' : undefined,
        },
        animated: highlightPath && e.source === 'start',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#fff',
          width: 24,
          height: 24,
        },
      }));
  }, [filteredNodes, highlightPath]);

  const styledEdges = showEdges ? visibleEdges : [];

  // Event handlers
  const toggleType = (type) => {
    setActiveTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setActiveTypes(NODE_TYPE_FILTERS.map(f => f.key));
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.8 });
    }, 100);
  };

  const handleNodeMouseEnter = (event, node) => {
    setHoveredNode({ id: node.id, type: node.type, x: event.clientX, y: event.clientY });
  };

  const handleNodeMouseLeave = () => setHoveredNode(null);

  const handleNodeClick = (event, node) => {
    if (node.type === 'choice') {
      // Expansion/collapse logic would go here if nodes were in local state
      // Currently, nodes are static or managed elsewhere, so do nothing
    }
  };

  // Effects
  useEffect(() => {
    const timeout = setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.8, duration: 800 });
    }, 300);
    return () => clearTimeout(timeout);
  }, [nodes, reactFlowInstance]);

  return (
    <>
      {/* Enhanced Filter Bar */}
      <div className="flex gap-2 flex-wrap mb-2 px-4 py-3 bg-black/90 text-sm text-white sticky top-0 z-50 items-center border-b border-green-400/20 backdrop-blur">
        <div className="flex items-center gap-2 flex-wrap">
          {NODE_TYPE_FILTERS.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => toggleType(key)}
              className={`px-3 py-1 rounded border transition-all duration-200 font-mono text-xs ${
                activeTypes.includes(key)
                  ? `bg-${color}-500/20 text-${color}-300 border-${color}-400/60 shadow-${color}-400/20 shadow`
                  : 'bg-gray-900 border-gray-600 text-gray-400 hover:border-gray-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleResetFilters}
            className="px-3 py-1 rounded border border-purple-400/60 bg-purple-900/40 text-purple-300 font-mono text-xs hover:bg-purple-900/60 transition-colors duration-200"
          >
            Reset All
          </button>
          
          <label className="flex items-center gap-2 cursor-pointer select-none font-mono text-xs">
            <input
              type="checkbox"
              checked={highlightPath}
              onChange={() => setHighlightPath(v => !v)}
              className="accent-cyan-500"
            />
            <span className="text-cyan-300">Highlight Start Path</span>
          </label>

          <button
            onClick={() => setShowRealPath(!showRealPath)}
            className={`px-3 py-1 rounded border font-mono text-xs transition-all duration-200 ${
              showRealPath 
                ? 'bg-cyan-900/40 text-cyan-300 border-cyan-400/60' 
                : 'bg-gray-900 border-gray-600 text-gray-400'
            }`}
          >
            📍 Real User Path
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div style={{ height: '100vh' }} className="relative">
        <div className="relative h-full w-full bg-[#121212] rounded-md shadow-md">
          {/* Background layers */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a]" />
          <div className="absolute inset-0 pointer-events-none z-10 bg-grid-small" />
          
          {/* Main ReactFlow */}
          <ReactFlow
            nodes={laidOutNodes}
            edges={styledEdges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.9 }}
            style={{ height: '100%', width: '100%', background: 'none' }}
            zoomOnScroll={true}
            panOnScroll={true}
            zoomOnScrollMode="ctrl"
            onNodeMouseEnter={handleNodeMouseEnter}
            onNodeMouseLeave={handleNodeMouseLeave}
            onNodeClick={handleNodeClick}
          />

          {/* Overlay Layer */}
          {showRealPath && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Group Labels */}
              {overlayGroups.map(group => (
                <div
                  key={group.id}
                  className={`absolute rounded-md border text-xs px-3 py-2 font-mono uppercase backdrop-blur-sm ${group.color} animate-pulse-box pointer-events-none`}
                  style={{
                    left: group.bounds.x,
                    top: group.bounds.y,
                    width: group.bounds.width,
                    height: group.bounds.height,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}
                >
                  <span className="text-white/90 drop-shadow">{group.label}</span>
                </div>
              ))}
              
              {/* Overlay ReactFlow */}
              <ReactFlow
                nodes={overlayNodes}
                edges={overlayEdges}
                nodeTypes={overlayNodeTypes}
                nodesDraggable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                edgesUpdatable={false}
                className="pointer-events-auto"
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  background: 'rgba(6, 182, 212, 0.02)' 
                }}
              />
              
              {/* Focus Clear Button */}
              {focusedOverlayNodeId && (
                <button
                  onClick={() => setFocusedOverlayNodeId(null)}
                  className="absolute top-4 right-4 z-30 px-3 py-1 rounded bg-cyan-900 text-cyan-200 border border-cyan-400 font-mono text-xs shadow hover:bg-cyan-700 transition pointer-events-auto"
                  title="Clear focus"
                >
                  ✕ Clear Focus
                </button>
              )}
            </div>
          )}
        </div>

        {/* UI Controls */}
        <ZoomHUD />
        <button
          onClick={() => setShowEdges(e => !e)}
          className="fixed bottom-6 right-6 px-3 py-1 rounded border border-white bg-gray-900 text-white shadow hover:bg-gray-700 transition-colors duration-200 z-50"
        >
          {showEdges ? 'Hide Edges' : 'Show Edges'}
        </button>

        {/* Hover Tooltip */}
        {hoveredNode && (
          <div
            className="pointer-events-none fixed px-3 py-2 rounded bg-black/90 text-xs text-white font-mono shadow-lg z-50 border border-green-400/20"
            style={{ left: hoveredNode.x + 12, top: hoveredNode.y + 12 }}
          >
            <div><b>ID:</b> {hoveredNode.id}</div>
            <div><b>Type:</b> {hoveredNode.type}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default function MapCanvas(props) {
  return (
    <ReactFlowProvider>
      <MapCanvasInner {...props} />
    </ReactFlowProvider>
  );
}