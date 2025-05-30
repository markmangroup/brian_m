import React, { useState, useMemo, useEffect } from 'react';
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
  { key: 'scene', label: '🟪 Scene' },
  { key: 'dialogue', label: '🟦 Dialogue' },
  { key: 'choice', label: '🟩 Choice' },
  { key: 'ending', label: '🟥 Ending' },
  { key: 'npc', label: '🟫 NPC' },
  { key: 'faction', label: '🟨 Faction' },
  { key: 'training', label: '🧪 Training' },
  { key: 'end', label: '🛑 End' },
];

const testNodes = [
  {
    id: 'test1',
    type: 'scene',
    position: { x: 0, y: 0 },
    data: {}
  }
];

function layoutNodesByDepth(nodes) {
  const spacingX = 300;
  const spacingY = 220;
  const manualDepths = {
    'scene-1': 0,
    'dialogue-1': 1,
    'choice-1': 2,
    'ending-1': 3,
    'scene-2': 1,
    'dialogue-2': 2,
    'choice-2': 3,
    'ending-2': 4,
    'start': 0,
  };

  const depthBuckets = {};

  return nodes.map((node, index) => {
    const depth = manualDepths[node.id] ?? 0;
    if (!depthBuckets[depth]) depthBuckets[depth] = 0;

    const position = {
      x: depth * spacingX,
      y: depthBuckets[depth] * spacingY,
    };

    depthBuckets[depth]++;

    return {
      ...node,
      position,
    };
  });
}

function MapCanvasInner({ nodes }) {
  const [activeTypes, setActiveTypes] = useState(() => NODE_TYPE_FILTERS.map(f => f.key));
  const [showEdges, setShowEdges] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [highlightPath, setHighlightPath] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const reactFlowInstance = useReactFlow();
  const [cursor, setCursor] = useState('grab');
  const [showRealPath, setShowRealPath] = useState(true);
  const [expandedPaths, setExpandedPaths] = useState([]);
  const [animatedOverlayNodes, setAnimatedOverlayNodes] = useState([]);
  const overlayFlowRef = React.useRef(null);
  const [hoveredOverlayNodeId, setHoveredOverlayNodeId] = useState(null);

  // Helper: get child nodes for a choice node
  function getChoiceChildren(choiceId) {
    const children = realMatrixNodes.filter(n => n.parentChoice === choiceId);
    console.log('getChoiceChildren', choiceId, children);
    return children;
  }
  // Helper: get child edges for a choice node
  function getChoiceEdges(choiceId) {
    return realMatrixEdges.filter(e => e.source === choiceId);
  }

  // Compute overlay nodes/edges based on expandedPaths
  const overlayNodes = useMemo(() => {
    let base = realMatrixNodes.filter(n => !n.parentChoice);
    let expanded = [];
    expandedPaths.forEach(choiceId => {
      expanded.push(...getChoiceChildren(choiceId));
    });
    return [...base, ...expanded];
  }, [expandedPaths]);

  // Animate new overlay nodes on expansion
  useEffect(() => {
    let base = realMatrixNodes.filter(n => !n.parentChoice);
    let expanded = [];
    let timeouts = [];
    expandedPaths.forEach((choiceId, i) => {
      const children = getChoiceChildren(choiceId);
      children.forEach((child, j) => {
        timeouts.push(setTimeout(() => {
          setAnimatedOverlayNodes(prev => {
            if (prev.find(n => n.id === child.id)) return prev;
            return [...prev, { ...child, _animate: true }];
          });
        }, 120 * (i + j)));
      });
    });
    // Always show base nodes immediately
    setAnimatedOverlayNodes(base.map(n => ({ ...n, _animate: false })));
    return () => timeouts.forEach(clearTimeout);
  }, [expandedPaths]);

  // Compose animated overlay nodes for ReactFlow
  const animatedNodesForOverlay = useMemo(() => {
    // Merge base and animated expanded nodes
    const ids = new Set();
    const all = [...animatedOverlayNodes];
    overlayNodes.forEach(n => {
      if (!ids.has(n.id)) {
        all.push(n);
        ids.add(n.id);
      }
    });
    const result = all.map(n => ({
      ...n,
      className: n._animate ? 'animate-fade-slide' : '',
      data: {
        ...n.data,
        isOverlay: true,
        onMouseEnter: () => setHoveredOverlayNodeId(n.id),
        onMouseLeave: () => setHoveredOverlayNodeId(null),
      },
    }));
    console.log('Overlay nodes', result);
    return result;
  }, [animatedOverlayNodes, overlayNodes]);

  const overlayEdges = useMemo(() => {
    let base = realMatrixEdges.filter(e => {
      // Only show edges between base nodes or to expanded children
      const src = realMatrixNodes.find(n => n.id === e.source);
      const tgt = realMatrixNodes.find(n => n.id === e.target);
      return (!src.parentChoice && !tgt?.parentChoice) || (expandedPaths.includes(e.source));
    });
    return base.map(edge => {
      const isHovered = hoveredOverlayNodeId && (edge.source === hoveredOverlayNodeId || edge.target === hoveredOverlayNodeId);
      return {
        ...edge,
        style: {
          stroke: isHovered ? '#22d3ee' : '#94a3b8',
          strokeWidth: isHovered ? 3 : 2,
          opacity: isHovered ? 1 : 0.3,
        },
        className: isHovered ? 'animate-pulse-glow' : '',
      };
    });
  }, [expandedPaths, hoveredOverlayNodeId]);

  // Overlay nodeTypes: inject branch icon for choice nodes
  const overlayNodeTypes = {
    ...nodeTypes,
    choice: (props) => {
      const { id } = props;
      const isExpandable = getChoiceChildren(id).length > 0;
      const isExpanded = expandedPaths.includes(id);
      return (
        <div style={{ border: '2px solid #00ffff', position: 'relative', background: 'rgba(0,255,255,0.05)' }}>
          <div style={{ position: 'absolute', top: 2, left: 8, color: '#00ffff', fontWeight: 'bold', fontSize: 10, zIndex: 10000 }}>OVERLAY</div>
          <ChoiceNode
            {...props}
            isExpandable={isExpandable}
            isExpanded={isExpanded}
            onBranchToggle={() => {
              setExpandedPaths((prev) =>
                prev.includes(id)
                  ? prev.filter(x => x !== id)
                  : [...prev, id]
              );
            }}
          />
        </div>
      );
    }
  };

  // Ensure overlay fitView on toggle
  useEffect(() => {
    if (showRealPath && overlayFlowRef.current) {
      overlayFlowRef.current.fitView?.({ padding: 0.8, duration: 600 });
    }
  }, [showRealPath]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.8, duration: 800 });
    }, 200);
    return () => clearTimeout(timeout);
  }, [nodes, reactFlowInstance]);

  const toggleType = (type) => {
    setActiveTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredNodes = useMemo(() => {
    return nodes.filter(n => activeTypes.includes(n.type));
  }, [nodes, activeTypes]);

  // 🧠 Layout nodes by depth for readability
  const laidOutNodes = useMemo(() => layoutNodesByDepth(filteredNodes), [filteredNodes]);

  // Highlight edges from 'start' node if highlightPath is true
  const visibleEdges = useMemo(() => {
    const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
    return edges
      .filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      .map(e => {
        if (highlightPath && e.source === 'start') {
          return {
            ...e,
            style: { ...e.style, stroke: 'cyan', strokeWidth: 3 },
            markerEnd: 'url(#arrowhead)',
            animated: true,
            label: e.label || '',
          };
        }
        return e;
      });
  }, [filteredNodes, highlightPath]);

  // 🧠 Style edges with smoothstep, arrows, and animation
  const styledEdges = useMemo(() =>
    (showEdges ? visibleEdges : []).map((e) => ({
      ...e,
      type: 'smoothstep',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#fff',
        width: 24,
        height: 24,
      },
      style: {
        strokeWidth: 2,
        stroke: 'rgba(255,255,255,0.2)',
        strokeDasharray: e.animated ? '6 3' : undefined,
        ...(e.style || {}),
      },
    })),
    [showEdges, visibleEdges]
  );

  const handleResetFilters = () => {
    setActiveTypes(NODE_TYPE_FILTERS.map(f => f.key));
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.8 });
    }, 0);
  };

  const handleNodeMouseEnter = (event, node) => {
    setHoveredNode({ id: node.id, type: node.type, x: event.clientX, y: event.clientY });
  };
  const handleNodeMouseLeave = () => setHoveredNode(null);

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-2 px-4 py-2 bg-black/80 text-sm text-white sticky top-0 z-50 items-center">
        {NODE_TYPE_FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleType(key)}
            className={`px-3 py-1 rounded border transition-colors duration-200 ${
              activeTypes.includes(key)
                ? 'bg-white text-black border-white shadow'
                : 'bg-black border-white/30 text-white/50'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={handleResetFilters}
          className="ml-4 px-3 py-1 rounded border border-white bg-purple-700 text-white font-bold shadow hover:bg-purple-600 transition-colors duration-200"
        >
          Reset Filters
        </button>
        <label className="ml-4 flex items-center gap-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={highlightPath}
            onChange={() => setHighlightPath(v => !v)}
            className="accent-cyan-500"
          />
          <span>Show path from start</span>
        </label>
        <button
          onClick={() => setShowRealPath(!showRealPath)}
          className={`text-xs px-3 py-1 rounded font-mono border ml-4 ${
            showRealPath ? 'bg-cyan-900 text-cyan-200 border-cyan-500' : 'bg-black text-white border-neutral-700'
          } hover:scale-105 transition`}
        >
          📍 Real User Path
        </button>
      </div>
      <div style={{ height: '100vh' }} className="relative">
        <div className="relative h-full w-full bg-[#121212] rounded-md shadow-md bg-grid-small">
          <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a]" />
          <div className="absolute inset-0 pointer-events-none z-10" style={{backgroundImage:'linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'40px 40px'}} />
          <ReactFlow
            nodes={laidOutNodes}
            edges={styledEdges}
            nodeTypes={nodeTypes}
            edgeTypes={{ default: 'smoothstep' }}
            fitView
            fitViewOptions={{ padding: 0.9 }}
            style={{ height: '100%', width: '100%', background: 'none', cursor }}
            zoomOnScroll={true}
            panOnScroll={true}
            zoomOnScrollMode="ctrl"
            dragPan={true}
            onMoveStart={() => setCursor('grabbing')}
            onMoveEnd={() => setCursor('grab')}
            onNodeMouseEnter={handleNodeMouseEnter}
            onNodeMouseLeave={handleNodeMouseLeave}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="8"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="cyan" />
              </marker>
            </defs>
          </ReactFlow>
          {showRealPath && (
            <div className="pointer-events-none absolute inset-0 z-[99]">
              <ReactFlow
                ref={overlayFlowRef}
                nodes={animatedNodesForOverlay}
                edges={overlayEdges}
                nodeTypes={overlayNodeTypes}
                edgeOptions={{
                  style: { stroke: '#06b6d4', strokeWidth: 3, strokeDasharray: '4 2' },
                  markerEnd: { type: MarkerType.Arrow, color: '#06b6d4' }
                }}
                panOnDrag={false}
                zoomOnScroll={false}
                nodesDraggable={false}
                edgesUpdatable={false}
                fitView
                className="pointer-events-auto"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,255,255,0.02)' }}
              >
              </ReactFlow>
            </div>
          )}
        </div>
        <ZoomHUD />
        <button
          onClick={() => setShowEdges(e => !e)}
          className="fixed bottom-6 right-6 px-3 py-1 rounded border border-white bg-gray-900 text-white shadow hover:bg-gray-700 transition-colors duration-200 z-50"
          style={{ zIndex: 60 }}
        >
          {showEdges ? 'Hide Edges' : 'Show Edges'}
        </button>
        {hoveredNode && (
          <div
            className="pointer-events-none fixed px-3 py-2 rounded bg-black/90 text-xs text-white font-mono shadow-lg z-50 transition-opacity duration-300"
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
