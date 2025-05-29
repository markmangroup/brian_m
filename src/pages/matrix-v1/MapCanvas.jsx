import React, { useState, useMemo } from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
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

export default function MapCanvas({ nodes }) {
  const [activeTypes, setActiveTypes] = useState(() => NODE_TYPE_FILTERS.map(f => f.key));

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

  return (
    <ReactFlowProvider>
      <div className="flex gap-2 flex-wrap mb-2 px-4 py-2 bg-black/80 text-sm text-white sticky top-0 z-50">
        {NODE_TYPE_FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleType(key)}
            className={`px-3 py-1 rounded border ${
              activeTypes.includes(key)
                ? 'bg-white text-black border-white'
                : 'bg-black border-white/30 text-white/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={{ default: 'smoothstep' }}
          fitView
          fitViewOptions={{ padding: 0.8 }}
          style={{ height: '100%', backgroundColor: '#111' }}
          zoomOnScroll={false}
        />
      </div>
      <ZoomHUD />
    </ReactFlowProvider>
  );
}
