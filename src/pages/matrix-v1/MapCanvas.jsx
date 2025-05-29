import React, { useState, useMemo } from 'react';
import ReactFlow, { ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/base.css';
import ZoomHUD from './ZoomHUD';
import {
  SceneNode,
  DialogueNode,
  ChoiceNode,
  EndingNode
} from './CustomNode';
import { edges } from './edges';

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

function MapCanvasInner({ nodes }) {
  const [activeTypes, setActiveTypes] = useState(() => NODE_TYPE_FILTERS.map(f => f.key));
  const [showEdges, setShowEdges] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [highlightPath, setHighlightPath] = useState(true);
  const reactFlowInstance = useReactFlow();

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
      </div>
      <div style={{ height: '100vh' }} className="relative">
        <ReactFlow
          nodes={filteredNodes}
          edges={showEdges ? visibleEdges : []}
          nodeTypes={nodeTypes}
          edgeTypes={{ default: 'smoothstep' }}
          fitView
          fitViewOptions={{ padding: 0.8 }}
          style={{ height: '100%', backgroundColor: '#111' }}
          zoomOnScroll={false}
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
        <ZoomHUD />
        <button
          onClick={() => setShowEdges(e => !e)}
          className="absolute top-4 right-4 px-3 py-1 rounded border border-white bg-gray-900 text-white shadow hover:bg-gray-700 transition-colors duration-200 z-50"
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
